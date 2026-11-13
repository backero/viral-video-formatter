import { tamilToThanglish, transliterateResponse } from './transliterate.js';

function detectLanguage(text) {
  if (!text) return 'EN';
  const tamilRegex = /[஀-௿]/g;
  const tamilCount = (text.match(tamilRegex) || []).length;
  if (tamilCount > text.length * 0.05) return 'TA';
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
  if (tamilThanglishScore >= 3) return 'TA';
  return 'EN';
}

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
      return res.status(500).json({ error: 'API key not configured' });
    }
    const detectedLanguage = detectLanguage(research);
    const languageName = { 'TA': 'Tamil', 'HI': 'Hindi', 'TH': 'Thai', 'EN': 'English' }[detectedLanguage] || 'English';
    const tamilUnicodeRegex = /[஀-௿]/g;
    const isThanglish = detectedLanguage === 'TA' && !tamilUnicodeRegex.test(research);
    const outputFormat = isThanglish ? 'Tamil Thanglish (romanized with Roman letters ONLY)' : languageName;

    const prompt = `You are an expert viral video creator. Extract 3 compelling viral hooks from this research.

CRITICAL: Output ONLY in pure ASCII Roman letters. NO Tamil, NO other scripts.
EVERY character must be a-z, A-Z, 0-9, space, or basic punctuation (. , ! ? - ' ")

Research: ${research}

Return ONLY this JSON (no other text):
[
  {"title":"Hook title in ASCII only","point":"15 words max in ASCII only","whyItWorks":"Why it works in ASCII","whyTheyCare":"Why they care in ASCII","proof":"Proof in ASCII"}
]`;

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
      throw new Error(errData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content in response');
    }

    let nuggets = JSON.parse(content);
    if (!Array.isArray(nuggets) || nuggets.length < 3) {
      throw new Error('Invalid response format');
    }

    // CRITICAL: Apply ASCII filtering NO MATTER WHAT
    let finalNuggets = nuggets.slice(0, 3);
    finalNuggets = transliterateResponse(finalNuggets);  // Convert Tamil Unicode to Thanglish
    finalNuggets = stripToASCII(finalNuggets);  // Strip ANY remaining non-ASCII

    return res.status(200).json({
      success: true,
      options: finalNuggets,
      message: 'Nuggets generated',
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message || 'Failed' });
  }
}
