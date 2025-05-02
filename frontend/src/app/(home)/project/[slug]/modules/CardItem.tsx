import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import InputEditText from "@/components/input/InputEditText";
import DeleteIcon from "@/components/icons/DeleteIcon";

const CardItem = ({ task, className, updateTask, handleDeleteTask }: any) => {
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
      className={`flex items-center gap-2 group bg-gray-100 p-2 rounded-lg cursor-grab ${className} ${
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
      <DeleteIcon
        className="transition-all opacity-0 group-hover:opacity-100"
        onClick={() => handleDeleteTask(task.id)}
      />
    </div>
  );
};

export default CardItem;
