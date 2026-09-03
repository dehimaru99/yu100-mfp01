# MFP v0.2.7 — Actionable Diagnosis Human Validation

## Purpose

Test whether the player can convert a failed/partial result into a concrete next experiment without Debug Trace.

## Preserved Baseline

- Simulation equations unchanged.
- Personality values/labels remain hidden.
- v0.2.6 cause categories retained.
- v0.2.6 result vocabulary hierarchy retained.

## Added Readability

Mission Diagnosis now presents:

1. primary cause,
2. relevant capability for that Sector,
3. current formation contrast,
4. at most two concrete change levers,
5. one trace-grounded character hint.

## Test Setup

Fresh reset:

- Party: H01 / H02 / H07 / H05
- Leader: H01
- Risk: NORMAL
- Priority: SURVIVAL

Run one expedition and review AAR.

## Human Questions

Without opening Debug Trace:

1. What caused the first unresolved Sector to remain unestablished?
2. What capability mattered in that Sector?
3. Was capability actually the primary cause, or merely contextual information?
4. What exact change would you try next: leader, policy, formation, or no immediate personnel change?
5. Does the character hint make the person easier to remember as someone whose decisions affect outcomes?

## PASS Signal

The player can state a specific next experiment such as:

- "Change leader to Aria because she proposed SCOUT at the bottleneck."
- "Replace Lloyd with Sera because route reading was the dominant capability problem."
- "Keep personnel; the external shock was dominant, so do not overreact."

The exact chosen experiment need not be globally optimal. The requirement is that it is causally connected to the displayed diagnosis.

## FAIL Signal

- Player still says "I know what went wrong but not what to change."
- Ability block appears to imply blame when capability was not primary.
- Suggested leader/policy does not correspond to the actual decision equations.
- Suggested personnel replacement appears as a guaranteed solution.
- The additional explanation increases text without improving the next decision.

## Next Decision

If this layer passes but Gate A character distinction remains weak, stop adding explanation layers. Review bounded mechanical consequence coupling between disposition/leader relation and Outcome / learning / cohesion.
