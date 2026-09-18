export interface User {
  id: string;
  userName: string;
  nickName: string;
  role: string;
  balanceMoney: number;
  balancePoint: number;
  balancePot: number;
  bankHolder?: string;
  bankName?: string;
  bankNo?: string;
}

export interface AuthResult {
  token: string;
  user: User;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  result: AuthResult;
}

export interface MessageThreadSummary {
  id?: string;
  subject?: string;
  createdBy?: string;
  recipientUsername?: string;
  lastMessageAt?: string;
  createdAt?: string;
  unreadByRecipient?: boolean;
  unreadBySender?: boolean;
}

export interface QnAItem {
  id: string;
  title: string;
  message?: string;
  answer?: string;
  status: string;
  isRead: boolean;
  createdAt: string;
  userName?: string;
  answeredByName?: string;
  answeredAt?: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  message?: string;
  isRead?: boolean;
}
