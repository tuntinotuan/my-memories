import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import InputEditText from "@/components/input/InputEditText";

const CardItem = ({ task, className, updateTask }: any) => {
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
      className={`bg-gray-100 p-2 rounded-lg cursor-grab ${className} ${
        isDragging
          ? "blur-[0.5px] bg-opacity-75 border-2 border-secondaryColor"
          : ""
      }`}
    >
      <InputEditText
        id={task.id}
        title={task.content}
        updateTitle={updateTask}
        pClass="w-full h-auto"
        inputClass="w-full"
      ></InputEditText>
    </div>
  );
};

export default CardItem;
