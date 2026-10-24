export default function Page00_FormMethod({ data, onChange }) {
  return (
    <div className="pg">
      <div className="mb-7">
        <h2 className="text-[22px] font-bold text-body tracking-tight mb-1">Choose Your Method</h2>
        <p className="text-[14px] text-dim">How would you like to create your viral video script?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Traditional Form Method */}
        <button
          onClick={() => onChange("formMethod", "traditional")}
          className={`p-5 rounded-lg border-2 text-left transition-all ${
            data.formMethod === "traditional"
              ? "border-accent bg-accent/10"
              : "border-wire hover:border-accent/40"
          }`}
        >
          <div className="text-[16px] font-bold text-body mb-2">📋 Traditional Form</div>
          <p className="text-[13px] text-dim">
            Fill out a detailed form step-by-step with creator details, niche, format, hook, script, and more. Perfect for planning and documentation.
          </p>
          <div className="mt-3 text-[12px] text-accent font-semibold">
            {data.formMethod === "traditional" ? "✓ Selected" : "Click to select"}
          </div>
        </button>

        {/* Raw Content Method */}
        <button
          onClick={() => onChange("formMethod", "rawContent")}
          className={`p-5 rounded-lg border-2 text-left transition-all ${
            data.formMethod === "rawContent"
              ? "border-accent bg-accent/10"
              : "border-wire hover:border-accent/40"
          }`}
        >
          <div className="text-[16px] font-bold text-body mb-2">✨ Raw Content Analysis</div>
          <p className="text-[13px] text-dim">
            Paste any raw content (blog post, caption, script) and let AI transform it into a complete viral video script with shot plan, captions, and more.
          </p>
          <div className="mt-3 text-[12px] text-accent font-semibold">
            {data.formMethod === "rawContent" ? "✓ Selected" : "Click to select"}
          </div>
        </button>
      </div>

      <div className="mt-8 p-4 rounded-lg bg-accent/5 border border-accent/20">
        <p className="text-[12px] text-dim">
          💡 <span className="font-semibold text-body">Tip:</span> You can change this later if needed. Both methods save your progress automatically.
        </p>
      </div>
    </div>
  )
}
