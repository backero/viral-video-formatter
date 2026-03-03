import { STRUCTURE_TEMPLATES } from '../constants/formData'

export default function Page07_Script({ data, onChange }) {
  const selected = data.scriptStructure
  const tmpl = selected ? STRUCTURE_TEMPLATES[selected] : null

  return (
    <div className="pg">
      <div className="mb-7">
        <h2 className="text-[22px] font-bold text-body tracking-tight mb-1">Script</h2>
        <p className="text-[14px] text-dim">Write your script using the template below</p>
      </div>

      <div className="flex flex-col gap-5">
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
