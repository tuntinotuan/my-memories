import TypingRestart from "@/components/typing/TypingRestart";
import { useTyping } from "@/contexts/TypingStates";

export const TypingResults = () => {
  const { setShowResults, setHideOverlay } = useTyping();
  return (
    <div className="mx-auto h-full flex flex-col justify-around  gap-2 text-typingTextNormal">
      <span className="text-3xl">wpm</span>
      <p className="text-6xl text-typingColorActive">107</p>
      <span className="text-3xl">acc</span>
      <p className="text-6xl text-typingColorActive">90%</p>
      <TypingRestart
        onRestart={() => {
          setShowResults(false);
          setHideOverlay(true);
        }}
      ></TypingRestart>
    </div>
  );
};
