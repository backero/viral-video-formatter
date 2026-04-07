import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  HeadingLevel,
  AlignmentType,
  ShadingType,
  convertInchesToTwip,
} from "docx";

// ── Helpers ────────────────────────────────────────────────────────────────
function dash(v) {
  if (Array.isArray(v)) return v.length ? v.join(", ") : "—";
  return v && String(v).trim() ? String(v).trim() : "—";
}

function fmtDate(val) {
  if (!val) return "—";
  try {
    return new Date(val + "T00:00:00").toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return val;
  }
}

function fmtTime(val, ampm) {
  if (!val) return "";
  const [h, m] = val.split(":");
  const hour = parseInt(h, 10);
  const suffix = ampm || (hour >= 12 ? "PM" : "AM");
  return `${hour % 12 || 12}:${m} ${suffix}`;
}

// ── Colours ────────────────────────────────────────────────────────────────
const BRAND   = "4F46E5"; // indigo
const LABEL_BG = "EEF2FF"; // indigo-50
const HEADER_BG = "312E81"; // indigo-900
const BORDER_CLR = "C7D2FE"; // indigo-200

// ── Shared border config ───────────────────────────────────────────────────
const cellBorder = (color = BORDER_CLR) => ({
  top:    { style: BorderStyle.SINGLE, size: 1, color },
  bottom: { style: BorderStyle.SINGLE, size: 1, color },
  left:   { style: BorderStyle.SINGLE, size: 1, color },
  right:  { style: BorderStyle.SINGLE, size: 1, color },
});

const noBorder = {
  top:    { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left:   { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right:  { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
};

// ── Build a label cell (left col) ──────────────────────────────────────────
function labelCell(text) {
  return new TableCell({
    width: { size: 30, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: LABEL_BG },
    borders: cellBorder(),
    margins: { top: 80, bottom: 80, left: 120, right: 80 },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            bold: true,
            size: 20,
            color: "3730A3",
            font: "Calibri",
          }),
        ],
      }),
    ],
  });
}

// ── Build a value cell (right col) ─────────────────────────────────────────
function valueCell(text) {
  const str = Array.isArray(text) ? dash(text) : dash(text);
  return new TableCell({
    width: { size: 70, type: WidthType.PERCENTAGE },
    borders: cellBorder(),
    margins: { top: 80, bottom: 80, left: 120, right: 80 },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: str,
            size: 20,
            color: str === "—" ? "94A3B8" : "1E293B",
            italics: str === "—",
            font: "Calibri",
          }),
        ],
      }),
    ],
  });
}

// ── One data row ───────────────────────────────────────────────────────────
function dataRow(label, value) {
  return new TableRow({
    children: [labelCell(label), valueCell(value)],
  });
}

// ── Section header row (full-width, dark bg) ───────────────────────────────
function sectionHeaderRow(title) {
  return new TableRow({
    children: [
      new TableCell({
        columnSpan: 2,
        shading: { type: ShadingType.CLEAR, fill: HEADER_BG },
        borders: cellBorder(HEADER_BG),
        margins: { top: 100, bottom: 100, left: 120, right: 80 },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: title.toUpperCase(),
                bold: true,
                size: 22,
                color: "E0E7FF",
                font: "Calibri",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

// ── Build a full section table ─────────────────────────────────────────────
function sectionTable(title, rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { top: 0, bottom: 0 },
    rows: [sectionHeaderRow(title), ...rows.map(([l, v]) => dataRow(l, v))],
  });
}

// ── Spacer paragraph ───────────────────────────────────────────────────────
function spacer(size = 120) {
  return new Paragraph({
    spacing: { after: size },
    children: [new TextRun({ text: "" })],
  });
}

// ── Main export ────────────────────────────────────────────────────────────
export async function generateWord(data) {
  const tierKey = data.format
    ? data.format.startsWith("S-TIER")
      ? "S"
      : data.format.startsWith("A-TIER")
        ? "A"
        : data.format.startsWith("B-TIER")
          ? "B"
          : "F"
    : null;

  const hookVal =
    data.viralHook === "other" ? data.viralHookOther : data.viralHook;

  const discussionDateTime =
    data.discussionDate
      ? `${fmtDate(data.discussionDate)}${data.discussionTime ? "  " + fmtTime(data.discussionTime, data.discussionAmPm) : ""}`
      : "—";

  const contentDoneDateTime =
    data.contentCompletedDate
      ? `${fmtDate(data.contentCompletedDate)}${data.contentCompletedTime ? "  " + data.contentCompletedTime : ""}`
      : "—";

  // ── Document sections (content) ──────────────────────────────────────────
  const children = [

    // ── Title ──────────────────────────────────────────────────────────────
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: data.formTitle || "Viral Video Formatter",
          bold: true,
          size: 48,
          color: BRAND,
          font: "Calibri",
        }),
      ],
    }),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({
          text: `Generated on ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}`,
          size: 20,
          color: "64748B",
          font: "Calibri",
        }),
      ],
    }),

    // ── 1. Details ─────────────────────────────────────────────────────────
    sectionTable("1. Details", [
      ["Company / Brand", data.company],
      ["Creator Name", data.creatorFirst ? `${data.creatorFirst}  (${data.creatorDept || "—"})` : "—"],
      ["Actor Name",   data.actorFirst  ? `${data.actorFirst}  (${data.actorDept || "—"})` : "—"],
      ["Start Date",   fmtDate(data.startDate)],
    ]),
    spacer(),

    // ── 2. Niche / Topic ───────────────────────────────────────────────────
    sectionTable("2. Niche / Topic", [
      ["Niche",      data.niche],
      ["Sub-Niche",  data.subNiche],
      ["Topic",      data.topic],
      ["Topic Creates", data.topicCheckboxes?.length ? data.topicCheckboxes.join(", ") : "—"],
    ]),
    spacer(),

    // ── 3. Value ───────────────────────────────────────────────────────────
    sectionTable("3. Value", [
      ["Value Proposition", data.value],
    ]),
    spacer(),

    // ── 4. Format ──────────────────────────────────────────────────────────
    sectionTable("4. Format", [
      ["Format Tier",      tierKey ? `${tierKey}-TIER` : "—"],
      ["Format",           data.format?.split("=")[1]?.split("(")[0]?.trim() || data.format || "—"],
      ["Script Structure", data.scriptStructure],
    ]),
    spacer(),

    // ── 5. Hook ────────────────────────────────────────────────────────────
    sectionTable("5. Hook", [
      ["Viral Hook Type",          hookVal],
      ["Visual Hook (Action)",     data.visualHook],
      ["Written Hook",             data.writtenHook],
      ["Audio Hook",               data.audioHook],
      ["Physiological Triggers",   data.physiologicalFactors?.length ? data.physiologicalFactors.join(", ") : "—"],
    ]),
    spacer(),

    // ── 6. Script ──────────────────────────────────────────────────────────
    sectionTable("6. Script", [
      ["Script",             data.script],
      ["Reference Video",    data.scriptRefVideo],
    ]),
    spacer(),

    // ── 7. CTA ─────────────────────────────────────────────────────────────
    sectionTable("7. CTA", [
      ["Call to Action",       data.cta],
      ["Script Completed",     data.scriptCompleted],
      ["Content Completed",    contentDoneDateTime],
    ]),
    spacer(),

    // ── 8. Pre-Camera / Shooting ───────────────────────────────────────────
    sectionTable("8. Pre-Camera / Shooting", [
      ["Ref Video for Shoot",  data.refVideoShoot],
      ["Tech Discussion Notes",data.techDiscussion],
      ["Discussion Date & Time", discussionDateTime],
    ]),
    spacer(),

    // ── 9. Editor ──────────────────────────────────────────────────────────
    sectionTable("9. Editor", [
      ["Editor Notes",         data.editorNotes],
      ["Pre-Shoot Approval",   data.preShootApproval?.length ? data.preShootApproval.join(", ") : "—"],
      ["Shoot Date",           fmtDate(data.shootDate)],
    ]),
    spacer(),

    // ── 10. Final Out ──────────────────────────────────────────────────────
    sectionTable("10. Final Out", [
      ["Video Link",           data.videoLink],
      ["Final Approval Members", data.finalApprovalMembers?.length ? data.finalApprovalMembers.join(", ") : "—"],
      ["Founder Approval",     data.founderApproval],
      ["Rectification Needed", data.founderApproval && data.founderApproval !== "APPROVED" ? data.rectification : "N/A"],
      ["Re-Correction Done",   data.founderApproval && data.founderApproval !== "APPROVED" ? (data.reCorrectionDone || "—") : "N/A"],
      ["Re-Approval",          data.founderApproval && data.founderApproval !== "APPROVED" ? (data.reApproval || "—") : "N/A"],
      ["Final Video Link",     data.founderApproval && data.founderApproval !== "APPROVED" ? data.finalVideoLink : "N/A"],
    ]),
    spacer(80),

    // ── Footer note ────────────────────────────────────────────────────────
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: "— Generated by Content Formatter —",
          size: 16,
          color: "94A3B8",
          italics: true,
          font: "Calibri",
        }),
      ],
    }),
  ];

  const doc = new Document({
    creator: "Content Formatter",
    title: data.formTitle || "Viral Video Formatter",
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 20 },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top:    convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left:   convertInchesToTwip(1),
              right:  convertInchesToTwip(1),
            },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(data.formTitle || "form").replace(/\s+/g, "_")}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
