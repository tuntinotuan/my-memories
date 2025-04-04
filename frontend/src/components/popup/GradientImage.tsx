import React, { useRef, useState } from "react";
import { LinearOrUrl } from "../project/types";
import ThreeDotsIcon from "../icons/ThreeDotsIcon";
import PopupMoreBackground from "./PopupMoreBackground";

type GradientImageProps = {
  gradientList: LinearOrUrl[];
  currentGradient: LinearOrUrl;
  handleClick: (item: LinearOrUrl) => void;
};

const GradientImage = ({
  gradientList,
  currentGradient,
  handleClick,
}: GradientImageProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="gradient-list grid grid-cols-6 gap-2 mt-2">
      {gradientList.map((item, index) => (
        <div
          className={`w-full h-10 rounded shadow-md cursor-pointer hover:brightness-110 ${
            item.type === "linearGradient" &&
            currentGradient.type === "linearGradient" &&
            currentGradient.from === item.from &&
            currentGradient.to === item.to
              ? "border-2 border-primaryColor shadow-sm shadow-primaryColor"
              : ""
          }`}
          key={index}
          style={
            item.type === "linearGradient"
              ? {
                  background: `linear-gradient(to bottom right, ${item.from}, ${item.to})`,
                }
              : {}
          }
          onClick={() => handleClick(item)}
        ></div>
      ))}
      <div
        className={`flex items-center justify-center w-full h-10 bg-primaryHover text-primaryText hover:text-black hover:shadow-md hover:-translate-y-[1px] rounded shadow-sm cursor-pointer transition-all`}
        ref={ref}
        onClick={() => setShowPopup(true)}
      >
        <ThreeDotsIcon fontSize="medium"></ThreeDotsIcon>
      </div>
      <PopupMoreBackground
        rect={ref.current?.getBoundingClientRect()}
        show={showPopup}
        onClose={() => setShowPopup(false)}
        update={handleClick}
      ></PopupMoreBackground>
    </div>
  );
};

export default GradientImage;
