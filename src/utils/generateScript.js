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
  const language = inputs.language || "English";

  const languageInstruction = {
    English: "Generate the script in clear, conversational English.",
    Tamil: "Generate the script in Tamil script (தமிழ்). Use natural, conversational Tamil.",
    Thanglish: "Generate the script in Thanglish (Tamil written in English letters, code-mixed with English words where natural). Example: 'Ivlo easy illa amma, try this one!'",
    Telugu: "Generate the script in Telugu script (తెలుగు). Use natural, conversational Telugu.",
    Kannada: "Generate the script in Kannada script (ಕನ್ನಡ). Use natural, conversational Kannada.",
    Hindi: "Generate the script in Hindi script (हिंदी). Use natural, conversational Hindi."
  }[language] || "Generate the script in English.";

  return `You are an expert viral short-form video content creator and production director specializing in the ${inputs.niche || "health & wellness"} niche.

Your job is to generate a COMPLETE viral video production package for the following brand/product. Every output must be specific, actionable, and directly tied to the inputs below.

LANGUAGE: ${language}
${languageInstruction}

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

// ── FORM AUTO-FILL GENERATOR ───────────────────────────────────────────────
// Generates script + shot plan + edit notes in the exact PDF "director's guide"
// format shown in the sample document. Returns a JSON object with keys that
// map directly to FormEditor data fields.

function buildFormPrompt(inputs) {
  const cta = inputs.ctaKeyword?.trim() || "LINK";
  const structure = inputs.scriptStructure || "STEP-BY-STEP STRUCTURE";

  return `You are an expert viral video content director, script writer, and production planner.

Generate a COMPLETE video production package for the following brand content. Be SPECIFIC — use the actual product name, niche, and capability pillars in every output. Never use placeholder text.

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
FORMAT              : ${inputs.format || "S-TIER"}
SCRIPT STRUCTURE    : ${structure}
CTA KEYWORD         : ${cta}
═══════════════════════════════════════

SCRIPT RULES:
• 7–9 lines. Each line MAX 8 words. Every sentence earns its place.
• Natural human voice — NOT corporate or robotic.
• Strictly follow the ${structure} framework.
• Last line MUST be exactly: Comment ${cta}

SHOT PLAN RULES:
• One shot per script line (roughly). Include setup checklist first.
• For each shot: What to say (exact quote), Camera angle, Framing, Energy (delivery tone), Action (physical gesture), Good take check (what to verify before moving on).
• Be specific — reference the actual product, not generic descriptions.

EDIT INSTRUCTIONS RULES:
• Numbered 1–11. Then AI Review & Virality Score section.
• Include specific caption text (not placeholders).
• Include specific music genre, BPM, volume %.
• Include colour grade with actual % values.
• AI Review must have: Script Strength, Funnel Alignment, Hook Rating (X/10), Audience Match, Three Lines Rewritten Stronger, Virality Score (X/10), One Big Win.

Return ONLY a raw valid JSON object. No markdown. No explanation. No text before or after.

{
  "script": "Line 1\\nLine 2\\nLine 3\\nLine 4\\nLine 5\\nLine 6\\nLine 7\\nComment ${cta}",

  "topic": "A specific, punchy topic title for this video (e.g. '3 mistakes brand owners make when choosing a manufacturer')",

  "value": "A specific, measurable, immediately actionable value statement tied to the product",

  "cta": "DM me the word ${cta} right now and I'll send you [specific freebie tied to the product and niche].",

  "shotPlan": "SETUP CHECKLIST — DO THIS BEFORE YOU PRESS RECORD\\n✓\\nWear: [specific clothing for the niche/brand tone — e.g. clean collared shirt, lab coat, activewear]\\n✓\\nBackground: [specific background — e.g. clean workspace, product shelves visible, plain wall]\\n✓\\nLighting: [specific lighting instruction — face window or ring light at eye level]\\n✓\\nCamera/phone: Mount at eye level or very slightly above. Never below — it looks unprofessional. 9:16 vertical for Reels.\\n✓\\nSound: Record in a quiet room. If you have a lapel mic, use it. No fans, no AC, no background noise.\\n✓\\nBefore you record: Do a 10-second test clip. Watch back — check light, sound, framing shows head and shoulders with space above.\\n\\nShot 1 — [shot name matching first script line]\\nWhat to say\\n\\"[exact first script line]\\"\\nCamera angle\\n[specific angle e.g. Eye level — straight at camera]\\nFraming\\n[specific framing e.g. Close-up — face and shoulders, head near top third of frame]\\nEnergy\\n[specific delivery e.g. Calm and direct. Like you're telling a friend something important. Not shouting.]\\nAction\\n[specific physical action e.g. Point directly at camera lens on the key word. Pause 1 second after line ends.]\\nGood take check\\n[specific check e.g. Does the gesture feel natural? Is there a clean pause at the end? If yes, move on.]\\n\\n[repeat Shot 2, 3, 4... through to final CTA shot in the same format]",

  "editInstructions": "1\\nClip order: Shot 1 → Shot 2 → [full order]. Do not reorder.\\n2\\nCut points: [specific cut instruction per shot — cut on last consonant of final word, no dead air]\\n3\\nHook placement: Shot 1 is the very first frame. No intro, no logo. First thing viewers hear is the hook. Start music at low volume under it.\\n4\\nCaptions: Bold white text, black outline/shadow. Font: thick sans-serif (Montserrat Bold or similar). Size: large — fills 80% screen width. Position: centre, lower third. Specific caption text for each shot: [list caption text per shot in quotes, separated by · ]\\n5\\nMusic: [specific genre, BPM range, energy level, volume % under voice, fade-in and fade-out timing]\\n6\\nTransitions: Hard cuts only between every clip. No crossfades, no wipes, no zoom transitions. Fast cuts keep energy high on Reels.\\n7\\nText overlays: [specific overlay instructions — e.g. animated number pop-ups for list items, stat lower thirds, etc.]\\n8\\nThumbnail: [specific thumbnail instruction — which shot to use as still, exact text overlay to add]\\n9\\nColour grade: [specific grade — e.g. Slightly warm tone, bring up oranges/yellows by 10%, increase contrast by 15%]\\n10\\nFinal length estimate: [X–Y seconds]. If any shot runs long, trim from the middle of sentences — never the start or end of a point.\\n11\\nExport for Instagram Reels: Resolution 1080 × 1920 (9:16). Frame rate 30fps. Format MP4. Bitrate minimum 3.5 Mbps. No black bars on top or bottom.\\n\\nAI review & virality score\\n1. SCRIPT STRENGTH\\n[specific analysis of this script's structure and effectiveness]\\n\\n2. FUNNEL ALIGNMENT — TOP OF FUNNEL CHECK\\n[Passes/Fails + specific reason]\\n\\n3. HOOK RATING\\n[X/10]\\n[specific analysis of the hook — what works, what could be stronger, optional stronger rewrite]\\n\\n4. AUDIENCE MATCH\\n[specific analysis of how well this connects with the target audience]\\n\\n5. THREE LINES REWRITTEN STRONGER\\nOriginal: \\"[exact line from script]\\"\\nStronger: \\"[stronger version]\\"\\n\\nOriginal: \\"[exact line from script]\\"\\nStronger: \\"[stronger version]\\"\\n\\nOriginal: \\"[exact line from script]\\"\\nStronger: \\"[stronger version]\\"\\n\\nVIRALITY SCORE — INSTAGRAM REELS\\n[X/10]\\n[specific analysis — what makes it shareable, any risk factors, A/B test suggestion]\\n\\nONE BIG WIN\\n[one highly specific improvement — e.g. add B-roll between shots 2 and 3, specific visual idea tied to the product]"
}`;
}

async function callOpenAIAPI(prompt, apiKey) {
  // Use Vercel serverless function to avoid CORS issues
  const response = await fetch("/api/generateScript", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      apiKey,
    }),
  });

  if (!response.ok) {
    let errMsg = `API error ${response.status}`;
    try {
      const err = await response.json();
      errMsg = err.error || errMsg;
    } catch {}
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data.content || "";
}

function parseJSON(text) {
  const codeBlock = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  try {
    return JSON.parse(codeBlock ? codeBlock[1].trim() : text.trim());
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Could not parse AI response. Please try again.");
    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      throw new Error("Invalid JSON in AI response. Please try again.");
    }
  }
}

// Auto-fills form fields: script, topic, value, cta, shotPlan (→ techDiscussion),
// editInstructions (→ editorNotes)
export async function generateFormScript(formData, extraInputs, apiKey) {
  const inputs = { ...formData, ...extraInputs };
  const prompt = buildFormPrompt(inputs);
  const text = await callOpenAIAPI(prompt, apiKey);
  return parseJSON(text);
}

export async function generateScript(inputs, apiKey) {
  const prompt = buildPrompt(inputs);
  const text = await callOpenAIAPI(prompt, apiKey);
  return parseJSON(text);
}
