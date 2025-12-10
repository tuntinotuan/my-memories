import { useLayoutStates } from "@/contexts/layoutStates";
import React, { useEffect, useState } from "react";

type InputValidationProps = {
  onKeyDown?: (val: any) => void;
  errText: string;
  value: string;
  defaultValue?: string;
  setValue: (val: any) => void;
  placeholder?: string;
  id?: string;
  nonBorder?: boolean;
  focusBorder?: string;
  inputClass?: string;
};

const InputValidation = ({
  onKeyDown,
  errText,
  value,
  defaultValue,
  setValue,
  placeholder,
  id,
  nonBorder,
  focusBorder,
  inputClass,
}: InputValidationProps) => {
  const [inputRequire, setInputRequire] = useState(false);
  const { resetAllInputRequired, setResetAllInputRequired } = useLayoutStates();
  useEffect(() => {
    if (resetAllInputRequired) {
      setInputRequire(false);
    }
    return () => {
      setResetAllInputRequired(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetAllInputRequired]);

  return (
    <>
      <input
        type="text"
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        className={`border rounded w-full px-3 py-2 transition-all ${
          nonBorder ? "border-transparent" : "border-gray-200 "
        } ${
          value === ""
            ? "focus:border-red-400"
            : `${focusBorder || "focus:border-primaryColor"}`
        } ${inputClass}`}
        onFocus={() => setInputRequire(true)}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        id={id}
      />
      {value === "" && inputRequire && (
        <p className="text-[10px] text-red-500">{errText}</p>
      )}
    </>
  );
};

export default InputValidation;
