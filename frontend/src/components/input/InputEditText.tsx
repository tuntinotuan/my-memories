import { Id } from "@/app/(home)/project/[slug]/modules/types";
import React, { useState } from "react";
import MyTooltip from "../tooltip/MyTooltip";
type InputEditTextProps = {
  title: string;
  id: Id;
  updateTitle: (id: Id, title: string) => void;
  pClass?: string;
  inputClass?: string;
};
const InputEditText = ({
  updateTitle,
  title,
  id,
  pClass,
  inputClass,
}: InputEditTextProps) => {
  const [editTitle, setEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };
  return (
    <>
      {!editTitle && (
        <MyTooltip
          contents={<p>{title}</p>}
          size="small"
          className={`w-full rounded ${pClass}`}
          enterDelay={600}
          arrowRounded
        >
          <p
            onClick={() => setEditTitle(true)}
            className={`px-3 rounded py-1 truncate cursor-pointer border border-transparent transition-all ${pClass}`}
          >
            {title}
          </p>
        </MyTooltip>
      )}
      {editTitle && (
        <input
          type="text"
          defaultValue={title}
          className={`border focus:border-secondaryColor px-3 py-1 rounded transition-all ${inputClass}`}
          onChange={handleChangeTitle}
          autoFocus
          onBlur={() => {
            setEditTitle(false);
            if (title === newTitle || !newTitle) return;
            updateTitle(id, newTitle);
            setNewTitle("");
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            setEditTitle(false);
            if (title === newTitle || !newTitle) return;
            updateTitle(id, newTitle);
            setNewTitle("");
          }}
        />
      )}
    </>
  );
};

export default InputEditText;
