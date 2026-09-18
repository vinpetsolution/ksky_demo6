"use client";

import { useState, useMemo, useCallback } from "react";
import Table, { type Column } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { formatNumber } from "@/utils/format";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { useUser } from "@/components/providers/UserProvider";
import { toast } from "sonner";
import { cn } from "@/utils/classNames";
import { BsBank2, BsCashStack, BsCheckCircleFill, BsExclamationCircleFill, BsPersonFill, BsWallet2 } from "react-icons/bs";

const depositPagePaddingX = "px-4 sm:px-5 lg:px-[34px]";

const depositSectionBoxClassName = cn(
    "relative min-h-0 overflow-hidden rounded-2xl sm:rounded-[28px] lg:rounded-[32px]",
    "border border-[rgba(255,170,210,0.10)]",
    "bg-[linear-gradient(180deg,rgba(52,16,30,0.98)_0%,rgba(30,10,18,0.98)_45%,rgba(14,5,9,0.99)_100%)]",
    "shadow-[0_14px_40px_rgba(0,0,0,0.34),0_0_24px_rgba(184,46,102,0.08)]",
);

const DEPOSIT_SIDEBAR_DEFAULT_NOTICE = [
    "입금자명과 회원명이 다를 경우 반드시 고객센터로 문의해주세요.",
    "입금 후 평균 10초~1분 내 자동 충전 처리됩니다.",
    "점검시간에는 입금 처리가 지연될 수 있습니다.",
    "충전 관련 문의는 24시간 고객센터를 이용해주세요.",
] as const;

const depositBoxTitleIconClassName = cn(
    "relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-2xl text-white",
    "sm:size-16 sm:rounded-[24px] sm:text-[28px] lg:size-[82px] lg:rounded-[30px] lg:text-[34px]",
    "border border-[rgba(255,170,210,0.12)]",
    "bg-[linear-gradient(145deg,rgba(72,20,40,0.98)_0%,rgba(40,10,22,0.98)_45%,rgba(18,5,10,0.99)_100%)]",
    "shadow-[0_14px_34px_rgba(0,0,0,0.36),0_0_24px_rgba(184,46,102,0.10),inset_0_1px_0_rgba(255,255,255,0.04)]",
    "backdrop-blur-[14px]",
    "transition-all duration-300 ease-out",
    "before:pointer-events-none before:absolute before:top-[-30%] before:left-[-40%] before:h-[180%] before:w-[70%] before:rotate-[28deg] before:opacity-55 before:content-['']",
    "before:bg-[linear-gradient(180deg,rgba(255,255,255,0.45),transparent)]",
    "after:pointer-events-none after:absolute after:inset-[-2px] after:rounded-2xl after:border after:border-[rgba(94,255,217,0.28)] after:opacity-80 after:content-['']",
    "sm:after:rounded-[24px] lg:after:rounded-[30px]",
    "group-hover/depositMain:-translate-y-1 group-hover/depositMain:scale-[1.04]",
    "group-hover/depositMain:shadow-[0_16px_40px_rgba(67,207,255,0.24),0_0_26px_rgba(94,255,217,0.16)]",
);

/** Cùng style input LoginModal (`loginInputClassName`) */
const depositInputClassName = cn(
    "h-14 w-full appearance-none rounded-2xl border border-[rgba(255,170,210,0.10)] outline-none sm:h-[64px] sm:rounded-[18px]",
    "bg-[linear-gradient(135deg,rgba(68,18,38,0.98)_0%,rgba(40,10,22,0.98)_45%,rgba(18,5,10,0.99)_100%)]",
    "py-0 pl-12 pr-4 text-sm text-[#fff4f7] placeholder:text-[#df7ca5]/45 sm:pl-[58px] sm:pr-5 sm:text-[15px]",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_0_18px_rgba(184,46,102,0.06)]",
    "transition-[border-color,box-shadow,transform] duration-350 ease-out",
    "focus:border-[rgba(255,170,210,0.22)]",
    "focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_22px_rgba(184,46,102,0.12)]",
);

const DEPOSIT_QUICK_AMOUNTS = [
    { label: "+10만", value: 100_000 },
    { label: "+30만", value: 300_000 },
    { label: "+50만", value: 500_000 },
    { label: "+100만", value: 1_000_000 },
] as const;

const depositQuickButtonClassName = cn(
    "h-11 w-full rounded-2xl px-3 text-xs font-bold text-white sm:h-12 sm:w-auto sm:min-w-24 sm:px-4 sm:text-sm",
    "hover:text-[#04151d] hover:bg-[linear-gradient(135deg,#df7ca5,#df7ca5)]",
    "hover:border-[#df7ca5] border-none",
);

const depositSubmitButtonClassName = cn(
    "relative h-12 w-full gap-2 overflow-hidden rounded-2xl border text-sm font-extrabold sm:h-14 sm:text-base lg:h-15",
    "transition-all duration-300 ease-out",
    "hover:-translate-y-1 hover:border-[rgba(94,255,217,0.24)]",
    "hover:shadow-[0_18px_40px_rgba(0,0,0,0.40),0_0_30px_rgba(94,255,217,0.12),0_0_20px_rgba(67,207,255,0.10)]",
);

interface DepositRecord {
    id: string;
    rowNo: number;
    amount: number;
    status: string;
    requestDate: string;
    processDate: string;
}

const DepositPage = () => {
    const { currentUser } = useUser();
    const [amount, setAmount] = useState(0);
    const [amountInput, setAmountInput] = useState("0");
    const [loading, setLoading] = useState(false);

    const EMPTY_BANK_LABEL = "관리자가 등록한 입금 계좌가 없습니다";
    const displayBankName = EMPTY_BANK_LABEL;
    const displayBankAccount = EMPTY_BANK_LABEL;
    const displayDepositorName = EMPTY_BANK_LABEL;

    const memberDepositorDisplay =
        currentUser?.result?.user?.bankHolder?.trim() ||
        currentUser?.result?.user?.nickName?.trim() ||
        currentUser?.result?.user?.userName?.trim() ||
        "—";

    const sidebarNoticeLines = useMemo(
        () => [...DEPOSIT_SIDEBAR_DEFAULT_NOTICE],
        [],
    );

    const tableData: DepositRecord[] = [];

    const depositHistoryColumns: Column<DepositRecord>[] = useMemo(
        () => [
            {
                key: "rowNo",
                label: "No.",
                align: "center",
                width: 56,
            },
            {
                key: "amount",
                label: "충전액",
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

    const handleReset = () => {
        setAmount(0);
        setAmountInput("0");
    };

    const handleSubmit = useCallback(async () => {
        setLoading(true);
        try {
            toast.success("입금 신청이 완료되었습니다.");
            handleReset();
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <AuthGuard>
            <div className="mx-auto w-full min-w-0 max-w-350 px-3 py-8 sm:px-4 sm:py-10 lg:py-14">
                <header className="mb-6 w-full sm:mb-8">
                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[3px] text-[#df7ca5] sm:mb-2.5 sm:text-xs sm:tracking-[4px]">
                        FAST &amp; SAFE PAYMENT
                    </p>
                    <h1 className="mb-2 text-3xl font-black tracking-[-1px] text-white sm:mb-3 sm:text-4xl sm:tracking-[-1.5px] lg:text-[48px] lg:tracking-[-2px]">
                        입금신청
                    </h1>
                    <p className="text-sm leading-[1.75] text-[#df7ca5] sm:text-base sm:leading-[1.9]">
                        글로벌 인기 카지노 게임사를 실시간 라이브 환경에서 만나보세요. 안전한
                        입금 절차로 빠르게 충전하실 수 있습니다.
                    </p>
                </header>

                <div className="grid min-w-0 grid-cols-12 gap-4 md:gap-5 lg:gap-6">
                    <div
                        className={cn(
                            depositSectionBoxClassName,
                            "col-span-12 min-w-0 lg:col-span-7",
                        )}
                        aria-label="입금 메인 영역"
                    >
                        <div
                            className={cn(
                                "group/depositMain flex items-center gap-3 sm:gap-4.5",
                                depositPagePaddingX,
                                "pt-5 sm:pt-6 lg:pt-8.5",
                            )}
                        >
                            <div className={depositBoxTitleIconClassName}>
                                <BsWallet2
                                    className="relative z-10 [text-shadow:0_0_14px_rgba(255,255,255,0.10)]"
                                    aria-hidden
                                />
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-lg font-extrabold text-white sm:text-xl lg:text-2xl">
                                    입금 정보 입력
                                </h2>
                                <p className="mt-0.5 text-xs leading-relaxed text-[#df7ca5] sm:mt-1 sm:text-sm lg:text-[15px]">
                                    입금하실 정보를 정확하게 입력해주세요.
                                </p>
                            </div>
                        </div>

                        <div
                            className={cn(
                                "grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 sm:gap-5 sm:pt-6 lg:gap-6",
                                depositPagePaddingX,
                            )}
                        >
                            <div className="flex min-w-0 flex-col gap-2">
                                <label
                                    htmlFor="deposit-depositor-name"
                                    className="text-sm font-bold text-white"
                                >
                                    입금자명
                                </label>
                                <div className="relative">
                                    <BsPersonFill
                                        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#df7ca5] sm:left-5 sm:size-4.5"
                                        aria-hidden
                                    />
                                    <div
                                        id="deposit-depositor-name"
                                        className={cn(
                                            depositInputClassName,
                                            "flex items-center",
                                        )}
                                    >
                                        {memberDepositorDisplay}
                                    </div>
                                </div>
                            </div>
                            <div className="flex min-w-0 flex-col gap-2">
                                <label
                                    htmlFor="deposit-amount"
                                    className="text-sm font-bold text-white"
                                >
                                    입금금액
                                </label>
                                <div className="relative">
                                    <BsCashStack
                                        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#df7ca5] sm:left-5 sm:size-4.5"
                                        aria-hidden
                                    />
                                    <input
                                        id="deposit-amount"
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={
                                            amountInput
                                                ? formatNumber(Number(amountInput))
                                                : amountInput
                                        }
                                        onChange={(e) => {
                                            const v = e.target.value.replace(
                                                /[^0-9]/g,
                                                "",
                                            );
                                            const numVal = v ? Number(v) : 0;
                                            setAmountInput(String(numVal));
                                            setAmount(numVal);
                                        }}
                                        disabled={loading}
                                        placeholder="0"
                                        className={depositInputClassName}
                                        aria-label="입금금액"
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            className={cn(
                                "flex flex-col gap-3 pt-6 sm:gap-4 sm:pt-8",
                                depositPagePaddingX,
                                "pb-5 sm:pb-6 lg:pb-8.5",
                            )}
                        >
                            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
                                {DEPOSIT_QUICK_AMOUNTS.map(({ label, value }) => (
                                    <Button
                                        key={value}
                                        type="button"
                                        variant="darkPink"
                                        onClick={() => handlePresetClick(value)}
                                        disabled={loading}
                                        className={depositQuickButtonClassName}
                                    >
                                        {label}
                                    </Button>
                                ))}
                                <Button
                                    type="button"
                                    variant="darkPink"
                                    onClick={handleReset}
                                    disabled={loading}
                                    className={cn(
                                        depositQuickButtonClassName,
                                    )}
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
                                leftIcon={<BsCheckCircleFill className="size-4 shrink-0" aria-hidden />}
                                className={depositSubmitButtonClassName}
                            >

                                {loading ? "처리중..." : "입금신청 하기"}
                            </Button>
                        </div>


                        <div
                            className={cn(
                                "mt-2 w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]",
                                "rounded-xl sm:rounded-2xl",
                            )}
                        >
                            <div className="min-w-160 sm:min-w-0">
                                <Table<DepositRecord>
                                    columns={depositHistoryColumns}
                                    data={tableData}
                                    isLoading={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 flex flex-col gap-4 lg:col-span-5 lg:gap-5">
                        <section
                            className={cn(
                                depositSectionBoxClassName,
                                "p-4 sm:p-6 lg:p-8",
                            )}
                            aria-labelledby="deposit-account-guide-title"
                        >
                            <div className="mb-5 flex items-center gap-2.5 text-lg font-extrabold text-white sm:mb-7 sm:gap-3 sm:text-xl">
                                <BsBank2 className="size-5 shrink-0 text-[#df7ca5] sm:size-6" />
                                <h2
                                    id="deposit-account-guide-title"
                                    className="text-lg font-extrabold text-white sm:text-xl"
                                >
                                    충전 계좌안내
                                </h2>
                            </div>
                            <div
                                className={cn(
                                    "rounded-2xl bg-[linear-gradient(135deg,rgba(17,39,52,.96),rgba(8,20,29,.96))] p-4 text-center sm:rounded-3xl sm:p-7",
                                )}
                            >
                                <div className="mb-3 text-base font-extrabold text-[#df7ca5] sm:mb-4 sm:text-lg">
                                    {displayBankName}
                                </div>
                                <div className="mb-2.5 break-all text-xl font-extrabold tracking-[-0.5px] text-white sm:mb-3.5 sm:text-2xl sm:tracking-[-1px] lg:text-3xl">
                                    {displayBankAccount}
                                </div>
                                <div className="text-sm text-[#df7ca5] sm:text-[15px]">
                                    {displayDepositorName}
                                </div>
                            </div>
                        </section>

                        <section
                            className={cn(
                                depositSectionBoxClassName,
                                "p-4 sm:p-6 lg:p-8",
                            )}
                            aria-labelledby="deposit-notice-title"
                        >
                            <div className="mb-5 flex items-center gap-2.5 text-lg font-extrabold text-white sm:mb-7 sm:gap-3 sm:text-xl">
                                <BsExclamationCircleFill className="size-5 shrink-0 text-[#df7ca5] sm:size-6" />
                                <h2
                                    id="deposit-notice-title"
                                    className="text-lg font-extrabold text-white sm:text-xl"
                                >
                                    입금 안내사항
                                </h2>
                            </div>
                            <ul className="space-y-3 text-xs leading-[1.7] text-white/95 sm:space-y-4 sm:text-sm sm:leading-[1.75] lg:text-[15px] lg:leading-[1.8]">
                                {sidebarNoticeLines.map((line, idx) => (
                                    <li key={`${idx}-${line}`} className="flex items-start gap-2.5 sm:items-center sm:gap-3">
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

export default DepositPage;
