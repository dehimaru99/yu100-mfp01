# MFP Design Contract v0.2.6 Delta — Decision Consequence Readability

Status: READY FOR HUMAN RETEST
Upstream: MFP v0.2.5 Action Profile Readability
Gate: A — Character Distinction / Causal Readability support

## 1. Human finding

v0.2.5 made Action tradeoffs more visible, but two readability problems remain:

1. Leader selection does not immediately show how leadership is expected to change operational behavior.
2. When the Mission remains incomplete, the player cannot easily identify what prevented the bottleneck Sector from becoming operational.

This weakens character distinction because different proposals are visible without a sufficiently clear connection to Mission consequence.

## 2. Scope

v0.2.6 adds presentation and diagnosis only:

- Dynamic Leader Operational Preview at leader selection.
- Mission Diagnosis for the first unresolved contiguous Sector.
- One causal, trace-grounded field comment from the leader or the member with the weakest relevant capability when appropriate.
- Result vocabulary hierarchy: Local Result / Sector State / Expedition Result / Mission Status.

## 3. Non-change invariant

The simulation equations are not changed.

No new modifier is added to:

- Perception
- Proposal scoring
- Leader Decision
- Outcome score
- Safe-route rule
- Trust
- Experience
- HQ cost
- Northern reserve
- Mission completion/failure

The diagnostic layer may expose already-used intermediate components (`Action Fit`, party capability, readiness, variance) for explanation, but it must not alter their values or weights.

## 4. Leader Operational Preview

Changing the selected leader updates a qualitative preview before expedition start.

The preview must not claim a numerical success probability and must not claim that Combat / Explore / Resilience base grades are buffed by leadership.

It shows:

- expected Action Profile over remaining fixture Sectors under the current Mission / Risk / Priority;
- current directional trust toward other selected members;
- explicit note that base abilities are unchanged.

This is an operational tendency preview, not an oracle.

## 5. Mission Diagnosis

If the route remains incomplete, diagnosis targets the first unresolved Sector in the contiguous route.

Primary causal classes:

1. Leader Decision — the chosen action itself does not establish route (`RETREAT`, `AVOID`, `REPORT`).
2. Action Fit — the chosen action was poorly matched to the situation.
3. Required Capability — party capability relevant to that event was insufficient.
4. Expedition Readiness — health/fatigue/supply state was weak.
5. External Variance — adverse local variance materially dominated.

For outcome-driven failures, factors are compared using the same weighted contributions already present in Outcome:

- Action Fit shortfall: `0.45 × (1 - F)`
- Capability shortfall: `0.35 × (1 - C)`
- Readiness shortfall: `0.20 × (1 - readiness)`
- Adverse variance: `max(0, -eta)`

The UI shows only the primary factor and at most one supporting factor. Raw internal scores are not shown as攻略値.

## 6. Character-linked hint

One short field comment is generated from the diagnosed cause.

Speaker selection:

- Decision / Fit / Readiness / Variance: Leader.
- Capability: member with the lowest relevant capability for that event.

The capability speaker is labeled as a formation weakness candidate, not a culprit.

The text must be causally constrained by the trace. It may hint at an improvement direction but must not reveal an exact winning configuration.

## 7. Result vocabulary hierarchy

The following concepts are separated in display:

### Local Result
How well the chosen action was executed locally:
- 非常に良好
- 良好
- 難航
- 不調

### Sector State
Whether that Sector became operational for the route:
- 補給路確立
- 未確立

### Expedition Result
What this month achieved at the expedition level:
- 目標達成
- 前進あり
- 前進なし

### Mission Status
Persistent overall state:
- MISSION ACTIVE
- MISSION COMPLETE
- MISSION FAILED

A locally good response is therefore allowed to coexist with an unresolved Sector and an overall Mission failure without semantic collision.

## 8. Human validation questions

After a fresh reset:

1. Does changing only the leader make the expected behavioral difference legible before launch?
2. On an incomplete route, can the player identify the primary bottleneck and a plausible improvement direction?
3. Can the player distinguish Local Result, Sector State, Expedition Result, and Mission Status?
4. Does the causal field comment make the responsible character behavior easier to remember?
5. If character distinction remains weak after these changes, treat that as evidence for bounded mechanical consequence coupling rather than adding more personality axes.

## 9. Explicit non-goals

Not authorized in v0.2.6:

- personality-axis expansion
- direct personality buffs/debuffs to Outcome
- leader skill system
- new mission
- multiple routes
- economy expansion
- school / nation / generation systems
