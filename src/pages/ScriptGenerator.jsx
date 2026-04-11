import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  Sparkles,
  Copy,
  Check,
  Loader2,
  RefreshCw,
  Key,
  Video,
  Scissors,
  MessageSquare,
  FileText,
} from "lucide-react";
import {
  FORMAT_TIERS,
  SCRIPT_STRUCTURES,
  TIER_KEY,
  VIRAL_HOOKS,
  COMPANIES,
} from "../constants/formData";
import { generateScript } from "../utils/generateScript";

const TABS = [
  { label: "Script", icon: FileText },
  { label: "Shot Plan", icon: Video },
  { label: "Edit Plan", icon: Scissors },
  { label: "Caption", icon: MessageSquare },
];

const TIER_COLORS = {
  S: "tier-s",
  A: "tier-a",
  B: "tier-b",
  F: "tier-f",
};

export default function ScriptGenerator() {
  // ── API key ──────────────────────────────────────────────────────────────
  const envKey = import.meta.env.VITE_ANTHROPIC_KEY || "";
  const [apiKey, setApiKey] = useState(
    envKey || localStorage.getItem("anthropic_key") || "",
  );
  const [showKey, setShowKey] = useState(!envKey);

  // ── Inputs ───────────────────────────────────────────────────────────────
  const [inputs, setInputs] = useState({
    company: "",
    niche: "",
    subNiche: "",
    product: "",
    productDescription: "",
    capabilityPillars: "",
    value: "",
    audience: "",
    format: "",
    scriptStructure: "",
    hookType: "",
    ctaKeyword: "",
  });

  // ── Output ───────────────────────────────────────────────────────────────
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState("");

  // ── Helpers ───────────────────────────────────────────────────────────────
  const set = (key) => (e) =>
    setInputs((prev) => ({ ...prev, [key]: e.target.value }));

  const tierKey = inputs.format ? TIER_KEY(inputs.format) : null;
  const structures =
    tierKey && SCRIPT_STRUCTURES[tierKey] ? SCRIPT_STRUCTURES[tierKey] : [];

  const handleFormatChange = (val) => {
    setInputs((prev) => ({ ...prev, format: val, scriptStructure: "" }));
  };

  const handleCopy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(""), 2000);
    } catch {}
  };

  // ── Generate ─────────────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setError("Please enter your Anthropic API key.");
      return;
    }
    if (!inputs.niche.trim()) {
      setError("Niche is required.");
      return;
    }
    if (!inputs.product.trim()) {
      setError("Product / Service name is required.");
      return;
    }

    localStorage.setItem("anthropic_key", apiKey.trim());
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await generateScript(inputs, apiKey.trim());
      setResult(data);
      setActiveTab(0);
    } catch (err) {
      setError(err.message || "Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Shot plan copy text ──────────────────────────────────────────────────
  const shotText = (plan) =>
    plan
      .map(
        (s) =>
          `Shot ${s.shot} — ${s.type} | ${s.duration}\nSubject: ${s.subject}\nAction: ${s.action}\nCamera: ${s.cameraMove}\nScript: "${s.scriptLine}"`,
      )
      .join("\n\n");

  const editText = (e) =>
    [
      `PACING: ${e.pacing}`,
      `DURATION: ${e.totalDuration}`,
      `MUSIC: ${e.music}`,
      `COLOR GRADE: ${e.colorGrade}`,
      `\nCUTS:\n${(e.cuts || []).join("\n")}`,
      `\nTEXT OVERLAYS:\n${(e.textOverlays || []).join("\n")}`,
      `\nSOUND: ${e.soundDesign}`,
      `\nNOTES: ${e.specialNotes}`,
    ].join("\n");

  const captionText = (c) =>
    `${c.hookLine}\n\n${c.body}\n\n${c.cta}\n\n${(c.hashtags || []).join(" ")}`;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="bg-surface border-b border-wire sticky top-0 z-10 px-4">
        <div className="h-16 flex items-center gap-3">
          <Link
            to="/"
            className="text-dim hover:text-body transition-colors shrink-0"
          >
            <ChevronLeft size={22} />
          </Link>
          <div className="w-px h-6 bg-wire" />
          <Sparkles size={17} className="text-accent shrink-0" />
          <span className="text-[1rem] font-bold text-body tracking-tight">
            AI Script Generator
          </span>
          <span className="ml-2 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
            Powered by Claude
          </span>
        </div>
      </header>

      {/* ── Body: two-column ───────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>

        {/* ── LEFT: Inputs ─────────────────────────────────────────────── */}
        <div className="w-[380px] shrink-0 border-r border-wire overflow-y-auto flex flex-col">
          <div className="p-5 flex flex-col gap-5">

            {/* API Key */}
            <div
              className={`rounded-xl border p-4 flex flex-col gap-2 ${
                showKey
                  ? "bg-accent/5 border-accent/25"
                  : "bg-ok/5 border-ok/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Key size={13} className={showKey ? "text-accent" : "text-ok"} />
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider ${
                      showKey ? "text-accent" : "text-ok"
                    }`}
                  >
                    {showKey ? "Anthropic API Key" : "API Key Connected"}
                  </span>
                </div>
                {!showKey && (
                  <button
                    onClick={() => setShowKey(true)}
                    className="text-[11px] text-dim hover:text-body underline"
                  >
                    Change
                  </button>
                )}
              </div>
              {showKey && (
                <>
                  <input
                    type="password"
                    className="fi text-[13px]"
                    placeholder="sk-ant-api03-…"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    onBlur={() => {
                      if (apiKey.trim()) setShowKey(false);
                    }}
                  />
                  <p className="text-[11px] text-dim">
                    Stored in your browser only. Never sent to our servers.
                  </p>
                </>
              )}
            </div>

            {/* ── Section: Content ───────────────────────────────────── */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-dim uppercase tracking-widest border-b border-wire pb-1.5">
                Content
              </span>

              <div className="flex flex-col gap-1.5">
                <label className="fl">Company / Brand</label>
                <select
                  className="fi-select"
                  value={inputs.company}
                  onChange={set("company")}
                >
                  <option value="">Select company</option>
                  {COMPANIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="fl">
                    Niche <span className="text-bad">*</span>
                  </label>
                  <input
                    className="fi"
                    placeholder="e.g. Skincare"
                    value={inputs.niche}
                    onChange={set("niche")}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="fl">Sub-Niche</label>
                  <input
                    className="fi"
                    placeholder="e.g. Hairfall"
                    value={inputs.subNiche}
                    onChange={set("subNiche")}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="fl">
                  Product / Service <span className="text-bad">*</span>
                </label>
                <input
                  className="fi"
                  placeholder="e.g. HairGrow Serum"
                  value={inputs.product}
                  onChange={set("product")}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="fl">Product Description</label>
                <textarea
                  className="fi"
                  rows={3}
                  placeholder="Key ingredients, benefits, how it works…"
                  value={inputs.productDescription}
                  onChange={set("productDescription")}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="fl">Capability Pillars</label>
                <textarea
                  className="fi"
                  rows={3}
                  placeholder="3–5 things that make this product/brand unique&#10;e.g. Clinically tested · No sulphates · Works in 14 days"
                  value={inputs.capabilityPillars}
                  onChange={set("capabilityPillars")}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="fl">Value Proposition</label>
                <textarea
                  className="fi"
                  rows={2}
                  placeholder="Measurable result the viewer gets (e.g. reduce hairfall in 14 days)"
                  value={inputs.value}
                  onChange={set("value")}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="fl">Target Audience</label>
                <input
                  className="fi"
                  placeholder="e.g. Women 25–40 with hairfall issues"
                  value={inputs.audience}
                  onChange={set("audience")}
                />
              </div>
            </div>

            {/* ── Section: Format ────────────────────────────────────── */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-dim uppercase tracking-widest border-b border-wire pb-1.5">
                Format & Structure
              </span>

              {/* Format Tier */}
              <div className="flex flex-col gap-1.5">
                <label className="fl">Format Tier</label>
                <div className="flex flex-col gap-1.5">
                  {FORMAT_TIERS.map((tier) => {
                    const key = TIER_KEY(tier.value);
                    const selected = inputs.format === tier.value;
                    return (
                      <label
                        key={tier.value}
                        className={`check-card ${selected ? "on" : ""}`}
                      >
                        <input
                          type="radio"
                          name="gen-format"
                          value={tier.value}
                          checked={selected}
                          onChange={() => handleFormatChange(tier.value)}
                        />
                        <span
                          className={`tier-badge ${TIER_COLORS[key]} text-[10px] shrink-0`}
                        >
                          {key}
                        </span>
                        <span className="text-[13px]">
                          {tier.label.split("—")[1]?.trim()}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Script Structure */}
              {structures.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <label className="fl">Script Structure</label>
                  <select
                    className="fi-select"
                    value={inputs.scriptStructure}
                    onChange={set("scriptStructure")}
                  >
                    <option value="">Select structure</option>
                    {structures.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Hook Type */}
              <div className="flex flex-col gap-1.5">
                <label className="fl">Hook Type</label>
                <select
                  className="fi-select"
                  value={inputs.hookType}
                  onChange={set("hookType")}
                >
                  <option value="">Select hook type</option>
                  {VIRAL_HOOKS.map((h) => (
                    <option key={h.value} value={h.label}>
                      {h.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* CTA Keyword */}
              <div className="flex flex-col gap-1.5">
                <label className="fl">CTA Keyword</label>
                <input
                  className="fi"
                  placeholder="Comment keyword e.g. GLOW, CLEAR, FIX"
                  value={inputs.ctaKeyword}
                  onChange={set("ctaKeyword")}
                />
                <span className="fh">
                  Viewers will comment this word to trigger ManyChat / DM
                </span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-bad/10 border border-bad/30 rounded-xl px-4 py-3 text-bad text-[13px] leading-snug">
                ⚠ {error}
              </div>
            )}

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-[14px] gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating…
                </>
              ) : result ? (
                <>
                  <RefreshCw size={16} />
                  Regenerate
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate Script Package
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── RIGHT: Output ─────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* Empty state */}
          {!result && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center gap-5 text-center px-8">
              <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Sparkles size={32} className="text-accent" />
              </div>
              <div>
                <h2 className="text-[20px] font-bold text-body mb-2">
                  AI Script Generator
                </h2>
                <p className="text-dim text-[14px] max-w-md leading-relaxed">
                  Fill in your niche, product details, format, and hook on the
                  left. Claude will generate a complete humanized script, a
                  shot-by-shot shoot plan, editor instructions, and a ready-to-post caption.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-left max-w-sm w-full">
                {[
                  ["📝", "Script", "7–9 punchy lines, human tone"],
                  ["🎬", "Shot Plan", "Shot-by-shot with camera moves"],
                  ["✂️", "Edit Plan", "Cuts, overlays, music, grade"],
                  ["📱", "Caption", "Hook + body + hashtags"],
                ].map(([icon, title, desc]) => (
                  <div
                    key={title}
                    className="bg-surface border border-wire rounded-xl p-3"
                  >
                    <div className="text-lg mb-1">{icon}</div>
                    <div className="text-[13px] font-bold text-body">{title}</div>
                    <div className="text-[11px] text-dim">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Sparkles size={28} className="text-accent" />
                </div>
                <Loader2
                  size={20}
                  className="text-accent animate-spin absolute -bottom-1 -right-1 bg-canvas rounded-full"
                />
              </div>
              <p className="text-body font-semibold text-[15px]">
                Generating your script package…
              </p>
              <p className="text-dim text-[13px]">
                Writing script → planning shots → edit notes → caption
              </p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="flex-1 flex flex-col min-h-0">

              {/* Tab bar */}
              <div className="border-b border-wire px-5 flex gap-0 pt-2 shrink-0">
                {TABS.map((tab, i) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.label}
                      onClick={() => setActiveTab(i)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold border-b-2 transition-all ${
                        activeTab === i
                          ? "text-accent border-accent"
                          : "text-dim border-transparent hover:text-body"
                      }`}
                    >
                      <Icon size={13} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab content */}
              <div className="flex-1 overflow-y-auto p-6">

                {/* ── Tab 0: Script ───────────────────────────────────── */}
                {activeTab === 0 && result.script && (
                  <div className="max-w-xl flex flex-col gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-[17px] font-bold text-body">
                          Humanized Script
                        </h3>
                        <p className="text-dim text-[13px] mt-0.5">
                          {result.script.structure} · Est.{" "}
                          {result.script.estimatedDuration}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleCopy(
                            (result.script.lines || []).join("\n"),
                            "script",
                          )
                        }
                        className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 bg-lifted rounded-lg hover:bg-wire transition-colors shrink-0"
                      >
                        {copied === "script" ? (
                          <Check size={13} className="text-ok" />
                        ) : (
                          <Copy size={13} />
                        )}
                        {copied === "script" ? "Copied!" : "Copy All"}
                      </button>
                    </div>

                    <div className="flex flex-col gap-2">
                      {(result.script.lines || []).map((line, i) => (
                        <div key={i} className="flex gap-3 items-start group">
                          <span className="text-[11px] font-bold text-accent bg-accent/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p
                            className={`text-[16px] leading-snug font-medium flex-1 ${
                              i === (result.script.lines.length - 1)
                                ? "text-ok"
                                : "text-body"
                            }`}
                          >
                            {line}
                          </p>
                          <button
                            onClick={() => handleCopy(line, `line-${i}`)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                          >
                            {copied === `line-${i}` ? (
                              <Check size={12} className="text-ok" />
                            ) : (
                              <Copy size={12} className="text-dim" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Tab 1: Shot Plan ────────────────────────────────── */}
                {activeTab === 1 && result.shotPlan && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[17px] font-bold text-body">
                        Shot-by-Shot Plan
                      </h3>
                      <button
                        onClick={() =>
                          handleCopy(shotText(result.shotPlan), "shots")
                        }
                        className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 bg-lifted rounded-lg hover:bg-wire transition-colors"
                      >
                        {copied === "shots" ? (
                          <Check size={13} className="text-ok" />
                        ) : (
                          <Copy size={13} />
                        )}
                        {copied === "shots" ? "Copied!" : "Copy All"}
                      </button>
                    </div>

                    <div className="flex flex-col gap-3 max-w-2xl">
                      {result.shotPlan.map((shot, i) => (
                        <div
                          key={i}
                          className="bg-surface border border-wire rounded-xl overflow-hidden"
                        >
                          {/* Shot header */}
                          <div className="bg-lifted border-b border-wire px-4 py-2.5 flex items-center gap-3">
                            <span className="text-[11px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                              Shot {shot.shot}
                            </span>
                            <span className="text-[13px] font-bold text-body">
                              {shot.type}
                            </span>
                            <span className="ml-auto text-[12px] font-semibold text-dim bg-wire px-2 py-0.5 rounded-full">
                              {shot.duration}
                            </span>
                          </div>
                          {/* Shot body */}
                          <div className="p-4 flex flex-col gap-2.5">
                            <div className="grid grid-cols-2 gap-3 text-[13px]">
                              <div>
                                <span className="text-[10px] font-bold text-dim uppercase tracking-wider block mb-0.5">
                                  Subject
                                </span>
                                <span className="text-body">{shot.subject}</span>
                              </div>
                              <div>
                                <span className="text-[10px] font-bold text-dim uppercase tracking-wider block mb-0.5">
                                  Camera Move
                                </span>
                                <span className="text-body">
                                  {shot.cameraMove}
                                </span>
                              </div>
                            </div>
                            <div className="text-[13px]">
                              <span className="text-[10px] font-bold text-dim uppercase tracking-wider block mb-0.5">
                                Action
                              </span>
                              <span className="text-body">{shot.action}</span>
                            </div>
                            {shot.scriptLine && (
                              <div className="bg-accent/5 border border-accent/15 rounded-lg px-3 py-2 text-[13px] italic text-accent">
                                "{shot.scriptLine}"
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Tab 2: Edit Plan ────────────────────────────────── */}
                {activeTab === 2 && result.editInstructions && (
                  <div className="flex flex-col gap-5 max-w-2xl">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[17px] font-bold text-body">
                        Edit Instructions
                      </h3>
                      <button
                        onClick={() =>
                          handleCopy(
                            editText(result.editInstructions),
                            "edit",
                          )
                        }
                        className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 bg-lifted rounded-lg hover:bg-wire transition-colors"
                      >
                        {copied === "edit" ? (
                          <Check size={13} className="text-ok" />
                        ) : (
                          <Copy size={13} />
                        )}
                        {copied === "edit" ? "Copied!" : "Copy All"}
                      </button>
                    </div>

                    {/* Overview cards */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ["Pacing", result.editInstructions.pacing],
                        ["Total Duration", result.editInstructions.totalDuration],
                        ["Music", result.editInstructions.music],
                        ["Color Grade", result.editInstructions.colorGrade],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="bg-surface border border-wire rounded-xl p-4"
                        >
                          <div className="text-[10px] font-bold text-dim uppercase tracking-wider mb-1">
                            {label}
                          </div>
                          <div className="text-[13px] text-body leading-snug">
                            {value || "—"}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Cuts */}
                    {result.editInstructions.cuts?.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-bold text-dim uppercase tracking-widest mb-2">
                          Cuts
                        </h4>
                        <div className="flex flex-col gap-1.5">
                          {result.editInstructions.cuts.map((cut, i) => (
                            <div
                              key={i}
                              className="flex gap-2.5 items-start text-[13px] bg-surface border border-wire rounded-lg px-3 py-2.5"
                            >
                              <span className="text-accent font-bold shrink-0">
                                {i + 1}.
                              </span>
                              <span className="text-body">{cut}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Text Overlays */}
                    {result.editInstructions.textOverlays?.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-bold text-dim uppercase tracking-widest mb-2">
                          Text Overlays
                        </h4>
                        <div className="flex flex-col gap-1.5">
                          {result.editInstructions.textOverlays.map(
                            (overlay, i) => (
                              <div
                                key={i}
                                className="flex gap-2.5 items-start text-[13px] bg-lifted border border-wire rounded-lg px-3 py-2.5"
                              >
                                <span className="text-accent font-bold shrink-0">
                                  T{i + 1}
                                </span>
                                <span className="text-body">{overlay}</span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {/* Sound + Notes */}
                    {[
                      ["Sound Design", result.editInstructions.soundDesign],
                      ["Special Notes", result.editInstructions.specialNotes],
                    ].map(([label, value]) =>
                      value ? (
                        <div key={label}>
                          <h4 className="text-[11px] font-bold text-dim uppercase tracking-widest mb-2">
                            {label}
                          </h4>
                          <div className="text-[13px] text-body bg-surface border border-wire rounded-xl px-4 py-3 leading-relaxed">
                            {value}
                          </div>
                        </div>
                      ) : null,
                    )}
                  </div>
                )}

                {/* ── Tab 3: Caption ──────────────────────────────────── */}
                {activeTab === 3 && result.caption && (
                  <div className="max-w-lg flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[17px] font-bold text-body">
                        Social Media Caption
                      </h3>
                      <button
                        onClick={() =>
                          handleCopy(captionText(result.caption), "caption")
                        }
                        className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 bg-lifted rounded-lg hover:bg-wire transition-colors"
                      >
                        {copied === "caption" ? (
                          <Check size={13} className="text-ok" />
                        ) : (
                          <Copy size={13} />
                        )}
                        {copied === "caption" ? "Copied!" : "Copy Caption"}
                      </button>
                    </div>

                    {/* Preview card */}
                    <div className="bg-surface border border-wire rounded-xl p-5 flex flex-col gap-3">
                      <p className="text-[16px] font-bold text-body leading-snug">
                        {result.caption.hookLine}
                      </p>
                      <p className="text-[14px] text-body leading-relaxed whitespace-pre-line">
                        {result.caption.body}
                      </p>
                      <p className="text-[14px] font-semibold text-accent">
                        {result.caption.cta}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-wire">
                        {(result.caption.hashtags || []).map((tag, i) => (
                          <span
                            key={i}
                            className="text-[12px] text-accent bg-accent/10 px-2 py-0.5 rounded-md font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Raw ready-to-paste */}
                    <div className="bg-lifted border border-wire rounded-xl p-4">
                      <div className="text-[10px] font-bold text-dim uppercase tracking-wider mb-2">
                        Ready to Paste
                      </div>
                      <pre className="text-[12px] text-body whitespace-pre-wrap font-mono leading-relaxed">
                        {captionText(result.caption)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
