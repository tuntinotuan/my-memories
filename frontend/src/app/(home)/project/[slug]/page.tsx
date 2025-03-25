"use client";
import BoardMenu from "@/components/layout/board/board.menu";
import BoardSidebar from "@/components/layout/board/board.sidebar";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useEffect, useMemo, useRef, useState } from "react";
import AddBtn from "./modules/AddBtn";
import AddBox from "./modules/AddBox";
import ListContainer from "./modules/ListContainer";
import List from "./modules/List";
import { ListType, Id, Task } from "./modules/types";
import { createPortal } from "react-dom";
import CardItem from "./modules/CardItem";
import { initialLists, initialTasks, projectList } from "@/api/board/mock.data";
import { cutIdFromSlug, generateId, replaceAllTrim } from "@/utils/otherFs";
import { useCreateBoardStates } from "@/contexts/createBoardStates";

export default function Page({ params }: any) {
  const { boards, setSingleBoard } = useCreateBoardStates();
  const newBoard = boards.find(
    (item) => item.id === Number(cutIdFromSlug(params.slug, "-id"))
  );
  const exampleBoard = projectList.find(
    (item) => replaceAllTrim(item.title) === params.slug
  );
  console.log("exampleBoard", exampleBoard, params.slug);
  useEffect(() => {
    if (newBoard) {
      setSingleBoard(newBoard);
    } else {
      exampleBoard && setSingleBoard(exampleBoard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full overflow-hidden">
      <LocalBody params={params}></LocalBody>
      <BoardSidebar />
    </div>
  );
}

function LocalBody({ params }: any) {
  const { singleBoard } = useCreateBoardStates();
  return (
    <div
      className={`overflow-hidden w-full h-full text-white bg-no-repeat bg-cover`}
      style={
        singleBoard.img.type === "imageUrl"
          ? { backgroundImage: `url(${singleBoard.img.url})` }
          : {
              backgroundImage: `linear-gradient(to bottom right, ${singleBoard.img.from}, ${singleBoard.img.to})`,
            }
      }
    >
      <BoardMenu slug={params.slug} />
      <LocalContent />
    </div>
  );
}

const LocalContent = () => {
  const [showBoxAddList, setShowBoxAddList] = useState(false);
  const [lists, setLists] = useState<ListType[]>(initialLists);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const listsId = useMemo(() => lists.map((item) => item.id), [lists]);
  const [newTitle, setNewTitle] = useState<string>("");
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
  const handleWheel = (event: React.WheelEvent) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += event.deltaY; // Moves horizontally instead of vertically
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

  const [activeList, setActiveList] = useState<ListType | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0,
      },
    })
  );

  function createNewList(title: string) {
    const listToAdd: ListType = {
      id: generateId(),
      title: title,
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
  function createNewTask(listId: Id, content: string) {
    const newTask = {
      id: generateId(),
      listId: listId,
      content: content,
    };
    setTasks([...tasks, newTask]);
  }
  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "List") {
      setActiveList(event.active.data.current.list);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }
  function handleDragEnd(event: DragEndEvent) {
    setActiveList(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeListId = active.id;
    const overListId = over.id;
    if (activeListId === overListId) return;
    setLists((board) => {
      const activeListIndex = board.findIndex(
        (item) => item.id === activeListId
      );
      const overListIndex = board.findIndex((item) => item.id === overListId);
      return arrayMove(lists, activeListIndex, overListIndex);
    });
  }
  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;
    // I'm dropping a Task over another Task
    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        tasks[activeIndex].listId = tasks[overIndex].listId;
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAList = over.data.current?.type === "List";

    // I'm dropping a Task over a column
    if (isActiveTask && isOverAList) {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      tasks[activeIndex].listId === overId;
      return arrayMove(tasks, activeIndex, activeIndex);
    }
  }
  return (
    <div
      ref={scrollRef}
      className="flex gap-2 h-[92%] w-full p-2 overflow-x-auto overflow-y-hidden"
      onScroll={handleScroll}
      onWheel={handleWheel}
    >
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
      >
        <SortableContext items={listsId}>
          {lists.map((list) => (
            <List
              list={list}
              key={list.id}
              updateList={updateList}
              createNewTask={createNewTask}
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
                createNewTask={createNewTask}
                tasks={tasks.filter((task) => task.listId === activeList.id)}
              ></List>
            )}
            {activeTask && (
              <CardItem
                task={activeTask}
                className="skew-x-2 rotate-6 opacity-60"
              ></CardItem>
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
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
                createNewList(newTitle);
                setNewTitle("");
              }
            }}
            onChange={(e) => setNewTitle(e.target.value)}
            onClickBtnAdd={() => {
              if (newTitle) {
                createNewList(newTitle);
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
