/** Mock dữ liệu CardItem (trang chủ / preview) — tách khỏi CASINO_CARDS legacy */

export interface HomeCardItemMock {
  id: string;
  title: string;
  logoImage: string;
  bgImage: string;
  link?: string;
}

export const HOME_CASINO_CARD_ITEMS: HomeCardItemMock[] = [
  {
    id: "evolution",
    title: "에볼루션",
    logoImage: "/images/casino/calogo02.webp",
    bgImage: "/images/casino/casino02.webp",
    link: "/game_casino",
  },
  {
    id: "dream",
    title: "드림게이밍",
    logoImage: "/images/casino/calogo04.webp",
    bgImage: "/images/casino/casino04.webp",
    link: "/game_casino",
  },
  {
    id: "playace",
    title: "PLAYACE",
    logoImage: "/images/casino/calogo06.webp",
    bgImage: "/images/casino/casino06.webp",
    link: "/game_casino",
  },
  {
    id: "sexy",
    title: "섹시카지노",
    logoImage: "/images/casino/calogo11.webp",
    bgImage: "/images/casino/casino11.webp",
    link: "/game_casino",
  },
];

export const HOME_SLOT_CARD_ITEMS: HomeCardItemMock[] = [
  {
    id: "playgramatic",
    title: "프라그마틱",
    logoImage: "/images/slot/slogo01.webp",
    bgImage: "/images/slot/slot01.webp",
    link: "/game_slot",
  },
  {
    id: "pragmatic",
    title: "부운고",
    logoImage: "/images/slot/slogo17.webp",
    bgImage: "/images/slot/slot17.webp",
    link: "/game_slot",
  },
  {
    id: "slot4",
    title: "씨큐9",
    logoImage: "/images/slot/slogo03.webp",
    bgImage: "/images/slot/slot03.webp",
    link: "/game_slot",
  },
  {
    id: "slot5",
    title: "PGSoft",
    logoImage: "/images/slot/slogo08.webp",
    bgImage: "/images/slot/slot08.webp",
    link: "/game_slot",
  },
  {
    id: "slot6",
    title: "하바네로",
    logoImage: "/images/slot/slogo09.webp",
    bgImage: "/images/slot/slot09.webp",
    link: "/game_slot",
  },
  {
    id: "btg",
    title: "BTG",
    logoImage: "/images/slot/slogo31.webp",
    bgImage: "/images/slot/slot19.webp",
    link: "/game_slot",
  },
  {
    id: "slot8",
    title: "핵쏘우게이밍",
    logoImage: "/images/slot/slogo32.webp",
    bgImage: "/images/slot/slot20.webp",
    link: "/game_slot",
  },
  {
    id: "slot9",
    title: "아바타 UX",
    logoImage: "/images/slot/slogo33.webp",
    bgImage: "/images/slot/slot21.webp",
    link: "/game_slot",
  },
  {
    id: "slot10",
    title: "GMW",
    logoImage: "/images/slot/slot_logo5.webp",
    bgImage: "/images/slot/slot02.webp",
    link: "/game_slot",
  },
  {
    id: "slot11",
    title: "아시아 게이밍",
    logoImage: "/images/slot/slogo34.webp",
    bgImage: "/images/slot/slot04.webp",
    link: "/game_slot",
  },
  {
    id: "slot12",
    title: "스카이윈드",
    logoImage: "/images/slot/slogo35.webp",
    bgImage: "/images/slot/slot05.webp",
    link: "/game_slot",
  },
  {
    id: "slot13",
    title: "플레이텍",
    logoImage: "/images/slot/slogo36.webp",
    bgImage: "/images/slot/slot06.webp",
    link: "/game_slot",
  },
];
