import { PAGES } from '../constants/formData'

export default function ProgressBar({ current }) {
  const total = PAGES.length
  const pct = ((current - 1) / (total - 1)) * 100

  return (
    <div className="mb-7">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-[12px] text-dim font-medium uppercase tracking-wider">
          Step {current} of {total}
        </span>
        <span className="text-[13px] text-body font-semibold">
          {PAGES[current - 1]?.title}
        </span>
      </div>

      <div className="h-1.5 bg-raised rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-accent to-purple-400 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {PAGES.map((p) => (
          <div
            key={p.id}
            title={p.title}
            className={
              p.id < current
                ? 'w-2 h-2 rounded-full bg-accent/50 transition-all duration-200'
                : p.id === current
                ? 'w-2 h-2 rounded-full bg-accent scale-125 transition-all duration-200'
                : 'w-2 h-2 rounded-full bg-wire transition-all duration-200'
            }
          />
        ))}
      </div>
    </div>
  )
}
