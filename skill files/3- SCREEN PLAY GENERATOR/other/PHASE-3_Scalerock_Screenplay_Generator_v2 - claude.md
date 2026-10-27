---
name: scalerock-screenplay-generator
description: Phase-3 of the Scalerock viral video pipeline. Converts a Phase-2 NeuroAI Structure JSON into a complete, scene-by-scene, production-ready short-form screenplay for in-house studio or AI-generated shoot. Defaults to Audio-B-Roll (ABR) format — voiceover-led, demonstration-heavy, minimal on-camera dialogue. Every camera, lighting, action, prop, audio, and edit decision is doubly anchored: (1) to the TRIBE v2 cortical map (FFA, PPA, EBA, VWFA, MT/V5, TPJ, language network, DMN, TPO junction), and (2) to the operating playbook of Personal Brand Launch (Ava Yuergens) — Hook→Script→Format→Editing priority, SEE/READ/HEAR triple-hook stack, Broad→Narrow→Niche script flow, 5x outlier reference matching, and the demonstration-first rule that minimizes spoken dialogue in favor of visible action. Use this whenever a Phase-2 structure JSON is provided, or when the user says "generate screenplay", "shotlist this", "make this shootable", or pastes the Phase-2 output. Do NOT use this skill before Phase-2 has run; if no structure is provided, route the user back to the Phase-2 NeuroAI Structure Generator first.
---

# SKILL: Scalerock Screenplay Generator v2
## Phase-3 of the Research-to-Viral-Video Pipeline — Production Execution Layer

> **Pipeline position**
> **Phase 1** (Topic + Value form) → **Phase 2** (NeuroAI Structure Generator: hook content, structure, neural targets) → **Phase 3 (THIS SKILL)** (rendering, blocking, camera, lighting, edit) → **Phase 4** (future: AI-generated production)

---

## 0. LAYER SEPARATION (read this first)

This skill operates strictly downstream of Phase 2. The boundary is non-negotiable:

| Owned by Phase 2 | Owned by Phase 3 |
|---|---|
| Content type, structure choice (1–15), nugget type | Scene order, scene count, scene runtime |
| Hook text (visual / written / audio descriptions) | How to *shoot, light, and edit* that hook |
| Neural target list per modality | Which camera/lighting/blocking decisions fire those targets |
| Research claim, statistical fidelity | How to render that claim on-screen and in dialogue |
| CTA text and type | How the CTA scene looks, sounds, and freezes |
| Multimodal sync rating (CONVERGED/PARTIAL/FRAGMENTED) | Whether the rendered scene actually achieves convergence |

Phase 3 never overrides a Phase-2 decision. If Phase-2 emits a technical hook ("R = 0.40 — better than median subject"), Phase-3 *renders* it — it does not "dumb it down." Phase-3's job is to add the on-screen-text decoder so a non-researcher can still parse it without losing the source claim.

---

## 1. PURPOSE

Take the **Phase-2 NeuroAI Structure JSON** and emit a complete scene-by-scene production screenplay that a studio team (or downstream AI generation model) can execute frame-for-frame without further interpretation.

The default output format is **Audio-B-Roll (ABR)**: voiceover-led, demonstration-heavy, minimal on-camera dialogue. The actor (when present) primarily *does* rather than *says*. This default mirrors the operating playbook of Personal Brand Launch (Ava Yuergens), whose franchise-broker case study moved from 9M views on talking-head to 10M+ views on the ABR re-cut of the same script — i.e., the format itself contributed measurable lift independent of script content.

Talking-head, whiteboard, and two-person formats remain available as alternate skins but are explicitly opt-in.

**Target deployment:** Instagram Reels, YouTube Shorts, TikTok, X video — 15s to 180s, 9:16 vertical default. Single ABR variant per request unless otherwise specified.

**Studio reality assumed:** 0–5 actors (zero is valid for full-ABR neuroscience content), single-room studio, 3–5 lights, 1–2 cameras, lavalier + boom audio, basic prop budget, post in DaVinci Resolve / CapCut / Premiere.

---

## 2. INPUT FORMAT

Full Phase-2 output JSON plus a `production_context` block:

```json
{
  "phase2_structure": { /* full Phase-2 output — content_type, format, structure, hooks, cta, research_integrity */ },
  "production_context": {
    "platform": "Instagram Reels | YouTube Shorts | TikTok | X",
    "aspect_ratio": "9:16 | 1:1 | 16:9",
    "estimated_length_s": 30,
    "actor_count": 0,
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

**Three new fields vs v1:**

1. `actor_count: 0` is now valid (pure ABR, no on-camera actor needed).
2. `content_complexity` drives format and dialogue density: `research_heavy` permits VO with technical terms (paired with on-screen decoders); `mid` is balanced; `lifestyle` runs near-silent demonstration with minimal VO.
3. `reference_video` is used by the scene generator to match pacing and cut rhythm of a known outlier — see Appendix D.

If `format_override = auto`, Phase-3 selects based on `content_complexity` and `phase2_structure.structure.tier` per the Format Skin → Beat Mapping in Appendix E.

---

## 3. NEUROSCIENCE FOUNDATION (carry-forward from Phase 2, condensed)

Every Phase-3 decision references these neural anchors.

### 3.1 Cortical Targets and Phase-3 Production Implications

| Brain Region | Stimulus (TRIBE v2) | Phase-3 Implication |
|---|---|---|
| **V1–V4** (~50–80ms) | High contrast, edges, color | High-key on hook; saturated key colors on titles; never blend talent into background |
| **MT/V5** (~100ms) | Motion, scene change | Hook MUST contain motion in frame 1 — gesture, whip pan, prop entry, push-in, or scene change |
| **FFA** (~170ms) | Face | If actor present, CU/MCU eye-level by 0.5s. In zero-actor ABR, a face appears in B-roll insert by 1.5s minimum (FFA still needs to fire) |
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

### 3.2 Neural Processing Timeline (first 3s) — Phase-3 Beat Sheet

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

## 4. DEMONSTRATION-FIRST PRINCIPLE (the v2 core shift)

Every line of spoken dialogue in the output is subject to a single mandatory test:

> **"Can this be SHOWN instead of SAID?"**

If yes, the line moves from `dialogue` to `action_parenthetical` or `visual.on_screen_text`, and the scene runs as silent acting + caption support. Dialogue is the *fallback*, not the default.

### 4.1 Three production consequences

1. **Action-to-dialogue word ratio target ≥ 2.0.** For every word spoken, at least two words of action/visual description must accompany it. Enforced as QC check.
2. **Silent-runtime quota by format skin.** Each format mandates a minimum percentage of total runtime where no dialogue is spoken (only captions, visuals, music, SFX):
   - **ABR:** ≥ 50% silent runtime
   - **Whiteboard:** ≥ 30%
   - **Two-person dialogue:** ≥ 25%
   - **Talking-head:** ≥ 20%
3. **Hook parseable with audio muted.** The hook scene's visual + caption alone must carry the full message. VO is a multiplier, not the carrier. QC fails if hook depends on audio.

### 4.2 What "demonstration" actually means

Demonstration is *not* B-roll of stock footage running while a voice explains. It is:

- **Process B-roll** — actually performing the action being claimed (hand mixing ingredients, finger pressing button, fMRI data loading on screen)
- **Result-state visual** — the outcome shown directly (the brain map, the before/after, the price tag, the empty plate)
- **Comparison cut** — two states cut against each other rapidly (A then B then A then B)
- **Prop hero** — single object held, rotated, placed, used — with the camera framing the object as the subject
- **Screen capture demo** — real software, real data, real result — not mockup graphics where it can be helped

Stock-footage-with-voice is the LOWEST tier of demonstration and should be used only when custom shooting is impossible (rare archival material, NASA imagery, fMRI scanner shots, etc.).

### 4.3 When dialogue *must* exist

Some content cannot be carried by demonstration alone. Acceptable cases:

- **Research claims with numeric fidelity** ("R = 0.40, two-fold the median subject") — these get VO with paired on-screen text decoder
- **Direct address moments** ("you've been doing this wrong") — second-person carries DMN activation
- **The Reinforcement / Lesson beat** — typically requires a verbal articulation of the takeaway
- **The CTA** — verbal call-to-action with matched on-screen text

For everything else, default to silent demonstration. If a scene has more than 25 spoken words across its runtime and is not one of the four cases above, it has failed the demonstration-first principle and must be rewritten.

---

## 5. STUDIO REALITY CONSTRAINTS

Every scene respects:

- **Actor count:** 0 to 5. Zero is valid for pure ABR. Default to 0 for `content_complexity = research_heavy`; default to 1 (Demonstrator) for `mid`; 1–2 for `lifestyle`. 2 actors for Comparison / Smart-vs-Dumb / Do-vs-Don't structures only.
- **Camera:** 1 primary. Optional 2nd for split-screen / 2-shot.
- **Lighting:** 3 fixtures default (key + fill + backlight). 5-fixture upgrade for mood-heavy Story/Trust structures.
- **Audio:** Lavalier on each speaking actor + boom backup. VO recorded in separate session.
- **Props:** Only from `studio_assets.props_available`. Missing prop = listed in `production_warnings` with substitute.
- **Background:** Only from `studio_assets.background_options`. Background selection supports the scene's neural targets.
- **Wardrobe:** Solid colors only, no busy patterns.
- **B-roll sources:** Only from `studio_assets.broll_sources_available`. If a scene calls for archival footage and `archival_research` is not available, flag it.

---

## 6. FORMAT SKIN LIBRARY

Phase-3 selects ONE format skin per video (single ABR default unless overridden). Each skin has its own per-scene shot conventions, dialogue density, and edit rhythm.

### 6.1 Format Skin 1 — Audio-B-Roll (ABR) ⭐ DEFAULT

**What it is:** Voiceover carries the script. On-camera presence is minimal or zero. Visual stream is dominated by B-roll, screen captures, prop hero shots, animated graphics, archival footage, and result-state visuals. When an actor appears, they're typically performing an action (not speaking on camera) — hands cooking, finger pressing, body walking through a space, eyes reacting.

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
- When the brand IS the founder (lifestyle brands where face must be present — even then ABR with brief CU inserts works)

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

### 6.6 Auto-Selection Logic (when `format_override = auto`)

| Phase-2 input | Default Format Skin |
|---|---|
| `content_complexity = research_heavy` AND `actor_count = 0` | **ABR** |
| `content_complexity = research_heavy` AND `actor_count ≥ 1` | **Hybrid** |
| `content_complexity = mid`, Education structures (2, 7, 8, 10) | **Whiteboard** or **ABR** |
| `content_complexity = mid`, Comparison structures (1, 4, 5, 6) | **Two-Person Dialogue** or **ABR** |
| `content_complexity = mid`, Story / Trust (3, 11) | **Hybrid** |
| `content_complexity = lifestyle`, any | **ABR** (founder face in inserts only) |
| `reference_video.match_target = format` | Match the reference's format |

---

## 7. HOLLYWOOD CAMERA LANGUAGE

Every scene's `camera` block specifies: shot size, angle, movement, lens equivalent, framing.

### 7.1 Shot Sizes

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

### 7.2 Camera Angles

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

### 7.3 Camera Movement

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

### 7.4 Lens Equivalents

| Focal length | Look | Use |
|---|---|---|
| 24mm wide | Slight distortion, environmental | ELS/LS, "show whole room" |
| 35mm semi-wide | Documentary natural | LS/MS, story setup |
| 50mm normal | Human eye perspective | Default MCU |
| 85mm short tele | Flattering, subject isolation | CU, hero portrait |
| 100mm+ tele | Heavy compression | ECU, dramatic isolation |
| Macro | Extreme close-up | Insert of text, phone screen, product |

### 7.5 Framing & Composition

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

## 8. HOLLYWOOD LIGHTING LANGUAGE

### 8.1 Setup Templates

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

### 8.2 Key Direction & Quality

| Direction | Effect | Notes |
|-----------|--------|-------|
| Front-side 45° | Standard flattering | Default |
| Front 0° (camera direction) | Flat, beauty | High-key, kills dimension |
| Side 90° | Half-lit | Rembrandt |
| Back-side 135° | Most face in shadow | Mystery |
| Top-down | Eye sockets in shadow | Avoid unless intentional |
| Bottom-up (uplight) | Horror | Comedic only |

### 8.3 Color Temperature & Mood

| Temp | Color | Mood | Use |
|------|-------|------|-----|
| 3200K Tungsten | Warm orange | Cozy, evening | Story, Trust |
| 4500K Neutral | Balanced | Documentary | Default |
| 5600K Daylight | Cool blue | Clinical, awake | Authority, scientific |
| Magenta/Pink gel | Saturated pink | Trendy lifestyle | Hook attention pop |
| Teal/Cyan gel | Saturated blue-green | Cinematic sci-fi | Brand consistency |
| Amber/Orange gel | Saturated warm | Sunset, hope | Before/After "after" |

### 8.4 Key-to-Fill Ratios

| Ratio | Look | Use |
|-------|------|-----|
| 1:1 | Flat, no shadow | Beauty / high-key |
| 2:1 | Soft, mild dimension | Default |
| 4:1 | Cinematic | Story/Trust |
| 8:1 | Dramatic, deep | Low-key tension |
| No fill | Hard shadow | Silhouette, Split |

---

## 9. ACTOR / TALENT DIRECTION

Each present actor's block specifies: expression, eye contact, body language, energy (1–10), pace, tone, blocking.

### 9.1 Expression Vocabulary (concrete, observable)

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

### 9.2 Eye Contact Direction

| Direction | Use |
|-----------|-----|
| Direct to lens | Default — parasocial trust, DMN |
| Off-camera ~15° | Storytelling beat, "talking to someone else" |
| Down to prop/screen | Demonstration, reveal |
| Glance off then back | Conspiratorial / "you won't believe this" |
| Closed (eyes down) | Story conflict / emotional low — 0.5s max |

### 9.3 Energy Scale (1–10)

| Level | Voice | Body | Use |
|-------|-------|------|-----|
| 1–2 | Whisper, intimate | Still | Conspiratorial reveal, soft Story |
| 3–4 | Conversational | Subtle gestures | Education body, Story narration |
| 5–6 | Energized | Active gestures | Default hook delivery |
| 7–8 | Projected | Big gestures, full engagement | Comparison hook, Smart vs Dumb |
| 9–10 | Near-shouting | Whole body | ONE peak moment per video |

### 9.4 Pace

| Pace | Wpm | Use |
|------|-----|-----|
| Slow | ~120 | Story emotional low, gravity beats |
| Conversational | ~150 | Default explainer body |
| Fast | ~180 | Hook, urgency, list items |
| Rapid | ~210 | Pattern-disruption, "wait wait wait" |
| Variable | Speeds up/slows down within line | **Highest engagement — TRIBE v2: prevents auditory adaptation** |

### 9.5 Tone (from Phase-2 audio prosody emotion)

| Phase-2 emotion | Delivery direction |
|---|---|
| curiosity | Lifting intonation, audible breath before keyword |
| urgency | Faster, slightly pressed, no breath between words |
| concern | Lower pitch, slower, brow pre-furrowed |
| authority | Even pitch, controlled, no upward inflection on statements |
| excitement | Higher pitch, faster, smile in voice |
| disbelief | Dropped pitch at keyword, slight scoff before/after |

### 9.6 Body Language & Blocking

- **Hands-in-frame rule (EBA):** For any scene tagged with `body` trigger, hands MUST enter frame within first 1s. Education/Step structures keep hands visible throughout.
- **Open-palm rule:** Open palm = trust. Closed fist = emphasis. Pointing at lens = direct address (max 1× per video).
- **Lean:** Forward lean ~5° = engagement. Backward = "step back, let this land." Side = transition.
- **2+ actors blocking:** Actor A frame-left, Actor B frame-right (mirror only for last-line reversal). Cross only on cuts.

### 9.7 Pronunciation Guide (extend as needed)

Inline format: `term [pho-NEH-tik]`.

| Term | Pronunciation |
|------|---------------|
| TRIBE v2 | TRIBE [trybe] v-two |
| fMRI | f-MRI [eff em arr eye] |
| FFA | F-F-A [eff eff ay] |
| VWFA | VWFA [vee dub-yoo eff ay] |
| Algonauts | [AL-go-nawts] |
| NeuralSet | [NUR-uhl-set] |
| Llama 3.2 | LLaMA [LAH-mah] three point two |
| HuggingFace | [HUG-ing-face] |
| PyTorch | [pie-torch] |
| Broca's area | Broca's [BRO-kahz] area |
| Hippocampus | [hip-oh-CAM-pus] |
| Treyfa | [TRAY-fah] |
| Backero | [bak-EH-ro] |
| Ayurvedic | [aa-yur-VAY-dik] |

For multi-language delivery use tags: `[EN]`, `[HI]`, `[TA]`, `[HIN-EN]`, `[TAM-EN]`.

---

## 10. AUDIO DESIGN

### 10.1 Voice Source

| Source | Use |
|--------|-----|
| **Voiceover (VO) over B-roll** | **ABR default** — VO carries the line, B-roll/demonstration shows it |
| On-camera (lavalier) | Talking-head and Hybrid skins |
| VO over silent actor | Stylized — actor mouths or moves while VO carries |
| Synced lip + VO doubled | Rare — emphasis effect |
| No voice (silent moment) | Reaction reveals, text-only beats, prop reveals |

### 10.2 Background Music Cue Library

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

### 10.3 SFX Library

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

### 10.4 Mix Levels

| Element | Default |
|---------|---------|
| Voice (VO or lav) | -6 dB to -3 dB |
| Music bed | -18 to -15 dB; ducks to -24 dB under voice |
| SFX | -12 to -8 dB |
| Silence | -inf dB |

---

## 11. VISUAL ELEMENT DESIGN

### 11.1 On-Screen Text

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

### 11.2 Props

Each prop specifies: name, entry, in-scene action, neural-target purpose.

### 11.3 Background

- Color/texture
- Distance from subject (3–6 ft preferred)
- Texture density (low for hero shots)
- Practical lights visible if any

### 11.4 Graphic Overlays

- Arrows / circles — pointing at result, key text
- Progress bar — Step structures
- Split-screen divider — Comparison / Smart vs Dumb
- Animated charts — Proof / Cost — must show actual paper figure data
- Brain map overlay — TRIBE v2 figure reference (from `research_integrity.figure_reference`)

### 11.5 B-Roll / Insert Plan

ABR is dominated by B-roll. Every scene lists available B-roll sources:
- Custom-shot demonstration (hands, prop in use, screen recording)
- Result-state imagery (the brain map, the after photo, the chart)
- Archival / royalty-free (fMRI scanner footage, NASA imagery, historical clips)
- Screen capture (real software, real data)
- Animated graphics (motion graphics built in post)
- Stock fallback (last resort)

---

## 12. EDITING DIRECTION

### 12.1 Cut Types

| Cut | Use |
|-----|-----|
| Hard cut | Default — 90% of cuts |
| J-cut (next audio leads) | Smooth narrative, "and then..." |
| L-cut (current audio tails) | Continued thought across visual change |
| Match cut | Visual A matches shape/position of visual B |
| Jump cut | Same subject, slight skip — energy, removes pauses |
| Smash cut | Hard cut to radically different image | Pattern interrupt |

### 12.2 Transitions

| Transition | Use |
|-----------|-----|
| Hard cut | 90% default |
| Whip pan | Energy injection, list transitions |
| Speed ramp | Pre-payoff emphasis |
| Match-cut | Object-to-object transformation |
| Cross dissolve | Rare — time-jump or dream |
| Flash cut | Surprise reveal |

### 12.3 Caption Style

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

### 12.4 Speed Ramps

- Normal (1.0×) — default
- Slight slow (0.8×) — emphasis, micro-expression hold
- Slow-mo (0.5×) — payoff micro-moment (0.5–1.0s)
- Speed up (1.5–2.0×) — process compression
- Speed-ramp push (1.0× → 0.5× over 0.3s) — drama on a word

### 12.5 Color Grade

| Grade | Look | Use |
|-------|------|-----|
| Clean modern | Slight contrast lift, true skin tones, mild teal shadows | Default |
| Warm trust | Lifted warms, soft contrast | Story / Trust |
| Cool tech | Lifted blues, crisp contrast | Authority / scientific |
| High-contrast punch | Strong contrast, saturated brand color | Hook beats |
| Desaturated drama | Reduced saturation, deep shadows | "Wrong way" / Cost |

---

## 13. NEURAL → CAMERA / LIGHTING / DIRECTION MAPPING

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

## 14. GOLDEN RULES (v2 — neuro + PBL anchored)

### Rule 1 — Demonstration-First Dialogue ⭐ NEW
Every line is subject to the test: "Can this be SHOWN instead of SAID?" If yes, move it to action/visual. Dialogue is the fallback, not the default. Acceptable for: research claims with numeric fidelity, direct address, Reinforcement/Lesson beat, CTA.

### Rule 2 — Action-to-Dialogue Word Ratio ≥ 2.0 ⭐ NEW
For every spoken word, ≥ 2 words of action description in `action_parenthetical` or `visual` blocks. Forces visual density.

### Rule 3 — Silent-Runtime Quota by Format ⭐ NEW
ABR ≥ 50% silent; Whiteboard ≥ 30%; Two-person ≥ 25%; Talking-head ≥ 20%; Hybrid ≥ 35%. Silent = no dialogue spoken (captions + visuals + music + SFX allowed).

### Rule 4 — Hook Parseable Muted ⭐ NEW
The hook scene's visual + caption alone must carry the full message. VO is multiplier, not carrier. QC fails if hook depends on audio.

### Rule 5 — Broad → Narrow → Niche Across Timing ⭐ NEW
Hook scene = BROAD (universal language, zero jargon if possible). Body scenes = NARROW (research specifics, technical terms paired with on-screen decoders). CTA scene = NICHE (only the right viewer acts).

### Rule 6 — Show, Don't Tell (LOC / EBA / VWFA)
Every fact is DEMONSTRATED. If dialogue states a number, the number appears on screen simultaneously (Prefrontal dual coding). If dialogue names an object, the object is visible (LOC). If dialogue describes an action, the action is performed (EBA).

### Rule 7 — No Talking Head > 2 Seconds (MT/V5 maintenance)
After 2s of static talking-head, MT/V5 habituates. Required change every 2s: cut to different shot, on-screen text appears, prop enters, gesture, B-roll insert, caption highlight changes word.

### Rule 8 — Silent Moments Mandatory (FFA / LOC isolation)
- Reaction shots 0.5–1.0s — FFA isolation
- Product/object reveals 1.0–2.0s — LOC isolation
- Before/after cuts 1.0s each — V1–V4 contrast
- Text-only moments 1.0–2.0s — VWFA isolation
- Pre-CTA freeze 1.0s — executive decision space

### Rule 9 — Bridge Words Between Sentences (Language network continuity)
Every sentence connects: "And...", "But here's the thing...", "Which means...", "So now...", "And that's why..."

### Rule 10 — Action-Integrated Dialogue (EBA + STS co-activation)
Every line specifies WHAT THE ACTOR IS DOING. `action_parenthetical` reads as director's note attached to the line.

### Rule 11 — Tri-Modal Convergence in 0–1.5s (TPO Junction)
Hook scene satisfies all three modalities firing in first 1.5s:
- Visual: motion + contrast + (face or text or object) parseable by 0.5s
- Audio: first phoneme at 0.0s, emotional prosody, direct address by 0.5s
- Written: hero text (≤5 words) on screen by 0.3s

### Rule 12 — Research Fidelity Carry-Over
Numeric claims match Phase-2 `research_integrity.claim_fidelity` exactly. No inflation. On-screen number and spoken number match the paper. Institution anchor visible at least once. Code link in CTA scene.

### Rule 13 — Studio-Realistic Scope
Every camera move, lighting setup, prop, actor count achievable with `studio_assets`. Otherwise listed in `production_warnings` with substitute.

### Rule 14 — Caption Coverage = 100%
Every spoken word appears as synced caption block. 85% of social video watched muted.

### Rule 15 — One Peak Per Video
Exactly ONE energy-10 / speed-ramp / hard-emphasis moment per video. Lands at the structural payoff — not hook, not CTA.

### Rule 16 — Hook → Script → Format → Editing Priority (PBL)
When in doubt, optimize in this order. The hook must win first. Format is fourth — re-shootable across skins (PBL playbook: same script across talking-head, ABR, whiteboard variants).

### Rule 17 — 5× Outlier Match (when `reference_video` provided)
If a reference outlier video is supplied, match its cut rhythm at scene boundaries within ±20%. Match its format if `match_target = format`. Do NOT copy its dialogue.

---

## 15. STRUCTURE-SPECIFIC SCENE BLUEPRINTS (15 structures × format skin)

For each Phase-2 structure, the scene order is fixed. The format skin assignment per scene tells Phase-3 which production mode each scene runs in. Default assignments are tuned for ABR-dominant delivery.

### S-TIER

#### Structure 1 — Comparison (A vs B) | 7–8 scenes
| # | Scene | Default Format Skin | Brain Regions |
|---|-------|---------------------|---------------|
| 1 | Hook (contrast intro) | ABR (split-screen B-roll) | FFA (B-roll face), VWFA, MT, TPO |
| 2 | Option A behavior | ABR (process B-roll) | EBA, LOC |
| 3 | Consequence A | ABR (result-state insert) | FFA (B-roll), V1–V4 |
| 4 | Option B behavior | ABR (process B-roll, mirror) | EBA, LOC |
| 5 | Consequence B | ABR (result-state insert) | FFA, V1–V4 |
| 6 | Timeframe / Test | ABR (text + counter animation) | VWFA, Prefrontal |
| 7 | Explanation / Reinforcement | Hybrid (actor MCU first time) | STS, DMN |
| 8 | CTA | Hybrid (talking-head freeze) | VWFA |

#### Structure 2 — Step-by-Step | 5–6 scenes
| # | Scene | Default Format Skin | Brain Regions |
|---|-------|---------------------|---------------|
| 1 | Promise fix (hook) | ABR (result preview B-roll) | FFA (B-roll), VWFA, DMN |
| 2 | Step 1 + reason | Whiteboard (hand demo) | EBA, LOC, VWFA |
| 3 | Step 2 + reason | Whiteboard | EBA, LOC, VWFA |
| 4 | Step 3 + reason | Whiteboard | EBA, LOC, VWFA |
| 5 | Reinforcement | Hybrid (talking-head) | STS, DMN |
| 6 | CTA | Hybrid (talking-head freeze) | VWFA |

#### Structure 3 — Story Framework | 7–8 scenes
| # | Scene | Default Format Skin | Brain Regions |
|---|-------|---------------------|---------------|
| 1 | Setup (hook) | ABR (LS establishing + ambient B-roll) | PPA, MT |
| 2 | Conflict | ABR (B-roll showing problem) | FFA, TPJ |
| 3 | Emotional low | Hybrid (CU actor 3-Point Moody) | FFA, TPJ, Amygdala |
| 4 | Decision | Hybrid (MCU actor) | FFA, TPJ |
| 5 | Action | ABR (gimbal/process B-roll) | EBA, MT |
| 6 | Result | ABR (result-state imagery, mood lift) | FFA, V1–V4 |
| 7 | Lesson | Talking-head (MCU direct-to-lens) | STS, DMN |
| 8 | CTA | Talking-head freeze | VWFA |

### A-TIER

#### Structure 4 — Smart vs Dumb | 7 scenes
| # | Scene | Default Format Skin | Brain Regions |
|---|-------|---------------------|---------------|
| 1 | Contrast (hook) | Two-Person (2-Shot MLS) | FFA×2, MT, V1–V4 |
| 2 | Dumb behavior | Two-Person (MCU dumb actor, desaturated) | FFA, V1–V4 |
| 3 | Damage | ABR (B-roll consequence) | V1–V4, FFA |
| 4 | Smart behavior | Two-Person (MCU smart actor, clean) | FFA, EBA |
| 5 | Benefit | ABR (B-roll benefit) | FFA, LOC |
| 6 | Mechanism + Reinforcement | Talking-head (smart actor direct) | STS, DMN, Prefrontal |
| 7 | CTA | Two-Person freeze | FFA×2, VWFA |

#### Structure 5 — Do vs Don't | 7 scenes
| # | Scene | Default Format Skin | Brain Regions |
|---|-------|---------------------|---------------|
| 1 | Force choice (hook) | ABR (split B-roll with ✅/❌ overlay) | VWFA, FFA (B-roll), V1–V4 |
| 2 | Wrong behavior | ABR (process B-roll, dutch tilt, desaturated) | EBA, V1–V4 |
| 3 | Damage | ABR (result-state) | V1–V4, FFA |
| 4 | Correct behavior | ABR (process B-roll, clean) | EBA, LOC |
| 5 | Benefit | ABR (result-state) | FFA, V1–V4 |
| 6 | Reason / Mechanism | Hybrid (talking-head) | STS, DMN, Prefrontal |
| 7 | CTA | Hybrid freeze | VWFA |

#### Structure 6 — Myth Bust | 6 scenes
| # | Scene | Default Format Skin | Brain Regions |
|---|-------|---------------------|---------------|
| 1 | State myth (hook) | ABR (B-roll of common belief + "MYTH" text) | VWFA, FFA (B-roll), MT |
| 2 | Why believed | ABR (montage of common practice) | STS, LOC |
| 3 | Contradiction | ABR (smash cut + glitch SFX) | V1–V4, MT, A1 |
| 4 | Correct method | ABR (process B-roll + result) | EBA, LOC |
| 5 | Mechanism + Reinforcement | Hybrid (talking-head) | STS, DMN |
| 6 | CTA | Hybrid freeze | VWFA |

#### Structure 7 — List | 5–6 scenes
| # | Scene | Default Format Skin | Brain Regions |
|---|-------|---------------------|---------------|
| 1 | List setup (hook) | ABR (text + B-roll preview) | VWFA, FFA (B-roll) |
| 2 | Point 1 + reason | ABR (whip pan into item B-roll) | EBA, LOC, MT |
| 3 | Point 2 + reason | ABR (whip pan, same pattern) | EBA, LOC, MT |
| 4 | Point 3 + reason | ABR (whip pan, same pattern) | EBA, LOC, MT |
| 5 | Pattern insight | Hybrid (talking-head) | STS, DMN |
| 6 | CTA | Hybrid freeze | VWFA |

#### Structure 8 — 3-Level | 7 scenes
| # | Scene | Default Format Skin | Brain Regions |
|---|-------|---------------------|---------------|
| 1 | Introduce levels (hook) | ABR (3-tier caption + B-roll) | VWFA, FFA (B-roll) |
| 2 | Beginner demo | ABR (process B-roll) | EBA, LOC |
| 3 | Beginner limitation | ABR (result-state + reaction CU B-roll) | V1–V4, FFA |
| 4 | Intermediate demo + limitation | ABR (process + result) | EBA, LOC |
| 5 | Advanced demo | Hybrid (actor performs, hero shot) | FFA, EBA, V1–V4 |
| 6 | Insight | Hybrid (talking-head) | STS, DMN |
| 7 | CTA | Hybrid freeze | VWFA |

#### Structure 9 — PAS | 7 scenes
| # | Scene | Default Format Skin | Brain Regions |
|---|-------|---------------------|---------------|
| 1 | Problem (hook) | ABR (B-roll showing pain state) | FFA (B-roll), TPJ |
| 2 | Consequence | ABR (escalation B-roll) | V1–V4, FFA |
| 3 | Escalation | ABR (whip pan + faster cuts) | MT, A1 |
| 4 | Solution intro | ABR (mood lift B-roll) | FFA, V1–V4 |
| 5 | Action / Demo | ABR (process B-roll) | EBA, LOC |
| 6 | Mechanism + Reinforcement | Hybrid (talking-head) | STS, DMN, Prefrontal |
| 7 | CTA | Hybrid freeze | VWFA |

#### Structure 10 — Outcome → Pain → Solution | 5–6 scenes
| # | Scene | Default Format Skin | Brain Regions |
|---|-------|---------------------|---------------|
| 1 | Dream outcome (hook) | ABR (result-state B-roll, hero shot) | FFA (B-roll), LOC, V1–V4 |
| 2 | Obstacles | ABR (montage of pains, jump cuts) | V1–V4, MT |
| 3 | Solution | ABR (process B-roll) | FFA, STS |
| 4 | Core mechanism | Whiteboard (sketch + VO) | EBA, VWFA, Prefrontal |
| 5 | Reinforcement | Hybrid (talking-head) | STS, DMN |
| 6 | CTA | Hybrid freeze | VWFA |

#### Structure 11 — Before → After | 7–8 scenes
| # | Scene | Default Format Skin | Brain Regions |
|---|-------|---------------------|---------------|
| 1 | Transformation (hook) | ABR (split-screen Before/After) | V1–V4, FFA (B-roll), VWFA |
| 2 | Before state | ABR (desaturated B-roll) | PPA, FFA |
| 3 | Struggle | Hybrid (CU 3-Point Moody) | FFA, TPJ |
| 4 | Turning point | Hybrid (MCU push-in) | FFA, MT |
| 5 | Action | ABR (gimbal/process B-roll) | EBA, MT |
| 6 | Result | ABR (High-Key + amber gel) | FFA, V1–V4 |
| 7 | Lesson | Talking-head (MCU direct) | STS, DMN |
| 8 | CTA | Talking-head freeze | VWFA |

### B-TIER

#### Structure 12 — Time-Based Experiment | 7 scenes
| # | Scene | Default Format Skin | Brain Regions |
|---|-------|---------------------|---------------|
| 1 | Baseline (hook) | ABR (Day 0 caption + B-roll) | VWFA, FFA, LOC |
| 2 | Rule followed | ABR (process B-roll) | EBA, LOC |
| 3 | Duration | ABR (calendar/counter animation) | VWFA, Prefrontal |
| 4 | Observation | Hybrid (CU reaction OR B-roll face) | FFA, TPJ |
| 5 | Results | ABR (chart animation) | VWFA, V1–V4, Prefrontal |
| 6 | Insight / Reinforcement | Hybrid (talking-head) | STS, DMN |
| 7 | CTA | Hybrid freeze | VWFA |

#### Structure 13 — Fake Case Study | 5–6 scenes
| # | Scene | Default Format Skin | Brain Regions |
|---|-------|---------------------|---------------|
| 1 | Scenario (hook) | ABR (B-roll + "Subject X" caption) | VWFA, FFA (B-roll) |
| 2 | Step 1 + reason | ABR (insert/process) | EBA, LOC, VWFA |
| 3 | Step 2 + reason | ABR (insert/process) | EBA, LOC, VWFA |
| 4 | Step 3 | ABR (insert/process) | EBA, LOC, VWFA |
| 5 | Strategic stack | Whiteboard (sketch animation) | VWFA, Prefrontal |
| 6 | CTA | Hybrid freeze | VWFA |

#### Structure 14 — Double Down | 5 scenes
| # | Scene | Default Format Skin | Brain Regions |
|---|-------|---------------------|---------------|
| 1 | Existing winner (hook) | ABR (result-state B-roll) | VWFA, FFA, V1–V4 |
| 2 | One change | ABR (process B-roll showing change) | EBA, LOC |
| 3 | Additional insight | Hybrid (talking-head) | STS, DMN |
| 4 | Expected result + Reinforcement | ABR (new result + reaction) | VWFA, FFA |
| 5 | CTA | Hybrid freeze | VWFA |

#### Structure 15 — Cost Breakdown | 7 scenes
| # | Scene | Default Format Skin | Brain Regions |
|---|-------|---------------------|---------------|
| 1 | Cost truth (hook) | ABR (large "$X" number + B-roll) | VWFA, FFA, Prefrontal |
| 2 | Expense 1 | ABR (animated price reveal) | VWFA, V1–V4 |
| 3 | Expense 2 | ABR (animated price reveal) | VWFA, V1–V4 |
| 4 | Expense 3 | ABR (animated price reveal) | VWFA, V1–V4 |
| 5 | Total | ABR (big-number reveal + tension SFX) | VWFA, Prefrontal, A1 |
| 6 | Value comparison + Lesson | Hybrid (talking-head) | STS, DMN |
| 7 | CTA | Hybrid freeze | VWFA |

---

## 16. DIALOGUE ENGINEERING SPEC (v2)

| Rule | Spec |
|------|------|
| **Demonstration-first test** | Every line must pass: "Can this be SHOWN?" If yes, move to action/visual |
| Max words per line | 15 |
| Target words per line | 5–9 (single-breath, fast-readable caption) |
| Total dialogue word count per video | ABR target ≤ 80 words for a 30s video |
| Emphasis | 1–2 words per line marked — `*soft*` or `**HARD**` |
| Pauses | `...` = 0.3s; `(pause)` = 0.5s; `(beat)` = 1.0s silent reaction |
| Forbidden words | "revolutionary", "unlock", "discover", "amazing", "literally", "actually", "basically", "honestly", "really" |
| Syllable preference | Short, punchy ("fridge" > "refrigerator"; "brain" > "neural substrate") |
| Contractions | Required ("don't", "it's", "can't", "you're") |
| Questions | Max 1 per video, hook only |
| Second-person pronoun count | Min 2 per 10 words |
| Number specificity | Paper's exact number — never round vaguely |
| Pronunciation tags | Inline `term [pho-NEH-tik]` for technical/foreign/brand terms |
| Language tags | `[EN]`, `[HI]`, `[TA]`, `[HIN-EN]`, `[TAM-EN]` for multi-language segments |
| Readability target | Hook + CTA: ~5th-grade Hemingway equivalent. Body: technical terms allowed only when paired with on-screen text decoder |

---

## 17. OUTPUT FORMAT (v2)

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
    "actor_count": 0,
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
      "name": "...",
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
    /* additional scenes follow same schema */
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

## 18. QUALITY CHECK (v2)

### 18.1 Structural
- [ ] Scene count matches blueprint?
- [ ] Scene order matches blueprint?
- [ ] Each scene's `structure_beat` maps to Phase-2 `timing`?
- [ ] `format_skin` per scene consistent with blueprint?

### 18.2 Hook Scene
- [ ] First phoneme of VO at t=0.000s (no dead air)?
- [ ] Motion present within 0.1s (MT/V5)?
- [ ] Face in frame by 0.5s (actor or B-roll)?
- [ ] On-screen hero text by 0.3s?
- [ ] Tri-modal convergence in 0–1.5s confirmed?
- [ ] `convergence_window_met: true`?
- [ ] **Muted-parse test: hook fully understandable with audio off?** ⭐ NEW

### 18.3 Demonstration-First ⭐ NEW
- [ ] Every dialogue line passed "Can this be SHOWN?" test?
- [ ] Action-to-dialogue word ratio ≥ 2.0?
- [ ] Silent-runtime quota met for chosen format skin?
- [ ] Total spoken word count ≤ format target (ABR 30s: ≤ 80 words)?

### 18.4 Neural Target Coverage
- [ ] Each scene lists `neural_targets_fired`?
- [ ] Every Phase-2 neural target fired in at least one scene?
- [ ] Brain region → camera/lighting/direction mapping (§13) followed?

### 18.5 Broad → Narrow → Niche ⭐ NEW
- [ ] Hook scene uses universal vocabulary (no jargon)?
- [ ] Body scenes deliver narrow value to ICP?
- [ ] Technical terms in body paired with on-screen decoder?
- [ ] CTA niche-targeted (only right viewer acts)?

### 18.6 Dialogue Engineering
- [ ] Every line ≤ 15 words?
- [ ] Pronunciation tags applied to technical terms?
- [ ] 2nd-person pronoun min 2× per 10 words?
- [ ] No forbidden words?
- [ ] One question max, only in hook?
- [ ] Bridge words connect each scene's dialogue?
- [ ] Readability check: hook + CTA at ~5th-grade equivalent?

### 18.7 Visual / Camera / Lighting
- [ ] No talking-head shot exceeds 2s without visual change?
- [ ] Every scene's camera block has shot_size, angle, movement, lens, framing (or N/A for graphic/B-roll scenes)?
- [ ] Every actor-present scene has full lighting block?
- [ ] At least one silent moment?
- [ ] Captions cover 100% of spoken words?
- [ ] Single peak lands at structural payoff?

### 18.8 Studio Reality
- [ ] All props in `studio_assets.props_available`?
- [ ] All B-roll sources in `studio_assets.broll_sources_available`?
- [ ] All backgrounds from available list?
- [ ] Actor count matches input?
- [ ] Lighting setup count ≤ available fixtures?

### 18.9 Research Fidelity
- [ ] Numeric claims match Phase-2 `research_integrity.claim_fidelity` exactly?
- [ ] Figure reference on screen at proof beat?
- [ ] Institution anchor visible at least once?
- [ ] Code link in CTA scene?

### 18.10 PBL Operational Checks ⭐ NEW
- [ ] SEE/READ/HEAR triple-hook present in scene 1?
- [ ] Visual hook rated higher than verbal hook (per PBL: visual carries more weight)?
- [ ] If `reference_video` supplied: cut rhythm within ±20% of reference?
- [ ] 4-component script anatomy present (filming_notes + dialogue + caption + subtitle)?

### 18.11 CTA
- [ ] CTA scene has freeze frame on text?
- [ ] CTA text ≤ 5 words?
- [ ] CTA matches Phase-2 `cta.text` exactly?

---

## 19. EXAMPLE EXECUTION — TRIBE v2 Myth Bust (ABR-Dominant)

**Input:** Phase-2 output for TRIBE v2 zero-shot generalization, Structure 6 (Myth Bust), `actor_count: 0`, `content_complexity: research_heavy`, Instagram Reels 9:16, 35s, English, `format_override: ABR`.

**Output:**

```json
{
  "metadata": {
    "title": "AI predicts your brain better than your scan does",
    "phase2_structure_used": "6 — Myth Bust",
    "format_skin_primary": "ABR",
    "total_runtime_s": 35.0,
    "scene_count": 6,
    "spoken_word_count": 62,
    "silent_runtime_s": 19.5,
    "silent_runtime_percent": 55.7,
    "action_to_dialogue_word_ratio": 2.6,
    "actor_count": 0,
    "aspect_ratio": "9:16",
    "platform": "Instagram Reels",
    "language_primary": "EN",
    "content_complexity": "research_heavy"
  },
  "production_summary": {
    "shoot_estimate_hrs": 0.0,
    "vo_recording_estimate_hrs": 0.5,
    "lighting_setups_required": 0,
    "props_required": [],
    "props_missing_from_studio": [],
    "broll_sources_required": ["royalty_free_stock (fMRI scanner)", "screen_recording (Fig 3A scatter)", "custom_animation (brain map overlay)"],
    "broll_missing": ["custom_animation: brain map overlay — flag for graphic designer"],
    "backgrounds_used": [],
    "actors_required": [],
    "edit_complexity": "High (multi-source compositing)",
    "post_production_estimate_hrs": 3.5
  },
  "production_warnings": [
    "Scene 3 requires custom animated brain map overlay; flag designer 48hrs before edit start",
    "Scene 1 archival fMRI footage must be royalty-cleared before use"
  ],
  "research_integrity_carryforward": {
    "claim_fidelity_check": "PASSED — R=0.40 figure, 720 subjects, 1,000 hrs fMRI all match Phase-2",
    "figure_reference": "Fig 3A, Fig 3B, Table 1",
    "code_link_shown": "https://github.com/facebookresearch/tribev2",
    "institution_anchor_shown": "Meta FAIR"
  },
  "scenes": [
    {
      "number": 1,
      "name": "STATE THE MYTH",
      "structure_beat": "0-1s VISUAL HOOK + 1-3s AUDIO HOOK",
      "format_skin": "ABR",
      "timing": { "start": 0.0, "end": 3.0, "duration": 3.0 },
      "neural_targets_fired": ["MT/V5", "FFA (B-roll patient face in scanner)", "VWFA", "A1", "DMN", "TPO Junction"],
      "spoken_words_in_scene": 11,
      "silent_seconds_in_scene": 0.5,
      "filming_notes": "Pure ABR — no on-camera actor. B-roll: archival fMRI scanner footage with visible patient (royalty-free 1.5s clip). Then hard cut to white graphic frames with big yellow 'MYTH' text shattering into red 'WRONG.' VO recorded in studio separately. All edit-driven scene.",
      "vo": {
        "speaker": "VO_HOST",
        "line": "Myth: you need a **brain scan** to read your brain... wrong.",
        "emphasis_words": ["brain scan", "wrong"],
        "pace": "variable — slow on 'myth', fast on 'brain scan', pause, hard on 'wrong'",
        "tone": "conspiratorial → confrontational",
        "energy_level": 7,
        "first_word_onset_s": 0.0,
        "language": "EN",
        "readability_grade": 4,
        "demonstration_first_test": "PARTIAL — kept verbal because VO carries the conspiratorial-to-confrontational prosody arc, which visual alone can't deliver"
      },
      "action": "(t=0.0–1.5s: Archival fMRI scanner footage — patient sliding into machine, white tube, technician hand in frame. t=1.5s: HARD CUT to plain white background. Massive yellow 'MYTH' text pops in center frame. t=2.5s: glitch SFX + 'MYTH' shatters apart in pixels. t=2.7s: red 'WRONG.' text hard-cuts onto white background.)",
      "camera": { "shot_size": "Archival + Graphic", "angle": "N/A", "movement": "B-roll has inherent motion; graphic frames static", "lens_equivalent_mm": null, "framing": "9:16 safe zones for text" },
      "lighting": { "setup_template": "N/A (no live shot)", "notes": "Color grade only — slight contrast lift on archival" },
      "visual": {
        "primary_visual": "Archival fMRI scanner (0.0–1.5s) → Graphic 'MYTH' (1.5–2.5s) → Graphic 'WRONG.' (2.7–3.0s)",
        "on_screen_text": {
          "primary": { "text": "MYTH", "word_count": 1, "font_family": "Inter Black", "font_size_pt": 160, "color_hex": "#FFE600", "outline_px": 8, "outline_color_hex": "#000000", "position": "Center", "animation_in": "Pop-in 200ms", "animation_out": "Pixel shatter at 2.5s", "duration_on_screen_s": 1.0 },
          "secondary": { "text": "WRONG.", "font_family": "Inter Black", "font_size_pt": 180, "color_hex": "#FF3333", "position": "Center", "animation_in": "Hard cut", "duration_on_screen_s": 0.3 },
          "caption": { "text": "Myth: you need a brain scan to read your brain... wrong.", "animation": "Word-by-word pop synced to VO", "position": "Bottom 22%", "highlight_word": "wrong" }
        },
        "props": [],
        "background": "Archival → plain white graphic",
        "broll_required": [ { "type": "archival_fMRI_scanner_patient", "duration_s": 1.5, "source": "royalty_free_stock" } ]
      },
      "audio": {
        "voice_source": "VO over visuals",
        "voice_level_dB": -4,
        "background_music": { "cue": "No music 0–0.5s; subtle synth pulse from 0.5s building tension", "level_dB": -18, "ducks_to_dB": -24 },
        "sfx": [
          { "type": "subtle MRI hum (under archival)", "in_at_s": 0.0, "out_at_s": 1.5, "level_dB": -14 },
          { "type": "rising synth riser", "in_at_s": 1.5, "out_at_s": 2.5, "level_dB": -10 },
          { "type": "glitch shatter", "in_at_s": 2.5, "out_at_s": 2.7, "level_dB": -6 }
        ],
        "music_transition_to_next": "Beat drop on hard cut at 3.0s",
        "transition_audio": "Whoosh -8 dB"
      },
      "editing": { "cut_point": "Hard cut at 3.0s on 'wrong'", "transition_to_next": "Whoosh + smash cut", "caption_animation": "Word-by-word synced", "speed_ramp": "Normal", "color_grade": "High-contrast punch on graphics; archival slight contrast lift" },
      "multimodal_sync_check": { "visual_fired_at_s": 0.0, "audio_fired_at_s": 0.0, "text_fired_at_s": 0.2, "convergence_window_met": true, "tpo_activation_predicted": "HIGH" },
      "pbl_checks": { "see_read_hear_present": true, "broad_hook_test": "PASS", "muted_parse_test": "PASS — 'MYTH' text + scanner footage + 'WRONG.' carries message", "format_skin_consistent_with_blueprint": true },
      "production_notes_for_director": "First phoneme 'M' of 'Myth' MUST hit frame 1 (sync VO recording to archival footage's first frame). Glitch SFX must hit exactly at MYTH text shatter (2.5s). If sync drifts, re-cut."
    },
    {
      "number": 2,
      "name": "WHY BELIEVED",
      "structure_beat": "3-8s PROOF SETUP",
      "format_skin": "ABR",
      "timing": { "start": 3.0, "end": 8.0, "duration": 5.0 },
      "neural_targets_fired": ["FFA (B-roll faces in lab footage)", "PPA (lab environment)", "STS", "LOC"],
      "spoken_words_in_scene": 14,
      "silent_seconds_in_scene": 1.0,
      "filming_notes": "ABR — montage of common neuroscience research practices. B-roll: real lab footage (royalty-free): researcher with subject, scanner room, computer screens with brain data. Quick cuts every 0.8s. VO continues from scene 1.",
      "vo": { "speaker": "VO_HOST", "line": "For 50 years, neuroscience needed scanners. *Bigger* scanners. *More* subjects. *Hours* of recording.", "emphasis_words": ["Bigger", "More", "Hours"], "pace": "fast with rhythmic emphasis", "tone": "matter-of-fact", "energy_level": 5, "first_word_onset_s": 0.0, "language": "EN", "readability_grade": 5, "demonstration_first_test": "PASS — VO needed because visual alone can't carry '50 years' temporal claim" },
      "action": "(t=0.0–1.5s: B-roll lab researcher placing electrodes on subject. t=1.5–3.0s: B-roll fMRI scanner control room, screens with brain images. t=3.0–4.0s: B-roll close-up of brain image rotating on screen. t=4.0–5.0s: B-roll graph paper with measurements being taken. Each cut 0.8s.)",
      "camera": { "shot_size": "Various B-roll", "angle": "Various", "movement": "B-roll inherent", "lens_equivalent_mm": null, "framing": "9:16 cropped from horizontal B-roll where needed" },
      "lighting": { "setup_template": "N/A", "notes": "Color grade: cool tech (lifted blues, crisp contrast)" },
      "visual": {
        "primary_visual": "Montage: lab research B-roll, 4 cuts, 0.8s each + 0.8s last extended",
        "on_screen_text": { "caption": { "text": "For 50 years, neuroscience needed scanners. Bigger scanners. More subjects. Hours of recording.", "animation": "Word-by-word pop synced", "position": "Bottom 22%", "highlight_word": "50 years" } },
        "props": [],
        "background": "Real lab environments from B-roll",
        "broll_required": [
          { "type": "lab_researcher_with_subject", "duration_s": 1.5, "source": "royalty_free_stock" },
          { "type": "fMRI_control_room", "duration_s": 1.5, "source": "royalty_free_stock" },
          { "type": "brain_image_on_screen", "duration_s": 1.0, "source": "royalty_free_stock" },
          { "type": "data_measurement_close", "duration_s": 1.0, "source": "royalty_free_stock" }
        ]
      },
      "audio": { "voice_source": "VO over visuals", "voice_level_dB": -4, "background_music": { "cue": "Building energy, 100 bpm", "level_dB": -16, "ducks_to_dB": -24 }, "sfx": [ { "type": "subtle clicks per cut", "in_at_s": 0.8, "out_at_s": 0.85, "level_dB": -14 } ], "music_transition_to_next": "Sustain into scene 3 with rising intensity", "transition_audio": "Whoosh -10 dB" },
      "editing": { "cut_point": "Hard cut at 5.0s", "transition_to_next": "Whoosh into scene 3 reveal", "caption_animation": "Word-by-word synced", "speed_ramp": "Normal", "color_grade": "Cool tech" },
      "multimodal_sync_check": { "visual_fired_at_s": 0.0, "audio_fired_at_s": 0.0, "text_fired_at_s": 0.0, "convergence_window_met": true, "tpo_activation_predicted": "MEDIUM" },
      "pbl_checks": { "see_read_hear_present": true, "broad_hook_test": "PASS — universal vocabulary, no jargon yet", "muted_parse_test": "PASS — B-roll montage + caption", "format_skin_consistent_with_blueprint": true },
      "production_notes_for_director": "Each B-roll cut exactly 0.8s, locked. Music tempo must match cut rhythm."
    },
    {
      "number": 3,
      "name": "CONTRADICTION (THE PROOF)",
      "structure_beat": "8-15s IMPLICATION",
      "format_skin": "ABR",
      "timing": { "start": 8.0, "end": 15.0, "duration": 7.0 },
      "neural_targets_fired": ["V1–V4 (high contrast brain map)", "MT/V5 (rotating brain)", "VWFA", "A1", "Prefrontal (R=0.40)", "TPJ"],
      "spoken_words_in_scene": 18,
      "silent_seconds_in_scene": 1.5,
      "filming_notes": "ABR — hero scene. Screen-recording of TRIBE v2 demo OR custom animation of Fig 3A scatter plot. Brain map overlay animates: gray surface → red dots (real fMRI) → green dots (TRIBE prediction) → green correlation value R=0.40 burns in. Glitch SFX on reveal. VO carries scientific claim with paired on-screen number decoder.",
      "vo": { "speaker": "VO_HOST", "line": "But Meta's TRIBE [trybe] v-two predicted brain activity *better* than the average **real scan**. R equals zero point four. Two times the median.", "emphasis_words": ["better", "real scan", "Two times"], "pace": "slow on numbers, fast on connectives", "tone": "disbelief → authority", "energy_level": 8, "first_word_onset_s": 0.0, "language": "EN", "readability_grade": 7, "demonstration_first_test": "FAIL → ACCEPTED with decoder. Scientific claim needed verbatim; paired with on-screen 'R = 0.40' number decoder per Demonstration-First exception clause." },
      "action": "(t=0.0–1.5s: Animated brain map fades in — gray fsaverage5 cortical surface, slow rotation. t=1.5–3.0s: red dots appear scattered across surface, label 'REAL fMRI'. t=3.0–4.5s: green dots overlay, perfectly tracking red, label 'TRIBE v2 PREDICTION'. t=4.5–5.5s: green correlation value 'R = 0.40' burns in upper-right in gold. t=5.5–7.0s: zoom-in on R=0.40, comparison '2× median subject' overlay.)",
      "camera": { "shot_size": "Animated brain map + numerical overlay", "angle": "Slight orbit around brain", "movement": "Slow orbit during 0–3s; locked from 3s", "lens_equivalent_mm": null, "framing": "Brain centered upper 60%, numbers lower 40%" },
      "lighting": { "setup_template": "N/A (animation)", "notes": "Color grade: cool tech with high-contrast gold accent for numbers" },
      "visual": {
        "primary_visual": "Animated brain map with overlay reveal",
        "on_screen_text": {
          "primary": { "text": "R = 0.40", "word_count": 3, "font_family": "Inter Black", "font_size_pt": 120, "color_hex": "#FFD700", "outline_px": 6, "outline_color_hex": "#000000", "position": "Upper-right quadrant", "animation_in": "Burn-in glow 600ms", "duration_on_screen_s": 4.0, "highlight_word": "0.40" },
          "secondary": { "text": "2× the median subject", "font_family": "Inter Bold", "font_size_pt": 72, "color_hex": "#FFFFFF", "position": "Lower-third", "animation_in": "Pop-in 200ms", "duration_on_screen_s": 1.5 },
          "caption": { "text": "But Meta's TRIBE v2 predicted brain activity better than the average real scan. R equals zero point four. Two times the median.", "animation": "Word-by-word synced", "position": "Bottom 22%", "highlight_word": "better" }
        },
        "props": [],
        "background": "Cool dark gradient supporting brain hero",
        "broll_required": [ { "type": "custom_animation_brain_map_overlay", "duration_s": 7.0, "source": "custom_animation — designer brief required" } ]
      },
      "audio": { "voice_source": "VO over animation", "voice_level_dB": -4, "background_music": { "cue": "Awe / discovery — major chord building", "level_dB": -16, "ducks_to_dB": -24 }, "sfx": [ { "type": "shimmer on R=0.40 burn-in", "in_at_s": 4.5, "out_at_s": 5.0, "level_dB": -10 }, { "type": "soft impact on '2× median'", "in_at_s": 5.5, "out_at_s": 5.8, "level_dB": -10 } ], "music_transition_to_next": "Sustain", "transition_audio": "None — direct cut to scene 4" },
      "editing": { "cut_point": "Hard cut at 7.0s", "transition_to_next": "Match cut on R number → next scene's number reveal", "caption_animation": "Word-by-word synced", "speed_ramp": "Slight slow (0.9×) on 'R equals zero point four' for emphasis", "color_grade": "Cool tech with gold accent" },
      "multimodal_sync_check": { "visual_fired_at_s": 0.0, "audio_fired_at_s": 0.0, "text_fired_at_s": 4.5, "convergence_window_met": true, "tpo_activation_predicted": "HIGH" },
      "pbl_checks": { "see_read_hear_present": true, "broad_hook_test": "N/A — body scene allowed technical", "muted_parse_test": "PASS — brain map animation + R=0.40 carries claim without VO", "format_skin_consistent_with_blueprint": true },
      "production_notes_for_director": "Custom brain map animation MUST be designer-prepared 48hrs before edit. R=0.40 burn-in timed to VO emphasis on 'zero point four'. If brain animation slips, fall back to actual TRIBE v2 Fig 3A scatter plot screen-captured from paper."
    },
    {
      "number": 4,
      "name": "HOW (CORRECT METHOD)",
      "structure_beat": "15-25s MECHANISM",
      "format_skin": "ABR",
      "timing": { "start": 15.0, "end": 25.0, "duration": 10.0 },
      "neural_targets_fired": ["EBA (B-roll hands typing)", "LOC (transformer diagram)", "VWFA (numbers 1B, 720, 1000)", "MT/V5 (animation flow)", "Prefrontal"],
      "spoken_words_in_scene": 19,
      "silent_seconds_in_scene": 3.5,
      "filming_notes": "ABR — process B-roll heavy. Screen recordings + custom diagram animations. Show: V-JEPA2 + Wav2Vec-BERT + Llama 3.2 logos cascading into one box labeled 'TRIBE v2'. Then animated stats burn in: 1,000 hrs · 720 brains · 1B parameters. Long silent stretches with just visuals + caption.",
      "vo": { "speaker": "VO_HOST", "line": "Three models — video, audio, text — fed into one transformer. One billion parameters. Trained on a thousand hours of brain scans.", "emphasis_words": ["Three", "billion", "thousand"], "pace": "conversational, deliberate on numbers", "tone": "authority", "energy_level": 6, "first_word_onset_s": 0.0, "language": "EN", "readability_grade": 6, "demonstration_first_test": "PASS — VO needed for the architecture explanation but heavily paired with visual decoder" },
      "action": "(t=0.0–2.0s: Three small logo icons appear left side — V-JEPA2 (video icon), Wav2Vec-BERT (waveform icon), Llama 3.2 (text icon). t=2.0–4.0s: arrows animate from three icons converging into a single box labeled 'TRIBE v2'. t=4.0–6.0s: silent — '1 BILLION PARAMETERS' burns in below the box, large gold text. t=6.0–8.0s: silent — counter animation '720 BRAINS · 1,000 HOURS fMRI' burns in. t=8.0–10.0s: brain map flickers behind text, showing model's output.)",
      "camera": { "shot_size": "Diagram animation + statistical reveal", "angle": "N/A", "movement": "Animation-driven", "lens_equivalent_mm": null, "framing": "Diagram upper 70%, stats lower 30%" },
      "lighting": { "setup_template": "N/A", "notes": "Cool tech grade" },
      "visual": {
        "primary_visual": "Architecture diagram animation + stats burn-in",
        "on_screen_text": {
          "primary": { "text": "1 BILLION PARAMETERS", "font_family": "Inter Black", "font_size_pt": 88, "color_hex": "#FFD700", "position": "Center lower-third", "animation_in": "Number-by-number count-up 1.0s", "duration_on_screen_s": 4.0 },
          "secondary": { "text": "720 BRAINS · 1,000 HRS fMRI", "font_family": "Inter Bold", "font_size_pt": 64, "color_hex": "#FFFFFF", "position": "Center", "animation_in": "Pop-in synced to VO", "duration_on_screen_s": 4.0 },
          "tertiary_meta_anchor": { "text": "Source: Meta FAIR, 2026", "font_family": "Inter Regular", "font_size_pt": 28, "color_hex": "#AAAAAA", "position": "Bottom-right corner", "duration_on_screen_s": 10.0 },
          "caption": { "text": "Three models — video, audio, text — fed into one transformer. One billion parameters. Trained on a thousand hours of brain scans.", "animation": "Word-by-word synced", "position": "Bottom 22%", "highlight_word": "billion" }
        },
        "props": [],
        "background": "Cool dark gradient",
        "broll_required": [ { "type": "custom_animation_architecture_diagram", "duration_s": 10.0, "source": "custom_animation" } ]
      },
      "audio": { "voice_source": "VO over animation", "voice_level_dB": -4, "background_music": { "cue": "Steady authority bed, 90 bpm", "level_dB": -18, "ducks_to_dB": -24 }, "sfx": [ { "type": "tick on each number count-up", "in_at_s": 4.0, "out_at_s": 5.0, "level_dB": -14 }, { "type": "soft impact on 'thousand'", "in_at_s": 8.0, "out_at_s": 8.2, "level_dB": -10 } ], "music_transition_to_next": "Sustain into reinforcement", "transition_audio": "None" },
      "editing": { "cut_point": "Hard cut at 10.0s", "transition_to_next": "Cross dissolve to talking-head", "caption_animation": "Word-by-word synced", "speed_ramp": "Normal", "color_grade": "Cool tech" },
      "multimodal_sync_check": { "visual_fired_at_s": 0.0, "audio_fired_at_s": 0.0, "text_fired_at_s": 4.0, "convergence_window_met": true, "tpo_activation_predicted": "MEDIUM" },
      "pbl_checks": { "see_read_hear_present": true, "broad_hook_test": "N/A (body)", "muted_parse_test": "PASS — diagram + numbers carry the architecture story", "format_skin_consistent_with_blueprint": true },
      "production_notes_for_director": "Architecture animation: brief designer to use Meta brand colors. Numbers must tick in audibly with VO emphasis. Silent stretches (4.0–6.0s, 6.0–8.0s) are intentional — do NOT fill with music swell, let the numbers breathe."
    },
    {
      "number": 5,
      "name": "REINFORCEMENT (Talking-Head Insert)",
      "structure_beat": "25-31s LESSON",
      "format_skin": "Hybrid → Talking-Head insert",
      "timing": { "start": 25.0, "end": 31.0, "duration": 6.0 },
      "neural_targets_fired": ["FFA", "STS", "DMN", "Prefrontal"],
      "spoken_words_in_scene": 14,
      "silent_seconds_in_scene": 0.5,
      "filming_notes": "FIRST talking-head appearance in the video. Single MCU shot of A1 (host), direct to lens, eye-level, plain white wall background. 3-Point Bright lighting, 50mm, 2:1 ratio. One take. Host should rehearse — energy 6, calm authority, slight forward lean. This is the parasocial-trust beat.",
      "vo": { "speaker": "A1 (on-camera)", "line": "So no — *you* don't need a scanner. You need this model. Open source. Free.", "emphasis_words": ["you", "free"], "pace": "slow, deliberate", "tone": "authority with warmth", "energy_level": 6, "first_word_onset_s": 0.0, "language": "EN", "readability_grade": 3, "demonstration_first_test": "FAIL → ACCEPTED. Reinforcement beat is one of four acceptable dialogue cases. Direct address ('you') triggers DMN — must be verbal." },
      "action": "(A1 enters frame at scene start via cross-dissolve from animation. MCU eye-level. A1 looks directly to lens, slight forward lean. On 'you don't need' — slight head shake. On 'free' — small confident closed-mouth smile.)",
      "camera": { "shot_size": "MCU", "angle": "Eye-level", "movement": "Static, locked", "lens_equivalent_mm": 50, "framing": "Center, 7% headroom, rule of thirds" },
      "lighting": { "setup_template": "3-Point Bright", "key": { "direction": "Front-side 45° camera-right", "intensity": "100%", "quality": "Soft", "color_temp_K": 4500 }, "fill": { "direction": "Camera-left", "intensity": "50%", "color_temp_K": 4500 }, "backlight": { "direction": "Behind, rim", "intensity": "60%", "color_temp_K": 5600, "gel": "none" }, "ratio_key_fill": "2:1", "mood_descriptor": "Clean, warm authority", "practical_sources": [] },
      "actor": { "id": "A1", "expression": "Calm authority, slight closed-mouth smile on 'free'", "eye_contact": "Direct to lens", "body_language": "Slight forward lean 5°, hands not visible (no gestures needed)", "energy_level_1_10": 6, "pace": "Slow deliberate", "tone": "Authority with warmth", "blocking": "Center frame, MCU framing" },
      "visual": {
        "primary_visual": "A1 talking-head, MCU",
        "on_screen_text": {
          "primary": { "text": "OPEN SOURCE · FREE", "font_family": "Inter Black", "font_size_pt": 64, "color_hex": "#FFE600", "position": "Lower-third", "animation_in": "Pop-in on 'Open source'", "duration_on_screen_s": 3.5 },
          "caption": { "text": "So no — you don't need a scanner. You need this model. Open source. Free.", "animation": "Word-by-word synced", "position": "Bottom 22%", "highlight_word": "Free" }
        },
        "props": [],
        "background": "Plain white wall",
        "broll_required": []
      },
      "audio": { "voice_source": "On-camera lavalier", "voice_level_dB": -4, "background_music": { "cue": "Resolve — major chord swell, gentle", "level_dB": -20, "ducks_to_dB": -26 }, "sfx": [], "music_transition_to_next": "Sustain into CTA", "transition_audio": "None" },
      "editing": { "cut_point": "Hard cut at 6.0s", "transition_to_next": "Cross dissolve to CTA", "caption_animation": "Word-by-word synced", "speed_ramp": "Normal", "color_grade": "Clean modern with slight warmth" },
      "multimodal_sync_check": { "visual_fired_at_s": 0.0, "audio_fired_at_s": 0.0, "text_fired_at_s": 1.5, "convergence_window_met": true, "tpo_activation_predicted": "MEDIUM" },
      "pbl_checks": { "see_read_hear_present": true, "broad_hook_test": "N/A (body)", "muted_parse_test": "PASS — face + caption + lower-third text carries", "format_skin_consistent_with_blueprint": true },
      "production_notes_for_director": "Single take if possible. Energy 6 — NOT pitched up. Calm authority is the goal. The 'Free' beat is the emotional resolution of the whole video — must land. Slight smile, no excess."
    },
    {
      "number": 6,
      "name": "CTA",
      "structure_beat": "31-35s CTA",
      "format_skin": "Hybrid → Talking-Head freeze",
      "timing": { "start": 31.0, "end": 35.0, "duration": 4.0 },
      "neural_targets_fired": ["VWFA", "DMN", "FFA"],
      "spoken_words_in_scene": 4,
      "silent_seconds_in_scene": 0.0,
      "filming_notes": "Continuous from scene 5. Same camera position. A1 makes save-icon gesture with fingers. URL bar appears bottom of frame. Freeze on final frame for 1s.",
      "vo": { "speaker": "A1 (on-camera)", "line": "Save this. Link in bio.", "emphasis_words": ["Save"], "pace": "slow, two beats", "tone": "Direct", "energy_level": 6, "first_word_onset_s": 0.0, "language": "EN", "readability_grade": 2, "demonstration_first_test": "FAIL → ACCEPTED. CTA is acceptable dialogue case." },
      "action": "(A1 same framing as scene 5. On 'Save' — right hand makes subtle bookmark gesture with fingers. On 'Link in bio' — eyes flick down briefly then back to lens. Freeze final 1s on direct gaze.)",
      "camera": { "shot_size": "MCU", "angle": "Eye-level", "movement": "Static, freeze final frame at 3.0s", "lens_equivalent_mm": 50, "framing": "Same as scene 5" },
      "lighting": { "setup_template": "3-Point Bright (same as scene 5)", "key": { "direction": "Front-side 45° camera-right", "intensity": "100%", "quality": "Soft", "color_temp_K": 4500 }, "fill": { "direction": "Camera-left", "intensity": "50%", "color_temp_K": 4500 }, "backlight": { "direction": "Behind, rim", "intensity": "60%", "color_temp_K": 5600, "gel": "none" }, "ratio_key_fill": "2:1", "mood_descriptor": "Clean final" },
      "actor": { "id": "A1", "expression": "Confident, slight closed-mouth smile", "eye_contact": "Direct to lens; brief down on 'bio'", "body_language": "Right hand bookmark gesture at t=0.0s", "energy_level_1_10": 6, "pace": "Slow", "tone": "Direct", "blocking": "Same as scene 5" },
      "visual": {
        "primary_visual": "A1 MCU with save gesture",
        "on_screen_text": {
          "primary": { "text": "SAVE → Link in bio", "font_family": "Inter Black", "font_size_pt": 96, "color_hex": "#FFE600", "outline_px": 6, "outline_color_hex": "#000000", "position": "Center lower-third", "animation_in": "Pop-in 200ms", "duration_on_screen_s": 4.0, "highlight_word": "SAVE" },
          "url_bar": { "text": "github.com/facebookresearch/tribev2", "font_family": "Inter Regular", "font_size_pt": 28, "color_hex": "#FFFFFF", "position": "Very bottom, above platform UI", "duration_on_screen_s": 4.0 },
          "caption": { "text": "Save this. Link in bio.", "animation": "Word-by-word synced", "position": "Above url_bar", "highlight_word": "SAVE" }
        },
        "props": [],
        "background": "Plain white wall (same as scene 5)",
        "broll_required": []
      },
      "audio": { "voice_source": "On-camera lavalier", "voice_level_dB": -4, "background_music": { "cue": "Resolve sustaining, fading at 3.5s", "level_dB": -20, "ducks_to_dB": -26 }, "sfx": [ { "type": "subtle ding on SAVE text appearance", "in_at_s": 0.0, "out_at_s": 0.3, "level_dB": -12 } ], "music_transition_to_next": "Fade to silence", "transition_audio": "None" },
      "editing": { "cut_point": "Freeze final 1.0s at 4.0s", "transition_to_next": "Fade to platform end-screen", "caption_animation": "Word-by-word synced", "speed_ramp": "Normal", "color_grade": "Clean modern" },
      "multimodal_sync_check": { "visual_fired_at_s": 0.0, "audio_fired_at_s": 0.0, "text_fired_at_s": 0.0, "convergence_window_met": true, "tpo_activation_predicted": "MEDIUM" },
      "pbl_checks": { "see_read_hear_present": true, "broad_hook_test": "N/A (CTA)", "muted_parse_test": "PASS — SAVE text + URL bar + gesture carry the CTA", "format_skin_consistent_with_blueprint": true },
      "production_notes_for_director": "Hold final freeze for the full second. URL bar legible but subtle. Music fades to silence on the freeze — let it end clean."
    }
  ],
  "post_production_checklist": [
    "Color-match scene 5 and scene 6 (same lighting setup, must be identical)",
    "Confirm R=0.40 burn-in scene 3 syncs to VO emphasis on 'zero point four'",
    "Verify Meta FAIR anchor visible in scene 4 lower-right corner",
    "Verify github URL in scene 6 legible at mobile preview size",
    "Confirm archival fMRI footage scene 1 is royalty-cleared (or replace with cleared alternative)",
    "Custom brain map animation scene 3 + architecture diagram scene 4 — both from designer brief",
    "Export 1080×1920 9:16 H.264 30fps 12 Mbps"
  ]
}
```

**Notable v2 properties of this example:**
- **Zero on-camera presence in scenes 1–4** (16 of 35 seconds, ~46% of runtime). Host appears only in scenes 5–6 (the Reinforcement and CTA).
- **Silent-runtime: 55.7%** (well above ABR's 50% floor).
- **Action-to-dialogue ratio: 2.6** (above the 2.0 floor).
- **Total spoken words: 62** (well under the 80-word target for ABR 30s).
- **Hook scene 1 muted-parse test: PASS** — archival fMRI footage + "MYTH" text + "WRONG." graphic carries full meaning without audio.

---

## 20. APPENDIX A — MULTI-LANGUAGE DELIVERY (Hindi / Tamil / Hinglish / Tanglish)

| Tag | Use |
|---|---|
| `[EN]` | Pure English |
| `[HI]` | Pure Hindi (Devanagari script in captions) |
| `[TA]` | Pure Tamil (Tamil script in captions) |
| `[HIN-EN]` | Hinglish — code-switch (Roman script captions) |
| `[TAM-EN]` | Tanglish — code-switch (Roman script captions) |

**Caption rules for multi-language:**
- Auto-translate captions toggle in CapCut/Premiere — never burn-in only one language unless platform-targeted
- Technical terms stay English even inside Hindi/Tamil dialogue ("ye [HIN-EN] AI ka future hai")
- Brand names always English script

**Prosody adjustments:**
- **Hindi:** emphasis on second-syllable of compound words; rising tone on questions; Bollywood-style emotional prosody acceptable and effective
- **Tamil:** emphasis often on first syllable; falling tone on declaratives
- **Both:** faster pace acceptable than English; Indian audiences tolerate ~180–200 wpm

---

## 21. APPENDIX B — STUDIO SHOT PREP CHECKLIST (auto-generated from output)

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

## 22. PHASE-4 FORWARD COMPATIBILITY

This output is designed to feed directly into a future Phase-4 AI-generation pipeline:
- `scenes[].camera`, `scenes[].lighting`, `scenes[].action`, `scenes[].visual.background` → text-to-video model prompts (Veo, Sora, Runway)
- `scenes[].vo.line` + `scenes[].vo.tone` + `scenes[].vo.pace` → text-to-speech voice generation
- `scenes[].visual.on_screen_text` → motion graphics template auto-renderer
- `scenes[].audio.background_music.cue` → music generation prompts
- `scenes[].editing.cut_point` + `scenes[].editing.transition_to_next` → NLE auto-assembly via JSON edit decision list
- `scenes[].visual.broll_required[]` → stock-footage API query OR generative B-roll prompt

The schema is identical for in-studio production (Phase-3a) and all-AI generation (Phase-3b) — only the production backend differs.

---

## 23. APPENDIX C — INDIAN MARKET LOCALIZATION

This appendix overlays cultural and linguistic adjustments when content is targeted at Indian audiences across Scalerock's brand portfolio (Treyfa, Backero) or Indian-context research distribution.

### 23.1 Cultural Anchors

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

### 23.2 Code-Switching Patterns

For Hinglish (Hindi-English code-switch), default register:
- Technical/scientific terms stay English
- Connectives, descriptors, emotion in Hindi
- Example: "ye AI [trybe] [HIN-EN] brain ke andar dekh leta hai, bina scan ke" (this AI looks inside the brain, without scanning)

For Tanglish (Tamil-English code-switch):
- Same pattern as Hinglish — technical English, emotion Tamil
- Example: "[TA] indha AI [trybe] [TAM-EN] brain-ah scan illaama paaththuduthu" (this AI sees the brain without scanning)

### 23.3 Visual References That Resonate

| Use | Avoid |
|---|---|
| Indian kitchen with brass / steel utensils | Generic Western kitchen |
| Indian street market for "trust local" framing | Whole-Foods-style aspirational shots (lose 70% of mid-tier audience) |
| Cricket as reference sport | Baseball / American football |
| Bollywood-style emotional close-ups acceptable | Hard "American TV ad" delivery (reads inauthentic) |
| Saturated color grading | Muted Scandinavian look (cold for Indian eye) |
| Visible Indian script in B-roll backgrounds | Sterile English-only environments |

### 23.4 Audio Prosody for Indian Delivery

- Bollywood-style emotional swell is acceptable and effective for Story/Trust beats
- American "yo what's up" register doesn't translate — sounds inauthentic
- Hindi/Tamil VO should be paced ~5–10% faster than English equivalent — Indian ear tolerates faster speech
- Music: blend electronic with subtle Indian classical motifs (tabla, sitar accents) for premium feel; pure Bollywood remix for mass-market

### 23.5 Beauty-Specific (Treyfa) Localization

For Treyfa beauty content:
- Face presence is recommended (founder/model on camera) — but per user spec, NOT mandatory in v2. Pure ABR with hands + product is acceptable.
- Color palette in graphics: gold + cream + saturated brand color (warm tones outperform cool in Indian beauty)
- Trust beats: "lab-tested", "dermatologist-approved" (if true), "[N] ingredients" with on-screen count
- Demo focus: process B-roll of product application (hands applying serum, hands smoothing cream) — EBA + LOC + V1–V4 stack
- Music: feminine soft pulse, 80–95 bpm, no harsh drops

### 23.6 B2B / Backero Localization

For Backero B2B cosmetic manufacturing content:
- Tone: authority, calm, professional
- B-roll: factory floor, lab coats, batch numbers, certification stamps
- On-screen text emphasis: scale numbers (units/year, square footage, years in operation)
- Music: corporate underscore, 90–100 bpm
- Avoid Bollywood-emotion — B2B Indian buyers want signal-of-competence, not warmth

---

## 24. APPENDIX D — REFERENCE VIDEO USAGE (5× Outlier Matching)

Per PBL operating playbook: an outlier reference video is one whose views ≥ 5× the source account's follower count. When `production_context.reference_video.url` is provided, Phase-3 uses it as a pacing/format constraint.

### 24.1 What Phase-3 Extracts from a Reference Video

Phase-3 does NOT copy dialogue or specific visual ideas (that's plagiarism risk). It extracts only structural properties:

| Property | How Phase-3 uses it |
|---|---|
| **Cut rhythm** (average seconds between cuts) | Phase-3 matches scene-boundary timing within ±20% |
| **Format skin** (ABR / talking-head / whiteboard) | Phase-3 adopts same format if `match_target = format` |
| **Hook duration** (when does the hook resolve into body?) | Phase-3 sets scene 1 duration to match |
| **Caption density** (words per second) | Phase-3 matches caption pacing |
| **Music presence/absence in first 0.5s** | Phase-3 matches |
| **Aspect ratio + safe zone usage** | Phase-3 matches |
| **Energy curve** (where in runtime does the peak land?) | Phase-3 places its single peak at same relative position |

### 24.2 What Phase-3 Does NOT Extract

- Specific dialogue lines
- Specific visual content
- Specific hooks or punchlines
- Specific actors / faces / wardrobe
- Specific music tracks

The reference is for *rhythm and format*, not content.

### 24.3 Match Target Modes

| `match_target` | What it constrains |
|---|---|
| `pacing` | Cut rhythm + scene boundary timing |
| `cut_rhythm` | Strict per-scene cut intervals matched |
| `format` | Format skin choice (ABR/talking-head/etc.) |
| `hook_structure` | Hook scene timing + tri-modal sync window |

If multiple modes needed, supply array.

---

## 25. APPENDIX E — FORMAT SKIN → STRUCTURAL BEAT MAPPING

Quick-reference table. For each of the seven Phase-2 timing beats, which format skin is the default winner.

| Phase-2 Timing Beat | Default Format Skin (research_heavy) | Default Format Skin (lifestyle) |
|---|---|---|
| 0–1s VISUAL HOOK | ABR | ABR |
| 1–3s AUDIO HOOK | ABR | ABR |
| 3–8s PROOF ANCHOR | ABR | ABR |
| 8–15s IMPLICATION | ABR (with on-screen decoder) | ABR |
| 15–25s MECHANISM/SOLUTION | Whiteboard or ABR | ABR (process B-roll heavy) |
| 25–30s DEMONSTRATION | ABR (screen recording / animation) | ABR (process B-roll) |
| 30–35s CTA | Hybrid (Talking-head freeze) | Hybrid (Talking-head freeze) |

The Hybrid Talking-Head appears only at the end — this is intentional. After the demonstration-heavy ABR body, the talking-head reveal at the CTA creates a parasocial-trust closure beat that converts views into action.

---

## 26. APPENDIX F — HOOK FORMULA LIBRARY (100 Scalerock-voice formulas)

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

**End of Phase-3 Skill v2 Spec.**

If `phase2_structure` is missing or any required Phase-2 field is unset, do not proceed. Respond with:
> *"Phase-2 structure JSON is required. Please run the Scalerock NeuroAI Structure Generator first and return its output as `phase2_structure`."*
