import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Greeting from "./Greeting";

describe("Greeting Component", () => {
  it("renders default greeting", () => {
    render(<Greeting />);

    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });
  it("renders greeting with name", () => {
    render(<Greeting name="Rayied" />);

    expect(screen.getByText("Hello, Rayied!")).toBeInTheDocument();
  });
});
