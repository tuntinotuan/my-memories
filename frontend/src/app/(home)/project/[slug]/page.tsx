"use client";
import BoardMenu from "@/components/layout/board/board.menu";
import BoardSidebar from "@/components/layout/board/board.sidebar";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import AddBtn from "./modules/AddBtn";
import AddBox from "./modules/AddBox";
import ListContainer from "./modules/ListContainer";
import List from "./modules/List";
import { useOnClickOutside } from "usehooks-ts";

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
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItemData((lists) => {
        const oldIndex = lists.findIndex((list) => list.id === active.id);
        const newIndex = lists.findIndex((list) => list.id === over.id);
        return arrayMove(lists, oldIndex, newIndex);
      });
    }
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
  // Restore scroll position after `listData` update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollPosition.current;
    }
  }, [listData]); // Runs when `listData` update
  // Restore scroll position after `AddBox UI` update
  useEffect(() => {
    const scrollCur = scrollRef.current;
    if (scrollCur) {
      const maxScrollLeft = scrollCur.scrollWidth - scrollCur.clientWidth;
      scrollCur.scrollLeft = maxScrollLeft;
    }
  }, [showBoxAddList]); // Runs when `AddBox UI` update
  const Content = () => {
    return (
      <div
        ref={scrollRef}
        className="flex gap-2 h-[92%] w-full p-2 overflow-x-auto overflow-y-hidden"
        onScroll={handleScroll}
        onWheel={handleWheel}
      >
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={listData}>
            {listData.map((list) => (
              <List
                id={list.id}
                listTitle={list.listTitle}
                key={list.id}
              ></List>
            ))}
          </SortableContext>
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
}
import { closestCenter } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { LinearOrUrl } from "@/components/project/types";
interface Item {
  id: string;
  name: string;
}

// ✅ Draggable Item Component
const DraggableItem = ({ id, name }: Item) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    marginBottom: "5px",
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "5px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {name}
    </div>
  );
};

export function DragDropLists() {
  const [groupA, setGroupA] = useState<Item[]>([
    { id: "1", name: "Apple" },
    { id: "2", name: "Banana" },
    { id: "3", name: "Cherry" },
  ]);

  const [groupB, setGroupB] = useState<Item[]>([
    { id: "4", name: "Orange" },
    { id: "5", name: "Pineapple" },
    { id: "6", name: "Mango" },
  ]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const fromList = groupA.some((item) => item.id === active.id) ? "A" : "B";
    const toList = groupA.some((item) => item.id === over.id) ? "A" : "B";

    if (fromList === toList) {
      // ✅ Dragging inside the same list → Reorder
      if (fromList === "A") {
        const oldIndex = groupA.findIndex((item) => item.id === active.id);
        const newIndex = groupA.findIndex((item) => item.id === over.id);
        setGroupA(arrayMove(groupA, oldIndex, newIndex));
      } else {
        const oldIndex = groupB.findIndex((item) => item.id === active.id);
        const newIndex = groupB.findIndex((item) => item.id === over.id);
        setGroupB(arrayMove(groupB, oldIndex, newIndex));
      }
    } else {
      // ✅ Moving Between Lists
      if (fromList === "A") {
        const item = groupA.find((i) => i.id === active.id);
        if (!item) return;
        setGroupA(groupA.filter((i) => i.id !== active.id));
        setGroupB([...groupB, item]);
      } else {
        const item = groupB.find((i) => i.id === active.id);
        if (!item) return;
        setGroupB(groupB.filter((i) => i.id !== active.id));
        setGroupA([...groupA, item]);
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* ✅ Group A */}
        <div
          style={{ border: "1px solid gray", padding: "10px", width: "200px" }}
        >
          <h3>Group A</h3>
          <SortableContext items={groupA}>
            {groupA.map((item) => (
              <DraggableItem key={item.id} id={item.id} name={item.name} />
            ))}
          </SortableContext>
        </div>

        {/* ✅ Group B */}
        <div
          style={{ border: "1px solid gray", padding: "10px", width: "200px" }}
        >
          <h3>Group B</h3>
          <SortableContext items={groupB}>
            {groupB.map((item) => (
              <DraggableItem key={item.id} id={item.id} name={item.name} />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}
