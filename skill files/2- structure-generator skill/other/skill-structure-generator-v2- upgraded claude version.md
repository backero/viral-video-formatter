# SKILL: AI Structure Generator v2
## For Viral Video Production Form — Phase 2 (Structure Review)
## Neuroscience-Conditioned Hook Architecture

---

## PURPOSE
Take the selected nugget + topic sentences + value delivery info and generate the complete video structure: content type, format, script template, 3 hooks (visual/written/audio), and CTA.

This version applies findings from multimodal neuroscience research — specifically tri-modal (video, audio, language) brain encoding models and category-selective neural processing — to condition how each hook is constructed, timed, and rated. The goal is to align hook design with how the human brain actually processes visual, auditory, and linguistic stimuli within the first 0–3 seconds of exposure.

---

## NEUROSCIENCE FOUNDATION

### Source Research

**TRIBE v2** (d'Ascoli et al., 2026 — FAIR at Meta): A tri-modal foundation model trained on 1,000+ hours of fMRI across 720 subjects, demonstrating that the brain processes video, audio, and text through distinct but deeply interconnected neural pathways. Key findings applied here:
- The brain has category-selective visual areas: FFA (faces), PPA (places/scenes), EBA (bodies/gestures), VWFA (written text) — each responds maximally to its stimulus category
- Multimodal stimuli that combine visual + audio + text produce up to 50% stronger activation at the temporal-parietal-occipital junction versus any single modality alone
- Audio dominates near auditory cortex; video dominates occipital and parietal cortices; text/semantic content dominates language processing cortices AND the prefrontal lobe (decision-making)
- Emotional content (vs neutral) selectively activates the temporo-parietal junction (TPJ) and middle temporal gyrus (MTG)
- Language response begins at ~3s in primary auditory cortex, then propagates across the entire language network
- Independent component analysis reveals five learned brain networks: primary auditory, language, motion detection, default mode, and visual system — the model's tri-modal architecture mirrors these divisions

**NeuralSet** (King, Bel, Evanson et al., 2026 — FAIR at Meta): A unified Python framework for neuro-AI that enforces temporal alignment of neural recordings with pretrained deep learning embeddings across modalities. Key design principles applied here:
- Temporal alignment across modalities is mandatory — misaligned signals degrade processing
- Static stimuli (a single image, a word) and dynamic stimuli (continuous audio, video) require different handling but must converge on a shared timeline
- The "trigger event" concept: specific onsets (word appearance, scene change, sound spike) anchor the brain's processing window
- Segmentation architecture: how you slice temporal windows determines what information the brain captures and retains

### Core Principle: Tri-Modal Synchronization

The human brain does not process a video hook as one event. It runs three parallel processing pipelines that converge:

```
VISUAL PIPELINE (fastest — ~100ms)
  → V1/V2/V3 (edge detection, contrast, color)
  → V4/MT (shape, motion)
  → FFA/PPA/EBA/VWFA (category recognition)
  → Ventral stream (object identity) + Dorsal stream (spatial/motion)

AUDITORY PIPELINE (~150ms)
  → Primary auditory cortex (A1)
  → Associative auditory cortex (A5)
  → Superior temporal sulcus (STS) — speech processing
  → Broca's area (45) — linguistic decoding

TEXT/SEMANTIC PIPELINE (~200–300ms for written text)
  → VWFA (visual word form area — reads the on-screen text)
  → Language network (left-lateralized)
  → Prefrontal cortex (semantic evaluation, decision-making)

CONVERGENCE ZONE: Temporal-Parietal-Occipital Junction
  → Multimodal integration — up to 50% stronger activation
  → This is where "stopping the scroll" happens neurally
```

All three hooks must fire within the same 0–3s window to trigger convergence. Misalignment (e.g., text appears at 2s but audio starts at 0s with no visual action) weakens the multimodal integration signal.

---

## INPUT FORMAT
The user provides:
```json
{
  "selected_nugget": {
    "type": "Shocking Fact | Practical Hack | Story Hook | Comparison | Proof/Case Study",
    "text": "The core nugget text"
  },
  "topic": {
    "teaches": "What the video teaches",
    "cares": "Why the viewer cares",
    "proof": "Why they should trust you"
  },
  "value": {
    "takeaway": "What the viewer can do after watching",
    "style": "Demonstration | Tutorial | Narrative | Debate | Reveal",
    "time_to_value": "0-3s | 3-8s | 8-15s"
  },
  "platform": "Instagram | TikTok | YouTube Shorts | Facebook Reels",
  "estimated_length": "15-30s | 30-60s | 60-90s",
  "reference_video": {
    "url": "optional URL",
    "copying": "Hook Only | Structure | Full Clone",
    "description": "What specifically to reference"
  }
}
```

---

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
      "neural_targets": ["FFA — face close-up triggers fusiform face area", "VWFA — on-screen number activates visual word form area", "V1-V4 — red-on-dark contrast drives early visual cortex"],
      "category_triggers": ["face", "text_overlay", "high_contrast"],
      "motion_type": "dynamic — facial expression shift from neutral to shock",
      "sync_window": "0.0-0.5s",
      "quality_rating": "GREAT",
      "quality_reason": "Activates 3 category-selective areas simultaneously (FFA + VWFA + early visual via contrast). Dynamic facial expression adds motion processing (MT/V5). Multi-target visual hook."
    },
    "written": {
      "text": "73% fail from THIS",
      "word_count": 4,
      "neural_targets": ["VWFA — short text string for rapid visual word recognition", "Prefrontal cortex — specific number triggers quantitative evaluation"],
      "processing_load": "LOW — 4 words, single fixation scan possible",
      "semantic_density": "HIGH — number + verb + mystery pronoun",
      "sync_window": "0.0-0.3s",
      "quality_rating": "GREAT",
      "quality_reason": "Under 8 words enables single-fixation VWFA processing. Specific number (73%) activates prefrontal quantitative circuits. Deictic pronoun (THIS) creates open prediction loop that the default mode network must resolve."
    },
    "audio": {
      "description": "Energetic, slightly concerned tone: 'What if I told you 73% of SaaS companies...'",
      "neural_targets": ["A1/A5 — voice onset triggers primary and associative auditory cortex", "TPJ — emotional prosody (concern) activates temporo-parietal junction", "STS — speech stream activates superior temporal sulcus"],
      "prosody_profile": {
        "energy": "HIGH — above conversational baseline",
        "emotion": "concern/urgency — activates TPJ emotional processing",
        "pacing": "FAST onset, SLOW on the number — creates temporal contrast",
        "first_word_onset": "0.0s — immediate, no dead air"
      },
      "sync_window": "0.0-1.5s",
      "quality_rating": "GOOD",
      "quality_reason": "Strong auditory onset with emotional prosody activating TPJ. Direct address ('you') engages default mode network (self-referential processing). However, 'What if I told you' is a patterned phrase — auditory cortex may classify as predictable, reducing novelty signal. Consider a sharper opener."
    },
    "multimodal_sync": {
      "alignment": "CONVERGED — all three hooks fire within 0-1.5s window",
      "convergence_zone_activation": "HIGH — visual (face + number) + audio (voice + emotion) + text (stat) all hit temporal-parietal-occipital junction simultaneously",
      "congruence": "MATCHED — all three modalities deliver the same core message (73% stat)",
      "silent_mode_viability": "STRONG — visual hook + written hook carry the message without audio (85% of social video consumed without sound)"
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

---

## RULES

### Rule Set 1: Content Type and CTA Matching

1. **Content type MUST match the nugget type:**
   - Shocking Fact → Educational or Authority
   - Practical Hack → Educational
   - Story Hook → Storytelling
   - Comparison → Comparison
   - Proof/Case Study → Authority
2. **CTA MUST match content type:**
   - Educational → Follow/Save
   - Storytelling → Follow
   - Authority → Comment then DM
   - Personal → Follow
   - Comparison → Comment

### Rule Set 2: Format and Structure Selection

3. **Written hook max 8 words** (neural basis: VWFA processes optimally with single-fixation text strings; beyond 8 words requires saccadic eye movements that add ~200ms per fixation)
4. **CTA max 5 words**
5. **Format tier is based on nugget type:**
   - Comparison/Debate topics → S-Tier (Clone, Talking Back & Forth)
   - Tutorial/How-to → S-Tier (Visual Prop Explainer) or A-Tier (Voiceover)
   - Story/Personal → A-Tier (Voiceover + Visuals)
6. **Structure is based on nugget type:**
   - Shocking Fact → Structure 1 (Comparison) or 6 (Myth Bust)
   - Practical Hack → Structure 2 (Step-by-Step) or 7 (List) or 9 (PAS)
   - Story Hook → Structure 3 (Story Framework) or 11 (Before→After)
   - Comparison topic → Structure 4 (Smart vs Dumb) or 5 (Do vs Don't)
   - Proof/Case study → Structure 12-15 (B-Tier)

### Rule Set 3: Neural Conditioning for Visual Hook

7. **Visual hook MUST activate at least 2 category-selective brain areas:**

   | Brain Area | Triggered By | Processing Speed | Engagement Level |
   |---|---|---|---|
   | FFA (Fusiform Face Area) | Faces, facial expressions, eye contact | ~170ms | HIGHEST — hardwired face detection |
   | PPA (Parahippocampal Place Area) | Scenes, environments, locations, rooms | ~200ms | HIGH — contextual anchoring |
   | EBA (Extrastriate Body Area) | Body parts, hand gestures, physical actions | ~190ms | HIGH — action prediction |
   | VWFA (Visual Word Form Area) | On-screen text, numbers, written words | ~200ms | HIGH — semantic activation |
   | MT/V5 (Motion Area) | Movement, scene changes, dynamic transitions | ~100ms | HIGHEST — pre-attentive, automatic |
   | V1-V4 (Early Visual Cortex) | High contrast, bold colors, edges, patterns | ~50-80ms | AUTOMATIC — cannot be suppressed |

   **Combination rules:**
   - Face + Text Overlay = FFA + VWFA = strong dual activation (recommended for authority/educational content)
   - Face + Motion = FFA + MT/V5 = maximum pre-attentive capture (recommended for storytelling hooks)
   - Text + High Contrast = VWFA + V1-V4 = fastest semantic processing (recommended for stat-based hooks)
   - Scene + Body + Motion = PPA + EBA + MT/V5 = immersive action (recommended for demonstration hooks)
   - Face + Scene = FFA + PPA = person-in-context (recommended for story/before-after hooks)

8. **Visual hook quality rating criteria (neurally grounded):**
   - **GREAT**: Activates 3+ category-selective areas; includes motion or dynamic element; includes high-contrast visual element; passes the silent-mode test (message clear without audio)
   - **GOOD**: Activates 2 category-selective areas; some motion or action; face visible
   - **BAD**: Activates only 1 area OR static frame with no motion OR talking head with no overlay → **REJECT**. Neural basis: single-area activation produces weak, easily-suppressed signal that loses the competitive inhibition race against the next scroll candidate

### Rule Set 4: Neural Conditioning for Written (Text) Hook

9. **Written hook MUST optimize for VWFA processing speed and prefrontal engagement:**

   | Principle | Rule | Neural Basis |
   |---|---|---|
   | Brevity | Max 8 words, target 4-6 | VWFA processes short strings in a single fixation (~200ms). Each additional saccade adds ~200ms processing time. |
   | Number inclusion | Include a specific number when the nugget contains one | Numbers activate prefrontal quantitative evaluation circuits; "73%" is processed differently (and faster) than "most" |
   | Curiosity gap | End with an open referent (THIS, one thing, the reason) | Unresolved references activate the default mode network's predictive processing — the brain must keep watching to close the loop |
   | Contrast words | Use opposition words (fail/win, wrong/right, stop/start) | Semantic opposition activates bilateral processing and increases encoding depth |
   | Concrete nouns | Prefer tangible over abstract | Concrete nouns activate both language and sensory cortices (dual-coding); abstract nouns activate language cortex alone |
   | Placement | Top-third of frame, minimum 48pt equivalent on mobile | VWFA is served by the foveal visual field; text outside the natural scan path requires an additional saccade |

   **Processing load classification:**
   - **LOW** (target): 3-5 words, one clause, single fixation → fastest VWFA decode
   - **MEDIUM**: 6-8 words, may require one saccade → acceptable
   - **HIGH** (reject): 9+ words, multiple clauses → requires serial reading, viewer scrolls before completion

   **Semantic density classification:**
   - **HIGH** (target): Every word carries meaning; no filler (e.g., "73% fail from THIS" — 4 words, zero filler)
   - **MEDIUM**: One filler word acceptable (e.g., "Here's why 73% of startups fail")
   - **LOW** (reject): Multiple filler words dilute the signal (e.g., "Did you know that about 73% of startups...")

### Rule Set 5: Neural Conditioning for Audio Hook

10. **Audio hook MUST optimize for auditory cortex onset response, emotional prosody, and speech-to-language propagation:**

    | Principle | Rule | Neural Basis |
    |---|---|---|
    | Zero dead air | First phoneme at t=0.0s | Primary auditory cortex (A1) fires on sound onset; silence at video start means zero auditory cortex activation, yielding a weaker multimodal integration signal |
    | Emotional prosody | Voice must carry detectable emotion (urgency, excitement, concern, disbelief) | Emotional prosody activates TPJ and MTG — the same regions that process social cognition and empathy. Flat/neutral tone bypasses these areas. |
    | Temporal contrast | Vary pacing within the hook — fast-slow or slow-fast | Auditory cortex habituates rapidly to constant-rate stimuli; tempo changes reset the attention signal |
    | Vocal energy | Above conversational baseline for first 2 words | Higher vocal energy produces larger auditory evoked potentials, increasing signal-to-noise ratio in the auditory cortex |
    | Direct address | Use "you" or "your" in the first sentence | Self-referential language activates the default mode network (medial prefrontal cortex), which is typically suppressed during passive scrolling — reactivation creates a "snap to attention" effect |
    | Pattern disruption | Avoid overused openers that auditory cortex classifies as predictable | The brain's prediction system (based on prior exposure) suppresses neural response to expected stimuli. "What if I told you," "Stop scrolling," "Nobody talks about this" are pattern-matched and partially suppressed. Novel openers generate stronger mismatch negativity signals. |

    **Prosody profile schema:**
    ```
    energy:      LOW | MEDIUM | HIGH
    emotion:     neutral | curiosity | urgency | concern | excitement | disbelief | authority
    pacing:      constant | accelerating | decelerating | variable
    first_word_onset: [timestamp in seconds — must be 0.0s]
    ```

    **Audio quality rating criteria (neurally grounded):**
    - **GREAT**: Immediate onset (0.0s); detectable emotional prosody; variable pacing; novel phrasing; direct address ("you/your"); activates A1 + TPJ + default mode network
    - **GOOD**: Immediate onset; some prosody; direct address present; but phrasing may be patterned/predictable
    - **BAD**: Delayed onset (dead air > 0.5s) OR flat prosody OR no direct address OR heavily patterned opener → **FLAG FOR REVISION**

### Rule Set 6: Multimodal Synchronization

11. **All three hooks MUST be evaluated as a synchronized system:**

    | Sync Property | Target | Neural Basis |
    |---|---|---|
    | Temporal alignment | All hooks fire within 0-1.5s window | TRIBE v2 demonstrates that multimodal integration at TPO junction requires temporal co-occurrence; asynchronous signals are processed as separate unimodal events with no integration boost |
    | Semantic congruence | All three hooks deliver the same core message | Congruent multimodal signals amplify activation at convergence zones; incongruent signals create interference (useful for surprise hooks but costly if unintentional) |
    | Silent-mode viability | Visual + written hooks must carry 100% of the message without audio | 85% of social video is consumed without sound; if the message requires audio to be understood, you lose the majority of potential viewers on the first pass |
    | Redundancy ladder | Visual shows → Written names → Audio explains | Matching the natural processing order: visual is fastest (50-100ms), written text is next (200ms), audio/language is slowest (300ms+). Each modality should add a layer rather than merely repeat. |

    **Synchronization rating:**
    - **CONVERGED**: All three hooks fire within 0-1.5s; semantically congruent; silent-mode viable; each modality adds a layer
    - **PARTIAL**: Two of three hooks are synchronized; one is delayed or misaligned
    - **FRAGMENTED**: Hooks fire at different times or deliver conflicting messages → **RESTRUCTURE REQUIRED**

---

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
- Vague motivational talk — activates no specific brain area strongly; produces diffuse, weak cortical signal
- Generic advice without mechanism — prefrontal cortex disengages when no causal chain is presented
- Tips without cause→effect — fails to activate the brain's prediction and reward systems
- Single-modality hooks (audio-only or text-only with static visual) — misses the 50% multimodal integration boost

---

## STRUCTURE-TO-HOOK NEURAL MAPPING

Each structure family has an optimal hook configuration based on the neural processing it demands:

### Decision Family (Structures 1, 4, 5, 6)
**Visual hook priority**: Show the contrast visually — two objects, two states, or a before/after split screen
- **Primary targets**: V1-V4 (contrast detection), FFA if faces are involved
- **Optimal visual format**: Split screen, side-by-side, or rapid cut between two states
- **Written hook**: Must contain the opposition (A vs B, right vs wrong, myth vs reality)
- **Audio hook**: Authoritative tone; state the claim with certainty or challenge it directly

### Education Family (Structures 2, 7, 8, 9, 10)
**Visual hook priority**: Show the end result or the tool/method first (outcome-first priming)
- **Primary targets**: EBA (hands demonstrating), VWFA (step labels on screen), MT/V5 (process in motion)
- **Optimal visual format**: Hands-on demonstration, screen recording, or prop-based explainer
- **Written hook**: Promise the outcome (a number, a timeframe, a transformation)
- **Audio hook**: Instructional tone with urgency; "Here's the [X]-step method that..."

### Trust Family (Structures 3, 11)
**Visual hook priority**: Show the emotional state or the transformation moment
- **Primary targets**: FFA (emotional expression), TPJ (social cognition via expression), PPA (contextual scene)
- **Optimal visual format**: Close-up face showing emotion, then wide shot showing context
- **Written hook**: Name the emotional journey (struggle, transformation, failure, comeback)
- **Audio hook**: Narrative tone; emotional prosody is critical — voice must carry the feeling, not just the words

### Proof Family (Structures 12, 13, 14, 15)
**Visual hook priority**: Show the evidence, the data, or the physical proof
- **Primary targets**: VWFA (numbers, data on screen), V1-V4 (charts, graphs, high-contrast evidence), EBA (physical demonstration)
- **Optimal visual format**: Screen capture of results, physical product shown, time-lapse, or data visualization
- **Written hook**: Lead with the specific result or number
- **Audio hook**: Calm authority; let the evidence speak — over-hyped prosody undermines proof credibility

---

## VISUAL STIMULUS CATEGORY REFERENCE

When constructing the visual hook description, tag which stimulus categories are present. This determines which brain areas will be activated:

| Stimulus Category | Brain Area Activated | Response Latency | Tag |
|---|---|---|---|
| Human face (any angle, any expression) | FFA (fusiform face area) | ~170ms | `face` |
| Human face showing emotion | FFA + amygdala + TPJ | ~170ms + ~250ms | `face_emotion` |
| Human body, hands, gestures | EBA (extrastriate body area) | ~190ms | `body` |
| Scene, room, environment, landscape | PPA (parahippocampal place area) | ~200ms | `scene` |
| On-screen text, numbers, labels | VWFA (visual word form area) | ~200ms | `text_overlay` |
| Movement, scene change, transition | MT/V5 (motion area) | ~100ms | `motion` |
| High-contrast color, bold edges | V1-V4 (early visual cortex) | ~50-80ms | `high_contrast` |
| Tool, object, product | LOC (lateral occipital complex) | ~200ms | `object` |
| Written characters, symbols | VWFA | ~200ms | `characters` |

**Minimum for GREAT visual hook**: 3+ tags present
**Minimum for GOOD visual hook**: 2 tags present
**Automatic BAD**: 1 tag or 0 tags

---

## AUDIO PROSODY CONDITIONING REFERENCE

When constructing the audio hook description, specify the prosody profile. Each profile element maps to a specific neural processing system:

| Prosody Element | Neural Target | Effect on Engagement |
|---|---|---|
| High vocal energy (loud, projected) | Increased auditory evoked potential amplitude in A1 | Higher signal-to-noise ratio; harder for the brain to ignore |
| Emotional coloring (not flat) | TPJ + MTG activation (emotional/social cognition) | Activates empathy and social processing circuits; creates personal connection |
| Tempo variation (fast-slow shifts) | Auditory cortex habituation reset | Constant tempo leads to neural adaptation (tuning out); variation resets the attention signal |
| Pitch variation (not monotone) | Prosodic processing in right superior temporal gyrus | Pitch contours carry emotion and emphasis; monotone signals are processed as background |
| Immediate onset (t=0.0s) | Auditory onset response in A1 | The auditory system's strongest response is to onset — silence at the start is wasted neural real estate |
| Direct address ("you," "your") | Default mode network reactivation (medial prefrontal cortex) | Self-referential processing reactivates the network that passive scrolling suppresses |
| Novel phrasing | Mismatch negativity response | The brain compares incoming audio to stored templates; novel patterns generate a stronger neural "surprise" signal |

---

## WRITTEN TEXT CONDITIONING REFERENCE

When constructing the written hook text, apply these constraints derived from VWFA processing research and language network lateralization:

| Property | Optimal Range | Neural Basis |
|---|---|---|
| Word count | 4-6 words (max 8) | VWFA processes short strings in a single fixation. Beyond 8 words requires saccadic eye movements adding ~200ms per fixation. |
| Font weight | Bold/heavy | V1-V4 respond more strongly to high-contrast, thick-edge stimuli |
| Number presence | Include when available | Prefrontal quantitative evaluation circuits activate specifically for numerals; "73%" produces different (stronger) activation than "most" |
| Curiosity gap | One unresolved referent | Default mode network must keep watching to resolve open references; "THIS," "one thing," "the reason" create prediction errors the brain must close |
| Semantic opposition | Include contrast words | Bilateral language processing for opposition increases encoding depth (processed by both hemispheres) |
| Concrete over abstract | Prefer tangible nouns | Concrete nouns activate language + sensory cortices (dual-coding theory); abstract nouns activate language alone |
| Uppercase placement | One emphatic word in CAPS | VWFA treats all-caps differently; single CAPS word in otherwise lowercase string creates a visual pop-out effect |

---

## Structure Selection Rules
- Shocking Fact → Structure 1 (Comparison) or 6 (Myth Bust)
- Practical Hack → Structure 2 (Step-by-Step) or 7 (List) or 9 (PAS)
- Story Hook → Structure 3 (Story Framework) or 11 (Before→After)
- Comparison topic → Structure 4 (Smart vs Dumb) or 5 (Do vs Don't)
- Proof/Case study → Structure 12-15 (B-Tier)

## Custom Structure Support
If the user specifies a structure not in the 15, use the closest match and note: "Using structure #[X] ([Name]) as closest match. To add custom structures, contact your admin."
The system supports up to 99 total structures (15 built-in + 84 custom slots).

---

## QUALITY CHECK

Before returning, verify ALL of the following:

### Content and Structure Checks
- [ ] Content type matches nugget type?
- [ ] CTA matches content type?
- [ ] Structure matches nugget type (per selection rules)?

### Written Hook Checks
- [ ] Written hook ≤ 8 words?
- [ ] Processing load classified as LOW or MEDIUM (not HIGH)?
- [ ] Semantic density classified as HIGH or MEDIUM (not LOW)?
- [ ] CTA ≤ 5 words?

### Visual Hook Checks
- [ ] Visual hook activates ≥ 2 category-selective brain areas?
- [ ] Category triggers tagged?
- [ ] Motion or dynamic element present?
- [ ] Visual hook rated honestly using neural criteria (not auto-GREAT)?
- [ ] Silent-mode test passed (message clear without audio)?

### Audio Hook Checks
- [ ] Audio onset at t=0.0s (no dead air)?
- [ ] Emotional prosody specified (not flat/neutral)?
- [ ] Direct address ("you/your") present in first sentence?
- [ ] Phrasing novelty assessed (not a patterned/overused opener)?
- [ ] Prosody profile filled: energy, emotion, pacing, first_word_onset?

### Multimodal Synchronization Checks
- [ ] All three hooks fire within 0-1.5s window?
- [ ] Semantic congruence across all three modalities?
- [ ] Silent-mode viability confirmed?
- [ ] Redundancy ladder applied (visual shows → written names → audio explains)?
- [ ] Multimodal sync rated as CONVERGED?

---

## APPENDIX: NEURAL PROCESSING TIMELINE FOR THE FIRST 3 SECONDS

This timeline shows what the brain does during the critical hook window, based on TRIBE v2's in-silico experiments and established visual/auditory neuroscience:

```
t = 0.000s  VISUAL: Light hits retina
t = 0.050s  V1-V4: Edge detection, contrast, color processing (AUTOMATIC — cannot be overridden)
t = 0.100s  MT/V5: Motion detection fires (if motion present)
            → This is the "scroll stopper" — motion detection is pre-attentive
t = 0.150s  AUDITORY: A1 onset response to first phoneme (if audio present)
t = 0.170s  FFA: Face detection fires (if face present)
            → Highest-priority social stimulus; face detection is semi-automatic
t = 0.190s  EBA: Body/gesture detection fires (if body visible)
t = 0.200s  PPA: Scene/place recognition fires (if scene visible)
            VWFA: Written text recognized (if text overlay present)
            → Text processing begins but semantic extraction takes ~100ms more
t = 0.250s  Amygdala: Emotional salience evaluation (if emotional content detected)
t = 0.300s  LANGUAGE NETWORK: Semantic processing of written text and first spoken words
            Prefrontal cortex: Begins evaluating relevance and truth value
t = 0.500s  DEFAULT MODE NETWORK: Self-referential processing if "you/your" detected
            → This is the "personal relevance" signal — "this is about ME"
t = 1.000s  TPO JUNCTION: Multimodal integration peaks
            → This is where the three modalities converge into a single percept
            → If all three hooks are congruent, activation here is up to 50% stronger
t = 1.500s  EXECUTIVE NETWORK: Conscious decision — keep watching or scroll
            → This is the point of no return; if the brain hasn't found enough signal, the thumb scrolls
t = 3.000s  FULL LANGUAGE PROPAGATION: First spoken sentence fully processed
            → Audio hook's semantic content is now fully decoded
            → If the viewer is still here, they've committed to at least the next segment
```

This timeline demonstrates why all three hooks must fire in the first 0-1.5 seconds: multimodal integration at the TPO junction peaks at ~1s, and the conscious scroll/stay decision happens at ~1.5s. Anything that arrives after this window is processed only if the viewer has already decided to stay.
