"use client";

import { motion, type Transition } from "framer-motion";
import type { ReactNode } from "react";

const VARIANTS: Record<string, { animate: Record<string, number[] | number>; transition: Transition }> = {
  spin: {
    animate: { rotate: 360 },
    transition: { duration: 8, repeat: Infinity, ease: "linear" },
  },
  pulse: {
    animate: { scale: [1, 1.14, 1] },
    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
  },
  float: {
    animate: { y: [0, -6, 0] },
    transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
  },
  wiggle: {
    animate: { rotate: [0, -8, 0, 8, 0] },
    transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
  },
};

export function AnimatedIcon({
  children,
  variant = "pulse",
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
  delay?: number;
  as?: "div" | "span";
}) {
  const { animate, transition } = VARIANTS[variant];
  const MotionTag = as === "span" ? motion.span : motion.div;
  return (
    <MotionTag
      animate={animate}
      transition={{ ...transition, delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
