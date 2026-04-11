/**
 * generateScript.js
 * Calls the Anthropic Claude API directly from the browser to generate
 * a full viral video production package: script, shot plan, edit instructions, caption.
 *
 * Requires the `anthropic-dangerous-direct-browser-access: true` header for browser CORS.
 */

function buildPrompt(inputs) {
  const ctaWord = inputs.ctaKeyword?.trim() || "LINK";
  const structure = inputs.scriptStructure || "STEP-BY-STEP STRUCTURE";
  const hookType = inputs.hookType || "Tutorial Hook";

  return `You are an expert viral short-form video content creator and production director specializing in the ${inputs.niche || "health & wellness"} niche.

Your job is to generate a COMPLETE viral video production package for the following brand/product. Every output must be specific, actionable, and directly tied to the inputs below.

═══════════════════════════════════════
INPUTS
═══════════════════════════════════════
BRAND / COMPANY     : ${inputs.company || "Not specified"}
NICHE               : ${inputs.niche || "Not specified"}
SUB-NICHE           : ${inputs.subNiche || "Not specified"}
PRODUCT / SERVICE   : ${inputs.product || "Not specified"}
PRODUCT DESCRIPTION : ${inputs.productDescription || "Not specified"}
CAPABILITY PILLARS  : ${inputs.capabilityPillars || "Not specified"}
VALUE PROPOSITION   : ${inputs.value || "Not specified"}
TARGET AUDIENCE     : ${inputs.audience || "Not specified"}
FORMAT TIER         : ${inputs.format || "S-TIER"}
SCRIPT STRUCTURE    : ${structure}
HOOK TYPE           : ${hookType}
CTA KEYWORD         : ${ctaWord}
═══════════════════════════════════════

SCRIPT RULES (STRICTLY FOLLOW):
• 7–9 lines total
• Each line = MAX 8 words — short, punchy, no filler
• Every sentence must earn its place: trigger → reason → bridge
• Written in a natural human voice — NOT robotic or corporate
• Follow the "${structure}" framework exactly
• Last line MUST be: "Comment ${ctaWord}"
• The hook line (line 1) must match the "${hookType}" style

SHOT PLAN RULES:
• One shot card per script line (roughly)
• Include shot type, subject, exact action, camera move, duration
• Be specific — not generic (e.g. "Actor holds product near ear, tilts head")

EDIT INSTRUCTIONS RULES:
• Give specific cut timecodes (0:00–0:02, etc.)
• Text overlay timing must match script lines exactly
• Music: specify genre, BPM range, volume level
• Color grade must match the niche/brand mood

CAPTION RULES:
• Hook line must create curiosity or desire in under 10 words
• Body = 2–3 lines, conversational, no emojis unless niche calls for it
• 8–10 niche-relevant hashtags (mix of broad + niche-specific)

Return ONLY a raw valid JSON object. NO markdown code fences. NO text before or after. Just the JSON.

{
  "script": {
    "lines": [
      "Line 1 — hook (max 8 words)",
      "Line 2",
      "Line 3",
      "Line 4",
      "Line 5",
      "Line 6",
      "Line 7",
      "Comment ${ctaWord}"
    ],
    "estimatedDuration": "20-25s",
    "structure": "${structure}"
  },
  "shotPlan": [
    {
      "shot": 1,
      "type": "Close-up / Wide / Medium / Over-shoulder / B-roll / Product shot",
      "subject": "Who or what the camera points at",
      "action": "Exactly what happens in this shot",
      "duration": "2s",
      "cameraMove": "Static / Slow push in / Pull back / Pan left / Handheld",
      "scriptLine": "The script line spoken during this shot"
    }
  ],
  "editInstructions": {
    "pacing": "Fast (1.5–2s cuts) / Medium (2–3s cuts) / Slow (3–4s cuts)",
    "totalDuration": "25s",
    "music": "Genre, BPM range, energy level, volume instruction",
    "colorGrade": "Warm/cool, contrast level, skin tone note",
    "cuts": [
      "Cut 1 (0:00–0:02): describe the cut and transition",
      "Cut 2 (0:02–0:04): describe the cut and transition"
    ],
    "textOverlays": [
      "0:00 – Text that appears on screen here",
      "0:04 – Next overlay text"
    ],
    "soundDesign": "Any sound effects, silence moments, audio punch-ins",
    "specialNotes": "Any specific editor instructions not covered above"
  },
  "caption": {
    "hookLine": "Strong curiosity/desire opening line for caption",
    "body": "2-3 lines of supporting caption text.\nConversational, not salesy.",
    "cta": "Comment ${ctaWord} and I'll send it to you.",
    "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8"]
  }
}`;
}

export async function generateScript(inputs, apiKey) {
  const prompt = buildPrompt(inputs);

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    let errMsg = `API error ${response.status}`;
    try {
      const err = await response.json();
      errMsg = err.error?.message || errMsg;
    } catch {}
    throw new Error(errMsg);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text || "";

  // Parse JSON — handle both raw JSON and ```json...``` wrapped responses
  let parsed;
  const codeBlock = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  try {
    parsed = JSON.parse(codeBlock ? codeBlock[1].trim() : text.trim());
  } catch {
    // Fallback: extract first { ... } block
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch)
      throw new Error(
        "Could not parse AI response. Please try again.",
      );
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch {
      throw new Error(
        "Invalid JSON in AI response. Please try again.",
      );
    }
  }

  return parsed;
}
