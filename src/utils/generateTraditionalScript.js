/**
 * generateTraditionalScript.js
 * Generates a complete production-ready viral video script based on Traditional Form data
 * Uses the selected format, hook, topic, and value to create a fully scripted video with
 * camera angles, timing, graphics, and all production details
 */

const HOOK_TEMPLATES = {
  'Comparison / Contrast Hook': {
    pattern: 'Two opposing options',
    example: '{topic}? I\'ll show you the choice that made me {number}. {solution}. Here\'s why everyone picks it wrong.',
    structure: 'Problem vs Solution comparison throughout'
  },
  'Myth-Busting / Common Mistake Hook': {
    pattern: 'Wrong vs Right',
    example: 'Everyone does {wrong}. But {correct} actually wins because {reason}.',
    structure: 'Myth busting throughout'
  },
  'Do vs Don\'t Hook': {
    pattern: 'Clear contrast',
    example: 'Don\'t do {wrong}. Do {right} instead. Here\'s why.',
    structure: 'Contrasting actions'
  },
  'Transformation Hook': {
    pattern: 'Before/After',
    example: 'I went from {before} to {after} by {method}. Here\'s how.',
    structure: 'Outcome-first storytelling'
  },
  'Challenge Hook': {
    pattern: 'Problem statement',
    example: 'If you {problem}, this is for you.',
    structure: 'Problem identification'
  },
  'Pattern Interrupt Hook': {
    pattern: 'Unexpected twist',
    example: 'You think {assumption}. Actually {truth}.',
    structure: 'Surprising revelation'
  }
};

const SCRIPT_STRUCTURES = {
  'Problem-Solution': {
    beats: [
      { name: 'Hook', duration: '0-3s', purpose: 'Grab attention with problem' },
      { name: 'Problem Detail', duration: '3-8s', purpose: 'Expand on the pain point' },
      { name: 'Solution', duration: '8-14s', purpose: 'Reveal the answer' },
      { name: 'Proof', duration: '14-18s', purpose: 'Show it works with numbers' },
      { name: 'Social Proof', duration: '18-22s', purpose: 'Add credibility' },
      { name: 'CTA', duration: '22-25s', purpose: 'Call to action' }
    ]
  },
  'Story Arc': {
    beats: [
      { name: 'Hook', duration: '0-3s', purpose: 'Start with hook' },
      { name: 'Setup', duration: '3-8s', purpose: 'Introduce the situation' },
      { name: 'Conflict', duration: '8-14s', purpose: 'Present the problem' },
      { name: 'Resolution', duration: '14-18s', purpose: 'Show how it resolved' },
      { name: 'Lesson', duration: '18-22s', purpose: 'What viewers learned' },
      { name: 'CTA', duration: '22-25s', purpose: 'Call to action' }
    ]
  },
  'Comparison': {
    beats: [
      { name: 'Hook', duration: '0-3s', purpose: 'Present two options' },
      { name: 'Option A Details', duration: '3-8s', purpose: 'First choice negatives' },
      { name: 'Option B Benefits', duration: '8-14s', purpose: 'Second choice positives' },
      { name: 'Numbers/Proof', duration: '14-18s', purpose: 'Data showing winner' },
      { name: 'Social Proof', duration: '18-22s', purpose: 'Who chose the right one' },
      { name: 'CTA', duration: '22-25s', purpose: 'Call to action' }
    ]
  }
};

function generateBeat(beatName, duration, data, beatType) {
  const { topic, value, company, niche, viralHook, cta } = data;

  const beats = {
    'Hook': `"${topic}? I'll show you the most overlooked strategy. Here's why ${niche} professionals are switching."`,

    'Problem Detail': `"Most people think ${value ? value.split('.')[0] : 'it\'s complicated'}. But here's the reality..."`,

    'Solution': `"The solution? ${viralHook ? viralHook.split('→')[1] : 'A different approach'}. Here's what works."`,

    'Proof': `"Numbers don't lie. The data shows exactly why this works better."`,

    'Social Proof': `"Hundreds of ${niche} professionals have done this. Results? Consistent wins."`,

    'CTA': cta || `"Don't overthink this. Comment below and I'll show you the exact process."`
  };

  return {
    beat: beatName,
    duration,
    dialogue: beats[beatName] || 'Script content',
    type: beatType
  };
}

function generateProductionNotes(data) {
  const { format, viralHook } = data;

  return {
    location: 'Clean, well-lit background (white or neutral)',
    lighting: 'Ring light + fill light for professional look',
    cameraSetup: '9:16 format (vertical for Reels/TikTok/Shorts)',
    pacing: format?.includes('S-TIER') ? 'Fast, energetic' : 'Moderate, clear',
    music: viralHook?.includes('Comparison') ? 'Tension building music' : 'Engaging background',
    graphics: 'On-screen text for key points, numbers, proof',
    edits: 'Quick cuts, B-roll, testimonial clips',
    totalDuration: '25 seconds'
  };
}

export function generateTraditionalScript(data) {
  if (!data.topic || !data.format || !data.viralHook) {
    throw new Error('Please fill in Topic, Format, and Hook Type before generating script');
  }

  const { topic, value, format, viralHook, scriptStructure } = data;

  // Determine structure type
  let structureType = 'Problem-Solution';
  if (viralHook?.includes('Transformation')) structureType = 'Story Arc';
  if (viralHook?.includes('Comparison')) structureType = 'Comparison';

  const structure = SCRIPT_STRUCTURES[structureType];

  // Build complete script
  const beats = structure.beats.map(beat =>
    generateBeat(beat.name, beat.duration, data, beat.purpose)
  );

  const productionNotes = generateProductionNotes(data);

  const completeScript = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCTION-READY VIRAL VIDEO SCRIPT (25 SECONDS)
Topic: ${topic}
Format: ${format}
Hook Type: ${viralHook}
Structure: ${structureType}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRODUCTION NOTES:
Location: ${productionNotes.location}
Camera Format: ${productionNotes.cameraSetup}
Pacing: ${productionNotes.pacing}
Total Duration: ${productionNotes.totalDuration}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCRIPT BEATS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${beats.map((beat, i) => `
[BEAT ${i + 1}: ${beat.beat.toUpperCase()}] (${beat.duration})
${beat.dialogue}

ACTION: Adjust camera angle, add graphics, adjust pacing
GRAPHICS: Display key numbers, stats, or visual proof
MUSIC: Adjust tone based on beat purpose

`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SHOOTING CHECKLIST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Location setup (clean background, good lighting)
✓ Camera on tripod (stable framing)
✓ Lavalier microphone (clear audio)
✓ Multiple takes per beat (minimum 3 takes each)
✓ Record separate ambient sound (room tone)
✓ Test all graphics and animations
✓ Have backup equipment ready

EDITING NOTES:
- Use quick cuts between beats
- Add on-screen text for key points
- Maintain consistent color grading
- Match music to emotional tone
- Keep pacing tight (no dead air)
- Test on mobile (vertical 9:16 format)

CONVERSION FUNNEL:
1. Hook keeps viewers watching (85%+ completion target)
2. Problem/Solution beats drive engagement (comment/share)
3. Social proof builds credibility
4. CTA moves viewers to DM/comments
5. Creator responds with valuable offer
6. Viewer added to WhatsApp/email list
7. Conversion to customer

EXPECTED METRICS (First Week):
- Views: 50,000+
- Completion Rate: 85%+
- Comment Rate: 25-30%
- Save Rate: 15-20%
- Share Rate: 10-15%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

  return {
    script: completeScript.trim(),
    beats: beats,
    structure: structureType,
    productionNotes: productionNotes,
    expectedMetrics: {
      viewsFirstWeek: '50,000+',
      completionRate: '85%+',
      commentRate: '25-30%',
      conversionRate: '15-20% to sales'
    }
  };
}
