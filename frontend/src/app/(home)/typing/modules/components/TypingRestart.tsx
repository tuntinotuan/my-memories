import React, { useEffect, useRef } from "react";
import SettingsBackupRestoreRoundedIcon from "@mui/icons-material/SettingsBackupRestoreRounded";
import { Tooltip } from "@nextui-org/tooltip";
import { useTyping } from "@/contexts/TypingStates";
import MyTooltip from "@/components/tooltip/MyTooltip";

type TypingRestartProps = {
  onRestart?: () => void;
  className?: string;
};

const TypingRestart = ({ onRestart, className }: TypingRestartProps) => {
  const { typingStyles, typingFontsizeX, hideOverlay } = useTyping();
  const ref = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <div
      className={`flex w-full justify-center z-10 bg-opacity-5 p-2 ${
        typingStyles !== "combine" ? "flex-1" : ""
      } ${
        typingStyles === "words" && typingFontsizeX <= 3 && hideOverlay
          ? "backdrop-blur-sm"
          : ""
      } ${typingFontsizeX > 3 ? "absolute top-20" : ""} ${className}`}
    >
      {/* <Tooltip
        showArrow
        content="Restart test"
        placement="top"
        radius="sm"
        delay={200}
        closeDelay={200}
        className="!px-2 !py-[2px] dark:text-white"
        shadow="sm"
      > */}
      <MyTooltip
        contents={<p className="max-w-[200px] text-center">Restart test</p>}
        size="small"
        arrowRounded
      >
        <label
          tabIndex={0}
          ref={ref}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onRestart && onRestart();
            }
          }}
          className="h-0 text-typingTextNormal"
        >
          <SettingsBackupRestoreRoundedIcon
            className="cursor-pointer"
            onClick={onRestart}
          ></SettingsBackupRestoreRoundedIcon>
        </label>
      </MyTooltip>
      {/* </Tooltip> */}
    </div>
  );
};

export default TypingRestart;
