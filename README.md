# YU100 MFP 01

『勇者百年計画』をリスペクトし、その設計思想に着想を得た **独自ゲーム案** の Minimum Fun Prototype (MFP) 検証用リポジトリ。

> 本プロジェクトは非公式の独自プロトタイプであり、原作および原作者との公式な関係・承認を示すものではありません。

## Purpose

完成版を作ることではなく、以下の中核ループが人間にとって成立するかを検証する。

> Need → Mission → 委任 → 観察 → Objective Result → Cost / Time Pressure → 理解 → 改善

Primary Question:

> 具体的なMissionに対する成果と因果を見たプレイヤーが、人物差を理解し、残り時間と組織余力を考慮して、次は編成・隊長・方針を変えて試したいと思うか。

## Current Stage

- Base Design Contract: v0.1
- Current Design Delta: v0.2 + v0.2.1 + v0.2.2 + v0.2.3 + v0.2.4 + **v0.2.5 Action Profile Readability**
- Headless Simulation Validation: VS-01〜VS-09 PASS（Decision Model知見は保持）
- Playable Shell: **v0.2.5**
- Gate M — Mission Integrity: **CLOSED**
- Gate A — Character Distinction: **ACTION PROFILE HUMAN RETEST REQUIRED**
- Gate B — Recomposition: NOT YET EVALUATED

v0.2〜v0.2.3でMission purpose / result / bottleneck / time pressure / northern reserve / HQ operational reserveを人間が追える状態まで整理した。

v0.2.4では初期人格ラベルを通常UIから除外してGate A A1を実施した。Proposal差は実際に生成されていたが、Human observationは「取り立てて強い印象はない」であり、人物差が人物像として十分に立ち上がらなかった。

v0.2.5ではSimulation式を変更せず、各Actionが持つトレードオフをAction Profileとして表示し、既存の行動差が読み取りやすくなるかを分離検証する。

## Canonical Cycle

`Need → Mission → Party / Leader / Policy → 1 Month Expedition → Objective Result → Northern Reserve / HQ Reserve Update → Personal Appraisal → Experience / Trust → Recomposition`

## Time Model

MFPでは **1遠征 = 1か月** と固定する。

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

詳細な資金・食料・医薬品・人員を個別管理する経済モデルではなく、以下をまとめたMFP用指標:

- 遠征展開
- 携行物資補充
- 医療 / 回収
- 失敗 / 混乱対応

遠征ごとに消耗し、失敗・Setback・負傷ほど追加消耗が大きい。

本部運用余力は次回の遠征携行物資上限へ作用する。

`Next Sortie Capacity = 50 + 0.5 × HQ Operational Reserve`

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

## Bottleneck Rule

- Sector 10まで連続した補給路が未完成: 北部安定輸送能力 43%
- Sector 10まで連続した補給路が完成: 北部安定輸送能力 100%

途中区間を安全化しても、北部へのEnd-to-End輸送能力は上昇しない。

部分成功の恒久価値は、次回遠征で既確立区間を再攻略せず、残る未確立区間へ集中できること。

局所的にSector 9や10で補給路条件を満たしていても、より手前の未確立Sectorが残ればMissionは完了しない。

## Character Compression

恒常的人格軸は4つに限定する。

- Risk — 安全 ↔ 挑戦
- Cohesion — 自己保存 ↔ 仲間・集団
- Discipline — 現場自律 ↔ 規律・権威
- Ambition — ほどほどで充足 ↔ 達成・承認

Fairness / Recognition / Loyalty / 忖度 / Curiosity / Legacy等を独立軸として追加しない。まず4軸 + Ability + Experience + Role + Trust + History + Situationの組合せで表現する。

### Personality Visibility

Gate A検証中は通常UIに以下を表示しない:
- raw personality values
- 大胆 / 慎重などのRiskラベル
- 仲間を重視等のCohesionラベル
- 方針重視 / 現場判断等のDisciplineラベル
- Ambitionラベル

初期表示は名前と Combat / Explore / Resilience の能力Gradeのみ。

人物像は以下から推測させる:
- eventごとのProposal
- Leader Decision
- adviceの扱い
- Personal Appraisal
- 遠征後に蓄積した観察履歴

既存テスターは旧版のラベルを見ているため、完全な初見blind studyではなく **reduced-contamination retest** と位置づける。

## v0.2.5 Action Profile Readability

Gate A A1では人物ごとのProposalに差があったにもかかわらず、人物としての印象が弱かった。

v0.2.5では各Actionへ、以下5軸の表示用Profileを付与する。

- Mission — 主目的を前進させる傾向
- Safety — 即時安全を確保する傾向
- Preserve — 運用資源を温存する傾向
- Learning — 情報・学習機会を得る傾向
- Relation — 人間関係・他者を優先する傾向

Notation:
- ↑↑ strongly favors
- ↑ favors
- → neutral
- ↓ sacrifices
- ↓↓ strongly sacrifices

例:

`PUSH: Mission ↑↑ / Safety ↓↓ / Preserve ↓↓`

`SCOUT: Mission ↑ / Safety ↑ / Preserve ↓ / Learning ↑↑`

### Critical Boundary

Action Profileは **表示上の意味圧縮** であり、v0.2.5ではOutcomeへ追加補正しない。

したがって `Mission ↑↑` は「隠れた+2補正」を意味しない。

AARでは各人物について:
- Proposal trace
- 平均Action Profile
- 最終Leader Decisionとの一致数

を表示する。

この表示だけで人物差が認識可能になるかを先に確認し、不十分な場合のみ `character disposition → execution / consequence / learning` の限定的な実効果追加を検討する。

## Gate A Human Validation

### A1R — Action Profile Retest

Fresh reset後、既定条件:
- Party: H01 / H02 / H07 / H05
- Leader: H01
- Risk: NORMAL
- Priority: SURVIVAL

1か月遠征し、Action ProfileとBehavioral Patternを見て人物を行動ベースで評価する。

確認事項:
- ↑↓表示で人物差が前より読みやすいか
- 誰が何を優先しているように見えるか
- 表示がProposal内容と整合しているか
- 表示だけでは人物差が依然として cosmetic に見えるか

### A2 — Leader Contrast

A1R後に必要ならFresh resetし、Party / Risk / Priorityを固定してLeaderのみH02へ変更する。

Runtime seedはplayer configurationを含むため、このHuman比較を厳密な単一変数因果試験とはみなさない。Leader差の因果的裏付けには既存Headless VS-01を使用する。

Human Gate Aで重要なのは、数理的に差があることではなく **人間が人物差として認識できること**。

### Gate A PASS Evidence

- 頻繁に観察した4人のうち少なくとも3人を行動用語で説明できる
- 説明に実際のProposal / Decision / Appraisalを引用できる
- 少なくとも1つのLeader差を知覚できる
- 能力Gradeだけではない理由で、このMissionに向く / 向かないLeaderを選べる
- 次にその人物がどう動きそうか予測し、試したくなる

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

Gate A / Gate B成立前には実装しない。

## Validation Gates

- Gate M — Mission Integrity: **CLOSED**
- Gate A — Character Distinction: **ACTIVE / ACTION PROFILE RETEST**
- Gate B — Recomposition
- Gate C — Causal Clarity
- Gate D — Curiosity

Gate AがFAILした場合、人物差の原因を診断する。学校・文化・外交・世代交代等の上位システム追加で問題を隠さない。

## Hosting

GitHub PagesからiPhone Safariで実行する静的Webアプリ。

Publishing Source: `main` / `/ (root)`
