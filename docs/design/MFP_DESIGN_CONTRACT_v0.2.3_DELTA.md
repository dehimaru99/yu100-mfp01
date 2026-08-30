# YU100 MFP Design Contract v0.2.3 Delta

Artifact: `YU100-MFP-DESIGN-CONTRACT-v0.2.3-DELTA`

Status: APPROVED FOR MFP v0.2.3 PROTOTYPE REVISION

Upstream:
- MFP Design Contract v0.1
- v0.2 Delta
- v0.2.1 Delta
- v0.2.2 Delta

This Delta changes only Temporal Pressure and HQ-side persistent cost semantics. Character / Decision semantics remain upstream authority unless explicitly modified below.

## 1. Reset Reason

Human review established two missing causal pressures:

1. One expedition consumes time, therefore the northern settlement cannot remain in an unchanged shortage state forever.
2. Failed or costly expeditions must consume organization-side capability so that failure changes future options.

Without these pressures, repeated attempts are effectively free and Risk Policy lacks sufficient strategic meaning.

## 2. Time Authority

MFP v0.2.3 fixes:

`1 Expedition = 1 Month`

Each expedition advances the persistent calendar exactly one month.

This is an MFP causal unit, not a commitment that a final 100-year game requires 1200 manual player turns.

## 3. State Ownership

Three resource layers are distinguished.

### 3.1 Northern Settlement Reserve

Owner: northern settlement.

Meaning: actual life-support reserve measured in months of full consumption.

Initial value:

`2.00 months`

This is not HQ inventory and not expedition carried supply.

### 3.2 HQ Operational Reserve

Owner: player organization / headquarters.

Meaning: abstract operational capacity combining deployment, replenishment, medical/recovery and disruption handling.

Initial value:

`100%`

It is deliberately one abstract resource. Money, food, medicine, manpower and equipment inventories are NOT introduced.

### 3.3 Expedition Carried Supply

Owner: current expedition.

Meaning: current-run continuation capacity.

It is temporary and discarded after the expedition. Its starting ceiling is derived from HQ Operational Reserve.

## 4. Northern Temporal Pressure

Preserve v0.2.2 End-to-End bottleneck semantics.

Before Sector 10 connection:

`Northern Stable Transport = 43% of monthly requirement`

After complete continuous route:

`Northern Stable Transport = 100% of monthly requirement`

Monthly reserve loss:

`max(0, 1 - StableTransport/100)`

Therefore:

- incomplete route: `-0.57 months reserve per expedition/month`
- complete route: `0 reserve loss`

The expedition's newly established route state is used for the month-end balance. Thus completing Sector 10 during the month prevents that month's net reserve loss.

Route completion stops ongoing depletion; it does not instantly refill previously consumed reserve.

## 5. HQ Operational Cost

Every expedition has an HQ cost.

Prototype formula:

- Base deployment: `5`
- Carried supply replenishment: `round(spent carried supply × 0.12)`
- Medical/recovery: `8 × injured heroes`
- Disruption:
  - `2 × SETBACK events`
  - `6 × FAILURE events`
  - additional `4` if expedition-level Result is FAILURE
- total capped at `40` per expedition

HQ reserve is persistent:

`HQ_after = max(0, HQ_before - HQ_cost)`

Purpose of the formula is not economic realism. It must produce the tested phenomenon:

`costly / failed expedition → lower organizational freedom next month`

## 6. HQ → Next Expedition Constraint

Next expedition carried-supply ceiling:

`SortieCapacity = clamp(50 + 0.5 × HQ Operational Reserve, 50, 100)`

Examples:

- HQ 100 → carried supply 100
- HQ 80 → 90
- HQ 50 → 75

Lower carried supply affects existing Outcome readiness through the already-established expedition state formula. This is intentional: persistent organizational loss must be capable of worsening later execution conditions.

## 7. Mission Status vs Expedition Result

These are separate authorities.

### Expedition Result

One-month operational result:

- SUCCESS
- PARTIAL SUCCESS
- FAILURE

### Mission Status

Persistent mission state:

- ACTIVE
- SUCCESS
- FAILED

Mission SUCCESS:

`continuous operational route reaches Sector 10`

Mission FAILED:

- northern settlement reserve reaches 0 before completion, OR
- HQ Operational Reserve reaches 0 before completion

An expedition FAILURE does not itself close the mission.

## 8. Partial Success Value

Partial route progress does not improve End-to-End northern transport while a downstream bottleneck remains.

Its persistent value remains:

- secured sectors are retained
- next expedition begins after the secured frontier
- future attention/cost can be concentrated on unresolved sectors

However each additional attempt also consumes:

- one month of northern reserve pressure
- HQ Operational Reserve

Thus partial progress must be evaluated against elapsed time and organizational cost.

## 9. UI / AAR Requirements

Mission screen must show at minimum:

- current month
- Mission Status
- route frontier
- northern stable transport
- northern settlement reserve
- HQ Operational Reserve
- next sortie carried-supply ceiling
- current bottleneck
- expected monthly northern reserve loss

AAR must distinguish:

1. one-month Expedition Result
2. persistent Mission Status
3. route / information gain
4. northern reserve change
5. HQ reserve change and cost breakdown
6. next sortie carried-supply ceiling
7. personal appraisal / Trust / Experience

## 10. New Invariants

1. One successful/failed expedition always advances one month.
2. Northern reserve is settlement-owned; HQ cost may not directly subtract from it.
3. HQ reserve is organization-owned; northern shortage may not directly subtract from it.
4. Expedition carried supply is temporary and separate from both persistent stores.
5. Incomplete upstream route progress cannot raise End-to-End northern transport.
6. Completing Sector 10 prevents ongoing monthly reserve depletion but does not refill spent reserve.
7. Expedition FAILURE is not identical to Mission FAILED.
8. Failure must be capable of worsening later operational conditions through HQ reserve.
9. No additional economic resource is authorized in v0.2.3.
10. Multiple routes remain deferred.

## 11. Non-Goals Added

v0.2.3 does NOT add:

- HQ money
- food types
- medical inventory
- population simulation
- starvation casualties
- taxation
- production
- replenishment logistics
- route maintenance
- multiple routes
- rescue mission generation

Those require later evidence and Contract Change.

## 12. Human Validation Gate

Gate M remains OPEN until a human can explain without Debug Trace:

- how much time one expedition consumed
- why northern reserve changed
- why HQ reserve changed
- how a failed expedition changes next month's options
- the difference between Expedition FAILURE and Mission FAILED
- why partial route progress can still be useful

Only after this passes should Character / Recomposition validation continue.
