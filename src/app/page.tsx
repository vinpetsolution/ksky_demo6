"use client";

import { useState } from "react";
import HeroCarousel from "@/components/ui/HeroCarousel";
import { HOME_CASINO_CARD_ITEMS, HOME_SLOT_CARD_ITEMS } from "@/mocks/cardItems";
import {
  CASINO_SLIDES,
} from "@/mocks/slides";
import CardItem from "@/components/ui/CardItem";
import { Button } from "@/components/ui/Button";
import { LiveMainTitle } from "@/components/ui/LiveMainTitle";
import { motion, AnimatePresence } from "@/lib/motion";
import { cn } from "@/utils/classNames";

type HomeTab = "casino" | "slot";

const HOME_TAB_CONTENT = {
  casino: {
    eyebrow: "PREMIUM LIVE CASINO",
    titleChars: ["라", "이", "브", " ", "카", "지", "노"],
    subtitle:
      "글로벌 인기 카지노 게임사를 실시간 라이브 환경에서 만나보세요.",
  },
  slot: {
    eyebrow: "PREMIUM LIVE SLOT",
    titleChars: ["슬", "롯", " ", "게", "임"],
    subtitle:
      "글로벌 인기 카지노 게임사를 실시간 라이브 환경에서 만나보세요.",
  },
} as const;

const TAB_GRID_TRANSITION = {
  duration: 0.25,
};

const tabButtonClassName = cn(
  "relative rounded-xl md:rounded-2xl lg:rounded-3xl font-bold text-xs md:text-[15px] md:h-14 md:min-w-48 h-10 lg:h-16 lg:min-w-54 overflow-hidden px-4 lg:px-8 md:text-sm uppercase tracking-wide",
  "before:pointer-events-none before:absolute before:top-[-40%] before:left-[-120%] before:h-[220%] before:w-[70%] before:rotate-[25deg] before:content-['']",
  "before:bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.05),rgb(255_120_180/0.18),rgb(255_255_255/0.05),transparent)]",
  "before:transition-[left] before:duration-700 before:ease-out",
  "hover:before:left-[160%] transition-all duration-[350ms] ease",
  "hover:-translate-y-[3px] hover:shadow-[0_16px_30px_rgb(0_0_0/0.38),0_0_22px_rgb(184_46_102/0.10)]",
);

export default function Home() {
  const [tab, setTab] = useState<HomeTab>("casino");
  const content = HOME_TAB_CONTENT[tab];

  return (
    <>
      <HeroCarousel slides={CASINO_SLIDES} />

      <div className="flex items-center justify-center gap-4 lg:gap-4 px-4 lg:px-6 pb-4">
        <Button
          type="button"
          variant={tab === "casino" ? "pink" : "darkPink"}
          onClick={() => setTab("casino")}
          className={cn(tabButtonClassName)}
          aria-pressed={tab === "casino"}
        >
          LIVE CASINO
        </Button>
        <Button
          type="button"
          variant={tab === "slot" ? "pink" : "darkPink"}
          onClick={() => setTab("slot")}
          className={tabButtonClassName}
          aria-pressed={tab === "slot"}
        >
          SLOT GAME
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={TAB_GRID_TRANSITION}
          className="mx-auto max-w-[1400px] px-6 text-left"
        >
          <p className="mb-[14px] text-[12px] select-none font-extrabold uppercase tracking-[4px] text-[#df7ca5]">
            {content.eyebrow}
          </p>
          <LiveMainTitle characters={content.titleChars} />
          <p className="max-w-2xl text-sm md:text-base select-none leading-[1.9] text-[#df7ca5]">
            {content.subtitle}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">
            {tab === "casino"
              ? HOME_CASINO_CARD_ITEMS.map((card) => (
                <CardItem
                  key={card.id}
                  title={card.title}
                  logoImage={card.logoImage}
                  bgImage={card.bgImage}
                  link={card.link}
                />
              ))
              : HOME_SLOT_CARD_ITEMS.map((card) => (
                <CardItem key={card.id}
                  title={card.title}
                  logoImage={card.logoImage}
                  bgImage={card.bgImage}
                  link={card.link}
                />
              ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
