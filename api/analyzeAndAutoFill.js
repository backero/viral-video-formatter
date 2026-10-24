/**
 * /api/analyzeAndAutoFill
 * Uses Claude API (via OpenRouter) to intelligently fill form fields based on analyzed content
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt, analyzedContent } = req.body

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' })
  }

  try {
    const apiKey = process.env.OPENROUTER_API_KEY

    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not configured')
      return res.status(500).json({ error: 'Server configuration error: API key not set' })
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'anthropic/claude-opus-5.5',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Claude API Error:', error)
      return res.status(response.status).json({
        error: error.error?.message || `Claude API error: ${response.status}`,
      })
    }

    const data = await response.json()
    const content = data.content?.[0]?.text || ''

    // Parse the JSON response
    try {
      const parsedContent = JSON.parse(content)
      return res.status(200).json({
        success: true,
        formData: parsedContent,
        originalAnalysis: analyzedContent,
      })
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      // Return raw content if JSON parsing fails
      return res.status(200).json({
        success: false,
        error: 'Could not parse AI response',
        rawContent: content,
      })
    }
  } catch (error) {
    console.error('Auto-fill Error:', error)
    return res.status(500).json({ error: error.message || 'Internal server error' })
  }
}
