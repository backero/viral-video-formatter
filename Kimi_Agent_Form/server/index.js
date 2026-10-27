import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = 'claude-sonnet-4-5-20250929';

const LANGUAGE_NAMES = {
  EN: 'English',
  HI: 'Hindi (Devanagari script)',
  TA: 'Tamil (Tamil script)',
  'HIN-EN': 'Hinglish (Hindi-English code-mixed, written in Latin script, the way Indian creators actually speak on camera)',
  'TAM-EN': 'Tanglish (Tamil-English code-mixed, written in Latin script, the way Indian creators actually speak on camera)',
};

function languageInstruction(code) {
  const name = LANGUAGE_NAMES[code] || 'English';
  if (!code || code === 'EN') return '';
  return `\n\nIMPORTANT: Write all dialogue, on-screen text, and creative content in ${name}. Field names/keys in the JSON stay in English, but the actual content values (dialogue, hooks, evidence text) must be in ${name}.`;
}

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, hasKey: Boolean(process.env.ANTHROPIC_API_KEY) });
});

/**
 * POST /api/extract-nuggets
 * Body: { research: string, niche?: string }
 * Returns 3 "nugget" options extracted from the raw research dump,
 * in the exact shape the Phase1 UI expects.
 */
app.post('/api/extract-nuggets', async (req, res) => {
  try {
    const { research, language } = req.body;

    if (!research || research.length < 50) {
      return res.status(400).json({ error: 'research text is too short' });
    }

    const prompt = `You are helping a short-form video creator turn raw research notes into 3 distinct "single point" options for a viral video script.

RAW RESEARCH:
"""
${research}
"""

Return ONLY valid JSON (no markdown fences, no preamble) in this exact shape:

{
  "options": [
    {
      "title": "short label for this angle (max 8 words)",
      "whyItWorks": "one sentence on why this specific angle would stop a scroller (max 40 words)",
      "point": "the single point the video will make (max 20 words)",
      "whyTheyCare": "why the audience cares, ideally with a stat from the research (max 20 words)",
      "proof": "credibility/proof point pulled from the research (max 20 words)"
    }
  ]
}

Generate exactly 3 options, each a genuinely different angle on the same research. Use only facts present in the research above — do not invent statistics.${languageInstruction(language)}`;

    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const textBlock = message.content.find((block) => block.type === 'text');
    const raw = textBlock ? textBlock.text : '{}';
    const cleaned = raw.replace(/```json|```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      return res.status(502).json({ error: 'AI returned non-JSON output', raw: cleaned });
    }

    res.json(parsed);
  } catch (err) {
    console.error('extract-nuggets error:', err);
    res.status(500).json({ error: err.message || 'internal error' });
  }
});

/**
 * POST /api/generate-screenplay
 * Body: { topic, whyTheyCare, proof, visualHook, writtenHook, audioHook, lengthSec }
 * Returns a 5-scene screenplay in the exact shape the Phase 3 UI expects.
 */
app.post('/api/generate-screenplay', async (req, res) => {
  try {
    const { topic, whyTheyCare, proof, visualHook, writtenHook, audioHook, lengthSec, language } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'topic is required' });
    }

    const totalLength = Number(lengthSec) || 30;

    const prompt = `You are a short-form video screenwriter. Write a ${totalLength}-second, 5-scene viral video screenplay for this topic.

TOPIC: ${topic}
WHY AUDIENCE CARES: ${whyTheyCare || 'not specified'}
PROOF POINT: ${proof || 'not specified'}
HOOK (visual): ${visualHook || 'not specified'}
HOOK (written/on-screen text): ${writtenHook || 'not specified'}
HOOK (audio/voice tone): ${audioHook || 'not specified'}

Return ONLY valid JSON (no markdown fences, no preamble) as an array of exactly 5 scenes, this exact shape:

[
  {
    "sceneNum": 1,
    "name": "THE HOOK",
    "timingStart": 0.0,
    "timingEnd": 3.0,
    "duration": 3.0,
    "dialogue": "what the actor says, 1-8 word staccato beats",
    "action": "(Actor: physical action description)",
    "camera": { "shot": "Close-up/Medium/etc", "angle": "Low angle/Eye level/etc", "movement": "camera movement description" },
    "actor": { "expression": "emotional expression", "energy": 9, "pace": "Fast/Normal/Slow" },
    "visual": "on-screen text overlay description with timing",
    "audio": "music/SFX description with timing",
    "editMarkers": [
      { "time": "0.0s", "event": "what happens at this timestamp" }
    ]
  }
]

The 5 scenes must be named exactly: "THE HOOK", "AUTHORITY GAP", "THE HACK", "THE PROOF", "CTA".

CRITICAL TIMING RULE: "THE HOOK" (scene 1) must ALWAYS last only 2-3 seconds total (timingStart: 0, timingEnd: between 2 and 3), no matter how long the overall video is. This is non-negotiable — a hook longer than 3 seconds fails scroll-stop performance. Only scenes 2-5 scale proportionally to fill the remaining ${totalLength - 3} seconds after the hook. Use only the topic/hook information given — do not invent unrelated facts. Scene "name" values stay in English (THE HOOK, AUTHORITY GAP, etc.) — only dialogue/visual/audio content changes language.${languageInstruction(language)}`;

    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    });

    const textBlock = message.content.find((block) => block.type === 'text');
    const raw = textBlock ? textBlock.text : '[]';
    const cleaned = raw.replace(/```json|```/g, '').trim();

    let scenes;
    try {
      scenes = JSON.parse(cleaned);
    } catch (e) {
      return res.status(502).json({ error: 'AI returned non-JSON output', raw: cleaned });
    }

    res.json({ scenes });
  } catch (err) {
    console.error('generate-screenplay error:', err);
    res.status(500).json({ error: err.message || 'internal error' });
  }
});

const GOLDEN_RULES_LIST = [
  // Golden Rules
  { id: 'GR01', name: 'Demonstration-First Dialogue', desc: 'Can this be SHOWN instead of SAID? If yes, move to visual. Dialogue is the fallback.' },
  { id: 'GR02', name: 'Action-to-Dialogue Ratio >= 2.0', desc: 'For every spoken word, >= 2 words of action/visual description must accompany it.' },
  { id: 'GR03', name: 'Silent-Runtime Quota by Format', desc: 'At least 20-50% of runtime (depending on format) should have no dialogue — just visual/action.' },
  { id: 'GR04', name: 'Hook Parseable Muted', desc: 'Hook visual + caption alone must carry the full message. VO is multiplier, not carrier.' },
  { id: 'GR05', name: 'Broad -> Narrow -> Niche', desc: 'Hook = BROAD (universal). Body = NARROW (target audience). CTA = NICHE (only right people convert).' },
  { id: 'GR06', name: "Show, Don't Tell", desc: 'Every fact is DEMONSTRATED. Numbers on screen simultaneously. Objects visible. Actions performed.' },
  { id: 'GR07', name: 'Visual Change Every 2 Seconds', desc: 'No static talking-head shot longer than 2 seconds without a cut, text, prop, or gesture change.' },
  { id: 'GR08', name: 'Silent Moments Mandatory', desc: 'Reaction beats, product reveals, and pre-CTA freezes should have brief silent moments.' },
  { id: 'GR09', name: 'Bridge Words Between Scenes', desc: 'Scenes should connect with bridge phrases ("And...", "But here\'s...", "So now...") rather than abrupt jumps.' },
  { id: 'GR10', name: 'Action-Integrated Dialogue', desc: 'Every line specifies WHAT THE ACTOR IS DOING, not just what they say.' },
  { id: 'GR11', name: 'Tri-Modal Convergence in 0-1.5s', desc: 'Visual, audio, and on-screen text should all activate within the first 1.5 seconds.' },
  { id: 'GR12', name: 'Research Fidelity Carry-Over', desc: 'Numeric claims in the screenplay must match the original research/proof points exactly. No inflation.' },
  { id: 'GR13', name: 'Studio-Realistic Scope', desc: 'Every camera move, prop, and actor count must be realistically achievable with a small studio setup.' },
  { id: 'GR14', name: 'Caption Coverage = 100%', desc: 'Every spoken word must be coverable by on-screen captions (dialogue should be caption-friendly length).' },
  { id: 'GR15', name: 'One Peak Per Video', desc: 'Exactly ONE high-energy/emphasis moment across all scenes, not multiple competing peaks.' },
  { id: 'GR16', name: 'Hook > Script > Format > Edit Priority', desc: 'The hook (scene 1) should receive the most production attention/detail of any scene.' },
  { id: 'GR18', name: 'Mobile-First Safe Zone Compliance', desc: 'On-screen text should be described as centered/safe for mobile vertical video, not edge-cropped.' },
  // Quality Gate
  { id: 'QG01', name: 'Scroll-Stop in 0.5s', desc: 'Face, motion, and text should all appear within the first 0.5 seconds to stop a scroll.' },
  { id: 'QG02', name: 'Value in First 3-5s', desc: 'The core value promise must be clear from dialogue within the first 3-5 seconds.' },
  { id: 'QG03', name: 'Natural When Read Aloud', desc: 'Dialogue should sound conversational, not corporate or robotic, when read aloud.' },
  { id: 'QG04', name: '10-Year-Old Understands', desc: 'No unexplained jargon in the hook; language should be simple enough for a general audience.' },
  { id: 'QG05', name: 'Cameraman Knows What to Do', desc: 'Every scene must specify shot type, angle, and camera movement unambiguously.' },
  { id: 'QG06', name: 'Actor Knows Expression/Pace/Energy', desc: 'Every scene must specify actor expression, energy level, and pace unambiguously.' },
  { id: 'QG07', name: 'Editor Knows Where Every Cut Happens', desc: 'Every scene must have specific timestamped edit markers, not vague instructions.' },
  { id: 'QG08', name: 'Exactly One CTA <=5 Words at End', desc: 'The final scene should have exactly one short call-to-action (5 words or fewer).' },
  { id: 'QG09', name: 'Muted Viewer Understands Everything', desc: 'A viewer with no sound should be able to follow the full story via visuals/text alone.' },
  { id: 'QG10', name: 'Visual Change Every 2 Seconds (Quality)', desc: 'Same as GR07 — check for any scene with a static segment longer than 2 seconds.' },
  // Neuroscience
  { id: 'NS02', name: 'Multimodal Convergence Density', desc: 'Most scenes should combine visual + audio + text simultaneously (tri-modal), not just one or two.' },
  { id: 'NS04', name: 'DMN (Self-Reference) Density', desc: 'Dialogue should use "you/your" at a healthy density (roughly 2+ per 10 words) to trigger self-relevance.' },
  { id: 'NS07', name: 'Variable-Pace Prosody', desc: 'Pace should vary meaningfully across scenes (not monotone) — e.g. fast hook, normal body, urgent CTA.' },
  // Staccato
  { id: 'SA01', name: 'Beat Length <= 8 Words', desc: 'No single dialogue line should exceed 8 words.' },
  { id: 'SA04', name: 'You/Your Density', desc: 'Dialogue should use "you/your" at a healthy density (roughly 2+ per 10 words total).' },
  { id: 'SA05', name: 'Forbidden Words Absent', desc: 'Dialogue must avoid cliche hype words: "revolutionary", "game-changer", "unlock", "secret", "insane", "mind-blowing".' },
  // PBL
  { id: 'PBL01', name: 'SEE / READ / HEAR Triple-Hook', desc: 'Scene 1 should have a visual element, an on-screen text element, and a spoken element all present.' },
  { id: 'PBL04', name: 'Broad-Hook Test', desc: 'The hook dialogue must be universal/broad, not niche jargon that only insiders understand.' },
  // CTA
  { id: 'CT01', name: 'CTA Freeze Frame', desc: 'The final scene should include a brief freeze-frame moment for the CTA.' },
  { id: 'CT03', name: 'Single CTA Only', desc: 'There should be exactly one call-to-action moment, not multiple competing CTAs across scenes.' },
];

/**
 * POST /api/validate-screenplay
 * Body: { scenes: SceneBeat[] }
 * Returns real PASS/FAIL evaluation of the actual screenplay against the Golden Rules.
 */
app.post('/api/validate-screenplay', async (req, res) => {
  try {
    const { scenes } = req.body;
    if (!Array.isArray(scenes) || scenes.length === 0) {
      return res.status(400).json({ error: 'scenes array is required' });
    }

    const screenplayText = scenes
      .map(s => `Scene ${s.sceneNum} (${s.name}, ${s.timingStart}-${s.timingEnd}s):\nDialogue: "${s.dialogue}"\nAction: ${s.action}\nVisual: ${s.visual}\nAudio: ${s.audio}`)
      .join('\n\n');

    const rulesText = GOLDEN_RULES_LIST.map(r => `${r.id} - ${r.name}: ${r.desc}`).join('\n');

    const prompt = `You are a strict video-script quality validator. Evaluate this actual screenplay against each rule below. Be honest — most real first-draft screenplays fail at least 2-3 rules.

SCREENPLAY (the ONLY content you may reference — do not use any other topic, product, or example):
${screenplayText}

RULES TO CHECK:
${rulesText}

CRITICAL RULES FOR YOUR RESPONSE:
- "evidence" and "suggestedFix" must ONLY reference scenes, dialogue, numbers, and details that literally appear in the SCREENPLAY above.
- NEVER invent or reference an unrelated example topic (e.g. skincare, serums, or any product/subject not in the screenplay above). If you need to illustrate a rewrite, rewrite using the ACTUAL dialogue words from the screenplay, not a generic template.
- If you are unsure what to suggest, describe the fix abstractly (e.g. "add a bridge phrase at the start of Scene 2") rather than inventing fabricated dialogue.

Return ONLY valid JSON (no markdown fences, no preamble), an array with one object per rule, this exact shape:

[
  { "id": "GR01", "result": "PASS or FAIL", "evidence": "one specific sentence citing what in THIS screenplay supports the verdict (reference actual scene numbers/dialogue)", "suggestedFix": "if FAIL, one concrete fix using only this screenplay's actual content; if PASS, empty string" }
]

Return exactly ${GOLDEN_RULES_LIST.length} objects, one per rule ID listed above, in the same order.`;

    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 8192,
      messages: [{ role: 'user', content: prompt }],
    });

    const textBlock = message.content.find((block) => block.type === 'text');
    const raw = textBlock ? textBlock.text : '[]';
    const cleaned = raw.replace(/```json|```/g, '').trim();

    let results;
    try {
      results = JSON.parse(cleaned);
    } catch (e) {
      return res.status(502).json({ error: 'AI returned non-JSON output', raw: cleaned });
    }

    res.json({ results });
  } catch (err) {
    console.error('validate-screenplay error:', err);
    res.status(500).json({ error: err.message || 'internal error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`ViralForm backend running on http://localhost:${PORT}`);
  console.log(`API key loaded: ${process.env.ANTHROPIC_API_KEY ? 'yes' : 'NO - set it in server/.env'}`);
});
