import { STRUCTURE_TEMPLATES } from "../constants/formData";

export default function Page05_ScriptStructure({ data }) {
  const selected = data.scriptStructure;
  const tmpl = selected ? STRUCTURE_TEMPLATES[selected] : null;

  if (!selected) {
    return (
      <div className="pg">
        <div className="mb-7">
          <h2 className="text-[22px] font-bold text-body tracking-tight mb-1">
            Script Structure
          </h2>
          <p className="text-[14px] text-dim">Template reference</p>
        </div>
        <div className="info-box text-center text-dim">
          <p>
            No structure selected. Please select your format and script
            structure above.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pg">
      <div className="mb-7">
        <h2 className="text-[22px] font-bold text-body tracking-tight mb-1">
          Script Structure
        </h2>
        <p className="text-[14px] text-dim">
          Reference template for:{" "}
          <strong className="text-accent">{selected}</strong>
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {tmpl && (
          <div className="tmpl-card">
            <div className="tmpl-header">{selected}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:divide-x divide-wire">
              <div className="p-5">
                <h4 className="text-[12px] font-semibold text-dim uppercase tracking-wider mb-3">
                  Structure Outline
                </h4>
                <ul className="flex flex-col gap-2">
                  {tmpl.steps.map((s, i) => (
                    <li
                      key={i}
                      className="text-[14px] text-body leading-snug flex gap-2"
                    >
                      <span className="text-accent font-bold min-w-[18px]">
                        {i + 1}.
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5">
                <h4 className="text-[12px] font-semibold text-dim uppercase tracking-wider mb-3">
                  Script Blueprint
                </h4>
                <ul className="flex flex-col gap-2">
                  {tmpl.scriptSteps.map((s, i) => (
                    <li
                      key={i}
                      className="text-[14px] text-body leading-snug flex gap-2"
                    >
                      <span className="text-accent font-bold min-w-[18px]">
                        {i + 1}.
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {tmpl?.example && (
          <div className="tmpl-card">
            <div className="tmpl-header">Mini Example (Skincare niche)</div>
            <div className="p-5 whitespace-pre-line italic text-dim text-[15px] leading-relaxed">
              {tmpl.example}
            </div>
          </div>
        )}

        <div className="info-box">
          <p className="text-[14px] text-dim">
            <strong className="text-body">Tip:</strong> Each sentence in your
            script should be 1 short sentence. No filler. Every line must earn
            its place — trigger, reason, or bridge to next beat.
          </p>
        </div>
      </div>
    </div>
  );
}
