export default function FormNavigation({ current, total, onBack, onNext, onSubmit, isSubmitting }) {
  const isFirst = current === 1
  const isLast = current === total

  return (
    <div className="flex items-center justify-between mt-8 pt-5 border-t border-wire">
      <button
        type="button"
        className={`btn-ghost ${isFirst ? 'invisible' : ''}`}
        onClick={onBack}
        disabled={isFirst}
      >
        ← Back
      </button>

      <span className="text-[13px] text-dim">{current} / {total}</span>

      {isLast ? (
        <button
          type="button"
          className="btn-primary"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting…' : 'Submit ✓'}
        </button>
      ) : (
        <button
          type="button"
          className="btn-primary"
          onClick={onNext}
        >
          Next →
        </button>
      )}
    </div>
  )
}
