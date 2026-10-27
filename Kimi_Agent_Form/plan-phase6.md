# Phase 6 Build Plan — AI Node Editor

## Analysis of Deployed Phase 6 (from browser inspection)

### UI Components
1. **Node Palette** (left sidebar) — 13 draggable node types with tool assignments
2. **Canvas** (center) — visual DAG with nodes and connecting edges
3. **Scene Tabs** (bottom) — 5 scene filter tabs + "All" view
4. **Inspector Panel** (right) — metadata, dialogue, node properties
5. **Toolbar** (top) — Canvas/Summary/Reset/Import/ComfyUI/Freepik/Prompts/JSON
6. **Export Pipeline** — Input/Generate/Audio/Composite/Output stage buttons

### Node Types (from skill file)
- reference.actor → midjourney-cref
- t2i.keyframe → midjourney
- i2v.scene → kling-2.0-master
- t2v.scene → kling/runway
- tts.voiceover → elevenlabs
- audio.lipsync → sync.so
- audio.sfx → elevenlabs-sfx
- audio.music → epidemic-load
- overlay.text → compositor-capcut
- transition.cut → compositor-capcut
- compositor.scene → compositor-capcut
- compositor.master → compositor-capcut
- render.output → compositor-capcut

### Data Flow
- Phase 5 outputs JSON envelope → Phase 6 imports it
- Node editor visualizes the AI production pipeline as a DAG
- Each scene gets its own set of nodes
- Export generates tool-specific outputs (ComfyUI JSON, Freepik prompts, etc.)

## Implementation
- React + TypeScript with canvas-based node rendering
- HTML5 Canvas or SVG for the node graph
- Mouse drag for node positioning
- Click-to-select for node inspection
- Scene filtering
- Export to JSON/ComfyUI/Freepik formats

## Connections to Other Phases
- Phase 5 footer: "Open in Node Editor" button → navigates to /phase/6
- Dashboard: Phase 6 card in pipeline
- App.tsx: Route /phase/6

## Locked: Dashboard, Phase 1, 2, 3, 4, 5 — NO CHANGES except navigation links
