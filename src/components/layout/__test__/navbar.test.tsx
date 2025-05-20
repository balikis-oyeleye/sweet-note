import { screen, fireEvent } from "@testing-library/react";
import Navbar from "../navbar";
import { customRender } from "@/utils/test-utils/render-utils";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

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
});
