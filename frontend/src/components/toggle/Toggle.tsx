import React, { useState } from "react";

const Toggle = () => {
  const [isON, setIsON] = useState<boolean>(false);
  let btnW = 90;
  let btnH = 50;
  let distance = 10;
  return (
    <div
      className={`flex items-center rounded-full transition-all cursor-pointer ${
        isON ? "bg-green-400 " : "bg-gray-300"
      }`}
      style={{ width: btnW, height: btnH, padding: distance / 2 }}
      onClick={() => setIsON((pre) => !pre)}
    >
      <div
        className={`rounded-full bg-white transition-all `}
        style={{
          width: btnH - distance,
          height: btnH - distance,
          ...(isON ? { translateY: 0 } : { translate: btnH - distance }),
        }}
      ></div>
    </div>
  );
};

export default Toggle;
