"use client";

import type { ReactNode } from "react";

interface GlowingButtonProps {
  children: ReactNode;
  href?: string;
  target?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "gold" | "navy" | "outline" | "whatsapp";
}

export default function GlowingButton({
  children,
  href,
  target,
  onClick,
  className = "",
  size = "md",
  variant = "gold",
}: GlowingButtonProps) {
  const sizeClasses = {
    sm: "px-5 py-2.5 text-[11px] tracking-[0.12em]",
    md: "px-6 py-3.5 text-xs tracking-[0.13em]",
    lg: "px-8 py-4 text-xs tracking-[0.14em]",
  }[size];

  const variantClasses = {
    gold: "border border-gold-500/80 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-navy-950 font-bold shadow-gold hover:shadow-lg hover:from-gold-400 hover:to-gold-300 hover:border-gold-300",
    navy: "border border-gold-500/40 bg-navy-950 text-white font-medium hover:bg-navy-900 hover:border-gold-400 hover:text-gold-300 shadow-md",
    whatsapp: "border border-emerald-500/80 bg-[#128C7E] text-white font-semibold hover:bg-[#075E54] shadow-[0_10px_25px_-5px_rgba(18,140,126,0.4)]",
    outline: "border border-navy-950/20 bg-transparent text-navy-950 hover:border-gold-600 hover:text-gold-700 font-semibold",
  }[variant];

  const classes =
    "inline-flex items-center justify-center gap-2.5 rounded-full transition-all duration-200 select-none text-center cursor-pointer " +
    "hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-500 " +
    sizeClasses +
    " " +
    variantClasses +
    " " +
    className;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
