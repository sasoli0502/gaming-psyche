"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  category?: string;
}

export function ProgressBar({ current, total, category }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-sans text-dawn-gold/80 uppercase tracking-[0.2em]">
          {category}
        </span>
        <span className="text-xs font-sans text-white/50 tracking-wider">
          {current} <span className="text-white/30 mx-1">/</span> {total}
        </span>
      </div>
      <div className="w-full h-1.5 bg-black/40 border border-white/5 rounded-full overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 h-full progress-dawn rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        {/* Soft highlight on top edge of progress bar container */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />
      </div>
    </div>
  );
}
