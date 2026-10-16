import { useState } from "react";
import {
  Sparkles,
  X,
  Loader2,
  Key,
  Check,
  ChevronRight,
  FileText,
  Video,
  Scissors,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { generateFormScript } from "../utils/generateScript";

// Fields that will be filled by the generator
const FILLS = [
  { icon: FileText, label: "Script", field: "script", page: "Page 7", always: true },
  { icon: MessageSquare, label: "CTA", field: "cta", page: "Page 8", always: true },
  { icon: Video, label: "Shot Plan → Tech Discussion", field: "techDiscussion", page: "Page 9", always: true },
  { icon: Scissors, label: "Edit Instructions + AI Review → Editor Notes", field: "editorNotes", page: "Page 10", always: true },
  { icon: FileText, label: "Topic (only if currently empty)", field: "topic", page: "Page 2", always: false },
  { icon: FileText, label: "Value Proposition (only if currently empty)", field: "value", page: "Page 3", always: false },
];

export default function ScriptGenModal({ formData, onFill, onClose }) {
  const envKey = import.meta.env.VITE_ANTHROPIC_KEY || "";
  const [apiKey, setApiKey] = useState(
    envKey || localStorage.getItem("anthropic_key") || ""
  );
  const [showKey, setShowKey] = useState(!envKey && !localStorage.getItem("anthropic_key"));

  const [extra, setExtra] = useState({
    product: "",
    productDescription: "",
    capabilityPillars: "",
    audience: "",
    ctaKeyword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const setE = (key) => (e) =>
    setExtra((prev) => ({ ...prev, [key]: e.target.value }));

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setError("Please enter your Anthropic API key.");
      return;
    }
    if (!extra.product.trim()) {
      setError("Product / Service name is required.");
      return;
    }

    localStorage.setItem("anthropic_key", apiKey.trim());
    setLoading(true);
    setError("");

    try {
      const result = await generateFormScript(formData, extra, apiKey.trim());

      // Build update object — only overwrite topic/value if currently empty
      const updates = {};

      if (result.script) updates.script = result.script;
      if (result.cta) updates.cta = result.cta;
      if (result.shotPlan) updates.techDiscussion = result.shotPlan;
      if (result.editInstructions) updates.editorNotes = result.editInstructions;
      if (result.topic && !formData.topic?.trim()) updates.topic = result.topic;
      if (result.value && !formData.value?.trim()) updates.value = result.value;

      onFill(updates);
      setDone(true);
    } catch (err) {
      setError(err.message || "Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* ── Backdrop ─────────────────────────────────────────────────────── */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
    >
      <div className="w-full max-w-[580px] bg-surface border border-wire rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-wire shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-accent" />
            <span className="font-bold text-body text-[15px]">
              Generate Script with AI
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
              Claude
            </span>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-dim hover:text-body transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Body ─────────────────────────────────────────────────────── */}
        <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5">

          {/* What gets filled */}
          <div className="bg-lifted border border-wire rounded-xl p-4">
            <p className="text-[11px] font-bold text-dim uppercase tracking-widest mb-3">
              What will be auto-filled
            </p>
            <div className="flex flex-col gap-1.5">
              {FILLS.map((f) => {
                const skip = !f.always && formData[f.field]?.trim();
                return (
                  <div
                    key={f.field}
                    className={`flex items-center gap-2 text-[13px] ${skip ? "opacity-40" : ""}`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        skip
                          ? "border-wire"
                          : "border-ok bg-ok/15"
                      }`}
                    >
                      {!skip && (
                        <Check size={9} strokeWidth={3} className="text-ok" />
                      )}
                    </div>
                    <span className={skip ? "text-dim" : "text-body"}>
                      {f.label}
                    </span>
                    <span className="ml-auto text-[11px] text-dim font-medium">
                      {f.page}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-wire flex items-start gap-2 text-[12px] text-dim">
              <AlertCircle size={13} className="text-caution shrink-0 mt-0.5" />
              <span>
                <strong className="text-body">Hook section (Page 6) is skipped</strong> — that's for the founder to decide.
              </span>
            </div>
          </div>

          {/* Reading from form */}
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
            <p className="text-[11px] font-bold text-accent uppercase tracking-widest mb-2">
              Using from your form
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {[
                ["Niche", formData.niche],
                ["Sub-Niche", formData.subNiche],
                ["Format", formData.format?.split("=")[0]?.trim()],
                ["Structure", formData.scriptStructure],
                ["Company", formData.company],
              ].map(([label, val]) => (
                <div key={label} className="text-[12px]">
                  <span className="text-dim">{label}: </span>
                  <span className={val ? "text-body font-medium" : "text-dim/40 italic"}>
                    {val || "not set"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* API Key */}
          {showKey ? (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <Key size={13} className="text-accent" />
                <label className="fl text-[12px]">Anthropic API Key</label>
              </div>
              <input
                type="password"
                className="fi"
                placeholder="sk-ant-api03-…"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onBlur={() => { if (apiKey.trim()) setShowKey(false); }}
              />
              <span className="fh">Stored locally in your browser only.</span>
            </div>
          ) : (
            <div className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-1.5 text-ok">
                <Check size={14} />
                <span className="font-medium">API key connected</span>
              </div>
              <button
                onClick={() => setShowKey(true)}
                className="text-dim hover:text-body text-[12px] underline"
              >
                Change
              </button>
            </div>
          )}

          {/* ── Extra inputs ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-bold text-dim uppercase tracking-widest border-b border-wire pb-1.5">
              Additional Info
            </p>

            <div className="flex flex-col gap-1.5">
              <label className="fl">
                Product / Service Name <span className="text-bad">*</span>
              </label>
              <input
                className="fi"
                placeholder="e.g. HairGrow Serum, Protein Shake 2.0"
                value={extra.product}
                onChange={setE("product")}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="fl">Product Description</label>
              <textarea
                className="fi"
                rows={3}
                placeholder="Key ingredients, benefits, how it works, what makes it different…"
                value={extra.productDescription}
                onChange={setE("productDescription")}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="fl">Capability Pillars</label>
              <textarea
                className="fi"
                rows={3}
                placeholder="3–5 things that make this brand/product unique&#10;e.g. Clinically tested · Works in 14 days · No harmful chemicals"
                value={extra.capabilityPillars}
                onChange={setE("capabilityPillars")}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="fl">Target Audience</label>
                <input
                  className="fi"
                  placeholder="e.g. Women 25–40 with hairfall"
                  value={extra.audience}
                  onChange={setE("audience")}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="fl">CTA Keyword</label>
                <input
                  className="fi"
                  placeholder="e.g. GLOW, CLEAR, FIX"
                  value={extra.ctaKeyword}
                  onChange={setE("ctaKeyword")}
                />
                <span className="fh">Comment keyword for ManyChat</span>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-bad/10 border border-bad/30 rounded-xl px-4 py-3 text-bad text-[13px]">
              ⚠ {error}
            </div>
          )}

          {/* Success */}
          {done && (
            <div className="bg-ok/10 border border-ok/30 rounded-xl px-4 py-3 text-ok text-[13px] font-medium">
              ✓ Script generated and filled into your form. Review each section and save.
            </div>
          )}
        </div>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <div className="px-6 py-4 border-t border-wire flex gap-3 shrink-0">
          {done ? (
            <button
              onClick={onClose}
              className="btn-primary w-full justify-center gap-2"
            >
              <Check size={15} />
              Done — Review Your Form
            </button>
          ) : (
            <>
              <button
                onClick={onClose}
                disabled={loading}
                className="btn-ghost flex-1 justify-center"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="btn-primary flex-1 justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Sparkles size={15} />
                    Generate & Fill
                    <ChevronRight size={14} />
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
