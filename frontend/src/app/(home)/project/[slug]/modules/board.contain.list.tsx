import React from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import BoardListSkeleton from "@/components/skeleton/BoardListSkeleton";
import { ListType, Task } from "./types";
import List from "../components/List";
import CardItem from "../components/CardItem";
import AddBox from "../components/AddBox";
import AddBtn from "../components/AddBtn";
import ListContainer from "../components/ListContainer";
import { handleDrag } from "../func/handleDrag";
import { useListFuncs } from "../func/listFuncs";
import { useTaskFuncs } from "../func/taskFuncs";

const BoardContainList = () => {
  const [showBoxAddList, setShowBoxAddList] = useState(false);

  const [lists, setLists] = useState<ListType[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const listsId = useMemo(() => lists.map((item) => item.id), [lists]);

  const [newTitle, setNewTitle] = useState<string>("");

  const {
    singleBoard,
    setLoadingFetchLists,
    loadingFetchLists,
    setIsDragging,
  } = useCreateBoardStates();

  const [activeList, setActiveList] = useState<ListType | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0,
      },
    })
  );

  const handleOpenBoxAddList = () => {
    setShowBoxAddList(true);
  };
  const handleCloseBoxAddList = () => {
    setShowBoxAddList(false);
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollPosition = useRef(0);
  const handleScroll = () => {
    if (scrollRef.current) {
      scrollPosition.current = scrollRef.current.scrollLeft;
    }
  };

  // Restore scroll position after `AddBox UI` update
  useEffect(() => {
    const scrollCur = scrollRef.current;
    if (scrollCur) {
      const maxScrollLeft = scrollCur.scrollWidth - scrollCur.clientWidth;
      scrollCur.scrollLeft = maxScrollLeft;
    }
  }, [showBoxAddList, newTitle]); // Runs when `AddBox UI` update
  // Restore scroll position after `listData` update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollPosition.current;
    }
  }, [lists]); // Runs when `listData` update
  const { handleDragStart, handleDragEnd, handleDragOver } = handleDrag(
    setIsDragging,
    setActiveList,
    setActiveTask,
    setLists,
    lists,
    setTasks
  );
  const { createNewList, updateList, handleDeleteList } = useListFuncs(
    setLists,
    lists,
    setLoadingFetchLists
  );
  const { createNewTask, updateTask, handleDeleteTask } = useTaskFuncs(
    setTasks,
    tasks
  );
  return (
    <div
      ref={scrollRef}
      className="flex gap-2 h-[92%] w-full p-2 overflow-x-auto overflow-y-hidden"
      onScroll={handleScroll}
    >
      {loadingFetchLists && <BoardListSkeleton />}
      {!loadingFetchLists && (
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
        >
          <SortableContext items={listsId}>
            {lists
              .filter((list) => list.boardId === singleBoard.id)
              .map((list) => (
                <List
                  list={list}
                  key={list.id}
                  updateList={updateList}
                  updateTask={updateTask}
                  createNewTask={createNewTask}
                  handleDeleteTask={handleDeleteTask}
                  handleDeleteList={handleDeleteList}
                  tasks={tasks.filter((task) => task.listId === list.id)}
                ></List>
              ))}
          </SortableContext>
          {createPortal(
            <DragOverlay>
              {activeList && (
                <List
                  list={activeList}
                  updateList={updateList}
                  updateTask={updateTask}
                  createNewTask={createNewTask}
                  handleDeleteTask={handleDeleteTask}
                  handleDeleteList={handleDeleteList}
                  tasks={tasks.filter((task) => task.listId === activeList.id)}
                ></List>
              )}
              {activeTask && (
                <CardItem
                  task={activeTask}
                  className="!bg-gray-400 bg-opacity-75 skew-x-2 rotate-6 opacity-60"
                ></CardItem>
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      )}
      <ListContainer>
        {!showBoxAddList && (
          <AddBtn text="Add a list" onClick={handleOpenBoxAddList} />
        )}
        {showBoxAddList && (
          <AddBox
            placeholder="Enter list name..."
            btnText="Add list"
            onClose={handleCloseBoxAddList}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              if (newTitle) {
                createNewList(singleBoard.id, newTitle);
                setNewTitle("");
              }
            }}
            onChange={(e) => setNewTitle(e.target.value)}
            onClickBtnAdd={() => {
              if (newTitle) {
                createNewList(singleBoard.id, newTitle);
                handleCloseBoxAddList();
                setNewTitle("");
              }
            }}
            value={newTitle}
          />
        )}
      </ListContainer>
    </div>
  );
};

export default BoardContainList;
