import React from "react";
import SettingsBackupRestoreRoundedIcon from "@mui/icons-material/SettingsBackupRestoreRounded";
import { Tooltip } from "@nextui-org/tooltip";
import { useTyping } from "@/contexts/TypingStates";

type TypingRestartProps = {
  onRestart?: () => void;
};

const TypingRestart = ({ onRestart }: TypingRestartProps) => {
  const { typingStyles } = useTyping();
  return (
    <div
      className={`flex w-full justify-center z-10 bg-[#1F232C] bg-opacity-5 backdrop-blur-sm p-2 ${
        typingStyles !== "combine" ? "flex-1" : ""
      }`}
    >
      <Tooltip
        showArrow
        content="Restart Test"
        placement="bottom"
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
