# MFP Design Contract v0.2.7 Delta — Actionable Diagnosis

## Status

- Upstream: MFP v0.2.6 Decision Consequence Readability
- Scope: presentation / diagnosis translation only
- Simulation equations: UNCHANGED
- New personality axes: NONE
- New leader buff/debuff: NONE

## Human Finding

v0.2.6 made the failure category legible, but the diagnosis remained too abstract to answer the player's next question:

> What exactly should I change?

A related ambiguity was that a character message such as "the method did not fit the situation" did not clearly show whether the problem was:

- leader choice,
- required ability,
- expedition readiness,
- or external variance.

## Design Objective

Convert diagnosis into a bounded action chain:

`Cause → Relevant Capability → Current Formation → Change Lever → Grounded Character Hint`

The UI must not imply that ability is the cause when another factor was dominant.

## Diagnostic Layers

### 1. Primary Cause

Retain v0.2.6 categories:

- Leader Decision
- Action Fit
- Required Capability
- Expedition Readiness
- External Variance

### 2. Relevant Capability

Always show the capability used by the current Outcome model for the bottleneck Sector.

- UNKNOWN_ROUTE: Explore 75% + Resilience 25%
- ENEMY: Combat 70% + Resilience 30%
- INJURY: Resilience 100%
- STRANDED: Resilience 100%
- SUPPLY: Resilience 100%

For the last three, the UI gives a contextual name while explicitly retaining the compressed underlying Resilience model:

- Injury Response
- Rescue Continuity
- Attrition Tolerance

If Required Capability is not the primary cause, label this block as:

> Capability view — not necessarily the primary cause

### 3. Current Formation Contrast

Show:

- current party average grade for the relevant capability axes,
- the relatively weakest current member for that Sector,
- the strongest currently unselected comparison candidate by the same existing composite ability.

This is a comparison aid, not a declaration that the weakest member is responsible for failure.

### 4. Change Lever

Show no more than two concrete next changes.

#### Leader Decision

- Identify a route-capable Action with better fit.
- If a current member actually proposed that Action, surface that member as a leader comparison candidate.
- Otherwise surface a Policy change only when the existing `pb()` equation directly supports that Action family.

#### Action Fit

- Compare the selected Action with the best route-capable Action under the existing `fit()` model.
- If a different Action is materially preferred, identify a member that actually proposed it when available.
- If no better Action exists, redirect the player toward capability/readiness rather than inventing a tactical answer.

#### Required Capability

- State the existing ability mix.
- Show current party grades.
- Suggest one current-member → unselected-member comparison using the same composite ability.

#### Expedition Readiness

Use the existing readiness components:

`0.60 Health + 0.25 (1-Fatigue) + 0.15 Supplies`

Identify which weighted shortfall contributed most and recommend reducing that form of early attrition. A more preserving current leader candidate may be shown.

#### External Variance

Do not recommend personnel change as the default answer. Tell the player that the run is not strong evidence of a personnel problem and that reproduction should be checked first.

## Character Hint Rule

The short field comment must mention the actionable interpretation when the trace supports it.

Examples:

- Decision: "REPORT does not establish the route; next time I want a setup that can choose SCOUT."
- Fit: "PROCEED did not fit; SCOUT may have fit this situation better."
- Capability: "Explore and Resilience were insufficient here; review the formation."
- Readiness: "We spent too much supply before reaching this point."
- Variance: "The local shock was dominant; do not blame personnel alone."

The comment remains a trace-grounded hint, not free-form narrative authority.

## Epistemic Boundaries

- No success percentage is shown.
- No target grade such as "A required" is invented because the simulation has no such discrete threshold.
- A stronger unselected candidate is a comparison candidate, not a guaranteed fix.
- Policy guidance is only shown when the existing policy-bias equation directly supports the Action family.
- Ability is shown on every bottleneck diagnosis for contrast, but only labeled as insufficient when Required Capability is the primary cause.

## Acceptance Question

After one failed or partial expedition, can the player answer all three without reading Debug Trace?

1. What was the dominant cause?
2. Which ability mattered in that Sector, and how does the current party compare?
3. Which one or two controllable variables should I change next?

If yes but character distinction remains weak, further presentation changes are unlikely to solve Gate A; proceed to bounded mechanical consequence coupling review.
