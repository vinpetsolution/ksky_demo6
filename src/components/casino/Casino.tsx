'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { motion } from '@/lib/motion';
import { DEMO_CASINO_VENDORS } from '@/mocks/gameVendors';

const SHINE_DURATION = 4.5;
const SHINE_X = ["-171%", "229%"] as const;
const SHINE_GRADIENT =
  "linear-gradient(90deg, transparent, rgb(255 255 255 / 0.05), rgb(255 120 180 / 0.22), rgb(255 255 255 / 0.05), transparent)";

function CardShine() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute top-[-40%] left-0 h-[220%] w-[70%] will-change-transform mix-blend-screen"
        initial={{ x: SHINE_X[0] }}
        animate={{ x: [...SHINE_X] }}
        transition={{ duration: SHINE_DURATION, ease: "linear", repeat: Infinity, repeatType: "loop" }}
      >
        <div className="h-full w-full rotate-24" style={{ background: SHINE_GRADIENT }} />
      </motion.div>
    </div>
  );
}

const MINIBG_LIST = [
  ...Array.from({ length: 17 }, (_, i) => `/images/casino/minibg_${i + 1}.png`),
  ...Array.from({ length: 23 }, (_, i) => `/images/casino/bg_${i + 1}.png`),
];

export default function Casino() {
  const handleVendorClick = () => {
    toast.info("데모 환경에서는 게임을 실행할 수 없습니다.");
  };

  return (
    <div className="grid grid-cols-1 gap-4 px-6 py-10 md:grid-cols-3 lg:grid-cols-4">
      {DEMO_CASINO_VENDORS.map((vendor, index) => {
        const minibgImage = MINIBG_LIST[index % MINIBG_LIST.length];
        const mainIcon = `/images/casino/main_icon_${vendor.slug}.png`;

        return (
          <div
            key={vendor.name}
            className="group relative w-full cursor-pointer transition-all duration-300"
            onClick={handleVendorClick}
          >
            <div className="relative aspect-400/170 w-full overflow-hidden rounded-2xl border border-[#5a2035] bg-linear-to-r from-[#0d0608] to-[#2a0f18] transition-colors duration-200 hover:border-[#c03a6f]">
              <CardShine />
              <div className="absolute right-0 bottom-0 z-10 h-full w-[55%] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={minibgImage}
                  alt=""
                  fill
                  className="object-contain object-bottom-right"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="absolute left-2 top-1/2 z-20 h-14 w-28 -translate-y-1/2 md:left-4 md:h-16 md:w-32 lg:h-16 lg:w-32 xl:h-20 xl:w-40">
                <Image
                  src={mainIcon}
                  alt={vendor.name}
                  fill
                  className="h-full w-full animate-pulse object-contain"
                  sizes="(max-width: 768px) 112px, (max-width: 1024px) 144px, (max-width: 1280px) 144px, 160px"
                />
              </div>
              <div className="pointer-events-none absolute bottom-1.5 left-1/2 z-22 -translate-x-1/2">
                <p
                  className="casino_text line-clamp-2 animate-beat break-keep text-center text-sm font-extrabold leading-snug tracking-tight sm:text-base md:text-lg lg:text-xl"
                  title={vendor.name}
                >
                  {vendor.name}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
