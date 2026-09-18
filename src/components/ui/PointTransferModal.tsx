"use client";

import { useState, useMemo, useCallback } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import Table, { type Column } from "@/components/ui/Table";
import { useUser } from "@/components/providers/UserProvider";
import { formatNumber } from "@/utils/format";
import { cn } from "@/utils/classNames";
import { toast } from "sonner";

interface PointTransferModalProps {
  open: boolean;
  onClose: () => void;
}

const transferRowClassName = cn(
  "grid min-h-[50px] grid-cols-[minmax(72px,1fr)_minmax(0,1.1fr)_minmax(88px,1.2fr)] items-stretch p-px text-center text-[10px] text-white sm:grid-cols-3 sm:text-xs",
  "border-t border-b border-t-[rgba(255,255,255,0.05)] border-b-[rgba(0,0,0,0.25)]",
  "rounded-b-lg bg-[rgba(255,255,255,0.08)] transition-[background-color] duration-300 hover:bg-[rgba(255,255,255,0.05)] sm:rounded-b-xl",
);

const transferRowCellClassName = cn(
  "flex min-w-0 items-center justify-center border-r border-[rgba(255,255,255,0.08)]",
  "px-0.5 last:border-r-0 sm:px-1",
);

const transferSubmitButtonClassName = cn(
  "relative z-[1] h-9 min-w-0 max-w-full shrink-0 gap-0.5 rounded-[5px] border border-[#dc3545] px-1.5 text-[10px] sm:h-10 sm:gap-1 sm:px-3 sm:text-xs",
  "bg-[#dc3545] bg-[linear-gradient(#e3603b,#a3321e)] text-white hover:text-white",
  "[text-shadow:0_1px_0_#000]",
);

const transferTableTheadClassName = "bg-[#d2a03a]!";

const transferTableHeaderClassName = cn(
  "h-11 bg-[#d2a03a] text-center text-[11px] text-[#fff] sm:h-[50px] sm:text-xs",
);

const transferTableCellClassName = cn(
  "h-11 bg-transparent! text-center text-[11px] text-[#fff] sm:h-[50px] sm:text-xs",
  "border-t border-b border-t-[rgba(255,255,255,0.05)] border-b-[rgba(0,0,0,0.25)]",
);

const transferTableEmptyClassName = "bg-transparent! text-xs text-white/70";

const transferTableClassName = cn(
  "min-w-[300px] bg-transparent sm:min-w-0",
  "[&_tbody_tr:hover_td]:bg-transparent!",
  "[&_thead_th:first-child]:rounded-tl-lg [&_thead_th:last-child]:rounded-tr-lg",
);

function renderTransferStatus(status: string) {
  const statusMap: Record<string, { text: string; className: string }> = {
    COMPLETED: { text: "완료", className: "text-green-400" },
    PENDING: { text: "대기중", className: "text-orange-400" },
    CANCELLED: { text: "취소", className: "text-red-400" },
  };
  const statusInfo = statusMap[status] || { text: status, className: "" };
  return <span className={statusInfo.className}>{statusInfo.text}</span>;
}

type TransferHistoryRow = {
  id: string;
  displayNo: number;
  amount: number;
  status: string;
  requestDate: string;
};

const transferTableColumns: Column<TransferHistoryRow>[] = [
  { key: "displayNo", label: "NO", align: "center" },
  {
    key: "amount",
    label: "전환포인트",
    align: "center",
    render: (row) => formatNumber(row.amount),
  },
  {
    key: "status",
    label: "상태",
    align: "center",
    render: (row) => renderTransferStatus(row.status),
  },
  { key: "requestDate", label: "신청시간", align: "center" },
];

export function PointTransferModal({ open, onClose }: PointTransferModalProps) {
  const { currentUser } = useUser();
  const [amountInput, setAmountInput] = useState("0");
  const [loading, setLoading] = useState(false);

  const availablePoint = currentUser?.result?.user?.balancePoint || 0;

  const handleAmountInputChange = useCallback(
    (raw: string) => {
      const v = raw.replace(/[^0-9]/g, "");
      const numVal = v ? Number(v) : 0;
      const clampedVal = Math.min(numVal, availablePoint);
      setAmountInput(String(clampedVal));
    },
    [availablePoint],
  );

  const handleReset = useCallback(() => {
    setAmountInput("0");
  }, []);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      toast.success("포인트 전환이 완료되었습니다.");
      handleReset();
    } finally {
      setLoading(false);
    }
  }, [handleReset]);

  const modalRows: TransferHistoryRow[] = useMemo(() => [], []);

  const amountDisplay = amountInput ? formatNumber(Number(amountInput)) : amountInput;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-label="전환"
      className={cn(
        "w-full max-w-[calc(100vw-2rem)] min-h-[min(480px,90vh)] sm:min-h-[min(580px,88vh)] lg:max-w-4xl lg:min-h-[min(660px,86vh)]",
      )}
      contentClassName="flex min-h-0 flex-1 flex-col"
    >
      <h2 className="mb-4 shrink-0 text-left text-xl font-extrabold text-white sm:mb-6 sm:text-2xl md:mb-8 lg:text-4xl">
        전환
      </h2>
      <div className="flex min-h-0 w-full flex-1 flex-col bg-black/30 p-3 sm:p-4 md:p-6">
        <div className={cn(transferRowClassName, "shrink-0")}>
          <div className={transferRowCellClassName}>
            <span className="truncate px-0.5 sm:px-1">보유포인트</span>
          </div>
          <div className={transferRowCellClassName}>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={amountDisplay}
              onChange={(e) => handleAmountInputChange(e.target.value)}
              disabled={loading}
              title={`보유: ${formatNumber(availablePoint)} P`}
              aria-label={`전환 포인트, 보유 ${formatNumber(availablePoint)} P`}
              placeholder="0"
              className="w-full min-w-0 bg-transparent text-center text-[11px] text-white outline-none placeholder:text-white/40 sm:text-xs"
            />
          </div>
          <div className={cn(transferRowCellClassName, "px-1 sm:px-2")}>
            <Button
              type="button"
              variant="transparent"
              loading={loading}
              disabled={loading}
              className={transferSubmitButtonClassName}
              onClick={() => void handleSubmit()}
            >
              <span aria-hidden>✓</span>
              <span className="truncate">포인트전환</span>
            </Button>
          </div>
        </div>

        <div className="mt-3 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg sm:mt-4">
          <div className="scrollbar min-h-0 flex-1 overflow-x-auto overflow-y-auto">
            <Table<TransferHistoryRow>
              columns={transferTableColumns}
              data={modalRows}
              isLoading={false}
              theadClassName={transferTableTheadClassName}
              headerClassName={transferTableHeaderClassName}
              cellClassName={transferTableCellClassName}
              emptyRowClassName={transferTableEmptyClassName}
              tableClassName={transferTableClassName}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
