import React from "react";
interface InputProps {
  id: string;
  name: string;
  type: string;
  className?: string;
  placeholder?: string;
  children?: React.ReactNode;
}
const Input = (props: InputProps) => {
  return (
    <label
      htmlFor={props.id}
      className={`flex items-center justify-between gap-1 w-[320px] text-gray-400 border-1 border-gray-300 rounded-md px-2 py-1 hover:shadow-md cursor-text ${props.className}`}
    >
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        className="flex-1 placeholder:opacity-0 focus:placeholder:opacity-100"
        placeholder={props.placeholder || "Type placeholder text"}
      ></input>
      <span className="flex items-center justify-center text-gray-500">
        {props.children}
      </span>
    </label>
  );
};

export default Input;
