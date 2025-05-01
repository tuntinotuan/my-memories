import React, { useEffect, useState } from "react";
import PopupOverlay from "./popup.overlay";
import { TopControl } from "./PopupCreateboard";
import Button from "../button/Button";
import PlusIcon from "../icons/PlusIcon";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { generateId } from "@/utils/otherFs";

type PopupCreateTypingListProps = {
  show: boolean;
  onClose: () => void;
};
const PopupCreateTypingList = ({
  show,
  onClose,
}: PopupCreateTypingListProps) => {
  return (
    <PopupOverlay
      show={show}
      selector="myportal"
      width={500}
      onClick={onClose}
      className="bg-typingBg text-typingTextCorrect"
    >
      <TopControl title="Create typing list" onClose={onClose} />
      <Body onClose={onClose} />
    </PopupOverlay>
  );
};

const Body = ({ onClose }: any) => {
  const [wordList, setWordList] = useState<any>([]);
  const [typingList, setTypingList] = useState<typingWordsTypes[]>([]);
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");

  useEffect(() => {
    async function fetchWordListFromLocalStorage() {
      let lists = null;
      try {
        const stored = localStorage.getItem("wordList");
        if (stored) lists = await JSON.parse(stored);
      } catch (error) {
        console.error("Invalid JSON:", error);
      }
      if (lists !== null && lists.length > 0) {
        setWordList(lists);
      }
    }
    fetchWordListFromLocalStorage();
  }, []);

  useEffect(() => {
    if (wordList.length <= 0) return;
    localStorage.setItem("wordList", JSON.stringify(wordList));
  }, [wordList]);

  const handleAddAPairOfWord = () => {
    if (!word || !meaning) return;
    const newWord = {
      word,
      meaning,
    };
    setTypingList([...typingList, newWord]);
    setWord("");
    setMeaning("");
  };
  const handleCreateTypingList = () => {
    if (typingList.length <= 0) return;
    const newList = {
      id: generateId(),
      typingList,
    };
    setWordList([...wordList, newList]);
    setTypingList([]);
  };
  return (
    <div className="flex flex-col gap-2 h-full w-full overflow-auto px-4 pb-4">
      <div className="flex gap-1">
        <label htmlFor="">List name:</label>
        <input
          type="text"
          className="text-typingColorActive"
          placeholder="Typing your list name.."
        />
      </div>
      <div className="flex items-start gap-2 w-full">
        <div className="flex-1 flex flex-col gap-1">
          <input
            value={word}
            type="text"
            className="border border-gray-300 rounded w-full px-3 py-2 focus:border-typingColorActive transition-all"
            placeholder="word name..."
            onChange={(e) => setWord(e.target.value)}
            required
          />
          <input
            value={meaning}
            type="text"
            className="border border-gray-300 rounded w-full px-3 py-2 focus:border-typingColorActive transition-all"
            placeholder="meaning of word..."
            onChange={(e) => setMeaning(e.target.value)}
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
            <div className="ml-auto px-2 border border-gray-200 border-dotted rounded">
              {typingList.length}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-start gap-1 w-1/2 max-h-[150px] border border-gray-200 border-dotted rounded p-2 overflow-y-auto">
          {typingList.length === 0 && (
            <p className="text-[10px] text-typingTextWrong">
              Nothing is imported
            </p>
          )}
          {typingList.length > 0 &&
            typingList.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center border border-gray-200 border-dotted py-1 px-2 rounded"
              >
                <p className="text-typingTextNormal">{item.word}</p>
                <p className="text-[9px] text-typingTextHover">
                  {item.meaning}
                </p>
              </div>
            ))}
        </div>
      </div>
      <label htmlFor="">Other options</label>
      <div className="flex gap-2">
        <div className="cursor-pointer hover:bg-typingBgControlMenu transition-all p-2 rounded">
          .txt files
        </div>
        <div className="cursor-pointer hover:bg-typingBgControlMenu transition-all p-2 rounded">
          .xlsx files
        </div>
      </div>
      <Button
        hover="hover:bg-typingBgControlMenu"
        onClick={handleCreateTypingList}
      >
        Create list
      </Button>
    </div>
  );
};

export default PopupCreateTypingList;
