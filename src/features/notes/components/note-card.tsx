"use client";

import React from "react";
import type { Note } from "../types";
import { ActionIcon, Menu } from "@mantine/core";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { BsFillPinFill, BsPencilSquare, BsPin } from "react-icons/bs";
import { FaClipboard, FaTrash } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";

const NoteCard = (note: Note) => {
  return (
    <div
      key={note.id}
      className="border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition min-h-40"
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="font-semibold text-lg line-clamp-1 flex items-center gap-1">
          {note.pinned && <MdPushPin className="text-primary-400 text-xl" />}{" "}
          {note.title}
        </h2>

        {/* Menu actions */}
        <Menu withinPortal position="bottom-end" shadow="sm">
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <IoEllipsisHorizontal size={18} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                note.pinned ? <BsFillPinFill size={14} /> : <BsPin size={14} />
              }
              onClick={() => {}}
            >
              {note.pinned ? "Unpin" : "Pin"}
            </Menu.Item>
            <Menu.Item
              leftSection={<BsPencilSquare size={14} />}
              onClick={() => {}}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              leftSection={<FaClipboard size={14} />}
              onClick={() => {}}
            >
              Duplicate
            </Menu.Item>
            <Menu.Item
              leftSection={<FaTrash size={14} />}
              onClick={() => {}}
              color="red"
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>

      <p className="text-xs mt-1 mb-2">6th Apr 2025</p>

      <p className="text-sm line-clamp-4">{note.content}</p>
    </div>
  );
};

export default NoteCard;
