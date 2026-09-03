# MFP v0.2.6 — Decision Consequence Readability Report

## Trigger

Human observation after v0.2.5:

- Leader selection should show expected change dynamically at selection time.
- When the Mission is not achieved, it is difficult to see what was insufficient.
- This may also make character differences difficult to perceive.
- Character remarks may be used as a subtle hint when grounded in the largest causal weakness, especially the leader or the member with the weakest relevant capability.

## Implemented diagnostic hypothesis

Character distinction may be present in Proposal output but remain psychologically weak because the player cannot map:

`person -> decision -> consequence -> improvement`.

v0.2.6 tests that hypothesis without changing the simulation mechanics.

## Added surfaces

### Formation
Dynamic leader operational preview.

### Expedition
Local execution result and Sector establishment state are shown separately.

### AAR
Mission Diagnosis appears near the top and identifies:

- first unresolved contiguous Sector;
- primary cause candidate;
- one supporting cause candidate;
- one trace-grounded field comment.

## Safety against false explanation

The diagnosis does not fabricate a causal bonus. It uses the same components already present in Outcome and the actual final Action.

Adverse variance is explicitly allowed to be the primary cause. In that case the UI must not imply that changing the leader would necessarily fix the result.

## Interpretation rule

If v0.2.6 materially improves character distinction, presentation/causal compression was a major bottleneck.

If the player still cannot associate characters with meaningful operational consequences, the next change should be a small, testable mechanical coupling from character/leadership differences into consequence or growth. Do not add personality axes first.
