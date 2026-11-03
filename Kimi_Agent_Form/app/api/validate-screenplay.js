// Language detection function
function detectLanguage(text) {
  if (!text) return 'EN';

  // Tamil Unicode range: U+0B80 to U+0BFF
  const tamilRegex = /[஀-௿]/g;
  const tamilCount = (text.match(tamilRegex) || []).length;

  // Hindi Unicode range: U+0900 to U+097F
  const hindiRegex = /[ऀ-ॿ]/g;
  const hindiCount = (text.match(hindiRegex) || []).length;

  // If significant Tamil/Hindi characters detected (lowered threshold to 5%)
  if (tamilCount > text.length * 0.05) return 'TA'; // Tamil
  if (hindiCount > text.length * 0.05) return 'HI'; // Hindi

  // Default to English
  return 'EN';
}

// The full 58-check catalog. Keep ids/names/categories in sync with
// Kimi_Agent_Form/app/src/pages/Phase4.tsx's INITIAL_CHECKS — the frontend
// merges results onto that list by id, so every id listed here must exist there.
const CHECKS = [
  // Golden Rules (18)
  { id: 'GR01', name: 'Demonstration-First Dialogue', desc: 'Can this be SHOWN instead of SAID? If yes, it should be visual. Dialogue is the fallback.' },
  { id: 'GR02', name: 'Action-to-Dialogue Ratio >= 2.0', desc: 'For every spoken word, there should be roughly 2+ words of action/visual description accompanying it.' },
  { id: 'GR03', name: 'Silent-Runtime Quota by Format', desc: 'At least 20-50% of runtime should have no dialogue — just visual/action.' },
  { id: 'GR04', name: 'Hook Parseable Muted (Full Video)', desc: "The hook's visual + on-screen text alone must carry the full message. Voiceover should be a multiplier, not the carrier." },
  { id: 'GR05', name: 'Broad -> Narrow -> Niche', desc: 'Hook should be BROAD/universal. Body should NARROW to the target audience. CTA should be NICHE (only the right people convert).' },
  { id: 'GR06', name: "Show, Don't Tell", desc: 'Every fact should be DEMONSTRATED — numbers on screen simultaneously, objects visible, actions performed, not just stated.' },
  { id: 'GR07', name: 'Visual Change Every 2 Seconds', desc: 'No static talking-head shot should run longer than 2 seconds without a cut, text change, prop, or gesture change.' },
  { id: 'GR08', name: 'Silent Moments Mandatory', desc: 'Reaction beats, reveals, and pre-CTA freezes should include brief silent moments.' },
  { id: 'GR09', name: 'Bridge Words Between Scenes', desc: 'Scenes should connect with bridge phrases ("And...", "But here\'s...", "So now...") rather than abrupt jumps.' },
  { id: 'GR10', name: 'Action-Integrated Dialogue', desc: 'Every dialogue line should specify WHAT THE ACTOR IS DOING, not just what they say.' },
  { id: 'GR11', name: 'Tri-Modal Convergence in 0-1.5s', desc: 'Visual, audio, and on-screen text should all activate within the first 1.5 seconds.' },
  { id: 'GR12', name: 'Research Fidelity Carry-Over', desc: 'Numeric claims in the screenplay must match the research/proof points given. No inflation or invented stats.' },
  { id: 'GR13', name: 'Studio-Realistic Scope', desc: 'Every camera move, prop, and actor count must be realistically achievable with a small studio setup.' },
  { id: 'GR14', name: 'Caption Coverage = 100%', desc: 'Every spoken word must be coverable by on-screen captions (dialogue should be caption-friendly length).' },
  { id: 'GR15', name: 'One Peak Per Video', desc: 'There should be exactly ONE high-energy/emphasis moment across all scenes, not multiple competing peaks.' },
  { id: 'GR16', name: 'Hook > Script > Format > Edit Priority', desc: 'Scene 1 (the hook) should receive the most production detail/attention of any scene.' },
  { id: 'GR17', name: '5x Outlier Match', desc: "If a reference video was supplied, the screenplay's structure should adapt the pattern that made that reference go viral. If no reference video context is present, mark N/A." },
  { id: 'GR18', name: 'Mobile-First Safe Zone Compliance', desc: 'On-screen text should be described as centered/safe for mobile vertical video, not edge-cropped.' },
  // Quality Gate (10)
  { id: 'QG01', name: 'Scroll-Stop in 0.5s', desc: 'Face, motion, and text should all appear within the first 0.5 seconds to stop a scroll.' },
  { id: 'QG02', name: 'Value in First 3-5s', desc: 'The core value promise must be clear from dialogue within the first 3-5 seconds.' },
  { id: 'QG03', name: 'Natural When Read Aloud', desc: 'Dialogue should sound conversational, not corporate or robotic, when read aloud.' },
  { id: 'QG04', name: '10-Year-Old Understands', desc: 'No unexplained jargon in the hook; language should be simple enough for a general audience.' },
  { id: 'QG05', name: 'Cameraman Knows What to Do', desc: 'Every scene must specify shot type, angle, and camera movement unambiguously.' },
  { id: 'QG06', name: 'Actor Knows Expression/Pace/Energy', desc: 'Every scene must specify actor expression, energy level, and pace unambiguously.' },
  { id: 'QG07', name: 'Editor Knows Where Every Cut Happens', desc: 'Every scene must have specific timestamped edit markers, not vague instructions.' },
  { id: 'QG08', name: 'Exactly One CTA <=5 Words at End', desc: 'The final scene should have exactly one short call-to-action (5 words or fewer).' },
  { id: 'QG09', name: 'Muted Viewer Understands Everything', desc: 'A viewer with no sound should be able to follow the full story via visuals/text alone.' },
  { id: 'QG10', name: 'Visual Change Every 2 Seconds (Quality)', desc: 'Same as GR07 — flag any scene with a static segment longer than 2 seconds.' },
  // Neuroscience (8)
  { id: 'NS01', name: 'Brain Region Coverage Completeness', desc: 'Across the full screenplay, faces/motion/on-screen text/audio/self-reference/action/objects/numbers should each appear at least once — a broad spread of attention triggers, not just one or two.' },
  { id: 'NS02', name: 'Multimodal Convergence Density', desc: 'Most scenes should combine visual + audio + text simultaneously (tri-modal), not just one or two.' },
  { id: 'NS03', name: 'Hemodynamic Delay Alignment', desc: "The single energy peak and the CTA should be separated by a few seconds so the peak has time to land before the ask." },
  { id: 'NS04', name: 'DMN (Self-Reference) Density', desc: 'Dialogue should use "you/your" at a healthy density (roughly 2+ per 10 words) to trigger self-relevance.' },
  { id: 'NS05', name: 'VWFA Stimulation Density', desc: 'Most scenes should carry on-screen text, not just the hook — text reinforcement should continue past Scene 1.' },
  { id: 'NS06', name: 'Auditory Cortex Onset Compliance', desc: 'The first spoken word or sound should start at or near 0.0s of the hook — no dead air before the hook begins.' },
  { id: 'NS07', name: 'Variable-Pace Prosody', desc: 'Pace should vary meaningfully across scenes (not monotone) — e.g. fast hook, normal body, urgent CTA.' },
  { id: 'NS08', name: 'Hook Visual Hierarchy in 0.5s', desc: 'Scene 1 should layer a face/subject, motion, and on-screen text within the first 0.5 seconds, not just one of the three.' },
  // Staccato (6)
  { id: 'SA01', name: 'Beat Length <= 8 Words', desc: 'No single dialogue line should exceed 8 words.' },
  { id: 'SA02', name: 'No Conjunctions Between Beats', desc: 'Dialogue beats should land as hard stops, not stitched together with "and"/"but" mid-sentence — let cuts and periods carry the transition.' },
  { id: 'SA03', name: '5th-Grade Readability', desc: 'Dialogue should read at roughly a 5th-grade reading level or simpler across hook, body, and CTA.' },
  { id: 'SA04', name: 'You/Your Density', desc: 'Dialogue should use "you/your" at a healthy density (roughly 2+ per 10 words total).' },
  { id: 'SA05', name: 'Forbidden Words Absent', desc: 'Dialogue must avoid cliche hype words: "revolutionary", "game-changer", "unlock", "secret", "insane", "mind-blowing".' },
  { id: 'SA06', name: 'Pronunciation Notes for Technical Terms', desc: 'Any technical, foreign, or hard-to-pronounce term in dialogue should have a pronunciation note; if no such terms exist, mark N/A.' },
  // PBL (5)
  { id: 'PBL01', name: 'SEE / READ / HEAR Triple-Hook Present', desc: 'Scene 1 should have a visual element, an on-screen text element, and a spoken element all present.' },
  { id: 'PBL02', name: 'Visual Hook >= Verbal Hook', desc: 'The visual/text hook should carry the message on its own, at least as strongly as the spoken hook.' },
  { id: 'PBL03', name: 'Muted-Parse Test', desc: 'Cross-check with GR04/QG09: a viewer with sound off can still understand Scene 1\'s hook from visual + text alone.' },
  { id: 'PBL04', name: 'Broad-Hook Test', desc: 'The hook dialogue must be universal/broad, not niche jargon that only insiders understand.' },
  { id: 'PBL05', name: '4-Component Script Anatomy Present', desc: 'Each scene should specify camera notes, dialogue/action, an on-screen caption/text plan, and audio — all four components present.' },
  // Studio (4)
  { id: 'ST01', name: 'Actor Count vs Format Skin', desc: 'The number of actors implied by the scenes should match what the chosen format actually needs — not more or fewer.' },
  { id: 'ST02', name: 'Lighting Setups <= Available', desc: 'The number of distinct lighting setups implied by the scenes should be achievable with a small studio (keep it simple, 1-2 setups).' },
  { id: 'ST03', name: 'B-roll Source Availability', desc: 'Any B-roll or cutaway referenced should be simple to shoot in-house (props, screens, hands), not stock footage or external sourcing.' },
  { id: 'ST04', name: 'Custom Animation Lead Time', desc: 'Any on-screen animation (count-ups, graphs, motion graphics) should be flagged clearly enough that an editor knows it needs lead time.' },
  // CTA (4)
  { id: 'CT01', name: 'CTA Freeze Frame', desc: 'The final scene should include a brief freeze-frame moment for the CTA.' },
  { id: 'CT02', name: 'CTA Text <= 5 Words', desc: 'The on-screen CTA text itself should be 5 words or fewer.' },
  { id: 'CT03', name: 'Single CTA Only', desc: 'There should be exactly one call-to-action moment, not multiple competing CTAs across scenes.' },
  { id: 'CT04', name: 'Export Specs Present', desc: 'The brief should document (or clearly imply via platform/aspect ratio) the intended export specs.' },
  // MultiLang (2)
  { id: 'ML01', name: 'Language Tag Consistency', desc: 'If the screenplay mixes languages, each scene\'s dialogue should be consistently tagged; if single-language, mark N/A.' },
  { id: 'ML02', name: 'Caption Coverage Per Language', desc: 'If multiple languages are used, captions should be planned for each; if single-language, mark N/A.' },
  // Reference (1)
  { id: 'RV01', name: 'Reference Video Match Compliance', desc: 'If a reference video/element to copy was supplied, check the screenplay actually incorporates it; if none was supplied, mark N/A.' },
];

// Vercel Serverless Function for AI Screenplay Validation
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { scenes } = req.body;

  if (!scenes || !Array.isArray(scenes) || scenes.length === 0) {
    return res.status(400).json({ error: 'Scenes array required' });
  }

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY not set');
      return res.status(500).json({ error: 'API key not configured' });
    }

    const screenplayText = scenes
      .map((s) => {
        const camera = [s.cameraShot, s.cameraAngle, s.cameraMovement].filter(Boolean).join(', ');
        const actor = [
          s.actorExpression,
          s.actorEnergy != null ? `energy ${s.actorEnergy}/10` : null,
          s.actorPace,
        ]
          .filter(Boolean)
          .join(', ');
        let markersText = '';
        if (s.editMarkers) {
          try {
            const markers = typeof s.editMarkers === 'string' ? JSON.parse(s.editMarkers) : s.editMarkers;
            if (Array.isArray(markers) && markers.length > 0) {
              markersText = `\nEdit markers: ${markers.map((m) => `${m.time} - ${m.event}`).join('; ')}`;
            }
          } catch {
            // ignore malformed marker JSON
          }
        }
        return `Scene ${s.sceneNum} (${s.name}, ${s.timingStart}-${s.timingEnd}s):\nDialogue: "${s.dialogue}"\nAction: ${s.action}\nCamera: ${camera || 'not specified'}\nActor: ${actor || 'not specified'}\nVisual: ${s.visual}\nAudio: ${s.audio}${markersText}`;
      })
      .join('\n\n');

    // Detect language from screenplay content
    const detectedLanguage = detectLanguage(screenplayText);
    const languageName = { TA: 'Tamil', HI: 'Hindi', EN: 'English' }[detectedLanguage] || 'English';

    const checksText = CHECKS.map((c) => `${c.id} - ${c.name}: ${c.desc}`).join('\n');

    const prompt = `You are a strict short-form video script quality validator. Evaluate this actual screenplay against each of the ${CHECKS.length} checks below. Be honest — most real first-draft screenplays fail at least a few checks.

SCREENPLAY (the ONLY content you may reference — do not invent or reference any other topic/example):
${screenplayText}

CHECKS TO RUN:
${checksText}

CRITICAL INSTRUCTIONS:
- "evidence" and "suggestedFix" must ONLY reference scenes, dialogue, numbers, and details that literally appear in the SCREENPLAY above.
- NEVER invent or reference an unrelated example topic (e.g. skincare, serums, or any product/subject not in the screenplay above). If illustrating a rewrite, rewrite using the ACTUAL dialogue words from the screenplay.
- If a check genuinely does not apply given the information available (e.g. no reference video was mentioned, no multi-language mixing present), mark it "N/A" rather than forcing a PASS/FAIL.
- "scenesAffected" must be an array of the scene numbers (integers) relevant to a FAIL result; use [] for PASS/N/A or checks that are global rather than scene-specific.
- This screenplay is written in ${languageName}. Respond entirely in ${languageName} — all evidence and suggestedFix text must be in ${languageName}, field keys stay in English.

Return ONLY valid JSON (no markdown fences, no preamble), an array with exactly one object per check listed above, in the same order, this exact shape:
{
  "results": [
    { "id": "GR01", "result": "PASS" or "FAIL" or "N/A", "evidence": "one specific sentence citing what in THIS screenplay supports the verdict", "suggestedFix": "if FAIL, one concrete fix using only this screenplay's actual content; otherwise empty string", "scenesAffected": [] }
  ]
}

Return exactly ${CHECKS.length} objects, one per check ID listed above, in the same order.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://viralform.app',
        'X-Title': 'Viral Form Video Creator',
      },
      body: JSON.stringify({
        model: 'openai/gpt-6.1-terra-pro',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
        max_tokens: 8000,
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || `OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content in API response');
    }

    const cleaned = content.replace(/```json|```/g, '').trim();
    const validationData = JSON.parse(cleaned);

    if (!validationData.results || !Array.isArray(validationData.results)) {
      throw new Error('Invalid validation response structure');
    }

    return res.status(200).json({
      success: true,
      results: validationData.results,
      message: 'Screenplay validated successfully',
      stats: {
        totalScenes: scenes.length,
        checksPerformed: validationData.results.length,
      },
    });
  } catch (error) {
    console.error('Validate screenplay error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to validate screenplay',
    });
  }
}
