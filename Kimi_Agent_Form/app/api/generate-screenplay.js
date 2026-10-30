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

    const durationPerScene = Math.ceil(lengthSec / 5);

    const prompt = `You are a viral video director. Create a 5-scene screenplay for a ${lengthSec}s video about: "${topic}"

IMPORTANT: The user's content is in a specific language. Respond in the EXACT SAME LANGUAGE as the input content. Do not translate. Preserve the original language throughout the screenplay, dialogue, descriptions, and all fields.

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

All text must be in the same language as the input topic and context.`;

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
        language,
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
