import React, { useState } from "react";

const Toggle = () => {
  const [isON, setIsON] = useState<boolean>(false);
  return (
    <div
      className={`relative flex items-center w-[90px] h-[50px] rounded-full transition-all p-[4px] cursor-pointer ${
        isON
          ? "bg-green-400 border-2 border-green-700"
          : "bg-gray-300 border-2 border-gray-500"
      }`}
      onClick={() => setIsON((pre) => !pre)}
    >
      <div
        className={`w-[40px] h-full rounded-full bg-white border border-gray-100 transition-all ${
          isON ? "translate-x-full" : ""
        }`}
      ></div>
    </div>
  );
};

export default Toggle;
