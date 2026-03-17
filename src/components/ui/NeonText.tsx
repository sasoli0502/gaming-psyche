"use client";

import { motion } from "framer-motion";

interface NeonTextProps {
  children: React.ReactNode;
  color?: "cyan" | "magenta" | "green";
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  animate?: boolean;
}

export function NeonText({
  children,
  color = "cyan",
  as: Tag = "span",
  className = "",
  animate = false,
}: NeonTextProps) {
  const colorClasses = {
    cyan: "text-neon-cyan neon-text",
    magenta: "text-neon-magenta neon-text-magenta",
    green: "text-neon-green",
  };

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Tag className={`${colorClasses[color]} ${className}`}>{children}</Tag>
      </motion.div>
    );
  }

  return (
    <Tag className={`${colorClasses[color]} ${className}`}>{children}</Tag>
  );
}
