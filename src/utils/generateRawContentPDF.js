import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Properly initialize VFS fonts with better error handling
if (pdfFonts) {
  const vfsSource =
    pdfFonts.pdfMake?.vfs ||
    pdfFonts.vfs ||
    pdfFonts.default?.pdfMake?.vfs ||
    pdfFonts.default?.vfs;

  if (vfsSource) {
    pdfMake.vfs = vfsSource;
  } else {
    console.warn('PDF fonts VFS not found - PDF may be missing proper font embedding');
  }
}

const C = {
  brand: "#4f46e5",
  coverBg: "#1e1b4b",
  coverSub: "#a5b4fc",
  labelTxt: "#64748b",
  bodyTxt: "#1e293b",
  border: "#e2e8f0",
  tagBg: "#e0e7ff",
  tagTxt: "#3730a3",
  headerBg: "#312e81",
  headerTxt: "#e0e7ff",
  footerTxt: "#94a3b8",
};

function dash(v) {
  if (Array.isArray(v)) return v.length ? v.join(", ") : "—";
  return v && String(v).trim() ? String(v).trim() : "—";
}

function sectionHeader(title) {
  return {
    table: {
      widths: ["*"],
      body: [[{ text: title.toUpperCase(), fillColor: C.headerBg, color: C.headerTxt, bold: true, fontSize: 10, margin: [8, 5, 8, 5] }]],
    },
    layout: "noBorders",
    margin: [0, 10, 0, 0],
  };
}

function kvTable(rows) {
  return {
    table: {
      widths: ["30%", "70%"],
      body: rows.map(([label, value]) => [
        { text: label, bold: true, fontSize: 9, color: C.tagTxt, fillColor: C.tagBg, margin: [6, 4, 6, 4] },
        { text: dash(value), fontSize: 9, color: C.bodyTxt, margin: [6, 4, 6, 4] },
      ]),
    },
    layout: {
      hLineColor: () => C.border,
      vLineColor: () => C.border,
      hLineWidth: () => 0.5,
      vLineWidth: () => 0.5,
    },
    margin: [0, 0, 0, 4],
  };
}

function shotPlanTable(shotPlan) {
  const header = [
    { text: "#", bold: true, fontSize: 8, color: "#1e1b4b", fillColor: "#c7d2fe", margin: [4, 3, 4, 3] },
    { text: "Type", bold: true, fontSize: 8, color: "#1e1b4b", fillColor: "#c7d2fe", margin: [4, 3, 4, 3] },
    { text: "Duration", bold: true, fontSize: 8, color: "#1e1b4b", fillColor: "#c7d2fe", margin: [4, 3, 4, 3] },
    { text: "Script Line", bold: true, fontSize: 8, color: "#1e1b4b", fillColor: "#c7d2fe", margin: [4, 3, 4, 3] },
    { text: "Action / Camera", bold: true, fontSize: 8, color: "#1e1b4b", fillColor: "#c7d2fe", margin: [4, 3, 4, 3] },
  ];
  const body = (shotPlan || []).map((s) => [
    { text: String(s.shot ?? ""), fontSize: 8, color: C.bodyTxt, margin: [4, 3, 4, 3] },
    { text: dash(s.type), fontSize: 8, color: C.bodyTxt, margin: [4, 3, 4, 3] },
    { text: dash(s.duration), fontSize: 8, color: C.bodyTxt, margin: [4, 3, 4, 3] },
    { text: dash(s.scriptLine), fontSize: 8, color: C.bodyTxt, margin: [4, 3, 4, 3] },
    { text: `${dash(s.action)}${s.cameraMove ? " — " + s.cameraMove : ""}`, fontSize: 8, color: C.bodyTxt, margin: [4, 3, 4, 3] },
  ]);
  return {
    table: { widths: ["6%", "14%", "12%", "32%", "36%"], body: [header, ...body] },
    layout: { hLineColor: () => C.border, vLineColor: () => C.border, hLineWidth: () => 0.5, vLineWidth: () => 0.5 },
    margin: [0, 0, 0, 4],
  };
}

function scriptBlock(script) {
  const lines = (script || "").split(/\n+/).filter((l) => l.trim());
  return lines.map((line) => {
    const isAction = /^\[.*\]/.test(line.trim());
    return {
      text: line.trim(),
      fontSize: 9.5,
      italics: isAction,
      bold: isAction,
      color: isAction ? C.brand : C.bodyTxt,
      margin: [0, 0, 0, 5],
    };
  });
}

function buildDocDef(generatedContent, meta = {}) {
  const { analysis, transformedScript, shotPlan, editInstructions, socialMediaContent } = generatedContent;

  return {
    pageMargins: [36, 40, 36, 40],
    content: [
      {
        table: {
          widths: ["*"],
          body: [
            [
              {
                stack: [
                  { text: "Viral Video Production Guide", color: "#ffffff", fontSize: 20, bold: true, margin: [0, 0, 0, 4] },
                  { text: `Generated · ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}${meta.language ? " · " + meta.language : ""}`, color: C.coverSub, fontSize: 9 },
                ],
                fillColor: C.coverBg,
                margin: [14, 14, 14, 14],
              },
            ],
          ],
        },
        layout: "noBorders",
        margin: [0, 0, 0, 10],
      },

      sectionHeader("Content Analysis"),
      kvTable([
        ["Detected Language", analysis?.detectedLanguage],
        ["Main Message", analysis?.mainMessage],
        ["Target Audience", analysis?.targetAudience],
        ["Hook Type", analysis?.suggestedHookType],
        ["Content Strength", analysis?.contentStrength],
        ["Viral Potential", analysis?.viralPotential ? `${analysis.viralPotential}/10` : "—"],
      ]),

      sectionHeader("Script Overview"),
      kvTable([
        ["Duration", transformedScript?.duration],
        ["Hook Type", transformedScript?.hookType],
        ["Language", transformedScript?.language],
      ]),

      { text: "Full Script", fontSize: 13, bold: true, color: C.brand, margin: [0, 12, 0, 8] },
      ...scriptBlock(transformedScript?.script),

      { text: "Shot Plan", fontSize: 13, bold: true, color: C.brand, margin: [0, 10, 0, 8] },
      shotPlanTable(shotPlan),

      sectionHeader("Edit Instructions"),
      kvTable([
        ["Music", editInstructions?.music],
        ["Pacing", editInstructions?.pacing],
        ["Color Grade", editInstructions?.colorGrade],
        ["Transitions", editInstructions?.transitions],
        ["Text Overlays", editInstructions?.textOverlays],
        ["Sound Design", editInstructions?.soundDesign],
      ]),

      sectionHeader("Social Media Content"),
      kvTable([
        ["Hook Line", socialMediaContent?.hookLine],
        ["Caption", socialMediaContent?.caption],
        ["Call to Action", socialMediaContent?.cta],
        ["Hashtags", socialMediaContent?.hashtags],
      ]),

      { text: "— Generated by Content Formatter · Raw Content Analyzer —", fontSize: 7.5, color: C.footerTxt, italics: true, alignment: "center", margin: [0, 16, 0, 0] },
    ],
    defaultStyle: { font: "Roboto" },
  };
}

export function generateRawContentPDF(generatedContent, meta = {}) {
  try {
    const filename = `viral-video-guide-${Date.now()}.pdf`;
    const docDef = buildDocDef(generatedContent, meta);

    // Validate that we have content to generate
    if (!docDef || !docDef.content || docDef.content.length === 0) {
      throw new Error('No content to generate PDF');
    }

    // Create and download PDF
    const pdfDoc = pdfMake.createPdf(docDef);

    // Use getDataUrl for more reliable download on all platforms
    pdfDoc.download(filename);

    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
}
