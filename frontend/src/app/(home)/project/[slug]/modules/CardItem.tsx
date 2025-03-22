import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

const CardItem = ({ task, className }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: "Task", task } });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-gray-400 bg-opacity-10 p-3 rounded-lg cursor-pointer ${className} ${
        isDragging
          ? "blur-[0.5px] bg-opacity-25 border-2 border-secondaryColor"
          : ""
      }`}
    >
      <p className={`cursor-text ${isDragging ? "opacity-0" : ""}`}>
        {task.content}
      </p>
    </div>
  );
};

export default CardItem;
