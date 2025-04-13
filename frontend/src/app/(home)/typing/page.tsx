"use client";
import SettingIcon from "@/components/icons/SettingIcon";
import { useState } from "react";

export default function TypingPage() {
  const [text, setText] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const originalText = "background";
  const newText = originalText.split("");
  console.log("text", text);
  const handleChangeInput = (e: any) => {
    setText(e.target.value);
    if (text.length < newText.length) {
      setCursorPosition(20 * e.target.value.length + 1);
    } else {
      setCursorPosition(cursorPosition);
    }
    console.log("values", e.target.value);
  };
  return (
    <div className="flex flex-col w-full gap-2 px-4 pt-2 bg-[#262A33] text-white">
      <div className="flex items-center justify-between bg-gray-500 rounded-lg px-5 py-3">
        <h1>Practice with your typing skill and remember your keyword</h1>
        <SettingIcon></SettingIcon>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
        <label
          htmlFor="typingCursor"
          className="relative flex items-center text-4xl text-[#526777] cursor-pointer"
        >
          {newText.map((item) => (
            <div key={item}>{item}</div>
          ))}
          <input
            className="absolute top-0 bottom-0 w-[2px] h-full bg-[#43FFAF] opacity-0 focus:opacity-100 focus:animate-hideShow transition-all"
            id="typingCursor"
            onChange={handleChangeInput}
            style={{ left: cursorPosition }}
          />
        </label>
        <span className="text-2xl">Lý lịch, phần sau</span>
      </div>
    </div>
  );
}
