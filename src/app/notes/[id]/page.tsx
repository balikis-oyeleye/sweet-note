import { ViewNotePage } from "@/features";
import { Metadata } from "next";

type Params = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: "View Note",
};

const Note = async ({ params }: Params) => {
  const { id } = params;

  return <ViewNotePage id={id} />;
};

export default Note;
