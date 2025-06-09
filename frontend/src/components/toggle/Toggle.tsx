import React, { useEffect, useState } from "react";
import CabybaraWorkingIcon from "../icons/cabybara/CabybaraWorkingIcon";
import CabybaraLieIcon from "../icons/cabybara/CabybaraLieIcon";
import CabybaraDriveIcon from "../icons/cabybara/CabybaraDriveIcon";
import CabybaraLoverIcon from "../icons/cabybara/CabybaraLoverIcon";

type ToggleProps = {
  size?: "small" | "medium" | "large";
  cabybaraType?: 1 | 2 | 3;
};

const Toggle = ({ size = "medium", cabybaraType = 2 }: ToggleProps) => {
  const [isON, setIsON] = useState<boolean>(false);
  const [styles, setStyles] = useState({
    btnW: 0,
    btnH: 0,
    distance: 0,
    iconW: 0,
  });
  const [cabybaraStyles, setCabybaraStyles] = useState({
    on: <p></p>,
    off: <p></p>,
  });
  const { btnH, btnW, distance, iconW } = styles;
  useEffect(() => {
    let currentStyles = {
      btnW: 0,
      btnH: 0,
      distance: 0,
      iconW: 0,
    };
    switch (size) {
      case "small":
        currentStyles = { btnW: 50, btnH: 30, distance: 10, iconW: 30 };
        break;
      case "medium":
        currentStyles = { btnW: 70, btnH: 40, distance: 10, iconW: 40 };
        break;
      case "large":
        currentStyles = { btnW: 90, btnH: 50, distance: 10, iconW: 50 };
        break;
      default:
        break;
    }

    setStyles(currentStyles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);
  useEffect(() => {
    let currentCabybaraStyles = { on: <p></p>, off: <p></p> };

    switch (cabybaraType) {
      case 1:
        currentCabybaraStyles = {
          on: <CabybaraWorkingIcon cabyWidth={iconW} />,
          off: <CabybaraLieIcon cabyWidth={iconW} />,
        };
        break;
      case 2:
        currentCabybaraStyles = {
          on: <CabybaraDriveIcon cabyWidth={iconW} />,
          off: <CabybaraLieIcon cabyWidth={iconW} />,
        };
        break;
      case 3:
        currentCabybaraStyles = {
          on: <CabybaraLoverIcon cabyWidth={iconW} />,
          off: <CabybaraLieIcon cabyWidth={iconW} />,
        };
        break;
      default:
        break;
    }
    setCabybaraStyles(currentCabybaraStyles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cabybaraType, iconW]);
  return (
    <div
      className={`relative flex items-center rounded-full transition-all cursor-pointer mt-10 ${
        isON ? "bg-green-400 " : "bg-gray-300"
      }`}
      style={{ width: btnW, height: btnH, padding: distance / 2 }}
      onClick={() => setIsON((pre) => !pre)}
    >
      <div className="absolute top-0 left-1/2 -translate-y-[95%] -translate-x-1/2">
        {isON ? cabybaraStyles.on : cabybaraStyles.off}
      </div>
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
