"use client";

import { cn } from "@/utils/classNames";
import Image from "next/image";
import Link from "next/link";
import { KSKY_LOGO_SRC } from "@/constants/brandAssets";
import {
  FOOTER_SERVICE_BOXES,
  footerLinkRequiresAuth,
} from "@/constants/footer";
import { AuthLink } from "@/components/ui/AuthLink";
import { FooterServiceBox } from "@/components/layouts/FooterServiceBox";
import {
  footerNavLinkClassName,
  mainFooterClassName,
} from "@/constants/footerTailwind";
import { FOOTER_NAV_ITEMS } from "@/constants/navItem";

export default function Footer() {

  return (
    <footer className={mainFooterClassName}>
      <div className="relative z-10 mx-auto flex w-full max-w-350 flex-col gap-6 px-4 pb-6 pt-8 md:gap-8 md:px-6 md:pb-8 md:pt-12 lg:gap-10 lg:pb-10 lg:pt-15">
        <div
          className={cn(
            "flex flex-col items-center gap-5 border-b border-[rgba(91_255_223/0.08)] pb-6",
            "md:gap-7 md:pb-8 lg:flex-row lg:items-center lg:justify-between lg:pb-10",
          )}
        >
          <Link href="/" className="shrink-0">
            <Image
              src={KSKY_LOGO_SRC}
              alt="KSKY SOLUTION"
              width={1000}
              height={300}
              className="block h-14 w-auto object-contain md:h-16"
            />
          </Link>

          <nav aria-label="Footer" className="max-w-full">
            <ul className="footer-menu flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5 sm:gap-y-3 lg:justify-end lg:gap-x-6">
              {FOOTER_NAV_ITEMS.map((item) => {
                // const active = isItemActive(item, pathname, searchParams);
                const linkClass = cn(
                  footerNavLinkClassName,
                  // active && footerNavLinkActiveClassName,
                );

                return (
                  <li key={item.label}>
                    <AuthLink
                      href={item.href}
                      requireAuth={footerLinkRequiresAuth(item.href)}
                      className={linkClass}
                    >
                      {item.label}
                    </AuthLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-1 md:gap-6 lg:grid-cols-3">
          {FOOTER_SERVICE_BOXES.map((box) => (
            <FooterServiceBox key={box.title} item={box} />
          ))}
        </div>

        <div className="flex items-center justify-center gap-5 border-t border-[rgba(91_255_223/0.08)] pt-6 md:pt-8 lg:justify-between lg:pt-9">
          <p className="max-w-full text-center text-xs font-medium uppercase leading-snug tracking-wide text-[#df7ca5] sm:text-sm lg:text-left">
            © {new Date().getFullYear()} KSKY SOLUTION. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
}
