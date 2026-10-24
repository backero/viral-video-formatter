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

const BRAND = "4F46E5";
const LABEL_BG = "EEF2FF";
const HEADER_BG = "312E81";
const BORDER_CLR = "C7D2FE";

const cellBorder = (color = BORDER_CLR) => ({
  top: { style: BorderStyle.SINGLE, size: 1, color },
  bottom: { style: BorderStyle.SINGLE, size: 1, color },
  left: { style: BorderStyle.SINGLE, size: 1, color },
  right: { style: BorderStyle.SINGLE, size: 1, color },
});

function dash(v) {
  if (Array.isArray(v)) return v.length ? v.join(", ") : "—";
  return v && String(v).trim() ? String(v).trim() : "—";
}

function labelCell(text, widthPct = 30) {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: LABEL_BG },
    borders: cellBorder(),
    margins: { top: 80, bottom: 80, left: 120, right: 80 },
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold: true, size: 20, color: "3730A3", font: "Calibri" })],
      }),
    ],
  });
}

function valueCell(text, widthPct = 70) {
  const str = dash(text);
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    borders: cellBorder(),
    margins: { top: 80, bottom: 80, left: 120, right: 80 },
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: str, size: 20, color: str === "—" ? "94A3B8" : "1E293B", italics: str === "—", font: "Calibri" }),
        ],
      }),
    ],
  });
}

function dataRow(label, value) {
  return new TableRow({ children: [labelCell(label), valueCell(value)] });
}

function sectionHeaderRow(title, span = 2) {
  return new TableRow({
    children: [
      new TableCell({
        columnSpan: span,
        shading: { type: ShadingType.CLEAR, fill: HEADER_BG },
        borders: cellBorder(HEADER_BG),
        margins: { top: 100, bottom: 100, left: 120, right: 80 },
        children: [
          new Paragraph({
            children: [new TextRun({ text: title.toUpperCase(), bold: true, size: 22, color: "E0E7FF", font: "Calibri" })],
          }),
        ],
      }),
    ],
  });
}

function sectionTable(title, rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { top: 0, bottom: 0 },
    rows: [sectionHeaderRow(title), ...rows.map(([l, v]) => dataRow(l, v))],
  });
}

function spacer(size = 160) {
  return new Paragraph({ spacing: { after: size }, children: [new TextRun({ text: "" })] });
}

function headCell(text, widthPct) {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, fill: "C7D2FE" },
    borders: cellBorder(),
    margins: { top: 60, bottom: 60, left: 100, right: 80 },
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 18, color: "1E1B4B", font: "Calibri" })] })],
  });
}

function bodyCell(text, widthPct) {
  const str = dash(text);
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    borders: cellBorder(),
    margins: { top: 60, bottom: 60, left: 100, right: 80 },
    children: [new Paragraph({ children: [new TextRun({ text: str, size: 18, color: "1E293B", font: "Calibri" })] })],
  });
}

function shotPlanTable(shotPlan) {
  const cols = [8, 16, 12, 30, 34];
  const headers = ["#", "Type", "Duration", "Script Line", "Action / Camera"];
  const headerRow = new TableRow({ children: headers.map((h, i) => headCell(h, cols[i])) });
  const rows = (shotPlan || []).map(
    (s) =>
      new TableRow({
        children: [
          bodyCell(String(s.shot ?? ""), cols[0]),
          bodyCell(s.type, cols[1]),
          bodyCell(s.duration, cols[2]),
          bodyCell(s.scriptLine, cols[3]),
          bodyCell(`${dash(s.action)}${s.cameraMove ? " — " + s.cameraMove : ""}`, cols[4]),
        ],
      })
  );
  return new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [headerRow, ...rows] });
}

function scriptParagraphs(script) {
  const lines = (script || "").split(/\n+/).filter((l) => l.trim());
  return lines.map((line) => {
    const isAction = /^\[.*\]/.test(line.trim());
    return new Paragraph({
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: line.trim(),
          size: 20,
          font: "Calibri",
          italics: isAction,
          bold: isAction,
          color: isAction ? "4F46E5" : "1E293B",
        }),
      ],
    });
  });
}

export async function generateRawContentWord(generatedContent, meta = {}) {
  const { analysis, transformedScript, shotPlan, editInstructions, socialMediaContent } = generatedContent;

  const children = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [new TextRun({ text: "Viral Video Production Guide", bold: true, size: 48, color: BRAND, font: "Calibri" })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({
          text: `Generated on ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}${meta.language ? ` · Language: ${meta.language}` : ""}`,
          size: 20,
          color: "64748B",
          font: "Calibri",
        }),
      ],
    }),

    sectionTable("Content Analysis", [
      ["Detected Language", analysis?.detectedLanguage],
      ["Main Message", analysis?.mainMessage],
      ["Target Audience", analysis?.targetAudience],
      ["Hook Type", analysis?.suggestedHookType],
      ["Content Strength", analysis?.contentStrength],
      ["Viral Potential", analysis?.viralPotential ? `${analysis.viralPotential}/10` : "—"],
    ]),
    spacer(),

    sectionTable("Script Overview", [
      ["Duration", transformedScript?.duration],
      ["Hook Type", transformedScript?.hookType],
      ["Language", transformedScript?.language],
    ]),
    spacer(80),

    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 120, after: 160 },
      children: [new TextRun({ text: "Full Script", bold: true, size: 26, color: BRAND, font: "Calibri" })],
    }),
    ...scriptParagraphs(transformedScript?.script),
    spacer(),

    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 120, after: 160 },
      children: [new TextRun({ text: "Shot Plan", bold: true, size: 26, color: BRAND, font: "Calibri" })],
    }),
    shotPlanTable(shotPlan),
    spacer(),

    sectionTable("Edit Instructions", [
      ["Music", editInstructions?.music],
      ["Pacing", editInstructions?.pacing],
      ["Color Grade", editInstructions?.colorGrade],
      ["Transitions", editInstructions?.transitions],
      ["Text Overlays", editInstructions?.textOverlays],
      ["Sound Design", editInstructions?.soundDesign],
    ]),
    spacer(),

    sectionTable("Social Media Content", [
      ["Hook Line", socialMediaContent?.hookLine],
      ["Caption", socialMediaContent?.caption],
      ["Call to Action", socialMediaContent?.cta],
      ["Hashtags", socialMediaContent?.hashtags],
    ]),
    spacer(80),

    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "— Generated by Content Formatter · Raw Content Analyzer —", size: 16, color: "94A3B8", italics: true, font: "Calibri" })],
    }),
  ];

  const doc = new Document({
    creator: "Content Formatter",
    title: "Viral Video Production Guide",
    styles: { default: { document: { run: { font: "Calibri", size: 20 } } } },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
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
  a.download = `viral-video-guide-${Date.now()}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
