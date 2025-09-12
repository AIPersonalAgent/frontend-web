import React from 'react';
import { Session } from '../types';
import { useChat } from '../context/ChatContext';

interface SessionListProps {
  sessions: Session[];
  currentSession: Session | null;
  onSelectSession: (session: Session) => void;
}

const SessionList: React.FC<SessionListProps> = ({ sessions, currentSession, onSelectSession }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return '昨天';
    } else if (diffDays < 7) {
      return `${diffDays}天前`;
    } else {
      return date.toLocaleDateString('zh-CN');
    }
  };

  if (sessions.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        暂无会话记录
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {sessions.map((session) => (
        <div
          key={session.id}
          className={`p-3 rounded-lg cursor-pointer transition-colors ${
            currentSession?.id === session.id
              ? 'bg-blue-100 border border-blue-300'
              : 'hover:bg-gray-100 border border-transparent'
          }`}
          onClick={() => onSelectSession(session)}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 text-sm truncate">
              {session.title}
            </h3>
            <span className="text-xs text-gray-500">
              {formatDate(session.updatedAt)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1 truncate">
            最后更新: {formatDate(session.updatedAt)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SessionList;