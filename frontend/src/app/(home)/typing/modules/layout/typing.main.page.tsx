"use client";
import React, { useState } from "react";
import { useFetchSingleTypingPage } from "../../func/fetchSingleTyping";
import { useTyping } from "@/contexts/TypingStates";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { TypingHeaderMenu } from "./typing.header.menu";
import { TypingContent } from "./typing.content";
import { TypingResults } from "./typing.results";

const TypingMainPage = ({ params }: any) => {
  const { showResults, textIsLowercase, setTextIsLowercase } = useTyping();
  const [newWordList, setNewWordList] = useState<typingWordsTypes[]>([
    { word: "apple", meaning: "qua tao" },
  ]);
  useFetchSingleTypingPage(params, setNewWordList);
  return (
    <div className="flex flex-col w-full gap-2 px-4 pt-2 bg-typingBg text-white">
      <button
        onClick={() => setTextIsLowercase(!textIsLowercase)}
      >{`lowercase ${textIsLowercase ? "on" : "off"}`}</button>
      {!showResults && <TypingHeaderMenu changeFor="single"></TypingHeaderMenu>}
      {!showResults && <TypingContent data={newWordList}></TypingContent>}
      {showResults && <TypingResults></TypingResults>}
    </div>
  );
};

export default TypingMainPage;
