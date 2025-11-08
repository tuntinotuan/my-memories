"use client";
import { TypingContent } from "./modules/layout/typing.content";
import { TypingResults } from "./modules/layout/typing.results";
import { TypingHeaderMenu } from "./modules/layout/typing.header.menu";
import { useTyping } from "@/contexts/TypingStates";
import { typingwords } from "@/api/typing/typing.data.structure";
import { useEffect } from "react";
import { useTypingTheme } from "@/contexts/typingThemeStates";
import TypingPageSkeleton from "@/components/skeleton/TypingPageSkeleton";

export default function TypingPage() {
  const { showResults, loadingTypingWordList } = useTyping();
  const { setSingleTheme } = useTypingTheme();
  useEffect(() => {
    setSingleTheme("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col w-full gap-2 px-4 pt-2 bg-typingBg text-white">
      {loadingTypingWordList && <TypingPageSkeleton></TypingPageSkeleton>}
      {!showResults && !loadingTypingWordList && (
        <TypingHeaderMenu></TypingHeaderMenu>
      )}
      <TypingContent data={typingwords} show={!showResults}></TypingContent>

      {showResults && <TypingResults></TypingResults>}
    </div>
  );
}
