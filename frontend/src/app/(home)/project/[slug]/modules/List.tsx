import Button from "@/components/button/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import React, { useState } from "react";
import ListContainer from "./ListContainer";
import DragIcon from "@/components/icons/DragIcon";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import CardItem from "./CardItem";
import AddBtn from "./AddBtn";
import { CSS } from "@dnd-kit/utilities";
import { Board, Id } from "./types";

const List = ({
  board,
  updateBoard,
}: {
  board: Board;
  updateBoard: (id: Id, title: string) => void;
}) => {
  const itemLists = [
    {
      id: 1,
      title: "Hello",
    },
    {
      id: 2,
      title: "Hi",
    },
    {
      id: 3,
      title: "Talking about this",
    },
  ];
  const [itemData, setItemData] = useState(itemLists);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItemData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  // console.log("itemData", itemData);
  const [editTitle, setEditTitle] = useState(false);
  console.log("editTitle", editTitle);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: board.id,
    data: { type: "Board", board },
    disabled: editTitle,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  // if (isDragging) {
  //   return (
  //     <div
  //       className={`child flex flex-col w-[250px] gap-2 bg-white border border-secondaryColor shrink-0 ${
  //         isDragging ? "blur-[0.5px]" : ""
  //       }`}
  //       ref={setNodeRef}
  //       style={style}
  //       {...attributes}
  //       {...listeners}
  //     ></div>
  //   );
  // }
  const [newTitle, setNewTitle] = useState(board.title);
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };
  console.log("newTitle", newTitle);
  return (
    <div
      className={`child flex flex-col w-[250px] h-auto gap-2 shrink-0 ${
        isDragging ? "blur-[0.5px]" : ""
      }`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div
        className={`flex flex-col gap-2 bg-white text-primaryText rounded p-2 ${
          isDragging ? "bg-opacity-60 border-2 border-secondaryColor" : ""
        }`}
      >
        <div className="flex items-center justify-between pl-3 py-1">
          {!editTitle && (
            <p onClick={() => setEditTitle(true)}>
              {board.title + " - " + board.id}
            </p>
          )}
          {editTitle && (
            <input
              type="text"
              defaultValue={board.title}
              onChange={handleChangeTitle}
              autoFocus
              onBlur={() => {
                setEditTitle(false);
                if (board.title === newTitle) return;
                updateBoard(board.id, newTitle);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditTitle(false);
                if (board.title === newTitle) return;
                updateBoard(board.id, newTitle);
              }}
              className="w-auto border focus:border-secondaryColor"
            />
          )}
          <DragIcon></DragIcon>
        </div>
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={itemData}>
            {itemData.map((item) => (
              <CardItem text={item.title} id={item.id} key={item.id} />
            ))}
          </SortableContext>
        </DndContext>
        <AddBtn
          text="Add a card"
          className="hover:!bg-gray-500 hover:!bg-opacity-30"
        ></AddBtn>
      </div>
    </div>
  );
};

export default List;
