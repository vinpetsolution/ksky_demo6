"use client";

import { useState, useMemo, useCallback } from "react";
import Table, { type Column } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { formatNumber } from "@/utils/format";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { useUser } from "@/components/providers/UserProvider";
import { toast } from "sonner";
import { cn } from "@/utils/classNames";
import {
    BsBank,
    BsCashCoin,
    BsCreditCard2FrontFill,
    BsCurrencyDollar,
    BsExclamationTriangleFill,
    BsFillSendCheckFill,
    BsFillWalletFill,
    BsLockFill,
    BsPersonFill,
} from "react-icons/bs";

const withdrawPagePaddingX = "px-4 sm:px-5 lg:px-[34px]";

const withdrawSectionBoxClassName = cn(
    "relative min-h-0 overflow-hidden rounded-2xl sm:rounded-[28px] lg:rounded-[32px]",
    "border border-[rgba(255,170,210,0.10)]",
    "bg-[linear-gradient(180deg,rgba(52,16,30,0.98)_0%,rgba(30,10,18,0.98)_45%,rgba(14,5,9,0.99)_100%)]",
    "shadow-[0_14px_40px_rgba(0,0,0,0.34),0_0_24px_rgba(184,46,102,0.08)]",
);

const WITHDRAW_SIDEBAR_DEFAULT_NOTICE = [
    "출금은 등록하신 본인 명의 계좌로만 가능합니다.",
    "출금은 신청 후 평균 1~5분 내 처리됩니다.",
    "은행 점검시간에는 처리가 지연될 수 있습니다.",
] as const;

const withdrawBoxTitleIconClassName = cn(
    "flex size-[72px] shrink-0 items-center justify-center rounded-[24px] text-[30px] text-[#04151d]",
    "bg-[linear-gradient(135deg,#df7ca5,#df7ca5)]",
    "sm:size-20 lg:size-[82px]",
);

const withdrawInputClassName = cn(
    "h-14 w-full appearance-none rounded-2xl border border-[rgba(255,170,210,0.10)] outline-none sm:h-[64px] sm:rounded-[18px]",
    "bg-[linear-gradient(135deg,rgba(68,18,38,0.98)_0%,rgba(40,10,22,0.98)_45%,rgba(18,5,10,0.99)_100%)]",
    "py-0 pl-12 pr-4 text-sm text-[#fff4f7] placeholder:text-[#df7ca5]/45 sm:pl-[58px] sm:pr-5 sm:text-[15px]",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_0_18px_rgba(184,46,102,0.06)]",
    "transition-[border-color,box-shadow,transform] duration-350 ease-out",
    "focus:border-[rgba(255,170,210,0.22)]",
    "focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_22px_rgba(184,46,102,0.12)]",
);

const WITHDRAW_QUICK_AMOUNTS = [
    { label: "+10만", value: 100_000 },
    { label: "+30만", value: 300_000 },
    { label: "+50만", value: 500_000 },
    { label: "+100만", value: 1_000_000 },
] as const;

const withdrawQuickButtonClassName = cn(
    "h-11 w-full rounded-2xl px-3 text-xs font-bold text-white sm:h-12 sm:w-auto sm:min-w-24 sm:px-4 sm:text-sm",
    "hover:text-[#04151d] hover:bg-[linear-gradient(135deg,#df7ca5,#df7ca5)]",
    "hover:border-[#df7ca5] border-none",
);

const withdrawSubmitButtonClassName = cn(
    "relative h-12 w-full gap-2 overflow-hidden rounded-2xl border text-sm font-extrabold sm:h-14 sm:text-base lg:h-15",
    "transition-all duration-300 ease-out",
    "hover:-translate-y-1 hover:border-[rgba(94,255,217,0.24)]",
    "hover:shadow-[0_18px_40px_rgba(0,0,0,0.40),0_0_30px_rgba(94,255,217,0.12),0_0_20px_rgba(67,207,255,0.10)]",
);

interface WithdrawRecord {
    id: string;
    rowNo: number;
    exchangeAccount: string;
    amount: number;
    status: string;
    requestDate: string;
    processDate: string;
}

const WithdrawPage = () => {
    const { currentUser } = useUser();
    const [amount, setAmount] = useState(0);
    const [amountInput, setAmountInput] = useState("0");
    const [transactionPassword, setTransactionPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const availableBalance = currentUser?.result?.user?.balanceMoney || 0;
    const userBankInfo = {
        bankName: currentUser?.result?.user?.bankName?.trim() || "—",
        accountNumber: currentUser?.result?.user?.bankNo?.trim() || "—",
        accountHolder: currentUser?.result?.user?.bankHolder?.trim() || "—",
    };

    const sidebarNoticeLines = useMemo(
        () => [...WITHDRAW_SIDEBAR_DEFAULT_NOTICE],
        [],
    );

    const tableData: WithdrawRecord[] = [];

    const withdrawHistoryColumns: Column<WithdrawRecord>[] = useMemo(
        () => [
            {
                key: "rowNo",
                label: "No.",
                align: "center",
                width: 56,
            },
            {
                key: "exchangeAccount",
                label: "환전계좌",
                align: "center",
            },
            {
                key: "amount",
                label: "환전액",
                align: "center",
                render: (row) => formatNumber(row.amount),
            },
            {
                key: "status",
                label: "상태",
                align: "center",
                width: 72,
                render: (row) => {
                    const statusMap: Record<string, string> = {
                        COMPLETED: "완료",
                        PENDING: "대기중",
                        CANCELLED: "취소",
                    };
                    return statusMap[row.status] ?? row.status;
                },
            },
            {
                key: "requestDate",
                label: "신청시간",
                align: "center",
            },
            {
                key: "processDate",
                label: "처리시간",
                align: "center",
            },
        ],
        [],
    );

    const handlePresetClick = (value: number) => {
        const next = amount + value;
        setAmount(next);
        setAmountInput(String(next));
    };

    const handleAllAmount = () => {
        setAmount(availableBalance);
        setAmountInput(String(availableBalance));
    };

    const handleReset = () => {
        setAmount(0);
        setAmountInput("0");
    };

    const handleSubmit = useCallback(async () => {
        if (!transactionPassword) {
            toast.error("출금비밀번호를 입력해주세요.");
            return;
        }

        setLoading(true);
        try {
            toast.success("출금 신청이 완료되었습니다.");
            handleReset();
            setTransactionPassword("");
        } finally {
            setLoading(false);
        }
    }, [transactionPassword]);

    return (
        <AuthGuard>
            <div className="mx-auto w-full min-w-0 max-w-350 px-3 py-8 sm:px-4 sm:py-10 lg:py-14">
                <header className="mb-6 w-full sm:mb-8">
                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[3px] text-[#df7ca5] sm:mb-2.5 sm:text-xs sm:tracking-[4px]">
                        FAST &amp; SAFE WITHDRAW
                    </p>
                    <h1 className="mb-2 text-3xl font-black tracking-[-1px] text-white sm:mb-3 sm:text-4xl sm:tracking-[-1.5px] lg:text-[48px] lg:tracking-[-2px]">
                        출금신청
                    </h1>
                    <p className="text-sm leading-[1.75] text-[#df7ca5] sm:text-base sm:leading-[1.9]">
                        안전하고 신속한 출금 시스템으로 실시간 출금 처리가 가능합니다.
                        출금 전 계좌정보를 다시 한번 확인해주세요.
                    </p>
                </header>

                <div className="grid min-w-0 grid-cols-12 gap-4 md:gap-5 lg:gap-6">
                    <div
                        className={cn(
                            withdrawSectionBoxClassName,
                            "col-span-12 min-w-0 lg:col-span-7",
                        )}
                        aria-label="출금 메인 영역"
                    >
                        <div
                            className={cn(
                                "flex items-center gap-3 sm:gap-4.5",
                                withdrawPagePaddingX,
                                "pt-5 sm:pt-6 lg:pt-8.5",
                            )}
                        >
                            <div className={withdrawBoxTitleIconClassName}>
                                <BsCashCoin aria-hidden />
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-lg font-extrabold text-white sm:text-xl lg:text-2xl">
                                    출금 정보 입력
                                </h2>
                                <p className="mt-0.5 text-xs leading-relaxed text-[#df7ca5] sm:mt-1 sm:text-sm lg:text-[15px]">
                                    출금받으실 정보를 정확하게 입력해주세요.
                                </p>
                            </div>
                        </div>

                        <div
                            className={cn(
                                "grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 sm:gap-5 sm:pt-6 lg:gap-6",
                                withdrawPagePaddingX,
                            )}
                        >
                            <div className="flex min-w-0 flex-col gap-2">
                                <label
                                    htmlFor="withdraw-holder"
                                    className="text-sm font-bold text-white"
                                >
                                    예금주명
                                </label>
                                <div className="relative">
                                    <BsPersonFill
                                        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#df7ca5] sm:left-5 sm:size-4.5"
                                        aria-hidden
                                    />
                                    <div
                                        id="withdraw-holder"
                                        className={cn(
                                            withdrawInputClassName,
                                            "flex items-center",
                                        )}
                                    >
                                        {userBankInfo.accountHolder}
                                    </div>
                                </div>
                            </div>
                            <div className="flex min-w-0 flex-col gap-2">
                                <label
                                    htmlFor="withdraw-bank"
                                    className="text-sm font-bold text-white"
                                >
                                    은행명
                                </label>
                                <div className="relative">
                                    <BsBank
                                        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#df7ca5] sm:left-5 sm:size-4.5"
                                        aria-hidden
                                    />
                                    <div
                                        id="withdraw-bank"
                                        className={cn(
                                            withdrawInputClassName,
                                            "flex items-center",
                                        )}
                                    >
                                        {userBankInfo.bankName}
                                    </div>
                                </div>
                            </div>
                            <div className="flex min-w-0 flex-col gap-2">
                                <label
                                    htmlFor="withdraw-account"
                                    className="text-sm font-bold text-white"
                                >
                                    출금계좌
                                </label>
                                <div className="relative">
                                    <BsCreditCard2FrontFill
                                        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#df7ca5] sm:left-5 sm:size-4.5"
                                        aria-hidden
                                    />
                                    <div
                                        id="withdraw-account"
                                        className={cn(
                                            withdrawInputClassName,
                                            "flex items-center break-all",
                                        )}
                                    >
                                        {userBankInfo.accountNumber}
                                    </div>
                                </div>
                            </div>
                            <div className="flex min-w-0 flex-col gap-2">
                                <label
                                    htmlFor="withdraw-amount"
                                    className="text-sm font-bold text-white"
                                >
                                    출금금액
                                </label>
                                <div className="relative">
                                    <BsCurrencyDollar
                                        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#df7ca5] sm:left-5 sm:size-4.5"
                                        aria-hidden
                                    />
                                    <input
                                        id="withdraw-amount"
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={
                                            amountInput
                                                ? formatNumber(
                                                    Number(amountInput),
                                                )
                                                : amountInput
                                        }
                                        onChange={(e) => {
                                            const v = e.target.value.replace(
                                                /[^0-9]/g,
                                                "",
                                            );
                                            const numValue = v
                                                ? Number(v)
                                                : 0;
                                            setAmountInput(String(numValue));
                                            setAmount(numValue);
                                        }}
                                        disabled={loading}
                                        placeholder="0"
                                        className={withdrawInputClassName}
                                        aria-label="출금금액"
                                    />
                                </div>
                            </div>
                            <div className="flex min-w-0 flex-col gap-2 sm:col-span-2">
                                <label
                                    htmlFor="withdraw-password"
                                    className="text-sm font-bold text-white"
                                >
                                    출금비밀번호
                                </label>
                                <div className="relative">
                                    <BsLockFill
                                        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#df7ca5] sm:left-5 sm:size-4.5"
                                        aria-hidden
                                    />
                                    <input
                                        id="withdraw-password"
                                        type="password"
                                        value={transactionPassword}
                                        onChange={(e) =>
                                            setTransactionPassword(
                                                e.target.value,
                                            )
                                        }
                                        placeholder="출금비밀번호를 입력하세요"
                                        disabled={loading}
                                        className={withdrawInputClassName}
                                        aria-label="출금비밀번호"
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            className={cn(
                                "flex flex-col gap-3 pt-6 sm:gap-4 sm:pt-8",
                                withdrawPagePaddingX,
                                "pb-5 sm:pb-6 lg:pb-8.5",
                            )}
                        >
                            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
                                {WITHDRAW_QUICK_AMOUNTS.map(
                                    ({ label, value }) => (
                                        <Button
                                            key={value}
                                            type="button"
                                            variant="darkPink"
                                            onClick={() =>
                                                handlePresetClick(value)
                                            }
                                            disabled={loading}
                                            className={
                                                withdrawQuickButtonClassName
                                            }
                                        >
                                            {label}
                                        </Button>
                                    ),
                                )}
                                <Button
                                    type="button"
                                    variant="darkPink"
                                    onClick={handleAllAmount}
                                    disabled={loading}
                                    className={withdrawQuickButtonClassName}
                                >
                                    전액
                                </Button>
                                <Button
                                    type="button"
                                    variant="darkPink"
                                    onClick={handleReset}
                                    disabled={loading}
                                    className={withdrawQuickButtonClassName}
                                >
                                    정정
                                </Button>
                            </div>
                            <Button
                                type="button"
                                variant="pink"
                                fullWidth
                                shine
                                onClick={() => void handleSubmit()}
                                disabled={loading}
                                loading={loading}
                                leftIcon={
                                    <BsFillSendCheckFill
                                        className="size-4 shrink-0"
                                        aria-hidden
                                    />
                                }
                                className={withdrawSubmitButtonClassName}
                            >
                                {loading ? "처리중..." : "출금신청 하기"}
                            </Button>
                        </div>

                        <div
                            className={cn(
                                "mt-2 w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]",
                                "rounded-xl sm:rounded-2xl",
                            )}
                        >
                            <div className="min-w-120 sm:min-w-0">
                                <Table<WithdrawRecord>
                                    columns={withdrawHistoryColumns}
                                    data={tableData}
                                    isLoading={false}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 flex flex-col gap-4 lg:col-span-5 lg:gap-5">
                        <section
                            className={cn(
                                withdrawSectionBoxClassName,
                                "p-4 sm:p-6 lg:p-8",
                            )}
                            aria-labelledby="withdraw-balance-title"
                        >
                            <div className="mb-5 flex items-center gap-2.5 text-lg font-extrabold text-white sm:mb-7 sm:gap-3 sm:text-xl">
                                <BsFillWalletFill className="size-5 shrink-0 text-[#df7ca5] sm:size-6" />
                                <h2
                                    id="withdraw-balance-title"
                                    className="text-lg font-extrabold text-white sm:text-xl"
                                >
                                    보유 금액
                                </h2>
                            </div>
                            <div
                                className={cn(
                                    "rounded-2xl bg-[linear-gradient(135deg,rgba(17,39,52,.96),rgba(8,20,29,.96))] p-4 text-center sm:rounded-3xl sm:p-7",
                                )}
                            >
                                <div className="mb-3 text-sm font-extrabold text-[#df7ca5] sm:mb-4 sm:text-base">
                                    현재 출금 가능 금액
                                </div>
                                <div className="text-2xl font-extrabold tracking-[-0.5px] text-white sm:text-3xl sm:tracking-[-1px] lg:text-4xl">
                                    {formatNumber(availableBalance)}
                                </div>
                            </div>
                        </section>

                        <section
                            className={cn(
                                withdrawSectionBoxClassName,
                                "p-4 sm:p-6 lg:p-8",
                            )}
                            aria-labelledby="withdraw-notice-title"
                        >
                            <div className="mb-5 flex items-center gap-2.5 text-lg font-extrabold text-white sm:mb-7 sm:gap-3 sm:text-xl">
                                <BsExclamationTriangleFill className="size-5 shrink-0 text-[#df7ca5] sm:size-6" />
                                <h2
                                    id="withdraw-notice-title"
                                    className="text-lg font-extrabold text-white sm:text-xl"
                                >
                                    출금 안내사항
                                </h2>
                            </div>
                            <ul className="space-y-3 text-xs leading-[1.7] text-white/95 sm:space-y-4 sm:text-sm sm:leading-[1.75] lg:text-[15px] lg:leading-[1.8]">
                                {sidebarNoticeLines.map((line, idx) => (
                                    <li
                                        key={`${idx}-${line}`}
                                        className="flex items-start gap-2.5 sm:items-center sm:gap-3"
                                    >
                                        <span
                                            className="size-2 shrink-0 rounded-full bg-[#df7ca5]"
                                            aria-hidden
                                        />
                                        <span>{line}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
};

export default WithdrawPage;
