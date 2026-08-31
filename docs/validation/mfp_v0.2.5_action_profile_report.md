# MFP v0.2.5 Action Profile Validation Report

Artifact: `YU100-MFP-v0.2.5-ACTION-PROFILE-REPORT`

Status: IMPLEMENTATION PRE-MERGE / HUMAN RETEST REQUIRED

## Human Finding

Gate A A1 baseline produced visible proposal differences but weak subjective character distinction.

Human observation:

> 取り立てて強い印象はない

Diagnosis candidate:

- Character parameters already generate different proposals.
- Those differences may be experienced as text variation rather than meaningful consequence or stable behavioral identity.
- Character labels were already removed in v0.2.4, so adding more labels would not solve this directly.

## v0.2.5 Intervention

Add display-only Action Profiles to proposals and leader decisions.

Axes:
- Mission
- Safety
- Preserve
- Learning
- Relation

Notation:
- ↑↑ / ↑ / → / ↓ / ↓↓

AAR additionally summarizes each character's proposed actions and average profile tendency.

## Causal Boundary

No simulation equation is changed.

The arrows are not hidden numeric modifiers and do not claim measured contribution to the final Outcome.

They are a semantic compression of the tradeoff represented by each Action.

## Validation Purpose

This revision isolates presentation from mechanics.

If human character distinction improves, presentation was a substantial bottleneck.

If it does not improve, a later revision should test limited mechanical consequence coupling rather than adding more personality dimensions.

## Retest Procedure

Fresh reset.

Baseline configuration:
- Party: Haruto / Aria / Lloyd / Mina
- Leader: Haruto
- Risk: NORMAL
- Priority: SURVIVAL

Run one expedition and review:

1. Event proposals with Action Profile arrows.
2. Behavioral Pattern summary in AAR.
3. Personal Appraisal.

Record:

- Which character, if any, now leaves a clear impression.
- What tradeoff that character seems to prefer.
- Whether the impression is grounded in actual proposals rather than remembered personality labels.
- Whether the profile display feels informative or merely decorative / leading.
- Whether a mechanical effect is still needed for the character difference to matter.

## Acceptance Guidance

Strong positive evidence:
- At least 2–3 characters become distinguishable in behavioral terms without consulting hidden traits.
- Player can connect proposed Actions to recognizable tradeoffs.
- Player can make or predict a leader / composition choice based on those tradeoffs.

Weak / negative evidence:
- Arrows are understood but do not make characters matter.
- Player sees different styles but considers them cosmetic.
- Ability grades remain the only meaningful basis for selection.

In the weak / negative case, proceed to a bounded mechanical-coupling design review rather than increasing personality-axis count.
