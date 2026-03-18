"use client";

import { motion } from "framer-motion";
import { GamerType, Locale } from "@/lib/types";
import { lt } from "@/lib/i18n";

interface TypeListProps {
  types: GamerType[];
  locale: Locale;
  onClose: () => void;
  highlightId?: string;
}

export function TypeList({ types, locale, onClose, highlightId }: TypeListProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen px-4 py-12 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dawn-gold/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl md:text-3xl font-sans font-light text-dawn-highlight tracking-wide">
            {locale === "ja" ? "32タイプ一覧" : "All 32 Types"}
          </h1>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-dawn-highlight text-sm font-sans tracking-wide transition-colors duration-300 flex items-center gap-1 px-4 py-2 border border-white/10 hover:border-dawn-gold/30 rounded-full"
          >
            <span>←</span>
            <span>{locale === "ja" ? "戻る" : "Back"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {types.map((type, i) => {
            const isHighlighted = type.id === highlightId;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className={`p-4 rounded-sm border backdrop-blur-sm transition-all duration-300 ${
                  isHighlighted
                    ? "bg-dawn-gold/15 border-dawn-gold/50 shadow-[0_0_15px_rgba(255,184,77,0.2)]"
                    : "bg-white/[0.02] border-white/10 hover:border-dawn-gold/30 hover:bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-sans text-dawn-gold/50 tracking-[0.15em]">
                        {type.id}
                      </span>
                      {isHighlighted && (
                        <span className="text-[10px] font-sans text-dawn-orange tracking-wider">
                          {locale === "ja" ? "← あなた" : "← YOU"}
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-sans font-light text-dawn-highlight mb-1 truncate">
                      {type.character}
                    </div>
                    <div className="text-xs text-dawn-gold/60 italic mb-2">
                      {type.characterGame}
                    </div>
                    <div className="text-xs text-white/50 font-light">
                      {lt(locale, type.name)}
                    </div>
                  </div>
                  <a
                    href={type.characterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dawn-gold/40 hover:text-dawn-gold text-sm transition-colors shrink-0"
                    title={locale === "ja" ? "詳しく" : "Learn more"}
                  >
                    →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
