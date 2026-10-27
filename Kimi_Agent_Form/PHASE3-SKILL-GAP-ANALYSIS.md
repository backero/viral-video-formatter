# PHASE 3 SKILL GAP ANALYSIS
## Uploaded: skill-screenplay-final.md vs. Current Form & Other Skills

---

## EXECUTIVE SUMMARY

The uploaded `skill-screenplay-final.md` is a **1000-line production-grade screenplay engine** that is **massively more comprehensive** than the current state of the form and the other two skill files. The gaps are not minor — they are architectural. Here is the full breakdown:

| Component | Current State | What skill-screenplay-final.md Requires | Severity |
|---|---|---|---|
| **Phase 3 Form Page** | Empty stub placeholder | Full scene-by-scene screenplay viewer with 15 structure blueprints, 18 golden rules, format skin selector, production context input, interrupt timeline | CRITICAL |
| **skill-validation-checker.md (Phase 4)** | 10 basic checks (hook, value, dialogue, 10yo test, camera, actor, cuts, CTA, captions, visual changes) | 18 Golden Rule checks + 3-2-1 Interrupt validation + staccato validation + format skin compatibility + neuroscience convergence checks | MAJOR |
| **skill-output-formatter.md (Phase 5)** | 4 exports (Actor Brief, Camera Sheet, Edit Timeline, Clean Script) + AI Prompt Pack | Must include: format skin, silent runtime %, action-to-dialogue ratio, pattern interrupt schedule, neural targets, staccato beats, on-screen text blocks, music/SFX cues, lighting setups, blocking notes, multi-language versions | MAJOR |

---

## PART 1: FORM PHASE 3 PAGE — CURRENT vs. REQUIRED

### Current State (Line 1-18 of Phase3.tsx)
```tsx
// JUST A STUB — 18 lines total
<Layout>
  <div className="flex flex-col items-center justify-center py-20">
    <h1 className="text-3xl font-bold">Phase 3: Execution</h1>
    <p>Hollywood-style scene-by-scene screenplay with timeline.</p>
    <p>This page will be implemented by the Phase 3 agent.</p>
  </div>
</Layout>
```

### What skill-screenplay-final.md Requires the Form to Display:

#### A. 18 GOLDEN RULES (must be visible as enforced constraints)
| # | Rule | Current Form? |
|---|---|---|
| 1 | Demonstration-First Dialogue | NO |
| 2 | Action-to-Dialogue Ratio >= 2.0 | NO |
| 3 | Silent-Runtime Quota by Format (ABR >=50%, Whiteboard >=30%, etc.) | NO |
| 4 | Hook Parseable Muted (visual+caption alone carry message) | NO |
| 5 | Broad -> Narrow -> Niche architecture | NO |
| 6 | Show Don't Tell (LOC/EBA/VWFA co-firing) | NO |
| 7 | No Talking Head >2s Without Visual Change | NO |
| 8 | Silent Moments Mandatory (FFA/LOC isolation) | NO |
| 9 | Bridge Words Between Sentences | NO |
| 10 | Action-Integrated Dialogue (EBA+STS) | NO |
| 11 | Tri-Modal Convergence in 0-1.5s (TPO Junction) | NO |
| 12 | Research Fidelity Carry-Over | NO |
| 13 | Studio-Realistic Scope | NO |
| 14 | Caption Coverage = 100% | NO |
| 15 | One Peak Per Video | NO |
| 16 | Hook->Script->Format->Editing Priority | NO |
| 17 | 5x Outlier Match (reference video) | NO |
| 18 | Staccato Sentences (1-8 word beats, hard stops) | NO |

#### B. PRODUCTION CONTEXT INPUT FIELDS (required before screenplay generation)
The skill defines this JSON input that the form must collect:
```json
{
  "production_context": {
    "platform": "Instagram Reels | YouTube Shorts | TikTok | X",
    "aspect_ratio": "9:16 | 1:1 | 16:9",
    "estimated_length_s": 30,
    "actor_count": 1,
    "actor_profiles": [...],
    "studio_assets": {
      "lights_available": 3,
      "cameras_available": 1,
      "props_available": [...],
      "background_options": [...],
      "broll_sources_available": [...]
    },
    "content_complexity": "research_heavy | mid | lifestyle",
    "language_primary": "EN | HI | TA | HIN-EN | TAM-EN",
    "language_secondary": null,
    "reference_video": { "url": ..., "match_target": ..., "notes": ... },
    "format_override": "auto | ABR | talking_head | whiteboard | two_person | hybrid"
  }
}
```
**Current form collects NONE of these.**

#### C. FORMAT SKIN SELECTOR (5 options with auto-selection)
| Skin | Current Form? |
|---|---|
| ABR (Audio-B-Roll) — DEFAULT | NO |
| Talking-Head + Overlay | NO |
| Whiteboard / Visual Prop Explainer | NO |
| Two-Person Dialogue (Clone/Debate) | NO |
| Hybrid (Reaction Inserts in ABR) | NO |
| Auto-Selection Logic (content_complexity + actor_count + structure) | NO |

#### D. 15 STRUCTURE BLUEPRINT VIEWER
The skill contains **complete scene-by-scene production templates** for all 15 structures. Each template includes per-scene:
- Scene timing (e.g., "0.0-3.0s")
- Format skin (ABR, Whiteboard, Hybrid, etc.)
- Camera spec (A-cam MCU, B-cam ECU, lens, movement)
- Lighting setup (Setup A/B/C, color temp, key/fill/rim)
- Blocking (Actor position, gesture, prop interaction)
- Staccato dialogue beats
- Visual text overlays
- Audio direction (tone, music BPM, SFX)
- Pattern interrupt schedule

**Current form displays NONE of this.**

#### E. INTERRUPT TIMELINE VISUALIZATION
The 3-2-1 Interrupt Method requires display of:
- 3 scroll triggers identified
- 2 interrupt techniques selected
- 1 clear message focus
- Scheduled interrupts at: 0:00-0:01, 0:10-0:14, 0:22-0:26, 0:33-0:38

**Current form: NO interrupt system.**

---

## PART 2: skill-validation-checker.md (Phase 4) — GAPS

### Current 10 Checks vs. 18 Golden Rules

| Golden Rule from Skill | Covered in Current Validation? | Gap Severity |
|---|---|---|
| Rule 1: Demonstration-First Dialogue | NO — Check 6 (actor directions) is closest but doesn't validate "show don't tell" | HIGH |
| Rule 2: Action-to-Dialogue Ratio >= 2.0 | NO — No word ratio check exists | HIGH |
| Rule 3: Silent-Runtime Quota by Format | NO — No silent runtime validation | HIGH |
| Rule 4: Hook Parseable Muted | PARTIAL — Check 1 (hook) exists but doesn't test "muted comprehension" | MEDIUM |
| Rule 5: Broad->Narrow->Niche | NO — No architecture validation | HIGH |
| Rule 6: Show Don't Tell (LOC/EBA/VWFA) | NO — Check 9 (captions) is different | HIGH |
| Rule 7: No Talking Head >2s | NO — Check 10 (visual changes every 2s) is closest but different | MEDIUM |
| Rule 8: Silent Moments Mandatory | NO — No silent moment validation | HIGH |
| Rule 9: Bridge Words Between Sentences | NO — Check 3 (dialogue human) doesn't test bridging | MEDIUM |
| Rule 10: Action-Integrated Dialogue | NO — No parenthetical action validation | HIGH |
| Rule 11: Tri-Modal Convergence 0-1.5s | NO — No modality convergence check | HIGH |
| Rule 12: Research Fidelity | NO — No numeric fidelity validation | HIGH |
| Rule 13: Studio-Realistic Scope | NO — No studio feasibility check | MEDIUM |
| Rule 14: Caption Coverage = 100% | PARTIAL — Check 9 (captions) exists but doesn't enforce 100% | MEDIUM |
| Rule 15: One Peak Per Video | NO — No peak validation | MEDIUM |
| Rule 16: Hook->Script->Format->Edit Priority | NO — No priority validation | MEDIUM |
| Rule 17: 5x Outlier Match | NO — No reference video match check | MEDIUM |
| Staccato sentence validation | NO — No staccato check | HIGH |
| 3-2-1 Interrupt Method validation | NO — No interrupt validation | HIGH |
| Format skin compatibility | NO — No format-skin-to-structure match check | HIGH |

### Validation Checker Needs:
1. **Expand from 10 to ~25 checks** covering all Golden Rules
2. **Add per-format silent runtime validation** (ABR >=50%, Whiteboard >=30%, etc.)
3. **Add action-to-dialogue ratio check** (>= 2.0)
4. **Add tri-modal convergence check** (visual+audio+text in first 1.5s)
5. **Add staccato validation** (all dialogue <= 8 words per beat)
6. **Add pattern interrupt validation** (2-4 interrupts per video at correct timestamps)
7. **Add format skin compatibility check** (skin matches structure + content complexity)
8. **Add research fidelity check** (numeric claims match Phase 2 output)
9. **Add studio-realistic scope check** (equipment <= studio_assets available)
10. **Add bridge words validation** (sentences connect with transition words)

---

## PART 3: skill-output-formatter.md (Phase 5) — GAPS

### Current 4 Exports vs. What the Skill Requires

| New Field Required by Skill | Current Output Coverage | Gap |
|---|---|---|
| Format skin (ABR/Talking-Head/Whiteboard/etc.) | NOT in metadata | Must add |
| Silent runtime % per scene | NOT included | Must add |
| Action-to-dialogue ratio per scene | NOT included | Must add |
| Pattern interrupt schedule | NOT included | Must add |
| Neural targets fired per scene (V1-V4, MT/V5, FFA, EBA, etc.) | NOT included | Must add |
| Staccato word count per dialogue beat | NOT included | Must add |
| On-screen text/caption blocks with timing | NOT included | Must add |
| Music/SFX cues per scene (BPM, genre, entry point) | NOT included | Must add |
| Lighting setup per scene (Setup A/B/C, color temp, key/fill/rim) | NOT included | Must add |
| Blocking notes per scene (actor position, gesture, prop) | NOT included | Must add |
| Camera spec per scene (A-cam/B-cam, lens, movement) | Partial (Camera Sheet has basic shot/angle) | Expand |
| Multi-language dialogue versions (EN, HI, TA, HIN-EN, TAM-EN) | NOT included | Must add |
| Content complexity classification | NOT included | Must add |
| Language primary/secondary | NOT included | Must add |
| Actor profiles with language competence | NOT included | Must add |
| Studio assets summary | NOT included | Must add |
| Production warnings (equipment over studio scope) | NOT included | Must add |
| Reference video match notes | NOT included | Must add |

### AI Agent Prompt Pack Updates:
The 5 current prompt templates are generic. The skill file requires them to reference:
- Format skin conventions (ABR shot rhythm, silent runtime quotas)
- Staccato dialogue patterns
- Pattern interrupt placement
- Neural target firing per scene
- Multi-language considerations

---

## PART 4: MY RECOMMENDATION

### Priority 1: CRITICAL — Build Phase 3 Form Page
The Phase 3 page is currently an empty stub. It needs to be completely built with:

1. **Production Context Input Card** — Collect: platform, aspect ratio, actor count, studio assets, content complexity, language, reference video, format override
2. **Format Skin Selector** — 5 skins with auto-selection logic + manual override
3. **Structure Blueprint Viewer** — Display the selected structure's complete scene-by-scene template from the 15 blueprints
4. **Golden Rules Sidebar** — Collapsible panel showing all 18 rules with status indicators
5. **Scene-by-Scene Screenplay Editor** — Edit each scene's dialogue, camera, lighting, blocking, visual text, audio
6. **Interrupt Timeline** — Visual timeline showing planned pattern interrupts
7. **Live Metrics Panel** — Action-to-dialogue ratio, silent runtime %, staccato word count, caption coverage

### Priority 2: MAJOR — Update skill-validation-checker.md
- Expand from 10 to ~25 checks
- Add all 18 Golden Rules as validation criteria
- Add format-specific checks (silent runtime quotas)
- Add staccato and interrupt validation
- Keep the existing 10 checks as a subset (they're still valid)

### Priority 3: MAJOR — Update skill-output-formatter.md
- Add format skin to metadata
- Add per-scene: silent runtime, action-to-dialogue ratio, neural targets, staccato counts, on-screen text blocks, music/SFX cues, lighting, blocking, camera spec
- Add multi-language dialogue versions
- Add production warnings
- Update AI Agent Prompt Pack templates to reference format skin conventions

### Should I Proceed?
This is a **significant build effort**. Advise if you want me to:
- **(A)** Build the complete Phase 3 form page first
- **(B)** Update the two skill files first
- **(C)** Do all three in parallel
- **(D)** Start with a specific subset
