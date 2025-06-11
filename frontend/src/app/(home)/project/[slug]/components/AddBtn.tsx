import Button from "@/components/button/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import React, { forwardRef } from "react";

type AddBtnProps = {
  text: string;
  className?: string;
  onClick?: () => void;
};

const AddBtn = ({ text, className, onClick }: AddBtnProps) => {
  return (
    <div>
      <Button
        className={`w-full !justify-start bg-white bg-opacity-30 backdrop-blur-sm hover:bg-opacity-25 ${className}`}
        onClick={onClick}
      >
        <PlusIcon></PlusIcon>
        {text}
      </Button>
    </div>
  );
};

export default AddBtn;
