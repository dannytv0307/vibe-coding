const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

function getStorage(type: "localStorage" | "sessionStorage"): Storage | null {
  try {
    const s = window[type];
    // Verify it's actually functional (jsdom can expose a broken instance)
    s.getItem("__test__");
    return s;
  } catch {
    return null;
  }
}

export function saveTokens(
  tokens: { accessToken: string; refreshToken?: string },
  rememberMe: boolean
): void {
  const storage = getStorage(rememberMe ? "localStorage" : "sessionStorage");
  if (!storage) return;
  storage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  if (tokens.refreshToken) {
    storage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  }
}

export function getAccessToken(): string | null {
  return (
    getStorage("localStorage")?.getItem(ACCESS_TOKEN_KEY) ??
    getStorage("sessionStorage")?.getItem(ACCESS_TOKEN_KEY) ??
    null
  );
}

export function clearTokens(): void {
  getStorage("localStorage")?.removeItem(ACCESS_TOKEN_KEY);
  getStorage("localStorage")?.removeItem(REFRESH_TOKEN_KEY);
  getStorage("sessionStorage")?.removeItem(ACCESS_TOKEN_KEY);
  getStorage("sessionStorage")?.removeItem(REFRESH_TOKEN_KEY);
}
