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
    /\b(kai|nala|iruku|naan|ivan|avan|athey|indha|intha|enna|yenna|sollran|sollrathu|atha|la|le|nu|ma|panivu|pannuren|pannalam|irundhalen|ah|eh|eh|pannura|pannitu|parrindhuki|panninum|pottiya)\b/gi,
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

**ABSOLUTE REQUIREMENT - READ CAREFULLY:**
- You MUST respond in pure romanized Tamil (Thanglish) ONLY
- Use ONLY ASCII Roman letters (a-z, A-Z), numbers (0-9), spaces, and basic punctuation
- NEVER EVER use any Tamil Unicode characters or any non-ASCII characters
- Every single word must be spelled using only a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z
- If you cannot write something in pure ASCII Roman letters, SKIP IT
- All field values (title, point, whyItWorks, whyTheyCare, proof) must be 100% ASCII-only

This research is in Tamil (Thanglish). Respond in the EXACT SAME STYLE - pure romanized Tamil using only a-z letters.`

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

    // ALWAYS transliterate when Tamil is detected (Thanglish or Unicode)
    const finalNuggets = detectedLanguage === 'TA' ? transliterateResponse(nuggets.slice(0, 3)) : nuggets.slice(0, 3);

    return res.status(200).json({
      success: true,
      options: finalNuggets,
      message: 'AI-extracted nuggets generated successfully',
    });
  } catch (error) {
    console.error('Extract nuggets error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to extract nuggets',
    });
  }
}
