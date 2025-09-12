import React from "react";

const RadioFull = ({
  onClick,
  status,
}: {
  onClick: () => void;
  status: boolean;
}) => {
  return (
    <div
      className="flex items-center justify-center w-5 h-5 border-2 border-blue-600 rounded-full cursor-pointer transition-all"
      onClick={onClick}
    >
      <div
        className={`w-3 h-3 rounded-full bg-blue-600 ${
          status ? "opacity-100" : "opacity-0"
        }`}
      ></div>
    </div>
  );
};

export default RadioFull;
