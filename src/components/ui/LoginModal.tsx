"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BsLockFill, BsPersonFill } from "react-icons/bs";
import { cn } from "@/utils/classNames";
import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { saveStorageKey } from "@/utils/storage";
import { getStorageKey as getStorageKeyName } from "@/constants/store-key";
import { useUser } from "@/components/providers/UserProvider";
import { toast } from "sonner";
import { demoLogin } from "@/app/actions/demo-auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignUp?: () => void;
}

const loginInputClassName = cn(
  "h-[64px] w-full appearance-none rounded-[18px] border border-[rgba(255,170,210,0.10)] outline-none",
  "bg-[linear-gradient(135deg,rgba(68,18,38,0.98)_0%,rgba(40,10,22,0.98)_45%,rgba(18,5,10,0.99)_100%)]",
  "py-0 pl-[58px] pr-5 text-[15px] text-[#fff4f7] placeholder:text-[#df7ca5]/45",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_0_18px_rgba(184,46,102,0.06)]",
  "transition-[border-color,box-shadow,transform] duration-350 ease-out",
  "focus:border-[rgba(255,170,210,0.22)]",
  "focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_22px_rgba(184,46,102,0.12)]",
);

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { setCurrentUser } = useUser();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName || !password) {
      toast.error("아이디와 비밀번호를 입력하세요.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await demoLogin(userName.trim(), password);

      if (response.success && response.result?.token) {
        saveStorageKey({
          key: getStorageKeyName(),
          data: JSON.stringify(response),
        });
        setCurrentUser(response);
        toast.success("로그인 성공!");
        onClose();
        setUserName("");
        setPassword("");
        router.push("/game_casino");
      } else {
        toast.error("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      disabled={isLoading}
      closeOnOverlayClick={!isLoading}
      className="w-full lg:max-w-lg"
      aria-labelledby="login-modal-title"
      showCloseButton
    >
      <>
        <div className="mb-8">
          <p className="text-xs mb-3.5 spacing-4 font-extrabold uppercase tracking-[0.2em] text-[#df7ca5]">
            MEMBER LOGIN
          </p>
          <h2
            id="login-modal-title"
            className="mb-4 text-4xl font-extrabold leading-tight text-white"
          >
            로그인
          </h2>
          <p className="text-[15px] text-[#df7ca5] leading-[1.8]">
            KSKY SOLUTION 플랫폼에 로그인하세요.
          </p>
        </div>

        <form
          id="login-form"
          className="flex flex-col gap-5"
          onSubmit={handleLogin}
        >
          <div className="flex flex-col gap-3">
            <label
              htmlFor="login-id"
              className="text-sm font-bold text-[#dffcff]"
            >
              아이디
            </label>
            <div className="relative">
              <BsPersonFill
                className="pointer-events-none absolute left-5 top-1/2 size-4.5 -translate-y-1/2 text-[#df7ca5]"
                aria-hidden
              />
              <input
                id="login-id"
                type="text"
                placeholder="아이디 입력"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className={loginInputClassName}
                autoComplete="username"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="login-password"
              className="text-[15px] font-bold text-white"
            >
              비밀번호
            </label>
            <div className="relative">
              <BsLockFill
                className="pointer-events-none absolute left-5 top-1/2 size-4.5 -translate-y-1/2 text-[#df7ca5]"
                aria-hidden
              />
              <input
                id="login-password"
                type="password"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={loginInputClassName}
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="pink"
            fullWidth
            shine
            disabled={isLoading}
            contentClassName="relative z-[2]"
            className={cn(
              "relative overflow-hidden h-18 rounded-3xl text-base font-extrabold transition-all duration-300",
              "hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(0,0,0,.44),0_0_32px_rgba(184,46,102,.18),0_0_20px_rgba(255,120,180,.12)]",
            )}
          >
            {isLoading ? "로그인 중...." : "로그인"}
          </Button>
        </form>

        {/* {onOpenSignUp ? (
          <p className="mt-6 text-center text-sm text-[#df7ca5]/80">
            아직 회원이 아니신가요?{" "}
            <button
              type="button"
              className="font-bold text-[#ffdbe8] underline-offset-2 transition-colors hover:text-white hover:underline"
              onClick={() => {
                onClose();
                onOpenSignUp();
              }}
              disabled={isLoading}
            >
              회원가입
            </button>
          </p>
        ) : null} */}
      </>
    </Modal>
  );
}
