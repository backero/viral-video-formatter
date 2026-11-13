import { tamilToThanglish, transliterateResponse } from './transliterate.js';

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
  // Common Tamil Thanglish patterns: word endings and suffixes
  const tamilThanglishPatterns = [
    /\b(kai|nala|iruku|naan|ivan|avan|athey|indha|intha|enna|yenna|sollran|sollrathu|atha|la|le|nu|ma|panivu|pannuren|pannalam|irundhalen|ah|eh|pannura|pannitu|parrindhuki|panninum|pottiya)\b/gi,
    /\w+(ku|nu|tha|um|ae|am|an|en|ir)\b/gi,
    /\b(oru|rendu|munn|naalu|ayiru|aaru|ezhulvathu|enpathu)\b/gi,
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
    return res.status(405).json({ error: 'Method not allowed' });
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
    return res.status(400).json({ error: 'Topic required' });
  }

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not set');
      return res.status(500).json({ error: 'API key not configured' });
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

    const prompt = `You are a viral video director. Create a 5-scene screenplay for a ${lengthSec}s video about: "${topic}"

**ABSOLUTE REQUIREMENT - READ CAREFULLY:**
- You MUST respond in pure romanized Tamil (Thanglish) ONLY
- Use ONLY ASCII Roman letters (a-z, A-Z), numbers (0-9), spaces, and basic punctuation
- NEVER EVER use any Tamil Unicode characters or any non-ASCII characters
- Every single word must be spelled using only a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
- If you cannot write something in pure ASCII Roman letters, SKIP IT
- All screenplay fields (scene, action, dialogue, cameraAngle, duration) must be 100% ASCII-only

This topic is in Tamil (Thanglish). Create the screenplay in the EXACT SAME STYLE - pure romanized Tamil using only a-z letters.
- ALL dialogue, action, visual, audio MUST be 100% Roman letters ONLY
` : ''}

Context:
- Why people care: ${whyTheyCare || 'Unknown'}
- Proof/Evidence: ${proof || 'Unknown'}
- Visual hook: ${visualHook || 'Engaging visuals'}
- Written hook: ${writtenHook || 'Compelling opening'}
- Audio hook: ${audioHook || 'Attention-grabbing sound'}

Return ONLY valid JSON (no markdown) with this exact structure:
[
  {
    "sceneNum": 1,
    "name": "Scene Name",
    "timingStart": 0,
    "timingEnd": ${durationPerScene},
    "duration": ${durationPerScene},
    "dialogue": "What the actor says (natural, conversational)",
    "action": "(Actor direction in parentheses)",
    "camera": {"shot": "Close-up/Medium/Wide", "angle": "Angle", "movement": "Movement type"},
    "actor": {"expression": "Expression", "energy": 8, "pace": "Pace"},
    "visual": "Visual elements and text overlays",
    "audio": "Music, SFX, ambient sound",
    "editMarkers": [{"time": "0.0s", "event": "Edit event"}]
  },
  ...repeat for scenes 2-5, incrementing timings by ${durationPerScene}
]

ALL TEXT MUST BE IN ${languageName.toUpperCase()}. No English translations or mixing of languages.`;

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

    // Strip all non-ASCII characters to force pure Thanglish (a-z, 0-9, spaces, punctuation only)
    function stripNonASCII(obj) {
      if (typeof obj === 'string') {
        // Keep only ASCII: a-z, A-Z, 0-9, spaces, and basic punctuation (!?.,-'")
        return obj.replace(/[^\x20-\x7E]/g, '').trim();
      }
      if (Array.isArray(obj)) {
        return obj.map(stripNonASCII);
      }
      if (typeof obj === 'object' && obj !== null) {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
          result[key] = stripNonASCII(value);
        }
        return result;
      }
      return obj;
    }

    // First transliterate (convert Tamil Unicode to Thanglish), then strip any remaining non-ASCII
    let finalScenes = detectedLanguage === 'TA' ? transliterateResponse(scenes.slice(0, 5)) : scenes.slice(0, 5);
    finalScenes = stripNonASCII(finalScenes);

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
    return res.status(500).json({
      error: error.message || 'Failed to generate screenplay',
    });
  }
}
