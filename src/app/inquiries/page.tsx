"use client";

import Table, { type Column } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/classNames";

const INQUIRY_TABLE_HEAD_CLASS = cn(
  "bg-[linear-gradient(135deg,rgba(72,20,40,0.98)_0%,rgba(40,12,24,0.98)_45%,rgba(18,6,12,0.99)_100%)]",
);

interface InquiryRow {
  id: string;
  rowNo: number;
  title: string;
  createdAt: string;
  status: string;
  statusClass: string;
}

const INQUIRY_COLUMNS: Column<InquiryRow>[] = [
  {
    key: "rowNo",
    label: "번호",
    align: "left",
    width: 80,
    headerClassName: "pl-4 text-left sm:pl-6",
    render: (row) => (
      <span className="block pl-3 text-left text-sm sm:pl-5">{row.rowNo}</span>
    ),
  },
  {
    key: "title",
    label: "제목",
    align: "center",
    render: (row) => <span className="text-sm">{row.title}</span>,
  },
  {
    key: "createdAt",
    label: "작성일",
    align: "center",
    width: 120,
    render: (row) => <span className="text-sm">{row.createdAt}</span>,
  },
  {
    key: "status",
    label: "상태",
    align: "right",
    width: 100,
    headerClassName: "pr-4 text-right sm:pr-6",
    render: (row) => (
      <span className={cn("block pr-3 text-right sm:pr-5", row.statusClass)}>
        {row.status}
      </span>
    ),
  },
];

const InquiriesPage = () => {
  const router = useRouter();

  return (
    <AuthGuard>
      <div className="mx-auto w-full min-w-0 max-w-350 px-3 py-8 sm:px-4 sm:py-10 lg:py-14">
        <header className="mb-6 w-full sm:mb-8">
          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[3px] text-[#df7ca5] sm:mb-2.5 sm:text-xs sm:tracking-[4px]">
            24 HOURS SUPPORT
          </p>
          <h1 className="mb-2 text-3xl font-black tracking-[-1px] text-white sm:mb-3 sm:text-4xl sm:tracking-[-1.5px] lg:text-[48px] lg:tracking-[-2px]">
            고객센터
          </h1>
          <p className="text-sm leading-[1.75] text-[#df7ca5]">
            KSKY SOLUTION 고객센터는 24시간 빠르고 안전한 상담 서비스를 제공합니다.
          </p>
        </header>

        <div
          className={cn(
            "w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]",
            "rounded-lg",
          )}
        >
          <div className="min-w-120 sm:min-w-0">
            <Table<InquiryRow>
              columns={INQUIRY_COLUMNS}
              data={[]}
              isLoading={false}
              theadClassName={INQUIRY_TABLE_HEAD_CLASS}
              headerClassName="text-sm"
              cellClassName="text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end p-2.5 sm:px-4 sm:py-3">
          <Button
            type="button"
            variant="darkBlue"
            onClick={() => router.push("/inquiries/write")}
            className="h-10 px-5 rounded-lg lg:rounded-2xl lg:min-w-28 text-sm lg:h-12"
          >
            글쓰기
          </Button>
        </div>
      </div>
    </AuthGuard>
  );
};

export default InquiriesPage;
