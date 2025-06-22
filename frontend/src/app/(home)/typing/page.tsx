"use client";
import { TypingContent } from "./modules/typing.content";
import { TypingResults } from "./modules/typing.results";
import { TypingHeaderMenu } from "./modules/typing.header.menu";
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
