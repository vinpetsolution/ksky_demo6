import { cn } from "@/utils/classNames";

/** Class Tailwind cho header KSKY SOLUTION — không dùng globals.css */

export const headerTopBarClassName = cn(
  "relative z-[100] h-[88px] w-full overflow-hidden backdrop-blur-[14px]",
  "border-b border-[rgba(255,170,210,0.18)]",
  "bg-[linear-gradient(90deg,rgba(32,10,18,0.98)_0%,rgba(58,16,32,0.98)_35%,rgba(84,22,46,0.96)_50%,rgba(52,14,28,0.98)_70%,rgba(22,8,14,0.98)_100%)]",
  "shadow-[0_10px_28px_rgba(0,0,0,0.34),0_0_22px_rgba(184,46,102,0.08)]",
  "before:pointer-events-none before:absolute before:left-1/2 before:top-[-80px] before:h-40 before:w-[420px] before:-translate-x-1/2 before:blur-2xl before:content-['']",
  "before:bg-[radial-gradient(circle,rgba(255,120,180,0.16)_0%,transparent_70%)]",
  "after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:content-['']",
  "after:bg-[linear-gradient(90deg,transparent,#ffb0c9,#b82e66,#ffb0c9,transparent)]",
  "after:shadow-[0_0_14px_rgba(255,120,180,0.22)]",
);

