"use client";

import React from "react";
import type { NoteCardProps } from "../types";
import { ActionIcon, Menu } from "@mantine/core";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { BsFillPinFill, BsPencilSquare, BsPin } from "react-icons/bs";
import { FaClipboard, FaTrash } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";
import { TextHelper } from "@/helper/text-helper";
import dayjs from "dayjs";

const NoteCard = ({
  note,
  onDelete,
  onDuplicate,
  onEdit,
  onPinToggle,
}: NoteCardProps) => {
  return (
    <article
      onClick={() => onEdit(note.id)}
      onKeyDown={(e) => e.key === "Enter" && onEdit(note.id)}
      role="button"
      tabIndex={0}
      aria-label={`note-id-${note.id}`}
      className="border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition min-h-40 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <h2
          className="font-semibold text-lg line-clamp-1 flex items-center gap-1"
          title={note.title}
        >
          {note.pinned && (
            <MdPushPin
              className="text-primary-400 text-xl"
              title="this note is pinned"
              aria-hidden="true"
            />
          )}
          {TextHelper(note.title).truncate(30, "...").getText()}
        </h2>

        {/* Menu actions */}
        <Menu withinPortal position="bottom-end" shadow="sm">
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              color="gray"
              title={`Options for note titled ${note.title}`}
              aria-label={`Options for note titled ${note.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <IoEllipsisHorizontal size={18} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown onClick={(e) => e.stopPropagation()}>
            <Menu.Item
              leftSection={
                note.pinned ? (
                  <BsFillPinFill size={14} aria-hidden="true" />
                ) : (
                  <BsPin size={14} aria-hidden="true" />
                )
              }
              onClick={() => onPinToggle(note.id)}
            >
              {note.pinned ? "Unpin" : "Pin"} Note
            </Menu.Item>
            <Menu.Item
              leftSection={<BsPencilSquare size={14} aria-hidden="true" />}
              onClick={() => onEdit(note.id)}
            >
              Edit Note
            </Menu.Item>
            <Menu.Item
              leftSection={<FaClipboard size={14} aria-hidden="true" />}
              onClick={() => onDuplicate(note.id)}
            >
              Duplicate Note
            </Menu.Item>
            <Menu.Item
              leftSection={<FaTrash size={14} aria-hidden="true" />}
              onClick={() => onDelete(note.id)}
              color="red"
            >
              Delete Note
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>

      <p className="text-xs mt-1 mb-2 text-left text-muted-foreground">
        Last Updated:{" "}
        {dayjs(note.lastModifiedDate).format("MMM D, YYYY h:mm A")}
      </p>

      <p
        className="text-sm line-clamp-3 text-left"
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
    </article>
  );
};

export default NoteCard;
