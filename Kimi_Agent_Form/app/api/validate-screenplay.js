// Vercel Serverless Function for AI Screenplay Validation
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { scenes } = req.body;

  if (!scenes || !Array.isArray(scenes) || scenes.length === 0) {
    return res.status(400).json({ error: 'Scenes array required' });
  }

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not set');
      return res.status(500).json({ error: 'API key not configured' });
    }

    const sceneSummary = scenes
      .map(
        (s) =>
          `Scene ${s.sceneNum}: ${s.name}\nDialogue: ${s.dialogue}\nVisual: ${s.visual}\nAudio: ${s.audio}`
      )
      .join('\n\n');

    const prompt = `You are a viral video expert. Validate this screenplay against key metrics for viral success. Analyze each check and return results as JSON.

Screenplay:
${sceneSummary}

Return ONLY valid JSON (no markdown) with this structure:
{
  "results": [
    {
      "id": "CHECK_CODE",
      "name": "Check Name",
      "result": "PASS" or "FAIL" or "N/A",
      "evidence": "Brief evidence explaining the result",
      "suggestedFix": "How to fix if FAIL"
    }
  ]
}

Check these 10 key areas:
1. GR01 - Hook captures attention immediately
2. GR02 - Visual changes every 2 seconds
3. GR03 - Dialogue is conversational, not robotic
4. QG10 - CTA is clear and compelling
5. NS01 - Story has emotional arc
6. ST01 - Pacing matches platform (fast for shorts)
7. PBL01 - Problem clearly identified
8. CT01 - Call-to-action present and actionable
9. ML01 - Works without sound (captions/visuals)
10. REF01 - Follows proven viral patterns`;

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
        temperature: 0.7,
        max_tokens: 2000,
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

    const validationData = JSON.parse(content);

    if (!validationData.results || !Array.isArray(validationData.results)) {
      throw new Error('Invalid validation response structure');
    }

    return res.status(200).json({
      success: true,
      results: validationData.results,
      message: 'Screenplay validated successfully',
      stats: {
        totalScenes: scenes.length,
        checksPerformed: validationData.results.length,
      },
    });
  } catch (error) {
    console.error('Validate screenplay error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to validate screenplay',
    });
  }
}
