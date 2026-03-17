"use client";

import { motion } from "framer-motion";

interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

export function CyberButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
}: CyberButtonProps) {
  const baseStyles =
    "relative font-mono font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-10 py-4 text-base",
  };

  const variantStyles = {
    primary:
      "bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]",
    secondary:
      "bg-transparent border-2 border-neon-magenta text-neon-magenta hover:bg-neon-magenta/10 hover:shadow-[0_0_20px_rgba(255,0,255,0.3)]",
    ghost:
      "bg-transparent border border-white/20 text-white/70 hover:border-neon-cyan/50 hover:text-neon-cyan",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className} ${
        disabled ? "opacity-30 cursor-not-allowed" : ""
      }`}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {/* Corner decorations */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-current" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current" />
      {children}
    </motion.button>
  );
}
