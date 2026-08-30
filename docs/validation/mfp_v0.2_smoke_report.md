# MFP v0.2 Playable Shell Smoke Report

Artifact: `YU100-MFP-v0.2-SMOKE-REPORT`

Branch: `prototype/mfp-v0.2`

Purpose: VS-10 Human Validation再開前の最小実装健全性確認。

## Checks

- Split static application structure: PASS
  - `index.html`
  - `styles.css`
  - `data.js`
  - `simulation.js`
  - `app.js`
- JavaScript syntax check (`node --check` on concatenated JS): PASS
- Minimal DOM/localStorage stub execution: PASS
- Mission screen initial state generation: PASS
- Expedition execution: PASS
- Objective Result generation: PASS
- AAR generation: PASS
- Persistent state update: PASS

## Canonical Initial Smoke Run

Default fixture / initial state:

- Safe Route Frontier: Sector 4
- Leader: Haruto
- Party: Haruto / Aria / Lloyd / Mina
- Risk: NORMAL
- Priority: SURVIVAL

Observed smoke result after route-establishment calibration:

- Mission Result: `PARTIAL SUCCESS`
- Safe Route Frontier: `Sector 4 → Sector 7`
- Reached Sector: `10`
- Decision Events: `6`
- Newly acquired unresolved information: Sector 8 / 9

This is intentional: the default party must not close the canonical mission in one expedition, because MFP v0.2 requires room for Recomposition / Policy experimentation.

Repeated unchanged runs can fail to extend the safe route, preserving pressure to reconsider party / leader / policy rather than guaranteeing monotonic progress.

## Calibration Change

Initial implementation allowed ordinary `SUCCESS` outcomes to establish a safe route and the default fixture reached Sector 10 in one expedition.

This was rejected for Human Validation because it removed the practical need for recomposition.

Current rule:

- `SCOUT`: establishes route unless Outcome is FAILURE.
- Other forward actions: require `STRONG SUCCESS` to establish the route.
- AVOID / REPORT / RETREAT do not establish the route.

Information already known from a prior expedition is not counted again as newly acquired information.

## Scope Limitation

This smoke test does not substitute for iPhone Safari Human Validation. It confirms deterministic code execution and the minimal Mission Feedback Loop only.

Next stage:

> Publish MFP v0.2 through `main` / GitHub Pages and resume VS-10 Human Validation beginning with Gate M — Mission Integrity.
