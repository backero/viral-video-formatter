import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import { STRUCTURE_TEMPLATES } from '../constants/formData'

export default function Page07_Script({ data, onChange }) {
  const selected = data.scriptStructure
  const tmpl = selected ? STRUCTURE_TEMPLATES[selected] : null
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('English')
  const [error, setError] = useState('')

  const generateScript = async () => {
    const apiKey = localStorage.getItem('openai_key')
    if (!apiKey) {
      setError('Please add your OpenAI API key in the Script Generator page first')
      return
    }

    if (!data.niche || !data.subNiche) {
      setError('Please fill in Niche and Sub-Niche details first')
      return
    }

    setLoading(true)
    setError('')

    try {
      const prompt = `You are a viral video script writer. Generate a ${language} script for:
- Niche: ${data.niche}
- Product: ${data.subNiche}
- Topic: ${data.topic || 'Not provided'}
- Structure: ${data.scriptStructure || 'Natural'}
- Value Prop: ${data.value || 'Not specified'}

Create a 7-9 line punchy script with dialogue and actions in ${language}.
Format: [ACTION] CHARACTER: "Dialogue" or similar.
Return ONLY the script, no explanations.`

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error?.message || `API error ${response.status}`)
      }

      const result = await response.json()
      const script = result.choices?.[0]?.message?.content || ''
      onChange('script', script)
    } catch (err) {
      setError(err.message || 'Failed to generate script')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pg">
      <div className="mb-7">
        <h2 className="text-[22px] font-bold text-body tracking-tight mb-1">Script</h2>
        <p className="text-[14px] text-dim">Write your script using the template below</p>
      </div>

      <div className="flex flex-col gap-5">
        {/* AI Script Generator */}
        <div className="bg-lifted border border-accent/20 rounded-lg p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-accent" />
            <span className="text-[13px] font-bold text-accent">AI Script Generator</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-dim uppercase">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="fi-select text-[12px]"
              >
                <option>English</option>
                <option>Tamil</option>
                <option value="Thanglish (Tamil+English)">Thanglish</option>
                <option>Telugu</option>
                <option>Kannada</option>
                <option>Hindi</option>
              </select>
            </div>
            <button
              onClick={generateScript}
              disabled={loading}
              className="h-fit self-end px-3 py-1.5 bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 disabled:opacity-50 rounded text-[12px] font-bold flex items-center gap-1.5 justify-center"
            >
              {loading ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={13} />
                  Generate
                </>
              )}
            </button>
          </div>

          {error && <div className="text-[11px] text-bad">{error}</div>}
        </div>

        {tmpl && (
          <div className="tmpl-card">
            <div className="tmpl-header">{selected} — Script Blueprint</div>
            <div className="p-4 flex flex-wrap gap-1.5">
              {tmpl.scriptSteps.map((s, i) => (
                <span
                  key={i}
                  className="bg-lifted border border-wire rounded-full px-3 py-1 text-[13px] text-dim"
                >
                  {i + 1}. {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="fl">What is your Script</label>
          <textarea
            className="fi"
            placeholder="SCRIPT / PASTE SAMPLE URL / DESCRIPTION / INFO&#10;&#10;Write your script here following the structure above…"
            value={data.script || ''}
            onChange={(e) => onChange('script', e.target.value)}
            rows={12}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="fl">Reference Video for the Script (if any)</label>
          <textarea
            className="fi"
            placeholder="Paste video URL or description"
            value={data.scriptRefVideo || ''}
            onChange={(e) => onChange('scriptRefVideo', e.target.value)}
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}
