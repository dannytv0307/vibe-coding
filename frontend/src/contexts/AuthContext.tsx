import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { type User } from "../services/authService";
import {
  saveTokens,
  clearTokens,
  getAccessToken,
} from "../utils/tokenStorage";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    tokens: { accessToken: string; refreshToken?: string },
    user: User,
    rememberMe: boolean
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function safeReadUser(): User | null {
  try {
    const token = getAccessToken();
    if (!token) return null;
    const stored =
      window.localStorage.getItem("auth_user") ??
      window.sessionStorage.getItem("auth_user");
    return stored ? (JSON.parse(stored) as User) : null;
  } catch {
    return null;
  }
}

function safeWriteUser(user: User, rememberMe: boolean): void {
  try {
    const storage = rememberMe ? window.localStorage : window.sessionStorage;
    storage.setItem("auth_user", JSON.stringify(user));
  } catch {
    // storage not available
  }
}

function safeClearUser(): void {
  try { window.localStorage.removeItem("auth_user"); } catch { /* ignore */ }
  try { window.sessionStorage.removeItem("auth_user"); } catch { /* ignore */ }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(safeReadUser);

  function login(
    tokens: { accessToken: string; refreshToken?: string },
    newUser: User,
    rememberMe: boolean
  ) {
    saveTokens(tokens, rememberMe);
    safeWriteUser(newUser, rememberMe);
    setUser(newUser);
  }

  function logout() {
    clearTokens();
    safeClearUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: user !== null, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
