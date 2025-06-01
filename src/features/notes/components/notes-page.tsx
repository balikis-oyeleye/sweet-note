"use client";

import { HiMiniPencilSquare } from "react-icons/hi2";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

import { ActionIcon } from "@mantine/core";

import NoteCard from "./note-card";
import { NoteHelper } from "@/helper/notes-helper";
import { useState } from "react";
import { NoteProps } from "../types";

const NotesPage = () => {
  const [notes, setNotes] = useState<NoteProps[]>(NoteHelper.getNote());

  const router = useRouter();

  const createNewNote = () => router.push(`notes/${uuidv4()}`);

  const handlePinToggle = (id: string) => {
    const updatedNotes = NoteHelper.pinNote(id);
    setNotes(updatedNotes);
  };

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
            <NoteCard
              key={note.id}
              note={note}
              onPinToggle={handlePinToggle}
              onDelete={(id) => NoteHelper.deleteNote(id)}
              onDuplicate={(id) => NoteHelper.duplicateNote(id)}
              onEdit={(id) => router.push(`notes/${id}`)}
            />
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
