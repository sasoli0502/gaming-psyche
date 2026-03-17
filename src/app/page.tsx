"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NeonText } from "@/components/ui/NeonText";
import { CyberButton } from "@/components/ui/CyberButton";
import { QuizEngine } from "@/components/quiz/QuizEngine";
import { ResultView } from "@/components/result/ResultView";
import { AxisScores, Locale } from "@/lib/types";
import { normalizeScores, findType } from "@/lib/scoring";
import { t } from "@/lib/i18n";
import freeQuestions from "@/data/questions/free.json";
import typesData from "@/data/types/types.json";
import type { Question, GamerType } from "@/lib/types";

type AppState = "landing" | "quiz" | "result";

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

  // Language switch button (always visible)
  const langSwitch = (
    <button
      onClick={toggleLocale}
      className="fixed top-4 right-4 z-50 px-3 py-1 border border-white/20 rounded-sm text-xs font-mono text-white/60 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all"
    >
      {t(locale, "common.langSwitch")}
    </button>
  );

  if (appState === "quiz") {
    return (
      <>
        {langSwitch}
        <QuizEngine
          questions={questions}
          locale={locale}
          onComplete={handleQuizComplete}
        />
      </>
    );
  }

  if (appState === "result" && resultData) {
    return (
      <>
        {langSwitch}
        <ResultView
          type={resultData.type}
          scores={resultData.normalizedScores}
          locale={locale}
          onRestart={() => {
            setAppState("landing");
            setResultData(null);
          }}
        />
      </>
    );
  }

  // Landing page
  return (
    <>
      {langSwitch}
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl"
        >
          {/* Logo / Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <span className="text-xs font-mono tracking-[0.3em] text-neon-cyan/50 uppercase">
              Gaming Psyche
            </span>
          </motion.div>

          <NeonText
            as="h1"
            color="cyan"
            animate
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
          >
            {t(locale, "landing.tagline")}
          </NeonText>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg text-white/50 mb-12 leading-relaxed"
          >
            {t(locale, "landing.subtitle")}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {[
              { text: t(locale, "landing.types"), icon: "◆" },
              { text: t(locale, "landing.questions"), icon: "◇" },
              { text: t(locale, "landing.free"), icon: "△" },
            ].map((stat) => (
              <div
                key={stat.text}
                className="flex items-center gap-2 text-sm text-white/40 font-mono"
              >
                <span className="text-neon-cyan/60">{stat.icon}</span>
                {stat.text}
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <CyberButton
              size="lg"
              onClick={() => setAppState("quiz")}
            >
              {t(locale, "landing.cta")}
            </CyberButton>
          </motion.div>
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 text-xs font-mono text-white/15 tracking-widest"
        >
          SCROLL_INIT &gt; READY
        </motion.div>
      </div>
    </>
  );
}
