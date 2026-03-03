import { COMPANIES } from '../constants/formData'

export default function Page01_Details({ data, onChange, errors }) {
  const set = (key) => (e) => onChange(key, e.target.value)

  return (
    <div className="pg">
      <div className="mb-7">
        <h2 className="text-[22px] font-bold text-body tracking-tight mb-1">Detail Page</h2>
        <p className="text-[14px] text-dim">Enter creator, actor, and project details</p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Start Date */}
        <div className="flex flex-col gap-1.5">
          <label className="fl">Start Date of the Content</label>
          <input
            className="fi"
            type="date"
            value={data.startDate || ''}
            onChange={set('startDate')}
          />
          <span className="fh">When did you start?</span>
        </div>

        {/* Creator Name */}
        <div className="flex flex-col gap-1.5">
          <label className="fl">Name of the Creator</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <input
                className="fi"
                type="text"
                placeholder="First Name"
                value={data.creatorFirst || ''}
                onChange={set('creatorFirst')}
              />
              <span className="fh">First Name</span>
            </div>
            <div className="flex flex-col gap-1">
              <input
                className="fi"
                type="text"
                placeholder="Department"
                value={data.creatorDept || ''}
                onChange={set('creatorDept')}
              />
              <span className="fh">Department</span>
            </div>
          </div>
        </div>

        {/* Actor Name */}
        <div className="flex flex-col gap-1.5">
          <label className="fl">Name of the Actor</label>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <input
                className="fi"
                type="text"
                placeholder="First Name"
                value={data.actorFirst || ''}
                onChange={set('actorFirst')}
              />
              <span className="fh">First Name</span>
            </div>
            <div className="flex flex-col gap-1">
              <input
                className="fi"
                type="text"
                placeholder="Department"
                value={data.actorDept || ''}
                onChange={set('actorDept')}
              />
              <span className="fh">Department</span>
            </div>
          </div>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-1.5">
          <label className="fl">Which Company / Brand is the Video For</label>
          <select
            className={`fi-select ${errors?.company ? 'fi-err' : ''}`}
            value={data.company || ''}
            onChange={set('company')}
          >
            <option value="">Please Select</option>
            {COMPANIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors?.company && <span className="fe">{errors.company}</span>}
        </div>
      </div>
    </div>
  )
}
