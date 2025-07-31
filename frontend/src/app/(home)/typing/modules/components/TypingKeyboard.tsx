import React from "react";

const TypingKeyboardInput = ({
  handleOnKeyDown,
  value,
  handleOnChange,
  onBlur,
  id,
  hiddenInput = false,
}: any) => {
  return (
    <input
      id={id}
      value={value}
      placeholder="Typing keyword now..."
      className={`fixed border border-primaryColor rounded p-2 ${
        hiddenInput ? "opacity-0" : ""
      }`}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      onBlur={onBlur}
    ></input>
  );
};

export default TypingKeyboardInput;
