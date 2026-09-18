import { cn } from "@/utils/classNames";

/** Shell `.main-footer` — Tailwind only, không dùng globals.css */
export const mainFooterClassName = cn(
  "relative z-10 mt-12 w-full overflow-hidden backdrop-blur-[10px] md:mt-16 lg:mt-[100px]",
  "border-t border-[rgba(255,170,210,0.10)]",
  "bg-[linear-gradient(180deg,rgba(42,10,20,0.99)_0%,rgba(24,6,12,0.99)_38%,rgba(12,3,7,0.99)_72%,rgba(6,2,4,1)_100%)]",
  "shadow-[0_-10px_40px_rgba(0,0,0,0.34),0_0_30px_rgba(184,46,102,0.08)]",
  "before:pointer-events-none before:absolute before:left-1/2 before:top-[-120px] before:h-[240px] before:w-[90vw] before:-translate-x-1/2 before:blur-[30px] before:content-[''] sm:before:w-[420px] lg:before:w-[520px]",
  "before:bg-[radial-gradient(circle,rgba(255,120,180,0.12)_0%,transparent_72%)]",
  "after:pointer-events-none after:absolute after:left-0 after:top-0 after:h-[2px] after:w-full after:content-['']",
  "after:bg-[linear-gradient(90deg,transparent,rgba(255,190,220,0.55),rgba(184,46,102,0.85),rgba(255,190,220,0.55),transparent)]",
  "after:shadow-[0_0_14px_rgba(255,120,180,0.18)]",
);

/** Link menu footer — hover line trái → phải */
export const footerNavLinkClassName = cn(
  "relative inline-block pb-1 text-sm font-bold text-[#df7ca5] sm:text-[15px]",
  "after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:w-0 after:content-['']",
  "after:bg-[linear-gradient(to_right,#df7ca5,#48cfff)]",
  "after:transition-all after:duration-300",
  "hover:after:w-full",
);

export const footerNavLinkActiveClassName = "after:w-full";
