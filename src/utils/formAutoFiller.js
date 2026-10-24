/**
 * formAutoFiller.js
 * Uses Claude API to intelligently map analyzed content to form fields
 * Creates auto-filled form data for Pages 1-6
 */

export async function autoFillFormFromContent(analyzedContent) {
  if (!analyzedContent) {
    return null
  }

  try {
    const prompt = buildAutoFillPrompt(analyzedContent)

    const response = await fetch('/api/analyzeAndAutoFill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, analyzedContent }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Auto-fill error:', error)
    // Fallback to basic mapping if Claude API fails
    return getFallbackFormData(analyzedContent)
  }
}

function buildAutoFillPrompt(analyzed) {
  return `You are a viral video script generator. Based on the following content analysis, intelligently fill out form fields for a Traditional Video Form.

ANALYZED CONTENT:
- Topic: ${analyzed.mainTopic}
- Niche: ${analyzed.niche}
- Sub-Niche: ${analyzed.subNiche}
- Tone: ${analyzed.tone}
- Suggested Format: ${analyzed.suggestedFormat}
- Suggested Structure: ${analyzed.suggestedStructure}
- Suggested Hook: ${analyzed.suggestedHook}
- Key Points: ${analyzed.keyPoints.join(', ')}
- CTAs: ${analyzed.callToActions.join(', ')}

Generate form field values in JSON format:

{
  "details": {
    "startDate": "YYYY-MM-DD",
    "creatorName": "inferred creator or 'Content Creator'",
    "creatorDepartment": "inferred department",
    "actorName": "inferred talent or 'Brand Rep'",
    "actorDepartment": "inferred department",
    "company": "inferred company or 'Your Brand'"
  },
  "niche": "best matching niche",
  "topic": "specific topic from content",
  "value": "value proposition extracted from content",
  "format": "S-TIER or A-TIER or B-TIER",
  "scriptStructure": "Comparison or Problem-Solution or Story Arc",
  "viralHook": "best matching hook type",
  "confidenceScores": {
    "niche": 0.0-1.0,
    "topic": 0.0-1.0,
    "format": 0.0-1.0,
    "hook": 0.0-1.0
  }
}

Return ONLY valid JSON, no markdown or explanation.`;
}

function getFallbackFormData(analyzed) {
  return {
    details: {
      startDate: new Date().toISOString().split('T')[0],
      creatorName: 'Content Creator',
      creatorDepartment: 'Marketing',
      actorName: 'Brand Representative',
      actorDepartment: 'Content',
      company: 'Your Brand',
    },
    niche: analyzed.niche || 'General',
    topic: analyzed.mainTopic || 'Main Topic',
    value: analyzed.value || 'Key value proposition',
    format: analyzed.suggestedFormat || 'S-TIER',
    scriptStructure: analyzed.suggestedStructure || 'Comparison',
    viralHook: analyzed.suggestedHook || 'Comparison / Contrast Hook',
    confidenceScores: {
      niche: 0.7,
      topic: 0.8,
      format: 0.6,
      hook: 0.65,
    },
  }
}

export function validateAutoFilledData(data) {
  const issues = []

  if (!data.details || !data.details.creatorName) {
    issues.push('Creator name not filled')
  }
  if (!data.niche) {
    issues.push('Niche not detected')
  }
  if (!data.topic) {
    issues.push('Topic not extracted')
  }
  if (!data.format) {
    issues.push('Format not suggested')
  }

  return {
    valid: issues.length === 0,
    issues,
    confidence: calculateConfidence(data),
  }
}

function calculateConfidence(data) {
  if (!data.confidenceScores) return 0.5

  const scores = Object.values(data.confidenceScores)
  return scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0.5
}

export function mergeAutoFilledData(existingData, autoFilledData) {
  return {
    ...existingData,
    ...autoFilledData.details,
    niche: autoFilledData.niche,
    topic: autoFilledData.topic,
    value: autoFilledData.value,
    format: autoFilledData.format,
    scriptStructure: autoFilledData.scriptStructure,
    viralHook: autoFilledData.viralHook,
  }
}
