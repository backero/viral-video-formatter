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

// ALL 58 QUALITY CHECKS — comprehensive validation for all scripts
const CHECKS = [
  { id: 'GR01', name: 'Demonstration-First Dialogue', desc: 'Can this be SHOWN instead of SAID? If yes, it should be visual. Dialogue is the fallback.' },
  { id: 'GR02', name: 'Action-to-Dialogue Ratio >= 2.0', desc: 'For every line of dialogue, there should be at least 2 lines of action. Motion > words.' },
  { id: 'GR03', name: 'Silent-Runtime Quota by Format', desc: 'At least 30% of the video should have zero dialogue — reaction shots, reveals, transitions, visual storytelling.' },
  { id: 'GR04', name: 'Hook Parseable Muted (Full Video)', desc: "The hook's visual + on-screen text alone must carry the full message. Voiceover should be a multiplier, not the carrier." },
  { id: 'GR05', name: 'Broad -> Narrow -> Niche', desc: 'Hook starts broad (universal pain), narrows to specific (this solution), lands in niche (your brand).' },
  { id: 'GR06', name: "Show, Don't Tell", desc: 'Every fact should be DEMONSTRATED — numbers on screen simultaneously, objects visible, actions performed, not just stated.' },
  { id: 'GR07', name: 'Visual Change Every 2 Seconds', desc: 'No static talking-head shot should run longer than 2 seconds without a cut, text change, prop, or gesture change.' },
  { id: 'GR08', name: 'Contrast-Driven Cuts', desc: 'Every cut should show contrast: before/after, then/now, problem/solution, wide/close, moving/static.' },
  { id: 'GR09', name: 'B-Roll Instructs, Not Decorates', desc: 'B-roll should clarify or prove a claim, not just fill silence. No generic beauty shots without purpose.' },
  { id: 'GR10', name: 'Audio Beats Match Video Beats', desc: 'SFX, music drops, and dialogue hits should align with visual cuts. Async is jarring.' },
  { id: 'GR11', name: 'Text Overlay 100% Legible at 4x Speed', desc: 'On-screen text must be readable for at least 0.5s at normal speed. Thicker fonts, higher contrast, no small print.' },
  { id: 'GR12', name: 'Research Fidelity Carry-Over', desc: 'Numeric claims in the screenplay must match the research/proof points given. No inflation or invented stats.' },
  { id: 'GR13', name: 'Hook Uniqueness vs Competitor Hooks', desc: 'Does this hook sound like every other video in the category? Is there a fresh angle or unexpected claim?' },
  { id: 'GR14', name: 'CTA Directness', desc: 'CTA should be 1-3 words max: "Follow now", "Click link", "Subscribe". Not a sentence.' },
  { id: 'GR15', name: 'Pacing Alignment with Platform', desc: 'TikTok/Reels pace: 1.5-2s per scene. YouTube Shorts: 2-3s per scene. Adjust rhythm to platform.' },
  { id: 'GR16', name: 'Emotional Arc (Setup -> Tension -> Release)', desc: 'Hook creates curiosity. Middle builds stakes. CTA releases tension with solution/invitation.' },
  { id: 'GR17', name: 'No Jargon or Acronyms (Unless Niche)', desc: 'If your niche doesn\'t use it, don\'t assume the algorithm knows it. Use plain language for max reach.' },
  { id: 'GR18', name: 'Zero Dead Air or Long Pauses', desc: 'Every second should earn its place. No blank stares, waiting for dialogue, or awkward silence.' },
  { id: 'ST01', name: 'Scene Count Matches Format', desc: '30s format: 4-5 scenes. 60s: 6-8 scenes. Longer formats need more structure points.' },
  { id: 'ST02', name: 'Each Scene Has a Job', desc: 'Hook, Build Authority, Deliver Hack, Prove it, CTA. Every scene must move the story, not repeat.' },
  { id: 'ST03', name: 'Timing Math Adds Up', desc: 'Scene durations sum to total video length. No gaps, no cheating with overlaps.' },
  { id: 'ST04', name: 'Dialogue Fits Timeline', desc: 'Reading dialogue aloud at natural speed should fit the scene duration. Count words per second (2-3 words/s).' },
  { id: 'ST05', name: 'Transitions Spelled Out', desc: 'Every scene-to-scene shift should specify the transition: hard cut, fade, dissolve, match cut, J-cut, L-cut.' },
  { id: 'CT01', name: 'CTA Freeze Frame', desc: 'Don\'t bury the ask. CTA should be visually prominent (text overlay, gesture, graphic) in final seconds.' },
  { id: 'CT02', name: 'CTA Text <= 5 Words', desc: 'Vague CTAs bomb. Specific wins: "Tap link for 50% off", "Follow for daily tips", "Join Discord community".' },
  { id: 'CT03', name: 'Single CTA Only', desc: 'If hook promises speed, don\'t ask them to sign up for a long course. Match expectation.' },
  { id: 'CT04', name: 'Export Specs Present', desc: 'CTA should list platform-specific requirements: video codec, subtitle format, thumbnail dimensions, etc.' },
  { id: 'NS01', name: 'Brain Region Coverage Completeness', desc: 'Hook must show something unexpected, contradictory, or unsolved to trigger dopamine + click.' },
  { id: 'NS02', name: 'Multimodal Convergence Density', desc: 'Establish credibility fast: credentials, testimonial, stat, or proven track record in first 5s.' },
  { id: 'NS03', name: 'Hemodynamic Delay Alignment', desc: 'Use testimonials, "X people bought this", "trending", or show other people using the product.' },
  { id: 'NS04', name: 'DMN (Self-Reference) Density', desc: 'Include a "cost of inaction" or FOMO element. What do they lose by not watching/clicking?' },
  { id: 'NS05', name: 'VWFA Stimulation Density', desc: 'Deliver a genuine tip or insight in the video. Then ask for the follow/click. Value = reciprocity.' },
  { id: 'NS06', name: 'Auditory Cortex Onset Compliance', desc: 'If they watch to the end, they\'ve already committed mentally. Ask for a small action (follow > sign up).' },
  { id: 'NS07', name: 'Variable-Pace Prosody', desc: 'If applicable, hint at limited offer, limited access, or time-bound value. Not required, but powerful.' },
  { id: 'NS08', name: 'Hook Visual Hierarchy in 0.5s', desc: 'Actor should feel like a friend, not a salesperson. Humor, warmth, or relatability builds trust.' },
  { id: 'PBL01', name: 'Problem Clarity (First 3s)', desc: 'Viewer should know what problem this solves by end of hook. Specific, relatable, not generic.' },
  { id: 'PBL02', name: 'Solution Visibility', desc: 'By middle of video, solution should be obvious: product name, method, or offer.' },
  { id: 'PBL03', name: 'Before/After Contrast', desc: 'If applicable, show the gap: before problem / after solution. Visually clear and powerful.' },
  { id: 'PBL04', name: 'Objection Handling', desc: 'Address the silent objection: "Doesn\'t work for me because...", "Too expensive", "Takes too long". Preempt it.' },
  { id: 'PBL05', name: 'Next Step Clarity', desc: 'Viewer should know the one action after clicking the link: sign up, buy, download, DM, etc.' },
  { id: 'SA01', name: 'Beat Length <= 8 Words', desc: 'Each beat/line should be short: 8 words max. Brevity = punchiness.' },
  { id: 'SA02', name: 'No Conjunctions Between Beats', desc: 'Cut "and", "but", "so" between lines. Direct sentence fragments feel snappier.' },
  { id: 'SA03', name: '5th-Grade Readability', desc: 'Can a 10-year-old understand every word? No jargon, no complex grammar, no multi-clause sentences.' },
  { id: 'SA04', name: 'You/Your Density', desc: 'Use "you/your" at least 2x per 10 words. Direct address = personal connection.' },
  { id: 'SA05', name: 'Forbidden Words Absent', desc: 'Avoid: "obviously", "literally", "basically", "honestly", "actually", "really". Filler kills pace.' },
  { id: 'SA06', name: 'Pronunciation Notes for Technical Terms', desc: 'If a technical term appears, include pronunciation note so voiceover actor nails it (e.g., "Hyaluronic = hi-al-roo-ON-ik").' },
  { id: 'ST01', name: 'Actor Count vs Format Skin', desc: 'Lighting: 3-point or natural key light. Audio: no room reverb, no wind. Video: 1080p+ with sharp focus.' },
  { id: 'ST02', name: 'Lighting Setups <= Available', desc: 'Handheld is OK if intentional. Unintentional shake, drift, or focus-hunting = distraction.' },
  { id: 'ST03', name: 'B-roll Source Availability', desc: 'Same outfit throughout unless script intentionally shows time-jump. No costume changes mid-scene.' },
  { id: 'ST04', name: 'Custom Animation Lead Time', desc: 'Same room, same background, same props in same positions across cuts. No prop jumps or teleporting.' },
  { id: 'ML01', name: 'Language Tag Consistency', desc: 'Music/SFX must be licensed or royalty-free. Platform will mute or demonetize otherwise.' },
  { id: 'ML02', name: 'Caption Coverage Per Language', desc: 'If not sponsored, blur or remove visible brand logos. Use generic terms if possible.' },
  { id: 'QG01', name: 'Hook Stops Scroll (Novelty Score)', desc: 'First 1s: Would this stop someone mid-scroll? Unexpected visual, question, or bold claim?' },
  { id: 'QG02', name: 'Hook Compels Watch-Through', desc: 'By end of hook, viewer should think "I need to see how this works" or "What\'s the catch?".' },
  { id: 'QG03', name: 'No Dead Weight (Every Word/Frame Earns)', desc: 'Trim filler, ums, awkward pauses, redundant explanations. Every second should advance or entertain.' },
  { id: 'QG04', name: 'Audio Dialogue is Natural (Not Read)', desc: 'Actor should sound conversational, not like they\'re reading a script. Genuine tone, not performance.' },
  { id: 'QG05', name: 'Humor (If Used) Lands', desc: 'If there\'s a joke, does it land or fall flat? Timing, timing, timing.' },
  { id: 'QG06', name: 'Dialogue Avoids Superlatives (Amazing, Awesome, Best)', desc: 'Show, don\'t tell. "This changed my life" is generic. "I went from 2 to 10k followers" is proof.' },
  { id: 'QG07', name: 'Proof Points Are Specific', desc: '87% > "most", "$500k revenue" > "lots of money", "30 days" > "quickly". Numbers convert.' },
  { id: 'QG08', name: 'Fake/AI Voices Avoided (Unless Stylized)', desc: 'If using voiceover, real human voice preferred. Robo voices tank engagement unless it\'s a stylistic choice.' },
  { id: 'QG09', name: 'No Jump Cuts (Unless Stylized)', desc: 'Seamless transitions or intentional jump-cuts (for comedy). Accidental match-cuts or frame jumps confuse.' },
  { id: 'QG10', name: 'Ending Hooks Viewer for Next Video', desc: 'Last frame should feel incomplete or enticing so viewer checks your channel for the sequel/series.' },
  { id: 'RV01', name: 'Reference Video Match Compliance', desc: 'Does this screenplay visually/tonally match the reference video submitted in Phase 1?' },
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
