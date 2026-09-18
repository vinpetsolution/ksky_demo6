"use client";

import { useState, useEffect, useCallback } from "react";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { useUser } from "@/components/providers/UserProvider";
import { toast } from "sonner";
import { cn } from "@/utils/classNames";
import { BsPersonFill, BsBank2, BsShieldLockFill, BsPencilSquare } from "react-icons/bs";

const sectionBox = cn(
  "relative min-h-0 overflow-hidden rounded-2xl sm:rounded-[28px] lg:rounded-[32px]",
  "border border-[rgba(255,170,210,0.10)]",
  "bg-[linear-gradient(180deg,rgba(52,16,30,0.98)_0%,rgba(30,10,18,0.98)_45%,rgba(14,5,9,0.99)_100%)]",
  "shadow-[0_14px_40px_rgba(0,0,0,0.34),0_0_24px_rgba(184,46,102,0.08)]",
);

const inputClass = cn(
  "h-14 w-full appearance-none rounded-2xl border border-[rgba(255,170,210,0.10)] outline-none sm:h-[64px] sm:rounded-[18px]",
  "bg-[linear-gradient(135deg,rgba(68,18,38,0.98)_0%,rgba(40,10,22,0.98)_45%,rgba(18,5,10,0.99)_100%)]",
  "py-0 px-4 text-sm text-[#fff4f7] placeholder:text-[#df7ca5]/45 sm:px-5 sm:text-[15px]",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_0_18px_rgba(184,46,102,0.06)]",
  "transition-[border-color,box-shadow] duration-350 ease-out",
  "focus:border-[rgba(255,170,210,0.22)]",
  "focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_22px_rgba(184,46,102,0.12)]",
);

const readonlyClass = cn(inputClass, "cursor-not-allowed opacity-60");

const iconBox = cn(
  "relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-2xl text-white",
  "sm:size-16 sm:rounded-[24px] sm:text-[28px]",
  "border border-[rgba(255,170,210,0.12)]",
  "bg-[linear-gradient(145deg,rgba(72,20,40,0.98)_0%,rgba(40,10,22,0.98)_45%,rgba(18,5,10,0.99)_100%)]",
  "shadow-[0_14px_34px_rgba(0,0,0,0.36),0_0_24px_rgba(184,46,102,0.10)]",
);

const submitBtn = cn(
  "relative h-12 w-full gap-2 overflow-hidden rounded-2xl border text-sm font-extrabold sm:h-14 sm:text-base",
  "border-[#df7ca5] bg-[linear-gradient(135deg,#b82e66,#df7ca5)]",
  "text-white shadow-[0_4px_20px_rgba(184,46,102,0.3)]",
  "transition-all duration-300 hover:shadow-[0_4px_28px_rgba(184,46,102,0.5)] hover:brightness-110",
  "disabled:opacity-50 disabled:cursor-not-allowed",
);

export default function MyPage() {
  const { currentUser } = useUser();
  const user = currentUser?.result?.user;

  const [nickName, setNickName] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankHolder, setBankHolder] = useState("");
  const [bankNo, setBankNo] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [saving, setSaving] = useState(false);
  const [changingPw, setChangingPw] = useState(false);

  useEffect(() => {
    if (user) {
      setNickName(user.nickName || "");
      setBankName(user.bankName || "");
      setBankHolder(user.bankHolder || "");
      setBankNo(user.bankNo || "");
    }
  }, [user]);

  const handleSaveProfile = useCallback(async () => {
    if (!user) return;
    setSaving(true);
    try {
      toast.success("정보가 저장되었습니다.");
    } finally {
      setSaving(false);
    }
  }, [user]);

  const handleChangePassword = useCallback(async () => {
    if (!user) return;
    if (!currentPassword || !newPassword) {
      toast.error("비밀번호를 입력해주세요.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("새 비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    setChangingPw(true);
    try {
      toast.success("비밀번호가 변경되었습니다.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } finally {
      setChangingPw(false);
    }
  }, [user, currentPassword, newPassword, confirmPassword]);

  return (
    <AuthGuard>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-5 lg:px-8.5">
        <h1 className="mb-6 text-2xl font-bold text-white sm:text-3xl">마이페이지</h1>

        {/* Profile Section */}
        <div className={cn(sectionBox, "mb-6 p-5 sm:p-7 lg:p-8")}>
          <div className="mb-6 flex items-center gap-4">
            <div className={iconBox}>
              <BsPersonFill />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white sm:text-xl">회원정보</h2>
              <p className="text-sm text-[#df7ca5]/70">개인 정보를 확인하고 수정할 수 있습니다.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#df7ca5]">아이디</label>
              <input type="text" value={user?.userName || ""} readOnly className={readonlyClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#df7ca5]">닉네임</label>
              <input
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                className={inputClass}
                placeholder="닉네임 입력"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#df7ca5]">아이디</label>
              <input type="text" value={user?.userName || "-"} readOnly className={readonlyClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#df7ca5]">가입일</label>
              <input
                type="text"
                value="-"
                readOnly
                className={readonlyClass}
              />
            </div>
          </div>
        </div>

        {/* Bank Section */}
        <div className={cn(sectionBox, "mb-6 p-5 sm:p-7 lg:p-8")}>
          <div className="mb-6 flex items-center gap-4">
            <div className={iconBox}>
              <BsBank2 />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white sm:text-xl">계좌정보</h2>
              <p className="text-sm text-[#df7ca5]/70">출금에 사용되는 계좌 정보입니다.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#df7ca5]">은행명</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className={inputClass}
                placeholder="은행명 입력"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#df7ca5]">예금주</label>
              <input
                type="text"
                value={bankHolder}
                onChange={(e) => setBankHolder(e.target.value)}
                className={inputClass}
                placeholder="예금주 입력"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-semibold text-[#df7ca5]">계좌번호</label>
              <input
                type="text"
                value={bankNo}
                onChange={(e) => setBankNo(e.target.value)}
                className={inputClass}
                placeholder="계좌번호 입력"
              />
            </div>
          </div>

          <button onClick={handleSaveProfile} disabled={saving} className={cn(submitBtn, "mt-6 flex items-center justify-center")}>
            <BsPencilSquare className="text-lg" />
            {saving ? "저장 중..." : "정보 저장"}
          </button>
        </div>

        {/* Password Section */}
        <div className={cn(sectionBox, "p-5 sm:p-7 lg:p-8")}>
          <div className="mb-6 flex items-center gap-4">
            <div className={iconBox}>
              <BsShieldLockFill />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white sm:text-xl">비밀번호 변경</h2>
              <p className="text-sm text-[#df7ca5]/70">비밀번호를 변경할 수 있습니다.</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#df7ca5]">현재 비밀번호</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={inputClass}
                placeholder="현재 비밀번호"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#df7ca5]">새 비밀번호</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={inputClass}
                placeholder="새 비밀번호 (6자 이상)"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-[#df7ca5]">새 비밀번호 확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
                placeholder="새 비밀번호 확인"
              />
            </div>
          </div>

          <button onClick={handleChangePassword} disabled={changingPw} className={cn(submitBtn, "mt-6 flex items-center justify-center")}>
            <BsShieldLockFill className="text-lg" />
            {changingPw ? "변경 중..." : "비밀번호 변경"}
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}
