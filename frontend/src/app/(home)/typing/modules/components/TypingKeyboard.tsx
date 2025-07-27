import React from "react";

const TypingKeyboardInput = ({
  handleOnKeyDown,
  value,
  handleOnChange,
}: any) => {
  return (
    <input
      value={value}
      placeholder="Typing keyword now..."
      className={`border border-primaryColor rounded p-2`}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
    ></input>
  );
};

export default TypingKeyboardInput;
