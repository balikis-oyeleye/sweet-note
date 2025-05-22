"use client";

import { HiMiniPencilSquare } from "react-icons/hi2";
import NoteCard from "./note-card";
import { ActionIcon } from "@mantine/core";

const notes = [
  {
    id: 1,
    title: "My First Note",
    content: "This is the content of my first note.",
    pinned: false,
  },
  {
    id: 2,
    title: "Shopping List",
    content: "Milk, Eggs, Bread, Butter",
    pinned: true,
  },
  {
    id: 3,
    title: "Important Note",
    content: "This is an important note.",
    pinned: false,
  },
  {
    id: 4,
    title: "Meeting Notes",
    content: "Discuss project updates and next steps.",
    pinned: true,
  },
  {
    id: 5,
    title: "Travel Plans",
    content: "Plan for the upcoming trip to the mountains.",
    pinned: false,
  },
  {
    id: 6,
    title: "Recipe Ideas",
    content: "Pasta, Salad, Pizza, Dessert",
    pinned: true,
  },
];

const NotesPage = () => {
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
            onClick={() => console.log("Create new note")}
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
        autoContrast
        variant="filled"
        color="primary.4"
        size="xl"
        radius="xl"
        onClick={() => console.log("Create new note")}
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
