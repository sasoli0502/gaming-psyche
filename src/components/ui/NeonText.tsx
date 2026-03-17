"use client";

import { motion } from "framer-motion";

interface NeonTextProps {
  children: React.ReactNode;
  color?: "gold" | "orange" | "cyan" | "highlight"; // keeping cyan for compatibility but unused
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  animate?: boolean;
}

export function NeonText({
  children,
  color = "gold",
  as: Tag = "span",
  className = "",
  animate = false,
}: NeonTextProps) {
  const colorClasses = {
    gold: "text-dawn-gold dawn-text",
    orange: "text-dawn-orange dawn-text-orange",
    highlight: "text-dawn-highlight",
    cyan: "text-dawn-gold dawn-text", // Fallback for any missed usages
  };

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Tag className={`${colorClasses[color as keyof typeof colorClasses] || colorClasses.gold} ${className}`}>{children}</Tag>
      </motion.div>
    );
  }

  return (
    <Tag className={`${colorClasses[color as keyof typeof colorClasses] || colorClasses.gold} ${className}`}>{children}</Tag>
  );
}
