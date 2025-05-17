import React, { useEffect, useRef, useState } from "react";
import PopupOverlay from "./popup.overlay";
import { TopControl } from "./PopupCreateboard";
import Button from "../button/Button";
import PlusIcon from "../icons/PlusIcon";
import { typingWordsTypes } from "@/api/typing/typing.type";
import { generateId } from "@/utils/otherFs";
import { useTyping } from "@/contexts/TypingStates";
import FileUpload from "../file/FileUpload";
import * as XLSX from "xlsx";

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

const Form = ({
  word,
  setWord,
  meaning,
  setMeaning,
  handleAddAPairOfWord,
  typingList,
  listName,
  fileName,
  setListName,
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
const TypingItem = ({ data }: any) => {
  return (
    <div className="flex flex-col items-center border border-gray-200 border-dotted py-1 px-2 rounded">
      <p className="text-typingTextNormal">{data.word}</p>
      <p className="text-[9px] text-typingTextHover">{data.meaning}</p>
    </div>
  );
};
const OtherOptions = ({
  setTypingList,
  fileName,
  setFileName,
  setListName,
}: any) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();

    const fileName = file.name.toLowerCase();
    setListName(fileName.replace(/\.[^/.]+$/, ""));
    const isTxt = fileName.endsWith(".txt");
    const isXlsx = fileName.endsWith(".xlsx") || fileName.endsWith(".xls");
    reader.onload = (event) => {
      const result: typingWordsTypes[] = [];
      if (isTxt) {
        const text = reader.result as string;
        const lines = text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0); // remove blank lines
        for (let i = 0; i < lines.length; i += 2) {
          const word = lines[i];
          const meaning = lines[i + 1];
          if (word && meaning) {
            result.push({ word, meaning });
          }
        }
      }

      const arrayBuffer = event.target?.result as ArrayBuffer;

      // ✅ Use `type: "array"` to fix the ZIP compression method error
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (isXlsx) {
        for (let i = 0; i < rows.length; i++) {
          const [word, meaning] = rows[i];
          if (word !== undefined && meaning !== undefined) {
            result.push({ word: String(word), meaning: String(meaning) });
          }
        }
      }
      setTypingList(result);
    };

    isTxt && reader.readAsText(file);
    isXlsx && reader.readAsArrayBuffer(file);
  };
  return (
    <>
      <label htmlFor="">Other options:</label>
      <FileUpload
        title={fileName || "notepad, excel files"}
        handleFileChange={handleFileChange}
      ></FileUpload>
    </>
  );
};
export default PopupCreateTypingList;
