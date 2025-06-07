import { ViewNotePage } from "@/features";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Note",
};

const Note = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <ViewNotePage id={id} />;
};

export default Note;
