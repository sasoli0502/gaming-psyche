"use client";

import { motion } from "framer-motion";

interface ScenarioCardProps {
  text: string;
}

export function ScenarioCard({ text }: ScenarioCardProps) {
  return (
    <motion.div
      key={text}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto mb-10"
    >
      <div className="relative bg-card-bg backdrop-blur-sm border border-card-border rounded-sm p-8 md:p-10">
        {/* Corner accents */}
        <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan/50" />
        <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-cyan/50" />
        <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-cyan/50" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-cyan/50" />

        <p className="text-base md:text-lg leading-8 text-white/90 whitespace-pre-line font-light tracking-wide">
          {text}
        </p>
      </div>
    </motion.div>
  );
}
