export const COMPANIES = ['BACKERO', 'TREYFA', 'KUMARIE']

export const TOPIC_CHECKBOXES = [
  'Demand',
  'Relavence',
  'Initial Interest',
  'provide entertaining education',
]

export const FORMAT_TIERS = [
  { value: 'S-TIER = Core Engines (use 70–80% of content)', label: 'S-TIER — Core Engines (use 70–80%)' },
  { value: 'A-TIER = Stable Variations (use 20–30%)', label: 'A-TIER — Stable Variations (use 20–30%)' },
  { value: 'B-TIER = Proof-Heavy / Context-Dependent (use 5–10%)', label: 'B-TIER — Proof-Heavy / Context-Dependent (use 5–10%)' },
  { value: 'F-TIER = Avoid as "structures" (use 5–10%)', label: 'F-TIER — Avoid as "structures" (0–5%)' },
]

export const TIER_KEY = (val) => {
  if (val.startsWith('S-TIER')) return 'S'
  if (val.startsWith('A-TIER')) return 'A'
  if (val.startsWith('B-TIER')) return 'B'
  if (val.startsWith('F-TIER')) return 'F'
  return null
}

export const SCRIPT_STRUCTURES = {
  S: [
    'COMPARISON STRUCTURE (A vs B)',
    'STEP-BY-STEP STRUCTURE',
    'STORY FRAMEWORK (Mini Hero Journey)',
  ],
  A: [
    'LIST STRUCTURE (3–5 Items)',
    'SMART VS DUMB STRUCTURE',
    'BEFORE → AFTER STRUCTURE',
    'PROBLEM → AGITATE → SOLUTION (PAS)',
    'MYTH BUST STRUCTURE',
    '3-LEVEL STRUCTURE (Beginner → Pro)',
    'OUTCOME → PAIN POINTS → SOLUTION',
    "DO vs DON'T STRUCTURE",
  ],
  B: [
    'TIME-BASED EXPERIMENT STRUCTURE',
    'FAKE CASE STUDY ("If I started from scratch")',
    'DOUBLE DOWN TEMPLATE',
    'COST BREAKDOWN STRUCTURE',
  ],
}

export const TIER_INFO = {
  S: {
    title: 'S-TIER = Core Engines (use 60–70% of content)',
    body: `These are the 3 master structures that everything else is basically a variation of:
• STEP-BY-STEP → Education engine
• COMPARISON (A vs B) → Decision engine
• STORY (Mini Hero Journey) → Trust engine

If you master only these 3, you can scale forever.`,
  },
  A: {
    title: 'A-TIER = Stable Variations (use 20–30%)',
    body: `High-performing, easy to execute variations:

Decision Variations (Comparison-family): SMART vs DUMB · DO vs DON'T · MYTH BUST

Education Variations (Step-by-step-family): LIST (3–5 items) · 3-LEVEL (Beginner → Pro) · PAS (Problem → Agitate → Solution) · OUTCOME → PAIN POINTS → SOLUTION

Trust Variation (Story-family): BEFORE → AFTER`,
  },
  B: {
    title: 'B-TIER = Proof-Heavy / Context-Dependent (use 10–20%)',
    body: `These can go very viral, but need proof assets, tracking, or prior winners.

• TIME-BASED EXPERIMENT (needs timeline + measurable result)
• FAKE CASE STUDY (needs credibility)
• DOUBLE DOWN TEMPLATE (only works after you have a winner)
• COST BREAKDOWN (needs accurate numbers + strong "value punch")`,
  },
  F: {
    title: 'F-TIER = Avoid as "structures" (0–5%)',
    body: `Avoid:
• Vague motivational talk
• Generic advice with no mechanism
• "Tips" with no cause → effect

These don't hold retention consistently.`,
  },
}

export const STRUCTURE_TEMPLATES = {
  'COMPARISON STRUCTURE (A vs B)': {
    steps: [
      'Hook (A vs B)',
      'Option A (looks good initially)',
      'Option B (looks worse initially)',
      'Time / test period',
      'Results',
      'Explanation',
      'CTA',
    ],
    scriptSteps: [
      'Micro bridge — announce contrast',
      'Option A — show behavior',
      'Consequence A — show damage',
      'Option B — show behavior',
      'Consequence B — show benefit',
      'Time/Test — add timeframe',
      'Explanation — one reason only',
      'Reinforcement — lock the takeaway',
      'CTA bridge — single action keyword',
    ],
    example: `Here's the real difference.
Scrub daily.
Micro-tears trigger inflammation.
Exfoliate twice weekly.
Barrier stays calm.
In 14 days, redness reduces.
Because inflammation drops.
Small change. Big skin shift.
Comment CLEAR.`,
  },
  'STEP-BY-STEP STRUCTURE': {
    steps: [
      'Hook (Desired Outcome)',
      'Step 1',
      'Step 2',
      'Step 3',
      'Step 4 (if needed)',
      'Why it works',
      'CTA',
    ],
    scriptSteps: [
      'Micro bridge — promise a fix',
      'Step 1 — action',
      'Reason — why it matters',
      'Step 2 — action',
      'Reason — why it matters',
      'Step 3 — action',
      'Reason — why it matters',
      'Reinforcement — make it feel doable',
      'CTA bridge — single keyword',
    ],
    example: `Do this for smoother skin.
Cleanser: 60 seconds only.
Short wash protects barrier oils.
Moisturize on damp skin.
Water locks hydration faster.
Sunscreen every morning.
UV causes spots and texture.
Do this daily for 14 days.
Comment ROUTE.`,
  },
  'STORY FRAMEWORK (Mini Hero Journey)': {
    steps: [
      'Hook (Turning point moment)',
      'Background',
      'Conflict',
      'Decision / Change',
      'Result',
      'Lesson extracted',
      'CTA',
    ],
    scriptSteps: [
      'Setup — quick context',
      'Conflict — what went wrong',
      'Emotional low — frustration line',
      'Decision — what changed mentally',
      'Action — what you did',
      'Result — measurable outcome',
      'Lesson — one takeaway',
      'CTA bridge — single keyword',
    ],
    example: `My skin became sensitive suddenly.
Every product started burning.
I felt stuck and embarrassed.
So I stopped chasing new launches.
I focused only on barrier repair.
In 14 days, stinging stopped.
Healing beats fixing fast.
Comment CALM.`,
  },
  'LIST STRUCTURE (3–5 Items)': {
    steps: [
      'Hook ("3 mistakes…", "5 things…")',
      'Item 1',
      'Item 2',
      'Item 3',
      'Bonus / Most Important',
      'Summary / Pattern',
      'CTA',
    ],
    scriptSteps: [
      'Micro bridge — set the list',
      'Point 1 — trigger',
      'Reason — cause/effect',
      'Point 2 — trigger',
      'Reason — cause/effect',
      'Point 3 — trigger',
      'Reason — cause/effect',
      'Pattern insight — connect the dots',
      'CTA bridge — single keyword',
    ],
    example: `Three reasons your skin stays dull.
Skipping sunscreen.
UV blocks glow and causes spots.
Overusing actives.
Irritation kills radiance.
Not moisturizing enough.
Dryness makes texture obvious.
Barrier damage is the pattern.
Comment GLOW.`,
  },
  'SMART VS DUMB STRUCTURE': {
    steps: [
      'Hook ("Smart vs Dumb when it comes to X")',
      'Dumb action',
      'Consequence',
      'Smart action',
      'Result difference',
      'Why smart works',
      'CTA',
    ],
    scriptSteps: [
      'Micro bridge — call out the contrast',
      'Dumb behavior — common mistake',
      'Consequence — what it causes',
      'Smart behavior — correct action',
      'Result — what it improves',
      'Why smart works — one mechanism',
      'Reinforcement — simplify it',
      'CTA bridge — single keyword',
    ],
    example: `Most people treat acne wrong.
Dumb: drying products daily.
Barrier breaks, acne worsens.
Smart: hydrate while treating.
Skin calms, breakouts reduce.
Calm barrier controls inflammation.
Simple always beats harsh.
Comment FIX.`,
  },
  'BEFORE → AFTER STRUCTURE': {
    steps: [
      'Hook (Transformation promise)',
      'Before state',
      'Struggle / Problem',
      'What changed',
      'After result',
      'Why it worked',
      'CTA',
    ],
    scriptSteps: [
      'Micro bridge — set transformation',
      'Before state — show condition',
      'Struggle — show frustration',
      'Turning point — what changed',
      'Action taken — the move',
      'After result — measurable improvement',
      'Lesson — one takeaway',
      'CTA bridge — single keyword',
    ],
    example: `This changed my skin fast.
Before: constant dryness.
Makeup looked patchy daily.
Then I fixed my barrier.
Moisturized on damp skin.
After 10 days, flakes stopped.
Hydration is not optional.
Comment CALM.`,
  },
  'PROBLEM → AGITATE → SOLUTION (PAS)': {
    steps: [
      'Hook (Pain statement)',
      'Describe problem',
      'Agitate / consequences',
      'Introduce solution',
      'Explain solution steps',
      'Why solution works',
      'CTA',
    ],
    scriptSteps: [
      'Expand problem — name it clearly',
      'Agitate consequence — make it hurt',
      'Escalate risk — what happens long-term',
      'Introduce solution — promise fix',
      'Step — one action',
      'Why it works — one reason',
      'Reinforcement — make it easy',
      'CTA bridge — single keyword',
    ],
    example: `Your skin is breaking out repeatedly.
That means inflammation is active.
Over time, it leaves dark marks.
Fix the base first.
Stop new products for 7 days.
Less irritation reduces flare-ups.
Then rebuild slowly.
Comment RESET.`,
  },
  'MYTH BUST STRUCTURE': {
    steps: [
      'Hook (Common belief)',
      'State the myth',
      'Why people believe it',
      'Contradiction',
      'Correct method',
      'Explanation',
      'CTA',
    ],
    scriptSteps: [
      'State myth — say the wrong belief',
      'Why believed — why people follow it',
      'Contradiction — why it fails',
      'Correct method — what to do instead',
      'Mechanism — why it works',
      'Reinforcement — anchor the rule',
      'CTA bridge — single keyword',
    ],
    example: `Myth: "More foam means cleaner skin."
People equate foam with hygiene.
Foam often strips natural oils.
Use gentle, low-foam cleansers.
Barrier stays intact, acne reduces.
Clean doesn't mean stripped.
Comment SAFE.`,
  },
  '3-LEVEL STRUCTURE (Beginner → Pro)': {
    steps: [
      'Hook ("3 levels of…")',
      'Beginner level',
      'Intermediate level',
      'Advanced level',
      'Pro level',
      'Core difference explanation',
      'CTA',
    ],
    scriptSteps: [
      'Micro bridge — introduce levels',
      'Beginner level — what they do',
      'Limitation — why it fails',
      'Intermediate level — what they do',
      'Limitation — what\'s missing',
      'Advanced level — what they do',
      'Core insight — what separates winners',
      'CTA bridge — single keyword',
    ],
    example: `Skincare has three levels.
Beginner: random trending products.
Skin gets irritated fast.
Intermediate: basic cleanse-moisturize-SPF.
Results are slow but stable.
Advanced: add one targeted active.
Control beats complexity.
Comment LEVEL.`,
  },
  'OUTCOME → PAIN POINTS → SOLUTION': {
    steps: [
      'Hook (Desired outcome)',
      'Pain point 1',
      'Pain point 2',
      'Pain point 3',
      'Introduce system',
      'Quick framework explanation',
      'CTA',
    ],
    scriptSteps: [
      'Desired outcome — state the dream',
      'Pain point 1 — obstacle',
      'Pain point 2 — obstacle',
      'Pain point 3 — obstacle',
      'Introduce solution — one fix direction',
      'Core mechanism — why it works',
      'Reinforcement — keep it simple',
      'CTA bridge — single keyword',
    ],
    example: `Want clear skin in photos?
But you feel oily by noon.
And pimples return weekly.
And spots stay for months.
Start with barrier-first routine.
Calm skin reduces inflammation cycles.
Less chaos, more results.
Comment CLEAR.`,
  },
  "DO vs DON'T STRUCTURE": {
    steps: [
      'Hook ("Stop doing this…")',
      "Don't action",
      'Consequence',
      'Do action',
      'Benefit',
      'Why difference matters',
      'CTA',
    ],
    scriptSteps: [
      'Micro bridge — force choice',
      "Don't behavior — mistake",
      'Consequence — what it causes',
      'Do behavior — correct move',
      'Benefit — what improves',
      'Why it matters — one reason',
      'Reinforcement — make it memorable',
      'CTA bridge — single keyword',
    ],
    example: `Stop doing this at night.
Don't apply retinol on dry skin.
It increases irritation.
Do it after moisturizer.
Skin tolerates it better.
Buffering reduces barrier stress.
Same active, safer results.
Comment SAFE.`,
  },
  'TIME-BASED EXPERIMENT STRUCTURE': {
    steps: [
      'Hook ("I did X for 30 days")',
      'Initial condition',
      'What I followed',
      'Duration',
      'Results',
      'Key lesson',
      'CTA',
    ],
    scriptSteps: [
      'Starting condition — baseline problem',
      'What followed — rule used',
      'Duration — exact time',
      'Observation — what changed mid-way',
      'Result — measurable end',
      'Key insight — what caused it',
      'Reinforcement — repeatability',
      'CTA bridge — single keyword',
    ],
    example: `My skin was breaking out weekly.
I stopped actives completely.
For 10 days straight.
Redness reduced by day five.
New pimples slowed down.
Irritation was the real trigger.
Less products = more control.
Comment RESET.`,
  },
  'FAKE CASE STUDY ("If I started from scratch")': {
    steps: [
      'Hook ("If I had to start from zero…")',
      'Situation setup',
      'Step 1',
      'Step 2',
      'Step 3',
      'Strategic reasoning',
      'CTA',
    ],
    scriptSteps: [
      'Situation setup — "if I…" scenario',
      'Step 1 — first action',
      'Reason — why',
      'Step 2 — second action',
      'Reason — why',
      'Step 3 — third action',
      'Strategic explanation — how it stacks',
      'CTA bridge — single keyword',
    ],
    example: `If I had acne again today.
First, I'd simplify to basics.
Less irritation equals faster healing.
Then I'd track one trigger weekly.
Patterns reveal hidden causes.
Then add one active only.
One variable prevents confusion.
Comment PLAN.`,
  },
  'DOUBLE DOWN TEMPLATE': {
    steps: [
      'Hook (Proven viral hook reused)',
      'Same setup as viral',
      'Small variation',
      'Same structure',
      'New result example',
      'Reinforcement',
      'CTA',
    ],
    scriptSteps: [
      'Micro bridge — continue a winner',
      'Original viral concept — restate main claim',
      'Small variation — change one element',
      'Additional insight — add one new reason',
      'Result — expected outcome',
      'Reinforcement — keep it tight',
      'CTA bridge — single keyword',
    ],
    example: `Your cleanser might be the issue.
Harsh cleansing ruins the barrier.
Even if it says "for acne."
Switch to gentle gel cleanser.
Breakouts reduce from less inflammation.
Gentle is not weak.
Comment FIX.`,
  },
  'COST BREAKDOWN STRUCTURE': {
    steps: [
      'Hook ("This cost me ₹X…")',
      'Breakdown item 1',
      'Breakdown item 2',
      'Breakdown item 3',
      'Total cost',
      'Value comparison',
      'CTA',
    ],
    scriptSteps: [
      'Micro bridge — frame cost truth',
      'Cost item 1 — expense',
      'Cost item 2 — expense',
      'Cost item 3 — expense',
      'Total — sum it up',
      'Value comparison — what it replaces',
      'Insight — lesson',
      'CTA bridge — single keyword',
    ],
    example: `Clear skin doesn't need expensive kits.
Gentle cleanser: normal budget.
Moisturizer: basic pharmacy.
Sunscreen: daily essential.
Total: less than one "viral serum."
Consistency beats luxury bottles.
Spend smart, not emotional.
Comment BUDGT.`,
  },
}

export const VIRAL_HOOKS = [
  {
    value: '1. Tutorial Hook → Step-by-step outcome-driven curiosity',
    label: '1. Tutorial Hook',
    desc: 'Step-by-step outcome-driven curiosity',
    eg: '"Here\'s what you did to get X result"',
  },
  {
    value: '2. Comparison / Contrast Hook → Forces evaluation and retention through contrast',
    label: '2. Comparison / Contrast Hook',
    desc: 'Forces evaluation and retention through contrast',
    eg: '"Most people do X, smart ones do Y"',
  },
  {
    value: '3. Myth-Busting / Common Mistake Hook → Pattern interruption + authority',
    label: '3. Myth-Busting / Common Mistake Hook',
    desc: 'Pattern interruption + authority',
    eg: '"Instead of doing X, do this"',
  },
  {
    value: '4. Do vs Don\'t Hook → Built-in contrast + suspense',
    label: "4. Do vs Don't Hook",
    desc: 'Built-in contrast + suspense',
    eg: '"This person does X, this person does Y — who wins?"',
  },
  {
    value: '5. Tip / Hack Hook → Filters noise, signals expertise',
    label: '5. Tip / Hack Hook',
    desc: 'Filters noise, signals expertise',
    eg: '"I tested 100 things most are useless, these worked"',
  },
  {
    value: '6. Transformation Hook → Outcome-first storytelling',
    label: '6. Transformation Hook',
    desc: 'Outcome-first storytelling',
    eg: '"I went from this to this — here\'s the reason"',
  },
  {
    value: '7. Challenge Hook → Curiosity + proof demand',
    label: '7. Challenge Hook',
    desc: 'Curiosity + proof demand',
    eg: '"Is it possible to do X in Y time?"',
  },
  {
    value: '8. Outcome-First Hook → Show the end result immediately',
    label: '8. Outcome-First Hook',
    desc: 'Show the end result immediately',
    eg: '"This is how I fixed X"',
  },
  {
    value: '9. Curiosity Gap Hook → Create an information gap',
    label: '9. Curiosity Gap Hook',
    desc: 'Create an information gap',
    eg: '"Nobody tells you this about X"',
  },
  {
    value: '10. Stakes Hook → Put money, time, or effort at risk',
    label: '10. Stakes Hook',
    desc: 'Put money, time, or effort at risk',
    eg: '"This mistake cost me X"',
  },
  {
    value: '11. Desire Swap Hook → Replace unwanted outcome with desired one',
    label: '11. Desire Swap Hook',
    desc: 'Replace unwanted outcome with desired one',
    eg: '"If you want X instead of Y…"',
  },
  {
    value: '12. Shock / Contradiction Hook → Say the opposite of expectation',
    label: '12. Shock / Contradiction Hook',
    desc: 'Say the opposite of expectation',
    eg: '"More X actually ruined my Y"',
  },
]

export const PHYSIOLOGICAL_FACTORS = [
  'Dream Outcome',
  'broad applicability(should apply to more people)',
  'Curiosity',
  'Comparision',
  'Fear "Stop before you ruin…"',
  'Ego',
  'Desire / Choise  "Do this, not that"',
  'Stakes  "This costs you money / time / results"',
  'Accusation "You are doing this wrong"',
  'Contradiction "This advice is wrong"',
]

export const PRE_SHOOT_APPROVAL_OPTIONS = [
  'CONTENT WRITER APPROVED',
  'TECH TEAM',
  'CEO',
  'CHAIRMAN',
  'FOUNDER',
]

export const FINAL_APPROVAL_MEMBERS = [
  'EDITOR',
  'CEO',
  'CONTENT CREATOR',
  'FOUNDER',
]

export const FOUNDER_APPROVAL_OPTIONS = [
  'APPROVED',
  'RE-SHOOT',
  'RE-EDIT',
  'RE-MUSIC',
  'CORRECTIONS',
  'NO VALUE SCRAP',
]

export const PAGES = [
  { id: 1, title: 'Detail Page', subtitle: 'Creator & project info' },
  { id: 2, title: 'Niche / Topic', subtitle: 'What the video is about' },
  { id: 3, title: 'Value', subtitle: 'What the viewer learns' },
  { id: 4, title: 'Formats', subtitle: 'Video delivery structure' },
  { id: 5, title: 'Script Structure', subtitle: 'Template reference' },
  { id: 6, title: 'Hook', subtitle: 'Grab attention instantly' },
  { id: 7, title: 'Script', subtitle: 'Write your script' },
  { id: 8, title: 'CTA', subtitle: 'Call to action' },
  { id: 9, title: 'Pre-Camera', subtitle: 'Shooting & discussion' },
  { id: 10, title: 'Editor', subtitle: 'Post-production notes' },
  { id: 11, title: 'Final Out', subtitle: 'Review & submit' },
]
