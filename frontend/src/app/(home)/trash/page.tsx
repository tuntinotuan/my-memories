"use client";
import { ListOrGrid } from "@/app/page";
import Button from "@/components/button/Button";
import ButtonGridOrListView from "@/components/button/ButtonGridOrListView";
import { useNotify } from "@/contexts/notifyStates";
import Image from "next/image";
import { useState } from "react";

export default function TrashPage() {
  const { setTitle, setActiveComeBack } = useNotify();
  const [listOrGrid, setListOrGrid] = useState<ListOrGrid>("grid");
  const handleViewListOrGrid = () => {
    listOrGrid === "list" ? setListOrGrid("grid") : setListOrGrid("list");
  };
  const navList = ["Designs", "Images", "Videos"];
  return (
    <div className="w-full px-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Trash</h1>
        <ButtonGridOrListView
          listOrGrid={listOrGrid}
          handleViewListOrGrid={handleViewListOrGrid}
        ></ButtonGridOrListView>
      </div>
      <div className="flex items-center gap-2">
        {navList.map((item) => (
          <div
            key={item}
            className="text-sm hover:bg-gray-100 rounded-lg cursor-pointer transition-all px-2 py-3 mt-2"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center w-full justify-center mx-auto mt-5">
        <Image
          src={"/trash.png"}
          alt="trash image"
          width={160}
          height={300}
        ></Image>
        <p className="font-bold">{`There's not thing in your trash`}</p>
        <Button
          onClick={() => {
            setTitle("Task deleted"), setActiveComeBack(true);
          }}
        >
          Test notify
        </Button>
      </div>
    </div>
  );
}
