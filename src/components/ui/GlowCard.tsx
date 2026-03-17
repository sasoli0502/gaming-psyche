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
        relative bg-card-bg backdrop-blur-sm rounded-sm p-6
        border transition-all duration-300
        ${selected
          ? "border-neon-cyan shadow-[0_0_20px_rgba(0,240,255,0.25)]"
          : "border-card-border"
        }
        ${hoverable && !selected ? "glow-border-hover cursor-pointer" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      whileHover={hoverable ? { y: -2 } : {}}
      whileTap={onClick ? { scale: 0.99 } : {}}
    >
      {children}
    </motion.div>
  );
}
