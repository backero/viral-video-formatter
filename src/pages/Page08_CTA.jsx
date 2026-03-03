export default function Page08_CTA({ data, onChange }) {
  const set = (key) => (e) => onChange(key, e.target.value)
  const scriptDone = data.scriptCompleted === 'YES'

  return (
    <div className="pg">
      <div className="mb-7">
        <h2 className="text-[22px] font-bold text-body tracking-tight mb-1">CTA</h2>
        <p className="text-[14px] text-dim">Select and decide your Call to Action</p>
      </div>

      <div className="flex flex-col gap-5">
        {/* CTA guide */}
        <div className="info-box">
          <p className="font-bold text-body mb-2">What the placeholders mean</p>
          <p className="text-[14px] text-dim mb-2">
            Anywhere you see <code className="bg-lifted px-1.5 py-0.5 rounded text-[13px] text-body">(insert …)</code> replace it with your real details:
          </p>
          <ul className="flex flex-col gap-1 text-[14px] text-dim">
            <li><strong className="text-body">(insert before state)</strong> = problem situation (e.g. "dandruff + itchy scalp")</li>
            <li><strong className="text-body">(insert dream result)</strong> = desired outcome (e.g. "clean scalp feel" / "visible glow")</li>
            <li><strong className="text-body">(insert time frame)</strong> = "7 days / 14 days / 30 days"</li>
            <li><strong className="text-body">(insert method/framework/process)</strong> = the steps you taught in the video</li>
            <li><strong className="text-body">(insert freebie)</strong> = what you'll send (PDF, guide, routine, checklist)</li>
          </ul>
          <div className="mt-3 p-3 bg-lifted rounded-lg text-[13px] text-dim">
            <strong className="text-body">About "Comment X":</strong> X is usually a ManyChat keyword. If you don't use ManyChat, replace with "Click the link in bio" or "DM me 'GLOW'".
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="fl">What is your CTA</label>
          <textarea
            className="fi"
            placeholder="Write your call to action here…"
            value={data.cta || ''}
            onChange={set('cta')}
            rows={5}
          />
          <span className="fh">
            Every CTA must show value · Must lead the customer to your funnel · Connect through WhatsApp · Connect to the campaign URL
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="fl">Script Completed</label>
          <select className="fi-select" value={data.scriptCompleted || ''} onChange={set('scriptCompleted')}>
            <option value="">Please Select</option>
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
        </div>

        {scriptDone && (
          <div className="border-l-2 border-accent pl-4 flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="fl">
                Content Completed Date <span className="text-bad">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <input
                    className="fi"
                    type="date"
                    value={data.contentCompletedDate || ''}
                    onChange={set('contentCompletedDate')}
                  />
                  <span className="fh">Date</span>
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    className="fi"
                    type="time"
                    value={data.contentCompletedTime || ''}
                    onChange={set('contentCompletedTime')}
                  />
                  <span className="fh">Time</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
