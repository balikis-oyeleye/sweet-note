import SingleNotePage from "@/features/notes/components/single-note-page";
import React from "react";

const Note = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <SingleNotePage id={id} />;
};

export default Note;
