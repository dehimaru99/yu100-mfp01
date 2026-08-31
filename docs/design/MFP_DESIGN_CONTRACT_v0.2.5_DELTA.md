# MFP Design Contract v0.2.5 Delta — Action Profile Readability

Artifact: `YU100-MFP-DESIGN-CONTRACT-v0.2.5-DELTA`

Status: APPROVED FOR GATE A HUMAN RETEST

Upstream:
- MFP Design Contract v0.1
- MFP Design Contract v0.2 Delta
- v0.2.1 Result Readability clarification
- v0.2.2 End-to-End Bottleneck correction
- v0.2.3 Temporal Pressure / HQ Operational Reserve
- v0.2.4 Gate A Character Distinction preparation

## 1. Reset Reason

Gate A A1 human observation found that the four characters did not leave a strong impression, even though the generated proposals differed materially by character.

Observed example:
- Haruto: rescue / push / proceed
- Aria: report / retreat / scout
- Lloyd: report / reduce / proceed
- Mina: rescue / retreat / scout

Therefore the immediate problem is not proven to be insufficient character parameters. A competing hypothesis is that behavioral differences exist in the model but are difficult for the player to integrate into a coherent character image.

## 2. v0.2.5 Objective

Test whether compact causal framing can make existing behavior differences legible before changing the simulation equations.

No new personality axis is introduced.

No new Outcome modifier is introduced.

## 3. Action Profile

Each possible Action receives a display-only qualitative profile across five axes:

- Mission — tendency to advance the primary mission
- Safety — tendency to preserve immediate safety
- Preserve — tendency to preserve operational resources
- Learning — tendency to acquire information / learning opportunity
- Relation — tendency to protect or prioritize human relationships

Display notation:

- `↑↑` strongly favors
- `↑` favors
- `→` approximately neutral
- `↓` sacrifices
- `↓↓` strongly sacrifices

Example:

`PUSH: Mission ↑↑ / Safety ↓↓ / Preserve ↓↓`

`SCOUT: Mission ↑ / Safety ↑ / Preserve ↓ / Learning ↑↑`

## 4. Critical Semantic Boundary

Action Profile is a **readability aid**, not an additional causal effect in v0.2.5.

The following interpretation is prohibited:

> `Mission ↑↑` means the simulator added a hidden +2 mission bonus.

Correct interpretation:

> The chosen action is structurally oriented toward mission advancement and usually trades against other dimensions.

Existing Outcome computation remains authoritative.

## 5. Why Display-Only First

Changing presentation and simulation effect simultaneously would prevent diagnosis.

v0.2.5 intentionally changes only legibility so the following can be distinguished:

A. Existing behavioral model is sufficient, but presentation was too weak.

B. Even with readable behavioral tradeoffs, characters still do not matter enough because those differences do not materially affect consequences.

If B is supported by human retest, the next revision may add limited consequence coupling.

## 6. Behavioral Pattern Summary

AAR adds a per-character Behavioral Pattern summary based on the Actions that character proposed during the expedition.

For each character it shows:

- proposal trace by Sector
- average Action Profile tendency
- count of proposals matching the final leader decision

This summary must not expose raw Risk / Cohesion / Discipline / Ambition values.

## 7. Preserved Character Compression

Stable internal personality axes remain exactly four:

- Risk
- Cohesion
- Discipline
- Ambition

No fifth personality axis is authorized.

## 8. Preserved Simulation Baseline

v0.2.5 does not modify:

- Perception equations
- Proposal scoring
- Leader Decision equations
- Outcome equations
- world randomness
- Trust update
- Experience update
- temporal pressure
- HQ operational reserve
- northern settlement reserve
- route bottleneck semantics
- Mission completion / failure conditions

## 9. Human Validation Question

After a fresh run, determine whether the player can more readily answer:

1. Who appeared to prioritize mission advancement?
2. Who appeared to prioritize safety / resource preservation?
3. Who appeared to prioritize learning / rescue / relationship concerns?
4. Can the player predict how at least two characters would differ in the next comparable situation?
5. Does this create a meaningful reason to choose a leader or composition beyond Ability grades?

## 10. Decision Rule

If Action Profile presentation materially improves character recognition:

- retain the compressed four-axis model
- proceed to Leader Contrast / Gate B without adding character parameters

If character recognition remains weak:

- do not add more labels
- evaluate a minimal `character disposition -> execution / consequence / learning` coupling
- preserve causal explainability

## 11. Non-Goals

Not authorized in v0.2.5:

- new personality axes
- hidden direct buffs from profile arrows
- classes / jobs / equipment
- detailed morale system
- interpersonal drama system
- factions / romance
- multiple supply routes
- upper organizational systems

## 12. Invariants

- Action Profile SHALL describe action tradeoffs, not fabricate measured causal effects.
- Raw personality values SHALL remain hidden in normal UI.
- Objective Result SHALL remain independent of Personal Appraisal.
- Existing deterministic simulation baseline SHALL remain unchanged.
- Gate A remains a human-perception gate, not a proof that arrows exist on screen.
