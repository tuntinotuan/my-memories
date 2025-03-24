import React, { useState } from "react";
import CloseIcon from "@/components/icons/CloseIcon";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ButtonCreate from "@/components/button/ButtonCreate";
import ThreeDotsIcon from "@/components/icons/ThreeDotsIcon";
import Image from "next/image";
import PopupOverlay from "./popup.overlay";
import { Id } from "@/app/(home)/project/[slug]/modules/types";
import { LinearOrUrl } from "../project/types";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import { generateId } from "@/utils/otherFs";

type PopupCreateboardProps = {
  show: boolean;
  onClose: () => void;
};
export type Board = {
  id: Id;
  title: string;
  img: LinearOrUrl;
};
const PopupCreateboard = ({ show, onClose }: PopupCreateboardProps) => {
  const imageList: LinearOrUrl[] = [
    { type: "imageUrl", url: "/moment.png", alt: "moment" },
    { type: "imageUrl", url: "/purple.png", alt: "purple" },
    { type: "imageUrl", url: "/pinksky.jpg", alt: "pinksky" },
    { type: "imageUrl", url: "/sunset.png", alt: "purple" },
  ];
  let gradientList: LinearOrUrl[] = [
    { type: "linearGradient", from: "#7731d8", to: "#01C4CD" },
    { type: "linearGradient", from: "#0c66e3", to: "#09336f" },
    { type: "linearGradient", from: "#09326c", to: "#c7509b" },
    { type: "linearGradient", from: "#6f5dc6", to: "#e374bc" },
    { type: "linearGradient", from: "#e34935", to: "#f9a13d" },
  ];
  let defaultGradient: LinearOrUrl = {
    type: "imageUrl",
    url: "/moment.png",
    alt: "moment",
  };
  const [currentGradient, setCurrentGradient] =
    useState<LinearOrUrl>(defaultGradient);

  const handleChangeGradient = (item: LinearOrUrl) => {
    item.type === "linearGradient" &&
      setCurrentGradient({
        type: "linearGradient",
        from: item.from,
        to: item.to,
      });
  };
  const handleChangeBg = (item: LinearOrUrl) => {
    item.type === "imageUrl" &&
      setCurrentGradient({ type: "imageUrl", url: item.url, alt: item.alt });
  };
  const [boardTitle, setBoardTitle] = useState("");
  const { boards, setBoards } = useCreateBoardStates();
  console.log("boards", boards);
  const handleCreateABoard = () => {
    const newBoard = {
      id: generateId(),
      title: boardTitle,
      img: currentGradient,
    };
    setBoards([...boards, newBoard]);
    setBoardTitle("");
    onClose();
  };
  return (
    <PopupOverlay show={show} selector="myportal" width={400} onClick={onClose}>
      <div className="flex items-center justify-between w-full text-sm font-bold p-4">
        <ArrowLeftIcon fontSize="inherit" onClick={onClose}></ArrowLeftIcon>
        Create board
        <CloseIcon fontSize="small" onClick={onClose}></CloseIcon>
      </div>
      <div className="flex flex-col gap-2 h-full overflow-auto px-4 pb-4">
        <div
          className={`flex items-center justify-center w-5/6 h-[200px] rounded mx-auto p-4 bg-gradient-to-br bg-cover`}
          style={
            currentGradient.type === "imageUrl"
              ? { backgroundImage: `url(${currentGradient.url})` }
              : {
                  backgroundImage: `linear-gradient(to bottom right, ${currentGradient.from}, ${currentGradient.to})`,
                }
          }
        >
          <Image
            src={`/14cda5dc635d1f13bc48.svg`}
            alt="at layout"
            width={2000}
            height={200}
            unoptimized
          ></Image>
        </div>
        <p className="font-bold">Background</p>
        <div className="">
          <div className="image-list grid grid-cols-4 gap-2">
            {imageList.map(
              (item, index) =>
                item.type === "imageUrl" && (
                  <Image
                    src={item.url}
                    alt={item.alt}
                    width={200}
                    height={50}
                    className={`rounded shadow-md cursor-pointer hover:brightness-95 ${
                      currentGradient.type === "imageUrl" &&
                      currentGradient.url === item.url
                        ? "border-2 border-primaryColor shadow-sm shadow-primaryColor"
                        : ""
                    }`}
                    key={index}
                    onClick={() => handleChangeBg(item)}
                    unoptimized
                  />
                )
            )}
          </div>
          <div className="gradient-list grid grid-cols-6 gap-2 mt-2">
            {gradientList.map((item, index) => (
              <div
                className={`w-full h-10 rounded shadow-md cursor-pointer hover:brightness-110 ${
                  item.type === "linearGradient" &&
                  currentGradient.type === "linearGradient" &&
                  currentGradient.from === item.from &&
                  currentGradient.to === item.to
                    ? "border-2 border-primaryColor shadow-sm shadow-primaryColor"
                    : ""
                }`}
                key={index}
                style={
                  item.type === "linearGradient"
                    ? {
                        background: `linear-gradient(to bottom right, ${item.from}, ${item.to})`,
                      }
                    : {}
                }
                onClick={() => handleChangeGradient(item)}
              ></div>
            ))}
            <div
              className={`flex items-center justify-center w-full h-10 bg-primaryHover text-primaryText hover:text-black hover:shadow-md hover:-translate-y-[1px] rounded shadow-sm cursor-pointer transition-all`}
            >
              <ThreeDotsIcon fontSize="medium"></ThreeDotsIcon>
            </div>
          </div>
        </div>
        <label htmlFor="" className="font-bold">
          Board title
        </label>
        <input
          type="text"
          autoFocus
          value={boardTitle}
          className="border border-gray-200 rounded w-full px-3 py-2 focus:border-primaryColor"
          onChange={(e) => setBoardTitle(e.target.value)}
          onKeyDown={(e) => {
            e.key === "Enter" && handleCreateABoard();
          }}
        />
        {boardTitle === "" && (
          <p className="text-[10px] text-red-500">Board title is required *</p>
        )}
        <ButtonCreate
          className="w-full"
          styles="primary"
          disable={boardTitle === ""}
          onClick={handleCreateABoard}
        >
          Create
        </ButtonCreate>
      </div>
    </PopupOverlay>
  );
};

export default PopupCreateboard;
