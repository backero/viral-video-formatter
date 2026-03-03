import { TOPIC_CHECKBOXES } from '../constants/formData'

export default function Page02_NicheTopic({ data, onChange, errors }) {
  const set = (key) => (e) => onChange(key, e.target.value)

  const toggleCheck = (key, val) => {
    const arr = data[key] || []
    onChange(key, arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val])
  }

  return (
    <div className="pg">
      <div className="mb-7">
        <h2 className="text-[22px] font-bold text-body tracking-tight mb-1">Niche / Sub-Niche / Topic</h2>
        <p className="text-[14px] text-dim">The subject — what the video is about</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="fl">What is your Niche</label>
          <input
            className="fi"
            type="text"
            placeholder="e.g. Skincare, Fitness, Finance…"
            value={data.niche || ''}
            onChange={set('niche')}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="fl">What is your Sub-Niche</label>
          <input
            className="fi"
            type="text"
            placeholder="e.g. Acne treatment, Weight loss for beginners…"
            value={data.subNiche || ''}
            onChange={set('subNiche')}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="fl">
            What is your Topic — Decide what the video is about (Broad / Niche)
            <span className="text-bad ml-1">*</span>
          </label>
          <textarea
            className={`fi ${errors?.topic ? 'fi-err' : ''}`}
            placeholder="PASTE SAMPLE URL / DESCRIPTION / INFO / QUESTION — e.g. Hair fall"
            value={data.topic || ''}
            onChange={set('topic')}
            rows={4}
          />
          <span className="fh">EXAMPLE: Hair fall</span>
          {errors?.topic && <span className="fe">{errors.topic}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="fl">Does the topic create any of the below?</label>
          <div className="flex flex-col gap-1.5">
            {TOPIC_CHECKBOXES.map((opt) => {
              const checked = (data.topicCheckboxes || []).includes(opt)
              return (
                <label
                  key={opt}
                  className={`check-card ${checked ? 'on' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCheck('topicCheckboxes', opt)}
                  />
                  <span>{opt}</span>
                </label>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
