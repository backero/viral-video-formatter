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

// Vercel Serverless Function for AI Nugget Extraction
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { research } = req.body;

  if (!research) {
    return res.status(400).json({ error: 'Research content required' });
  }

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not set');
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Detect language from research content
    const detectedLanguage = detectLanguage(research);
    const languageName = {
      'TA': 'Tamil',
      'HI': 'Hindi',
      'TH': 'Thai',
      'EN': 'English'
    }[detectedLanguage] || 'English';

    // Check if input is Thanglish (romanized Tamil)
    const tamilUnicodeRegex = /[஀-௿]/g;
    const isThanglish = detectedLanguage === 'TA' && !tamilUnicodeRegex.test(research);

    const outputFormat = isThanglish ? 'Tamil Thanglish (romanized with Roman letters ONLY)' : languageName;

    const prompt = `You are an expert viral video creator. Analyze this research and extract 3 compelling "nuggets" (viral hooks) that would make people stop scrolling.

CRITICAL INSTRUCTION: This content is written in ${languageName}. You MUST respond in ${outputFormat} ONLY.${isThanglish ? `

**CRITICAL - THANGLISH ONLY - NO TAMIL SCRIPT ALLOWED:**
RESPOND ONLY IN THANGLISH (Tamil in Roman letters).
- Character mapping: a=அ/ஆ, e=எ/ஏ, i=இ/ஈ, o=ஒ/ஓ, u=உ/ஊ
- k=க, ng=ங, ch=ச, ny=ஞ, t=ட, n=ண/ந/ன, th=த, p=ப, m=ம, y=ய, r=ர, l=ல, v=வ, zh=ழ, s=ஸ, h=ஹ, j=ஜ, sh=ஷ
- EXAMPLES OF CORRECT THANGLISH: "kai"="கை", "nala"="நல", "tha"="தா", "panuven"="பணுவேன்", "naan"="நான்"
- WRITE USING ONLY: a-z, 0-9, spaces, punctuation. NEVER use Tamil Unicode letters.
- ALL output: title, point, whyItWorks, whyTheyCare, proof MUST be 100% Roman letters ONLY
` : ''}`

Research Content:
${research}

For each nugget, return valid JSON with exactly this structure (no markdown, just JSON):
[
  {
    "title": "Hook Category (e.g., 'Shocking Fact', 'Problem-Solution', 'Innovation Angle')",
    "whyItWorks": "Why this hook captures attention (1 sentence)",
    "point": "The actual hook/message (under 15 words)",
    "whyTheyCare": "Why viewers care about this (1 sentence)",
    "proof": "Evidence or proof that supports this claim (1 sentence)"
  },
  ...repeat 2 more times
]

Return ONLY valid JSON, no other text. ALL TEXT MUST BE IN ${languageName.toUpperCase()}.`;

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
        temperature: 0.8,
        max_tokens: 1000,
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

    const nuggets = JSON.parse(content);

    if (!Array.isArray(nuggets) || nuggets.length < 3) {
      throw new Error('API did not return valid nugget array');
    }

    return res.status(200).json({
      success: true,
      options: nuggets.slice(0, 3),
      message: 'AI-extracted nuggets generated successfully',
    });
  } catch (error) {
    console.error('Extract nuggets error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to extract nuggets',
    });
  }
}
