# SKILL: AI Output Formatter
## For Viral Video Production Form — Phase 5 (Production Output)

---

## PURPOSE
Take an approved screenplay and format it into 4 export documents: Actor Brief, Camera Sheet, Edit Timeline, and AI Agent Prompt Pack (JSON + 5 prompt templates).

## INPUT FORMAT
```json
{
  "screenplay": {
    "total_runtime": "35.0s",
    "scene_count": 5,
    "word_count": 71,
    "scenes": [...],
    "hooks": {...},
    "cta": {...}
  },
  "metadata": {
    "title": "The 3-Second Rule Nobody Talks About",
    "actor": "Sarah K.",
    "company": "LaunchPad Media",
    "platform": "Instagram",
    "length": "35s",
    "content_type": "Educational",
    "format": "Clone (Smart vs Dumb)"
  }
}
```

## OUTPUT FORMAT
Return ONLY a JSON object with 4 documents:

```json
{
  "actor_brief": {
    "for": "Actor",
    "title": "The 3-Second Rule Nobody Talks About",
    "actor": "Sarah K. (On Camera)",
    "tone": "Educational, confident, shifts to vulnerable in Scene 2",
    "general_direction": "Hold eye contact. Use physical actions (slam, point, lean). No talking head >2s.",
    "scenes": [
      {
        "scene": 1,
        "timing": "0-3s",
        "dialogue": "I tested 47 skincare products so you don't have to.",
        "action": "Face fills frame. Eyes wide. Holds up two bottles.",
        "expression": "Confident, slight smile",
        "energy": "9/10",
        "pace": "Fast"
      }
    ]
  },
  "camera_sheet": {
    "for": "Cameraman",
    "title": "The 3-Second Rule Nobody Talks About",
    "scenes": [
      {
        "scene": 1,
        "timing": "0-3s",
        "shot": "Close-up",
        "angle": "Slightly low",
        "movement": "Handheld",
        "lens": "Normal",
        "framing": "Center, head at top third",
        "notes": "Face fills 60% of frame"
      }
    ]
  },
  "edit_timeline": {
    "for": "Editor",
    "title": "The 3-Second Rule Nobody Talks About",
    "total_runtime": "35.0s",
    "cut_count": 4,
    "timeline": [
      {
        "time": "0.0s",
        "event": "Scene 1: THE HOOK starts",
        "type": "scene_start"
      },
      {
        "time": "0.5s",
        "event": "'47 PRODUCTS' text overlay pop-in",
        "type": "text_overlay"
      },
      {
        "time": "2.8s",
        "event": "Hard cut to Scene 2",
        "type": "cut"
      }
    ]
  },
  "clean_script": {
    "for": "Everyone",
    "title": "The 3-Second Rule Nobody Talks About",
    "dialogue": [
      "[Scene 1: THE HOOK]",
      "SARAH (ON CAMERA): I tested 47 skincare products so you don't have to.",
      "",
      "[Scene 2: AUTHORITY GAP]",
      "SARAH (ON CAMERA): And I found that 70% of vitamin C serums go bad before you finish them.",
      "",
      "[Scene 3: THE HACK]",
      "SARAH (ON CAMERA): Store it in the fridge. It lasts twice as long.",
      "",
      "[Scene 4: THE PROOF]",
      "SARAH (ON CAMERA): I did this for 30 days. My $60 serum lasted 60 days instead of 30.",
      "",
      "[Scene 5: CTA]",
      "SARAH (ON CAMERA): Save this before your serum goes bad."
    ]
  },
  "ai_agent_prompt_pack": {
    "json_data": {
      "version": "1.0",
      "video_brief": {
        "identity": {
          "title": "The 3-Second Rule Nobody Talks About",
          "actor": "Sarah K.",
          "company": "LaunchPad Media"
        },
        "strategy": {
          "content_type": "Educational",
          "format": "Clone",
          "template": "D — Shocking Fact",
          "style": "Demonstration",
          "time_to_value": "0-3s",
          "total_runtime": 35
        },
        "scenes": [...],
        "validation": {
          "score": "10/10",
          "approvals": "4/4"
        }
      }
    },
    "prompt_templates": [
      {
        "agent": "Script Writer Agent",
        "prompt": "Write viral video scripts using this structure: Hook (0-3s) → Authority (3-8s) → Proof (8-25s) → CTA (25-35s). Use the video identity and topic data provided. Keep dialogue under 30 words per scene. Use contractions and casual language. Every line must have action parentheticals."
      },
      {
        "agent": "Scene Breakdown Agent",
        "prompt": "Convert the script into a shot-by-shot breakdown. For each scene, specify: shot type (close-up/medium/wide), camera movement (static/pan/zoom), actor direction (emotion + physical action), and estimated duration. Follow the Show Don't Tell rule."
      },
      {
        "agent": "Actor Direction Agent",
        "prompt": "Generate actor direction for each scene. Specify: facial expression (specific emotion, intensity 1-10), body language (posture, gestures, movement), eye line (camera/offset/prop), and vocal delivery (pace, tone, energy). Every scene needs a physical action."
      },
      {
        "agent": "Camera Direction Agent",
        "prompt": "Generate camera settings for each shot. Specify: lens (mm), aperture, shot size, angle (eye/low/high), movement (handheld/static/gimbal), and lighting notes. Optimize for the emotion and pacing of each scene."
      },
      {
        "agent": "Edit Timeline Agent",
        "prompt": "Generate an editing timeline with precise cut points. For each cut: timestamp, cut type (hard cut/jump cut/match cut), transition details, and any overlay text or effects. Ensure visual changes every 1-2 seconds. Add caption timing for mute viewers."
      }
    ]
  }
}
```

## FORMATTING RULES

### Actor Brief Rules
- ONLY include scenes the actor appears in
- Remove camera settings, editing markers, audio cues
- Keep: dialogue, actor direction (expression, energy, pace, body language)
- Add general direction at top (overall tone, eye contact rules)
- Format as clean table: Scene | Timing | Dialogue | Action | Expression

### Camera Sheet Rules
- Table format: Scene | Timing | Shot | Angle | Movement | Lens
- Remove: dialogue, actor expressions, audio
- Add: specific framing notes per scene
- Include equipment suggestions if relevant

### Edit Timeline Rules
- Chronological list of ALL editing events
- Each entry: Time | Event | Type (cut/text_overlay/sfx/music_change)
- Include both scene transitions AND in-scene events
- Mark caption appearance/disappearance times
- Total cut count at top

### Clean Script Rules
- Dialogue ONLY, no directions
- Scene headers marked with [Scene X: NAME]
- Character name + dialogue line format
- Blank line between scenes
- Word count at bottom

### AI Agent Prompt Pack Rules
- JSON must be valid, parseable
- Include ALL screenplay data structured
- 5 prompt templates must be specific and actionable
- Each template references the actual video data
- Templates are reusable for future videos with similar structure

## QUALITY CHECK
Before returning, verify:
- [ ] Actor Brief has NO camera/editing info?
- [ ] Camera Sheet has NO dialogue/actor expressions?
- [ ] Edit Timeline has ALL cut points + in-scene events?
- [ ] Clean Script is dialogue-only with scene headers?
- [ ] JSON is valid and complete?
- [ ] 5 prompt templates are specific and actionable?
