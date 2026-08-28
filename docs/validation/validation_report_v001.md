# YU100 MFP Validation Report v001

## Status

- Headless validation: **9 / 9 PASS**
- Human validation: **VS-10 pending**
- Scope: Simulation Verification only; this does not establish player-facing fun or Gate A-D completion.

## Calibration changes discovered during validation

### CAL-001 Unknown Route proposal weighting

Initial draft behavior caused all four canonical party members to prefer `SCOUT` at S02. This flattened Leader / Advisor / Trust / Policy differences.

The UNKNOWN_ROUTE proposal coefficients were recalibrated so that high-Risk characters can rationally prefer `PROCEED`, while cautious high-Explore characters tend toward `SCOUT` or `AVOID`. The architectural boundary remains unchanged: Ability -> Perception, Tendency -> Proposal, Trust -> Advisor weighting.

### CAL-002 Trust evidence gain

The initial Trust update coefficient produced only a very small relationship shift after repeated clear evidence. The validation coefficient was increased from `0.12` to `0.20` so that six meaningful evidence events across roughly three short expeditions move Haruto -> Aria Trust from 0.50 to the fixture target range 0.55-0.65.

## Scenario results

| Scenario | Status | Key observation |
|---|---|---|
| VS-01 | PASS | Leader only change: Haruto -> PROCEED / Aria -> SCOUT. |
| VS-02 | PASS | Advisor only change: Aria party -> SCOUT / Sera party -> PROCEED. |
| VS-03 | PASS | Trust only change: 0.20 -> PROCEED / 0.80 -> SCOUT; Aria advisor weight rises materially. |
| VS-04 | PASS | Policy only change: Conservative -> AVOID / Aggressive -> PROCEED while leader personality remains distinct. |
| VS-05 | PASS | CONTEXT_ALIGNED SCOUT produces SETBACK under ADVERSE_SHOCK. |
| VS-06 | PASS | HIGH_RISK PROCEED produces STRONG_SUCCESS under FORTUNATE_BREAK. |
| VS-07 | PASS | Failure cascade is reconstructed from explicit causal parents, not generated prose. |
| VS-08 | PASS | Experience reduces perception sigma/error and increases confidence under identical seed. |
| VS-09 | PASS | Repeated clear evidence moves Trust into target range and can alter a boundary decision. |

## Current interpretation

1. The simulation architecture is internally viable enough to proceed to a runnable MFP prototype.
2. The first validation run exposed a real calibration defect before UI/content work, which validates the value of the harness itself.
3. Headless PASS does not satisfy the Design Contract Go/No-Go gates. VS-10 must evaluate whether players actually recognize character differences, causal explanations, and voluntarily recompose the party.
4. The current coefficients and fixture seeds should be frozen as **Validation Baseline v001**, not treated as final game balance.

## Next validation stage

Use the minimal playable shell for VS-10 only: Roster -> Formation -> Mission -> Expedition -> AAR -> Recomposition. Instrument selected members, leader, policy, AAR interpretation, recomposition choice, and stated reason. Do not add school, diplomacy, culture, generation turnover, economy, or additional content before the Human Validation result.
