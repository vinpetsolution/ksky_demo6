import type { IconType } from "react-icons";
import { FaShieldAlt } from "react-icons/fa";
import { FaGem, FaHeadset } from "react-icons/fa6";

export interface FooterServiceBoxItem {
  title: string;
  descriptionLines: [string, string];
  icon: IconType;
}

export const FOOTER_SERVICE_BOXES: FooterServiceBoxItem[] = [
  {
    title: "CUSTOMER CENTER",
    descriptionLines: [
      "24시간 실시간 고객센터 운영",
      "빠르고 안전한 서비스를 제공합니다.",
    ],
    icon: FaHeadset,
  },
  {
    title: "SECURITY SYSTEM",
    descriptionLines: [
      "SSL 보안 시스템 및",
      "안전한 데이터 암호화 적용.",
    ],
    icon: FaShieldAlt,
  },
  {
    title: "PREMIUM SERVICE",
    descriptionLines: [
      "글로벌 프리미엄 카지노 콘텐츠 및",
      "다양한 슬롯게임 제공.",
    ],
    icon: FaGem,
  },
];

const FOOTER_PUBLIC_PATHS = new Set<string>([]);

export function footerLinkRequiresAuth(href: string): boolean {
  return !FOOTER_PUBLIC_PATHS.has(href);
}
