import NotesPage from "../components/notes-page";
import { fireEvent, screen } from "@testing-library/react";
import { customRender } from "@/utils/test-utils/render-utils";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: () => "mocked-id",
}));

describe("NotesPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the notes page with header and new note button", () => {
    customRender(<NotesPage />);

    const header = screen.getByRole("heading", { name: /notes/i });
    expect(header).toBeInTheDocument();

    const newNoteButton = screen.getAllByRole("button", { name: /new note/i });
    expect(newNoteButton).toHaveLength(2);
  });

  it("clicking on the new note card button should navigate to a new page", () => {
    const pushMock = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    customRender(<NotesPage />);

    const cardButton = screen.getByTestId("new-note-card-button");

    fireEvent.click(cardButton);

    expect(pushMock).toHaveBeenCalledWith("notes/mocked-id");
  });

  it("clicking on the new note floating button should navigate to a new page", () => {
    const pushMock = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    customRender(<NotesPage />);

    const cardButton = screen.getByTestId("new-note-floating-button");

    fireEvent.click(cardButton);

    expect(pushMock).toHaveBeenCalledWith("notes/mocked-id");
  });
});
