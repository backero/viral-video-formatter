import { Pencil } from "lucide-react";

function fmtDate(val) {
  if (!val) return null;
  try {
    return new Date(val).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return val;
  }
}
function fmtTime(val, ampm) {
  if (!val) return null;
  const [h, m] = val.split(":");
  const hour = parseInt(h, 10);
  const suffix = ampm || (hour >= 12 ? "PM" : "AM");
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${suffix}`;
}

function SectionCard({ title, pageNum, onEdit, children }) {
  return (
    <div className="bg-surface border border-wire rounded-xl overflow-hidden mb-4">
      {/* header */}
      <div className="flex items-center justify-between px-5 py-3 bg-lifted border-b border-wire">
        <span className="text-[12px] font-bold text-accent uppercase tracking-widest">
          {title}
        </span>
        <button
          type="button"
          onClick={() => onEdit(pageNum)}
          className="flex items-center gap-1.5 text-[12px] font-semibold text-dim hover:text-accent transition-colors duration-150 group"
        >
          <Pencil
            size={12}
            className="group-hover:scale-110 transition-transform"
          />
          <span>Edit</span>
        </button>
      </div>
      {/* fields */}
      <div className="divide-y divide-wire/50">{children}</div>
    </div>
  );
}

function Row({ label, value, tags, badge, preformatted }) {
  const isEmpty = !value && !tags && !badge;
  return (
    <div className="grid grid-cols-[160px_1fr] gap-3 px-5 py-3">
      <span className="text-[11px] font-semibold text-dim uppercase tracking-wider self-start mt-0.5">
        {label}
      </span>
      <span className="text-[14px] text-body leading-relaxed">
        {badge ? (
          badge
        ) : tags ? (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className="bg-accent/10 text-accent border border-accent/20 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
              >
                {t}
              </span>
            ))}
          </div>
        ) : preformatted ? (
          <pre className="whitespace-pre-wrap font-sans text-[13px] text-body leading-relaxed bg-raised rounded-lg px-3 py-2 border border-wire">
            {value}
          </pre>
        ) : isEmpty ? (
          <span className="text-ghost italic text-[13px]">Not filled</span>
        ) : (
          value
        )}
      </span>
    </div>
  );
}

function ApprovalBadge({ value }) {
  if (!value)
    return <span className="text-ghost italic text-[13px]">Not filled</span>;
  const isGood = value === "APPROVED";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wide ${
        isGood
          ? "bg-ok/15 text-ok border border-ok/25"
          : "bg-bad/15 text-bad border border-bad/25"
      }`}
    >
      {isGood ? "✓" : "⚠"} {value}
    </span>
  );
}

export default function ReviewEdit({ data, onGoToPage }) {
  const hookVal =
    data.viralHook === "other"
      ? data.viralHookOther || data.viralHook
      : data.viralHook;

  return (
    <div className="pg">
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-accent text-lg">✎</span>
          <h2 className="text-[22px] font-bold text-body tracking-tight">
            Review & Edit
          </h2>
        </div>
        <p className="text-[14px] text-dim">
          Check all your details below. Click{" "}
          <strong className="text-accent">Edit</strong> on any section to update
          it before generating the PDF or submitting.
        </p>
      </div>

      {/* ── Page 1: Details ──────────────────────── */}
      <SectionCard title="1 · Detail Page" pageNum={1} onEdit={onGoToPage}>
        <Row label="Start Date" value={fmtDate(data.startDate)} />
        <Row
          label="Creator Name"
          value={
            data.creatorFirst
              ? `${data.creatorFirst}${data.creatorDept ? " · " + data.creatorDept : ""}`
              : null
          }
        />
        <Row
          label="Actor Name"
          value={
            data.actorFirst
              ? `${data.actorFirst}${data.actorDept ? " · " + data.actorDept : ""}`
              : null
          }
        />
        <Row label="Company / Brand" value={data.company} />
      </SectionCard>

      {/* ── Page 2: Niche / Topic ────────────────── */}
      <SectionCard title="2 · Niche / Topic" pageNum={2} onEdit={onGoToPage}>
        <Row label="Niche" value={data.niche} />
        <Row label="Sub-Niche" value={data.subNiche} />
        <Row label="Topic" value={data.topic} preformatted={!!data.topic} />
        <Row
          label="Topic Creates"
          tags={data.topicCheckboxes?.length ? data.topicCheckboxes : null}
        />
      </SectionCard>

      {/* ── Page 3: Value ────────────────────────── */}
      <SectionCard title="3 · Value" pageNum={3} onEdit={onGoToPage}>
        <Row
          label="Value (Measurable & Actionable)"
          value={data.value}
          preformatted={!!data.value}
        />
      </SectionCard>

      {/* ── Page 4: Formats ──────────────────────── */}
      <SectionCard title="4 · Formats" pageNum={4} onEdit={onGoToPage}>
        <Row label="Video Format Tier" value={data.format} />
        <Row label="Script Structure" value={data.scriptStructure} />
      </SectionCard>

      {/* ── Page 6: Hook ─────────────────────────── */}
      <SectionCard title="6 · Hook" pageNum={6} onEdit={onGoToPage}>
        <Row label="Viral Hook Type" value={hookVal} />
        <Row label="Visual Hook Action" value={data.visualHook} />
        <Row
          label="Written Hook"
          value={data.writtenHook}
          preformatted={!!data.writtenHook}
        />
        <Row label="Audio Hook" value={data.audioHook} />
        <Row
          label="Physiological Factors"
          tags={
            data.physiologicalFactors?.length ? data.physiologicalFactors : null
          }
        />
      </SectionCard>

      {/* ── Page 7: Script ───────────────────────── */}
      <SectionCard title="7 · Script" pageNum={7} onEdit={onGoToPage}>
        <Row label="Script" value={data.script} preformatted={!!data.script} />
        <Row label="Reference Video" value={data.scriptRefVideo} />
      </SectionCard>

      {/* ── Page 8: CTA ──────────────────────────── */}
      <SectionCard title="8 · CTA" pageNum={8} onEdit={onGoToPage}>
        <Row
          label="Call to Action"
          value={data.cta}
          preformatted={!!data.cta}
        />
        <Row label="Script Completed" value={data.scriptCompleted} />
        <Row
          label="Content Completed"
          value={
            data.contentCompletedDate
              ? `${fmtDate(data.contentCompletedDate)}${data.contentCompletedTime ? " · " + fmtTime(data.contentCompletedTime) : ""}`
              : null
          }
        />
      </SectionCard>

      {/* ── Page 9: Pre-Camera ───────────────────── */}
      <SectionCard title="9 · Pre-Camera" pageNum={9} onEdit={onGoToPage}>
        <Row label="Ref Video for Shoot" value={data.refVideoShoot} />
        <Row
          label="Tech Discussion Notes"
          value={data.techDiscussion}
          preformatted={!!data.techDiscussion}
        />
        <Row
          label="Discussion Completed"
          value={
            data.discussionDate
              ? `${fmtDate(data.discussionDate)} · ${fmtTime(data.discussionTime, data.discussionAmPm)}`
              : null
          }
        />
      </SectionCard>

      {/* ── Page 10: Editor ──────────────────────── */}
      <SectionCard title="10 · Editor" pageNum={10} onEdit={onGoToPage}>
        <Row
          label="Editor Notes"
          value={data.editorNotes}
          preformatted={!!data.editorNotes}
        />
        <Row
          label="Pre-Shoot Approval"
          tags={data.preShootApproval?.length ? data.preShootApproval : null}
        />
        <Row label="Date for Shoot" value={fmtDate(data.shootDate)} />
      </SectionCard>

      {/* ── Page 11: Final Out ───────────────────── */}
      <SectionCard title="11 · Final Out" pageNum={11} onEdit={onGoToPage}>
        <Row label="Video Link" value={data.videoLink} />
        <Row
          label="Final Approval Members"
          tags={
            data.finalApprovalMembers?.length ? data.finalApprovalMembers : null
          }
        />
        <Row
          label="Founder Approval"
          badge={<ApprovalBadge value={data.founderApproval} />}
        />
        {data.founderApproval && data.founderApproval !== "APPROVED" && (
          <>
            <Row
              label="Rectification Notes"
              value={data.rectification}
              preformatted={!!data.rectification}
            />
            <Row label="Re-Correction Done" value={data.reCorrectionDone} />
            <Row
              label="Re-Approval"
              badge={<ApprovalBadge value={data.reApproval} />}
            />
            <Row label="Final Video Link" value={data.finalVideoLink} />
          </>
        )}
      </SectionCard>
    </div>
  );
}
