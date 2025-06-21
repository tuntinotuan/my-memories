import Button from "@/components/button/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import { useRef } from "react";
import { TypingItem } from "./TypingItem";
import { useScrollToEnd } from "@/hooks/useScrollToEnd";
import InputValidation from "@/components/input/InputValidation";

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
  useScrollToEnd(ref, typingList);

  const handleClearData = () => {
    setTypingList([]);
    setFileName("");
    setListName("");
  };
  return (
    <div className="flex items-start gap-2 w-full">
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex flex-col items-center gap-1">
          <InputValidation
            errText="👋 List name is required"
            placeholder="Typing your list name..."
            value={listName}
            defaultValue={fileName.replace(/\.[^/.]+$/, "")}
            setValue={setListName}
            id="listName"
            focusBorder="focus:border-typingColorActive"
            inputClass="!px-2 !py-1 text-typingColorActive"
            nonBorder
          ></InputValidation>
        </div>
        <InputValidation
          errText="👋 Word name is required"
          placeholder="word name..."
          value={word}
          setValue={setWord}
          id="wordName"
          focusBorder="focus:border-typingColorActive"
          inputClass="text-typingColorActive"
        ></InputValidation>
        <InputValidation
          errText="👋 Meaning is required"
          placeholder="meaning of word..."
          value={meaning}
          setValue={setMeaning}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddAPairOfWord();
            }
          }}
          id="wordMeaning"
          focusBorder="focus:border-typingColorActive"
          inputClass="text-typingColorActive"
        ></InputValidation>
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
