export interface NoteProps {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  lastModifiedDate: string;
}

export interface NoteCardProps {
  note: NoteProps;
  onPinToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}
