"use client";

import { cn } from "@/utils/classNames";
import { motion, type Transition } from "@/lib/motion";

/** Vệt shine chạy ngang — dùng chung cho nút (login, CTA, …) */
export const buttonShineTransition: Transition = {
  duration: 3,
  repeat: Infinity,
  ease: "linear",
};

export const buttonShineKeyframes = {
  initial: { left: "-120px" },
  animate: { left: "130%" },
} as const;

export const buttonShineClassName = cn(
  "pointer-events-none absolute top-0 z-[1] h-full w-[70px] -skew-x-[25deg]",
  "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]",
);

interface ButtonShineProps {
  className?: string;
}

export function ButtonShine({ className }: ButtonShineProps) {
  return (
    <motion.span
      aria-hidden
      className={cn(buttonShineClassName, className)}
      initial={buttonShineKeyframes.initial}
      animate={buttonShineKeyframes.animate}
      transition={buttonShineTransition}
    />
  );
}
