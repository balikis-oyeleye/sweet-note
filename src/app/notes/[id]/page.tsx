import { ViewNotePage } from "@/features";

const Note = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <ViewNotePage id={id} />;
};

export default Note;
