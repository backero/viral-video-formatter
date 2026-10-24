import { useState } from 'react'
import { Sparkles, Loader2, Zap, FileText, Copy, Download, X } from 'lucide-react'
import { STRUCTURE_TEMPLATES } from '../constants/formData'
import { generateTraditionalScript } from '../utils/generateTraditionalScript'
import { generateCompleteProductionBrief } from '../utils/enhancedScriptGenerator'

export default function Page07_Script({ data, onChange }) {
  const selected = data.scriptStructure
  const tmpl = selected ? STRUCTURE_TEMPLATES[selected] : null
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('English')
  const [error, setError] = useState('')
  const [generatedBrief, setGeneratedBrief] = useState(null)
  const [showBrief, setShowBrief] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateAutoScript = () => {
    // Auto-generate based on Traditional Form selections (Pages 1-6)
    if (!data.topic || !data.format || !data.viralHook) {
      setError('Please fill in Topic, Format, and Hook Type first')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = generateTraditionalScript(data)
      onChange('script', result.script)
      setError('')
    } catch (err) {
      setError(err.message || 'Failed to generate script')
    } finally {
      setLoading(false)
    }
  }

  const generateScript = async () => {
    // AI-powered script generation via backend API
    if (!data.topic) {
      setError('Please fill in Topic first')
      return
    }

    setLoading(true)
    setError('')

    try {
      const prompt = `You are a viral video script writer. Generate a ${language} script for:
- Topic: ${data.topic}
- Niche: ${data.niche || 'Not specified'}
- Format: ${data.format || 'Natural'}
- Hook Type: ${data.viralHook || 'Natural'}
- Value Prop: ${data.value || 'Not specified'}

Create a complete 25-second viral video script with:
1. Hook (0-3s) - Grab attention
2. Problem (3-8s) - Show the pain point
3. Solution (8-14s) - Reveal the answer
4. Proof (14-18s) - Show it works with numbers
5. Social Proof (18-22s) - Add credibility
6. CTA (22-25s) - Call to action

Format: [ACTION] Description or [TIME] Character: "Dialogue"
Include camera angles, graphics, and timing for each beat.
Return ONLY the script with production notes, no explanations.`

      const response = await fetch('/api/generateScript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || `API error ${response.status}`)
      }

      const result = await response.json()
      const script = result.content || ''
      onChange('script', script)
    } catch (err) {
      setError(err.message || 'Failed to generate script')
    } finally {
      setLoading(false)
    }
  }

  const generateFullBrief = () => {
    // Generate complete production brief with hooks, dialogues, camera angles, editor notes, etc.
    if (!data.topic || !data.format || !data.viralHook) {
      setError('Please fill in Topic, Format, and Hook Type first')
      return
    }

    setLoading(true)
    setError('')

    try {
      console.log('Generating brief for:', data)
      const brief = generateCompleteProductionBrief(data)
      console.log('Brief generated:', brief)
      setGeneratedBrief(brief)
      setShowBrief(true)
      setError('')
    } catch (err) {
      console.error('Error generating brief:', err)
      setError(err.message || 'Failed to generate production brief')
    } finally {
      setLoading(false)
    }
  }

  const handleCopyBrief = async () => {
    if (!generatedBrief) return
    try {
      await navigator.clipboard.writeText(JSON.stringify(generatedBrief, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      setError('Failed to copy to clipboard')
    }
  }

  // Modal for viewing generated brief
  if (showBrief && generatedBrief) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '1rem',
        overflowY: 'auto'
      }}>
        <div style={{
          backgroundColor: '#1a1a1a',
          border: '2px solid #7c3aed',
          borderRadius: '1rem',
          maxWidth: '56rem',
          width: '100%',
          maxHeight: '90vh',
          minHeight: '400px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(124, 58, 237, 0.3)'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem',
            borderBottom: '1px solid #333',
            position: 'sticky',
            top: 0,
            backgroundColor: '#1a1a1a'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} style={{ color: '#7c3aed' }} />
              <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#fff' }}>Complete Production Brief</h2>
            </div>
            <button
              onClick={() => setShowBrief(false)}
              style={{
                padding: '0.25rem',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#999'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
            <div style={{
              backgroundColor: '#222',
              border: '1px solid #333',
              borderRadius: '0.5rem',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <h3 style={{ fontWeight: 'bold', color: '#fff', marginBottom: '0.75rem' }}>Production Brief Summary</h3>
              <pre style={{
                fontSize: '0.75rem',
                whiteSpace: 'pre-wrap',
                color: '#999',
                fontFamily: 'monospace',
                overflowX: 'auto',
                maxHeight: '24rem'
              }}>
                {JSON.stringify(generatedBrief, null, 2)}
              </pre>
            </div>

            {/* Script Beats */}
            {generatedBrief.scriptBeats && (
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>Script Beats</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {generatedBrief.scriptBeats.slice(0, 6).map((beat, i) => (
                    <div key={i} style={{
                      backgroundColor: '#222',
                      border: '1px solid #333',
                      borderRadius: '0.25rem',
                      padding: '0.75rem'
                    }}>
                      <div style={{ fontWeight: 'bold', fontSize: '0.875rem', color: '#7c3aed' }}>Beat {i + 1}: {beat.beat}</div>
                      <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.25rem' }}>⏱️ {beat.timing}</div>
                      {beat.dialogue && <div style={{ fontSize: '0.75rem', color: '#fff', marginTop: '0.25rem' }}>💬 {beat.dialogue}</div>}
                      {beat.cameraAngle && <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.25rem' }}>📷 {beat.cameraAngle}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            borderTop: '1px solid #333',
            padding: '1.5rem',
            display: 'flex',
            gap: '0.75rem'
          }}>
            <button
              onClick={handleCopyBrief}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                backgroundColor: 'rgba(124, 58, 237, 0.2)',
                border: '1px solid #7c3aed',
                color: '#7c3aed',
                borderRadius: '0.25rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <Copy size={16} />
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            <button
              onClick={() => setShowBrief(false)}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                backgroundColor: '#222',
                border: '1px solid #333',
                color: '#fff',
                borderRadius: '0.25rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pg">
      <div className="mb-7">
        <h2 className="text-[22px] font-bold text-body tracking-tight mb-1">Script</h2>
        <p className="text-[14px] text-dim">Write your script using the template below</p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Script Generation Options */}
        <div className="bg-lifted border border-accent/20 rounded-lg p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-accent" />
            <span className="text-[13px] font-bold text-accent">Script Generation</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Option 1: Auto-Generate from Form */}
            <button
              onClick={generateAutoScript}
              disabled={loading || !data.topic || !data.format || !data.viralHook}
              className="px-3 py-2.5 bg-ok/10 border border-ok/30 text-ok hover:bg-ok/20 disabled:opacity-50 rounded text-[12px] font-bold flex items-center gap-1.5 justify-center flex-col"
              title="Generate script instantly based on your form selections"
            >
              {loading ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap size={13} />
                  Auto-Generate
                </>
              )}
              <span className="text-[10px] font-normal opacity-75 text-ok">(Instant)</span>
            </button>

            {/* Option 2: AI-Powered Generate */}
            <button
              onClick={generateScript}
              disabled={loading || !data.topic}
              className="px-3 py-2.5 bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 disabled:opacity-50 rounded text-[12px] font-bold flex items-center gap-1.5 justify-center flex-col"
              title="Generate script using AI with enhanced dialogue"
            >
              {loading ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={13} />
                  AI-Powered
                </>
              )}
              <span className="text-[10px] font-normal opacity-75 text-accent">(Enhanced)</span>
            </button>

            {/* Option 3: Generate Full Production Brief */}
            <button
              onClick={generateFullBrief}
              disabled={loading || !data.topic || !data.format || !data.viralHook}
              className="px-3 py-2.5 bg-purple-500/10 border border-purple-500/30 text-purple-500 hover:bg-purple-500/20 disabled:opacity-50 rounded text-[12px] font-bold flex items-center gap-1.5 justify-center flex-col"
              title="Generate complete production brief with camera angles, editor notes, hooks, and more"
            >
              {loading ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText size={13} />
                  Full Brief
                </>
              )}
              <span className="text-[10px] font-normal opacity-75 text-purple-500">(Complete)</span>
            </button>
          </div>

          {error && <div className="text-[11px] text-bad bg-bad/10 border border-bad/30 rounded px-2 py-1.5">{error}</div>}

          <p className="text-[11px] text-dim">
            ⚡ <strong>Auto-Generate:</strong> Instant script<br/>
            ✨ <strong>AI-Powered:</strong> Enhanced dialogue<br/>
            📄 <strong>Full Brief:</strong> Complete production guide with all details
          </p>
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
