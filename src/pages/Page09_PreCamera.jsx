export default function Page09_PreCamera({ data, onChange }) {
  const set = (key) => (e) => onChange(key, e.target.value)

  return (
    <div className="pg">
      <div className="mb-7">
        <h2 className="text-[22px] font-bold text-body tracking-tight mb-1">Pre-Camera / Shooting / Editing</h2>
        <p className="text-[14px] text-dim">Discussion with the technical team</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="fl">
            Ref Video from Content Creator for Shooting Visuals / Camera / Editors
          </label>
          <textarea
            className="fi"
            placeholder="Link of the video as to what can be included under video shoot"
            value={data.refVideoShoot || ''}
            onChange={set('refVideoShoot')}
            rows={4}
          />
          <span className="fh">Link of the video as to what can be included under video shoot</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="fl">Discussion Tech Team Prior Shoot and Remarks</label>
          <textarea
            className="fi"
            placeholder="Notes, remarks, technical requirements…"
            value={data.techDiscussion || ''}
            onChange={set('techDiscussion')}
            rows={5}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="fl">Discussion Completed Date and Time</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <input
                className="fi"
                type="date"
                value={data.discussionDate || ''}
                onChange={set('discussionDate')}
              />
              <span className="fh">Date</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                <input
                  className="fi flex-1"
                  type="time"
                  value={data.discussionTime || ''}
                  onChange={set('discussionTime')}
                />
                <select
                  className="fi-select w-20"
                  value={data.discussionAmPm || 'AM'}
                  onChange={set('discussionAmPm')}
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
              <span className="fh">Time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
