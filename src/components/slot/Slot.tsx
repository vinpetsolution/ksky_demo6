'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { motion } from '@/lib/motion';
import { DEMO_SLOT_VENDORS } from '@/mocks/gameVendors';

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

export default function Slot() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVendors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return DEMO_SLOT_VENDORS;
    return DEMO_SLOT_VENDORS.filter((vendor) =>
      vendor.name.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const handleVendorClick = () => {
    toast.info("데모 환경에서는 게임을 실행할 수 없습니다.");
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-md py-6">
        <div className="relative">
          <input
            type="text"
            placeholder="게임 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[#5a2035] bg-[#1f0d14] px-4 py-3 pr-10 text-white shadow-sm transition-colors focus:border-[#c03a6f] focus:outline-none focus:ring-2 focus:ring-[#c03a6f]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 py-5 md:grid-cols-3 md:px-5 lg:grid-cols-4 xl:grid-cols-5">
        {filteredVendors.map((vendor) => {
          const slotImage = `/images/casino/slot_${vendor.slotIndex}.png`;
          const mainIcon = `/images/casino/main_slot_${vendor.slug}.png`;

          return (
            <div
              key={vendor.name}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#5a2035] transition-colors hover:border-[#c03a6f]"
              onClick={handleVendorClick}
            >
              <CardShine />
              <div className="relative h-30 bg-[#120810]">
                <div className="absolute right-0 -bottom-0.5 h-30.5 transition-all duration-300 group-hover:scale-110">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slotImage}
                    alt=""
                    className="h-full w-auto object-contain brightness-[0.7] grayscale-[0.6] transition-all duration-300 group-hover:brightness-100 group-hover:grayscale-0"
                  />
                </div>
                <div className="absolute left-4 top-1/2 h-12 w-28 -translate-y-1/2 md:left-7.5 md:h-14 md:w-32">
                  <Image
                    src={mainIcon}
                    alt={vendor.name}
                    fill
                    className="object-contain object-left brightness-90 transition-all duration-300 group-hover:brightness-100"
                    sizes="(max-width: 768px) 112px, 128px"
                  />
                </div>
              </div>
              <div className="h-12 bg-[#1a0b12] transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-[#1a0b12] group-hover:to-[#3a1525]">
                <div className="flex h-full items-center px-4 md:px-7.5">
                  <span className="truncate text-[13px] font-semibold text-[#c8c8c8] transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_5px_#c03a6f] md:text-[17px]">
                    {vendor.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {searchQuery && filteredVendors.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="mt-4 text-lg font-medium text-white">검색 결과가 없습니다</h3>
          <p className="mt-2 text-gray-400">다른 검색어를 시도해 보세요.</p>
        </div>
      )}
    </div>
  );
}
