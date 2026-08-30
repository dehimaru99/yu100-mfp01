# MFP v0.2.3 Temporal Pressure / HQ Operational Reserve Report

Artifact: `YU100-MFP-v0.2.3-TEMPORAL-PRESSURE-REPORT`

## Purpose

Verify the minimum persistent-cost loop introduced after v0.2.2 Human Review.

## Preserved

- 8-hero fixture
- Perception → Proposal → Leader Decision
- Risk / Cohesion / Discipline / Ambition model
- Trust / Experience updates
- MFP02 deterministic seed namespace
- single route / Sector 10 objective
- End-to-End bottleneck semantics

## Added

- 1 expedition = 1 month
- northern settlement actual reserve, initial 2.00 months
- monthly shortage depletion while route incomplete
- HQ Operational Reserve, initial 100%
- expedition cost applied to HQ
- next sortie carried-supply ceiling derived from HQ reserve
- Expedition Result / Mission Status separation
- terminal Mission SUCCESS / FAILED state

## Source-level Checks

Expected indicator invariants:

- `transport(frontier < 10) = 43`
- `transport(10) = 100`
- `monthlyDeficit(frontier < 10) = 0.57`
- `monthlyDeficit(10) = 0`
- `sortieCapacity(100) = 100`
- `sortieCapacity(80) = 90`
- `sortieCapacity(50) = 75`

## Local Node Smoke — Default Fixture

The default unchanged party / leader / NORMAL / SURVIVAL trajectory produced:

1. Month 1: PARTIAL SUCCESS, frontier 4→7, north reserve 2.00→1.43, HQ 100→87, next supply cap 94
2. Month 2: FAILURE, frontier 7→7, north reserve 1.43→0.86, HQ 87→72, next supply cap 86
3. Month 3: FAILURE, frontier 7→7, north reserve 0.86→0.29, HQ 72→59, next supply cap 80
4. Month 4: FAILURE, north reserve reaches 0, Mission FAILED

This demonstrates that repeated unchanged attempts are not free.

## Alternative-path Sanity Check

The deterministic fixture still contains successful trajectories before depletion. Examples found by enumeration with the same four starting heroes:

- Haruto leader / CONSERVATIVE / RESCUE: Month 1 frontier→8, Month 2 Sector 10 connection → Mission SUCCESS
- Lloyd leader / AGGRESSIVE / RESCUE: completes by Month 3

After the default Month 1 state (frontier 7, north 1.43, HQ 87), changing to Haruto / CONSERVATIVE / RESCUE still yielded a recoverable path to Mission SUCCESS before reserve depletion.

This is not balance certification. It only confirms that temporal pressure does not make the fixture deterministically unwinnable.

## UI Smoke

Minimal mock-DOM execution verified:

- app initialization succeeds
- first expedition succeeds as a simulation call
- AAR contains Month information
- AAR contains HQ Operational Reserve
- Mission view contains Northern Settlement Reserve

## Human Retest Questions

Without opening Debug Trace:

1. How much time did the expedition consume?
2. Why did northern settlement reserve decrease or stop decreasing?
3. Why did HQ Operational Reserve decrease?
4. What changed about the next expedition because of HQ loss?
5. Was the expedition a failure, and is the whole Mission already failed?
6. What would you change next, given remaining time and HQ reserve?

## Status

`SMOKE PASS / HUMAN RETEST REQUIRED`

This report does not authorize upper-layer systems.
