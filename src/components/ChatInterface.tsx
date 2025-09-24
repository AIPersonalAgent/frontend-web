import React, { useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import MessageItem from "./MessageItem";
import ChatInput from "./ChatInput";
import SessionList from "./SessionList";
import { useI18n } from "../i18n/hooks";

const ChatInterface: React.FC = () => {
  const {
    sessions,
    currentSession,
    messages,
    isLoading,
    selectSession,
    sendMessage,
    refreshSessions,
  } = useChat();
  const { t } = useI18n();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refreshSessions();
  }, [refreshSessions]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* 侧边栏 - 会话列表 */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {t("chat.sessionListTitle")}
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <SessionList
            sessions={sessions}
            currentSession={currentSession}
            onSelectSession={selectSession}
          />
        </div>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={refreshSessions}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {t("chat.refreshSessions")}
          </button>
        </div>
      </div>

      {/* 主聊天区域 */}
      <div className="flex-1 flex flex-col">
        {currentSession ? (
          <>
            {/* 聊天头部 */}
            <div className="bg-white border-b border-gray-200 p-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {currentSession.title}
              </h1>
            </div>

            {/* 消息区域 */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {isLoading && messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  {t("chat.loading")}
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  {t("chat.startConversation")}
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <MessageItem key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* 输入区域 */}
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <h2 className="text-2xl font-semibold mb-4">
                {t("chat.welcomeTitle")}
              </h2>
              <p>{t("chat.welcomeSubtitle")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
