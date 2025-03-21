"use client";
import BoardMenu from "@/components/layout/board/board.menu";
import BoardSidebar from "@/components/layout/board/board.sidebar";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useMemo, useRef, useState } from "react";
import AddBtn from "./modules/AddBtn";
import AddBox from "./modules/AddBox";
import ListContainer from "./modules/ListContainer";
import List from "./modules/List";
import { useOnClickOutside } from "usehooks-ts";
import { Board, Id } from "./modules/types";
import { createPortal } from "react-dom";

type ColorCode = { from: string; to: string; url?: string };
type UrlCode = { from?: string; to?: string; url: string; alt: string };
type GradientTypes = ColorCode | UrlCode;
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
  const lists = [
    {
      id: 1,
      listTitle: "Tasks",
    },
    {
      id: 2,
      listTitle: "To do",
    },
    {
      id: 3,
      listTitle: "Done",
    },
  ];
  const [listData, setItemData] = useState(lists);
  const [showBoxAddList, setShowBoxAddList] = useState(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const boardsId = useMemo(() => boards.map((item) => item.id), [boards]);
  const handleDragEnd = (event: DragEndEvent) => {
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
    // if (over && active.id !== over.id) {
    //   setItemData((lists) => {
    //     const oldIndex = lists.findIndex((list) => list.id === active.id);
    //     const newIndex = lists.findIndex((list) => list.id === over.id);
    //     return arrayMove(lists, oldIndex, newIndex);
    //   });
    // }
  };
  const handleOpenBoxAddList = () => {
    setShowBoxAddList(true);
  };
  const handleCloseBoxAddList = () => {
    setShowBoxAddList(false);
  };
  const ref = useRef(null);
  useOnClickOutside(ref, handleCloseBoxAddList);
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
  const [activeBoard, setActiveBoard] = useState<Board | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );
  const Content = () => {
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
          onDragStart={onDragStart}
        >
          <SortableContext items={boardsId}>
            {boards.map((board) => (
              <List
                board={board}
                key={board.id}
                updateBoard={updateBoard}
              ></List>
            ))}
          </SortableContext>
          {createPortal(
            <DragOverlay>
              {activeBoard && (
                <List board={activeBoard} updateBoard={updateBoard}></List>
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
              createNewBoard={createNewBoard}
              ref={ref}
            />
          )}
        </ListContainer>
      </div>
    );
  };
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
      <Content />
    </div>
  );
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
  function generateId() {
    return Math.floor(Math.random() * 10001);
  }
  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Board") {
      setActiveBoard(event.active.data.current.board);
      return;
    }
  }
}
