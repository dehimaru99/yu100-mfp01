# YU100 MFP Design Contract v0.2 — Delta

Artifact: `YU100-MFP-DESIGN-CONTRACT-v0.2-DELTA`

Upstream: `YU100-MFP-DESIGN-CONTRACT-v0.1`

Status: **APPROVED FOR MFP v0.2 PROTOTYPE REVISION**

Scope: v0.1から変更される事項のみ。本Deltaに記載のないv0.1条項は継続する。

---

## 0. Reset Reason / Human Validation Finding

MFP v0.1 Playable Shellの初回Human Validationにおいて、個々のDecision / Outcome / Trust変化は観察可能であった一方、プレイヤーが「何のために遠征し、その目的に対して何を達成したか」を十分に把握できないことが確認された。

Observed Failure:

> 個々の判断は説明できるが、遠征全体の成果が主表示されず、Missionに対するResultが不明瞭である。

これは単なるUI不足ではなく、MFPの中心ループに `Need → Mission → Objective Result` が十分組み込まれていなかったDesign Failureとして扱う。

v0.2では人物関係を主目的にせず、客観的な任務遂行を主軸に戻す。

---

## 1. Revised Core Fun Hypothesis

> プレイヤーは、具体的な必要性から生じた任務に対して勇者を編成・委任し、客観的な任務成果とその因果を観察することで、人物差・隊長差・方針差を理解し、次の編成または方針を改善したくなる。

Canonical Cycle:

`Need → Mission → Party / Leader / Policy → Autonomous Expedition → Objective Result → Cost / Gain → Personal Appraisal → Experience / Trust → Recomposition`

Priority Rule:

1. Mission Purpose
2. Objective Result
3. Cost / Gain
4. Decision / Causal Explanation
5. Personal Appraisal
6. Experience / Trust / Relationship

人物関係はMission Resultを置き換えない。

---

## 2. Need / Mission Contract

MFP v0.2ではNeedを一つに限定する。

### Canonical Need

> 北部集落の生活備蓄が不足している。冬までに安定した補給路を確保する必要がある。

### Canonical Mission

> 北部集落への安全な補給路をSector 10まで確立する。

Mission開始前に最低限以下を明示する。

- Why: なぜ必要か
- Objective: 何を達成するか
- Current State: 現在どこまで成立しているか
- Success Condition
- Partial Success Condition
- Failure Condition

Missionは「Sectorを進むこと」自体ではなく、世界側のNeedを改善するために存在する。

---

## 3. Minimal World / Mission State

詳細な経済・資源シミュレーションは追加しない。

MFP v0.2でMission成果として扱う状態は以下に限定する。

- `Safe Route Frontier` — 安全な補給路が確立した最深Sector
- `Transport Capability` — 必要輸送量に対する実効輸送能力のDerived Indicator
- `Reserve Outlook` — 現状が継続した場合の生活備蓄見込み（月相当）のDerived Indicator
- `Information State` — 調査済み / 未確定のSector情報
- `Expedition Supplies` — 遠征中の消費コスト
- `Injury State` — 人的損耗

`Transport Capability` と `Reserve Outlook` は消費可能なポイントではなく、下位状態から算出されるIndicatorとする。

MFPでは小麦・水・木材・鉄・通貨等への細分化を行わない。

---

## 4. Objective Result Contract

AAR最上段には必ず客観的Mission Resultを表示する。

Required fields:

- Mission Objective
- Result Class: `SUCCESS / PARTIAL SUCCESS / FAILURE`
- Reached Sector
- Safe Route Frontier: Before → After
- Transport Capability: Before → After
- Reserve Outlook: Before → After
- Newly Acquired Information

続いてCostを表示する。

- Supplies consumed
- Injury / incapacity
- Retreat / abort point
- その他、Mission成果へ直接関係する損失

客観的Resultは人物の性格・感情・Trust・評価によって書き換えてはならない。

---

## 5. State → Indicator → Explanation

原作の「評価値による圧縮」は維持するが、ポイントそのものを世界の実体とはしない。

Canonical representation:

`Simulation State → Derived Indicator → Explanation`

例:

`経路状態 / 危険情報 / 損耗 → Transport Capability 68% → なぜ68%なのか`

Player-facing UIでは集約値を用いてよいが、必要に応じて主要因へ降りられること。

原則:

- 実体がある状態はStateとして保持する。
- 抽象値はDerived Indicatorとして扱う。
- Indicatorは説明可能であること。
- 単なる「ポイント獲得」でMission成果を代替しない。

---

## 6. Character Model Compression

MFP v0.1のBehavioral Tendency 3軸を4軸へ変更する。

### Internal Personality Axes

1. `Risk` — 安全重視 ↔ 挑戦重視
2. `Cohesion` — 自己保存 ↔ 仲間・集団重視
3. `Discipline` — 現場自律 ↔ 規律・権威重視
4. `Ambition` — ほどほどで充足 ↔ 達成・承認重視

これ以上の恒常的人格軸をMFP v0.2には追加しない。

Explicitly NOT separate personality axes:

- Fairness
- Recognition
- Loyalty
- Deference / 忖度
- Curiosity
- Legacy
- Reciprocity
- Jealousy

これらは必要になった場合も、まず4軸 + Ability + Experience + Role + Trust + History + Situationの組合せで表現できるかを検討する。

新しい恒常軸の追加はContract Changeとする。

---

## 7. Personality Visibility

4軸の内部数値は通常UIへ直接表示しない。

Player-facing representationは少数の観察語または履歴による。

例:

- 大胆
- 慎重
- 仲間を置いていかない
- 現場判断を好む
- 方針を重視する

`Ambition` は特に初期から「野心家」「成果志向」等と断定表示せず、Mission後の反応や履歴から推測させることを優先する。

Design Principle:

> Data exists internally; personality is learned through observed behavior and appraisal.

---

## 8. Action vs Appraisal Separation

人物の「現場でどう動くか」と「結果をどう受け止めるか」を分離する。

### Action

主として以下から決定する。

`Perception + Risk + Cohesion + Discipline + Mission Policy + Trust + Situation`

### Personal Appraisal

主として以下から決定する。

`Objective Result + Cost + Ambition + Cohesion + Discipline + Role + Trust + History`

Ambitionを現場Decisionへ過剰投入しない。

v0.2では、行動差と事後評価差を同時に複雑化して因果説明を失わないことを優先する。

---

## 9. Personal Appraisal Contract

客観的Mission Resultの後に、各人物がその結果をどう評価したかを表示してよい。

例:

- 高Ambition: 目標未達そのものを強く問題視する。
- 高Cohesion: 人的損耗の少なさを高く評価する。
- 高Discipline: 本部方針・隊長判断との整合を重視する。
- 低Ambition: 十分な部分成果で満足しやすい。

Personal Appraisalは事実ではない。

AAR上で `MISSION RESULT` と `PERSONAL APPRAISAL` を視覚的・意味的に分離する。

---

## 10. Emergent Deference / 忖度

`忖度` を独立Traitとして実装しない。

以下の組合せ等から結果として発生させる。

- 高Discipline
- 隊長 / 上官への高Trust
- Ambiguous Result
- 自身のAmbition / 立場

これにより、同じ人物でも相手・状況によって上官評価が変化しうる。

露骨な迎合を固定人格ラベルにしない。

---

## 11. Revised AAR Information Architecture

AARは以下の順序を守る。

### A. Mission Result

- 目的
- SUCCESS / PARTIAL SUCCESS / FAILURE
- 主成果
- Before → After

### B. Cost / Gain

- Supplies
- Injury
- Information
- Missionに直接残る成果 / 損失

### C. Key Decisions / Causal Chain

- 重要判断3〜5件
- なぜその判断になったか
- 判断とOutcomeの分離
- Mission Resultへどう接続したか

### D. Personal Appraisal

- 主要人物が結果をどう評価したか
- 評価差が人物性を匂わせること

### E. Persistent Human Changes

- Experience
- Trust
- その他、次回へ残る人物履歴

人物関係をAAR冒頭へ置かない。

---

## 12. Revised Human Validation Gates

### Gate M — Mission Integrity (Precondition)

Playerが以下を即座に説明できること。

- なぜ遠征したのか
- 何が目的だったのか
- どこまで達成したのか
- 何を代償にしたのか

Gate MがFAILした場合、Character / Recomposition / Curiosityの評価結果は有効なHuman Validationとみなさない。

### Existing Gates

- Gate A — Character Distinction
- Gate B — Recomposition
- Gate C — Causal Clarity
- Gate D — Curiosity

### Additional v0.2 Evidence

Human Validationでは以下を観測する。

1. Mission Purpose / Resultを説明できる。
2. 客観的成果と人物の評価を区別できる。
3. 同じResultに対する人物ごとの評価差に気づく。
4. 数値ラベルを見ず、行動・発言から主要人物の傾向を推測できる。
5. 少なくとも1回、Mission目的に照らして能力値合計以外の理由で編成 / 隊長 / Policyを変更する。
6. 次の遠征で何を改善したいか具体的に述べられる。

---

## 13. Explicit Non-Goals Added in v0.2

v0.2では以下を追加しない。

- 複数の生活Need
- Hunger / Thirst等の個人欲求メーター
- 詳細な食料・素材・物流経済
- Reputation / Recognition専用ポイント
- Fairness専用パラメータ
- 忖度専用パラメータ
- 恋愛 / 好感度システム
- 派閥・政治システム
- 昇進競争システム
- Legacy / 継承欲求

これらはMFP v0.2の成立後に必要性を再評価する。

---

## 14. New Technical Invariants

- `Objective Result` はPersonal Appraisalから独立する。
- Personal AppraisalがMission Resultを書き換えない。
- Derived IndicatorはSimulation Stateから再計算可能であること。
- Before / After値は同一基準で比較する。
- Mission Resultの主要因はDecision / State Transitionへ追跡可能であること。
- 4 Personality Axes以外の恒常的人格値を追加しない。
- 忖度・忠誠・公平感等はMFPでは複合現象として扱う。
- Personalityの内部値をAARの結論として直接表示しない。
- Relationship変化はMission Resultより上位に表示しない。

---

## 15. Validation Status Reset

v0.1 Headless Validation VS-01〜VS-09のDecision Modelに関する知見は保持する。

ただしv0.1 Human Validationは、Mission Feedback Loop不足が判明したためVS-10 PASS / FAIL判定には使用しない。

Status:

> **VS-10 PAUSED — MFP v0.2 Mission Feedback Revision Required**

Next Approved Stage:

> MFP v0.2 Playable ShellへMission Contract / Objective Result / Derived Indicators / 4-axis Personality / Personal Appraisalを最小実装し、その後VS-10 Human Validationを再開する。
