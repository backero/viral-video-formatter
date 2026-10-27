# SKILL: AI Validation Checker
## For Viral Video Production Form — Phase 4 (Quality Validation)

---

## PURPOSE
Evaluate a completed screenplay against the 10-point pre-production checklist. Each check is scored PASS or FAIL with specific feedback. ALL 10 must pass for the brief to be approved for filming.

## INPUT FORMAT
```json
{
  "screenplay": {
    "total_runtime": "35.0s",
    "scene_count": 5,
    "word_count": 71,
    "scenes": [...],
    "hooks": {
      "visual": "Close-up of creator's shocked face, holding phone showing '73%' in large red text",
      "written": "73% fail from THIS",
      "audio": "Energetic, slightly concerned tone"
    },
    "cta": {
      "text": "Save this email template",
      "word_count": 4
    }
  },
  "topic": {
    "teaches": "This video teaches how to fix SaaS onboarding in under 5 minutes"
  },
  "value": {
    "time_to_value": "0-3s"
  }
}
```

## OUTPUT FORMAT
Return ONLY a JSON object:

```json
{
  "score": "8/10",
  "overall_status": "NEEDS_WORK",
  "checks": [
    {
      "number": 1,
      "name": "Hook stops the scroll",
      "criteria": "Would a stranger stop scrolling in 0.5s?",
      "result": "PASS",
      "feedback": "The visual hook shows a shocked face with '73%' in red text. High contrast + facial expression + specific number. Strong 0.5s hook."
    },
    {
      "number": 2,
      "name": "Value arrives fast",
      "criteria": "Value appears within first 3-5 seconds?",
      "result": "PASS",
      "feedback": "The shocking stat (73%) appears in Scene 1 (0-3s). Viewer immediately gets the core premise."
    },
    {
      "number": 3,
      "name": "Dialogue sounds human",
      "criteria": "Read aloud — does it sound natural, not AI?",
      "result": "PASS",
      "feedback": "Dialogue uses contractions ('don't', 'it's'), conversational pace, specific numbers. No generic AI phrases detected."
    },
    {
      "number": 4,
      "name": "10-year-old test",
      "criteria": "Could a 10-year-old understand the main point?",
      "result": "PASS",
      "feedback": "Core message is simple: 'Most SaaS fails because of bad onboarding. Here's one email that fixes it.' A child would understand."
    },
    {
      "number": 5,
      "name": "Camera directions clear",
      "criteria": "Can a cameraman read this and know what to do?",
      "result": "PASS",
      "feedback": "Every scene specifies: shot type, angle, movement, lens, framing. Cameraman has complete instructions."
    },
    {
      "number": 6,
      "name": "Actor directions specific",
      "criteria": "Does the actor know expression, pace, energy?",
      "result": "PASS",
      "feedback": "Each scene has: expression, eye contact, body language, energy 1-10, pace, tone. Actor knows exactly how to perform."
    },
    {
      "number": 7,
      "name": "Cut points marked",
      "criteria": "Does the editor know where every cut happens?",
      "result": "PASS",
      "feedback": "Every scene has exact cut point (e.g., 'Cut at 2.8s') and transition type to next scene."
    },
    {
      "number": 8,
      "name": "ONE clear CTA",
      "criteria": "Exactly one CTA, <=5 words, at the end?",
      "result": "PASS",
      "feedback": "CTA: 'Save this email template' — 4 words, one action, at the end. Correct."
    },
    {
      "number": 9,
      "name": "Captions for mute",
      "criteria": "Would a muted viewer understand everything?",
      "result": "FAIL",
      "feedback": "Scene 3 has dialogue 'Store it in the fridge' but no text overlay specifying 'FRIDGE' prominently. Add on-screen text for key action words."
    },
    {
      "number": 10,
      "name": "Visual changes every 1-2s",
      "criteria": "Visual change every 2 seconds?",
      "result": "FAIL",
      "feedback": "Scene 2 (Authority Gap, 3-8s) has actor talking for 4 seconds with only one prop change. Add a text overlay at 5s or a cut at 4s to maintain visual rhythm."
    }
  ],
  "summary": "8/10 checks passed. 2 FAILS need fixing before filming. Focus on adding text overlays for mute viewers and increasing cut frequency in Scene 2."
}
```

## VALIDATION CRITERIA (Detailed Rubrics)

### Check 1: Hook stops the scroll
**PASS if:** Visual hook has at least 2 of: high contrast, facial expression, specific number, action in frame
**FAIL if:** Static talking head, no contrast, no specific element in first 0.5s

### Check 2: Value arrives fast
**PASS if:** Core value appears within 3 seconds (stat, hack, or story start)
**FAIL if:** Value appears after 5+ seconds or is buried in the middle

### Check 3: Dialogue sounds human
**PASS if:** Uses contractions, short sentences, specific numbers, no AI filler
**FAIL if:** Contains "revolutionary", "unlock", "in today's world", or sentences >15 words

### Check 4: 10-year-old test
**PASS if:** Main point can be explained in one simple sentence
**FAIL if:** Requires domain knowledge to understand the core message

### Check 5: Camera directions clear
**PASS if:** Every scene has shot type + angle + movement specified
**FAIL if:** Any scene says just "camera on actor" without specifics

### Check 6: Actor directions specific
**PASS if:** Every scene has expression + energy level + body language
**FAIL if:** Directions are vague like "act natural" or "be engaging"

### Check 7: Cut points marked
**PASS if:** Every scene has exact cut timestamp + transition type
**FAIL if:** Scenes just end without specifying where to cut
**Additional criteria:** Cut points follow the selected structure's blueprint order. If Structure 2 (Step-by-Step) is selected, scenes must follow: Promise fix → Step 1 → Step 2 → Step 3 → CTA. Any deviation from the blueprint = FAIL.

### Check 8: ONE clear CTA
**PASS if:** Exactly one CTA, <=5 words, appears only at the end
**FAIL if:** Multiple CTAs, mid-roll CTA, or CTA >5 words

### Check 9: Captions for mute
**PASS if:** Key information appears as on-screen text (not just spoken)
**FAIL if:** Muted viewer would miss critical information

### Check 10: Visual changes every 1-2s
**PASS if:** Average cut/text/prop change interval is <=2 seconds
**FAIL if:** Any scene has >3 seconds without a visual change

## RULES

1. **Be honest, not generous.** A barely-passing screenplay should FAIL so it gets fixed.
2. **Specific feedback only.** Don't say "needs work" — say exactly what to add/change.
3. **Score < 7/10 = REJECT.** Do not approve for filming.
4. **Score 7-8/10 = CONDITIONAL PASS.** List exactly what to fix.
5. **Score 9-10/10 = APPROVE.** Ready for filming.
6. **Check 8 (CTA) is non-negotiable.** If CTA fails, automatic reject regardless of other scores.

## QUALITY CHECK
Before returning, verify:
- [ ] Every check has specific PASS/FAIL with detailed feedback?
- [ ] Score is honest (not inflated)?
- [ ] Summary gives clear next steps for failures?
- [ ] If score < 7, flagged as REJECT?
