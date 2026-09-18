"use client";

import { motion } from "@/lib/motion";
import { cn } from "@/utils/classNames";

interface LiveMainTitleProps {
  characters: readonly string[];
  className?: string;
}

const TITLE_FADE_DURATION = 3;
const CHAR_STAGGER = 0.1;

const titleCharAnimate = {
  opacity: [0, 1, 1, 0],
  y: [20, 0, 0, 0],
  filter: [
    "blur(10px)",
    "blur(0px)",
    "blur(0px)",
    "blur(10px)",
  ],
};

function titleCharTransition(index: number) {
  return {
    duration: TITLE_FADE_DURATION,
    times: [0, 0.15, 0.55, 1],
    repeat: Infinity,
    delay: index * CHAR_STAGGER,
    type: "tween" as const,
  };
}

export function LiveMainTitle({ characters, className }: LiveMainTitleProps) {
  return (
    <h2
      className={cn(
        "relative mb-4 flex flex-wrap items-baseline overflow-hidden text-[32px] md:text-[40px] lg:text-[44px] xl:text-[48px] font-black tracking-[-2px] text-white",
        className,
      )}
    >
      {characters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block will-change-[transform,opacity,filter]"
          animate={titleCharAnimate}
          transition={titleCharTransition(i)}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
}
