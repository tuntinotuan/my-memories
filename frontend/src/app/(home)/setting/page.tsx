"use client";
import { ListOrGrid } from "@/app/page";
import Button from "@/components/button/Button";
import ButtonGridOrListView from "@/components/button/ButtonGridOrListView";
import { useNotify } from "@/contexts/notifyStates";
import { useState } from "react";

export default function SettingPage() {
  const { setTitle, setActiveComeBack } = useNotify();
  const [listOrGrid, setListOrGrid] = useState<ListOrGrid>("grid");
  const handleViewListOrGrid = () => {
    listOrGrid === "list" ? setListOrGrid("grid") : setListOrGrid("list");
  };
  <>
    <Button
      onClick={() => {
        setTitle("Task deleted"), setActiveComeBack(true);
      }}
    >
      Test notify
    </Button>
    <input type="text" className="border border-gray-300 rounded" />
  </>;

  return (
    <div className="w-full px-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Setting page</h1>
        <ButtonGridOrListView
          listOrGrid={listOrGrid}
          handleViewListOrGrid={handleViewListOrGrid}
        ></ButtonGridOrListView>
      </div>
    </div>
  );
}
