import React from "react";
import IconCloud from "../icons/IconCloud";
import IconStar from "../icons/IconStar";

const ToggleDarkMode = ({
  on,
  onClick,
  ...rest
}: {
  on: boolean;
  onClick?: () => void;
}) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={on}
        onClick={onClick}
        className="hidden-input"
        onChange={() => {}}
      />
      <div
        className={`inline-block w-[70px] h-[42px] relative cursor-pointer rounded-full p-1 transition-all ease-in-out duration-[2s] ${
          on
            ? "shadow-darkmode bg-[#5A41FE]"
            : "bg-gradient-to-b from-[#3485FE] to-[#98D1F1]"
        }`}
        {...rest}
      >
        <IconStar
          className={`absolute top-1/4 left-1/3 transition-all duration-1000 ${
            on
              ? "opacity-100 rotate-180 scale-100 translate-x-0"
              : "opacity-0 rotate-0 scale-50 translate-x-2"
          }`}
          size="w-[3px] h-[3px]"
        ></IconStar>
        <IconStar
          className={`absolute top-1/3 left-[15px] transition-all duration-[1.5s] ${
            on
              ? "star-scale opacity-100 rotate-[160deg]scale-100 translate-x-0"
              : "opacity-0 rotate-0scale-50 translate-x-2"
          }`}
          size="w-[4px] h-[4px]"
        ></IconStar>
        <IconStar
          className={`absolute top-1/2 left-[8px] transition-all duration-[2s] ${
            on
              ? "opacity-100 rotate-[170deg] scale-100 translate-x-0"
              : "opacity-0 rotate-0 scale-50 translate-x-2"
          }`}
          size="w-[4px] h-[4px]"
        ></IconStar>
        <IconStar
          className={`absolute top-2/3 left-[12px] transition-all duration-[2.5s] ${
            on
              ? "star-scale opacity-100 rotate-[170deg]scale-100 translate-x-0"
              : "opacity-0 rotate-0scale-50 translate-x-2"
          }`}
          size="w-[5px] h-[5px]"
        ></IconStar>
        <IconStar
          className={`absolute top-2/3 left-[22px] transition-all duration-[2s] ${
            on
              ? "star-scale opacity-100 translate-x-0"
              : "opacity-0 translate-x-2"
          }`}
          size="w-[9px] h-[9px]"
        ></IconStar>
        <span
          className={`relative flex items-center justify-center transition-all duration-700 w-[34px] h-[34px] rounded-full overflow-hidden ${
            on
              ? "translate-x-[28px] bg-gradient-to-b from-[#EAF3FF] to-[#D7E9FF]"
              : "bg-gradient-to-b from-[#FF6F50] to-[#FEB941]"
          }`}
        >
          <span
            className={`piece-of-moon absolute top-1/2 left-1/3 w-[3px] h-[3px] rounded-full bg-gradient-to-b from-[#D0E6FF] to-transparent z-20 transition-all duration-[2.5s] ${
              on ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[20px]"
            }`}
          ></span>
          <span
            className={`piece-of-moon absolute top-2/3 left-1/2 w-[5px] h-[5px] rounded-full bg-gradient-to-b from-[#D0E6FF] to-transparent z-20 transition-all duration-[2.5s] ${
              on ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[20px]"
            }`}
          ></span>
          <span
            className={`piece-of-moon absolute top-[60%] right-[2px] w-[6px] h-[6px] rounded-full bg-gradient-to-b from-[#D0E6FF] to-transparent z-20 transition-all duration-[2.5s] ${
              on ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[20px]"
            }`}
          ></span>
          <span
            className={`piece-of-moon absolute -bottom-[7px] left-[42%] w-[9px] h-[9px] rounded-full bg-gradient-to-b from-[#D0E6FF] to-transparent z-20 transition-all duration-[2.5s] ${
              on ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[20px]"
            }`}
          ></span>
          <span
            className={`piece-of-moon absolute top-[60%] -left-[4px] w-4 h-4 rounded-full bg-gradient-to-b from-[#D0E6FF] to-transparent z-20 transition-all duration-[2.5s] ${
              on ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[20px]"
            }`}
          ></span>
          <span
            className={`absolute flex items-center justify-center transition-all duration-1000 w-[28px] h-[28px] rounded-full bg-gradient-to-b from-[#D0E6FF] to-[#EAF3FF] ${
              on ? "sun-moon opacity-100 scale-100 z-10" : "opacity-0 scale-50"
            }`}
          ></span>
          <span
            className={`absolute flex items-center justify-center transition-all duration-1000 w-[28px] h-[28px] rounded-full bg-gradient-to-b from-[#FEB941] to-[#FF6F50] ${
              on ? "opacity-0 scale-50" : "sun-moon opacity-100 scale-100 z-10"
            }`}
          ></span>
        </span>
        <IconCloud
          className={`absolute top-1/4 right-1/3 transition-all duration-[1s] ${
            !on ? "opacity-100 translate-y-0 " : "opacity-0 translate-y-2"
          }`}
          size="w-2 h-2"
        ></IconCloud>
        <IconCloud
          className={`absolute top-1/4 right-[5px] transition-all duration-[2s] ${
            !on ? "opacity-1 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          size="w-[14px] h-[14px]"
        ></IconCloud>
        <IconCloud
          className={`absolute top-1/2 right-1/4 transition-all duration-[1.5s] ${
            !on ? "opacity-100 translate-y-0 " : "opacity-0 translate-y-2"
          }`}
          size="w-3 h-3"
        ></IconCloud>
      </div>
    </label>
  );
};

export default ToggleDarkMode;
