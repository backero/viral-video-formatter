import { useState, useEffect } from 'react'
import { Sparkles, Loader2, Download, FileText, Copy } from 'lucide-react'
import { generateRawContentWord } from '../utils/generateRawContentWord'
import { generateRawContentPDF } from '../utils/generateRawContentPDF'

const PLATFORM_GUIDANCE = {
  'Instagram Reels': 'Target 15-30 seconds. Caption should be punchy, ideally under 150 characters before "...more". Use 3-5 highly relevant hashtags, not generic spam tags.',
  'YouTube Shorts': 'Target up to 60 seconds. Caption/description can be slightly longer and include searchable keywords. Use 3-5 hashtags.',
  'TikTok': 'Target 15-34 seconds, punchy and fast-paced. Caption should be short and conversational. Use 3-5 hashtags including at least one trending-style tag for the niche.',
  'General / Not Sure': 'Target 20-45 seconds, a safe format that works across Reels, Shorts, and TikTok. Use 3-5 hashtags.',
}

const TONE_GUIDANCE = {
  'Sell': 'Optimize the script, hook, and CTA to drive a purchase or conversion. Create urgency and highlight the value/price proposition clearly.',
  'Educate': 'Optimize the script to teach the viewer something useful and position the creator as knowledgeable. The CTA should invite them to learn more, not necessarily buy immediately.',
  'Build Trust': 'Optimize the script to build credibility and authenticity — use proof points, specifics, and a calm, confident tone rather than hype.',
  'Entertain': 'Optimize the script to be fun, relatable, and shareable. Humor or surprise is welcome even while delivering the core message.',
  'Comparison': 'Structure the script as a clear comparison (option A vs option B, before vs after, us vs them). Make the contrast obvious at every beat — alternate between the two sides so the difference is unmistakable.',
  'Storytelling': 'Structure the script as a mini narrative arc with a setup, a problem/conflict, a turning point, and a resolution — not a flat list of facts. It should feel like a story being told, even in a short format.',
  'Step-by-Step': 'Structure the script as a clear numbered process the viewer can follow and replicate (Step 1, Step 2, Step 3...). Keep each step short, concrete, and actionable. Label each shot with its step number.',
  'Myth vs Fact': 'Structure the script around debunking a common myth or misconception in this niche, then revealing the fact/truth with proof. Open by stating the myth confidently as if it were true, then flip it with evidence.',
}

const DURATION_GUIDANCE = {
  'Auto (let platform decide)': null,
  'Up to 15 seconds': 'The script MUST fit within 15 seconds total. Keep it to 3-5 tight beats, no filler.',
  'Up to 30 seconds': 'The script MUST fit within 30 seconds total. Aim for 5-7 beats.',
  'Up to 45 seconds': 'The script MUST fit within 45 seconds total. Aim for 7-9 beats.',
  'Up to 60 seconds': 'The script MUST fit within 60 seconds total. Aim for 8-10 beats, this is the longest format allowed here.',
}

export default function Page01_RawContent({ data, onChange, errors }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [languageWarning, setLanguageWarning] = useState('')
  const [copied, setCopied] = useState('')
  const [generatedContent, setGeneratedContent] = useState(null)
  const [downloading, setDownloading] = useState(false)
  const [downloadingPdf, setDownloadingPdf] = useState(false)
  const [selectedHookIndex, setSelectedHookIndex] = useState(0)

  useEffect(() => {
    if (data.analyzedContent) {
      setGeneratedContent(data.analyzedContent)
    }
  }, [data.analyzedContent])

  const analyzeRawContent = async () => {
    if (!data.rawContent?.trim()) {
      setError('Please paste your raw content first')
      return
    }

    setLoading(true)
    setError('')
    setSelectedHookIndex(0)

    try {
      const prompt = `You MUST respond with ONLY valid JSON, no other text before or after.

You are an expert viral video content strategist. Analyze this raw content and transform it into a complete, production-ready viral video script package.

IMPORTANT: Generate ALL content (script, captions, hashtags, everything) in the EXACT SAME LANGUAGE as the input content. If input is Thanglish, generate in Thanglish. If Tamil, generate in Tamil. If English, generate in English. Do NOT translate to English - preserve the original language throughout.

RAW CONTENT:
${data.rawContent}

Input Language: ${data.rawContentLanguage === 'Auto-Detect' ? 'Auto-detect and use the same language for generation' : `${data.rawContentLanguage} - Generate output in ${data.rawContentLanguage}`}

TARGET PLATFORM: ${data.rawContentPlatform}
${PLATFORM_GUIDANCE[data.rawContentPlatform] || ''}

CONTENT GOAL: ${data.rawContentTone}
${TONE_GUIDANCE[data.rawContentTone] || ''}
${DURATION_GUIDANCE[data.rawContentDuration] ? `\nTARGET DURATION (this OVERRIDES the platform's default duration range above if they conflict): ${data.rawContentDuration}\n${DURATION_GUIDANCE[data.rawContentDuration]}` : ''}
${data.rawContentBrandVoice?.trim() ? `\nBRAND VOICE TO MAINTAIN THROUGHOUT: ${data.rawContentBrandVoice.trim()}\nKeep vocabulary, energy, and tone consistent with this brand voice in the script, hook, and caption.` : ''}

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
    "script": "Complete viral script with [ACTION] tags on separate lines, DIALOGUE IN SAME LANGUAGE AS INPUT, broken into exactly 7-9 numbered beats. If input is Thanglish, script MUST be Thanglish. If Tamil input, script MUST be Tamil.",
    "duration": "X-Y seconds, matching the target platform guidance given above",
    "hookType": "the hook type used (in same language as input)",
    "language": "language of script (MUST match input language)"
  },
  "hookOptions": [
    "alternate hook line / opening 1, IN SAME LANGUAGE AS INPUT, different angle than the script's main hook",
    "alternate hook line / opening 2, IN SAME LANGUAGE AS INPUT, different angle again (e.g. curiosity vs shock vs direct benefit)",
    "alternate hook line / opening 3, IN SAME LANGUAGE AS INPUT, different angle again"
  ],
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
    "hookLine": "catchy one-liner IN SAME LANGUAGE AS INPUT - this should match hookOptions[0]",
    "caption": "full social media caption with line breaks IN SAME LANGUAGE AS INPUT",
    "cta": "call to action text IN SAME LANGUAGE AS INPUT - do NOT write generic English phrases like 'Click the link in bio', write it the way a creator speaking this language would actually say it",
    "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5 - use relevant hashtags for the language/region"]
  }
}

MANDATORY RULE FOR shotPlan: The shotPlan array MUST contain ONE entry for EVERY numbered beat in transformedScript.script. If the script has 7 numbered beats, shotPlan MUST have exactly 7 objects (shot 1 through shot 7). Never stop at 1 shot. Count the beats in your script before writing shotPlan and match that count exactly.

MANDATORY RULE FOR LANGUAGE: EVERY SINGLE STRING in the JSON output (hookLine, hookOptions, caption, cta, mainMessage, targetAudience, suggestedHookType) must be in the SAME language as the raw input content. Do not slip into plain English for the cta or caption even partially - keep it fully consistent with the detected language.

MANDATORY RULE FOR CTA: Never write a literal or translated version of "click the link in bio", "link in description", "swipe up", or any variant of that phrase in ANY language. These are banned regardless of language. Instead write the CTA as a specific action tied to the content itself, for example: "Comment [WORD] sollu, naan DM pannuren" or "Save pannu, nalaikku thevai padum" or a direct question that invites a reply. If a brand voice was provided above, the CTA must also reflect it (e.g. if the brand voice says it backs claims with numbers, the CTA or the line just before it should include a concrete number).

IMPORTANT: Return ONLY valid JSON. No markdown, no explanations, no text outside the JSON.`

      const response = await fetch('/api/generateScript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
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

      const bannedPhrase = /click\s*(the)?\s*link|link\s*in\s*(the)?\s*bio|swipe\s*up/i
      if (bannedPhrase.test(parsed.socialMediaContent?.cta || '') || bannedPhrase.test(parsed.socialMediaContent?.caption || '')) {
        setLanguageWarning('Heads up: the CTA/caption may have slipped into a generic "link in bio" style phrase. Review it before using, or hit Analyze again for a different pass.')
      } else {
        setLanguageWarning('')
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

  const activeHookLine = generatedContent?.hookOptions?.[selectedHookIndex] || generatedContent?.socialMediaContent?.hookLine

  const contentForExport = () => {
    if (!generatedContent) return null
    return {
      ...generatedContent,
      socialMediaContent: {
        ...generatedContent.socialMediaContent,
        hookLine: activeHookLine,
      },
    }
  }

  const downloadAsWord = async () => {
    if (!generatedContent) return
    setDownloading(true)
    try {
      await generateRawContentWord(contentForExport(), { language: generatedContent.analysis?.detectedLanguage })
    } catch (err) {
      setError('Failed to generate Word document: ' + (err.message || 'unknown error'))
    } finally {
      setDownloading(false)
    }
  }

  const downloadAsPDF = () => {
    if (!generatedContent) return
    setDownloadingPdf(true)
    try {
      generateRawContentPDF(contentForExport(), { language: generatedContent.analysis?.detectedLanguage })
    } catch (err) {
      setError('Failed to generate PDF: ' + (err.message || 'unknown error'))
    } finally {
      setTimeout(() => setDownloadingPdf(false), 500)
    }
  }

  return (
    <div className="pg">
      <div className="mb-7">
        <h2 className="text-[22px] font-bold text-body tracking-tight mb-1">Raw Content Analyzer</h2>
        <p className="text-[14px] text-dim">Paste your raw content in ANY language and AI will transform it into a production-ready viral video script</p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Language / Platform / Tone / Duration Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="fl">Script Language</label>
            <select value={data.rawContentLanguage} onChange={(e) => onChange('rawContentLanguage', e.target.value)} className="fi-select">
              <option>Auto-Detect</option>
              <option>English</option>
              <option>Tamil</option>
              <option value="Thanglish (Tamil+English)">Thanglish</option>
              <option>Telugu</option>
              <option>Kannada</option>
              <option>Hindi</option>
            </select>
          </div>
          <div>
            <label className="fl">Platform</label>
            <select value={data.rawContentPlatform} onChange={(e) => onChange('rawContentPlatform', e.target.value)} className="fi-select">
              {Object.keys(PLATFORM_GUIDANCE).map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="fl">Content Goal</label>
            <select value={data.rawContentTone} onChange={(e) => onChange('rawContentTone', e.target.value)} className="fi-select">
              {Object.keys(TONE_GUIDANCE).map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="fl">Duration</label>
            <select value={data.rawContentDuration} onChange={(e) => onChange('rawContentDuration', e.target.value)} className="fi-select">
              {Object.keys(DURATION_GUIDANCE).map((d) => (
                <option key={d}>{d}</option>
              ))}
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
              Analyzing Content... (usually 20-40 seconds)
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Analyze & Generate Script
            </>
          )}
        </button>

        {error && <div className="text-[12px] text-bad bg-bad/10 border border-bad/30 rounded p-3">{error}</div>}
        {loading && <p className="text-[11px] text-dim text-center -mt-2">AI is studying your content and writing the full script, shot plan, and captions in your language. Please don't close this tab.</p>}

        {/* Generated Content Display */}
        {generatedContent && (
          <div className="mt-6 border border-accent/20 rounded-lg p-5 bg-accent/5 flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-[16px] font-bold text-body">✨ AI-Generated Viral Script Package</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={downloadAsPDF}
                  disabled={downloadingPdf}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-accent/40 text-accent rounded text-[12px] font-bold hover:bg-accent/10 disabled:opacity-50"
                >
                  {downloadingPdf ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
                  PDF
                </button>
                <button
                  onClick={downloadAsWord}
                  disabled={downloading}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white rounded text-[12px] font-bold hover:bg-accent/90 disabled:opacity-50"
                >
                  {downloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                  {downloading ? 'Building...' : 'Download .docx'}
                </button>
              </div>
            </div>

            {languageWarning && <div className="text-[12px] text-amber-600 bg-amber-500/10 border border-amber-500/30 rounded p-3">{languageWarning}</div>}

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

            {/* Hook Options */}
            {generatedContent.hookOptions?.length > 0 && (
              <div className="bg-surface rounded p-3 border border-wire">
                <h4 className="text-[13px] font-bold text-body mb-2">🪝 Hook Variations (pick one)</h4>
                <div className="flex flex-col gap-2">
                  {generatedContent.hookOptions.map((h, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedHookIndex(idx)}
                      className={`text-left text-[12px] p-2 rounded border ${selectedHookIndex === idx ? 'border-accent bg-accent/10 text-body' : 'border-wire/50 text-dim hover:border-accent/30'}`}
                    >
                      {selectedHookIndex === idx && <span className="text-accent font-bold mr-1">✓</span>}
                      {h}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-dim mt-2">Selected hook is used for the caption and in downloads/exports.</p>
              </div>
            )}

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
                  <div className="text-dim">{activeHookLine}</div>
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
