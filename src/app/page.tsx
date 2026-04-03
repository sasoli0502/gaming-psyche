"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NeonText } from "@/components/ui/NeonText";
import { CyberButton } from "@/components/ui/CyberButton";
import { QuizEngine } from "@/components/quiz/QuizEngine";
import { ResultView } from "@/components/result/ResultView";
import { TypeList } from "@/components/result/TypeList";
import { AxisScores, Locale } from "@/lib/types";
import { normalizeScores, findType } from "@/lib/scoring";
import { t } from "@/lib/i18n";
import { useBgm } from "@/lib/useBgm";
import freeQuestions from "@/data/questions/free.json";
import midQuestions from "@/data/questions/mid.json";
import topQuestions from "@/data/questions/top.json";
import typesData from "@/data/types/types.json";
import type { Question, GamerType } from "@/lib/types";

type Tier = "free" | "mid" | "top";
type AppState = "landing" | "tier-select" | "quiz" | "result" | "types";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [locale, setLocale] = useState<Locale>("ja");
  const [tier, setTier] = useState<Tier>("free");
  const [resultData, setResultData] = useState<{
    scores: AxisScores;
    normalizedScores: AxisScores;
    type: GamerType;
    answers: { questionId: string; optionId: string }[];
    tier: Tier;
  } | null>(null);

  const types = typesData as GamerType[];

  const questions = useMemo(() => {
    const free = freeQuestions as Question[];
    if (tier === "free") return free;
    const mid = midQuestions as Question[];
    if (tier === "mid") return [...free, ...mid];
    const top = topQuestions as Question[];
    return [...free, ...mid, ...top];
  }, [tier]);

  const { toggleMute } = useBgm(appState === "tier-select" ? "landing" : appState);
  const [muted, setMuted] = useState(false);

  const handleQuizComplete = (
    scores: AxisScores,
    answers: { questionId: string; optionId: string }[]
  ) => {
    const normalized = normalizeScores(scores, questions.length);
    const type = findType(types, scores);

    if (type) {
      setResultData({
        scores,
        normalizedScores: normalized,
        type,
        answers,
        tier,
      });
      setAppState("result");
    }
  };

  const toggleLocale = () => {
    setLocale((prev) => (prev === "ja" ? "en" : "ja"));
  };

  // Language switch + mute buttons (always visible)
  const langSwitch = (
    <div className="fixed top-6 right-6 z-50 flex gap-2">
      <button
        onClick={() => setMuted(toggleMute())}
        className="px-3 py-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-xs font-sans text-white/70 hover:text-dawn-highlight hover:border-dawn-gold/50 hover:bg-black/40 transition-all duration-300"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? "🔇" : "🔊"}
      </button>
      <button
        onClick={toggleLocale}
        className="px-4 py-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-xs font-sans tracking-widest text-white/70 hover:text-dawn-highlight hover:border-dawn-gold/50 hover:bg-black/40 transition-all duration-300"
      >
        {t(locale, "common.langSwitch")}
      </button>
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {appState === "tier-select" ? (
        <motion.div
          key="tier-select"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-[100dvh] flex flex-col items-center justify-center px-6 relative"
        >
          {langSwitch}
          <button
            onClick={() => setAppState("landing")}
            className="fixed top-6 left-6 z-50 px-4 py-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-xs font-sans tracking-widest text-white/40 hover:text-dawn-highlight hover:border-dawn-gold/50 hover:bg-black/40 transition-all duration-300"
          >
            {locale === "ja" ? "← 戻る" : "← Back"}
          </button>

          <div className="max-w-2xl w-full z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-[10px] md:text-xs font-sans tracking-[0.4em] text-dawn-gold/50 uppercase">
                {locale === "ja" ? "診断コースを選択" : "Choose Your Path"}
              </span>
              <h2 className="text-2xl md:text-3xl font-sans font-light text-dawn-highlight mt-4 tracking-wide">
                {locale === "ja" ? "どこまで深く知りたい？" : "How deep do you want to go?"}
              </h2>
            </motion.div>

            <div className="space-y-4">
              {([
                {
                  id: "free" as Tier,
                  name: { ja: "Free", en: "Free" },
                  price: { ja: "無料", en: "Free" },
                  questions: 30,
                  features: {
                    ja: ["32タイプ判定", "5軸レーダーチャート", "キャラクターマッチ"],
                    en: ["32 Type Analysis", "5-Axis Radar Chart", "Character Match"],
                  },
                },
                {
                  id: "mid" as Tier,
                  name: { ja: "Deep", en: "Deep" },
                  price: { ja: "¥300", en: "$3" },
                  questions: 60,
                  features: {
                    ja: ["Freeの全機能", "相性診断", "ゲームアドバイス", "より深いシナリオ"],
                    en: ["All Free features", "Compatibility Check", "Game Advice", "Deeper scenarios"],
                  },
                },
                {
                  id: "top" as Tier,
                  name: { ja: "Abyss", en: "Abyss" },
                  price: { ja: "¥500", en: "$5" },
                  questions: 90,
                  features: {
                    ja: ["Deepの全機能", "169キャラ精密マッチ", "心理学分析", "詳細レポートPDF", "AIコーチ"],
                    en: ["All Deep features", "169-Char Precise Match", "Psychology Analysis", "Detailed PDF Report", "AI Coach"],
                  },
                },
              ]).map((plan, i) => (
                <motion.button
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  onClick={() => {
                    setTier(plan.id);
                    setAppState("quiz");
                  }}
                  className={`w-full text-left p-6 rounded-xl border transition-all duration-300 group ${
                    plan.id === "top"
                      ? "border-dawn-gold/40 bg-dawn-gold/5 hover:bg-dawn-gold/10 hover:border-dawn-gold/60"
                      : plan.id === "mid"
                      ? "border-dawn-orange/30 bg-dawn-orange/5 hover:bg-dawn-orange/10 hover:border-dawn-orange/50"
                      : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-lg font-sans font-medium tracking-wide ${
                        plan.id === "top" ? "text-dawn-gold" : plan.id === "mid" ? "text-dawn-orange" : "text-white/80"
                      }`}>
                        {plan.name[locale]}
                      </span>
                      <span className="text-xs font-sans text-white/30 tracking-wide">
                        {plan.questions} {locale === "ja" ? "問" : "Q"}
                      </span>
                    </div>
                    <span className={`text-sm font-sans tracking-wide ${
                      plan.id === "top" ? "text-dawn-gold" : plan.id === "mid" ? "text-dawn-orange" : "text-white/50"
                    }`}>
                      {plan.price[locale]}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {plan.features[locale].map((f, j) => (
                      <span
                        key={j}
                        className="text-[11px] font-sans text-white/40 bg-white/5 px-2 py-1 rounded-md tracking-wide"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center text-[11px] text-white/20 mt-8 font-sans tracking-wide"
            >
              {locale === "ja"
                ? "※ 有料プランは現在準備中です。全コース無料でお試しいただけます。"
                : "※ Paid plans coming soon. All courses are currently free to try."}
            </motion.p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-dawn-orange/10 via-dawn-gold/5 to-transparent pointer-events-none mix-blend-screen" />
        </motion.div>
      ) : appState === "quiz" ? (
        <motion.div
          key="quiz"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {langSwitch}
          <button
            onClick={() => setAppState("landing")}
            className="fixed top-6 left-6 z-50 px-4 py-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-xs font-sans tracking-widest text-white/40 hover:text-dawn-highlight hover:border-dawn-gold/50 hover:bg-black/40 transition-all duration-300"
          >
            {locale === "ja" ? "✕ やめる" : "✕ Quit"}
          </button>
          <QuizEngine
            questions={questions}
            locale={locale}
            onComplete={handleQuizComplete}
          />
        </motion.div>
      ) : appState === "types" ? (
        <motion.div
          key="types"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {langSwitch}
          <TypeList
            types={types}
            locale={locale}
            onClose={() => setAppState(resultData ? "result" : "landing")}
            highlightId={resultData?.type.id}
          />
        </motion.div>
      ) : appState === "result" && resultData ? (
        <motion.div
          key="result"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          {langSwitch}
          <ResultView
            type={resultData.type}
            scores={resultData.normalizedScores}
            locale={locale}
            onRestart={() => {
              setAppState("landing");
              setResultData(null);
            }}
            onViewTypes={() => setAppState("types")}
          />
        </motion.div>
      ) : (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="min-h-[100dvh] flex flex-col items-center justify-center px-6 relative"
        >
          {langSwitch}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center max-w-3xl z-10"
          >
            {/* Logo / Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mb-8"
            >
              <span className="text-[10px] md:text-sm font-sans tracking-[0.4em] text-dawn-gold/60 uppercase">
                Gaming Psyche
              </span>
            </motion.div>

            <NeonText
              as="h1"
              color="gold"
              animate
              className="text-4xl md:text-5xl lg:text-7xl font-sans font-light tracking-wide mb-8 leading-tight text-dawn-highlight"
            >
              {t(locale, "landing.tagline")}
            </NeonText>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-sm md:text-lg text-white/50 mb-16 leading-relaxed font-light max-w-2xl mx-auto"
            >
              {t(locale, "landing.subtitle")}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 mb-16"
            >
              {[
                { text: t(locale, "landing.types"), icon: "✧" },
                { text: t(locale, "landing.questions"), icon: "✦" },
                { text: t(locale, "landing.free"), icon: "✧" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-white/40 font-sans tracking-wide"
                >
                  <span className="text-dawn-gold/60 text-lg">{stat.icon}</span>
                  {stat.text}
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <CyberButton
                size="lg"
                onClick={() => setAppState("tier-select")}
              >
                {t(locale, "landing.cta")}
              </CyberButton>
              <button
                onClick={() => setAppState("types")}
                className="block mx-auto mt-6 text-sm font-sans text-white/30 hover:text-dawn-highlight tracking-wide transition-colors duration-300"
              >
                {locale === "ja" ? "32タイプ一覧を見る →" : "View all 32 types →"}
              </button>
            </motion.div>
          </motion.div>

          {/* Epic bottom atmospheric light */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-dawn-orange/10 via-dawn-gold/5 to-transparent pointer-events-none mix-blend-screen" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
