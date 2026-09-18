"use client";

import { cn } from "@/utils/classNames";
import Link from "next/link";
import Image from "next/image";
import AccountInfo from "./AccountInfo";
import { NavBar } from "./NavBar";
import { MobileMenuLeft, MobileMenuRight } from "./MobileMenu";
import { KSKY_LOGO_SRC } from "../../constants/brandAssets";
import { headerTopBarClassName } from "../../constants/headerTailwind";

const Header = () => {

  return (
    <>
      <header
        className={cn(
          headerTopBarClassName,
          "flex items-center",
          "min-h-14 h-auto overflow-visible py-2",
          "md:min-h-18",
          "xl:h-22 xl:overflow-hidden xl:py-0",
          "2xl:h-22",
        )}
      >
        <div
          className={cn(
            "relative z-10 flex w-full items-center justify-between gap-2 px-3",
            "md:gap-3 md:px-4",
            "lg:h-full lg:p-0",
            "xl:gap-4",
            "2xl:gap-10",
          )}
        >
          {/* Mobile left: hamburger menu */}
          <MobileMenuLeft />

          {/* Logo — centered on mobile, left on desktop */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 z-10 shrink-0 xl:static xl:translate-x-0">
            <Image
              src={KSKY_LOGO_SRC}
              alt="KSKY SOLUTION"
              width={1000}
              height={300}
              className={cn(
                "block h-8 w-auto object-cover",
                "md:h-10",
                "xl:h-14 xl:w-auto",
                "2xl:h-18.75",
              )}
              priority
            />
          </Link>

          {/* Desktop nav (hidden on mobile) */}
          <NavBar />

          {/* Desktop: account info (hidden on mobile) */}
          <div
            className={cn(
              "hidden xl:flex min-w-0 flex-1 justify-end",
              "xl:overflow-hidden xl:w-auto xl:flex-none",
              "2xl:w-auto 2xl:flex-none 2xl:overflow-visible",
            )}
          >
            <AccountInfo />
          </div>

          {/* Mobile right: user dropdown */}
          <MobileMenuRight />
        </div>
      </header>
    </>
  );
};

export default Header;
