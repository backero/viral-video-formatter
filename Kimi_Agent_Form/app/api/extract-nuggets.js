import { tamilToThanglish, transliterateResponse } from './transliterate.js';

// Strip all non-ASCII characters (ensure pure Thanglish)
function stripToASCII(obj) {
  if (!obj) return obj;
  if (typeof obj === 'string') {
    // Remove all non-ASCII characters, keep only a-z, A-Z, 0-9, spaces, and basic punctuation
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


// Vercel Serverless Function for AI Nugget Extraction
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Invalid request method. Use POST.' });
  }

  const { research } = req.body;

  if (!research) {
    return res.status(400).json({ error: 'Research content is empty. Paste your research dump in Phase 1 to continue.' });
  }

  if (research.length < 200) {
    return res.status(400).json({ error: `Research too short (${research.length}/200 characters). Add more details, stats, or quotes.` });
  }

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not set');
      return res.status(500).json({ error: 'Backend configuration error: API key missing. Contact support.' });
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

    const prompt = `MIRROR THE EXACT LANGUAGE AND SCRIPT OF THE RESEARCH CONTENT BELOW. DO NOT TRANSLATE. DO NOT SWITCH LANGUAGE ON YOUR OWN.

You are an expert viral video creator. Analyze this research and extract 3 compelling "nuggets" (viral hooks) that would make people stop scrolling.

**CRITICAL RULES - FOLLOW EXACTLY:**
1. Respond using the SAME words/style/language mix the user actually typed below. If they wrote romanized Tamil (Thanglish, e.g. "nalla irukku", "pannanum"), continue in that same Thanglish style. If they wrote English, respond in English. Never decide to translate or convert on your own.
2. ZERO Tamil Unicode characters allowed under any circumstance (no script, only a-z Roman letters)
3. ZERO non-ASCII characters allowed
4. Every word must use ONLY: a b c d e f g h i j k l m n o p q r s t u v w x y z (and 0-9, spaces, . , ! ? - ')
5. If a word cannot be written in Roman letters, write it the way the user wrote it (transliterated), never in Tamil script
6. ALL output must be 100% ASCII (copy-paste must work in English systems)
7. Do NOT use any special symbols or Unicode

Research Content (match this exact language/script style in your response):
${research}

Return ONLY valid JSON (no markdown, no explanation):
[
  {"title":"Hook title (Roman letters ONLY)","whyItWorks":"Why this works (1 sentence, Roman only)","point":"Hook message under 15 words (Roman only)","whyTheyCare":"Why they care (1 sentence, Roman only)","proof":"Supporting proof (1 sentence, Roman only)"},
  {"title":"Hook 2...","whyItWorks":"...","point":"...","whyTheyCare":"...","proof":"..."},
  {"title":"Hook 3...","whyItWorks":"...","point":"...","whyTheyCare":"...","proof":"..."}
]

REQUIREMENT: EVERY CHARACTER MUST BE a-z, 0-9, OR SPACE/PUNCTUATION. NO EXCEPTIONS.`;

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

    let finalNuggets = nuggets.slice(0, 3);

    // Step 1: Transliterate if Tamil Unicode detected
    if (detectedLanguage === 'TA') {
      finalNuggets = transliterateResponse(finalNuggets);
    }

    // Step 2: CRITICAL - Strip ALL non-ASCII characters to ensure pure Thanglish
    finalNuggets = stripToASCII(finalNuggets);

    // Step 3: Validation - ensure no non-ASCII characters remain
    const validateASCII = (obj) => {
      if (typeof obj === 'string') {
        const nonASCII = obj.replace(/[\x20-\x7E]/g, ''); // Remove all valid ASCII
        if (nonASCII.length > 0) {
          console.warn(`Non-ASCII detected in: "${obj}". Cleaned version applied.`);
        }
      }
    };

    finalNuggets.forEach(nugget => {
      Object.values(nugget).forEach(validateASCII);
    });

    // Step 4: Check hook diversity - ensure hooks are sufficiently different
    const calculateSimilarity = (str1, str2) => {
      const s1 = str1.toLowerCase().split(/\s+/);
      const s2 = str2.toLowerCase().split(/\s+/);
      const common = s1.filter(w => s2.includes(w)).length;
      return common / Math.max(s1.length, s2.length);
    };

    for (let i = 0; i < finalNuggets.length; i++) {
      for (let j = i + 1; j < finalNuggets.length; j++) {
        const similarity = calculateSimilarity(finalNuggets[i].point, finalNuggets[j].point);
        if (similarity > 0.6) {
          console.warn(`Hooks ${i + 1} and ${j + 1} are ${(similarity * 100).toFixed(0)}% similar. Consider regenerating for more diversity.`);
        }
      }
    }

    return res.status(200).json({
      success: true,
      options: finalNuggets,
      message: 'AI-extracted nuggets generated successfully',
    });
  } catch (error) {
    console.error('Extract nuggets error:', error);

    let userMessage = 'Failed to extract nuggets';
    if (error.message?.includes('API error') || error.message?.includes('timeout')) {
      userMessage = 'AI service is slow right now. Try again in a few seconds.';
    } else if (error.message?.includes('did not return valid')) {
      userMessage = 'AI response was incomplete. Try with more specific research details.';
    } else if (error.message?.includes('No content')) {
      userMessage = 'AI service returned empty response. Try simplifying your research text.';
    } else if (error.message?.includes('JSON')) {
      userMessage = 'AI response format error. Try with different research content.';
    }

    return res.status(500).json({ error: userMessage });
  }
}
