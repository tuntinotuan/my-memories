import Button from "@/components/button/Button";
import CloseIcon from "@/components/icons/CloseIcon";
import React from "react";
type AddBoxProps = {
  placeholder: string;
  btnText: string;
};
const AddBox = ({ placeholder, btnText }: AddBoxProps) => {
  return (
    <div className="flex flex-col gap-2 bg-white text-primaryText rounded p-2">
      <input
        type="text"
        placeholder={placeholder}
        className="border-2 border-transparent focus:border-2 focus:border-secondaryColor rounded transition-all p-2"
      />
      <div className="flex items-center gap-2">
        <Button className="bg-primaryColor text-white hover:bg-primaryColor hover:brightness-110">
          {btnText}
        </Button>
        <CloseIcon></CloseIcon>
      </div>
    </div>
  );
};

export default AddBox;
