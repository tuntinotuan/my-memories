import React from "react";

const TypingKeyboardInput = ({
  handleOnKeyDown,
  value,
  handleOnChange,
  id,
  hiddenInput = false,
}: any) => {
  return (
    <input
      id={id}
      value={value}
      placeholder="Typing keyword now..."
      className={`border border-primaryColor rounded p-2 ${
        hiddenInput ? "hidden" : ""
      }`}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
    ></input>
  );
};

export default TypingKeyboardInput;
