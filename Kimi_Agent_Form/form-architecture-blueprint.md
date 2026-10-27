# FORM ARCHITECTURE BLUEPRINT
## Complete Redesign: From Planning Form → Production Execution Brief

---

## PART 1: PROBLEM DIAGNOSIS

### Why Your Current Form Fails (The Real Reasons)

| Problem | Root Cause | Where It Breaks |
|---|---|---|
| Content writers copy-paste AI garbage | Form has no ANTI-AI-COPYPASTE guardrails. Fields are too open-ended. | Input section |
| Editors don't know cuts/camera | Form produces PLAN, not SHOT LIST. No camera direction fields. | Execution gap |
| Actors can't perform | Form has no actor direction (expressions, tone, pace). Dialogue has no delivery notes. | Execution gap |
| ChatGPT scripts are bullshit | AI gets vague inputs ("write about skincare"). No structured constraints to force good output. | AI input gap |

### The Core Issue

Your current form workflow:
```
TOPIC → VALUE → FORMAT → HOOK → CTA → SCRIPT
```
This produces a **Content Plan** (what to say).

What your team actually needs:
```
TOPIC → VALUE → STRUCTURE → SCENE BREAKDOWN → SHOT LIST → CAMERA DIR → ACTOR DIR → EDIT MARKERS → SCREENPLAY
```
This produces a **Production-Ready Screenplay** (what to say + how to say it + how to shoot it + how to edit it).

---

## PART 2: THE NEW FORM ARCHITECTURE

### 5-Phase Form Structure

```
PHASE 1: INPUT      (Content Writer fills — BRAIN ONLY, NO AI)
PHASE 2: STRUCTURE  (AI/System generates the skeleton)  
PHASE 3: EXECUTION  (AI generates the full production brief)
PHASE 4: VALIDATION (Human approves before filming)
PHASE 5: OUTPUT     (Export to Editor + Actor + Cameraman)
```

---

## PHASE 1: INPUT (Content Writer Section)

**Rule: Content writer uses their BRAIN. No AI. No copy-paste.**

### 1.1 Video Identity
| Field | Type | Purpose | Anti-Copy-Paste Measure |
|---|---|---|---|
| Date | Date picker | Admin | Auto-filled |
| Creator Name | Text | Who filled the form | Mandatory, min 2 chars |
| Actor Name | Text | Who performs | Dropdown of approved actors |
| Company | Text | Brand | Dropdown |
| Content Series / Batch ID | Text | Group related videos | Dropdown of active series |

### 1.2 Topic (FORCED BRIEF FORMAT)

**OLD (what you had):** Open text box — writers paste AI garbage.

**NEW:** Forced 3-sentence format. System REJECTS if not followed.

| Field | Constraint | Example |
|---|---|---|
| Niche | Dropdown (locked list) | Skincare |
| Sub-Niche | Dropdown (depends on Niche) | Anti-aging |
| **The Point** (1 sentence) | Max 20 words. Must start with "This video teaches..." | "This video teaches working women how to prevent wrinkles in 2 minutes." |
| **Why They Care** (1 sentence) | Max 20 words. Must explain the viewer's pain/gain. | "Because most women waste money on creams that don't work." |
| **The Proof** (1 sentence) | Max 20 words. Why should they trust you? | "I've tested 47 products and found 3 that actually work." |

**Anti-AI Rule:** These 3 sentences are checked against a "generic phrase blacklist." If they contain phrases like "in today's world," "in this video," "revolutionary," "game-changer" — the form REJECTS them with a warning.

### 1.3 Value (FORCED APPLIED FORMAT)

**OLD:** "What value does the viewer get?" — writers paste paragraphs.

**NEW:** The viewer must be able to APPLY something in under 60 seconds.

| Field | Constraint | Example |
|---|---|---|
| **Actionable Takeaway** | 1 sentence. Must start with "After watching, the viewer will be able to..." | "After watching, the viewer will be able to identify which of her 3 skincare products is actually working." |
| **Time to Value** | Dropdown: 0-3s / 3-5s / 5-10s / 10s+ | 3-5s |
| **Is this Entertaining Education?** | Yes/No toggle | Yes |
| **Fluff Check** | Checkbox: "I have removed all filler words and generic advice" | Required |

### 1.4 Audience (NEW — Missing from current form)

| Field | Type | Why It Matters |
|---|---|---|
| Target Viewer (1 persona) | Text: "A [age] [gender] who [problem] and wants [desire]" | Forces specificity |
| Viewer Mindset | Dropdown: Frustrated / Curious / Skeptical / Excited / Desperate | Determines hook tone |
| Knowledge Level | Dropdown: Beginner / Intermediate / Advanced | Determines value depth |
| Platform | Dropdown: Instagram / TikTok / YouTube Shorts / Facebook Reels / Multi | Determines format + CTA |

### 1.5 Reference Video (Viral Copy Source)

| Field | Type | Purpose |
|---|---|---|
| Viral Video URL | URL input | The video whose structure we're copying |
| Why It Worked | 2 sentences max | Forces the writer to analyze, not just paste |
| Structure Match | Dropdown: Clone exactly / Adapt partially / Use as inspiration | |

---

## PHASE 2: STRUCTURE (AI/System-Generated Skeleton)

**This section is AUTO-POPULATED by AI based on Phase 1 inputs.**
The content writer does NOT fill this. The AI/system generates it.

### 2.1 Content Type (AI-selected based on Topic + Value)

| Type | When AI Picks This | CTA Match |
|---|---|---|
| **Educational** | Teaching a skill/hack/how-to | Follow / Save |
| **Storytelling** | Sharing experience/journey | Follow |
| **Authority/Trust** | Proving credibility/results | Comment / DM |
| **Personal/Relatable** | Behind-the-scenes/personality | Follow |
| **Trending/Entertainment** | Riding a trend/format | Share / Comment |

### 2.2 Format Selection (AI-selected based on Content Type + Platform)

| Tier | Format | When AI Picks This |
|---|---|---|
| **S-Tier** | Clone (Smart vs Dumb) | Comparison/Debate topics |
| **S-Tier** | Talking Back & Forth | Q&A / Conversational topics |
| **S-Tier** | Visual Prop Explainer | Product demos / Physical objects |
| **S-Tier** | Carousel / Slide Deck (NEW) | Step-by-step / Educational |
| **A-Tier** | Voiceover + Visuals | Storytelling / Process |
| **A-Tier** | Whiteboard | Complex explanations |
| **B-Tier** | Trending Audio + B-roll | Entertainment / Lifestyle |
| **F-Tier** | B-roll Only | Aspirational / Mood |

### 2.3 Hook Framework (AI-generated, human-approved)

**The 3-Hook Rule:**

| Hook Layer | AI Generates | Human Approves |
|---|---|---|
| **Visual Hook** (Frame 0-0.5s) | 1-sentence visual description | YES/NO + edit |
| **Written Hook** (On-screen text) | Max 8 words, bold, emotional | YES/NO + edit |
| **Audio Hook** (First 1 second of audio) | Tone + first words | YES/NO + edit |

**NEW: Visual Hook Quality Rating (GAP 7)**
| Rating | Criteria | Action |
|---|---|---|
| **GREAT** | Action already happening, high contrast, result shown | Proceed |
| **GOOD** | Face visible, some action, predictable | Proceed with note |
| **BAD** | Static frame, talking head, no action, no contrast | **REJECT — must rewrite** |

### 2.4 Script Structure Template (AI-applied based on Format)

**Template A: Step-by-Step (Educational)**
```
[0-1s] HOOK (Visual + Written + Audio)
[1-3s] AUTHORITY GAP (Why trust me?)
[3-5s] NAMED FRAMEWORK ("The 3-Product Test")
[5-15s] STEP 1 (Show + Tell)
[15-25s] STEP 2 (Show + Tell)
[25-35s] STEP 3 (Show + Tell)
[35-40s] CTA (ONE clear action)
```

**Template B: Comparison (A vs B)**
```
[0-1s] HOOK ("A vs B — I tested both for 30 days")
[1-3s] OPTION A (Present fairly)
[3-5s] OPTION B (Present fairly)
[5-15s] THE TEST (What happened)
[15-25s] RESULTS (Numbers/visual proof)
[25-35s] EXPLANATION (Why one won)
[35-40s] CTA ("Comment which you use")
```

**Template C: Storytelling**
```
[0-2s] CONTEXT ("3 years ago I was broke")
[2-10s] PAIN (The struggle — be specific)
[10-20s] TURNING POINT (What changed)
[20-35s] LESSON (What I learned — the value)
[35-40s] CTA ("Follow for more")
```

### 2.5 CTA (AI-generated with matching rules — GAP 3)

| Content Type | CTA Type | CTA Text Example | Why |
|---|---|---|---|
| Educational | **Follow / Save** | "Save this for later" | Builds trust, not sales |
| Storytelling | **Follow** | "Follow if you relate" | Builds followers |
| Authority | **Comment → DM** | "Comment 'GUIDE' for my free checklist" | Generates leads |
| Comparison | **Comment** | "Comment which one you use" | Drives engagement |
| Demo/Proof | **Comment / DM** | "Comment 'YES' if this helped" | Qualifies leads |

**CTA Rules (enforced by system):**
- CTA text must be ≤ 5 words
- ONE CTA only per video
- CTA must match Content Type (system validates)

---

## PHASE 3: EXECUTION (The Missing Piece — Production Brief)

**THIS IS THE ENTIRELY NEW SECTION.** This is what was missing. This turns a plan into a screenplay.

### 3.1 Scene-by-Scene Breakdown (AI-generated from Structure)

Each scene gets a card:

```
SCENE 1: THE HOOK (0-3 seconds)
├── Camera: Close-up, slightly low angle, handheld feel
├── Actor Direction: Look directly into lens. Expression = Confident/Smiling. 
│                  Head movement = slight nod. Energy = HIGH.
├── Dialogue: "I tested 47 skincare products so you don't have to."
│            Tone = Conversational. Pace = Fast. Emphasis on "47" and "don't."
├── Visual: Face fills 60% of frame. Text overlay appears bottom third.
├── Audio: No background music. Voice only. Clean audio.
├── Cut Point: Hard cut at 2.8s exactly.
│
SCENE 2: AUTHORITY GAP (3-5 seconds)
├── Camera: Medium shot. Static.
├── Actor Direction: Expression shifts to serious/knowledgeable. 
│                  Body language = open palms gesture.
├── Dialogue: "And I found exactly 3 that actually work."
│            Tone = Authoritative. Pace = Measured.
├── Visual: Cut to product shots (3 bottles) appearing on screen.
├── Audio: Subtle confidence music starts (low volume).
├── Cut Point: Cut on the word "work."
│
[... and so on for every scene]
```

### 3.2 Camera Direction Matrix (Per Scene)

| Field | Options | When to Use |
|---|---|---|
| **Shot Type** | Extreme Close-up / Close-up / Medium / Wide / Establishing | Hook = Close-up. Value delivery = Medium. |
| **Camera Angle** | Eye level / Low angle / High angle / Dutch tilt | Authority = Low angle. Relatable = Eye level. |
| **Camera Movement** | Static / Handheld / Push in / Pull out / Pan / Tilt | Energy scenes = Handheld. Explanations = Static. |
| **Lens Feel** | Telephoto (compressed) / Wide (expansive) / Normal | Product = Telephoto. Process = Wide. |
| **Framing** | Center / Rule of thirds / Off-center / Full frame | Hook = Center. B-roll = Rule of thirds. |

### 3.3 Actor Direction Matrix (Per Scene)

| Field | Options | Why It Matters |
|---|---|---|
| **Expression** | Neutral / Smiling / Serious / Shocked / Skeptical / Excited | Tells actor EXACTLY what face to make |
| **Eye Contact** | Direct to camera / Off-camera / Looking down / Side glance | Hook = Direct. Story = Off-camera (remembering). |
| **Body Language** | Open palms / Pointing / Crossed arms / Leaning in / Stepping back | Authority = Open palms. Secret = Leaning in. |
| **Energy Level** | 1-10 scale | Hook = 9-10. Value delivery = 6-7. CTA = 8. |
| **Pace of Speech** | Fast / Normal / Slow / Paused | Hook = Fast. Important point = Slow + Paused. |
| **Tone** | Conversational / Authoritative / Whisper / Excited / Empathetic | Matches content type |

### 3.4 Dialogue Engineering (Per Scene)

**OLD:** Script is just text.

**NEW:** Every line of dialogue has delivery notes.

```
Line: "I tested 47 skincare products so you don't have to."
├── Word Count: 11
├── Emphasis Words: "tested" (beat), "47" (pause after), "don't" (stress)
├── Forbidden Words: None
├── Speaking Tone: Conversational-confident
├── Delivery Speed: Fast (0.8s per word average)
├── Pauses: After "products" (0.5s), After "to" (0.3s)
└── What to AVOID: Sounding salesy, robotic, or like an ad
```

### 3.5 Visual Elements Map (Per Scene)

| Element | Description | Example |
|---|---|---|
| **On-Screen Text** | Exact text, font style, position | "47 PRODUCTS" — Bold, yellow, bottom center |
| **Text Animation** | How text appears | Pop-in, typewriter, slide-from-left |
| **Props** | Physical objects in frame | 3 skincare bottles, laptop |
| **Background** | What's behind the actor | Clean white wall / Office / Outdoor |
| **Color Palette** | Dominant colors | Warm tones, low saturation |
| **Lighting** | Lighting setup | Ring light front + softbox side |
| **Graphic Overlays** | Arrows, circles, highlights | Yellow arrow pointing to product |

### 3.6 Audio Direction (Per Scene)

| Element | Description | Example |
|---|---|---|
| **Voiceover or On-Camera** | How audio is captured | On-camera for hook, Voiceover for B-roll |
| **Background Music** | Genre, energy, volume | Upbeat electronic, 20% volume, fades in at 3s |
| **Sound Effects** | Specific SFX | "Ding" on text pop, "Whoosh" on transition |
| **Music Change Points** | When music shifts | Drop at 15s when results revealed |
| **Audio Transitions** | How audio flows between scenes | Hard cut / Crossfade / Beat drop |

### 3.7 Editing Markers (Per Scene)

| Element | Description | Example |
|---|---|---|
| **Cut Point** | Exact second to cut | Cut at 2.8s (on the beat) |
| **Cut Type** | Hard cut / Jump cut / Match cut / Wipe | Hook = Hard cut. Value = Jump cut every 1.5s |
| **Transition** | How we move to next scene | Hard cut / Zoom / Slide / Spin |
| **Caption Style** | How captions appear | Bold white text, black outline, max 5 words per line |
| **Caption Timing** | When captions appear/disappear | Appear 0.2s after audio, disappear 0.3s after |
| **Speed Ramp** | Slow-mo or fast-mo | Product reveal = 0.5x speed for 1 second |
| **Zoom/Pan** | Digital movement | Push in 10% on key moment |

### 3.8 Caption Specifications (NEW — Critical for 90% muted viewers)

| Rule | Specification |
|---|---|
| Max words per line | 5-7 |
| Max lines on screen | 2 |
| Read speed | Must be readable in < 1 second |
| Font style | Bold, high contrast, readable on mobile |
| Animation | Pop-in per word or per line |
| Position | Bottom third, centered, safe zone |

---

## PHASE 4: VALIDATION (Human Approval Gate)

### 4.1 Pre-Production Checklist

| # | Check | Pass / Fail |
|---|---|---|
| 1 | Is the hook emotionally triggering? | |
| 2 | Does value arrive within 3 seconds? | |
| 3 | Is the dialogue natural (not AI-sounding)? | |
| 4 | Can a 10-year-old understand the script? | |
| 5 | Are camera directions clear for each scene? | |
| 6 | Are actor directions specific (expression, tone, pace)? | |
| 7 | Are cut points and transitions marked? | |
| 8 | Is there ONE clear CTA? | |
| 9 | Are captions engineered for muted viewing? | |
| 10 | Does every scene have a visual change every 1-2s? | |

**Rule: ALL 10 must be YES to proceed to filming.**

### 4.2 Approval Workflow

| Role | What They Review | Sign-off |
|---|---|---|
| Content Lead | Phase 1 + 2 (Topic, Value, Structure) | Approved / Revise |
| Production Lead | Phase 3 (Execution Brief) | Approved / Revise |
| Actor | Their scenes + directions | Acknowledged |
| Editor | Full brief + editing markers | Approved / Revise |

---

## PHASE 5: OUTPUT (Export to Team)

### 5.1 Auto-Generated Exports

From ONE completed form, the system auto-generates:

| Document | For Who | Contains |
|---|---|---|
| **Actor Brief** | Actor | Only their scenes + dialogue + expression/energy notes |
| **Camera Sheet** | Cameraman | Shot list per scene + camera settings + movements |
| **Edit Timeline** | Editor | Full scene breakdown + cut points + transitions + captions + audio cues |
| **Script-Only** | Everyone | Clean dialogue-only version for reference |
| **AI Prompt Log** | Admin | All AI prompts used (for future refinement) |

---

## PART 3: FIELD-BY-FIELD COMPARISON (OLD vs NEW)

| Current Form Section | Status | What Happens |
|---|---|---|
| Detail Page (Date, Creator, Actor, Company) | **KEEP** | Add: Content Series/Batch ID |
| Topic (Niche, Sub-Niche, Topic) | **MODIFY** | Force 3-sentence format + anti-AI blacklist |
| Topic Validation (Demand, Relevance, Interest) | **KEEP** | Add: Time-to-Value field |
| Value (Value textarea) | **MODIFY** | Force applied format + Fluff check mandatory |
| Format (S/A/B/F-Tier) | **KEEP** | Add: Carousel/Slide Deck option |
| Hook Type (12 options) | **KEEP** | Add: Visual Hook Quality Rating (GAP 7) |
| 3-Hook (Visual/Written/Audio) | **KEEP** | No change |
| Physiological Triggers | **KEEP** | No change |
| CTA (CTA textarea) | **MODIFY** | Add: CTA Type selector + matching rules (GAP 3) |
| Reference Video | **NEW** | Viral copy source + deconstruction (GAP 16) |
| **Audience Profile** | **NEW** | Target persona + mindset + knowledge level |
| **Script Structure Template** | **NEW** | Locked scene-by-scene template |
| **Content Type (5 types)** | **NEW** | Educational / Story / Authority / Personal / Trending |
| **SCENE BREAKDOWN** | **NEW** | Shot-by-shot with timing |
| **CAMERA DIRECTION** | **NEW** | Per scene: shot, angle, movement, lens |
| **ACTOR DIRECTION** | **NEW** | Per scene: expression, eyes, body, energy, pace, tone |
| **DIALOGUE ENGINEERING** | **NEW** | Per line: emphasis, pauses, forbidden words, delivery |
| **VISUAL ELEMENTS MAP** | **NEW** | Per scene: text, props, background, colors, lighting |
| **AUDIO DIRECTION** | **NEW** | Per scene: VO/music/SFX/transitions |
| **EDITING MARKERS** | **NEW** | Per scene: cut points, transitions, captions, speed |
| **Caption Specifications** | **NEW** | Global rules for all captions |
| **Validation Checklist** | **NEW** | 10-point pass/fail |
| **Approval Workflow** | **MODIFY** | 4-role sign-off |
| **Auto-Export Docs** | **NEW** | Actor Brief, Camera Sheet, Edit Timeline |

---

## PART 4: THE WORKFLOW

### How Each Role Uses the Form

```
CONTENT WRITER
    ↓
Fills Phase 1 ONLY (Input):
  - Topic (3-sentence forced format)
  - Value (applied format)
  - Audience profile
  - Reference video
  - Anti-AI guardrails enforce BRAIN-ONLY input
    ↓
[SYSTEM VALIDATES: No generic AI phrases detected]
    ↓
AI / SYSTEM
    ↓
Generates Phase 2 (Structure):
  - Content Type (5 types)
  - Format selection
  - Hook framework (3 hooks)
  - Script structure template (A/B/C)
  - CTA (with type matching)
    ↓
CONTENT LEAD REVIEWS
    ↓
Approves / Edits Phase 2
    ↓
AI / SYSTEM
    ↓
Generates Phase 3 (Execution Brief):
  - Scene-by-scene breakdown
  - Camera direction per scene
  - Actor direction per scene
  - Dialogue engineering per line
  - Visual elements per scene
  - Audio direction per scene
  - Editing markers per scene
    ↓
PRODUCTION LEAD REVIEWS
    ↓
Approves / Edits Phase 3
    ↓
ACTOR + EDITOR + CAMERAMAN
    ↓
Each gets their CUSTOM export:
  - Actor gets: Actor Brief
  - Cameraman gets: Camera Sheet  
  - Editor gets: Edit Timeline
    ↓
FILMING
    ↓
PHASE 4: Validation
  - 10-point checklist
  - Video vs Script comparison
    ↓
PHASE 5: Output to Freepik / Editor
```

---

## PART 5: ANTI-AI-COPYPASTE GUARDRAILS

### The Problem You Described
Content writers copy-paste from ChatGPT. The output is generic bullshit.

### The Solution: 5 Guardrails

| # | Guardrail | How It Works |
|---|---|---|
| **1** | **Forced Format Sentences** | Topic must follow "This video teaches..." format. AI-generated text rarely matches this exactly. |
| **2** | **Generic Phrase Blacklist** | Auto-detect and reject: "in today's world," "in this video," "revolutionary," "game-changer," "unlock your potential," "discover the secret" |
| **3** | **Word Count Limits** | Topic sentences max 20 words each. AI tends to write longer, fluffier sentences. |
| **4** | **Specificity Test** | System checks for numbers, names, specifics. "Use 3 products" passes. "Use the right products" FAILS. |
| **5** | **Human Approval Gate** | AI-generated sections (Phase 2+3) require HUMAN approval before proceeding. Nothing goes to production unreviewed. |

---

## PART 6: WHAT THIS SOLVES

| Your Problem | How the New Form Solves It |
|---|---|
| Writers copy-paste AI garbage | Forced formats + blacklists + word limits make copy-paste impossible |
| Editors don't know cuts/camera | Phase 3 provides shot-by-shot camera direction + cut points |
| Actors can't perform | Phase 3 gives exact expression, tone, pace, body language per scene |
| Dialogue sounds like AI | Dialogue Engineering forces emphasis, pauses, delivery notes per line |
| ChatGPT scripts are bullshit | Structured inputs (Phase 1) + templates (Phase 2) constrain AI to produce usable output |
| Team can't execute the script | Auto-exported Actor Brief + Camera Sheet + Edit Timeline give each role exactly what they need |

---

## NEXT STEP

This architecture gives you the complete blueprint. The next step is to:

1. **Confirm this architecture** — Approve the 5-phase structure
2. **Build the improved form** — Implement the new fields and sections
3. **Create AI prompts** — Build the prompt templates that take Phase 1 input and generate Phase 2 + 3
4. **Test with one video** — Run one video through the complete workflow
5. **Iterate** — Refine based on real results

Say the word and I'll begin building the actual form.
