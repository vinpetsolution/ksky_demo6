"use client";

import Link from "next/link";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/classNames";

const AnnouncementDetailPage = () => {
    return (
        <AuthGuard>
            <div className="mx-auto w-full min-w-0 max-w-350 px-3 py-8 sm:px-4 sm:py-10 lg:py-14">
                <header className="mb-8 w-full sm:mb-10 lg:mb-12">
                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[3px] text-[#df7ca5] sm:mb-2.5 sm:text-xs sm:tracking-[4px]">
                        CUSTOMER NOTICE
                    </p>
                    <h1 className="mb-2 text-3xl font-black tracking-[-1px] text-white sm:mb-3 sm:text-4xl sm:tracking-[-1.5px] lg:text-[48px] lg:tracking-[-2px]">
                        공지사항
                    </h1>
                    <p className="text-sm leading-[1.75] text-[#df7ca5]">
                        최신 공지사항 및 이벤트 소식을 빠르게 확인하실 수 있습니다.
                    </p>
                </header>

                <p className="py-12 text-center text-sm text-white/70">
                    공지를 찾을 수 없습니다.
                </p>

                <div className="mt-6 flex justify-end p-2.5">
                    <Link href="/announcement">
                        <Button
                            type="button"
                            variant="transparent"
                            className={cn(
                                "h-8 rounded-sm px-2 text-sm bg-[#0d6efd] text-white hover:text-white hover:bg-[#0b5ed7]",
                            )}
                        >
                            목록
                        </Button>
                    </Link>
                </div>
            </div>
        </AuthGuard>
    );
};

export default AnnouncementDetailPage;
