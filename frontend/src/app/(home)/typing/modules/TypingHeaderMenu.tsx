import SettingIcon from "@/components/icons/SettingIcon";
import { Tooltip } from "@nextui-org/tooltip";
import ClockIcon from "@/components/icons/ClockIcon";
import WordIcon from "@/components/icons/WordIcon";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import { useTyping } from "@/contexts/TypingStates";

export const TypingHeaderMenu = () => {
  const { typingStyles, setTypingStyles } = useTyping();
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
      <div className="flex items-center gap-1 hover:text-white transition-all cursor-wait">
        <ClockIcon />
        time
      </div>
      <Tooltip
        showArrow
        content="Keyword above & meaning below"
        placement="bottom"
        radius="sm"
        delay={500}
        closeDelay={200}
        className="!px-2 !py-[2px]"
        shadow="sm"
      >
        <div
          className={`flex items-center gap-1 hover:text-white transition-all cursor-pointer ${
            typingStyles === "combine" ? "text-[#43FFAF]" : ""
          }`}
          onClick={() => setTypingStyles("combine")}
        >
          <DragHandleRoundedIcon fontSize="inherit" />
          combine
        </div>
      </Tooltip>
      <div
        className={`flex items-center gap-1 hover:text-white transition-all cursor-pointer ${
          typingStyles === "words" ? "text-[#43FFAF]" : ""
        }`}
        onClick={() => setTypingStyles("words")}
      >
        <WordIcon />
        words
      </div>
      {typingStyles !== "combine" && (
        <>
          <div className="w-[6px] h-full bg-[#262A33] rounded-full"></div>
          <p className="text-[#43FFAF] hover:text-white transition-all cursor-pointer">
            16
          </p>
          <p className="hover:text-white transition-all cursor-pointer">10</p>
          <p className="hover:text-white transition-all cursor-pointer">25</p>
          <p className="hover:text-white transition-all cursor-pointer">50</p>
          <p className="hover:text-white transition-all cursor-pointer">100</p>
        </>
      )}
      <div className="w-[6px] h-full bg-[#262A33] rounded-full"></div>
      <SettingIcon></SettingIcon>
    </div>
  );
};
