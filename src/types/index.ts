import { ApiCode } from '../api/common';

export interface User {
  id: string;
  username: string;
  token?: string;
}

export interface Session {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  sessionId: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export interface ApiResponse<T = any> {
  code: keyof typeof ApiCode;
  message: string;
  data?: T;
}