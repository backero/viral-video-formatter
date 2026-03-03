const FLUFF_ROWS = [
  { type: 'Motivation-only', example: 'Be consistent', why: 'No instruction, no action' },
  { type: 'Effort-based', example: 'Work hard, Maintain a healthy lifestyle', why: 'Non-specific, not teachable' },
  { type: 'Vague lifestyle', example: 'Eat clean', why: 'Undefined, subjective' },
  { type: 'Generic advice', example: 'Use the right products, Use good products, Take care of your hair properly', why: 'No criteria, no decision rule' },
]

export default function Page03_Value({ data, onChange }) {
  return (
    <div className="pg">
      <div className="mb-7">
        <h2 className="text-[22px] font-bold text-body tracking-tight mb-1">Value</h2>
        <p className="text-[14px] text-dim">The takeaway — what the viewer learns</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="fl">Value must be Measurable and Actionable</label>
          <textarea
            className="fi"
            placeholder="PASTE SAMPLE URL / DESCRIPTION / INFO&#10;EXAMPLES FOR HAIRFALL:&#10;- Wash scalp every 2–3 days&#10;- Avoid heavy oiling on dirty scalp&#10;- 1g protein needed per pound for hair fall reduction"
            value={data.value || ''}
            onChange={(e) => onChange('value', e.target.value)}
            rows={6}
          />
          <span className="fh">
            Examples for Hair Fall: Wash scalp every 2–3 days · Avoid heavy oiling on dirty scalp · 1g protein per pound for hair fall reduction
          </span>
        </div>

        <div className="info-box">
          <div className="text-caution font-bold uppercase tracking-wide text-[13px] mb-3">
            ⚠ If a value cannot be applied immediately — it's a FLUFF value. Never use these:
          </div>
          <div className="overflow-x-auto">
            <table className="fluff-table">
              <thead>
                <tr>
                  <th>Fluff Statement Type</th>
                  <th>Example</th>
                  <th>Why It Fails</th>
                </tr>
              </thead>
              <tbody>
                {FLUFF_ROWS.map((row) => (
                  <tr key={row.type}>
                    <td className="text-caution font-semibold">{row.type}</td>
                    <td>{row.example}</td>
                    <td className="text-dim">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
