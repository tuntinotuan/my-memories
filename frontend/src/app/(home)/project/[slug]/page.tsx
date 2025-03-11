"use client";
import Button from "@/components/button/Button";
import CloseIcon from "@/components/icons/CloseIcon";
import DragIcon from "@/components/icons/DragIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import BoardMenu from "@/components/layout/board/board.menu";
import BoardSidebar from "@/components/layout/board/board.sidebar";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { useState } from "react";
import CardItem from "./modules/CardItem";
import AddBtn from "./modules/AddBtn";
import AddBox from "./modules/AddBox";
import ListContainer from "./modules/ListContainer";
import List from "./modules/List";
// export async function generateStaticParams() {
//   return [{ slug: 'post-1' }, { slug: 'post-2' }];
// }
// function generateStaticParams() {
//   return [{ slug: "post-1" }, { slug: "post-2" }];
// }

// export async function generateStaticParams() {
//   // Fetch all possible slugs (e.g., from an API or CMS)
//   // const res = await fetch("https://example.com/api/posts");
//   // const posts = await res.json();

//   // // Map slugs to params
//   // return posts.map((post: any) => ({
//   //   slug: post.slug,
//   // }));
//   return [{ slug: "post-1" }, { slug: "post-2" }];
// }

type ColorCode = { from: string; to: string; url?: string };
type UrlCode = { from?: string; to?: string; url: string; alt: string };
type GradientTypes = ColorCode | UrlCode;
export default function Page({ params }: any) {
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
  return (
    <div className="flex w-full overflow-hidden">
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
            <AddBtn text="Add a list" />
            <AddBox placeholder="Enter list name..." btnText="Add list" />
          </ListContainer>
        </div>
      </div>
      <BoardSidebar />
    </div>
  );
}
