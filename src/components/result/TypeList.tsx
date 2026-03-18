"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GamerType, Locale, AXIS_POLES } from "@/lib/types";
import { lt } from "@/lib/i18n";
import { CyberButton } from "@/components/ui/CyberButton";

interface TypeListProps {
  types: GamerType[];
  locale: Locale;
  onClose: () => void;
  highlightId?: string;
}

// 5-letter code system explanation
const AXIS_CODE_INFO = [
  {
    position: 1,
    axis: { ja: "攻撃性", en: "Aggression" },
    high: { letter: "A", ja: "攻撃的 (Aggressive)", en: "Aggressive" },
    low: { letter: "C", ja: "慎重 (Cautious)", en: "Cautious" },
    desc: {
      ja: "戦いへの向き合い方。攻めか、守りか。",
      en: "Your approach to conflict. Offense or defense.",
    },
  },
  {
    position: 2,
    axis: { ja: "利他性", en: "Altruism" },
    high: { letter: "A", ja: "利他的 (Altruistic)", en: "Altruistic" },
    low: { letter: "S", ja: "利己的 (Self-serving)", en: "Self-serving" },
    desc: {
      ja: "誰のために戦うか。仲間か、自分か。",
      en: "Who you fight for. Others or yourself.",
    },
  },
  {
    position: 3,
    axis: { ja: "協調性", en: "Cooperation" },
    high: { letter: "T", ja: "チームプレイ (Team)", en: "Team Player" },
    low: { letter: "L", ja: "一匹狼 (Lone Wolf)", en: "Lone Wolf" },
    desc: {
      ja: "群れるか、一人で行くか。",
      en: "Run with the pack or walk alone.",
    },
  },
  {
    position: 4,
    axis: { ja: "直感力", en: "Intuition" },
    high: { letter: "I", ja: "直感型 (Intuitive)", en: "Intuitive" },
    low: { letter: "C", ja: "計算型 (Calculated)", en: "Calculated" },
    desc: {
      ja: "判断の根拠。感覚か、論理か。",
      en: "How you decide. Gut feeling or cold logic.",
    },
  },
  {
    position: 5,
    axis: { ja: "求道心", en: "Mastery" },
    high: { letter: "M", ja: "求道者 (Mastery)", en: "Perfectionist" },
    low: { letter: "P", ja: "実利主義 (Pragmatic)", en: "Pragmatic" },
    desc: {
      ja: "極めるか、結果を取るか。",
      en: "Chase perfection or take the win.",
    },
  },
];

function generateCode(type: GamerType): string {
  const letters = [
    type.axes.aggression === "high" ? "A" : "C",
    type.axes.altruism === "high" ? "A" : "S",
    type.axes.cooperation === "high" ? "T" : "L",
    type.axes.intuition === "high" ? "I" : "C",
    type.axes.mastery === "high" ? "M" : "P",
  ];
  return letters.join("");
}

type ViewState = "explanation" | "grid" | "detail";

export function TypeList({ types, locale, onClose, highlightId }: TypeListProps) {
  const [view, setView] = useState<ViewState>("explanation");
  const [selectedType, setSelectedType] = useState<GamerType | null>(null);

  const handleSelectType = (type: GamerType) => {
    setSelectedType(type);
    setView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (view === "detail") {
      setView("grid");
      setSelectedType(null);
    } else if (view === "grid") {
      setView("explanation");
    } else {
      onClose();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen px-4 py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dawn-gold/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={handleBack}
            className="text-white/40 hover:text-dawn-highlight text-sm font-sans tracking-wide transition-colors duration-300 flex items-center gap-1"
          >
            <span>←</span>
            <span>{locale === "ja" ? "戻る" : "Back"}</span>
          </button>
          <div className="text-[10px] font-sans tracking-[0.3em] text-dawn-gold/40 uppercase">
            {view === "explanation"
              ? locale === "ja" ? "コード解説" : "Code System"
              : view === "grid"
              ? locale === "ja" ? "32タイプ" : "32 Types"
              : locale === "ja" ? "タイプ詳細" : "Type Detail"}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* === Stage 1: Axis Explanation === */}
          {view === "explanation" && (
            <motion.div
              key="explanation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-sans font-light text-dawn-highlight tracking-wide mb-4 text-center">
                {locale === "ja" ? "5文字のコード" : "The 5-Letter Code"}
              </h1>
              <p className="text-sm text-white/40 text-center mb-12 max-w-xl mx-auto leading-relaxed">
                {locale === "ja"
                  ? "あなたのゲーム心理は5つの軸で構成される。各軸のHighかLowかで、32通りの人格タイプが決まる。"
                  : "Your gaming psyche is defined by 5 axes. High or Low on each axis determines your type among 32 possibilities."}
              </p>

              <div className="space-y-6 mb-16">
                {AXIS_CODE_INFO.map((info, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="bg-white/[0.02] border border-white/10 rounded-sm p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center gap-1 shrink-0 w-16">
                        <span className="text-2xl font-sans font-light text-dawn-highlight">
                          {info.high.letter}
                        </span>
                        <span className="text-[10px] text-white/20">or</span>
                        <span className="text-2xl font-sans font-light text-dawn-gold/60">
                          {info.low.letter}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-sans tracking-[0.2em] text-dawn-gold/50 uppercase mb-2">
                          {locale === "ja" ? `第${info.position}文字 — ` : `Position ${info.position} — `}
                          {locale === "ja" ? info.axis.ja : info.axis.en}
                        </div>
                        <div className="text-sm text-white/60 mb-3">
                          {locale === "ja" ? info.desc.ja : info.desc.en}
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs">
                          <span className="px-3 py-1 bg-dawn-gold/10 border border-dawn-gold/30 text-dawn-highlight rounded-sm">
                            {info.high.letter} = {locale === "ja" ? info.high.ja : info.high.en}
                          </span>
                          <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/50 rounded-sm">
                            {info.low.letter} = {locale === "ja" ? info.low.ja : info.low.en}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Example */}
              <div className="text-center mb-12">
                <p className="text-xs text-white/30 mb-3">
                  {locale === "ja" ? "例：" : "Example:"}
                </p>
                <div className="inline-flex items-center gap-1 text-3xl font-sans font-light tracking-[0.3em]">
                  <span className="text-dawn-highlight">A</span>
                  <span className="text-dawn-highlight">A</span>
                  <span className="text-dawn-highlight">T</span>
                  <span className="text-dawn-highlight">I</span>
                  <span className="text-dawn-highlight">M</span>
                </div>
                <p className="text-xs text-white/40 mt-2">
                  {locale === "ja"
                    ? "= 攻撃的 / 利他的 / チーム / 直感 / 求道者"
                    : "= Aggressive / Altruistic / Team / Intuitive / Mastery"}
                </p>
              </div>

              <div className="text-center">
                <CyberButton size="lg" onClick={() => { setView("grid"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  {locale === "ja" ? "32タイプを見る" : "View All 32 Types"}
                </CyberButton>
              </div>
            </motion.div>
          )}

          {/* === Stage 2: Type Grid === */}
          {view === "grid" && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-sans font-light text-dawn-highlight tracking-wide mb-3 text-center">
                {locale === "ja" ? "32タイプ一覧" : "All 32 Types"}
              </h1>
              <p className="text-sm text-white/40 text-center mb-10">
                {locale === "ja"
                  ? "タップして詳細を見る"
                  : "Tap a type to see details"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {types.map((type, i) => {
                  const isHighlighted = type.id === highlightId;
                  const code = generateCode(type);
                  return (
                    <motion.button
                      key={type.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.02 }}
                      onClick={() => handleSelectType(type)}
                      className={`p-4 rounded-sm border backdrop-blur-sm transition-all duration-300 text-left cursor-pointer ${
                        isHighlighted
                          ? "bg-dawn-gold/15 border-dawn-gold/50 shadow-[0_0_15px_rgba(255,184,77,0.2)]"
                          : "bg-white/[0.02] border-white/10 hover:border-dawn-gold/30 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-sans text-dawn-gold/60 tracking-[0.2em]">
                          {code}
                        </span>
                        {isHighlighted && (
                          <span className="text-[10px] font-sans text-dawn-orange tracking-wider">
                            {locale === "ja" ? "← あなた" : "← YOU"}
                          </span>
                        )}
                      </div>
                      <div className="text-base font-sans font-light text-dawn-highlight truncate">
                        {lt(locale, type.name)}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* === Stage 3: Type Detail === */}
          {view === "detail" && selectedType && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <TypeDetail type={selectedType} locale={locale} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// === Type Detail Component ===
function TypeDetail({ type, locale }: { type: GamerType; locale: Locale }) {
  const code = generateCode(type);
  const axisKeys = ["aggression", "altruism", "cooperation", "intuition", "mastery"] as const;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const additionalCharacters = (type as any).additionalCharacters as
    | { name: string; game: string }[]
    | undefined;

  return (
    <div className="space-y-10">
      {/* Character Header */}
      <div className="text-center">
        <div className="text-xs font-sans tracking-[0.3em] text-dawn-gold/40 uppercase mb-4">
          {code}
        </div>
        <h1 className="text-4xl md:text-6xl font-sans font-light text-dawn-highlight tracking-tight mb-3">
          {type.character}
        </h1>
        <div className="text-lg text-dawn-gold/70 italic mb-4">
          {type.characterGame}
        </div>
        <h2 className="text-xl md:text-2xl font-sans font-light text-white/70 tracking-wide">
          {lt(locale, type.name)}
        </h2>
      </div>

      {/* Wikipedia Link */}
      <div className="text-center">
        <a
          href={type.characterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-dawn-gold/30 rounded-full transition-all duration-300"
        >
          <span className="text-sm font-sans text-white/70 hover:text-dawn-highlight tracking-wide">
            {locale === "ja" ? "このキャラについて詳しく" : "Learn more about this character"}
          </span>
          <span className="text-dawn-gold/60">→</span>
        </a>
      </div>

      {/* Axis Breakdown */}
      <div className="bg-white/[0.02] border border-white/10 rounded-sm p-6">
        <h3 className="text-xs font-sans tracking-[0.3em] text-dawn-gold/50 uppercase mb-6 text-center">
          {locale === "ja" ? "5軸プロフィール" : "5-Axis Profile"}
        </h3>
        <div className="space-y-4">
          {axisKeys.map((axis) => {
            const dir = type.axes[axis];
            const pole = AXIS_POLES[axis];
            return (
              <div key={axis} className="flex items-center gap-3">
                <span className="text-xs text-white/40 w-10 text-right font-sans">
                  {AXIS_CODE_INFO[axisKeys.indexOf(axis)].high.letter}/{AXIS_CODE_INFO[axisKeys.indexOf(axis)].low.letter}
                </span>
                <span className={`text-xs w-16 text-right font-sans ${dir === "low" ? "text-dawn-gold/80" : "text-white/30"}`}>
                  {lt(locale, pole.low)}
                </span>
                <div className="flex-1 h-2 bg-black/30 rounded-full relative overflow-hidden">
                  <div
                    className={`absolute top-0 h-full rounded-full transition-all duration-700 ${
                      dir === "high"
                        ? "left-1/2 w-1/2 bg-gradient-to-r from-dawn-gold/60 to-dawn-highlight"
                        : "right-1/2 w-1/2 bg-gradient-to-l from-dawn-gold/60 to-dawn-orange"
                    }`}
                  />
                  <div className="absolute left-1/2 top-0 w-px h-full bg-white/20" />
                </div>
                <span className={`text-xs w-16 font-sans ${dir === "high" ? "text-dawn-highlight/80" : "text-white/30"}`}>
                  {lt(locale, pole.high)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white/[0.02] border border-white/10 rounded-sm p-6">
        <h3 className="text-xs font-sans tracking-[0.3em] text-dawn-gold/50 uppercase mb-4">
          {locale === "ja" ? "こういう人がこのタイプ" : "Who Fits This Type"}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed font-light">
          {lt(locale, type.description)}
        </p>
      </div>

      {/* Deep Description */}
      <div className="bg-white/[0.02] border border-white/10 rounded-sm p-6">
        <h3 className="text-xs font-sans tracking-[0.3em] text-dawn-gold/50 uppercase mb-4">
          {locale === "ja" ? "深層分析" : "Deep Analysis"}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed font-light italic">
          {lt(locale, type.deepDescription)}
        </p>
      </div>

      {/* Additional Characters */}
      {additionalCharacters && additionalCharacters.length > 0 && (
        <div>
          <h3 className="text-xs font-sans tracking-[0.3em] text-dawn-gold/50 uppercase mb-4 text-center">
            {locale === "ja" ? "同タイプのキャラクター" : "Characters of the Same Type"}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalCharacters.map((char, i) => (
              <div
                key={i}
                className="px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-sm text-center"
              >
                <div className="text-sm font-sans text-dawn-highlight/80 mb-0.5">
                  {char.name}
                </div>
                <div className="text-[10px] text-white/30 italic">
                  {char.game}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Games */}
      <div>
        <h3 className="text-xs font-sans tracking-[0.3em] text-dawn-gold/50 uppercase mb-4 text-center">
          {locale === "ja" ? "おすすめゲーム" : "Recommended Games"}
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {type.recommendedGames.map((game) => (
            <span
              key={game}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-sans text-white/60 tracking-wide"
            >
              {game}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
