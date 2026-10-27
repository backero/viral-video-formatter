# Phase 5 Build Plan — Production Output Generator

## Analysis of Skill Files

### SKILL (2).md — scalerock-output-formatter
- **5 Export Documents**: Actor Brief, Camera Sheet, Edit Timeline, Clean Script, AI Node Graph
- **2 Output Layers**: Printed (human-readable) + Machine (JSON envelope)
- **Pure consolidation** — zero content editing
- **Verdict gate**: Only runs if Phase 4 verdict = SHIP

### scalerock-phase5-complete.md
- Full executed example with all 5 documents for "The Hair Fall Mistake"
- Visual formatting reference (box-drawing, emojis, header banners)
- Node graph schema (13 node types, standard topology, tool routing)
- General direction presets (format × content_type)
- Complete machine-layer JSON envelope (44 nodes, 47 edges)

## Phase 5 UI Design

### 1. Production Pack Header
- Title: Production Output Pack
- Verdict badge (SHIP/REVISE/REJECT) from Phase 4
- Meta summary: actor, format, runtime, scenes, words
- 5 document cards (click to view/download each)

### 2. Document Viewer Tabs
- Actor Brief (Mic icon)
- Camera Sheet (Camera icon)
- Edit Timeline (Scissors icon)
- Clean Script (FileText icon)
- AI Node Graph (Network icon)

### 3. Each Document View
- Clean formatted display
- Copy to clipboard button
- Download as PDF button
- Machine JSON download

### 4. Golden Rules Reference
- 18 rules in categorized grid (from Phase 3 removal)
- Collapsible section

### 5. Master Actions
- Download All (zip of all 5 PDFs)
- Download JSON Envelope
- Back to Phase 4

## Technical Implementation
- Phase 5 reads from shared screenplay data (same source as Phase 3/4)
- PDF generation via browser print-to-PDF or html2pdf.js
- JSON envelope pre-built as static data
- Framer Motion for tab transitions
- Lucide icons throughout

## Locked: Dashboard, Phase 1, 2, 3, 4 — NO CHANGES
