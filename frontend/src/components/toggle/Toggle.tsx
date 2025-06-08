import React, { useState } from "react";
import CabybaraWorkingIcon from "../icons/cabybara/CabybaraWorkingIcon";
import CabybaraLieIcon from "../icons/cabybara/CabybaraLieIcon";

const Toggle = () => {
  const [isON, setIsON] = useState<boolean>(false);
  let btnW = 90;
  let btnH = 50;
  let distance = 10;
  return (
    <div
      className={`relative flex items-center rounded-full transition-all cursor-pointer mt-10 ${
        isON ? "bg-green-400 " : "bg-gray-300"
      }`}
      style={{ width: btnW, height: btnH, padding: distance / 2 }}
      onClick={() => setIsON((pre) => !pre)}
    >
      {isON ? (
        <CabybaraWorkingIcon className="absolute top-0 left-1/2 -translate-y-full -translate-x-1/2" />
      ) : (
        <CabybaraLieIcon className="absolute top-0 left-1/2 -translate-y-full -translate-x-1/2" />
      )}
      <div
        className={`rounded-full bg-white transition-all `}
        style={{
          width: btnH - distance,
          height: btnH - distance,
          ...(isON ? { translate: btnH - distance } : { translateY: 0 }),
        }}
      ></div>
    </div>
  );
};

export default Toggle;
