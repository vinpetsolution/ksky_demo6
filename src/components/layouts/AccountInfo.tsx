"use client";

import { useState } from "react";
import { cn } from "@/utils/classNames";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/providers/UserProvider";
import { clearAllAuthData } from "@/utils/auth";
import { demoLogout } from "@/app/actions/demo-auth";
import { toast } from "sonner";
import { Button } from "../ui/Button";
import { FaRegUserCircle, FaWallet } from "react-icons/fa";
import { FaArrowRotateRight, FaGem, FaRightFromBracket } from "react-icons/fa6";
import { PointTransferModal } from "@/components/ui/PointTransferModal";

const accountBarShellClassName = cn(
  "rounded-xl px-2 py-1.5 sm:gap-2 sm:rounded-[14px] sm:px-3 sm:py-2",
  "border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)]",
  "max-md:w-full max-md:max-w-full max-md:overflow-x-auto max-md:overflow-y-hidden",
  "max-md:overscroll-x-contain max-md:touch-pan-x max-md:scrollbar-thin",
  "md:w-fit md:overflow-visible",
  "xl:w-fit xl:overflow-x-auto xl:overflow-y-hidden xl:overscroll-x-contain xl:scrollbar-thin",
  "2xl:w-auto 2xl:overflow-x-visible",
);

const accountBarTrackClassName = cn(
  "flex items-center justify-end gap-1.5 sm:gap-2 md:gap-2.5",
  "max-md:flex-nowrap max-md:w-max max-md:min-w-full",
  "md:flex-wrap md:w-fit",
  "xl:flex-nowrap xl:w-max xl:min-w-full",
  "2xl:w-auto 2xl:min-w-0 2xl:shrink-0",
);

const accountPillClassName = cn(
  "flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full",
  "bg-[rgba(255,255,255,0.05)] px-2 py-1.5 text-[11px] font-semibold text-[#ddd]",
  "sm:gap-1.5 sm:px-3 sm:py-2 sm:text-[13px]",
);

const accountPillIconClassName = "size-3 shrink-0 sm:size-3.5";

function LoggedInView() {
  const { currentUser, refetchUserInfo, setCurrentUser } = useUser();
  const router = useRouter();
  const [pointModalOpen, setPointModalOpen] = useState(false);

  const user = currentUser?.result?.user;
  const nickname = user?.nickName || user?.userName || "사용자";
  const money = user?.balanceMoney || 0;
  const points = user?.balancePoint || 0;

  const handleLogout = async () => {
    await demoLogout();
    clearAllAuthData();
    setCurrentUser(undefined);
    toast.success("로그아웃되었습니다.");
    router.replace("/");
    router.refresh();
  };

  const handleRefresh = async () => {
    try {
      await refetchUserInfo();
      toast.success("잔액이 새로고침되었습니다.");
    } catch {
      toast.error("새로고침 중 오류가 발생했습니다.");
    }
  };

  return (
    <div
      className={cn(
        "flex min-w-0 w-full max-w-full justify-end",
        "md:w-auto",
        "xl:flex-1 xl:overflow-hidden",
        "2xl:w-auto 2xl:flex-none 2xl:overflow-visible 2xl:justify-start",
      )}
    >
      <div className={accountBarShellClassName}>
        <div className={accountBarTrackClassName}>
          <div className={accountPillClassName}>
            <FaWallet className={cn(accountPillIconClassName, "text-[#ffb000]")} aria-hidden />
            <span className="font-medium">
              머니{" "}
              <span className="font-bold tabular-nums text-white">
                {money.toLocaleString()}
              </span>
            </span>
            <button
              type="button"
              onClick={handleRefresh}
              className="flex shrink-0 cursor-pointer text-[#ffb000] transition-colors hover:text-[#ffb000]/80"
              aria-label="잔액 새로고침"
            >
              <FaArrowRotateRight className="size-3" aria-hidden />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setPointModalOpen(true)}
            className={cn(
              accountPillClassName,
              "cursor-pointer transition-[filter] hover:brightness-110",
            )}
            aria-label="포인트 전환"
          >
            <FaGem className={cn(accountPillIconClassName, "text-[#38bdf8]")} aria-hidden />
            <span className="font-medium">
              포인트{" "}
              <span className="font-bold tabular-nums text-white">
                {points.toLocaleString()}
              </span>
            </span>
          </button>

          <div className={accountPillClassName} title={nickname}>
            <FaRegUserCircle
              className={cn(accountPillIconClassName, "text-[#a78bfa]")}
              aria-hidden
            />
            <span className="min-w-0 max-w-30 truncate font-medium sm:max-w-35 lg:max-w-35">
              <strong className="font-bold">{nickname}</strong> 님
            </span>
          </div>

          <Button
            variant="transparent"
            type="button"
            onClick={handleLogout}
            className={cn(
              "h-8 shrink-0 rounded-full px-2.5 text-white sm:h-9 sm:px-3 md:text-[13px]",
              "bg-[linear-gradient(135deg,#0f3c52,#12344c)]",
              "hover:brightness-110 hover:text-white/80 font-medium",
            )}
            leftIcon={<FaRightFromBracket className="size-3.5 shrink-0" aria-hidden />}
            aria-label="로그아웃"
          >
            <span className="inline max-lg:text-[11px] sm:text-inherit">로그아웃</span>
          </Button>
        </div>
      </div>

      <PointTransferModal
        open={pointModalOpen}
        onClose={() => setPointModalOpen(false)}
      />
    </div>
  );
}

function LoggedOutView({
  onOpenLogin,
  onOpenSignUp,
}: {
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2 lg:gap-3.5 md:gap-3">
      <Button
        variant="darkBlue"
        onClick={onOpenLogin}
        className="h-8 md:h-10 md:min-w-24 lg:h-12 min-w-20 lg:min-w-32 rounded-lg md:rounded-xl lg:rounded-2xl font-bold shadow-[0_0_20px_rgb(91_255_223/0.08)] transition-all duration-350 hover:-translate-y-0.5 hover:shadow-[0_0px_24px_rgb(95_255_217/0.18)]"
      >
        로그인
      </Button>
      <Button
        variant="darkBlue"
        onClick={onOpenSignUp}
        className="h-8 md:h-10 md:min-w-24 lg:h-12 min-w-20 lg:min-w-32 rounded-lg md:rounded-xl lg:rounded-2xl font-bold shadow-[0_0_20px_rgb(91_255_223/0.22)] transition-all duration-350 hover:-translate-y-0.5 hover:shadow-[0_0px_24px_rgb(94_255_217/0.25)]"
      >
        회원가입
      </Button>
    </div>
  );
}

const AccountInfo = () => {
  const { openLogin, openSignUp } = useAuthModal();
  const { currentUser, loadingUser } = useUser();

  const isLoggedIn = !!currentUser?.result?.token;

  if (loadingUser) {
    return (
      <div className="flex shrink-0 items-center gap-2 text-lg font-semibold text-[#d7f7ff] transition-[color,text-shadow] duration-350 hover:text-[#df7ca5]">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#ffb0c9] border-t-transparent" />
        로딩 중...
      </div>
    );
  }

  return isLoggedIn ? (
    <LoggedInView />
  ) : (
    <LoggedOutView onOpenLogin={openLogin} onOpenSignUp={openSignUp} />
  );
};

export default AccountInfo;
