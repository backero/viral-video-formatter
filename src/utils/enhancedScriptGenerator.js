/**
 * enhancedScriptGenerator.js
 * Generates COMPLETE production-ready viral video scripts with ALL sections:
 * - Script beats with dialogue
 * - Camera angles & movements
 * - Graphics & on-screen text
 * - Lighting & production setup
 * - CTA & conversion funnel
 * - Shooting checklist
 * - Editor notes
 * - Expected metrics
 */

export function generateCompleteProductionBrief(data) {
  if (!data.topic || !data.format || !data.viralHook) {
    throw new Error('Required fields missing: topic, format, viralHook')
  }

  const script = generateScriptBeats(data)
  const cameraDirections = generateCameraDirections(data)
  const graphics = generateGraphicsGuide(data)
  const production = generateProductionSetup(data)
  const cta = generateCTASection(data)
  const checklist = generateShootingChecklist(data)
  const editorNotes = generateEditorNotes(data)
  const metrics = generateExpectedMetrics(data)

  return {
    header: generateHeader(data),
    scriptBeats: script,
    cameraDirections,
    graphicsGuide: graphics,
    productionSetup: production,
    ctaSection: cta,
    shootingChecklist: checklist,
    editorNotes,
    expectedMetrics: metrics,
    complete: true,
    sections: ['script', 'camera', 'graphics', 'production', 'cta', 'checklist', 'editing', 'metrics'],
  }
}

function generateHeader(data) {
  return `
╔════════════════════════════════════════════════════════════════════════╗
║       PRODUCTION-READY VIRAL VIDEO SCRIPT (25 SECONDS)                 ║
╚════════════════════════════════════════════════════════════════════════╝

Topic: ${data.topic}
Niche: ${data.niche || 'General'}
Format: ${data.format}
Hook Type: ${data.viralHook}
Structure: ${data.scriptStructure || 'Comparison'}
Created: ${new Date().toISOString().split('T')[0]}

${data.company ? `Company: ${data.company}\n` : ''}
${data.creatorName ? `Creator: ${data.creatorName}\n` : ''}
`.trim()
}

function generateScriptBeats(data) {
  const beats = [
    {
      number: 1,
      name: 'HOOK',
      timing: '0-3s',
      duration: 3,
      dialogue: `Grab attention immediately. State the problem or promise.`,
      cameraAngle: 'Medium shot - creator looking at camera',
      action: 'Direct eye contact, energetic opening',
    },
    {
      number: 2,
      name: 'PROBLEM / OPTION A',
      timing: '3-8s',
      duration: 5,
      dialogue: `Expand on the pain point. Why should they care?`,
      cameraAngle: 'Close-up showing emotion/reaction',
      action: 'Show the problem visually with B-roll',
    },
    {
      number: 3,
      name: 'SOLUTION / OPTION B',
      timing: '8-14s',
      duration: 6,
      dialogue: `Reveal the answer or better option.`,
      cameraAngle: 'Cut to the solution - Wide shot showing the alternative',
      action: 'Build anticipation, show the benefit',
    },
    {
      number: 4,
      name: 'PROOF / DATA',
      timing: '14-18s',
      duration: 4,
      dialogue: `Numbers, results, or social proof. Make it specific.`,
      cameraAngle: 'Graphics overlay on video or text on screen',
      action: 'On-screen stats, testimonial clip, or results demo',
    },
    {
      number: 5,
      name: 'SOCIAL PROOF / CREDIBILITY',
      timing: '18-22s',
      duration: 4,
      dialogue: `Who trusts this? Real testimonial or authority signal.`,
      cameraAngle: 'Testimonial video clip or creator back on camera',
      action: 'Customer quote, expert mention, or proven track record',
    },
    {
      number: 6,
      name: 'CALL TO ACTION',
      timing: '22-25s',
      duration: 3,
      dialogue: `Clear, specific next step. Make it easy to act.`,
      cameraAngle: 'Back to creator, confident and direct',
      action: 'On-screen text overlay with CTA button/link',
    },
  ]

  let scriptText = '\n╔════════════════════════════════════════════════════════════════════════╗\n'
  scriptText += '║                         SCRIPT BEATS (6-Beat Structure)                ║\n'
  scriptText += '╚════════════════════════════════════════════════════════════════════════╝\n'

  for (const beat of beats) {
    scriptText += `
[BEAT ${beat.number}: ${beat.name}] (${beat.timing})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Duration: ${beat.duration} seconds
Dialogue: ${beat.dialogue}
Camera Angle: ${beat.cameraAngle}
Action: ${beat.action}

`
  }

  return scriptText
}

function generateCameraDirections(data) {
  return `
╔════════════════════════════════════════════════════════════════════════╗
║                      CAMERA DIRECTIONS & MOVEMENTS                     ║
╚════════════════════════════════════════════════════════════════════════╝

CAMERA FORMAT: 9:16 (Vertical for Reels/TikTok/Shorts)
FRAME RATE: 24fps or 30fps (smooth, cinematic)

SHOT LIST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Shot 1 (0-3s): Wide shot → Medium shot
  - Start with full body visible, then push in to medium shot
  - Movement: Slow push/zoom for emphasis
  - Focus on eyes and expression

Shot 2 (3-8s): Medium shot → Close-up
  - Transition via cut or quick pan
  - Show emotion/reaction to problem statement
  - B-roll overlay: Images showing the pain point

Shot 3 (8-14s): Wide shot (alternative/solution)
  - Cut to show the solution or better option
  - B-roll: Demonstration of solution in action
  - Dynamic camera: Pan across the new option

Shot 4 (14-18s): Graphics overlay + creator
  - On-screen text/numbers over creator video
  - Picture-in-picture: Stats on right, creator reaction on left
  - Animated percentage/number reveals

Shot 5 (18-22s): Testimonial clip + graphics
  - Customer/expert testimonial in small frame (center or side)
  - Creator reacting in background (out of focus or at edge)
  - Graphics: Trust badges or verification marks

Shot 6 (22-25s): Medium shot → Close-up
  - Creator back on camera, confident
  - Look directly at camera
  - Point toward CTA button (just outside frame)

TRANSITIONS:
- Beats 1→2: Quick cut (no fade)
- Beats 2→3: Quick cut or slight wipe
- Beats 3→4: Transition to graphics (fade or slide)
- Beats 4→5: Cut to testimonial (quick)
- Beats 5→6: Cut back to creator (fast)

FRAMING RULES:
✓ Rule of thirds: Creator off-center for dynamic framing
✓ Headroom: Small gap above head, not centered
✓ Eye-line: Creator eyes at top third of frame
✓ Movement: Keep movement in frame (no jump cuts)
✓ Depth: Use foreground/background elements when possible
`
}

function generateGraphicsGuide(data) {
  return `
╔════════════════════════════════════════════════════════════════════════╗
║                    GRAPHICS & ON-SCREEN TEXT GUIDE                     ║
╚════════════════════════════════════════════════════════════════════════╝

OPENING GRAPHIC (0-1s):
- Title card with topic
- Font: Bold, modern, high contrast
- Duration: 0.5-1.0 second
- Animation: Slide in from left or pop/zoom in

PROBLEM/PAIN POINT (3-8s):
- Keywords on screen: Highlight the problem
- Color: Red or orange to draw attention
- Animation: Typewriter effect or slide down
- Position: Bottom third of screen

SOLUTION BENEFITS (8-14s):
- Bulleted list of 3-4 key benefits
- Colors: Green, blue (positive/solution colors)
- Animation: Each bullet appears in sequence
- Font size: Large enough to read on phone

DATA & NUMBERS (14-18s):
- Large number display: 48pt+ font size
- Percentage reveals: Animated counter (0→100%)
- Format: "$2.5L" or "30 days" or "85%+"
- Background: Semi-transparent dark overlay for contrast
- Animation: Slide in from side + scale up

TESTIMONIAL TEXT (18-22s):
- Quote in quotation marks
- Attribution: Name + title
- Format: Italicized, centered
- Color: White or light gray on dark background
- Animation: Fade in + out

CTA OVERLAY (22-25s):
- Call-to-action button or text
- Text: "Comment Below" or "DM for More" or "Shop Now"
- Button: Bright, contrasting color (usually orange or purple)
- Animation: Appears at 22s, stays until end
- Position: Bottom center of screen

LOWER THIRD GRAPHICS:
- Logo/watermark: Bottom left or bottom center
- Opacity: 30-50% (not too distracting)
- Size: 15-20% of screen width
- Appears throughout video

FONT GUIDE:
- Headlines: Bold sans-serif (Arial, Helvetica, Montserrat)
- Body text: Clean, readable sans-serif
- CTA: BOLD, ALL CAPS
- Minimum size: 24pt for body text (mobile readable)
`
}

function generateProductionSetup(data) {
  return `
╔════════════════════════════════════════════════════════════════════════╗
║                    PRODUCTION SETUP & TECHNICAL SPECS                  ║
╚════════════════════════════════════════════════════════════════════════╝

LOCATION:
- Background: Clean, uncluttered (white wall, gradient, or simple scene)
- Lighting quality: Well-lit, no harsh shadows on face
- Sound: Quiet location, minimal background noise
- Space: At least 4-6 feet from background

CAMERA SETUP:
- Camera: Phone (iPhone/Android) or mirrorless camera
- Format: 9:16 vertical (landscape mode on phone)
- Resolution: 1080p minimum (4K preferred)
- Stabilization: Tripod (essential for smooth shots)
- Lens: 35-50mm equivalent focal length

LIGHTING SETUP:
- Key light: Ring light or window light (main source)
  Position: 45 degrees to side, 1-2 feet from face
- Fill light: Second light or reflector on opposite side
  Position: 90 degrees opposite key light (3-4 feet away)
- Backlight (optional): Subtle light behind to separate from background
  Position: Behind and above, 6+ feet away
- Power: Aim for 3200-5600K color temperature (warm daylight)

AUDIO SETUP:
- Microphone: Lavalier mic OR phone mic in quiet environment
- Backup audio: Record in-camera audio as fallback
- Levels: Monitor audio levels (-6dB to 0dB, never clipping)
- Test: Record 10-second test before rolling official takes

COLOR GRADING SPECS:
- Skin tone: Warm, healthy complexion (not orange or gray)
- Saturation: 50-70% (not oversaturated)
- Contrast: Medium contrast (not too flat, not too harsh)
- Overall tone: Bright and energetic (match brand voice)

PRODUCTION FORMAT SPECS:
- Frame rate: 24fps (cinematic) or 30fps (smooth)
- Shutter speed: 50fps or 60fps (1/50 to 1/60 second)
- ISO: As low as possible (50-800), adjust for lighting
- White balance: Manual set to lighting temperature or custom white balance
- Codec: H.264 or H.265 (MP4 format recommended)
`
}

function generateCTASection(data) {
  return `
╔════════════════════════════════════════════════════════════════════════╗
║              CALL TO ACTION & CONVERSION FUNNEL                        ║
╚════════════════════════════════════════════════════════════════════════╝

PRIMARY CTA (appears at 22-25s):
Text: "Comment below what ${data.niche ? data.niche.toLowerCase() : 'niche'} topic you want next"
Format: On-screen text overlay + button graphic
Position: Bottom center of screen
Color: Bright, contrasting (orange or purple typically works)
Action: Direct them to comment with specific keywords

SECONDARY CTA OPTIONS:
1. Share: "Share this with someone who needs to see this"
2. Save: "Save this for later"
3. DM: "DM for exclusive access"
4. Link: "Link in bio for full details"
5. Follow: "Follow for more ${data.niche || 'content'} tips"

CONVERSION FUNNEL:
1. HOOK (0-3s) → Grab Attention
2. PROBLEM (3-8s) → Build Curiosity
3. SOLUTION (8-14s) → Show Value
4. PROOF (14-18s) → Build Trust
5. SOCIAL PROOF (18-22s) → Create Urgency
6. CTA (22-25s) → Drive Action
   ↓
7. Comment Engagement → Creator responds with valuable offer
   ↓
8. DM Conversation → Move to WhatsApp/Email
   ↓
9. Audience Capture → Add to email list or WhatsApp group
   ↓
10. Sales Process → Nurture and convert to customer

RESPONSE STRATEGY:
- Monitor comments within 1 hour of posting
- Reply to ALL comments with value + follow-up CTA
- Create follow-up posts responding to top comments
- Use comment engagement to feed new video ideas

TRACKING:
- Monitor comment rate target: 25-30% of views
- Track DM click-through rate
- Measure email/WhatsApp list growth
- Calculate conversion rate from list to customer
`
}

function generateShootingChecklist(data) {
  return `
╔════════════════════════════════════════════════════════════════════════╗
║                       SHOOTING DAY CHECKLIST                           ║
╚════════════════════════════════════════════════════════════════════════╝

PRE-PRODUCTION (Day Before):
☐ Scout location, test lighting
☐ Plan shot list and beat descriptions
☐ Prepare graphics/lower-third assets
☐ Test camera, battery, storage card
☐ Plan outfit (solid colors, no busy patterns)
☐ Prepare any props needed for demonstration
☐ Write dialogue on cards or use teleprompter app

EQUIPMENT CHECK:
☐ Camera (phone or mirrorless)
☐ Tripod (stable, suitable for framing)
☐ Microphone (lavalier or shotgun)
☐ Audio recorder (backup device)
☐ Lighting: Ring light + fill light
☐ Reflectors (white, silver, gold)
☐ Storage media: Extra SD cards/phone storage
☐ Cables: USB-C, HDMI, audio cables
☐ Power banks and chargers
☐ Backup clothing (in case of sweat/wrinkles)

ON SET EXECUTION:
☐ Test all equipment before rolling
☐ Do 30-second audio/video level check
☐ Shoot 1-2 practice takes (not keepers)
☐ Record Beat 1 (HOOK): 3-5 takes minimum
☐ Record Beat 2 (PROBLEM): 3-5 takes
☐ Record Beat 3 (SOLUTION): 3-5 takes
☐ Record Beat 4 (PROOF): 3-5 takes
☐ Record Beat 5 (SOCIAL PROOF): 3-5 takes
☐ Record Beat 6 (CTA): 3-5 takes
☐ B-roll shots: 30+ seconds of supporting footage
☐ Testimonial: 20+ seconds from customer/expert (if using)
☐ Alternative angles: Wide, medium, close-up of each beat

AUDIO LOGGING:
☐ Record test audio before each beat
☐ Check audio levels (no clipping)
☐ Record backup audio separately if possible
☐ Note any background noise to avoid

POST-SHOOT REVIEW:
☐ Review all takes on large screen
☐ Delete obviously bad takes
☐ Mark best takes with ratings/notes
☐ Back up all footage to external drive
☐ Back up graphics/assets to cloud storage
☐ Download any testimonial videos

TOTAL SHOOT TIME: 2-3 hours (includes setup, breaks, file management)
`
}

function generateEditorNotes(data) {
  return `
╔════════════════════════════════════════════════════════════════════════╗
║                       EDITOR NOTES & POST-PRODUCTION                   ║
╚════════════════════════════════════════════════════════════════════════╝

EDITING TIMELINE:
- Beat 1 (0-3s): Choose best take, adjust audio levels, add opening graphic
- Beat 2 (3-8s): Intercut with B-roll, adjust color, add problem text
- Beat 3 (8-14s): Show solution footage, quick cuts (0.3-0.5s per shot)
- Beat 4 (14-18s): Overlay graphics and numbers, animate stats
- Beat 5 (18-22s): Testimonial in frame, creator reaction in corner
- Beat 6 (22-25s): Strong close-up of creator, overlay CTA button

CUTTING STYLE:
- Quick cuts between beats (no fade)
- Cut TO the music beat (sync transitions with audio)
- Keep motion continuous (no jarring jump cuts)
- Pace increases slightly through video (faster cuts toward end)

COLOR GRADING:
- Apply consistent LUT (look-up table) across all footage
- Warm skin tones (add slight orange/yellow warmth)
- Increase saturation 10-20% (make colors pop)
- Slight increase in clarity/sharpness
- Crush blacks slightly (make background slightly darker)

AUDIO PROCESSING:
- Normalize dialogue to -6dB
- Add subtle background music (60-70dB below dialogue)
- Music crescendos at key moments (beats 3-4-5)
- Music cuts out slightly before CTA for emphasis
- Add subtle SFX (transitions, taps, whooshes) between beats
- Ensure no audio clips or distortion

B-ROLL PLACEMENT:
- Beat 2: B-roll of the problem (people struggling, confusion, etc.)
- Beat 3: B-roll showing the solution in action
- Beat 4: Charts/stats graphics, success clips
- Beat 5: Testimonial footage or customer results
- Throughout: Subtle background elements to maintain visual interest

TEXT OVERLAY TIMING:
- Opening title: 0-1.5s
- Problem keywords: 3-8s
- Solution benefits: 8-14s
- Statistics: 14-18s (animate numbers)
- Testimonial text: 18-22s (quote)
- CTA button: 22-25s (stays until end)

TRANSITIONS & EFFECTS:
- Avoid fancy transitions (keep cuts clean)
- Use subtle zoom or pan for emphasis
- Slight blur/focus transitions between beats
- Scale animations for text (pop in, not fade)

FILE EXPORT:
- Resolution: 1080p minimum (1920x1080)
- Format: MP4 (H.264, High profile)
- Frame rate: 24fps (output)
- Bitrate: 8-12 Mbps (quality vs file size balance)
- Upload to: Instagram Reels, TikTok, YouTube Shorts

FINAL CHECK:
✓ Color is consistent throughout
✓ No jarring jump cuts or transitions
✓ Audio is clear and well-balanced
✓ All text is readable on mobile
✓ CTA is clear and visible
✓ Duration is exactly 25 seconds
✓ Aspect ratio is 9:16 (vertical)
`
}

function generateExpectedMetrics(data) {
  return `
╔════════════════════════════════════════════════════════════════════════╗
║                      EXPECTED PERFORMANCE METRICS                      ║
╚════════════════════════════════════════════════════════════════════════╝

ENGAGEMENT TARGET (First 7 Days):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Views: 50,000+
- Organic reach from followers: 30-40%
- Algorithm reach (discovery): 60-70%
- Primary sources: Reels/Shorts Feed, Explore page

Watch Time: 85%+ completion rate
- Why this works: Hook is immediate (0-3s)
- Problem resonates (3-8s)
- Viewer is curious by beat 4 (14-18s)
- CTA is clear and specific (22-25s)

Engagement Breakdown:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Comment Rate: 25-30%
- Target: 12,500-15,000 comments
- Primary CTAs: Comments with keywords
- Response strategy: Reply to 80%+ of comments within 1 hour

Save Rate: 15-20%
- Target: 7,500-10,000 saves
- Why: Valuable, sharable content
- Use case: Viewers reference later or share with friends

Share Rate: 10-15%
- Target: 5,000-7,500 shares
- Indicators: High value content, controversy, inspiration
- Amplification effect: Each share reaches 50+ new people

Like Rate: 5-10%
- Less important than comments for algorithm
- Still indicates basic engagement

CONVERSION METRICS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Comments → DMs: 5-10% conversion
- 625-1,500 people slide into DMs

DMs → WhatsApp: 30-50% conversion
- 185-750 people move to WhatsApp

WhatsApp → List: 60-80% conversion
- 111-600 people added to email/WhatsApp list

List → Sales: 5-15% conversion
- 5-90 customers (depends on offer quality)

TIMELINE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hour 1-2: Comments surge, peak engagement
Hour 2-4: Algorithm pushes to new audiences
Hour 4-24: Steady engagement decline (normal curve)
Day 2-3: Plateau, steady follower growth
Day 4-7: Long-tail engagement from discovery

BENCHMARKS BY NICHE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${data.niche === 'Beauty & Cosmetics' ? 'Beauty: High engagement expected (25-35% comments)' : 'General: Standard engagement baseline (20-25% comments)'}
${data.niche === 'Business & Entrepreneurship' ? 'Business: Strong saves (20-30% save rate)' : ''}
${data.niche === 'Fitness & Health' ? 'Fitness: High saves and shares (15-20% each)' : ''}
${data.niche === 'Education' ? 'Education: High shares (15-25% share rate)' : ''}

OPTIMIZATION NOTES:
- Posting time matters: Tuesday-Thursday, 6-9 PM typically perform best
- Consistency: Upload similar content weekly for algorithm preference
- Engagement bait: Ask specific question to boost comment rate
- Follow-up: Post reply video within 12-24 hours to ride engagement wave
`
}

export function exportToPDF(brief) {
  // Placeholder for PDF export functionality
  // In production, use a library like jsPDF or puppeteer
  return {
    success: true,
    message: 'PDF export feature coming soon',
    sections: brief.sections,
  }
}
