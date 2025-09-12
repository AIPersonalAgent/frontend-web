import { ApiResponse, Session, Message } from '../types';
import { LoginRequest } from '../api/user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiClient {
  private static getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async login(credentials: {username: string, password: string}): Promise<ApiResponse<{ token: string }>> {
    const request: LoginRequest = {
      username: credentials.username,
      password: credentials.password
    };
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  static async getSessions(): Promise<ApiResponse<Session[]>> {
    return this.request('/session/getsessions');
  }

  static async getMessages(sessionId: string): Promise<ApiResponse<Message[]>> {
    return this.request(`/sessions/getmessages?sessionId=${sessionId}`);
  }

  static async sendQuestion(sessionId: string, content: string): Promise<ApiResponse<Message>> {
    return this.request('/chats/question', {
      method: 'POST',
      body: JSON.stringify({ sessionId, content }),
    });
  }
}