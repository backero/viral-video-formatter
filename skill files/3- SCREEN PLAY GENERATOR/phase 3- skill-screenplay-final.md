# SKILL: Scalerock Studio Screenplay Engine v5.0
## Phase-3 of the Research-to-Viral-Video Pipeline — Production Execution Layer
## For Social Media Short-Form Video Production — Studio Multi-Language Setup

---

## 0. PIPELINE POSITION & LAYER SEPARATION

This skill operates strictly downstream of Phase 2. The boundary is non-negotiable:

| Owned by Phase 2 | Owned by Phase 3 (THIS SKILL) |
|---|---|
| Content type, structure choice (1–15), nugget type | Scene order, scene count, scene runtime |
| Hook text (visual / written / audio descriptions) | How to *shoot, light, and edit* that hook |
| Neural target list per modality | Which camera/lighting/blocking decisions fire those targets |
| Research claim, statistical fidelity | How to render that claim on-screen and in dialogue |
| CTA text and type | How the CTA scene looks, sounds, and freezes |
| Multimodal sync rating (CONVERGED/PARTIAL/FRAGMENTED) | Whether the rendered scene actually achieves convergence |

Phase 3 never overrides a Phase-2 decision. If Phase-2 emits a technical hook ("R = 0.40 — better than median subject"), Phase-3 *renders* it — it does not "dumb it down." Phase-3's job is to add the on-screen-text decoder so a non-researcher can still parse it without losing the source claim.

**Pipeline:** Phase 1 (Topic + Value form) → Phase 2 (NeuroAI Structure Generator) → Phase 3 (THIS SKILL) → Phase 4 (future: AI-generated production)

---

## 1. PURPOSE

Take the **Phase-2 NeuroAI Structure JSON** and emit a complete scene-by-scene production screenplay that a studio team (or downstream AI generation model) can execute frame-for-frame without further interpretation.

**Default output format:** **Audio-B-Roll (ABR)** — voiceover-led, demonstration-heavy, minimal on-camera dialogue. The actor (when present) primarily *does* rather than *says*. This mirrors the PersonalBrandLaunch (Ava Yuergens) playbook, whose franchise-broker case study moved from 9M views on talking-head to 10M+ views on the ABR re-cut of the same script — the format itself contributed measurable lift independent of script content.

**Target platforms:** Instagram Reels, YouTube Shorts, TikTok, X/Twitter — 15s to 60s (strict short-form), 9:16 vertical default.  
**Talent count:** 1 actor standard; 2 actors max when the concept demands contrast.  
**Production environment:** Controlled studio (green screen + practical set hybrid).  
**Viral methodology:** PersonalBrandLaunch — 3-second tri-modal hook, staccato sentences, compress speed to value, pattern interrupts, cult hopping, 5th-grade readability, broad→narrow→niche.  
**Neural foundation:** TRIBE v2 (multisensory integration) and NeuralSet (infrastructure unification) from Meta FAIR.  
**Multi-language:** EN, HI, TA, HIN-EN (Hinglish), TAM-EN (Tanglish), and extensible to any language pair.

---

## 2. INPUT FORMAT

```json
{
  "phase2_structure": { /* full Phase-2 output */ },
  "production_context": {
    "platform": "Instagram Reels | YouTube Shorts | TikTok | X",
    "aspect_ratio": "9:16 | 1:1 | 16:9",
    "estimated_length_s": 30,
    "actor_count": 1,
    "actor_profiles": [
      { "id": "A1", "role": "Host/Demonstrator", "wardrobe": "...", "language_competence": ["EN","HI","TA"] }
    ],
    "studio_assets": {
      "lights_available": 3,
      "cameras_available": 1,
      "props_available": ["smartphone","laptop","whiteboard","colored cards","tablet"],
      "background_options": ["plain white wall","warm wood backdrop","blue gradient","kitchen counter"],
      "broll_sources_available": ["royalty_free_stock","custom_shoot","screen_recording","archival_research"]
    },
    "content_complexity": "research_heavy | mid | lifestyle",
    "language_primary": "EN | HI | TA | HIN-EN | TAM-EN",
    "language_secondary": null,
    "reference_video": {
      "url": "optional outlier video that hit 5× follower count",
      "match_target": "pacing | cut_rhythm | format | hook_structure",
      "notes": "what to emulate"
    },
    "format_override": "auto | ABR | talking_head | whiteboard | two_person | hybrid"
  }
}
```

---

## 3. THE PERSONALBRANDLAUNCH VIRAL LAYER

### 3.1 Core Techniques (MUST IMPLEMENT)

| Technique | Execution Rule | Where Applied |
|-----------|---------------|---------------|
| **3-Second Tri-Modal Hook** | SEE + READ + HEAR must fire in first 3 seconds. Visual carries more weight than verbal. | Every scene 1, Hook Engine §7 |
| **Staccato Sentences** | Dialogue = 1–8 word beats. Hard stops. No conjunctions. Drum-like rhythm. | Dialogue Engine §13 |
| **Compress Speed to Value** | Zero preamble. First 2.5 seconds = value delivery. No "Hey guys." No setup. | Scene Timing §5 |
| **Cult Hopping** | In-group language makes viewer feel insider. "If you're still using 15 tools..." "Neuro-AI people know..." | Dialogue §13.1 |
| **5th-Grade Readability** | All scripts score ≤5th grade on Hemingway. No jargon without instant translation. | Quality Check §22 |
| **Broad → Narrow → Niche** | Hook = broad (anyone curious). Body = narrow (target ICP). CTA = niche (only right people convert). | Structure Blueprints §5 |
| **Pattern Interrupts** | Planned disruption at 0:00–0:01, 0:10–0:14, 0:22–0:26, 0:33–0:38 | Editing Rules §16 |
| **2–4 Interrupt Points** | Every video has 2–4 planned "reset" moments | Scene Templates |
| **Voice Pattern Break** | Whisper/dead air at 0:00 → normal volume at 0:01. Or silence → impact word. | Audio Hook §10 |
| **Visual > Verbal** | If audio says it, visual MUST show it simultaneously. 70% demonstration, 30% talking max. | Golden Rules §4 |

### 3.2 The 3-2-1 Interrupt Method

**3:** Identify three audience scroll triggers (slow pacing, generic opening, no payoff).  
**2:** Select two complementary interrupt techniques (visual jolt + audio cue, or text + angle swap).  
**1:** Focus on one clear message — the interrupt serves the value, never distracts from it.

### 3.3 Broad → Narrow → Niche Script Architecture

```
HOOK (0–3s):    BROAD — Anyone scrolling stops. "Your brain scan is wrong."
BODY (3–45s):   NARROW — Target ICP gets value. "Meta FAIR built AI. 720 brains. One model."
CTA (45–60s):   NICHE — Only right people convert. "Comment 'BRAIN' if you want the paper."
```

---

## 4. GOLDEN RULES (ABSOLUTE — ZERO EXCEPTIONS)

### Rule 1: Demonstration-First Dialogue
Every line is subject to the test: **"Can this be SHOWN instead of SAID?"** If yes, move it to action/visual. Dialogue is the fallback, not the default. Acceptable for: research claims with numeric fidelity, direct address, Reinforcement/Lesson beat, CTA.

### Rule 2: Action-to-Dialogue Word Ratio ≥ 2.0
For every spoken word, ≥ 2 words of action/visual description must accompany it. Enforced as QC check.

### Rule 3: Silent-Runtime Quota by Format
- **ABR:** ≥ 50% silent runtime
- **Whiteboard:** ≥ 30%
- **Two-person dialogue:** ≥ 25%
- **Talking-head:** ≥ 20%
- **Hybrid:** ≥ 35%
Silent = no dialogue spoken (captions + visuals + music + SFX allowed).

### Rule 4: Hook Parseable Muted
The hook scene's visual + caption alone must carry the full message. VO is multiplier, not carrier. QC fails if hook depends on audio.

### Rule 5: Broad → Narrow → Niche
Hook scene = BROAD (universal vocabulary, no jargon). Body scenes = NARROW (research specifics, technical terms paired with on-screen decoders). CTA = NICHE (only right viewer acts).

### Rule 6: Show, Don't Tell (LOC / EBA / VWFA)
Every fact is DEMONSTRATED. If dialogue states a number, the number appears on screen simultaneously (Prefrontal dual coding). If dialogue names an object, the object is visible (LOC). If dialogue describes an action, the action is performed (EBA).

### Rule 7: No Talking Head > 2 Seconds Without Visual Change
After 2s of static talking-head, MT/V5 habituates. Required change every 2s: cut, text, prop, gesture, B-roll insert, caption highlight change.

### Rule 8: Silent Moments Mandatory (FFA / LOC isolation)
- Reaction shots 0.5–1.0s — FFA isolation
- Product/object reveals 1.0–2.0s — LOC isolation
- Before/after cuts 1.0s each — V1–V4 contrast
- Text-only moments 1.0–2.0s — VWFA isolation
- Pre-CTA freeze 1.0s — executive decision space

### Rule 9: Bridge Words Between Sentences (Language network continuity)
Every sentence connects: "And...", "But here's the thing...", "Which means...", "So now...", "And that's why..."

### Rule 10: Action-Integrated Dialogue (EBA + STS co-activation)
Every line specifies WHAT THE ACTOR IS DOING. `action_parenthetical` reads as director's note attached to the line.

### Rule 11: Tri-Modal Convergence in 0–1.5s (TPO Junction)
Hook scene satisfies all three modalities firing in first 1.5s:
- Visual: motion + contrast + (face or text or object) parseable by 0.5s
- Audio: first phoneme at 0.0s, emotional prosody, direct address by 0.5s
- Written: hero text (≤5 words) on screen by 0.3s

### Rule 12: Research Fidelity Carry-Over
Numeric claims match Phase-2 `research_integrity.claim_fidelity` exactly. No inflation. On-screen number and spoken number match the paper. Institution anchor visible at least once. Code link in CTA scene.

### Rule 13: Studio-Realistic Scope
Every camera move, lighting setup, prop, actor count achievable with `studio_assets`. Otherwise listed in `production_warnings` with substitute.

### Rule 14: Caption Coverage = 100%
Every spoken word appears as synced caption block. 85% of social video watched muted.

### Rule 15: One Peak Per Video
Exactly ONE energy-10 / speed-ramp / hard-emphasis moment per video. Lands at the structural payoff — not hook, not CTA.

### Rule 16: Hook → Script → Format → Editing Priority (PBL)
When in doubt, optimize in this order. The hook must win first. Format is fourth — re-shootable across skins.

### Rule 17: 5× Outlier Match (when reference_video provided)
If a reference outlier video is supplied, match its cut rhythm at scene boundaries within ±20%. Match its format if `match_target = format`. Do NOT copy its dialogue.

---

## 5. THE 15 VIRAL STRUCTURES — COMPLETE PRODUCTION BLUEPRINTS

Each structure includes: (a) Scene sequence, (b) Staccato dialogue beats, (c) Pattern interrupt schedule, (d) Format skin per scene, (e) Camera/lighting template, (f) Single-actor blocking (with 2-actor variant notes).

### S-TIER: Core Engines (60–70% usage)

#### STRUCTURE 1: Comparison (A vs B) — Decision Family
**Scene Blueprint:** Micro bridge → Option A behavior → Consequence A → Option B behavior → Consequence B → Timeframe/Test → Explanation → Reinforcement → CTA  
**Scene Count:** 7–8 scenes  
**Neural Hook Family:** Decision — Visual contrast priority  
**Cast:** 1 actor (plays both via prop/wardrobe change) OR 2 actors (Authority + Skeptic)

**Production Template:**
- **Scene 1 (0.0–3.0s): THE HOOK / MICRO BRIDGE**
  - *Format:* ABR (split-screen B-roll)
  - *Camera:* A-cam MCU, slight low angle. Handheld micro-jolt at 0.0s (pattern interrupt).
  - *Lighting:* Setup A (Standard 3-Point), key 5600K. Background RGB tube blue.
  - *Blocking:* Actor 1 C, FOC AUD. Holds two colored cards (Red = A, Blue = B). Slams them on desk at 0.5s.
  - *Staccato:* "A versus B. (pause) One wins. (pause) One dies."
  - *Visual:* Text "A vs B" burns in at 0.3s. 72pt, centered, neon yellow.
  - *Audio:* Immediate onset (0.0s). Energy: HIGH. Emotion: urgency. Music: Electronic beat, 120 BPM, enters at 2.8s.
  - *Interrupt:* Visual jolt (card slam) + text pop + beat drop at 2.8s.

- **Scene 2 (3.0–8.0s): OPTION A BEHAVIOR**
  - *Format:* ABR (process B-roll)
  - *Camera:* B-cam CU on hands/prop. Cut to A-cam MCU at 5.0s.
  - *Lighting:* Cooler key (6000K). Signal "old/inefficient."
  - *Blocking:* Actor 1 SR, BUS with prop A. Frustrated body language. Looking down.
  - *Staccato:* "Method A. (pause) Fifteen tools. (pause) Manual alignment. (pause) Weeks of pain."
  - *Visual:* Step counter "OPTION A" — red, top left.

- **Scene 3 (8.0–12.0s): CONSEQUENCE A**
  - *Format:* ABR (result-state insert)
  - *Camera:* A-cam MCU. Quick zoom in at 10.0s.
  - *Lighting:* Under-key by 1 stop. Shadows deepen.
  - *Staccato:* "Result? (pause) Three weeks. (pause) Wasted."
  - *Visual:* Text "3 WEEKS WASTED" — red, bottom third. Silent 1.0s after text.
  - *Interrupt:* Zoom in + text burn + sound stinger (bass drop) at 10.0s.

- **Scene 4 (12.0–18.0s): OPTION B BEHAVIOR**
  - *Format:* ABR (process B-roll, mirror)
  - *Camera:* A-cam MCU. B-cam ECU for hand detail at 14.0s.
  - *Lighting:* Warm shift to Setup C (Hero, 4000K). Rim light intensifies.
  - *Blocking:* Actor 1 C, BUS with prop B. Confident, open gestures. Direct eye contact.
  - *Staccato:* "Method B. (pause) One line. (pause) Python. (pause) NeuralSet."
  - *Visual:* Step counter "OPTION B" — green, top left.
  - *Interrupt:* Lighting color shift (blue→gold) at 12.0s + prop swap.

- **Scene 5 (18.0–23.0s): CONSEQUENCE B**
  - *Format:* ABR (result-state insert)
  - *Camera:* A-cam MCU. Dolly in 6 inches at 20.0s.
  - *Staccato:* "Result? (pause) Three minutes. (pause) Done."
  - *Visual:* Text "3 MINUTES" — green, bottom third. Checkmark graphic.

- **Scene 6 (23.0–28.0s): TIMEFRAME / TEST**
  - *Format:* ABR (split-screen B-roll)
  - *Camera:* Split screen — left prop A (desaturated), right prop B (saturated).
  - *Visual:* Timer graphic counting down from 3:00 → 0:03.
  - *Staccato:* "Same data. (pause) Same brain. (pause) Different world."

- **Scene 7 (28.0–33.0s): EXPLANATION**
  - *Format:* Hybrid (actor MCU first time)
  - *Camera:* A-cam MCU. B-cam ECU for facial micro-expressions.
  - *Staccato:* "The reason? (pause) Structure-data decoupling. (pause) Lazy loading. (pause) One framework."
  - *Visual:* NeuralSet logo appears. Code snippet overlay.

- **Scene 8 (33.0–35.0s): REINFORCEMENT + CTA**
  - *Format:* Hybrid (talking-head freeze)
  - *Camera:* A-cam CU. Freeze on CTA text card.
  - *Staccato:* "Stop the chaos. (pause) Start NeuralSet. (pause) Link in bio."
  - *Visual:* CTA text burns in. Actor 1 points to text at 34.0s.
  - *Interrupt:* Final text pop + music fade out.

#### STRUCTURE 2: Step-by-Step — Education Family
**Scene Blueprint:** Promise fix → Step 1 + Reason → Step 2 + Reason → Step 3 + Reason → Reinforcement → CTA  
**Scene Count:** 5–6 scenes  
**Neural Hook Family:** Education — Outcome-first priming  
**Cast:** 1 actor (Authority)

**Production Template:**
- **Scene 1 (0.0–3.0s): PROMISE FIX**
  - *Format:* ABR (result preview B-roll)
  - *Camera:* A-cam MCU, eye-level. Handheld micro-jolt at 0.0s.
  - *Lighting:* Setup A, bright even, beauty dish key.
  - *Blocking:* Actor 1 C, FOC AUD. Holds up fingers: 3, 2, 1.
  - *Staccato:* "Three steps. (pause) One minute. (pause) Fixed."
  - *Visual:* Text "3 STEPS. 1 MINUTE." — 6 words max. Pop-in at 0.3s.
  - *Audio:* Instructional tone, urgency. Music: Lo-fi electronic, 100 BPM, enters at 2.8s.
  - *Interrupt:* Finger countdown + text pop + beat drop.

- **Scene 2 (3.0–10.0s): STEP 1 + REASON**
  - *Format:* Whiteboard (hand demo) OR ABR
  - *Camera:* Cut to B-cam ECU of hands/prop at 3.5s. Cut back to A-cam MCU at 6.0s.
  - *Visual:* "STEP 1" graphic — blue, top left. Screen recording overlay if digital.
  - *Blocking:* Actor 1 C, BUS with laptop/phone/prop. Physical demonstration.
  - *Staccato:* "Step one. (pause) Import your study. (pause) One line. (pause) Study.build."
  - *Interrupt:* Angle change at 3.5s + text pop at 4.0s.

- **Scene 3 (10.0–17.0s): STEP 2 + REASON**
  - *Format:* Whiteboard OR ABR
  - *Camera:* A-cam MCU. Slider movement 12.0–14.0s.
  - *Visual:* "STEP 2" graphic — green. Background gel shifts blue→green at 10.0s.
  - *Staccato:* "Step two. (pause) Pick your extractor. (pause) fMRI. MEG. EEG. (pause) One switch."
  - *Interrupt:* Slider move + color shift + text pop.

- **Scene 4 (17.0–24.0s): STEP 3 + REASON**
  - *Format:* Whiteboard OR ABR
  - *Camera:* B-cam ECU for detail. Cut to A-cam MCU at 20.0s.
  - *Visual:* "STEP 3" graphic — red. Result visible on screen/prop.
  - *Staccato:* "Step three. (pause) Segment. (pause) Apply. (pause) PyTorch ready."

- **Scene 5 (24.0–30.0s): REINFORCEMENT**
  - *Format:* Hybrid (talking-head)
  - *Camera:* A-cam MCU. Actor steps DS toward camera (intimacy increase).
  - *Visual:* Before/after split screen or result number.
  - *Staccato:* "From chaos. (pause) To clarity. (pause) In sixty seconds."

- **Scene 6 (30.0–35.0s): CTA**
  - *Format:* Hybrid (talking-head freeze)
  - *Camera:* A-cam CU. Freeze frame on CTA.
  - *Staccato:* "Save this. (pause) Follow for more. (pause) Link in bio."

#### STRUCTURE 3: Story Framework — Trust Family
**Scene Blueprint:** Setup → Conflict → Emotional low → Decision → Action → Result → Lesson → CTA  
**Scene Count:** 7–8 scenes  
**Neural Hook Family:** Trust — Emotional state priority  
**Cast:** 1 actor (Authority narrates own journey) OR 2 actors (Authority + past-self/Skeptic)

**Production Template:**
- **Scene 1 (0.0–4.0s): SETUP**
  - *Format:* ABR (LS establishing + ambient B-roll)
  - *Camera:* A-cam MCU, warm key (Setup C, 4000K). Close-up face showing emotion.
  - *Lighting:* Soft key (large softbox) + subtle rim. Catchlight in both eyes mandatory.
  - *Staccato:* "Six months. (pause) Fifteen tools. (pause) Zero progress."
  - *Audio:* Narrative tone. Emotional prosody. Music: Cinematic ambient, slow build.
  - *Interrupt:* Face close-up + emotional music entrance at 0.5s.

- **Scene 2 (4.0–9.0s): CONFLICT**
  - *Format:* ABR (B-roll showing problem)
  - *Camera:* Cut to B-cam CU. Slight Dutch angle (5°) for tension.
  - *Lighting:* Contrast increases. Fill reduced 1 stop.
  - *Blocking:* Actor 1 SL, body closed (arms crossed, turning away).
  - *Staccato:* "The data was messy. (pause) The pipeline broke. (pause) Every. Single. Day."
  - *Interrupt:* Dutch angle + underexposure + body language shift.

- **Scene 3 (9.0–14.0s): EMOTIONAL LOW**
  - *Format:* Hybrid (CU actor 3-Point Moody)
  - *Camera:* ECU on eyes. Hold for 2.0s. **SILENT MOMENT.**
  - *Lighting:* Underexposed 0.5 stop. Background dims.
  - *Audio:* Music bed minor key. No voice.
  - *Visual:* Text "BROKEN" — fades in, holds 1.5s, fades out.
  - *Interrupt:* Complete silence + text fade = maximum pattern break.

- **Scene 4 (14.0–18.0s): DECISION**
  - *Format:* Hybrid (MCU actor)
  - *Camera:* A-cam MCU. Step forward into frame (dolly in).
  - *Lighting:* Key brightens to full. Rim intensifies.
  - *Staccato:* "Then I found it. (pause) NeuralSet. (pause) One framework. (pause) Everything changed."
  - *Interrupt:* Dolly in + light brightening + music key change (minor→major).

- **Scene 5 (18.0–24.0s): ACTION**
  - *Format:* ABR (gimbal/process B-roll)
  - *Camera:* Wide shot showing full set. Actor interacts with prop/solution.
  - *Blocking:* Open body language. Cross to C. Confident movements.
  - *Staccato:* "Import. (pause) Extract. (pause) Segment. (pause) Done."
  - *Visual:* Screen recording of actual NeuralSet code running.

- **Scene 6 (24.0–28.0s): RESULT**
  - *Format:* ABR (result-state imagery, mood lift)
  - *Camera:* A-cam MCU. Actor smiles/reacts genuinely.
  - *Lighting:* Full beauty setup. Background practicals warm up.
  - *Staccato:* "Three minutes. (pause) Not three weeks. (pause) Same result. (pause) Better."
  - *Visual:* Result number/text overlay.

- **Scene 7 (28.0–33.0s): LESSON**
  - *Format:* Talking-head (MCU direct-to-lens)
  - *Camera:* A-cam MCU.
  - *Staccato:* "The lesson? (pause) Stop building. (pause) Start using. (pause) The tools exist."

- **Scene 8 (33.0–35.0s): CTA**
  - *Format:* Talking-head freeze
  - *Camera:* A-cam CU. Direct address.
  - *Staccato:* "Follow. (pause) Save this. (pause) Link in bio."

### A-TIER: Stable Variations (20–30% usage)

#### STRUCTURE 4: Smart vs Dumb — Decision Family
**Scene Blueprint:** Contrast → Dumb behavior → Damage → Smart behavior → Benefit → Mechanism → Reinforcement → CTA  
**Scene Count:** 7 scenes  
**Cast:** 1 actor (plays both via prop/wardrobe/lighting change) OR 2 actors

**Production Template:**
- **Scene 1 (0.0–3.0s): CONTRAST**
  - *Format:* Two-Person (2-Shot MLS) OR ABR split-screen
  - *Camera:* Split screen or rapid cut between "Dumb" setup (messy, flat light) and "Smart" setup (clean, warm light).
  - *Visual:* Text "DUMB vs SMART" — bold, high contrast.
  - *Staccato:* "Dumb way. (pause) Smart way. (pause) Same goal. (pause) Different life."
  - *Interrupt:* Split screen wipe + text pop + beat drop.

- **Scene 2 (3.0–8.0s): DUMB BEHAVIOR**
  - *Format:* Two-Person (MCU dumb actor, desaturated) OR ABR
  - *Camera:* B-cam CU. Low angle (diminishing). Background cluttered.
  - *Lighting:* Flat, overhead fluorescent feel (Setup B, harsh shadows, 6500K).
  - *Blocking:* Actor fumbles with prop. Frustrated. Looking down.
  - *Staccato:* "Install Nilearn. (pause) Install MNE. (pause) Install EEGLAB. (pause) Fifteen times."

- **Scene 3 (8.0–12.0s): DAMAGE**
  - *Format:* ABR (B-roll consequence)
  - *Camera:* ECU on face. Hold 1.5s silent.
  - *Visual:* Red X graphic. Text "3 HOURS WASTED."
  - *Lighting:* Under-key. Cold 6500K.
  - *Staccato:* "Three hours. (pause) Gone. (pause) Forever."
  - *Interrupt:* Red X slam + silence + cold light.

- **Scene 4 (12.0–18.0s): SMART BEHAVIOR**
  - *Format:* Two-Person (MCU smart actor, clean) OR ABR
  - *Camera:* A-cam MCU. Eye-level, empowering.
  - *Lighting:* Warm Hero (Setup C, 4000K) + strong rim.
  - *Blocking:* Confident, efficient movements. Direct eye contact.
  - *Staccato:* "pip install neuralset. (pause) One line. (pause) All modalities. (pause) Done."
  - *Interrupt:* Light shift (cold→warm) + code typing on screen + music key change.

- **Scene 5 (18.0–23.0s): BENEFIT**
  - *Format:* ABR (B-roll benefit)
  - *Camera:* A-cam MCU. Dolly in.
  - *Visual:* Green checkmark. Text "DONE IN 30 SECONDS."
  - *Staccato:* "Thirty seconds. (pause) Not three hours. (pause) Same power."

- **Scene 6 (23.0–28.0s): MECHANISM**
  - *Format:* Talking-head (smart actor direct) OR ABR
  - *Camera:* Cut to screen recording or prop detail (B-cam ECU).
  - *Staccato:* "Here's why it works..."

- **Scene 7 (28.0–35.0s): REINFORCEMENT + CTA**
  - *Format:* Two-Person freeze OR Hybrid
  - *Camera:* A-cam CU. Side-by-side comparison graphic overlays.
  - *Staccato:* "Be smart. (pause) Not dumb. (pause) Link in bio."

#### STRUCTURE 5: Do vs Don't — Decision Family
**Scene Blueprint:** Force choice → Wrong behavior → Damage → Correct behavior → Benefit → Reason → Reinforcement → CTA  
**Scene Count:** 7 scenes  
**Cast:** 1 actor

**Production Template:**
- **Scene 1 (0.0–3.0s): FORCE CHOICE**
  - *Format:* ABR (split B-roll with ✅/❌ overlay)
  - *Camera:* A-cam MCU. Actor holds up two hands — left (DON'T), right (DO).
  - *Visual:* Text "STOP doing this. START doing this." — 6 words.
  - *Staccato:* "Stop doing this. (pause) Start doing this. (pause) Your brain will thank you."
  - *Audio:* Confrontational tone. Music: Electronic, 130 BPM.
  - *Interrupt:* Hand gesture + text pop + beat drop.

- **Scene 2 (3.0–8.0s): WRONG BEHAVIOR**
  - *Format:* ABR (process B-roll, dutch tilt, desaturated)
  - *Camera:* B-cam CU. Actor demonstrates wrong method with exaggerated clumsiness.
  - *Lighting:* Cool key (6000K). Harsh shadows.
  - *Staccato:* "Manual preprocessing. (pause) One subject. (pause) One week. (pause) Repeat."

- **Scene 3 (8.0–12.0s): DAMAGE**
  - *Format:* ABR (result-state)
  - *Camera:* ECU reaction shot. Silent 1.0s.
  - *Visual:* Warning icon. Text "THIS COSTS YOU $$$."
  - *Staccato:* "One week. (pause) Per subject. (pause) Seven hundred twenty subjects. (pause) Do the math."

- **Scene 4 (12.0–18.0s): CORRECT BEHAVIOR**
  - *Format:* ABR (process B-roll, clean)
  - *Camera:* A-cam MCU. Smooth, controlled movements.
  - *Lighting:* Warm, even. Beauty setup.
  - *Staccato:* "NeuralSet. (pause) One pipeline. (pause) All subjects. (pause) Zero repetition."

- **Scene 5 (18.0–23.0s): BENEFIT**
  - *Format:* ABR (result-state)
  - *Camera:* A-cam MCU. Actor smiles/relaxes.
  - *Visual:* Success metric text.
  - *Staccato:* "Scale. (pause) Speed. (pause) Provenance. (pause) Perfect."

- **Scene 6 (23.0–28.0s): REASON**
  - *Format:* Hybrid (talking-head) OR ABR
  - *Camera:* Cut to screen detail or graphic animation.
  - *Staccato:* "Built on MNE. (pause) Built on Nilearn. (pause) Not a replacement. (pause) An orchestra."

- **Scene 7 (28.0–35.0s): REINFORCEMENT + CTA**
  - *Format:* Hybrid (talking-head freeze)
  - *Camera:* A-cam CU. Direct address.
  - *Staccato:* "Do this. (pause) Not that. (pause) Follow. (pause) Link in bio."

#### STRUCTURE 6: Myth Bust — Decision Family
**Scene Blueprint:** State myth → Why believed → Contradiction → Correct method → Mechanism → Reinforcement → CTA  
**Scene Count:** 6 scenes  
**Cast:** 1 actor (plays both believer and busted) OR 2 actors (Skeptic + Authority)

**Production Template:**
- **Scene 1 (0.0–3.0s): STATE MYTH**
  - *Format:* ABR (B-roll of common belief + "MYTH" text)
  - *Camera:* A-cam MCU. Actor states myth confidently (smug).
  - *Visual:* Text "MYTH: [Statement]" — red, bold. Myth icon (ghost).
  - *Staccato:* "You need a scanner. (pause) To map the brain. (pause) Right?"
  - *Audio:* Skeptical, smug tone. Music: None yet.
  - *Interrupt:* Text pop + myth icon + actor smirk.

- **Scene 2 (3.0–7.0s): WHY BELIEVED**
  - *Format:* ABR (montage of common practice)
  - *Camera:* B-cam CU. Actor nods knowingly.
  - *Staccato:* "Everyone thinks this. (pause) Because it's always been true. (pause) Until now."

- **Scene 3 (7.0–12.0s): CONTRADICTION**
  - *Format:* ABR (smash cut + glitch SFX)
  - *Camera:* Cut to A-cam MCU. Actor steps into frame. Record scratch SFX.
  - *Lighting:* Rim light flares. Dramatic pause.
  - *Visual:* Text "ACTUALLY..." — appears at 8.0s.
  - *Staccato:* "Wrong. (pause) Meta FAIR built an AI. (pause) One thousand hours. (pause) Zero scans needed."
  - *Interrupt:* Record scratch + light flare + text pop + music beat drop.

- **Scene 4 (12.0–20.0s): CORRECT METHOD**
  - *Format:* ABR (process B-roll + result)
  - *Camera:* A-cam MCU. Demonstration with prop/screen.
  - *Blocking:* Actor BUS. Confident, open.
  - *Staccato:* "TRIBE v2. (pause) Video. Audio. Text. (pause) One model. (pause) Predicts everything."

- **Scene 5 (20.0–28.0s): MECHANISM**
  - *Format:* ABR (insert/process) OR Whiteboard
  - *Camera:* Cut to detail shots (B-cam ECU). Return to A-cam MCU.
  - *Visual:* Animated diagram or screen recording.
  - *Staccato:* "V-JEPA2. (pause) Wav2Vec. (pause) Llama. (pause) One billion parameters. (pause) Your brain."

- **Scene 6 (28.0–35.0s): REINFORCEMENT + CTA**
  - *Format:* Hybrid (talking-head freeze)
  - *Camera:* A-cam CU. Actor nods (social proof to self).
  - *Visual:* "MYTH = BUSTED" stamp graphic.
  - *Staccato:* "Myth busted. (pause) Follow for more. (pause) Link in bio."

#### STRUCTURE 7: List Structure — Education Family
**Scene Blueprint:** List setup → Point + reason → Point + reason → Point + reason → Pattern insight → CTA  
**Scene Count:** 5–6 scenes  
**Cast:** 1 actor

**Production Template:**
- **Scene 1 (0.0–3.0s): LIST SETUP**
  - *Format:* ABR (text + B-roll preview)
  - *Camera:* A-cam MCU. Actor holds up fingers counting.
  - *Visual:* Text "3 things that..." — numbered list preview.
  - *Staccato:* "Three things. (pause) That break neuro-AI pipelines. (pause) Every. Single. Time."

- **Scene 2 (3.0–10.0s): POINT 1 + REASON**
  - *Format:* ABR (whip pan into item B-roll)
  - *Camera:* A-cam MCU. Cut to B-cam ECU for detail at 6.0s.
  - *Visual:* "1." graphic + text. Color-coded (blue).
  - *Staccato:* "One. (pause) Misaligned timelines. (pause) Neural data at one Hertz. (pause) Stimuli at two. (pause) Disaster."

- **Scene 3 (10.0–17.0s): POINT 2 + REASON**
  - *Format:* ABR (whip pan, same pattern)
  - *Visual:* "2." graphic (green).
  - *Staccato:* "Two. (pause) Eager loading. (pause) Five hundred gigabytes. (pause) Into RAM. (pause) Crash."

- **Scene 4 (17.0–24.0s): POINT 3 + REASON**
  - *Format:* ABR (whip pan, same pattern)
  - *Visual:* "3." graphic (red).
  - *Staccato:* "Three. (pause) Fifteen tools. (pause) Zero integration. (pause) Manual wrangling. (pause) Forever."

- **Scene 5 (24.0–30.0s): PATTERN INSIGHT**
  - *Format:* Hybrid (talking-head)
  - *Camera:* A-cam MCU. Actor steps closer.
  - *Visual:* All three points summarized in graphic.
  - *Staccato:* "The pattern? (pause) Fragmentation kills. (pause) Unification wins. (pause) NeuralSet fixes all three."

- **Scene 6 (30.0–35.0s): CTA**
  - *Format:* Hybrid (talking-head freeze)
  - *Camera:* A-cam CU.
  - *Staccato:* "Save this list. (pause) Follow for more. (pause) Link in bio."

#### STRUCTURE 8: 3-Level Structure — Education Family
**Scene Blueprint:** Introduce levels → Beginner → Limitation → Intermediate → Limitation → Advanced → Insight → CTA  
**Scene Count:** 7 scenes  
**Cast:** 1 actor (wardrobe/prop change per level)

**Production Template:**
- **Scene 1 (0.0–3.0s): INTRODUCE LEVELS**
  - *Format:* ABR (3-tier caption + B-roll)
  - *Visual:* Three-tier pyramid graphic. Text "Beginner → Pro → Expert."
  - *Staccato:* "Three levels. (pause) One pipeline. (pause) Which one are you?"

- **Scene 2 (3.0–8.0s): BEGINNER**
  - *Format:* ABR (process B-roll)
  - *Camera:* A-cam MCU. Actor in casual wear (hoodie).
  - *Visual:* "LEVEL 1" badge. Basic tool/prop.
  - *Staccato:* "Level one. (pause) One subject. (pause) One script. (pause) Manual everything."

- **Scene 3 (8.0–12.0s): LIMITATION 1**
  - *Format:* ABR (result-state + reaction CU B-roll)
  - *Camera:* ECU on frustration. Silent 1.0s.
  - *Visual:* Red barrier graphic.
  - *Staccato:* "Stuck. (pause) At one. (pause) Forever."

- **Scene 4 (12.0–18.0s): INTERMEDIATE**
  - *Format:* ABR (process + result)
  - *Camera:* A-cam MCU. Actor adds blazer (wardrobe change).
  - *Visual:* "LEVEL 2" badge.
  - *Staccato:* "Level two. (pause) Ten subjects. (pause) Some automation. (pause) Still patching."

- **Scene 5 (18.0–22.0s): LIMITATION 2**
  - *Format:* ABR (result-state)
  - *Visual:* Yellow warning graphic.
  - *Staccato:* "Better. (pause) Not enough. (pause) Still breaking."

- **Scene 6 (22.0–28.0s): ADVANCED + INSIGHT**
  - *Format:* Hybrid (actor performs, hero shot)
  - *Camera:* A-cam MCU. Actor adds lab coat (wardrobe change).
  - *Visual:* "LEVEL 3" badge + golden glow effect.
  - *Staccato:* "Level three. (pause) Seven hundred twenty subjects. (pause) One framework. (pause) NeuralSet. (pause) The real insight? (pause) Levels one and two don't exist anymore."

- **Scene 7 (28.0–35.0s): CTA**
  - *Format:* Hybrid (talking-head freeze)
  - *Camera:* A-cam CU.
  - *Staccato:* "Level up. (pause) Follow. (pause) Link in bio."

#### STRUCTURE 9: PAS (Problem-Agitate-Solution) — Education Family
**Scene Blueprint:** Problem → Consequence → Escalation → Solution → Action → Mechanism → Reinforcement → CTA  
**Scene Count:** 7 scenes  
**Cast:** 1 actor

**Production Template:**
- **Scene 1 (0.0–3.0s): PROBLEM**
  - *Format:* ABR (B-roll showing pain state)
  - *Camera:* A-cam MCU. Concerned expression.
  - *Audio:* Concerned tone. Music: Tension, minor key.
  - *Staccato:* "Your pipeline is broken. (pause) And you know it."

- **Scene 2 (3.0–7.0s): CONSEQUENCE**
  - *Format:* ABR (escalation B-roll)
  - *Visual:* Text overlay with negative metric.
  - *Staccato:* "Three weeks. (pause) Per study. (pause) Per subject. (pause) Unsustainable."

- **Scene 3 (7.0–12.0s): ESCALATION**
  - *Format:* ABR (whip pan + faster cuts)
  - *Camera:* Dutch angle (8°). Music intensifies.
  - *Visual:* "And it's getting worse." Text + warning graphics.
  - *Staccato:* "Datasets growing. (pause) Terabytes incoming. (pause) Your laptop dying. (pause) The gap widening."

- **Scene 4 (12.0–18.0s): SOLUTION**
  - *Format:* ABR (mood lift B-roll)
  - *Camera:* A-cam MCU. Actor relaxes/smiles.
  - *Lighting:* Warm shift (Setup C).
  - *Visual:* Solution name/product appears.
  - *Staccato:* "NeuralSet. (pause) One import. (pause) One line. (pause) Scale to cluster. (pause) Done."

- **Scene 5 (18.0–23.0s): ACTION**
  - *Format:* ABR (process B-roll)
  - *Camera:* B-cam ECU demonstration.
  - *Staccato:* "Study. (pause) Build. (pause) Extract. (pause) Segment. (pause) Apply."

- **Scene 6 (23.0–28.0s): MECHANISM**
  - *Format:* ABR (screen recording or graphic animation)
  - *Staccato:* "Lazy loading. (pause) Memmap caching. (pause) SLURM dispatch. (pause) One config flag."

- **Scene 7 (28.0–35.0s): REINFORCEMENT + CTA**
  - *Format:* Hybrid (talking-head freeze)
  - *Camera:* A-cam CU.
  - *Staccato:* "Fix it now. (pause) Follow. (pause) Link in bio."

#### STRUCTURE 10: Outcome → Pain → Solution — Education Family
**Scene Blueprint:** Dream outcome → Obstacles → Solution → Core mechanism → Reinforcement → CTA  
**Scene Count:** 5–6 scenes  
**Cast:** 1 actor

**Production Template:**
- **Scene 1 (0.0–4.0s): DREAM OUTCOME**
  - *Format:* ABR (result-state B-roll, hero shot)
  - *Camera:* A-cam MCU. Actor visualizes success (looks up, smiles).
  - *Visual:* Dream outcome text. Gold shimmer effect.
  - *Audio:* Awe-struck tone. Music: Cinematic swell.
  - *Staccato:* "Imagine. (pause) One pipeline. (pause) All modalities. (pause) All scales. (pause) Zero friction."

- **Scene 2 (4.0–10.0s): OBSTACLES**
  - *Format:* ABR (montage of pains, jump cuts)
  - *Camera:* Rapid cuts (3 cuts in 6 seconds). Actor frustrated.
  - *Visual:* Obstacle icons popping up. Red color grade.
  - *Staccato:* "But reality? (pause) Fifteen tools. (pause) Broken timelines. (pause) RAM crashes. (pause) Manual hell."

- **Scene 3 (10.0–16.0s): SOLUTION**
  - *Format:* ABR (process B-roll)
  - *Camera:* A-cam MCU. Actor holds up solution.
  - *Lighting:* Hero rim light.
  - *Staccato:* "NeuralSet. (pause) The bridge. (pause) Between neuroscience. (pause) And AI."

- **Scene 4 (16.0–24.0s): CORE MECHANISM**
  - *Format:* Whiteboard (sketch + VO) OR ABR
  - *Camera:* Detail shots + MCU alternating.
  - *Staccato:* "Events. (pause) Extractors. (pause) Segments. (pause) Tensors. (pause) One flow."

- **Scene 5 (24.0–30.0s): REINFORCEMENT**
  - *Format:* Hybrid (talking-head)
  - *Camera:* Before/after split screen.
  - *Staccato:* "From fragmented. (pause) To unified. (pause) In one line."

- **Scene 6 (30.0–35.0s): CTA**
  - *Format:* Hybrid (talking-head freeze)
  - *Camera:* A-cam CU.
  - *Staccato:* "Make it real. (pause) Follow. (pause) Link in bio."

#### STRUCTURE 11: Before → After — Trust Family
**Scene Blueprint:** Transformation → Before state → Struggle → Turning point → Action → Result → Lesson → CTA  
**Scene Count:** 7–8 scenes  
**Cast:** 1 actor (before/after via lighting/prop change)

**Production Template:**
- **Scene 1 (0.0–3.0s): TRANSFORMATION**
  - *Format:* ABR (split-screen Before/After)
  - *Camera:* Split screen — left "Before" (desaturated, flat light), right "After" (saturated, warm light).
  - *Visual:* "BEFORE → AFTER" text.
  - *Staccato:* "Before. (pause) After. (pause) Same person. (pause) Different world."

- **Scene 2 (3.0–8.0s): BEFORE STATE**
  - *Format:* ABR (desaturated B-roll)
  - *Camera:* B-cam CU. Flat lighting, 5600K.
  - *Blocking:* Actor slumped, looking down.
  - *Staccato:* "Before NeuralSet. (pause) Fifteen tabs open. (pause) Three crashes today. (pause) Giving up."

- **Scene 3 (8.0–13.0s): STRUGGLE**
  - *Format:* Hybrid (CU 3-Point Moody)
  - *Camera:* ECU on eyes. Silent 1.5s.
  - *Lighting:* Underexposed.
  - *Staccato:* "Broken. (pause) Alone. (pause) Stuck."

- **Scene 4 (13.0–17.0s): TURNING POINT**
  - *Format:* Hybrid (MCU push-in)
  - *Camera:* A-cam MCU. Steps into frame.
  - *Lighting:* Key brightens. Rim appears.
  - *Staccato:* "Then I found it. (pause) One framework. (pause) Everything changed."

- **Scene 5 (17.0–23.0s): ACTION**
  - *Format:* ABR (gimbal/process B-roll)
  - *Camera:* Wide shot. Actor rises, moves to desk.
  - *Blocking:* Open body language. Types code. Screen shows result.
  - *Staccato:* "Import. (pause) Build. (pause) Run. (pause) Watch."

- **Scene 6 (23.0–28.0s): RESULT**
  - *Format:* ABR (High-Key + amber gel)
  - *Camera:* A-cam MCU. Actor confident, smiling.
  - *Lighting:* Full beauty setup. 4000K warm.
  - *Staccato:* "Three minutes. (pause) Seven hundred twenty subjects. (pause) One pipeline. (pause) Perfect."

- **Scene 7 (28.0–33.0s): LESSON**
  - *Format:* Talking-head (MCU direct-to-lens)
  - *Camera:* MCU.
  - *Staccato:* "The lesson? (pause) Stop suffering. (pause) Start building. (pause) The tools exist."

- **Scene 8 (33.0–35.0s): CTA**
  - *Format:* Talking-head freeze
  - *Camera:* A-cam CU.
  - *Staccato:* "Transform. (pause) Follow. (pause) Link in bio."

### B-TIER: Proof Heavy (10–20% usage)

#### STRUCTURE 12: Time-Based Experiment — Proof Family
**Scene Blueprint:** Baseline → Rule followed → Duration → Observation → Results → Insight → Reinforcement → CTA  
**Scene Count:** 7 scenes  
**Cast:** 1 actor

**Production Template:**
- **Scene 1 (0.0–3.0s): BASELINE**
  - *Format:* ABR (Day 0 caption + B-roll)
  - *Camera:* A-cam MCU. Actor presents baseline number.
  - *Visual:* "Day 0: [Metric]" text.
  - *Staccato:* "Day zero. (pause) Baseline set. (pause) R equals zero point one."

- **Scene 2 (3.0–7.0s): RULE FOLLOWED**
  - *Format:* ABR (process B-roll)
  - *Camera:* B-cam ECU of hands doing the action.
  - *Staccato:* "Add data. (pause) Add subjects. (pause) Add hours."

- **Scene 3 (7.0–12.0s): DURATION**
  - *Format:* ABR (calendar/counter animation)
  - *Camera:* Time-lapse or graphic timer.
  - *Visual:* Calendar pages flipping. "Day 1... Day 7... Day 30..."
  - *Staccato:* "Day one. (pause) Day seven. (pause) Day thirty. (pause) No plateau."

- **Scene 4 (12.0–17.0s): OBSERVATION**
  - *Format:* Hybrid (CU reaction OR B-roll face)
  - *Camera:* A-cam MCU. Actor reacts to data.
  - *Staccato:* "Log-linear growth. (pause) Every hour counts. (pause) Every subject adds."

- **Scene 5 (17.0–23.0s): RESULTS**
  - *Format:* ABR (chart animation)
  - *Camera:* Screen recording or chart animation.
  - *Visual:* Graph line climbing. "+X%" text.
  - *Staccato:* "Day thirty. (pause) R equals zero point four. (pause) Four times better. (pause) No ceiling."

- **Scene 6 (23.0–28.0s): INSIGHT**
  - *Format:* Hybrid (talking-head)
  - *Camera:* A-cam MCU.
  - *Staccato:* "The insight? (pause) More data. (pause) Better predictions. (pause) No limit found."

- **Scene 7 (28.0–35.0s): REINFORCEMENT + CTA**
  - *Format:* Hybrid (talking-head freeze)
  - *Camera:* A-cam CU.
  - *Staccato:* "Scale wins. (pause) Follow. (pause) Link in bio."

#### STRUCTURE 13: Fake Case Study — Proof Family
**Scene Blueprint:** Scenario → Step 1 + reason → Step 2 + reason → Step 3 → Strategic stack → CTA  
**Scene Count:** 5–6 scenes  
**Cast:** 1 actor

**Production Template:**
- **Scene 1 (0.0–4.0s): SCENARIO**
  - *Format:* ABR (B-roll + "Subject X" caption)
  - *Camera:* A-cam MCU. Actor sets up fictional but realistic scenario.
  - *Visual:* "CASE STUDY: [Name]" text. Briefcase icon.
  - *Staccato:* "Meet Dr. Chen. (pause) Two hundred subjects. (pause) One deadline. (pause) Three weeks."

- **Scene 2 (4.0–10.0s): STEP 1 + REASON**
  - *Format:* ABR (insert/process)
  - *Camera:* A-cam MCU. Actor as "consultant."
  - *Staccato:* "Step one. (pause) Import all data. (pause) One line. (pause) NeuralSet handles the rest."

- **Scene 3 (10.0–16.0s): STEP 2 + REASON**
  - *Format:* ABR (insert/process)
  - *Staccato:* "Step two. (pause) Configure extractors. (pause) fMRI. (pause) Video. (pause) Text. (pause) All aligned."

- **Scene 4 (16.0–22.0s): STEP 3**
  - *Format:* ABR (insert/process)
  - *Staccato:* "Step three. (pause) Segment. (pause) Apply. (pause) PyTorch DataLoader. (pause) Ready."

- **Scene 5 (22.0–28.0s): STRATEGIC STACK**
  - *Format:* Whiteboard (sketch animation)
  - *Camera:* Graphic overlay showing all three steps combined.
  - *Visual:* Pyramid or stack graphic.
  - *Staccato:* "Study. (pause) Extractors. (pause) Segments. (pause) One stack. (pause) Infinite scale."

- **Scene 6 (28.0–35.0s): CTA**
  - *Format:* Hybrid (talking-head freeze)
  - *Staccato:* "Be Dr. Chen. (pause) Follow. (pause) Link in bio."

#### STRUCTURE 14: Double Down — Proof Family
**Scene Blueprint:** Existing winner → One change → Additional insight → Expected result → Reinforcement → CTA  
**Scene Count:** 5 scenes  
**Cast:** 1 actor

**Production Template:**
- **Scene 1 (0.0–4.0s): EXISTING WINNER**
  - *Format:* ABR (result-state B-roll)
  - *Camera:* A-cam MCU. Actor acknowledges known good result.
  - *Visual:* "We know [X] works." Checkmark.
  - *Staccato:* "We know video works. (pause) For brain prediction. (pause) R equals zero point two. (pause) Good."

- **Scene 2 (4.0–10.0s): ONE CHANGE**
  - *Format:* ABR (process B-roll showing change)
  - *Camera:* A-cam MCU. Actor introduces modification.
  - *Visual:* "But what if we add [Y]?" Question mark graphic.
  - *Staccato:* "But what if. (pause) We add audio. (pause) And text. (pause) Tri-modal. (pause) TRIBE v2."

- **Scene 3 (10.0–16.0s): ADDITIONAL INSIGHT**
  - *Format:* Hybrid (talking-head) OR ABR
  - *Camera:* Cut to screen/prop detail.
  - *Staccato:* "The insight? (pause) TPO junction. (pause) Fifty percent gain. (pause) Where modalities fuse."

- **Scene 4 (16.0–24.0s): EXPECTED RESULT + REINFORCEMENT**
  - *Format:* ABR (new result + reaction)
  - *Camera:* A-cam MCU. Actor reveals improved metric.
  - *Visual:* Side-by-side: Original vs Modified.
  - *Staccato:* "Result? (pause) R equals zero point four. (pause) Double. (pause) No new scans. (pause) Zero-shot."

- **Scene 5 (24.0–35.0s): CTA**
  - *Format:* Hybrid (talking-head freeze)
  - *Staccato:* "Double down. (pause) On tri-modal. (pause) Follow. (pause) Link in bio."

#### STRUCTURE 15: Cost Breakdown — Proof Family
**Scene Blueprint:** Cost truth → Expense 1 → Expense 2 → Expense 3 → Total → Value comparison → Lesson → CTA  
**Scene Count:** 7 scenes  
**Cast:** 1 actor

**Production Template:**
- **Scene 1 (0.0–3.0s): COST TRUTH**
  - *Format:* ABR (large "$X" number + B-roll)
  - *Camera:* A-cam MCU. Actor holds up receipt/bill.
  - *Visual:* "The REAL cost of [X]." Text.
  - *Staccato:* "The real cost. (pause) Of fragmented tools. (pause) You're not counting."

- **Scene 2 (3.0–8.0s): EXPENSE 1**
  - *Format:* ABR (animated price reveal)
  - *Visual:* Itemized graphic. "$[Amount]" — red.
  - *Staccato:* "Tool one. (pause) MNE-Python. (pause) Free. (pause) But your time? (pause) Priceless."

- **Scene 3 (8.0–13.0s): EXPENSE 2**
  - *Format:* ABR (animated price reveal)
  - *Staccato:* "Tool two. (pause) Nilearn. (pause) Free. (pause) Integration? (pause) Manual. (pause) Hours."

- **Scene 4 (13.0–18.0s): EXPENSE 3**
  - *Format:* ABR (animated price reveal)
  - *Staccato:* "Tool three. (pause) Custom scripts. (pause) Debugging. (pause) Maintenance. (pause) Forever."

- **Scene 5 (18.0–23.0s): TOTAL**
  - *Format:* ABR (big-number reveal + tension SFX)
  - *Visual:* Calculator animation. "TOTAL: $[Sum]" — bold red.
  - *Staccato:* "Total cost? (pause) Three weeks. (pause) Per study. (pause) Per person. (pause) Unsustainable."

- **Scene 6 (23.0–28.0s): VALUE COMPARISON + LESSON**
  - *Format:* Hybrid (talking-head)
  - *Camera:* Split screen. Left = cost, Right = value gained.
  - *Visual:* "Value: 10x" — green.
  - *Staccato:* "NeuralSet. (pause) One line. (pause) All tools. (pause) Value? (pause) Infinite."

- **Scene 7 (28.0–35.0s): CTA**
  - *Format:* Hybrid (talking-head freeze)
  - *Staccato:* "Count the real cost. (pause) Then choose. (pause) Follow. (pause) Link in bio."


---

## 6. FORMAT SKIN LIBRARY

Phase-3 selects ONE format skin per video (single ABR default unless overridden). Each skin has its own per-scene shot conventions, dialogue density, and edit rhythm.

### 6.1 Format Skin 1 — Audio-B-Roll (ABR) ⭐ DEFAULT

**What it is:** Voiceover carries the script. On-camera presence is minimal or zero. Visual stream is dominated by B-roll, screen captures, prop hero shots, animated graphics, archival footage, and result-state visuals. When an actor appears, they're typically performing an action (not speaking on camera).

**Why it's the default:**
- Highest per-second visual information density
- Easiest to caption fully (no syncing dialogue to lips)
- Most reusable across languages (re-dub VO, keep visuals)
- Forgiving of imperfect actor performance
- Per PBL playbook: re-cut of talking-head to ABR moved 9M views → 10M+ on identical script

**Scene defaults under ABR:**
- Actor appears on camera ≤ 30% of total runtime
- VO is recorded separately, used over silent visuals
- Captions: word-by-word pop synced to VO
- Cut rhythm: 1 cut every 0.8–1.5s (faster than talking-head)
- Background music: subtle pulse OR cinematic underscore throughout
- Silent-runtime quota: ≥ 50%

**When NOT to use ABR:**
- Highly emotional Story/Trust content where actor's facial micro-expression IS the message
- Authority content where parasocial trust requires direct lens engagement
- When the brand IS the founder (even then ABR with brief CU inserts works)

### 6.2 Format Skin 2 — Talking-Head + Overlay

**What it is:** Actor speaks directly to lens, MCU framing, with on-screen text and prop overlays providing the visual layer. Hands in frame for demonstration moments.

**Best for:** Story/Trust structures, Authority delivery, content where parasocial connection is the conversion driver.

**Scene defaults:**
- Actor on camera ≥ 70% of runtime
- MCU with 50mm equivalent default
- Cut rhythm: 1 cut every 1.5–2.5s (slower than ABR)
- B-roll inserts limited to ~20% of runtime
- Silent-runtime quota: ≥ 20%

### 6.3 Format Skin 3 — Whiteboard / Visual Prop Explainer

**What it is:** Hand draws or writes on a surface (whiteboard, paper, tablet, glass) while VO explains. Sometimes the actor's face appears, sometimes only hands. Time-lapsed for compression.

**Best for:** Step-by-Step (Structure 2), Mechanism beats, technical concepts that benefit from a sketched diagram.

**Scene defaults:**
- Hand + writing surface dominate frame (EBA + VWFA + LOC co-firing)
- Speed ramped 2–3× for compression
- VO continuous, drawing synced to spoken concepts
- Cut rhythm: 1 transition every 2–4s (whiteboard wipes, sketch reveals)
- Silent-runtime quota: ≥ 30%

### 6.4 Format Skin 4 — Two-Person Dialogue (Clone / Debate)

**What it is:** Two actors in 2-shot or rapid cross-cuts, exchanging the script as a debate, interrogation, or smart-vs-dumb contrast. Often the same actor double-played in post.

**Best for:** Comparison (1), Smart vs Dumb (4), Do vs Don't (5), Myth Bust (6) when myth and reality are personified.

**Scene defaults:**
- 2-Shot MLS or OTS cross-cuts
- Cut rhythm: 1 cut per dialogue exchange (~1.0–1.5s per beat)
- Distinct wardrobe / lighting per actor to disambiguate
- Silent-runtime quota: ≥ 25%

### 6.5 Format Skin 5 — Hybrid (Reaction Inserts in ABR)

**What it is:** ABR backbone with brief talking-head inserts at high-emotion moments (Hook last beat, Reinforcement, CTA).

**Best for:** Story Framework (3), Before-After (11), PAS (9) — where ABR carries the journey but a face is needed for the resolve.

**Scene defaults:**
- Actor on camera ~20–40% of runtime (concentrated in 2–3 scenes)
- VO carries body; talking-head carries hook and lesson
- Silent-runtime quota: ≥ 35%

### 6.6 Auto-Selection Logic (when format_override = auto)

| Phase-2 input | Default Format Skin |
|---|---|
| `content_complexity = research_heavy` AND `actor_count = 0` | **ABR** |
| `content_complexity = research_heavy` AND `actor_count ≥ 1` | **Hybrid** |
| `content_complexity = mid`, Education structures (2, 7, 8, 10) | **Whiteboard** or **ABR** |
| `content_complexity = mid`, Comparison structures (1, 4, 5, 6) | **Two-Person Dialogue** or **ABR** |
| `content_complexity = mid`, Story / Trust (3, 11) | **Hybrid** |
| `content_complexity = lifestyle`, any | **ABR** (founder face in inserts only) |
| `reference_video.match_target = format` | Match the reference's format |

### 6.7 Format Skin → Structural Beat Mapping

| Phase-2 Timing Beat | Default Format Skin (research_heavy) | Default Format Skin (lifestyle) |
|---|---|---|
| 0–1s VISUAL HOOK | ABR | ABR |
| 1–3s AUDIO HOOK | ABR | ABR |
| 3–8s PROOF ANCHOR | ABR (with on-screen decoder) | ABR |
| 8–15s IMPLICATION | ABR (with on-screen decoder) | ABR |
| 15–25s MECHANISM/SOLUTION | Whiteboard or ABR | ABR (process B-roll heavy) |
| 25–30s DEMONSTRATION | ABR (screen recording / animation) | ABR (process B-roll) |
| 30–35s CTA | Hybrid (Talking-head freeze) | Hybrid (Talking-head freeze) |

The Hybrid Talking-Head appears only at the end — intentional. After the demonstration-heavy ABR body, the talking-head reveal at the CTA creates a parasocial-trust closure beat that converts views into action.

---

## 7. NEUROSCIENCE FOUNDATION

### 7.1 Cortical Targets and Production Implications

| Brain Region | Stimulus (TRIBE v2) | Phase-3 Implication |
|---|---|---|
| **V1–V4** (~50–80ms) | High contrast, edges, color | High-key on hook; saturated key colors on titles; never blend talent into background |
| **MT/V5** (~100ms) | Motion, scene change | Hook MUST contain motion in frame 1 — gesture, whip pan, prop entry, push-in, or scene change |
| **FFA** (~170ms) | Face | If actor present, CU/MCU eye-level by 0.5s. In zero-actor ABR, a face appears in B-roll insert by 1.5s minimum |
| **EBA** (~190ms) | Body, hands, gestures | Demonstration scenes show hands in frame; never "floating heads" |
| **PPA** (~200ms) | Scenes, places | Story/Before-After benefits from a wide establishing shot |
| **VWFA** (~200ms) | Written text, numbers | Every scene plans an on-screen text element. Numbers > words |
| **LOC** (~200ms) | Tools, objects | Demonstration scenes hero a single object |
| **A1/A5** (0–150ms) | Voice onset, prosody | First phoneme at t=0.000s — no dead air |
| **STS / Language network** | Speech | Caption synced word-by-word; direct address ("you") |
| **TPJ** | Emotional prosody | Trust beats: voice carries emotion congruent with B-roll content |
| **DMN** | "You / your" | Second-person pronouns mandatory in dialogue and captions |
| **Prefrontal** | Numbers, paradox | On-screen number must appear simultaneous with audible mention — dual coding |
| **TPO Junction** | Visual + Audio + Text fired in 0–1.5s | Hook scene must satisfy all three modalities in 0–1.5s window; this is the 50% multimodal integration boost |

### 7.2 Neural Processing Timeline (first 3s) — Production Beat Sheet

```
t=0.000s   Light hits retina         → Frame 1 contains motion + contrast (face optional in ABR)
t=0.050s   V1–V4 fires               → High-contrast, saturated, sharp edges in frame
t=0.100s   MT/V5 fires (motion)      → Something MUST move
t=0.150s   A1 voice onset            → First VO phoneme at t=0.0s (no dead air)
t=0.170s   FFA face detection        → Face (B-roll or actor) in frame
t=0.190s   EBA body detection        → Hands/body visible if applicable
t=0.200s   PPA + VWFA + LOC          → Background + on-screen text + hero object parsable
t=0.250s   Amygdala                  → Emotional salience evaluation
t=0.300s   Language network          → First VO word fully decoded
t=0.500s   DMN                       → "You / your" should have appeared by now
t=1.000s   TPO junction              → All three modalities have fired and integrated
t=1.500s   Executive network         → SCROLL or STAY decision — point of no return
t=3.000s   Full language propagation → First VO sentence fully processed
```

---

## 8. HOLLYWOOD CAMERA LANGUAGE

### 8.1 Shot Sizes

| Code | Name | Frame contents | Use |
|------|------|----------------|-----|
| ECU | Extreme Close-Up | Eyes only, or screen detail | Reaction reveal, text reveal, micro-detail proof |
| CU | Close-Up | Head + top shoulders | Hook scene — FFA + emotional payoff |
| MCU | Medium Close-Up | Chest up | Default presenter shot |
| MS | Medium Shot | Waist up | Demonstration with hands |
| MLS | Medium Long Shot | Knees up | 2-shot for Comparison |
| LS | Long Shot | Full body | Story establishing, Before/After full reveal |
| ELS | Extreme Long Shot | Wide environment | Story setup, location context |
| 2-Shot | Two-Shot | Two actors side or facing | Clone, Comparison, debate |
| OTS | Over-the-Shoulder | Foreground shoulder, focus on subject | Story conflict, dialogue reveal |
| POV | Point-of-View | What character sees | "Here's what you'd see on your phone" |
| Insert | Insert / Detail | Object, screen, hand | Proof beat, prop reveal — LOC/VWFA |

### 8.2 Camera Angles

| Angle | Effect | Use |
|-------|--------|-----|
| Eye-level | Neutral, direct, equal | Default — parasocial trust, DMN |
| Slightly low (~10°) | Subject confident, authoritative | Authority, hook |
| Slightly high (~10°) | Subject vulnerable, conspiratorial | Story emotional low |
| Hard low (worm's eye) | Heroic, dominant | One-off impact moments |
| Hard high (bird's eye) | Map view, schematic | Demonstration of flat layout |
| Dutch tilt (~15°) | Tension, instability | Myth-bust contradiction |
| Profile (90°) | Detached, observational | Before/After "wrong way" |
| 3/4 (45°) | Cinematic, dimensional | Mood/Story beats, never the hook |

### 8.3 Camera Movement

| Movement | Effect | Use |
|----------|--------|-----|
| Static / Locked | No movement | Insert shots, text reveals |
| Handheld micro | Subtle continuous shake | Default ABR talking-head shots |
| Push-in (slow dolly in) | Intensifies, "listen up" | Hook punchline, "here's why" |
| Pull-out | Reveals context, releases tension | End of demonstration |
| Whip pan | Energy injection, transition | Smart vs Dumb cuts, list items |
| Pan | Horizontal reveal | List items, environment reveal |
| Tilt | Vertical reveal | Cost breakdown reveal |
| Orbit / Arc | Dynamic 3D | Product hero |
| Crash zoom | Punctuation | Reaction beats, "wait WHAT" |
| Speed-ramp push-in | Hyper-emphasis | ONE peak moment per video |
| Gimbal walk | Steadicam-smooth | Story decision beat |
| Micro-jolt | 0.1s handheld shake at 0.0s | Pattern interrupt, scroll stopper |

### 8.4 Lens Equivalents

| Focal length | Look | Use |
|---|---|---|
| 24mm wide | Slight distortion, environmental | ELS/LS, "show whole room" |
| 35mm semi-wide | Documentary natural | LS/MS, story setup |
| 50mm normal | Human eye perspective | Default MCU |
| 85mm short tele | Flattering, subject isolation | CU, hero portrait |
| 100mm+ tele | Heavy compression | ECU, dramatic isolation |
| Macro | Extreme close-up | Insert of text, phone screen, product |

### 8.5 Framing & Composition

| Rule | Spec |
|------|------|
| Aspect ratio | 9:16 (1080×1920) default; 1:1 (1080×1080); 16:9 (1920×1080) |
| Safe zones (9:16) | Top 10% reserved (platform UI); bottom 25% reserved (caption + UI); critical action in middle 65% |
| Headroom | ~5–8% from top for MCU/MS; minimal for CU |
| Lead room | If subject looks one way, leave 60% in that direction |
| Rule of thirds | Eyes upper-third line; key text on lower-third; hero object on thirds intersection |
| Eyeline to lens | Default direct (parasocial); off-axis ~15° only for "talking to someone else" |
| 9:16 text safe zones | Top band 12–18%; bottom caption band 75–88%; center hero 35–50% |

---

## 9. HOLLYWOOD LIGHTING LANGUAGE

### 9.1 Setup Templates

| Template | Fixtures | Look | Use |
|----------|----------|------|-----|
| 3-Point Bright (default) | Key 45° front-side soft + Fill 50% + Backlight rim | Clean, modern social | Default talking-head, Education, Authority |
| 3-Point Moody | Key 45° harder + Fill 20% + Cool backlight | Cinematic, story tone | Trust/Story, emotional low |
| High-Key | Multiple soft, near-shadowless | Bright, optimistic | Health/lifestyle, "after" state |
| Low-Key | Single hard key, no fill, strong backlight | Dramatic single-source | Myth-bust wrong way, Cost reveal |
| Practical-Driven | Visible in-frame lamps + minimal fill | Naturalistic | Story setup, slice-of-life |
| Split (Rembrandt) | Key 90° side only | Stark, half-shadow | Tension, "the dark side" |
| Backlit Silhouette | Strong back, no key | Mystery | Hook reveal — face hidden until reveal |
| Color-Block Practical | Saturated gel on backlight | Trendy, brand | Hook scene for brand-recognizable look |

### 9.2 Key Direction & Quality

| Direction | Effect | Notes |
|-----------|--------|-------|
| Front-side 45° | Standard flattering | Default |
| Front 0° (camera direction) | Flat, beauty | High-key, kills dimension |
| Side 90° | Half-lit | Rembrandt |
| Back-side 135° | Most face in shadow | Mystery |
| Top-down | Eye sockets in shadow | Avoid unless intentional |
| Bottom-up (uplight) | Horror | Comedic only |

### 9.3 Color Temperature & Mood

| Temp | Color | Mood | Use |
|------|-------|------|-----|
| 3200K Tungsten | Warm orange | Cozy, evening | Story, Trust |
| 4500K Neutral | Balanced | Documentary | Default |
| 5600K Daylight | Cool blue | Clinical, awake | Authority, scientific |
| Magenta/Pink gel | Saturated pink | Trendy lifestyle | Hook attention pop |
| Teal/Cyan gel | Saturated blue-green | Cinematic sci-fi | Brand consistency |
| Amber/Orange gel | Saturated warm | Sunset, hope | Before/After "after" |

### 9.4 Key-to-Fill Ratios

| Ratio | Look | Use |
|-------|------|-----|
| 1:1 | Flat, no shadow | Beauty / high-key |
| 2:1 | Soft, mild dimension | Default |
| 4:1 | Cinematic | Story/Trust |
| 8:1 | Dramatic, deep | Low-key tension |
| No fill | Hard shadow | Silhouette, Split |

---

## 10. ACTOR / TALENT DIRECTION

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

### 10.4 Expression Vocabulary (concrete, observable)

| Category | Descriptors |
|----------|-------------|
| Curious | Eyebrows slightly raised, head tilted ~10°, eyes wide, slight forward lean |
| Confident | Steady gaze, neutral mouth or slight closed smile, shoulders back |
| Shocked | Eyebrows fully raised, eyes wide, mouth slightly open, freeze 0.3s |
| Conspiratorial | Forward lean, eyebrows down, half-smile, glance off-camera then back |
| Authoritative | Steady gaze, chin slightly down, neutral mouth, minimal movement |
| Excited | Open-mouth smile, raised brows, animated head, hands in frame |
| Concerned | Brow slightly furrowed, mouth flat, head still |
| Disbelief | One eyebrow up, slight head shake, half-smile |
| Revelation | Eyes light up (catch light), small "aha" nod, mouth opens to deliver |

### 10.5 Eye Contact Direction

| Direction | Use |
|-----------|-----|
| Direct to lens | Default — parasocial trust, DMN |
| Off-camera ~15° | Storytelling beat, "talking to someone else" |
| Down to prop/screen | Demonstration, reveal |
| Glance off then back | Conspiratorial / "you won't believe this" |
| Closed (eyes down) | Story conflict / emotional low — 0.5s max |

### 10.6 Energy Scale (1–10)

| Level | Voice | Body | Use |
|-------|-------|------|-----|
| 1–2 | Whisper, intimate | Still | Conspiratorial reveal, soft Story |
| 3–4 | Conversational | Subtle gestures | Education body, Story narration |
| 5–6 | Energized | Active gestures | Default hook delivery |
| 7–8 | Projected | Big gestures, full engagement | Comparison hook, Smart vs Dumb |
| 9–10 | Near-shouting | Whole body | ONE peak moment per video |

### 10.7 Pace

| Pace | Wpm | Use |
|------|-----|-----|
| Slow | ~120 | Story emotional low, gravity beats |
| Conversational | ~150 | Default explainer body |
| Fast | ~180 | Hook, urgency, list items |
| Rapid | ~210 | Pattern-disruption, "wait wait wait" |
| Variable | Speeds up/slows down within line | **Highest engagement — prevents auditory adaptation** |

### 10.8 Tone (from Phase-2 audio prosody emotion)

| Phase-2 emotion | Delivery direction |
|---|---|
| curiosity | Lifting intonation, audible breath before keyword |
| urgency | Faster, slightly pressed, no breath between words |
| concern | Lower pitch, slower, brow pre-furrowed |
| authority | Even pitch, controlled, no upward inflection on statements |
| excitement | Higher pitch, faster, smile in voice |
| disbelief | Dropped pitch at keyword, slight scoff before/after |

### 10.9 Body Language & Blocking

- **Hands-in-frame rule (EBA):** For any scene tagged with `body` trigger, hands MUST enter frame within first 1s. Education/Step structures keep hands visible throughout.
- **Open-palm rule:** Open palm = trust. Closed fist = emphasis. Pointing at lens = direct address (max 1× per video).
- **Lean:** Forward lean ~5° = engagement. Backward = "step back, let this land." Side = transition.
- **2+ actors blocking:** Actor A frame-left, Actor B frame-right (mirror only for last-line reversal). Cross only on cuts.

---

## 11. STACCATO DIALOGUE ENGINE

### 11.1 The Staccato Beat System

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

### 11.2 Line-Level Rules

| Rule | Specification | Example |
|------|--------------|---------|
| **Max words per beat** | 8 | "Your fMRI pipeline is obsolete." (5 words — too long; split: "Your pipeline. Obsolete.") |
| **Emphasis** | 1–2 words underlined or ALL CAPS | "AI predicts brains BETTER than humans." |
| **Pauses** | Breathing points: "..." or "(pause)" | "We trained on one thousand hours... (pause) ...and it learned." |
| **Forbidden words** | "revolutionary", "unlock", "discover", "amazing", "groundbreaking", "innovative", "literally", "actually", "basically", "honestly", "really" | Replace with specific metrics or concrete verbs |
| **Syllables** | Prefer short, punchy words | "brain scan" > "neuroimaging session" |
| **Contractions** | Use "don't", "it's", "can't", "you're" | Conversational, natural, faster delivery |
| **Questions** | Max 1 per video; hooks only | "What if AI predicts your brain better than you do?" |
| **You/Your count** | Min 2 per 10 words | Direct address activates default mode network |
| **Bridge words** | Every beat must connect to next via action, not conjunction | Actor points at prop → next beat. Actor slams desk → next beat. |
| **Cult hopping** | In-group language | "If you're still using Nilearn manually..." "BIDS people know..." |
| **Readability target** | Hook + CTA: ~5th-grade Hemingway equivalent. Body: technical terms allowed only when paired with on-screen text decoder | |

### 11.3 Pronunciation & Delivery Notes

Embed pronunciation guidance in action parentheticals:
- **Technical terms:** "fMRI" → /ˈɛf ˈɛm ˈɑːr ˈaɪ/ — say each letter clearly
- **Acronyms:** "FFA" → /ˈɛf ˈɛf ˈeɪ/ — slight pause between letters
- **Numbers:** "1,115" → "eleven fifteen" (fast) or "one thousand one hundred fifteen" (emphatic); specify in parenthetical
- **Foreign names:** "d'Ascoli" → /dɑːsˈkoʊli/ — soft 'd', accent on 'sco'
- **Emphasis markers:** Underline = slight pitch rise; ALL CAPS = full volume + 0.2s hold
- **Staccato delivery:** Each beat = sharp, detached, no legato. Like a drummer hitting snare.

### 11.4 Dialogue Pacing by Structure

| Structure Family | Words Per Second | Pause Between Beats | Energy Curve |
|------------------|-----------------|---------------------|--------------|
| Decision (1,4,5,6) | 4.0–5.0 WPS | 0.3s | High→Higher→Peak at CTA |
| Education (2,7,8,9) | 3.0–4.0 WPS | 0.4s | Steady, instructional |
| Trust (3,11) | 2.5–3.5 WPS | 0.5s (emotional) | Variable, emotional arc |
| Proof (12,13,14,15) | 3.0–4.0 WPS | 0.4s | Measured, authoritative |

### 11.5 Multi-Language Delivery Tags

| Tag | Use | Script Example |
|-----|-----|----------------|
| `[EN]` | Pure English | "The model predicts." |
| `[HI]` | Pure Hindi (Devanagari in captions) | "[HI] मॉडल भविष्यवाणी करता है" |
| `[TA]` | Pure Tamil (Tamil script in captions) | "[TA] மாதிரி கணிக்கிறது" |
| `[HIN-EN]` | Hinglish — code-switch (Roman script) | "[HIN-EN] ye model predict karta hai" |
| `[TAM-EN]` | Tanglish — code-switch (Roman script) | "[TAM-EN] indha model predict pannuthu" |

**Code-switching rules:**
- Technical/scientific terms stay English in all languages
- Connectives, descriptors, emotion in target language
- Example Hinglish: "ye AI [HIN-EN] brain ke andar dekh leta hai, bina scan ke"
- Example Tanglish: "[TA] indha AI [TAM-EN] brain-ah scan illaama paaththuduthu"
- Brand names always English script
- Numbers: digitize in all languages ("73%" not "seventy-three percent")

---

## 12. AUDIO DESIGN

### 12.1 Voice Source

| Source | Use |
|--------|-----|
| **Voiceover (VO) over B-roll** | **ABR default** — VO carries the line, B-roll/demonstration shows it |
| On-camera (lavalier) | Talking-head and Hybrid skins |
| VO over silent actor | Stylized — actor mouths or moves while VO carries |
| Synced lip + VO doubled | Rare — emphasis effect |
| No voice (silent moment) | Reaction reveals, text-only beats, prop reveals |

### 12.2 Background Music Cue Library

| Cue | Tempo / Mood | Use |
|-----|--------------|-----|
| No music | Silence | Hook scene first 0.5s |
| Subtle ambient pad | 60 bpm, atmospheric | Trust/Story narration |
| Soft pulse | 90 bpm, light kick | Education body |
| Building energy | 90→120 bpm rising | Pre-payoff escalation |
| Beat drop | Hard kick on the 1 | Hook-to-body transition |
| Rising tension synth | Drone with rising pitch | Myth-bust contradiction, Cost total |
| Triumphant resolve | Major chord swell | Before/After "after", CTA |
| Hard cut to silence | All audio drops | Emphasis — 0.5s silence before key word |
| Trending sound | Platform audio | Flag for music supervisor |

### 12.3 SFX Library

| SFX | Use |
|-----|-----|
| Whoosh | Whip pan transitions, list entries |
| Pop / Click | On-screen text entries |
| Thud / Impact | Punchline land, "no" reaction |
| Ding / Notification | Insight beat, "here's why" |
| Cash register | Cost/value reveal |
| Vinyl scratch | Pattern interrupt, "wait what" |
| Heartbeat | Tension, Story emotional low |
| Glitch / Stutter | Myth-bust contradiction |
| Reverse swell | Pre-reveal builder |
| Record scratch | Myth-bust contradiction, "ACTUALLY..." |
| Bass drop | Reveal, CTA emphasis |

### 12.4 Mix Levels

| Element | Default |
|---------|---------|
| Voice (VO or lav) | -6 dB to -3 dB |
| Music bed | -18 to -15 dB; ducks to -24 dB under voice |
| SFX | -12 to -8 dB |
| Silence | -inf dB |

### 12.5 Voice Pattern Break (PersonalBrandLaunch Technique)

- **Whisper start:** 0:00–0:01 at low volume, then normal volume at 0:01 for impact
- **Silence beat:** 0.3s dead air, then single impact word
- **Tempo shift:** Fast→slow or slow→fast within the same sentence
- **Pitch drop:** End hook on a lower pitch for authority, higher for curiosity

---

## 13. VISUAL ELEMENT DESIGN

### 13.1 On-Screen Text

| Property | Hook | Body | CTA |
|----------|------|------|-----|
| Font family | Bold sans-serif (Inter Bold, Montserrat ExtraBold, Helvetica Black) | Same | Same |
| Font weight | 800–900 | 600–700 | 800–900 |
| Font size (9:16) | 96–120pt hero | 56–72pt caption | 84–96pt |
| Color | High-contrast (white on dark, neon yellow on neutral) | White + black outline | Brand or white |
| Outline | 4–6px black stroke | Yes | Yes |
| Position | Hero: middle 40%; Caption: bottom 25% | Caption: bottom 25% | Center, lower-third |
| Word count per block | 1–5 hero | 5–7 caption | 1–5 |
| Lines | 1–2 | 2 max | 1–2 |
| Animation in | Pop-in (scale 0→1.05→1.0 in 200ms) | Word-by-word pop synced to speech | Pop-in + bounce |
| Duration | 1.0–2.0s hero | Synced to speech | Hold 1.0–1.5s on end card |
| Highlight word | 1 per block in CONTRAST or larger | Same | Brand color |

### 13.2 Props

Each prop specifies: name, entry, in-scene action, neural-target purpose.

### 13.3 Background

- Color/texture
- Distance from subject (3–6 ft preferred)
- Texture density (low for hero shots)
- Practical lights visible if any

### 13.4 Graphic Overlays

- Arrows / circles — pointing at result, key text
- Progress bar — Step structures
- Split-screen divider — Comparison / Smart vs Dumb
- Animated charts — Proof / Cost — must show actual paper figure data
- Brain map overlay — TRIBE v2 figure reference (from `research_integrity.figure_reference`)

### 13.5 B-Roll / Insert Plan

ABR is dominated by B-roll. Every scene lists available B-roll sources:
- Custom-shot demonstration (hands, prop in use, screen recording)
- Result-state imagery (the brain map, the after photo, the chart)
- Archival / royalty-free (fMRI scanner footage, NASA imagery, historical clips)
- Screen capture (real software, real data)
- Animated graphics (motion graphics built in post)
- Stock fallback (last resort)

**Stock-footage-with-voice is the LOWEST tier of demonstration** and should be used only when custom shooting is impossible (rare archival material, NASA imagery, fMRI scanner shots, etc.).

---

## 14. EDITING DIRECTION

### 14.1 Cut Types

| Cut | Use |
|-----|-----|
| Hard cut | Default — 90% of cuts |
| J-cut (next audio leads) | Smooth narrative, "and then..." |
| L-cut (current audio tails) | Continued thought across visual change |
| Match cut | Visual A matches shape/position of visual B |
| Jump cut | Same subject, slight skip — energy, removes pauses |
| Smash cut | Hard cut to radically different image | Pattern interrupt |

### 14.2 Transitions

| Transition | Use |
|-----------|-----|
| Hard cut | 90% default |
| Whip pan | Energy injection, list transitions |
| Speed ramp | Pre-payoff emphasis |
| Match-cut | Object-to-object transformation |
| Cross dissolve | Rare — time-jump or dream |
| Flash cut | Surprise reveal |

### 14.3 Caption Style

| Property | Default |
|----------|---------|
| Font | Bold sans-serif (Inter Bold or platform default) |
| Size | 48–56pt (9:16) — 2-line max |
| Color | White + 4px black outline + 60% opacity black pill |
| Position | Lower-third (75–88% from top) |
| Animation | Word-by-word pop, OR 2-word-pair pop |
| Highlight word | 1 per block in brand accent color |
| Max words/block | 5–7 |
| Max lines | 2 |
| Read time | ≤ 1.2s per block |
| Staccato sync | Each beat gets its own caption line, timed to the pause |

### 14.4 Speed Ramps

- Normal (1.0×) — default
- Slight slow (0.8×) — emphasis, micro-expression hold
- Slow-mo (0.5×) — payoff micro-moment (0.5–1.0s)
- Speed up (1.5–2.0×) — process compression
- Speed-ramp push (1.0× → 0.5× over 0.3s) — drama on a word

### 14.5 Color Grade

| Grade | Look | Use |
|-------|------|-----|
| Clean modern | Slight contrast lift, true skin tones, mild teal shadows | Default |
| Warm trust | Lifted warms, soft contrast | Story / Trust |
| Cool tech | Lifted blues, crisp contrast | Authority / scientific |
| High-contrast punch | Strong contrast, saturated brand color | Hook beats |
| Desaturated drama | Reduced saturation, deep shadows | "Wrong way" / Cost |

### 14.6 Pattern Interrupt Schedule

Every video must have 2–4 planned interrupt points:

| Timestamp | Interrupt Type | Example |
|-------------|----------------|---------|
| 0:00–0:01 | Visual jolt | Instant zoom to face, or prop slam, or color flash |
| 0:01–0:03 | Verbal hook | Staccato beat + text pop-in |
| 0:10–0:14 | Step cut | New angle + caption emphasis + sound stinger |
| 0:22–0:26 | Mistake reveal | Before/after snap, or wrong/right split |
| 0:33–0:38 | Fast recap | Rapid montage + final CTA line |

---

## 15. NEURAL → CAMERA / LIGHTING / DIRECTION MAPPING

For every Phase-2 `hooks.visual.neural_targets` entry, Phase-3 selects matching production decisions:

| Phase-2 Neural Target | Camera | Lighting | Direction | Visual |
|---|---|---|---|---|
| **FFA (face)** | CU/MCU, eye-level, 50–85mm, face ≥30% frame | Front-side 45°, 2:1, soft | Eyes to lens, expression congruent, energy 5+ | Face is hero — actor OR B-roll face |
| **EBA (body/hands)** | MS waist-up showing hands; 35–50mm | 3-Point Bright, even on hands | Hands enter frame in 1s | Hands holding/pointing at prop |
| **PPA (scene/place)** | LS/ELS establishing; 24–35mm wide | Practical-Driven or High-Key | Actor secondary to environment | Environment carries semantic load |
| **VWFA (text/numbers)** | Insert/ECU on text; static or slow push-in | High-key on text | N/A or gesture toward text | Bold, ≤5 words, highlight in contrast color |
| **MT/V5 (motion)** | Push-in OR whip pan OR handheld micro OR gesture | Any | Active movement | Something moves in first 0.1s |
| **V1–V4 (contrast)** | Any | High-key OR strong contrast ratio | N/A | High-contrast text colors |
| **LOC (object)** | Insert OR MS with prop hero; 50–85mm | Key + Backlight separates object | Hands frame prop | Prop is hero — clean BG |
| **A1/A5 (audio onset)** | Any | Any | First phoneme at t=0.0s | Voice cue at exact frame 0 |
| **STS / Language** | Any (often MCU in talking-head; B-roll in ABR) | 3-Point Bright | Clear articulation, direct address | Caption word-by-word synced |
| **TPJ (emotional prosody)** | CU/MCU | 3-Point Moody (4:1) | Expression precedes line by 0.2s | Emotion in voice + face |
| **DMN (self-ref)** | MCU direct-to-lens (talking-head) OR caption "you" highlighted (ABR) | 3-Point Bright | Direct address "you/your" | Caption shows "you" highlighted |
| **Prefrontal (numbers)** | Insert + simultaneous MCU cut | Any | Number spoken with digit emphasis | On-screen number simultaneous — DUAL CODING mandatory |
| **TPO Junction (convergence)** | Hook scene — all three modalities in 0–1.5s | High-contrast hero | Face/B-roll + emotion + direct address + first-word onset all at t=0.0–0.5s | Caption + visual + voice all firing in 0–1.5s |

---


## 16. THE 100 HOOK FORMULA LIBRARY

Reference library for hook *recognition* and *delivery-rule application*. Phase-2 generates hook content; Phase-3 recognizes which formula pattern was used and applies formula-specific prosody, cut timing, and on-screen text rendering.

Each formula has: number, category, template, best-fit Phase-2 structures, neural rationale, neuroscience-research example, Indian-beauty example.

### Category 1 — Curiosity Gap Hooks (8 formulas)

**1. The Open Referent** — "The one thing [X] don't tell you about [Y]"
- Best for: Structures 1, 6, 11
- Neural: Default Mode Network sustained engagement to resolve open reference
- Neuro: "The one thing neuroscientists don't tell you about your brain scans"
- Beauty: "The one thing dermatologists don't tell you about niacinamide"

**2. The Hidden Cost** — "What [X] actually costs you (it's not money)"
- Best for: 9, 15
- Neural: Prefrontal cost-benefit re-evaluation
- Neuro: "What scanning a brain actually costs you (it's not money)"
- Beauty: "What cheap face wash actually costs you (it's not money)"

**3. The Inversion** — "Why [popular thing] is actually [opposite]"
- Best for: 6, 4
- Neural: Mismatch negativity (auditory cortex surprise response)
- Neuro: "Why bigger fMRI scanners are actually slower"
- Beauty: "Why 'gentle' face wash is actually drying your skin"

**4. The Disappearing Fact** — "By the time you finish this video, [X happens]"
- Best for: 9, 12
- Neural: Temporal anchoring + urgency
- Neuro: "By the time you finish this, an AI will have predicted 10,000 brain scans"
- Beauty: "By the time you finish this, your skin barrier is repairing itself"

**5. The Closed Loop** — "I [did X] for [N days]. Here's what happened."
- Best for: 11, 12, 3
- Neural: Story-loop opening (must close = sustained attention)
- Neuro: "I let an AI predict my brain activity for 30 days. Here's what happened."
- Beauty: "I used only one ingredient on my face for 14 days. Here's what happened."

**6. The Locked Door** — "There's a [thing] [most people / experts] never see"
- Best for: 6, 13
- Neural: Privilege-access curiosity, DMN engagement
- Neuro: "There's a brain map most neuroscientists never see"
- Beauty: "There's a step in skincare most people never do"

**7. The Number That Doesn't Add Up** — "[N] [things]. Only [M] of them [do the thing]."
- Best for: 7, 15
- Neural: Prefrontal quantitative paradox
- Neuro: "1,000 hours of fMRI. Only 4 subjects. Yet it predicts 720 brains."
- Beauty: "20 ingredients. Only 3 of them actually moisturize."

**8. The Almost** — "Almost [demographic] don't know [thing]"
- Best for: 6, 9
- Neural: Social proof + curiosity + DMN
- Neuro: "Almost no working neuroscientist knows TRIBE v2 exists"
- Beauty: "Almost no Indian woman knows what 'pH balanced' actually means"

### Category 2 — List-Based Hooks (8 formulas)

**9. The Numbered Promise** — "[N] [things] that [verb] in [N seconds/minutes]"
- Best for: 7, 2
- Neural: VWFA + Prefrontal (specific number)
- Neuro: "5 brain regions TRIBE v2 predicts in under 200 milliseconds"
- Beauty: "3 face wash mistakes that age you in 30 days"

**10. The Tiered List** — "Beginner, intermediate, expert: [N] levels of [X]"
- Best for: 8
- Neural: PPA + sequence prediction
- Neuro: "Beginner, intermediate, expert: 3 levels of fMRI analysis"
- Beauty: "Beginner, intermediate, expert: 3 levels of skincare layering"

**11. The Ranked Reveal** — "[N] [things]. Ranked from [bad] to [best]"
- Best for: 7, 1
- Neural: V1–V4 contrast + Prefrontal ordering
- Neuro: "5 brain encoding models. Ranked from useless to TRIBE v2"
- Beauty: "5 vitamin C serums. Ranked from worst to best"

**12. The Quick-Win List** — "[N] [things] you can [do/try/use] today"
- Best for: 7
- Neural: DMN + Prefrontal (actionable)
- Neuro: "3 brain papers you can read in under an hour today"
- Beauty: "3 skincare swaps you can make today"

**13. The "Stop and Start" List** — "Stop doing [N things]. Start doing [N better things]."
- Best for: 5, 7
- Neural: Pattern interrupt + DMN
- Neuro: "Stop using linear regression. Start using transformers."
- Beauty: "Stop using foaming cleansers. Start using milk cleansers."

**14. The Buried List** — "[N] things [authority figure] doesn't want you to know"
- Best for: 6, 7
- Neural: Mistrust framing + curiosity
- Neuro: "3 things neuroscientists don't want you to know about brain scans"
- Beauty: "3 things skincare brands don't want you to know about 'natural'"

**15. The Acronym List** — "[A]. [B]. [C]. Your [thing] in 3 letters."
- Best for: 7, 8
- Neural: VWFA (acronym is single fixation) + memorability
- Neuro: "V. A. T. Vision. Audio. Text. Your brain in 3 channels."
- Beauty: "C. E. F. Vitamin C. Vitamin E. Ferulic acid. Your serum in 3 letters."

**16. The Time-Boxed List** — "[N] [things] in [N seconds/minutes]"
- Best for: 7, 12
- Neural: Urgency + Prefrontal
- Neuro: "5 brain regions in 30 seconds"
- Beauty: "5 skincare ingredients in 30 seconds"

### Category 3 — Story-Driven Hooks (8 formulas)

**17. The Personal Stake** — "I [did X] so you don't have to"
- Best for: 3, 11
- Neural: DMN (self-ref) + TPJ (trust)
- Neuro: "I read 700 brain papers so you don't have to"
- Beauty: "I tried 47 vitamin C serums so you don't have to"

**18. The Moment of Realization** — "The day I realized [X] was when [Y]"
- Best for: 3, 11
- Neural: TPJ + narrative memory
- Neuro: "The day I realized neuroscience was broken was the day TRIBE v2 dropped"
- Beauty: "The day I realized I'd been washing wrong was when my dermatologist screamed"

**19. The Failure Open** — "I failed at [X]. Here's what worked instead."
- Best for: 3, 11, 9
- Neural: TPJ + vulnerability trust
- Neuro: "I tried to scan my own brain. I failed. Here's what worked instead."
- Beauty: "I tried every retinol. They all burned me. Here's what worked instead."

**20. The Mentor Hook** — "[Authority figure] told me [X]. I didn't believe him until [Y]."
- Best for: 3, 6
- Neural: TPJ + authority transfer
- Neuro: "A FAIR researcher told me TRIBE v2 was real. I didn't believe him until I saw the brain map."
- Beauty: "My grandmother told me to use besan. I didn't believe her until 3 weeks later."

**21. The Day-N Story** — "Day [N] of [doing X]. The result is [Y]."
- Best for: 12, 11
- Neural: Time-anchoring + DMN
- Neuro: "Day 30 of testing TRIBE v2. It predicted brain scans we hadn't shown it."
- Beauty: "Day 14 of using rice water. My skin started doing something weird."

**22. The Childhood Open** — "When I was [age], [X] happened. It still affects [my work / my face / my Y]."
- Best for: 3
- Neural: Long-term memory + TPJ
- Neuro: "When I was 12, my grandmother had a stroke. That's why I care about brain scans."
- Beauty: "When I was 14, my acne ruined my school photos. Here's what I'd tell my younger self."

**23. The "I Used To" Frame** — "I used to [bad behavior]. Now I [good behavior]. Here's what changed."
- Best for: 11, 4
- Neural: DMN (transformation arc)
- Neuro: "I used to think bigger scanners meant better data. Then TRIBE v2 happened."
- Beauty: "I used to layer 7 products. Now I use 3. My skin is better."

**24. The Insider Story** — "Inside [authority place], [X] happens. You're not supposed to know."
- Best for: 3, 6
- Neural: Privilege-access curiosity
- Neuro: "Inside Meta FAIR, they're predicting brains they've never scanned."
- Beauty: "Inside skincare labs, they call the cheap ingredient by another name."

### Category 4 — Problem-Solve Hooks (9 formulas)

**25. The Specific Pain** — "If you have [specific problem], try [solution]"
- Best for: 9, 2
- Neural: DMN (self-relevance) + Prefrontal
- Neuro: "If you can't afford fMRI access, try TRIBE v2 zero-shot mode"
- Beauty: "If you have hormonal acne on your jaw, try this one change"

**26. The Counterintuitive Fix** — "The fix for [X] isn't more [Y]. It's less."
- Best for: 6, 4
- Neural: Mismatch negativity
- Neuro: "The fix for low fMRI signal isn't more scanning. It's a better model."
- Beauty: "The fix for oily skin isn't more cleansing. It's moisturizing more."

**27. The Five-Minute Promise** — "Fix [problem] in 5 minutes"
- Best for: 2, 9
- Neural: Urgency + Prefrontal
- Neuro: "Predict a brain region in 5 minutes (no scanner needed)"
- Beauty: "Fix dehydrated skin in 5 minutes"

**28. The Stop-Doing** — "If you do [X], stop. Here's why."
- Best for: 5, 6
- Neural: Pattern interrupt + DMN
- Neuro: "If you train a linear encoder on fMRI, stop. Here's why."
- Beauty: "If you use St. Ives apricot scrub, stop. Here's why."

**29. The Wrong Tool** — "You're using the wrong [tool] for [task]"
- Best for: 4, 5, 6
- Neural: Pattern interrupt
- Neuro: "You're using the wrong model architecture for brain data"
- Beauty: "You're using the wrong cleanser for your skin type"

**30. The Hidden Multiplier** — "You're [N]× away from solving [problem]"
- Best for: 9, 10
- Neural: Prefrontal (quantified gap)
- Neuro: "You're one model away from never needing to scan again"
- Beauty: "You're one ingredient away from solving your hyperpigmentation"

**31. The Stack Fix** — "Layer [N] things to fix [problem] permanently"
- Best for: 2, 13
- Neural: Sequence + LOC
- Neuro: "Layer 3 modalities (V+A+T) to predict 95% of brain regions"
- Beauty: "Layer 3 actives (C+E+ferulic) to fix sun damage permanently"

**32. The Diagnostic** — "Here's how to know if [you have / your X] is [Y]"
- Best for: 9, 2
- Neural: DMN (self-diagnosis) + checklist
- Neuro: "Here's how to know if your brain dataset is too small for deep learning"
- Beauty: "Here's how to know if your skin barrier is broken"

**33. The Reverse-Engineered Fix** — "[X] works because of [hidden mechanism]. Here's how to use it."
- Best for: 9, 10, 13
- Neural: Prefrontal mechanism explanation
- Neuro: "Transformers predict brains because of temporal attention. Here's how to leverage it."
- Beauty: "Niacinamide works because it builds ceramides. Here's how to layer it."

### Category 5 — Educational / How-To Hooks (9 formulas)

**34. The Capability Promise** — "How to [verb] [noun] (even if [obstacle])"
- Best for: 2, 9
- Neural: DMN + Prefrontal
- Neuro: "How to predict brain activity (even without owning a scanner)"
- Beauty: "How to clear acne (even if you have sensitive skin)"

**35. The 'Anyone Can'** — "Anyone can [verb] [noun]. Here's how."
- Best for: 2, 7
- Neural: DMN (universality) + LOC
- Neuro: "Anyone can run TRIBE v2 inference. Here's how."
- Beauty: "Anyone can build a 3-step skincare routine. Here's how."

**36. The Anatomy Of** — "The anatomy of a [thing]"
- Best for: 8, 13
- Neural: VWFA + Prefrontal (structured information)
- Neuro: "The anatomy of a foundation model for the brain"
- Beauty: "The anatomy of a Korean skincare routine"

**37. The Why It Works** — "Why [X] works (the actual mechanism)"
- Best for: 9, 13
- Neural: Prefrontal + LOC
- Neuro: "Why transformers predict brains (the actual mechanism)"
- Beauty: "Why salicylic acid works on blackheads (the actual mechanism)"

**38. The Single-Step Method** — "The single step that [verb] [outcome]"
- Best for: 2, 14
- Neural: Simplification + Prefrontal
- Neuro: "The single step that turns brain papers into viral videos"
- Beauty: "The single step that doubled my skin glow"

**39. The Decision Tree** — "If [condition A], do [X]. If [condition B], do [Y]."
- Best for: 7, 2
- Neural: Prefrontal + decision-making
- Neuro: "If your data is < 100 hours, fine-tune. If > 1,000, train from scratch."
- Beauty: "If your skin is oily, use gel. If dry, use cream. If combination, use both zoned."

**40. The Before-You** — "Before you [common action], do [this one thing]"
- Best for: 9, 2
- Neural: Urgency + Prefrontal
- Neuro: "Before you build another fMRI encoder, try TRIBE v2"
- Beauty: "Before you buy another serum, do this one thing"

**41. The 'It's Not'** — "It's not [common belief]. It's [actual cause]."
- Best for: 6, 9
- Neural: Mismatch negativity
- Neuro: "It's not the scanner that limits you. It's the model architecture."
- Beauty: "It's not your face wash causing acne. It's your pillowcase."

**42. The Compression Method** — "[N] [things] in [N seconds] (no fluff)"
- Best for: 7, 2
- Neural: Urgency + Prefrontal
- Neuro: "Brain encoding in 60 seconds (no jargon)"
- Beauty: "Korean skincare in 60 seconds (no 10-step nonsense)"

### Category 6 — Question Hooks (8 formulas)

**43. The Direct Question** — "Why does [X] always [Y]?"
- Best for: 6, 9
- Neural: Question = sustained DMN engagement
- Neuro: "Why does fMRI always need so many subjects?"
- Beauty: "Why does my serum always pill on my face?"

**44. The 'Did You Know'** — "Did you know [counterintuitive fact]?"
- Best for: 6
- Neural: Curiosity + Prefrontal
- Neuro: "Did you know AI predicts your brain better than your scan does?"
- Beauty: "Did you know your skincare order is more important than the products?"

**45. The Personal Question** — "When was the last time you [verb]ed?"
- Best for: 3, 9
- Neural: DMN (self-ref) + memory
- Neuro: "When was the last time you saw a brain scan that wasn't your own?"
- Beauty: "When was the last time you changed your pillowcase?"

**46. The Forced Choice Question** — "[A] or [B]? Most people get this wrong."
- Best for: 4, 5
- Neural: Prefrontal + decision conflict
- Neuro: "Linear regression or transformer? Most people get this wrong."
- Beauty: "Vitamin C in the morning or evening? Most people get this wrong."

**47. The What-If Hypothetical** — "What if [impossible thing] was possible?"
- Best for: 6, 10
- Neural: Imagination + DMN
- Neuro: "What if you could see someone's brain without scanning them?"
- Beauty: "What if your serum could undo a year of sun damage in 30 days?"

**48. The 'Would You'** — "Would you [verb] if you knew [X]?"
- Best for: 3, 6
- Neural: DMN (counterfactual self)
- Neuro: "Would you still buy a $3M scanner if you knew AI did the same job free?"
- Beauty: "Would you still use that face wash if you knew it stripped your skin?"

**49. The Diagnostic Question** — "Do you [behavior]? You're [outcome]."
- Best for: 9, 6
- Neural: DMN (self-relevance) + Prefrontal
- Neuro: "Do you still hand-engineer features for brain data? You're behind."
- Beauty: "Do you wash your face with hot water? You're aging it faster."

**50. The Counterfactual** — "What would happen if [X] never existed?"
- Best for: 3, 13
- Neural: Imagination + Prefrontal
- Neuro: "What would neuroscience look like if foundation models never existed?"
- Beauty: "What would your face look like if you never wore sunscreen?"

### Category 7 — Shock / Counterintuitive Hooks (10 formulas)

**51. The Direct Shock** — "[Counterintuitive statement]."
- Best for: 6, 1
- Neural: Mismatch negativity + amygdala
- Neuro: "An AI predicted my brain better than my actual brain scan."
- Beauty: "Your face wash is destroying your skin."

**52. The 'Even Though'** — "Even though [logical thing], [opposite happens]."
- Best for: 6
- Neural: Mismatch negativity
- Neuro: "Even though we doubled the scanner resolution, the AI still predicted better."
- Beauty: "Even though it's the most expensive cream, it has the same actives as the $5 one."

**53. The Inverted Hierarchy** — "[Cheap thing] beats [expensive thing] at [task]"
- Best for: 6, 4
- Neural: Prefrontal value paradox
- Neuro: "A free open-source model beats a $3M scanner at brain prediction"
- Beauty: "A ₹50 ingredient beats a ₹5000 cream at hydration"

**54. The Doomsday Stat** — "[N]% of [people / things] are [bad outcome]"
- Best for: 9, 6
- Neural: Prefrontal + amygdala (threat)
- Neuro: "97% of brain encoding studies use models from before 2020"
- Beauty: "73% of dermatologists don't recommend the product they advertise"

**55. The Reveal That Stops You** — "[Result/fact] that I had to read twice"
- Best for: 6, 1
- Neural: Curiosity + Prefrontal
- Neuro: "A brain prediction model that's better than the real scan — I had to read the paper three times"
- Beauty: "A skincare result that I had to test on myself to believe"

**56. The Hidden Statistic** — "[Surprising number] that nobody talks about"
- Best for: 6, 13
- Neural: Prefrontal + curiosity
- Neuro: "1,000 hours of fMRI from 720 subjects — and most labs don't know it exists"
- Beauty: "85% of Indian women have damaged skin barriers — and most have no idea"

**57. The Time-Distortion Shock** — "[Old thing] is older than [reference]"
- Best for: 6
- Neural: Temporal mismatch
- Neuro: "The brain encoding method most labs still use is older than the iPhone"
- Beauty: "The 'gentle' face wash you're using has been the same formula since 1985"

**58. The Capability Gap Shock** — "[Old thing] takes [N units]. [New thing] takes [much less]."
- Best for: 4, 6
- Neural: Prefrontal magnitude comparison
- Neuro: "Mapping the face area used to take 5 years. TRIBE v2 does it in a forward pass."
- Beauty: "Treating hyperpigmentation used to take 6 months. The right combo does it in 6 weeks."

**59. The 'You Already' Shock** — "You already [verb] [thing] [N times a day]. You just don't know it."
- Best for: 6, 3
- Neural: DMN (self-ref)
- Neuro: "Your brain already predicts the future 1000 times a second. We just measured it."
- Beauty: "You're already damaging your skin 5 times a day. You just don't know which times."

**60. The Reality Check** — "[Common assumption] is wrong. Here's the data."
- Best for: 6, 13
- Neural: Mismatch negativity + Prefrontal
- Neuro: "The assumption that bigger datasets help is wrong. Here's the data."
- Beauty: "The assumption that 'natural' is safer is wrong. Here's the data."

### Category 8 — Hot-Take / Contrarian Hooks (8 formulas)

**61. The 'Hot Take'** — "Hot take: [contrarian opinion]"
- Best for: 6, 4
- Neural: DMN + Prefrontal
- Neuro: "Hot take: most fMRI studies should be replaced with TRIBE v2 inference"
- Beauty: "Hot take: 10-step Korean skincare is a marketing gimmick"

**62. The 'Unpopular Opinion'** — "Unpopular opinion: [contrarian thing]"
- Best for: 6
- Neural: Same as 61
- Neuro: "Unpopular opinion: linear encoders should not exist anymore"
- Beauty: "Unpopular opinion: vitamin C serums are overrated"

**63. The 'Stop Caring About'** — "Stop caring about [popular thing]. Care about [actual thing]."
- Best for: 5, 6
- Neural: Pattern interrupt + Prefrontal
- Neuro: "Stop caring about scanner resolution. Care about model architecture."
- Beauty: "Stop caring about face wash. Care about your moisturizer."

**64. The 'Everyone's Wrong'** — "Everyone says [X]. Everyone is wrong."
- Best for: 6
- Neural: Pattern interrupt
- Neuro: "Everyone says you need more subjects. Everyone is wrong."
- Beauty: "Everyone says sunscreen is for the beach. Everyone is wrong."

**65. The 'I Don't Care'** — "I don't care if [authority/opinion] says [X]. The data says [Y]."
- Best for: 6, 13
- Neural: Authority challenge + Prefrontal
- Neuro: "I don't care if the textbook says linear is fine. The data says transformers win."
- Beauty: "I don't care if your dermatologist says exfoliate daily. The science says weekly."

**66. The 'Cancel This'** — "Cancel [popular thing]. Here's why."
- Best for: 6
- Neural: Provocation + curiosity
- Neuro: "Cancel single-modality brain encoders. Here's why."
- Beauty: "Cancel face mists. Here's why."

**67. The 'Industry Lies'** — "[Industry] doesn't want you to know [X]"
- Best for: 6
- Neural: Mistrust + DMN
- Neuro: "Big neuroimaging doesn't want you to know that a free model outperforms their scanner"
- Beauty: "The skincare industry doesn't want you to know that 80% of ingredients do nothing"

**68. The Direct Challenge** — "If you still [X], you're [Y]"
- Best for: 6, 5
- Neural: DMN + Prefrontal (judgment)
- Neuro: "If you still hand-engineer fMRI features, you're 5 years behind"
- Beauty: "If you still use bar soap on your face, you're aging your skin"

### Category 9 — Data / Result-Driven Hooks (9 formulas)

**69. The Lead-With-Number** — "[Specific big number]. Here's what it means."
- Best for: 13, 12, 14
- Neural: VWFA + Prefrontal
- Neuro: "1,115 hours. Here's what 720 brains taught one AI."
- Beauty: "47 days. Here's what one ingredient did to my skin."

**70. The Multiplier** — "[N]× [comparison]"
- Best for: 1, 4
- Neural: Prefrontal magnitude
- Neuro: "2× the prediction accuracy of the median human subject"
- Beauty: "5× longer-lasting hydration than the bestseller"

**71. The Ratio Reveal** — "[N] in. [M] out. [Ratio significance]."
- Best for: 13
- Neural: Prefrontal proportion
- Neuro: "1,000 hours in. 4 subjects. Predictions for 720 brains out."
- Beauty: "3 ingredients in. 90% reduction in breakouts out."

**72. The Time-to-Result** — "[Outcome] in [specific timeframe]"
- Best for: 12, 11
- Neural: Prefrontal + urgency
- Neuro: "Brain region mapping in 200 milliseconds"
- Beauty: "Visible skin brightening in 14 days"

**73. The Cost-Saved** — "Saved [N currency] by [action]"
- Best for: 11, 15
- Neural: Prefrontal value
- Neuro: "Saved $3M in scanner costs by using TRIBE v2"
- Beauty: "Saved ₹50,000/year by switching to 3 ingredients"

**74. The Percentage Win** — "[N]% [improvement metric]"
- Best for: 12, 14
- Neural: Prefrontal + VWFA
- Neuro: "40% improvement over linear encoders"
- Beauty: "70% reduction in dark spots after 8 weeks"

**75. The Benchmark Beat** — "Beat [N] competing [things] at [task]"
- Best for: 14, 13
- Neural: Authority + Prefrontal
- Neuro: "Beat 263 teams at the Algonauts 2025 brain prediction challenge"
- Beauty: "Beat 12 leading brands in a 90-day clinical trial"

**76. The Scale Statement** — "[N] of [thing] in [N units of time]"
- Best for: 13
- Neural: Prefrontal magnitude
- Neuro: "5,094 fMRI sessions in 8 datasets"
- Beauty: "120,000 customer reviews in 18 months"

**77. The Single-Trial Result** — "One [trial / test / experiment]. [Surprising result]."
- Best for: 12, 14
- Neural: Prefrontal + curiosity
- Neuro: "One forward pass. The model recovered 50 years of visual neuroscience."
- Beauty: "One ingredient swap. My skin changed in 21 days."

### Category 10 — Relatable Hooks (8 formulas)

**78. The 'POV'** — "POV: You [common scenario]"
- Best for: 3, 11
- Neural: DMN (self-ref) + TPJ
- Neuro: "POV: You're a neuroscientist who just realized your method is obsolete"
- Beauty: "POV: You finally figured out your skin type at 32"

**79. The Universal Frustration** — "When you [universal annoying thing]..."
- Best for: 3, 9
- Neural: TPJ (shared experience)
- Neuro: "When you spend 6 months collecting data only for the model to fail at inference..."
- Beauty: "When you spend ₹5000 on serum and it pills on your face..."

**80. The 'It's Just Me'** — "Is it just me or does [X]?"
- Best for: 3, 6
- Neural: DMN + TPJ
- Neuro: "Is it just me or does fMRI feel like it hasn't changed since 2010?"
- Beauty: "Is it just me or do all 'sensitive skin' products burn?"

**81. The 'Tell Me You're [X] Without'** — "Tell me you're [demographic] without telling me you're [demographic]"
- Best for: 3 (humor)
- Neural: DMN + TPJ + humor
- Neuro: "Tell me you're a 2018-era neuroscientist without telling me — you still use ridge regression"
- Beauty: "Tell me you're new to skincare without telling me — you use lemon as a toner"

**82. The 'Me But With'** — "[Universal thing]. Me but [specific twist]."
- Best for: 3
- Neural: DMN
- Neuro: "Everyone learning AI: 'Where do I start?' Me but with a brain dataset: 'TRIBE v2.'"
- Beauty: "Everyone in their 30s: 'I need retinol.' Me but with sensitive skin: 'I need bakuchiol.'"

**83. The Niche Universal** — "Only [specific subgroup] will understand"
- Best for: 3
- Neural: DMN + identity
- Neuro: "Only fMRI researchers will get this — the second TR is always the worst"
- Beauty: "Only Indian women in their 30s will get this — that one stubborn pigmentation spot"

**84. The 'Day In The Life'** — "A day in the [role]"
- Best for: 3, 11
- Neural: PPA + DMN
- Neuro: "A day in the life of a brain encoder researcher in 2026"
- Beauty: "A day in the life of someone with combination skin in Indian summer"

**85. The Shared Memory** — "Remember when [shared cultural reference]?"
- Best for: 3 (cultural)
- Neural: Memory + TPJ
- Neuro: "Remember when fMRI papers needed 10 subjects to publish? Yeah, those days are over."
- Beauty: "Remember Fair & Lovely commercials? We're collectively healing."

### Category 11 — Comparison Hooks (9 formulas)

**86. The Direct Versus** — "[Option A] vs [Option B]. The winner is [unexpected]."
- Best for: 1, 4
- Neural: Prefrontal + V1–V4
- Neuro: "Linear regression vs Transformer for brain encoding. The winner isn't who you think."
- Beauty: "Vitamin C vs Niacinamide for dark spots. The winner is unexpected."

**87. The Side-by-Side** — "Side by side. [Same task]. [Different methods]. [Big gap]."
- Best for: 1, 11
- Neural: V1–V4 + Prefrontal
- Neuro: "Side by side: real fMRI vs TRIBE v2 prediction. The gap is shocking."
- Beauty: "Side by side: morning skin vs night skin after this routine. The gap is real."

**88. The Year Comparison** — "How [X] changed from [Year A] to [Year B]"
- Best for: 11, 12
- Neural: Temporal + V1–V4
- Neuro: "How brain encoding changed from 2014 to 2026"
- Beauty: "How my skin changed from 2024 to 2026 with one routine swap"

**89. The 'The Difference Between'** — "The difference between [A] and [B] is [single thing]"
- Best for: 4, 13
- Neural: Prefrontal contrast
- Neuro: "The difference between a 0.1 and a 0.4 correlation is the model architecture"
- Beauty: "The difference between glowing skin and dull skin is one step"

**90. The Cost Compare** — "[Expensive option]: ₹[N]. [Cheap option]: ₹[M]. Same result."
- Best for: 15, 4
- Neural: Prefrontal value
- Neuro: "MRI scan: ₹15,000. TRIBE v2 inference: free. Same brain map."
- Beauty: "Luxury serum: ₹4,500. The active ingredient: ₹400. Same result."

**91. The Era Compare** — "[Old era thing] vs [new era thing]"
- Best for: 1, 11
- Neural: Temporal + V1–V4
- Neuro: "fMRI in the 2010s vs fMRI with TRIBE v2 in 2026"
- Beauty: "Skincare in the 2010s vs skincare with biotech in 2026"

**92. The Effort Compare** — "[Hard way]: [N steps]. [Easy way]: [M steps]. Same outcome."
- Best for: 4, 2
- Neural: Prefrontal effort minimization
- Neuro: "Building a brain encoder from scratch: 12 months. Fine-tuning TRIBE v2: 1 epoch."
- Beauty: "10-step Korean routine: 30 minutes. 3-step Indian routine: 5 minutes. Same skin."

**93. The 'X Like Y' Simile** — "[Subject A] is like [familiar thing B]"
- Best for: 6, 13
- Neural: LOC + analogical mapping
- Neuro: "TRIBE v2 is like a translator that speaks fluent brain"
- Beauty: "Niacinamide is like a personal trainer for your skin cells"

**94. The Trade-Off Reveal** — "You get [benefit]. You give up [smaller cost]. Worth it."
- Best for: 4, 14
- Neural: Prefrontal cost-benefit
- Neuro: "You get state-of-the-art brain prediction. You give up linear interpretability. Worth it."
- Beauty: "You get glass skin. You give up your 7-step routine. Worth it."

### Category 12 — Insight / Thought Leadership Hooks (6 formulas)

**95. The Definitive Statement** — "[Field] just changed forever."
- Best for: 6, 14
- Neural: Authority + curiosity
- Neuro: "Neuroscience just changed forever. Here's the paper."
- Beauty: "Indian skincare just changed forever. Here's what biotech is doing."

**96. The Era Marker** — "We are entering [era of X]"
- Best for: 6, 14
- Neural: Temporal + authority
- Neuro: "We are entering the era of model-driven neuroscience"
- Beauty: "We are entering the era of personalized skincare diagnostics"

**97. The Realization** — "[Field] is about to realize [thing]"
- Best for: 6
- Neural: Anticipation + Prefrontal
- Neuro: "Neuroscience is about to realize: you don't need bigger scanners. You need better models."
- Beauty: "The skincare industry is about to realize: less is actually more."

**98. The Paradigm Shift Statement** — "The way we [X] is over"
- Best for: 6, 11
- Neural: Pattern interrupt + Prefrontal
- Neuro: "The way we map the brain is over. Welcome to in-silico neuroscience."
- Beauty: "The way we treat skin is over. Welcome to barrier-first skincare."

**99. The Forecasted Future** — "In [N years], [X] will be unrecognizable"
- Best for: 14, 11
- Neural: Temporal + curiosity
- Neuro: "In 5 years, fMRI labs without a foundation model will be unrecognizable"
- Beauty: "In 3 years, your skincare routine will be unrecognizable thanks to one shift"

**100. The 'Mark My Words'** — "Mark my words: [predictive statement]"
- Best for: 6, 14
- Neural: Authority + commitment
- Neuro: "Mark my words: 90% of brain encoding papers will use TRIBE v2 by 2028"
- Beauty: "Mark my words: barrier repair will replace anti-aging as the primary skincare category"

---


## 17. MULTI-LANGUAGE DELIVERY

### 17.1 Language Tags

| Tag | Use | Script Example |
|-----|-----|----------------|
| `[EN]` | Pure English | "The model predicts." |
| `[HI]` | Pure Hindi (Devanagari in captions) | "[HI] मॉडल भविष्यवाणी करता है" |
| `[TA]` | Pure Tamil (Tamil script in captions) | "[TA] மாதிரி கணிக்கிறது" |
| `[HIN-EN]` | Hinglish — code-switch (Roman script) | "[HIN-EN] ye model predict karta hai" |
| `[TAM-EN]` | Tanglish — code-switch (Roman script) | "[TAM-EN] indha model predict pannuthu" |

### 17.2 Code-Switching Rules

- Technical/scientific terms stay English in all languages
- Connectives, descriptors, emotion in target language
- Brand names always English script
- Numbers: digitize in all languages ("73%" not "seventy-three percent")
- Example Hinglish: "ye AI [HIN-EN] brain ke andar dekh leta hai, bina scan ke"
- Example Tanglish: "[TA] indha AI [TAM-EN] brain-ah scan illaama paaththuduthu"

### 17.3 Prosody Adjustments by Language

| Language | Emphasis | Pace | Tone Notes |
|----------|----------|------|------------|
| **Hindi** | Second syllable of compound words; rising tone on questions | ~180–200 WPM (faster than English) | Bollywood-style emotional prosody acceptable and effective |
| **Tamil** | First syllable emphasis; falling tone on declaratives | ~180–200 WPM | Falling tone on declaratives; emotional beats use classical music motifs |
| **Hinglish** | English technical terms emphasized; Hindi emotion words | ~170–190 WPM | Natural code-switch rhythm; don't force |
| **Tanglish** | English technical terms emphasized; Tamil emotion words | ~170–190 WPM | Natural code-switch rhythm; don't force |

### 17.4 Caption Rules for Multi-Language

- Auto-translate captions toggle in CapCut/Premiere — never burn-in only one language unless platform-targeted
- Technical terms stay English even inside Hindi/Tamil dialogue
- Multi-language scripts: provide separate caption tracks for each language
- For code-switching: caption in the dominant language of the beat, with English technical terms preserved

---

## 18. INDIAN MARKET LOCALIZATION

### 18.1 Cultural Anchors

| Domain | Replace generic with Indian-context |
|---|---|
| Time-of-day reference | Morning chai > morning coffee; evening tea > evening drink |
| Family reference | "Tell your mom" > "tell your friend" (Indian audiences respond to family trust signal) |
| Authority signal | Western institutions (Meta, Stanford, ENS) PLUS Indian (IISc, NCBS, IIT, AIIMS) where relevant |
| Wardrobe in B-roll | Kurta + jeans casual; sari/saree for formal Indian beauty; solid colors only |
| Festival timing | Diwali, Holi, Pongal, Eid for seasonal hooks |
| Trust signal | "100% Ayurvedic", "made in India", "lab-tested in Chennai", "FSSAI-approved" carry weight |
| Price language | Always ₹ first, USD parenthetical only for cross-border |
| Numeric format | "1,000" with comma OR "1k" — never "1.000" (European format confuses) |

### 18.2 Visual References That Resonate

| Use | Avoid |
|---|---|
| Indian kitchen with brass / steel utensils | Generic Western kitchen |
| Indian street market for "trust local" framing | Whole-Foods-style aspirational shots (lose 70% of mid-tier audience) |
| Cricket as reference sport | Baseball / American football |
| Bollywood-style emotional close-ups acceptable | Hard "American TV ad" delivery (reads inauthentic) |
| Saturated color grading | Muted Scandinavian look (cold for Indian eye) |
| Visible Indian script in B-roll backgrounds | Sterile English-only environments |

### 18.3 Audio Prosody for Indian Delivery

- Bollywood-style emotional swell is acceptable and effective for Story/Trust beats
- American "yo what's up" register doesn't translate — sounds inauthentic
- Hindi/Tamil VO should be paced ~5–10% faster than English equivalent — Indian ear tolerates faster speech
- Music: blend electronic with subtle Indian classical motifs (tabla, sitar accents) for premium feel; pure Bollywood remix for mass-market

### 18.4 Beauty-Specific (Treyfa) Localization

For Treyfa beauty content:
- Face presence is recommended (founder/model on camera) — but per user spec, NOT mandatory. Pure ABR with hands + product is acceptable.
- Color palette in graphics: gold + cream + saturated brand color (warm tones outperform cool in Indian beauty)
- Trust beats: "lab-tested", "dermatologist-approved" (if true), "[N] ingredients" with on-screen count
- Demo focus: process B-roll of product application (hands applying serum, hands smoothing cream) — EBA + LOC + V1–V4 stack
- Music: feminine soft pulse, 80–95 bpm, no harsh drops

### 18.5 B2B / Backero Localization

For Backero B2B cosmetic manufacturing content:
- Tone: authority, calm, professional
- B-roll: factory floor, lab coats, batch numbers, certification stamps
- On-screen text emphasis: scale numbers (units/year, square footage, years in operation)
- Music: corporate underscore, 90–100 bpm
- Avoid Bollywood-emotion — B2B Indian buyers want signal-of-competence, not warmth

---

## 19. RESEARCH INTEGRITY & PROOF ANCHOR

### 19.1 TRIBE v2 (Foundation Model Paper) — Deep Reference

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

### 19.2 NeuralSet (Infrastructure Paper) — Deep Reference

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

### 19.3 Proof Anchor Delivery (Visual, Not Verbal)

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

## 20. OUTPUT FORMAT

Return ONLY a JSON object:

```json
{
  "metadata": {
    "title": "Working title",
    "phase2_structure_used": "Structure # — Name",
    "format_skin_primary": "ABR | Talking-Head | Whiteboard | Two-Person | Hybrid",
    "total_runtime_s": 35.0,
    "scene_count": 6,
    "spoken_word_count": 68,
    "silent_runtime_s": 19.5,
    "silent_runtime_percent": 55.7,
    "action_to_dialogue_word_ratio": 2.4,
    "actor_count": 1,
    "aspect_ratio": "9:16",
    "platform": "Instagram Reels",
    "language_primary": "EN",
    "content_complexity": "research_heavy"
  },
  "production_summary": {
    "shoot_estimate_hrs": 1.0,
    "vo_recording_estimate_hrs": 0.5,
    "lighting_setups_required": 1,
    "props_required": ["smartphone", "tablet"],
    "props_missing_from_studio": [],
    "broll_sources_required": ["royalty_free_stock", "screen_recording"],
    "broll_missing": [],
    "backgrounds_used": [],
    "actors_required": [],
    "edit_complexity": "Medium",
    "post_production_estimate_hrs": 2.5
  },
  "production_warnings": [],
  "research_integrity_carryforward": {
    "claim_fidelity_check": "PASSED — all numeric claims match Phase-2 input",
    "figure_reference": "Fig 3A, Fig 3B",
    "code_link_shown": "https://github.com/facebookresearch/tribev2",
    "institution_anchor_shown": "Meta FAIR"
  },
  "reference_video_match": {
    "url": "...",
    "matched_property": "cut_rhythm",
    "cut_rhythm_reference_s": 1.2,
    "cut_rhythm_actual_s": 1.15,
    "match_within_tolerance": true
  },
  "scenes": [
    {
      "number": 1,
      "name": "THE HOOK",
      "structure_beat": "0-1s VISUAL HOOK + 1-3s AUDIO HOOK",
      "format_skin": "ABR",
      "timing": { "start": 0.0, "end": 3.0, "duration": 3.0 },
      "neural_targets_fired": ["FFA (B-roll)", "MT/V5", "VWFA", "A1", "DMN", "TPO Junction"],
      "spoken_words_in_scene": 11,
      "silent_seconds_in_scene": 0.5,
      "filming_notes": "Single ABR scene — no actor on camera. B-roll required: archival fMRI scanner footage (royalty-free, 1.5s clip). Hard cut to plain white background with 'MYTH' text overlay at t=1.5s. VO recorded separately. Whip pan transition to scene 2.",
      "vo": {
        "speaker": "VO_HOST (separate recording session)",
        "line": "Myth: you need a **brain scan** to read your brain... wrong.",
        "pronunciation_notes": [],
        "emphasis_words": ["brain scan", "wrong"],
        "pace": "variable",
        "tone": "conspiratorial → confrontational",
        "energy_level": 7,
        "first_word_onset_s": 0.0,
        "language": "EN",
        "readability_grade": 4,
        "demonstration_first_test": "PARTIAL — 'wrong' could be visual-only via glitch SFX + text; kept verbal for prosody peak"
      },
      "action": "(t=0.0–1.5s: B-roll of MRI scanner sliding patient in, archival footage. t=1.5s: HARD CUT to plain white background, massive yellow 'MYTH' text pops in. t=2.5s: glitch SFX + text shatters/glitches out. t=2.8s: white background, single word 'WRONG.' appears.)",
      "camera": {
        "shot_size": "Archival B-roll → Graphic insert",
        "angle": "N/A (archival + graphic)",
        "movement": "B-roll has its own motion; graphic is static",
        "lens_equivalent_mm": null,
        "framing": "9:16 safe zones respected for text",
        "depth_of_field": "N/A"
      },
      "lighting": { "setup_template": "N/A — graphic + archival scene", "notes": "Color grading only" },
      "actor": null,
      "visual": {
        "primary_visual": "Archival fMRI scanner footage (0.0–1.5s), then text-only frames (1.5–3.0s)",
        "on_screen_text": {
          "primary": {
            "text": "MYTH",
            "word_count": 1,
            "font_family": "Inter Black",
            "font_size_pt": 160,
            "color_hex": "#FFE600",
            "outline_px": 8,
            "outline_color_hex": "#000000",
            "position": "Center, 40% from top",
            "animation_in": "Pop-in 200ms",
            "animation_out": "Glitch shatter at 2.5s",
            "highlight_word": "MYTH",
            "duration_on_screen_s": 1.0
          },
          "secondary": {
            "text": "WRONG.",
            "font_family": "Inter Black",
            "font_size_pt": 180,
            "color_hex": "#FF3333",
            "position": "Center",
            "animation_in": "Hard cut, no animation",
            "duration_on_screen_s": 0.2
          },
          "caption": {
            "text": "Myth: you need a brain scan to read your brain... wrong.",
            "style": "Bold white + 4px black + 60% black pill",
            "animation": "Word-by-word pop synced to VO",
            "position": "Bottom 22% from bottom",
            "highlight_word": "wrong"
          }
        },
        "props": [],
        "background": "Plain white (graphic) / archival footage",
        "broll_required": [
          { "type": "archival_fMRI_scanner", "duration_s": 1.5, "source": "royalty_free_stock" }
        ]
      },
      "audio": {
        "voice_source": "VO over visuals",
        "voice_level_dB": -4,
        "background_music": { "cue": "No music 0–0.5s; subtle pulse from 0.5s", "level_dB": -18, "ducks_to_dB": -24 },
        "sfx": [
          { "type": "rising synth riser", "in_at_s": 1.5, "out_at_s": 2.5, "level_dB": -12 },
          { "type": "glitch / shatter", "in_at_s": 2.5, "out_at_s": 2.8, "level_dB": -8 }
        ],
        "music_transition_to_next": "Beat drop on cut to scene 2",
        "transition_audio": "Whoosh -10 dB"
      },
      "editing": {
        "cut_point": "Hard cut at 3.0s on 'wrong'",
        "transition_to_next": "Whoosh + smash cut",
        "caption_style": "Bold white + 4px black + 60% black pill",
        "caption_animation": "Word-by-word",
        "speed_ramp": "Normal 1.0× throughout",
        "color_grade": "High-contrast punch on graphic frames; archival left as-is with slight contrast lift"
      },
      "multimodal_sync_check": {
        "visual_fired_at_s": 0.0,
        "audio_fired_at_s": 0.0,
        "text_fired_at_s": 0.2,
        "convergence_window_met": true,
        "tpo_activation_predicted": "HIGH"
      },
      "pbl_checks": {
        "see_read_hear_present": true,
        "broad_hook_test": "PASS — 'brain scan' is universal vocabulary, no jargon",
        "muted_parse_test": "PASS — visual + caption alone carry message",
        "format_skin_consistent_with_blueprint": true
      },
      "production_notes_for_director": "First phoneme 'M' of 'Myth' must hit frame 1 (sync VO to first frame of archival footage). Glitch SFX timed to text shatter at 2.5s precisely."
    }
  ],
  "post_production_checklist": [
    "Color-match all scenes",
    "Sync VO timing to visuals (especially scene 1 frame 1)",
    "Verify all numeric claims appear on-screen at moment of audible mention",
    "Confirm Meta FAIR institution anchor visible at proof beat",
    "Verify code link URL in CTA scene",
    "Export 1080×1920 9:16 H.264 30fps 12 Mbps"
  ]
}
```

---

## 21. QUALITY CHECK (Pre-Output Verification)

### Structural
- [ ] Scene count matches blueprint?
- [ ] Scene order matches blueprint?
- [ ] Each scene's `structure_beat` maps to Phase-2 `timing`?
- [ ] `format_skin` per scene consistent with blueprint?

### Hook Scene
- [ ] First phoneme of VO at t=0.000s (no dead air)?
- [ ] Motion present within 0.1s (MT/V5)?
- [ ] Face in frame by 0.5s (actor or B-roll)?
- [ ] On-screen hero text by 0.3s?
- [ ] Tri-modal convergence in 0–1.5s confirmed?
- [ ] `convergence_window_met: true`?
- [ ] **Muted-parse test: hook fully understandable with audio off?**

### Demonstration-First
- [ ] Every dialogue line passed "Can this be SHOWN?" test?
- [ ] Action-to-dialogue word ratio ≥ 2.0?
- [ ] Silent-runtime quota met for chosen format skin?
- [ ] Total spoken word count ≤ format target (ABR 30s: ≤ 80 words)?

### Neural Target Coverage
- [ ] Each scene lists `neural_targets_fired`?
- [ ] Every Phase-2 neural target fired in at least one scene?
- [ ] Brain region → camera/lighting/direction mapping (§15) followed?

### Broad → Narrow → Niche
- [ ] Hook scene uses universal vocabulary (no jargon)?
- [ ] Body scenes deliver narrow value to ICP?
- [ ] Technical terms in body paired with on-screen decoder?
- [ ] CTA niche-targeted (only right viewer acts)?

### Staccato Dialogue
- [ ] Every beat ≤ 8 words?
- [ ] No conjunctions between beats ("and", "but", "so")?
- [ ] Hard stops between beats (periods, not commas)?
- [ ] Each beat accompanied by physical action or visual change?
- [ ] 5th-grade readability (Hemingway score ≤ 5)?
- [ ] Cult hopping language present (in-group phrases)?
- [ ] "You/Your" count ≥ 2 per 10 words?
- [ ] Forbidden words absent ("revolutionary", "unlock", "discover", "amazing")?

### Visual / Camera / Lighting
- [ ] No talking-head shot exceeds 2s without visual change?
- [ ] Every scene's camera block has shot_size, angle, movement, lens, framing?
- [ ] Every actor-present scene has full lighting block?
- [ ] At least one silent moment?
- [ ] Captions cover 100% of spoken words?
- [ ] Single peak lands at structural payoff?

### Studio Reality
- [ ] All props in `studio_assets.props_available`?
- [ ] All B-roll sources in `studio_assets.broll_sources_available`?
- [ ] All backgrounds from available list?
- [ ] Actor count matches input?
- [ ] Lighting setup count ≤ available fixtures?

### Research Fidelity
- [ ] Numeric claims match Phase-2 `research_integrity.claim_fidelity` exactly?
- [ ] Figure reference on screen at proof beat?
- [ ] Institution anchor visible at least once?
- [ ] Code link in CTA scene?

### PBL Operational Checks
- [ ] SEE/READ/HEAR triple-hook present in scene 1?
- [ ] Visual hook rated higher than verbal hook (per PBL: visual carries more weight)?
- [ ] If `reference_video` supplied: cut rhythm within ±20% of reference?
- [ ] 4-component script anatomy present (filming_notes + dialogue + caption + subtitle)?

### CTA
- [ ] CTA scene has freeze frame on text?
- [ ] CTA text ≤ 5 words?
- [ ] CTA matches Phase-2 `cta.text` exactly?

### Multi-Language
- [ ] Language tags applied correctly ([EN], [HI], [TA], [HIN-EN], [TAM-EN])?
- [ ] Technical terms stay English in code-switching?
- [ ] Caption format supports target language script?
- [ ] Prosody notes adjusted for language-specific delivery?

---

## 22. EXAMPLE EXECUTION — TRIBE v2 Myth Bust (ABR-Dominant)

**Input:** Phase-2 output for TRIBE v2 zero-shot generalization, Structure 6 (Myth Bust), `actor_count: 0`, `content_complexity: research_heavy`, Instagram Reels 9:16, 35s, English, `format_override: ABR`.

**Output:** See the complete JSON example in §20 above. Key v2 properties:
- **Zero on-camera presence in scenes 1–4** (16 of 35 seconds, ~46% of runtime). Host appears only in scenes 5–6 (Reinforcement and CTA).
- **Silent-runtime: 55.7%** (well above ABR's 50% floor).
- **Action-to-dialogue ratio: 2.6** (above the 2.0 floor).
- **Total spoken words: 62** (well under the 80-word target for ABR 30s).
- **Hook scene 1 muted-parse test: PASS** — archival fMRI footage + "MYTH" text + "WRONG." graphic carries full meaning without audio.

---

## 23. AUTOMATION WORKFLOW & PHASE-4 FORWARD COMPATIBILITY

### 23.1 For Content Creators Using This Skill
1. **Input Phase:** Content creator fills the Viral Video Production Form (Phase 1), specifying topic, research paper, target platform, and cast size.
2. **Structure Phase:** Phase 2 Structure Generator processes the input and outputs the JSON structure with hooks, archetype, and timing.
3. **Execution Phase:** THIS SKILL (Phase 3) receives the Phase 2 JSON and generates the complete scene-by-scene screenplay with Hollywood-level camera, lighting, blocking, staccato dialogue, pattern interrupts, music genre, and editing specifications.
4. **Production Phase:** Studio crew receives the JSON, loads staccato beats into teleprompter (line-by-line, not paragraph), marks floor per blocking notation, sets lights per setup codes, and shoots per scene sequence with interrupt points marked on slate.
5. **Post Phase:** Editor follows editing specifications, applies VFX notes, color grades per LUT assignments, syncs staccato captions beat-by-beat, and renders in specified aspect ratio with music genre and BPM.

### 23.2 Phase-4 Forward Compatibility
This output is designed to feed directly into a future Phase-4 AI-generation pipeline:
- `scenes[].camera`, `scenes[].lighting`, `scenes[].action`, `scenes[].visual.background` → text-to-video model prompts (Veo, Sora, Runway)
- `scenes[].vo.line` + `scenes[].vo.tone` + `scenes[].vo.pace` → text-to-speech voice generation
- `scenes[].visual.on_screen_text` → motion graphics template auto-renderer
- `scenes[].audio.background_music.cue` → music generation prompts
- `scenes[].editing.cut_point` + `scenes[].editing.transition_to_next` → NLE auto-assembly via JSON edit decision list
- `scenes[].visual.broll_required[]` → stock-footage API query OR generative B-roll prompt

The schema is identical for in-studio production (Phase-3a) and all-AI generation (Phase-3b) — only the production backend differs.

### 23.3 Studio Shot Prep Checklist (Auto-Generated from Output)
When Phase-3 output is finalized:
1. **Call sheet** — actor count, wardrobe, props, lighting setups, shoot duration
2. **Shot list** — from `scenes[].camera` blocks
3. **Lighting diagram** — per setup template
4. **B-roll shoot list** — from `scenes[].visual.broll_required` arrays
5. **VO recording script** — clean text of all VO with pronunciation tags and prosody notes
6. **Designer brief** — for custom animations / graphic overlays
7. **Caption script** — full caption text for designer to pre-build animations
8. **Production warnings** — items requiring escalation before shoot day

---

## 24. APPENDIX — REFERENCE VIDEO USAGE (5× Outlier Matching)

Per PBL operating playbook: an outlier reference video is one whose views ≥ 5× the source account's follower count. When `production_context.reference_video.url` is provided, Phase-3 uses it as a pacing/format constraint.

### What Phase-3 Extracts from a Reference Video

Phase-3 does NOT copy dialogue or specific visual ideas (plagiarism risk). It extracts only structural properties:

| Property | How Phase-3 uses it |
|---|---|
| **Cut rhythm** (average seconds between cuts) | Phase-3 matches scene-boundary timing within ±20% |
| **Format skin** (ABR / talking-head / whiteboard) | Phase-3 adopts same format if `match_target = format` |
| **Hook duration** (when does the hook resolve into body?) | Phase-3 sets scene 1 duration to match |
| **Caption density** (words per second) | Phase-3 matches caption pacing |
| **Music presence/absence in first 0.5s** | Phase-3 matches |
| **Aspect ratio + safe zone usage** | Phase-3 matches |
| **Energy curve** (where in runtime does the peak land?) | Phase-3 places its single peak at same relative position |

### What Phase-3 Does NOT Extract

- Specific dialogue lines
- Specific visual content
- Specific hooks or punchlines
- Specific actors / faces / wardrobe
- Specific music tracks

The reference is for *rhythm and format*, not content.

### Match Target Modes

| `match_target` | What it constrains |
|---|---|
| `pacing` | Cut rhythm + scene boundary timing |
| `cut_rhythm` | Strict per-scene cut intervals matched |
| `format` | Format skin choice (ABR/talking-head/etc.) |
| `hook_structure` | Hook scene timing + tri-modal sync window |

If multiple modes needed, supply array.

---

*Skill Version: 5.0*  
*Last Updated: 2026-06-04*  
*Compatible with: Phase 2 Structure Generator v3, Storyboard Manager v1*  
*Research Corpus: TRIBE v2 (d'Ascoli et al., 2026), NeuralSet (King et al., 2026)*  
*Viral Methodology: PersonalBrandLaunch (Ava Yuergens)*  
*Multi-Language: EN, HI, TA, HIN-EN, TAM-EN — extensible to any language pair*
