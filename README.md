# YU100 MFP 01

『勇者百年計画』再設計案の **Minimum Fun Prototype (MFP)** 検証用リポジトリ。

## Purpose

完成版を作ることではなく、以下の中核ループが人間にとって成立するかを検証する。

> Need → Mission → 委任 → 観察 → Objective Result → 理解 → 改善

Primary Question:

> 具体的なMissionに対する成果と因果を見たプレイヤーが、次は編成・隊長・方針を変えて試したいと思うか。

## Current Stage

- Base Design Contract: v0.1
- Current Design Delta: v0.2
- Headless Simulation Validation: VS-01〜VS-09 PASS（Decision Model知見は保持）
- Playable Shell: **v0.2**
- Human Validation: **VS-10 READY FOR RETEST**

v0.1 Human Validationで確認された `Mission Feedback Loop` 欠落を受け、v0.2ではMission Contract / Objective Result / Derived Indicator / Personal Appraisalを実装した。

Human Validationは Gate M — Mission Integrity から再開する。

## MFP v0.2 Canonical Cycle

`Need → Mission → Party / Leader / Policy → Autonomous Expedition → Objective Result → Cost / Gain → Personal Appraisal → Experience / Trust → Recomposition`

Result表示の優先順位:

1. Mission Purpose
2. Objective Result
3. Cost / Gain
4. Decision / Causal Explanation
5. Personal Appraisal
6. Experience / Trust / Relationship

人物関係はMission Resultを置き換えない。

## Character Compression

MFP v0.2の恒常的人格軸は4つに限定する。

- Risk — 安全 ↔ 挑戦
- Cohesion — 自己保存 ↔ 仲間・集団
- Discipline — 現場自律 ↔ 規律・権威
- Ambition — ほどほどで充足 ↔ 達成・承認

Fairness / Recognition / Loyalty / 忖度 / Curiosity / Legacy等を独立軸として追加しない。まず4軸 + Ability + Experience + Role + Trust + History + Situationの組合せで表現する。

通常UIでは内部人格値を直接表示せず、行動・事後評価・履歴から人物像を推測させる。

## MFP Scope

- 8 Heroes / 4-person Party / 1 Leader
- 1 Canonical Need / Mission
- Risk Policy / Priority
- Safe Route Frontier / Transport Capability / Reserve Outlook / Information
- Perception → Proposal → Leader Decision
- Directional Trust / Experience
- Objective Mission Result / Cost / Gain
- Personal Appraisal
- AAR / Recomposition

## Explicit Non-Goals

- 学校・教育・引退・世代交代
- 国家・外交・文化・制度
- 本格経済・詳細資源管理
- 複数の生活Need / 個人欲求メーター
- 装備・職業・スキルツリー
- 手動戦闘 / LLMによる意思決定
- 大規模迷宮 / オンライン協力
- 恋愛・派閥・政治システム

## Repository Layout

```text
index.html
styles.css
data.js
simulation.js
app.js
.nojekyll
README.md

docs/
  design/
    MFP_DESIGN_CONTRACT_v0.1.md
    MFP_DESIGN_CONTRACT_v0.2_DELTA.md
  validation/
    validation_report_v001.md
    validation_results_v001.json
    mfp_v0.2_smoke_report.md

validation/
  validation_harness_v001.py
```

## Validation Gates

- Gate M — Mission Integrity（v0.2 precondition）
- Gate A — Character Distinction
- Gate B — Recomposition
- Gate C — Causal Clarity
- Gate D — Curiosity

Gate MがFAILした場合、A〜DのHuman Validation結果は有効とみなさない。

学校・文化・外交・世代交代等の上位システムへは、v0.2 VS-10 Human Validation成立前に進まない。

## Hosting

GitHub PagesからiPhone Safariで実行する静的Webアプリ。

Publishing Source: `main` / `/ (root)`
