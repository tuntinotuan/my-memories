import React, { useMemo, useRef, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import CardItem from "./CardItem";
import AddBtn from "./AddBtn";
import { CSS } from "@dnd-kit/utilities";
import { Id, ListType, Task } from "../modules/types";
import AddBox from "./AddBox";
import ThreeDotsIcon from "@/components/icons/ThreeDotsIcon";
import InputEditText from "@/components/input/InputEditText";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { useScrollToEnd } from "@/hooks/useScrollToEnd";

type ListProps = {
  list: ListType;
  tasks: Task[];
  updateList: (id: Id, title: string) => void;
  handleDeleteTask: (id: Id) => void;
  handleDeleteList: (id: Id) => void;
  updateTask: (id: Id, title: string) => void;
  createNewTask: (id: Id, content: string) => void;
};

const List = ({
  list,
  updateList,
  updateTask,
  createNewTask,
  handleDeleteTask,
  handleDeleteList,
  tasks,
}: ListProps) => {
  const tasksId = useMemo(() => tasks.map((task) => task.id), [tasks]);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: list.id,
    data: { type: "List", list },
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [newTask, setNewTask] = useState("");
  const refList = useRef<HTMLDivElement>(null);
  const [showBoxAddTask, setShowBoxAddTask] = useState(false);
  useScrollToEnd(refList, newTask);

  const handleCloseBoxAddTask = () => {
    setShowBoxAddTask(false);
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`child flex flex-col w-[266px] h-full gap-2 shrink-0 cursor-grab ${
        isDragging ? "blur-[0.5px]" : ""
      }`}
    >
      <div
        className={`flex flex-col gap-2 bg-white max-h-full text-primaryText rounded p-2 shadow-md border border-gray-200 ${
          isDragging ? "bg-opacity-60 border-2 border-secondaryColor" : ""
        }`}
      >
        <div className="group flex items-center text-sm font-bold box-border">
          <InputEditText
            title={list.title}
            id={list.id}
            updateTitle={updateList}
            pClass="w-full !pr-0"
            inputClass="w-full"
          ></InputEditText>
          <DeleteIcon
            className="transition-all opacity-0 group-hover:opacity-100"
            onClick={() => handleDeleteList(list.id)}
          />
          <ThreeDotsIcon
            className="shrink-0 p-2 hover:bg-gray-300 rounded"
            disabled
          ></ThreeDotsIcon>
        </div>
        <div ref={refList} className="flex flex-col gap-2 overflow-y-auto">
          <SortableContext items={tasksId}>
            {tasks.map((task) => (
              <CardItem
                task={task}
                key={task.id}
                updateTask={updateTask}
                handleDeleteTask={handleDeleteTask}
              />
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
                createNewTask(list.id, newTask);
                setNewTask("");
              }
            }}
            onChange={(e) => setNewTask(e.target.value)}
            onClickBtnAdd={() => {
              if (newTask) {
                createNewTask(list.id, newTask);
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
