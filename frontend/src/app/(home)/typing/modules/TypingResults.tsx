import TypingRestart from "@/components/typing/TypingRestart";

export const TypingResults = () => {
  return (
    <div className="mx-auto h-full flex flex-col items-center justify-center gap-2 text-[#526777]">
      <span className="text-3xl">wpm</span>
      <p className="text-6xl text-[#43FFAF]">107</p>
      <span className="text-3xl">acc</span>
      <p className="text-6xl text-[#43FFAF]">90%</p>
      <TypingRestart></TypingRestart>
    </div>
  );
};
