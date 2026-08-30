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
- Current Design Delta: v0.2 + v0.2.1 clarification
- Headless Simulation Validation: VS-01〜VS-09 PASS（Decision Model知見は保持）
- Playable Shell: **v0.2.1**
- Human Validation: **Gate M RETEST REQUIRED**

v0.2 Human ValidationではMission目的自体は理解された一方、以下のResult Readability不足が確認された。

- 遠征到達 / 調査済み / 補給路運用可能の意味が一見して区別しづらい
- 遠征携行物資の消費と、輸送能力 / 生活備蓄見込みの因果関係が不明瞭

v0.2.1ではシミュレーションのDecision / Outcome baselineを変更せず、用語と因果表示を修正した。

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

## v0.2.1 Result Vocabulary

- **遠征到達** — 今回の部隊が物理的に進んだ最深地点
- **調査済み** — 状況情報を持ち帰った地点
- **補給路運用可能** — 継続輸送に使えることを確認した連続区間

これらを同一のSector表示上で区別する。

### Cost / Effect Boundary

`遠征携行物資` は今回の遠征を継続する余力であり、MFP v0.2.1では北部集落の生活備蓄とは別勘定とする。

したがって:

`遠征携行物資消費 → 今回の遠征余力低下`

`補給路運用範囲拡大 → 輸送能力上昇 → 平常時の生活備蓄見込み上昇`

を明示的に分離して表示する。

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
- Operational Route Frontier / Transport Capability / Reserve Outlook / Information
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
    MFP_DESIGN_CONTRACT_v0.2.1_DELTA.md
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
