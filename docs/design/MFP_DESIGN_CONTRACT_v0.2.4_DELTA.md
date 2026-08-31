# MFP Design Contract v0.2.4 Delta — Gate A Character Distinction

Artifact: `YU100-MFP-DESIGN-CONTRACT-v0.2.4-DELTA`

Status: APPROVED FOR HUMAN GATE A PREPARATION

Upstream:
- MFP Design Contract v0.1
- MFP Design Contract v0.2 Delta
- MFP Design Contract v0.2.1 Delta
- MFP Design Contract v0.2.2 Delta
- MFP Design Contract v0.2.3 Delta

## 1. Gate M Decision

Gate M — Mission Integrity is CLOSED for the current MFP.

Human validation established that the tester can distinguish:
- mission purpose: establish the northern supply route
- expedition reach vs surveyed state vs operational route state
- local sector success vs end-to-end route completion
- expedition carried supplies vs northern settlement reserve
- northern settlement reserve vs HQ operational reserve
- one expedition failure vs overall mission failure
- temporal pressure from one expedition = one month
- persistent value of partial progress and the bottleneck rule

No unresolved Mission-semantics issue currently blocks character-focused validation.

## 2. Next Validation Target

Gate A — Character Distinction

Question:

> Without being told the internal personality values, can a human recognize stable and meaningful behavioral differences between heroes and leaders from proposals, decisions, appraisals and history?

This gate is about perceived behavioral identity, not whether the internal equations mathematically differ. The latter already has supporting headless evidence from VS-01 through VS-09.

## 3. Contamination Correction

Earlier playable versions exposed qualitative personality descriptors such as:
- 大胆 / 慎重
- 仲間を重視
- 方針を重視
- 現場判断型

Those labels contaminate Gate A because the human can merely repeat the supplied interpretation.

MFP v0.2.4 therefore hides initial personality labels from normal Roster / Formation UI.

Visible before behavioral history exists:
- hero name
- Combat grade
- Explore grade
- Resilience grade

Not visible:
- raw Risk / Cohesion / Discipline / Ambition values
- qualitative labels derived directly from those values

After expeditions, short observations may appear because they are derived from actual behavior / appraisal history.

## 4. Existing Knowledge Caveat

The current human tester has seen personality descriptors in earlier MFP versions. Therefore v0.2.4 is not a pristine first-exposure blind study.

Interpretation:
- DO evaluate whether behavior itself is recognizable and memorable without the labels being present.
- DO NOT claim that successful identification proves zero-cue blind inference.

If a future independent tester is available, the same build can be used for a stronger blind replication.

## 5. Gate A Human Procedure

### Trial A1 — Baseline observation

Fresh validation state.

Keep defaults:
- Party: H01 / H02 / H07 / H05
- Leader: H01
- Risk: NORMAL
- Priority: SURVIVAL

Run one expedition.

Before changing anything, record:
1. Which heroes seemed behaviorally distinctive?
2. What did each distinctive hero actually propose, decide or say after the expedition?
3. Which hero would you trust as leader for this mission, and why?
4. Which hero would you avoid as leader, and why?

Reasons should preferably be behavioral rather than simply ability-grade based.

### Trial A2 — Leader contrast

Reset validation state.

Keep party / Risk / Priority unchanged.
Change only the leader from H01 to H02.
Run one expedition.

Compare:
- selected actions
- use of advice
- route progress
- cost / risk exposure
- personal appraisal

This is a human perceptual contrast. It is not treated as a pristine randomized causal experiment because the MFP runtime seed currently includes player configuration. Headless VS-01 remains the stronger causal control for leader contrast.

### Trial A3 — Optional second contrast

Only if A1/A2 are insufficiently informative:
- reset
- same party / policy
- leader H07

Do not add more content merely to force a contrast.

## 6. Gate A Acceptance

Gate A PASS requires that, after a small number of runs, the human can do most of the following without consulting hidden personality values:

1. Describe at least 3 of the 4 frequently observed heroes in behavioral terms.
2. Cite actual proposals / decisions / appraisal evidence for those descriptions.
3. Perceive a meaningful leader difference in at least one comparison.
4. State a mission-specific preference for a leader based on behavior, not only Combat / Explore / Resilience grades.
5. Predict at least one plausible future behavior of a hero and then test it.

Strong FAIL indicators:
- heroes feel interchangeable except for ability grades
- personal appraisals feel decorative and unrelated to decisions
- leader changes are not perceptible to the human
- the tester cannot form expectations about a hero

## 7. Preserved Scope

No change to:
- four internal personality axes
- ability model
- Perception → Proposal → Leader Decision
- Trust / Experience
- temporal pressure
- HQ operational reserve
- northern settlement reserve
- bottleneck rule
- single-route scope

No fifth personality axis is authorized.

## 8. Next Gate

If Gate A passes, proceed to Gate B — Recomposition:

> Does understanding those people actually make the player want to change party composition, leader or policy for the next mission state?

If Gate A fails, do not add schools, generations, nations, diplomacy or culture. Diagnose character differentiation first.
