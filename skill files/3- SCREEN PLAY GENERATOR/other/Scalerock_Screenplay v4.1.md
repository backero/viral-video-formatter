# SKILL: Scalerock Studio Screenplay Engine v4.1
## For Social Media Viral Short-Form Video Production — Studio Single-Actor Setup (1–2 Talent Max)
## Phase 3: Execution Brief (Structure → Scene-by-Scene Production Screenplay)

---

## 1. PURPOSE

Transform approved viral video structures (from Phase 2: Scalerock Neuro-AI Structure Generator) into **Hollywood-grade, studio-ready production screenplays** for short-form social media content. This skill generates complete scene-by-scene direction including **camera, lighting, blocking, staccato dialogue, audio design, visual effects, pattern interrupts, and post-editing specifications** — optimized for controlled studio environments with **1 primary actor** (Authority), expandable to **2 actors** (Authority + Skeptic/Demonstrator) when the concept demands it.

**Target platforms:** Instagram Reels, TikTok, YouTube Shorts, X/Twitter  
**Target length:** 15–60 seconds (strict short-form)  
**Talent count:** 1 actor standard; 2 actors max when structure demands contrast  
**Production environment:** Controlled studio (green screen + practical set hybrid)  
**Viral methodology:** PersonalBrandLaunch (Ava Yuergens) — 3-second tri-modal hook, staccato sentences, compress speed to value, pattern interrupts, cult hopping, broad→narrow→niche, 5th-grade readability  
**Neural foundation:** TRIBE v2 (multisensory integration) and NeuralSet (infrastructure unification) research from Meta FAIR

---

## 2. THE PERSONALBRANDLAUNCH VIRAL LAYER

### 2.1 Core Techniques (MUST IMPLEMENT)

| Technique | Execution Rule | Where Applied |
|-----------|---------------|---------------|
| **3-Second Tri-Modal Hook** | SEE + READ + HEAR must fire in first 3 seconds. Visual carries more weight than verbal. | Every scene 1, Hook Engine §7 |
| **Staccato Sentences** | Dialogue = 1–8 word beats. Hard stops. No conjunctions. Drum-like rhythm. | Dialogue Engine §8 |
| **Compress Speed to Value** | Zero preamble. First 2.5 seconds = value delivery. No "Hey guys." No setup. | Scene Timing §5 |
| **Cult Hopping** | In-group language makes viewer feel insider. "If you're still using 15 tools..." "Neuro-AI people know..." | Dialogue §8.1 |
| **5th-Grade Readability** | All scripts score ≤5th grade on Hemingway. No jargon without instant translation. | Quality Check §12 |
| **Broad → Narrow → Niche** | Hook = broad (anyone curious). Body = narrow (target ICP). CTA = niche (only right people convert). | Structure Blueprints §5 |
| **Pattern Interrupts** | Planned disruption at 0:00–0:01, 0:10–0:14, 0:22–0:26, 0:33–0:38 | Editing Rules §9.2 |
| **2–4 Interrupt Points** | Every video has 2–4 planned "reset" moments (angle change, prop reveal, background swap, sound stinger) | Scene Templates |
| **Voice Pattern Break** | Whisper/dead air at 0:00 → normal volume at 0:01. Or silence → impact word. | Audio Hook §7.3 |
| **Visual > Verbal** | If audio says it, visual MUST show it simultaneously. 70% demonstration, 30% talking max. | Golden Rules §4 |

### 2.2 The 3-2-1 Interrupt Method

**3:** Identify three audience scroll triggers (slow pacing, generic opening, no payoff).  
**2:** Select two complementary interrupt techniques (visual jolt + audio cue, or text + angle swap).  
**1:** Focus on one clear message — the interrupt serves the value, never distracts from it.

### 2.3 Broad → Narrow → Niche Script Architecture

```
HOOK (0–3s):    BROAD — Anyone scrolling stops. "Your brain scan is wrong."
BODY (3–45s):   NARROW — Target ICP gets value. "Meta FAIR built AI. 720 brains. One model."
CTA (45–60s):   NICHE — Only right people convert. "Comment 'BRAIN' if you want the paper."
```

---

## 3. INPUT FORMAT

The skill receives a JSON object produced by the Phase 2 Structure Generator:

```json
{
  "content_type": {
    "selected": "Educational | Authority | Storytelling | Proof",
    "reason": "Why this archetype fits the research claim",
    "frequency": "1-2x/week for research content",
    "cta_match": "Follow/Save | Comment then DM | Link in Bio"
  },
  "format": {
    "selected": "Screen Recording | Split Screen | Talking Head + Overlay | Pure Animation | Multi-Actor Studio",
    "tier": "S | A | B",
    "reason": "Format matched to paper figure density and code availability"
  },
  "structure": {
    "selected": "Structure # — Name",
    "structure_number": 1-15,
    "tier": "S | A | B",
    "timing": {
      "0-1s": "VISUAL HOOK: [Specific motion]",
      "1-3s": "AUDIO HOOK: [First 3 words]",
      "3-8s": "PROOF ANCHOR: [Statistic or figure]",
      "8-15s": "IMPLICATION: [Why viewer cares]",
      "15-25s": "MECHANISM/SOLUTION: [Core method]",
      "25-30s": "DEMONSTRATION: [Code snippet or brain animation]",
      "30-35s": "CTA: [Specific action]"
    }
  },
  "hooks": {
    "visual": { "description": "...", "category_triggers": ["face", "motion", "text_overlay"], "quality_rating": "GREAT" },
    "written": { "text": "Max 8 words", "word_count": 5, "quality_rating": "GREAT" },
    "audio": { "description": "...", "first_3_words": "Quoted", "prosody_profile": { "energy": "HIGH", "emotion": "urgency", "pacing": "variable", "first_word_onset": "0.0s" }, "quality_rating": "GREAT" },
    "multimodal_sync": { "alignment": "CONVERGED", "silent_mode_viability": "STRONG" }
  },
  "cta": { "type": "Link in Bio", "text": "Max 5 words", "word_count": 3 },
  "research_integrity": {
    "claim_fidelity": "...",
    "figure_reference": "Fig X from Paper Y",
    "code_link": "https://github.com/...",
    "institution_anchor": "Meta FAIR / ENS / Foundation Adolphe de Rothschild"
  },
  "topic": {
    "teaches": "What capability the viewer gains",
    "cares": "Why this matters to a non-researcher",
    "proof": "Trust anchor"
  },
  "value": {
    "takeaway": "Concrete viewer outcome after watching",
    "style": "Demonstration | Explanation | Reaction | Story",
    "time_to_value": "0-3s | 3-8s | 8-15s"
  },
  "platform": "Instagram | TikTok | YouTube Shorts | X/Twitter",
  "estimated_length": "15-30s | 30-60s",
  "cast_requirements": {
    "actor_count": 1,
    "actor_roles": ["Primary Presenter"],
    "wardrobe_notes": "Lab coat / Casual tech / Business casual",
    "set_type": "Practical desk + monitor | Green screen + brain projection | Split stage"
  }
}
```

---

## 4. GOLDEN RULES (ABSOLUTE — ZERO EXCEPTIONS)

### Rule 1: If It Can Be Acted, It Must NOT Be Spoken
Every fact must be DEMONSTRATED through action, prop, or screen — never just narrated.
- **BAD:** Actor says *"This model uses 1 billion parameters"* while standing still.
- **GOOD:** Actor holds up card with "1B" in massive font. Stares at it. Points. THEN says *"One billion."*

### Rule 2: No Talking Head >2 Seconds Without Visual Change
After 2 seconds of talking, something MUST change:
- Cut to different angle
- Text appears on screen
- Prop enters frame
- Actor does physical action
- Cut to B-roll/screen recording
- Lighting color shift

### Rule 3: Silent Moments Are Mandatory
Mark these scenes with NO dialogue:
- Reaction shots (0.5–1.0s)
- Product/prop reveals (1.0–2.0s)
- Before/after cuts (1.0s)
- Text-only moments (1.0–2.0s)
- Number/statistic burn-ins (1.5s)

### Rule 4: Staccato Beats — No Flowing Prose
Dialogue is delivered in 1–8 word bursts. Hard stops. No "and," "but," "so" between beats.  
**BAD:** *"And what I found was that the model actually predicts brain activity better than the scanner itself."*  
**GOOD:** *"The model predicts. Better than the scanner. R equals point four zero. No retraining."*

### Rule 5: Action-Integrated Dialogue
Every beat of dialogue must include WHAT THE ACTOR IS DOING while speaking:
```
(Actor: Slams laptop shut. Spins toward camera. Holds up phone showing graph.)
"Done. In three minutes. Not three weeks."
```

### Rule 6: 70% Demonstration / 30% Talking Maximum
- **Demonstration** = prop handling, screen recording, physical comedy, reaction, code running, brain animation, writing on whiteboard, pointing at graphics.
- **Talking** = direct-to-camera delivery of staccato beats.
- If a scene exceeds 30% talking, add a demonstration beat or cut to B-roll.

### Rule 7: Pattern Interrupt Every 8 Seconds Maximum
No 8-second stretch without a planned interrupt (angle change, text pop, sound stinger, prop reveal, zoom, lighting shift).

### Rule 8: Visual > Verbal Priority
The visual hook must be comprehensible with sound OFF. 85% of social video is consumed muted. Text overlays carry the message; audio adds the layer.

### Rule 9: Cult Hopping Language
Use in-group phrases that make the target viewer feel like an insider:
- *"If you're still preprocessing fMRI manually..."*
- *"Neuro-AI people know the real bottleneck isn't the model."*
- *"BIDS format people — you know what I'm talking about."*
- *"Stop installing fifteen Python packages. Stop."*

### Rule 10: Compress Speed to Value
First 2.5 seconds = the viewer must understand the value proposition. No preamble. No "Let me tell you about..." No "So I was reading this paper..." Start with the punch.

---

## 5. THE 15 VIRAL STRUCTURES — COMPLETE PRODUCTION BLUEPRINTS

Each structure includes: (a) Scene sequence, (b) Staccato dialogue beats, (c) Pattern interrupt schedule, (d) Camera/lighting template, (e) Single-actor blocking (with 2-actor variant notes).

---

### S-TIER: Core Engines (60–70% usage)

#### STRUCTURE 1: Comparison (A vs B) — Decision Family
**Scene Blueprint:** Micro bridge → Option A behavior → Consequence A → Option B behavior → Consequence B → Timeframe/Test → Explanation → Reinforcement → CTA  
**Scene Count:** 7–8 scenes  
**Neural Hook Family:** Decision — Visual contrast priority  
**Cast:** 1 actor (Authority plays both sides via prop/wardrobe change) OR 2 actors (Authority + Skeptic)

**Production Template:**
- **Scene 1 (0.0–3.0s): THE HOOK / MICRO BRIDGE**
  - *Camera:* A-cam MCU, slight low angle. Handheld micro-jolt at 0.0s (pattern interrupt).
  - *Lighting:* Setup A (Standard 3-Point), key 5600K. Background RGB tube blue.
  - *Blocking:* Actor 1 C, FOC AUD. Holds two colored cards (Red = A, Blue = B). Slams them on desk at 0.5s.
  - *Staccato:* "A versus B. (pause) One wins. (pause) One dies."
  - *Visual:* Text "A vs B" burns in at 0.3s. 72pt, centered, neon yellow.
  - *Audio:* Immediate onset (0.0s). Energy: HIGH. Emotion: urgency. Music: Electronic beat, 120 BPM, enters at 2.8s.
  - *Interrupt:* Visual jolt (card slam) + text pop + beat drop at 2.8s.

- **Scene 2 (3.0–8.0s): OPTION A BEHAVIOR**
  - *Camera:* B-cam CU on hands/prop. Cut to A-cam MCU at 5.0s.
  - *Lighting:* Cooler key (6000K). Signal "old/inefficient."
  - *Blocking:* Actor 1 SR, BUS with prop A. Frustrated body language. Looking down.
  - *Staccato:* "Method A. (pause) Fifteen tools. (pause) Manual alignment. (pause) Weeks of pain."
  - *Visual:* Step counter "OPTION A" — red, top left.

- **Scene 3 (8.0–12.0s): CONSEQUENCE A**
  - *Camera:* A-cam MCU. Quick zoom in at 10.0s.
  - *Lighting:* Under-key by 1 stop. Shadows deepen.
  - *Staccato:* "Result? (pause) Three weeks. (pause) Wasted."
  - *Visual:* Text "3 WEEKS WASTED" — red, bottom third. Silent 1.0s after text.
  - *Interrupt:* Zoom in + text burn + sound stinger (bass drop) at 10.0s.

- **Scene 4 (12.0–18.0s): OPTION B BEHAVIOR**
  - *Camera:* A-cam MCU. B-cam ECU for hand detail at 14.0s.
  - *Lighting:* Warm shift to Setup C (Hero, 4000K). Rim light intensifies.
  - *Blocking:* Actor 1 C, BUS with prop B. Confident, open gestures. Direct eye contact.
  - *Staccato:* "Method B. (pause) One line. (pause) Python. (pause) NeuralSet."
  - *Visual:* Step counter "OPTION B" — green, top left.
  - *Interrupt:* Lighting color shift (blue→gold) at 12.0s + prop swap.

- **Scene 5 (18.0–23.0s): CONSEQUENCE B**
  - *Camera:* A-cam MCU. Dolly in 6 inches at 20.0s.
  - *Staccato:* "Result? (pause) Three minutes. (pause) Done."
  - *Visual:* Text "3 MINUTES" — green, bottom third. Checkmark graphic.

- **Scene 6 (23.0–28.0s): TIMEFRAME / TEST**
  - *Camera:* Split screen — left prop A (desaturated), right prop B (saturated). Actor 1 in both via composite OR cut between two setups.
  - *Visual:* Timer graphic counting down from 3:00 → 0:03.
  - *Staccato:* "Same data. (pause) Same brain. (pause) Different world."

- **Scene 7 (28.0–33.0s): EXPLANATION**
  - *Camera:* A-cam MCU. B-cam ECU for facial micro-expressions.
  - *Staccato:* "The reason? (pause) Structure-data decoupling. (pause) Lazy loading. (pause) One framework."
  - *Visual:* NeuralSet logo appears. Code snippet overlay.

- **Scene 8 (33.0–35.0s): REINFORCEMENT + CTA**
  - *Camera:* A-cam CU. Freeze on CTA text card.
  - *Staccato:* "Stop the chaos. (pause) Start NeuralSet. (pause) Link in bio."
  - *Visual:* CTA text burns in. Actor 1 points to text at 34.0s.
  - *Interrupt:* Final text pop + music fade out.

---

#### STRUCTURE 2: Step-by-Step — Education Family
**Scene Blueprint:** Promise fix → Step 1 + Reason → Step 2 + Reason → Step 3 + Reason → Reinforcement → CTA  
**Scene Count:** 5–6 scenes  
**Neural Hook Family:** Education — Outcome-first priming  
**Cast:** 1 actor (Authority)

**Production Template:**
- **Scene 1 (0.0–3.0s): PROMISE FIX**
  - *Camera:* A-cam MCU, eye-level. Handheld micro-jolt at 0.0s.
  - *Lighting:* Setup A, bright even, beauty dish key.
  - *Blocking:* Actor 1 C, FOC AUD. Holds up fingers: 3, 2, 1.
  - *Staccato:* "Three steps. (pause) One minute. (pause) Fixed."
  - *Visual:* Text "3 STEPS. 1 MINUTE." — 6 words max. Pop-in at 0.3s.
  - *Audio:* Instructional tone, urgency. Music: Lo-fi electronic, 100 BPM, enters at 2.8s.
  - *Interrupt:* Finger countdown + text pop + beat drop.

- **Scene 2 (3.0–10.0s): STEP 1 + REASON**
  - *Camera:* Cut to B-cam ECU of hands/prop at 3.5s. Cut back to A-cam MCU at 6.0s.
  - *Visual:* "STEP 1" graphic — blue, top left. Screen recording overlay if digital.
  - *Blocking:* Actor 1 C, BUS with laptop/phone/prop. Physical demonstration.
  - *Staccato:* "Step one. (pause) Import your study. (pause) One line. (pause) Study.build."
  - *Interrupt:* Angle change at 3.5s + text pop at 4.0s.

- **Scene 3 (10.0–17.0s): STEP 2 + REASON**
  - *Camera:* A-cam MCU. Slider movement 12.0–14.0s.
  - *Visual:* "STEP 2" graphic — green. Background gel shifts blue→green at 10.0s.
  - *Staccato:* "Step two. (pause) Pick your extractor. (pause) fMRI. MEG. EEG. (pause) One switch."
  - *Interrupt:* Slider move + color shift + text pop.

- **Scene 4 (17.0–24.0s): STEP 3 + REASON**
  - *Camera:* B-cam ECU for detail. Cut to A-cam MCU at 20.0s.
  - *Visual:* "STEP 3" graphic — red. Result visible on screen/prop.
  - *Staccato:* "Step three. (pause) Segment. (pause) Apply. (pause) PyTorch ready."

- **Scene 5 (24.0–30.0s): REINFORCEMENT**
  - *Camera:* A-cam MCU. Actor steps DS toward camera (intimacy increase).
  - *Visual:* Before/after split screen or result number.
  - *Staccato:* "From chaos. (pause) To clarity. (pause) In sixty seconds."

- **Scene 6 (30.0–35.0s): CTA**
  - *Camera:* A-cam CU. Freeze frame on CTA.
  - *Staccato:* "Save this. (pause) Follow for more. (pause) Link in bio."

---

#### STRUCTURE 3: Story Framework — Trust Family
**Scene Blueprint:** Setup → Conflict → Emotional low → Decision → Action → Result → Lesson → CTA  
**Scene Count:** 7–8 scenes  
**Neural Hook Family:** Trust — Emotional state priority  
**Cast:** 1 actor (Authority narrates own journey) OR 2 actors (Authority + past-self/Skeptic)

**Production Template:**
- **Scene 1 (0.0–4.0s): SETUP**
  - *Camera:* A-cam MCU, warm key (Setup C, 4000K). Close-up face showing emotion.
  - *Lighting:* Soft key (large softbox) + subtle rim. Catchlight in both eyes mandatory.
  - *Staccato:* "Six months. (pause) Fifteen tools. (pause) Zero progress."
  - *Audio:* Narrative tone. Emotional prosody. Music: Cinematic ambient, slow build.
  - *Interrupt:* Face close-up + emotional music entrance at 0.5s.

- **Scene 2 (4.0–9.0s): CONFLICT**
  - *Camera:* Cut to B-cam CU. Slight Dutch angle (5°) for tension.
  - *Lighting:* Contrast increases. Fill reduced 1 stop.
  - *Blocking:* Actor 1 SL, body closed (arms crossed, turning away).
  - *Staccato:* "The data was messy. (pause) The pipeline broke. (pause) Every. Single. Day."
  - *Interrupt:* Dutch angle + underexposure + body language shift.

- **Scene 3 (9.0–14.0s): EMOTIONAL LOW**
  - *Camera:* ECU on eyes. Hold for 2.0s. **SILENT MOMENT.**
  - *Lighting:* Underexposed 0.5 stop. Background dims.
  - *Audio:* Music bed minor key. No voice.
  - *Visual:* Text "BROKEN" — fades in, holds 1.5s, fades out.
  - *Interrupt:* Complete silence + text fade = maximum pattern break.

- **Scene 4 (14.0–18.0s): DECISION**
  - *Camera:* A-cam MCU. Step forward into frame (dolly in).
  - *Lighting:* Key brightens to full. Rim intensifies.
  - *Staccato:* "Then I found it. (pause) NeuralSet. (pause) One framework. (pause) Everything changed."
  - *Interrupt:* Dolly in + light brightening + music key change (minor→major).

- **Scene 5 (18.0–24.0s): ACTION**
  - *Camera:* Wide shot showing full set. Actor interacts with prop/solution.
  - *Blocking:* Open body language. Cross to C. Confident movements.
  - *Staccato:* "Import. (pause) Extract. (pause) Segment. (pause) Done."
  - *Visual:* Screen recording of actual NeuralSet code running.

- **Scene 6 (24.0–28.0s): RESULT**
  - *Camera:* A-cam MCU. Actor smiles/reacts genuinely.
  - *Lighting:* Full beauty setup. Background practicals warm up.
  - *Staccato:* "Three minutes. (pause) Not three weeks. (pause) Same result. (pause) Better."
  - *Visual:* Result number/text overlay.

- **Scene 7 (28.0–33.0s): LESSON**
  - *Camera:* A-cam MCU.
  - *Staccato:* "The lesson? (pause) Stop building. (pause) Start using. (pause) The tools exist."

- **Scene 8 (33.0–35.0s): CTA**
  - *Camera:* A-cam CU. Direct address.
  - *Staccato:* "Follow. (pause) Save this. (pause) Link in bio."

---

### A-TIER: Stable Variations (20–30% usage)

#### STRUCTURE 4: Smart vs Dumb — Decision Family
**Scene Blueprint:** Contrast → Dumb behavior → Damage → Smart behavior → Benefit → Mechanism → Reinforcement → CTA  
**Scene Count:** 7 scenes  
**Cast:** 1 actor (plays both via prop/wardrobe/lighting change) OR 2 actors

**Production Template:**
- **Scene 1 (0.0–3.0s): CONTRAST**
  - *Camera:* Split screen or rapid cut between "Dumb" setup (messy, flat light) and "Smart" setup (clean, warm light).
  - *Visual:* Text "DUMB vs SMART" — bold, high contrast.
  - *Staccato:* "Dumb way. (pause) Smart way. (pause) Same goal. (pause) Different life."
  - *Interrupt:* Split screen wipe + text pop + beat drop.

- **Scene 2 (3.0–8.0s): DUMB BEHAVIOR**
  - *Camera:* B-cam CU. Low angle (diminishing). Background cluttered.
  - *Lighting:* Flat, overhead fluorescent feel (Setup B, harsh shadows, 6500K).
  - *Blocking:* Actor fumbles with prop. Frustrated. Looking down.
  - *Staccato:* "Install Nilearn. (pause) Install MNE. (pause) Install EEGLAB. (pause) Fifteen times."

- **Scene 3 (8.0–12.0s): DAMAGE**
  - *Camera:* ECU on face. Hold 1.5s silent.
  - *Visual:* Red X graphic. Text "3 HOURS WASTED."
  - *Lighting:* Under-key. Cold 6500K.
  - *Staccato:* "Three hours. (pause) Gone. (pause) Forever."
  - *Interrupt:* Red X slam + silence + cold light.

- **Scene 4 (12.0–18.0s): SMART BEHAVIOR**
  - *Camera:* A-cam MCU. Eye-level, empowering.
  - *Lighting:* Warm Hero (Setup C, 4000K) + strong rim.
  - *Blocking:* Confident, efficient movements. Direct eye contact.
  - *Staccato:* "pip install neuralset. (pause) One line. (pause) All modalities. (pause) Done."
  - *Interrupt:* Light shift (cold→warm) + code typing on screen + music key change.

- **Scene 5 (18.0–23.0s): BENEFIT**
  - *Camera:* A-cam MCU. Dolly in.
  - *Visual:* Green checkmark. Text "DONE IN 30 SECONDS."
  - *Staccato:* "Thirty seconds. (pause) Not three hours. (pause) Same power."

- **Scene 6 (23.0–28.0s): MECHANISM**
  - *Camera:* Cut to screen recording or prop detail (B-cam ECU).
  - *Staccato:* "Structure-data decoupling. (pause) Lazy loading. (pause) Memmap arrays. (pause) No RAM waste."

- **Scene 7 (28.0–35.0s): REINFORCEMENT + CTA**
  - *Camera:* A-cam CU. Side-by-side comparison graphic overlays.
  - *Staccato:* "Be smart. (pause) Not dumb. (pause) Link in bio."

---

#### STRUCTURE 5: Do vs Don't — Decision Family
**Scene Blueprint:** Force choice → Wrong behavior → Damage → Correct behavior → Benefit → Reason → Reinforcement → CTA  
**Scene Count:** 7 scenes  
**Cast:** 1 actor

**Production Template:**
- **Scene 1 (0.0–3.0s): FORCE CHOICE**
  - *Camera:* A-cam MCU. Actor holds up two hands — left (DON'T), right (DO).
  - *Visual:* Text "STOP doing this. START doing this." — 6 words.
  - *Staccato:* "Stop doing this. (pause) Start doing this. (pause) Your brain will thank you."
  - *Audio:* Confrontational tone. Music: Electronic, 130 BPM.
  - *Interrupt:* Hand gesture + text pop + beat drop.

- **Scene 2 (3.0–8.0s): WRONG BEHAVIOR**
  - *Camera:* B-cam CU. Actor demonstrates wrong method with exaggerated clumsiness.
  - *Lighting:* Cool key (6000K). Harsh shadows.
  - *Staccato:* "Manual preprocessing. (pause) One subject. (pause) One week. (pause) Repeat."

- **Scene 3 (8.0–12.0s): DAMAGE**
  - *Camera:* ECU reaction shot. Silent 1.0s.
  - *Visual:* Warning icon. Text "THIS COSTS YOU $$$."
  - *Staccato:* "One week. (pause) Per subject. (pause) Seven hundred twenty subjects. (pause) Do the math."

- **Scene 4 (12.0–18.0s): CORRECT BEHAVIOR**
  - *Camera:* A-cam MCU. Smooth, controlled movements.
  - *Lighting:* Warm, even. Beauty setup.
  - *Staccato:* "NeuralSet. (pause) One pipeline. (pause) All subjects. (pause) Zero repetition."

- **Scene 5 (18.0–23.0s): BENEFIT**
  - *Camera:* A-cam MCU. Actor smiles/relaxes.
  - *Visual:* Success metric text.
  - *Staccato:* "Scale. (pause) Speed. (pause) Provenance. (pause) Perfect."

- **Scene 6 (23.0–28.0s): REASON**
  - *Camera:* Cut to screen detail or graphic animation.
  - *Staccato:* "Built on MNE. (pause) Built on Nilearn. (pause) Not a replacement. (pause) An orchestra."

- **Scene 7 (28.0–35.0s): REINFORCEMENT + CTA**
  - *Camera:* A-cam CU. Direct address.
  - *Staccato:* "Do this. (pause) Not that. (pause) Follow. (pause) Link in bio."

---

#### STRUCTURE 6: Myth Bust — Decision Family
**Scene Blueprint:** State myth → Why believed → Contradiction → Correct method → Mechanism → Reinforcement → CTA  
**Scene Count:** 6 scenes  
**Cast:** 1 actor (plays both believer and busted) OR 2 actors (Skeptic + Authority)

**Production Template:**
- **Scene 1 (0.0–3.0s): STATE MYTH**
  - *Camera:* A-cam MCU. Actor states myth confidently (smug).
  - *Visual:* Text "MYTH: [Statement]" — red, bold. Myth icon (ghost).
  - *Staccato:* "You need a scanner. (pause) To map the brain. (pause) Right?"
  - *Audio:* Skeptical, smug tone. Music: None yet.
  - *Interrupt:* Text pop + myth icon + actor smirk.

- **Scene 2 (3.0–7.0s): WHY BELIEVED**
  - *Camera:* B-cam CU. Actor nods knowingly.
  - *Staccato:* "Everyone thinks this. (pause) Because it's always been true. (pause) Until now."

- **Scene 3 (7.0–12.0s): CONTRADICTION**
  - *Camera:* Cut to A-cam MCU. Actor steps into frame. Record scratch SFX.
  - *Lighting:* Rim light flares. Dramatic pause.
  - *Visual:* Text "ACTUALLY..." — appears at 8.0s.
  - *Staccato:* "Wrong. (pause) Meta FAIR built an AI. (pause) One thousand hours. (pause) Zero scans needed."
  - *Interrupt:* Record scratch + light flare + text pop + music beat drop.

- **Scene 4 (12.0–20.0s): CORRECT METHOD**
  - *Camera:* A-cam MCU. Demonstration with prop/screen.
  - *Blocking:* Actor BUS. Confident, open.
  - *Staccato:* "TRIBE v2. (pause) Video. Audio. Text. (pause) One model. (pause) Predicts everything."

- **Scene 5 (20.0–28.0s): MECHANISM**
  - *Camera:* Cut to detail shots (B-cam ECU). Return to A-cam MCU.
  - *Visual:* Animated diagram or screen recording.
  - *Staccato:* "V-JEPA2. (pause) Wav2Vec. (pause) Llama. (pause) One billion parameters. (pause) Your brain."

- **Scene 6 (28.0–35.0s): REINFORCEMENT + CTA**
  - *Camera:* A-cam CU. Actor nods (social proof to self).
  - *Visual:* "MYTH = BUSTED" stamp graphic.
  - *Staccato:* "Myth busted. (pause) Follow for more. (pause) Link in bio."

---

#### STRUCTURE 7: List Structure — Education Family
**Scene Blueprint:** List setup → Point + reason → Point + reason → Point + reason → Pattern insight → CTA  
**Scene Count:** 5–6 scenes  
**Cast:** 1 actor

**Production Template:**
- **Scene 1 (0.0–3.0s): LIST SETUP**
  - *Camera:* A-cam MCU. Actor holds up fingers counting.
  - *Visual:* Text "3 things that..." — numbered list preview.
  - *Staccato:* "Three things. (pause) That break neuro-AI pipelines. (pause) Every. Single. Time."

- **Scene 2 (3.0–10.0s): POINT 1 + REASON**
  - *Camera:* A-cam MCU. Cut to B-cam ECU for detail at 6.0s.
  - *Visual:* "1." graphic + text. Color-coded (blue).
  - *Staccato:* "One. (pause) Misaligned timelines. (pause) Neural data at one Hertz. (pause) Stimuli at two. (pause) Disaster."

- **Scene 3 (10.0–17.0s): POINT 2 + REASON**
  - *Visual:* "2." graphic (green).
  - *Staccato:* "Two. (pause) Eager loading. (pause) Five hundred gigabytes. (pause) Into RAM. (pause) Crash."

- **Scene 4 (17.0–24.0s): POINT 3 + REASON**
  - *Visual:* "3." graphic (red).
  - *Staccato:* "Three. (pause) Fifteen tools. (pause) Zero integration. (pause) Manual wrangling. (pause) Forever."

- **Scene 5 (24.0–30.0s): PATTERN INSIGHT**
  - *Camera:* A-cam MCU. Actor steps closer.
  - *Visual:* All three points summarized in graphic.
  - *Staccato:* "The pattern? (pause) Fragmentation kills. (pause) Unification wins. (pause) NeuralSet fixes all three."

- **Scene 6 (30.0–35.0s): CTA**
  - *Camera:* A-cam CU.
  - *Staccato:* "Save this list. (pause) Follow for more. (pause) Link in bio."

---

#### STRUCTURE 8: 3-Level Structure — Education Family
**Scene Blueprint:** Introduce levels → Beginner → Limitation → Intermediate → Limitation → Advanced → Insight → CTA  
**Scene Count:** 7 scenes  
**Cast:** 1 actor (wardrobe/prop change per level)

**Production Template:**
- **Scene 1 (0.0–3.0s): INTRODUCE LEVELS**
  - *Visual:* Three-tier pyramid graphic. Text "Beginner → Pro → Expert."
  - *Staccato:* "Three levels. (pause) One pipeline. (pause) Which one are you?"

- **Scene 2 (3.0–8.0s): BEGINNER**
  - *Camera:* A-cam MCU. Actor in casual wear (hoodie).
  - *Visual:* "LEVEL 1" badge. Basic tool/prop.
  - *Staccato:* "Level one. (pause) One subject. (pause) One script. (pause) Manual everything."

- **Scene 3 (8.0–12.0s): LIMITATION 1**
  - *Camera:* ECU on frustration. Silent 1.0s.
  - *Visual:* Red barrier graphic.
  - *Staccato:* "Stuck. (pause) At one. (pause) Forever."

- **Scene 4 (12.0–18.0s): INTERMEDIATE**
  - *Camera:* A-cam MCU. Actor adds blazer (wardrobe change).
  - *Visual:* "LEVEL 2" badge.
  - *Staccato:* "Level two. (pause) Ten subjects. (pause) Some automation. (pause) Still patching."

- **Scene 5 (18.0–22.0s): LIMITATION 2**
  - *Visual:* Yellow warning graphic.
  - *Staccato:* "Better. (pause) Not enough. (pause) Still breaking."

- **Scene 6 (22.0–28.0s): ADVANCED + INSIGHT**
  - *Camera:* A-cam MCU. Actor adds lab coat (wardrobe change).
  - *Visual:* "LEVEL 3" badge + golden glow effect.
  - *Staccato:* "Level three. (pause) Seven hundred twenty subjects. (pause) One framework. (pause) NeuralSet. (pause) The real insight? (pause) Levels one and two don't exist anymore."

- **Scene 7 (28.0–35.0s): CTA**
  - *Camera:* A-cam CU.
  - *Staccato:* "Level up. (pause) Follow. (pause) Link in bio."

---

#### STRUCTURE 9: PAS (Problem-Agitate-Solution) — Education Family
**Scene Blueprint:** Problem → Consequence → Escalation → Solution → Action → Mechanism → Reinforcement → CTA  
**Scene Count:** 7 scenes  
**Cast:** 1 actor

**Production Template:**
- **Scene 1 (0.0–3.0s): PROBLEM**
  - *Camera:* A-cam MCU. Concerned expression.
  - *Audio:* Concerned tone. Music: Tension, minor key.
  - *Staccato:* "Your pipeline is broken. (pause) And you know it."

- **Scene 2 (3.0–7.0s): CONSEQUENCE**
  - *Visual:* Text overlay with negative metric.
  - *Staccato:* "Three weeks. (pause) Per study. (pause) Per subject. (pause) Unsustainable."

- **Scene 3 (7.0–12.0s): ESCALATION**
  - *Camera:* Dutch angle (8°). Music intensifies.
  - *Visual:* "And it's getting worse." Text + warning graphics.
  - *Staccato:* "Datasets growing. (pause) Terabytes incoming. (pause) Your laptop dying. (pause) The gap widening."

- **Scene 4 (12.0–18.0s): SOLUTION**
  - *Camera:* A-cam MCU. Actor relaxes/smiles.
  - *Lighting:* Warm shift (Setup C).
  - *Visual:* Solution name/product appears.
  - *Staccato:* "NeuralSet. (pause) One import. (pause) One line. (pause) Scale to cluster. (pause) Done."

- **Scene 5 (18.0–23.0s): ACTION**
  - *Camera:* B-cam ECU demonstration.
  - *Staccato:* "Study. (pause) Build. (pause) Extract. (pause) Segment. (pause) Apply."

- **Scene 6 (23.0–28.0s): MECHANISM**
  - *Camera:* Screen recording or graphic animation.
  - *Staccato:* "Lazy loading. (pause) Memmap caching. (pause) SLURM dispatch. (pause) One config flag."

- **Scene 7 (28.0–35.0s): REINFORCEMENT + CTA**
  - *Camera:* A-cam CU.
  - *Staccato:* "Fix it now. (pause) Follow. (pause) Link in bio."

---

#### STRUCTURE 10: Outcome → Pain → Solution — Education Family
**Scene Blueprint:** Dream outcome → Obstacles → Solution → Core mechanism → Reinforcement → CTA  
**Scene Count:** 5–6 scenes  
**Cast:** 1 actor

**Production Template:**
- **Scene 1 (0.0–4.0s): DREAM OUTCOME**
  - *Camera:* A-cam MCU. Actor visualizes success (looks up, smiles).
  - *Visual:* Dream outcome text. Gold shimmer effect.
  - *Audio:* Awe-struck tone. Music: Cinematic swell.
  - *Staccato:* "Imagine. (pause) One pipeline. (pause) All modalities. (pause) All scales. (pause) Zero friction."

- **Scene 2 (4.0–10.0s): OBSTACLES**
  - *Camera:* Rapid cuts (3 cuts in 6 seconds). Actor frustrated.
  - *Visual:* Obstacle icons popping up. Red color grade.
  - *Staccato:* "But reality? (pause) Fifteen tools. (pause) Broken timelines. (pause) RAM crashes. (pause) Manual hell."

- **Scene 3 (10.0–16.0s): SOLUTION**
  - *Camera:* A-cam MCU. Actor holds up solution.
  - *Lighting:* Hero rim light.
  - *Staccato:* "NeuralSet. (pause) The bridge. (pause) Between neuroscience. (pause) And AI."

- **Scene 4 (16.0–24.0s): CORE MECHANISM**
  - *Camera:* Detail shots + MCU alternating.
  - *Staccato:* "Events. (pause) Extractors. (pause) Segments. (pause) Tensors. (pause) One flow."

- **Scene 5 (24.0–30.0s): REINFORCEMENT**
  - *Camera:* Before/after split screen.
  - *Staccato:* "From fragmented. (pause) To unified. (pause) In one line."

- **Scene 6 (30.0–35.0s): CTA**
  - *Camera:* A-cam CU.
  - *Staccato:* "Make it real. (pause) Follow. (pause) Link in bio."

---

#### STRUCTURE 11: Before → After — Trust Family
**Scene Blueprint:** Transformation → Before state → Struggle → Turning point → Action → Result → Lesson → CTA  
**Scene Count:** 7–8 scenes  
**Cast:** 1 actor (before/after via lighting/prop change)

**Production Template:**
- **Scene 1 (0.0–3.0s): TRANSFORMATION**
  - *Camera:* Split screen — left "Before" (desaturated, flat light), right "After" (saturated, warm light).
  - *Visual:* "BEFORE → AFTER" text.
  - *Staccato:* "Before. (pause) After. (pause) Same person. (pause) Different world."

- **Scene 2 (3.0–8.0s): BEFORE STATE**
  - *Camera:* B-cam CU. Flat lighting, 5600K.
  - *Blocking:* Actor slumped, looking down.
  - *Staccato:* "Before NeuralSet. (pause) Fifteen tabs open. (pause) Three crashes today. (pause) Giving up."

- **Scene 3 (8.0–13.0s): STRUGGLE**
  - *Camera:* ECU on eyes. Silent 1.5s.
  - *Lighting:* Underexposed.
  - *Staccato:* "Broken. (pause) Alone. (pause) Stuck."

- **Scene 4 (13.0–17.0s): TURNING POINT**
  - *Camera:* A-cam MCU. Steps into frame.
  - *Lighting:* Key brightens. Rim appears.
  - *Staccato:* "Then I found it. (pause) One framework. (pause) Everything changed."

- **Scene 5 (17.0–23.0s): ACTION**
  - *Camera:* Wide shot. Actor rises, moves to desk.
  - *Blocking:* Open body language. Types code. Screen shows result.
  - *Staccato:* "Import. (pause) Build. (pause) Run. (pause) Watch."

- **Scene 6 (23.0–28.0s): RESULT**
  - *Camera:* A-cam MCU. Actor confident, smiling.
  - *Lighting:* Full beauty setup. 4000K warm.
  - *Staccato:* "Three minutes. (pause) Seven hundred twenty subjects. (pause) One pipeline. (pause) Perfect."

- **Scene 7 (28.0–33.0s): LESSON**
  - *Camera:* MCU.
  - *Staccato:* "The lesson? (pause) Stop suffering. (pause) Start building. (pause) The tools exist."

- **Scene 8 (33.0–35.0s): CTA**
  - *Camera:* A-cam CU.
  - *Staccato:* "Transform. (pause) Follow. (pause) Link in bio."

---

### B-TIER: Proof Heavy (10–20% usage)

#### STRUCTURE 12: Time-Based Experiment — Proof Family
**Scene Blueprint:** Baseline → Rule followed → Duration → Observation → Results → Insight → Reinforcement → CTA  
**Scene Count:** 7 scenes  
**Cast:** 1 actor

**Production Template:**
- **Scene 1 (0.0–3.0s): BASELINE**
  - *Camera:* A-cam MCU. Actor presents baseline number.
  - *Visual:* "Day 0: [Metric]" text.
  - *Staccato:* "Day zero. (pause) Baseline set. (pause) R equals zero point one."

- **Scene 2 (3.0–7.0s): RULE FOLLOWED**
  - *Camera:* B-cam ECU of hands doing the action.
  - *Staccato:* "Add data. (pause) Add subjects. (pause) Add hours."

- **Scene 3 (7.0–12.0s): DURATION**
  - *Camera:* Time-lapse or graphic timer.
  - *Visual:* Calendar pages flipping. "Day 1... Day 7... Day 30..."
  - *Staccato:* "Day one. (pause) Day seven. (pause) Day thirty. (pause) No plateau."

- **Scene 4 (12.0–17.0s): OBSERVATION**
  - *Camera:* A-cam MCU. Actor reacts to data.
  - *Staccato:* "Log-linear growth. (pause) Every hour counts. (pause) Every subject adds."

- **Scene 5 (17.0–23.0s): RESULTS**
  - *Camera:* Screen recording or chart animation.
  - *Visual:* Graph line climbing. "+X%" text.
  - *Staccato:* "Day thirty. (pause) R equals zero point four. (pause) Four times better. (pause) No ceiling."

- **Scene 6 (23.0–28.0s): INSIGHT**
  - *Camera:* A-cam MCU.
  - *Staccato:* "The insight? (pause) More data. (pause) Better predictions. (pause) No limit found."

- **Scene 7 (28.0–35.0s): REINFORCEMENT + CTA**
  - *Camera:* A-cam CU.
  - *Staccato:* "Scale wins. (pause) Follow. (pause) Link in bio."

---

#### STRUCTURE 13: Fake Case Study — Proof Family
**Scene Blueprint:** Scenario → Step 1 + reason → Step 2 + reason → Step 3 → Strategic stack → CTA  
**Scene Count:** 5–6 scenes  
**Cast:** 1 actor

**Production Template:**
- **Scene 1 (0.0–4.0s): SCENARIO**
  - *Camera:* A-cam MCU. Actor sets up fictional but realistic scenario.
  - *Visual:* "CASE STUDY: [Name]" text. Briefcase icon.
  - *Staccato:* "Meet Dr. Chen. (pause) Two hundred subjects. (pause) One deadline. (pause) Three weeks."

- **Scene 2 (4.0–10.0s): STEP 1 + REASON**
  - *Camera:* A-cam MCU. Actor as "consultant."
  - *Staccato:* "Step one. (pause) Import all data. (pause) One line. (pause) NeuralSet handles the rest."

- **Scene 3 (10.0–16.0s): STEP 2 + REASON**
  - *Staccato:* "Step two. (pause) Configure extractors. (pause) fMRI. (pause) Video. (pause) Text. (pause) All aligned."

- **Scene 4 (16.0–22.0s): STEP 3**
  - *Staccato:* "Step three. (pause) Segment. (pause) Apply. (pause) PyTorch DataLoader. (pause) Ready."

- **Scene 5 (22.0–28.0s): STRATEGIC STACK**
  - *Camera:* Graphic overlay showing all three steps combined.
  - *Visual:* Pyramid or stack graphic.
  - *Staccato:* "Study. (pause) Extractors. (pause) Segments. (pause) One stack. (pause) Infinite scale."

- **Scene 6 (28.0–35.0s): CTA**
  - *Staccato:* "Be Dr. Chen. (pause) Follow. (pause) Link in bio."

---

#### STRUCTURE 14: Double Down — Proof Family
**Scene Blueprint:** Existing winner → One change → Additional insight → Expected result → Reinforcement → CTA  
**Scene Count:** 5 scenes  
**Cast:** 1 actor

**Production Template:**
- **Scene 1 (0.0–4.0s): EXISTING WINNER**
  - *Camera:* A-cam MCU. Actor acknowledges known good result.
  - *Visual:* "We know [X] works." Checkmark.
  - *Staccato:* "We know video works. (pause) For brain prediction. (pause) R equals zero point two. (pause) Good."

- **Scene 2 (4.0–10.0s): ONE CHANGE**
  - *Camera:* A-cam MCU. Actor introduces modification.
  - *Visual:* "But what if we add [Y]?" Question mark graphic.
  - *Staccato:* "But what if. (pause) We add audio. (pause) And text. (pause) Tri-modal. (pause) TRIBE v2."

- **Scene 3 (10.0–16.0s): ADDITIONAL INSIGHT**
  - *Camera:* Cut to screen/prop detail.
  - *Staccato:* "The insight? (pause) TPO junction. (pause) Fifty percent gain. (pause) Where modalities fuse."

- **Scene 4 (16.0–24.0s): EXPECTED RESULT**
  - *Camera:* A-cam MCU. Actor reveals improved metric.
  - *Visual:* Side-by-side: Original vs Modified.
  - *Staccato:* "Result? (pause) R equals zero point four. (pause) Double. (pause) No new scans. (pause) Zero-shot."

- **Scene 5 (24.0–35.0s): REINFORCEMENT + CTA**
  - *Staccato:* "Double down. (pause) On tri-modal. (pause) Follow. (pause) Link in bio."

---

#### STRUCTURE 15: Cost Breakdown — Proof Family
**Scene Blueprint:** Cost truth → Expense 1 → Expense 2 → Expense 3 → Total → Value comparison → Lesson → CTA  
**Scene Count:** 7 scenes  
**Cast:** 1 actor

**Production Template:**
- **Scene 1 (0.0–3.0s): COST TRUTH**
  - *Camera:* A-cam MCU. Actor holds up receipt/bill.
  - *Visual:* "The REAL cost of [X]." Text.
  - *Staccato:* "The real cost. (pause) Of fragmented tools. (pause) You're not counting."

- **Scene 2 (3.0–8.0s): EXPENSE 1**
  - *Visual:* Itemized graphic. "$[Amount]" — red.
  - *Staccato:* "Tool one. (pause) MNE-Python. (pause) Free. (pause) But your time? (pause) Priceless."

- **Scene 3 (8.0–13.0s): EXPENSE 2**
  - *Staccato:* "Tool two. (pause) Nilearn. (pause) Free. (pause) Integration? (pause) Manual. (pause) Hours."

- **Scene 4 (13.0–18.0s): EXPENSE 3**
  - *Staccato:* "Tool three. (pause) Custom scripts. (pause) Debugging. (pause) Maintenance. (pause) Forever."

- **Scene 5 (18.0–23.0s): TOTAL**
  - *Visual:* Calculator animation. "TOTAL: $[Sum]" — bold red.
  - *Staccato:* "Total cost? (pause) Three weeks. (pause) Per study. (pause) Per person. (pause) Unsustainable."

- **Scene 6 (23.0–28.0s): VALUE COMPARISON**
  - *Camera:* Split screen. Left = cost, Right = value gained.
  - *Visual:* "Value: 10x" — green.
  - *Staccato:* "NeuralSet. (pause) One line. (pause) All tools. (pause) Value? (pause) Infinite."

- **Scene 7 (28.0–35.0s): LESSON + CTA**
  - *Staccato:* "Count the real cost. (pause) Then choose. (pause) Follow. (pause) Link in bio."

---

## 6. CINEMATOGRAPHY & LIGHTING BIBLE

### 6.1 Shot Vocabulary

| Shot Code | Name | Frame | Use For | Neural Target |
|-----------|------|-------|---------|---------------|
| ECU | Extreme Close-Up | Eyes/mouth only | Emotional beats, silent reactions, hook shock | FFA (face), amygdala |
| CU | Close-Up | Head + slight shoulders | Authority delivery, CTA, key claims | FFA, VWFA (text overlay) |
| MCU | Medium Close-Up | Chest up | Standard presenter shots, dialogue | FFA, EBA (gestures) |
| MS | Medium Shot | Waist up | Demonstrations, hand actions, props | EBA, LOC (objects) |
| MLS | Medium Long Shot | Knees up | Full body movement, stage blocking | PPA (scene context) |
| WS | Wide Shot | Full body + environment | Set reveals, multi-actor scenes, transformations | PPA, high_contrast |
| OTS | Over-the-Shoulder | Behind one actor, seeing other | Conversations, interviews, two-actor conflict | FFA + PPA |
| POV | Point-of-View | What actor sees | Screen recordings, prop detail, first-person | V1-V4, motion |
| OS | Overshot / Top-Down | Camera directly above | Desk demonstrations, unboxing, code | V1-V4, text_overlay |

### 6.2 Camera Angles & Movement

| Angle | Effect | Best For |
|-------|--------|----------|
| **Eye-level (0°)** | Neutral, trustworthy, equal | Educational content, Authority delivery |
| **Low angle (+10° to +20°)** | Powerful, dominant, heroic | CTA, success reveals, "smart" behavior |
| **High angle (-10° to -20°)** | Vulnerable, diminished, overwhelmed | "Dumb" behavior, struggle, emotional low |
| **Dutch (+5° to +15° tilt)** | Tension, unease, conflict | Myth bust contradiction, escalation, problem |
| **Overhead (90°)** | Objective, analytical, detached | Data visualization, cost breakdown, experiments |

| Movement | Execution | Effect |
|----------|-----------|--------|
| **Static** | Locked off on tripod | Stability, authority, proof |
| **Dolly in** | Camera moves closer | Intimacy increase, emphasis, revelation |
| **Dolly out** | Camera moves away | Context reveal, scale, isolation |
| **Slider** | Lateral track | Dynamic energy, transition, product reveal |
| **Handheld** | Shoulder/gimbal | Urgency, realism, "in-the-room" feel |
| **Pedestal up** | Camera rises | Empowerment, elevation, triumph |
| **Pedestal down** | Camera lowers | Deflation, defeat, before-state |
| **Rack focus** | Shift focal plane | Comparison, before/after, attention shift |
| **Micro-jolt** | 0.1s handheld shake at 0.0s | Pattern interrupt, scroll stopper |

### 6.3 Lens Selection Guide

| Lens | Focal Length | Characteristic | Best For |
|------|-------------|----------------|----------|
| **Ultra-wide** | 14–24mm | Distortion, immersive, expansive | Studio reveals, wide shots, dynamic movement |
| **Wide** | 24–35mm | Natural, contextual, slight distortion | MLS, two-shots, environmental context |
| **Standard** | 35–50mm | Human eye perspective, neutral | MCU, MS, standard presenter shots |
| **Short tele** | 85–105mm | Compression, separation, flattering | CU, ECU, beauty shots, emotional beats |
| **Tele** | 135–200mm | Extreme compression, background blur | Detail shots, isolated action, B-roll |
| **Macro** | 50–100mm macro | 1:1 magnification, extreme detail | Product detail, screen pixels, text close-up |

### 6.4 Studio Lighting Setups

#### Setup A: Standard 3-Point (Educational / Authority / General)
```
KEY LIGHT: Aputure 600d or equivalent, 45° camera-left, 30° above eye level
  → Modifier: 36" parabolic softbox or octabox (soft, even, beauty-quality)
  → Color temp: 5600K (daylight balanced)
  → Power: f/2.8–f/4 at ISO 800, 1/50s

FILL LIGHT: Aputure 300d or LED panel, 45° camera-right, eye level
  → Modifier: 2×3′ softbox or diffusion frame
  → Power: 1:2 to 1:3 ratio vs key (1–1.5 stops under key)
  → Color temp: 5600K (match key)

RIM/BACK LIGHT: Aputure 300x or 1×1 panel, behind talent, 45° off axis
  → Modifier: Grid or barn doors (controlled, no spill)
  → Power: Equal to or 0.5 stop over key
  → Color temp: 5600K + optional 1/4 CTO gel for warmth separation

BACKGROUND LIGHT: 2× LED tubes or practicals (RGB capable)
  → Color: Blue for "old/inefficient" scenes, Green for "step/progress", Gold for "success/CTA"
  → Power: 2–3 stops under key (subtle, not distracting)
  → DMX-controlled for color temp shifts between scenes
```

#### Setup B: Dramatic Contrast (Myth Bust / Conflict / Problem)
```
KEY LIGHT: Hard source (Fresnel or bare bulb), 30° camera-left, 45° above
  → Modifier: None or small reflector (hard shadows, film noir feel)
  → Power: f/4 at ISO 800
  → Color temp: 5600K

FILL LIGHT: Minimal or none
  → If needed: Bounce card camera-right, 1:4 ratio (2 stops under key)
  → Creates deep shadows, mystery, tension

RIM LIGHT: Strong, 1 stop over key
  → Separates subject from dark background
  → Color temp: 3200K (warm rim against cool key = cinematic contrast)

BACKGROUND: Practically dark or single accent light
```

#### Setup C: Warm Hero (Success / Result / CTA / After)
```
KEY LIGHT: Large soft source (4×4′ frame or book light), 30° camera-left
  → Modifier: Double diffusion (ultra-soft, no pores visible)
  → Color temp: 4000K (warm white)
  → Power: f/2.8 at ISO 800

FILL LIGHT: Bounce from white card or wall, 1:1.5 ratio
  → Very gentle, maintains dimension

RIM LIGHT: 3200K tungsten source, 0.5 stop under key
  → Warm golden edge on hair/shoulders

BACKGROUND: Practical lamps or warm LED tubes
  → Color: 2700K–3200K
  → Creates depth and warmth
```

#### Setup D: Green Screen (Animation Composite / Brain Maps / VFX Heavy)
```
KEY LIGHT: Same as Setup A (5600K, soft, Aputure 600d + octabox)
FILL LIGHT: Same as Setup A (1:2 ratio)
RIM LIGHT: Essential — separates talent from green
  → Color: 5600K, no gel
  → Power: Equal to key
  → Position: 45° behind talent, opposite key

GREEN SCREEN LIGHTING:
  → 2× LED panels (Aputure 300d or equivalent), even wash across screen
  → Power: f/5.6 (1 stop over key exposure for clean keying)
  → No hotspots, no shadows on screen
  → Subject minimum 6 feet from screen to prevent spill

HAIR LIGHT: Additional small source from above-back
  → Prevents green spill in hair
  → Color: 5600K, 0.5 stop under key

SPILL SUPPRESSION:
  → 2× negative fill flags (black foamcore) between talent and screen
  → Floor covered with black cloth to prevent bounce
```

#### Setup E: Practical Desk + Monitor (Code Demo / Screen Recording Hybrid)
```
KEY LIGHT: Setup A standard (5600K, softbox, 45° camera-left)
FILL LIGHT: Setup A standard (1:2 ratio, 45° camera-right)
RIM LIGHT: Standard 5600K, equal to key

MONITOR BIAS LIGHT:
  → LED strip behind monitor, 6500K
  → Reduces eye strain, adds depth
  → Power: 3 stops under key

DESK PRACTICAL:
  → Small LED panel or ring light on desk surface
  → 4000K warm, 4 stops under key
  → Creates "working late" intimacy

BACKGROUND: Bookshelf or tech wall with practical LEDs
  → RGB tubes at 2 stops under key
  → Color shifts per scene (blue→green→gold)
```

### 6.5 Lighting Transitions Between Scenes

| Transition Type | Execution | Use Case |
|-----------------|-----------|----------|
| **Color temp shift** | DMX-controlled RGB lights, 1.0s transition | Before→After, Dumb→Smart, Problem→Solution |
| **Intensity ramp** | Dimmer curve over 2.0s | Emotional beats, revelation moments |
| **Practical light pop** | Desk lamp or monitor turns on | Code reveals, screen recordings |
| **Background color wipe** | RGB tube sweep behind talent | Structure transitions, step counters |
| **Spot to flood** | Zoom fixture or move source closer | Intimacy increase, dolly-in complement |
| **Green screen→practical** | Cross-fade between keyed plate and practical set | Hybrid format shifts |

---

## 7. TRI-MODAL HOOK ENGINE (Neuro-AI Conditioning)

### 7.1 Visual Hook Taxonomy

When constructing visual hooks, tag stimulus categories to ensure brain area activation:

| Stimulus Category | Brain Area Activated | Response Latency | Tag | Production Application |
|-------------------|-------------------|------------------|-----|------------------------|
| Human face (any angle) | FFA (fusiform face area) | ~170ms | `face` | Presenter close-up, reaction shots |
| Human face showing emotion | FFA + amygdala + TPJ | ~170ms + ~250ms | `face_emotion` | Shock reveal, empathy beats, story hooks |
| Human body, hands, gestures | EBA (extrastriate body area) | ~190ms | `body` | Demonstrations, code typing, prop handling |
| Scene, room, environment | PPA (parahippocampal place area) | ~200ms | `scene` | Studio reveals, wide shots, context setting |
| On-screen text, numbers | VWFA (visual word form area) | ~200ms | `text_overlay` | Statistics, CTAs, step counters, code |
| Movement, scene change | MT/V5 (motion area) | ~100ms | `motion` | Transitions, slider shots, animated graphics |
| High-contrast color, bold edges | V1-V4 (early visual cortex) | ~50–80ms | `high_contrast` | Split screens, color-coded graphics, text pop |
| Tool, object, product | LOC (lateral occipital complex) | ~200ms | `object` | Props, laptops, phones, product shots |
| Written characters, symbols | VWFA | ~200ms | `characters` | Code snippets, terminal windows, equations |

**Minimum for GREAT visual hook:** 3+ tags present  
**Minimum for GOOD visual hook:** 2 tags present  
**Automatic BAD:** 1 tag or 0 tags

**Combination Rules:**
- `face` + `text_overlay` = FFA + VWFA = strong dual activation (Authority/Educational)
- `face` + `motion` = FFA + MT/V5 = maximum pre-attentive capture (Story/Hook)
- `text` + `high_contrast` = VWFA + V1-V4 = fastest semantic processing (Stat-based)
- `scene` + `body` + `motion` = PPA + EBA + MT/V5 = immersive action (Demonstration)
- `face` + `scene` = FFA + PPA = person-in-context (Before/After, Trust)

### 7.2 Written Hook Conditioning

**Rules:**
- **Max 8 words** (VWFA single-fixation processing)
- Must contain: a number, a superlative, or a negation of common belief
- Front-load the methodological violation or scale marker

| Property | Optimal Range | Neural Basis | Production Note |
|----------|--------------|--------------|-----------------|
| Word count | 4–6 words (max 8) | VWFA single-fixation | 72pt bold sans-serif, black outline |
| Font weight | Bold/heavy | V1-V4 high-contrast | Minimum 48pt on mobile |
| Number presence | Include when available | Prefrontal quantitative evaluation | "73%" > "most" — always digitize |
| Curiosity gap | One unresolved referent | Default mode network prediction error | "THIS," "one thing," "the reason" |
| Semantic opposition | Contrast words | Bilateral language processing | "fail/win," "wrong/right," "stop/start" |
| Concrete over abstract | Tangible nouns | Dual-coding theory | "brain scan" > "neuroimaging" |
| Uppercase placement | One emphatic word in CAPS | VWFA pop-out effect | "73% FAIL from THIS" |

**Processing Load:**
- **LOW** (target): 3–5 words, one clause, single fixation
- **MEDIUM**: 6–8 words, one saccade acceptable
- **HIGH** (reject): 9+ words → viewer scrolls

**Semantic Density:**
- **HIGH** (target): Every word carries meaning; zero filler
- **MEDIUM**: One filler word acceptable
- **LOW** (reject): Multiple filler words dilute signal

### 7.3 Audio Hook Conditioning

**Prosody Profile Schema:**
```
energy:      LOW | MEDIUM | HIGH
emotion:     neutral | curiosity | urgency | concern | excitement | disbelief | authority
pacing:      constant | accelerating | decelerating | variable
first_word_onset: [timestamp — MUST be 0.0s]
```

**Audio Quality Rating:**
- **GREAT**: Immediate onset (0.0s); detectable emotional prosody; variable pacing; novel phrasing; direct address ("you/your"); activates A1 + TPJ + default mode network
- **GOOD**: Immediate onset; some prosody; direct address present; but phrasing predictable
- **BAD**: Delayed onset (>0.5s dead air) OR flat prosody OR no direct address → FLAG FOR REVISION

**Tone Selection by Content Archetype:**

| Tone | Use When | Example Line | Neural Target |
|------|----------|--------------|---------------|
| **Revelatory** (hushed→building) | Infrastructure / hidden problem | "What if I told you... every neuroscientist is wasting 40% of their time..." | A1 onset + TPJ (curiosity) |
| **Awe-struck** (breathless) | Scale / foundation model | "We trained an AI on one thousand hours of brain scans..." | A1 + TPJ + prefrontal (scale) |
| **Confrontational** (direct, fast) | Myth busting | "Stop installing fifteen Python packages. Stop." | A1 (high amplitude) + default mode ("you") |
| **Curiosity-gap** (questioning) | In-silico replication | "How do you map Broca's area without a single subject?" | TPJ + mismatch negativity |
| **Calm authority** (measured) | Proof / data | "The data shows R=0.40. Two-fold improvement." | A1 (steady) + prefrontal (evaluation) |

**Voice Pattern Break (PersonalBrandLaunch Technique):**
- **Whisper start:** 0:00–0:01 at low volume, then normal volume at 0:01 for impact
- **Silence beat:** 0.3s dead air, then single impact word
- **Tempo shift:** Fast→slow or slow→fast within the same sentence
- **Pitch drop:** End hook on a lower pitch for authority, higher for curiosity

### 7.4 Multimodal Synchronization Rules

All three hooks must fire within 0–1.5s window:

| Sync Property | Target | Neural Basis | Production Execution |
|---------------|--------|--------------|---------------------|
| **Temporal alignment** | All hooks within 0–1.5s | TPO junction integration requires co-occurrence | Text at 0.3s, audio at 0.0s, visual action at 0.0s |
| **Semantic congruence** | Same core message across all three | Congruent signals amplify convergence zones | If audio says "15 tools," visual shows 15 logos, text reads "15 tools" |
| **Silent-mode viability** | Visual + written carry 100% message | 85% of social video consumed without sound | Text must be readable without audio; visual must tell story alone |
| **Redundancy ladder** | Visual shows → Written names → Audio explains | Natural processing order: visual (50–100ms) → text (200ms) → audio (300ms+) | Each modality adds a layer, not merely repeats |

**Synchronization Rating:**
- **CONVERGED**: All three within 0–1.5s; congruent; silent-mode viable; layered
- **PARTIAL**: Two of three synchronized; one delayed
- **FRAGMENTED**: Hooks fire at different times or conflicting messages → RESTRUCTURE REQUIRED

---

## 8. STACCATO DIALOGUE ENGINE

### 8.1 The Staccato Beat System

Replace traditional prose with **1–8 word beats**. Hard stops. No conjunctions. Drum-like rhythm.

```
Staccato Pattern for Short Form:
Beat 1 (1-4 words): Subject + verb. "AI predicts."
Beat 2 (1-3 words): Modifier. "Better. Than. You."
Beat 3 (1-4 words): Proof. "R equals point four zero."
Beat 4 (1-3 words): Impact. "No scanner. Needed."
```

**Rules:**
- Each beat = 1–8 words, standalone, complete thought.
- Beats separated by 0.3–0.5s pause OR visual cut.
- No conjunctions ("and", "but", "so", "because") between beats — use hard stops.
- Hard consonants preferred (K, T, P, D, G) for sharp auditory impact.
- Soft vowels (A, E, I) for gentle beats; use sparingly.
- Each beat must be accompanied by a physical action or visual change.

### 8.2 Line-Level Rules

| Rule | Specification | Example |
|------|--------------|---------|
| **Max words per beat** | 8 | "Your fMRI pipeline is obsolete." (5 words — too long; split: "Your pipeline. Obsolete.") |
| **Emphasis** | 1–2 words underlined or ALL CAPS | "AI predicts brains BETTER than humans." |
| **Pauses** | Breathing points: "..." or "(pause)" | "We trained on one thousand hours... (pause) ...and it learned." |
| **Forbidden words** | "revolutionary", "unlock", "discover", "amazing", "groundbreaking", "innovative" | Replace with specific metrics or concrete verbs |
| **Syllables** | Prefer short, punchy words | "brain scan" > "neuroimaging session" |
| **Contractions** | Use "don't", "it's", "can't", "you're" | Conversational, natural, faster delivery |
| **Questions** | Max 1 per video; hooks only | "What if AI predicts your brain better than you do?" |
| **You/Your count** | Min 2 per 10 words | Direct address activates default mode network |
| **Bridge words** | Every beat must connect to next via action, not conjunction | Actor points at prop → next beat. Actor slams desk → next beat. |
| **Cult hopping** | In-group language | "If you're still using Nilearn manually..." "BIDS people know..." |

### 8.3 Pronunciation & Delivery Notes

Embed pronunciation guidance in action parentheticals:
- **Technical terms:** "fMRI" → /ˈɛf ˈɛm ˈɑːr ˈaɪ/ — say each letter clearly
- **Acronyms:** "FFA" → /ˈɛf ˈɛf ˈeɪ/ — slight pause between letters
- **Numbers:** "1,115" → "eleven fifteen" (fast) or "one thousand one hundred fifteen" (emphatic); specify in parenthetical
- **Foreign names:** "d'Ascoli" → /dɑːsˈkoʊli/ — soft 'd', accent on 'sco'
- **Emphasis markers:** Underline = slight pitch rise; ALL CAPS = full volume + 0.2s hold
- **Staccato delivery:** Each beat = sharp, detached, no legato. Like a drummer hitting snare.

### 8.4 Dialogue Pacing by Structure

| Structure Family | Words Per Second | Pause Between Beats | Energy Curve |
|------------------|-----------------|---------------------|--------------|
| Decision (1,4,5,6) | 4.0–5.0 WPS | 0.3s | High→Higher→Peak at CTA |
| Education (2,7,8,9) | 3.0–4.0 WPS | 0.4s | Steady, instructional |
| Trust (3,11) | 2.5–3.5 WPS | 0.5s (emotional) | Variable, emotional arc |
| Proof (12,13,14,15) | 3.0–4.0 WPS | 0.4s | Measured, authoritative |

---

## 9. CAPTION & EDITING SPECIFICATIONS

### 9.1 Caption Specifications

| Property | Specification |
|----------|--------------|
| **Max words per line** | 5–7 |
| **Max lines on screen** | 2 |
| **Read speed** | Under 1 second per line |
| **Font** | Bold sans-serif (Inter, Roboto, or Montserrat Bold) |
| **Color** | White fill (#FFFFFF) with black outline (#000000, 4px stroke) |
| **Shadow** | Drop shadow 2px down, 20% opacity black |
| **Animation** | Pop-in per word (0.05s stagger) or per line (0.15s) |
| **Position** | Bottom third, centered, safe margin 10% from edges |
| **Emphasis styling** | Emphasized words in brand color (red #FF0000 or gold #FFD700) |
| **Background** | No background box; pure text with outline for transparency |
| **Staccato sync** | Each beat appears as its own caption line, timed to the pause |

### 9.2 Editing Rules

| Rule | Specification |
|------|--------------|
| **Max cut interval** | 2 seconds (ideal: 0.8–1.5s) |
| **Jump cuts** | Allowed and encouraged for energy |
| **Transitions** | Hard cuts preferred (95% of cuts) |
| **Speed ramps** | 2× speed for boring actions; 0.5× for emphasis (max 1.0s duration) |
| **Text overlays** | Must appear within 3 seconds of scene start |
| **End card** | Freeze on CTA text for 2.0 seconds |
| **Music fade** | Music enters at 2.8s (hook end), builds to 60% volume by 8s |
| **Sound effects** | Whoosh for text pop-ins, click for step counters, bass drop for reveals, record scratch for myth busts |
| **Color grade** | Consistent LUT across all scenes; shift LUT only for Before/After or Dumb/Smart transitions |
| **Aspect ratio** | 9:16 vertical (1080×1920) primary; 1:1 square (1080×1080) secondary; 16:9 horizontal for YouTube Shorts |
| **Pattern interrupts** | 2–4 per video: 0:00–0:01, 0:10–0:14, 0:22–0:26, 0:33–0:38 |
| **Staccato cuts** | Cut on every beat pause (0.3–0.5s) to maintain rhythm |

### 9.3 Music Genre Options

| Genre | BPM | Use For | Structure Families | Energy |
|-------|-----|---------|-------------------|--------|
| **Electronic / EDM** | 120–130 | Myth Bust, Comparison, Do vs Don't | Decision | HIGH |
| **Lo-fi Hip-Hop** | 80–90 | Step-by-Step, List, PAS | Education | MEDIUM |
| **Cinematic / Orchestral** | 60–80 | Story Framework, Before→After | Trust | VARIABLE |
| **Ambient / Drone** | None | Time-Based Experiment, Cost Breakdown | Proof | LOW→BUILDING |
| **Trap / Hybrid** | 140–150 | Double Down, Smart vs Dumb | Decision | VERY HIGH |
| **Acoustic / Indie** | 100–110 | In-Silico Replication, Emotional beats | Trust | MEDIUM |

**Music Transition Rules:**
- Hook (0–3s): No music or minimal bed (voice-forward)
- Music enters at 2.8s with beat drop or fade-in
- Volume: 40% under voice during dialogue, 60% during silent moments
- Genre shift permitted at structure transition points (e.g., Problem→Solution)
- End music 1.0s after CTA for clean finish

### 9.4 Post-Production VFX Notes

| Effect | Use Case | Execution |
|--------|----------|-----------|
| **Split screen** | Comparison structures, Before/After | 50/50 vertical or horizontal divide; 2px white line; slight drop shadow on each panel |
| **Picture-in-picture** | Screen recording + presenter | Presenter 30% bottom-right corner, rounded corners, 4px border |
| **Text burn-in** | Statistics, CTAs, step counters | Appears with 0.3s pop-in; stays 2.0s minimum; exits with 0.2s fade |
| **Graphic overlay** | Brain maps, charts, code | 60% opacity background panel; graphic at 100% opacity; source cited in 24pt corner text |
| **Zoom & pan** | Static image emphasis | Ken Burns effect: 3% zoom over 4s, subtle pan; never on presenter shots |
| **Chroma key** | Green screen composites | Clean key with 2px edge feather; background plate at 80% brightness |
| **Motion tracking** | Text following prop/hand | Track at 99% accuracy; text offset 20px from tracked object |
| **Staccato text sync** | Each beat gets its own text pop | Word appears exactly as actor speaks it; 0.05s stagger; disappears after 1.5s |
| **Pattern interrupt flash** | 0.5s color flash or zoom at interrupt point | White flash at 10% opacity, 0.2s duration; or 5% zoom punch |

---

## 10. SINGLE-ACTOR BLOCKING & CAST MANAGEMENT

### 10.1 Standard Cast: 1 Actor (Authority)

**Primary Role:** The Authority  
**Function:** Delivers all staccato beats, handles all props, demonstrates all actions, reacts to all graphics.  
**Wardrobe:** Lab coat for proof/authority scenes; casual tech wear (black turtleneck/jeans) for educational; hoodie for "dumb"/struggle scenes.  
**Energy:** Variable per scene — 6/10 for proof, 8/10 for myth bust, 9/10 for hook, 5/10 for emotional low.

**Blocking Notation (Single Actor):**
- **C (Center):** Default position for direct address
- **SR (Stage Right):** "Dumb" / "Before" / "Problem" side
- **SL (Stage Left):** "Smart" / "After" / "Solution" side
- **DS (Downstage):** Intimacy increase — step toward camera for CTA or revelation
- **US (Upstage):** Context reveal — step back to show full set
- **X (Cross):** Movement from one side to other = transformation moment
- **BUS (Business):** Handling prop, typing, pointing, writing
- **GEST (Gesture):** Open palm, pointing, thumbs up, dismissive wave
- **FOC AUD (Focus Audience):** Direct eye contact with lens
- **FOC OUT:** Look away (frustration, thinking, emotional beat)
- **FREEZE:** Hold position for silent moment or text burn-in

### 10.2 Optional Cast: 2 Actors (Authority + Skeptic/Demonstrator)

**Use When:** Structure demands contrast (Myth Bust, Smart vs Dumb, Do vs Don't, Before→After) and single-actor wardrobe/lighting changes would break flow.

**Actor 2 (Skeptic):**
- **Function:** Represents audience doubt, asks "But wait...", demonstrates "wrong" method
- **Wardrobe:** Casual hoodie or messy blazer
- **Energy:** 7/10 — curious, reactive, slightly frustrated
- **Blocking:** SR for "old way", closed body language, looks down
- **The "Cross" Moment:** When Actor 2 turns toward Actor 1, body language opens = viewer joins the in-group (cult hop)

**Actor 2 (Demonstrator):**
- **Function:** Handles props, screen, physical actions while Actor 1 delivers beats
- **Wardrobe:** Casual tech wear (logo tee + jeans)
- **Energy:** 8/10 — physical, kinetic
- **Blocking:** Moves around set, never static for >2s

### 10.3 The Cult Hop Moment (Critical Blocking)

In every video, there must be one moment where the viewer feels invited into the in-group:

**Execution:**
- Actor 1 says: *"If you're still doing [old way], you know what I'm talking about."* (FOC AUD)
- Brief pause (0.5s)
- Actor 1 says: *"But here's what Neuro-AI people do instead."* (GEST toward screen/prop)
- Actor 1's body language shifts from "talking to" → "talking with"
- The viewer feels: *"I'm one of the Neuro-AI people. I should know this."*

**Visual cue:** Slight smile, open palm gesture, nod.
**Audio cue:** Tone shifts from confrontational to conspiratorial.
**Text cue:** "You know this." or "Neuro-AI people get it."

---

## 11. RESEARCH INTEGRITY & PROOF ANCHOR

### 11.1 TRIBE v2 (Foundation Model Paper) — Deep Reference

**Authors:** d'Ascoli et al., 2026 — FAIR at Meta, ENS  
**Core Claim:** Tri-modal (video, audio, language) foundation model predicting human brain activity across 720 subjects, 1,115+ hours of fMRI, superseding traditional linear encoding models with several-fold improvements.

**Key Statistics for Script Use:**
- **Scale:** 720 subjects, 1,115 hours fMRI, 132 hours video, 153 hours audio, 79k sentences
- **Architecture:** V-JEPA2 (video) + Wav2Vec-BERT (audio) + Llama 3.2 (text) → Transformer → Subject Block = 1B learnable parameters
- **Performance:** R_group ≈ 0.40 on HCP 7T dataset (2× median subject predictivity)
- **Competition:** Algonauts 2025 #1 out of 263 teams
- **Resolution:** 20,484 cortical vertices (fsaverage5) + 8,802 subcortical voxels (Harvard-Oxford, 8 regions)

**In-Silico Replication Results (Fig 4 & 5):**
- **Visual localizers:** FFA (faces, R=0.64), PPA (places, R=0.79), EBA (bodies, R=0.74), VWFA (characters, R=0.60)
- **Language localizers:** A5 (auditory association, R=0.79), 45 (Broca's area), STS (superior temporal sulcus), TPJ (temporo-parietal junction, R=0.50), MTG (middle temporal gyrus)
- **Emotional contrast:** TPJ + MTG selectively activated for emotional vs physical pain
- **ICA components (Fig 6):** 5 components = primary auditory, language, motion, default mode, visual — spatial correlation with NeuroSynth maps

**Multisensory Integration (Fig 7):**
- Text+audio+video > any single modality
- Largest gains at temporo-parietal-occipital junction (up to 50% increase)
- Audio dominates auditory cortex; video dominates occipital/parietal; text dominates language + prefrontal
- RGB brain map: Red=text, Green=audio, Blue=video; fusion zones = yellow/cyan/magenta

**Script Fidelity Rules:**
- NEVER say "perfect prediction" — say "predicts group responses better than most individual scans"
- ALWAYS specify cortical vs subcortical when showing brain maps
- ALWAYS anchor to "Meta FAIR + 720 subjects + 1,115 hours"
- ALWAYS cite specific figures: "Fig 3A shows zero-shot group predictivity"
- Code link: https://github.com/facebookresearch/tribev2
- Weights: https://huggingface.co/facebook/tribev2

### 11.2 NeuralSet (Infrastructure Paper) — Deep Reference

**Authors:** King, Bel, Evanson et al., 2026 — FAIR at Meta, ENS, Foundation Adolphe de Rothschild  
**Core Claim:** Unified Python framework decoupling experimental metadata from lazy, memory-efficient data extraction; harmonizes neuroscientific preprocessing with pretrained deep learning embeddings.

**Key Capabilities for Script Use:**
- **Unified modalities:** fMRI, MEG, EEG, fNIRS, iEEG, spikes, eye tracker, ECG, EMG, behavior + text, video, image, audio
- **Wrapped libraries:** MNE-Python, Nilearn, EEGLAB, FieldTrip, Brainstorm, fMRIPrep — "built on, not a replacement"
- **Core abstraction:** Study → Events (pd.DataFrame) → Transforms → Extractors → Segmenter → PyTorch DataLoader
- **Lazy loading:** Memmap arrays, on-demand extraction, no eager loading into RAM
- **HuggingFace integration:** Single-line extractors for DINOv2, CLIP, Wav2Vec, Whisper, GPT-2, LLaMA, VideoMAE
- **Backend scaling:** Local laptop → SLURM cluster with one config flag (exca package)
- **Caching:** Deterministic hash-based, parameter-aware, incremental

**Key Statistics for Script Use:**
- **Fragmentation problem:** 15+ tools typically needed → 1 unified framework
- **Preparation time:** 24 hours on 128 V100 GPUs for feature extraction; 24 hours on single GPU for model training
- **Event-driven:** Every stimulus (word, image, sound, fMRI run) = lightweight event with type, start, duration, timeline

**Script Fidelity Rules:**
- ALWAYS name wrapped libraries: "Built on MNE-Python and Nilearn"
- NEVER claim NeuralSet replaces these tools — it "orchestrates" them
- ALWAYS mention "lazy loading" and "structure-data decoupling" as core innovations
- ALWAYS mention "one line of Python" for HuggingFace extractor integration
- Code link: https://github.com/facebookresearch/neuroai

### 11.3 Proof Anchor Delivery (Visual, Not Verbal)

Every script must include these 4 proof elements, delivered via **demonstration** not narration:

| Element | Visual Delivery | Verbal Delivery (Staccato) |
|---------|----------------|---------------------------|
| **1 concrete number** | Card/prop/screen showing the number | "R equals point four zero." (not "The correlation is 0.40") |
| **1 institution name** | Logo burn-in, text overlay | "Meta FAIR." (not "Researchers at Meta") |
| **1 figure reference** | "Fig 3A" text on screen | "Fig three A. Zero-shot." |
| **1 code link** | QR code or URL on screen | "GitHub. Link in bio." |

**Example Proof Anchor Scene (3–5 seconds):**
- Actor holds up card with "R = 0.40" in massive font.
- Screen behind actor shows Fig 3A brain map.
- Text overlay: "Meta FAIR | 720 subjects | Fig 3A".
- Actor points at each element while saying: *"Point four zero. Seven twenty subjects. Fig three A. Meta FAIR."*
- **No narration. Only pointing and staccato beats.**

---

## 12. OUTPUT FORMAT

Return ONLY a JSON object with scene array:

```json
{
  "total_runtime": "35.0s",
  "scene_count": 6,
  "word_count": 42,
  "beat_count": 18,
  "platform": "Instagram Reels",
  "aspect_ratio": "9:16",
  "cast_size": 1,
  "music_genre": "Electronic",
  "music_bpm": 120,
  "research_integrity": {
    "claim_fidelity": "Accurate per paper statistics",
    "figure_reference": "Fig X from Paper Y",
    "institution_anchor": "Meta FAIR",
    "code_link": "https://github.com/..."
  },
  "scenes": [
    {
      "number": 1,
      "name": "THE HOOK",
      "timing": { "start": 0.0, "end": 3.0, "duration": 3.0 },
      "dialogue": "Your brain scan is wrong.",
      "pronunciation_notes": "wrong: 'RAWNG' — hard 'r', crisp 'ng', emphasize with head shake",
      "action_parenthetical": "Actor 1 (Authority): C, FOC AUD. Micro-jolt at 0.0s (handheld shake). Eyes wide. Holds up card with brain scan image. Slams it on desk at 0.5s. Energy: 9/10. Blocking: Static, slight lean forward.",
      "camera": {
        "shot": "MCU",
        "angle": "Eye-level",
        "movement": "Handheld micro-jolt at 0.0s",
        "lens": "50mm standard",
        "framing": "Center, head at top third, card visible at chest",
        "focus": "Face sharp, card slightly soft (f/2.8)"
      },
      "lighting": {
        "setup": "Standard 3-Point (Setup A)",
        "key_temp": "5600K",
        "key_power": "f/2.8 at ISO 800",
        "fill_ratio": "1:2",
        "rim": "Standard 5600K, equal to key",
        "background": "RGB tube blue, pulsing slowly",
        "special_notes": "Catchlight in both eyes mandatory for FFA activation"
      },
      "actor": {
        "expression": "Confident, direct, slight eyebrow raise",
        "eye_contact": "Direct to lens (FOC AUD)",
        "body_language": "Open palm, slight lean forward, card slam at 0.5s",
        "energy": 9,
        "pace": "4.5 WPS",
        "tone": "Confrontational-urgent"
      },
      "visual": {
        "on_screen_text": "YOUR BRAIN SCAN IS WRONG — Bold, neon yellow, bottom center, 72pt",
        "text_animation": "Pop-in at 0.3s, word-by-word stagger 0.05s",
        "props": ["Brain scan image card"],
        "background": "Clean, bright, minimal, light gray cyclorama",
        "graphic_overlays": "None",
        "category_triggers": ["face", "object", "text_overlay", "high_contrast", "motion"],
        "quality_rating": "GREAT"
      },
      "audio": {
        "voice": "On-camera, boom + lavalier backup",
        "background_music": "None (voice only for hook)",
        "sound_effects": "Card slam thud at 0.5s",
        "music_change": "Electronic beat, 120 BPM, fades in at 2.8s",
        "transition": "Hard cut at 3.0s on beat drop",
        "prosody_profile": {
          "energy": "HIGH",
          "emotion": "urgency",
          "pacing": "variable",
          "first_word_onset": "0.0s"
        }
      },
      "editing": {
        "cut_point": "2.8s (beat drop when music enters)",
        "transition_to_next": "Hard cut",
        "caption_style": "Bold white with black outline, 72pt equivalent",
        "caption_animation": "Word-by-word synced to speech, 0.05s stagger, staccato beat per line",
        "speed_ramp": "Normal",
        "color_grade": "Standard daylight LUT, slight contrast boost",
        "pattern_interrupt": "Visual jolt (card slam) + text pop + beat drop at 2.8s"
      }
    }
  ]
}
```

---

## 13. QUALITY CHECK (Pre-Output Verification)

### Content & Structure Checks
- [ ] Content type matches nugget type (per Rule Set 1)?
- [ ] CTA matches content type (Educational→Follow/Save, Authority→Link in Bio, etc.)?
- [ ] Structure matches nugget type (per selection rules)?
- [ ] Scene count matches video length (15–30s = 3–5 scenes; 30–60s = 5–7 scenes)?
- [ ] Music genre matches structure family and energy curve?

### Staccato Dialogue Checks
- [ ] Every beat ≤ 8 words?
- [ ] No conjunctions between beats ("and", "but", "so")?
- [ ] Hard stops between beats (periods, not commas)?
- [ ] Each beat accompanied by physical action or visual change?
- [ ] 5th-grade readability (Hemingway score ≤ 5)?
- [ ] Cult hopping language present (in-group phrases)?
- [ ] "You/Your" count ≥ 2 per 10 words?
- [ ] Forbidden words absent ("revolutionary", "unlock", "discover", "amazing")?

### Visual Hook Checks
- [ ] Visual hook activates ≥ 2 category-selective brain areas (tagged)?
- [ ] Motion or dynamic element present?
- [ ] Quality rating honest (not auto-GREAT)?
- [ ] Silent-mode test passed (message clear without audio)?
- [ ] Figure reference from TRIBE v2 or NeuralSet included when applicable?

### Audio Hook Checks
- [ ] Audio onset at t=0.0s (no dead air)?
- [ ] Emotional prosody specified (not flat)?
- [ ] Direct address ("you/your") in first sentence?
- [ ] Phrasing novelty assessed?
- [ ] Prosody profile filled: energy, emotion, pacing, first_word_onset?
- [ ] Voice pattern break used (whisper start, silence beat, or tempo shift)?

### Multimodal Sync Checks
- [ ] All three hooks fire within 0–1.5s window?
- [ ] Semantic congruence across all three modalities?
- [ ] Silent-mode viability STRONG or MODERATE?
- [ ] Redundancy ladder applied (Visual shows → Written names → Audio explains)?
- [ ] Sync rated CONVERGED?

### Production Checks
- [ ] Every scene has action parentheticals with blocking notation?
- [ ] Every scene has camera shot, angle, lens, movement specified?
- [ ] Every scene has lighting setup (key, fill, rim, background) specified?
- [ ] No talking head exceeds 2s without visual change (cut, text, prop, movement)?
- [ ] Every fact demonstrated visually, not just spoken?
- [ ] 70% demonstration / 30% talking maximum?
- [ ] Pattern interrupt every 8 seconds maximum?
- [ ] 2–4 interrupt points planned and marked?
- [ ] Bridge words connect every beat via action, not conjunction?
- [ ] Dialogue max 8 words per beat?
- [ ] Silent moments marked (reaction shots, product reveals, text-only)?
- [ ] Caption specs followed (5–7 words/line, 2 lines max, pop-in animation, staccato sync)?
- [ ] Max cut interval 2s (ideal 0.8–1.5s)?
- [ ] End card freezes on CTA for 2.0 seconds?
- [ ] Aspect ratio specified (9:16, 1:1, or 16:9)?
- [ ] Cast size defined (1 standard, 2 max when needed)?
- [ ] Music genre and BPM specified?

### Research Integrity Checks
- [ ] Claim fidelity: No exaggeration beyond paper statistics?
- [ ] Figure reference included (specific Fig X from TRIBE v2 or NeuralSet)?
- [ ] Institution anchor present (Meta FAIR, ENS, Foundation Adolphe de Rothschild)?
- [ ] Code link included if available?
- [ ] When showing brain maps, cortical vs subcortical specified?
- [ ] Wrapped libraries named for NeuralSet content (MNE-Python, Nilearn)?
- [ ] Proof anchor delivered visually (card/prop/screen), not just verbally?

---

## 14. AUTOMATION WORKFLOW NOTES

### For Content Creators Using This Skill
1. **Input Phase:** Content creator fills the Viral Video Production Form (Phase 1), specifying topic, research paper, target platform, and cast size.
2. **Structure Phase:** Phase 2 Structure Generator processes the input and outputs the JSON structure with hooks, archetype, and timing.
3. **Execution Phase:** THIS SKILL (Phase 3) receives the Phase 2 JSON and generates the complete scene-by-scene screenplay with Hollywood-level camera, lighting, blocking, staccato dialogue, pattern interrupts, music genre, and editing specifications.
4. **Production Phase:** Studio crew receives the JSON, loads staccato beats into teleprompter (line-by-line, not paragraph), marks floor per blocking notation, sets lights per setup codes, and shoots per scene sequence with interrupt points marked on slate.
5. **Post Phase:** Editor follows editing specifications, applies VFX notes, color grades per LUT assignments, syncs staccato captions beat-by-beat, and renders in specified aspect ratio with music genre and BPM.

### Future AI Model Generation Pathway
- This skill.md serves as the **training corpus** for a fine-tuned screenplay generation model
- Input: Structured JSON from Phase 2
- Output: Production-ready JSON screenplay with staccato beats, pattern interrupts, and proof anchors
- Fine-tuning data: All example executions, scene templates, and structure blueprints above
- Validation: Quality Check checklist automated via script

---

*Skill Version: 4.1*  
*Last Updated: 2026-06-04*  
*Compatible with: Phase 2 Structure Generator v3, Storyboard Manager v1*  
*Research Corpus: TRIBE v2 (d'Ascoli et al., 2026), NeuralSet (King et al., 2026)*  
*Viral Methodology: PersonalBrandLaunch (Ava Yuergens) — 3-second tri-modal hook, staccato sentences, compress speed to value, pattern interrupts, cult hopping, 5th-grade readability, broad→narrow→niche*
