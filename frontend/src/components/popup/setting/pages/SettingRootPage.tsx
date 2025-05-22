import { InputPencilEdit } from "@/components/input/InputPencilEdit";
import React from "react";
import { SettingItem } from "../components/SettingItem";

const SettingRootPage = ({
  listControls,
  title,
  id,
  handleUpdateTitle,
}: any) => {
  return (
    <>
      <div className="flex flex-col border border-transparent border-b-gray-200 p-3">
        <InputPencilEdit
          title={title}
          id={id}
          updateTitle={handleUpdateTitle}
        ></InputPencilEdit>
      </div>
      {listControls.map((item: any) => (
        <SettingItem
          key={item.title}
          href={item.href}
          icon={item.icon}
          title={item.title}
          onClick={item.onClick ? item.onClick : () => {}}
        ></SettingItem>
      ))}
    </>
  );
};

export default SettingRootPage;
