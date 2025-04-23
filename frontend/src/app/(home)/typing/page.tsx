"use client";
import { TypingContent } from "./modules/TypingContent";
import { TypingResults } from "./modules/TypingResults";
import { TypingHeaderMenu } from "./modules/TypingHeaderMenu";
import FlexRowWrap from "./modules/flexRow";

export default function TypingPage() {
  return (
    <div className="flex flex-col w-full gap-2 px-4 pt-2 bg-typingBg text-white">
      <TypingHeaderMenu></TypingHeaderMenu>
      <TypingContent></TypingContent>
      {false && <FlexRowWrap></FlexRowWrap>}
      {false && <TypingResults></TypingResults>}
    </div>
  );
}
