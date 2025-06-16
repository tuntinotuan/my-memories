import Button from "@/components/button/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import { useEffect, useRef } from "react";
import { TypingItem } from "./TypingItem";

export const Form = ({
  word,
  setWord,
  meaning,
  setMeaning,
  handleAddAPairOfWord,
  typingList,
  listName,
  fileName,
  setListName,
  setFileName,
  setTypingList,
}: any) => {
  const ref = useRef<HTMLDivElement | null>(null);

  // auto scroll to end after add a new pair of word
  useEffect(() => {
    const scrollCur = ref.current;
    if (scrollCur) {
      scrollCur.scrollTop = scrollCur.scrollHeight;
    }
  }, [typingList]);
  const handleClearData = () => {
    setTypingList([]);
    setFileName("");
  };
  return (
    <div className="flex items-start gap-2 w-full">
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <input
            defaultValue={fileName.replace(/\.[^/.]+$/, "")}
            value={listName}
            type="text"
            className="w-full text-typingColorActive border border-transparent focus:border-typingColorActive transition-all px-2 py-1 rounded"
            placeholder="Typing your list name..."
            onChange={(e) => setListName(e.target.value)}
            id="listName"
          />
        </div>
        <input
          value={word}
          type="text"
          className="border border-gray-300 rounded w-full px-3 py-2 focus:border-typingColorActive transition-all"
          placeholder="word name..."
          onChange={(e) => setWord(e.target.value)}
          id="wordName"
          required
        />
        <input
          value={meaning}
          type="text"
          className="border border-gray-300 rounded w-full px-3 py-2 focus:border-typingColorActive transition-all"
          placeholder="meaning of word..."
          onChange={(e) => setMeaning(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddAPairOfWord();
            }
          }}
          id="wordMeaning"
          required
        />
        <Button
          className="bg-typingBgControlMenu"
          hover=" hover:bg-typingColorActive"
          onClick={handleAddAPairOfWord}
        >
          <PlusIcon></PlusIcon>Add a pair of word
        </Button>
        {typingList.length > 0 && (
          <div className="flex items-center justify-between">
            <p
              className="hover:underline cursor-pointer transition-all"
              onClick={handleClearData}
            >
              Clear data
            </p>
            <p className="px-1 border border-gray-200 border-dotted rounded">
              {typingList.length}
            </p>
          </div>
        )}
      </div>
      <div
        className="flex flex-col items-center justify-start gap-1 w-1/2 max-h-[150px] border border-gray-200 border-dotted rounded p-2 overflow-y-auto"
        ref={ref}
      >
        {typingList.length === 0 && (
          <p className="text-[10px] text-typingTextWrong">
            Nothing is imported
          </p>
        )}
        {typingList.length > 0 &&
          typingList.map((item: any, index: any) => (
            <TypingItem key={index} data={item}></TypingItem>
          ))}
      </div>
    </div>
  );
};
