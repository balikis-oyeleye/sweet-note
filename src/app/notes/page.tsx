import NotesPage from "@/features/notes/components/notes-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Notes",
};

export default function Notes() {
  return <NotesPage />;
}
