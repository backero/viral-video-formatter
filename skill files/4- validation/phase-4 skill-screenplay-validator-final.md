---
name: scalerock-screenplay-validator
version: 2.0
description: |
  Phase 3.5 of the Scalerock viral video pipeline. Validates a Phase-3 screenplay JSON
  against 18 Golden Rules, 10 Quality Gate criteria, 8 TRIBE v2 / NeuralSet neuroscience checks,
  6 Staccato & Dialogue Engineering checks, 5 Personal Brand Launch operational checks,
  4 Studio Realism checks, 4 CTA & Post-Production checks, 2 Multi-Language checks,
  and 1 Reference Video match check (52 total). Emits a structured validation report with
  severity-tagged results (Critical/Major/Minor/Info), a Neural Prediction Score (0–100),
  a brain region coverage matrix, a 4-role approval workflow, an auto-fix engine, an ordered
  revision queue, and a final verdict (SHIP / REVISE / REJECT). Use this whenever a Phase-3
  screenplay JSON is provided for QC, or when the user says "validate this screenplay",
  "score this script", "check this against the golden rules", "ready to shoot?", or "QC this".
  Do NOT use to generate or fix screenplays — this skill scores and reports only. If a fix is
  needed, route back to Phase-3 with the revision notes.
---

# SKILL: Scalerock Screenplay Validator v2.0
## Phase 3.5 of the Research-to-Viral-Video Pipeline — QC & Validation Layer

> **Pipeline position**
> **Phase 1** (Topic + Value form) → **Phase 2** (NeuroAI Structure Generator) → **Phase 3** (Screenplay Generator) → **Phase 3.5 (THIS SKILL)** (Validation) → **Phase 4** (Shoot / AI render)

---

## 0. LAYER SEPARATION (read this first)

This skill validates. It does not generate, edit, or repair screenplays. The boundary is non-negotiable:

| What Phase 3.5 DOES | What Phase 3.5 DOES NOT |
|---|---|
| Score a Phase-3 JSON output against 52 checks | Generate new content or replace failed lines |
| Identify which Golden Rules are violated and where | Auto-fix violations (it suggests; Phase-3 executes) |
| Compute brain region coverage and multimodal sync confidence | Re-render scenes |
| Emit a structured report with severity-tagged failures | Make subjective judgment calls about "feel" or "vibe" |
| Recommend specific fixes with scene/field references | Re-shoot or re-edit |
| Issue a final verdict (SHIP / REVISE / REJECT) | Override the verdict on opinion alone |

If the validator returns REVISE or REJECT, the user routes the screenplay back to Phase-3 with the revision notes attached. Phase-3 regenerates the failing scenes. Phase 3.5 re-validates. Loop until SHIP.

---

## 1. PURPOSE

Take the **Phase-3 Screenplay JSON output** and apply 52 deterministic checks spanning:

1. **18 Golden Rules** from the Phase-3 spec (GR01–GR18)
2. **10 Quality Gate criteria** from the Phase-4 production form (QG01–QG10)
3. **8 Neuroscience-specific checks** anchored to TRIBE v2 and NeuralSet findings (NS01–NS08)
4. **6 Staccato & Dialogue Engineering checks** (SA01–SA06)
5. **5 Personal Brand Launch operational checks** (PBL01–PBL05)
6. **4 Studio Realism checks** (ST01–ST04)
7. **4 CTA & Post-Production checks** (CT01–CT04)
8. **2 Multi-Language compliance checks** (ML01–ML02)
9. **1 Reference Video matching check** (RV01)

The output is a **validation report JSON** containing:

- Per-check result (PASS / FAIL / N/A)
- Severity per failure (Critical / Major / Minor / Info)
- Specific scene/field reference for every failure
- Suggested fix per failure
- Brain region coverage matrix
- A composite **Neural Prediction Score (NPS) 0–100**
- **4-Role Approval Workflow** status (Content Lead, Production Lead, Actor, Editor)
- **Auto-Fix Engine** suggestions (safe deterministic corrections)
- **Research Fidelity Audit Trail** (per-claim exact-quote verification)
- **Neural Activation Heatmap** (timeline of brain region firing)
- Final verdict (SHIP / REVISE / REJECT)
- An ordered revision queue for the human producer or downstream Phase-3 re-run

---

## 2. INPUT FORMAT

The full Phase-3 screenplay JSON output. The validator reads every top-level field — `metadata`, `production_summary`, `production_warnings`, `research_integrity_carryforward`, `reference_video_match`, `scenes[]`, `post_production_checklist` — and treats absence of any expected field as a Critical failure.

```json
{
  "phase3_screenplay": { /* full Phase-3 output */ },
  "validation_context": {
    "ship_threshold": "default | strict | permissive",
    "ignore_checks": ["check_id_to_skip"],
    "override_flags": [
      { "check_id": "GR07", "override_reason": "Slow-cut artistic choice; director approved", "approved_by": "..." }
    ]
  }
}
```

`validation_context` is optional. If omitted, default thresholds apply. Override flags require a written reason and are reported in the output but do not change the failure record — they shift verdict computation only.

---

## 3. SEVERITY SCALE & ESCALATION RULES

### 3.1 Severity Scale

Every check carries a fixed severity that determines its weight in verdict computation.

| Severity | Definition | Verdict impact |
|---|---|---|
| **Critical** | Fundamental violation. Video will likely fail to engage, convey message, or pass platform standards. Must fix before shoot. | Any unflagged Critical → REJECT or REVISE |
| **Major** | Significant issue that will materially reduce performance (engagement, retention, conversion). | 3+ unflagged Major → REVISE; 6+ → REJECT |
| **Minor** | Quality issue. Polish if time permits. Will not break the video. | Aggregated into NPS; does not gate verdict alone |
| **Info** | Note for awareness — pending designer asset, optional improvement, watchlist item. | Reported only; does not affect verdict |

**Severity is fixed per check ID and never inferred at runtime.**

### 3.2 Escalation Rules

A cluster of lower-severity failures in the same scene escalates by one tier:

- 3+ Minor failures in a single scene → 1 Major (logged as `MINOR_CLUSTER_ESCALATION_S<scene>`)
- 3+ Major failures in a single scene → 1 Critical (logged as `MAJOR_CLUSTER_ESCALATION_S<scene>`)
- 5+ Minor failures across the whole video → 1 Major (`GLOBAL_MINOR_DENSITY_ESCALATION`)

Escalations are reported in `escalations_detected` and count toward verdict computation. They do not double-count the underlying failures.

---

## 4. CHECK CATALOG (52 checks)

### 4.1 Golden Rule Checks (GR01–GR18)

These check 1:1 against the 18 Golden Rules in the Phase-3 spec.

---

#### GR01 — Demonstration-First Dialogue
- **Severity**: Major
- **Source**: Phase-3 Golden Rule 1
- **Tests**: Each scene's `vo.demonstration_first_test` field
- **Passes**: Every line marked "PASS", "PARTIAL" with documented reason, or "FAIL → ACCEPTED" with one of four exceptions (research claim with numeric fidelity / direct address / Reinforcement-Lesson beat / CTA)
- **Fails**: Any line marked "FAIL" with no documented acceptance exception, OR exception cited but content does not match the exception class
- **Neural rationale**: When LOC + EBA + VWFA are pre-loaded by demonstration, redundant verbal explanation creates auditory cortex saturation (per TRIBE v2: language network adapts to redundant input within 300ms)
- **Fix**: Move failed line's content to `action_parenthetical` or `visual.on_screen_text.primary`; reduce `vo.line` to the minimum residual semantic content that visuals cannot carry
- **Report**: List failing scene numbers; quote the failing line; identify which exception was incorrectly claimed (if any)

---

#### GR02 — Action-to-Dialogue Word Ratio ≥ 2.0
- **Severity**: Major
- **Source**: Phase-3 Golden Rule 2
- **Tests**: `metadata.action_to_dialogue_word_ratio` AND per-scene action word count ÷ dialogue word count
- **Passes**: Top-level ratio ≥ 2.0 AND no single scene below 1.2 (except CTA which may be at 0.8 minimum)
- **Fails**: Top-level ratio < 2.0, OR any non-CTA scene below 1.2
- **Neural rationale**: Each second of unmatched dialogue increases EBA/LOC starvation; the brain needs visible action to anchor verbal claims (Show, Don't Tell principle in TRIBE v2's V1–V4 → LOC pipeline)
- **Fix**: Identify scenes with high dialogue density and low action density; expand `action` block with concrete observable beats; OR trim VO line to its essence
- **Report**: Per-scene ratio table; flag scenes below threshold; show ratio gap to remediation

---

#### GR03 — Silent-Runtime Quota by Format
- **Severity**: Major
- **Source**: Phase-3 Golden Rule 3
- **Tests**: `metadata.silent_runtime_percent` against `metadata.format_skin_primary`
- **Passes**: Silent percent meets or exceeds quota — ABR ≥ 50%, Whiteboard ≥ 30%, Two-Person ≥ 25%, Talking-Head ≥ 20%, Hybrid ≥ 35%
- **Fails**: Silent percent below the format's quota
- **Neural rationale**: TRIBE v2 demonstrates that the multimodal integration boost at the TPO junction is degraded by continuous auditory stimulation; silent gaps allow the visual and text channels to consolidate independently
- **Fix**: Identify scenes with continuous dialogue; introduce silent demonstration beats (prop hero, reaction insert, text-only frame, B-roll cutaway with no VO)
- **Report**: Format skin, quota, actual silent percent, gap

---

#### GR04 — Hook Parseable Muted (FULL VIDEO)
- **Severity**: Critical
- **Source**: Phase-3 Golden Rule 4 + Phase-4 Quality Gate #9
- **Tests**: 
  - Scene 1: `pbl_checks.muted_parse_test` field AND structural reconstruction with audio stripped
  - ALL scenes: For every scene, does `visual.on_screen_text` + `action` + `broll` carry sufficient meaning that a muted viewer can follow the narrative arc?
- **Passes**: 
  - Scene 1: Visual + caption + on-screen text alone convey the full hook message
  - Full video: ≥ 80% of scenes carry their core message through visual + text alone (not dependent on VO)
- **Fails**: 
  - Scene 1: Field marked "FAIL", OR visual + caption do NOT carry the message without VO
  - Full video: > 20% of scenes are VO-dependent (no visual/text redundancy)
- **Neural rationale**: 85% of social video is viewed muted by platform default; if visual hook fails muted-parse, the FFA/VWFA/MT triple-fire is incomplete and the TPO convergence boost is lost
- **Fix**: Add or upgrade on-screen text to carry scene meaning standalone; ensure motion is intrinsic to visual; review caption sync timing
- **Report**: Per-scene muted-parse audit; quote scene 1 dialogue/caption/text; assess standalone carry

---

#### GR05 — Broad → Narrow → Niche Across Timing
- **Severity**: Major
- **Source**: Phase-3 Golden Rule 5 + Phase-4 Quality Gate #4
- **Tests**: Vocabulary in hook scene vs body scenes vs CTA scene; readability grade
- **Passes**: Hook scene uses universal vocabulary (no field-specific jargon without decoder); body scenes deliver narrow ICP value; CTA targets the right viewer specifically
- **Fails**: Hook contains jargon without decoder; OR body scenes remain at hook-level abstraction; OR CTA is too broad ("follow me" instead of niche-targeted)
- **Neural rationale**: Default Mode Network engagement requires self-relevance signaling — broad hook maximizes addressable audience; narrow body retains converters; niche CTA prevents wasted action attempts
- **Fix**: Rewrite hook to universal vocabulary OR add on-screen text decoder; specify narrow value in body; tighten CTA to ICP language
- **Report**: List jargon terms found in hook; assess body scope; assess CTA specificity; readability grade per section

---

#### GR06 — Show, Don't Tell (LOC / EBA / VWFA)
- **Severity**: Major
- **Source**: Phase-3 Golden Rule 6
- **Tests**: For each numeric claim in dialogue, is the number on-screen at the same moment? For each object named, is the object visible? For each action described, is it performed?
- **Passes**: All three substitution checks pass for every dialogue line
- **Fails**: Any numeric claim spoken without on-screen number; any object named without visible prop or B-roll; any action described without demonstrated action
- **Neural rationale**: Dual coding in prefrontal cortex (number) + VWFA (text) + auditory cortex (spoken) triples retention; single-coding (spoken only) is forgotten within 6 seconds
- **Fix**: For each violation, add the missing visual element to the scene's `visual` block; specify timing alignment (on-screen number appears exactly at audible mention)
- **Report**: Per-violation log: scene number, dialogue fragment, missing visual element, suggested visual

---

#### GR07 — Visual Change Every 2 Seconds (ALL SCENES)
- **Severity**: Major
- **Source**: Phase-3 Golden Rule 7 + Phase-4 Quality Gate #10
- **Tests**: For EVERY scene, compute longest continuous unbroken shot duration without visual change. Visual change = cut to different shot, on-screen text appears/changes, prop enters, gesture, B-roll insert, caption highlight word changes, color grade shift, animation.
- **Passes**: No scene exceeds 2.0 seconds without a visual change (except intentional ECU reaction holds ≤ 1.0s, or text-only silent moments)
- **Fails**: Any scene exceeds 2.0 seconds with zero visual change
- **Neural rationale**: MT/V5 (motion area, ~100ms response) habituates to static visual input within 2 seconds; engagement drops sharply past that threshold across ALL formats, not just talking-head
- **Fix**: Insert a visual change at the 2-second mark — cut to a different shot, fire an on-screen text change, drop in a B-roll cutaway, or animate a graphic
- **Report**: Per-scene log: scene number, longest static duration, location of needed visual change

---

#### GR08 — Silent Moments Mandatory
- **Severity**: Minor
- **Source**: Phase-3 Golden Rule 8
- **Tests**: At least one of: reaction shot (0.5–1.0s) OR product/object reveal (1.0–2.0s) OR before/after cut (1.0s each) OR text-only moment (1.0–2.0s) OR pre-CTA freeze (1.0s) exists somewhere in the video
- **Passes**: At least one silent moment of the qualifying type exists
- **Fails**: Zero silent moments across the whole video (dialogue runs continuously start to end)
- **Neural rationale**: Silent moments allow FFA / LOC / VWFA to isolate and consolidate — continuous dialogue prevents this consolidation
- **Fix**: Add a 1.0-second pre-CTA freeze if nothing else works
- **Report**: List silent moments found; if zero, recommend insertion point

---

#### GR09 — Bridge Words Between Sentences
- **Severity**: Minor
- **Source**: Phase-3 Golden Rule 9
- **Tests**: Inspect each scene transition; does the dialogue of scene N+1 begin with a bridge word/phrase that connects to scene N? ("And...", "But here's the thing...", "Which means...", "So now...", "And that's why...")
- **Passes**: At least 70% of scene transitions have explicit bridge words
- **Fails**: Below 70% — sentences feel discontinuous
- **Neural rationale**: Language network maintains semantic continuity via connective tissue; without bridges, the network treats each sentence as a separate event and engagement drops
- **Fix**: Add bridge phrases to the start of dialogue lines that follow a scene cut
- **Report**: Show transitions without bridges; suggest specific bridge words per gap

---

#### GR10 — Action-Integrated Dialogue
- **Severity**: Minor
- **Source**: Phase-3 Golden Rule 10
- **Tests**: Every dialogue line has a non-empty `action_parenthetical` describing what the actor is doing during the line (in talking-head and Hybrid skins); for ABR scenes, the `action` block describes B-roll/visual activity timed against the VO
- **Passes**: All dialogue-bearing scenes have populated action descriptions
- **Fails**: Any scene has dialogue without action specification
- **Neural rationale**: EBA + STS co-activation requires that the actor's action and speech are temporally aligned; un-actioned dialogue is delivered as "floating head" and engagement drops
- **Fix**: For each violating scene, write a 1–3 sentence action_parenthetical describing the actor's behavior during the line
- **Report**: List scenes with missing action descriptions

---

#### GR11 — Tri-Modal Convergence in 0–1.5s
- **Severity**: Critical
- **Source**: Phase-3 Golden Rule 11
- **Tests**: Scene 1's `multimodal_sync_check` block — `visual_fired_at_s`, `audio_fired_at_s`, `text_fired_at_s` all ≤ 1.5
- **Passes**: All three modalities fired within 0–1.5s; `convergence_window_met: true`
- **Fails**: Any modality fires after 1.5s; OR `convergence_window_met: false`
- **Neural rationale**: TRIBE v2 demonstrates 50% encoding boost at the TPO junction when visual + audio + text converge in the same 1.5s window; outside this window, modalities encode separately and the boost is lost
- **Fix**: Tighten scene 1 — ensure visual content is parseable by 0.3s, first VO phoneme at 0.0s, on-screen text appears by 0.3s
- **Report**: Quote actual onset times; quote required onset times; compute gap

---

#### GR12 — Research Fidelity Carry-Over
- **Severity**: Critical
- **Source**: Phase-3 Golden Rule 12
- **Tests**: All numeric claims in `vo.line` fields match `phase2_structure.research_integrity.claim_fidelity` exactly; `research_integrity_carryforward.claim_fidelity_check` field is "PASSED"; figure reference, institution anchor, and code link are visible somewhere in the video
- **Passes**: Every number matches Phase-2; institution anchor in at least one scene's `visual.on_screen_text`; figure reference cited; code link in CTA scene
- **Fails**: Any numeric claim is rounded or altered vs Phase-2; OR institution anchor not visible anywhere; OR code link missing from CTA
- **Neural rationale**: Research integrity is non-negotiable independent of neural performance — claim drift undermines downstream replicability and exposes the brand to factual rebuttal
- **Fix**: Restore exact Phase-2 numbers in dialogue; add institution caption overlay to proof beat; add code link to CTA URL bar
- **Report**: Per-violation: claimed value, Phase-2 value, drift magnitude; missing references

---

#### GR13 — Studio-Realistic Scope
- **Severity**: Major
- **Source**: Phase-3 Golden Rule 13
- **Tests**: Every prop in `production_summary.props_required` exists in `production_context.studio_assets.props_available`; same for backgrounds, B-roll sources, lighting fixture count, actor count
- **Passes**: All required resources are available; `production_summary.props_missing_from_studio` and `production_summary.broll_missing` arrays are empty OR populated entries are listed in `production_warnings` with substitutes
- **Fails**: Required resource not available AND no warning/substitute documented
- **Fix**: Either acquire the missing resource before shoot OR add a `production_warnings` entry with a documented substitute
- **Report**: List missing resources by category (props, B-roll, lighting, actor)

---

#### GR14 — Caption Coverage = 100%
- **Severity**: Critical
- **Source**: Phase-3 Golden Rule 14
- **Tests**: Every word in every scene's `vo.line` appears in the corresponding scene's `visual.on_screen_text.caption.text`; caption animation specified as word-by-word synced
- **Passes**: Caption text contains every dialogue word (verbatim or with documented translation); caption animation is word-by-word
- **Fails**: Any spoken word absent from caption; OR caption animation not word-by-word synced
- **Neural rationale**: 85% of social video is consumed muted; caption coverage is the primary semantic channel for that majority audience
- **Fix**: Regenerate captions to verbatim match dialogue; specify word-by-word pop animation per spec
- **Report**: Per-scene caption gap audit; list missing words

---

#### GR15 — One Peak Per Video
- **Severity**: Major
- **Source**: Phase-3 Golden Rule 15
- **Tests**: Across all scenes, count: scenes with `actor.energy_level_1_10` = 10; scenes with `editing.speed_ramp` containing "speed-ramp push" or 0.5×; scenes with explicit `hard emphasis` markers in dialogue
- **Passes**: Exactly ONE peak moment exists, AND it lands at the structural payoff (typically Reinforcement / "and that's why" / Result beat — not at the hook, not at the CTA)
- **Fails**: Zero peaks (flat energy curve) OR multiple peaks (dilutes the climax) OR peak lands at wrong structural position (hook or CTA)
- **Neural rationale**: Single energy peak creates an emotional anchor that the rest of the video orbits; multiple peaks habituate the amygdala and dampen retention
- **Fix**: Identify the intended payoff beat; concentrate energy/speed-ramp/emphasis there; reduce intensity in other scenes
- **Report**: Peak count, peak locations, structural beat names, recommended consolidation

---

#### GR16 — Hook → Script → Format → Editing Priority (PBL)
- **Severity**: Minor
- **Source**: Phase-3 Golden Rule 16
- **Tests**: When a tradeoff is implied, the screenplay prioritizes hook strength over format polish
- **Passes**: No editing or format decision documented as a workaround for a weak hook; scene 1 receives the highest production-notes density
- **Fails**: Scene 1 is under-specified relative to body scenes; OR editing direction includes "smooth this transition to compensate for the hook"-style notes
- **Neural rationale**: Per PBL playbook, the hook is the gate — if scrolled, nothing downstream matters
- **Fix**: Re-prioritize production attention to scene 1; treat editing as polish, not patch
- **Report**: Scene 1 spec density score vs average scene spec density score

---

#### GR17 — 5× Outlier Match (conditional)
- **Severity**: Minor
- **Source**: Phase-3 Golden Rule 17
- **Tests**: Conditional — runs only if `production_context.reference_video.url` is provided. Inspects `reference_video_match.match_within_tolerance` field and verifies the matched property is within ±20% of the reference
- **Passes**: Field is true AND the documented matched property shows numerical match within tolerance; OR field not present because no reference supplied (test marked N/A)
- **Fails**: Reference supplied but `match_within_tolerance: false`; OR field omitted when reference was provided
- **Fix**: Re-render the screenplay matching the reference video's cut rhythm and format more tightly
- **Report**: Reference URL, target property, target value, actual value, gap

---

#### GR18 — Mobile-First Safe Zone Compliance
- **Severity**: Major
- **Source**: Formalization of framing rules scattered across Phase-3 §7.5 (the 18th Golden Rule)
- **Tests**: For 9:16 aspect ratio: top 10% reserved for platform UI (no critical text/face); bottom 25% reserved for caption + platform UI band (text in this band must BE the caption, not decorative hero text); critical action and faces in middle 65%
- **Passes**: Every scene's `visual.on_screen_text` positions respect the safe zones; no hero text in top 10% or in bottom 25% (unless it IS the caption); no face crop at safe zone edges unless intentional ECU
- **Fails**: Hero text positioned at "top 5%" or "bottom 15%"; OR face positioning collides with safe zones; OR critical action outside middle 65%
- **Neural rationale**: Mobile-platform UI overlays consistently occlude top and bottom bands; FFA / VWFA targets placed in these bands are partially or fully blocked by Instagram/TikTok/Shorts UI elements, defeating their neural purpose
- **Fix**: Reposition violating elements to middle 65%; recompute hero text positions; if center conflicts with caption, reduce hero text font size and stack vertically
- **Report**: Per-violation: scene number, violating element, current position, safe position

---

### 4.2 Quality Gate Checks (QG01–QG10)

These map 1:1 to the Phase-4 production form's 10-point quality gate. Each QG check cross-references the underlying GR/NS/PBL checks that enforce it. QG checks do not introduce new logic — they aggregate and surface the form's human-readable questions.

---

#### QG01 — Scroll-Stop in 0.5s
- **Severity**: Critical
- **Form Question**: "Would a stranger stop scrolling in 0.5 seconds?"
- **Enforced by**: NS08 (Hook Visual Hierarchy), PBL01 (SEE/READ/HEAR), GR11 (Tri-Modal Convergence)
- **Passes**: Scene 1 has motion + face + text all within 0.5s; tri-modal convergence met
- **Fails**: Any of the three hook elements missing or delayed beyond 0.5s
- **Report**: Per-element presence-by-0.5s check for scene 1

---

#### QG02 — Value in First 3–5s
- **Severity**: Critical
- **Form Question**: "Does value appear within the first 3–5 seconds?"
- **Enforced by**: GR05 (Broad→Narrow→Niche), PBL04 (Broad-Hook Test), GR04 (Hook Parseable)
- **Passes**: Hook scene delivers a clear value proposition (what the viewer will learn/gain) within 3–5 seconds; no preamble or setup
- **Fails**: Hook scene is purely teasing without value promise; OR value appears after 5s
- **Report**: Quote the value-bearing line from scene 1; timestamp of value delivery

---

#### QG03 — Natural When Read Aloud
- **Severity**: Major
- **Form Question**: "Read aloud — does it sound natural, not AI?"
- **Enforced by**: SA01 (Beat Length), SA02 (No Conjunctions), SA03 (Readability), SA05 (Forbidden Words), NS07 (Variable Pace)
- **Passes**: Staccato beats are drum-like and natural; no robotic repetition; variable pace prevents monotone; no forbidden buzzwords
- **Fails**: Beats are too long (>8 words), sound like prose; conjunctions create run-on sentences; fixed pace throughout; forbidden words detected
- **Report**: Flag unnatural-sounding lines; suggest staccato rewrites

---

#### QG04 — 10-Year-Old Understands Main Point
- **Severity**: Major
- **Form Question**: "Could a 10-year-old understand the main point?"
- **Enforced by**: GR05 (Broad Hook), SA03 (5th-Grade Readability), PBL04 (Broad-Hook Test)
- **Passes**: Hook + CTA readability ≤ 5th grade; body ≤ 8th grade when technical terms are paired with on-screen decoders; main point is stated in universal vocabulary
- **Fails**: Hook readability > 5th grade; OR main point requires domain knowledge to understand; OR technical terms in hook without decoder
- **Report**: Readability score per section; flag gated vocabulary

---

#### QG05 — Cameraman Knows What to Do
- **Severity**: Major
- **Form Question**: "Can a cameraman read this and know what to do?"
- **Enforced by**: PBL05 (4-Component Anatomy), ST01–ST04, GR10 (Action-Integrated Dialogue)
- **Passes**: Every scene has `filming_notes`, `camera` block (shot size, angle, movement, lens), `lighting` block, and `action` block; no ambiguous direction
- **Fails**: Any scene missing camera or lighting specification; OR action description is vague ("actor looks good" instead of "actor raises eyebrow, steps DS"); OR actor count/format mismatch
- **Report**: Per-scene production-readiness score; list missing blocks

---

#### QG06 — Actor Knows Expression, Pace, Energy
- **Severity**: Major
- **Form Question**: "Does the actor know expression, pace, energy?"
- **Enforced by**: GR10 (Action-Integrated Dialogue), NS07 (Variable Pace), and scene-level `actor` blocks
- **Passes**: Every actor-present scene specifies `energy_level`, `expression` (concrete observable descriptors), `pace`, and `tone`; `action_parenthetical` describes physical behavior
- **Fails**: Actor block missing energy/expression/pace/tone; OR energy level is inconsistent with scene's structural role; OR expression is vague ("looks natural" instead of "eyebrows raised, eyes wide")
- **Report**: Per-scene actor-direction completeness score

---

#### QG07 — Editor Knows Where Every Cut Happens
- **Severity**: Major
- **Form Question**: "Does the editor know where every cut happens?"
- **Enforced by**: `scenes[].editing.cut_point`, `scenes[].editing.transition_to_next`, `scenes[].timing`, and GR07 (Visual Change Every 2s)
- **Passes**: Every scene has explicit `cut_point` timestamp and `transition_to_next` specification; cut rhythm is consistent with format skin; visual changes are timed
- **Fails**: Any scene missing `cut_point` or `transition_to_next`; OR cut rhythm is inconsistent with format skin (e.g., ABR with cuts every 3s instead of 0.8–1.5s)
- **Report**: Per-scene edit-specification completeness; cut rhythm analysis

---

#### QG08 — Exactly One CTA, ≤5 Words, at the End
- **Severity**: Critical
- **Form Question**: "Exactly one call-to-action, ≤5 words, at the end"
- **Enforced by**: CT01–CT04 (CTA checks)
- **Passes**: Single CTA scene; CTA text ≤ 5 words; CTA is the final scene or penultimate scene; no other CTAs in body
- **Fails**: Multiple CTAs; OR CTA > 5 words; OR CTA appears mid-video; OR no CTA present
- **Report**: CTA count, word count, position, text content

---

#### QG09 — Muted Viewer Understands Everything
- **Severity**: Critical
- **Form Question**: "Would a muted viewer still understand everything?"
- **Enforced by**: GR04 (Full-Video Muted Parse), GR14 (Caption Coverage), GR06 (Show Don't Tell)
- **Passes**: ≥ 80% of scenes carry core meaning through visual + text alone; 100% caption coverage; all numbers shown on-screen
- **Fails**: > 20% of scenes are VO-dependent; OR caption gaps exist; OR numbers spoken but not shown
- **Report**: Full-video muted-parse audit; per-scene visual redundancy score

---

#### QG10 — Visual Change Every 2 Seconds
- **Severity**: Major
- **Form Question**: "Visual change every 2 seconds?"
- **Enforced by**: GR07 (Visual Change Every 2s)
- **Passes**: No scene exceeds 2.0s without visual change (with exceptions for intentional silent holds)
- **Fails**: Any scene has a static shot > 2.0s without visual change
- **Report**: Same as GR07 — per-scene static-duration analysis

---

### 4.3 Neuroscience-Specific Checks (NS01–NS08)

These check TRIBE v2 and NeuralSet-specific predictions that aren't already covered by Golden Rules. Each one references the originating paper finding.

---

#### NS01 — Brain Region Coverage Completeness
- **Severity**: Major
- **Source**: TRIBE v2 §2.5 (in-silico experiments — vision; in-silico experiments — language)
- **Tests**: Aggregate all `scenes[].neural_targets_fired` arrays. Verify the union covers every neural target declared in Phase-2's `hooks.visual.neural_targets`, `hooks.written.neural_targets`, and `hooks.audio.neural_targets`
- **Passes**: Every Phase-2-declared neural target is fired in at least one scene
- **Fails**: One or more declared targets is not fired in any scene (Phase-2 promised activation that Phase-3 did not deliver)
- **Neural rationale**: TRIBE v2 establishes specific brain regions for specific content categories — if Phase-2 commits to firing FFA but no scene contains a face, the promise is broken
- **Fix**: Identify the missing target; add a scene element that activates it (face B-roll for FFA, hand gesture for EBA, number overlay for VWFA, environment shot for PPA, etc.)
- **Report**: Coverage matrix showing each Phase-2 target → fired/not fired → which scenes fired it

---

#### NS02 — Multimodal Convergence Density
- **Severity**: Major
- **Source**: TRIBE v2 §2.8 (multimodality insights — 50% gain at TPO junction)
- **Tests**: Count scenes where all three modalities (visual + audio + text) fire in the same 1.5s window. Compute density = (converged scenes) / (total scenes)
- **Passes**: Density ≥ 0.5 (50%+ of scenes show tri-modal convergence)
- **Fails**: Density < 0.5 (most scenes are uni- or bimodal — losing the TPO boost)
- **Neural rationale**: TRIBE v2 shows up to 50% encoding accuracy gain at the TPO junction when modalities converge; sustaining this throughout the video maintains engagement
- **Fix**: For scenes with low modality count, add caption coverage (text channel) or add a meaningful visual change (visual channel)
- **Report**: Per-scene modality count; identify mono- and bi-modal scenes; suggest additions

---

#### NS03 — Hemodynamic Delay Alignment
- **Severity**: Minor
- **Source**: TRIBE v2 §5.8 (hemodynamic lag preprocessing — 5-second delay between stimulus and peak BOLD response)
- **Tests**: For "Reinforcement" / "Lesson" / "Insight" beats — does the audience have ~3-5 seconds of consolidation time before the CTA? Inspect runtime gap between the climax beat (energy peak) and the CTA scene start
- **Passes**: Gap ≥ 3.0 seconds between climax and CTA onset
- **Fails**: CTA cuts in immediately after climax (gap < 3.0s) — neural systems haven't consolidated the payoff before the action ask
- **Neural rationale**: The brain needs ~3-5s to fully process the payoff signal before being asked to act; rushing the CTA risks delivering it to an unprimed audience
- **Fix**: Lengthen the Reinforcement beat by 1-2 seconds, or add a 1.0s pre-CTA freeze
- **Report**: Climax beat scene, climax timing, CTA scene start, computed gap

---

#### NS04 — DMN (Self-Reference) Activation Density
- **Severity**: Minor
- **Source**: TRIBE v2 implicit (DMN activates under self-referential language); PBL playbook explicit ("you / your" usage)
- **Tests**: Count occurrences of "you", "your", "yours", "you're", "you'll", "you've" across all `vo.line` fields. Compute density per 10 words
- **Passes**: Density ≥ 2.0 per 10 words (matches Phase-3 dialogue engineering spec)
- **Fails**: Density < 2.0 per 10 words — the script is descriptive instead of relational
- **Neural rationale**: Default Mode Network re-engages when "this is about ME" signal fires; without it, the brain processes the content as third-party information and DMN dims
- **Fix**: Rewrite descriptive lines into second-person form ("the brain can be predicted" → "your brain can be predicted")
- **Report**: Total word count, total second-person count, density, gap from threshold

---

#### NS05 — VWFA Stimulation Density (on-screen text presence)
- **Severity**: Minor
- **Source**: TRIBE v2 (VWFA activation for written characters); TPO multimodal boost requires text channel
- **Tests**: For every scene, is there at least one on-screen text element specified in `visual.on_screen_text` (either primary hero text OR a caption block)?
- **Passes**: 100% of scenes have at least caption coverage; ≥ 70% of scenes have a primary on-screen text element beyond just caption
- **Fails**: Any scene has no on-screen text element of any kind; OR fewer than 70% of scenes have primary text
- **Neural rationale**: VWFA fires within 200ms on any written element; absent scenes are running uni- or bi-modal (losing TPO boost)
- **Fix**: Add a primary on-screen text element to each light-text scene; even single-word labels ("STEP 2", "RESULT", "REAL") count
- **Report**: Per-scene text element inventory; flag scenes with caption-only or none

---

#### NS06 — Auditory Cortex Onset Compliance
- **Severity**: Critical
- **Source**: TRIBE v2 §3.2 (auditory cortex A1 fires at 0–150ms)
- **Tests**: Scene 1's `vo.first_word_onset_s` field
- **Passes**: First VO phoneme at t = 0.000s (no dead air at scene start)
- **Fails**: First word onset > 0.150s (any audible delay at scene 1 start)
- **Neural rationale**: A1 (primary auditory cortex) initiates the audio processing chain at 0–150ms; dead air at scene 1 start delays the entire neural cascade and weakens the tri-modal convergence window
- **Fix**: Cut the VO recording to start at frame 1; if the visual needs lead-in time, the visual must reach hookable state before the VO starts, not after
- **Report**: Scene 1 first word onset value; gap from threshold

---

#### NS07 — Variable-Pace Prosody Compliance
- **Severity**: Minor
- **Source**: TRIBE v2 implicit (auditory cortex adapts to predictable pacing; variable pacing prevents adaptation)
- **Tests**: Count scenes with `vo.pace = "variable"` vs scenes with single-pace markers ("slow", "conversational", "fast", "rapid")
- **Passes**: At least 30% of dialogue scenes use variable pacing; OR explicit variable pacing in scene 1 (hook scene)
- **Fails**: All scenes use fixed pacing (monotone delivery risk); OR hook scene uses fixed pace
- **Neural rationale**: TRIBE v2 supports the finding that variable prosody maintains language network engagement; fixed pacing causes adaptive habituation
- **Fix**: Mark hook scene `vo.pace = "variable"` with documented within-line speed shifts; add variability to at least one body scene
- **Report**: Per-scene pace marker; recommend conversions

---

#### NS08 — Hook Visual Hierarchy (FFA / MT / VWFA all in 0.5s)
- **Severity**: Critical
- **Source**: TRIBE v2 §3.2 + Phase-3 §3.2 beat sheet
- **Tests**: Scene 1's `action` block + `visual` block — verify that within the first 0.5 seconds of runtime: motion is present (MT/V5), a face is detectable (FFA), and primary on-screen text has appeared (VWFA)
- **Passes**: All three are observable within 0.5s of scene 1 start
- **Fails**: Any of the three is missing or delayed beyond 0.5s
- **Neural rationale**: FFA fires at 170ms, MT at 100ms, VWFA at 200ms; for the tri-modal convergence boost to fire at the TPO junction by 1.0s, all three must be present and parseable by 0.5s minimum
- **Fix**: If face is missing in 0.5s, add a B-roll insert with a face; if motion is missing, add micro-handheld or animated text entry; if text is missing, advance the hero text's `animation_in.start` time
- **Report**: Per-element presence-by-0.5s check for scene 1

---

### 4.4 Staccato & Dialogue Engineering Checks (SA01–SA06)

These validate the Phase-3 §11 Staccato Dialogue Engine rules that are not fully covered by Golden Rules.

---

#### SA01 — Beat Length ≤ 8 Words
- **Severity**: Major
- **Source**: Phase-3 §11.1 (Staccato Beat System)
- **Tests**: Split every `vo.line` on periods, "(pause)", and hard stops. Count words per beat. A "beat" is a standalone semantic unit between hard stops.
- **Passes**: Every beat is ≤ 8 words
- **Fails**: Any beat exceeds 8 words (run-on sentence, not staccato)
- **Neural rationale**: Long beats (>8 words) overload the auditory working memory buffer; staccato beats (1–8 words) create a drum-like rhythm that the auditory cortex processes as discrete events rather than continuous stream
- **Fix**: Split the long beat at a conjunction or natural pause point; create two shorter beats with a visual change between them
- **Report**: List violating beats with word count and suggested split point

---

#### SA02 — No Conjunctions Between Beats
- **Severity**: Minor
- **Source**: Phase-3 §11.2 (Line-Level Rules)
- **Tests**: Between hard stops in `vo.line`, check for forbidden conjunctions: "and", "but", "so", "because", "however", "therefore", "thus", "moreover"
- **Passes**: No conjunctions between beats; hard stops only (periods, not commas)
- **Fails**: Conjunctions detected between beats
- **Neural rationale**: Conjunctions create syntactic dependency chains that the language network must resolve; hard stops create discrete processing events that prevent adaptive habituation
- **Fix**: Replace conjunction with a hard stop and a bridge word at the next beat's start, OR replace with a visual change that carries the relationship
- **Report**: List violating transitions with suggested rewrites

---

#### SA03 — 5th-Grade Readability
- **Severity**: Major
- **Source**: Phase-3 §11.2 (Readability target) + Phase-4 Quality Gate #4
- **Tests**: Compute approximate readability grade for hook scene + CTA scene (Hemingway-style: sentence length + syllable density + word familiarity). Body scenes allowed up to 8th grade when technical terms are paired with on-screen decoders.
- **Passes**: Hook + CTA ≤ 5th grade; Body ≤ 8th grade with decoder
- **Fails**: Hook or CTA > 5th grade; OR Body > 8th grade without decoder; OR technical terms in hook without decoder
- **Neural rationale**: Broader vocabulary accessibility maximizes DMN engagement across demographic segments; high-grade vocabulary in the hook gates the audience before the value is delivered
- **Fix**: Replace complex words with simpler equivalents; add on-screen decoder for any technical term that must stay; split long sentences
- **Report**: Per-section readability score; flag complex words; suggest replacements

---

#### SA04 — You/Your Density
- **Severity**: Minor
- **Source**: Phase-3 §11.2 (You/Your count)
- **Tests**: Count second-person pronouns ("you", "your", "yours", "you're", "you'll", "you've") across all `vo.line` fields. Compute per 10 words.
- **Passes**: Density ≥ 2.0 per 10 words in hook and CTA; ≥ 1.5 per 10 words in body
- **Fails**: Density < 2.0 in hook/CTA; OR < 1.5 in body
- **Neural rationale**: DMN activation is triggered by self-referential language; "you" is the strongest single-word DMN trigger in social video
- **Fix**: Rewrite third-person or descriptive lines into second-person form
- **Report**: Total word count, second-person count, density per section, gap from threshold

---

#### SA05 — Forbidden Words Absent
- **Severity**: Major
- **Source**: Phase-3 §11.2 (Forbidden words)
- **Tests**: Scan all `vo.line` fields for: "revolutionary", "unlock", "discover", "amazing", "groundbreaking", "innovative", "literally", "actually", "basically", "honestly", "really", "game-changing", "cutting-edge", "state-of-the-art" (when used as hype, not as specific paper claim)
- **Passes**: Zero forbidden words detected
- **Fails**: Any forbidden word detected in any scene
- **Neural rationale**: These words trigger amygdala skepticism filters in experienced viewers (pattern-matching to generic marketing); they also reduce perceived authenticity and research credibility
- **Fix**: Replace with concrete metrics or specific verbs ("predicts" instead of "revolutionary", "measured" instead of "discovered")
- **Report**: List forbidden words found with scene references and suggested replacements

---

#### SA06 — Pronunciation Notes for Technical Terms
- **Severity**: Info
- **Source**: Phase-3 §11.3 (Pronunciation & Delivery Notes)
- **Tests**: For technical terms in `vo.line`: fMRI, FFA, PPA, EBA, VWFA, TPJ, STS, TRIBE, NeuralSet, BIDS, SLURM, MNE, Nilearn — verify `vo.pronunciation_notes` is present and non-empty
- **Passes**: All technical terms have pronunciation notes
- **Fails**: Technical term present without pronunciation note
- **Neural rationale**: Mispronunciation of technical terms reduces perceived authority and creates auditory dissonance; clear pronunciation notes prevent VO re-records
- **Fix**: Add pronunciation note for each missing term; use standard IPA or phonetic spelling from Phase-3 §11.3
- **Report**: List technical terms missing pronunciation notes

---

### 4.5 PBL Operational Checks (PBL01–PBL05)

Personal Brand Launch / Ava Yuergens playbook requirements.

---

#### PBL01 — SEE / READ / HEAR Triple-Hook Present
- **Severity**: Critical
- **Source**: PBL playbook — three hooks in first 3 seconds
- **Tests**: Scene 1 contains: (1) a SEE element — non-trivial visual (motion + contrast + face/object); (2) a READ element — hero on-screen text; (3) a HEAR element — VO first phoneme at t=0.0s
- **Passes**: All three present; `pbl_checks.see_read_hear_present: true`
- **Fails**: Any one missing; OR field marked false; OR field absent
- **Neural rationale**: Per PBL — these three independently maximize scroll-stop probability; combined they compound. This is also the TPO convergence input.
- **Fix**: Audit which channel is missing; add to scene 1 immediately. Most common miss is READ — many hooks rely on VO alone
- **Report**: Per-channel presence in scene 1

---

#### PBL02 — Visual Hook ≥ Verbal Hook
- **Severity**: Major
- **Source**: PBL playbook — "visual hooks now carry more weight than verbal lines"
- **Tests**: Compare the standalone informativeness of scene 1 visual + on-screen text vs scene 1 VO + caption. The visual side should equal or exceed the verbal side.
- **Passes**: Visual + on-screen text alone tell a more complete or equally complete story than VO + caption alone
- **Fails**: VO carries more information than visual; visual is decorative supporting role
- **Neural rationale**: Per PBL — modern social viewers are visual-first; pre-FFA processing (V1–V4) is faster than auditory parsing (A1 → STS → language network)
- **Fix**: Upgrade scene 1 visual to carry more semantic load; better hero text, better B-roll selection, better graphic
- **Report**: Brief audit of scene 1 visual vs verbal information density

---

#### PBL03 — Muted-Parse Test (formal)
- **Severity**: Critical
- **Source**: Same as GR04 but framed as PBL operational principle, double-listed because both spec lineages require it
- **Tests**: Same as GR04 — does scene 1 communicate the hook with audio off?
- **Passes**: Yes
- **Fails**: No
- **Neural rationale**: Same as GR04
- **Fix**: Same as GR04
- **Report**: Cross-referenced with GR04 result (must be consistent)

---

#### PBL04 — Broad-Hook Test (no niche-language gating)
- **Severity**: Major
- **Source**: PBL playbook — "Don't niche your hook like an ad"
- **Tests**: Scene 1 dialogue and on-screen text contain ZERO field-specific jargon without a paired on-screen decoder; vocabulary is universal enough that a person outside the target ICP would still understand the gist
- **Passes**: All hook vocabulary is universal OR jargon is paired with simultaneous on-screen text translating it
- **Fails**: Hook uses gated vocabulary that filters viewers before they've decided to stay
- **Neural rationale**: Operational, not neural — PBL playbook is explicit that hook gating cuts watch time
- **Fix**: Reword hook to universal language; OR add on-screen decoder; OR move the technical term to a later body scene
- **Report**: List terms flagged as gating; verify GR05 compatibility

---

#### PBL05 — 4-Component Script Anatomy Present
- **Severity**: Minor
- **Source**: PBL playbook — script anatomy: Notes + Bulleted script + Caption + Subtitles
- **Tests**: Every scene contains: (a) `filming_notes` (Notes), (b) `vo.line` or `action` (bulleted script equivalent), (c) `visual.on_screen_text.caption` (Caption), (d) implicit subtitle support via word-by-word caption animation
- **Passes**: All four components present per scene
- **Fails**: Any scene missing one of the four components
- **Fix**: Add missing components per scene
- **Report**: Per-scene component matrix

---

### 4.6 Studio Realism Checks (ST01–ST04)

These are tighter than GR13 — GR13 catches missing resources; ST01–ST04 catch deeper feasibility issues.

---

#### ST01 — Actor Count Consistent with Format Skin
- **Severity**: Major
- **Source**: Phase-3 §5 + §6
- **Tests**: `metadata.actor_count` is consistent with `metadata.format_skin_primary`. ABR can run with 0 actors. Two-Person requires 2. Talking-Head requires ≥1. Hybrid requires ≥1.
- **Passes**: Actor count matches format skin requirements
- **Fails**: Two-Person format with 1 actor; Talking-Head with 0 actors; etc.
- **Fix**: Adjust actor_count OR adjust format_skin to match available actors
- **Report**: Format skin, required actor count, declared actor count

---

#### ST02 — Lighting Setup Count ≤ Available Fixtures
- **Severity**: Major
- **Source**: Phase-3 §5
- **Tests**: `production_summary.lighting_setups_required` ≤ `production_context.studio_assets.lights_available` (for setups requiring 3+ fixtures: 3-Point Bright, 3-Point Moody, etc., count = 3 fixtures per setup; setups using 5 = 5 fixtures)
- **Passes**: Required fixtures fit within available; OR setups time-share fixtures across scenes (documented in production notes)
- **Fails**: Required > available with no time-sharing plan
- **Fix**: Reduce setup count by reusing fixtures across scenes; OR escalate fixture rental for shoot day
- **Report**: Available count, required count, scenes affected

---

#### ST03 — B-roll Source Availability Coverage
- **Severity**: Major
- **Source**: Phase-3 §5 + §11.5
- **Tests**: For every scene's `visual.broll_required` entries, the `source` value is present in `production_context.studio_assets.broll_sources_available`
- **Passes**: Every B-roll source used is available
- **Fails**: Any B-roll source called for is not available
- **Fix**: Either acquire the source OR substitute with an available source
- **Report**: Per-scene B-roll availability gap

---

#### ST04 — Custom Animation Lead Time Adequate
- **Severity**: Minor
- **Source**: Operational reality
- **Tests**: For every scene calling for `source: custom_animation`, is there a corresponding `production_warning` flagging the designer brief 48+ hours pre-shoot?
- **Passes**: Every custom animation has a warning flag and lead-time note
- **Fails**: Custom animation requested with no lead-time flag
- **Fix**: Add a `production_warning` entry for each custom animation; document designer brief deadline
- **Report**: Scenes requesting custom animation; missing warnings

---

### 4.7 CTA & Post-Production Checks (CT01–CT04)

These validate the call-to-action and export readiness — critical for conversion but not covered by existing checks.

---

#### CT01 — CTA Freeze Frame
- **Severity**: Major
- **Source**: Phase-3 §20 + Phase-4 Quality Gate #8
- **Tests**: CTA scene (final scene) has `editing` block specifying a freeze frame, hold, or text burn-in that persists for ≥ 1.0 second; OR the CTA scene has a static graphic card that holds
- **Passes**: CTA scene has freeze/hold specification
- **Fails**: CTA scene cuts away immediately after the CTA line is spoken; no hold for viewer to read/act
- **Neural rationale**: The prefrontal cortex needs 1.0–1.5s of uninterrupted visual access to the CTA text to form an action intention; moving cuts prevent this consolidation
- **Fix**: Add `editing.freeze_frame: true` to CTA scene; specify hold duration ≥ 1.0s; add static text card
- **Report**: CTA scene editing specification; hold duration

---

#### CT02 — CTA Text ≤ 5 Words
- **Severity**: Major
- **Source**: Phase-3 §20 + Phase-4 Quality Gate #8
- **Tests**: `cta.text` (from Phase-2) OR the final CTA `vo.line` OR the CTA `visual.on_screen_text.primary.text` must be ≤ 5 words
- **Passes**: CTA text is 1–5 words
- **Fails**: CTA text exceeds 5 words (dilutes action clarity)
- **Neural rationale**: Prefrontal action-selection networks are optimized for short, unambiguous commands; longer CTAs introduce decision fatigue and reduce conversion
- **Fix**: Trim CTA to its essential action verb + object ("Follow for more" → "Follow"; "Link in bio" → "Link in bio" [3 words])
- **Report**: CTA text word count; suggested trim

---

#### CT03 — Single CTA Only
- **Severity**: Major
- **Source**: Phase-4 Quality Gate #8
- **Tests**: Count all call-to-action prompts across all scenes. A CTA is any explicit action request: "follow", "save", "comment", "link in bio", "DM me", "subscribe", "share", "tag a friend"
- **Passes**: Exactly ONE CTA prompt exists in the entire video (typically in the final scene)
- **Fails**: Multiple CTAs in different scenes (dilutes conversion focus); OR zero CTAs (no conversion path)
- **Neural rationale**: Multiple CTAs create prefrontal conflict (which action to take?); single CTA creates a clear action pathway
- **Fix**: Remove all CTAs except the final one; OR consolidate multiple CTAs into a single compound CTA in the final scene
- **Report**: CTA count per scene; list all CTA prompts found

---

#### CT04 — Export Specs Present
- **Severity**: Info
- **Source**: Phase-3 §20
- **Tests**: `post_production_checklist` contains: resolution (1080×1920 for 9:16), codec (H.264), fps (30), bitrate (12 Mbps), aspect ratio, and platform-specific export settings
- **Passes**: All export specs documented
- **Fails**: Missing resolution, codec, fps, or bitrate; OR aspect ratio mismatch with `metadata.aspect_ratio`
- **Fix**: Add missing export specs to `post_production_checklist`
- **Report**: Export spec completeness checklist

---

### 4.8 Multi-Language Compliance Checks (ML01–ML02)

Conditional — only run if `production_context.language_primary` is non-English or if any scene's `vo.language` differs from `metadata.language_primary`.

---

#### ML01 — Language Tag Consistency
- **Severity**: Minor
- **Source**: Phase-3 §9.7 + Appendix A
- **Tests**: For multi-language scripts: every code-switch in `vo.line` is marked with `[EN]`, `[HI]`, `[TA]`, `[HIN-EN]`, or `[TAM-EN]` tags
- **Passes**: All code-switches are tagged
- **Fails**: Untagged code-switches found
- **Fix**: Add tags at every language boundary in the VO line
- **Report**: Untagged segments per scene

---

#### ML02 — Caption Script Coverage Per Language
- **Severity**: Major
- **Source**: Phase-3 Appendix A
- **Tests**: For multi-language scripts: captions are present in both languages OR auto-translate toggle is documented in `post_production_checklist`
- **Passes**: Either condition met
- **Fails**: Single-language caption only on a multi-language video without auto-translate documentation
- **Fix**: Add bilingual caption track OR document auto-translate setup
- **Report**: Caption language coverage

---

### 4.9 Reference Video Match Check (RV01)

Conditional — only if `production_context.reference_video.url` is supplied.

---

#### RV01 — Reference Video Match Compliance
- **Severity**: Minor
- **Source**: PBL playbook + Phase-3 Appendix D
- **Tests**: Same as GR17 (cross-referenced); additionally verifies that `reference_video_match` block is fully populated with reference URL, matched property, target value, actual value
- **Passes**: All fields populated; tolerance met
- **Fails**: Block partial or absent when reference supplied
- **Fix**: Populate the block; re-render against reference if needed
- **Report**: Same as GR17 plus completeness audit

---

## 5. VERDICT LOGIC

### 5.1 Counting

```
critical_failures   = count of FAIL results with severity = Critical, minus overridden ones
major_failures      = count of FAIL results with severity = Major, minus overridden ones
minor_failures      = count of FAIL results with severity = Minor, minus overridden ones
info_notes          = count of Info-level findings
```

### 5.2 Thresholds (default mode)

| Verdict | Condition |
|---|---|
| **SHIP** | 0 unflagged Critical AND ≤ 2 unflagged Major |
| **REVISE** | (1–2 unflagged Critical) OR (3–5 unflagged Major) |
| **REJECT** | (≥ 3 unflagged Critical) OR (≥ 6 unflagged Major) |

### 5.3 Threshold Modes

- **default** (above)
- **strict** — REVISE on 0 Critical AND ≥ 3 Major; REJECT on ≥ 1 Critical OR ≥ 5 Major
- **permissive** — SHIP on 0 unflagged Critical regardless of Major count (Major aggregated to NPS only)

The threshold mode is set via `validation_context.ship_threshold`. Default if not specified.

### 5.4 Override Behavior

Each entry in `validation_context.override_flags` shifts a specific check from counted to acknowledged. The check still appears in the report as FAIL but with `overridden: true` and the reason logged. Overrides do not change the underlying check result; they only change verdict computation.

**Critical-severity overrides require additional justification**: an explanation of why the underlying neural/operational risk is acceptable. Without this, the override is rejected and the check counts as it normally would.

---

## 6. NEURAL PREDICTION SCORE (NPS)

A composite 0-100 score predicting the screenplay's neural-engagement quality independent of the verdict.

### 6.1 Component Weights

| Component | Weight | Source |
|---|---|---|
| Neural target coverage (NS01) | 25 | Coverage % from coverage matrix |
| Multimodal convergence density (NS02) | 15 | Convergence density × 100 |
| Demonstration-first compliance (GR01, GR02, GR06) | 15 | Pass rate across these checks |
| Hook strength (GR04, GR11, NS06, NS08, PBL01–PBL04, QG01–QG02) | 20 | Pass rate across these checks |
| Research integrity (GR12) | 10 | Pass = 100, Fail = 0 |
| Dialogue engineering (GR09, GR10, NS04, NS05, NS07, SA01–SA06) | 10 | Pass rate across these checks |
| Operational health (GR07, GR08, GR14, GR15, GR16, CT01–CT04) | 5 | Pass rate across these checks |

### 6.2 Computation

```
NPS = Σ (component_score × component_weight) / 100
```

Each component score is normalized to 0-100 before weighting. Final NPS is rounded to integer.

### 6.3 Interpretation

| NPS Range | Interpretation |
|---|---|
| 85–100 | Top-tier — neural prediction is high; expect outlier potential |
| 70–84 | Solid — strong delivery; performs above account baseline |
| 55–69 | Acceptable — meets minimum thresholds; some areas under-leveraged |
| 40–54 | Weak — multiple components underperforming; reconsider before shoot |
| < 40 | Failing — fundamental rework needed |

NPS is reported alongside the verdict but does not gate it. A SHIP-verdict script with NPS 55 is shippable but not optimal — the report flags the gap.

---

## 7. 4-ROLE APPROVAL WORKFLOW

Replicates the Phase 4 role-approval system from the production form. Each role validates a subset of checks and must approve before export.

### 7.1 Roles & Responsibilities

| Role | Validates | Checks Primarily | Approval Gate |
|---|---|---|---|
| **Content Lead (C)** | Content quality, research fidelity, hook strength, viral methodology, staccato compliance | GR01–GR18, SA01–SA06, D01–D06, QG01–QG10 | Must pass all BLOCKER + ERROR in their domain |
| **Production Lead (P)** | Shoot feasibility, asset availability, budget, scheduling, cameraman readability | ST01–ST04, GR13, QG05, QG07, CT04 | Must pass all ERROR in their domain |
| **Actor (A)** | Dialogue speakability, blocking clarity, energy/expression/pace notes, action integration | SA01–SA06, GR10, GR07, GR09, QG06, NS07 | Must pass all ERROR + WARN in their domain |
| **Editor (E)** | Cut clarity, caption sync, B-roll plan, color grade, export specs, visual change rhythm | CT01–CT04, GR07, GR14, GR15, GR16, QG07, QG10, NS06 | Must pass all ERROR + WARN in their domain |

### 7.2 Workflow

1. All 52 checks run automatically on screenplay upload.
2. Each role sees only their relevant checks in their dashboard panel.
3. Role clicks "Approve" or "Request Changes" with a comment.
4. All 4 approvals required before "Export to Production" button unlocks.
5. If any BLOCKER exists, export is disabled regardless of approvals.
6. If any role requests changes, the screenplay is routed back to Phase-3 with that role's flagged checks as revision notes.

### 7.3 Role Dashboard Panels

**Content Lead Panel:**
- Golden Rules pass/fail matrix (GR01–GR18)
- Staccato audit (SA01–SA06)
- Research fidelity audit trail (per-claim exact quote matching)
- Quality Gate status (QG01–QG10)
- Hook strength score (0–100)

**Production Lead Panel:**
- Studio realism checklist (ST01–ST04, GR13)
- Asset availability matrix (props, B-roll, backgrounds, lighting, actors)
- Production warnings review
- Shoot estimate vs. reality check
- Custom animation lead-time flags

**Actor Panel:**
- Dialogue speakability score (readability, beat length, forbidden words)
- Action-integrated dialogue audit (GR10)
- Energy/pace/expression completeness per scene
- Blocking notation clarity (C, SR, SL, DS, US, BUS, GEST, FOC AUD)
- Pronunciation notes completeness (SA06)

**Editor Panel:**
- Cut specification completeness (QG07)
- Caption coverage audit (GR14)
- Visual change rhythm analysis (GR07, QG10)
- CTA specification (CT01–CT04)
- Export specs checklist (CT04)
- B-roll source availability (ST03)

---

## 8. AUTO-FIX & SUGGESTION ENGINE

Safe, deterministic corrections for common failures. The engine suggests fixes; it does not apply them automatically (Phase-3 executes fixes).

### 8.1 Auto-fixable Issues

| Issue | Suggested Fix | Confidence | Effort |
|---|---|---|---|
| Silent runtime below quota (GR03) | Add 0.5s silent moment to shortest scene | HIGH | Low |
| Caption missing word (GR14) | Inject missing word from `vo.line` into caption block | HIGH | Low |
| Missing bridge word (GR09) | Append "Which means..." or "But here's the thing..." to beat | MEDIUM | Trivial |
| You/Your count low (NS04/SA04) | Replace "the user" with "you" in hook/CTA | HIGH | Low |
| Forbidden word detected (SA05) | Replace with concrete metric or specific verb | HIGH | Low |
| Missing institution anchor (GR12) | Add "Meta FAIR" text overlay to proof scene | HIGH | Low |
| Missing code link in CTA (GR12) | Append GitHub URL to CTA `on_screen_text` | HIGH | Low |
| Beat length > 8 words (SA01) | Split at conjunction into two beats | MEDIUM | Low |
| Missing pronunciation note (SA06) | Add default pronunciation for known technical term | HIGH | Trivial |
| Format skin mismatch (GR13/ST01) | Suggest auto-selected skin based on Phase-2 input | HIGH | Low |
| Missing export spec (CT04) | Add default export settings (1080×1920, H.264, 30fps, 12Mbps) | HIGH | Trivial |
| CTA too long (CT02) | Trim to verb + object (≤ 5 words) | HIGH | Low |
| Missing safe zone compliance (GR18) | Reposition hero text to middle 65% | HIGH | Low |
| Missing visual change at 2s (GR07) | Suggest cut to B-roll or text pop at 2.0s mark | MEDIUM | Low |
| Missing silent moment (GR08) | Suggest 1.0s pre-CTA freeze | HIGH | Trivial |

### 8.2 Manual-Only Fixes (flagged for human review)

- Research claim mismatch (GR12) — requires Content Lead judgment
- Neural target gap (NS01) — requires director judgment on which element to add
- Actor energy level mismatch (QG06) — requires Actor judgment
- Cut rhythm out of tolerance (GR17/RV01) — requires Editor judgment
- Multiple peaks dilution (GR15) — requires Content Lead judgment on which beat to elevate
- Tri-modal convergence failure (GR11) — requires scene 1 rebuild

---

## 9. RESEARCH FIDELITY AUDIT TRAIL

Every research claim in the screenplay is traced back to its source paper with exact-quote verification.

### 9.1 Audit Row Structure

| Column | Description |
|---|---|
| `claim_id` | Unique identifier for the claim |
| `spoken_text` | The claim as it appears in `vo.line` |
| `written_text` | The claim as it appears in `visual.on_screen_text` |
| `phase2_source` | The original claim from Phase-2 `research_integrity.claim_fidelity` |
| `paper_exact_quote` | The verbatim quote from the source paper (TRIBE v2 or NeuralSet) |
| `paper_section` | Section and figure reference (e.g., "TRIBE v2 §2.3, Fig 3A") |
| `match_status` | EXACT / PARAPHRASED / MISMATCH / UNSOURCED |
| `drift_magnitude` | For numeric claims: absolute difference from source |
| `suggested_correction` | Exact text to replace the claim with |

### 9.2 TRIBE v2 Reference Data (Embedded)

For validation checks GR12, NS01–NS08, and the audit trail, the engine embeds a distilled reference:

- **Key statistics:** 720 subjects, 1,115 hours fMRI, R_group ≈ 0.40, 1B parameters, 20,484 vertices, 8,802 voxels
- **Architecture:** V-JEPA2 (video) + Wav2Vec-BERT (audio) + Llama 3.2 (text) → Transformer → Subject Block
- **Performance:** Algonauts 2025 #1 out of 263 teams; R=0.64 (FFA), R=0.79 (PPA), R=0.74 (EBA), R=0.60 (VWFA)
- **Figure references:** Fig 1B (architecture), Fig 2A–E (encoding), Fig 3A–D (generalization), Fig 4 (vision), Fig 5 (language), Fig 6 (ICA), Fig 7 (multimodality)
- **Region mappings:** FFA (faces), PPA (places), EBA (bodies), VWFA (characters), A5 (auditory), 45 (Broca), STS, TPJ, MTG
- **Paper quotes:** Exact strings for claim matching (§19.1 of Phase-3 skill)
- **Code link:** https://github.com/facebookresearch/tribev2
- **Weights:** https://huggingface.co/facebook/tribev2

### 9.3 NeuralSet Reference Data (Embedded)

- **Core abstractions:** Study → Events → Extractors → Segmenter → DataLoader
- **Wrapped libraries:** MNE-Python, Nilearn, EEGLAB, FieldTrip, Brainstorm, fMRIPrep
- **Key phrases:** "structure-data decoupling", "lazy loading", "one line of Python"
- **Code link:** https://github.com/facebookresearch/neuroai

---

## 10. NEURAL ACTIVATION HEATMAP

A visual timeline of brain region firing across the video runtime, used by the Content Lead and Editor to identify gaps and overlaps.

### 10.1 Heatmap Bands

| Band | Color | Brain Regions | What It Means |
|---|---|---|---|
| Visual Cortex | Red | V1–V4, MT/V5 | High contrast, motion, edges, scene changes |
| Face/Body | Blue | FFA, EBA | Face detection, body/hands visible |
| Language | Green | STS, VWFA, A5, A1 | Text on screen, voice onset, captions |
| Executive/Decision | Purple | Prefrontal, DMN | Numbers, "you/your", CTA, decision points |
| Multisensory | Orange | TPO Junction | Visual + Audio + Text convergence |
| Emotion | Yellow | TPJ, Amygdala | Emotional prosody, story beats, trust moments |

### 10.2 Gap Detection

- **"No FFA firing in scenes 3–5"** → Suggest adding face insert or actor CU
- **"No TPO convergence in scenes 2, 4, 5"** → Suggest adding text element or tightening sync
- **"Prefrontal gap before CTA"** → Suggest adding number or "you" reference before the ask

### 10.3 Overlap Bonuses

- **"TPO Junction activated in Scene 1 — tri-modal convergence achieved"** → +5 NPS bonus
- **"DMN + Prefrontal + TPO all firing in Scene 3"** → Peak moment neural stack confirmed

### 10.4 Data Source

`scenes[].neural_targets_fired` array mapped to TRIBE v2 cortical regions (Phase-3 §7.1, §15).

---

## 11. OUTPUT FORMAT

Return ONLY a JSON object:

```json
{
  "metadata": {
    "validator_version": "2.0",
    "validated_at": "ISO-8601 timestamp",
    "phase3_screenplay_title": "...",
    "phase2_structure_used": "Structure # — Name",
    "format_skin": "ABR",
    "threshold_mode": "default | strict | permissive",
    "total_checks_run": 52,
    "checks_by_category": {
      "golden_rules": 18,
      "quality_gate": 10,
      "neuroscience": 8,
      "staccato": 6,
      "pbl": 5,
      "studio": 4,
      "cta": 4,
      "multilang": 2,
      "reference": 1
    }
  },
  "verdict": {
    "decision": "SHIP | REVISE | REJECT",
    "reason_summary": "Brief 1-2 sentence explanation",
    "ready_to_shoot": true
  },
  "neural_prediction_score": {
    "score": 87,
    "interpretation": "Top-tier",
    "components": {
      "neural_target_coverage": { "score": 100, "weight": 25, "contribution": 25.0 },
      "multimodal_convergence_density": { "score": 83, "weight": 15, "contribution": 12.5 },
      "demonstration_first": { "score": 100, "weight": 15, "contribution": 15.0 },
      "hook_strength": { "score": 88, "weight": 20, "contribution": 17.5 },
      "research_integrity": { "score": 100, "weight": 10, "contribution": 10.0 },
      "dialogue_engineering": { "score": 80, "weight": 10, "contribution": 8.0 },
      "operational_health": { "score": 100, "weight": 5, "contribution": 5.0 }
    }
  },
  "role_approvals": {
    "content_lead": { "status": "pending | approved | changes_requested", "comment": "", "checks_reviewed": ["GR01", "GR02", ...] },
    "production_lead": { "status": "pending | approved | changes_requested", "comment": "", "checks_reviewed": ["ST01", "ST02", ...] },
    "actor": { "status": "pending | approved | changes_requested", "comment": "", "checks_reviewed": ["SA01", "GR10", ...] },
    "editor": { "status": "pending | approved | changes_requested", "comment": "", "checks_reviewed": ["CT01", "GR07", ...] }
  },
  "summary_counts": {
    "total_checks_run": 52,
    "checks_passed": 48,
    "checks_failed": 4,
    "checks_skipped_na": 0,
    "critical_failures": 0,
    "critical_overridden": 0,
    "major_failures": 2,
    "major_overridden": 0,
    "minor_failures": 2,
    "info_notes": 5,
    "pass_rate_percent": 92.3
  },
  "quality_gate_status": {
    "QG01_scroll_stop": "PASS",
    "QG02_value_in_3s": "PASS",
    "QG03_natural_read_aloud": "PASS",
    "QG04_10yo_understands": "PASS",
    "QG05_cameraman_readable": "PASS",
    "QG06_actor_direction_clear": "PASS",
    "QG07_editor_cut_clarity": "PASS",
    "QG08_one_cta_5words": "PASS",
    "QG09_muted_understands_all": "PASS",
    "QG10_visual_change_every_2s": "PASS"
  },
  "check_results": [
    {
      "id": "GR01",
      "name": "Demonstration-First Dialogue",
      "category": "Golden Rule",
      "severity": "Major",
      "result": "PASS",
      "evidence": "All 6 scenes' demonstration_first_test fields documented; 4 PASS, 2 FAIL→ACCEPTED with valid exceptions",
      "overridden": false
    },
    {
      "id": "NS02",
      "name": "Multimodal Convergence Density",
      "category": "Neuroscience",
      "severity": "Major",
      "result": "FAIL",
      "evidence": "Convergence density = 0.42 (3 of 6 scenes); below threshold 0.5. Scenes 2 and 4 are bimodal only",
      "scenes_affected": [2, 4, 5],
      "suggested_fix": "Add primary on-screen text element to scenes 2 and 4; tighten scene 5 text onset",
      "overridden": false
    }
  ],
  "brain_region_coverage": {
    "promised_in_phase2": ["FFA", "MT/V5", "VWFA", "A1", "DMN", "TPO Junction", "EBA", "LOC", "PPA", "STS", "Prefrontal"],
    "fired_in_phase3": ["FFA", "MT/V5", "VWFA", "A1", "DMN", "TPO Junction", "EBA", "LOC", "STS", "Prefrontal"],
    "missing": ["PPA"],
    "coverage_percent": 90.9,
    "scenes_firing_each_target": {
      "FFA": [1, 3, 5],
      "MT/V5": [1, 2, 3, 5],
      "VWFA": [1, 3, 4, 5, 6],
      "A1": [1, 2, 3, 4, 5, 6],
      "DMN": [1, 5, 6],
      "TPO Junction": [1, 3, 4],
      "EBA": [2, 4],
      "LOC": [1, 3, 4],
      "STS": [2, 5],
      "Prefrontal": [3, 4, 5]
    }
  },
  "multimodal_sync_per_scene": [
    { "scene": 1, "visual_at_s": 0.0, "audio_at_s": 0.0, "text_at_s": 0.2, "converged": true, "tpo_predicted": "HIGH" },
    { "scene": 2, "visual_at_s": 0.0, "audio_at_s": 0.0, "text_at_s": null, "converged": false, "tpo_predicted": "MEDIUM" }
  ],
  "research_audit_trail": [
    {
      "claim_id": "C001",
      "spoken_text": "R equals point four zero",
      "written_text": "R = 0.40",
      "phase2_source": "R = 0.40",
      "paper_exact_quote": "R_group near 0.4",
      "paper_section": "TRIBE v2 §2.3, Fig 3A",
      "match_status": "EXACT",
      "drift_magnitude": 0.0,
      "suggested_correction": null
    }
  ],
  "auto_fix_suggestions": [
    {
      "check_id": "NS02",
      "fix_type": "Add on-screen text element",
      "scenes_affected": [2, 4],
      "confidence": "HIGH",
      "effort": "Low",
      "suggested_text": "STEP 2"
    }
  ],
  "ordered_revision_queue": [
    {
      "rank": 1,
      "check_id": "NS02",
      "severity": "Major",
      "scenes_affected": [2, 4, 5],
      "action": "Add primary on-screen text element to scenes 2 and 4; tighten scene 5 text onset",
      "estimated_effort": "Low — 15 min in motion graphics editor",
      "verdict_impact_if_fixed": "NPS rises from 87 to estimated 92"
    }
  ],
  "info_notes": [
    "Scene 1 archival fMRI footage flagged for royalty clearance — confirm cleared before shoot",
    "Scene 4 custom architecture animation requires designer brief 48hrs pre-edit",
    "Reference video not supplied — RV01 marked N/A"
  ],
  "escalations_detected": [],
  "overrides_applied": []
}
```

---

## 12. EXAMPLE VALIDATION RUN

Input: The Phase-3 v2 example screenplay (TRIBE v2 Myth Bust, ABR-dominant, 35s, 6 scenes).

Sample output (abbreviated):

```json
{
  "metadata": {
    "validator_version": "2.0",
    "validated_at": "2026-06-05T14:32:00Z",
    "phase3_screenplay_title": "AI predicts your brain better than your scan does",
    "phase2_structure_used": "6 — Myth Bust",
    "format_skin": "ABR",
    "threshold_mode": "default"
  },
  "verdict": {
    "decision": "SHIP",
    "reason_summary": "0 critical failures, 1 major failure, 2 minor failures. Within all default thresholds. NPS = 91 (top-tier).",
    "ready_to_shoot": true
  },
  "neural_prediction_score": {
    "score": 91,
    "interpretation": "Top-tier",
    "components": {
      "neural_target_coverage": { "score": 91, "weight": 25, "contribution": 22.7 },
      "multimodal_convergence_density": { "score": 83, "weight": 15, "contribution": 12.5 },
      "demonstration_first": { "score": 100, "weight": 15, "contribution": 15.0 },
      "hook_strength": { "score": 100, "weight": 20, "contribution": 20.0 },
      "research_integrity": { "score": 100, "weight": 10, "contribution": 10.0 },
      "dialogue_engineering": { "score": 80, "weight": 10, "contribution": 8.0 },
      "operational_health": { "score": 100, "weight": 5, "contribution": 5.0 }
    }
  },
  "summary_counts": {
    "total_checks_run": 49,
    "checks_passed": 46,
    "checks_failed": 3,
    "checks_skipped_na": 3,
    "critical_failures": 0,
    "major_failures": 1,
    "minor_failures": 2,
    "info_notes": 3,
    "pass_rate_percent": 94.3
  },
  "quality_gate_status": {
    "QG01_scroll_stop": "PASS",
    "QG02_value_in_3s": "PASS",
    "QG03_natural_read_aloud": "PASS",
    "QG04_10yo_understands": "PASS",
    "QG05_cameraman_readable": "PASS",
    "QG06_actor_direction_clear": "PASS",
    "QG07_editor_cut_clarity": "PASS",
    "QG08_one_cta_5words": "PASS",
    "QG09_muted_understands_all": "PASS",
    "QG10_visual_change_every_2s": "PASS"
  },
  "check_results": [
    { "id": "GR01", "name": "Demonstration-First Dialogue", "severity": "Major", "result": "PASS", "evidence": "All 6 scenes' demonstration_first_test populated; 3 PASS, 1 PARTIAL (scene 1), 2 FAIL→ACCEPTED (scenes 5 and 6, Reinforcement and CTA exceptions)", "overridden": false },
    { "id": "GR02", "name": "Action-to-Dialogue Ratio ≥ 2.0", "severity": "Major", "result": "PASS", "evidence": "Top-level ratio = 2.6; lowest per-scene = 1.3 (scene 5)", "overridden": false },
    { "id": "GR03", "name": "Silent-Runtime Quota by Format", "severity": "Major", "result": "PASS", "evidence": "Silent runtime = 55.7% vs ABR threshold 50%", "overridden": false },
    { "id": "GR04", "name": "Hook Parseable Muted (Full Video)", "severity": "Critical", "result": "PASS", "evidence": "Scene 1 muted_parse_test = PASS; full-video audit: 5 of 6 scenes (83%) carry meaning via visual+text alone", "overridden": false },
    { "id": "GR05", "name": "Broad → Narrow → Niche", "severity": "Major", "result": "PASS", "evidence": "Scene 1 universal vocabulary; body scenes 3-4 use technical terms paired with on-screen decoders; CTA targets researchers via GitHub URL", "overridden": false },
    { "id": "GR06", "name": "Show, Don't Tell", "severity": "Major", "result": "PASS", "evidence": "Every numeric claim appears on-screen at moment of audible mention", "overridden": false },
    { "id": "GR07", "name": "Visual Change Every 2s", "severity": "Major", "result": "PASS", "evidence": "No scene exceeds 2.0s without visual change; scene 5 talking-head has text reveal at 1.5s and lower-third change at 3.0s", "overridden": false },
    { "id": "GR08", "name": "Silent Moments Mandatory", "severity": "Minor", "result": "PASS", "evidence": "Multiple silent moments: scene 4 has 3.5s silent runtime; scene 6 has 1.0s freeze", "overridden": false },
    { "id": "GR09", "name": "Bridge Words", "severity": "Minor", "result": "FAIL", "evidence": "Bridge words present in 3 of 5 transitions (60%, below 70% threshold). Scenes 3 and 5 begin without bridge phrases.", "scenes_affected": [3, 5], "suggested_fix": "Add 'But...' to scene 3 VO opening; add 'So...' to scene 5 VO opening", "overridden": false },
    { "id": "GR10", "name": "Action-Integrated Dialogue", "severity": "Minor", "result": "PASS", "evidence": "All scenes have populated action descriptions", "overridden": false },
    { "id": "GR11", "name": "Tri-Modal Convergence 0–1.5s", "severity": "Critical", "result": "PASS", "evidence": "Scene 1: visual_fired_at_s=0.0, audio_fired_at_s=0.0, text_fired_at_s=0.2; convergence_window_met=true", "overridden": false },
    { "id": "GR12", "name": "Research Fidelity Carry-Over", "severity": "Critical", "result": "PASS", "evidence": "R=0.40, 720 subjects, 1,000 hrs fMRI all match Phase-2; Meta FAIR visible in scene 4; figure ref Fig 3A/3B documented; code link in scene 6", "overridden": false },
    { "id": "GR13", "name": "Studio-Realistic Scope", "severity": "Major", "result": "PASS", "evidence": "All B-roll sources available; props_missing_from_studio empty; broll_missing entry flagged in production_warnings with substitute", "overridden": false },
    { "id": "GR14", "name": "Caption Coverage = 100%", "severity": "Critical", "result": "PASS", "evidence": "Every spoken word appears verbatim in scene caption block; word-by-word animation specified", "overridden": false },
    { "id": "GR15", "name": "One Peak Per Video", "severity": "Major", "result": "PASS", "evidence": "Single peak at scene 3 (R=0.40 burn-in, energy 8); other scenes graduated from 5-7 energy; CTA at energy 6", "overridden": false },
    { "id": "GR16", "name": "Hook Priority", "severity": "Minor", "result": "PASS", "evidence": "Scene 1 has highest production-notes density; no patch-with-edit notes", "overridden": false },
    { "id": "GR17", "name": "5× Outlier Match", "severity": "Minor", "result": "N/A", "evidence": "No reference video supplied", "overridden": false },
    { "id": "GR18", "name": "Mobile-First Safe Zones", "severity": "Major", "result": "PASS", "evidence": "All hero text positioned in middle 65%; captions in bottom 22%; no face crop violations", "overridden": false },
    { "id": "QG01", "name": "Scroll-Stop in 0.5s", "severity": "Critical", "result": "PASS", "evidence": "Scene 1: motion (archival fMRI), face (B-roll patient), text (MYTH by 0.3s) all within 0.5s", "overridden": false },
    { "id": "QG02", "name": "Value in First 3–5s", "severity": "Critical", "result": "PASS", "evidence": "Scene 1 delivers 'AI predicts brain better than scan' by 2.5s", "overridden": false },
    { "id": "QG03", "name": "Natural When Read Aloud", "severity": "Major", "result": "PASS", "evidence": "Staccato beats ≤ 8 words; no forbidden words; variable pace in 4 of 6 scenes", "overridden": false },
    { "id": "QG04", "name": "10-Year-Old Understands", "severity": "Major", "result": "PASS", "evidence": "Hook readability ≈ 4th grade; CTA ≈ 3rd grade; body ≈ 7th grade with decoders", "overridden": false },
    { "id": "QG05", "name": "Cameraman Knows What to Do", "severity": "Major", "result": "PASS", "evidence": "All scenes have filming_notes, camera block, lighting block, action block", "overridden": false },
    { "id": "QG06", "name": "Actor Knows Expression/Pace/Energy", "severity": "Major", "result": "PASS", "evidence": "All actor-present scenes specify energy_level, expression, pace, tone", "overridden": false },
    { "id": "QG07", "name": "Editor Knows Where Every Cut Happens", "severity": "Major", "result": "PASS", "evidence": "All scenes have cut_point and transition_to_next; ABR rhythm 0.9–1.4s between cuts", "overridden": false },
    { "id": "QG08", "name": "Exactly One CTA ≤5 Words at End", "severity": "Critical", "result": "PASS", "evidence": "Single CTA in scene 6; text 'Link in bio' = 3 words; freeze frame specified", "overridden": false },
    { "id": "QG09", "name": "Muted Viewer Understands Everything", "severity": "Critical", "result": "PASS", "evidence": "5 of 6 scenes carry core meaning via visual+text alone; 100% caption coverage", "overridden": false },
    { "id": "QG10", "name": "Visual Change Every 2 Seconds", "severity": "Major", "result": "PASS", "evidence": "No scene exceeds 2.0s without visual change", "overridden": false },
    { "id": "NS01", "name": "Brain Region Coverage", "severity": "Major", "result": "PASS", "evidence": "10 of 11 Phase-2 promised targets fired; PPA missing (acceptable for ABR Myth Bust)", "overridden": false },
    { "id": "NS02", "name": "Multimodal Convergence Density", "severity": "Major", "result": "FAIL", "evidence": "Convergence in 5 of 6 scenes (83%); scene 4 marked MEDIUM (text onset at 4.0s, just outside 1.5s window)", "scenes_affected": [4], "suggested_fix": "Advance scene 4 primary text onset to 0.3s", "overridden": false },
    { "id": "NS03", "name": "Hemodynamic Delay Alignment", "severity": "Minor", "result": "PASS", "evidence": "Climax at scene 3 (15s); CTA at scene 6 (31s); gap = 16s", "overridden": false },
    { "id": "NS04", "name": "DMN Activation Density", "severity": "Minor", "result": "FAIL", "evidence": "Second-person density = 1.5 per 10 words (below 2.0 threshold). 'You' appears 4× across 62 spoken words", "scenes_affected": [4, 5], "suggested_fix": "Rewrite scenes 4 and 5 to add 'your' / 'you' references", "overridden": false },
    { "id": "NS05", "name": "VWFA Stimulation Density", "severity": "Minor", "result": "PASS", "evidence": "All 6 scenes have on-screen text; 5 of 6 (83%) have primary hero text beyond caption", "overridden": false },
    { "id": "NS06", "name": "Auditory Cortex Onset", "severity": "Critical", "result": "PASS", "evidence": "Scene 1 first_word_onset_s = 0.0", "overridden": false },
    { "id": "NS07", "name": "Variable-Pace Prosody", "severity": "Minor", "result": "PASS", "evidence": "Scenes 1, 2, 3, 4 use variable pace; scenes 5, 6 use slow (acceptable for Reinforcement/CTA)", "overridden": false },
    { "id": "NS08", "name": "Hook Visual Hierarchy", "severity": "Critical", "result": "PASS", "evidence": "Scene 1 within 0.5s: motion (archival fMRI), face (B-roll patient), text (MYTH hero text by 0.3s)", "overridden": false },
    { "id": "SA01", "name": "Beat Length ≤ 8 Words", "severity": "Major", "result": "PASS", "evidence": "All beats across 6 scenes are ≤ 8 words; longest beat = 7 words", "overridden": false },
    { "id": "SA02", "name": "No Conjunctions Between Beats", "severity": "Minor", "result": "PASS", "evidence": "Zero conjunctions between hard stops", "overridden": false },
    { "id": "SA03", "name": "5th-Grade Readability", "severity": "Major", "result": "PASS", "evidence": "Hook ≈ 4th grade; CTA ≈ 3rd grade; body ≈ 7th grade with decoders", "overridden": false },
    { "id": "SA04", "name": "You/Your Density", "severity": "Minor", "result": "FAIL", "evidence": "Density = 1.5 per 10 words (below 2.0 threshold)", "scenes_affected": [4, 5], "suggested_fix": "Add second-person references to scenes 4 and 5", "overridden": false },
    { "id": "SA05", "name": "Forbidden Words Absent", "severity": "Major", "result": "PASS", "evidence": "Zero forbidden words detected across all scenes", "overridden": false },
    { "id": "SA06", "name": "Pronunciation Notes for Technical Terms", "severity": "Info", "result": "PASS", "evidence": "All technical terms (fMRI, FFA, TRIBE, NeuralSet) have pronunciation notes", "overridden": false },
    { "id": "PBL01", "name": "SEE / READ / HEAR Triple-Hook", "severity": "Critical", "result": "PASS", "evidence": "Scene 1 SEE = fMRI scanner B-roll; READ = MYTH hero text; HEAR = VO at t=0.0", "overridden": false },
    { "id": "PBL02", "name": "Visual Hook ≥ Verbal Hook", "severity": "Major", "result": "PASS", "evidence": "Scene 1 visual carries hook standalone; VO is amplifier not carrier", "overridden": false },
    { "id": "PBL03", "name": "Muted-Parse Test", "severity": "Critical", "result": "PASS", "evidence": "Cross-ref with GR04 — consistent PASS", "overridden": false },
    { "id": "PBL04", "name": "Broad-Hook Test", "severity": "Major", "result": "PASS", "evidence": "Hook uses 'brain scan' (universal) — no jargon", "overridden": false },
    { "id": "PBL05", "name": "4-Component Script Anatomy", "severity": "Minor", "result": "PASS", "evidence": "All scenes contain filming_notes, vo/action, caption, subtitle support", "overridden": false },
    { "id": "ST01", "name": "Actor Count vs Format", "severity": "Major", "result": "PASS", "evidence": "0 actors declared; ABR format permits 0; on-camera scenes 5-6 use Hybrid skin — production_summary reconciled", "overridden": false },
    { "id": "ST02", "name": "Lighting Setups ≤ Available", "severity": "Major", "result": "PASS", "evidence": "1 setup required; 3 fixtures available", "overridden": false },
    { "id": "ST03", "name": "B-roll Source Availability", "severity": "Major", "result": "PASS", "evidence": "All sources in studio_assets.broll_sources_available", "overridden": false },
    { "id": "ST04", "name": "Custom Animation Lead Time", "severity": "Minor", "result": "PASS", "evidence": "Scenes 3 and 4 custom animations flagged in production_warnings with 48hr designer brief note", "overridden": false },
    { "id": "CT01", "name": "CTA Freeze Frame", "severity": "Major", "result": "PASS", "evidence": "Scene 6 editing block specifies freeze on CTA text for 1.5s", "overridden": false },
    { "id": "CT02", "name": "CTA Text ≤ 5 Words", "severity": "Major", "result": "PASS", "evidence": "CTA text 'Link in bio' = 3 words", "overridden": false },
    { "id": "CT03", "name": "Single CTA Only", "severity": "Major", "result": "PASS", "evidence": "Exactly one CTA prompt in entire video (scene 6)", "overridden": false },
    { "id": "CT04", "name": "Export Specs Present", "severity": "Info", "result": "PASS", "evidence": "post_production_checklist contains resolution, codec, fps, bitrate, aspect ratio", "overridden": false },
    { "id": "ML01", "name": "Language Tag Consistency", "severity": "Minor", "result": "N/A", "evidence": "Single-language script (English only)", "overridden": false },
    { "id": "ML02", "name": "Caption Coverage Per Language", "severity": "Major", "result": "N/A", "evidence": "Single-language script", "overridden": false },
    { "id": "RV01", "name": "Reference Video Match", "severity": "Minor", "result": "N/A", "evidence": "No reference video supplied", "overridden": false }
  ],
  "brain_region_coverage": {
    "promised_in_phase2": ["FFA", "MT/V5", "VWFA", "A1", "DMN", "TPO Junction", "EBA", "LOC", "PPA", "STS", "Prefrontal"],
    "fired_in_phase3": ["FFA", "MT/V5", "VWFA", "A1", "DMN", "TPO Junction", "EBA", "LOC", "STS", "Prefrontal"],
    "missing": ["PPA"],
    "coverage_percent": 90.9,
    "note": "PPA absence is acceptable for ABR Myth Bust — no establishing environmental shot is dramatically required"
  },
  "ordered_revision_queue": [
    {
      "rank": 1,
      "check_id": "NS02",
      "severity": "Major",
      "scenes_affected": [4],
      "action": "Advance scene 4 primary text onset to 0.3s to achieve tri-modal convergence",
      "estimated_effort": "Low — 5 min in motion graphics editor",
      "verdict_impact_if_fixed": "NPS rises from 91 to estimated 93"
    },
    {
      "rank": 2,
      "check_id": "NS04",
      "severity": "Minor",
      "scenes_affected": [4, 5],
      "action": "Rewrite scene 4 and 5 dialogue to add 'your' / 'you' references; target 4 more second-person occurrences",
      "estimated_effort": "Low — 10 min script edit; if VO recorded, re-record affected lines only",
      "verdict_impact_if_fixed": "NPS rises from 91 to estimated 92"
    },
    {
      "rank": 3,
      "check_id": "GR09",
      "severity": "Minor",
      "scenes_affected": [3, 5],
      "action": "Add bridge phrase to scenes 3 and 5 VO opening",
      "estimated_effort": "Trivial — script edit only",
      "verdict_impact_if_fixed": "None on verdict; minor NPS lift"
    }
  ],
  "info_notes": [
    "Scene 1 archival fMRI footage flagged for royalty clearance — confirm cleared before shoot",
    "Scenes 3 and 4 custom animations require designer brief 48hrs pre-edit",
    "ST01 note: metadata.actor_count=0 but scenes 5-6 specify A1 host; recommend reconciling production_summary.actors_required"
  ],
  "escalations_detected": [],
  "overrides_applied": []
}
```

This example earns **SHIP** with **NPS 91** because all Critical checks pass, only 1 Major failure (NS02 — scene 4 text timing), and 2 Minor fixes recommended.

---

## 13. BRAIN REGION COVERAGE MATRIX

A standard reference for what each Phase-2 structure typically activates. The validator uses this as the expected baseline; deviations are flagged in NS01.

| Structure | Expected Active Regions (high-priority) |
|---|---|
| 1 Comparison | FFA, MT/V5, VWFA, V1–V4, EBA, LOC, STS, Prefrontal, DMN |
| 2 Step-by-Step | FFA, EBA, LOC, VWFA, STS, DMN, Prefrontal |
| 3 Story Framework | PPA, FFA, TPJ, Amygdala, MT/V5, STS, DMN |
| 4 Smart vs Dumb | FFA×2, MT/V5, V1–V4, EBA, LOC, STS, DMN, Prefrontal |
| 5 Do vs Don't | FFA, V1–V4, EBA, LOC, STS, DMN, Prefrontal |
| 6 Myth Bust | FFA, MT/V5, VWFA, A1, V1–V4, EBA, LOC, STS, DMN, Prefrontal, TPO Junction |
| 7 List | FFA, VWFA, EBA, LOC, MT/V5, STS, DMN |
| 8 3-Level | FFA, VWFA, EBA, LOC, V1–V4, STS, DMN |
| 9 PAS | FFA, TPJ, V1–V4, MT/V5, A1, EBA, LOC, STS, DMN, Prefrontal |
| 10 Outcome→Pain→Solution | FFA, LOC, V1–V4, MT/V5, EBA, VWFA, STS, DMN, Prefrontal |
| 11 Before→After | V1–V4, FFA, VWFA, PPA, TPJ, FFA, MT/V5, EBA, STS, DMN |
| 12 Time-Based Experiment | VWFA, FFA, LOC, EBA, Prefrontal, TPJ, STS, DMN |
| 13 Fake Case Study | VWFA, FFA, EBA, LOC, Prefrontal, STS, DMN |
| 14 Double Down | VWFA, FFA, V1–V4, EBA, LOC, STS, DMN |
| 15 Cost Breakdown | VWFA, FFA, Prefrontal, A1, STS, DMN |

NS01 expects ≥ 90% of the structure's expected regions to be fired. Below 90% triggers a Major failure with the specific missing regions listed.

---

## 14. APPENDIX A — QUICK-GLANCE SCORECARD FORMAT

For human consumption alongside the JSON report. Auto-generated from the report:

```
╔══════════════════════════════════════════════════════════════╗
║           SCALEROCK SCREENPLAY VALIDATION REPORT             ║
╠══════════════════════════════════════════════════════════════╣
║ Title: AI predicts your brain better than your scan does    ║
║ Structure: 6 — Myth Bust | Format Skin: ABR | 35s 9:16     ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   VERDICT: ✓ SHIP                                            ║
║   Neural Prediction Score: 91 / 100  (Top-tier)              ║
║                                                              ║
║   Checks Run: 49  |  Passed: 46  |  Failed: 3  |  N/A: 3      ║
║   Critical: 0 fail  |  Major: 1 fail  |  Minor: 2 fail       ║
║                                                              ║
║   Quality Gate: 10 of 10 PASSED                              ║
║                                                              ║
║   Brain Region Coverage: 10 of 11 promised regions fired     ║
║      (PPA missing — acceptable for ABR Myth Bust)            ║
║                                                              ║
║   Top Revisions:                                             ║
║      1. NS04 — Add more 'you' references to scenes 4 & 5   ║
║      2. NS02 — Tighten scene 4 text onset to 0.3s           ║
║      3. GR09 — Bridge words for scenes 3 & 5                  ║
║                                                              ║
║   Ready to shoot: YES                                        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

This is rendered from `verdict` + `neural_prediction_score` + `summary_counts` + `ordered_revision_queue[0..2]` + `quality_gate_status`.

---

## 15. APPENDIX B — COMMON FAILURE PATTERNS & STANDARD FIXES

A working knowledge base of failure patterns the validator has encountered, with documented remediation paths. Use this as a quick-reference for content creators handling REVISE verdicts.

### Pattern B1 — "VO carries all the meaning; visuals decorate"
- **Symptoms**: GR04 fails, PBL02 fails, NS02 has low convergence
- **Root cause**: Talking-head mindset bleeding into ABR scenes
- **Standard fix**: Strip every spoken line down to keyword density; promote the surrounding context into visual on-screen text and B-roll

### Pattern B2 — "Hook is technical from the first word"
- **Symptoms**: GR05 fails, PBL04 fails, QG04 fails
- **Root cause**: Researcher-direct delivery of subject-matter
- **Standard fix**: Replace technical first sentence with universal-vocabulary version; move the technical claim to scene 2-3 paired with on-screen decoder

### Pattern B3 — "Caption coverage incomplete"
- **Symptoms**: GR14 fails Critical
- **Root cause**: Designer treats captions as decorative
- **Standard fix**: Make captions verbatim word-by-word transcription of all VO; production rule: caption text is regenerated from VO line, never edited independently

### Pattern B4 — "Numbers spoken but not shown"
- **Symptoms**: GR06 fails, GR12 fails (if Phase-2 number)
- **Root cause**: Director skipped the dual-coding step
- **Standard fix**: For every numeric VO mention, add on-screen text element with the exact number at the same moment; use count-up animation for added VWFA salience

### Pattern B5 — "Multiple peaks dilute the climax"
- **Symptoms**: GR15 fails
- **Root cause**: Every scene treated as high-energy
- **Standard fix**: Identify the one structural payoff beat; reduce energy in all other scenes to 5-7; reserve energy 10 / speed-ramp for the single payoff

### Pattern B6 — "Scene 1 has dead air at start"
- **Symptoms**: NS06 fails Critical, QG01 fails
- **Root cause**: VO recorded with natural breath-in before first word
- **Standard fix**: Trim VO recording to start exactly at first phoneme; if needed, re-record with cue tone

### Pattern B7 — "Brain region promised but not delivered"
- **Symptoms**: NS01 fails
- **Root cause**: Phase-2 declared neural targets that Phase-3 didn't translate into specific scene elements
- **Standard fix**: For each missing target, consult Phase-3 §15 (Neural → Camera mapping) and add the corresponding element to at least one scene

### Pattern B8 — "Custom animation requested without designer lead time"
- **Symptoms**: ST04 fails Minor
- **Root cause**: Screenplay generator didn't flag asset dependencies
- **Standard fix**: Add `production_warnings` entries with 48hr lead time for each custom animation; or substitute with screen-capture of existing paper figures

### Pattern B9 — "Reinforcement and CTA both lean talking-head"
- **Symptoms**: GR03 may fail (silent quota), no fundamental neural fail
- **Root cause**: Format skin assignment defaulted both end scenes to Hybrid
- **Standard fix**: Convert Reinforcement to ABR with VO over screen capture or animated graphic; keep CTA as talking-head for parasocial closure

### Pattern B10 — "Reference video supplied but match block absent"
- **Symptoms**: GR17 fails, RV01 fails
- **Root cause**: Phase-3 ignored the `reference_video` input
- **Standard fix**: Re-run Phase-3 with reference matching enabled; validator re-checks

### Pattern B11 — "Staccato beats are too long and sound like prose"
- **Symptoms**: SA01 fails, QG03 fails
- **Root cause**: Phase-3 dialogue engine defaulted to explanatory prose instead of staccato
- **Standard fix**: Split every line at natural pause points; target 3–5 word beats; replace conjunctions with hard stops; add visual changes between beats

### Pattern B12 — "CTA is buried or too long"
- **Symptoms**: CT02 fails, CT03 fails, QG08 fails
- **Root cause**: Multiple action asks or a compound CTA sentence
- **Standard fix**: Remove all CTAs except the final one; trim final CTA to verb + object ≤ 5 words; add freeze frame for 1.0–1.5s

### Pattern B13 — "Visual static shots exceed 2 seconds"
- **Symptoms**: GR07 fails, QG10 fails
- **Root cause**: Editor or director planned for cinematic pacing instead of social-video pacing
- **Standard fix**: Insert a cut, text pop, prop entry, or B-roll insert at every 2-second mark; use jump cuts if necessary to maintain energy

### Pattern B14 — "Full video fails muted-parse"
- **Symptoms**: GR04 fails (full video), QG09 fails
- **Root cause**: Body scenes rely on VO to carry narrative; captions are decorative summaries rather than verbatim transcripts
- **Standard fix**: Ensure 100% verbatim caption coverage; add on-screen text summaries to body scenes that explain the scene's point without audio; use screen recordings or graphics that carry meaning visually

---

## 16. APPENDIX C — VALIDATOR VERSION HISTORY

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-06-04 | Initial release — 38 checks, NPS, verdict, coverage matrix |
| 2.0 | 2026-06-05 | **Merged** Phase-4 form 10-point Quality Gate (QG01–QG10); **Added** Staccato checks (SA01–SA06); **Added** CTA checks (CT01–CT04); **Added** 4-Role Approval Workflow; **Added** Auto-Fix Engine; **Added** Research Fidelity Audit Trail; **Added** Neural Activation Heatmap; **Enhanced** GR04 to full-video muted parse; **Enhanced** GR07 to all-scene visual change; **Enhanced** NPS component weights; Total checks: 52 |

---

*Skill Version: 2.0*  
*Last Updated: 2026-06-05*  
*Compatible with: Phase 3 Screenplay Generator v5.0, Phase 2 Structure Generator v3*  
*Research Corpus: TRIBE v2 (d'Ascoli et al., 2026), NeuralSet (King et al., 2026)*  
*Viral Methodology: PersonalBrandLaunch (Ava Yuergens)*  
*Multi-Language: EN, HI, TA, HIN-EN, TAM-EN — extensible to any language pair*  
*Quality Gate Source: Phase-4 Production Form (https://rbcm2h5ijpzgq.kimi.page/#/phase/4)*
