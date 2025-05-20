import { screen, fireEvent } from "@testing-library/react";
import Navbar from "../navbar";
import { customRender } from "@/utils/test-utils";

describe("Navbar", () => {
  it("menu bar opens sidebar when clicked", () => {
    customRender(<Navbar />);

    const menuButton = screen.getByRole("button", { name: "Open menu" });

    fireEvent.click(menuButton);

    const closeButton = screen.getByRole("button", {
      name: "close sidebar",
    });

    expect(closeButton).toBeInTheDocument();
  });

  it("closes sidebar when close button is clicked", () => {
    customRender(<Navbar />);

    const menuButton = screen.getByRole("button", { name: "Open menu" });

    fireEvent.click(menuButton);

    const closeButton = screen.getByRole("button", {
      name: "close sidebar",
    });

    fireEvent.click(closeButton);

    expect(
      screen.queryByRole("button", { name: "close sidebar" })
    ).not.toBeInTheDocument();
  });

  it("toggles theme when button is clicked", () => {
    customRender(<Navbar />);
    const toggleButton = screen.getByRole("button", {
      name: /activate dark mode/i,
    });

    fireEvent.click(toggleButton);

    expect(
      screen.getByRole("button", { name: /activate light mode/i })
    ).toBeInTheDocument();
  });
});
