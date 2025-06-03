"use client";
import { ListOrGrid } from "@/app/page";
import Button from "@/components/button/Button";
import ButtonGridOrListView from "@/components/button/ButtonGridOrListView";
import NavRow from "@/components/nav/NavRow";
import { useNotify } from "@/contexts/notifyStates";
import Image from "next/image";
import { useState } from "react";
import PageAll from "./pages/page.all";
import PageTask from "./pages/page.task";
import TrashEmpty from "./components/TrashEmpty";

export default function TrashPage() {
  const { setTitle, setActiveComeBack } = useNotify();
  const [listOrGrid, setListOrGrid] = useState<ListOrGrid>("grid");
  const handleViewListOrGrid = () => {
    listOrGrid === "list" ? setListOrGrid("grid") : setListOrGrid("list");
  };
  const pageList = [
    { data: <PageAll /> },
    { data: <PageTask /> },
    {
      data: (
        <>
          <Button
            onClick={() => {
              setTitle("Task deleted"), setActiveComeBack(true);
            }}
          >
            Test notify
          </Button>
          <input type="text" className="border border-gray-300 rounded" />
        </>
      ),
    },
    {
      data: <TrashEmpty />,
    },
    {
      data: <TrashEmpty />,
    },
    {
      data: <TrashEmpty />,
    },
  ];
  return (
    <div className="w-full px-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Trash</h1>
        <ButtonGridOrListView
          listOrGrid={listOrGrid}
          handleViewListOrGrid={handleViewListOrGrid}
        ></ButtonGridOrListView>
      </div>
      <NavRow
        navList={["All", "Tasks", "Designs", "Images", "Videos", "Photos"]}
        pageDatas={pageList}
        classNameCoverAllPage="flex flex-col items-center w-full justify-center mx-auto mt-5"
      ></NavRow>
    </div>
  );
}
