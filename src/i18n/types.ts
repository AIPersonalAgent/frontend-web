// Type definitions for i18n resources
export interface TranslationResources {
  auth: {
    loginFailed: string;
    loading: string;
    useAuthError: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
  };
  login: {
    title: string;
    subtitle: string;
    username: string;
    password: string;
    loginButton: string;
    loggingIn: string;
    validationError: string;
    loginError: string;
  };
  chat: {
    inputPlaceholder: string;
    sendButton: string;
    sessionListTitle: string;
    refreshSessions: string;
    loading: string;
    startConversation: string;
    welcomeTitle: string;
    welcomeSubtitle: string;
    noSessions: string;
    lastUpdate: string;
    yesterday: string;
    daysAgo: string;
  };
  session: {
    welcomeSession: string;
    techQuestion: string;
  };
  message: {
    receivedMessage: string;
    simulatedReply: string;
  };
  error: {
    getSessionsFailed: string;
    getMessagesFailed: string;
    sendMessageFailed: string;
    useChatError: string;
  };
}

// Extend react-i18next module for type safety
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: TranslationResources;
    };
  }
}