import React from "react";
import SettingsBackupRestoreRoundedIcon from "@mui/icons-material/SettingsBackupRestoreRounded";
import { Tooltip } from "@nextui-org/tooltip";

type TypingRestartProps = {
  onRestart?: () => void;
};

const TypingRestart = ({ onRestart }: TypingRestartProps) => {
  return (
    <div className="mx-auto">
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
        <button>
          <SettingsBackupRestoreRoundedIcon
            className="cursor-pointer"
            onClick={onRestart}
          ></SettingsBackupRestoreRoundedIcon>
        </button>
      </Tooltip>
    </div>
  );
};

export default TypingRestart;
