# YU100 MFP Design Contract v0.1

Artifact: `YU100-MFP-DESIGN-CONTRACT-v0.1`

Status: **DRAFT — Ready for Technical / Human Validation**

Purpose: 『勇者百年計画』再設計案の中核的な面白さを最小構成で検証する。

## 0. Contract Boundary

本Contractは完成版を規定するものではない。MFP段階で実装・検証してよい範囲と、明示的に実装してはならない範囲を定める。

MFPに含まれない上位概念は将来候補であり、現在の実装要件ではない。

## 1. Objective

少人数の勇者へ任務を委任し、その自律判断と結果を観察することで、プレイヤーが人物差・関係性・隊長差・方針差を理解し、次の遠征で人事または方針を変更したくなるかを検証する。

Primary Question:

> AARを見たプレイヤーが、次は編成・隊長・方針を変えて試したいと思うか。

## 2. Core Fun Hypothesis

> プレイヤーは、自律する勇者の判断結果を観察することで人物差・関係・編成の意味を理解し、次の遠征で人事や方針を変更したくなる。

下位仮説:

- 人物ごとに判断が違って見える。
- 同一メンバーでも隊長によって判断が変わる。
- 能力値合計だけでは最適編成が決まらない。
- Mission Policyは人物性を消さずに結果へ影響する。
- Trustが「誰の意見を採用するか」へ影響する。
- 失敗が単なる乱数ではなく判断過程として分析できる。
- 遠征履歴が次回の判断条件を変える。

## 3. MFP Scope

- Heroes: 8
- Party: 4人 / 1部隊
- Leader: 出撃4人から1名
- Organization: 1
- World: 固定12 Sector程度
- Event: 5種程度
- Ability: Combat / Explore / Resilience
- Tendency: Risk / Cohesion / Discipline
- Relationship: Directional Trustのみ
- Experience: 少数のExperience Tag
- Policy: Risk Policy / Priority
- Output: 重要判断ログ + AAR

Canonical Cycle:

`Roster → Formation → Leader → Mission Policy → Autonomous Expedition → AAR → Recomposition`

## 4. Explicit Non-Goals

MFPでは以下を実装しない。

- 100年間遊べることの検証
- 国家運営・外交
- 学校・教育・引退・世代交代
- 国家文化・組織制度
- 複数国家AI
- 前線基地・本格経済・資源管理
- 職業・個人装備・クラフト・レアリティ・巨大スキルツリー
- 手動戦闘・手動スキル発動
- 大規模迷宮生成
- LLMによる意思決定
- オンライン協力
- 美麗な戦闘演出

非目的を「ついでに」実装しない。必要ならContract変更として扱う。

## 5. Player Interaction Contract

Player decides:

- 出撃4人
- 隊長
- Risk Policy
- Priority

Player does not directly decide:

- 遭遇時に戦うか
- 未知経路を調査するか
- 負傷時に撤退するか
- 誰の意見を採用するか

緊急ポップアップで現場判断をプレイヤーへ戻さない。

## 6. Decision Model

意思決定は三段階で処理する。

1. `Perception` — Ability / Experience / 情報量により、各勇者が状況をどう認識したか。
2. `Proposal` — Tendency / Mission Policy / 認識結果により、各勇者が何を提案するか。
3. `Leader Decision` — 隊長が自身の選好、隊員提案、Trust、Mission Policyを統合して決定する。

Conceptual model:

`Situation + Perception + Tendency + Mission Policy + Advisor Proposal × Trust + Leader Preference → Decision`

Decision Principles:

- Abilityは主に世界の見え方へ作用し、性格の代替にしない。
- Mission Policyは人物性を上書きしない。
- Disciplineが高いほど命令を重視し、低いほど現場認識を重視する。
- Trustは多数決ではなくAdvisor weightingへ作用する。
- DecisionとOutcomeを分離する。
- 乱数は主として世界側の不確実性へ置く。
- 人物判断の揺らぎは候補が拮抗した場合に限定する。

## 7. Event Set

- UNKNOWN_ROUTE: Proceed / Scout / Avoid
- ENEMY_ENCOUNTER: Engage / Scout / Avoid
- INJURY_RESPONSE: Continue / Treat+Continue / Retreat
- STRANDED_PERSON: Rescue / Continue Mission / Report
- SUPPLY_SHORTAGE: Push / Reduce Objective / Retreat

イベント数を増やすより、同一イベントで人物・隊長・Trust・Policyによる差が出ることを優先する。

## 8. Outcome / Failure

OutcomeはDecisionとは別に、実際の世界状態、部隊能力、情報状態、限定的な不確実性から決定する。

> Good Outcome ≠ Good Decision / Bad Outcome ≠ Bad Decision

失敗は可能な限り因果連鎖として記録し、AARから「どこで悪化したか」を追跡可能にする。

## 9. Trust / Experience

Directional Trustを使用する。A→BとB→Aは別状態。

TrustはSuccess/Failureを直接入力として更新せず、その人物の助言や行動へ帰属可能なEvidenceによって更新する。

Experienceはレベルアップではなく状況別Experienceとして保持し、認識精度または提案確信へ限定的に作用する。成功・失敗の双方から取得可能。

## 10. Explainability / AAR

重要判断では、実際に使用した因果トレースをDecision時点で保存する。

> Simulation decides. Narrative explains.

AARの主要理由を後付けで捏造してはならない。

AAR最低要件:

- 任務結果
- 進捗
- 負傷等の主要Outcome
- 重要判断3〜5件
- 各判断の主要因
- 反対要因 / 不採用提案
- 人物観察事項
- Trust / Experienceの意味のある変化

内部スコアではなく「なぜ」を主表示する。

## 11. Acceptance Criteria

- AC-01 人物識別性
- AC-02 隊長差
- AC-03 編成差
- AC-04 方針効果
- AC-05 Trust実効性
- AC-06 説明可能性
- AC-07 判断 / 結果分離
- AC-08 失敗分析
- AC-09 再試行動機
- AC-10 履歴効果

## 12. Validation Scenarios

- VS-01 Leader Contrast
- VS-02 Advisor Value
- VS-03 Trust Effect
- VS-04 Policy Effect
- VS-05 Good Decision / Bad Outcome
- VS-06 Bad Decision / Good Outcome
- VS-07 Failure Cascade
- VS-08 Memory Effect
- VS-09 Relationship Emergence
- VS-10 Recomposition / Human Validation

## 13. Go / No-Go Gates

- Gate A — Character Distinction
- Gate B — Recomposition
- Gate C — Causal Clarity
- Gate D — Curiosity

Gate A〜Dのいずれかが明確にFAILした場合、学校・文化・外交・世代交代等の上位システムへ進まない。

Minimum PASS Evidence:

1. 5〜8遠征後、主要4人程度の性格・役割を行動ベースで言語化できる。
2. 隊長変更による差を説明できる。
3. 少なくとも1回、能力値以外の理由で編成または隊長を変更する。
4. 少なくとも1件、失敗原因を判断過程から説明できる。
5. 次に試したい具体的変更案を自発的に持つ。

## 14. Technical Invariants

- ActualStateはPerceptionを経由せずHero判断へ入れない。
- AbilityからActionを直接決定しない。
- PolicyでTendencyを書き換えない。
- TrustはAdvisor Weightへ作用する。
- Advisor多数決にしない。
- Leader自身の選好を保持する。
- DecisionTraceをOutcome前に固定する。
- Trust / Experience更新を同一Eventへ遡及適用しない。
- TrustはOutcome Success/Failureだけでは更新しない。
- Failure Chainは実State Transitionから構成する。
- 固定Seed + 同一Stateは再現可能であること。

## 15. Change Control

以下はCalibrationではなくDesign Contract変更として扱う。

- 勇者数・部隊数の大幅増加
- 新しい主要ステータス / 関係軸
- イベント種類の目的外増加
- 戦術判断をPlayerへ戻す
- 国家・学校・文化・外交・世代交代の追加
- LLMを意思決定主体へ変更
- Go / No-Go基準の事後緩和

## 16. Current Approved Stage

Headless Simulation Validation VS-01〜VS-09はPASS済み。

現在の次工程は **VS-10 Human Validation** であり、Playable Shellを用いて人物識別性、因果理解、Recomposition、Curiosityを観測する。

Human Validationの結果が出るまで上位システムを実装しない。
