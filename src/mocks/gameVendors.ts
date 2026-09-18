export interface DemoCasinoVendor {
  name: string;
  slug: string;
}

export interface DemoSlotVendor {
  name: string;
  slug: string;
  slotIndex: number;
}

export const DEMO_CASINO_VENDORS: DemoCasinoVendor[] = [
  { name: "에볼루션", slug: "evolution" },
  { name: "프라그마틱 플레이", slug: "prag" },
  { name: "드림게이밍", slug: "dream" },
  { name: "섹시카지노", slug: "sexy" },
  { name: "아시아게이밍", slug: "asia" },
  { name: "빅게이밍", slug: "big" },
  { name: "에즈기", slug: "ezugi" },
  { name: "마이크로게이밍", slug: "micro" },
  { name: "오리엔탈게이밍", slug: "oriental" },
  { name: "비보게이밍", slug: "vivo" },
  { name: "WM 카지노", slug: "wm" },
  { name: "플레이텍", slug: "playtech" },
];

export const DEMO_SLOT_VENDORS: DemoSlotVendor[] = [
  { name: "프라그마틱플레이", slug: "prag", slotIndex: 25 },
  { name: "PG소프트", slug: "pgsoft", slotIndex: 20 },
  { name: "하바네로", slug: "habanero", slotIndex: 10 },
  { name: "CQ9", slug: "cq9", slotIndex: 4 },
  { name: "마이크로게이밍", slug: "micro", slotIndex: 14 },
  { name: "넷엔트", slug: "netent", slotIndex: 16 },
  { name: "플레이앤고", slug: "playngo", slotIndex: 21 },
  { name: "노리밋시티", slug: "nolimit", slotIndex: 18 },
  { name: "스카이윈드", slug: "skywind", slotIndex: 30 },
  { name: "에보플레이", slug: "evoplay", slotIndex: 7 },
  { name: "릴렉스", slug: "relax", slotIndex: 28 },
  { name: "퀵스핀", slug: "quickspin", slotIndex: 26 },
  { name: "레드타이거", slug: "redtiger", slotIndex: 27 },
  { name: "플레이슨", slug: "playson", slotIndex: 22 },
  { name: "와즈단", slug: "wazdan", slotIndex: 35 },
];
