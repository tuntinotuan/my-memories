import React from "react";

interface TextareaProps {
  placeholder?: string;
  className?: string;
}

const Textarea = (props: TextareaProps) => {
  return (
    <textarea
      placeholder={props.placeholder || "Type placeholder text"}
      className={`text-gray-400 border-1 border-gray-300 rounded-md px-2 py-1 hover:shadow-md placeholder:opacity-0 focus:placeholder:opacity-100 ${props.className}`}
    ></textarea>
  );
};

export default Textarea;
