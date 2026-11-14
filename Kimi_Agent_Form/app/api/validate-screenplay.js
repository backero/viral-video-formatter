import { tamilToThanglish, transliterateResponse } from './transliterate.js';

// Strip all non-ASCII characters (ensure pure Thanglish)
function stripToASCII(obj) {
  if (!obj) return obj;
  if (typeof obj === 'string') {
    return obj.replace(/[^\x20-\x7E]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  if (Array.isArray(obj)) {
    return obj.map(stripToASCII);
  }
  if (typeof obj === 'object') {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = stripToASCII(v);
    }
    return result;
  }
  return obj;
}

// Language detection function
function detectLanguage(text) {
  if (!text) return 'EN';

  // Tamil Unicode range: U+0B80 to U+0BFF
  const tamilRegex = /[஀-௿]/g;
  const tamilCount = (text.match(tamilRegex) || []).length;

  // Hindi Unicode range: U+0900 to U+097F
  const hindiRegex = /[ऀ-ॿ]/g;
  const hindiCount = (text.match(hindiRegex) || []).length;

  // Thai Unicode range: U+0E00 to U+0E7F
  const thaiRegex = /[ก-๙]/g;
  const thaiCount = (text.match(thaiRegex) || []).length;

  // If significant Tamil/Hindi/Thai characters detected (lowered threshold to 5%)
  if (tamilCount > text.length * 0.05) return 'TA'; // Tamil
  if (hindiCount > text.length * 0.05) return 'HI'; // Hindi
  if (thaiCount > text.length * 0.05) return 'TH'; // Thai

  // Tamil Thanglish detection (romanized Tamil)
  // Expanded keyword list covering verbs, nouns, pronouns, particles, adjectives
  const tamilThanglishPatterns = [
    // Core Tamil Thanglish keywords (verbs, nouns, pronouns, particles)
    /\b(kai|kail|nala|iruku|naan|nee|avan|aval|avangal|athey|indha|intha|enna|yenna|sollran|sollren|sollen|sollrathu|atha|la|le|nu|ma|panivu|pannuren|pannalam|irundhalen|ah|eh|pannura|pannitu|parrindhuki|panninum|pottiya|pannren|pannanum|pannittan|pannirukkum|irundhadhu|iranda|irukku|vaanganum|vendavangal|kodai|dhaan|dhi|seri|saiyya|pidicha|mudiyanum|ayya|amma|thambi|akka|appa)\b/gi,
    // Tamil suffixes and word endings (-kkum, -ndu, -nu, -um, -ai, -an, -en, -ir, -ku, -tha, -ae, -am)
    /\w+(kkum|ndu|nu|um|ai|an|en|ir|ku|tha|ae|am|ar|al|el|ol|odhan|otthu)\b/gi,
    // Numbers and quantifiers
    /\b(onnu|rannu|moonnu|nanu|ayidhu|aaru|ezhudhu|ettu|tombai|pathu|paththundu|oru|onru|rendu|munn|naalu|ayiru|aaru|ezhulvathu|enpathu)\b/gi,
    // Additional common phrases and words
    /\b(illai|aamam|irukkanum|irukkiradhu|pannalaam|panikkanum|solli|solluraan|vendai|mukkiyamana|odhan|otthu|sadam|thinnum|kaanaam|paarukkanum|yaarukum|eppadi|engadhu|adhukku|avar|avargal|athanu|yethirai)\b/gi,
  ];

  let tamilThanglishScore = 0;
  for (const pattern of tamilThanglishPatterns) {
    const matches = text.match(pattern) || [];
    tamilThanglishScore += matches.length;
  }

  // If at least 3 Tamil Thanglish patterns detected
  if (tamilThanglishScore >= 3) return 'TA'; // Tamil Thanglish

  // Default to English
  return 'EN';
}

// CRITICAL CORE CHECKS ONLY (reduced from 58 to 5 for speed)
// These 5 checks are the most viral-impactful. Validation now ~8-10s instead of 30+s.
const CHECKS = [
  { id: 'GR01', name: 'Demonstration-First Dialogue', desc: 'Can this be SHOWN instead of SAID? If yes, it should be visual. Dialogue is the fallback.' },
  { id: 'GR04', name: 'Hook Parseable Muted (Full Video)', desc: "The hook's visual + on-screen text alone must carry the full message. Voiceover should be a multiplier, not the carrier." },
  { id: 'GR06', name: "Show, Don't Tell", desc: 'Every fact should be DEMONSTRATED — numbers on screen simultaneously, objects visible, actions performed, not just stated.' },
  { id: 'GR07', name: 'Visual Change Every 2 Seconds', desc: 'No static talking-head shot should run longer than 2 seconds without a cut, text change, prop, or gesture change.' },
  { id: 'GR12', name: 'Research Fidelity Carry-Over', desc: 'Numeric claims in the screenplay must match the research/proof points given. No inflation or invented stats.' },
];

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

// Run checks in parallel batches instead of one 58-check completion — cuts
// wall-clock time to roughly the slowest batch instead of the sum of all 58.
// Smaller batches = less output per completion = lower truncation risk.
const CHECK_CHUNKS = chunkArray(CHECKS, 10);

async function validateChunk({ apiKey, screenplayText, chunk, languageName, outputFormat, isThanglish }) {
  const checksText = chunk.map((c) => `${c.id} - ${c.name}: ${c.desc}`).join('\n');

  const prompt = `You are a strict short-form video script quality validator. Evaluate this actual screenplay against each of the ${chunk.length} checks below. Be honest — most real first-draft screenplays fail at least a few checks.

SCREENPLAY (the ONLY content you may reference — do not invent or reference any other topic/example):
${screenplayText}

CHECKS TO RUN:
${checksText}

CRITICAL INSTRUCTIONS:
- "evidence" and "suggestedFix" must ONLY reference scenes, dialogue, numbers, and details that literally appear in the SCREENPLAY above.
- NEVER invent or reference an unrelated example topic. If illustrating a rewrite, rewrite using the ACTUAL dialogue words from the screenplay.
- If a check genuinely does not apply, mark it "N/A" rather than forcing a PASS/FAIL.
- "scenesAffected" must be an array of the scene numbers (integers) relevant to a FAIL result; use [] for PASS/N/A or checks that are global.

**ABSOLUTE REQUIREMENT:**
- Write "evidence" and "suggestedFix" in the SAME language/script style as the SCREENPLAY above. If the screenplay is in romanized Tamil (Thanglish), respond in that same Thanglish style. If it's in English, respond in English. Never decide to translate or convert on your own.
- Use ONLY ASCII Roman letters (a-z, A-Z), numbers (0-9), spaces, and basic punctuation
- NEVER EVER use any Tamil Unicode characters or any non-ASCII characters, under any circumstance
- Every single word in evidence and suggestedFix must use only a-z letters
- If a word cannot be written in pure ASCII Roman letters, write it the way the screenplay wrote it (transliterated), never in Tamil script
- All evidence and suggestedFix text must be 100% ASCII-only, field keys stay in English

Return ONLY valid JSON (no markdown fences, no preamble), an array with exactly one object per check listed above, in the same order, this exact shape:
{
  "results": [
    { "id": "GR01", "result": "PASS" or "FAIL" or "N/A", "evidence": "one specific sentence citing what in THIS screenplay supports the verdict", "suggestedFix": "if FAIL, one concrete fix using only this screenplay's actual content; otherwise empty string", "scenesAffected": [] }
  ]
}

Return exactly ${chunk.length} objects, one per check ID listed above, in the same order.`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://viralform.app',
      'X-Title': 'Viral Form Video Creator',
    },
    body: JSON.stringify({
      // Fast model: gpt-4o-mini is optimized for classification (PASS/FAIL/N/A)
      // and delivers results in ~8-10s vs ~50s+ for larger models.
      // With only 5 critical checks, we get comprehensive validation at speed.
      model: 'openai/gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.error?.message || `OpenRouter API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;

  if (!content) {
    throw new Error('No content in API response');
  }

  const cleaned = content.replace(/```json|```/g, '').trim();
  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (parseErr) {
    throw new Error(
      `Validator returned malformed JSON for checks [${chunk.map((c) => c.id).join(', ')}] (likely truncated): ${parseErr.message}`
    );
  }

  if (!parsed.results || !Array.isArray(parsed.results)) {
    throw new Error('Invalid validation response structure');
  }

  return parsed.results;
}

// Vercel Serverless Function for AI Screenplay Validation
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Invalid request method. Use POST.' });
  }

  const { scenes } = req.body;

  if (!scenes || !Array.isArray(scenes) || scenes.length === 0) {
    return res.status(400).json({ error: 'No scenes to validate. Generate screenplay in Phase 3 first.' });
  }

  if (scenes.length < 5) {
    return res.status(400).json({ error: `Only ${scenes.length}/5 scenes provided. Screenplay must have all 5 scenes.` });
  }

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not set');
      return res.status(500).json({ error: 'Backend configuration error: API key missing. Contact support.' });
    }

    const screenplayText = scenes
      .map((s) => {
        const camera = [s.cameraShot, s.cameraAngle, s.cameraMovement].filter(Boolean).join(', ');
        const actor = [
          s.actorExpression,
          s.actorEnergy != null ? `energy ${s.actorEnergy}/10` : null,
          s.actorPace,
        ]
          .filter(Boolean)
          .join(', ');
        let markersText = '';
        if (s.editMarkers) {
          try {
            const markers = typeof s.editMarkers === 'string' ? JSON.parse(s.editMarkers) : s.editMarkers;
            if (Array.isArray(markers) && markers.length > 0) {
              markersText = `\nEdit markers: ${markers.map((m) => `${m.time} - ${m.event}`).join('; ')}`;
            }
          } catch {
            // ignore malformed marker JSON
          }
        }
        return `Scene ${s.sceneNum} (${s.name}, ${s.timingStart}-${s.timingEnd}s):\nDialogue: "${s.dialogue}"\nAction: ${s.action}\nCamera: ${camera || 'not specified'}\nActor: ${actor || 'not specified'}\nVisual: ${s.visual}\nAudio: ${s.audio}${markersText}`;
      })
      .join('\n\n');

    // Detect language from screenplay content
    const detectedLanguage = detectLanguage(screenplayText);
    const languageName = { TA: 'Tamil', HI: 'Hindi', TH: 'Thai', EN: 'English' }[detectedLanguage] || 'English';

    // Check if input is Thanglish (romanized Tamil)
    const tamilUnicodeRegex = /[஀-௿]/g;
    const isThanglish = detectedLanguage === 'TA' && !tamilUnicodeRegex.test(screenplayText);

    const outputFormat = isThanglish ? 'Tamil Thanglish (romanized with Roman letters ONLY)' : languageName;

    const chunkResults = await Promise.all(
      CHECK_CHUNKS.map((chunk) =>
        validateChunk({ apiKey, screenplayText, chunk, languageName, outputFormat, isThanglish })
      )
    );

    const mergedResults = chunkResults.flat();

    let finalResults = mergedResults;

    // Step 1: Transliterate if Tamil Unicode detected
    if (detectedLanguage === 'TA') {
      finalResults = transliterateResponse(finalResults);
    }

    // Step 2: CRITICAL - Strip ALL non-ASCII characters to ensure pure Thanglish
    finalResults = stripToASCII(finalResults);

    return res.status(200).json({
      success: true,
      results: finalResults,
      message: 'Screenplay validated successfully',
      stats: {
        totalScenes: scenes.length,
        checksPerformed: finalResults.length,
      },
    });
  } catch (error) {
    console.error('Validate screenplay error:', error);

    let userMessage = 'Failed to validate screenplay';
    if (error.message?.includes('timeout') || error.message?.includes('slow')) {
      userMessage = 'Validation is taking longer than expected. Try again in a moment.';
    } else if (error.message?.includes('malformed')) {
      userMessage = 'Scene data is incomplete. Go back to Phase 3 and regenerate.';
    } else if (error.message?.includes('JSON')) {
      userMessage = 'Validation response format error. Try regenerating the screenplay.';
    } else if (error.message?.includes('truncated')) {
      userMessage = 'Some validation results were cut off. Try with shorter dialogue lines.';
    }

    return res.status(500).json({ error: userMessage });
  }
}
