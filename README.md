# YU100 MFP 01

『勇者百年計画』をリスペクトし、その設計思想に着想を得た **独自ゲーム案** の Minimum Fun Prototype (MFP) 検証用リポジトリ。

> 本プロジェクトは非公式の独自プロトタイプであり、原作および原作者との公式な関係・承認を示すものではありません。

## Purpose

完成版を作ることではなく、以下の中核ループが人間にとって成立するかを検証する。

> Need → Mission → 委任 → 観察 → Objective Result → Cost / Time Pressure → 理解 → 改善

Primary Question:

> 具体的なMissionに対する成果と因果を見たプレイヤーが、残り時間と組織余力を考慮して、次は編成・隊長・方針を変えて試したいと思うか。

## Current Stage

- Base Design Contract: v0.1
- Current Design Delta: v0.2 + v0.2.1 + v0.2.2 + **v0.2.3 Temporal Pressure / HQ Operational Reserve**
- Headless Simulation Validation: VS-01〜VS-09 PASS（Decision Model知見は保持）
- Playable Shell: **v0.2.3**
- Human Validation: **Gate M / Temporal Pressure RETEST REQUIRED**

v0.2.2で単一路線のEnd-to-End Bottleneckを導入した。v0.2.3では、Human Validationで確認された「未達・失敗に継続的な重みが必要」という論点に対し、時間経過と本部側リソースを最小追加する。

## Canonical Cycle

`Need → Mission → Party / Leader / Policy → 1 Month Expedition → Objective Result → Northern Reserve / HQ Reserve Update → Personal Appraisal → Experience / Trust → Recomposition`

## Time Model

MFP v0.2.3では **1遠征 = 1か月** と固定する。

毎月の遠征終了後に persistent state を更新する。

- 補給路の確立範囲
- 北部集落 生活備蓄
- 本部運用余力
- Experience / Trust / History

完成版の100年進行で1200回の直接操作を要求するという意味ではない。上位委任・複数月自動運用は将来設計であり、MFP Scope外。

## Persistent Resource Boundary

### 北部集落 生活備蓄

Mission対象である北部集落側の実在備蓄。初期値は **2.00か月分**。

単一路線が未接続の間:

- 北部安定輸送能力 = 43% of monthly requirement
- 月間不足 = 57%
- 1遠征ごとに生活備蓄を **0.57か月分** 消費

Sector 10まで連続した補給路が成立すると:

- 北部安定輸送能力 = 100%
- 月間不足 = 0
- 生活備蓄の純減少が停止

補給路完成時に備蓄そのものを即時回復させない。

### 本部運用余力

本部側の抽象的な組織資源。初期値は **100%**。

これは詳細な資金・食料・医薬品・人員を個別管理する経済モデルではなく、以下をまとめたMFP用指標:

- 遠征展開
- 携行物資補充
- 医療 / 回収
- 失敗 / 混乱対応

遠征ごとに消耗し、失敗・Setback・負傷ほど追加消耗が大きい。

本部運用余力は次回の遠征携行物資上限へ作用する。

`Next Sortie Capacity = 50 + 0.5 × HQ Operational Reserve`

したがって失敗は「数字が減る」だけでなく、次回遠征の条件を悪化させる。

### 遠征携行物資

今回の遠征を継続する余力。本部運用余力とは別状態だが、その上限を本部状態から受ける。

## Mission / Expedition Result Separation

一回の遠征結果とMission全体の結果を分ける。

Expedition Result:

- SUCCESS
- PARTIAL SUCCESS
- FAILURE

Mission Status:

- ACTIVE
- SUCCESS — Sector 10までEnd-to-End補給路成立
- FAILED — 北部生活備蓄または本部運用余力が尽きる

一回の遠征失敗は即Game Overではない。失敗後の状態を引き継いで再編成・方針変更できる限りMissionは継続する。

## v0.2.2 Bottleneck Rule — Preserved

- Sector 10まで連続した補給路が未完成: 北部安定輸送能力 43%
- Sector 10まで連続した補給路が完成: 北部安定輸送能力 100%

途中区間を安全化しても、北部へのEnd-to-End輸送能力は上昇しない。

部分成功の恒久価値は、次回遠征で既確立区間を再攻略せず、残る未確立区間へ集中できること。

## Character Compression

恒常的人格軸は4つに限定する。

- Risk — 安全 ↔ 挑戦
- Cohesion — 自己保存 ↔ 仲間・集団
- Discipline — 現場自律 ↔ 規律・権威
- Ambition — ほどほどで充足 ↔ 達成・承認

通常UIでは内部人格値を直接表示せず、行動・事後評価・履歴から人物像を推測させる。

## MFP Scope

- 8 Heroes / 4-person Party / 1 Leader
- 1 Canonical Need / Mission
- 1 Expedition = 1 Month
- Risk Policy / Priority
- Operational Route Frontier / End-to-End Transport Capability / Northern Reserve / HQ Operational Reserve / Information
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

同一目的地に対してリスク / 輸送量 / 距離 / 冗長性が異なる複数補給路を持たせる案は保持する。

例: 短く危険な高容量路 / 長く安全な低容量路 / 低容量だが早期開通できる予備路。

v0.2.3には実装しない。

## Validation Gates

- Gate M — Mission Integrity / Temporal Pressure（precondition）
- Gate A — Character Distinction
- Gate B — Recomposition
- Gate C — Causal Clarity
- Gate D — Curiosity

v0.2.3では特に以下をHuman Validationする。

1. 1遠征 = 1か月という時間経過が理解できる
2. 北部生活備蓄と本部運用余力の損耗理由を区別できる
3. 一回のFailureとMission Failureを区別できる
4. 失敗が次回の携行能力を下げることを理解できる
5. 残り時間 / 本部余力を見てRisk・隊長・編成を変えたくなる

上位システムへは、この最小ループのHuman Validation成立前に進まない。

## Hosting

GitHub PagesからiPhone Safariで実行する静的Webアプリ。

Publishing Source: `main` / `/ (root)`
