"use client";

import { HiMiniPencilSquare } from "react-icons/hi2";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

import { ActionIcon } from "@mantine/core";
import { STORE_KEYS } from "@/constants/store-keys";
import { getLocalStorageItem } from "@/utils/local-storage-utils";

import NoteCard from "./note-card";
import { Note } from "../types";

const NotesPage = () => {
  const router = useRouter();
  const notes = getLocalStorageItem<Note[]>(STORE_KEYS.NOTES) || [];

  const createNewNote = () => router.push(`notes/${uuidv4()}`);

  return (
    <main
      className="px-4 py-8 bg-surface/25 h-full min-h-[calc(100vh-4.2rem)] overflow-y-auto"
      id="main-content"
    >
      {/* Header */}
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-10">Notes</h1>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {/* Create new note button */}
          <button
            data-testid="new-note-card-button"
            onClick={createNewNote}
            className="border-dashed border-2 border-gray-300 h-40 rounded-lg flex items-center justify-center text-base/50 hover:border-primary-400 hover:text-primary-400 transition"
          >
            <HiMiniPencilSquare size={24} />
            <span className="ml-2 font-medium">New Note</span>
          </button>

          {/* Notes */}
          {notes.map((note) => (
            <NoteCard key={note.id} {...note} />
          ))}
        </div>
      </div>

      {/* Floating "New Note" button */}
      <ActionIcon
        data-testid="new-note-floating-button"
        autoContrast
        variant="filled"
        color="primary.4"
        size="xl"
        radius="xl"
        onClick={createNewNote}
        aria-label="Create a new note"
        title="Create a new note"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          padding: "0.5rem",
        }}
      >
        <HiMiniPencilSquare size={24} aria-hidden="true" />
      </ActionIcon>
    </main>
  );
};

export default NotesPage;
