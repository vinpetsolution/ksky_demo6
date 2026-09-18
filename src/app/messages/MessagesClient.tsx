"use client";

import { BsEnvelopeOpen, BsTrash } from "react-icons/bs";
import Table, { type Column } from "@/components/ui/Table";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { toast } from "sonner";
import { cn } from "@/utils/classNames";
import type { MessageThreadSummary } from "@/types";
import {
  messageActionButtonClassName,
  messageActionsRowClassName,
  messageListBoxClassName,
  messageTableCellClassName,
  messageTableHeaderClassName,
  messageTableHeadClassName,
  messageTableScrollMinWidthClassName,
} from "@/constants/messageUi";

const columns: Column<MessageThreadSummary>[] = [
  {
    key: "subject",
    label: "제목",
    align: "left",
    headerClassName: "pl-3 text-left text-[#df7ca5] sm:pl-6",
    render: (row) => (
      <span className="block max-w-full truncate pl-2 text-left text-sm text-white sm:pl-4">
        {row.subject || "(제목 없음)"}
      </span>
    ),
  },
  {
    key: "sender",
    label: "보낸사람",
    align: "center",
    width: 120,
    headerClassName: "text-[#df7ca5]",
    render: () => <span className="text-xs text-white/90 sm:text-sm">운영팀</span>,
  },
  {
    key: "date",
    label: "날짜",
    align: "center",
    width: 130,
    headerClassName: "text-[#df7ca5]",
    render: () => <span className="text-xs text-white/80 sm:text-sm">—</span>,
  },
  {
    key: "status",
    label: "상태",
    align: "center",
    width: 100,
    headerClassName: "pr-3 text-[#df7ca5] sm:pr-6",
    render: () => (
      <span className="inline-flex justify-center pr-2 sm:pr-4">
        <span className="rounded-full bg-[rgba(0,0,0,0.35)] px-3 py-1 text-xs font-bold text-white/70">
          읽음
        </span>
      </span>
    ),
  },
];

export default function MessagesClient() {
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
          <p className="text-sm leading-[1.75] text-[#df7ca5]">
            운영팀 및 고객센터로부터 전달된 다양한 알림과 메시지를 확인할 수
            있습니다.
          </p>
        </header>

        <div className={cn(messageListBoxClassName, "min-w-0 overflow-hidden")}>
          <div
            className={cn(
              "w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]",
              "rounded-2xl sm:rounded-[28px] lg:rounded-4xl",
            )}
          >
            <div className={messageTableScrollMinWidthClassName}>
              <Table<MessageThreadSummary>
                columns={columns}
                data={[]}
                isLoading={false}
                theadClassName={messageTableHeadClassName}
                headerClassName={messageTableHeaderClassName}
                cellClassName={messageTableCellClassName}
              />
            </div>
          </div>
        </div>

        <div className={messageActionsRowClassName}>
          <button
            type="button"
            className={messageActionButtonClassName}
            onClick={() => toast.info("읽지 않은 쪽지가 없습니다.")}
          >
            <BsEnvelopeOpen className="size-4 shrink-0" aria-hidden />
            전체읽기
          </button>
          <button
            type="button"
            className={messageActionButtonClassName}
            onClick={() => toast.info("준비 중입니다.")}
          >
            <BsTrash className="size-4 shrink-0" aria-hidden />
            전체삭제
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}
