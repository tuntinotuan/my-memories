"use client";
import { useTyping } from "@/contexts/TypingStates";
import { TypingHeaderMenu } from "../modules/TypingHeaderMenu";
import { TypingResults } from "../modules/TypingResults";
import { TypingContent } from "../modules/TypingContent";
import { cutIdFromSlug } from "@/utils/otherFs";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { useEffect, useState } from "react";
import { useTypingTheme } from "@/contexts/typingThemeStates";

export default function Page({ params }: any) {
  const { showResults, wordList, setShowResults, setSingleTypingList } =
    useTyping();
  const { setSingleTheme } = useTypingTheme();
  const [newWordList, setNewWordList] = useState<typingWordsTypes[]>([
    { word: "apple", meaning: "qua tao" },
  ]);
  useEffect(() => {
    setShowResults(false);
    const newData = wordList.find(
      (item: any) => item.id === Number(cutIdFromSlug(params.slug, "-id"))
    );
    console.log("newData", newData);
    if (!newData) return;
    setNewWordList(newData.typingList);
    setSingleTypingList(newData);
    setSingleTheme(newData.theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordList, params.slug]);

  return (
    <div className="flex flex-col w-full gap-2 px-4 pt-2 bg-typingBg text-white">
      {!showResults && <TypingHeaderMenu changeFor="single"></TypingHeaderMenu>}
      {!showResults && <TypingContent data={newWordList}></TypingContent>}
      {showResults && <TypingResults></TypingResults>}
    </div>
  );
}
