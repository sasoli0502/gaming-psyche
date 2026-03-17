"use client";

import { motion } from "framer-motion";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  hoverable?: boolean;
}

export function GlowCard({
  children,
  className = "",
  onClick,
  selected = false,
  hoverable = true,
}: GlowCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`
        relative bg-card-bg backdrop-blur-md rounded-lg p-6
        border border-white/5 transition-all duration-500
        ${selected
          ? "border-dawn-gold/50 shadow-[0_0_30px_rgba(255,184,77,0.15)] bg-card-bg/80"
          : "border-card-border"
        }
        ${hoverable && !selected ? "hover:border-dawn-gold/30 hover:shadow-[0_0_20px_rgba(255,184,77,0.1)] hover:bg-card-bg/60 cursor-pointer" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      whileHover={hoverable ? { y: -4 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      {/* Soft inner glow */}
      <div className="absolute inset-0 rounded-lg pointer-events-none ring-1 ring-inset ring-white/5" />
      {children}
    </motion.div>
  );
}
