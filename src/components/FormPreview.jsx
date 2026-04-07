import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { TIER_KEY } from "../constants/formData";
import { generateWord } from "../utils/generateWord";

const TIER_COLORS = {
  S: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  A: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  B: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  F: "text-red-400 bg-red-400/10 border-red-400/20",
};

function fmt(date) {
  if (!date) return "";
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-[10px] font-semibold text-dim/50 uppercase tracking-wider mb-0.5">
        {label}
      </div>
      {value ? (
        <div className="text-[13px] text-body leading-snug break-words">{value}</div>
      ) : (
        <div className="text-[12px] text-dim/30 italic">—</div>
      )}
    </div>
  );
}

function Tags({ items, color = "bg-accent/10 text-accent" }) {
  if (!items?.length) return <div className="text-[12px] text-dim/30 italic">—</div>;
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((t) => (
        <span key={t} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${color}`}>
          {t}
        </span>
      ))}
    </div>
  );
}

function Section({ title, dot, children }) {
  // dot: "full" | "partial" | "empty"
  const dotColor =
    dot === "full"
      ? "bg-ok"
      : dot === "partial"
        ? "bg-yellow-400"
        : "bg-wire";
  return (
    <div className="border-b border-wire/60 pb-4 last:border-0 last:pb-0">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[10px] font-bold text-dim uppercase tracking-widest">
          {title}
        </span>
        <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function dotState(filled, total) {
  if (filled === 0) return "empty";
  if (filled >= total) return "full";
  return "partial";
}

export default function FormPreview({ data }) {
  const [downloading, setDownloading] = useState(false);

  const handleWordDownload = async () => {
    setDownloading(true);
    try {
      await generateWord(data);
    } catch (e) {
      console.error("Word generation failed:", e);
    } finally {
      setDownloading(false);
    }
  };

  const tierKey = data.format ? TIER_KEY(data.format) : null;
  const hookVal = data.viralHook === "other" ? data.viralHookOther : data.viralHook;
  const formatShort = data.format
    ? data.format.split("=")[1]?.split("(")[0]?.trim() || data.format
    : "";

  // Counts
  const c = {
    details: [data.company, data.creatorFirst, data.actorFirst, data.startDate].filter(Boolean).length,
    niche: [data.niche, data.subNiche, data.topic].filter(Boolean).length,
    value: [data.value].filter(Boolean).length,
    format: [data.format, tierKey === "F" || data.scriptStructure].filter(Boolean).length,
    hook: [hookVal, data.visualHook, data.writtenHook, data.audioHook, data.physiologicalFactors?.length].filter(Boolean).length,
    script: [data.script].filter(Boolean).length,
    cta: [data.cta, data.scriptCompleted].filter(Boolean).length,
    precamera: [data.refVideoShoot, data.techDiscussion].filter(Boolean).length,
    editor: [data.editorNotes, data.shootDate].filter(Boolean).length,
    final: [data.videoLink, data.founderApproval].filter(Boolean).length,
  };

  const total = 4 + 3 + 1 + 2 + 5 + 1 + 2 + 2 + 2 + 2;
  const filled = Object.values(c).reduce((a, b) => a + b, 0);
  const pct = Math.round((filled / total) * 100);

  const discussionLabel =
    data.discussionDate
      ? `${fmt(data.discussionDate)}${data.discussionTime ? ` · ${data.discussionTime} ${data.discussionAmPm || ""}` : ""}`
      : "";

  const contentDoneLabel =
    data.contentCompletedDate
      ? `${fmt(data.contentCompletedDate)}${data.contentCompletedTime ? ` · ${data.contentCompletedTime}` : ""}`
      : "";

  return (
    <div className="flex flex-col gap-0 bg-surface border border-wire rounded-2xl overflow-hidden">
      {/* Header + progress */}
      <div className="px-4 pt-4 pb-3 border-b border-wire">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-bold text-body">Live Preview</span>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-accent">{pct}%</span>
            <button
              onClick={handleWordDownload}
              disabled={downloading}
              title="Download as Word (.docx)"
              className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors disabled:opacity-50"
            >
              {downloading ? (
                <Loader2 size={11} className="animate-spin" />
              ) : (
                <FileDown size={11} />
              )}
              {downloading ? "…" : "Word"}
            </button>
          </div>
        </div>
        <div className="w-full bg-wire rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Sections */}
      <div className="px-4 py-4 flex flex-col gap-4">

        {/* Details */}
        <Section title="Details" dot={dotState(c.details, 4)}>
          <Field label="Company / Brand" value={data.company} />
          <div className="grid grid-cols-2 gap-2">
            <Field
              label="Creator"
              value={data.creatorFirst ? `${data.creatorFirst}${data.creatorDept ? ` · ${data.creatorDept}` : ""}` : ""}
            />
            <Field
              label="Actor"
              value={data.actorFirst ? `${data.actorFirst}${data.actorDept ? ` · ${data.actorDept}` : ""}` : ""}
            />
          </div>
          <Field label="Start Date" value={fmt(data.startDate)} />
        </Section>

        {/* Niche / Topic */}
        <Section title="Niche / Topic" dot={dotState(c.niche, 3)}>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Niche" value={data.niche} />
            <Field label="Sub-Niche" value={data.subNiche} />
          </div>
          <Field label="Topic" value={data.topic} />
          {data.topicCheckboxes?.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold text-dim/50 uppercase tracking-wider mb-1">
                Creates
              </div>
              <Tags items={data.topicCheckboxes} />
            </div>
          )}
        </Section>

        {/* Value */}
        <Section title="Value" dot={dotState(c.value, 1)}>
          <Field label="Value Proposition" value={data.value} />
        </Section>

        {/* Format */}
        <Section title="Format" dot={dotState(c.format, 2)}>
          {tierKey ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${TIER_COLORS[tierKey]}`}>
                {tierKey}-TIER
              </span>
              <span className="text-[12px] text-dim leading-snug">{formatShort}</span>
            </div>
          ) : (
            <Field label="Format" value="" />
          )}
          <Field label="Script Structure" value={data.scriptStructure} />
        </Section>

        {/* Hook */}
        <Section title="Hook" dot={dotState(c.hook, 5)}>
          <Field label="Viral Hook" value={hookVal} />
          <Field label="Visual Hook" value={data.visualHook} />
          <Field label="Written Hook" value={data.writtenHook} />
          <Field label="Audio Hook" value={data.audioHook} />
          {data.physiologicalFactors?.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold text-dim/50 uppercase tracking-wider mb-1">
                Triggers
              </div>
              <Tags items={data.physiologicalFactors} color="bg-lifted text-body" />
            </div>
          )}
        </Section>

        {/* Script */}
        <Section title="Script" dot={dotState(c.script, 1)}>
          {data.script ? (
            <div className="text-[12px] text-body leading-relaxed line-clamp-5 break-words whitespace-pre-wrap">
              {data.script}
            </div>
          ) : (
            <div className="text-[12px] text-dim/30 italic">—</div>
          )}
          <Field label="Script Ref Video" value={data.scriptRefVideo} />
        </Section>

        {/* CTA */}
        <Section title="CTA" dot={dotState(c.cta, 2)}>
          <Field label="Call to Action" value={data.cta} />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Script Completed" value={data.scriptCompleted} />
            <Field label="Content Done" value={contentDoneLabel} />
          </div>
        </Section>

        {/* Pre-Camera */}
        <Section title="Pre-Camera / Shoot" dot={dotState(c.precamera, 2)}>
          <Field label="Ref Video for Shoot" value={data.refVideoShoot} />
          <Field label="Tech Discussion" value={data.techDiscussion} />
          <Field label="Discussion Date & Time" value={discussionLabel} />
        </Section>

        {/* Editor */}
        <Section title="Editor" dot={dotState(c.editor, 2)}>
          <Field label="Editor Notes" value={data.editorNotes} />
          {data.preShootApproval?.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold text-dim/50 uppercase tracking-wider mb-1">
                Pre-Shoot Approval
              </div>
              <Tags items={data.preShootApproval} color="bg-ok/10 text-ok" />
            </div>
          )}
          <Field label="Shoot Date" value={fmt(data.shootDate)} />
        </Section>

        {/* Final Out */}
        <Section title="Final Out" dot={dotState(c.final, 2)}>
          <Field label="Video Link" value={data.videoLink} />
          {data.finalApprovalMembers?.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold text-dim/50 uppercase tracking-wider mb-1">
                Final Approval
              </div>
              <Tags items={data.finalApprovalMembers} color="bg-lifted text-body" />
            </div>
          )}
          <Field
            label="Founder Approval"
            value={data.founderApproval}
          />
          {data.founderApproval && data.founderApproval !== "APPROVED" && (
            <>
              <Field label="Rectification" value={data.rectification} />
              <div className="grid grid-cols-2 gap-2">
                <Field label="Re-Correction" value={data.reCorrectionDone} />
                <Field label="Re-Approval" value={data.reApproval} />
              </div>
              <Field label="Final Video Link" value={data.finalVideoLink} />
            </>
          )}
        </Section>

      </div>
    </div>
  );
}
