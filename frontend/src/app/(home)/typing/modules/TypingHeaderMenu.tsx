import SettingIcon from "@/components/icons/SettingIcon";
import { Tooltip } from "@nextui-org/tooltip";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import ClockIcon from "@/components/icons/ClockIcon";
import WordIcon from "@/components/icons/WordIcon";

export const TypingHeaderMenu = () => {
  return (
    <div className="flex items-center gap-3 !w-auto mx-auto bg-[#1F232C] text-[#526777] rounded-lg px-5 py-3">
      <Tooltip
        showArrow
        content="Practice with your typing skill and remember your keyword"
        placement="bottom"
        radius="sm"
        delay={200}
        closeDelay={200}
        className="!px-2 !py-[2px]"
        shadow="sm"
      >
        <h1 className="cursor-default">Typing</h1>
      </Tooltip>

      <div className="w-[6px] h-full bg-[#262A33] rounded-full"></div>
      <div className="flex items-center gap-1 hover:text-white transition-all cursor-pointer">
        <ClockIcon />
        time
      </div>
      <div className="flex items-center gap-1 hover:text-white transition-all cursor-pointer">
        <WordIcon />
        words
      </div>
      <div className="w-[6px] h-full bg-[#262A33] rounded-full"></div>
      <p className="text-[#43FFAF] hover:text-white transition-all cursor-pointer">
        1
      </p>
      <p className="hover:text-white transition-all cursor-pointer">10</p>
      <p className="hover:text-white transition-all cursor-pointer">25</p>
      <p className="hover:text-white transition-all cursor-pointer">50</p>
      <p className="hover:text-white transition-all cursor-pointer">100</p>
      <div className="w-[6px] h-full bg-[#262A33] rounded-full"></div>
      <SettingIcon></SettingIcon>
    </div>
  );
};
