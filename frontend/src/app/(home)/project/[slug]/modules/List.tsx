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

const List = ({ id, listTitle }: { id: number; listTitle: string }) => {
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
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
          isDragging ? "bg-opacity-80" : ""
        }`}
      >
        <div className="flex items-center justify-between pl-3 py-1">
          <p>{listTitle}</p>
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
