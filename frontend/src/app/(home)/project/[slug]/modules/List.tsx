import Button from "@/components/button/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import React, { useMemo, useState } from "react";
import ListContainer from "./ListContainer";
import DragIcon from "@/components/icons/DragIcon";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import CardItem from "./CardItem";
import AddBtn from "./AddBtn";
import { CSS } from "@dnd-kit/utilities";
import { Board, Id, Task } from "./types";
import AddBox from "./AddBox";
import ThreeDotsIcon from "@/components/icons/ThreeDotsIcon";

type ListProps = {
  board: Board;
  tasks: Task[];
  updateBoard: (id: Id, title: string) => void;
  createNewTask: (id: Id, content: string) => void;
};

const List = ({ board, updateBoard, createNewTask, tasks }: ListProps) => {
  const [editTitle, setEditTitle] = useState(false);
  const tasksId = useMemo(() => tasks.map((task) => task.id), [tasks]);
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
  const [newTitle, setNewTitle] = useState(board.title);
  const [newTask, setNewTask] = useState("");
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };
  const [showBoxAddTask, setShowBoxAddTask] = useState(false);
  const handleCloseBoxAddTask = () => {
    setShowBoxAddTask(false);
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`child flex flex-col w-[250px] h-full gap-2 shrink-0 cursor-grab ${
        isDragging ? "blur-[0.5px]" : ""
      }`}
    >
      <div
        className={`flex flex-col gap-2 bg-white max-h-full text-primaryText rounded p-2 ${
          isDragging ? "bg-opacity-60 border-2 border-secondaryColor" : ""
        }`}
      >
        <div className="flex items-center justify-between text-sm font-bold">
          {!editTitle && (
            <p
              onClick={() => setEditTitle(true)}
              className="pl-3 py-1 cursor-pointer border border-transparent w-full"
            >
              {board.title}
            </p>
          )}
          {editTitle && (
            <input
              type="text"
              defaultValue={board.title}
              className="w-full border focus:border-secondaryColor pl-3 py-1 rounded transition-all"
              onChange={handleChangeTitle}
              autoFocus
              onBlur={() => {
                setEditTitle(false);
                if (board.title === newTitle || !newTitle) return;
                updateBoard(board.id, newTitle);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditTitle(false);
                if (board.title === newTitle || !newTitle) return;
                updateBoard(board.id, newTitle);
              }}
            />
          )}
          <ThreeDotsIcon
            className="p-2 hover:bg-gray-300 rounded"
            disabled
          ></ThreeDotsIcon>
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto">
          <SortableContext items={tasksId}>
            {tasks.map((task) => (
              <CardItem task={task} key={task.id} />
            ))}
          </SortableContext>
        </div>
        {!showBoxAddTask && (
          <AddBtn
            text="Add a task"
            className="hover:!bg-gray-500 hover:!bg-opacity-30"
            onClick={() => setShowBoxAddTask(true)}
          ></AddBtn>
        )}
        {showBoxAddTask && (
          <AddBox
            placeholder="Please enter your task"
            btnText="Add task"
            onClose={handleCloseBoxAddTask}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              if (newTask) {
                createNewTask(board.id, newTask);
                setNewTask("");
              }
            }}
            onChange={(e) => setNewTask(e.target.value)}
            onClickBtnAdd={() => {
              if (newTask) {
                createNewTask(board.id, newTask);
                handleCloseBoxAddTask();
                setNewTask("");
              }
            }}
            value={newTask}
          ></AddBox>
        )}
      </div>
    </div>
  );
};

export default List;
