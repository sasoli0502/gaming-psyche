"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GamerType, AxisScores, Locale, AXIS_LABELS, AXIS_POLES } from "@/lib/types";
import { lt, t } from "@/lib/i18n";
import { NeonText } from "@/components/ui/NeonText";
import { CyberButton } from "@/components/ui/CyberButton";
import { GlowCard } from "@/components/ui/GlowCard";
import { RadarChart } from "./RadarChart";

interface ResultViewProps {
  type: GamerType;
  scores: AxisScores;
  locale: Locale;
  onRestart: () => void;
}

// Generate MBTI-style code from type axes
function generateCode(type: GamerType): string {
  const letters = [
    type.axes.aggression === "high" ? "A" : "C",   // Aggressive / Cautious
    type.axes.altruism === "high" ? "A" : "S",      // Altruistic / Self-serving
    type.axes.cooperation === "high" ? "T" : "L",   // Team / Lone
    type.axes.intuition === "high" ? "I" : "C",     // Intuitive / Calculated
    type.axes.mastery === "high" ? "M" : "P",       // Mastery / Pragmatic
  ];
  return letters.join("");
}

export function ResultView({ type, scores, locale, onRestart }: ResultViewProps) {
  const [showFloatingTop, setShowFloatingTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const axes: (keyof AxisScores)[] = [
    "aggression",
    "altruism",
    "cooperation",
    "intuition",
    "mastery",
  ];

  const typeCode = generateCode(type);

  const shareText =
    locale === "ja"
      ? `Gaming Psyche で診断したら ${type.character}（${type.characterGame}）タイプだった！ [${typeCode}] #GamingPsyche`
      : `My Gaming Psyche result: ${type.character} from ${type.characterGame}! [${typeCode}] #GamingPsyche`;

  const handleShare = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `${shareText}\n\n${url}`;

    if (navigator.share) {
      navigator.share({ text, url });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16 relative">
      {/* Epic background atmospheric glow for results */}
      <div className="absolute inset-0 bg-gradient-to-b from-dawn-orange/10 via-transparent to-transparent pointer-events-none" />

      {/* Character + Type */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center mb-12 z-10 w-full"
      >
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xs md:text-sm font-sans tracking-[0.4em] text-dawn-gold/60 uppercase mb-4 block"
        >
          {t(locale, "result.yourType")}
        </motion.span>
        
        <div className="relative inline-block mb-3">
          <NeonText
            as="h1"
            color="highlight"
            className="text-5xl md:text-7xl lg:text-8xl font-sans font-light tracking-tight px-4 filter drop-shadow-[0_0_20px_rgba(255,238,209,0.3)] text-dawn-highlight"
          >
            {type.character}
          </NeonText>
          {/* Subtle light sweep across the name */}
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "200%" }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
            className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] mix-blend-overlay pointer-events-none"
          />
        </div>

        <div className="text-xl md:text-3xl text-dawn-gold/80 font-serif mb-8 italic tracking-wide">
          {type.characterGame}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col items-center gap-4 mb-4"
        >
          <div className="flex items-center justify-center gap-4">
            <span className="px-4 py-1.5 bg-dawn-gold/10 border border-dawn-gold/30 text-dawn-gold font-sans text-sm tracking-[0.2em] rounded-sm">
              {typeCode}
            </span>
            <span className="text-white/30 text-sm">—</span>
            <span className="text-dawn-highlight/80 text-lg md:text-xl font-light tracking-wide">
              {lt(locale, type.name)}
            </span>
          </div>

          <a
            href={type.characterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 mt-4 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-dawn-gold/30 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <span className="text-sm font-sans tracking-wide text-white/70 group-hover:text-dawn-highlight transition-colors">
              {locale === "ja" ? "このキャラについて詳しく" : "Learn more about character"}
            </span>
            <span className="text-dawn-gold/60 group-hover:text-dawn-gold transition-colors text-lg leadiing-none transform group-hover:translate-x-1 duration-300">
              →
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Radar Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mb-12"
      >
        <RadarChart scores={scores} locale={locale} />
      </motion.div>

      {/* Axis Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="w-full max-w-lg mb-12"
      >
        <h2 className="text-xs font-sans tracking-[0.3em] text-dawn-gold/60 uppercase mb-8 text-center flex items-center justify-center gap-4">
          <span className="w-12 h-px bg-dawn-gold/20" />
          {t(locale, "result.axes")}
          <span className="w-12 h-px bg-dawn-gold/20" />
        </h2>
        
        <div className="space-y-4">
          {axes.map((axis) => {
            const value = scores[axis];
            const pole = value >= 0 ? "high" : "low";
            const absValue = Math.abs(value);

            return (
              <div key={axis} className="flex items-center gap-4">
                <span className="text-xs font-sans text-white/50 w-20 text-right tracking-wider">
                  {AXIS_LABELS[axis][locale]}
                </span>
                <div className="flex-1 h-1.5 bg-black/40 border border-white/5 rounded-full relative overflow-hidden">
                  <div
                    className={`absolute top-0 h-full rounded-full transition-all duration-1000 ${
                      pole === "high"
                        ? "right-1/2 bg-gradient-to-r from-dawn-orange to-dawn-highlight shadow-[0_0_10px_rgba(255,184,77,0.5)]"
                        : "left-1/2 bg-gradient-to-l from-dawn-red to-dawn-gold shadow-[0_0_10px_rgba(209,65,36,0.5)]"
                    }`}
                    style={{
                      width: `${absValue / 2}%`,
                      [pole === "high" ? "right" : "left"]: "50%",
                    }}
                  />
                  <div className="absolute left-1/2 top-0 w-px h-full bg-white/20" />
                </div>
                <span className="text-xs font-sans text-white/70 w-20 tracking-wider">
                  {AXIS_POLES[axis][pole][locale]}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="w-full max-w-lg mb-12"
      >
        <GlowCard hoverable={false}>
          <p className="text-dawn-highlight/80 leading-relaxed text-sm md:text-base font-light font-serif">
            {lt(locale, type.description)}
          </p>
        </GlowCard>
      </motion.div>

      {/* Recommended Games */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="w-full max-w-lg mb-16"
      >
        <h2 className="text-xs font-sans tracking-[0.3em] text-dawn-gold/60 uppercase mb-6 text-center">
          {t(locale, "result.games")}
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {type.recommendedGames.map((game) => (
            <span
              key={game}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-sans text-white/70 tracking-wide hover:border-dawn-gold/30 hover:text-dawn-highlight transition-colors duration-300"
            >
              {game}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Upgrade Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="w-full max-w-lg mb-12"
      >
        <GlowCard hoverable={false} className="text-center bg-gradient-to-b from-dawn-orange/10 to-transparent">
          <NeonText as="h3" color="orange" className="text-xl font-sans font-light mb-4">
            {t(locale, "result.deepAnalysis")}
          </NeonText>
          <p className="text-white/60 text-sm mb-6 leading-relaxed font-light">
            {t(locale, "result.upgrade")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <CyberButton variant="ghost" size="sm">
              {t(locale, "result.mid.title")} <br className="sm:hidden" />({t(locale, "result.mid.price")})
            </CyberButton>
            <CyberButton variant="secondary" size="sm">
              {t(locale, "result.top.title")} <br className="sm:hidden" />({t(locale, "result.top.price")})
            </CyberButton>
          </div>
        </GlowCard>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-8"
      >
        <CyberButton onClick={handleShare} size="lg">
          {t(locale, "result.share")}
        </CyberButton>
        <CyberButton variant="ghost" onClick={onRestart} size="lg">
          {t(locale, "common.backToTop")}
        </CyberButton>
      </motion.div>

      {/* Floating buttons */}
      <AnimatePresence>
        {showFloatingTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
          >
            <button
              onClick={scrollToTop}
              className="w-12 h-12 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white/60 hover:text-dawn-highlight hover:border-dawn-gold/50 transition-all duration-300 flex items-center justify-center text-lg"
              title={locale === "ja" ? "上に戻る" : "Back to top"}
            >
              ↑
            </button>
            <button
              onClick={onRestart}
              className="w-12 h-12 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white/60 hover:text-dawn-highlight hover:border-dawn-gold/50 transition-all duration-300 flex items-center justify-center text-xs font-sans"
              title={locale === "ja" ? "最初から" : "Restart"}
            >
              ↺
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
