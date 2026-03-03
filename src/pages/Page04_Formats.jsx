import { FORMAT_TIERS, SCRIPT_STRUCTURES, TIER_KEY, TIER_INFO } from '../constants/formData'

const TIER_COLORS = { S: 'tier-s', A: 'tier-a', B: 'tier-b', F: 'tier-f' }

export default function Page04_Formats({ data, onChange, errors }) {
  const tierKey = data.format ? TIER_KEY(data.format) : null
  const structures = tierKey && SCRIPT_STRUCTURES[tierKey] ? SCRIPT_STRUCTURES[tierKey] : []
  const info = tierKey ? TIER_INFO[tierKey] : null

  const handleFormatChange = (val) => {
    onChange('format', val)
    onChange('scriptStructure', '')
  }

  return (
    <div className="pg">
      <div className="mb-7">
        <h2 className="text-[22px] font-bold text-body tracking-tight mb-1">Formats</h2>
        <p className="text-[14px] text-dim">How the video is visually delivered on camera</p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Format tier */}
        <div className="flex flex-col gap-1.5">
          <label className="fl">
            What is your Format <span className="text-bad">*</span>
          </label>
          <div className="flex flex-col gap-2">
            {FORMAT_TIERS.map((tier) => {
              const key = TIER_KEY(tier.value)
              const selected = data.format === tier.value
              return (
                <label
                  key={tier.value}
                  className={`check-card ${selected ? 'on' : ''}`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={tier.value}
                    checked={selected}
                    onChange={() => handleFormatChange(tier.value)}
                  />
                  <div className="flex-1 flex items-center gap-2.5">
                    <span className={`tier-badge ${TIER_COLORS[key]}`}>{key}-TIER</span>
                    <span className="font-semibold text-[14px] text-body">
                      {tier.label.split('—')[1]?.trim()}
                    </span>
                  </div>
                </label>
              )
            })}
          </div>
          {errors?.format && <span className="fe">{errors.format}</span>}
        </div>

        {/* Tier info */}
        {info && (
          <div className="info-box-accent">
            <div className="font-bold text-body mb-1.5">{info.title}</div>
            <div className="whitespace-pre-line text-[14px] text-dim leading-relaxed">
              {info.body}
            </div>
          </div>
        )}

        {/* Script structure */}
        {structures.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <label className="fl">
              Choose the Script Structure <span className="text-bad">*</span>
            </label>
            <div className={`grid gap-2 ${structures.length > 3 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {structures.map((s) => {
                const selected = data.scriptStructure === s
                return (
                  <label key={s} className={`check-card ${selected ? 'on' : ''}`}>
                    <input
                      type="radio"
                      name="scriptStructure"
                      value={s}
                      checked={selected}
                      onChange={() => onChange('scriptStructure', s)}
                    />
                    <span className="text-[14px]">{s}</span>
                  </label>
                )
              })}
            </div>
            {errors?.scriptStructure && (
              <span className="fe">{errors.scriptStructure}</span>
            )}
          </div>
        )}

        {tierKey === 'F' && (
          <div className="bg-bad/6 border border-bad/30 rounded-xl p-5">
            <p className="text-bad font-semibold mb-1.5">F-TIER structures don't hold retention consistently.</p>
            <p className="text-dim text-[14px] leading-relaxed">
              Avoid: vague motivational talk · generic advice with no mechanism · "tips" with no cause→effect.<br />
              Consider choosing S-TIER, A-TIER, or B-TIER for better results.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
