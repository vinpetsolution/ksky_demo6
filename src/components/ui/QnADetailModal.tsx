"use client";

import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import type { QnAItem } from "@/types";
import { cn } from "@/utils/classNames";

interface QnADetailModalProps {
  isOpen: boolean;
  qna: QnAItem | null;
  onClose: () => void;
}

function formatKoDateTime(iso?: string | null) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusLabel(status: string): { text: string; className: string } {
  const s = (status || "").toLowerCase();
  if (s === "answered") {
    return { text: "답변완료", className: "text-sm text-green-400" };
  }
  if (s === "closed") {
    return { text: "종료", className: "text-sm text-gray-400" };
  }
  return { text: "답변대기", className: "text-sm text-yellow-400" };
}

const contentBoxClassName = cn(
  "rounded-xl bg-white px-4 py-3 text-sm leading-relaxed text-[#04151d]",
  "whitespace-pre-wrap",
);

export function QnADetailModal({ isOpen, qna, onClose }: QnADetailModalProps) {
  const status = qna ? statusLabel(qna.status) : null;

  return (
    <Modal
      open={isOpen && !!qna}
      onClose={onClose}
      aria-label={qna ? `고객센터 - ${qna.title}` : "고객센터 문의"}
      className="max-w-2xl p-8 sm:p-10"
      contentClassName="max-h-[min(70vh,640px)] overflow-y-auto pr-1"
      footer={
        <Button
          type="button"
          variant="darkBlue"
          onClick={onClose}
          className="h-12 min-w-28 rounded-2xl text-sm"
        >
          닫기
        </Button>
      }
    >
      {qna && status ? (
        <>
          <h2 className="mb-4 pr-10 text-lg font-black text-white sm:text-xl">
            {qna.title}
          </h2>

          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#df7ca5]">
            <span className={status.className}>{status.text}</span>
            <span>신청시간: {formatKoDateTime(qna.createdAt)}</span>
            <span>글쓴이: {qna.userName || "-"}</span>
            {qna.answeredByName ? (
              <>
                <span>답변자: {qna.answeredByName}</span>
                <span>답변시간: {formatKoDateTime(qna.answeredAt)}</span>
              </>
            ) : null}
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-bold text-[#df7ca5]">내용</p>
              <div className={contentBoxClassName}>{qna.message}</div>
            </div>

            <div>
              <p className="mb-2 text-sm font-bold text-[#df7ca5]">답변</p>
              {qna.answer ? (
                <div className={contentBoxClassName}>{qna.answer}</div>
              ) : (
                <p className="text-sm text-white/60">
                  아직 답변이 등록되지 않았습니다.
                </p>
              )}
            </div>
          </div>
        </>
      ) : null}
    </Modal>
  );
}
