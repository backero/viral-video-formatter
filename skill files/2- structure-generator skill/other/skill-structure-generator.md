# SKILL: AI Structure Generator
## For Viral Video Production Form — Phase 2 (Structure Review)

---

## PURPOSE
Take the selected nugget + topic sentences + value delivery info and generate the complete video structure: content type, format, script template, 3 hooks (visual/written/audio), and CTA.

## INPUT FORMAT
The user provides:
```json
{
  "selected_nugget": {
    "type": "Shocking Fact",
    "text": "73% of SaaS companies fail not because of their product, but because of poor onboarding"
  },
  "topic": {
    "teaches": "This video teaches how to fix SaaS onboarding in under 5 minutes",
    "cares": "They care because 73% of startups fail from the same fixable mistake",
    "proof": "Trust me because I reduced churn by 40% at 3 companies with one email change"
  },
  "value": {
    "takeaway": "After watching, the viewer will be able to write a welcome email that reduces churn by 40%",
    "style": "Demonstration",
    "time_to_value": "0-3s"
  },
  "platform": "Instagram",
  "estimated_length": "30-60s",
  "reference_video": {
    "url": "https://www.tiktok.com/@example/video/123",
    "copying": "Hook Only",
    "description": "The rapid-fire stat reveal in the first 2 seconds"
  }
}
```

## OUTPUT FORMAT
Return ONLY a JSON object:

```json
{
  "content_type": {
    "selected": "Educational",
    "reason": "Teaching a specific skill (writing a welcome email). Educational content builds trust and gets saves.",
    "frequency": "3-5x/week",
    "cta_match": "Follow/Save"
  },
  "format": {
    "selected": "Clone (Smart vs Dumb)",
    "tier": "S",
    "reason": "Comparison format works perfectly for showing dumb onboarding vs smart onboarding"
  },
  "structure": {
    "selected": "6 — Myth Bust",
    "structure_number": 6,
    "tier": "A",
    "timing": {
      "0-1s": "HOOK: State the shocking stat",
      "1-3s": "REACTION: Show facial reaction to the stat",
      "3-8s": "PROOF: Back it up with visual evidence",
      "8-15s": "IMPLICATION: What this means for the viewer",
      "15-25s": "SOLUTION: Show the fix (the email)",
      "25-30s": "DEMONSTRATION: Show before/after results",
      "30-35s": "CTA: One clear action"
    }
  },
  "hooks": {
    "visual": {
      "description": "Close-up of creator's shocked face, holding phone showing '73%' in large red text",
      "quality_rating": "GREAT",
      "quality_reason": "High contrast (red text on dark), facial expression, specific number visible"
    },
    "written": {
      "text": "73% fail from THIS",
      "word_count": 4,
      "quality_rating": "GREAT",
      "quality_reason": "Under 8 words, specific number, creates curiosity gap"
    },
    "audio": {
      "description": "Energetic, slightly concerned tone: 'What if I told you 73% of SaaS companies...'",
      "quality_rating": "GOOD",
      "quality_reason": "Strong opening, emotion in voice, direct address"
    }
  },
  "cta": {
    "type": "Follow/Save",
    "text": "Save this email template",
    "word_count": 4,
    "matching_rule": "Educational content → Follow/Save CTA"
  }
}
```

## RULES

1. **Content type MUST match the nugget type:**
   - Shocking Fact -> Educational or Authority
   - Practical Hack -> Educational
   - Story Hook -> Storytelling
2. **CTA MUST match content type:**
   - Educational -> Follow/Save
   - Storytelling -> Follow
   - Authority -> Comment then DM
   - Personal -> Follow
   - Comparison -> Comment
3. **Written hook max 8 words**
4. **CTA max 5 words**
5. **Format tier is based on nugget type:**
   - Comparison/Debate topics -> S-Tier (Clone, Talking Back & Forth)
   - Tutorial/How-to -> S-Tier (Visual Prop Explainer) or A-Tier (Voiceover)
   - Story/Personal -> A-Tier (Voiceover + Visuals)
6. **Structure is based on nugget type:**
   - Shocking Fact -> Structure 1 (Comparison) or 6 (Myth Bust)
   - Practical Hack -> Structure 2 (Step-by-Step) or 7 (List) or 9 (PAS)
   - Story Hook -> Structure 3 (Story Framework) or 11 (Before→After)
   - Comparison topic -> Structure 4 (Smart vs Dumb) or 5 (Do vs Don't)
   - Proof/Case study -> Structure 12-15 (B-Tier)
7. **Visual hook quality rating criteria:**
   - GREAT: Action happening, high contrast, result/mistake shown
   - GOOD: Face visible, some action, predictable
   - BAD: Static frame, talking head, no action -> REJECT

## STRUCTURE REFERENCE (15 Structures)

### S-TIER: Core Engines (60-70% usage)

| # | Structure | Family | Outline | Blueprint |
|---|-----------|--------|---------|-----------|
| 1 | Comparison (A vs B) | Decision | Hook→Option A→Option B→Time/Test→Results→Explanation→CTA | Micro bridge→Option A behavior→Consequence A→Option B behavior→Consequence B→Timeframe/Test→Explanation→Reinforcement→CTA Keyword |
| 2 | Step-by-Step | Education | Hook→Step 1→Step 2→Step 3→Step 4(opt)→Why it works→CTA | Promise fix→Step 1+Reason→Step 2+Reason→Step 3+Reason→Reinforcement→CTA |
| 3 | Story Framework | Trust | Hook→Background→Conflict→Decision→Result→Lesson→CTA | Setup→Conflict→Emotional low→Decision→Action→Result→Lesson→CTA |

### A-TIER: Stable Variations (20-30% usage)

| # | Structure | Family | Outline | Blueprint |
|---|-----------|--------|---------|-----------|
| 4 | Smart vs Dumb | Decision | Hook→Dumb Action→Consequence→Smart Action→Result→Why it works→CTA | Contrast→Dumb behavior→Damage→Smart behavior→Benefit→Mechanism→Reinforcement→CTA |
| 5 | Do vs Don't | Decision | Hook→Don't→Consequence→Do→Benefit→Why difference→CTA | Force choice→Wrong behavior→Damage→Correct behavior→Benefit→Reason→Reinforcement→CTA |
| 6 | Myth Bust | Decision | Hook→Myth→Why believed→Contradiction→Correct method→Explanation→CTA | State myth→Why believed→Contradiction→Correct method→Mechanism→Reinforcement→CTA |
| 7 | List Structure | Education | Hook→Item 1→Item 2→Item 3→Bonus→Pattern→CTA | List setup→Point+reason→Point+reason→Point+reason→Pattern insight→CTA |
| 8 | 3-Level Structure | Education | Hook→Beginner→Intermediate→Advanced→Pro→Core difference→CTA | Introduce levels→Beginner→Limitation→Intermediate→Limitation→Advanced→Insight→CTA |
| 9 | PAS | Education | Hook→Problem→Agitate→Solution→Steps→Why it works→CTA | Problem→Consequence→Escalation→Solution→Action→Mechanism→Reinforcement→CTA |
| 10 | Outcome→Pain→Solution | Education | Desired outcome→Pain 1→Pain 2→Pain 3→Solution→Framework→CTA | Dream outcome→Obstacles→Solution→Core mechanism→Reinforcement→CTA |
| 11 | Before→After | Trust | Hook→Before→Problem→What changed→After→Why it worked→CTA | Transformation→Before state→Struggle→Turning point→Action→Result→Lesson→CTA |

### B-TIER: Proof Heavy (10-20% usage)

| # | Structure | Family | Outline | Blueprint |
|---|-----------|--------|---------|-----------|
| 12 | Time-Based Experiment | Proof | Hook→Initial condition→What followed→Duration→Results→Lesson→CTA | Baseline→Rule followed→Duration→Observation→Results→Insight→Reinforcement→CTA |
| 13 | Fake Case Study | Proof | Hook→Situation setup→Step 1→Step 2→Step 3→Strategic reasoning→CTA | Scenario→Step 1+reason→Step 2+reason→Step 3→Strategic stack→CTA |
| 14 | Double Down | Proof | Proven hook→Same setup→Small variation→Same structure→New result→Reinforcement→CTA | Existing winner→One change→Additional insight→Expected result→Reinforcement→CTA |
| 15 | Cost Breakdown | Proof | Hook→Cost 1→Cost 2→Cost 3→Total→Value Comparison→CTA | Cost truth→Expense 1→Expense 2→Expense 3→Total→Value comparison→Lesson→CTA |

### F-TIER: Avoid
- Vague motivational talk
- Generic advice without mechanism
- Tips without cause→effect

## Structure Selection Rules
- Shocking Fact -> Structure 1 (Comparison) or 6 (Myth Bust)
- Practical Hack -> Structure 2 (Step-by-Step) or 7 (List) or 9 (PAS)
- Story Hook -> Structure 3 (Story Framework) or 11 (Before→After)
- Comparison topic -> Structure 4 (Smart vs Dumb) or 5 (Do vs Don't)
- Proof/Case study -> Structure 12-15 (B-Tier)

## Custom Structure Support
If the user specifies a structure not in the 15, use the closest match and note: "Using structure #[X] ([Name]) as closest match. To add custom structures, contact your admin."
The system supports up to 99 total structures (15 built-in + 84 custom slots).

## QUALITY CHECK
Before returning, verify:
- [ ] Content type matches nugget type?
- [ ] CTA matches content type?
- [ ] Written hook <= 8 words?
- [ ] CTA <= 5 words?
- [ ] Structure matches nugget type (per selection rules)?
- [ ] Visual hook rated honestly (not auto-GREAT)?
