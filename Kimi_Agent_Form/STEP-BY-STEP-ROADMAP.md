# STEP-BY-STEP ROADMAP
## From Form to AI Agents to Self-Hosted System

---

## THE BIG PICTURE

```
PHASE A: NOW (Week 1-2)          PHASE B: SOON (Week 3-4)         PHASE C: LATER (Month 3+)
Create skill.md files            Host on your own server          Migrate to OpenClaw local
Test with real content           Connect Kimi API to form         Full offline capability
Validate outputs work            Team starts using it             No dependency on external AI
```

---

## PHASE A: CREATE AI AGENT SKILL FILES (THIS WEEK)

### Step A1: Create 5 Skill.md Files

| # | Skill File | What It Does | Input | Output |
|---|-----------|--------------|-------|--------|
| 1 | `skill-nugget-extractor.md` | Reads 40 pages of research, finds the 3 most viral-worthy angles | Raw research text | 3 nuggets (Shocking Fact, Practical Hack, Story Hook) |
| 2 | `skill-structure-generator.md` | Picks content type, format, template, hooks, CTA from the selected nugget | Selected nugget + topic + value | Full structure (Phase 2) |
| 3 | `skill-screenplay-generator.md` | Converts structure into scene-by-scene production brief | Structure + topic + value | Full screenplay (Phase 3) |
| 4 | `skill-validation-checker.md` | Evaluates screenplay against 10-point checklist | Full screenplay | Pass/Fail per check + feedback |
| 5 | `skill-output-formatter.md` | Formats the brief into 4 export documents | Approved screenplay | Actor Brief, Camera Sheet, Edit Timeline, AI Prompt Pack |

### Step A2: Test Each Skill with Real Content
- Pick ONE real topic from your niche
- Run it through each skill.md prompt manually in Kimi
- Check if output matches what the form expects
- Fix the prompt if output is wrong
- Repeat until output is perfect

### Step A3: Validate End-to-End Flow
- Phase 1 Input -> Nugget Extractor -> 3 nuggets
- Pick 1 nugget -> Structure Generator -> Full structure
- Structure -> Screenplay Generator -> Full screenplay
- Screenplay -> Validation Checker -> 10/10 passes
- Approved -> Output Formatter -> 4 documents

**Result: 5 working skill.md files that produce perfect output every time**

---

## PHASE B: HOST ON YOUR OWN SERVER (WEEK 3-4)

### Step B1: Get the Code
- The form is built as a React static site
- All code is in `/mnt/agents/output/app/`
- You can host it on any static hosting (Netlify, Vercel, AWS S3, your own server)

### Step B2: Connect Kimi API
- The form currently has NO backend — it's frontend-only
- To make AI agents work, you need a backend that calls Kimi API
- Kimi has an API (https://platform.moonshot.cn/)
- Your backend receives form data, sends to Kimi API with skill.md prompt, returns result to form

### Step B3: Backend Architecture

```
[Form Frontend] --POST--> [Your Backend Server] --API Call--> [Kimi AI]
     ^                                                        |
     |                                                        v
[Display Result] <-------------JSON Response------------------+
```

Your backend needs:
- 5 API endpoints (one per AI agent)
- Each endpoint loads the skill.md prompt
- Injects the form data into the prompt
- Sends to Kimi API
- Returns structured JSON to the frontend

### Step B4: Frontend Integration
- Modify the form to call YOUR backend instead of showing simulated data
- "Extract Nuggets" button calls your backend API
- Backend uses skill-nugget-extractor.md prompt + research dump
- Returns 3 nuggets that the form displays
- Same pattern for all 5 agents

**Result: Form hosted on YOUR server, connected to Kimi API, producing real AI output**

---

## PHASE C: MIGRATE TO OPENCLAW LOCAL SERVER (MONTH 3+)

### Step C1: Why OpenClaw?
- OpenClaw runs AI models locally (no internet needed)
- No per-API-call cost
- Complete data privacy
- No dependency on external services

### Step C2: What Changes?

| Current (Kimi API) | Future (OpenClaw Local) |
|---|---|
| Calls Kimi cloud API | Calls local model (e.g., Llama, Mistral) |
| Requires internet | Runs offline on your server |
| Pay per token | One-time hardware cost |
| Skill.md prompts work as-is | Same prompts, different endpoint |

### Step C3: Migration is Simple
- Change the API endpoint URL in your backend
- Everything else stays the same
- Same skill.md files
- Same form frontend
- Same backend logic

```
[Form] --> [Your Backend] --Kimi API URL--> [Kimi Cloud]
                              |
                              v (change URL only)
                        --OpenClaw URL--> [Your Local Server]
```

**Result: Fully self-hosted, offline-capable viral video production system**

---

## YOUR IMMEDIATE ACTION ITEMS (TODAY)

1. **Read the 5 skill.md files** I'm creating below
2. **Pick one real topic** from your niche
3. **Copy-paste the skill prompt into Kimi** with your topic
4. **Check if the output is usable** — if not, tell me what needs fixing
5. **Repeat for all 5 skills** until output is perfect
6. **Then tell me to proceed to Phase B** (hosting + API connection)

---

## RECOMMENDATION

**Start with Phase A right now.** Creating the skill.md files costs nothing and takes a few hours. Testing them with real content shows you if the AI can actually produce usable output before you invest in hosting.

**Don't host yet.** First confirm the AI agents work. Then connect them. Then host. Then migrate to OpenClaw.

**The sequence matters:** Skills -> Test -> Host -> Connect -> OpenClaw
