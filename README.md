# YU100 MFP 01

『勇者百年計画』再設計案の **Minimum Fun Prototype (MFP)** 検証用リポジトリ。

## Purpose

完成版を作ることではなく、以下の中核ループが人間にとって成立するかを検証する。

> 委任 → 観察 → 理解 → 改善

Primary Question:

> AARを見たプレイヤーが、次は編成・隊長・方針を変えて試したいと思うか。

## Current Stage

- Design Contract: v0.1
- Headless Simulation Validation: VS-01〜VS-09 PASS
- Human Validation: VS-10 pending
- Playable Shell: v0.1

Headless PASSは「ゲームとして面白い」ことを意味しない。VS-10 Human Validationで人物識別性、因果理解、能力値以外の理由による再編成、再試行動機を確認する。

## MFP Scope

- 8 Heroes
- 4-person Party
- 1 Leader
- Risk Policy / Priority
- Fixed 12-Sector world
- 5 Decision Event types
- Perception → Proposal → Leader Decision
- Directional Trust
- Experience
- Decision / Outcome separation
- AAR
- Recomposition

## Explicit Non-Goals

MFPでは以下を実装しない。

- 学校・教育
- 引退・世代交代
- 国家・外交
- 文化・制度
- 経済
- 装備・職業・スキルツリー
- 手動戦闘
- LLMによる意思決定
- 大規模迷宮
- オンライン協力

## Repository Layout

```text
index.html                 # VS-10用Playable Shell
README.md
.nojekyll

docs/
  validation/
    validation_report_v001.md
    validation_results_v001.json

validation/
  validation_harness_v001.py
```

Design Contract本体は後続bootstrapで `docs/design/` に配置する。

## Validation Gates

- Gate A — Character Distinction
- Gate B — Recomposition
- Gate C — Causal Clarity
- Gate D — Curiosity

いずれかが明確にFAILした場合、学校・文化・外交・世代交代等の上位システムへ進まない。

## Hosting

`index.html` は静的Webアプリ。GitHub Pages等のHTTPS静的ホスティングからiPhone Safariで実行する想定。

