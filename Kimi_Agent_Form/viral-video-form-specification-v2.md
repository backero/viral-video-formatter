# VIRAL VIDEO FORM SPECIFICATION V2
## Complete Production-Ready Form with Execution Brief
### 5-Phase Architecture: Input → Structure → Execution → Validation → Output

---

# PHASE 1: INPUT (Content Writer — BRAIN ONLY, NO AI)

---

## 1.1 VIDEO IDENTITY

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| Date | Date Picker | Yes | Auto: Today | System auto-fills |
| Creator Name | Text | Yes | — | Min 2 chars. Who filled the form. |
| Actor Name | Dropdown | Yes | — | Pre-loaded list of approved actors |
| Company | Dropdown | Yes | — | Pre-loaded list of brands/accounts |
| Content Series / Batch ID | Dropdown + Text | No | — | Group related videos. Dropdown shows active series + option to create new. |
| Platform | Dropdown | Yes | Instagram | Options: Instagram / TikTok / YouTube Shorts / Facebook Reels / Multi-Platform |
| Estimated Video Length | Dropdown | Yes | 30-60s | Options: 15-30s / 30-60s / 60-90s / 90-120s |

---

## 1.2 RAW RESEARCH INPUT (NEW — Where 40 Pages Go)

### Field 1.2.1: Raw Research Dump
| Property | Value |
|---|---|
| **Label** | "Dump ALL your research here — articles, notes, data, links, thoughts" |
| **Type** | Long text area (unlimited) |
| **Required** | Yes |
| **Placeholder** | "Paste everything you've found. No formatting needed. Articles, stats, quotes, URLs, random thoughts — dump it all. The AI will find the gold." |
| **Validation** | Min 100 characters (forces actual research, not empty) |

> **ANTI-AI RULE #1:** System scans for "perfectly formatted" AI output patterns. If the dump looks like a ChatGPT-generated summary (bullet points, headers, "In conclusion"), it flags for review.

---

### Field 1.2.2: Research Source Log
| Property | Value |
|---|---|
| **Label** | "Where did this research come from?" |
| **Type** | Text area (optional but encouraged) |
| **Placeholder** | "Article URLs, book names, expert names, personal experience, etc." |
| **Purpose** | Audit trail. Helps validate credibility and revisit sources. |

---

## 1.3 AI VIRAL NUGGET EXTRACTION (AUTO-GENERATED — Writer Reviews)

> **This section is AUTO-POPULATED by AI** after the writer submits Raw Research. The AI reads the 40 pages and extracts exactly 3 viral-worthy nuggets.

### How the AI Extracts:

The AI scans the research dump and categorizes findings into 3 buckets:

| Nugget Type | What the AI Looks For | Example |
|---|---|---|
| **Shocking Fact** | Counter-intuitive stats, surprising data, "I can't believe that" moments | "70% of vitamin C serums oxidize before you finish the bottle" |
| **Practical Hack** | Actionable tips, step-by-step shortcuts, immediate wins | "Store serum in the fridge — doubles effectiveness" |
| **Story Hook** | Emotional angles, personal struggle, transformation narratives | "I spent $2,000 on serums before learning this one trick" |

### Field 1.3.1: Nugget 1 — Shocking Fact
| Property | Value |
|---|---|
| **Label** | "SHOCKING FACT" |
| **Type** | Auto-filled text + Human edit |
| **Display** | AI-generated 1-sentence nugget + "Edit" button |
| **Validation** | Max 25 words. Must contain a number, percentage, or specific claim. |

### Field 1.3.2: Nugget 2 — Practical Hack  
| Property | Value |
|---|---|
| **Label** | "PRACTICAL HACK" |
| **Type** | Auto-filled text + Human edit |
| **Display** | AI-generated 1-sentence nugget + "Edit" button |
| **Validation** | Max 25 words. Must start with a verb (action-oriented). |

### Field 1.3.3: Nugget 3 — Story Hook
| Property | Value |
|---|---|
| **Label** | "STORY HOOK" |
| **Type** | Auto-filled text + Human edit |
| **Display** | AI-generated 1-sentence nugget + "Edit" button |
| **Validation** | Max 25 words. Must contain emotional or personal element. |

> **ANTI-AI RULE #2:** Each nugget is checked against the Generic Phrase Blacklist (see Section 1.7). If it contains banned phrases, it's flagged for rewrite.

---

## 1.4 ONE POINT SELECTOR (Writer Chooses ONE)

### Field 1.4.1: Select Your Nugget
| Property | Value |
|---|---|
| **Label** | "Pick ONE nugget for THIS video. (The others become future videos.)" |
| **Type** | Radio button (3 options: Nugget 1 / Nugget 2 / Nugget 3) |
| **Required** | Yes |
| **Hard Rule** | ONE video = ONE point. System enforces this. |
| **Auto-Action** | Unselected nuggets are auto-saved as "Pending Topics" for the content series. |

### Field 1.4.2: Why This Nugget?
| Property | Value |
|---|---|
| **Label** | "Why will THIS specific point stop the scroll?" |
| **Type** | Text (forced format) |
| **Required** | Yes |
| **Format** | Must start with: "A [target viewer] scrolling [platform] will stop because..." |
| **Max Length** | 40 words |
| **Example** | "A 28-year-old woman scrolling Instagram will stop because she just bought a $60 serum and needs to know if it's wasting away in her bathroom." |

---

## 1.5 TOPIC (FORCED FORMAT — Anti-CopyPaste)

### Field 1.5.1: Niche
| Property | Value |
|---|---|
| **Type** | Dropdown (locked master list) |
| **Required** | Yes |
| **Admin Control** | Only admins can add/edit niche options. |

### Field 1.5.2: Sub-Niche
| Property | Value |
|---|---|
| **Type** | Dropdown (dependent on Niche selection) |
| **Required** | Yes |
| **Dynamic** | Options change based on Niche selected. |

### Field 1.5.3: The Point (Sentence 1)
| Property | Value |
|---|---|
| **Label** | "The Point — What does this video teach?" |
| **Type** | Text |
| **Required** | Yes |
| **Forced Format** | Must start with: "This video teaches..." |
| **Max Length** | 20 words |
| **Example** | "This video teaches working women how to keep their vitamin C serum from going bad." |
| **Validation** | Must contain specific noun (no vague words like "things," "stuff," "tips"). |

### Field 1.5.4: Why They Care (Sentence 2)
| Property | Value |
|---|---|
| **Label** | "Why They Care — What's the viewer's pain or gain?" |
| **Type** | Text |
| **Required** | Yes |
| **Forced Format** | Must start with: "They care because..." |
| **Max Length** | 20 words |
| **Example** | "They care because most women waste money on serums that oxidize in 30 days." |
| **Validation** | Must reference a specific cost, time, or emotional stakes. |

### Field 1.5.5: The Proof (Sentence 3)
| Property | Value |
|---|---|
| **Label** | "The Proof — Why should they trust you?" |
| **Type** | Text |
| **Required** | Yes |
| **Forced Format** | Must start with: "Trust me because..." |
| **Max Length** | 20 words |
| **Example** | "Trust me because I tested 47 products and checked the science behind oxidation." |
| **Validation** | Must contain a number, credential, or specific experience. |

---

## 1.6 VALUE (FORCED APPLIED FORMAT)

### Field 1.6.1: Actionable Takeaway
| Property | Value |
|---|---|
| **Label** | "What will the viewer be able to DO after watching?" |
| **Type** | Text (forced format) |
| **Required** | Yes |
| **Forced Format** | Must start with: "After watching, the viewer will be able to..." |
| **Max Length** | 25 words |
| **Example** | "After watching, the viewer will be able to store her serum correctly and make it last 2x longer." |
| **Validation** | Must describe an ACTION (not "understand" or "know" — must be DO). |

### Field 1.6.2: Time to Value
| Property | Value |
|---|---|
| **Label** | "How fast does the value arrive?" |
| **Type** | Dropdown |
| **Required** | Yes |
| **Options** | 0-3 seconds / 3-5 seconds / 5-10 seconds / 10+ seconds |
| **Rule** | 0-3s or 3-5s gets a green badge. 10+ gets a WARNING: "Viral videos deliver value fast. Consider restructuring." |

### Field 1.6.3: Entertaining Education Check
| Property | Value |
|---|---|
| **Label** | "Is this Entertaining Education? (Teaches while entertaining — not a boring lecture)" |
| **Type** | Toggle (Yes/No) |
| **Required** | Yes |
| **If No** | WARNING displayed: "Content that entertains WHILE educating performs 3-5x better." |

### Field 1.6.4: Fluff Check
| Property | Value |
|---|---|
| **Label** | "I have removed ALL filler words, generic advice, and 'everyone knows' statements" |
| **Type** | Checkbox |
| **Required** | Must be checked to proceed |
| **If Unchecked** | Form cannot submit. Error: "Remove fluff before proceeding." |

### Field 1.6.5: Topic Validation
| Property | Value |
|---|---|
| **Label** | "Validate your topic" |
| **Type** | 4 checkboxes (all must be checked) |
| **Checkboxes** | 1. Demand: "People are actively searching for this" 2. Relevance: "This matches my niche" 3. Interest: "This would stop ME from scrolling" 4. Knowledge: "I have real experience/data here" |
| **Required** | All 4 must be checked |

---

## 1.7 AUDIENCE PROFILE (NEW)

### Field 1.7.1: Target Persona
| Property | Value |
|---|---|
| **Label** | "Describe your target viewer in ONE sentence" |
| **Type** | Text (forced format) |
| **Required** | Yes |
| **Forced Format** | "A [age]-year-old [gender] who [problem/struggle] and wants [desire]" |
| **Max Length** | 25 words |
| **Example** | "A 28-year-old woman who buys expensive skincare but doesn't see results and wants her products to actually work." |

### Field 1.7.2: Viewer Mindset
| Property | Value |
|---|---|
| **Label** | "What is the viewer feeling RIGHT BEFORE they see this video?" |
| **Type** | Dropdown |
| **Required** | Yes |
| **Options** | Frustrated / Curious / Skeptical / Excited / Desperate / Bored / Hopeful |
| **Purpose** | Determines hook tone. Desperate = empathetic hook. Skeptical = proof-first hook. |

### Field 1.7.3: Knowledge Level
| Property | Value |
|---|---|
| **Label** | "How much does your viewer already know about this topic?" |
| **Type** | Dropdown |
| **Required** | Yes |
| **Options** | Beginner (no prior knowledge) / Intermediate (heard of it) / Advanced (tried it) |
| **Purpose** | Determines value depth. Beginner = explain basics. Advanced = skip to advanced tips. |

---

## 1.8 REFERENCE VIDEO (GAP 16 — VIRAL STRUCTURE COPYING)

### Field 1.8.1: Viral Video URL
| Property | Value |
|---|---|
| **Label** | "What viral video are we modeling this after?" |
| **Type** | URL input |
| **Required** | No (but STRONGLY encouraged) |
| **Placeholder** | "Paste the link to a video that got 5x+ the creator's average views" |

### Field 1.8.2: Why It Worked
| Property | Value |
|---|---|
| **Label** | "Why did THIS specific video go viral? (Analyze, don't just paste)" |
| **Type** | Text (2 sentences max) |
| **Required** | If URL is filled, this is required |
| **Forced Format** | "It worked because [specific mechanism]. The hook worked because [specific emotional trigger]." |
| **Example** | "It worked because it showed the shocking before/after in the first 2 seconds. The hook triggered desperation — everyone wants clear skin overnight." |

### Field 1.8.3: Structure Match Level
| Property | Value |
|---|---|
| **Label** | "How closely are we following their structure?" |
| **Type** | Dropdown |
| **Required** | If URL is filled, this is required |
| **Options** | Clone exactly (same structure, different topic) / Adapt partially (modify some elements) / Use as inspiration (same energy, different execution) |

---

## 1.9 ANTI-AI COPY-PASTE GUARDRAILS (GLOBAL)

### Generic Phrase Blacklist
These phrases are **AUTOMATICALLY DETECTED AND REJECTED** in any Phase 1 text field:

| Category | Banned Phrases |
|---|---|
| Generic openers | "In today's world," "In this video," "Let's talk about," "Have you ever wondered" |
| Hype words | "Revolutionary," "Game-changer," " groundbreaking," "Cutting-edge" |
| Vague promises | "Unlock your potential," "Discover the secret," "Transform your life," "Achieve your dreams" |
| Filler phrases | "It's important to note that," "At the end of the day," "The fact of the matter is" |
| AI tells | "In conclusion," "Furthermore," "Moreover," "It's worth noting," "Let's dive in" |
| Vague nouns | "things," "stuff," "tips," "stuff like that," "and so on" |

### Specificity Test
Any sentence in Phase 1 must contain at least ONE of:
- A number ("3 products")
- A specific name ("Vitamin C serum")
- A specific time frame ("30 days")
- A specific cost ("$60")
- A specific brand/person ("I tested CeraVe")

If no specificity detected → WARNING: "Be specific. Generic claims don't go viral."

---

---

# PHASE 2: STRUCTURE (AI/System-Generated Skeleton)

> **AUTO-POPULATED.** No human writes this section. AI uses Phase 1 inputs to generate.
> Human reviews and approves/edits.

---

## 2.1 CONTENT TYPE (AI-SELECTED)

| Type | AI Picks When... | CTA Auto-Match | Frequency |
|---|---|---|---|
| **Educational** | Teaching a skill, how-to, hack, step-by-step | Follow / Save | 3-5x/week |
| **Storytelling** | Sharing experience, journey, transformation | Follow | 1-2x/week |
| **Authority/Trust** | Proving credibility, results, case studies | Comment → DM | 1x/week |
| **Personal/Relatable** | Behind-the-scenes, personality, day-in-life | Follow | 1-2x/week |
| **Trending/Entertainment** | Riding a trend, format, challenge | Share / Comment | As needed |

**Field Display:** AI-selected type shown with brief explanation of WHY it was chosen (based on Topic + Value + Platform).
**Human Override:** Writer can change the type with one click. System updates CTA auto-match accordingly.

---

## 2.2 FORMAT SELECTION (AI-SELECTED)

| Tier | Format | AI Picks When... | Best For |
|---|---|---|---|
| **S-Tier** | Clone (Smart vs Dumb) | Comparison/debate topics, A vs B | Engagement, shares |
| **S-Tier** | Talking Back & Forth | Q&A, conversational, interview | Relatability |
| **S-Tier** | Visual Prop Explainer | Product demos, physical objects | Clarity, saves |
| **S-Tier** | **Carousel / Slide Deck** | Step-by-step, educational, data | Instagram saves |
| **A-Tier** | Voiceover + Visuals | Storytelling, process, routine | Retention |
| **A-Tier** | Whiteboard | Complex explanations, frameworks | Authority |
| **B-Tier** | Trending Audio + B-roll | Entertainment, lifestyle, mood | Algorithm boost |
| **F-Tier** | B-roll Only | Aspirational, aesthetic, vibe | Brand building |

---

## 2.3 SCRIPT STRUCTURE TEMPLATE (TIMING LOCKED)

### Template A: Step-by-Step (Educational)
```
[0.0s - 1.0s]  HOOK: Visual + Written + Audio (3-hook stack)
[1.0s - 3.0s]  AUTHORITY GAP: "Why trust me?" statement
[3.0s - 5.0s]  NAMED FRAMEWORK: "I call this The [Name] Method"
[5.0s - 15.0s] STEP 1: Show + Tell (visual demonstration)
[15.0s - 25.0s] STEP 2: Show + Tell (visual demonstration)  
[25.0s - 35.0s] STEP 3: Show + Tell (visual demonstration)
[35.0s - 40.0s] CTA: ONE clear action
```

### Template B: Comparison (A vs B)
```
[0.0s - 1.0s]  HOOK: "I tested [A] vs [B] for 30 days"
[1.0s - 3.0s]  OPTION A: Present fairly (no bias yet)
[3.0s - 5.0s]  OPTION B: Present fairly (no bias yet)
[5.0s - 15.0s] THE TEST: What I did, how I tested
[15.0s - 25.0s] RESULTS: Numbers, visual proof, side-by-side
[25.0s - 35.0s] EXPLANATION: Why one won (the science/logic)
[35.0s - 40.0s] CTA: "Comment which one YOU use"
```

### Template C: Storytelling
```
[0.0s - 2.0s]  CONTEXT: "3 years ago I was [struggling]"
[2.0s - 10.0s] PAIN: The struggle — specific, emotional, detailed
[10.0s - 20.0s] TURNING POINT: What changed, the discovery
[20.0s - 35.0s] LESSON: What I learned + the value for viewer
[35.0s - 40.0s] CTA: "Follow if you're going through this too"
```

### Template D: Shocking Fact (NEW — For Nugget Type 1)
```
[0.0s - 1.0s]  HOOK: State the shocking fact immediately
[1.0s - 3.0s]  REACTION: Show the emotional reaction (yours or theirs)
[3.0s - 8.0s]  PROOF: Back it up with data/visual evidence
[8.0s - 15.0s] IMPLICATION: What this means for the viewer
[15.0s - 25.0s] SOLUTION: What to do about it
[25.0s - 35.0s] DEMONSTRATION: Show the fix in action
[35.0s - 40.0s] CTA: "Save this before [consequence] happens to you"
```

### Template E: Practical Hack (NEW — For Nugget Type 2)
```
[0.0s - 1.0s]  HOOK: "Stop doing [common mistake]"
[1.0s - 3.0s]  PROBLEM: Why the common way fails
[3.0s - 5.0s]  SETUP: "Here's what to do instead"
[5.0s - 15.0s] HACK STEP 1: First action (show clearly)
[15.0s - 25.0s] HACK STEP 2: Second action (show clearly)
[25.0s - 35.0s] RESULT: Show the before/after or outcome
[35.0s - 40.0s] CTA: "Follow for more hacks like this"
```

### Template F: Story Hook (NEW — For Nugget Type 3)
```
[0.0s - 2.0s]  HOOK: Personal emotional statement
[2.0s - 10.0s] STORY: Tell the experience (vivid, specific)
[10.0s - 20.0s] LOW POINT: The worst moment (relatable)
[20.0s - 30.0s] DISCOVERY: What changed everything
[30.0s - 37.0s] LESSON: The one thing viewer should learn
[37.0s - 40.0s] CTA: "Comment if you've been through this"
```

---

## 2.4 HOOK FRAMEWORK (3-HOOK RULE)

### Visual Hook (Frame 0-0.5 seconds)
| Element | AI Generates | Human Approves |
|---|---|---|
| Description | 1-sentence visual description of Frame 0 | YES/NO + Edit |
| Example | "Close-up of woman's shocked face holding two skincare bottles" | |

### Written Hook (On-screen text)
| Element | AI Generates | Human Approves |
|---|---|---|
| Text | Max 8 words, bold, emotional | YES/NO + Edit |
| Example | "I wasted $2,000 on THIS" | |

### Audio Hook (First 1 second)
| Element | AI Generates | Human Approves |
|---|---|---|
| Description | Tone + exact first 3-5 words | YES/NO + Edit |
| Example | "Energetic, slightly angry tone: 'Stop buying serums!'" | |

---

## 2.5 VISUAL HOOK QUALITY RATING (GAP 7)

| Rating | Criteria | Visual Indicators | Action |
|---|---|---|---|
| **GREAT** | Action already happening, high contrast, result/mistake shown | Movement in frame, facial expression visible, props in use, bright/contrasty | ✅ PROCEED |
| **GOOD** | Face or product visible, some action, predictable motion | Static but clear, well-lit, subject centered | ⚠️ PROCEED with note |
| **BAD** | Static frame, talking head with no action, no contrast, no props | Person standing still, blank background, no movement, no text overlay | ❌ **REJECT — Must rewrite** |

---

## 2.6 CTA (GAP 3 — TYPE MATCHING)

### CTA Type Selector
| Content Type | CTA Type | CTA Text Example | Why |
|---|---|---|---|
| Educational | **Follow / Save** | "Save this for later" | Trust-building, not salesy |
| Storytelling | **Follow** | "Follow if you relate" | Community building |
| Authority | **Comment → DM** | "Comment 'GUIDE' for my free checklist" | Lead generation |
| Personal | **Follow** | "Follow for more real talk" | Personality connection |
| Trending | **Share / Comment** | "Tag someone who needs to see this" | Algorithm boost |

### CTA Rules (System-Enforced)
1. **ONE CTA only** per video (system blocks multiple)
2. **CTA text ≤ 5 words** (system enforces character limit)
3. **CTA must match Content Type** (system validates auto-match)
4. **CTA appears ONLY at the end** (no mid-roll CTAs)

---

---

# PHASE 3: EXECUTION (AI-Generated Production Brief)

> **AUTO-POPULATED.** AI takes Phase 1 + Phase 2 and generates the full production brief.
> This is the entirely new section that solves your execution problems.

---

## 3.1 SCENE-BY-SCENE BREAKDOWN

Each scene is a card. Here's the format:

### Scene Card Format

```
SCENE [NUMBER]: [SCENE NAME] ([START]s - [END]s)
==================================================
Duration: [X.X] seconds

DIALOGUE:
"[Exact words to speak]"
Word Count: [X]
Emphasis: "[bold words]"
Pauses: After "[word]" (0.Xs)
Forbidden: "[words to avoid saying]"

ACTOR DIRECTION:
├── Expression: [Smiling / Serious / Shocked / Skeptical / Excited / Empathetic]
├── Eye Contact: [Direct to camera / Off-camera left / Off-camera right / Looking down]
├── Body Language: [Open palms / Pointing / Arms crossed / Leaning in / Stepping back / Static]
├── Energy Level: [1-10]
├── Speaking Pace: [Fast / Normal / Slow / Paused]
└── Tone: [Conversational / Authoritative / Whisper / Excited / Empathetic / Urgent]

CAMERA DIRECTION:
├── Shot Type: [Extreme Close-up / Close-up / Medium / Wide / Establishing]
├── Camera Angle: [Eye level / Low angle / High angle / Dutch tilt / Overhead]
├── Movement: [Static / Handheld / Push in / Pull out / Pan left / Pan right / Tilt]
├── Lens Feel: [Telephoto (compressed) / Wide (expansive) / Normal]
└── Framing: [Center / Rule of thirds left / Rule of thirds right / Off-center / Full frame]

VISUAL ELEMENTS:
├── On-Screen Text: "[exact text]" — [Font style], [Color], [Position]
├── Text Animation: [Pop-in / Typewriter / Slide-from-left / Slide-from-right / Fade-in]
├── Props: [List of physical objects in frame]
├── Background: [Description]
├── Graphic Overlays: [Arrows / Circles / Highlights / Split-screen]
└── Color Palette: [Warm / Cool / Neutral / High contrast / Desaturated]

AUDIO DIRECTION:
├── Voice: [On-camera / Voiceover / Mixed]
├── Background Music: [Genre], [Energy level 1-10], [Volume %], [Start time]
├── Sound Effects: [List of SFX with timing]
├── Music Change: [At Xs, shift to [new energy]]
└── Audio Transition: [Hard cut / Crossfade / Beat match]

EDITING MARKERS:
├── Cut Point: At [X.X]s, [Hard cut / Match cut / Jump cut]
├── Transition to Next: [Hard cut / Zoom / Slide / Spin / Wipe]
├── Caption Style: [Bold white / Yellow highlight / Black box / Minimal]
├── Caption Animation: [Word-by-word / Line-by-line / Pop-in]
└── Speed Ramp: [Normal / 0.5x slow-mo / 2x fast-mo at [X]s for [Y]s]
```

---

## 3.2 COMPLETE EXAMPLE: Scene Breakdown

Below is a REAL example for a skincare video using the "Shocking Fact" nugget:

---

### SCENE 1: THE HOOK (0.0s - 3.0s)
Duration: 3.0 seconds

DIALOGUE:
"I tested 47 skincare products so you don't have to."
Word Count: 11
Emphasis: "tested", "47", "don't"
Pauses: After "products" (0.5s)
Forbidden: "revolutionary", "game-changing", "amazing"

ACTOR DIRECTION:
├── Expression: Confident, slight smile
├── Eye Contact: Direct to camera
├── Body Language: Open palms, slight lean forward
├── Energy Level: 9/10
├── Speaking Pace: Fast
└── Tone: Conversational-urgent

CAMERA DIRECTION:
├── Shot Type: Close-up (face fills 60% of frame)
├── Camera Angle: Slightly low angle (builds authority)
├── Movement: Handheld (subtle, energetic)
├── Lens Feel: Normal
└── Framing: Center, head at top third

VISUAL ELEMENTS:
├── On-Screen Text: "47 PRODUCTS" — Bold, neon yellow, bottom center
├── Text Animation: Pop-in at 0.3s
├── Props: None (face only)
├── Background: Clean, bright, minimal
├── Graphic Overlays: None
└── Color Palette: Warm, high contrast

AUDIO DIRECTION:
├── Voice: On-camera
├── Background Music: None (voice only for hook)
├── Sound Effects: None
├── Music Change: Music fades in at 2.8s
└── Audio Transition: Hard cut at 3.0s

EDITING MARKERS:
├── Cut Point: At 2.8s (beat drop when music enters)
├── Transition to Next: Hard cut
├── Caption Style: Bold white with black outline
├── Caption Animation: Word-by-word (synced to speech)
└── Speed Ramp: Normal

---

### SCENE 2: AUTHORITY GAP (3.0s - 8.0s)
Duration: 5.0 seconds

DIALOGUE:
"And I found that 70% of vitamin C serums go bad before you finish them."
Word Count: 16
Emphasis: "70%", "go bad", "before"
Pauses: After "found that" (0.3s), After "serums" (0.4s)
Forbidden: "oxidize" (too technical), "degrade" (too clinical)

ACTOR DIRECTION:
├── Expression: Serious, concerned
├── Eye Contact: Direct to camera, then glances off (showing thought)
├── Body Language: One hand up, palm open ("listen to this" gesture)
├── Energy Level: 7/10
├── Speaking Pace: Normal (slower on "70%" for emphasis)
└── Tone: Authoritative-concerned

CAMERA DIRECTION:
├── Shot Type: Medium (waist up)
├── Camera Angle: Eye level
├── Movement: Static
├── Lens Feel: Normal
└── Framing: Slightly off-center left (room for graphic on right)

VISUAL ELEMENTS:
├── On-Screen Text: "70% GO BAD" — Bold, red, right side of frame
├── Text Animation: Slide-from-left at 4.0s
├── Props: One vitamin C serum bottle (held in right hand)
├── Background: Clean, bright
├── Graphic Overlays: Red warning icon next to "70%"
└── Color Palette: Neutral with red accent

AUDIO DIRECTION:
├── Voice: On-camera
├── Background Music: Low electronic beat (20% volume)
├── Sound Effects: Subtle "alert" sound when "70%" text appears
├── Music Change: None
└── Audio Transition: Crossfade to next scene

EDITING MARKERS:
├── Cut Point: At 7.8s
├── Transition to Next: Zoom transition (zooms into product bottle)
├── Caption Style: Bold white
├── Caption Animation: Line-by-line
└── Speed Ramp: 0.5x slow-mo on the "70%" text pop-in

---

### SCENE 3: THE SOLUTION (8.0s - 15.0s)
Duration: 7.0 seconds

DIALOGUE:
"But here's the hack. Store it in the fridge. It lasts twice as long."
Word Count: 15
Emphasis: "hack", "fridge", "twice"
Pauses: After "hack" (0.5s), After "fridge" (0.6s — show action)
Forbidden: "however" (too formal), "refrigerator" (too long — say "fridge")

ACTOR DIRECTION:
├── Expression: Excited, conspiratorial (leaning in)
├── Eye Contact: Direct to camera, intense
├── Body Language: Leaning in, hand cupped near mouth ("secret" gesture), then points to fridge
├── Energy Level: 8/10
├── Speaking Pace: Fast on "hack", Slow on "fridge" (demonstrating action)
└── Tone: Whisper-excited ("I'm telling you a secret")

CAMERA DIRECTION:
├── Shot Type: Medium (shows upper body + arm movement)
├── Camera Angle: Eye level, slight push in
├── Movement: Push in 15% on "fridge" to build intimacy
├── Lens Feel: Normal
└── Framing: Center

VISUAL ELEMENTS:
├── On-Screen Text: "STORE IN FRIDGE" — Bold, green, top center
├── Text Animation: Pop-in at 10.0s
├── Props: Vitamin C bottle, open fridge (or fridge graphic)
├── Background: Kitchen setting (or kitchen backdrop)
├── Graphic Overlays: Green checkmark appears next to text
└── Color Palette: Warm with green accent (positive action)

AUDIO DIRECTION:
├── Voice: On-camera
├── Background Music: Builds energy (35% volume, rising)
├── Sound Effects: "Ding" on green checkmark, "whoosh" on push-in
├── Music Change: Beat drops at 14.5s
└── Audio Transition: Hard cut on beat drop

EDITING MARKERS:
├── Cut Point: At 14.8s (on beat drop)
├── Transition to Next: Hard cut with zoom
├── Caption Style: Bold white with green highlight on "FRIDGE"
├── Caption Animation: Word-by-word
└── Speed Ramp: 0.5x slow-mo on fridge door opening

---

### SCENE 4: THE PROOF (15.0s - 25.0s)
Duration: 10.0 seconds

DIALOGUE:
"I did this for 30 days. My $60 serum lasted 60 days instead of 30. That's $30 saved."
Word Count: 20
Emphasis: "30 days", "$60", "60 days", "$30 saved"
Pauses: After "days" (0.4s), After "30" (0.5s), After "saved" (0.3s)
Forbidden: None

ACTOR DIRECTION:
├── Expression: Proud, satisfied
├── Eye Contact: Direct, then looks down at product (showing it)
├── Body Language: Holds up bottle, then shows calendar or phone timer
├── Energy Level: 7/10
├── Speaking Pace: Normal, clear
└── Tone: Authoritative-proof

CAMERA DIRECTION:
├── Shot Type: Medium transitioning to Close-up of product
├── Camera Angle: Eye level
├── Movement: Pan down to product at 17s
├── Lens Feel: Normal to Telephoto on product
└── Framing: Center, then rule of thirds for product shot

VISUAL ELEMENTS:
├── On-Screen Text: "$60 → 60 DAYS" — Bold, green, center
├── Text Animation: Count-up animation for numbers
├── Props: Serum bottle, phone showing 30-day timer, calendar
├── Background: Clean desk/surface
├── Graphic Overlays: Split-screen: Left (old: 30 days), Right (new: 60 days)
└── Color Palette: Green-positive, high contrast

AUDIO DIRECTION:
├── Voice: On-camera
├── Background Music: Confident, steady beat (40% volume)
├── Sound Effects: "Cash register" sound on "$30 saved"
├── Music Change: None
└── Audio Transition: Fade down music at 24s

EDITING MARKERS:
├── Cut Point: At 24.5s
├── Transition to Next: Fade to actor face
├── Caption Style: Bold white, numbers in green
├── Caption Animation: Pop-in synced to speech
└── Speed Ramp: Normal

---

### SCENE 5: CTA (25.0s - 30.0s)
Duration: 5.0 seconds

DIALOGUE:
"Save this before your serum goes bad."
Word Count: 8
Emphasis: "Save", "before", "goes bad"
Pauses: After "this" (0.3s)
Forbidden: "Follow for more tips" (too generic)

ACTOR DIRECTION:
├── Expression: Urgent but friendly
├── Eye Contact: Direct to camera
├── Body Language: Pointing down (toward save button area)
├── Energy Level: 8/10
├── Speaking Pace: Normal-urgent
└── Tone: Helpful-urgent

CAMERA DIRECTION:
├── Shot Type: Close-up
├── Camera Angle: Eye level
├── Movement: Static
├── Lens Feel: Normal
└── Framing: Center

VISUAL ELEMENTS:
├── On-Screen Text: "SAVE THIS" — Bold, pulsing, center
├── Text Animation: Pulse animation (grows and shrinks)
├── Props: None
├── Background: Same as Scene 1 (bookend effect)
├── Graphic Overlays: Arrow pointing to save icon area
└── Color Palette: Warm, urgent red-orange accent

AUDIO DIRECTION:
├── Voice: On-camera
├── Background Music: Fades out from 20% to 0% over 3s
├── Sound Effects: None
├── Music Change: Fade out
└── Audio Transition: Fade out

EDITING MARKERS:
├── Cut Point: End of video
├── Transition: None (video ends)
├── Caption Style: Bold, pulsing
├── Caption Animation: Pulse
└── Speed Ramp: Normal

---

## 3.3 CAMERA DIRECTION QUICK-REFERENCE MATRIX

### Shot Type Guide
| Shot Type | When to Use | Visual Effect |
|---|---|---|
| Extreme Close-up | Emotional moments, product detail, reaction | Intimate, intense |
| Close-up | Hooks, direct address, key statements | Personal, engaging |
| Medium | Demonstrations, body language, actions | Balanced, informative |
| Wide | Environment, process shots, multiple elements | Contextual, expansive |
| Establishing | Opening/transition, setting the scene | Orienting, cinematic |

### Camera Angle Guide
| Angle | When to Use | Psychological Effect |
|---|---|---|
| Eye level | Conversational, relatable content | Equal, trustworthy |
| Low angle | Authority, expertise, power | Dominant, confident |
| High angle | Vulnerability, humility, teaching | Approachable, helpful |
| Dutch tilt | Disorientation, surprise, trend | Edgy, attention-grabbing |
| Overhead | Process, unboxing, tutorials | Clear, demonstrative |

### Movement Guide
| Movement | When to Use | Energy Level |
|---|---|---|
| Static | Explanations, authority moments | Low (stable) |
| Handheld | Hooks, energetic moments, behind-scenes | High (raw, authentic) |
| Push in | Reveals, secrets, emotional beats | Rising (builds tension) |
| Pull out | Context reveals, "the bigger picture" | Expanding (releases) |
| Pan | Environment, process, transitions | Medium (flowing) |

---

## 3.4 ACTOR DIRECTION QUICK-REFERENCE MATRIX

### Expression Guide
| Expression | Use When | Platform Best For |
|---|---|---|
| Confident + Smile | Hooks, authority statements | All |
| Serious / Concerned | Problem statements, pain points | All |
| Shocked / Surprised | Shocking facts, reveals | TikTok, Instagram |
| Skeptical | Myth-busting, comparisons | All |
| Excited | Hacks, results, CTA | All |
| Empathetic | Storytelling, struggles | Instagram, Facebook |
| Whisper/Secret | Hacks, insider tips | All |
| Confused (then relieved) | Problem → Solution arc | TikTok, Instagram |

### Energy Level Guide
| Level | Use For | Scene Type |
|---|---|---|
| 10/10 | Opening hook first 0.5s | Hook only |
| 8-9/10 | Hooks, CTAs, exciting reveals | Hook, CTA, Results |
| 6-7/10 | Value delivery, explanations | Steps, Proof, Education |
| 4-5/10 | Storytelling pain, vulnerable moments | Story, Context |
| 2-3/10 | Dramatic pauses, silent reactions | Reaction shots |

### Speaking Pace Guide
| Pace | Use When | Effect |
|---|---|---|
| Fast (0.6s/word) | Hooks, urgent statements, hype | Energy, urgency |
| Normal (0.8s/word) | Value delivery, explanations | Clear, digestible |
| Slow (1.2s/word) | Key points, numbers, emphasis | Authority, importance |
| Paused | After key stats, before reveals | Drama, anticipation |

---

## 3.5 DIALOGUE ENGINEERING RULES

### For Every Line of Dialogue:

| Check | Rule | Example |
|---|---|---|
| **Word Count** | Max 15 words per line of dialogue | "Store it in the fridge" (6 words) ✅ |
| **Emphasis** | Mark 1-2 words for vocal stress | "Store it in the **fridge**" |
| **Pauses** | Indicate breathing points | After "hack" (0.5s) |
| **Forbidden Words** | Flag words that sound AI/salesy | No "revolutionary," "unlock," "discover" |
| **Syllable Count** | Prefer short, punchy words | "Fridge" (1) > "Refrigerator" (5) |
| **Contraction Rule** | Use contractions (conversational) | "Don't" > "Do not", "It's" > "It is" |
| **Question Rule** | Max 1 question per video | Questions in hooks only |
| **You/Your Count** | Min 2 "you/your" per 10 words | Makes it about the viewer |

---

## 3.6 GLOBAL CAPTION SPECIFICATIONS

| Property | Specification | Why |
|---|---|---|
| Max words per line | 5-7 | Readable in <1 second |
| Max lines on screen | 2 | Doesn't block visuals |
| Font style | Bold, sans-serif | Mobile-readable |
| Text color | White with black outline | Visible on any background |
| Background | No box (outline only) | Doesn't block content |
| Animation style | Pop-in per word or per line | Synced to speech |
| Position | Bottom third, centered | Safe zone for all platforms |
| Duration | Appear 0.2s before audio, disappear 0.3s after | Readable, not lingering |

---

## 3.7 EDITING GLOBAL RULES

| Rule | Specification |
|---|---|
| Max cut interval | 2 seconds (ideal: 0.8-1.5s) |
| Jump cuts | Allowed and encouraged for energy |
| Transitions | Hard cuts preferred. Fancy transitions only for scene changes. |
| Text overlays | Must appear within 3 seconds of video start |
| B-roll coverage | Every statement should have matching visual (show, don't just tell) |
| End card | Last frame should freeze on CTA text for 1+ seconds |
| Audio sync | Captions must be frame-accurate to spoken words |
| Platform safe zones | Text stays within central 80% of frame |

---

---

# PHASE 4: VALIDATION (Human Approval Gate)

## 4.1 10-POINT PRE-PRODUCTION CHECKLIST

| # | Check | Pass Criteria | Fail Action |
|---|---|---|---|
| 1 | **Hook stops the scroll** | Would a stranger stop scrolling in 0.5s? | Rewrite hook |
| 2 | **Value arrives fast** | Value appears within first 3-5 seconds | Restructure opening |
| 3 | **Dialogue sounds human** | Read aloud — does it sound natural, not AI? | Rewrite dialogue |
| 4 | **10-year-old test** | Could a 10-year-old understand the main point? | Simplify language |
| 5 | **Camera directions are clear** | Can a cameraman read this and know exactly what to do? | Add camera details |
| 6 | **Actor directions are specific** | Does the actor know their expression, pace, energy for each scene? | Add actor notes |
| 7 | **Cut points are marked** | Does the editor know where every cut happens and why? | Add edit markers |
| 8 | **ONE clear CTA** | Is there exactly one call-to-action, ≤5 words, at the end? | Fix CTA |
| 9 | **Captions engineered for mute** | Would a viewer watching on mute still understand everything? | Add/review captions |
| 10 | **Visual changes every 1-2s** | Is there a visual change (cut, text, graphic, movement) at least every 2 seconds? | Add visual elements |

**Rule: ALL 10 must be YES to proceed to filming.**

---

## 4.2 4-ROLE APPROVAL WORKFLOW

| Role | Reviews | Signs Off |
|---|---|---|
| **Content Lead** | Phase 1 (Input) + Phase 2 (Structure) | Content is on-brand, topic is validated |
| **Production Lead** | Phase 3 (Execution Brief) | Production is executable, resources available |
| **Actor** | Their scenes in Actor Brief | Acknowledges they can perform as directed |
| **Editor** | Full Edit Timeline | Editing plan is clear and achievable |

---

---

# PHASE 5: OUTPUT (Auto-Generated Exports)

## 5.1 AUTO-EXPORT DOCUMENTS

From ONE completed form, the system generates 4 documents:

### Export 1: Actor Brief
| Property | Value |
|---|---|
| **Contains** | Only the scenes the actor appears in |
| **Format** | Scene cards with dialogue + actor direction only |
| **Omits** | Camera settings, editing markers, audio cues |
| **Purpose** | Actor knows exactly what to say, how to say it, and how to perform |

### Export 2: Camera Sheet
| Property | Value |
|---|---|
| **Contains** | Shot list with camera settings per scene |
| **Format** | Table: Scene | Shot Type | Angle | Movement | Lens | Framing |
| **Omits** | Dialogue, actor expressions, editing details |
| **Purpose** | Cameraman knows exactly what equipment and settings for each shot |

### Export 3: Edit Timeline
| Property | Value |
|---|---|
| **Contains** | Full scene breakdown with ALL editing markers |
| **Format** | Timeline view with cut points, transitions, captions, audio cues, speed ramps |
| **Omits** | Nothing — this is the master production document |
| **Purpose** | Editor has a complete editing blueprint |

### Export 4: Clean Script
| Property | Value |
|---|---|
| **Contains** | Dialogue only, scene by scene |
| **Format** | Clean text, no directions |
| **Purpose** | Quick reference for everyone. Also the input for Freepik AI. |

---

# SUMMARY: FIELD COUNT

| Phase | New Fields | Modified Fields | Kept Fields |
|---|---|---|---|
| Phase 1: Input | 14 new | 5 modified | 4 kept |
| Phase 2: Structure | 6 new templates | 3 modified | 4 kept |
| Phase 3: Execution | 7 new sections | 0 | 0 |
| Phase 4: Validation | 2 new | 1 modified | 0 |
| Phase 5: Output | 4 new exports | 0 | 0 |
| **TOTAL** | **33 new** | **9 modified** | **8 kept** |

---

# NEXT STEPS

1. ✅ **CONFIRMED** — You approved this architecture
2. 🔄 **CURRENT STEP** — This specification document (COMPLETE)
3. ⏭️ **NEXT** — Build the actual HTML/Netlify form with all fields
4. ⏭️ **THEN** — Create AI prompt templates for Phase 2 + 3 generation
5. ⏭️ **THEN** — Test with one real video topic
6. ⏭️ **THEN** — Iterate based on filming results
