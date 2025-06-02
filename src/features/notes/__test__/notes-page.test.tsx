import NotesPage from "../components/notes-page";
import { fireEvent, screen, waitFor } from "@testing-library/react";
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
    lastModifiedDate: new Date().toISOString(),
    pinned: false,
  },
  {
    id: "2",
    title: "Note 2",
    content: "Content 2",
    lastModifiedDate: new Date().toISOString(),
    pinned: false,
  },
];

describe("Notes page without note", () => {
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

    const cardButton = screen.getByRole("button", { name: "New Note" });

    fireEvent.click(cardButton);

    expect(pushMock).toHaveBeenCalledWith("notes/mocked-id");
  });

  it("clicking on the new note floating button should navigate to a new page", () => {
    const pushMock = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    customRender(<NotesPage />);

    const cardButton = screen.getByRole("button", {
      name: "Create a new note",
    });

    fireEvent.click(cardButton);

    expect(pushMock).toHaveBeenCalledWith("notes/mocked-id");
  });
});

describe("Notes page with note", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders notes correctly", async () => {
    (getLocalStorageItem as jest.Mock).mockReturnValue(mockNotes);

    customRender(<NotesPage />);

    for (const note of mockNotes) {
      const NOTE = screen.getByRole("button", {
        name: `note-id-${note.id}`,
      });

      expect(NOTE).toBeInTheDocument();
    }
  });

  it("opens the menu on click and show all menu items", async () => {
    const NOTE_TITLE = mockNotes[0].title;

    (getLocalStorageItem as jest.Mock).mockReturnValue(mockNotes);

    customRender(<NotesPage />);

    const cardMenuButton = screen.getByRole("button", {
      name: `Options for note titled ${NOTE_TITLE}`,
    });
    expect(cardMenuButton).toBeInTheDocument();

    await userEvent.click(cardMenuButton);
    const pinButton = screen.getByText("Pin Note");
    const editButton = screen.getByText("Edit Note");
    const duplicateButton = screen.getByText("Duplicate Note");
    const deleteButton = screen.getByText("Delete Note");

    await waitFor(() => {
      expect(pinButton).toBeInTheDocument();
      expect(editButton).toBeInTheDocument();
      expect(duplicateButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
    });
  });

  it("pins the note correctly", async () => {
    const NOTE_TITLE = mockNotes[0].title;
    const NOTE_ID = mockNotes[0].id;

    const updatedMockNotes = [
      { ...mockNotes[0], pinned: true },
      ...mockNotes.slice(1),
    ];

    (getLocalStorageItem as jest.Mock).mockReturnValue(mockNotes);

    const pinNoteMock = jest
      .spyOn(NoteHelper, "pinNote")
      .mockReturnValue(updatedMockNotes);

    customRender(<NotesPage />);

    const cardMenuButton = screen.getByRole("button", {
      name: `Options for note titled ${NOTE_TITLE}`,
    });

    expect(cardMenuButton).toBeInTheDocument();

    await userEvent.click(cardMenuButton);

    const pinButton = screen.getByText("Pin Note");

    await waitFor(() => {
      expect(pinButton).toBeInTheDocument();
    });

    await userEvent.click(pinButton);

    expect(pinNoteMock).toHaveBeenCalledWith(NOTE_ID);

    const pinnedNotes = await screen.findByTitle(/this note is pinned/);

    expect(pinnedNotes).toBeInTheDocument();
  });

  it("duplicate the note correctly", async () => {
    const NOTE = mockNotes[0];
    const NOTE_TITLE = mockNotes[0].title;
    const NOTE_ID = mockNotes[0].id;

    const newNote = {
      ...NOTE,
      id: "new-note",
      title: `${NOTE.title} (Copy)`,
      lastModifiedDate: new Date().toISOString(),
    };

    const updatedMockNotes = [...mockNotes, newNote];

    (getLocalStorageItem as jest.Mock).mockReturnValue(mockNotes);

    const duplicateNoteMock = jest
      .spyOn(NoteHelper, "duplicateNote")
      .mockReturnValue(updatedMockNotes);

    customRender(<NotesPage />);

    const cardMenuButton = screen.getByRole("button", {
      name: `Options for note titled ${NOTE_TITLE}`,
    });

    expect(cardMenuButton).toBeInTheDocument();

    await userEvent.click(cardMenuButton);

    const duplicateButton = screen.getByText("Duplicate Note");

    await waitFor(() => {
      expect(duplicateButton).toBeInTheDocument();
    });

    await userEvent.click(duplicateButton);

    expect(duplicateNoteMock).toHaveBeenCalledWith(NOTE_ID);

    const notes = await Promise.all(
      updatedMockNotes.map((item) =>
        screen.findByRole("button", {
          name: `note-id-${item.id}`,
        })
      )
    );

    expect(notes).toHaveLength(updatedMockNotes.length);
  });

  it("delete the note correctly", async () => {
    const NOTE_TITLE = mockNotes[0].title;
    const NOTE_ID = mockNotes[0].id;

    const updatedMockNotes = mockNotes.filter((item) => item.id !== NOTE_ID);

    (getLocalStorageItem as jest.Mock).mockReturnValue(mockNotes);

    const deleteNoteMock = jest
      .spyOn(NoteHelper, "deleteNote")
      .mockReturnValue(updatedMockNotes);

    customRender(<NotesPage />);

    const cardMenuButton = screen.getByRole("button", {
      name: `Options for note titled ${NOTE_TITLE}`,
    });

    expect(cardMenuButton).toBeInTheDocument();

    await userEvent.click(cardMenuButton);

    const deleteButton = screen.getByText("Delete Note");

    await waitFor(() => {
      expect(deleteButton).toBeInTheDocument();
    });

    await userEvent.click(deleteButton);

    expect(deleteNoteMock).toHaveBeenCalledWith(NOTE_ID);

    const notes = await Promise.all(
      updatedMockNotes.map((item) =>
        screen.findByRole("button", {
          name: `note-id-${item.id}`,
        })
      )
    );

    expect(notes).toHaveLength(updatedMockNotes.length);
  });
});
