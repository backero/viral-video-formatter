import express from 'express';

const app = express();

app.use(express.json());

// API handler for generating scripts
app.post('/api/generateScript', async (req, res) => {
  const { prompt, apiKey } = req.body;

  if (!prompt || !apiKey) {
    return res.status(400).json({ error: 'Missing prompt or API key' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'anthropic/claude-opus-5.5',
        max_tokens: 6000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenRouter API Error:', error);
      return res.status(response.status).json({
        error: error.error?.message || `OpenRouter API error: ${response.status}`
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    return res.status(200).json({ content });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Dev API Server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoint: POST http://localhost:${PORT}/api/generateScript`);
});
