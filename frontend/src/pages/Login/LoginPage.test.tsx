import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoginPage } from "./LoginPage";

describe("LoginPage", () => {
  it("renders the page heading", () => {
    render(<LoginPage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("has a main landmark", () => {
    render(<LoginPage />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
