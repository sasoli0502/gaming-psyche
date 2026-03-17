import { Locale, LocaleText } from "./types";

const translations = {
  ja: {
    // Landing
    "landing.tagline": "ゲームの選択に、お前の人生が出る。",
    "landing.subtitle":
      "FPS・アクションゲームの判断から、あなたの深層心理を哲学的に分析する。",
    "landing.cta": "診断を始める",
    "landing.types": "32タイプの人格分析",
    "landing.questions": "50の没入型シナリオ",
    "landing.free": "無料で診断",

    // Quiz
    "quiz.progress": "{{current}} / {{total}}",
    "quiz.category.tactical": "TACTICAL",
    "quiz.category.social": "SOCIAL",
    "quiz.category.meta": "META",

    // Result
    "result.yourType": "あなたのタイプ",
    "result.character": "ゲームキャラ相性",
    "result.axes": "5軸分析",
    "result.games": "おすすめゲーム",
    "result.share": "結果をシェア",
    "result.deepAnalysis": "深層分析を見る",
    "result.mid.title": "中級分析（100問）",
    "result.mid.price": "¥300",
    "result.top.title": "上級分析（200問）",
    "result.top.price": "¥500",
    "result.upgrade":
      "さらに深く知りたい？有料版では、あなたの思考パターンを哲学的に徹底分析します。",

    // Common
    "common.langSwitch": "EN",
    "common.loading": "読み込み中...",
    "common.backToTop": "トップに戻る",
  },
  en: {
    "landing.tagline": "Your choices in games reveal who you truly are.",
    "landing.subtitle":
      "A philosophical analysis of your psyche through FPS & action game decisions.",
    "landing.cta": "Start Diagnosis",
    "landing.types": "32 Personality Types",
    "landing.questions": "50 Immersive Scenarios",
    "landing.free": "Free Analysis",

    "quiz.progress": "{{current}} / {{total}}",
    "quiz.category.tactical": "TACTICAL",
    "quiz.category.social": "SOCIAL",
    "quiz.category.meta": "META",

    "result.yourType": "Your Type",
    "result.character": "Game Character Match",
    "result.axes": "5-Axis Analysis",
    "result.games": "Recommended Games",
    "result.share": "Share Result",
    "result.deepAnalysis": "Unlock Deep Analysis",
    "result.mid.title": "Mid-tier Analysis (100Q)",
    "result.mid.price": "$2.99",
    "result.top.title": "Top-tier Analysis (200Q)",
    "result.top.price": "$4.99",
    "result.upgrade":
      "Want to go deeper? Paid tiers unlock a philosophical deep-dive into your thought patterns.",

    "common.langSwitch": "JP",
    "common.loading": "Loading...",
    "common.backToTop": "Back to Top",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["ja"];

export function t(
  locale: Locale,
  key: TranslationKey,
  params?: Record<string, string | number>
): string {
  let text: string = (translations[locale][key] as string) || key;
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{{${k}}}`, String(v));
    });
  }
  return text;
}

export function lt(locale: Locale, text: LocaleText): string {
  return text[locale];
}
