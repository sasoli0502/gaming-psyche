"use client";

import { motion } from "framer-motion";

interface OptionButtonProps {
  label: string;
  text: string;
  onClick: () => void;
  index: number;
}

const OPTION_LABELS = ["A", "B", "C", "D"];

export function OptionButton({ text, onClick, index }: OptionButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="
        w-full text-left p-5 md:p-6
        bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-lg
        hover:border-dawn-gold/30 hover:bg-dawn-gold/[0.05]
        hover:shadow-[0_10px_30px_rgba(255,184,77,0.05)]
        transition-all duration-500
        group cursor-pointer relative overflow-hidden
      "
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
      
      <div className="flex items-start gap-5 relative z-10">
        <span className="
          flex-shrink-0 w-8 h-8 flex items-center justify-center
          rounded-full bg-white/5 border border-white/10
          font-sans text-xs text-white/50
          group-hover:border-dawn-gold/50 group-hover:text-dawn-gold group-hover:bg-dawn-gold/10
          transition-all duration-500
        ">
          {OPTION_LABELS[index]}
        </span>
        <span className="text-sm md:text-base text-white/70 group-hover:text-dawn-highlight transition-colors duration-500 leading-relaxed font-light mt-1">
          {text}
        </span>
      </div>
    </motion.button>
  );
}
