
export interface HistoryLog {
  date: string;
  count: number;
}

export interface User {
  id: string;
  name: string;
  mobile?: string;
  startDate: string;
  count: number;
  history: HistoryLog[];
}

export interface CustomerData {
  user: User | null;
  lastUpdated: string | null;
  notification: string | null;
}

export interface QrCodeData {
  userId: string;
  updatedCount: number;
  msg: string;
  notification: string;
}

export enum Theme {
    Light = 'light',
    Dark = 'dark',
    Blue = 'theme-blue'
}

export enum Language {
    EN = 'en',
    AR = 'ar'
}
