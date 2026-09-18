"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils/classNames";
import { useMailboxCounts } from "@/hooks/useMailboxCounts";
import { useUser } from "@/components/providers/UserProvider";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { clearAllAuthData } from "@/utils/auth";
import { demoLogout } from "@/app/actions/demo-auth";
import { toast } from "sonner";
import { NAV_ITEMS } from "@/constants/navItem";
import { BsList, BsXLg, BsChevronDown } from "react-icons/bs";
import {
  FaWallet,
  FaGem,
  FaRegUserCircle,
} from "react-icons/fa";
import {
  FaRightFromBracket,
  FaArrowRotateRight,
} from "react-icons/fa6";
import { Button } from "@/components/ui/Button";

/* ══════════════════════════════════════════════
   Left side: Hamburger → slide-in nav (via Portal)
   ══════════════════════════════════════════════ */
function subscribeNoop() {
  return () => { };
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const [openedForPath, setOpenedForPath] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { totalUnread } = useMailboxCounts();
  const { currentUser } = useUser();
  const { openLogin } = useAuthModal();
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const isOpen = open && openedForPath === pathname;

  const closeMenu = () => setOpen(false);
  const openMenu = () => {
    setOpenedForPath(pathname);
    setOpen(true);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleNavClick = (item: (typeof NAV_ITEMS)[number]) => {
    if (item.requireAuth && !currentUser) {
      closeMenu();
      openLogin();
      return;
    }
    closeMenu();
    router.push(item.href);
  };

  const panelContent = (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99998,
            background: "rgba(0,0,0,0.6)",
          }}
        />
      )}

      {/* Slide-in panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          height: "100dvh",
          width: 260,
          maxWidth: "80vw",
          overflowY: "auto",
          background: "#1a0b12",
          borderRight: "1px solid rgba(255,170,210,0.15)",
          boxShadow: isOpen ? "10px 0 30px rgba(0,0,0,0.5)" : "none",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 300ms ease-out",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 16px 12px",
            borderBottom: "1px solid rgba(255,170,210,0.12)",
          }}
        >
          <span style={{ color: "#df7ca5", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
            Menu
          </span>
          <button
            type="button"
            onClick={closeMenu}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "none",
              background: "transparent",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
            }}
          >
            <BsXLg style={{ width: 16, height: 16 }} />
          </button>
        </div>

        {/* Nav items */}
        <div style={{ padding: "8px 12px" }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            const label = item.showMailboxCount
              ? `쪽지함( ${totalUnread > 99 ? "99+" : totalUnread} )`
              : item.label;

            return (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  padding: "12px 16px",
                  marginBottom: 2,
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  color: active ? "#ffffff" : "#d7d7d7",
                  background: active ? "rgba(184,46,102,0.2)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <Icon
                  style={{
                    width: 16,
                    height: 16,
                    flexShrink: 0,
                    color: active ? "#df7ca5" : "rgba(223,124,165,0.5)",
                  }}
                />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Hamburger button (stays in header) */}
      <button
        type="button"
        onClick={openMenu}
        className="flex xl:hidden items-center justify-center size-9 rounded-lg border border-[rgba(255,170,210,0.15)] bg-[rgba(255,255,255,0.06)] text-white transition-colors hover:bg-[rgba(255,255,255,0.12)]"
        aria-label="메뉴 열기"
      >
        <BsList className="size-5" />
      </button>

      {/* Portal: render backdrop + panel at document.body */}
      {mounted && createPortal(panelContent, document.body)}
    </>
  );
}

/* ══════════════════════════════════════════════
   Right side: User name → dropdown
   ══════════════════════════════════════════════ */
function MobileUserDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { currentUser, refetchUserInfo, loadingUser, setCurrentUser } = useUser();
  const { openLogin, openSignUp } = useAuthModal();
  const router = useRouter();

  const isLoggedIn = !!currentUser?.result?.token;
  const user = currentUser?.result?.user;
  const nickname = user?.nickName || user?.userName || "—";
  const money = user?.balanceMoney || 0;
  const points = user?.balancePoint || 0;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  const handleLogout = async () => {
    await demoLogout();
    clearAllAuthData();
    setCurrentUser(undefined);
    toast.success("로그아웃되었습니다.");
    setOpen(false);
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

  if (loadingUser) {
    return (
      <div className="flex xl:hidden items-center">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#df7ca5] border-t-transparent" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex xl:hidden items-center gap-2">
        <button
          type="button"
          onClick={openLogin}
          style={{
            height: 32,
            borderRadius: 8,
            padding: "0 12px",
            fontSize: 12,
            fontWeight: 700,
            color: "#fff",
            background: "rgba(184,46,102,0.6)",
            border: "1px solid rgba(255,170,210,0.2)",
            cursor: "pointer",
          }}
        >
          로그인
        </button>
        <button
          type="button"
          onClick={openSignUp}
          style={{
            height: 32,
            borderRadius: 8,
            padding: "0 12px",
            fontSize: 12,
            fontWeight: 700,
            color: "#df7ca5",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,170,210,0.15)",
            cursor: "pointer",
          }}
        >
          회원가입
        </button>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative flex xl:hidden items-center">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white transition-colors",
          "border border-[rgba(255,170,210,0.15)] bg-[rgba(255,255,255,0.06)]",
          "hover:bg-[rgba(255,255,255,0.12)]",
          open && "bg-[rgba(255,255,255,0.12)]",
        )}
      >
        <FaRegUserCircle className="size-3.5 text-[#a78bfa] shrink-0" />
        <span className="max-w-20 truncate">{nickname}</span>
        <BsChevronDown className={cn("size-3 text-white/50 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: 8,
            width: 220,
            zIndex: 100000,
            borderRadius: 16,
            border: "1px solid rgba(255,170,210,0.12)",
            background: "#1a0b12",
            boxShadow: "0 16px 40px rgba(0,0,0,0.5), 0 0 20px rgba(184,46,102,0.1)",
            overflow: "hidden",
          }}
        >
          <div style={{ borderBottom: "1px solid rgba(255,170,210,0.08)", padding: "12px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <FaRegUserCircle style={{ width: 20, height: 20, color: "#a78bfa" }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{nickname} 님</span>
            </div>
          </div>

          <div style={{ padding: "12px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#ccc" }}>
                <FaWallet style={{ width: 12, height: 12, color: "#ffb000" }} />
                <span>머니</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums" }}>
                  {money.toLocaleString()}
                </span>
                <button
                  type="button"
                  onClick={handleRefresh}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#ffb000", padding: 0 }}
                >
                  <FaArrowRotateRight style={{ width: 12, height: 12 }} />
                </button>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#ccc" }}>
                <FaGem style={{ width: 12, height: 12, color: "#38bdf8" }} />
                <span>포인트</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums" }}>
                {points.toLocaleString()}
              </span>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,170,210,0.08)", padding: "10px 12px" }}>
            <Button
              variant="transparent"
              type="button"
              onClick={handleLogout}
              fullWidth
              className="h-9 rounded-xl text-xs font-semibold text-white/80 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)]"
              leftIcon={<FaRightFromBracket className="size-3 shrink-0" />}
            >
              로그아웃
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Exports ── */
export function MobileMenuLeft() {
  return <MobileNav />;
}

export function MobileMenuRight() {
  return <MobileUserDropdown />;
}

export function MobileMenu() {
  return (
    <>
      <MobileNav />
      <MobileUserDropdown />
    </>
  );
}
