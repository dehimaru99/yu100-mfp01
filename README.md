# YU100 MFP 01

『勇者百年計画』をリスペクトし、その設計思想に着想を得た **独自ゲーム案** の Minimum Fun Prototype (MFP) 検証用リポジトリ。

> 本プロジェクトは非公式の独自プロトタイプであり、原作および原作者との公式な関係・承認を示すものではありません。

## Purpose

完成版を作ることではなく、以下の中核ループが人間にとって成立するかを検証する。

> Need → Mission → 委任 → 観察 → Objective Result → 理解 → 改善

Primary Question:

> 具体的なMissionに対する成果と因果を見たプレイヤーが、次は編成・隊長・方針を変えて試したいと思うか。

## Current Stage

- Base Design Contract: v0.1
- Current Design Delta: v0.2 + v0.2.1 + **v0.2.2 bottleneck correction**
- Headless Simulation Validation: VS-01〜VS-09 PASS（Decision Model知見は保持）
- Playable Shell: **v0.2.2**
- Human Validation: **Gate M RETEST REQUIRED**

v0.2〜v0.2.1 Human ValidationでMission目的と結果語彙は概ね理解されたが、単一路線の途中区間を安全化しただけで北部への輸送能力が比例上昇するモデルは不自然と判断した。

v0.2.2ではEnd-to-Endのボトルネック原則へ修正する。

## Canonical Cycle

`Need → Mission → Party / Leader / Policy → Autonomous Expedition → Objective Result → Cost / Gain → Personal Appraisal → Experience / Trust → Recomposition`

Result表示の優先順位:

1. Mission Purpose
2. Objective Result
3. Cost / Gain
4. Decision / Causal Explanation
5. Personal Appraisal
6. Experience / Trust / Relationship

人物関係はMission Resultを置き換えない。

## Result Vocabulary

- **遠征到達** — 今回の部隊が物理的に進んだ最深地点
- **調査済み** — 状況情報を持ち帰った地点
- **補給路運用可能** — 継続輸送に使えることを確認した連続区間
- **北部安定輸送能力** — 本部から北部集落までEnd-to-Endで安定輸送できる能力
- **北部集落 生活備蓄見込み** — 北部集落側の生活備蓄が何か月維持できるかのDerived Indicator
- **遠征携行物資** — 今回の遠征を継続する余力

## v0.2.2 Bottleneck Rule

MFPでは詳細物流モデルを作らず、単一路線のボトルネック原則だけを検証する。

- Sector 10まで連続した補給路が未完成: 北部安定輸送能力 43%、北部集落生活備蓄見込み 1.4か月
- Sector 10まで連続した補給路が完成: 北部安定輸送能力 82%、北部集落生活備蓄見込み 2.4か月

したがって、Sector 4 → 7まで補給路を改善しても北部への直接効果はまだ発生しない。

部分成功の恒久価値は、**次回遠征で既確立区間を再攻略せず、残る未確立区間へ集中できること**に置く。

`遠征携行物資` と `北部集落 生活備蓄` は別勘定。本部経済・本部備蓄はMFPでは未実装。

## Character Compression

恒常的人格軸は4つに限定する。

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
- Operational Route Frontier / End-to-End Transport Capability / Northern Reserve Outlook / Information
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
- **複数補給路**（将来候補として記録のみ）

## Deferred Candidate — Multiple Supply Routes

将来、同一目的地に対してリスク / 輸送量 / 距離 / 冗長性が異なる複数補給路を持たせる案を検討可能。

例: 短く危険な高容量路 / 長く安全な低容量路 / 予備路。

MFP v0.2.2には実装しない。単一路線でMission → Result → Recompositionが成立した後に再評価する。

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
    MFP_DESIGN_CONTRACT_v0.2.1_DELTA.md
    MFP_DESIGN_CONTRACT_v0.2.2_DELTA.md
  validation/
    validation_report_v001.md
    validation_results_v001.json
    mfp_v0.2_smoke_report.md
    mfp_v0.2.1_gate_m_revision_report.md

validation/
  validation_harness_v001.py
```

## Validation Gates

- Gate M — Mission Integrity（precondition）
- Gate A — Character Distinction
- Gate B — Recomposition
- Gate C — Causal Clarity
- Gate D — Curiosity

Gate MがFAILした場合、A〜DのHuman Validation結果は有効とみなさない。

学校・文化・外交・世代交代等の上位システムへは、Gate M成立前に進まない。

## Hosting

GitHub PagesからiPhone Safariで実行する静的Webアプリ。

Publishing Source: `main` / `/ (root)`
