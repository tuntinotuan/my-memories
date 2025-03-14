import Button from "@/components/button/Button";
import CloseIcon from "@/components/icons/CloseIcon";
import useClickOutSide from "@/hooks/useClickOutSide";
import React, { forwardRef } from "react";
type AddBoxProps = {
  placeholder: string;
  btnText: string;
  onClose?: () => void;
};
const AddBox = forwardRef<HTMLDivElement, AddBoxProps>(
  ({ placeholder, btnText, onClose }, ref) => {
    return (
      <div
        className="flex flex-col gap-2 bg-white text-primaryText rounded p-2"
        ref={ref}
      >
        <input
          type="text"
          placeholder={placeholder}
          autoFocus
          className="border-2 border-transparent focus:border-2 focus:border-secondaryColor rounded transition-all p-2"
        />
        <div className="flex items-center gap-2">
          <Button className="bg-primaryColor text-white hover:bg-primaryColor hover:brightness-110">
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
