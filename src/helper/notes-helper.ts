import { STORE_KEYS } from "@/constants/store-keys";
import { NoteProps } from "@/features/notes/types";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/local-storage-utils";
import { v4 as uuidv4 } from "uuid";
import { notifications } from "@mantine/notifications";

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

  public static getNoteById(id: string) {
    return this.getNote().find((note) => note.id === id) ?? null;
  }

  public static saveNote(note: NoteProps) {
    const notes = this.getNote();

    const MAX_NOTES = 20;

    const existingIndex = notes.findIndex((n) => n.id === note.id);

    let updatedNotes: NoteProps[];

    if (existingIndex !== -1) {
      notes[existingIndex] = note;
      updatedNotes = [...notes];
    } else {
      updatedNotes = [note, ...notes];
    }

    if (updatedNotes.length > MAX_NOTES) {
      notifications.show({
        title: "Note Limit Reached",
        message: `You can only have a maximum of ${MAX_NOTES} notes.`,
        color: "red",
      });

      return notes;
    }

    setLocalStorageItem(STORE_KEYS.NOTES, updatedNotes);

    return updatedNotes;
  }
}
