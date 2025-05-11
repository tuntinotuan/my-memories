"use client";
import { useTyping } from "@/contexts/TypingStates";
import { TypingHeaderMenu } from "../modules/TypingHeaderMenu";
import { TypingResults } from "../modules/TypingResults";
import { TypingContent } from "../modules/TypingContent";
import { cutIdFromSlug } from "@/utils/otherFs";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { useEffect, useState } from "react";

export default function Page({ params }: any) {
  const { showResults, wordList } = useTyping();
  const [newWordList, setNewWordList] = useState<typingWordsTypes[]>([
    { word: "apple", meaning: "qua tao" },
  ]);
  useEffect(() => {
    const newData = wordList.find(
      (item: any) => item.id === Number(cutIdFromSlug(params.slug, "-id"))
    );
    console.log("newData", newData);
    if (!newData) return;
    setNewWordList(newData.typingList);
  }, [wordList, params.slug]);

  return (
    <div className="flex flex-col w-full gap-2 px-4 pt-2 bg-typingBg text-white">
      {params.slug}
      {!showResults && <TypingHeaderMenu></TypingHeaderMenu>}
      {!showResults && <TypingContent data={newWordList}></TypingContent>}
      {showResults && <TypingResults></TypingResults>}
    </div>
  );
}
