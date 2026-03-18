# Gaming Psyche — Antigravity Design Instructions

## What This Is

Gaming Psycheは、FPS/アクションゲームのシナリオ選択から深層心理を分析するWeb診断ツール。
50問のシナリオ型設問 → 5軸スコアリング → 32タイプ分類 → ゲームキャラクターとマッチング。

**公開中**: https://sasoli0502.github.io/gaming-psyche/

---

## Your Mission

**3画面のビジュアルデザインを全面リニューアルする。機能は一切変えない。**

---

## CRITICAL: Undertaleとの差別化

**このプロジェクトはRPG的な美学を持つが、Undertaleと被りすぎないようにデザインをずらすこと。**

以下のビジュアル要素は避ける・ずらす:

| 避けるべき要素 | 理由 | 代わりの方向性 |
|---------------|------|--------------|
| **白い四角のバトルボックス** | Undertaleの象徴的UI | 角丸・有機的な形状・ぼかしの入ったコンテナを使う |
| **ピクセルハート（赤い小さなハート）** | Undertaleのプレイヤーシンボルそのもの | ハートモチーフを使わない。光の粒子・星・炎など別のシンボルを使う |
| **黄色テキスト + 黒背景のメニュー** | Undertaleのメニュー画面そのもの | 夜明けグラデーション背景を活かしたメニューデザイン |
| **「ACT」「FIGHT」「ITEM」「MERCY」的なラベルデザイン** | 直接的な連想を生む | ボタンラベルのスタイルを変える（枠なし、丸みのあるデザイン等） |
| **Comic Sans / ピクセルフォント** | Undertale系のフォント | Geist Sans（既にインストール済み）を活かしたモダンフォント |
| **白黒のハイコントラスト + 単色アクセント** | Undertaleの配色パターン | 多色グラデーション・温かみのある中間色を使う |
| **8bit/16bit風のUIフレーム** | レトロRPGの直接引用 | 現代的なグラスモーフィズム・ぼかし・半透明レイヤー |

**目標: 同じRPGジャンルでも、一目で「Undertaleとは違う」とわかるオリジナルなビジュアルアイデンティティを持たせる。全体的に少しでいいからUndertaleから離す方向でデザインすること。**

---

## Design Direction

**インスピレーション: ゼルダの伝説 時のオカリナ — タイトル画面**

エポナに乗ったリンクがハイラル平原を歩く、朝日が昇り始めるあのシーン。
借りたいのは「静けさ」と「壮大さ」の空気感。色そのものではなく**雰囲気**。

| 項目 | 方針 |
|------|------|
| **全体の雰囲気** | 静かで壮大。夜明けのグラデーション |
| **カラー** | ダーク→夜明けグラデーション（暗い背景から温かみのある光へ）。具体的な色はあなたの判断でOK |
| **テキストトーン** | 問題文はハードボイルド/エッジーなまま。UIの温かさとテキストの硬さを共存させる |
| **現行のネオン/サイバー** | **完全に捨ててよい** |
| **Undertale的要素** | **意識して避ける**（上記テーブル参照） |

### Animation Level: Full

- パーティクルエフェクト（光の粒子、ほたる、花びら等）— **既にParticleBackground.tsxが存在**
- パララックス / スクロール連動
- ページ遷移エフェクト（ランディング→クイズ→結果）
- 結果表示の演出（キャラ名登場時の特別なアニメーション）
- **Framer Motion**が既にインストール済み — そのまま活用すること

### Target Audience

- 20代ゲーマー（カジュアル層）
- ゲームに詳しくなくても楽しめる
- **スマホでSNSシェアされることを想定**（モバイルファースト）

---

## Tech Stack

| 技術 | バージョン | 備考 |
|------|-----------|------|
| **Next.js** | 16 | App Router, TypeScript |
| **Tailwind CSS** | 4 | `@theme inline` でカスタムカラー定義中（`globals.css`参照） |
| **Framer Motion** | latest | アニメーション。既にインストール済み |
| **静的エクスポート** | — | `next.config.ts` の `output: "export"` を**絶対に消さない** |
| **フォント** | Geist Sans / Geist Mono | `layout.tsx` で定義済み。Google Fonts経由 |

### How to Run

```bash
cd gaming-psyche
npm run dev     # 開発サーバー (localhost:3000)
npm run build   # 静的ビルド（out/ が生成される）
```

---

## 3 Screens to Redesign

### Screen 1: Landing Page

**ファイル**: `src/app/page.tsx`（landingステート部分）
**関連CSS**: `src/app/globals.css`

**維持するもの:**
- キャッチコピー「ゲームの選択に、お前の人生が出る。」（`t(locale, "landing.tagline")`で取得）
- 言語切り替え（JP/EN）ボタン（`toggleLocale`関数）
- 「診断を始める」CTAボタン（`setAppState("quiz")`を呼ぶ）
- 50問 / 32タイプ / 無料 の情報表示

**変えるもの:**
- 背景を夜明けのグラデーションに（現在のdawn-bgを改善 or 置換）
- NeonTextコンポーネント → 新しいテキストスタイルに置換
- CyberButtonコンポーネント → 新しいボタンスタイルに置換
- 全体のレイアウト・アニメーション
- パーティクルの改善（`ParticleBackground.tsx`は自由に変更可）

### Screen 2: Quiz Screen

**ファイル**:
- `src/components/quiz/QuizEngine.tsx` — **ロジックは絶対に変えない。UIのみ変更**
- `src/components/quiz/ScenarioCard.tsx` — シナリオ（問題文）表示
- `src/components/quiz/OptionButton.tsx` — 4択の選択肢ボタン
- `src/components/quiz/ProgressBar.tsx` — 進捗バー

**維持するもの:**
- QuizEngine内のstate管理・スコアリングロジック（`useReducer`, `handleAnswer`, `onComplete`）
- 問題文の表示（ハードボイルドなテキストが映えるデザインに）
- 4つの選択肢（A/B/C/D）
- 進捗表示（現在/50問 + カテゴリ表示）

**変えるもの:**
- カードデザイン（**バトルボックス的な白枠の四角は避ける**）
- ボタンデザイン（**Undertale風のメニューラベルは避ける**）
- 選択時のフィードバックアニメーション
- 問題間のトランジション
- プログレスバーのビジュアル

### Screen 3: Result Screen

**ファイル**:
- `src/components/result/ResultView.tsx` — 結果画面
- `src/components/result/RadarChart.tsx` — レーダーチャート

**維持するもの:**
- キャラ名・タイプコード・説明テキスト・レーダーチャート
- SNSシェアボタン（`handleShare`関数）
- 有料版アップグレードCTA（Mid ¥300 / Top ¥500）
- リスタートボタン（`onRestart`コールバック）
- Wikipediaリンク（`type.characterUrl`）
- フローティングボタン（トップに戻る・リスタート）

**重要な変更:**
- **キャラ名を最も目立たせる**（最大・最初に表示・特別な登場演出）
- **Wikipediaリンクボタン** — 目立つデザインで。「Wikipedia」とは書かず、「このキャラについて詳しく →」的な文言
- レーダーチャートのビジュアル刷新
- 各軸のバーグラフ（-100〜+100）の改善
- deepDescription（哲学的分析テキスト）のレイアウト改善
- 結果画面全体の演出

---

## File Classification

### 絶対に変更してはいけないファイル

| ファイル | 理由 |
|---------|------|
| `src/lib/scoring.ts` | スコアリングロジック |
| `src/lib/types.ts` | 型定義 |
| `src/lib/i18n.ts` | 翻訳システム（キー構造を壊さない） |
| `src/data/` | 全データファイル（questions, types） |
| `next.config.ts` | `output: "export"` 設定を維持 |

### ロジック変更不可・UI変更のみ可

| ファイル | 変更可能な範囲 |
|---------|--------------|
| `src/components/quiz/QuizEngine.tsx` | JSX（render部分）のみ変更OK。`useReducer`, `handleAnswer`, `onComplete`, state管理は変更不可 |
| `src/app/page.tsx` | ランディング部分のUI変更OK。`useState`, `handleQuizComplete`, `toggleLocale`のロジックは変更不可 |

### 自由に変更してよいファイル

| ファイル | 備考 |
|---------|------|
| `src/app/globals.css` | **全面書き換えOK**。`@theme inline`の構造は維持推奨 |
| `src/app/layout.tsx` | メタデータ・フォント設定の変更OK |
| `src/components/ui/NeonText.tsx` | 削除・置換OK |
| `src/components/ui/CyberButton.tsx` | 削除・置換OK |
| `src/components/ui/GlowCard.tsx` | 削除・置換OK |
| `src/components/ui/ParticleBackground.tsx` | 全面書き換えOK |
| `src/components/quiz/ScenarioCard.tsx` | UIのみ変更OK |
| `src/components/quiz/OptionButton.tsx` | UIのみ変更OK |
| `src/components/quiz/ProgressBar.tsx` | UIのみ変更OK |
| `src/components/result/ResultView.tsx` | UIのみ変更OK |
| `src/components/result/RadarChart.tsx` | UIのみ変更OK |

**新しいコンポーネントの追加も自由。** `src/components/ui/`に新ファイルを作成してOK。

---

## Current Color System (globals.css)

現在の夜明け配色（改善 or 全置換してよい）:

```css
:root {
  --background: #050608;
  --foreground: #f4f0e6;
  --dawn-gold: #ffb84d;
  --dawn-orange: #ff7b30;
  --dawn-red: #d14124;
  --dawn-blue: #2a3b5c;
  --dawn-highlight: #ffeed1;
  --card-bg: rgba(20, 24, 34, 0.4);
  --card-border: rgba(255, 184, 77, 0.15);
}
```

変数名も変えてOK（ただし`@theme inline`の構造は維持）。
**注意: 黄色テキスト + 真っ黒背景のハイコントラストはUndertale的なので避ける。** 中間色や多色グラデーションを活かすこと。

---

## Current App Architecture

```
src/app/page.tsx   ← appState: "landing" | "quiz" | "result" で3画面を切り替え
                      AnimatePresence mode="wait" でページ遷移

src/app/layout.tsx ← dawn-bg（固定背景グラデーション）
                      ParticleBackground（パーティクル）
                      Geist Sans / Geist Monoフォント
```

### State Flow
```
Landing (page.tsx)
  → [診断を始める] → setAppState("quiz")
  → Quiz (QuizEngine.tsx)
    → [50問回答] → onComplete(scores, answers)
    → handleQuizComplete → setAppState("result")
  → Result (ResultView.tsx)
    → [最初から] → onRestart → setAppState("landing")
```

---

## i18n (日英両対応)

- テキストは全て `t(locale, "key")` または `lt(locale, textObj)` で取得
- 新しい翻訳キーを追加する場合は `src/lib/i18n.ts` の `translations` オブジェクトに追加
- ハードコードされた日本語/英語テキストを入れない
- `locale` は `"ja" | "en"` の2値

---

## BGM/SE (Optional)

時間に余裕があれば:
- ランディング: 静かなアンビエント
- クイズ中: 緊張感のあるループ
- 結果表示: 壮大なリザルト演出音

Web Audio APIまたは`<audio>`タグで実装。なければスキップ可。

---

## AI Image Generation (推奨)

著作権フリーの画像が必要な場合:
- **GPT Image 1.5** or **Gemini** でゲーミング抽象ビジュアルを生成
- `/generate-image` スキルが利用可能
- テーマ: 夜明け、壮大な風景、抽象的なゲーム世界
- **ゲームキャラクターの画像は著作権上使用不可**

---

## Checklist

- [ ] **Undertale差別化**: バトルボックス・ピクセルハート・黄色黒メニューを避けたデザイン
- [ ] Landing: 夜明けグラデーション背景 + 新ボタンデザイン
- [ ] Landing: パーティクルエフェクト（光の粒子等）
- [ ] Quiz: シナリオカード新デザイン（ハードボイルドテキストが映える・白枠ボックス回避）
- [ ] Quiz: 選択肢ボタン新デザイン + 選択フィードバック（Undertaleメニュー風回避）
- [ ] Quiz: プログレスバー新デザイン
- [ ] Quiz: 問題間トランジション
- [ ] Result: キャラ名の大胆な登場演出
- [ ] Result: Wikipediaリンクボタン（目立つ配置）
- [ ] Result: レーダーチャート刷新
- [ ] Result: バーグラフ改善（5軸）
- [ ] Result: SNSシェア・アップグレードCTA維持
- [ ] 全画面: Framer Motionアニメーション
- [ ] 全画面: モバイルレスポンシブ
- [ ] 全画面: 日英両対応維持
- [ ] `npm run build` が通ること
- [ ] 機能が壊れていないこと（50問回答→結果表示→シェア）
- [ ] オリジナルなビジュアルアイデンティティ（Undertaleとは一線を画す）
