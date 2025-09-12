import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Session, Message } from '../types';
import { ApiClient } from '../utils/api';

interface ChatContextType {
  sessions: Session[];
  currentSession: Session | null;
  messages: Message[];
  isLoading: boolean;
  selectSession: (session: Session) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  refreshSessions: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshSessions = useCallback(async () => {
    try {
      setIsLoading(true);
      // 这里应该调用实际的API
      // const response = await ApiClient.getSessions();
      
      // 模拟数据
      const mockSessions: Session[] = [
        { id: '1', title: '欢迎会话', createdAt: '2024-01-01T10:00:00Z', updatedAt: '2024-01-01T10:30:00Z' },
        { id: '2', title: '技术问题', createdAt: '2024-01-02T14:00:00Z', updatedAt: '2024-01-02T15:00:00Z' },
      ];
      setSessions(mockSessions);
    } catch (error) {
      console.error('获取会话列表失败:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectSession = useCallback(async (session: Session) => {
    try {
      setIsLoading(true);
      setCurrentSession(session);
      
      // 这里应该调用实际的API
      // const response = await ApiClient.getMessages(session.id);
      
      // 模拟消息数据
      const mockMessages: Message[] = [
        { id: '1', sessionId: session.id, content: '你好！我是AI助手，有什么可以帮您的？', role: 'assistant' as const, timestamp: '2024-01-01T10:00:00Z' },
        { id: '2', sessionId: session.id, content: '我想了解这个聊天机器人的功能', role: 'user' as const, timestamp: '2024-01-01T10:05:00Z' },
        { id: '3', sessionId: session.id, content: '这是一个基于React和Tailwind CSS构建的聊天机器人界面，支持响应式设计。', role: 'assistant' as const, timestamp: '2024-01-01T10:06:00Z' },
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      setMessages(mockMessages);
    } catch (error) {
      console.error('获取消息失败:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!currentSession) return;

    try {
      setIsLoading(true);
      
      // 添加用户消息
      const userMessage: Message = {
        id: Date.now().toString(),
        sessionId: currentSession.id,
        content,
        role: 'user' as const,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [userMessage, ...prev]);
      
      // 这里应该调用实际的API
      // const response = await ApiClient.sendQuestion(currentSession.id, content);
      
      // 模拟AI回复
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          sessionId: currentSession.id,
          content: `收到您的消息: "${content}"。这是模拟的AI回复。`,
          role: 'assistant' as const,
          timestamp: new Date().toISOString(),
        };
        
        setMessages(prev => [aiMessage, ...prev]);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('发送消息失败:', error);
      setIsLoading(false);
    }
  }, [currentSession]);

  const value = {
    sessions,
    currentSession,
    messages,
    isLoading,
    selectSession,
    sendMessage,
    refreshSessions,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};