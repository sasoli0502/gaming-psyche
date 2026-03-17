"use client";

import { motion } from "framer-motion";

interface ScenarioCardProps {
  text: string;
}

export function ScenarioCard({ text }: ScenarioCardProps) {
  return (
    <motion.div
      key={text}
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto mb-12"
    >
      <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Soft atmospheric glow behind text */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-dawn-gold/5 blur-[50px] pointer-events-none" />
        
        {/* Elegant top accent line instead of cyber corners */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-dawn-gold/50 to-transparent" />

        <p className="relative z-10 text-lg md:text-xl leading-8 md:leading-10 text-dawn-highlight whitespace-pre-line font-serif tracking-wide drop-shadow-sm">
          {text}
        </p>
      </div>
    </motion.div>
  );
}
