import { Tooltip } from "@nextui-org/tooltip";
import React from "react";
import Input from "./Input";
import Control from "@/app/create/Control";
interface InputCreateProps {
  id: string;
  name: string;
  type: string;
  tooltipContent?: string;
  className?: string;
  placeholder?: string;
  children?: React.ReactNode;
}
const InputCreate = (props: InputCreateProps) => {
  return (
    <Input
      id={props.id}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      className={props.className}
    >
      <Tooltip
        content={props.tooltipContent}
        placement="left"
        radius="sm"
        delay={200}
        closeDelay={300}
        className="!px-2 !py-[2px]"
      >
        {props.children}
      </Tooltip>
    </Input>
  );
};

export default InputCreate;
