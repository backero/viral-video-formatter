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
    const { research } = req.body;

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

Generate exactly 3 options, each a genuinely different angle on the same research. Use only facts present in the research above — do not invent statistics.`;

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
    const { topic, whyTheyCare, proof, visualHook, writtenHook, audioHook, lengthSec } = req.body;

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

The 5 scenes must be named exactly: "THE HOOK" (0-3s), "AUTHORITY GAP" (3-8s), "THE HACK" (8-15s), "THE PROOF" (15-25s), "CTA" (25-${totalLength}s). Adjust timing proportionally if length differs from 30s. Use only the topic/hook information given — do not invent unrelated facts.`;

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`ViralForm backend running on http://localhost:${PORT}`);
  console.log(`API key loaded: ${process.env.ANTHROPIC_API_KEY ? 'yes' : 'NO - set it in server/.env'}`);
});