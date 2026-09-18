"use client";

import { createContext, useContext, type PropsWithChildren } from "react";

export interface MailboxCountsContextValue {
  messageUnread: number;
  noticeUnread: number;
  qnaUnread: number;
  totalUnread: number;
  refresh: () => Promise<void>;
}

const EMPTY_COUNTS: MailboxCountsContextValue = {
  messageUnread: 0,
  noticeUnread: 0,
  qnaUnread: 0,
  totalUnread: 0,
  refresh: async () => {},
};

const MailboxCountsContext = createContext<MailboxCountsContextValue>(EMPTY_COUNTS);

export function MailboxCountsProvider({ children }: PropsWithChildren) {
  return (
    <MailboxCountsContext.Provider value={EMPTY_COUNTS}>
      {children}
    </MailboxCountsContext.Provider>
  );
}

export function useMailboxCounts(): MailboxCountsContextValue {
  return useContext(MailboxCountsContext);
}
