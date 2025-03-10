import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

const CardItem = ({ text, id }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
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
      className="bg-gray-400 bg-opacity-10 p-3 rounded-lg cursor-pointer"
    >
      <p className="cursor-text">{text}</p>
    </div>
  );
};

export default CardItem;
