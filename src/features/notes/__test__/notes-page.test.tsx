import NotesPage from "../components/notes-page";
import { screen } from "@testing-library/react";
import { customRender } from "@/utils/test-utils/render-utils";

describe("NotesPage", () => {
  it("renders the notes page with header and new note button", () => {
    customRender(<NotesPage />);

    const header = screen.getByRole("heading", { name: /notes/i });
    expect(header).toBeInTheDocument();

    const newNoteButton = screen.getAllByRole("button", { name: /new note/i });
    expect(newNoteButton).toHaveLength(2);
  });
});
