# FORM SPECIFICATION CORRECTIONS V3
## Addressing User Concerns — Field-by-Field Fixes

---

## CONCERN 1: 1.6.3 — "Entertaining Education" Check — TIMING IS WRONG

**Your Point:** How can we confirm "Entertaining Education" BEFORE the screenplay is written?

**The Problem:** My spec put this in Phase 1 (Input), but you can't judge if content is "entertaining" just from a topic sentence. Entertainment comes from HOW it's executed — the visuals, the delivery, the pacing. That's only visible in Phase 3 (Execution).

**The Fix:**

| Old Location | New Location | Change |
|---|---|---|
| Phase 1, Field 1.6.3 | **Phase 4, Check #11** | Move to Validation. Only judgeable after screenplay is complete. |

### New Field 4.1.11: Entertainment Check
| Property | Value |
|---|---|
| **Label** | "10-Year-Old + Entertainment Test" |
| **Type** | Two-part check (both must pass) |
| **Check A** | "Could a 10-year-old understand the main point without asking questions?" |
| **Check B** | "Is there at least ONE moment where the viewer would smile, gasp, or react emotionally? (Not just nod and scroll past)" |
| **If Check B FAILS** | Form shows warning: "This reads like a lecture. Add ONE of: a surprising reveal, a visual reaction, a relatable frustration, or a satisfying before/after." |
| **Location** | Phase 4 (Validation), AFTER screenplay is complete |

### What Replaces 1.6.3 in Phase 1?
Replace with a simpler, judgeable question:

### New Field 1.6.3 (Revised): Content Style Selector
| Property | Value |
|---|---|
| **Label** | "How will this information be delivered?" |
| **Type** | Dropdown |
| **Required** | Yes |
| **Options** | Demonstration (showing how) / Reaction (responding to something) / Story (telling experience) / Comparison (A vs B) / Reveal (showing results) / Challenge (proving/testing) |
| **Purpose** | Forces the writer to think about DELIVERY METHOD, not just information. This informs the Phase 3 screenplay structure. |
| **Example** | "Demonstration" = showing how to store serum. "Reaction" = reacting to shocking fact. "Comparison" = A vs B test. |

---

## CONCERN 2: 1.6.4 — Fluff Check — Writers Can't Identify Fluff

**Your Point:** Content writers can't predict or analyze if something is fluff. They need EXAMPLES.

**The Problem:** I wrote "I have removed all filler words and generic advice" as a checkbox. A checkbox implies the writer knows what fluff is. Most don't.

**The Fix:** Replace checkbox with a **guided fluff detector** — examples + a forced rewrite step.

### New Field 1.6.4 (Revised): Fluff Detector with Examples

**Step 1: Show Examples (Educational)**

The form displays a **side-by-side comparison** table that cannot be skipped:

| FLUFF (Bad) | SPECIFIC (Good) | Why It Matters |
|---|---|---|
| "This serum is amazing" | "This serum reduced my dark spots in 14 days" | Numbers = proof |
| "You should take care of your skin" | "Store your vitamin C in the fridge — it lasts 2x longer" | Action = takeaway |
| "Everyone is talking about this" | "This went viral on TikTok with 2.4M views" | Specific = credible |
| "It's important to moisturize" | "I skipped moisturizer for a week — this is what happened" | Story = engaging |
| "The best products always work" | "Product A worked for 8/10 people I tested it on" | Data = trust |
| "In today's world, skincare is essential" | "I spent $2,000 on products before learning this one hack" | Personal = relatable |
| "You need to follow these tips" | "Step 1: Put it in the fridge. That's it." | Direct = actionable |
| "This revolutionary formula changes everything" | "The pH level is 3.5 — that's why it actually absorbs" | Science = authority |

**Step 2: Guided Self-Check (3 Questions)**

| # | Question | Options |
|---|---|---|
| 1 | "Did I use ANY of these fluff phrases?" | Yes / No (with dropdown of common fluff phrases to check against) |
| 2 | "Can I replace any sentence with a specific number, name, or time frame?" | Yes (forces rewrite) / No (proceed) |
| 3 | "If I read this to a stranger, would they say 'So what?' or 'Oh really?'" | So what (fluff — rewrite) / Oh really (specific — proceed) |

**Step 3: Forced Rewrite (If Fluff Detected)**

If any answer indicates fluff, the form **locks** and shows:

> "Your value statement contains fluff. Rewrite using this formula: [Specific Action] + [Specific Result] + [Specific Time/Number]. Example: 'Store serum in the fridge (action) + it lasts twice as long (result) + I tested this for 30 days (proof).'"

The writer **must** rewrite before proceeding. No checkbox to bypass.

---

## CONCERN 3: 1.8 — Reference Video Multi-Purpose Problem

**Your Point:** A reference video can serve MULTIPLE purposes — replicating content, copying format, copying visuals, copying hooks, copying screenplay. My spec only had one dropdown.

**The Fix:** Replace single dropdown with **multi-select purpose checklist + intensity slider per purpose**.

### New Field 1.8 (Revised): Reference Video Purposes

**Step 1: Paste URL** (same as before — Field 1.8.1)

**Step 2: Multi-Select What We're Taking**

| Purpose | Checkbox | Intensity (if checked) | What to Paste/Describe |
|---|---|---|---|
| **Replicate the CONTENT/TOPIC** | ☐ | Clone / Adapt / Inspiration | "Their topic was ___. Our version is ___." |
| **Copy the FORMAT/STRUCTURE** | ☐ | Exact / Modified / Loosely | "Their structure was: Hook → X → Y → CTA. We will use: ___" |
| **Copy the VISUAL STYLE** | ☐ | Exact / Adapted / Inspired by | "Their visual style: ___ (e.g., bright colors, split-screen, text-heavy)" |
| **Copy the HOOK APPROACH** | ☐ | Exact / Modified / Same energy | "Their hook was: ___ (describe the first 2 seconds)" |
| **Copy the SCREENPLAY/EDITING** | ☐ | Shot-for-shot / Similar pacing / Same rhythm | "Their editing style: ___ (e.g., jump cuts every 1s, slow-mo on reveals)" |
| **Copy the ACTOR ENERGY/TONE** | ☐ | Same energy / Adapted / Different tone | "Their actor's energy: ___ (e.g., whisper-secret, high-energy shout)" |
| **Copy the CTA STYLE** | ☐ | Exact / Modified / Different | "Their CTA: ___ (what they said + how they said it)" |

**Rule:** At least ONE checkbox must be selected. No empty submissions.

**Example filled form:**

| Purpose | Selected? | Intensity | Notes |
|---|---|---|---|
| CONTENT/TOPIC | ❌ No | — | — |
| FORMAT/STRUCTURE | ✅ Yes | Modified | "Their structure: Hook → Problem → 3 Tips → CTA. We will use: Hook → Shocking Fact → Hack → Proof → CTA" |
| VISUAL STYLE | ✅ Yes | Adapted | "Their style: bright neon text on clean background. We'll use warm tones instead of neon." |
| HOOK APPROACH | ✅ Yes | Same energy | "Their hook: direct-to-camera, whispering 'Stop doing this.' We'll use same energy but different words." |
| SCREENPLAY/EDITING | ❌ No | — | — |
| ACTOR ENERGY | ✅ Yes | Adapted | "Their energy: confident but playful. We'll use: confident but authoritative." |
| CTA STYLE | ❌ No | — | — |

**This tells the AI:**
- Don't copy their topic/content — we have our own
- DO use their format structure but modify it
- DO adapt their visual style with our color palette
- DO match their hook energy (whisper-direct-to-camera)
- DON'T copy their editing — we'll do our own
- DO adapt their actor energy (more authority, less playful)
- DON'T copy their CTA — we'll use our own

---

## CONCERN 4: 1.8.1 — 5x Rule is Wrong

**Your Point:** The "5x creator average views" rule for identifying viral videos doesn't work.

**The Problem:** I specified "Paste the link to a video that got 5x+ the creator's average views." You're right — this is arbitrary and often wrong. A video with 10K views from a creator who averages 2K IS viral. But a video with 1M views from MrBeast who averages 50M is NOT viral.

**The Fix:** Replace with a **multi-factor virality assessment** that the WRITER fills out (not a hard rule).

### New Field 1.8.1 (Revised): Why This Video Worked (Writer's Analysis)

Instead of a views-based rule, force the writer to **analyze WHY it worked.**

| # | Question | Type | Purpose |
|---|---|---|---|
| 1 | "What was the FIRST thing you saw in the first 0.5 seconds?" | Text | Forces analysis of visual hook |
| 2 | "What emotion did you feel in the first 3 seconds?" | Dropdown: Shocked / Curious / Angry / Excited / Skeptical / Relieved | Forces emotional analysis |
| 3 | "What ONE thing made you keep watching past 3 seconds?" | Text (1 sentence) | Forces retention analysis |
| 4 | "What did the creator DO (action) that you could copy?" | Text | Forces actionable takeaway, not vague admiration |
| 5 | "Would this video work if you replaced the creator with someone unknown?" | Yes/No | Tests if the STRUCTURE is viral (Yes) or if the CREATOR is viral (No — reject as reference) |

**Auto-Validation:**
- If Question 5 = "No" → Warning: "This video worked because of the creator's fame, not the structure. Pick a video from a smaller creator."
- If Question 4 answer is vague (no action verb) → Reject: "Be specific. What ACTION did they take?"

**This replaces the arbitrary 5x rule with STRUCTURAL analysis.**

---

## CONCERN 5: 3.5.1 — Dialogue Sentences Must Flow Into Each Other

**Your Point:** Each sentence must lead naturally into the next. The dialogue can't be disconnected statements.

**The Problem:** My spec gave dialogue engineering rules per line (emphasis, pauses) but didn't specify NARRATIVE FLOW between lines. ChatGPT writes lines that are grammatically correct but don't build on each other.

**The Fix:** Add a **CONNECTOR CUE** to every line of dialogue in the screenplay.

### New Dialogue Engineering Rule: The Chain Rule

Every line of dialogue in the screenplay gets a **CONNECTOR** field:

```
LINE 1: "I tested 47 skincare products so you don't have to."
├── CONNECTOR → Leads to: [Shocking discovery]
├── Next line bridges with: "And I found something that shocked me."

LINE 2: "And I found that 70% of vitamin C serums go bad before you finish them."
├── CONNECTOR → Leads to: [The solution]
├── Next line bridges with: "But there's a simple fix nobody talks about."

LINE 3: "Store it in the fridge. It lasts twice as long."
├── CONNECTOR → Leads to: [Proof it works]
├── Next line bridges with: "I tried this for 30 days — here's what happened."

LINE 4: "My $60 serum lasted 60 days instead of 30. That's $30 saved."
├── CONNECTOR → Leads to: [CTA]
├── Next line bridges with: — (ends with CTA)
```

### The Bridge Word System

Each line must start with a **bridge word** that connects to the previous line's promise:

| Bridge Type | Words | When to Use |
|---|---|---|
| **Surprise** | "But," "However," "What they don't tell you" | Contradicting expectation |
| **Escalation** | "And," "Plus," "Not only that" | Adding to the point |
| **Reveal** | "Here's the thing," "The secret is," "What I discovered" | Introducing the solution |
| **Proof** | "I tried this," "For 30 days," "The results" | Transitioning to evidence |
| **Result** | "So now," "That's why," "Ever since" | Showing the outcome |
| **Urgency** | "Stop," "Don't," "Before you" | CTA or warning |

**Form Rule:** Every dialogue line in Phase 3 must have a CONNECTOR field filled. The AI generates this automatically.

---

## CONCERN 6: Dialogue Must Be DEMONSTRATED Not Spoken

**Your Point:** The biggest problem — actors reading lines instead of LIVING them. The script must specify WHAT THE ACTOR IS DOING while speaking.

**The Problem:** My spec had "Actor Direction" per scene (expression, body language) but it was SEPARATE from dialogue. The actor reads the dialogue, then checks the direction. In reality, the action and dialogue must happen SIMULTANEOUSLY. The script needs **ACTION-INTEGRATED DIALOGUE**.

**The Fix:** Rewrite the screenplay format to **embed actions INTO the dialogue lines**, not as separate notes.

### New Format: Action-Integrated Screenplay

Replace the old format with a ** Hollywood-style screenplay format** adapted for short-form:

```
SCENE 1: THE HOOK (0.0s - 3.0s)
==================================================

[0.0s] (Actor: Face fills frame. Eyes wide. Holds up two serum bottles — one empty, one full.
        Expression: "You won't believe this." Energy: 9/10)
        
        "I tested 47 skincare products —"
        
[0.8s] (Actor: Puts bottles down. Leans in closer to camera. 
        Expression shifts to conspiratorial. Lowers voice slightly.)
        
        "— so you don't have to."

SCENE 2: THE SHOCK (3.0s - 8.0s)
==================================================

[3.0s] (Actor: Steps back. Picks up one bottle, shakes it near camera.
        Expression: Serious. Points to the liquid inside.)
        
        "And I found that 70% of vitamin C serums —"
        
[5.0s] (Actor: Sets bottle down. Crosses arms. 
        Expression: Skeptical, like revealing a scam.)
        
        "— go bad before you finish them."
```

### Action Cues Every Line

Every piece of dialogue must have an **action parenthetical** that answers:

| Question | Action Cue Example |
|---|---|
| What is the actor DOING with their hands? | "Holds up bottle" / "Points to face" / "Gestures 'stop'" |
| What is the actor's facial expression? | "Eyes widen" / "Smirks" / "Furrows brow" / "Mouth drops" |
| How is the actor positioned relative to camera? | "Leans in" / "Steps back" / "Turns sideways" / "Moves closer" |
| What props are in use? | "Holding phone" / "Showing product" / "Opening fridge" |
| What is the actor NOT doing? | "NOT smiling — serious" / "NOT looking at camera — looking at product" |

### The "While Speaking" Rule

**Old (Bad):**
```
Dialogue: "Store it in the fridge."
Body Language: Open palms
```
→ Actor says the line, THEN does the gesture. Or forgets the gesture entirely.

**New (Fixed):**
```
[10.0s] (Actor: Walks to fridge. Opens door. Places serum bottle inside.
        Turns back to camera. Expression: "That's it. Easy.")
        
        "Store it in the fridge."
```
→ The actor is DOING the action WHILE/WITH the dialogue. The action IS the performance.

### Golden Rule Added to Form

> **"If the actor can deliver the line while sitting still and staring at the camera, the screenplay is wrong. Every line must require an action."**

---

## CONCERN 7: Additional General Comments

### 7.1 The "Show Don't Tell" Rule (NEW Global Rule)

Added to Phase 3 header:

> **GLOBAL RULE: Every piece of information in the script must be SHOWN, not just SAID.**
> 
> If the script says "This serum is expensive" → the actor must HOLD UP the price tag or SHOW the receipt.
> 
> If the script says "It lasts twice as long" → the actor must SHOW two bottles: one empty (30 days), one half-full (60 days).
> 
> If the actor is just SAYING it without SHOWING it → rewrite the scene.

### 7.2 The "Silent Moments" Rule (NEW)

Not every second needs dialogue. Some of the most viral moments are SILENT reactions:

| Moment Type | Duration | Example |
|---|---|---|
| Reaction shot (face only) | 0.5-1.0s | Actor's shocked face after revealing the 70% stat |
| Product reveal | 1.0-2.0s | Slow push-in on the product with no dialogue |
| Before/After cut | 1.0s | Cut from bad result to good result, silent |
| Text-only moment | 1.0-2.0s | On-screen text appears while actor is off-screen |

The screenplay must mark these as **"SILENT: [description of what's on screen]"**

### 7.3 The "No Talking Head" Rule (NEW Global Rule)

> **A "talking head" (actor speaking to camera with nothing else happening) can last MAXIMUM 2 seconds.**
> 
> After 2 seconds, ONE of these must happen:
> - Cut to a different angle
> - Text appears on screen
> - Prop enters the frame
> - Actor does a physical action
> - Cut to B-roll
> - Graphic overlay appears

---

## REVISED FIELD SUMMARY (Changes from V2)

| Field (V2) | Change | New Location |
|---|---|---|
| 1.6.3 Entertaining Education | **MOVED** to Phase 4 + replaced with Content Style Selector | Phase 1 (new) + Phase 4 |
| 1.6.4 Fluff Check | **REPLACED** with Fluff Detector (examples table + 3 guided questions + forced rewrite) | Phase 1 |
| 1.8 Reference Video | **EXPANDED** from 1 dropdown to 7 checkboxes + intensity sliders + specific notes | Phase 1 |
| 1.8.1 5x Rule | **REPLACED** with 5-question structural analysis (no views-based rule) | Phase 1 |
| 3.5 Dialogue Engineering | **ADDED** Chain Rule (connector cues between every line) | Phase 3 |
| 3.1 Scene Breakdown | **REWRITTEN** with Action-Integrated format (actions embedded in dialogue) | Phase 3 |
| — | **NEW:** "Show Don't Tell" global rule | Phase 3 header |
| — | **NEW:** "Silent Moments" specification | Phase 3 |
| — | **NEW:** "No Talking Head >2s" rule | Phase 3 global rules |

---

## COMPLETE FILE SET

| File | Version | Contents |
|---|---|---|
| `form-analysis-report.md` | V1 | Original 18-gap analysis |
| `facebook-analysis-report.md` | V1 | PBL content analysis |
| `deep-dive-analysis-report.md` | V1 | 8 additional findings |
| `form-architecture-blueprint.md` | V1 | Architecture blueprint |
| `viral-video-form-specification-v2.md` | V2 | Complete 5-phase spec |
| **`form-spec-corrections-v3.md`** | **V3** | **These corrections** |

**Next Step:** I will now merge V2 + V3 into a single **final specification document** (V3 Final) that incorporates all corrections. Confirm and I'll proceed.
