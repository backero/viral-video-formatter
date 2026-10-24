/**
 * rawContentAnalyzer.js
 * Analyzes raw content (blog posts, captions, scripts, articles)
 * and extracts key information for form auto-fill
 */

export function analyzeRawContent(rawText) {
  if (!rawText || rawText.trim().length === 0) {
    return null
  }

  const text = rawText.trim()
  const lines = text.split('\n').filter(l => l.trim())

  return {
    // Basic metrics
    wordCount: text.split(/\s+/).length,
    charCount: text.length,
    lineCount: lines.length,

    // Content analysis
    mainTopic: extractMainTopic(text),
    niche: extractNiche(text),
    subNiche: extractSubNiche(text),
    value: extractValueProposition(text),
    tone: detectTone(text),
    contentType: detectContentType(text),

    // Structure analysis
    hasHook: detectHook(text),
    hasProblem: detectProblem(text),
    hasSolution: detectSolution(text),
    hasProof: detectProof(text),
    hasCTA: detectCTA(text),

    // Suggested format
    suggestedFormat: suggestFormat(text),
    suggestedStructure: suggestStructure(text),
    suggestedHook: suggestHookType(text),

    // Key points extracted
    keyPoints: extractKeyPoints(text),
    callToActions: extractCTAs(text),
    testimonialOrProof: extractProof(text),
  }
}

function extractMainTopic(text) {
  // First line or paragraph often contains main topic
  const firstLine = text.split('\n')[0].trim()
  if (firstLine.length > 10 && firstLine.length < 200) {
    return firstLine
  }

  // Or find the most significant phrase
  const sentences = text.match(/[^.!?]+[.!?]+/g) || []
  return sentences.length > 0 ? sentences[0].trim().substring(0, 100) : 'Topic'
}

function extractNiche(text) {
  const nichesKeywords = {
    'Beauty & Cosmetics': ['makeup', 'skincare', 'cosmetics', 'beauty', 'face', 'lipstick', 'foundation', 'serum'],
    'Business & Entrepreneurship': ['business', 'entrepreneur', 'startup', 'revenue', 'profit', 'sales', 'marketing'],
    'Fitness & Health': ['fitness', 'health', 'workout', 'exercise', 'diet', 'nutrition', 'weight loss', 'gym'],
    'Education': ['course', 'learn', 'skill', 'training', 'education', 'tutorial', 'teach', 'student'],
    'Finance & Investing': ['invest', 'stock', 'crypto', 'trading', 'finance', 'money', 'wealth', 'portfolio'],
    'Tech & Programming': ['code', 'programming', 'software', 'app', 'javascript', 'python', 'tech', 'developer'],
    'Food & Cooking': ['recipe', 'cooking', 'food', 'chef', 'kitchen', 'meal', 'cook', 'ingredient'],
    'Lifestyle & Personal Development': ['habit', 'mindset', 'growth', 'success', 'productivity', 'motivation', 'life'],
  }

  const lowerText = text.toLowerCase()
  for (const [niche, keywords] of Object.entries(nichesKeywords)) {
    if (keywords.some(kw => lowerText.includes(kw))) {
      return niche
    }
  }
  return 'General'
}

function extractSubNiche(text) {
  // Extract more specific sub-niche based on keywords
  const lowerText = text.toLowerCase()

  if (lowerText.includes('white label') || lowerText.includes('private label') || lowerText.includes('manufacturing')) {
    return 'Manufacturing & Business'
  }
  if (lowerText.includes('ecommerce') || lowerText.includes('online store') || lowerText.includes('dropship')) {
    return 'E-commerce & Online Business'
  }
  if (lowerText.includes('social media') || lowerText.includes('instagram') || lowerText.includes('tiktok')) {
    return 'Social Media Marketing'
  }

  return 'General'
}

function extractValueProposition(text) {
  // Extract benefit/value statement
  const sentences = text.match(/[^.!?]+[.!?]+/g) || []

  // Look for sentences with benefit keywords
  for (const sentence of sentences) {
    if (sentence.toLowerCase().includes('benefit') ||
        sentence.toLowerCase().includes('advantage') ||
        sentence.toLowerCase().includes('save') ||
        sentence.toLowerCase().includes('increase') ||
        sentence.toLowerCase().includes('improve')) {
      return sentence.trim()
    }
  }

  // Return first substantial sentence
  const substantial = sentences.find(s => s.trim().length > 30 && s.trim().length < 300)
  return substantial ? substantial.trim() : 'Key value and benefit statement'
}

function detectTone(text) {
  const lowerText = text.toLowerCase()

  if (lowerText.includes('buy') || lowerText.includes('purchase') || lowerText.includes('price')) return 'Sell'
  if (lowerText.includes('learn') || lowerText.includes('teach') || lowerText.includes('how to')) return 'Educate'
  if (lowerText.includes('vs') || lowerText.includes('versus') || lowerText.includes('compare')) return 'Comparison'
  if (lowerText.includes('story') || lowerText.includes('journey') || lowerText.includes('experience')) return 'Storytelling'
  if (lowerText.includes('step') || lowerText.includes('process') || lowerText.includes('method')) return 'Step-by-Step'
  if (lowerText.includes('myth') || lowerText.includes('fact') || lowerText.includes('truth')) return 'Myth vs Fact'
  if (lowerText.includes('trust') || lowerText.includes('proven') || lowerText.includes('result')) return 'Build Trust'

  return 'Sell'
}

function detectContentType(text) {
  if (text.length < 500) return 'Caption or Short Form'
  if (text.length < 2000) return 'Article or Blog Post'
  return 'Long-form Content'
}

function detectHook(text) {
  return text.length > 0
}

function detectProblem(text) {
  const lowerText = text.toLowerCase()
  return lowerText.includes('problem') || lowerText.includes('issue') || lowerText.includes('challenge') || lowerText.includes('struggle')
}

function detectSolution(text) {
  const lowerText = text.toLowerCase()
  return lowerText.includes('solution') || lowerText.includes('fix') || lowerText.includes('answer') || lowerText.includes('way to')
}

function detectProof(text) {
  const lowerText = text.toLowerCase()
  return lowerText.includes('proof') || lowerText.includes('result') || lowerText.includes('data') || lowerText.includes('number') || lowerText.includes('%')
}

function detectCTA(text) {
  const lowerText = text.toLowerCase()
  return lowerText.includes('click') || lowerText.includes('comment') || lowerText.includes('subscribe') || lowerText.includes('dm') || lowerText.includes('follow')
}

function suggestFormat(text) {
  if (text.toLowerCase().includes('vs') || text.toLowerCase().includes('versus') || text.toLowerCase().includes('compare')) {
    return 'S-TIER'
  }
  if (text.toLowerCase().includes('step') || text.toLowerCase().includes('how to')) {
    return 'A-TIER'
  }
  return 'S-TIER'
}

function suggestStructure(text) {
  const lowerText = text.toLowerCase()

  if (lowerText.includes('vs') || lowerText.includes('versus') || lowerText.includes('compare')) {
    return 'Comparison'
  }
  if (lowerText.includes('problem') && lowerText.includes('solution')) {
    return 'Problem-Solution'
  }
  if (lowerText.includes('story') || lowerText.includes('journey')) {
    return 'Story Arc'
  }

  return 'Comparison'
}

function suggestHookType(text) {
  const lowerText = text.toLowerCase()

  if (lowerText.includes('vs') || lowerText.includes('versus') || lowerText.includes('compare') || lowerText.includes('instead')) {
    return 'Comparison / Contrast Hook'
  }
  if (lowerText.includes('myth') || lowerText.includes('wrong') || lowerText.includes('actually')) {
    return 'Myth-Busting / Common Mistake Hook'
  }
  if (lowerText.includes('transform') || lowerText.includes('became') || lowerText.includes('journey')) {
    return 'Transformation Hook'
  }
  if (lowerText.includes('do') && lowerText.includes("don't")) {
    return "Do vs Don't Hook"
  }

  return 'Comparison / Contrast Hook'
}

function extractKeyPoints(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || []
  return sentences
    .map(s => s.trim())
    .filter(s => s.length > 15 && s.length < 300)
    .slice(0, 5)
}

function extractCTAs(text) {
  const ctaPattern = /(?:click|comment|dm|subscribe|follow|share|like|download|buy|purchase)(?:\s+the|\s+this|\s+below|\s+now)?/gi
  const matches = text.match(ctaPattern) || []

  if (matches.length > 0) {
    return [...new Set(matches.map(m => m.trim()))]
  }

  return ['Comment below', 'DM for more']
}

function extractProof(text) {
  // Look for numbers, percentages, or proof statements
  const numberPattern = /\d+%|\d+\s*(?:x|times|people|customers|users|creators)/gi
  const matches = text.match(numberPattern) || []

  if (matches.length > 0) {
    return matches.slice(0, 3).join(', ')
  }

  return null
}
