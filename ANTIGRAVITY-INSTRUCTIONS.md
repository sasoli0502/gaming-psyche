# Gaming Psyche — Antigravity Design Instructions

## What This Is

Gaming Psycheは、FPS/アクションゲームのシナリオ選択から深層心理を分析するWeb診断ツール。
現在サイバーパンク/ネオンのUIで動作中だが、**デザインを全面リニューアル**したい。

**公開中**: https://sasoli0502.github.io/gaming-psyche/

---

## Your Mission

**3画面のビジュアルデザインを全面リニューアルする。機能は一切変えない。**

### Design Direction

**インスピレーション: ゼルダの伝説 時のオカリナ — タイトル画面**

エポナに乗ったリンクがハイラル平原を歩く、朝日が昇り始めるあのシーン。
借りたいのは「静けさ」と「壮大さ」の空気感。色そのものではなく**雰囲気**。

| 項目 | 方針 |
|------|------|
| **全体の雰囲気** | 静かで壮大。夜明けのグラデーション |
| **カラー** | ダーク→夜明けグラデーション（暗い背景から温かみのある光へ）。具体的な色はあなたの判断でOK |
| **テキストトーン** | 問題文はハードボイルド/エッジーなまま。UIの温かさとテキストの硬さを共存させる |
| **現行のネオン/サイバー** | **完全に捨ててよい** |

### Animation Level: Full

- パーティクルエフェクト（光の粒子、ほたる、花びら等）
- パララックス / スクロール連動
- ページ遷移エフェクト（ランディング→クイズ→結果）
- 結果表示の演出（キャラ名登場時の特別なアニメーション）
- **Framer Motion**が既にインストール済み — そのまま活用すること

### Target Audience

- 20代ゲーマー（カジュアル層）
- ゲームに詳しくなくても楽しめる
- **スマホでSNSシェアされることを想定**（モバイルファースト）

---

## 3 Screens to Redesign

### Screen 1: Landing Page

**ファイル**: `src/app/page.tsx`（landingステート部分）
**関連CSS**: `src/app/globals.css`

**維持するもの:**
- キャッチコピー「ゲームの選択に、お前の人生が出る。」
- 言語切り替え（JP/EN）ボタン（`toggleLocale`関数）
- 「診断を始める」CTAボタン（`setAppState("quiz")`を呼ぶ）
- 50問 / 32タイプ / 無料 の情報表示

**変えるもの:**
- 背景を夜明けのグラデーションに
- NeonTextコンポーネント → 新しいテキストスタイルに置換
- CyberButtonコンポーネント → 新しいボタンスタイルに置換
- 全体のレイアウト・アニメーション

### Screen 2: Quiz Screen

**ファイル**:
- `src/components/quiz/QuizEngine.tsx` — **ロジックは絶対に変えない。UIのみ変更**
- `src/components/quiz/ScenarioCard.tsx` — シナリオ（問題文）表示
- `src/components/quiz/OptionButton.tsx` — 4択の選択肢ボタン
- `src/components/quiz/ProgressBar.tsx` — 進捗バー

**維持するもの:**
- QuizEngine内のstate管理・スコアリングロジック
- 問題文の表示（ハードボイルドなテキストが映えるデザインに）
- 4つの選択肢（A/B/C/D）
- 進捗表示（現在/50問 + カテゴリ表示）

**変えるもの:**
- カードデザイン、ボタンデザイン
- 選択時のフィードバックアニメーション
- 問題間のトランジション
- プログレスバーのビジュアル

### Screen 3: Result Screen

**ファイル**:
- `src/components/result/ResultView.tsx` — 結果画面
- `src/components/result/RadarChart.tsx` — レーダーチャート

**維持するもの:**
- キャラ名・タイプコード・説明テキスト・レーダーチャート
- SNSシェアボタン
- 有料版アップグレードCTA
- リスタートボタン

**重要な変更:**
- **キャラ名を最も目立たせる**（最大・最初に表示・特別な登場演出）
- **Wikipediaリンクボタン** — 目立つデザインで。「Wikipedia」とは書かず、「このキャラについて詳しく →」的な文言
- レーダーチャートのビジュアル刷新
- 各軸のバーグラフ（-100〜+100）追加
- deepDescription（哲学的分析テキスト）のレイアウト改善
- 結果画面全体の演出

---

## Tech Stack & Constraints

### 技術
- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** — `@theme inline` でカスタムカラー定義中（`globals.css`参照）
- **Framer Motion** — アニメーション
- **静的エクスポート** — `next.config.ts` の `output: "export"` を絶対に消さない

### 絶対に壊さないファイル
- `src/lib/scoring.ts` — スコアリングロジック
- `src/lib/types.ts` — 型定義
- `src/lib/i18n.ts` — 翻訳システム（キー構造を壊さない）
- `src/data/` — 全データファイル

### 自由に変更してよいファイル
- `src/app/globals.css` — **全面書き換えOK**
- `src/components/ui/` — NeonText, CyberButton, GlowCard → **削除・置換OK**
- `src/components/quiz/ScenarioCard.tsx` — UIのみ変更OK
- `src/components/quiz/OptionButton.tsx` — UIのみ変更OK
- `src/components/quiz/ProgressBar.tsx` — UIのみ変更OK
- `src/components/result/ResultView.tsx` — UIのみ変更OK
- `src/components/result/RadarChart.tsx` — UIのみ変更OK
- `src/app/page.tsx` — ランディング部分のUI変更OK（state管理は維持）

### 注意: QuizEngine.tsxの扱い
`src/components/quiz/QuizEngine.tsx` 内のJSX（render部分）は変更OK。
ただし以下のロジックは**絶対に変更しない**:
- `useState` / state管理
- `handleOptionSelect` 関数
- `onComplete` コールバック
- スコアリング計算

### 日英両対応
- テキストは全て `t(locale, "key")` または `lt(locale, textObj)` で取得
- 新しい翻訳キーを追加する場合は `src/lib/i18n.ts` の `translations` オブジェクトに追加
- ハードコードされた日本語/英語テキストを入れない

---

## Current Color Variables (globals.css)

現在のサイバーパンク配色（全て置換してよい）:

```css
:root {
  --background: #0a0a0f;
  --foreground: #e0e0e8;
  --neon-cyan: #00f0ff;
  --neon-magenta: #ff00ff;
  --neon-green: #39ff14;
  --neon-yellow: #ffff00;
  --neon-orange: #ff6600;
  --card-bg: rgba(15, 15, 25, 0.85);
  --card-border: rgba(0, 240, 255, 0.15);
}
```

→ 夜明けテーマに合わせて自由に変更。変数名も変えてOK（ただし`@theme inline`の構造は維持）

---

## BGM/SE（Optional）

時間に余裕があれば:
- ランディング: 静かなアンビエント
- クイズ中: 緊張感のあるループ
- 結果表示: 壮大なリザルト演出音

Web Audio APIまたは`<audio>`タグで実装。なければスキップ可。

---

## How to Run

```bash
cd gaming-psyche
npm run dev     # 開発サーバー (localhost:3000)
npm run build   # 静的ビルド
```

## How to Deploy

```bash
npm run build
# out/ ディレクトリが生成される → GitHub Pages にデプロイ
```

---

## Checklist

- [ ] Landing: 夜明けグラデーション背景 + 新ボタンデザイン
- [ ] Landing: パーティクルエフェクト（光の粒子等）
- [ ] Quiz: シナリオカード新デザイン（ハードボイルドテキストが映える）
- [ ] Quiz: 選択肢ボタン新デザイン + 選択フィードバック
- [ ] Quiz: プログレスバー新デザイン
- [ ] Quiz: 問題間トランジション
- [ ] Result: キャラ名の大胆な登場演出
- [ ] Result: Wikipediaリンクボタン（目立つ配置）
- [ ] Result: レーダーチャート刷新
- [ ] Result: バーグラフ追加（5軸）
- [ ] Result: SNSシェア・アップグレードCTA維持
- [ ] 全画面: Framer Motionアニメーション
- [ ] 全画面: モバイルレスポンシブ
- [ ] 全画面: 日英両対応維持
- [ ] `npm run build` が通ること
- [ ] 機能が壊れていないこと（50問回答→結果表示→シェア）
