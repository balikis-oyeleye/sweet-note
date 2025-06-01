import { STORE_KEYS } from "@/constants/store-keys";
import { NoteProps } from "@/features/notes/types";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/local-storage-utils";
import { v4 as uuidv4 } from "uuid";

export class NoteHelper {
  public static getNote() {
    return getLocalStorageItem<NoteProps[]>(STORE_KEYS.NOTES) || [];
  }

  public static pinNote(id: string) {
    const notes = this.getNote();

    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );

    setLocalStorageItem(STORE_KEYS.NOTES, updatedNotes);

    return updatedNotes;
  }

  public static duplicateNote(id: string) {
    const notes = this.getNote();

    const note = notes.find((note) => note.id === id);

    if (!note) return notes;

    const newNote = {
      ...note,
      id: uuidv4(),
      title: `${note.title} (Copy)`,
      lastModifiedDate: new Date().toISOString(),
    };

    const updatedNotes = [...notes, newNote];

    setLocalStorageItem(STORE_KEYS.NOTES, updatedNotes);

    return updatedNotes;
  }

  public static deleteNote(id: string) {
    const notes = this.getNote();

    const updatedNotes = notes.filter((note) => note.id !== id);

    setLocalStorageItem(STORE_KEYS.NOTES, updatedNotes);

    return updatedNotes;
  }
}
