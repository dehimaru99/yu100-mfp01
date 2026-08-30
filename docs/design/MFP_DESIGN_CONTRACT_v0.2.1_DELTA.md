# YU100 MFP Design Contract v0.2.1 — Result Readability Delta

Artifact: `YU100-MFP-DESIGN-CONTRACT-v0.2.1-DELTA`

Upstream: `YU100-MFP-DESIGN-CONTRACT-v0.2-DELTA`

Status: **APPROVED FOR GATE M RETEST**

## 1. Reason

MFP v0.2 Human ValidationではMission Purposeと成否は理解された一方、Mission Resultの内部構造が即座に読めないことが確認された。

Observed findings:

- `安全経路` / `到達地点` / `確立地点` の差が一見して分かりづらい。
- 遠征コストが輸送能力や生活備蓄へどう接続するかが不明瞭。

本Deltaは新規ゲームシステムを追加しない。Result vocabularyと因果表示を明確化する。

## 2. Canonical Result Vocabulary

以後、Mission Resultでは以下の3用語を使用する。

- `遠征到達` — 当該遠征で部隊が物理的に到達した最深Sector。
- `調査済み` — 状況情報を持ち帰り、次回判断に利用可能なSector。
- `補給路運用可能` — Sector 1から連続して、継続輸送に利用可能と確認された範囲。

`安全経路`、`確立地点`、`到達拠点`等の重複・曖昧表現をMission Resultの主要用語として使用しない。

## 3. Visual Contract

Mission / AARではSector 1〜10を一つの進捗図に表示し、少なくとも以下を同時に識別可能とする。

- 補給路運用可能
- 調査情報あり
- 今回の最深到達地点

数値カードだけに依存しない。

## 4. Cost Boundary

`遠征携行物資` は当該遠征を継続するためのOperational Resourceとする。

MFP v0.2.1では北部集落の`生活備蓄`とは別勘定であり、遠征携行物資消費を生活備蓄から直接減算しない。

Canonical causal paths:

`遠征携行物資消費 → 当該遠征の継続余力低下`

`補給路運用可能範囲 → Transport Capability → Reserve Outlook`

この境界をUI上で明記する。

詳細経済・国家備蓄・補充周期はNon-Goalのままとする。

## 5. AAR Information Order

AAR Objective Result内では以下を優先表示する。

1. Mission Result
2. Sector progress visualization
3. 遠征到達
4. 調査済み
5. 補給路運用可能
6. Transport Capability
7. Reserve Outlook

続いて以下の因果列を表示する。

`今回払ったもの → 今回作ったもの → 継続的な輸送効果 → 北部集落への効果`

Personal Appraisal / Trust / Experienceはその後に置く。

## 6. Baseline Preservation

以下はv0.2から変更しない。

- Hero fixture
- Personality axes
- Perception model
- Proposal model
- Leader Decision model
- Outcome model
- Trust / Experience model
- Mission success criteria
- Random seed namespace (`MFP02`)
- Transport / Reserve derivation formulas

本変更でHeadless VS-01〜VS-09を再判定しない。

## 7. Gate M Retest

次のHuman Validationでは以下を確認する。

1. `遠征到達 / 調査済み / 補給路運用可能` を説明できるか。
2. 遠征携行物資が生活備蓄とは別勘定であると理解できるか。
3. `補給路改善 → 輸送能力 → 生活備蓄見込み` の因果を説明できるか。
4. Mission Result全体を見て次の変更理由を持てるか。

Status:

> **GATE M RETEST REQUIRED**
