export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
}

interface ApiError extends Error {
  httpStatus: number;
}

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export async function login(payload: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = new Error("Login failed") as ApiError;
    err.httpStatus = res.status;
    throw err;
  }

  return res.json() as Promise<LoginResponse>;
}
