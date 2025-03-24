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
import { initialLists, initialTasks } from "@/api/board/mock.data";
import { generateId } from "@/utils/otherFs";

export default function Page({ params }: any) {
  return (
    <div className="flex w-full overflow-hidden">
      <LocalBody params={params}></LocalBody>
      <BoardSidebar />
    </div>
  );
}

function LocalBody({ params }: any) {
  let defaultGradient: any = {
    type: "imageUrl",
    url: "/moment.png",
    alt: "moment",
  };
  // let defaultGradient: any = {
  //   type: "linearGradient",
  //   from: "#6f5dc6",
  //   to: "#e374bc",
  // };
  return (
    <div
      className={`overflow-hidden w-full h-full text-white bg-no-repeat bg-cover`}
      style={
        defaultGradient.type === "imageUrl"
          ? { backgroundImage: `url(${defaultGradient.url})` }
          : {
              backgroundImage: `linear-gradient(to bottom right, ${defaultGradient.from}, ${defaultGradient.to})`,
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

  const [activeBoard, setActiveBoard] = useState<ListType | null>(null);
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
  function updateBoard(id: Id, title: string) {
    const newLists = lists.map((item) => {
      if (item.id !== id) return item;
      return { ...item, title };
    });
    setLists(newLists);
  }
  function createNewTask(boardId: Id, content: string) {
    const newTask = {
      id: generateId(),
      boardId: boardId,
      content: content,
    };
    setTasks([...tasks, newTask]);
  }
  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Board") {
      setActiveBoard(event.active.data.current.board);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }
  function handleDragEnd(event: DragEndEvent) {
    setActiveBoard(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeBoardId = active.id;
    const overBoardId = over.id;
    if (activeBoardId === overBoardId) return;
    setLists((board) => {
      const activeBoardIndex = board.findIndex(
        (item) => item.id === activeBoardId
      );
      const overBoardIndex = board.findIndex((item) => item.id === overBoardId);
      return arrayMove(lists, activeBoardIndex, overBoardIndex);
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
        tasks[activeIndex].boardId = tasks[overIndex].boardId;
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverABoard = over.data.current?.type === "Column";

    // I'm dropping a Task over a column
    if (isActiveTask && isOverABoard) {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      tasks[activeIndex].boardId === overId;
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
          {lists.map((board) => (
            <List
              board={board}
              key={board.id}
              updateBoard={updateBoard}
              createNewTask={createNewTask}
              tasks={tasks.filter((task) => task.boardId === board.id)}
            ></List>
          ))}
        </SortableContext>
        {createPortal(
          <DragOverlay>
            {activeBoard && (
              <List
                board={activeBoard}
                updateBoard={updateBoard}
                createNewTask={createNewTask}
                tasks={tasks.filter((task) => task.boardId === activeBoard.id)}
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
