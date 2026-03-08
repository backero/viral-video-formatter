/**
 * generatePDF.js  –  uses pdfmake for guaranteed layout correctness.
 * pdfmake is a proper PDF layout engine; it NEVER splits table rows across pages.
 */
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Wire the virtual file system once at module-init time.
// Different pdfmake builds expose the font data under different keys;
// this chain covers 0.1.x, 0.2.x, and UMD/CJS builds.
pdfMake.vfs =
  pdfFonts?.pdfMake?.vfs ??
  pdfFonts?.vfs ??
  pdfFonts?.default?.pdfMake?.vfs ??
  pdfFonts?.default?.vfs ??
  {};

// ── Helpers ────────────────────────────────────────────────────────────────
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
  if (!val) return "";
  const [h, m] = val.split(":");
  const hour = parseInt(h, 10);
  const suffix = ampm || (hour >= 12 ? "PM" : "AM");
  return `${hour % 12 || 12}:${m} ${suffix}`;
}

function dash(v) {
  return v && String(v).trim() ? String(v).trim() : "—";
}

// ── Colour palette ─────────────────────────────────────────────────────────
const C = {
  brand: "#4f46e5", // indigo — section headings
  coverBg: "#1e1b4b", // dark navy — cover background
  coverSub: "#a5b4fc", // light indigo — subtitle on cover
  labelTxt: "#64748b", // slate — field labels
  bodyTxt: "#1e293b", // dark — field values
  border: "#e2e8f0", // light grey — row separators
  tagBg: "#e0e7ff", // indigo tint — default tags
  tagTxt: "#3730a3",
  okBg: "#dcfce7", // green tint
  okTxt: "#166534",
  badBg: "#fee2e2", // red tint
  badTxt: "#991b1b",
  preBg: "#f8fafc", // code block bg
  preBorder: "#e2e8f0",
  footerTxt: "#94a3b8",
};

// ── pdfmake styles ─────────────────────────────────────────────────────────
const STYLES = {
  coverTitle: {
    fontSize: 24,
    bold: true,
    color: "#ffffff",
    margin: [0, 0, 0, 4],
  },
  coverSub: {
    fontSize: 11,
    color: C.coverSub,
    margin: [0, 0, 0, 20],
  },
  coverMetaLabel: {
    fontSize: 7.5,
    color: "rgba(255,255,255,0.5)",
    bold: true,
    characterSpacing: 1.2,
    margin: [0, 0, 0, 2],
  },
  coverMetaVal: {
    fontSize: 11.5,
    color: "#ffffff",
    bold: true,
  },
  secHead: {
    fontSize: 8.5,
    bold: true,
    color: C.brand,
    characterSpacing: 1.4,
    margin: [0, 18, 0, 0],
  },
  labelCell: {
    fontSize: 9.5,
    bold: true,
    color: C.labelTxt,
    characterSpacing: 0.6,
  },
  valueCell: {
    fontSize: 11.5,
    color: C.bodyTxt,
  },
  preText: {
    fontSize: 11,
    color: C.bodyTxt,
    lineHeight: 1.55,
  },
  footer: {
    fontSize: 9,
    color: C.footerTxt,
  },
};

// ── Table layout (no side borders, only thin top/bottom lines per row) ─────
const rowLayout = {
  hLineWidth: (i, node) => (i === 0 || i === node.table.body.length ? 0 : 0.5),
  vLineWidth: () => 0,
  hLineColor: () => C.border,
  paddingLeft: (i) => (i === 0 ? 0 : 8),
  paddingRight: () => 0,
  paddingTop: () => 7,
  paddingBottom: () => 7,
};

// ── Builder helpers ────────────────────────────────────────────────────────

/** Plain text field row */
function row(label, value) {
  return [
    { text: label.toUpperCase(), style: "labelCell" },
    { text: dash(value), style: "valueCell" },
  ];
}

/** Tags row — inline flowing pills, no equal-width columns */
function tagRow(label, arr, ok = false) {
  if (!arr || !arr.length) {
    return [
      { text: label.toUpperCase(), style: "labelCell" },
      { text: "\u2014", style: "valueCell" },
    ];
  }
  // Each tag is an inline coloured span; spaces between them act as gap
  const spans = [];
  arr.forEach((t, i) => {
    if (i > 0) spans.push({ text: "   " }); // visual gap
    spans.push({
      text: ` ${t} `,
      fontSize: 9.5,
      bold: true,
      color: ok ? C.okTxt : C.tagTxt,
      background: ok ? C.okBg : C.tagBg,
    });
  });
  return [
    { text: label.toUpperCase(), style: "labelCell" },
    { text: spans, lineHeight: 1.8 },
  ];
}

/** Approval badge row — ASCII-safe, no missing-glyph boxes */
function badgeRow(label, val) {
  if (!val) {
    return [
      { text: label.toUpperCase(), style: "labelCell" },
      { text: "\u2014", style: "valueCell" },
    ];
  }
  const isOk = val === "APPROVED";
  const badge = {
    text: (isOk ? "[OK] " : "[!]  ") + val,
    fontSize: 10,
    bold: true,
    color: isOk ? C.okTxt : C.badTxt,
    background: isOk ? C.okBg : C.badBg,
    margin: [0, 2, 0, 2],
  };
  return [{ text: label.toUpperCase(), style: "labelCell" }, badge];
}

/** Pre-formatted text row (script) */
function preRow(label, value) {
  const content =
    value && value.trim()
      ? {
          table: {
            widths: ["*"],
            body: [
              [
                {
                  text: value.trim(),
                  style: "preText",
                  margin: [10, 8, 10, 8],
                  background: C.preBg,
                },
              ],
            ],
          },
          layout: {
            hLineWidth: () => 0.5,
            vLineWidth: (i) => (i === 0 ? 2 : 0.5),
            hLineColor: () => C.preBorder,
            vLineColor: (i) => (i === 0 ? C.brand : C.preBorder),
            paddingTop: () => 0,
            paddingBottom: () => 0,
            paddingLeft: () => 0,
            paddingRight: () => 0,
          },
        }
      : { text: "—", style: "valueCell" };

  return [{ text: label.toUpperCase(), style: "labelCell" }, content];
}

/** Section: header line + rows table */
function section(title, rows) {
  return [
    // Section heading with coloured bottom border
    {
      stack: [
        { text: title, style: "secHead" },
        {
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 4,
              x2: 515,
              y2: 4,
              lineWidth: 1,
              lineColor: "#e0e7ff",
            },
          ],
        },
      ],
      margin: [0, 0, 0, 0],
    },
    // Field rows table — dontBreakRows keeps each row intact across page breaks
    {
      table: {
        widths: [150, "*"],
        dontBreakRows: true,
        body: rows,
      },
      layout: rowLayout,
      margin: [0, 0, 0, 0],
    },
  ];
}

// ── Main doc builder ───────────────────────────────────────────────────────
function buildDocDef(data) {
  const hookVal =
    data.viralHook === "other"
      ? data.viralHookOther || data.viralHook
      : data.viralHook;

  const contentDateStr = data.contentCompletedDate
    ? fmtDate(data.contentCompletedDate) +
      (data.contentCompletedTime
        ? " · " + fmtTime(data.contentCompletedTime)
        : "")
    : null;

  const discussionStr = data.discussionDate
    ? fmtDate(data.discussionDate) +
      " · " +
      fmtTime(data.discussionTime, data.discussionAmPm)
    : null;

  const correctionRows =
    data.founderApproval && data.founderApproval !== "APPROVED"
      ? [
          row("What to Rectify", data.rectification),
          row("Re-Correction Done", data.reCorrectionDone),
          badgeRow("Re-Approval", data.reApproval),
          row("Final Video Link", data.finalVideoLink),
        ]
      : [];

  return {
    pageSize: "A4",
    pageMargins: [40, 40, 40, 50],

    // ─ Footer ──────────────────────────────────────────────────────────────
    footer: (currentPage, pageCount) => ({
      columns: [
        {
          text: "Viral Video Formatter — Creator Workflow Report",
          style: "footer",
          margin: [40, 0, 0, 0],
        },
        {
          text: `Page ${currentPage} of ${pageCount}`,
          style: "footer",
          alignment: "right",
          margin: [0, 0, 40, 0],
        },
      ],
      margin: [0, 10, 0, 0],
    }),

    styles: STYLES,
    defaultStyle: {
      font: "Roboto",
      fontSize: 11,
      color: C.bodyTxt,
    },

    content: [
      // ────────────────────────────────────────────────────────────────────
      // COVER
      // ────────────────────────────────────────────────────────────────────
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                stack: [
                  // Badge pill
                  {
                    text: data.formTitle || "Unnamed Form",
                    style: "coverTitle",
                    margin: [0, 0, 0, 20],
                  },

                  // Divider
                  {
                    canvas: [
                      {
                        type: "line",
                        x1: 0,
                        y1: 0,
                        x2: 495,
                        y2: 0,
                        lineWidth: 0.5,
                        lineColor: "rgba(255,255,255,0.2)",
                      },
                    ],
                  },

                  // Meta row
                  {
                    columns: [
                      {
                        stack: [
                          { text: "COMPANY / BRAND", style: "coverMetaLabel" },
                          { text: data.company || "—", style: "coverMetaVal" },
                        ],
                      },
                      {
                        stack: [
                          { text: "CREATOR", style: "coverMetaLabel" },
                          {
                            text: data.creatorFirst
                              ? data.creatorFirst +
                                (data.creatorDept
                                  ? " · " + data.creatorDept
                                  : "")
                              : "—",
                            style: "coverMetaVal",
                          },
                        ],
                      },
                      {
                        stack: [
                          { text: "ACTOR", style: "coverMetaLabel" },
                          {
                            text: data.actorFirst
                              ? data.actorFirst +
                                (data.actorDept ? " · " + data.actorDept : "")
                              : "—",
                            style: "coverMetaVal",
                          },
                        ],
                      },
                      {
                        stack: [
                          { text: "START DATE", style: "coverMetaLabel" },
                          {
                            text: fmtDate(data.startDate) || "—",
                            style: "coverMetaVal",
                          },
                        ],
                      },
                    ],
                    columnGap: 10,
                    margin: [0, 20, 0, 0],
                  },
                ],
                fillColor: C.coverBg,
                margin: [30, 30, 30, 30],
              },
            ],
          ],
        },
        layout: "noBorders",
        margin: [-40, -40, -40, 0], // bleed to page edges
      },

      // ────────────────────────────────────────────────────────────────────
      // SECTIONS
      // ────────────────────────────────────────────────────────────────────
      ...section("1.  Niche / Topic", [
        row("Niche", data.niche),
        row("Sub-Niche", data.subNiche),
        row("Topic", data.topic),
        tagRow("Topic Creates", data.topicCheckboxes),
      ]),

      ...section("2.  Value", [
        row("Value (Measurable & Actionable)", data.value),
      ]),

      ...section("3.  Format", [
        row("Video Format Tier", data.format),
        row("Script Structure", data.scriptStructure),
      ]),

      ...section("4.  Hook", [
        row("Viral Hook Type", hookVal),
        row("Visual Hook Action", data.visualHook),
        row("Written Hook", data.writtenHook),
        row("Audio Hook", data.audioHook),
        tagRow("Physiological Factors", data.physiologicalFactors),
      ]),

      ...section("5.  Script", [
        preRow("Script", data.script),
        row("Reference Video", data.scriptRefVideo),
      ]),

      ...section("6.  CTA", [
        row("Call to Action", data.cta),
        row("Script Completed", data.scriptCompleted),
        row("Content Completed", contentDateStr),
      ]),

      ...section("7.  Pre-Camera / Shooting", [
        row("Ref Video for Shoot", data.refVideoShoot),
        row("Tech Discussion Notes", data.techDiscussion),
        row("Discussion Completed", discussionStr),
      ]),

      ...section("8.  Editor Notes", [
        row("Editor Notes / Reference", data.editorNotes),
        tagRow("Pre-Shoot Approval", data.preShootApproval, true),
        row("Date for Shoot", fmtDate(data.shootDate)),
      ]),

      ...section("9.  Final Out", [
        row("Video Link", data.videoLink),
        tagRow("Final Approval Members", data.finalApprovalMembers, true),
        badgeRow("Founder Approval", data.founderApproval),
        ...correctionRows,
      ]),
    ],
  };
}

// ── Public API ─────────────────────────────────────────────────────────────
export function generatePDF(data) {
  // pdfMake and its VFS are statically imported + wired at the top of this module
  const titleStr = (data.formTitle || "Unnamed Form").replace(/\s+/g, "_");
  const creator = data.creatorFirst ? `_${data.creatorFirst}` : "";
  const dated = data.startDate ? `_${data.startDate}` : "";
  const filename = `${titleStr}${creator}${dated}.pdf`;

  pdfMake.createPdf(buildDocDef(data)).download(filename);
}
