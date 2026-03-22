import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { AuthProvider } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => mockNavigate };
});

function renderLoginForm() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </MemoryRouter>,
  );
}

// Helper: get password input by exact label (avoids matching toggle button's aria-label)
function getPasswordInput() {
  return screen.getByLabelText("Password") as HTMLInputElement;
}

describe("LoginForm", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    vi.restoreAllMocks();
  });

  it("renders email, password, rememberMe checkbox and submit button", () => {
    renderLoginForm();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(getPasswordInput()).toBeInTheDocument();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("shows email validation error for invalid email", async () => {
    renderLoginForm();
    await userEvent.type(screen.getByLabelText(/email/i), "invalid");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(
      await screen.findByText("Invalid email address"),
    ).toBeInTheDocument();
  });

  it("shows password validation error for short password", async () => {
    renderLoginForm();
    await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
    await userEvent.type(getPasswordInput(), "short");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(
      await screen.findByText("Password must be at least 8 characters"),
    ).toBeInTheDocument();
  });

  it("disables fields and button during loading", async () => {
    vi.spyOn(authService, "login").mockImplementation(
      () => new Promise(() => {}), // never resolves
    );
    renderLoginForm();
    await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
    await userEvent.type(getPasswordInput(), "password123");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(getPasswordInput()).toBeDisabled();
    expect(screen.getByRole("button", { name: /signing in/i })).toBeDisabled();
  });

  it("shows 401 error banner for wrong credentials", async () => {
    const err = Object.assign(new Error("Unauthorized"), { httpStatus: 401 });
    vi.spyOn(authService, "login").mockRejectedValue(err);
    renderLoginForm();
    await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
    await userEvent.type(getPasswordInput(), "password123");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Incorrect email or password.",
    );
  });

  it("shows generic error banner for 500 errors", async () => {
    const err = Object.assign(new Error("Server error"), { httpStatus: 500 });
    vi.spyOn(authService, "login").mockRejectedValue(err);
    renderLoginForm();
    await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
    await userEvent.type(getPasswordInput(), "password123");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Something went wrong. Please try again.",
    );
  });

  it("calls navigate on successful login", async () => {
    vi.spyOn(authService, "login").mockResolvedValue({
      accessToken: "tok",
      user: { id: "1", email: "user@example.com", name: "User" },
    });
    renderLoginForm();
    await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
    await userEvent.type(getPasswordInput(), "password123");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true }),
    );
  });

  it("rememberMe defaults to unchecked and can be toggled", async () => {
    renderLoginForm();
    const checkbox = screen.getByLabelText(/remember me/i) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    await userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it("password toggle changes input type and aria-label", async () => {
    renderLoginForm();
    const passwordInput = getPasswordInput();
    expect(passwordInput.type).toBe("password");
    const toggleBtn = screen.getByRole("button", { name: /show password/i });
    await userEvent.click(toggleBtn);
    expect(passwordInput.type).toBe("text");
    expect(
      screen.getByRole("button", { name: /hide password/i }),
    ).toBeInTheDocument();
  });

  it("has links to /register and /forgot-password", () => {
    renderLoginForm();
    expect(screen.getByRole("link", { name: /sign up/i })).toHaveAttribute(
      "href",
      "/register",
    );
    expect(screen.getByRole("link", { name: /forgot/i })).toHaveAttribute(
      "href",
      "/forgot-password",
    );
  });
});
