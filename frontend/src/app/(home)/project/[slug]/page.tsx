"use client";
import BoardMenu from "@/components/layout/board/board.menu";
import BoardSidebar from "@/components/layout/board/board.sidebar";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { useRef, useState } from "react";
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
  let defaultGradient: GradientTypes = { url: "/moment.png", alt: "moment" };
  // let defaultGradient: GradientTypes = { from: "#6f5dc6", to: "#e374bc" };
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
  const Content = () => {
    return (
      <div className="flex gap-2 h-[92%] w-full p-2 overflow-x-auto overflow-y-hidden">
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
      className={`overflow-hidden w-full h-full text-white bg-gradient-to-br from-[${defaultGradient.from}] to-[${defaultGradient.to}] bg-no-repeat bg-cover`}
      style={
        !defaultGradient.from
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
