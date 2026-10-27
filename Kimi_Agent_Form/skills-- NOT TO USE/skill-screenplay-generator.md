# SKILL: AI Screenplay Generator
## For Viral Video Production Form — Phase 3 (Execution Brief)

---

## PURPOSE
Take the approved structure (content type, format, template, hooks, CTA) + topic + value and generate a complete scene-by-scene production screenplay in Hollywood format with embedded action parentheticals.

## INPUT FORMAT
```json
{
  "structure": {
    "content_type": "Educational",
    "format": "Clone (Smart vs Dumb)",
    "template": "D — Shocking Fact",
    "hooks": {
      "visual": "Close-up of creator's shocked face, holding phone showing '73%' in large red text",
      "written": "73% fail from THIS",
      "audio": "Energetic, slightly concerned tone"
    },
    "cta": {
      "type": "Follow/Save",
      "text": "Save this email template"
    }
  },
  "topic": {
    "teaches": "This video teaches how to fix SaaS onboarding in under 5 minutes",
    "cares": "They care because 73% of startups fail from the same fixable mistake",
    "proof": "Trust me because I reduced churn by 40% at 3 companies"
  },
  "value": {
    "takeaway": "After watching, the viewer will be able to write a welcome email that reduces churn by 40%",
    "style": "Demonstration",
    "time_to_value": "0-3s"
  },
  "niche": "SaaS",
  "sub_niche": "User Onboarding",
  "estimated_length": "30-35s"
}
```

## OUTPUT FORMAT
Return ONLY a JSON object with scene array:

```json
{
  "total_runtime": "35.0s",
  "scene_count": 5,
  "word_count": 71,
  "scenes": [
    {
      "number": 1,
      "name": "THE HOOK",
      "timing": { "start": 0.0, "end": 3.0, "duration": 3.0 },
      "dialogue": "I tested 47 skincare products so you don't have to.",
      "action_parenthetical": "Actor: Face fills frame. Eyes wide. Holds up two serum bottles — one empty, one full. Expression: 'You won't believe this.' Energy: 9/10.",
      "camera": {
        "shot": "Close-up",
        "angle": "Slightly low",
        "movement": "Handheld",
        "lens": "Normal",
        "framing": "Center, head at top third"
      },
      "actor": {
        "expression": "Confident, slight smile",
        "eye_contact": "Direct to camera",
        "body_language": "Open palms, slight lean forward",
        "energy": 9,
        "pace": "Fast",
        "tone": "Conversational-urgent"
      },
      "visual": {
        "on_screen_text": "47 PRODUCTS — Bold, neon yellow, bottom center",
        "text_animation": "Pop-in at 0.3s",
        "props": ["Two serum bottles"],
        "background": "Clean, bright, minimal",
        "graphic_overlays": "None"
      },
      "audio": {
        "voice": "On-camera",
        "background_music": "None (voice only for hook)",
        "sound_effects": "None",
        "music_change": "Music fades in at 2.8s",
        "transition": "Hard cut at 3.0s"
      },
      "editing": {
        "cut_point": "2.8s (beat drop when music enters)",
        "transition_to_next": "Hard cut",
        "caption_style": "Bold white with black outline",
        "caption_animation": "Word-by-word synced to speech",
        "speed_ramp": "Normal"
      }
    }
  ]
}
```

## GOLDEN RULES (MUST FOLLOW)

### Rule 1: Show Don't Tell
Every fact must be DEMONSTRATED, not just spoken.
- BAD: "This serum is expensive" (just saying it)
- GOOD: "This serum is expensive" (while holding up price tag showing "$89")

### Rule 2: No Talking Head >2 Seconds
After 2 seconds of talking, something MUST change:
- Cut to different angle
- Text appears on screen
- Prop enters frame
- Actor does physical action
- Cut to B-roll

### Rule 3: Silent Moments
Mark these scenes with NO dialogue:
- Reaction shots (0.5-1.0s)
- Product reveals (1.0-2.0s)
- Before/after cuts (1.0s)
- Text-only moments (1.0-2.0s)

### Rule 4: Bridge Words Between Sentences
Every sentence must connect to the next:
- Sentence 1 -> "And I found..."
- Sentence 2 -> "But here's the thing..."
- Sentence 3 -> "I tried this for..."
- Sentence 4 -> "So now..."

### Rule 5: Action-Integrated Dialogue
Every line of dialogue must include WHAT THE ACTOR IS DOING while speaking:
```
(Actor: Walks to fridge. Opens door. Places bottle inside. Turns back to camera.)
"Store it in the fridge. It lasts twice as long."
```

## DIALOGUE ENGINEERING RULES

| Rule | Spec |
|------|------|
| Max words per line | 15 |
| Emphasis | 1-2 words marked for vocal stress (underline or caps) |
| Pauses | Breathing points indicated with "..." or "(pause)" |
| Forbidden words | "revolutionary", "unlock", "discover", "amazing" |
| Syllables | Prefer short, punchy words ("fridge" > "refrigerator") |
| Contractions | Use "don't", "it's", "can't" (conversational) |
| Questions | Max 1 per video, hooks only |
| You/Your count | Min 2 per 10 words |

## CAPTION SPECIFICATIONS

| Property | Spec |
|----------|------|
| Max words per line | 5-7 |
| Max lines on screen | 2 |
| Read speed | Under 1 second |
| Font | Bold sans-serif, white with black outline |
| Animation | Pop-in per word or per line |
| Position | Bottom third, centered |

## EDITING RULES

| Rule | Spec |
|------|------|
| Max cut interval | 2 seconds (ideal: 0.8-1.5s) |
| Jump cuts | Allowed and encouraged |
| Transitions | Hard cuts preferred |
| Text overlays | Must appear within 3 seconds |
| End card | Freeze on CTA text for 1+ seconds |

## STRUCTURE-SPECIFIC BLUEPRINTS

Generate scenes following the EXACT blueprint for the selected structure. Do not deviate from the blueprint order.

### S-TIER Structures

**Structure 1: Comparison (A vs B)**
Scenes: Micro bridge → Option A behavior → Consequence A → Option B behavior → Consequence B → Timeframe/Test → Explanation → Reinforcement → CTA
Scene count: 7-8 scenes

**Structure 2: Step-by-Step**
Scenes: Promise fix → Step 1 + Reason → Step 2 + Reason → Step 3 + Reason → Reinforcement → CTA
Scene count: 5-6 scenes

**Structure 3: Story Framework**
Scenes: Setup → Conflict → Emotional low → Decision → Action → Result → Lesson → CTA
Scene count: 7-8 scenes

### A-TIER Structures

**Structure 4: Smart vs Dumb**
Scenes: Contrast → Dumb behavior → Damage → Smart behavior → Benefit → Mechanism → Reinforcement → CTA
Scene count: 7 scenes

**Structure 5: Do vs Don't**
Scenes: Force choice → Wrong behavior → Damage → Correct behavior → Benefit → Reason → Reinforcement → CTA
Scene count: 7 scenes

**Structure 6: Myth Bust**
Scenes: State myth → Why believed → Contradiction → Correct method → Mechanism → Reinforcement → CTA
Scene count: 6 scenes

**Structure 7: List Structure**
Scenes: List setup → Point + reason → Point + reason → Point + reason → Pattern insight → CTA
Scene count: 5-6 scenes (varies by list length)

**Structure 8: 3-Level Structure**
Scenes: Introduce levels → Beginner → Limitation → Intermediate → Limitation → Advanced → Insight → CTA
Scene count: 7 scenes

**Structure 9: PAS**
Scenes: Problem → Consequence → Escalation → Solution → Action → Mechanism → Reinforcement → CTA
Scene count: 7 scenes

**Structure 10: Outcome → Pain → Solution**
Scenes: Dream outcome → Obstacles → Solution → Core mechanism → Reinforcement → CTA
Scene count: 5-6 scenes

**Structure 11: Before → After**
Scenes: Transformation → Before state → Struggle → Turning point → Action → Result → Lesson → CTA
Scene count: 7-8 scenes

### B-TIER Structures

**Structure 12: Time-Based Experiment**
Scenes: Baseline → Rule followed → Duration → Observation → Results → Insight → Reinforcement → CTA
Scene count: 7 scenes

**Structure 13: Fake Case Study**
Scenes: Scenario → Step 1 + reason → Step 2 + reason → Step 3 → Strategic stack → CTA
Scene count: 5-6 scenes

**Structure 14: Double Down**
Scenes: Existing winner → One change → Additional insight → Expected result → Reinforcement → CTA
Scene count: 5 scenes

**Structure 15: Cost Breakdown**
Scenes: Cost truth → Expense 1 → Expense 2 → Expense 3 → Total → Value comparison → Lesson → CTA
Scene count: 7 scenes

## SCENE COUNT BY LENGTH

| Video Length | Scene Count | Typical Structures |
|-------------|-------------|-------------------|
| 15-30s | 3-5 scenes | 2, 7, 10, 13, 14 |
| 30-60s | 5-8 scenes | 1, 3, 4, 5, 6, 8, 9, 11, 12, 15 |
| 60-90s | 7-9 scenes | 1, 3, 8, 9, 11, 12, 15 |

## QUALITY CHECK
Before returning, verify:
- [ ] Every scene has action parentheticals?
- [ ] No talking head exceeds 2s without visual change?
- [ ] Every fact has a visual demonstration?
- [ ] Bridge words connect every sentence?
- [ ] Dialogue max 15 words per line?
- [ ] CTA is exactly 1, max 5 words?
- [ ] Captions follow specs?
- [ ] Silent moments marked where appropriate?
