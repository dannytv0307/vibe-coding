import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "./LoginPage";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock("../../contexts/AuthContext", () => ({
  useAuth: vi.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

import { useAuth } from "../../contexts/AuthContext";

function renderLoginPage() {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  );
}

describe("LoginPage", () => {
  it("renders LoginForm when not authenticated", () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
    });
    renderLoginPage();
    expect(screen.getByRole("form", { name: /sign in/i })).toBeInTheDocument();
  });

  it("redirects to / when already authenticated", () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      user: { id: "1", email: "user@example.com", name: "User" },
      login: vi.fn(),
      logout: vi.fn(),
    });
    renderLoginPage();
    // Navigate component renders nothing; the form should not be present
    expect(
      screen.queryByRole("form", { name: /sign in/i }),
    ).not.toBeInTheDocument();
  });
});
