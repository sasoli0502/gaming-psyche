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
    "relative font-sans tracking-widest transition-all duration-500 cursor-pointer overflow-hidden rounded-sm";

  const sizeStyles = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-8 py-3.5 text-sm",
    lg: "px-12 py-5 text-base",
  };

  const variantStyles = {
    primary:
      "bg-dawn-gold/10 border border-dawn-gold/50 text-dawn-highlight hover:bg-dawn-gold/20 hover:border-dawn-gold hover:shadow-[0_0_20px_rgba(255,184,77,0.3)]",
    secondary:
      "bg-dawn-orange/10 border border-dawn-orange/50 text-dawn-highlight hover:bg-dawn-orange/20 hover:border-dawn-orange hover:shadow-[0_0_20px_rgba(255,123,48,0.3)]",
    ghost:
      "bg-transparent border border-white/10 text-white/70 hover:border-dawn-gold/50 hover:text-dawn-highlight hover:bg-white/5",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className} ${
        disabled ? "opacity-30 cursor-not-allowed" : ""
      }`}
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Soft gradient sweep effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
    </motion.button>
  );
}
