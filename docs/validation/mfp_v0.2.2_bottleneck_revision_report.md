# MFP v0.2.2 Bottleneck Revision Report

Status: **READY FOR HUMAN GATE M RETEST**

## Scope

This revision corrects only Mission-result causality for the canonical single supply route.

Decision / Outcome / Character logic is intentionally unchanged.

## Human Finding

The v0.2.1 proportional relationship

`route frontier extends → northern transport rises → northern reserve outlook rises`

was rejected because a remaining unresolved segment should continue to constrain end-to-end delivery.

A second ambiguity was resolved: `生活備蓄見込み` refers to the **northern settlement**, not headquarters.

## Implemented Rule

| Operational frontier | Northern stable transport | Northern settlement reserve outlook | Bottleneck |
|---|---:|---:|---|
| Sector 4 | 43% | 1.4 months | Sector 5–10 |
| Sector 7 | 43% | 1.4 months | Sector 8–10 |
| Sector 9 | 43% | 1.4 months | Sector 10 |
| Sector 10 | 82% | 2.4 months | none |

This is a deliberately compressed MFP fixture, not a detailed logistics simulation.

## Partial Success Semantics

Example first-run shape retained from the previous fixture:

- expedition may physically reach Sector 10;
- information may be acquired beyond the operational frontier;
- operational route may advance only from Sector 4 to Sector 7;
- northern stable transport remains 43%;
- northern settlement reserve outlook remains 1.4 months;
- remaining bottleneck becomes Sector 8–10;
- the next expedition begins resolving the remaining route after the persistent frontier rather than replaying secured sectors.

Thus partial progress has persistent **operational** value without inventing immediate destination-level economic value.

## Invariants Checked by Source Review

- `transport(frontier < 10) == 43`
- `transport(10) == 82`
- `reserve(frontier < 10) == 1.4`
- `reserve(10) == 2.4`
- the persisted route frontier still controls the first unresolved Sector processed by the next expedition;
- expedition carried supplies remain run-local and are not directly deducted from northern settlement reserve outlook;
- MFP02 decision seed namespace is unchanged;
- Decision / Outcome formulas are unchanged.

## UI Changes

Mission and AAR now explicitly name:

- `北部安定輸送能力`
- `北部集落 生活備蓄見込み`
- current `ボトルネック`

For an incomplete route, AAR explicitly states that northern direct effects are unchanged and separately states the persistent advantage for the next expedition.

## Deferred Candidate

Multiple alternative supply routes with different risk / return / capacity / resilience profiles are recorded as a future design candidate only.

They are not part of v0.2.2 and must not affect current Gate M evaluation.

## Gate M Retest Question

After one default expedition, verify whether the player can explain without inspecting debug data:

1. what advanced permanently;
2. why northern stable transport did not yet improve;
3. whose reserve outlook is being shown;
4. how the partial result helps the next expedition.

If these are clear, Gate M may be closed and Character / Recomposition validation can resume.
