import { PRE_SHOOT_APPROVAL_OPTIONS } from '../constants/formData'

export default function Page10_Editor({ data, onChange }) {
  const set = (key) => (e) => onChange(key, e.target.value)

  const toggleApproval = (val) => {
    const arr = data.preShootApproval || []
    onChange('preShootApproval', arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val])
  }

  return (
    <div className="pg">
      <div className="mb-7">
        <h2 className="text-[22px] font-bold text-body tracking-tight mb-1">Editor</h2>
        <p className="text-[14px] text-dim">Comments from the editor</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="fl">Editor Notes / Reference</label>
          <textarea
            className="fi"
            placeholder="Editor reference if anything needed…"
            value={data.editorNotes || ''}
            onChange={set('editorNotes')}
            rows={5}
          />
          <span className="fh">Editor reference if anything needed</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="fl">Pre-Shoot Script Approval</label>
          <div className="flex flex-col gap-1.5">
            {PRE_SHOOT_APPROVAL_OPTIONS.map((opt) => {
              const checked = (data.preShootApproval || []).includes(opt)
              return (
                <label key={opt} className={`check-card ${checked ? 'on' : ''}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleApproval(opt)}
                  />
                  <span>{opt}</span>
                </label>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="fl">Date for Shoot</label>
          <input
            className="fi max-w-[240px]"
            type="date"
            value={data.shootDate || ''}
            onChange={set('shootDate')}
          />
        </div>
      </div>
    </div>
  )
}
