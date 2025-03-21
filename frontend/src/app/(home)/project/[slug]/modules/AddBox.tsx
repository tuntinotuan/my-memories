import Button from "@/components/button/Button";
import CloseIcon from "@/components/icons/CloseIcon";
import useClickOutSide from "@/hooks/useClickOutSide";
import React, { forwardRef, useState } from "react";
type AddBoxProps = {
  placeholder: string;
  btnText: string;
  onClose?: () => void;
  createNewBoard: (title: string) => void;
};
const AddBox = forwardRef<HTMLDivElement, AddBoxProps>(
  ({ placeholder, btnText, onClose, createNewBoard }, ref) => {
    const [newTitle, setNewTitle] = useState<string>("");
    console.log("newTitle", newTitle);
    return (
      <div
        className="flex flex-col gap-2 bg-white text-primaryText rounded p-2"
        ref={ref}
      >
        <input
          type="text"
          value={newTitle}
          placeholder={placeholder}
          onChange={(e) => setNewTitle(e.target.value)}
          autoFocus
          className={`border-2 border-transparent focus:border-2 focus:border-secondaryColor rounded transition-all p-2`}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            newTitle && createNewBoard(newTitle);
          }}
        />
        <div className="flex items-center gap-2">
          <Button
            className="bg-primaryColor text-white hover:bg-primaryColor hover:brightness-110"
            onClick={() => {
              if (newTitle) {
                newTitle && createNewBoard(newTitle);
                if (onClose !== undefined) onClose();
              }
            }}
          >
            {btnText}
          </Button>
          <CloseIcon onClick={onClose}></CloseIcon>
        </div>
      </div>
    );
  }
);

AddBox.displayName = "AddBox";
export default AddBox;
