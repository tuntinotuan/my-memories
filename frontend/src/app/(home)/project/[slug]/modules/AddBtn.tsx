import Button from "@/components/button/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import React from "react";

type AddBtnProps = {
  text: string;
  className?: string;
};

const AddBtn = ({ text, className }: AddBtnProps) => {
  return (
    <Button
      className={`!justify-start bg-white bg-opacity-30 hover:bg-opacity-25 ${className}`}
    >
      <PlusIcon></PlusIcon>
      {text}
    </Button>
  );
};

export default AddBtn;
