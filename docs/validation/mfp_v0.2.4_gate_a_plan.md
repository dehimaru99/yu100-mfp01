# MFP v0.2.4 Gate A Human Validation Plan

Artifact: `YU100-MFP-v0.2.4-GATE-A-PLAN`

## Status

- Gate M — Mission Integrity: CLOSED
- Gate A — Character Distinction: READY FOR HUMAN RETEST
- Gate B — Recomposition: NOT YET EVALUATED
- Gate C — Causal Clarity: PARTIALLY SUPPORTED BY PRIOR TESTS
- Gate D — Curiosity: NOT YET EVALUATED

## Why Gate M is Closed

Human review reached stable understanding of:
- why the northern route mission exists
- what expedition reach means
- what surveyed information means
- what operational route means
- why one unresolved sector blocks end-to-end completion
- why a locally completed Sector 10 does not complete the mission if an earlier sector remains unresolved
- why partial progress persists
- who owns the northern settlement reserve
- how HQ operational reserve differs from expedition supplies
- how one month of expedition time creates persistent pressure

No additional Gate M feature is required before character validation.

## Gate A Contamination Control

MFP v0.2.4 removes initial qualitative personality tags from Roster and Formation.

The tester sees only:
- names
- ability grades
- observations generated after actual expedition history

Internal Risk / Cohesion / Discipline / Ambition remain present but hidden.

Caveat: the existing tester has seen earlier qualitative labels. Therefore this is a reduced-contamination retest, not a pristine blind experiment.

## Required Human Trial A1

1. Reset validation state.
2. Do not optimize the initial party.
3. Keep:
   - H01 / H02 / H07 / H05
   - Leader H01
   - NORMAL
   - SURVIVAL
4. Run one month.
5. Read proposals, leader decision, AAR and Personal Appraisal.
6. Report naturally:
   - who seemed distinctive
   - what behavior created that impression
   - who seems appropriate / inappropriate as leader for this mission
   - what you expect those people to do next time

Do not inspect Debug Trace for personality values before answering.

## Required Human Trial A2

1. Reset validation state again.
2. Keep the same party, Risk and Priority.
3. Change only the visible leader selection to H02.
4. Run one month.
5. Compare with A1.

Focus on whether the different leader produces a recognizable organizational feel, not merely a different numeric outcome.

## Interpretation Boundary

Runtime scenario noise is deterministic but the current seed includes player configuration. Therefore A1 vs A2 is a human-perception comparison, not a strict isolated causal experiment.

Causal leader differentiation already has supporting headless evidence from VS-01. If human perception contradicts the headless result, the human result wins for the fun hypothesis: mathematically different but perceptually indistinguishable characters are insufficient.

## PASS Evidence

Strong evidence for Gate A:
- at least three heroes can be described behaviorally
- descriptions cite observed actions or appraisals
- tester develops expectations before the next expedition
- at least one leader feels specifically better or worse for this mission for a non-stat reason
- leader contrast changes how the expedition is interpreted

## FAIL Evidence

- only ability grades distinguish heroes
- proposals look random rather than characteristic
- Personal Appraisal feels detached from earlier behavior
- changing leader does not change the perceived organization
- tester cannot predict any future behavior

## Stop Rule

If A1 and A2 already clearly fail, stop. Do not add more heroes or events.

If they are ambiguous, A3 may use H07 as leader after another reset.

Do not proceed to upper-layer systems until Gate A and Gate B are evaluated.
