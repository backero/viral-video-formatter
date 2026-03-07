import { useState, useRef } from "react";
import { VIRAL_HOOKS, PHYSIOLOGICAL_FACTORS } from "../constants/formData";

export default function Page06_Hook({ data, onChange, errors }) {
  const [otherHook, setOtherHook] = useState(data.viralHookOther || "");
  const fileInputRef = useRef(null);

  const set = (key) => (e) => onChange(key, e.target.value);

  const toggleFactor = (val) => {
    const arr = data.physiologicalFactors || [];
    onChange(
      "physiologicalFactors",
      arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val],
    );
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    onChange("visualHookFiles", [...(data.visualHookFiles || []), ...files]);
  };

  const removeFile = (i) => {
    const files = [...(data.visualHookFiles || [])];
    files.splice(i, 1);
    onChange("visualHookFiles", files);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="pg">
      <div className="mb-7">
        <h2 className="text-[22px] font-bold text-body tracking-tight mb-1">
          Hook
        </h2>
        <p className="text-[14px] text-dim">
          Grab attention in the first 1–3 seconds
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Viral hook type */}
        <div className="flex flex-col gap-1.5">
          <label className="fl">
            Viral Hook Type / Framework <span className="text-bad">*</span>
          </label>
          <div className="flex flex-col gap-2">
            {VIRAL_HOOKS.map((h) => {
              const selected = data.viralHook === h.value;
              return (
                <label
                  key={h.value}
                  className={`hook-card ${selected ? "on" : ""}`}
                >
                  <input
                    type="radio"
                    name="viralHook"
                    value={h.value}
                    checked={selected}
                    onChange={() => {
                      onChange("viralHook", h.value);
                      onChange("viralHookOther", "");
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[14px] text-body leading-snug">
                      {h.label}
                    </div>
                    <div className="text-[13px] text-dim mt-0.5">{h.desc}</div>
                    <div className="text-[12px] text-ghost mt-1 italic">
                      Eg — {h.eg}
                    </div>
                  </div>
                </label>
              );
            })}

            {/* Other */}
            <label
              className={`hook-card ${data.viralHook === "other" ? "on" : ""}`}
            >
              <input
                type="radio"
                name="viralHook"
                value="other"
                checked={data.viralHook === "other"}
                onChange={() => onChange("viralHook", "other")}
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[14px] text-body">Other</div>
                {data.viralHook === "other" && (
                  <input
                    type="text"
                    className="fi mt-2"
                    placeholder="Please type another option here"
                    value={otherHook}
                    onChange={(e) => {
                      setOtherHook(e.target.value);
                      onChange("viralHookOther", e.target.value);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </div>
            </label>
          </div>
          {errors?.viralHook && <span className="fe">{errors.viralHook}</span>}
        </div>

        <hr className="border-wire" />

        {/* Visual hook */}
        <div className="flex flex-col gap-1.5">
          <label className="fl">
            Visual Hook — Action <span className="text-bad">*</span>
          </label>
          <textarea
            className={`fi ${errors?.visualHook ? "fi-err" : ""}`}
            placeholder="PASTE SAMPLE URL / DESCRIPTION / INFO&#10;Must show contrast, motion, result, or disruption instantly"
            value={data.visualHook || ""}
            onChange={set("visualHook")}
            rows={3}
          />
          <span className="fh">
            Must show contrast, motion, result, or disruption instantly
          </span>
          {errors?.visualHook && (
            <span className="fe">{errors.visualHook}</span>
          )}
        </div>

        {/* File upload */}
        <div className="flex flex-col gap-1.5">
          <label className="fl">File Upload — For Visual Hook</label>
          <div
            className="file-drop"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.rtf,.html,.zip,.mp3,.wma,.mpg,.flv,.avi,.jpg,.jpeg,.png,.gif"
              onChange={handleFiles}
              className="hidden"
            />
            <div className="text-2xl mb-2">📎</div>
            <div className="text-[14px] text-body font-medium">
              Drag and drop files here or click to browse
            </div>
            <div className="text-[12px] text-dim mt-1">
              Max 10 MB · PDF, DOC, JPG, PNG, MP4, AVI and more
            </div>
          </div>
          {(data.visualHookFiles || []).length > 0 && (
            <div className="flex flex-col gap-1.5 mt-1">
              {data.visualHookFiles.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 py-2 bg-raised border border-wire rounded-lg"
                >
                  <span className="flex-1 text-[13px] text-body truncate">
                    {f.name}
                  </span>
                  <span className="text-[12px] text-dim">
                    {formatSize(f.size)}
                  </span>
                  <button
                    type="button"
                    className="text-dim hover:text-bad transition-colors text-[13px]"
                    onClick={() => removeFile(i)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Written hook */}
        <div className="flex flex-col gap-1.5">
          <label className="fl">
            Written Hook <span className="text-bad">*</span>
          </label>
          <textarea
            className={`fi ${errors?.writtenHook ? "fi-err" : ""}`}
            placeholder="PASTE SAMPLE URL / DESCRIPTION / INFO"
            value={data.writtenHook || ""}
            onChange={set("writtenHook")}
            rows={3}
          />
          <span className="fh">
            BIG, Bold — Can it be read while scrolling? Readable in &lt;1 second
          </span>
          {errors?.writtenHook && (
            <span className="fe">{errors.writtenHook}</span>
          )}
        </div>

        {/* Audio hook */}
        <div className="flex flex-col gap-1.5">
          <label className="fl">
            Audio Hook <span className="text-bad">*</span>
          </label>
          <textarea
            className={`fi ${errors?.audioHook ? "fi-err" : ""}`}
            placeholder="PASTE SAMPLE URL / DESCRIPTION / INFO"
            value={data.audioHook || ""}
            onChange={set("audioHook")}
            rows={3}
          />
          <span className="fh">
            Must reinforce outcome — does the spoken line add urgency, mistake,
            or curiosity?
          </span>
          {errors?.audioHook && <span className="fe">{errors.audioHook}</span>}
        </div>

        <hr className="border-wire" />

        {/* Physiological factors */}
        <div className="flex flex-col gap-1.5">
          <label className="fl">
            What does the Hook Trigger / Physiological Factors{" "}
            <span className="text-bad">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PHYSIOLOGICAL_FACTORS.map((f) => {
              const checked = (data.physiologicalFactors || []).includes(f);
              return (
                <label key={f} className={`check-card ${checked ? "on" : ""}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleFactor(f)}
                  />
                  <span>{f}</span>
                </label>
              );
            })}
          </div>
          {errors?.physiologicalFactors && (
            <span className="fe">{errors.physiologicalFactors}</span>
          )}
        </div>
      </div>
    </div>
  );
}
