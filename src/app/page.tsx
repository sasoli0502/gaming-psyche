"use client";

import { useState } from "react";
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
import typesData from "@/data/types/types.json";
import type { Question, GamerType } from "@/lib/types";

type AppState = "landing" | "quiz" | "result" | "types";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [locale, setLocale] = useState<Locale>("ja");
  const [resultData, setResultData] = useState<{
    scores: AxisScores;
    normalizedScores: AxisScores;
    type: GamerType;
    answers: { questionId: string; optionId: string }[];
  } | null>(null);

  const questions = freeQuestions as Question[];
  const types = typesData as GamerType[];

  const { toggleMute } = useBgm(appState);
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
      {appState === "quiz" ? (
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
                onClick={() => setAppState("quiz")}
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
