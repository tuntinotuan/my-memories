import React from "react";
import { BoardSidebarProps } from "../layout/board/type";
import BoardItem from "../layout/board/BoardItem";

const BoardList = ({
  values,
  lastItem,
}: {
  values: BoardSidebarProps[];
  lastItem?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col gap-1 border border-transparent border-b-gray-200 py-2 ${
        lastItem ? "border-none" : ""
      }`}
    >
      {values.map((value, index) => (
        <BoardItem
          icon={value.icon}
          title={value.title}
          disable={value.disable}
          key={index}
        ></BoardItem>
      ))}
    </div>
  );
};

export default BoardList;
