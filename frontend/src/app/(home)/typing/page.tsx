"use client";
import { TypingContent } from "./modules/TypingContent";
import { TypingResults } from "./modules/TypingResults";
import { TypingHeaderMenu } from "./modules/TypingHeaderMenu";
import { useTyping } from "@/contexts/TypingStates";
import { typingwords } from "@/api/typing/typing.data.structure";
import { useEffect } from "react";
import { useTypingTheme } from "@/contexts/typingThemeStates";

export default function TypingPage() {
  const { showResults } = useTyping();
  const { setSingleTheme } = useTypingTheme();
  useEffect(() => {
    setSingleTheme("");
  }, []);

  return (
    <div className="flex flex-col w-full gap-2 px-4 pt-2 bg-typingBg text-white">
      {!showResults && <TypingHeaderMenu></TypingHeaderMenu>}
      {!showResults && <TypingContent data={typingwords}></TypingContent>}
      {showResults && <TypingResults></TypingResults>}
    </div>
  );
}
