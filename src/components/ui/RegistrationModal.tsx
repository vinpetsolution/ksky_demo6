"use client";

import { useState } from "react";
import { cn } from "@/utils/classNames";
import { Button } from "@/components/ui/Button";
import { Dropdown, type DropdownOption } from "@/components/ui/Dropdown";
import Modal from "@/components/ui/Modal";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "sonner";

const BANK_OPTIONS: DropdownOption[] = [
  { value: "KB국민은행", label: "KB국민은행" },
  { value: "신한은행", label: "신한은행" },
  { value: "우리은행", label: "우리은행" },
  { value: "하나은행", label: "하나은행" },
  { value: "NH농협은행", label: "NH농협은행" },
  { value: "IBK기업은행", label: "IBK기업은행" },
  { value: "SC제일은행", label: "SC제일은행" },
  { value: "HSBC은행", label: "HSBC은행" },
  { value: "전북은행", label: "전북은행" },
];

const PHONE_PREFIX_OPTIONS: DropdownOption[] = [
  { value: "010", label: "010" },
  { value: "011", label: "011" },
  { value: "016", label: "016" },
  { value: "017", label: "017" },
  { value: "018", label: "018" },
  { value: "019", label: "019" },
];

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistrationComplete?: () => void;
}

interface FormErrors {
  userName?: string;
  nickName?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  bank?: string;
  bankHolder?: string;
  bankNo?: string;
  transactionPassword?: string;
  agentCode?: string;
}

const inputBase = cn(
  "mb-2.5 h-11 w-full max-w-full rounded-lg border border-[#ddd] bg-white px-[15px] text-sm text-black",
  "shadow-[0_1px_2px_rgba(0,0,0,0.25)] transition-[border-color,box-shadow] duration-300",
  "placeholder:text-black/45 focus:outline-none focus:border-[#bbb]",
);

const registerDropdownButtonClassName = cn(
  inputBase,
  "!mb-2.5 !justify-between",
);

const passwordToggleClassName = cn(
  "absolute inset-y-0 right-2 flex h-auto w-10 items-center justify-center",
  "border-0 bg-transparent p-0 text-black/40 transition-colors hover:text-black/70",
);

const inputError = "border-red-500";

const ErrorText = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <p className="text-red-500 text-xs mt-1">{message}</p>;
};

export function RegistrationModal({
  isOpen,
  onClose,
  onRegistrationComplete,
}: RegistrationModalProps) {
  const [selectedBank, setSelectedBank] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("010");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTransactionPassword, setShowTransactionPassword] = useState(false);

  const [userName, setUserName] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneMid, setPhoneMid] = useState("");
  const [phoneLast, setPhoneLast] = useState("");
  const [bankHolder, setBankHolder] = useState("");
  const [bankNo, setBankNo] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [agentCode, setAgentCode] = useState("");

  const handlePhoneInput = (value: string, setter: (val: string) => void) => {
    const numbersOnly = value.replace(/\D/g, "");
    if (numbersOnly.length <= 4) {
      setter(numbersOnly);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!userName.trim()) {
      newErrors.userName = "아이디를 입력해주세요.";
    }

    if (!password.trim()) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    if (!phoneMid || !phoneLast) {
      newErrors.phone = "휴대폰번호를 입력해주세요.";
    }

    if (!selectedBank) {
      newErrors.bank = "출금은행을 선택해주세요.";
    }

    if (!bankHolder.trim()) {
      newErrors.bankHolder = "예금주를 입력해주세요.";
    }

    if (!bankNo.trim()) {
      newErrors.bankNo = "출금계좌를 입력해주세요.";
    }

    if (!transactionPassword.trim()) {
      newErrors.transactionPassword = "출금비밀번호를 입력해주세요.";
    }

    if (!agentCode.trim()) {
      newErrors.agentCode = "대리점 코드를 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      toast.success("회원가입이 완료되었습니다.");
      onRegistrationComplete?.();
      onClose();
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setUserName("");
    setNickName("");
    setPassword("");
    setConfirmPassword("");
    setPhoneMid("");
    setPhoneLast("");
    setSelectedBank("");
    setBankHolder("");
    setBankNo("");
    setTransactionPassword("");
    setAgentCode("");
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowTransactionPassword(false);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      disabled={loading}
      closeOnOverlayClick={!loading}
      className={cn(
        "flex max-h-[90vh] w-full max-w-lg min-w-0 flex-col overflow-hidden",
      )}
      contentClassName="flex min-h-0 flex-1 flex-col overflow-hidden p-0"
      aria-labelledby="registration-modal-title"
    >
      <div className="relative mb-4 shrink-0">
        <h2
          id="registration-modal-title"
          className="text-4xl font-extrabold text-white"
        >
          회원가입
        </h2>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <div className="scrollbar-thin min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
          <div className="min-w-0 space-y-1">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="아이디"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  clearError("userName");
                }}
                className={cn(inputBase, "w-full", errors.userName && inputError)}
                disabled={loading}
              />
              <ErrorText message={errors.userName} />
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                placeholder="닉네임"
                value={nickName}
                onChange={(e) => {
                  setNickName(e.target.value);
                  clearError("nickName");
                }}
                className={cn(inputBase, "w-full", errors.nickName && inputError)}
                disabled={loading}
              />
              <ErrorText message={errors.nickName} />
            </div>

            <div className="flex flex-col">
              <div className="relative mb-2.5">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => {
                    const newPassword = e.target.value;
                    setPassword(newPassword);
                    clearError("password");
                    if (confirmPassword && newPassword !== confirmPassword) {
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: "비밀번호가 일치하지 않습니다.",
                      }));
                    } else if (confirmPassword) {
                      clearError("confirmPassword");
                    }
                  }}
                  className={cn(
                    inputBase,
                    "mb-0 w-full pr-11",
                    errors.password && inputError,
                  )}
                  disabled={loading}
                />
                <Button
                  variant="transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  className={passwordToggleClassName}
                  tabIndex={-1}
                  aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                >
                  {showPassword ? (
                    <BsEye className="size-5" aria-hidden />
                  ) : (
                    <BsEyeSlash className="size-5" aria-hidden />
                  )}
                </Button>
              </div>
              <ErrorText message={errors.password} />
            </div>

            <div className="flex flex-col">
              <div className="relative mb-2.5">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="비번확인"
                  value={confirmPassword}
                  onChange={(e) => {
                    const newConfirmPassword = e.target.value;
                    setConfirmPassword(newConfirmPassword);
                    if (password && newConfirmPassword !== password) {
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: "비밀번호가 일치하지 않습니다.",
                      }));
                    } else {
                      clearError("confirmPassword");
                    }
                  }}
                  className={cn(
                    inputBase,
                    "mb-0 w-full pr-11",
                    errors.confirmPassword && inputError,
                  )}
                  disabled={loading}
                />
                <Button
                  variant="transparent"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={passwordToggleClassName}
                  tabIndex={-1}
                  aria-label={
                    showConfirmPassword ? "비밀번호 숨기기" : "비밀번호 표시"
                  }
                >
                  {showConfirmPassword ? (
                    <BsEye className="size-5" aria-hidden />
                  ) : (
                    <BsEyeSlash className="size-5" aria-hidden />
                  )}
                </Button>
              </div>
              <ErrorText message={errors.confirmPassword} />
            </div>

            <div className="flex flex-col">
              <p className="mb-2 text-center text-sm text-gray">휴대폰번호 입력</p>
              <div className="flex min-w-0 gap-2">
                <Dropdown
                  options={PHONE_PREFIX_OPTIONS}
                  value={phonePrefix}
                  onChange={setPhonePrefix}
                  placeholder="010"
                  position="bottom"
                  className="w-25 shrink-0"
                  buttonClassName={registerDropdownButtonClassName}
                />
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="중간번호"
                  value={phoneMid}
                  onChange={(e) => {
                    handlePhoneInput(e.target.value, setPhoneMid);
                    clearError("phone");
                  }}
                  maxLength={4}
                  className={cn(
                    inputBase,
                    "min-w-0 flex-1",
                    errors.phone && inputError,
                  )}
                  disabled={loading}
                />
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="마지막번호"
                  value={phoneLast}
                  onChange={(e) => {
                    handlePhoneInput(e.target.value, setPhoneLast);
                    clearError("phone");
                  }}
                  maxLength={4}
                  className={cn(
                    inputBase,
                    "min-w-0 flex-1",
                    errors.phone && inputError,
                  )}
                  disabled={loading}
                />
              </div>
              <ErrorText message={errors.phone} />
            </div>

            <div className="flex flex-col">
              <p className="mb-2 text-center text-sm text-gray">출금계좌정보</p>
              <div className="flex min-w-0 gap-2">
                <Dropdown
                  options={BANK_OPTIONS}
                  value={selectedBank}
                  onChange={(val) => {
                    setSelectedBank(val);
                    clearError("bank");
                  }}
                  placeholder="출금은행"
                  position="bottom"
                  className={cn(
                    "min-w-0 flex-1",
                    errors.bank && "rounded-lg",
                  )}
                  buttonClassName={cn(
                    registerDropdownButtonClassName,
                    errors.bank && inputError,
                  )}
                />
                <input
                  type="text"
                  placeholder="예금주 입력"
                  value={bankHolder}
                  onChange={(e) => {
                    setBankHolder(e.target.value);
                    clearError("bankHolder");
                  }}
                  className={cn(
                    inputBase,
                    "min-w-0 flex-1",
                    errors.bankHolder && inputError,
                  )}
                  disabled={loading}
                />
              </div>
              {(errors.bank || errors.bankHolder) && (
                <ErrorText message={errors.bank || errors.bankHolder} />
              )}
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                placeholder="출금계좌 -없이 입력"
                value={bankNo}
                onChange={(e) => {
                  const numbersOnly = e.target.value.replace(/\D/g, "");
                  setBankNo(numbersOnly);
                  clearError("bankNo");
                }}
                className={cn(inputBase, "w-full", errors.bankNo && inputError)}
                disabled={loading}
              />
              <ErrorText message={errors.bankNo} />
            </div>

            <div className="flex flex-col">
              <div className="relative mb-2.5">
                <input
                  type={showTransactionPassword ? "text" : "password"}
                  placeholder="출금비번입력"
                  value={transactionPassword}
                  onChange={(e) => {
                    setTransactionPassword(e.target.value);
                    clearError("transactionPassword");
                  }}
                  className={cn(
                    inputBase,
                    "mb-0 w-full pr-11",
                    errors.transactionPassword && inputError,
                  )}
                  disabled={loading}
                />
                <Button
                  variant="transparent"
                  onClick={() =>
                    setShowTransactionPassword(!showTransactionPassword)
                  }
                  className={passwordToggleClassName}
                  tabIndex={-1}
                  aria-label={
                    showTransactionPassword
                      ? "비밀번호 숨기기"
                      : "비밀번호 표시"
                  }
                >
                  {showTransactionPassword ? (
                    <BsEye className="size-5" aria-hidden />
                  ) : (
                    <BsEyeSlash className="size-5" aria-hidden />
                  )}
                </Button>
              </div>
              <ErrorText message={errors.transactionPassword} />
            </div>

            <div className="flex flex-col">
              <p className="mb-2 text-center text-sm text-gray">대리점 코드</p>
              <input
                type="text"
                placeholder="대리점 코드"
                value={agentCode}
                onChange={(e) => {
                  setAgentCode(e.target.value);
                  clearError("agentCode");
                }}
                className={cn(inputBase, "w-full", errors.agentCode && inputError)}
                disabled={loading}
              />
              <ErrorText message={errors.agentCode} />
            </div>
          </div>
        </div>

        <div className="shrink-0 pt-2">
          <Button
            type="submit"
            variant="success"
            fullWidth
            className="h-11 rounded-lg border-0 text-base font-bold"
            disabled={loading}
          >
            {loading ? "처리중..." : "회원가입"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
