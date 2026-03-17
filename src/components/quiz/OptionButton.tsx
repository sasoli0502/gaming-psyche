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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={onClick}
      className="
        w-full text-left p-4 md:p-5
        bg-white/[0.02] border border-white/10 rounded-sm
        hover:border-neon-cyan/50 hover:bg-neon-cyan/[0.05]
        hover:shadow-[0_0_15px_rgba(0,240,255,0.1)]
        transition-all duration-300
        group cursor-pointer
      "
    >
      <div className="flex items-start gap-4">
        <span className="
          flex-shrink-0 w-8 h-8 flex items-center justify-center
          border border-white/20 rounded-sm
          font-mono text-sm text-white/50
          group-hover:border-neon-cyan/50 group-hover:text-neon-cyan
          transition-all duration-300
        ">
          {OPTION_LABELS[index]}
        </span>
        <span className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors leading-relaxed">
          {text}
        </span>
      </div>
    </motion.button>
  );
}
