"use client";
import { TypingContent } from "./modules/TypingContent";
import { TypingResults } from "./modules/TypingResults";
import { TypingHeaderMenu } from "./modules/TypingHeaderMenu";

export default function TypingPage() {
  return (
    <div className="flex flex-col w-full gap-2 px-4 pt-2 bg-[#262A33] text-white">
      <TypingHeaderMenu></TypingHeaderMenu>
      <TypingContent></TypingContent>
      {false && <TypingResults></TypingResults>}
    </div>
  );
}
