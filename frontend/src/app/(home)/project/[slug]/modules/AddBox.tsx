import Button from "@/components/button/Button";
import CloseIcon from "@/components/icons/CloseIcon";
import React, { forwardRef, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
type AddBoxProps = {
  placeholder: string;
  btnText: string;
  onClose: () => void;
  onKeyDown: (e: any) => void;
  onChange: (e: any) => void;
  onClickBtnAdd: () => void;
  value: string;
};
const AddBox = forwardRef<HTMLDivElement, AddBoxProps>(
  ({
    placeholder,
    btnText,
    value,
    onClose,
    onKeyDown,
    onChange,
    onClickBtnAdd,
  }) => {
    const ref = useRef(null);
    useOnClickOutside(ref, onClose);
    return (
      <div
        className="flex flex-col gap-2 bg-white text-primaryText rounded p-2"
        ref={ref}
      >
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          autoFocus
          className={`border-2 border-transparent focus:border-2 focus:border-secondaryColor rounded transition-all p-2`}
          onKeyDown={onKeyDown}
        />
        <div className="flex items-center gap-2">
          <Button
            className="bg-primaryColor text-white hover:bg-primaryColor hover:brightness-110"
            onClick={onClickBtnAdd}
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
