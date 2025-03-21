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
import { Board, Id, Task } from "./modules/types";
import { createPortal } from "react-dom";
import CardItem from "./modules/CardItem";

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
  const [showBoxAddList, setShowBoxAddList] = useState(false);
  const [boards, setBoards] = useState<Board[]>([
    { id: 1, title: "Todo" },
    { id: 2, title: "Done" },
  ]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const boardsId = useMemo(() => boards.map((item) => item.id), [boards]);
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
  }, [showBoxAddList]); // Runs when `AddBox UI` update
  // Restore scroll position after `listData` update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollPosition.current;
    }
  }, [boards]); // Runs when `listData` update
  console.log("boards", boards);
  console.log("tasks", tasks);
  const [activeBoard, setActiveBoard] = useState<Board | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  console.log("2 - active", activeBoard, activeTask);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0,
      },
    })
  );
  const [newTitle, setNewTitle] = useState<string>("");
  function createNewBoard(title: string) {
    const boardToAdd: Board = {
      id: generateId(),
      title: title,
    };
    setBoards([...boards, boardToAdd]);
  }
  function updateBoard(id: Id, title: string) {
    const newBoards = boards.map((item) => {
      if (item.id !== id) return item;
      return { ...item, title };
    });
    setBoards(newBoards);
  }
  function createNewTask(boardId: Id, content: string) {
    const newTask = {
      id: generateId(),
      boardId: boardId,
      content: content,
    };
    setTasks([...tasks, newTask]);
  }
  function generateId() {
    return Math.floor(Math.random() * 10001);
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
    setBoards((board) => {
      const activeBoardIndex = board.findIndex(
        (item) => item.id === activeBoardId
      );
      const overBoardIndex = board.findIndex((item) => item.id === overBoardId);
      return arrayMove(boards, activeBoardIndex, overBoardIndex);
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
  // const Content = () => {
  //   return (

  //   );
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
      {/* <Content /> */}
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
          <SortableContext items={boardsId}>
            {boards.map((board) => (
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
                  tasks={tasks.filter(
                    (task) => task.boardId === activeBoard.id
                  )}
                ></List>
              )}
              {activeTask && <CardItem task={activeTask}></CardItem>}
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
                  createNewBoard(newTitle);
                  setNewTitle("");
                }
              }}
              onChange={(e) => setNewTitle(e.target.value)}
              onClickBtnAdd={() => {
                if (newTitle) {
                  createNewBoard(newTitle);
                  handleCloseBoxAddList();
                  setNewTitle("");
                }
              }}
              value={newTitle}
            />
          )}
        </ListContainer>
      </div>
    </div>
  );
}
