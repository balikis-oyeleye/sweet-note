"use client";

import { useEffect, useRef, useState } from "react";
import { NoteHelper } from "@/helper/notes-helper";
import { NoteProps } from "../types";
import { ActionIcon, Button, Menu } from "@mantine/core";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { FaCircleChevronLeft } from "react-icons/fa6";
import RichTextEditor from "@/components/ui/rich-text-editor";
import { useDebouncedValue } from "@mantine/hooks";

const ViewNotePage = ({ id }: { id: string }) => {
  const router = useRouter();
  const [note, setNote] = useState<NoteProps | null>(null);
  const [debounced] = useDebouncedValue(note, 200);
  const [editTitle, setEditTitle] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debounced) {
      NoteHelper.saveNote(debounced);
    }
  }, [debounced]);

  useEffect(() => {
    const storedNote = NoteHelper.getNoteById(id);

    if (storedNote) {
      setNote(storedNote);
    } else {
      const defaultNote: NoteProps = {
        id,
        title: "Untitled Note",
        content: "",
        pinned: false,
        lastModifiedDate: new Date().toISOString(),
      };
      setNote(defaultNote);
    }
  }, [id]);

  useEffect(() => {
    if (editTitle && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editTitle]);

  if (!note) return <p>Loading...</p>;

  return (
    <main
      className="px-4 py-8 bg-surface/25 container mx-auto"
      id="main-content"
    >
      <section className="flex flex-wrap items-center justify-between bg-light p-2 rounded-lg shadow-xs gap-3">
        <div className="flex flex-wrap items-center gap-4 flex-grow min-w-0">
          <ActionIcon
            variant="subtle"
            color="gray"
            title="Go back"
            aria-label="Go back"
            onClick={() => router.back()}
            className="flex-shrink-0"
          >
            <FaCircleChevronLeft size={20} aria-hidden="true" />
          </ActionIcon>

          {editTitle ? (
            <input
              type="text"
              ref={inputRef}
              value={note.title}
              style={{ width: `${Math.max(note.title.length, 10)}ch` }}
              onChange={(e) =>
                setNote({
                  ...note,
                  title: e.target.value,
                  lastModifiedDate: new Date().toISOString(),
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setEditTitle(false);
                }
              }}
              onBlur={() => setEditTitle(false)}
              className="text-lg font-semibold whitespace-normal max-w-[60vw] outline-none px-2"
            />
          ) : (
            <button
              onClick={() => {
                setEditTitle(true);
              }}
            >
              <h1 className="text-lg font-semibold whitespace-normal max-w-[60vw]">
                {note.title}
              </h1>
            </button>
          )}

          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon
                variant="subtle"
                color="gray"
                title={`Options for note titled ${note.title}`}
                aria-label={`Options for note titled ${note.title}`}
                onClick={(e) => e.stopPropagation()}
                className="flex-shrink-0"
              >
                <IoEllipsisHorizontal size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown onClick={(e) => e.stopPropagation()}>
              <Menu.Item
                leftSection={<BsPencilSquare size={14} aria-hidden="true" />}
                onClick={() => {
                  setEditTitle(true);
                }}
              >
                Rename
              </Menu.Item>
              <Menu.Item
                leftSection={<FaTrash size={14} aria-hidden="true" />}
                onClick={() => {
                  NoteHelper.deleteNote(note.id);
                  setNote(null);
                  router.push("/notes");
                }}
                color="red"
              >
                Delete Note
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        <Button
          variant="filled"
          color="accent.9"
          autoContrast
          className="flex-shrink-0"
          onClick={() => {
            const updateNote: NoteProps = {
              ...note,
              lastModifiedDate: new Date().toISOString(),
            };

            setNote(updateNote);
            NoteHelper.saveNote(updateNote);
          }}
        >
          Save Note
        </Button>
      </section>

      <section className="mt-6">
        <RichTextEditor
          onChange={(value) => {
            const updateNote: NoteProps = {
              ...note,
              content: value,
              lastModifiedDate: new Date().toISOString(),
            };

            setNote(updateNote);
          }}
          value={note.content}
        />
      </section>
    </main>
  );
};

export default ViewNotePage;
