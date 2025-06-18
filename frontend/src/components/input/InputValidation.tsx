import React, { useState } from "react";

type InputValidationProps = {
  onKeyDown?: (val: any) => void;
  errText: string;
  value: string;
  setValue: (val: any) => void;
};

const InputValidation = ({
  onKeyDown,
  errText,
  value,
  setValue,
}: InputValidationProps) => {
  const [inputRequire, setInputRequire] = useState(false);
  return (
    <>
      <input
        type="text"
        value={value}
        className={`border border-gray-200 rounded w-full px-3 py-2 ${
          value === "" ? "focus:border-red-400" : "focus:border-primaryColor"
        }`}
        onFocus={() => setInputRequire(true)}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
      {value === "" && inputRequire && (
        <p className="text-[10px] text-red-500">{errText}</p>
      )}
    </>
  );
};

export default InputValidation;
