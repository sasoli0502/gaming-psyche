# Gaming Psyche - Design Handoff for Antigravity

## Overview

Gaming Psycheは、FPS/アクションゲームのシナリオ選択から深層心理を分析するWeb診断ツール。
50問のシナリオ型設問 → 5軸スコアリング → 32タイプ分類 → ゲームキャラクターとマッチング。

**公開URL**: https://sasoli0502.github.io/gaming-psyche/
**リポジトリ**: https://github.com/sasoli0502/gaming-psyche
**ローカルパス**: `private-second/gaming-psyche/`

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Framer Motion（アニメーション）
- 静的エクスポート（GitHub Pages）

---

## Design Brief

### Visual Inspiration

**ゼルダの伝説 時のオカリナ — タイトル画面/オープニング**

エポナに乗ったリンクがハイラル平原を歩く、朝日が昇り始めるあのシーン。
借りたいのは「静けさ」と「壮大さ」の空気感。色そのものではなく雰囲気。

### Theme & Tone

| 項目 | 方針 |
|------|------|
| **全体の雰囲気** | 静かで壮大。夜明けのグラデーション |
| **カラー** | ダーク→夜明けグラデーション（暗い背景から温かみのある光へ）。具体的な色はデザイナー判断でOK |
| **テキストトーン** | 問題文はハードボイルド/エッジーなまま。UIの温かさとテキストの硬さを共存させる |
| **現行のネオン/サイバー** | 完全に捨ててよい |

### Target Audience

- 20代ゲーマー（カジュアル層）
- ゲームに詳しくなくても楽しめる
- スマホでSNSシェアされることを想定

### Animation Level: Full

- パーティクルエフェクト
- パララックス / スクロール連動
- ページ遷移エフェクト（ランディング→クイズ→結果）
- 結果表示の演出（キャラ名登場時の特別なアニメーション）
- Framer Motionが既に入っているのでそのまま活用可

### BGM/SE

- 入れたい（時間かかりすぎるならスキップ可）
- ランディング: 静かなアンビエント
- クイズ中: 緊張感のあるループ
- 結果表示: 壮大な一瞬（リザルト演出音）

---

## 3 Screens to Redesign

### 1. Landing Page（ランディング）

**現状**: サイバーパンク風のネオンテキスト + 「診断を始める」ボタン
**ファイル**: `src/app/page.tsx`（landing state）

**要件:**
- 夜明けのグラデーション背景
- 「ゲームの選択に、お前の人生が出る。」のキャッチコピーは維持
- 言語切り替え（JP/EN）ボタンは維持
- 「診断を始める」CTAボタン
- 50問 / 32タイプ / 無料 の情報表示

### 2. Quiz Screen（クイズ画面）

**現状**: シナリオカード + 4択オプションボタン + プログレスバー
**ファイル**: `src/components/quiz/QuizEngine.tsx`, `ScenarioCard.tsx`, `OptionButton.tsx`, `ProgressBar.tsx`

**要件:**
- 問題文（シナリオ）の表示 — ハードボイルドなテキストが映えるデザイン
- 4つの選択肢ボタン（A/B/C/D）
- 進捗表示（現在/50問 + カテゴリ表示）
- 選択時のフィードバックアニメーション
- 問題間のトランジション

### 3. Result Screen（結果画面）

**現状**: キャラ名 + タイプコード + レーダーチャート + 説明テキスト
**ファイル**: `src/components/result/ResultView.tsx`, `RadarChart.tsx`

**要件:**
- **キャラ名を最も目立たせる**（最大・最初に表示）
- ゲーム名（キャラの出典）
- **Wikipediaリンクボタン** — 目立つデザインで。「Wikipedia」とは書かず、「このキャラについて詳しく」的な文言でリンク
- レーダーチャート（5軸の可視化）
- 各軸のバーグラフ（-100〜+100）
- deepDescription（哲学的分析テキスト）
- おすすめゲーム（タグ表示）
- SNSシェアボタン（コピー or ネイティブシェア）
- 有料版アップグレードCTA（Mid ¥300 / Top ¥500）
- リスタートボタン

---

## Data Structure

### 5 Axes (軸)

| 軸 | 英語 | High | Low |
|----|------|------|-----|
| 攻撃性 | aggression | 攻撃的 | 慎重 |
| 利他性 | altruism | 利他的 | 利己的 |
| 協調性 | cooperation | チームプレイ | 一匹狼 |
| 直感力 | intuition | 直感的 | 分析的 |
| 求道心 | mastery | 完璧主義 | 実利主義 |

### Type Example

```json
{
  "id": "HHHHH",
  "name": { "ja": "覇王の咆哮", "en": "Roar of the Conqueror" },
  "character": "クレイトス",
  "characterGame": "God of War",
  "characterUrl": "https://en.wikipedia.org/wiki/Kratos_(God_of_War)",
  "description": { "ja": "全てにおいて全力。...", "en": "..." },
  "deepDescription": { "ja": "ニーチェの超人思想を...", "en": "..." },
  "recommendedGames": ["God of War Ragnarok", "Devil May Cry 5", "FF7 Crisis Core"],
  "axes": { ... }
}
```

### 32 Types × 167 Characters

全タイプ・キャラデータは `src/data/types/types.json` に格納。

---

## UI Components（既存）

| コンポーネント | パス | 説明 |
|-------------|------|------|
| NeonText | `src/components/ui/NeonText.tsx` | ネオン文字（削除/置換可） |
| CyberButton | `src/components/ui/CyberButton.tsx` | ボタン（削除/置換可） |
| GlowCard | `src/components/ui/GlowCard.tsx` | カード（削除/置換可） |
| QuizEngine | `src/components/quiz/QuizEngine.tsx` | クイズロジック（ロジックは変更不可） |
| ProgressBar | `src/components/quiz/ProgressBar.tsx` | 進捗バー |
| ScenarioCard | `src/components/quiz/ScenarioCard.tsx` | 問題文表示 |
| OptionButton | `src/components/quiz/OptionButton.tsx` | 選択肢ボタン |
| ResultView | `src/components/result/ResultView.tsx` | 結果画面 |
| RadarChart | `src/components/result/RadarChart.tsx` | レーダーチャート |

---

## Constraints（制約）

1. **機能は絶対に壊さない** — スコアリング、タイプ判定、i18n、シェア機能は全て維持
2. **QuizEngine.tsxのロジック部分は変更しない** — UIのみ変更
3. **scoring.ts, types.ts は変更不可**
4. **著作権のある画像は使用不可** — AI生成画像 or 抽象ビジュアルのみ
5. **日英両対応を維持** — `src/lib/i18n.ts` のキー構造を壊さない
6. **静的エクスポート対応** — `output: "export"` 設定を維持

---

## AI Image Generation（推奨）

著作権フリーの画像が必要な場合:
- **GPT Image 1.5** or **Gemini** でゲーミング抽象ビジュアルを生成
- `/generate-image` スキルが利用可能
- テーマ: 夜明け、壮大な風景、抽象的なゲーム世界

---

## Files Summary

```
src/
├── app/
│   ├── layout.tsx         ← ルートレイアウト（フォント・メタ）
│   ├── page.tsx           ← メイン状態管理（LANDING/QUIZ/RESULT）
│   └── globals.css        ← グローバルCSS（全面書き換えOK）
├── components/
│   ├── ui/                ← 全面書き換えOK
│   ├── quiz/              ← UIのみ変更OK（ロジック維持）
│   └── result/            ← UIのみ変更OK
├── data/                  ← 変更不可
└── lib/                   ← 変更不可
```
