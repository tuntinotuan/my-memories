import React, { useState } from "react";
import PopupOverlay from "../../overlay/popup.overlay";
import Button from "../../button/Button";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { generateId } from "@/utils/otherFs";
import { useTyping } from "@/contexts/TypingStates";
import { TopControl } from "../components/TopControl";
import { Form } from "./components/Form";
import { OtherOptions } from "./components/OtherOptions";

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
  const [typingList, setTypingList] = useState<typingWordsTypes[]>([]);
  const [listName, setListName] = useState("");
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const { wordList, setWordList } = useTyping();
  const [fileName, setFileName] = useState("");

  const handleAddAPairOfWord = () => {
    if (!word) return document.getElementById("wordName")?.focus();
    if (!meaning) return document.getElementById("wordMeaning")?.focus();
    const newWord = {
      word,
      meaning,
    };
    setTypingList([...typingList, newWord]);
    setWord("");
    setMeaning("");
    document.getElementById("wordName")?.focus();
  };
  const handleCreateTypingList = () => {
    if (!listName) return document.getElementById("listName")?.focus();

    if (typingList.length <= 0) return;
    const newList = {
      id: generateId(),
      name: listName,
      theme: "theme-dark",
      typingList,
    };
    setWordList([...wordList, newList]);
    setTypingList([]);
    setListName("");
    setFileName("");
    onClose();
  };

  return (
    <div className="flex flex-col gap-2 h-full w-full overflow-auto px-4 pb-4">
      <Form
        word={word}
        setWord={setWord}
        meaning={meaning}
        setMeaning={setMeaning}
        handleAddAPairOfWord={handleAddAPairOfWord}
        typingList={typingList}
        listName={listName}
        fileName={fileName}
        setFileName={setFileName}
        setListName={setListName}
        setTypingList={setTypingList}
      ></Form>
      <OtherOptions
        setTypingList={setTypingList}
        fileName={fileName}
        setFileName={setFileName}
        setListName={setListName}
      />
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
