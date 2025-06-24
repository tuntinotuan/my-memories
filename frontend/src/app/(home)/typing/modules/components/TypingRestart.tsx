import React from "react";
import SettingsBackupRestoreRoundedIcon from "@mui/icons-material/SettingsBackupRestoreRounded";
import { Tooltip } from "@nextui-org/tooltip";
import { useTyping } from "@/contexts/TypingStates";

type TypingRestartProps = {
  onRestart?: () => void;
  className?: string;
};

const TypingRestart = ({ onRestart, className }: TypingRestartProps) => {
  const { typingStyles } = useTyping();
  return (
    <div
      className={`flex w-full justify-center z-10 bg-opacity-5 p-2 ${
        typingStyles !== "combine" ? "flex-1" : ""
      } ${typingStyles === "words" ? "backdrop-blur-sm" : ""} ${className}`}
    >
      <Tooltip
        showArrow
        content="Restart Test"
        placement="top"
        radius="sm"
        delay={200}
        closeDelay={200}
        className="!px-2 !py-[2px]"
        shadow="sm"
      >
        <label
          tabIndex={0}
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
      </Tooltip>
    </div>
  );
};

export default TypingRestart;
