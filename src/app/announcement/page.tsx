"use client";

import Table, { type Column } from "@/components/ui/Table";
import { AuthGuard } from "@/components/providers/AuthGuard";
import { cn } from "@/utils/classNames";

const ANNOUNCEMENT_TABLE_HEAD_CLASS = cn(
    "bg-[linear-gradient(135deg,rgba(72,20,40,0.98)_0%,rgba(40,12,24,0.98)_45%,rgba(18,6,12,0.99)_100%)]",
);

const announcementTableShellClassName = cn(
    "relative min-h-0 overflow-hidden rounded-2xl sm:rounded-[28px] lg:rounded-[32px]",
    "border border-[rgba(255,170,210,0.10)]",
    "bg-[linear-gradient(180deg,rgba(52,16,30,0.98)_0%,rgba(30,10,18,0.98)_45%,rgba(14,5,9,0.99)_100%)]",
    "shadow-[0_14px_40px_rgba(0,0,0,0.34),0_0_24px_rgba(184,46,102,0.08)]",
);

type NoticeRow = {
    id: string;
    rowNo: number;
    title: string;
    author: string;
};

const ANNOUNCEMENT_COLUMNS: Column<NoticeRow>[] = [
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
        key: "author",
        label: "작성자",
        align: "right",
        width: 100,
        headerClassName: "pr-4 text-right sm:pr-6",
        render: (row) => (
            <span className="block pr-3 text-right text-sm sm:pr-5">{row.author}</span>
        ),
    },
];

const AnnouncementPage = () => {
    return (
        <AuthGuard>
            <div className="mx-auto w-full min-w-0 max-w-350 px-3 py-8 sm:px-4 sm:py-10 lg:py-14">
                <header className="mb-6 w-full sm:mb-8">
                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[3px] text-[#df7ca5] sm:mb-2.5 sm:text-xs sm:tracking-[4px]">
                        CUSTOMER NOTICE
                    </p>
                    <h1 className="mb-2 text-3xl font-black tracking-[-1px] text-white sm:mb-3 sm:text-4xl sm:tracking-[-1.5px] lg:text-[48px] lg:tracking-[-2px]">
                        공지사항
                    </h1>
                    <p className="text-sm leading-[1.75] text-[#df7ca5]">
                        최신 공지사항 및 이벤트 소식을 빠르게 확인하실 수 있습니다.
                    </p>
                </header>

                <div className={cn(announcementTableShellClassName, "min-w-0")}>
                    <div
                        className={cn(
                            "w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]",
                            "rounded-2xl sm:rounded-[28px] lg:rounded-4xl",
                        )}
                    >
                        <div className="min-w-120 sm:min-w-0">
                            <Table<NoticeRow>
                                columns={ANNOUNCEMENT_COLUMNS}
                                data={[]}
                                isLoading={false}
                                theadClassName={ANNOUNCEMENT_TABLE_HEAD_CLASS}
                                headerClassName="text-sm"
                                cellClassName="text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
};

export default AnnouncementPage;
