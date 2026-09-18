import type { MessageThreadSummary } from "@/types";
import { cn } from "@/utils/classNames";

export const messageWineGradientClassName = cn(
  "bg-[radial-gradient(circle_at_top_right,rgba(255,130,170,0.10),transparent_35%),linear-gradient(135deg,rgba(78,16,36,0.98),rgba(28,6,14,0.98))]",
);

export const messageListBoxClassName = cn(
  "overflow-hidden rounded-2xl sm:rounded-[28px] lg:rounded-[32px]",
  "border border-[rgba(255,170,200,0.12)]",
  "shadow-[0_14px_40px_rgba(0,0,0,0.30)]",
  messageWineGradientClassName,
);

export const messageTableScrollMinWidthClassName = "min-w-[520px] sm:min-w-0";

export const messageTableHeaderClassName =
  "h-14 text-sm font-extrabold text-[#df7ca5] sm:h-[78px] sm:text-base";

export const messageTableCellClassName =
  "text-sm h-12 sm:h-[50px] px-1 sm:px-2";

export const messageActionsRowClassName =
  "mt-4 flex w-full flex-row flex-wrap gap-2 sm:mt-5 sm:gap-3";

export const messageActionButtonClassName = cn(
  "inline-flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-[18px]",
  "border border-[rgba(255,170,200,0.12)] text-sm font-bold text-[#dffcff]",
  "transition-all duration-350 ease-out sm:h-14 sm:flex-none sm:min-w-[160px] sm:gap-2.5",
  messageWineGradientClassName,
  "hover:bg-[linear-gradient(135deg,#df7ca5,#df7ca5)] hover:text-[#04151d]",
  "disabled:pointer-events-none disabled:opacity-45",
);

export const messageTableHeadClassName = messageWineGradientClassName;

export const messageUnreadRowClassName = cn(
  messageWineGradientClassName,
  "[&_td]:border-[rgba(255,170,200,0.12)]",
  "[&_td]:bg-[radial-gradient(circle_at_top_right,rgba(255,130,170,0.10),transparent_35%),linear-gradient(135deg,rgba(78,16,36,0.98),rgba(28,6,14,0.98))]",
);

export function sortThreadsByDate(
  list: MessageThreadSummary[],
): MessageThreadSummary[] {
  return [...list].sort((a, b) => {
    const ta = new Date(a.lastMessageAt || a.createdAt || 0).getTime();
    const tb = new Date(b.lastMessageAt || b.createdAt || 0).getTime();
    return tb - ta;
  });
}

export function formatMessageListDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const yy = String(d.getFullYear()).slice(-2);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${yy}-${m}-${day} ${h}:${min}`;
}

export function formatMessageDetailDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return `${y}-${m}-${day} ${h}:${min}:${s}`;
}

export function threadIsUnread(
  row: MessageThreadSummary,
  userName: string,
): boolean {
  if (row.recipientUsername === userName) return row.unreadByRecipient === true;
  if (row.createdBy === userName) return row.unreadBySender === true;
  return false;
}

export function threadSenderLabel(
  row: MessageThreadSummary,
  userName: string,
): string {
  if (row.createdBy && row.createdBy !== userName) {
    return row.createdBy;
  }
  return "운영팀";
}
