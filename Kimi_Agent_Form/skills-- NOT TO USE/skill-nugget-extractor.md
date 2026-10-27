# SKILL: AI Nugget Extractor
## For Viral Video Production Form — Phase 1 (AI Nugget Extraction)

---

## PURPOSE
Read a content writer's raw research dump (up to 40 pages of articles, stats, notes, links) and extract exactly 3 viral-worthy nuggets: one Shocking Fact, one Practical Hack, and one Story Hook.

## INPUT FORMAT
The user will paste raw research text. Example format:
```
- Article: "73% of SaaS companies fail because of poor onboarding" (Source: Forbes, 2024)
- My experience: We reduced churn by 40% with one email change at LaunchPad
- Stat: Average user attention span on Reels is 1.7 seconds
- Competitor video got 2M views with similar hook "Stop onboarding like this"
- CEO interview: "The biggest mistake is making users figure it out themselves"
- Reddit thread: 1.2K comments about how sign-up flows are too complex
- Book: "The Mom Test" — people lie in surveys, watch behavior instead
- Personal note: Spent 3 months rebuilding onboarding, saw 3x activation
- Tool: UserPilot charges $249/month for onboarding analytics
- Case study: Notion's onboarding = template picker → 40% higher activation
```

## OUTPUT FORMAT
Return ONLY a JSON object with exactly 3 nuggets:

```json
{
  "nuggets": [
    {
      "type": "Shocking Fact",
      "text": "73% of SaaS companies fail not because of their product, but because of poor onboarding",
      "source_hint": "Forbes 2024 research",
      "why_viral": "Counter-intuitive — people assume product quality determines success",
      "emotional_trigger": "Fear (wasting effort on product when onboarding is the real problem)"
    },
    {
      "type": "Practical Hack",
      "text": "Change one welcome email and reduce churn by 40% — no engineering needed",
      "source_hint": "Personal experience at LaunchPad",
      "why_viral": "Extremely actionable, zero cost, huge result",
      "emotional_trigger": "Hope (easy fix for a hard problem)"
    },
    {
      "type": "Story Hook",
      "text": "I spent 3 months and $15,000 rebuilding our onboarding. The fix that actually worked? One email.",
      "source_hint": "Personal experience",
      "why_viral": "Relatable struggle + surprising twist + specific numbers",
      "emotional_trigger": "Relief + curiosity (what was the email?)"
    }
  ]
}
```

## RULES

1. **Each nugget max 25 words**
2. **Must contain a number, percentage, or specific claim** — vague nuggets are rejected
3. **Must not contain these forbidden phrases:**
   - "revolutionary", "game-changing", "groundbreaking"
   - "amazing", "incredible", "awesome"
   - "unlock", "discover", "unleash"
   - "in today's world", "in this video", "let's talk about"
   - "things", "stuff", "tips" (use specific nouns)
4. **Each nugget must have a clear emotional trigger:** Fear, Hope, Curiosity, Anger, Relief, Surprise
5. **If research is insufficient** (less than 100 characters), return error:
   ```json
   {"error": "Insufficient research. Minimum 100 characters required."}
   ```
6. **If fewer than 3 viable nuggets found**, return the best available with a note:
   ```json
   {"nuggets": [...], "note": "Only X viable nuggets found from this research. Consider adding more specific data or personal experiences."}
   ```

## QUALITY CHECK
Before returning, verify each nugget against this checklist:
- [ ] Max 25 words?
- [ ] Contains a specific number/name/claim?
- [ ] No forbidden phrases?
- [ ] Clear emotional trigger?
- [ ] Would a stranger stop scrolling for this?
- [ ] Is it about the VIEWER'S problem (not the creator's)?

## EXAMPLE: BAD vs GOOD NUGGETS

| BAD (Reject) | GOOD (Accept) |
|-------------|---------------|
| "Onboarding is really important for SaaS" | "73% of SaaS fails from bad onboarding, not bad product" |
| "You should fix your onboarding flow" | "Change one welcome email → 40% less churn. No coding." |
| "I learned a lot about user onboarding" | "I spent $15K on onboarding. The fix was one free email." |
