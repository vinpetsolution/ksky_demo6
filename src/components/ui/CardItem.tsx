"use client";

import { cn } from "@/utils/classNames";
import Image from "next/image";
import { BsPlayFill } from "react-icons/bs";
import { motion } from "@/lib/motion";
import { AuthLink } from "@/components/ui/AuthLink";

interface CardItemProps {
    title: string;
    logoImage: string;
    bgImage: string;
    link?: string;
    className?: string;
}

const SHINE_DURATION = 4.5;

/** Vệt rộng 70% card → translateX % tương đương left -120% … 160% trên card */
const SHINE_X = ["-171%", "229%"] as const;

const SHINE_GRADIENT =
    "linear-gradient(90deg, transparent, rgb(255 255 255 / 0.05), rgb(120 255 235 / 0.28), rgb(255 255 255 / 0.05), transparent)";

const PLAY_CIRCLE_PX = 86;
const PLAY_SHINE_GRADIENT =
    "linear-gradient(90deg, transparent, rgb(255 255 255 / 0.22), transparent)";

/** playWineShine: left -80px → 140% (của nút 86px) */
function PlayCircleShine() {
    return (
        <motion.span
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 z-0 h-full w-12.5"
            initial={{ x: -80 }}
            animate={{ x: [-80, PLAY_CIRCLE_PX * 1.4] }}
            transition={{
                duration: 2.8,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
            }}
        >
            <span
                className="block h-full w-full skew-x-[-25deg]"
                style={{ background: PLAY_SHINE_GRADIENT }}
            />
        </motion.span>
    );
}

function CardItemShine() {
    return (
        <div
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
            aria-hidden
        >
            <motion.div
                className="absolute top-[-40%] left-0 h-[220%] w-[70%] will-change-transform mix-blend-screen"
                initial={{ x: SHINE_X[0] }}
                animate={{ x: [...SHINE_X] }}
                transition={{
                    duration: SHINE_DURATION,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                }}
            >
                <div
                    className="h-full w-full rotate-24"
                    style={{ background: SHINE_GRADIENT }}
                />
            </motion.div>
        </div>
    );
}

const CardItem = ({ title, logoImage, bgImage, link, className }: CardItemProps) => {
    return (
        <AuthLink
            href={link || '#'}
            requireAuth
            className={cn('relative block overflow-hidden rounded-3xl',
                "bg-[linear-gradient(180deg, rgba(10, 28, 40, .98), rgba(6, 18, 28, .98))] isolate",
                "border border-[#ffaad21a] backdrop-blur-[10px]",
                "shadow-[0_14px_34px_rgba(0,0,0,0.34),0_0_20px_rgba(184,46,102,0.06),inset_0_1px_0_rgba(255,255,255,0.03)]",
                "hover:scale-[1.04] hover:shadow-[0_0_26px_rgba(184,46,102,0.18),0_0_42px_rgba(255,120,180,0.14),0_24px_60px_rgba(0,0,0,0.48)]",
                "group hover:border-[#ffb4d238] hover:-translate-y-3 transition-all duration-300",
                className)}
        >
            {/* Shine */}
            <CardItemShine />

            {/* Image */}
            <div
                className='relative overflow-hidden aspect-square'
            >
                <Image
                    src={bgImage}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 16vw"
                    className='w-full h-full object-cover'
                />
                {/* Overlay */}
                <div
                    className={cn(
                        "absolute inset-0 z-10 flex flex-col items-center justify-center gap-4",
                        "bg-[linear-gradient(180deg,rgb(5_18_28/0.25),rgb(5_18_28/0.82))]",
                        "backdrop-blur-xs",
                        "invisible opacity-0",
                        "transition-all duration-300",
                        "group-hover:visible group-hover:opacity-100",
                    )}
                >
                    <div
                        className={cn(
                            "relative flex size-21.5 scale-70 items-center justify-center overflow-hidden rounded-full",
                            "border border-[rgb(255_170_210/0.16)] text-[40px] text-[#fff6f8]",
                            "bg-[linear-gradient(135deg,#8f214b_0%,#631733_38%,#320b18_72%,#c03a6f_100%)]",
                            "shadow-[0_0_24px_rgb(184_46_102/0.20),0_0_44px_rgb(255_120_180/0.10),inset_0_1px_0_rgb(255_255_255/0.08)]",
                            "transition-all duration-300",
                            "group-hover:scale-100 group-hover:border-[rgb(255_170_210/0.28)]",
                            "group-hover:shadow-[0_0_28px_rgb(184_46_102/0.28),0_0_48px_rgb(255_120_180/0.16),inset_0_1px_0_rgb(255_255_255/0.12)]",
                        )}
                        aria-hidden
                    >
                        <PlayCircleShine />
                        <BsPlayFill className="relative z-10" />
                    </div>

                    <span
                        className={cn(
                            "relative translate-y-2.5 text-[15px] font-extrabold uppercase tracking-[2px] text-[#ffe7f0] opacity-0",
                            "[text-shadow:0_0_12px_rgb(255_120_180/0.14)]",
                            "transition-all duration-300",
                            "group-hover:translate-y-0 group-hover:opacity-100",
                        )}
                    >
                        PLAY NOW
                    </span>
                </div>
            </div>

            {/* Logo */}
            <div
                className={cn(" h-16 md:h-20 xl:h-28 flex items-center border-t border-[rgba(255_170_210/.08)]",
                    "bg-[linear-gradient(135deg,rgba(44,14,24,.98)_0%,rgba(28,10,18,.98)_45%,rgba(14,5,9,.99)_100%)]",
                    "text-[#fff6f8] gap-4 px-3 md:px-4 xl:px-5",
                    "shadow-[inset_0_1px_0_rgba(255,255,255,.03)]",
                )}
            >
                <div className='relative size-8 md:size-10 shrink-0'>
                    <Image
                        src={logoImage}
                        alt={title}
                        fill
                        sizes="40px"
                        className='w-full h-full object-cover'
                    />
                </div>
                <p className='text-sm md:text-base'>
                    {title}
                </p>
            </div>
        </AuthLink>
    )
}
export default CardItem
