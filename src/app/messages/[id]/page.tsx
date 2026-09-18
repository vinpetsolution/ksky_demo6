"use client";

import Link from "next/link";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/classNames";
import { messageListBoxClassName } from "@/constants/messageUi";

export default function MessageDetailPage() {
  return (
    <AuthGuard>
      <div className="mx-auto w-full min-w-0 max-w-350 px-3 py-8 sm:px-4 sm:py-10 lg:py-14">
        <header className="mb-6 w-full sm:mb-8">
          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[3px] text-[#df7ca5] sm:mb-2.5 sm:text-xs sm:tracking-[4px]">
            PRIVATE MESSAGE
          </p>
          <h1 className="mb-2 text-3xl font-black tracking-[-1px] text-white sm:mb-3 sm:text-4xl sm:tracking-[-1.5px] lg:text-[48px] lg:tracking-[-2px]">
            쪽지함
          </h1>
        </header>

        <div className={cn(messageListBoxClassName, "p-8")}>
          <p className="py-12 text-center text-sm text-white/70">
            쪽지를 찾을 수 없습니다.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <Link href="/messages">
            <Button type="button" variant="darkBlue" className="h-10 px-5 text-sm">
              목록
            </Button>
          </Link>
        </div>
      </div>
    </AuthGuard>
  );
}
