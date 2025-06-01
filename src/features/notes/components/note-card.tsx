"use client";

import React from "react";
import type { NoteCardProps } from "../types";
import { ActionIcon, Menu } from "@mantine/core";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { BsFillPinFill, BsPencilSquare, BsPin } from "react-icons/bs";
import { FaClipboard, FaTrash } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";

const NoteCard = ({
  note,
  onDelete,
  onDuplicate,
  onEdit,
  onPinToggle,
}: NoteCardProps) => {
  return (
    <div
      key={note.id}
      data-testid={`note-card-${note.id}`}
      className="border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition min-h-40"
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="font-semibold text-lg line-clamp-1 flex items-center gap-1">
          {note.pinned && (
            <MdPushPin
              className="text-primary-400 text-xl"
              title="this note is pinned"
            />
          )}{" "}
          {note.title}
        </h2>

        {/* Menu actions */}
        <Menu withinPortal position="bottom-end" shadow="sm">
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              color="gray"
              title="Open note card options"
              aria-label="Open note card options"
              data-testid={`card-option-button-${note.id}`}
            >
              <IoEllipsisHorizontal size={18} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                note.pinned ? <BsFillPinFill size={14} /> : <BsPin size={14} />
              }
              onClick={() => onPinToggle(note.id)}
              data-testid={`card-option-pin-button-${note.id}`}
            >
              {note.pinned ? "Unpin" : "Pin"} Note
            </Menu.Item>
            <Menu.Item
              leftSection={<BsPencilSquare size={14} />}
              onClick={() => onEdit(note.id)}
              data-testid="card-option-edit-button"
            >
              Edit Note
            </Menu.Item>
            <Menu.Item
              leftSection={<FaClipboard size={14} />}
              onClick={() => onDuplicate(note.id)}
              data-testid="card-option-duplicate-button"
            >
              Duplicate Note
            </Menu.Item>
            <Menu.Item
              leftSection={<FaTrash size={14} />}
              onClick={() => onDelete(note.id)}
              data-testid="card-option-delete-button"
              color="red"
            >
              Delete Note
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>

      <p className="text-xs mt-1 mb-2">{note.lastModifiedDate}</p>

      <p className="text-sm line-clamp-4">{note.content}</p>
    </div>
  );
};

export default NoteCard;
