"use client";
import { TypingContent } from "./modules/layout/typing.content";
import { TypingResults } from "./modules/layout/typing.results";
import { TypingHeaderMenu } from "./modules/layout/typing.header.menu";
import { useTyping } from "@/contexts/TypingStates";
import { typingwords } from "@/api/typing/typing.data.structure";
import { useEffect } from "react";
import { useTypingTheme } from "@/contexts/typingThemeStates";
import PopupTypingSetting from "@/components/popup/typing-setting/PopupTypingSetting";
import { useLayoutStates } from "@/contexts/layoutStates";

export default function TypingPage() {
  const { showResults } = useTyping();
  const { setSingleTheme } = useTypingTheme();
  const { showTypingSetting, setShowTypingSetting } = useLayoutStates();
  useEffect(() => {
    setSingleTheme("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col w-full gap-2 px-4 pt-2 bg-typingBg text-white">
      <PopupTypingSetting
        show={showTypingSetting}
        onClose={() => setShowTypingSetting(false)}
      ></PopupTypingSetting>
      {!showResults && <TypingHeaderMenu></TypingHeaderMenu>}
      {!showResults && <TypingContent data={typingwords}></TypingContent>}
      {showResults && <TypingResults></TypingResults>}
    </div>
  );
}
