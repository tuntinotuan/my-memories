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
import { initialLists, initialTasks } from "@/api/board/mock.data";
import { generateId } from "@/utils/otherFs";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import BoardListSkeleton from "@/components/skeleton/BoardListSkeleton";
import { Id, ListType, Task } from "./types";
import List from "../components/List";
import CardItem from "../components/CardItem";
import AddBox from "../components/AddBox";
import AddBtn from "../components/AddBtn";
import ListContainer from "../components/ListContainer";
import { handleDrag } from "../func/handleDrag";

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

  // get lists from localStorage
  useEffect(() => {
    async function fetchListsFromLocalStorage() {
      setLoadingFetchLists(true);
      let list = null;
      try {
        const stored = localStorage.getItem("lists");
        if (stored) list = await JSON.parse(stored);
      } catch (error) {
        console.error("Invalid JSON:", error);
        setLoadingFetchLists(false);
      }
      if (list !== null && list.length > 0) {
        setLists(list);
      }
      if (list === null) setLists(initialLists);
      setLoadingFetchLists(false);
    }
    fetchListsFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // save lists to localStorage after update list
  useEffect(() => {
    if (lists.length <= 0) return;
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);
  // get tasks from localStorage
  useEffect(() => {
    async function fetchListsFromLocalStorage() {
      let task = null;
      try {
        const stored = localStorage.getItem("tasks");
        if (stored) task = await JSON.parse(stored);
      } catch (error) {
        console.error("Invalid JSON:", error);
      }
      if (task !== null && task.length > 0) {
        setTasks(task);
      }
      if (task === null) setTasks(initialTasks);
    }
    fetchListsFromLocalStorage();
  }, []);
  // save tasks to localStorage after update task
  useEffect(() => {
    if (tasks.length <= 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  function createNewList(boardId: Id, title: string) {
    const listToAdd: ListType = {
      id: generateId(),
      title: title,
      boardId: boardId,
    };
    setLists([...lists, listToAdd]);
  }
  function updateList(id: Id, title: string) {
    const newLists = lists.map((item) => {
      if (item.id !== id) return item;
      return { ...item, title };
    });
    setLists(newLists);
  }
  function updateTask(id: Id, content: string) {
    console.log("new taskssssss", id, content);
    const newTasks = tasks.map((item) => {
      if (item.id !== id) return item;
      return { ...item, content };
    });
    setTasks(newTasks);
  }
  function createNewTask(listId: Id, content: string) {
    const newTask = {
      id: generateId(),
      listId: listId,
      content: content,
    };
    setTasks([...tasks, newTask]);
  }
  const { handleDragStart, handleDragEnd, handleDragOver } = handleDrag(
    setIsDragging,
    setActiveList,
    setActiveTask,
    setLists,
    lists,
    setTasks
  );
  function handleDeleteTask(id: Id) {
    let newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
  }
  function handleDeleteList(id: Id) {
    let newList = lists.filter((lists) => lists.id !== id);
    setLists(newList);
  }
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
