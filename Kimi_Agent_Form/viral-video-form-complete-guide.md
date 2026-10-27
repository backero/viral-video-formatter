# Viral Video Production Form — Complete Guide
## For AI Agent and Sub-Agent Creation

---

## 1. PROJECT OVERVIEW

### 1.1 What This Is
A 5-phase web-based production form that takes a content writer's research (up to 40 pages) and converts it into a production-ready screenplay for short-form viral videos (30-60 seconds) for Instagram Reels, TikTok, and YouTube Shorts.

### 1.2 The Problem It Solves
- Content writers copy-paste AI-generated garbage into scripts
- 40 pages of research cannot be compressed into a 30-second video
- Editors don't know camera angles, cuts, or transitions
- Actors don't know expressions, tone, or body language
- Dialogue sounds robotic because it's spoken, not demonstrated
- ChatGPT produces unusable scripts because inputs are too vague

### 1.3 The Solution
**Structured constraints + AI assistance + Human validation**

The form forces writers into 7 structured fields (no open-ended text). AI extracts viral nuggets from research. AI generates the production screenplay. Humans validate before filming.

### 1.4 Live Form URL
https://rbcm2h5ijpzgq.kimi.page

---

## 2. COMPLETE WORKFLOW (Mind Map)

### 2.1 Central Hub: Viral Video Form

Five phases radiate from the central form. Two AI agents assist. Four team roles participate. Four documents are produced.

### 2.2 The 5 Phases

| Phase | Name | Color | Who Does It | What Happens |
|-------|------|-------|-------------|--------------|
| Phase 1 | INPUT | Teal #06D6A0 | Content Writer | Fills 7 fields, dumps research, picks one nugget |
| Phase 2 | STRUCTURE | Amber #F59E0B | AI generates, Content Lead approves | Content type, format, template, hooks, CTA |
| Phase 3 | EXECUTION | Red #EF4444 | AI generates, Production Lead approves | Scene-by-scene screenplay with full direction |
| Phase 4 | VALIDATION | Violet #8B5CF6 | Actor + Editor + Leads | 10-point checklist, 4-role sign-off |
| Phase 5 | OUTPUT | Sky #0EA5E9 | Auto-generated | Simple Brief + AI Agent Prompt Pack |

### 2.3 The 2 AI Agents

| Agent | Triggered By | What It Does | Output |
|-------|-------------|--------------|--------|
| AI Nugget Agent | Phase 1 (after research dump) | Reads 40 pages of research. Extracts 3 viral nuggets: Shocking Fact, Practical Hack, Story Hook. | 3 selectable nuggets |
| AI Screenplay Agent | Phase 2 (after structure approval) | Generates scene-by-scene production brief with camera direction, actor direction, dialogue engineering, editing markers. | Full screenplay in Hollywood format |

### 2.4 The 4 Team Roles

| Role | Phase | Responsibility |
|------|-------|---------------|
| Content Writer | Phase 1 | Research dump, pick nugget, fill topic + value fields |
| Content Lead | Phase 2 | Approve content type, format, script template, hooks, CTA |
| Production Lead | Phase 3 | Approve camera direction, actor direction, editing markers |
| Actor + Editor | Phase 4 | Validate 10-point checklist, sign off, film |

### 2.5 Linear Execution Flow

```
Writer Fills Form → AI Extracts Nuggets → Writer Picks ONE 
  → AI Generates Structure → Content Lead Approves 
  → AI Generates Screenplay → Production Lead Approves 
  → 10-Point Validation → 4-Role Sign-Off → Export Documents
```

### 2.6 The 4 Output Documents

| Document | For Who | Contains |
|----------|---------|----------|
| Actor Brief | Actor | Scenes + dialogue + direction only |
| Camera Sheet | Cameraman | Shot list + settings per scene |
| Edit Timeline | Editor | Cut points + transitions + captions |
| AI Agent Prompt Pack | Future AI agents | JSON data + 5 prompt templates |

---

## 3. PHASE 1: INPUT — DETAILED SPECIFICATION

### 3.1 Purpose
Content writer fills this. ONLY 7 field groups. Brain only — no AI copy-paste.

### 3.2 The 7 Fields

#### Field 1: Video Identity
| Sub-field | Type | Options |
|-----------|------|---------|
| Date | Date picker | Auto-filled |
| Creator Name | Text | Min 2 chars |
| Actor Name | Dropdown | Sarah Chen, Marcus Johnson, Ava Kim, David Park |
| Company | Dropdown | GlowUp Beauty, FitLife Co, TechSimplify, Backero |
| Platform | Dropdown | Instagram, TikTok, YouTube Shorts, Facebook Reels, Multi-Platform |
| Estimated Length | Dropdown | 15-30s, 30-60s, 60-90s, 90-120s |

#### Field 2: Raw Research Dump
- Large textarea, min-height 240px
- Placeholder: "Paste all your research — articles, stats, notes, links, thoughts"
- Min 100 characters enforced
- "Extract Nuggets" button triggers AI Nugget Agent

#### Field 3: AI Nugget Extraction (AI-Generated)
Three selectable cards appear after extraction:

| Nugget Type | Example |
|-------------|---------|
| Shocking Fact | "70% of vitamin C serums oxidize before you finish the bottle" |
| Practical Hack | "Store serum in the fridge — doubles effectiveness" |
| Story Hook | "I spent $2,000 on serums before learning this one trick" |

Writer picks ONE. Others are auto-saved as future topics.

#### Field 4: One Point Selector
- Radio cards to pick one of the 3 nuggets
- "Why This Nugget?" field: "A [viewer] scrolling [platform] will stop because..."
- Max 40 words

#### Field 5: Topic (Forced Format)
Three sentences with forced prefixes:

| Sentence | Prefix | Max Words | Example |
|----------|--------|-----------|---------|
| The Point | "This video teaches..." | 20 | "...how to keep your vitamin C serum from oxidizing" |
| Why They Care | "They care because..." | 20 | "...nobody wants to waste money on serums that stop working" |
| The Proof | "Trust me because..." | 20 | "...I've tested 20+ serums and the fridge trick always works" |

Plus Niche dropdown (6 options) and dependent Sub-niche dropdown.

**Topic Validation Checkboxes (ALL must be checked before submit):**
1. Demand: People are actively searching for this
2. Relevance: This matches my niche
3. Interest: This would stop ME from scrolling
4. Knowledge: I have real experience/data here

#### Field 6: Value Delivery
| Sub-field | Type | Notes |
|-----------|------|-------|
| Actionable Takeaway | Text | "After watching, the viewer will be able to..." (max 25 words) |
| Content Style | Dropdown | Demonstration, Reaction, Story, Comparison, Reveal, Challenge |
| Time to Value | Dropdown | 0-3s, 3-5s, 5-10s, 10s+ |

#### Field 7: Reference Video
| Sub-field | Type | Notes |
|-----------|------|-------|
| Video URL | URL input | Must be a viral video reference |
| What are we copying? | Dropdown | Full Structure, Hook Only, Visual Style, Energy, Tone, Format |
| Describe what we're taking | Textarea | 1 sentence description |

**Viral Threshold Rule:** Video views >= 5x creator's subscriber count (3x for 1M+ subs).

### 3.3 Anti-AI Guardrails

| Guardrail | How It Works |
|-----------|-------------|
| Forced Format | Sentences must start with exact prefixes |
| Word Limits | Enforced counters show remaining words |
| Specificity Test | Must contain numbers, names, or specific claims |
| Checkboxes Required | All 4 validation checkboxes must be checked |
| Human Gate | Content Lead must approve Phase 2 before proceeding |

### 3.4 Fluff Detector (1 Example)

| FLUFF (Bad) | SPECIFIC (Good) |
|-------------|-----------------|
| "This serum is amazing" | "This serum reduced my dark spots in 14 days" |

Self-check questions:
1. Does every word earn its place?
2. Would a viewer save or share this?
3. Is the takeaway actionable within 24 hours?

---

## 4. PHASE 2: STRUCTURE — DETAILED SPECIFICATION

### 4.1 Purpose
AI generates a skeleton. Content Lead reviews and approves.

### 4.2 Content Type (5 Types)

| Type | Frequency | CTA Match | When to Use |
|------|-----------|-----------|-------------|
| Educational | 3-5x/week | Follow/Save | Teaching a skill |
| Storytelling | 1-2x/week | Follow | Sharing experience |
| Authority/Trust | 1x/week | Comment then DM | Proving credibility |
| Personal/Relatable | 1-2x/week | Follow | Behind-the-scenes |
| Trending/Entertainment | As needed | Share/Comment | Riding trends |

### 4.3 Format Selection (S/A/B/F Tiers)

| Tier | Formats | When to Use |
|------|---------|-------------|
| S-Tier | Clone, Talking Back & Forth, Visual Prop Explainer, Carousel | Highest engagement |
| A-Tier | Voiceover + Visuals, Whiteboard | Good retention |
| B-Tier | Trending Audio + B-roll | Algorithm boost |
| F-Tier | B-roll Only | Brand building |

### 4.4 Script Structure Templates (6 Templates with Timing)

**Template A: Step-by-Step (Educational)**
[0-1s] Hook → [1-3s] Authority Gap → [3-5s] Named Framework → [5-15s] Step 1 → [15-25s] Step 2 → [25-35s] Step 3 → [35-40s] CTA

**Template B: Comparison (A vs B)**
[0-1s] Hook → [1-3s] Option A → [3-5s] Option B → [5-15s] Test → [15-25s] Results → [25-35s] Explanation → [35-40s] CTA

**Template C: Storytelling**
[0-2s] Context → [2-10s] Pain → [10-20s] Turning Point → [20-35s] Lesson → [35-40s] CTA

**Template D: Shocking Fact**
[0-1s] Hook → [1-3s] Reaction → [3-8s] Proof → [8-15s] Implication → [15-25s] Solution → [25-35s] Demonstration → [35-40s] CTA

**Template E: Practical Hack**
[0-1s] Hook → [1-3s] Problem → [3-5s] Setup → [5-15s] Hack Step 1 → [15-25s] Hack Step 2 → [25-35s] Result → [35-40s] CTA

**Template F: Story Hook**
[0-2s] Hook → [2-10s] Story → [10-20s] Low Point → [20-30s] Discovery → [30-37s] Lesson → [37-40s] CTA

### 4.5 3-Hook Rule

| Hook Layer | What It Is | Max |
|------------|-----------|-----|
| Visual Hook | What viewer sees in first 0.5 seconds | 1 sentence description |
| Written Hook | Text on screen | 8 words |
| Audio Hook | First 1 second of audio | First 3-5 words + tone |

### 4.6 Visual Hook Quality Rating (GAP 7)

| Rating | Criteria | Action |
|--------|----------|--------|
| GREAT | Action happening, high contrast, result shown | Proceed |
| GOOD | Face visible, some action, predictable | Proceed with note |
| BAD | Static frame, talking head, no action | REJECT — rewrite |

### 4.7 CTA Type Matching (GAP 3)

| Content Type | CTA Type | Example |
|-------------|----------|---------|
| Educational | Follow/Save | "Save this for later" |
| Storytelling | Follow | "Follow if you relate" |
| Authority | Comment then DM | "Comment 'GUIDE' for my free checklist" |
| Personal | Follow | "Follow for more real talk" |
| Comparison | Comment | "Comment which one you use" |

**Rules:** ONE CTA only. Max 5 words. Must match content type.

---

## 5. PHASE 3: EXECUTION — DETAILED SPECIFICATION

### 5.1 Purpose
Full production screenplay. Hollywood-style format. Every scene has dialogue + action + direction.

### 5.2 Golden Rules (Global)

1. **Show Don't Tell** — Every fact must be SHOWN (hold up the bottle, show the receipt), not just spoken
2. **No Talking Head >2s** — After 2 seconds of talking, something must change (cut, text, prop, action, B-roll)
3. **Silent Moments** — Reaction shots, product reveals, before/after cuts need no dialogue

### 5.3 Scene Card Format

Each scene contains:
- Timing (start-end seconds)
- Dialogue with action parentheticals
- Camera Direction (shot, angle, movement, lens, framing)
- Actor Direction (expression, eye contact, body language, energy 1-10, pace, tone)
- Visual Elements (on-screen text, props, background, graphic overlays)
- Audio Direction (voice/music/SFX/transitions)
- Editing Markers (cut point, transition type, caption style, speed ramp)

### 5.4 Dialogue Engineering Rules

| Rule | Specification |
|------|--------------|
| Max words per line | 15 |
| Emphasis | 1-2 words marked for vocal stress |
| Pauses | Breathing points indicated |
| Forbidden words | "revolutionary", "unlock", "discover" |
| Syllable count | Prefer short, punchy words |
| Contraction rule | Use contractions (conversational) |
| Bridge words | Every sentence must bridge to the next (But, And, Here's, I tried) |

### 5.5 Caption Specifications

| Property | Spec |
|----------|------|
| Max words per line | 5-7 |
| Max lines on screen | 2 |
| Read speed | < 1 second |
| Font | Bold sans-serif, white with black outline |
| Animation | Pop-in per word or per line |
| Position | Bottom third, centered |

### 5.6 Editing Global Rules

| Rule | Spec |
|------|------|
| Max cut interval | 2 seconds (ideal: 0.8-1.5s) |
| Jump cuts | Allowed and encouraged |
| Transitions | Hard cuts preferred |
| Text overlays | Must appear within 3 seconds |
| End card | Freeze on CTA text for 1+ seconds |

---

## 6. PHASE 4: VALIDATION — DETAILED SPECIFICATION

### 6.1 10-Point Checklist

| # | Check | Pass Criteria |
|---|-------|---------------|
| 1 | Hook stops scroll | Stranger stops scrolling in 0.5s |
| 2 | Value arrives fast | Value within first 3-5 seconds |
| 3 | Dialogue sounds human | Read aloud — sounds natural |
| 4 | 10-year-old test | A child could understand |
| 5 | Camera directions clear | Cameraman knows exactly what to do |
| 6 | Actor directions specific | Actor knows expression/pace/energy |
| 7 | Cut points marked | Editor knows where every cut is |
| 8 | ONE clear CTA | Exactly one, max 5 words, at end |
| 9 | Captions for mute | Muted viewer understands everything |
| 10 | Visual changes every 1-2s | Cut/text/graphic/movement every 2s |

**ALL 10 must pass before filming.**

### 6.2 4-Role Approval

| Role | What They Review | Sign-off Required |
|------|-----------------|-------------------|
| Content Lead | Phase 1 + 2 | Content on-brand, topic validated |
| Production Lead | Phase 3 | Production executable |
| Actor | Their scenes in Actor Brief | Acknowledges they can perform |
| Editor | Full Edit Timeline | Editing plan is clear |

---

## 7. PHASE 5: OUTPUT — DETAILED SPECIFICATION

### 7.1 Simple Brief (Human-Readable)

Four documents for the team:

1. **Actor Brief** — Scenes with dialogue + actor direction only
2. **Camera Sheet** — Table: Scene | Shot | Angle | Movement | Lens
3. **Edit Timeline** — Visual strip with cut list
4. **Clean Script** — Dialogue only, numbered lines

### 7.2 AI Agent Prompt Pack (For Future Automation)

Structured JSON + 5 prompt templates:

| # | Agent Name | Prompt Purpose |
|---|-----------|----------------|
| 1 | Script Writer Agent | Write viral scripts using the structure |
| 2 | Scene Breakdown Agent | Convert script into shot-by-shot breakdown |
| 3 | Actor Direction Agent | Generate actor direction for each scene |
| 4 | Camera Direction Agent | Generate camera settings for each shot |
| 5 | Edit Timeline Agent | Generate editing timeline with cut points |

---

## 8. AI AGENT CREATION GUIDE

### 8.1 How to Build Each Agent

When creating AI agents, each agent should:
1. Accept the structured JSON from the form as input
2. Follow the rules and constraints in this document
3. Output in the exact format specified for its phase

### 8.2 Agent 1: AI Nugget Agent

**Input:** Raw research text (up to 40 pages)
**Output:** 3 nuggets (Shocking Fact, Practical Hack, Story Hook)
**Rules:**
- Each nugget max 25 words
- Must contain a number, percentage, or specific claim
- Must not contain generic phrases ("amazing", "revolutionary", etc.)

### 8.3 Agent 2: AI Screenplay Agent

**Input:** Selected nugget + topic sentences + value + content style + reference video info
**Output:** Full scene-by-scene production brief (5-6 scenes, 30-60 seconds)
**Rules:**
- Follow the selected script template timing
- Every dialogue line must have action parentheticals
- Camera direction per scene
- Actor direction per scene
- Editing markers per scene
- Show Don't Tell — every fact demonstrated
- No Talking Head >2 seconds
- Bridge words between sentences
- CTA max 5 words, one only

---

## 9. COMPLETE REQUIREMENTS CHECKLIST

| Requirement | Status |
|-------------|--------|
| 10-year-old can write content | YES — forced formats, dropdowns, examples |
| 40-page research compression | YES — Raw Research → 3 nuggets → pick 1 |
| Editors know camera/cuts | YES — Phase 3 camera direction + edit markers |
| Actors know expressions | YES — Phase 3 actor direction per scene |
| Dialogue demonstrated, not spoken | YES — Action-integrated screenplay |
| ChatGPT constraints | YES — 5 anti-AI guardrails |
| Show Don't Tell | YES — Global rule in Phase 3 |
| No Talking Head >2s | YES — Global rule in Phase 3 |
| Silent Moments | YES — Global rule in Phase 3 |
| One video = one point | YES — One Point Selector enforces this |
| 5x viral threshold rule | YES — Reference Video field |
| Reference video multi-purpose | YES — 6-option dropdown |
| Sentence flow (Chain Rule) | YES — Bridge words between lines |
| Fluff check with example | YES — 1 FLUFF vs SPECIFIC example |
| Simple form (7 fields) | YES — 7 cards, minimal free text |
| Dual export (human + AI) | YES — Simple Brief + AI Agent Prompt Pack |
| 10-point validation | YES — Phase 4 checklist |
| 4-role approval | YES — Phase 4 sign-off workflow |
| 5 AI agent prompt templates | YES — Phase 5 output |
| Workflow mind map page | YES — /workflow route |
| GAP 3: CTA Type Matching | YES — Phase 2 CTA card |
| GAP 7: Visual Hook Quality | YES — Phase 2 Hook Framework |
| GAP 16: Viral Structure Copy | YES — Phase 1 Reference Video |
