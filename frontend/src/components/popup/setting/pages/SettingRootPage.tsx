import { Id } from "@/app/(home)/project/[slug]/modules/types";
import { InputPencilEdit } from "@/components/input/InputPencilEdit";
import { useTyping } from "@/contexts/TypingStates";
import React from "react";
import { SettingItem } from "../components/SettingItem";

const SettingRootPage = ({ listControls }: { listControls: any }) => {
  const {
    wordList,
    setWordList,
    currentlyPickedSetting,
    setCurrentlyPickedSetting,
  } = useTyping();

  const handleUpdateTypingListName = (id: Id, title: string) => {
    const newTasks = wordList.map((item: any) => {
      if (item.id !== id) return item;
      return { ...item, name: title };
    });
    setCurrentlyPickedSetting({ ...currentlyPickedSetting, title });
    setWordList(newTasks);
  };
  return (
    <>
      <div className="flex flex-col border border-transparent border-b-gray-200 p-3">
        <InputPencilEdit
          title={currentlyPickedSetting.title}
          id={currentlyPickedSetting.id}
          updateTitle={handleUpdateTypingListName}
        ></InputPencilEdit>
      </div>
      {listControls.map((item: any) => (
        <SettingItem
          key={item.title}
          onClick={item.onClick ? item.onClick : () => {}}
          href={item.href}
          icon={item.icon}
          title={item.title}
        ></SettingItem>
      ))}
    </>
  );
};

export default SettingRootPage;
