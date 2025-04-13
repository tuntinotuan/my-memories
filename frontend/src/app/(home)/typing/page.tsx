import { cards } from "@/api/card/card.data.structure";
import { shuffleArray } from "@/api/card/utils/f";
import CardAnswer from "@/components/card/CardAnswer";
import CardKeyword from "@/components/card/CardKeyword";
import SettingIcon from "@/components/icons/SettingIcon";

export default async function TypingPage() {
  return (
    <div className="flex flex-col w-full gap-2 px-4 pt-2 bg-[#262A33] text-white">
      <div className="flex items-center justify-between bg-gray-500 rounded-lg px-5 py-3">
        <h1>Practice with your typing skill and remember your keyword</h1>
        <SettingIcon></SettingIcon>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
        <div className="relative text-4xl text-[#526777]">
          Background
          <div className="absolute left-0 top-0 bottom-0 w-[2px] h-full bg-[#43FFAF] animate-hideShow"></div>
        </div>
        <span className="text-2xl">Lý lịch, phần sau</span>
      </div>
    </div>
  );
}
