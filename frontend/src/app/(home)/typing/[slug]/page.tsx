"use client";
import { useTyping } from "@/contexts/TypingStates";
import { TypingHeaderMenu } from "../modules/TypingHeaderMenu";
import { TypingResults } from "../modules/TypingResults";
import { TypingContent } from "../modules/TypingContent";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { useState } from "react";
import { useFetchSingleTypingPage } from "../func/fetchSingleTyping";

export default function Page({ params }: any) {
  const { showResults } = useTyping();
  const [newWordList, setNewWordList] = useState<typingWordsTypes[]>([
    { word: "apple", meaning: "qua tao" },
  ]);
  useFetchSingleTypingPage(params, setNewWordList);
  return (
    <div className="flex flex-col w-full gap-2 px-4 pt-2 bg-typingBg text-white">
      {!showResults && <TypingHeaderMenu changeFor="single"></TypingHeaderMenu>}
      {!showResults && <TypingContent data={newWordList}></TypingContent>}
      {showResults && <TypingResults></TypingResults>}
    </div>
  );
}
