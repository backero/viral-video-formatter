# SKILL: AI Nugget Extractor v2.2
## For Viral Video Production Form — Phase 1 (AI Nugget Extraction)
### Neuroscience-Backed Edition — Grounded in Meta TRIBE v2 Brain Encoding Research

---

## PURPOSE
Read a content writer's raw research dump (up to 40 pages of articles, stats, notes, links, or academic papers) and extract exactly 3 viral-worthy nuggets — one Shocking Fact, one Practical Hack, and one Story Hook — each optimized for specific brain activation patterns based on multimodal neuroscience research (d'Ascoli et al., 2026; TRIBE v2).

The three nuggets form a **Neural Escalation Sequence**:
- **Interrupt** (Shocking Fact) → Amygdala-driven, stops the scroll in <1.5 seconds
- **Engage** (Story Hook) → TPJ/social brain activation, builds empathy over 3-5 seconds
- **Commit** (Practical Hack) → Prefrontal cortex engagement, triggers "I should do this"

This sequence mirrors how the human brain processes naturalistic multimodal stimuli: fast subcortical response first, then social/emotional propagation, then deliberate prefrontal evaluation.

---

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

**If the input contains academic papers, preprints, or technical reports:**
- The best nuggets are rarely in the Abstract.
- Prioritize: **Discussion → Results → Introduction → Methods → References**
- **Mine the Limitations section aggressively.** Limitations contain the most pattern-interrupting hooks because they reveal irony, hidden flaws, or surprising contrasts. Example: "We built X for seniors, but tested it on 22-year-olds."
- **Mine Figures and Tables.** The most dramatic numbers (competition rankings, scaling curves, modality comparisons) are visualized, not narrated.
- **Ignore statistical coefficients unless framed as competitive achievements.** R=0.79 is boring. "Beat 263 teams" or "1,000 hours of data" is scroll-stopping.

---

## OUTPUT FORMAT
Return ONLY a JSON object with exactly 3 nuggets forming the Neural Escalation Sequence:

```json
{
  "neural_hook_architecture": "interrupt_engage_commit",
  "nuggets": [
    {
      "type": "Shocking Fact",
      "text": "73% of SaaS companies fail not because of their product, but because of poor onboarding",
      "source_hint": "Forbes 2024 research",
      "why_viral": "Counter-intuitive — people assume product quality determines success",
      "brain_system": "amygdala",
      "emotional_trigger": "Fear + Surprise (wasting effort on product when onboarding is the real problem)",
      "pattern_interrupt_score": 8,
      "pattern_interrupt_method": "Expectation violation — viewers expect product quality to matter most"
    },
    {
      "type": "Story Hook",
      "text": "I spent 3 months and $15,000 rebuilding our onboarding. The fix that actually worked? One email.",
      "source_hint": "Personal experience",
      "why_viral": "Relatable struggle + surprising twist + specific numbers",
      "brain_system": "tpj_social",
      "emotional_trigger": "Empathy + Relief + Curiosity (what was the email?)",
      "pattern_interrupt_score": 9,
      "pattern_interrupt_method": "Narrative inversion — expensive complex effort loses to free simple solution"
    },
    {
      "type": "Practical Hack",
      "text": "Change one welcome email → 40% less churn. No coding needed.",
      "source_hint": "Personal experience at LaunchPad",
      "why_viral": "Extremely actionable, zero cost, huge result",
      "brain_system": "prefrontal",
      "emotional_trigger": "Hope + Curiosity (easy fix for a hard problem — what was the email?)",
      "pattern_interrupt_score": 7,
      "pattern_interrupt_method": "Effort-reward mismatch — tiny action, massive result"
    }
  ]
}
```

---

## NEUROSCIENCE FOUNDATION

### Brain Systems Mapped to Nugget Types

This skill is grounded in findings from Meta's TRIBE v2 research (d'Ascoli et al., 2026), which used 1,000+ hours of fMRI data across 720 subjects to map how the human brain processes multimodal stimuli (video, audio, and text).

**Key findings applied:**

1. **Multimodal synergy:** Combining video + audio + text activates up to 50% more cortex than any single channel (d'Ascoli et al., 2026, Results 2.8). This validates that content delivered across multiple sensory channels achieves higher neural engagement.

2. **Temporal processing sequence:** Auditory input hits the primary auditory cortex first, then propagates to the language network over ~3 seconds, then reaches prefrontal regions for deliberate processing. Nuggets must be ordered to match this neural propagation timeline.

3. **Visual category specialization:** The brain has dedicated processing regions:
   - **FFA (Fusiform Face Area):** Faces → trust, attention, social engagement
   - **PPA (Parahippocampal Place Area):** Places/environments → context, aspiration
   - **EBA (Extrastriate Body Area):** Bodies/people in action → empathy, mirroring
   - **VWFA (Visual Word-Form Area):** Text/characters → instruction processing, learning

4. **Emotional vs. physical pain distinction:** The TPJ and MTG (middle temporal gyrus) process social/emotional pain, not physical. Story Hooks that invoke social struggles (rejection, failure, wasted effort) activate these regions more than physical hardship stories.

5. **Sentence complexity mapping:** Simple sentences and complex sentences activate different brain regions. Simple → fast processing (good for hooks). Complex with causal connectors → deeper prefrontal engagement (good for hacks).

### Brain System Reference for Emotional Triggers

| Brain System | Speed | Emotional Triggers | Best For |
|---|---|---|---|
| **Amygdala** (fast, automatic, subcortical) | <1 second | Fear, Anger, Surprise, Threat detection | Shocking Fact — stops the scroll before conscious thought |
| **TPJ/Social Brain** (temporo-parietal junction) | 3-5 seconds | Empathy, Social pain, Moral judgment, Narrative processing | Story Hook — builds connection through shared experience |
| **Prefrontal Cortex** (deliberate, evaluative) | 5-10 seconds | Curiosity, Hope, Decision conflict, Cost-benefit analysis | Practical Hack — triggers "I should try this" |
| **Reward Circuit** (dopamine, resolution) | Variable | Relief, Anticipation, Satisfaction, Vindication | Payoff/resolution — the emotional reward for watching |

---

## RULES

### A. Nugget-Specific Word Limits (differentiated by brain processing speed)

1. **Shocking Fact: max 15 words** — Simple structure (subject-verb-object). Must be processable in <1.5 seconds of audio. The amygdala responds to speed and contrast, not complexity.
2. **Story Hook: max 25 words** — Can use contrast structure ("I did X. The result was Y.") or question structure. The TPJ processes narrative arcs and needs slightly more input.
3. **Practical Hack: max 20 words** — Can include one causal connector ("because", "so", "→", ":"). The prefrontal cortex rewards structured actionability.

### B. Viral-Worthy Metric Hierarchy

4. **Must contain a viral-worthy number, percentage, or specific claim** — vague nuggets are rejected.

   **VIRAL-WORTHY METRIC HIERARCHY (ranked by scroll-stop power):**
   - 🔥 **Competitive Superiority:** "Beat 263 teams," "1st place out of 500," "outperformed 98% of baselines"
   - 🔥 **Scale/Time Contrast:** "1,000 hours of data → 24 hours on one GPU," "terabyte dataset processed on a laptop"
   - 🔥 **Rediscovery/Validation:** "AI rediscovered brain areas scientists mapped over 20 years," "matched 20 years of experiments with one test"
   - 🔥 **Architecture Irony:** "10 scanners + 4 AI models = 1 Python line... it processes nothing," "does everything by orchestrating everything else"
   - 🔥 **Zero-Shot Generalization:** "Predicts new subjects without retraining," "works on data it was never trained on"
   - 🔥 **Cross-Modal Synergy:** "Adding sound + text to video boosted accuracy by 50%," "three senses together beat any single sense"
   - 🔥 **Scaling Law:** "Accuracy keeps improving with more data — no ceiling found yet," "log-linear growth without plateau"
   - ⚠️ **Population Scale:** "720 subjects," "1 billion parameters," "29,000 brain vertices predicted"
   - ❌ **BORING — Reject unless reframed:** p-values, correlation coefficients, standard deviations, confidence intervals, parameter counts without context, sample sizes without contrast

### C. Forbidden Phrases

5. **Must not contain these forbidden phrases:**
   - "revolutionary", "game-changing", "groundbreaking"
   - "amazing", "incredible", "awesome"
   - "unlock", "discover", "unleash"
   - "in today's world", "in this video", "let's talk about"
   - "things", "stuff", "tips" (use specific nouns)
   - "hack" when used as a noun (use specific action verb instead)
   - **Academic fluff:** "promising approach", "further research needed", "our findings suggest", "novel framework", "this study aimed to", "it is thought that", "we believe that", "future work will"

### D. Emotional Trigger Requirements

6. **Each nugget must target at least one primary brain system** from the Brain System Reference table, with the emotional trigger explicitly tied to that system.

### E. Pattern Interrupt Scoring

7. **Each nugget must include a `pattern_interrupt_score`** (1-10) measuring how much it violates viewer expectations. Score it based on:
   - **Expectation violation** (what they assume vs. reality): +3
   - **Effort-reward mismatch** (tiny effort, huge result OR huge effort, no result): +3
   - **Narrative inversion** (story goes opposite of expected direction): +2
   - **Specificity shock** (surprisingly precise numbers where vague is expected): +2
   - Minimum acceptable score: **6/10**

### F. Academic Paper Rules

8. **If a paper has a Limitations section, you MUST extract at least one nugget from it.** Limitations are the #1 source of pattern-interrupting Story Hooks.

9. **Paper Type Detection:**
   - **Results paper** (new findings, experiments, benchmarks) → angle: superiority over humans/baselines, rediscovery of known science, competitive ranking, scaling law
   - **Methods/Software paper** (tool, framework, pipeline) → angle: orchestration without processing, one-line scaling, fragmentation solution, architecture irony
   - **Product Development paper** (food, hardware, design) → angle: the fix was surprisingly simple, the target user never tested it, one ingredient changed everything

10. **Figure/Table Mining:** Scan tables, figures, and captions — not just Abstract. The best numbers (263 teams, 50% gain, 1,000 hours, log-linear curve) are visualized.

### G. Multi-Paper Synthesis

11. **If 2+ documents provided:** After extracting single-paper nuggets, check for cross-paper hooks: same lab/company, complementary tools, or ironic contrasts. If a cross-paper nugget is stronger than any single-paper nugget, replace the weakest nugget with it.

### H. Error Handling

12. **If research is insufficient** (less than 100 characters), return error:
    ```json
    {"error": "Insufficient research. Minimum 100 characters required."}
    ```
13. **If fewer than 3 viable nuggets found**, return the best available with a note:
    ```json
    {"nuggets": [...], "note": "Only X viable nuggets found from this research. Consider adding more specific data or personal experiences."}
    ```

---

## QUALITY CHECK — NEURAL ENGAGEMENT VERIFICATION

Before returning, verify each nugget against this checklist:

### Surface Check
- [ ] Within word limit for its type? (15 / 25 / 20)
- [ ] Contains a specific viral-worthy number/name/claim (from the hierarchy in Rule 4)?
- [ ] No forbidden phrases?
- [ ] Clear emotional trigger tied to a brain system?
- [ ] Is it about the VIEWER'S problem (not the creator's)?

### Neural Engagement Check
- [ ] Does it target at least ONE primary brain system (amygdala / tpj_social / prefrontal)?
- [ ] Pattern interrupt score ≥ 6?
- [ ] Does the nugget create a multimodal synergy (the combination of claim + number + contrast communicates more than any single element)?

### Sequence Architecture Check (validates the 3 nuggets as a system)
- [ ] Does the Shocking Fact create an amygdala response BEFORE the viewer can rationalize?
- [ ] Does the Story Hook build on the shock by adding a human/social dimension via TPJ?
- [ ] Does the Practical Hack convert the emotional state into a concrete action via prefrontal engagement?
- [ ] Do all three nuggets point to the SAME core insight from different neural angles?
- [ ] Would removing any one nugget break the emotional escalation?
- [ ] **Limitation or hidden irony exploited?** (mandatory for at least one nugget if academic paper)
- [ ] **Cross-paper synthesis checked?** (if 2+ documents provided)

---

## EXAMPLE: BAD vs GOOD NUGGETS

### Shocking Fact (max 15 words, amygdala-targeted)

| BAD (Reject) | Why Bad | GOOD (Accept) | Why Good |
|---|---|---|---|
| "Onboarding is really important for SaaS" | No number, no contrast, no amygdala trigger | "73% of SaaS fails from bad onboarding, not bad product" | Number + expectation violation → amygdala fires |
| "Most companies don't invest enough in their onboarding experience" | 10 words but vague, no surprise | "9 out of 10 users quit before seeing your best feature" | Specific ratio + loss framing → fear response |
| "TRIBE v2 achieves high correlation with brain data" | No viral metric, boring stat | "Meta's AI predicts your brain better than you can replicate it" | Superiority over self → surprise |

### Story Hook (max 25 words, TPJ-targeted)

| BAD (Reject) | Why Bad | GOOD (Accept) | Why Good |
|---|---|---|---|
| "I learned a lot about user onboarding" | No conflict, no numbers, no narrative arc | "I spent $15K on onboarding. The fix was one free email." | Social pain (wasted money) + narrative inversion → TPJ + relief |
| "Our team worked hard to improve onboarding last year" | No specific struggle, no twist, no empathy trigger | "My co-founder quit over our 90% churn rate. Then I found the fix in a Reddit comment." | Relationship pain + specificity + unexpected resolution → deep TPJ |
| "The tool supports lazy loading and caching" | No human element, no struggle | "Neuroscientists spend 80% of time rewriting pipelines. One tool finally unifies all of them." | Professional pain + scale + solution → empathy + relief |

### Practical Hack (max 20 words, prefrontal-targeted)

| BAD (Reject) | Why Bad | GOOD (Accept) | Why Good |
|---|---|---|---|
| "You should fix your onboarding flow" | No specificity, no result promise, no action | "Change one welcome email → 40% less churn. No coding." | Specific action + quantified result → prefrontal reward |
| "Try to make your onboarding better by testing things" | Vague action, no number, uses "things" | "Add one question to signup → segment users → 3x activation" | Step-by-step chain + metric → actionable dopamine |
| "The tool can process brain data efficiently" | No specific action, no result | "Switch one config flag → your script runs on 100 nodes. Same code." | One action + massive scale + zero friction → hope + commitment |

---

## ADVANCED: WHY THIS ARCHITECTURE WORKS

The Neural Escalation Sequence (Interrupt → Engage → Commit) maps directly to how the brain processes naturalistic multimodal stimuli:

1. **Interrupt (Shocking Fact):** The amygdala processes threat/novelty signals BEFORE the cortex. This hijacks attention at a subcortical level. The viewer hasn't decided to watch yet; they're being neurologically compelled to.

2. **Engage (Story Hook):** Once attention is captured, the signal propagates from primary auditory cortex through the language network to the TPJ over approximately 3 seconds. The Story Hook exploits this propagation window — it arrives exactly when the brain is ready to process social/narrative information.

3. **Commit (Practical Hack):** The prefrontal cortex is the last to fully engage. It evaluates cost-benefit, plans actions, and processes instructions. The Practical Hack arrives when the viewer is emotionally invested (amygdala + TPJ already active) and neurologically ready to process actionable information.

This sequence creates a "neural cascade" — each stage amplifies the next, resulting in higher total engagement than any single nugget could achieve alone.

---

## RESEARCH CITATIONS

- d'Ascoli, S., Rapin, J., Benchetrit, Y., et al. (2026). "A foundation model of vision, audition, and language for in-silico neuroscience." FAIR at Meta. — Establishes multimodal brain encoding patterns, visual category specialization, temporal processing sequences, and multimodal synergy gains (up to 50% encoding score increase for multimodal vs. unimodal).
- King, J-R., Bel, C., Evanson, L., et al. (2026). "NeuralSet: A High-Performing Python Package for Neuro-AI." FAIR at Meta. — Provides the event-driven architecture framework for treating content as temporally structured multimodal events.
