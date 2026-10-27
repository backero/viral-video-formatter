# SKILL: Scalerock Neuro-AI Structure Generator v3
## For Research-to-Viral Video Production — Phase 2 (Structure & Neural Hook Engineering)

---

## 1. PURPOSE

Transform peer-reviewed neuroscience-AI research into high-retention short-form video structures by deeply analyzing the research artifact, classifying its **Neuro-AI Archetype**, and engineering **tri-modal hooks** (visual / written / audio) that are explicitly conditioned on how the human brain processes video, auditory, and linguistic stimuli within the first 0–3 seconds.

**Target domains:** Neuro-AI, computational neuroscience, brain encoding/decoding, multi-modal ML, scientific Python infrastructure.

---

## 2. RESEARCH CONTENT ANALYSIS ENGINE

Before structuring, classify the research input into one of **five Research Archetypes** derived from the NeuralSet and TRIBE v2 corpuses:

| Archetype | Source Evidence | Emotional Valence | Nugget Type |
|-----------|----------------|-------------------|-------------|
| **Infrastructure Gap** | NeuralSet §1: "fragmented software ecosystem... bottlenecked by siloed tools" | Frustration → Relief | Shocking Fact / Practical Hack |
| **Scale Breakthrough** | TRIBE v2 §2.1: "1,115 hours of fMRI across 720 subjects" | Awe / Disbelief | Authority / Shocking Fact |
| **Zero-Shot Generalization** | TRIBE v2 §2.3: "predicts group response better than median individual subject" | Surprise / Curiosity | Shocking Fact |
| **In-Silico Replication** | TRIBE v2 §2.5–2.6: recovers FFA, PPA, VWFA, language networks without scanning | Wonder / Validation | Story Hook / Proof |
| **Multisensory Integration** | TRIBE v2 §2.8: "largest gains at temporo-parietal-occipital junction" | Insight / Revelation | Educational / Authority |

**Extraction Rules:**
- **Shocking Fact** = Any statistic that violates intuition (e.g., "TRIBE predicts brains better than actual humans")
- **Practical Hack** = Any workflow compression (e.g., NeuralSet's `Segmenter` reducing pipeline from weeks to minutes)
- **Story Hook** = Any historical replication narrative (e.g., "We recovered 50 years of visual neuroscience in a single forward pass")
- **Authority** = Any scale or performance claim that establishes dominance (e.g., "1B parameters, Algonauts 2025 #1")

---

## 3. NEUROSCIENCE FOUNDATION

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

## 4. INPUT FORMAT

```json
{
  "research_input": {
    "paper_type": "Infrastructure | FoundationModel",
    "core_claim": "One-sentence summary of the primary result",
    "shocking_statistic": "A specific number that defies intuition",
    "methodology_breakthrough": "What they did differently (e.g., structure-data decoupling, tri-modal transformer)",
    "validation_story": "What classic result they replicated or surpassed",
    "scale_marker": "Subjects, hours, parameters, datasets",
    "code_availability": "GitHub / HuggingFace URL",
    "primary_figure": "The one figure that makes people stop scrolling"
  },
  "topic": {
    "teaches": "What capability the viewer gains",
    "cares": "Why this matters to a non-researcher (clinical, AI, or dev angle)",
    "proof": "Trust anchor (institution, dataset size, competition rank)"
  },
  "value": {
    "takeaway": "Concrete viewer outcome after watching",
    "style": "Demonstration | Explanation | Reaction | Story",
    "time_to_value": "0-3s | 3-8s | 8-15s"
  },
  "platform": "Instagram | TikTok | YouTube Shorts | X/Twitter",
  "estimated_length": "30-60s | 60-90s | 90-180s",
  "reference_video": {
    "url": "optional",
    "copying": "Hook Only | Structure | Pacing",
    "description": "What element to emulate"
  }
}
```

---

## 5. DEEP PAPER-SPECIFIC STRUCTURE LOGIC

### 5.1 NeuralSet (Infrastructure Paper) — Structure Map

| Research Element | Recommended Structure | Tier | Reasoning |
|------------------|----------------------|------|-----------|
| **Fragmentation problem** (Fig 2 comparison grid) | Structure 6 — Myth Bust | A | "You think 15 tools are needed? One line of Python replaces them all." |
| **Event-driven abstraction** (Fig 3 pipeline) | Structure 2 — Step-by-Step | S | The 5-stage pipeline (Study→Events→Transforms→Extractors→Segmenter) is inherently sequential |
| **Lazy loading / memmap** | Structure 4 — Smart vs Dumb | S | "Dumb: load 500GB into RAM. Smart: never load a byte until needed." |
| **Backend scaling (local→SLURM)** | Structure 11 — Before→After | A | From laptop crash to cluster dispatch with one config flag |
| **HuggingFace extractor integration** | Structure 7 — List | A | "3 lines to embed video, audio, text, fMRI, MEG, spikes..." |

### 5.2 TRIBE v2 (Foundation Model Paper) — Structure Map

| Research Element | Recommended Structure | Tier | Reasoning |
|------------------|----------------------|------|-----------|
| **Tri-modal input → brain output** (Fig 1B) | Structure 1 — Comparison | S | "Video alone vs Audio alone vs Text alone vs ALL THREE" — RGB brain map (Fig 7D) is perfect visual |
| **Zero-shot subject generalization** (Fig 3A-B) | Structure 6 — Myth Bust | A | "Myth: You need to scan someone to model their brain. Busted: We beat their actual scan." |
| **In-silico visual localizers** (Fig 4) | Structure 12 — Time-Based Experiment | B | "Flash image → wait 5s → watch FFA light up. No human in scanner." |
| **In-silico language localizers** (Fig 5) | Structure 3 — Story Framework | S | "The 50-year quest to map Broca's area... solved in one inference pass." |
| **Scaling laws** (Fig 2E) | Structure 14 — Double Down | B | "More data = better predictions. No plateau in sight." |
| **ICA components = real networks** (Fig 6) | Structure 13 — Fake Case Study | B | "We didn't tell it about the Default Mode Network. It discovered it anyway." |
| **Multisensory integration topography** (Fig 7) | Structure 1 — Comparison | S | Unimodal vs bimodal vs trimodal — the RGB brain is the hook |

---

## 6. STRUCTURE REFERENCE (15 Structures)

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

## 7. STRUCTURE-TO-HOOK NEURAL MAPPING

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

## 8. HOOK GENERATION FRAMEWORK

### 8.1 Visual Hook Conditioning

**Neuro-AI Visual Hook Taxonomy:**

| Quality | Requirement | NeuralSet Example | TRIBE v2 Example |
|---------|-------------|-------------------|------------------|
| **GREAT** | Action + high contrast + result visible | Screen recording: 15 tool logos → dissolve into 1 NeuralSet logo; terminal shows `lazy loading` in green | Split-screen: real fMRI scanner (left) vs TRIBE prediction (right) — both brain maps animate in sync |
| **GOOD** | Face visible + some action | Creator points at Fig 2 comparison grid with pen, circles the empty circles vs NeuralSet's filled row | Creator holds up 3 colored cards (Red=Text, Green=Audio, Blue=Video) over a brain surface |
| **BAD** | Static frame / talking head / no action | Screenshot of GitHub repo with no motion | Static image of architecture diagram with no overlay |

**Visual Stimulus Category Reference:**

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

**Combination rules:**
- Face + Text Overlay = FFA + VWFA = strong dual activation (recommended for authority/educational content)
- Face + Motion = FFA + MT/V5 = maximum pre-attentive capture (recommended for storytelling hooks)
- Text + High Contrast = VWFA + V1-V4 = fastest semantic processing (recommended for stat-based hooks)
- Scene + Body + Motion = PPA + EBA + MT/V5 = immersive action (recommended for demonstration hooks)
- Face + Scene = FFA + PPA = person-in-context (recommended for story/before-after hooks)

**Paper-Specific Visual Hook Templates:**

```json
{
  "visual_hook_neuralset": {
    "description": "Rapid montage: MNE-Python → Nilearn → EEGLAB → FieldTrip logos (1s each), then glitch-transition to single NeuralSet terminal window showing `seg.apply(events)` executing. Brain data streams in without loading bar.",
    "contrast_mechanism": "Color shift from chaotic multi-color tool logos to unified dark-terminal green text",
    "motion_type": "Glitch transition + typing animation",
    "category_triggers": ["motion", "text_overlay", "high_contrast", "object"],
    "quality_rating": "GREAT"
  },
  "visual_hook_tribe": {
    "description": "Top-down brain surface (fsaverage5). Three modality streams (video clip, audio waveform, text transcript) flow into cortical surface. Surface lights up in RGB where each modality dominates. Red=temporal language, Blue=occipital visual, Green=auditory cortex. Yellow/cyan/magenta fusion zones pulse.",
    "contrast_mechanism": "Black background → sudden RGB illumination of brain geography",
    "motion_type": "Particle flow from stimuli icons into brain vertices",
    "category_triggers": ["motion", "high_contrast", "text_overlay", "scene"],
    "quality_rating": "GREAT"
  }
}
```

### 8.2 Written Hook Conditioning

**Rules:**
- **Max 8 words** (neural basis: VWFA processes optimally with single-fixation text strings; beyond 8 words requires saccadic eye movements that add ~200ms per fixation)
- Must contain either: a number, a superlative, or a negation of common belief
- For research content: front-load the methodological violation or scale marker

**Written Text Conditioning Reference:**

| Property | Optimal Range | Neural Basis |
|---|---|---|
| Word count | 4-6 words (max 8) | VWFA processes short strings in a single fixation. Beyond 8 words requires saccadic eye movements adding ~200ms per fixation. |
| Font weight | Bold/heavy | V1-V4 respond more strongly to high-contrast, thick-edge stimuli |
| Number presence | Include when available | Prefrontal quantitative evaluation circuits activate specifically for numerals; "73%" produces different (stronger) activation than "most" |
| Curiosity gap | One unresolved referent | Default mode network must keep watching to resolve open references; "THIS," "one thing," "the reason" create prediction errors the brain must close |
| Semantic opposition | Include contrast words | Bilateral language processing for opposition increases encoding depth (processed by both hemispheres) |
| Concrete over abstract | Prefer tangible nouns | Concrete nouns activate language + sensory cortices (dual-coding theory); abstract nouns activate language alone |
| Uppercase placement | One emphatic word in CAPS | VWFA treats all-caps differently; single CAPS word in otherwise lowercase string creates a visual pop-out effect |

**Processing load classification:**
- **LOW** (target): 3-5 words, one clause, single fixation → fastest VWFA decode
- **MEDIUM**: 6-8 words, may require one saccade → acceptable
- **HIGH** (reject): 9+ words, multiple clauses → requires serial reading, viewer scrolls before completion

**Semantic density classification:**
- **HIGH** (target): Every word carries meaning; no filler (e.g., "73% fail from THIS" — 4 words, zero filler)
- **MEDIUM**: One filler word acceptable (e.g., "Here's why 73% of startups fail")
- **LOW** (reject): Multiple filler words dilute the signal (e.g., "Did you know that about 73% of startups...")

| Paper | Written Hook | Word Count | Quality | Reason |
|-------|-------------|------------|---------|--------|
| NeuralSet | "15 tools. 1 line of Python." | 6 | GREAT | Number + compression contrast |
| NeuralSet | "Your fMRI pipeline is obsolete" | 5 | GOOD | Direct challenge, no number |
| TRIBE v2 | "AI predicts brains better than humans" | 6 | GREAT | Violation of intuition (better than biological measurement) |
| TRIBE v2 | "1,000 hours. 720 brains. Zero scans." | 6 | GREAT | Scale + paradox (zero scans needed for prediction) |
| TRIBE v2 | "We found the language network blind" | 6 | GREAT | "Blind" = no prior anatomical constraint |

### 8.3 Audio Hook Conditioning

**Neuro-AI Audio Taxonomy:**

| Tone | Use When | NeuralSet Example | TRIBE v2 Example |
|------|----------|-------------------|------------------|
| **Revelatory** (hushed→building) | Infrastructure / hidden problem | "What if I told you... every neuroscientist is wasting 40% of their time... on data wrangling?" | N/A |
| **Awe-struck** (breathless) | Scale / foundation model | N/A | "We trained an AI on one thousand hours of brain scans... and it learned to predict what you see... before you see it." |
| **Confrontational** (direct, fast) | Myth busting | "Stop installing fifteen Python packages. Stop." | "You don't need a scanner. You need this model." |
| **Curiosity-gap** (questioning) | In-silico replication | N/A | "How do you map Broca's area without a single subject in the lab?" |

**Audio Prosody Conditioning Reference:**

| Prosody Element | Neural Target | Effect on Engagement |
|---|---|---|
| High vocal energy (loud, projected) | Increased auditory evoked potential amplitude in A1 | Higher signal-to-noise ratio; harder for the brain to ignore |
| Emotional coloring (not flat) | TPJ + MTG activation (emotional/social cognition) | Activates empathy and social processing circuits; creates personal connection |
| Tempo variation (fast-slow shifts) | Auditory cortex habituation reset | Constant tempo leads to neural adaptation (tuning out); variation resets the attention signal |
| Pitch variation (not monotone) | Prosodic processing in right superior temporal gyrus | Pitch contours carry emotion and emphasis; monotone signals are processed as background |
| Immediate onset (t=0.0s) | Auditory onset response in A1 | The auditory system's strongest response is to onset — silence at the start is wasted neural real estate |
| Direct address ("you," "your") | Default mode network reactivation (medial prefrontal cortex) | Self-referential processing reactivates the network that passive scrolling suppresses |
| Novel phrasing | Mismatch negativity response | The brain compares incoming audio to stored templates; novel patterns generate a stronger neural "surprise" signal |

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

### 8.4 Multimodal Synchronization

**Rules:**
- All three hooks must fire within the same 0–1.5s window
- Semantic congruence across all three modalities is mandatory
- Silent-mode viability: Visual + Written must carry 100% of the message without audio

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

## 9. OUTPUT FORMAT

Return ONLY a JSON object:

```json
{
  "content_type": {
    "selected": "Educational | Authority | Storytelling | Proof",
    "reason": "Why this archetype fits the research claim",
    "frequency": "1-2x/week for research content",
    "cta_match": "Follow/Save | Comment then DM | Link in Bio"
  },
  "format": {
    "selected": "Screen Recording | Split Screen | Talking Head + Overlay | Pure Animation",
    "tier": "S | A | B",
    "reason": "Format matched to paper figure density and code availability"
  },
  "structure": {
    "selected": "Structure # — Name",
    "structure_number": 1-15,
    "tier": "S | A | B",
    "timing": {
      "0-1s": "VISUAL HOOK: [Specific motion]",
      "1-3s": "AUDIO HOOK: [First 3 words]",
      "3-8s": "PROOF ANCHOR: [Statistic or figure]",
      "8-15s": "IMPLICATION: [Why viewer cares]",
      "15-25s": "MECHANISM/SOLUTION: [Core method]",
      "25-30s": "DEMONSTRATION: [Code snippet or brain animation]",
      "30-35s": "CTA: [Specific action]"
    }
  },
  "hooks": {
    "visual": {
      "description": "Exact visual execution with paper-specific figure reference",
      "paper_figure_cited": "e.g., Fig 7D RGB brain",
      "neural_targets": ["FFA — face close-up triggers fusiform face area", "VWFA — on-screen number activates visual word form area"],
      "category_triggers": ["face", "text_overlay", "high_contrast"],
      "motion_type": "dynamic — facial expression shift from neutral to shock",
      "sync_window": "0.0-0.5s",
      "quality_rating": "GREAT | GOOD | BAD",
      "quality_reason": "Justification against taxonomy"
    },
    "written": {
      "text": "Max 8 words",
      "word_count": 4,
      "neural_targets": ["VWFA — short text string for rapid visual word recognition", "Prefrontal cortex — specific number triggers quantitative evaluation"],
      "processing_load": "LOW | MEDIUM | HIGH",
      "semantic_density": "HIGH | MEDIUM | LOW",
      "sync_window": "0.0-0.3s",
      "quality_rating": "GREAT | GOOD | BAD",
      "quality_reason": "Justification"
    },
    "audio": {
      "description": "Exact opening line with tone direction",
      "first_3_words": "Quoted",
      "neural_targets": ["A1/A5 — voice onset triggers primary and associative auditory cortex", "TPJ — emotional prosody (concern) activates temporo-parietal junction"],
      "prosody_profile": {
        "energy": "HIGH | MEDIUM | LOW",
        "emotion": "concern | urgency | excitement | authority | curiosity",
        "pacing": "variable | accelerating | decelerating | constant",
        "first_word_onset": "0.0s"
      },
      "sync_window": "0.0-1.5s",
      "quality_rating": "GREAT | GOOD | BAD",
      "quality_reason": "Justification"
    },
    "multimodal_sync": {
      "alignment": "CONVERGED | PARTIAL | FRAGMENTED",
      "convergence_zone_activation": "HIGH | MEDIUM | LOW",
      "congruence": "MATCHED | MISMATCHED",
      "silent_mode_viability": "STRONG | MODERATE | WEAK",
      "redundancy_ladder": "Visual shows → Written names → Audio explains"
    }
  },
  "cta": {
    "type": "Follow/Save | Comment then DM | Link in Bio | Read Paper",
    "text": "Max 5 words",
    "word_count": 4,
    "matching_rule": "Research Authority → Link in Bio | Educational → Follow/Save | Proof → Comment"
  },
  "research_integrity": {
    "claim_fidelity": "Does the hook accurately reflect the paper's statistical claim?",
    "figure_reference": "Which figure/table supports the primary visual",
    "code_link": "GitHub/HuggingFace URL if applicable",
    "institution_anchor": "Meta FAIR / ENS / Foundation Adolphe de Rothschild"
  }
}
```

---

## 10. RULES

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

3. **Written hook max 8 words**
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

7. **Visual hook MUST activate at least 2 category-selective brain areas.** See §8.1 for the full taxonomy and combination rules.
8. **Visual hook quality rating criteria (neurally grounded):**
   - **GREAT**: Activates 3+ category-selective areas; includes motion or dynamic element; includes high-contrast visual element; passes the silent-mode test
   - **GOOD**: Activates 2 category-selective areas; some motion or action; face visible
   - **BAD**: Activates only 1 area OR static frame with no motion OR talking head with no overlay → **REJECT**

### Rule Set 4: Neural Conditioning for Written Hook

9. **Written hook MUST optimize for VWFA processing speed and prefrontal engagement:**
   - Brevity: Max 8 words, target 4-6 (single fixation)
   - Number inclusion: Include specific numbers when available
   - Curiosity gap: End with an open referent (THIS, one thing, the reason)
   - Contrast words: Use opposition words (fail/win, wrong/right, stop/start)
   - Concrete nouns: Prefer tangible over abstract
   - Placement: Top-third of frame, minimum 48pt equivalent on mobile

### Rule Set 5: Neural Conditioning for Audio Hook

10. **Audio hook MUST optimize for auditory cortex onset response, emotional prosody, and speech-to-language propagation:**
    - Zero dead air: First phoneme at t=0.0s
    - Emotional prosody: Voice must carry detectable emotion (urgency, excitement, concern, disbelief)
    - Temporal contrast: Vary pacing within the hook
    - Vocal energy: Above conversational baseline for first 2 words
    - Direct address: Use "you" or "your" in the first sentence
    - Pattern disruption: Avoid overused openers that auditory cortex classifies as predictable

### Rule Set 6: Multimodal Synchronization

11. **All three hooks MUST be evaluated as a synchronized system:**
    - Temporal alignment: All hooks fire within 0-1.5s window
    - Semantic congruence: All three hooks deliver the same core message
    - Silent-mode viability: Visual + written hooks must carry 100% of the message without audio
    - Redundancy ladder: Visual shows → Written names → Audio explains

### Rule Set 7: Research Fidelity

12. **NEVER exaggerate beyond the paper's statistical claim.** If TRIBE v2 achieves R=0.40 on HCP, do not say "perfect prediction." Say "predicts group responses better than most individual scans."
13. **Always anchor to institution or dataset.** "Meta FAIR + 720 subjects" > "some researchers."
14. **When showing brain maps, specify cortical vs subcortical.** TRIBE v2 predicts both fsaverage5 vertices (20,484) and Harvard-Oxford subcortical voxels (8,802). Use this specificity.
15. **For NeuralSet, name the wrapped libraries.** "Built on MNE-Python and Nilearn, not a replacement" builds trust.

---

## 11. QUALITY CHECK

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

### Research Integrity Checks
- [ ] Claim fidelity: No exaggeration beyond paper statistics?
- [ ] Figure reference included (specific Fig X from NeuralSet or TRIBE v2)?
- [ ] Institution anchor present (Meta FAIR, ENS, etc.)?
- [ ] Code link included if available?

---

## 12. APPENDIX: NEURAL PROCESSING TIMELINE FOR THE FIRST 3 SECONDS

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

---

## 13. EXAMPLE EXECUTION

**Input:** TRIBE v2 zero-shot generalization (Fig 3A-B)

**Output:**

```json
{
  "content_type": {
    "selected": "Authority",
    "reason": "Scale breakthrough + competition validation establishes dominance",
    "frequency": "1-2x/week",
    "cta_match": "Link in Bio"
  },
  "format": {
    "selected": "Split Screen",
    "tier": "S",
    "reason": "Requires simultaneous display of real group fMRI vs TRIBE prediction"
  },
  "structure": {
    "selected": "6 — Myth Bust",
    "structure_number": 6,
    "tier": "A",
    "timing": {
      "0-1s": "VISUAL HOOK: Gray brain surface. Single red dot pulses. Text overlay: 'Median Subject'. Second brain surface appears with higher correlation — labeled 'TRIBE v2'.",
      "1-3s": "AUDIO HOOK: 'What if AI predicts your brain... better than you do?'",
      "3-8s": "PROOF ANCHOR: HCP dataset stats appear: '176 subjects, 7T scanner, R_group = 0.40' — 2x median subject.",
      "8-15s": "IMPLICATION: 'No retraining. No new scans. Zero-shot.'",
      "15-25s": "MECHANISM: Transformer animation — V-JEPA2 + Wav2Vec-BERT + Llama 3.2 → 1B parameters → Subject Block.",
      "25-30s": "DEMONSTRATION: Actual Fig 3A scatter plot animates — gray dots (subjects) vs green bar (TRIBE).",
      "30-35s": "CTA: 'Read the paper'"
    }
  },
  "hooks": {
    "visual": {
      "description": "Split-screen brain surfaces: left='Real fMRI Group Average', right='TRIBE v2 Prediction'. Both surfaces rotate slowly. Correlation value R=0.40 burns in gold on the right. Vertical divider pulses when values match.",
      "paper_figure_cited": "Fig 3A-B (zero-shot group predictivity)",
      "neural_targets": ["FFA — if creator face appears in corner thumbnail", "VWFA — R=0.40 text overlay", "V1-V4 — gold-on-gray contrast", "MT/V5 — rotating brain surface"],
      "category_triggers": ["text_overlay", "high_contrast", "motion"],
      "motion_type": "dynamic — rotating brain surface + pulsing divider",
      "sync_window": "0.0-0.5s",
      "quality_rating": "GREAT",
      "quality_reason": "High contrast (gold vs gray), motion (rotation), result visible (R=0.40), direct comparison. Activates 4+ category-selective pathways."
    },
    "written": {
      "text": "AI beats your brain scan",
      "word_count": 5,
      "neural_targets": ["VWFA — short text string for rapid visual word recognition", "Prefrontal cortex — paradox triggers evaluation circuits"],
      "processing_load": "LOW",
      "semantic_density": "HIGH",
      "sync_window": "0.0-0.3s",
      "quality_rating": "GREAT",
      "quality_reason": "5 words, paradox (AI > biological measurement), creates curiosity gap. Single-fixation VWFA processing."
    },
    "audio": {
      "description": "Hushed conspiratorial tone, building to awe: 'What if AI predicts your brain... better than you do?'",
      "first_3_words": "What if AI",
      "neural_targets": ["A1/A5 — voice onset triggers primary and associative auditory cortex", "TPJ — emotional prosody (concern/awe) activates temporo-parietal junction", "Default mode network — 'your brain' triggers self-referential processing"],
      "prosody_profile": {
        "energy": "MEDIUM",
        "emotion": "curiosity",
        "pacing": "variable",
        "first_word_onset": "0.0s"
      },
      "sync_window": "0.0-1.5s",
      "quality_rating": "GREAT",
      "quality_reason": "Immediate onset, emotional prosody activating TPJ, direct address ('your brain') engaging default mode network. Paradox creates auditory mismatch negativity."
    },
    "multimodal_sync": {
      "alignment": "CONVERGED",
      "convergence_zone_activation": "HIGH",
      "congruence": "MATCHED",
      "silent_mode_viability": "STRONG",
      "redundancy_ladder": "Visual shows brain comparison → Written states paradox → Audio explains the 'what if'"
    }
  },
  "cta": {
    "type": "Link in Bio",
    "text": "Read the paper",
    "word_count": 3,
    "matching_rule": "Authority content + peer-reviewed claim → Link in Bio CTA"
  },
  "research_integrity": {
    "claim_fidelity": "True. Paper states TRIBE v2 R_group ≈ 0.40 on HCP, 2x median subject predictivity (Fig 3A).",
    "figure_reference": "Fig 3A (speech), Fig 3B (video), Table 1 (dataset characteristics)",
    "code_link": "https://github.com/facebookresearch/tribev2",
    "institution_anchor": "Meta FAIR, École Normale Supérieure"
  }
}
```
