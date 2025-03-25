import { Id, ListType } from "@/app/(home)/project/[slug]/modules/types";
import React, { useState } from "react";
type InputEditTextProps = {
  title: string;
  id: Id;
  updateTitle: (id: Id, title: string) => void;
};
const InputEditText = ({ updateTitle, title, id }: InputEditTextProps) => {
  const [editTitle, setEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };
  return (
    <>
      {!editTitle && (
        <p
          onClick={() => setEditTitle(true)}
          className="pl-3 py-1 cursor-pointer border border-transparent w-full"
        >
          {title}
        </p>
      )}
      {editTitle && (
        <input
          type="text"
          defaultValue={title}
          className="w-full border focus:border-secondaryColor pl-3 py-1 rounded transition-all"
          onChange={handleChangeTitle}
          autoFocus
          onBlur={() => {
            setEditTitle(false);
            if (title === newTitle || !newTitle) return;
            updateTitle(id, newTitle);
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            setEditTitle(false);
            if (title === newTitle || !newTitle) return;
            updateTitle(id, newTitle);
          }}
        />
      )}
    </>
  );
};

export default InputEditText;
