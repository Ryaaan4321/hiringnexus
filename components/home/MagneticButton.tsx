"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  size = "md",
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.28;
    const y = (clientY - (top + height / 2)) * 0.28;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeClasses = {
    sm: "h-[34px] px-3.5 text-[13px]",
    md: "h-[42px] px-5 text-[14px]",
    lg: "h-[48px] px-7 text-[15px]",
  }[size];

  const variantClasses = {
    primary:
      "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border border-neutral-800 dark:border-neutral-200 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm",
    secondary:
      "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/80",
    outline:
      "bg-transparent text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/50",
  }[variant];

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={shouldReduceMotion ? {} : { x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.1 }}
      className="inline-block"
    >
      <span
        className={`group relative inline-flex items-center justify-center font-medium tracking-tight rounded-md select-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-neutral-100 focus-visible:ring-offset-2 cursor-pointer ${sizeClasses} ${variantClasses} ${className}`}
      >
        <span className="hb-bracket flex items-center gap-1.5">{children}</span>
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-block bg-transparent border-0 p-0 cursor-pointer"
    >
      {content}
    </button>
  );
}
