"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "@/lib/motion";
import { cn } from "@/utils/classNames";
import type { CarouselSlide } from "@/types/game";

interface HeroCarouselProps {
  slides: CarouselSlide[];
  interval?: number;
}

const AUTO_PLAY_MS = 8000;

const FADE_UP_TEXT = {
  eyebrow: { delay: 0.2, duration: 0.8 },
  title: { delay: 0.6, duration: 0.9 },
  description: { delay: 1, duration: 1 },
} as const;

const FADE_LEFT = { delay: 1.2, duration: 1.2 } as const;

/** CSS `ease`; giữ frame cuối khi slide đang active (tương đương fill-mode: forwards) */
const EASE_FORWARD = [0.25, 0.1, 0.25, 1] as const;

const instantTransition = { duration: 0 };

function fadeUpTransition({ delay, duration }: { delay: number; duration: number }) {
  return { duration, delay, ease: EASE_FORWARD, type: "tween" as const };
}

const textFadeUpAnimate = (isActive: boolean) =>
  isActive
    ? { opacity: 1, y: 0, filter: "blur(0px)" }
    : { opacity: 0, y: 30, filter: "blur(12px)" };

const entityFadeLeftAnimate = (isActive: boolean) =>
  isActive
    ? { opacity: 1, x: 0, filter: "blur(0px)" }
    : { opacity: 0, x: -48, filter: "blur(8px)" };

export default function HeroCarousel({
  slides,
  interval = AUTO_PLAY_MS,
}: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);

  const goTo = useCallback((i: number) => {
    setActive(i);
    setTick((t) => t + 1);
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(id);
  }, [tick, slides.length, interval]);

  if (slides.length === 0) return null;

  return (
    <section className="w-full px-3 pt-6 pb-10 sm:px-4 lg:pt-10 lg:pb-[60px]">
      <div
        className={cn(
          "relative min-w-full overflow-hidden rounded-2xl lg:rounded-[36px]",
          "border border-[rgba(255,170,210,0.12)]",
          "bg-[linear-gradient(135deg,rgba(52,16,30,0.96)_0%,rgba(30,10,18,0.98)_42%,rgba(14,5,9,0.99)_100%)]",
          "shadow-[0_0_50px_rgb(0_0_0/0.34),0_0_30px_rgb(184_46_102/0.08),inset_0_1px_0_rgb(255_255_255/0.03)]",
          "backdrop-blur-md",
          "h-[450px] md:h-[550px] lg:h-[650px]",
          "after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:z-30 after:h-0.5 after:w-full after:content-['']",
          "after:bg-[linear-gradi ent(90deg,transparent,rgba(255,180,210,0.65),rgba(184,46,102,0.85),rgba(255,180,210,0.65),transparent)]",
          "after:shadow-[0_0_14px_rgba(255,120,180,0.16)]",
        )}
      >
        {slides.map((slide, i) => {
          const isActive = i === active;

          return (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
                zIndex: isActive ? 10 : 0,
              }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={slide.bgImage}
                alt=""
                width={2500}
                height={364}
                className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
                priority={i === 0}
                draggable={false}
              />

              <div
                className={cn(
                  "absolute inset-0",
                  "bg-linear-to-b from-[#2a0f18]/90 via-[#2a0f18]/50 to-transparent",
                  "lg:bg-linear-to-r lg:from-[#2a0f18]/95 lg:via-[#2a0f18]/40 lg:to-[#2a0f18]/80",
                )}
              />

              <div
                className={cn(
                  "absolute inset-0 z-10 flex h-full flex-col items-center justify-center gap-4 pb-14 text-center",
                  "px-4 sm:gap-5 sm:px-6",
                  "lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:pb-0 lg:text-left lg:px-10 xl:px-20",
                )}
              >
                <div
                  className={cn(
                    "flex w-full shrink-0 flex-col items-center justify-center px-2",
                    "lg:w-[48%] lg:items-start lg:px-0",
                  )}
                >
                  <motion.p
                    className={cn(
                      "mb-0 text-center text-[11px] font-extrabold uppercase tracking-[2px] text-[#df7ca5]",
                      "sm:text-[13px] lg:mb-[22px] lg:text-left lg:tracking-[4px]",
                    )}
                    initial={false}
                    animate={textFadeUpAnimate(isActive)}
                    transition={
                      isActive
                        ? fadeUpTransition(FADE_UP_TEXT.eyebrow)
                        : instantTransition
                    }
                  >
                    {slide.eyebrow}
                  </motion.p>
                  <motion.h2
                    className={cn(
                      "mb-[28px] hidden whitespace-pre-line uppercase font-black leading-[1.05] tracking-[-3px] text-white lg:block",
                      "text-2xl sm:text-3xl lg:text-5xl xl:text-[76px]",
                    )}
                    initial={false}
                    animate={textFadeUpAnimate(isActive)}
                    transition={
                      isActive
                        ? fadeUpTransition(FADE_UP_TEXT.title)
                        : instantTransition
                    }
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p
                    className={cn(
                      "hidden max-w-[560px] text-sm leading-relaxed text-[#a6c7d4] lg:block",
                      "xl:text-[18px] xl:leading-loose",
                    )}
                    initial={false}
                    animate={textFadeUpAnimate(isActive)}
                    transition={
                      isActive
                        ? fadeUpTransition(FADE_UP_TEXT.description)
                        : instantTransition
                    }
                  >
                    {slide.description}
                  </motion.p>
                </div>

                <motion.div
                  className={cn(
                    "pointer-events-none flex w-full shrink-0 items-center justify-center px-2 sm:px-4",
                    "lg:h-full lg:min-h-0 lg:w-[48%] lg:flex-1 lg:shrink-0 lg:px-6 xl:px-10",
                  )}
                  initial={false}
                  animate={entityFadeLeftAnimate(isActive)}
                  transition={
                    isActive
                      ? {
                        duration: FADE_LEFT.duration,
                        delay: FADE_LEFT.delay,
                        ease: EASE_FORWARD,
                        type: "tween" as const,
                      }
                      : instantTransition
                  }
                >
                  <Image
                    src={slide.entityImage}
                    alt=""
                    width={800}
                    height={800}
                    className={cn(
                      "h-auto w-full max-h-[min(280px,42vw)] object-contain sm:max-h-[min(320px,45vw)]",
                      "lg:h-full lg:max-h-full lg:w-auto lg:max-w-full xl:max-w-[760px]",
                      "drop-shadow-[0_20px_40px_rgb(0_0_0/0.45)]",
                    )}
                    priority={i === 0}
                    draggable={false}
                  />
                </motion.div>
              </div>
            </motion.div>
          );
        })}

        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-3 sm:bottom-6 lg:bottom-8">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={cn(
                  "cursor-pointer rounded-full transition-all duration-300",
                  i === active
                    ? "size-3 bg-[#5bffdf] shadow-[0_0_14px_rgb(91_255_223/0.45)] xl:size-3.5"
                    : "size-2 bg-[#ffaad240] hover:bg-[#ffaad260] xl:size-2.5",
                )}
                aria-label={`Slide ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
