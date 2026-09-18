"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/classNames";
import { toast } from "sonner";

const whiteFieldClassName = cn(
  "w-full rounded-xl border-0 bg-white px-4 py-3 text-sm text-[#04151d]",
  "placeholder:text-sm placeholder:text-gray-400",
  "focus:outline-none focus:ring-2 focus:ring-[#df7ca5]/35",
);

const writeActionButtonClassName =
  "h-12 min-w-28 rounded-2xl text-sm";

export default function InquiriesWritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }
    if (!message.trim()) {
      toast.error("내용을 입력해주세요.");
      return;
    }
    if (title.length > 200) {
      toast.error("제목은 200자를 초과할 수 없습니다.");
      return;
    }
    if (message.length > 1000) {
      toast.error("내용은 1000자를 초과할 수 없습니다.");
      return;
    }

    try {
      setLoading(true);
      toast.success("문의가 등록되었습니다.");
      router.push("/inquiries");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div className="mx-auto w-full min-w-0 max-w-350 px-3 py-8 sm:px-4 sm:py-10 lg:py-14">
        <header className="mb-8 w-full sm:mb-10">
          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[3px] text-[#df7ca5] sm:mb-2.5 sm:text-xs sm:tracking-[4px]">
            24 HOURS SUPPORT
          </p>
          <h1 className="mb-2 text-3xl font-black tracking-[-1px] text-white sm:mb-3 sm:text-4xl sm:tracking-[-1.5px] lg:text-[48px] lg:tracking-[-2px]">
            고객센터
          </h1>
          <p className="text-sm leading-[1.75] text-[#df7ca5]">
            와인카지노 고객센터는 24시간 빠르고 안전한 상담 서비스를 제공합니다.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={200}
            disabled={loading}
            className={cn(whiteFieldClassName, "h-12")}
          />

          <textarea
            placeholder=""
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={1000}
            disabled={loading}
            rows={16}
            className={cn(whiteFieldClassName, "min-h-90 resize-y")}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Link href="/inquiries">
              <Button
                type="button"
                variant="darkBlue"
                className={writeActionButtonClassName}
              >
                목록
              </Button>
            </Link>
            <Button
              type="submit"
              variant="darkBlue"
              loading={loading}
              className={writeActionButtonClassName}
            >
              글쓰기
            </Button>
          </div>
        </form>
      </div>
    </AuthGuard>
  );
}
