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
    /\b(kai|naan|ivan|avan|athey|indha|intha|enna|yenna|sollran|sollrathu)\b/gi,  // Common Tamil words
    /\w+(ku|nu|tha|um|ae|am|an|en|ir)\b/gi,  // Tamil suffixes
    /\b(oru|rendu|munn|naalu|ayiru|aaru|ezhulvathu|enpathu)\b/gi,  // Tamil numbers/quantifiers
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

// Tamil to Thanglish transliteration function
function tamilToThanglish(text) {
  if (!text) return text;

  const tamilMap = {
    // Vowels
    'ஆ': 'Aa', 'ஈ': 'Ee', 'ஊ': 'Oo', 'ஏ': 'E', 'ஐ': 'Ai', 'ஓ': 'O', 'ஔ': 'Au',
    'ா': 'a', 'ி': 'i', 'ு': 'u', 'ூ': 'oo', 'ெ': 'e', 'ே': 'e', 'ৈ': 'ai', 'ো': 'o', 'ৌ': 'au',
    'அ': 'a', 'இ': 'i', 'உ': 'u', 'எ': 'e', 'ஒ': 'o',

    // Consonants with virama (pure consonants)
    'க்': 'k', 'ங்': 'ng', 'ச்': 'ch', 'ஞ்': 'ny', 'ட்': 't', 'ண்': 'n', 'த்': 'th', 'ந்': 'n',
    'ப்': 'p', 'ம்': 'm', 'ய்': 'y', 'ர்': 'r', 'ல்': 'l', 'வ்': 'v', 'ழ்': 'zh', 'ள்': 'l',
    'ற்': 'r', 'ன்': 'n', 'ஜ்': 'j', 'ஷ்': 'sh', 'ஸ்': 's', 'ஹ்': 'h',

    // Consonants with vowels
    'க': 'ka', 'ங': 'nga', 'ச': 'cha', 'ஞ': 'nya', 'ட': 'ta', 'ண': 'na', 'த': 'tha', 'ந': 'na',
    'ப': 'pa', 'ம': 'ma', 'ய': 'ya', 'ர': 'ra', 'ல': 'la', 'வ': 'va', 'ழ': 'zha', 'ள': 'la',
    'ற': 'ra', 'ன': 'na', 'ஜ': 'ja', 'ஷ': 'sha', 'ஸ': 'sa', 'ஹ': 'ha',

    // Special characters
    '்': '', '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
    '?': '?', '!': '!', '.': '.', ',': ',', ':': ':', ';': ';', '-': '-', ' ': ' ',
  };

  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    result += tamilMap[char] || char;
  }

  return result;
}

// Helper to transliterate JSON response
function transliterateResponse(obj, isThanglish) {
  if (!isThanglish || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => transliterateResponse(item, isThanglish));
  }

  const translated = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      translated[key] = tamilToThanglish(value);
    } else if (typeof value === 'object' && value !== null) {
      translated[key] = transliterateResponse(value, isThanglish);
    } else {
      translated[key] = value;
    }
  }
  return translated;
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

    // Detect language from topic and context
    const allText = `${topic} ${whyTheyCare || ''} ${proof || ''}`;
    const detectedLanguage = detectLanguage(allText);
    const languageName = {
      'TA': 'Tamil',
      'HI': 'Hindi',
      'TH': 'Thai',
      'EN': 'English'
    }[detectedLanguage] || 'English';

    // Check if input is Thanglish (romanized Tamil)
    const tamilUnicodeRegex = /[஀-௿]/g;
    const isThanglish = detectedLanguage === 'TA' && !tamilUnicodeRegex.test(allText);

    const outputFormat = isThanglish ? 'Tamil Thanglish (romanized with Roman letters ONLY)' : languageName;

    const durationPerScene = Math.ceil(lengthSec / 5);

    const prompt = `You are a viral video director. Create a 5-scene screenplay for a ${lengthSec}s video about: "${topic}"

CRITICAL INSTRUCTION: This content is written in ${languageName}. You MUST respond in ${outputFormat} ONLY. Do not translate. Preserve the original language throughout the screenplay, all dialogue, descriptions, and every field.${isThanglish ? `

**IMPORTANT - THANGLISH MODE ACTIVATED:**
- Output MUST be in Tamil Thanglish (romanized Tamil using ONLY Roman alphabet a-z)
- Use ONLY: a, e, i, o, u, k, t, n, p, m, r, l, s, h, v, y, j, c, zh, ng, sh, ch, th, etc
- ABSOLUTELY NO Tamil Unicode characters (ஆ, ை, ு, ன், etc)
- Examples of correct format: "nala", "kai", "un", "tha", "ku", "panuven", "sollran"
- ALL dialogue, actions, visuals, audio descriptions MUST be romanized Tamil only
` : ''}`

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

    return res.status(200).json({
      success: true,
      scenes: scenes.slice(0, 5),
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
