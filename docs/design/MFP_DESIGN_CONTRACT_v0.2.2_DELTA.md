# YU100 MFP Design Contract v0.2.2 — Delta

Artifact: `YU100-MFP-DESIGN-CONTRACT-v0.2.2-DELTA`

Upstream:
- `YU100-MFP-DESIGN-CONTRACT-v0.1`
- `YU100-MFP-DESIGN-CONTRACT-v0.2-DELTA`
- `YU100-MFP-DESIGN-CONTRACT-v0.2.1-DELTA`

Status: **APPROVED FOR GATE M RETEST**

Scope: Mission Result causality only. Decision / Outcome / Character model is unchanged.

## 1. Revision Reason

Human validation identified that a linear mapping

`Operational Route Frontier → Transport Capability → Reserve Outlook`

was not physically convincing for a single end-to-end supply route.

If the route from headquarters to the northern settlement contains an unresolved segment, that segment remains the transport bottleneck. Securing an upstream segment does not by itself increase stable delivery to the destination.

## 2. End-to-End Bottleneck Principle

For the canonical MFP mission, northern stable transport is determined by the weakest unresolved segment of the complete route.

Canonical rule:

> A partially secured route may improve future expedition operations, but it does not improve stable delivery to the northern settlement until a continuous operational route reaches Sector 10.

MFP v0.2.2 intentionally uses a binary compressed indicator rather than a detailed logistics model:

- Route frontier < Sector 10: Northern Stable Transport Capability = 43%
- Route frontier = Sector 10: Northern Stable Transport Capability = 82%

The numbers are validation fixtures, not a general logistics equation.

## 3. Reserve Ownership

`Northern Settlement Reserve Outlook` belongs to the **northern settlement**, not headquarters.

Separate states:

- `Expedition Carried Supplies` — resources carried by the current expedition; consumed during that run.
- `Northern Settlement Reserve Outlook` — estimated duration of the northern settlement's civilian/living reserves under current stable transport conditions.

Headquarters inventory/economy is not modeled in MFP v0.2.2.

## 4. Reserve Outlook Rule

MFP v0.2.2 keeps the reserve model deliberately compressed:

- Route incomplete: Northern Settlement Reserve Outlook = 1.4 months
- Route complete to Sector 10: Northern Settlement Reserve Outlook = 2.4 months

Thus a partial route extension such as Sector 4 → Sector 7 produces:

- Operational Route Frontier: improves
- Northern Stable Transport Capability: no change
- Northern Settlement Reserve Outlook: no change

The lack of immediate destination benefit is intentional.

## 5. Value of Partial Success

Partial route progress must still persist and matter.

Its value is operational rather than immediate economic benefit:

- already secured sectors remain operational;
- the next expedition does not re-resolve those secured sectors;
- expedition effort can concentrate on the remaining unresolved route;
- acquired information persists;
- Experience / Trust history persists.

Canonical interpretation:

> Partial Success = no immediate northern supply improvement, but a permanent reduction in the remaining expedition problem.

## 6. AAR Causality

For incomplete routes, AAR must show:

`Expedition Cost`
→ `Operational Route / Information gained`
→ `Northern direct effect: unchanged due to bottleneck`
→ `Persistent next-expedition advantage`

For a completed route, AAR must show:

`Expedition Cost`
→ `Continuous route completed`
→ `Bottleneck removed`
→ `Northern Stable Transport Capability improves`
→ `Northern Settlement Reserve Outlook improves`

## 7. Terminology

Player-facing canonical terms:

- 遠征到達
- 調査済み
- 補給路運用可能
- 北部安定輸送能力
- 北部集落 生活備蓄見込み
- 遠征携行物資
- ボトルネック

Generic `輸送能力` and generic `生活備蓄見込み` should not be used where ownership/destination could be ambiguous.

## 8. Technical Invariants

- Partial route extension must not increase Northern Stable Transport Capability.
- Partial route extension must not increase Northern Settlement Reserve Outlook.
- Completing the continuous route to Sector 10 may change both derived indicators.
- Expedition Carried Supplies must not be deducted directly from Northern Settlement Reserve Outlook.
- Route frontier remains persistent and determines which unresolved sectors require resolution on the next expedition.
- Decision / Outcome formulas and MFP02 seed namespace remain unchanged by this revision.

## 9. Deferred Design Candidate — Multiple Supply Routes

Future design candidate only; **NOT AUTHORIZED FOR MFP v0.2.2 implementation**.

A later stage may provide multiple routes to the same destination with different trade-offs, for example:

- short / dangerous / high-capacity route;
- long / safer / lower-capacity route;
- weather-sensitive route;
- redundant backup route.

This could turn route choice into risk / return / resilience strategy while preserving the bottleneck principle within each route.

Before implementation, it must be demonstrated that the single-route MFP loop is understandable and produces useful recomposition decisions.

## 10. Validation Status

Gate M remains open.

Next validation asks whether the player can distinguish:

1. partial route progress,
2. immediate northern settlement effect,
3. remaining bottleneck,
4. persistent value for the next expedition.

No additional system expansion is authorized by this Delta.
