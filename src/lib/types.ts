export interface LocaleText {
  ja: string;
  en: string;
}

export interface AxisScores {
  aggression: number; // 攻撃性 vs 慎重性
  altruism: number; // 利己 vs 利他
  cooperation: number; // 孤独型 vs 協調型
  intuition: number; // 直感 vs 計算
  mastery: number; // 求道 vs 実利
}

export interface QuestionOption {
  id: string;
  text: LocaleText;
  scores: AxisScores;
}

export interface Question {
  id: string;
  tier: "free" | "mid" | "top";
  category: "tactical" | "social" | "meta" | "psych";
  psychTag?: "defense" | "attachment" | "dark";
  scenario: LocaleText;
  options: QuestionOption[];
}

export type AxisDirection = "high" | "low";

export interface GamerType {
  id: string;
  name: LocaleText;
  character: string;
  characterGame: string;
  characterUrl: string;
  description: LocaleText;
  deepDescription: LocaleText;
  recommendedGames: string[];
  axes: {
    aggression: AxisDirection;
    altruism: AxisDirection;
    cooperation: AxisDirection;
    intuition: AxisDirection;
    mastery: AxisDirection;
  };
}

export interface UserState {
  answers: { questionId: string; optionId: string }[];
  scores: AxisScores;
  currentQuestion: number;
  tier: "free" | "mid" | "top";
  locale: "ja" | "en";
}

export type Locale = "ja" | "en";

export const AXIS_LABELS: Record<keyof AxisScores, LocaleText> = {
  aggression: { ja: "攻撃性", en: "Aggression" },
  altruism: { ja: "利他性", en: "Altruism" },
  cooperation: { ja: "協調性", en: "Cooperation" },
  intuition: { ja: "直感力", en: "Intuition" },
  mastery: { ja: "求道心", en: "Mastery" },
};

export const AXIS_POLES: Record<
  keyof AxisScores,
  { low: LocaleText; high: LocaleText }
> = {
  aggression: {
    low: { ja: "慎重", en: "Cautious" },
    high: { ja: "攻撃的", en: "Aggressive" },
  },
  altruism: {
    low: { ja: "利己的", en: "Self-serving" },
    high: { ja: "利他的", en: "Altruistic" },
  },
  cooperation: {
    low: { ja: "孤独型", en: "Lone Wolf" },
    high: { ja: "協調型", en: "Team Player" },
  },
  intuition: {
    low: { ja: "計算型", en: "Calculated" },
    high: { ja: "直感型", en: "Intuitive" },
  },
  mastery: {
    low: { ja: "実利主義", en: "Pragmatic" },
    high: { ja: "求道者", en: "Perfectionist" },
  },
};
