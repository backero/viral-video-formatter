// Vercel Serverless Function for AI Screenplay Generation
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    topic,
    whyTheyCare,
    proof,
    visualHook,
    writtenHook,
    audioHook,
    lengthSec = 30,
    language = 'EN',
  } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic required' });
  }

  // Generate screenplay based on input
  const durationPerScene = lengthSec / 5;

  const mockScenes = [
    {
      sceneNum: 1,
      name: 'THE HOOK',
      timingStart: 0,
      timingEnd: Math.ceil(durationPerScene),
      duration: Math.ceil(durationPerScene),
      dialogue: writtenHook || `Here's something you didn't know about ${topic}.`,
      action: '(Actor: Opens with confident expression, looks directly at camera)',
      camera: { shot: 'Close-up', angle: 'Low angle', movement: 'Handheld micro-jolt' },
      actor: { expression: 'Confident, intrigued', energy: 8, pace: 'Fast' },
      visual: `Text overlay: "${(writtenHook || 'KEY INSIGHT').substring(0, 20).toUpperCase()}" - Bold, centered`,
      audio: 'Low beat enters at 0%, alert SFX at midpoint',
      editMarkers: [
        { time: '0.0s', event: 'Open on face - close-up' },
        { time: String(durationPerScene * 0.5) + 's', event: 'Text overlay pop-in' },
      ],
    },
    {
      sceneNum: 2,
      name: 'THE PROBLEM',
      timingStart: Math.ceil(durationPerScene),
      timingEnd: Math.ceil(durationPerScene * 2),
      duration: Math.ceil(durationPerScene),
      dialogue: whyTheyCare || `Most people don't realize the impact of this.`,
      action: '(Actor: Gestures to emphasize problem, shows concern)',
      camera: { shot: 'Medium', angle: 'Eye level', movement: 'Static with B-cam insert' },
      actor: { expression: 'Serious, authoritative', energy: 7, pace: 'Normal' },
      visual: 'B-roll showing problem context or challenge',
      audio: 'Tension music builds, alert SFX reinforces problem',
      editMarkers: [
        { time: String(durationPerScene) + 's', event: 'Cut to medium shot' },
        { time: String(durationPerScene * 1.5) + 's', event: 'B-cam insert for pattern interrupt' },
      ],
    },
    {
      sceneNum: 3,
      name: 'THE SOLUTION',
      timingStart: Math.ceil(durationPerScene * 2),
      timingEnd: Math.ceil(durationPerScene * 3),
      duration: Math.ceil(durationPerScene),
      dialogue: `That's where the solution comes in. ${audioHook || 'This changes everything.'}`,
      action: '(Actor: Reveals or demonstrates the solution with enthusiasm)',
      camera: { shot: 'Medium', angle: 'Eye level', movement: 'Push-in 15%' },
      actor: { expression: 'Hopeful, excited', energy: 8, pace: 'Normal to fast' },
      visual: 'Product or solution revealed with positive colors (greens, golds)',
      audio: 'Music shifts to positive, achievement SFX reinforces solution',
      editMarkers: [
        { time: String(durationPerScene * 2) + 's', event: 'Scene transition - push in begins' },
        { time: String(durationPerScene * 2.5) + 's', event: 'Solution reveal with SFX' },
      ],
    },
    {
      sceneNum: 4,
      name: 'THE PROOF',
      timingStart: Math.ceil(durationPerScene * 3),
      timingEnd: Math.ceil(durationPerScene * 4),
      duration: Math.ceil(durationPerScene),
      dialogue: proof || `Verified and proven. Users see real results.`,
      action: '(Actor: Points to proof, shows confidence and pride)',
      camera: { shot: 'Close-up to medium', angle: 'Eye level', movement: 'Dolly in on proof' },
      actor: { expression: 'Proud, confident', energy: 9, pace: 'Normal' },
      visual: 'Charts, testimonials, before/after comparisons, or certification badges',
      audio: 'Beat intensifies, celebration SFX at peak moment',
      editMarkers: [
        { time: String(durationPerScene * 3) + 's', event: 'Proof montage begins' },
        { time: String(durationPerScene * 3.5) + 's', event: 'Peak moment - celebration SFX' },
      ],
    },
    {
      sceneNum: 5,
      name: 'CTA',
      timingStart: Math.ceil(durationPerScene * 4),
      timingEnd: lengthSec,
      duration: lengthSec - Math.ceil(durationPerScene * 4),
      dialogue: `Get started today. Your ${topic.toLowerCase()} journey starts now.`,
      action: '(Actor: Direct eye contact, friendly confidence, points to CTA)',
      camera: { shot: 'Close-up', angle: 'Eye level', movement: 'Static with freeze frame' },
      actor: { expression: 'Warm, inviting', energy: 7, pace: 'Normal to slow' },
      visual: 'Clean product shot or call-to-action with clear next steps',
      audio: 'Music resolves gently, warm outro sound',
      editMarkers: [
        { time: String(durationPerScene * 4) + 's', event: 'CTA reveal' },
        { time: String(lengthSec - 1) + 's', event: 'Freeze frame for final moment' },
      ],
    },
  ];

  return res.status(200).json({
    success: true,
    scenes: mockScenes,
    message: 'Screenplay generated successfully',
    metadata: {
      topic,
      duration: lengthSec,
      language,
      sceneCount: 5,
    },
  });
}
