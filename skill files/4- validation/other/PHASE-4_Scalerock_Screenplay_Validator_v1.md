---
name: scalerock-screenplay-validator
description: Phase-3.5 of the Scalerock viral video pipeline. Validates a Phase-3 screenplay JSON output against 18 Golden Rules, TRIBE v2 / NeuralSet neuroscience criteria, Personal Brand Launch operational checks, studio reality, and research integrity. Emits a structured validation report with severity-tagged check results (Critical/Major/Minor/Info), a Neural Prediction Score (0-100 composite quality score), a brain region coverage matrix, ordered suggested revisions, and a final verdict (SHIP / REVISE / REJECT). Use this whenever a Phase-3 screenplay JSON is provided for QC, or when the user says "validate this screenplay", "score this script", "check this against the golden rules", "ready to shoot?", or "QC this". Do NOT use to generate or fix screenplays — this skill scores and reports only. If a fix is needed, route back to Phase-3 with the revision notes.
---

# SKILL: Scalerock Screenplay Validator v1
## Phase 3.5 of the Research-to-Viral-Video Pipeline — QC & Validation Layer

> **Pipeline position**
> **Phase 1** (Topic + Value form) → **Phase 2** (NeuroAI Structure Generator) → **Phase 3** (Screenplay Generator) → **Phase 3.5 (THIS SKILL)** (Validation) → **Phase 4** (Shoot / AI render)

---

## 0. LAYER SEPARATION (read this first)

This skill validates. It does not generate, edit, or repair screenplays. The boundary is non-negotiable:

| What Phase 3.5 DOES | What Phase 3.5 DOES NOT |
|---|---|
| Score a Phase-3 JSON output against 38 checks | Generate new content or replace failed lines |
| Identify which Golden Rules are violated and where | Auto-fix violations |
| Compute brain region coverage and multimodal sync confidence | Re-render scenes |
| Emit a structured report with severity-tagged failures | Make subjective judgment calls about "feel" or "vibe" |
| Recommend specific fixes with scene/field references | Re-shoot or re-edit |
| Issue a final verdict (SHIP / REVISE / REJECT) | Override the verdict on opinion alone |

If the validator returns REVISE or REJECT, the user routes the screenplay back to Phase-3 with the revision notes attached. Phase-3 regenerates the failing scenes. Phase 3.5 re-validates. Loop until SHIP.

---

## 1. PURPOSE

Take the **Phase-3 Screenplay JSON output** and apply 38 deterministic checks spanning:

1. **18 Golden Rules** from the Phase-3 spec (GR01–GR18)
2. **8 Neuroscience-specific checks** anchored to TRIBE v2 and NeuralSet findings (NS01–NS08)
3. **5 Personal Brand Launch operational checks** (PBL01–PBL05)
4. **4 Studio Realism checks** (ST01–ST04)
5. **2 Multi-Language compliance checks** (ML01–ML02)
6. **1 Reference Video matching check** (RV01)

The output is a **validation report JSON** containing:

- Per-check result (PASS / FAIL / N/A)
- Severity per failure (Critical / Major / Minor / Info)
- Specific scene/field reference for every failure
- Suggested fix per failure
- Brain region coverage matrix
- A composite **Neural Prediction Score (NPS) 0-100**
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

## 3. SEVERITY SCALE

Every check carries a fixed severity that determines its weight in verdict computation.

| Severity | Definition | Verdict impact |
|---|---|---|
| **Critical** | Fundamental violation. Video will likely fail to engage, convey message, or pass platform standards. Must fix before shoot. | Any unflagged Critical → REJECT or REVISE |
| **Major** | Significant issue that will materially reduce performance (engagement, retention, conversion). | 3+ unflagged Major → REVISE; 6+ → REJECT |
| **Minor** | Quality issue. Polish if time permits. Will not break the video. | Aggregated into NPS; does not gate verdict alone |
| **Info** | Note for awareness — pending designer asset, optional improvement, watchlist item. | Reported only; does not affect verdict |

**Severity is fixed per check ID and never inferred at runtime.**

### Severity escalation rules

A cluster of lower-severity failures in the same scene escalates by one tier:

- 3+ Minor failures in a single scene → 1 Major (logged as "MINOR_CLUSTER_ESCALATION")
- 3+ Major failures in a single scene → 1 Critical (logged as "MAJOR_CLUSTER_ESCALATION")
- 5+ Minor failures across the whole video → 1 Major

Escalations are reported as derived findings — they don't double-count the underlying failures.

---

## 4. CHECK CATALOG (38 checks)

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
- **Fix**: Identify scenes with high dialogue density and low action density; expand `action` block with concrete observable beats (gestures, prop entries, B-roll cuts); OR trim VO line to its essence
- **Report**: Per-scene ratio table; flag scenes below threshold; show ratio gap to remediation

---

#### GR03 — Silent-Runtime Quota by Format
- **Severity**: Major
- **Source**: Phase-3 Golden Rule 3
- **Tests**: `metadata.silent_runtime_percent` against `metadata.format_skin_primary`
- **Passes**: Silent percent meets or exceeds quota — ABR ≥ 50%, Whiteboard ≥ 30%, Two-Person ≥ 25%, Talking-Head ≥ 20%, Hybrid ≥ 35%
- **Fails**: Silent percent below the format's quota
- **Neural rationale**: TRIBE v2 demonstrates that the multimodal integration boost at the TPO junction is degraded by continuous auditory stimulation; silent gaps allow the visual and text channels to consolidate independently
- **Fix**: Identify scenes with continuous dialogue; introduce silent demonstration beats (prop hero, reaction insert, text-only frame, B-roll cutaway with no VO); recompute ratio
- **Report**: Format skin, quota, actual silent percent, gap

---

#### GR04 — Hook Parseable Muted
- **Severity**: Critical
- **Source**: Phase-3 Golden Rule 4
- **Tests**: Scene 1's `pbl_checks.muted_parse_test` field AND structural reconstruction of scene 1 with audio stripped
- **Passes**: Scene 1 visual + caption + on-screen text alone convey the full hook message; field marked "PASS"
- **Fails**: Field marked "FAIL", OR scene 1 visual + caption do NOT carry the message without VO
- **Neural rationale**: 85% of social video is viewed muted by platform default in first 2s; if visual hook fails muted-parse, the FFA/VWFA/MT triple-fire is incomplete and the TPO convergence boost is lost
- **Fix**: Add or upgrade the hook scene's `visual.on_screen_text.primary` to carry the message standalone; ensure motion is intrinsic to the visual (not VO-driven); review caption sync timing
- **Report**: Quote scene 1 dialogue; quote scene 1 caption; quote scene 1 on-screen text; assess whether the latter two carry the meaning alone

---

#### GR05 — Broad → Narrow → Niche Across Timing
- **Severity**: Major
- **Source**: Phase-3 Golden Rule 5
- **Tests**: Vocabulary in hook scene vs body scenes vs CTA scene
- **Passes**: Hook scene uses universal vocabulary (no field-specific jargon without a paired on-screen decoder); body scenes deliver narrow ICP value; CTA targets the right viewer specifically
- **Fails**: Hook scene contains jargon without decoder (e.g., "fMRI" or "transformer" appears in `vo.line` without simultaneous on-screen text translating it); OR body scenes remain at hook-level abstraction; OR CTA is too broad ("follow me" instead of niche-targeted)
- **Neural rationale**: Default Mode Network engagement requires self-relevance signaling — broad hook maximizes the addressable audience; narrow body retains the converters; niche CTA prevents wasted action attempts
- **Fix**: Rewrite hook to universal vocabulary OR add on-screen text decoder for any technical term in the hook; specify narrow value in body; tighten CTA to ICP language
- **Report**: List jargon terms found in hook; assess body scope; assess CTA specificity

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

#### GR07 — No Talking Head > 2 Seconds
- **Severity**: Major
- **Source**: Phase-3 Golden Rule 7
- **Tests**: For every scene with format_skin = Talking-Head or Hybrid talking-head insert, compute longest continuous unbroken talking-head shot duration
- **Passes**: No talking-head shot exceeds 2.0 seconds without a visual change (cut to different shot, on-screen text appears/changes, prop enters, gesture, B-roll insert, caption highlight word changes)
- **Fails**: Any talking-head shot exceeds 2.0 seconds with zero visual change
- **Neural rationale**: MT/V5 (motion area, ~100ms response) habituates to static visual input within 2 seconds; engagement drops sharply past that threshold
- **Fix**: Insert a visual change at the 2-second mark — cut to a different shot, fire an on-screen text change, drop in a B-roll cutaway, or animate a graphic
- **Report**: Per-scene log: scene number, talking-head shot duration, location of needed visual change

---

#### GR08 — Silent Moments Mandatory
- **Severity**: Minor
- **Source**: Phase-3 Golden Rule 8
- **Tests**: At least one of: reaction shot (0.5–1.0s) OR product/object reveal (1.0–2.0s) OR before/after cut (1.0s each) OR text-only moment (1.0–2.0s) OR pre-CTA freeze (1.0s) exists somewhere in the video
- **Passes**: At least one silent moment of the qualifying type exists
- **Fails**: Zero silent moments across the whole video (dialogue runs continuously start to end)
- **Neural rationale**: Silent moments allow FFA / LOC / VWFA to isolate and consolidate — continuous dialogue prevents this consolidation
- **Fix**: Add a 1.0-second pre-CTA freeze if nothing else works; this is the lowest-cost insertion
- **Report**: List silent moments found; if zero, recommend insertion point

---

#### GR09 — Bridge Words Between Sentences
- **Severity**: Minor
- **Source**: Phase-3 Golden Rule 9
- **Tests**: Inspect each scene transition; does the dialogue of scene N+1 begin with a bridge word/phrase that connects to scene N? ("And...", "But here's the thing...", "Which means...", "So now...", "And that's why...")
- **Passes**: At least 70% of scene transitions have explicit bridge words
- **Fails**: Below 70% — sentences feel discontinuous
- **Neural rationale**: Language network maintains semantic continuity via connective tissue; without bridges, the network treats each sentence as a separate event and engagement drops
- **Fix**: Add bridge phrases to the start of dialogue lines that follow a scene cut; example bridges listed in spec
- **Report**: Show transitions without bridges; suggest specific bridge words per gap

---

#### GR10 — Action-Integrated Dialogue
- **Severity**: Minor
- **Source**: Phase-3 Golden Rule 10
- **Tests**: Every dialogue line has a non-empty `action_parenthetical` describing what the actor is doing during the line (in talking-head and Hybrid skins); for ABR scenes, the `action` block describes B-roll/visual activity timed against the VO
- **Passes**: All dialogue-bearing scenes have populated action descriptions
- **Fails**: Any scene has dialogue without action specification
- **Neural rationale**: EBA + STS co-activation requires that the actor's action and speech are temporally aligned; un-actioned dialogue is delivered as "floating head" and engagement drops
- **Fix**: For each violating scene, write a 1–3 sentence action_parenthetical describing the actor's behavior during the line; specify hand gestures, eye movements, body shifts
- **Report**: List scenes with missing action descriptions

---

#### GR11 — Tri-Modal Convergence in 0–1.5s
- **Severity**: Critical
- **Source**: Phase-3 Golden Rule 11
- **Tests**: Scene 1's `multimodal_sync_check` block — `visual_fired_at_s`, `audio_fired_at_s`, `text_fired_at_s` all ≤ 1.5
- **Passes**: All three modalities fired within 0–1.5s; `convergence_window_met: true`
- **Fails**: Any modality fires after 1.5s; OR `convergence_window_met: false`
- **Neural rationale**: TRIBE v2 demonstrates 50% encoding boost at the TPO junction when visual + audio + text converge in the same 1.5s window; outside this window, modalities encode separately and the boost is lost
- **Fix**: Tighten scene 1 — ensure visual content is parseable by 0.3s, first VO phoneme at 0.0s, on-screen text appears by 0.3s; rebuild scene 1 if necessary
- **Report**: Quote actual onset times; quote required onset times; compute gap

---

#### GR12 — Research Fidelity Carry-Over
- **Severity**: Critical
- **Source**: Phase-3 Golden Rule 12
- **Tests**: All numeric claims in `vo.line` fields match `phase2_structure.research_integrity.claim_fidelity` exactly; `research_integrity_carryforward.claim_fidelity_check` field is "PASSED"; figure reference, institution anchor, and code link are visible somewhere in the video
- **Passes**: Every number matches Phase-2; institution anchor in at least one scene's `visual.on_screen_text` or graphic overlay; figure reference cited; code link in CTA scene
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
- **Neural rationale**: N/A (production logistics)
- **Fix**: Either acquire the missing resource before shoot OR add a `production_warnings` entry with a documented substitute
- **Report**: List missing resources by category (props, B-roll, lighting, actor)

---

#### GR14 — Caption Coverage = 100%
- **Severity**: Critical
- **Source**: Phase-3 Golden Rule 14
- **Tests**: Every word in every scene's `vo.line` appears in the corresponding scene's `visual.on_screen_text.caption.text`; caption animation specified as word-by-word synced
- **Passes**: Caption text contains every dialogue word (verbatim or with documented translation for multi-language); caption animation is word-by-word
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
- **Fails**: Zero peaks (flat energy curve, no climax) OR multiple peaks (dilutes the climax) OR peak lands at the wrong structural position (hook or CTA)
- **Neural rationale**: Single energy peak creates an emotional anchor that the rest of the video orbits; multiple peaks habituate the amygdala and dampen retention
- **Fix**: Identify the intended payoff beat; concentrate energy/speed-ramp/emphasis there; reduce intensity in other scenes
- **Report**: Peak count, peak locations, structural beat names, recommended consolidation

---

#### GR16 — Hook → Script → Format → Editing Priority (PBL)
- **Severity**: Minor
- **Source**: Phase-3 Golden Rule 16
- **Tests**: When a tradeoff is implied (e.g., an aesthetic editing choice that weakens the hook), the screenplay prioritizes hook strength over format polish
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
- **Passes**: Field is true AND the documented matched property (cut_rhythm / pacing / format / hook_structure) shows numerical match within tolerance; OR field not present because no reference supplied (test marked N/A)
- **Fails**: Reference supplied but `match_within_tolerance: false`; OR field omitted when reference was provided
- **Neural rationale**: N/A (operational match)
- **Fix**: Re-render the screenplay matching the reference video's cut rhythm and format more tightly
- **Report**: Reference URL, target property, target value, actual value, gap

---

#### GR18 — Mobile-First Safe Zone Compliance ⭐ NEW IN VALIDATOR
- **Severity**: Major
- **Source**: Formalization of framing rules scattered across Phase-3 §7.5 (intended as the 18th Golden Rule — flag back to Phase-3 v2 for incorporation)
- **Tests**: For 9:16 aspect ratio: top 10% of frame reserved for platform UI (no critical text/face); bottom 25% reserved for caption + platform UI band (text in this band must BE the caption, not decorative hero text); critical action and faces in middle 65%
- **Passes**: Every scene's `visual.on_screen_text` positions respect the safe zones; no hero text in top 10% or in bottom 25% (unless it IS the caption); no face crop at safe zone edges unless intentional ECU
- **Fails**: Hero text positioned at "top 5%" or "bottom 15%"; OR face positioning collides with safe zones; OR critical action outside middle 65%
- **Neural rationale**: Mobile-platform UI overlays consistently occlude top and bottom bands; FFA / VWFA targets placed in these bands are partially or fully blocked by Instagram/TikTok/Shorts UI elements, defeating their neural purpose
- **Fix**: Reposition violating elements to middle 65%; recompute hero text positions; if center conflicts with caption, reduce hero text font size and stack vertically
- **Report**: Per-violation: scene number, violating element, current position, safe position; visual diagram (text-based) if helpful

---

### 4.2 Neuroscience-Specific Checks (NS01–NS08)

These check TRIBE v2 and NeuralSet-specific predictions that aren't already covered by Golden Rules. Each one references the originating paper finding.

---

#### NS01 — Brain Region Coverage Completeness
- **Severity**: Major
- **Source**: TRIBE v2 §2.5 (in-silico experiments — vision; in-silico experiments — language)
- **Tests**: Aggregate all `scenes[].neural_targets_fired` arrays. Verify the union covers every neural target declared in Phase-2's `hooks.visual.neural_targets`, `hooks.written.neural_targets`, and `hooks.audio.neural_targets`
- **Passes**: Every Phase-2-declared neural target is fired in at least one scene
- **Fails**: One or more declared targets is not fired in any scene (Phase-2 promised activation that Phase-3 did not deliver)
- **Neural rationale**: TRIBE v2 establishes specific brain regions for specific content categories — if Phase-2 commits to firing FFA but no scene contains a face (actor or B-roll), the promise is broken
- **Fix**: Identify the missing target; add a scene element that activates it (face B-roll for FFA, hand gesture for EBA, number overlay for VWFA, environment shot for PPA, etc.)
- **Report**: Coverage matrix showing each Phase-2 target → fired/not fired → which scenes fired it

---

#### NS02 — Multimodal Convergence Density
- **Severity**: Major
- **Source**: TRIBE v2 §2.8 (multimodality insights — 50% gain at TPO junction)
- **Tests**: Count scenes where all three modalities (visual + audio + text) fire in the same 1.5s window. Compute density = (converged scenes) / (total scenes)
- **Passes**: Density ≥ 0.5 (50%+ of scenes show tri-modal convergence)
- **Fails**: Density < 0.5 (most scenes are uni- or bimodal — losing the TPO boost)
- **Neural rationale**: TRIBE v2 shows up to 50% encoding accuracy gain at the TPO junction when modalities converge; sustaining this throughout the video, not just at the hook, maintains engagement
- **Fix**: For scenes with low modality count, add caption coverage (text channel) or add a meaningful visual change (visual channel) — VO is usually already present
- **Report**: Per-scene modality count; identify mono- and bi-modal scenes; suggest additions

---

#### NS03 — Hemodynamic Delay Alignment
- **Severity**: Minor
- **Source**: TRIBE v2 §5.8 (hemodynamic lag preprocessing — 5-second delay between stimulus and peak BOLD response)
- **Tests**: For "Reinforcement" / "Lesson" / "Insight" beats — does the audience have ~3-5 seconds of consolidation time before the CTA? Inspect runtime gap between the climax beat (energy peak) and the CTA scene start
- **Passes**: Gap ≥ 3.0 seconds between climax and CTA onset
- **Fails**: CTA cuts in immediately after climax (gap < 3.0s) — neural systems haven't consolidated the payoff before the action ask
- **Neural rationale**: The brain needs ~3-5s to fully process the payoff signal before being asked to act; rushing the CTA risks delivering it to an unprimed audience
- **Fix**: Lengthen the Reinforcement beat by 1-2 seconds, or add a 1.0s pre-CTA freeze; resequence if the climax is too late in the runtime
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
- **Tests**: Scene 1's `action` block + `visual` block — verify that within the first 0.5 seconds of runtime: motion is present (MT/V5), a face is detectable (FFA — actor face OR B-roll face OR even an emoji/iconic face), and primary on-screen text has appeared (VWFA)
- **Passes**: All three are observable within 0.5s of scene 1 start
- **Fails**: Any of the three is missing or delayed beyond 0.5s
- **Neural rationale**: FFA fires at 170ms, MT at 100ms, VWFA at 200ms; for the tri-modal convergence boost to fire at the TPO junction by 1.0s, all three must be present and parseable by 0.5s minimum
- **Fix**: If face is missing in 0.5s, add a B-roll insert with a face (researcher, model, archival); if motion is missing, add micro-handheld or animated text entry; if text is missing, advance the hero text's `animation_in.start` time
- **Report**: Per-element presence-by-0.5s check for scene 1

---

### 4.3 PBL Operational Checks (PBL01–PBL05)

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
- **Tests**: Compare the standalone informativeness of scene 1 visual + on-screen text vs scene 1 VO + caption. The visual side should equal or exceed the verbal side. This is operationally the same test as GR04 (muted parse) but emphasizes weight, not just parseability.
- **Passes**: Visual + on-screen text alone tell a more complete or equally complete story than VO + caption alone
- **Fails**: VO carries more information than visual; visual is decorative supporting role
- **Neural rationale**: Per PBL — modern social viewers are visual-first; pre-FFA processing (V1–V4) is faster than auditory parsing (A1 → STS → language network)
- **Fix**: Upgrade scene 1 visual to carry more semantic load; could mean better hero text, better B-roll selection, better graphic, or all three
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
- **Report**: List terms flagged as gating; verify GR05 compatibility (both rules check this, slightly different angle)

---

#### PBL05 — 4-Component Script Anatomy Present
- **Severity**: Minor
- **Source**: PBL playbook — script anatomy: Notes + Bulleted script + Caption + Subtitles
- **Tests**: Every scene contains: (a) `filming_notes` (Notes), (b) `vo.line` or `action` (bulleted script equivalent), (c) `visual.on_screen_text.caption` (Caption), (d) implicit subtitle support via word-by-word caption animation
- **Passes**: All four components present per scene
- **Fails**: Any scene missing one of the four components
- **Neural rationale**: N/A (operational)
- **Fix**: Add missing components per scene
- **Report**: Per-scene component matrix

---

### 4.4 Studio Realism Checks (ST01–ST04)

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
- **Tests**: For every scene's `visual.broll_required` entries, the `source` value (royalty_free_stock / custom_shoot / screen_recording / archival_research / custom_animation) is present in `production_context.studio_assets.broll_sources_available`
- **Passes**: Every B-roll source used is available
- **Fails**: Any B-roll source called for is not available
- **Fix**: Either acquire the source OR substitute with an available source (and re-shoot the affected scene's plan)
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

### 4.5 Multi-Language Compliance Checks (ML01–ML02)

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

### 4.6 Reference Video Match Check (RV01)

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

Compute the verdict deterministically from check results.

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

---

## 6. NEURAL PREDICTION SCORE (NPS)

A composite 0-100 score predicting the screenplay's neural-engagement quality independent of the verdict.

### 6.1 Component Weights

| Component | Weight | Source |
|---|---|---|
| Neural target coverage (NS01) | 25 | Coverage % from coverage matrix |
| Multimodal convergence density (NS02) | 15 | Convergence density × 100 |
| Demonstration-first compliance (GR01, GR02, GR06) | 15 | Pass rate across these checks |
| Hook strength (GR04, GR11, NS06, NS08, PBL01–PBL04) | 20 | Pass rate across these checks |
| Research integrity (GR12) | 10 | Pass = 100, Fail = 0 |
| Dialogue engineering (GR09, GR10, NS04, NS05, NS07) | 10 | Pass rate across these checks |
| Operational health (GR07, GR08, GR14, GR15, GR16) | 5 | Pass rate across these checks |

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

## 7. OUTPUT FORMAT

Return ONLY a JSON object:

```json
{
  "metadata": {
    "validator_version": "1.0",
    "validated_at": "ISO-8601 timestamp",
    "phase3_screenplay_title": "...",
    "phase2_structure_used": "Structure # — Name",
    "format_skin": "ABR",
    "threshold_mode": "default | strict | permissive"
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
  "summary_counts": {
    "total_checks_run": 36,
    "checks_passed": 34,
    "checks_failed": 2,
    "checks_skipped_na": 0,
    "critical_failures": 0,
    "critical_overridden": 0,
    "major_failures": 1,
    "major_overridden": 0,
    "minor_failures": 1,
    "info_notes": 3,
    "pass_rate_percent": 94.4
  },
  "check_results": [
    {
      "id": "GR01",
      "name": "Demonstration-First Dialogue",
      "category": "Golden Rule",
      "severity": "Major",
      "result": "PASS",
      "evidence": "All 6 scenes' demonstration_first_test fields documented; 4 PASS, 2 FAIL→ACCEPTED with valid exceptions (CTA, Reinforcement)",
      "overridden": false
    },
    {
      "id": "NS02",
      "name": "Multimodal Convergence Density",
      "category": "Neuroscience",
      "severity": "Major",
      "result": "FAIL",
      "evidence": "Convergence density = 0.42 (3 of 6 scenes); below threshold 0.5. Scenes 2 and 4 are bimodal only (missing on-screen text element); Scene 5 is bimodal only (no third channel firing in same 1.5s window)",
      "scenes_affected": [2, 4, 5],
      "suggested_fix": "Add primary on-screen text element to scenes 2 and 4; tighten scene 5 text onset to fall within the convergence window with VO and visual",
      "overridden": false
    }
    /* ... one entry per check ... */
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
    /* ... per scene ... */
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
    },
    {
      "rank": 2,
      "check_id": "GR09",
      "severity": "Minor",
      "scenes_affected": [3, 5],
      "action": "Add bridge words at start of scene 3 and scene 5 dialogue",
      "estimated_effort": "Trivial — VO re-record optional",
      "verdict_impact_if_fixed": "None on verdict; minor NPS lift"
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

## 8. EXAMPLE VALIDATION RUN

Input: The Phase-3 v2 example screenplay (TRIBE v2 Myth Bust, ABR-dominant, 35s, 6 scenes).

Sample output (abbreviated):

```json
{
  "metadata": {
    "validator_version": "1.0",
    "validated_at": "2026-06-05T14:32:00Z",
    "phase3_screenplay_title": "AI predicts your brain better than your scan does",
    "phase2_structure_used": "6 — Myth Bust",
    "format_skin": "ABR",
    "threshold_mode": "default"
  },
  "verdict": {
    "decision": "SHIP",
    "reason_summary": "0 critical failures, 0 major failures, 2 minor failures. Within all default thresholds. NPS = 91 (top-tier).",
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
    "total_checks_run": 35,
    "checks_passed": 33,
    "checks_failed": 2,
    "checks_skipped_na": 1,
    "critical_failures": 0,
    "major_failures": 0,
    "minor_failures": 2,
    "info_notes": 3,
    "pass_rate_percent": 94.3
  },
  "check_results": [
    { "id": "GR01", "name": "Demonstration-First Dialogue", "severity": "Major", "result": "PASS", "evidence": "All 6 scenes' demonstration_first_test populated; 3 PASS, 1 PARTIAL (scene 1), 2 FAIL→ACCEPTED (scenes 5 and 6, Reinforcement and CTA exceptions)", "overridden": false },
    { "id": "GR02", "name": "Action-to-Dialogue Ratio ≥ 2.0", "severity": "Major", "result": "PASS", "evidence": "Top-level ratio = 2.6; lowest per-scene = 1.3 (scene 5)", "overridden": false },
    { "id": "GR03", "name": "Silent-Runtime Quota by Format", "severity": "Major", "result": "PASS", "evidence": "Silent runtime = 55.7% vs ABR threshold 50%", "overridden": false },
    { "id": "GR04", "name": "Hook Parseable Muted", "severity": "Critical", "result": "PASS", "evidence": "Scene 1 muted_parse_test = PASS; archival fMRI footage + MYTH text + WRONG graphic carry hook standalone", "overridden": false },
    { "id": "GR05", "name": "Broad → Narrow → Niche", "severity": "Major", "result": "PASS", "evidence": "Scene 1 uses universal vocabulary; body scenes 3-4 use technical terms paired with on-screen decoders (R=0.40, 720 brains); CTA targets researchers via 'github.com/facebookresearch/tribev2' URL", "overridden": false },
    { "id": "GR06", "name": "Show, Don't Tell", "severity": "Major", "result": "PASS", "evidence": "Every numeric claim (R=0.40, 1000 hrs, 720 brains, 1B parameters) appears on-screen at moment of audible mention", "overridden": false },
    { "id": "GR07", "name": "No Talking Head > 2s", "severity": "Major", "result": "PASS", "evidence": "Talking-head only in scenes 5-6 (Hybrid skin); shot 5 duration = 6.0s but contains text reveal at 1.5s and lower-third change at 3.0s satisfying visual change requirement", "overridden": false },
    { "id": "GR08", "name": "Silent Moments Mandatory", "severity": "Minor", "result": "PASS", "evidence": "Multiple silent moments: scene 4 has 3.5s silent runtime; scene 6 has 1.0s freeze", "overridden": false },
    { "id": "GR09", "name": "Bridge Words", "severity": "Minor", "result": "FAIL", "evidence": "Bridge words present in 3 of 5 transitions (60%, below 70% threshold). Scenes 3 and 5 begin without bridge phrases.", "scenes_affected": [3, 5], "suggested_fix": "Add 'But...' to scene 3 VO opening; add 'So...' to scene 5 VO opening", "overridden": false },
    { "id": "GR10", "name": "Action-Integrated Dialogue", "severity": "Minor", "result": "PASS", "evidence": "All scenes have populated action descriptions", "overridden": false },
    { "id": "GR11", "name": "Tri-Modal Convergence 0–1.5s", "severity": "Critical", "result": "PASS", "evidence": "Scene 1: visual_fired_at_s=0.0, audio_fired_at_s=0.0, text_fired_at_s=0.2; convergence_window_met=true", "overridden": false },
    { "id": "GR12", "name": "Research Fidelity Carry-Over", "severity": "Critical", "result": "PASS", "evidence": "R=0.40, 720 subjects, 1,000 hrs fMRI all match Phase-2; Meta FAIR visible in scene 4 lower-right; figure ref Fig 3A/3B documented; code link in scene 6 URL bar", "overridden": false },
    { "id": "GR13", "name": "Studio-Realistic Scope", "severity": "Major", "result": "PASS", "evidence": "All B-roll sources available; props_missing_from_studio empty; broll_missing entry (custom animation) flagged in production_warnings with substitute path", "overridden": false },
    { "id": "GR14", "name": "Caption Coverage = 100%", "severity": "Critical", "result": "PASS", "evidence": "Every spoken word appears verbatim in scene caption block; word-by-word animation specified", "overridden": false },
    { "id": "GR15", "name": "One Peak Per Video", "severity": "Major", "result": "PASS", "evidence": "Single peak at scene 3 (R=0.40 burn-in, energy 8); other scenes graduated from 5-7 energy; CTA at energy 6", "overridden": false },
    { "id": "GR16", "name": "Hook Priority", "severity": "Minor", "result": "PASS", "evidence": "Scene 1 has highest production-notes density; no patch-with-edit notes anywhere", "overridden": false },
    { "id": "GR17", "name": "5× Outlier Match", "severity": "Minor", "result": "N/A", "evidence": "No reference video supplied", "overridden": false },
    { "id": "GR18", "name": "Mobile-First Safe Zones", "severity": "Major", "result": "PASS", "evidence": "All hero text positioned in middle 65%; captions in bottom 22% (within bottom 25% allowed band); no face crop violations", "overridden": false },
    { "id": "NS01", "name": "Brain Region Coverage", "severity": "Major", "result": "PASS", "evidence": "10 of 11 Phase-2 promised targets fired in at least one scene; PPA missing (no establishing environment shot — acceptable for ABR Myth Bust)", "overridden": false },
    { "id": "NS02", "name": "Multimodal Convergence Density", "severity": "Major", "result": "PASS", "evidence": "Convergence in 5 of 6 scenes (83%); scene 4 marked MEDIUM (text onset at 4.0s, just outside the 1.5s window but acceptable for body scene)", "overridden": false },
    { "id": "NS03", "name": "Hemodynamic Delay Alignment", "severity": "Minor", "result": "PASS", "evidence": "Climax beat at scene 3 (15s mark); CTA at scene 6 (31s mark); gap = 16s, well above 3s threshold", "overridden": false },
    { "id": "NS04", "name": "DMN Activation Density", "severity": "Minor", "result": "FAIL", "evidence": "Second-person density = 1.5 per 10 words (below 2.0 threshold). 'You' appears 4× across 62 spoken words; recommendation requires ≥ 12 occurrences", "suggested_fix": "Rewrite scenes 4 and 5 to add 'your' / 'you' references — 'your brain', 'you don't need', etc.", "overridden": false },
    { "id": "NS05", "name": "VWFA Stimulation Density", "severity": "Minor", "result": "PASS", "evidence": "All 6 scenes have on-screen text; 5 of 6 (83%) have primary hero text beyond caption", "overridden": false },
    { "id": "NS06", "name": "Auditory Cortex Onset", "severity": "Critical", "result": "PASS", "evidence": "Scene 1 first_word_onset_s = 0.0", "overridden": false },
    { "id": "NS07", "name": "Variable-Pace Prosody", "severity": "Minor", "result": "PASS", "evidence": "Scenes 1, 2, 3, 4 use variable pace; scenes 5, 6 use slow (acceptable for Reinforcement/CTA)", "overridden": false },
    { "id": "NS08", "name": "Hook Visual Hierarchy", "severity": "Critical", "result": "PASS", "evidence": "Scene 1 within 0.5s: motion (archival fMRI scanner movement), face (B-roll patient), text (MYTH hero text by 0.3s) all present", "overridden": false },
    { "id": "PBL01", "name": "SEE / READ / HEAR Triple-Hook", "severity": "Critical", "result": "PASS", "evidence": "Scene 1 SEE = fMRI scanner B-roll; READ = MYTH hero text; HEAR = VO 'Myth: you need...' at t=0.0", "overridden": false },
    { "id": "PBL02", "name": "Visual Hook ≥ Verbal Hook", "severity": "Major", "result": "PASS", "evidence": "Scene 1 visual (scanner + MYTH + WRONG) carries hook standalone; VO is amplifier not carrier", "overridden": false },
    { "id": "PBL03", "name": "Muted-Parse Test", "severity": "Critical", "result": "PASS", "evidence": "Cross-ref with GR04 — consistent PASS", "overridden": false },
    { "id": "PBL04", "name": "Broad-Hook Test", "severity": "Major", "result": "PASS", "evidence": "Hook uses 'brain scan' (universal) — no jargon", "overridden": false },
    { "id": "PBL05", "name": "4-Component Script Anatomy", "severity": "Minor", "result": "PASS", "evidence": "All scenes contain filming_notes, vo/action, caption, subtitle support", "overridden": false },
    { "id": "ST01", "name": "Actor Count vs Format", "severity": "Major", "result": "PASS", "evidence": "0 actors declared; ABR format permits 0; on-camera scenes 5-6 use Hybrid skin requiring 1 actor — production_summary lists 0 actors but scene-level requires reconciliation. Re-check: scene 5/6 specify A1 host — actors_required array should be updated to include A1.", "overridden": false },
    { "id": "ST02", "name": "Lighting Setups ≤ Available", "severity": "Major", "result": "PASS", "evidence": "1 setup required (3-Point Bright for scenes 5-6); 3 fixtures available", "overridden": false },
    { "id": "ST03", "name": "B-roll Source Availability", "severity": "Major", "result": "PASS", "evidence": "All sources (royalty_free_stock, screen_recording, custom_animation) in studio_assets.broll_sources_available", "overridden": false },
    { "id": "ST04", "name": "Custom Animation Lead Time", "severity": "Minor", "result": "PASS", "evidence": "Scenes 3 and 4 custom animations flagged in production_warnings with 48hr designer brief note", "overridden": false },
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
      "check_id": "NS04",
      "severity": "Minor",
      "scenes_affected": [4, 5],
      "action": "Rewrite scene 4 and 5 dialogue to add 'your' / 'you' references; target 8 more second-person occurrences across the script",
      "estimated_effort": "Low — 10 min script edit; if VO already recorded, re-record affected lines only",
      "verdict_impact_if_fixed": "NPS rises from 91 to estimated 93"
    },
    {
      "rank": 2,
      "check_id": "GR09",
      "severity": "Minor",
      "scenes_affected": [3, 5],
      "action": "Add bridge phrase to scenes 3 and 5 VO opening ('But here's the thing...' / 'So...')",
      "estimated_effort": "Trivial — script edit only",
      "verdict_impact_if_fixed": "None on verdict; minor NPS lift"
    }
  ],
  "info_notes": [
    "Scene 1 archival fMRI footage flagged for royalty clearance — confirm cleared before shoot",
    "Scenes 3 and 4 custom animations require designer brief 48hrs pre-edit",
    "ST01 surface inconsistency: metadata.actor_count=0 but scenes 5-6 specify A1 host; recommend reconciling production_summary.actors_required to match scene-level reality"
  ],
  "escalations_detected": [],
  "overrides_applied": []
}
```

This example earns SHIP with NPS 91 because all Critical checks pass, no Major checks fail, and only 2 Minor fixes are recommended.

---

## 9. BRAIN REGION COVERAGE MATRIX

A standard reference for what each Phase-2 structure typically activates. The validator uses this as the expected baseline; deviations are flagged in NS01.

| Structure | Expected Active Regions (high-prior) |
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

## 10. SEVERITY ESCALATION RULES (formal)

Already summarized in §3. Formal rules:

1. **Minor cluster escalation**: If a single scene contains 3+ Minor failures, the cluster is logged as an additional Major failure with check ID `MINOR_CLUSTER_ESCALATION_S<scene_number>`.
2. **Major cluster escalation**: If a single scene contains 3+ Major failures, the cluster is logged as an additional Critical failure with check ID `MAJOR_CLUSTER_ESCALATION_S<scene_number>`.
3. **Global minor escalation**: If the whole video has 5+ Minor failures (across all scenes), one Major failure is logged as `GLOBAL_MINOR_DENSITY_ESCALATION`.

Escalations are reported in `escalations_detected` and count toward verdict computation. They do not double-count the underlying failures.

---

## 11. MANUAL OVERRIDE PROTOCOL

The human producer or director can override a failed check via `validation_context.override_flags[]`. Each override requires:

- `check_id` — the failing check
- `override_reason` — written justification (mandatory; non-empty)
- `approved_by` — name/role of authorizing party (mandatory)

Override behavior:
- The original FAIL record is preserved in `check_results[]` with `overridden: true`
- The check is excluded from verdict computation
- The override is reported in `overrides_applied[]`
- The NPS is computed WITH the original failure counted — overrides shift verdict only, not NPS

**Critical-severity overrides require additional justification**: an explanation of why the underlying neural/operational risk is acceptable. Without this, the override is rejected and the check counts as it normally would.

---

## 12. APPENDIX A — QUICK-GLANCE SCORECARD FORMAT

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
║   Checks Run: 35  |  Passed: 33  |  Failed: 2  |  N/A: 1     ║
║   Critical: 0 fail  |  Major: 0 fail  |  Minor: 2 fail       ║
║                                                              ║
║   Brain Region Coverage: 10 of 11 promised regions fired     ║
║      (PPA missing — acceptable for ABR Myth Bust)            ║
║                                                              ║
║   Top Revisions:                                             ║
║      1. NS04 — Add more 'you' references to scenes 4 & 5    ║
║      2. GR09 — Bridge words for scenes 3 & 5                ║
║                                                              ║
║   Ready to shoot: YES                                        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

This is rendered from `verdict` + `neural_prediction_score` + `summary_counts` + `ordered_revision_queue[0..2]`.

---

## 13. APPENDIX B — COMMON FAILURE PATTERNS & STANDARD FIXES

A working knowledge base of failure patterns the validator has encountered, with documented remediation paths. Use this as a quick-reference for content creators handling REVISE verdicts.

### Pattern B1 — "VO carries all the meaning; visuals decorate"
- Symptoms: GR04 fails, PBL02 fails, NS02 has low convergence
- Root cause: Talking-head mindset bleeding into ABR scenes
- Standard fix: Strip every spoken line down to keyword density; promote the surrounding context into visual on-screen text and B-roll

### Pattern B2 — "Hook is technical from the first word"
- Symptoms: GR05 fails, PBL04 fails
- Root cause: Researcher-direct delivery of subject-matter
- Standard fix: Replace technical first sentence with universal-vocabulary version; move the technical claim to scene 2-3 paired with on-screen decoder

### Pattern B3 — "Caption coverage incomplete"
- Symptoms: GR14 fails Critical
- Root cause: Designer treats captions as decorative
- Standard fix: Make captions verbatim word-by-word transcription of all VO; production rule: caption text is regenerated from VO line, never edited independently

### Pattern B4 — "Numbers spoken but not shown"
- Symptoms: GR06 fails, GR12 fails (if Phase-2 number)
- Root cause: Director skipped the dual-coding step
- Standard fix: For every numeric VO mention, add on-screen text element with the exact number at the same moment; use count-up animation for added VWFA salience

### Pattern B5 — "Multiple peaks dilute the climax"
- Symptoms: GR15 fails
- Root cause: Every scene treated as high-energy
- Standard fix: Identify the one structural payoff beat; reduce energy in all other scenes to 5-7; reserve energy 10 / speed-ramp for the single payoff

### Pattern B6 — "Scene 1 has dead air at start"
- Symptoms: NS06 fails Critical
- Root cause: VO recorded with natural breath-in before first word
- Standard fix: Trim VO recording to start exactly at first phoneme; if needed, re-record with cue tone

### Pattern B7 — "Brain region promised but not delivered"
- Symptoms: NS01 fails
- Root cause: Phase-2 declared neural targets that Phase-3 didn't translate into specific scene elements
- Standard fix: For each missing target, consult §13 of Phase-3 (Neural → Camera mapping) and add the corresponding element to at least one scene

### Pattern B8 — "Custom animation requested without designer lead time"
- Symptoms: ST04 fails Minor
- Root cause: Screenplay generator didn't flag asset dependencies
- Standard fix: Add `production_warnings` entries with 48hr lead time for each custom animation; or substitute with screen-capture of existing paper figures

### Pattern B9 — "Reinforcement and CTA both lean talking-head"
- Symptoms: GR03 may fail (silent quota), no fundamental neural fail
- Root cause: Format skin assignment defaulted both end scenes to Hybrid
- Standard fix: Convert Reinforcement to ABR with VO over screen capture or animated graphic; keep CTA as talking-head for parasocial closure

### Pattern B10 — "Reference video supplied but match block absent"
- Symptoms: GR17 fails, RV01 fails
- Root cause: Phase-3 ignored the `reference_video` input
- Standard fix: Re-run Phase-3 with reference matching enabled; validator re-checks

---

**End of Phase-3.5 Skill Spec.**

If `phase3_screenplay` is missing or empty, do not proceed. Respond with:
> *"Phase-3 screenplay JSON is required. Please run the Scalerock Screenplay Generator first and return its output as `phase3_screenplay`."*
