import { screen, fireEvent } from "@testing-library/react";
import Navbar from "../navbar";
import { customRender } from "@/utils/test-utils/render-utils";
import { useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { resizeWindow } from "@/utils/test-utils/window-utils";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  usePathname() {
    return "";
  },
}));

jest.mock("@mantine/hooks", () => {
  const actualHooks = jest.requireActual("@mantine/hooks");
  return {
    ...actualHooks,
    useWindowScroll: jest.fn(() => [{ y: 0 }, jest.fn()]),
    useMediaQuery: jest.fn(),
  };
});

describe("Navbar", () => {
  it("toggles theme when button is clicked", () => {
    customRender(<Navbar />);
    const toggleButton = screen.getByTestId("toggle-color-scheme-button");
    expect(toggleButton).toHaveAccessibleName("Activate light mode");

    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveAccessibleName("Activate dark mode");
  });

  it("toggles sidebar when button is clicked", () => {
    customRender(<Navbar />);
    const toggleButton = screen.getByTestId("toggle-sidebar-button");
    expect(toggleButton).toHaveAccessibleName("Open sidebar");

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAccessibleName("Close sidebar");
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAccessibleName("Open sidebar");
  });

  it("hides header on scroll down and shows on scroll up", () => {
    (useWindowScroll as jest.Mock).mockReturnValue([{ y: 0 }, jest.fn()]);
    const { rerender } = customRender(<Navbar />);
    let header = screen.getByRole("banner");
    expect(header).toHaveClass("translate-y-0");

    (useWindowScroll as jest.Mock).mockReturnValue([{ y: 150 }, jest.fn()]);
    rerender(<Navbar />);
    header = screen.getByRole("banner");
    expect(header).toHaveClass("-translate-y-full");

    (useWindowScroll as jest.Mock).mockReturnValue([{ y: 0 }, jest.fn()]);
    rerender(<Navbar />);
    header = screen.getByRole("banner");
    expect(header).toHaveClass("translate-y-0");
  });

  it("closes sidebar when screen size is larger than 640px", () => {
    resizeWindow(500);
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    const { rerender } = customRender(<Navbar />);
    const toggleButton = screen.getByTestId("toggle-sidebar-button");
    expect(toggleButton).toHaveAccessibleName("Open sidebar");

    fireEvent.click(toggleButton);

    const drawer = screen.getByRole("dialog");
    expect(drawer).toBeInTheDocument();

    resizeWindow(800);

    (useMediaQuery as jest.Mock).mockReturnValue(true);
    rerender(<Navbar />);
    expect(drawer).not.toBeInTheDocument();
  });
});
