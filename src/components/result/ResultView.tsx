"use client";

import { motion } from "framer-motion";
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
    <div className="min-h-screen flex flex-col items-center px-4 py-12">
      {/* Character + Type */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <span className="text-xs font-mono tracking-[0.3em] text-neon-cyan/50 uppercase mb-2 block">
          {t(locale, "result.yourType")}
        </span>
        <a
          href={type.characterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block hover:opacity-80 transition-opacity"
        >
          <NeonText
            as="h1"
            color="cyan"
            className="text-4xl md:text-6xl font-bold mb-2"
          >
            {type.character}
          </NeonText>
        </a>
        <a
          href={type.characterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg md:text-xl text-neon-cyan/70 font-mono mb-1 inline-block hover:text-neon-cyan transition-colors underline underline-offset-4 decoration-neon-cyan/30"
        >
          {type.characterGame}
        </a>
        <a
          href={type.characterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/30 hover:text-neon-cyan/60 transition-colors block mb-3"
        >
          {locale === "ja" ? "▶ キャラクター詳細を見る（Wikipedia）" : "▶ View character details (Wikipedia)"}
        </a>
        <div className="flex items-center justify-center gap-3">
          <span className="px-3 py-1 border border-neon-magenta/40 text-neon-magenta font-mono text-sm tracking-widest">
            {typeCode}
          </span>
          <span className="text-white/30 text-sm">—</span>
          <span className="text-white/50 text-sm">
            {lt(locale, type.name)}
          </span>
        </div>
      </motion.div>

      {/* Radar Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-8"
      >
        <RadarChart scores={scores} locale={locale} />
      </motion.div>

      {/* Axis Breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-lg mb-8"
      >
        <h2 className="text-xs font-mono tracking-[0.3em] text-neon-cyan/50 uppercase mb-4 text-center">
          {t(locale, "result.axes")}
        </h2>
        <div className="space-y-3">
          {axes.map((axis) => {
            const value = scores[axis];
            const pole = value >= 0 ? "high" : "low";
            const absValue = Math.abs(value);

            return (
              <div key={axis} className="flex items-center gap-3">
                <span className="text-xs font-mono text-white/40 w-16 text-right">
                  {AXIS_LABELS[axis][locale]}
                </span>
                <div className="flex-1 h-2 bg-white/5 rounded-full relative overflow-hidden">
                  <div
                    className={`absolute top-0 h-full rounded-full ${
                      pole === "high"
                        ? "right-1/2 bg-gradient-to-r from-transparent to-neon-cyan"
                        : "left-1/2 bg-gradient-to-l from-transparent to-neon-magenta"
                    }`}
                    style={{
                      width: `${absValue / 2}%`,
                      [pole === "high" ? "right" : "left"]: "50%",
                    }}
                  />
                  <div className="absolute left-1/2 top-0 w-px h-full bg-white/20" />
                </div>
                <span className="text-xs font-mono text-white/60 w-16">
                  {AXIS_POLES[axis][pole][locale]}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-lg mb-8"
      >
        <GlowCard hoverable={false}>
          <p className="text-white/80 leading-relaxed text-sm">
            {lt(locale, type.description)}
          </p>
        </GlowCard>
      </motion.div>

      {/* Recommended Games */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="w-full max-w-lg mb-8"
      >
        <h2 className="text-xs font-mono tracking-[0.3em] text-neon-cyan/50 uppercase mb-4 text-center">
          {t(locale, "result.games")}
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {type.recommendedGames.map((game) => (
            <span
              key={game}
              className="px-3 py-1 border border-white/10 rounded-sm text-xs font-mono text-white/60"
            >
              {game}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Upgrade Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="w-full max-w-lg mb-8"
      >
        <GlowCard hoverable={false} className="text-center">
          <NeonText as="h3" color="magenta" className="text-lg font-bold mb-3">
            {t(locale, "result.deepAnalysis")}
          </NeonText>
          <p className="text-white/50 text-sm mb-4">
            {t(locale, "result.upgrade")}
          </p>
          <div className="flex justify-center gap-4">
            <CyberButton variant="ghost" size="sm">
              {t(locale, "result.mid.title")} — {t(locale, "result.mid.price")}
            </CyberButton>
            <CyberButton variant="secondary" size="sm">
              {t(locale, "result.top.title")} — {t(locale, "result.top.price")}
            </CyberButton>
          </div>
        </GlowCard>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="flex gap-4"
      >
        <CyberButton onClick={handleShare}>
          {t(locale, "result.share")}
        </CyberButton>
        <CyberButton variant="ghost" onClick={onRestart}>
          {t(locale, "common.backToTop")}
        </CyberButton>
      </motion.div>
    </div>
  );
}
