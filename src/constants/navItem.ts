import type { IconType } from "react-icons";
import { BsCashStack, BsClockHistory, BsEnvelopeFill, BsFillMegaphoneFill, BsWallet2 } from "react-icons/bs";

export interface NavItem {
  label: string;
  href: string;
  requireAuth: boolean;
  icon: IconType;
  /** Hiển thị số unread từ mailbox */
  showMailboxCount?: boolean;
}

export interface FooterNavItem {
  label: string;
  href: string;
  requireAuth: boolean;
}

export const FOOTER_NAV_ITEMS: FooterNavItem[] = [
  {
    label: "카지노",
    href: "/game_casino",
    requireAuth: true,
  },
  {
    label: "슬롯",
    href: "/game_slot",
    requireAuth: true,
  },
  {
    label: "입금신청",
    href: "/deposit",
    requireAuth: true,
  },
  {
    label: "출금신청",
    href: "/withdraw",
    requireAuth: true,
  },
  {
    label: "베팅내역",
    href: "/bet-history",
    requireAuth: true,
  },
  {
    label: "공지사항",
    href: "/announcement",
    requireAuth: true,
  },
  // { label: "고객센터", href: "/inquiries", requireAuth: true },
  {
    label: "마이페이지",
    href: "/my-page",
    requireAuth: true,
  },
];

export const NAV_ITEMS: NavItem[] = [
  {
    label: "입금신청",
    href: "/deposit",
    requireAuth: true,
    icon: BsWallet2,
  },
  {
    label: "출금신청",
    href: "/withdraw",
    requireAuth: true,
    icon: BsCashStack,
  },
  {
    label: "베팅내역",
    href: "/bet-history",
    requireAuth: true,
    icon: BsClockHistory,
  },
  {
    label: "공지사항",
    href: "/announcement",
    requireAuth: true,
    icon: BsFillMegaphoneFill,
  },
  // { label: "고객센터", href: "/inquiries", requireAuth: true, icon: BsChatDotsFill },
  {
    label: "쪽지함",
    href: "/messages",
    requireAuth: true,
    icon: BsEnvelopeFill,
    showMailboxCount: true,
  },
];

