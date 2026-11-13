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


// Vercel Serverless Function for AI Screenplay Generation
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Invalid request method. Use POST.' });
  }

  const {
    topic,
    whyTheyCare,
    proof,
    visualHook,
    writtenHook,
    audioHook,
    lengthSec = 30,
    language,
    research,
  } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is missing. Complete Phase 1 hook selection and proceed to Phase 2.' });
  }

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not set');
      return res.status(500).json({ error: 'Backend configuration error: API key missing. Contact support.' });
    }

    // Detect language from topic and context. The topic/whyTheyCare/proof
    // fields are short (max ~20 words each) and can miss the Thanglish
    // keyword threshold on their own, so fold in the original research dump
    // (if provided) for a more reliable signal — it's usually much longer.
    const allText = `${research || ''} ${topic} ${whyTheyCare || ''} ${proof || ''}`;
    const detectedLanguage = detectLanguage(allText);
    const languageName = {
      'TA': 'Tamil',
      'HI': 'Hindi',
      'TH': 'Thai',
      'EN': 'English'
    }[detectedLanguage] || 'English';

    // Check if input is Thanglish (romanized Tamil). Base the Unicode check on
    // the user's own research text only, not the full allText blend: topic/
    // whyTheyCare/proof can come from an earlier AI-extracted nugget whose own
    // Thanglish detection may have missed the threshold, leaving real Tamil
    // Unicode in those fields. Checking allText would see that leftover script
    // and wrongly conclude "this is genuine Tamil, not Thanglish" — disabling
    // both the Thanglish prompt instructions AND the transliteration
    // safety-net for the whole response. The research dump is always what the
    // user physically typed in Roman letters, so it's the reliable signal.
    const tamilUnicodeRegex = /[஀-௿]/g;
    const isThanglish =
      detectedLanguage === 'TA' && (research ? !tamilUnicodeRegex.test(research) : !tamilUnicodeRegex.test(allText));

    const outputFormat = isThanglish ? 'Tamil Thanglish (romanized with Roman letters ONLY)' : languageName;

    const durationPerScene = Math.ceil(lengthSec / 5);

    const prompt = `YOU MUST RESPOND IN PURE THANGLISH (ROMAN LETTERS ONLY) - NO EXCEPTIONS!

You are a viral video director. Create a 5-scene screenplay for a ${lengthSec}s video about: "${topic}"

**CRITICAL RULES - FOLLOW EXACTLY:**
1. RESPOND ONLY IN THANGLISH (romanized Tamil using ONLY Roman letters a-z)
2. ZERO Tamil Unicode characters allowed
3. ZERO non-ASCII characters allowed
4. Every word must use ONLY: a b c d e f g h i j k l m n o p q r s t u v w x y z (and 0-9, spaces, . , ! ? - ')
5. If you cannot write a word in Roman letters, DELETE IT and skip it
6. ALL output must be 100% ASCII (copy-paste must work in English systems)
7. Do NOT use any special symbols or Unicode
8. MAX 20 words per dialogue line (must fit in video)

LANGUAGE: ${detectedLanguage === 'TA' ? 'THANGLISH ONLY' : 'ENGLISH'}

Context:
- Why people care: ${whyTheyCare || 'Unknown'}
- Proof: ${proof || 'Unknown'}
- Visual hook: ${visualHook || 'Engaging visuals'}
- Written hook: ${writtenHook || 'Compelling opening'}
- Audio hook: ${audioHook || 'Attention-grabbing sound'}

Return ONLY valid JSON (no markdown):
[
  {"sceneNum":1,"name":"Scene name (Roman only)","timingStart":0,"timingEnd":${durationPerScene},"duration":${durationPerScene},"dialogue":"Actor dialogue max 20 words (Roman only)","action":"Direction in Roman only","camera":{"shot":"Close-up/Medium/Wide","angle":"Angle (Roman)","movement":"Movement (Roman)"},"actor":{"expression":"Emotion (Roman)","energy":8,"pace":"Pace (Roman)"},"visual":"Visuals (Roman)","audio":"Sound (Roman)","editMarkers":[{"time":"0.0s","event":"Edit (Roman)"}]},
  {"sceneNum":2,"name":"...","timingStart":${durationPerScene},"timingEnd":${durationPerScene * 2},...},
  {"sceneNum":3,"name":"...","timingStart":${durationPerScene * 2},"timingEnd":${durationPerScene * 3},...},
  {"sceneNum":4,"name":"...","timingStart":${durationPerScene * 3},"timingEnd":${durationPerScene * 4},...},
  {"sceneNum":5,"name":"...","timingStart":${durationPerScene * 4},"timingEnd":${lengthSec},...}
]

REQUIREMENT: EVERY CHARACTER MUST BE a-z, 0-9, OR SPACE/PUNCTUATION. NO EXCEPTIONS. NO TAMIL UNICODE. NO NON-ASCII.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://viralform.app',
        'X-Title': 'Viral Form Video Creator',
      },
      body: JSON.stringify({
        model: 'openai/gpt-6.1-terra-pro',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.9,
        max_tokens: 3000,
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

    const scenes = JSON.parse(content);

    if (!Array.isArray(scenes) || scenes.length < 5) {
      throw new Error('API did not return 5 scenes');
    }

    let finalScenes = scenes.slice(0, 5);

    // Step 1: Transliterate if Tamil Unicode detected
    if (detectedLanguage === 'TA') {
      finalScenes = transliterateResponse(finalScenes);
    }

    // Step 2: CRITICAL - Strip ALL non-ASCII characters to ensure pure Thanglish
    finalScenes = stripToASCII(finalScenes);

    // Step 3: Enforce max 20 words per dialogue line
    const enforceDialogueWordLimit = (obj) => {
      if (typeof obj === 'string' && obj.includes('dialogue')) {
        // This is a dialogue field - enforce 20 word limit
        const words = obj.trim().split(/\s+/);
        if (words.length > 20) {
          console.warn(`Dialogue exceeds 20 words (${words.length}): "${obj.substring(0, 50)}...". Truncating.`);
          return words.slice(0, 20).join(' ');
        }
        return obj;
      }
      return obj;
    };

    finalScenes = finalScenes.map(scene => {
      if (scene.dialogue && typeof scene.dialogue === 'string') {
        const words = scene.dialogue.trim().split(/\s+/);
        if (words.length > 20) {
          console.warn(`Scene ${scene.sceneNum} dialogue exceeds 20 words (${words.length}). Truncating.`);
          scene.dialogue = words.slice(0, 20).join(' ');
        }
      }
      return scene;
    });

    // Step 4: Validation - ensure no non-ASCII characters remain
    const validateASCII = (obj) => {
      if (typeof obj === 'string') {
        const nonASCII = obj.replace(/[\x20-\x7E]/g, ''); // Remove all valid ASCII
        if (nonASCII.length > 0) {
          console.warn(`Non-ASCII detected in: "${obj}". Cleaned version applied.`);
        }
      }
    };

    finalScenes.forEach(scene => {
      Object.values(scene).forEach(val => {
        if (typeof val === 'object') {
          Object.values(val).forEach(validateASCII);
        } else {
          validateASCII(val);
        }
      });
    });

    return res.status(200).json({
      success: true,
      scenes: finalScenes,
      message: 'Screenplay generated successfully',
      metadata: {
        topic,
        duration: lengthSec,
        language: detectedLanguage,
        sceneCount: 5,
      },
    });
  } catch (error) {
    console.error('Generate screenplay error:', error);

    let userMessage = 'Failed to generate screenplay';
    if (error.message?.includes('timeout') || error.message?.includes('API')) {
      userMessage = 'Generation took too long. Try with a shorter video or simpler topic.';
    } else if (error.message?.includes('did not return')) {
      userMessage = 'AI returned incomplete screenplay. Try regenerating.';
    } else if (error.message?.includes('JSON')) {
      userMessage = 'AI response format error. Try different hook selections in Phase 2.';
    } else if (error.message?.includes('5 scenes')) {
      userMessage = 'AI did not generate all 5 scenes. Try different research content.';
    }

    return res.status(500).json({ error: userMessage });
  }
}
