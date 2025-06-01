import NotesPage from "../components/notes-page";
import { fireEvent, screen } from "@testing-library/react";
import { customRender } from "@/utils/test-utils/render-utils";
import { useRouter } from "next/navigation";
import { getLocalStorageItem } from "@/utils/local-storage-utils";
import userEvent from "@testing-library/user-event";

import { NoteProps } from "../types";
import { NoteHelper } from "@/helper/notes-helper";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: () => "mocked-id",
}));

jest.mock("../../../utils/local-storage-utils.ts", () => ({
  getLocalStorageItem: jest.fn(),
}));

const mockNotes: NoteProps[] = [
  {
    id: "1",
    title: "Note 1",
    content: "Content 1",
    lastModifiedDate: new Date().toString(),
    pinned: false,
  },
  {
    id: "2",
    title: "Note 2",
    content: "Content 2",
    lastModifiedDate: new Date().toString(),
    pinned: false,
  },
];

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

  it("renders notes correctly", async () => {
    (getLocalStorageItem as jest.Mock).mockReturnValue(mockNotes);

    customRender(<NotesPage />);

    const allNotes = await screen.findAllByTestId(/^note-card-/);

    expect(allNotes).toHaveLength(mockNotes.length);
  });

  it("pins the note correctly", async () => {
    const NOTE_ID = mockNotes[0].id;
    const updatedMockNotes = [
      { ...mockNotes[0], pinned: true },
      ...mockNotes.slice(1),
    ];

    (getLocalStorageItem as jest.Mock).mockReturnValue(mockNotes);

    const pinNoteMock = jest
      .spyOn(NoteHelper, "pinNote")
      .mockReturnValue(updatedMockNotes);

    const { findByTitle, getByTestId } = customRender(<NotesPage />);

    const cardOptionButton = getByTestId(`card-option-button-${NOTE_ID}`);
    await userEvent.click(cardOptionButton);

    const cardOptionPinButton = getByTestId(
      `card-option-pin-button-${NOTE_ID}`
    );
    await userEvent.click(cardOptionPinButton);

    expect(pinNoteMock).toHaveBeenCalledWith(NOTE_ID);

    const pinnedNotes = await findByTitle(/this note is pinned/);
    expect(pinnedNotes).toBeInTheDocument();
  });
});
