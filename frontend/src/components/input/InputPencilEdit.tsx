import { Id } from "@/app/(home)/project/[slug]/modules/types";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";

export const InputPencilEdit = ({
  title,
  updateTitle,
  id,
}: {
  title: string;
  updateTitle: any;
  id: Id;
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState("");
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };
  useOnClickOutside(ref, () => setShowEdit(false));
  return (
    <>
      {!showEdit && (
        <div
          className="flex items-center  gap-1 w-fit max-w-full font-bold text-lg border border-transparent hover:border-b-gray-300 border-dotted transition-all"
          onClick={() => setShowEdit(true)}
        >
          <p className="truncate">{title}</p>
          <DriveFileRenameOutlineOutlinedIcon
            className="shrink-0 cursor-pointer"
            onClick={() => setShowEdit(true)}
          />
        </div>
      )}
      {showEdit && (
        <input
          ref={ref}
          type="text"
          defaultValue={title}
          autoFocus
          onFocus={(e) => e.target.select()}
          onChange={handleChangeTitle}
          className="font-bold text-lg border border-transparent border-b-gray-300 border-dotted transition-all"
          onBlur={() => {
            setShowEdit(false);
            if (title === newTitle || !newTitle) return;
            updateTitle(id, newTitle);
            setNewTitle("");
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            setShowEdit(false);
            if (title === newTitle || !newTitle) return;
            updateTitle(id, newTitle);
            setNewTitle("");
          }}
        />
      )}
    </>
  );
};
