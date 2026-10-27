import { generatePDF } from "./generatePDF";
import { generateRawContentPDF } from "./generateRawContentPDF";

/**
 * Single entry point for "Download PDF" across the app (FormEditor, Dashboard).
 * Routes to the right generator based on which method the form was created with —
 * the Traditional fields (data.script, data.niche, ...) are never populated when
 * a form was built via Raw Content Analysis, so generatePDF(data) alone produced
 * a blank report for those forms.
 */
export function generateFormPDF(data) {
  if (data.formMethod === "rawContent") {
    if (!data.analyzedContent) {
      throw new Error(
        "This form was created with Raw Content Analysis but hasn't been analyzed yet. Open the form and click \"Analyze & Generate Script\" first.",
      );
    }
    return generateRawContentPDF(data.analyzedContent, {
      language: data.analyzedContent?.analysis?.detectedLanguage,
    });
  }
  return generatePDF(data);
}
