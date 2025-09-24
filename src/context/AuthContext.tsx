import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types";
import { useI18n } from "../i18n/hooks";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { t } = useI18n();

  if (context === undefined) {
    throw new Error(t("auth.useAuthError"));
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const username = localStorage.getItem("username");

    if (token && username) {
      setUser({ id: "1", username });
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, _password: string) => {
    setIsLoading(true);
    try {
      // 这里应该调用实际的登录API
      // const response = await ApiClient.login({ username, password });

      // 模拟登录成功
      // const mockToken = 'mock-jwt-token-' + Date.now();
      // localStorage.setItem('authToken', mockToken);
      // localStorage.setItem('username', username);

      setUser({ id: "1", username });
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(t("auth.loginFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
