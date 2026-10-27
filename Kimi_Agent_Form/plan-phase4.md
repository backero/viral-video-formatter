# Phase 4 Rebuild Plan — 52-Check AI Auto-Validator

## Objective
Replace Phase 4's 10 manual checks with the full 52-check automated validation from skill-screenplay-validator-final.md

## Design Decisions
- Auto-run validation on page load against Phase 3 screenplay data
- Verdict computed automatically: SHIP / REVISE / REJECT
- Each check shows: ID, name, category badge, severity badge, result, evidence, suggested fix
- Category grouping: Golden Rules, Quality Gate, Neuroscience, Staccato, PBL, Studio, CTA, MultiLang, Reference
- Auto-fix suggestions visible on every FAIL
- Role approvals enhanced: each role sees only their assigned checks
- Revision queue: ordered list of fixes prioritized by severity

## Skill: vibecoding-general-swarm for implementation

## Stage 1: Build Phase 4 with 52-check validator (Phase4_Editor agent)
## Stage 2: Build & deploy

## Locked: Dashboard, Phase 1, Phase 2, Phase 3, Phase 5 — NO CHANGES
