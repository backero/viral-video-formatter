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
  COMPANIES,
} from "../constants/formData";
import { generateFormScript } from "../utils/generateScript";

const TABS = [
  { key: "script",           label: "Script",            icon: FileText },
  { key: "shotPlan",         label: "Shot Plan",         icon: Video },
  { key: "editInstructions", label: "Edit Instructions", icon: Scissors },
  { key: "cta",              label: "CTA & Caption",     icon: MessageSquare },
];

const TIER_COLORS = { S: "tier-s", A: "tier-a", B: "tier-b", F: "tier-f" };

export default function ScriptGenerator() {
  const envKey = import.meta.env.VITE_OPENAI_KEY || "";
  const [apiKey, setApiKey] = useState(envKey || localStorage.getItem("openai_key") || "");
  const [showKey, setShowKey] = useState(!envKey && !localStorage.getItem("openai_key"));

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
    ctaKeyword: "",
    language: "English",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState("");

  const set = (key) => (e) => setInputs((prev) => ({ ...prev, [key]: e.target.value }));

  const tierKey = inputs.format ? TIER_KEY(inputs.format) : null;
  const structures = tierKey && SCRIPT_STRUCTURES[tierKey] ? SCRIPT_STRUCTURES[tierKey] : [];

  const handleFormatChange = (val) => setInputs((prev) => ({ ...prev, format: val, scriptStructure: "" }));

  const handleCopy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(""), 2000);
    } catch {}
  };

  const handleGenerate = async () => {
    if (!apiKey.trim()) { setError("Please enter your OpenAI API key."); return; }
    if (!inputs.niche.trim()) { setError("Niche is required."); return; }
    if (!inputs.product.trim()) { setError("Product / Service name is required."); return; }

    localStorage.setItem("openai_key", apiKey.trim());
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Pass all inputs as both formData and extraInputs so buildFormPrompt gets everything
      const data = await generateFormScript(inputs, {}, apiKey.trim());
      setResult(data);
      setActiveTab(0);
    } catch (err) {
      setError(err.message || "Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Parse script string into lines array
  const scriptLines = result?.script
    ? result.script.split("\n").filter((l) => l.trim())
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="bg-surface border-b border-wire sticky top-0 z-10 px-4">
        <div className="h-16 flex items-center gap-3">
          <Link to="/" className="text-dim hover:text-body transition-colors shrink-0">
            <ChevronLeft size={22} />
          </Link>
          <div className="w-px h-6 bg-wire" />
          <Sparkles size={17} className="text-accent shrink-0" />
          <span className="text-[1rem] font-bold text-body tracking-tight">AI Script Generator</span>
          <span className="ml-2 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
            Powered by Claude
          </span>
        </div>
      </header>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>

        {/* ── LEFT: Inputs ─────────────────────────────────────────────── */}
        <div className="w-[380px] shrink-0 border-r border-wire overflow-y-auto flex flex-col">
          <div className="p-5 flex flex-col gap-5">

            {/* API Key */}
            <div className={`rounded-xl border p-4 flex flex-col gap-2 ${showKey ? "bg-accent/5 border-accent/25" : "bg-ok/5 border-ok/20"}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Key size={13} className={showKey ? "text-accent" : "text-ok"} />
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${showKey ? "text-accent" : "text-ok"}`}>
                    {showKey ? "OpenAI API Key (ChatGPT)" : "API Key Connected"}
                  </span>
                </div>
                {!showKey && (
                  <button onClick={() => setShowKey(true)} className="text-[11px] text-dim hover:text-body underline">
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
                    onBlur={() => { if (apiKey.trim()) setShowKey(false); }}
                  />
                  <p className="text-[11px] text-dim">Stored in your browser only. Never sent to our servers.</p>
                </>
              )}
            </div>

            {/* ── Content ──────────────────────────────────────────────── */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-dim uppercase tracking-widest border-b border-wire pb-1.5">Content</span>

              <div className="flex flex-col gap-1.5">
                <label className="fl">Company / Brand</label>
                <select className="fi-select" value={inputs.company} onChange={set("company")}>
                  <option value="">Select company</option>
                  {COMPANIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="fl">Niche <span className="text-bad">*</span></label>
                  <input className="fi" placeholder="e.g. Skincare" value={inputs.niche} onChange={set("niche")} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="fl">Sub-Niche</label>
                  <input className="fi" placeholder="e.g. Hairfall" value={inputs.subNiche} onChange={set("subNiche")} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="fl">Product / Service <span className="text-bad">*</span></label>
                <input className="fi" placeholder="e.g. HairGrow Serum" value={inputs.product} onChange={set("product")} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="fl">Product Description</label>
                <textarea className="fi" rows={3} placeholder="Key ingredients, benefits, how it works…" value={inputs.productDescription} onChange={set("productDescription")} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="fl">Capability Pillars</label>
                <textarea className="fi" rows={3} placeholder={"3–5 things that make this brand unique\ne.g. Clinically tested · No sulphates · Works in 14 days"} value={inputs.capabilityPillars} onChange={set("capabilityPillars")} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="fl">Value Proposition</label>
                <textarea className="fi" rows={2} placeholder="Measurable result the viewer gets" value={inputs.value} onChange={set("value")} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="fl">Target Audience</label>
                <input className="fi" placeholder="e.g. Women 25–40 with hairfall issues" value={inputs.audience} onChange={set("audience")} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="fl">Script Language</label>
                <select className="fi-select" value={inputs.language} onChange={set("language")}>
                  <option value="English">English</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Thanglish">Thanglish (Tamil+English)</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Kannada">Kannada</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
            </div>

            {/* ── Format & Structure ───────────────────────────────────── */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold text-dim uppercase tracking-widest border-b border-wire pb-1.5">Format & Structure</span>

              <div className="flex flex-col gap-1.5">
                <label className="fl">Format Tier</label>
                <div className="flex flex-col gap-1.5">
                  {FORMAT_TIERS.map((tier) => {
                    const key = TIER_KEY(tier.value);
                    const selected = inputs.format === tier.value;
                    return (
                      <label key={tier.value} className={`check-card ${selected ? "on" : ""}`}>
                        <input type="radio" name="gen-format" value={tier.value} checked={selected} onChange={() => handleFormatChange(tier.value)} />
                        <span className={`tier-badge ${TIER_COLORS[key]} text-[10px] shrink-0`}>{key}</span>
                        <span className="text-[13px]">{tier.label.split("—")[1]?.trim()}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {structures.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <label className="fl">Script Structure</label>
                  <select className="fi-select" value={inputs.scriptStructure} onChange={set("scriptStructure")}>
                    <option value="">Select structure</option>
                    {structures.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="fl">CTA Keyword</label>
                <input className="fi" placeholder="e.g. GLOW, CLEAR, FIX" value={inputs.ctaKeyword} onChange={set("ctaKeyword")} />
                <span className="fh">Viewers comment this word to trigger ManyChat DM</span>
              </div>
            </div>

            {error && (
              <div className="bg-bad/10 border border-bad/30 rounded-xl px-4 py-3 text-bad text-[13px] leading-snug">⚠ {error}</div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-[14px] gap-2 disabled:opacity-60"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" />Generating…</>
              ) : result ? (
                <><RefreshCw size={16} />Regenerate</>
              ) : (
                <><Sparkles size={16} />Generate Script Package</>
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
                <h2 className="text-[20px] font-bold text-body mb-2">AI Script Generator</h2>
                <p className="text-dim text-[14px] max-w-md leading-relaxed">
                  Fill in your niche, product details, and format on the left. Claude will generate a complete production package — ready to shoot.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-left max-w-sm w-full">
                {[
                  ["📝", "Script", "7–9 punchy humanized lines"],
                  ["🎬", "Shot Plan", "Setup checklist + shot-by-shot cards"],
                  ["✂️", "Edit Instructions", "Numbered 1–11 + AI virality review"],
                  ["📢", "CTA & Caption", "DM keyword + hashtags"],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="bg-surface border border-wire rounded-xl p-3">
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
                <Loader2 size={20} className="text-accent animate-spin absolute -bottom-1 -right-1 bg-canvas rounded-full" />
              </div>
              <p className="text-body font-semibold text-[15px]">Generating your production package…</p>
              <p className="text-dim text-[13px]">Script → Shot plan → Edit instructions → Virality review</p>
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
                      key={tab.key}
                      onClick={() => setActiveTab(i)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-semibold border-b-2 transition-all ${
                        activeTab === i ? "text-accent border-accent" : "text-dim border-transparent hover:text-body"
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

                {/* ── Tab 0: Script ─────────────────────────────────────── */}
                {activeTab === 0 && (
                  <div className="max-w-xl flex flex-col gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-[17px] font-bold text-body">Humanized Script</h3>
                        {result.topic && (
                          <p className="text-dim text-[13px] mt-0.5">Topic: {result.topic}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleCopy(result.script || "", "script")}
                        className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 bg-lifted rounded-lg hover:bg-wire transition-colors shrink-0"
                      >
                        {copied === "script" ? <Check size={13} className="text-ok" /> : <Copy size={13} />}
                        {copied === "script" ? "Copied!" : "Copy All"}
                      </button>
                    </div>

                    <div className="flex flex-col gap-2">
                      {scriptLines.map((line, i) => (
                        <div key={i} className="flex gap-3 items-start group">
                          <span className="text-[11px] font-bold text-accent bg-accent/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p className={`text-[16px] leading-snug font-medium flex-1 ${i === scriptLines.length - 1 ? "text-ok" : "text-body"}`}>
                            {line}
                          </p>
                          <button
                            onClick={() => handleCopy(line, `line-${i}`)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                          >
                            {copied === `line-${i}` ? <Check size={12} className="text-ok" /> : <Copy size={12} className="text-dim" />}
                          </button>
                        </div>
                      ))}
                    </div>

                    {result.value && (
                      <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
                        <div className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1">Value Proposition</div>
                        <p className="text-[13px] text-body leading-snug">{result.value}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Tab 1: Shot Plan ──────────────────────────────────── */}
                {activeTab === 1 && (
                  <div className="flex flex-col gap-4 max-w-2xl">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[17px] font-bold text-body">Shot Plan — Director's Guide</h3>
                      <button
                        onClick={() => handleCopy(result.shotPlan || "", "shots")}
                        className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 bg-lifted rounded-lg hover:bg-wire transition-colors"
                      >
                        {copied === "shots" ? <Check size={13} className="text-ok" /> : <Copy size={13} />}
                        {copied === "shots" ? "Copied!" : "Copy All"}
                      </button>
                    </div>
                    <div className="bg-surface border border-wire rounded-xl p-5">
                      <pre className="text-[13px] text-body whitespace-pre-wrap font-sans leading-relaxed">
                        {result.shotPlan || "No shot plan generated."}
                      </pre>
                    </div>
                  </div>
                )}

                {/* ── Tab 2: Edit Instructions ─────────────────────────── */}
                {activeTab === 2 && (
                  <div className="flex flex-col gap-4 max-w-2xl">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[17px] font-bold text-body">Edit Instructions + AI Review</h3>
                      <button
                        onClick={() => handleCopy(result.editInstructions || "", "edit")}
                        className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 bg-lifted rounded-lg hover:bg-wire transition-colors"
                      >
                        {copied === "edit" ? <Check size={13} className="text-ok" /> : <Copy size={13} />}
                        {copied === "edit" ? "Copied!" : "Copy All"}
                      </button>
                    </div>
                    <div className="bg-surface border border-wire rounded-xl p-5">
                      <pre className="text-[13px] text-body whitespace-pre-wrap font-sans leading-relaxed">
                        {result.editInstructions || "No edit instructions generated."}
                      </pre>
                    </div>
                  </div>
                )}

                {/* ── Tab 3: CTA & Caption ─────────────────────────────── */}
                {activeTab === 3 && (
                  <div className="max-w-lg flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[17px] font-bold text-body">CTA & Caption</h3>
                      <button
                        onClick={() => handleCopy(result.cta || "", "cta")}
                        className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 bg-lifted rounded-lg hover:bg-wire transition-colors"
                      >
                        {copied === "cta" ? <Check size={13} className="text-ok" /> : <Copy size={13} />}
                        {copied === "cta" ? "Copied!" : "Copy CTA"}
                      </button>
                    </div>

                    {result.cta && (
                      <div className="bg-ok/5 border border-ok/25 rounded-xl p-5">
                        <div className="text-[10px] font-bold text-ok uppercase tracking-wider mb-2">Call to Action</div>
                        <p className="text-[15px] font-semibold text-body leading-snug">{result.cta}</p>
                      </div>
                    )}

                    {result.topic && (
                      <div className="bg-surface border border-wire rounded-xl p-4">
                        <div className="text-[10px] font-bold text-dim uppercase tracking-wider mb-1">Video Topic</div>
                        <p className="text-[13px] text-body">{result.topic}</p>
                      </div>
                    )}

                    {result.value && (
                      <div className="bg-surface border border-wire rounded-xl p-4">
                        <div className="text-[10px] font-bold text-dim uppercase tracking-wider mb-1">Value Proposition</div>
                        <p className="text-[13px] text-body">{result.value}</p>
                      </div>
                    )}
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
