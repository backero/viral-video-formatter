/**
 * Maps a Raw Content Analyzer result onto the same data fields the
 * Traditional Form uses (topic, value, script, hooks, cta...) so that
 * Download PDF, the live preview, and Submit behave the same way
 * regardless of which method created the form.
 *
 * Fields with no AI equivalent (company, format tier, physiological
 * factors, visual hook file upload) are intentionally left untouched —
 * company is collected separately via its own picker, the rest are not
 * required for Raw Content forms (see validateAll in FormEditor.jsx).
 */
export function mapAnalyzedContentToFields(parsed, rawContent) {
  const firstShot = parsed.shotPlan?.[0];

  return {
    topic: (rawContent || "").trim(),
    value: parsed.analysis?.mainMessage || "",
    script: parsed.transformedScript?.script || "",
    cta: parsed.socialMediaContent?.cta || "",
    viralHook: "other",
    viralHookOther: parsed.analysis?.suggestedHookType || "",
    visualHook: firstShot
      ? `${firstShot.action || ""}${firstShot.cameraMove ? " — " + firstShot.cameraMove : ""}`
      : "",
    writtenHook: parsed.socialMediaContent?.hookLine || "",
    audioHook: firstShot?.scriptLine || "",
  };
}
