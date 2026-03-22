import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NavBar } from "./NavBar";

describe("NavBar", () => {
  it("renders without crashing", () => {
    render(<NavBar />);
  });

  it("renders children correctly", () => {
    render(
      <NavBar>
        <a href="/">Home</a>
      </NavBar>,
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("has correct landmark roles", () => {
    render(<NavBar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<NavBar className="custom" />);
    expect(screen.getByRole("banner")).toHaveClass("custom");
  });
});
