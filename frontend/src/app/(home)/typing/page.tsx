"use client";
import { TypingContent } from "./modules/TypingContent";
import { TypingResults } from "./modules/TypingResults";
import { TypingHeaderMenu } from "./modules/TypingHeaderMenu";
import { useTyping } from "@/contexts/TypingStates";

export default function TypingPage() {
  const { showResults } = useTyping();
  return (
    <div className="flex flex-col w-full gap-2 px-4 pt-2 bg-typingBg text-white">
      {!showResults && <TypingHeaderMenu></TypingHeaderMenu>}
      {!showResults && <TypingContent></TypingContent>}
      {showResults && <TypingResults></TypingResults>}
    </div>
  );
}
