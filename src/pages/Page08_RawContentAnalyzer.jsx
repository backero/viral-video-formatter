import { useState, useEffect } from 'react'
import { Sparkles, Loader2, Download, Copy, Check, Lock } from 'lucide-react'

export default function Page08_RawContentAnalyzer({ data, onChange }) {
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('Auto-Detect')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState('')
  const [generatedContent, setGeneratedContent] = useState(null)
  const [apiKey, setApiKey] = useState('')
  const [apiKeySaved, setApiKeySaved] = useState(false)

  useEffect(() => {
    const savedKey = localStorage.getItem('openai_key')
    if (savedKey) {
      setApiKey(savedKey)
      setApiKeySaved(true)
    }
  }, [])

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      setError('Please paste your API key')
      return
    }
    localStorage.setItem('openai_key', apiKey)
    setApiKeySaved(true)
    setError('')
  }

  const analyzeRawContent = async () => {
    if (!apiKey) {
      setError('Please add your OpenAI API key first')
      return
    }

    if (!data.rawContent?.trim()) {
      setError('Please paste your raw content first')
      return
    }

    setLoading(true)
    setError('')

    try {
      const prompt = `You MUST respond with ONLY valid JSON, no other text before or after.

You are an expert viral video content strategist. Analyze this raw content and transform it into a complete, production-ready viral video script package.

IMPORTANT: Generate ALL content (script, captions, hashtags, everything) in the EXACT SAME LANGUAGE as the input content. If input is Thanglish, generate in Thanglish. If Tamil, generate in Tamil. If English, generate in English. Do NOT translate to English - preserve the original language throughout.

RAW CONTENT:
${data.rawContent}

Input Language: ${language === 'Auto-Detect' ? 'Auto-detect and use the same language for generation' : `${language} - Generate output in ${language}`}

RESPOND WITH THIS EXACT JSON STRUCTURE (VALID JSON ONLY, in the same language as input):
{
  "analysis": {
    "detectedLanguage": "detected language name (Thanglish, Tamil, English, etc)",
    "mainMessage": "core message from content (in same language as input)",
    "targetAudience": "who this appeals to (in same language as input)",
    "suggestedHookType": "hook type name (in same language as input)",
    "contentStrength": "strong or medium or weak",
    "viralPotential": "number from 1-10"
  },
  "transformedScript": {
    "script": "Complete viral script with [ACTION] tags on separate lines, DIALOGUE IN SAME LANGUAGE AS INPUT, 7-9 sections. If input is Thanglish, script MUST be Thanglish. If Tamil input, script MUST be Tamil.",
    "duration": "X-Y seconds",
    "hookType": "the hook type used (in same language as input)",
    "language": "language of script (MUST match input language)"
  },
  "shotPlan": [
    {
      "shot": 1,
      "type": "shot type name",
      "duration": "2-4s",
      "action": "what camera/actor does",
      "cameraMove": "camera movement description",
      "scriptLine": "dialogue or audio for this shot"
    }
  ],
  "editInstructions": {
    "music": "genre, BPM number, vibe",
    "pacing": "fast or medium or slow",
    "colorGrade": "color grading description",
    "transitions": "transition style",
    "textOverlays": ["text 1", "text 2"],
    "soundDesign": "sound effects description"
  },
  "socialMediaContent": {
    "hookLine": "catchy one-liner IN SAME LANGUAGE AS INPUT",
    "caption": "full social media caption with line breaks IN SAME LANGUAGE AS INPUT",
    "cta": "call to action text IN SAME LANGUAGE AS INPUT",
    "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5 - use relevant hashtags for the language/region"]
  }
}

IMPORTANT: Return ONLY valid JSON. No markdown, no explanations, no text outside the JSON.`

      const response = await fetch('/api/generateScript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          apiKey,
        }),
      })

      if (!response.ok) {
        const err = await response.text()
        throw new Error(err || `API error ${response.status}`)
      }

      const result = await response.json()

      if (!result.content) {
        throw new Error('No content in API response')
      }

      let parsed
      try {
        parsed = JSON.parse(result.content)
      } catch (parseErr) {
        console.error('JSON Parse Error:', parseErr)
        console.error('Raw content:', result.content)
        throw new Error('Failed to parse AI response as JSON. The AI may have returned invalid JSON format.')
      }

      setGeneratedContent(parsed)
      onChange('analyzedContent', parsed)
    } catch (err) {
      setError(err.message || 'Failed to analyze content')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(''), 2000)
    } catch {}
  }

  const downloadAsWord = () => {
    if (!generatedContent) return

    const content = `
VIRAL VIDEO PRODUCTION GUIDE
Generated by AI Content Analyzer
=====================================

CONTENT ANALYSIS
=====================================
Language: ${generatedContent.analysis.detectedLanguage}
Main Message: ${generatedContent.analysis.mainMessage}
Target Audience: ${generatedContent.analysis.targetAudience}
Suggested Hook: ${generatedContent.analysis.suggestedHookType}
Content Strength: ${generatedContent.analysis.contentStrength}
Viral Potential: ${generatedContent.analysis.viralPotential}

TRANSFORMED SCRIPT
=====================================
Duration: ${generatedContent.transformedScript.duration}
Hook Type: ${generatedContent.transformedScript.hookType}
Language: ${generatedContent.transformedScript.language}

${generatedContent.transformedScript.script}

SHOT PLAN
=====================================
${generatedContent.shotPlan.map(shot => `
Shot ${shot.shot}: ${shot.type}
Duration: ${shot.duration}
Action: ${shot.action}
Camera: ${shot.cameraMove}
Dialogue: ${shot.scriptLine}
`).join('\n')}

EDIT INSTRUCTIONS
=====================================
Music: ${generatedContent.editInstructions.music}
Pacing: ${generatedContent.editInstructions.pacing}
Color Grade: ${generatedContent.editInstructions.colorGrade}
Transitions: ${generatedContent.editInstructions.transitions}
Text Overlays: ${generatedContent.editInstructions.textOverlays.join(', ')}
Sound Design: ${generatedContent.editInstructions.soundDesign}

SOCIAL MEDIA CONTENT
=====================================
Hook Line: ${generatedContent.socialMediaContent.hookLine}

Caption:
${generatedContent.socialMediaContent.caption}

CTA: ${generatedContent.socialMediaContent.cta}

Hashtags: ${generatedContent.socialMediaContent.hashtags.join(' ')}

---
Generated by Viral Video Formatter
Ready for Production
    `.trim()

    const blob = new Blob([content], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'viral-video-guide.docx'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="pg">
      <div className="mb-7">
        <h2 className="text-[22px] font-bold text-body tracking-tight mb-1">Raw Content Analyzer</h2>
        <p className="text-[14px] text-dim">Paste your raw content in ANY language and AI will transform it into a production-ready viral video script</p>
      </div>

      <div className="flex flex-col gap-5">
        {/* API Key Section */}
        {!apiKeySaved ? (
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-accent" />
              <label className="fl m-0">OpenAI API Key</label>
            </div>
            <input
              type="password"
              placeholder="Paste your OpenAI API key (sk-proj-...)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="fi text-[13px]"
            />
            <button
              onClick={saveApiKey}
              className="w-full px-4 py-2 bg-accent text-white hover:bg-accent/90 rounded-lg text-[14px] font-bold"
            >
              Save API Key
            </button>
            <p className="text-[11px] text-dim">Your API key is stored locally in your browser and never sent to our servers.</p>
          </div>
        ) : (
          <div className="bg-ok/10 border border-ok/30 rounded-lg p-3 flex items-center gap-2">
            <Check size={16} className="text-ok" />
            <span className="text-[13px] font-semibold text-ok">API Key Saved ✓</span>
            <button
              onClick={() => setApiKeySaved(false)}
              className="ml-auto text-[11px] text-dim hover:text-body underline"
            >
              Change
            </button>
          </div>
        )}

        {/* Language Selection */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="fl">Script Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="fi-select"
            >
              <option>Auto-Detect</option>
              <option>English</option>
              <option>Tamil</option>
              <option value="Thanglish (Tamil+English)">Thanglish</option>
              <option>Telugu</option>
              <option>Kannada</option>
              <option>Hindi</option>
            </select>
          </div>
        </div>

        {/* Raw Content Input */}
        <div className="flex flex-col gap-1.5">
          <label className="fl">Paste Your Raw Content</label>
          <textarea
            className="fi"
            placeholder="Paste your blog post, social media caption, product description, article, or any raw content here...

The AI will analyze it and transform it into a viral video script with shot plan, music specs, captions, and more."
            value={data.rawContent || ''}
            onChange={(e) => onChange('rawContent', e.target.value)}
            rows={8}
          />
          <p className="text-[12px] text-dim">Tip: Paste longer, detailed content for better AI analysis and more comprehensive scripts</p>
        </div>

        {/* Analyze Button */}
        <button
          onClick={analyzeRawContent}
          disabled={loading}
          className="w-full px-4 py-2 bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 disabled:opacity-50 rounded-lg text-[14px] font-bold flex items-center gap-2 justify-center"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Analyzing Content...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Analyze & Generate Script
            </>
          )}
        </button>

        {error && <div className="text-[12px] text-bad bg-bad/10 border border-bad/30 rounded p-3">{error}</div>}

        {/* Generated Content Display */}
        {generatedContent && (
          <div className="mt-6 border border-accent/20 rounded-lg p-5 bg-accent/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-body">✨ AI-Generated Viral Script Package</h3>
              <button
                onClick={downloadAsWord}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white rounded text-[12px] font-bold hover:bg-accent/90"
              >
                <Download size={14} />
                Download
              </button>
            </div>

            {/* Analysis Section */}
            <div className="bg-surface rounded p-3 border border-wire">
              <h4 className="text-[13px] font-bold text-body mb-2">📊 Content Analysis</h4>
              <div className="grid grid-cols-2 gap-2 text-[12px] text-dim">
                <div>Language: <span className="text-body">{generatedContent.analysis.detectedLanguage}</span></div>
                <div>Hook Type: <span className="text-body">{generatedContent.analysis.suggestedHookType}</span></div>
                <div>Strength: <span className="text-body">{generatedContent.analysis.contentStrength}</span></div>
                <div>Viral Score: <span className="text-body">{generatedContent.analysis.viralPotential}</span></div>
              </div>
            </div>

            {/* Script Section */}
            <div className="bg-surface rounded p-3 border border-wire">
              <h4 className="text-[13px] font-bold text-body mb-2">🎬 Transformed Script ({generatedContent.transformedScript.duration})</h4>
              <p className="text-[12px] text-dim whitespace-pre-wrap leading-relaxed">{generatedContent.transformedScript.script}</p>
              <button
                onClick={() => handleCopy(generatedContent.transformedScript.script, 'script')}
                className="mt-2 text-[11px] text-accent hover:text-accent/80 flex items-center gap-1"
              >
                {copied === 'script' ? (
                  <>
                    <Check size={12} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    Copy Script
                  </>
                )}
              </button>
            </div>

            {/* Shot Plan */}
            <div className="bg-surface rounded p-3 border border-wire">
              <h4 className="text-[13px] font-bold text-body mb-2">📸 Shot Plan ({generatedContent.shotPlan.length} shots)</h4>
              <div className="space-y-2">
                {generatedContent.shotPlan.map((shot, idx) => (
                  <div key={idx} className="text-[11px] bg-lifted p-2 rounded border border-wire/30">
                    <div className="font-bold text-body">Shot {shot.shot} - {shot.type} ({shot.duration})</div>
                    <div className="text-dim mt-1">Action: {shot.action}</div>
                    <div className="text-dim">Camera: {shot.cameraMove}</div>
                    <div className="text-dim italic">"{shot.scriptLine}"</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Edit Instructions */}
            <div className="bg-surface rounded p-3 border border-wire">
              <h4 className="text-[13px] font-bold text-body mb-2">🎵 Edit Instructions</h4>
              <div className="text-[12px] text-dim space-y-1">
                <div>Music: <span className="text-body">{generatedContent.editInstructions.music}</span></div>
                <div>Pacing: <span className="text-body">{generatedContent.editInstructions.pacing}</span></div>
                <div>Color Grade: <span className="text-body">{generatedContent.editInstructions.colorGrade}</span></div>
                <div>Transitions: <span className="text-body">{generatedContent.editInstructions.transitions}</span></div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-surface rounded p-3 border border-wire">
              <h4 className="text-[13px] font-bold text-body mb-2">📱 Social Media Content</h4>
              <div className="text-[12px] space-y-2">
                <div>
                  <div className="font-bold text-body">Hook Line:</div>
                  <div className="text-dim">{generatedContent.socialMediaContent.hookLine}</div>
                </div>
                <div>
                  <div className="font-bold text-body">Caption:</div>
                  <div className="text-dim whitespace-pre-wrap">{generatedContent.socialMediaContent.caption}</div>
                </div>
                <div>
                  <div className="font-bold text-body">CTA:</div>
                  <div className="text-dim">{generatedContent.socialMediaContent.cta}</div>
                </div>
                <div>
                  <div className="font-bold text-body">Hashtags:</div>
                  <div className="text-dim">{generatedContent.socialMediaContent.hashtags.join(' ')}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
