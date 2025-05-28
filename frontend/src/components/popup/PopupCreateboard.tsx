import React, { useState } from "react";
import CloseIcon from "@/components/icons/CloseIcon";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ButtonCreate from "@/components/button/ButtonCreate";
import Image from "next/image";
import PopupOverlay from "../overlay/popup.overlay";
import { Id } from "@/app/(home)/project/[slug]/modules/types";
import { LinearOrUrl } from "../project/types";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import { generateId } from "@/utils/otherFs";
import GradientImage from "./GradientImage";
import UrlImage from "./UrlImage";
import { useRouter } from "next/navigation";

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
  return (
    <PopupOverlay show={show} selector="myportal" width={400} onClick={onClose}>
      <TopControl onClose={onClose} />
      <Body onClose={onClose} />
    </PopupOverlay>
  );
};

export const TopControl = ({ onClose, title = "Create board" }: any) => {
  return (
    <div className="flex items-center justify-between w-full text-sm font-bold pb-4">
      <ArrowLeftIcon
        fontSize="inherit"
        onClick={onClose}
        className="opacity-0"
      ></ArrowLeftIcon>
      {title}
      <CloseIcon fontSize="small" onClick={onClose}></CloseIcon>
    </div>
  );
};
const Body = ({ onClose }: any) => {
  const [boardTitle, setBoardTitle] = useState("");
  const { boards, setBoards } = useCreateBoardStates();
  const router = useRouter();
  console.log("boards", boards);
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
  const autoDefaultGradient =
    boards.length < 4 ? imageList[boards.length] : gradientList[0];
  let defaultGradient: LinearOrUrl = autoDefaultGradient;
  const [currentGradient, setCurrentGradient] =
    useState<LinearOrUrl>(defaultGradient);

  const handleClick = (item: LinearOrUrl) => {
    setCurrentGradient(item);
  };
  const handleCreateABoard = async () => {
    const newId = generateId();
    const newBoard = {
      id: newId,
      title: boardTitle,
      img: currentGradient,
    };
    setBoards([...boards, newBoard]);
    setBoardTitle("");
    setCurrentGradient(autoDefaultGradient);
    await onClose();
    router.push(`/project/${boardTitle + "-id" + newId}`);
  };
  return (
    <div className="flex flex-col gap-2 h-full overflow-auto px-4 pb-4">
      <DisplayImage currentGradient={currentGradient}></DisplayImage>
      <p className="font-bold">Background</p>
      <div className="">
        <UrlImage
          imageList={imageList}
          currentGradient={currentGradient}
          handleClick={handleClick}
        ></UrlImage>
        <GradientImage
          gradientList={gradientList}
          currentGradient={currentGradient}
          handleClick={handleClick}
        ></GradientImage>
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
  );
};
const DisplayImage = ({
  currentGradient,
}: {
  currentGradient: LinearOrUrl;
}) => {
  return (
    <div
      className={`flex items-center justify-center w-5/6 h-[200px] rounded mx-auto p-4 bg-gradient-to-br bg-cover`}
      style={
        currentGradient?.type === "imageUrl"
          ? { backgroundImage: `url(${currentGradient.url})` }
          : currentGradient?.type === "linearGradient"
          ? {
              backgroundImage: `linear-gradient(to bottom right, ${currentGradient.from}, ${currentGradient.to})`,
            }
          : { background: currentGradient.code }
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
  );
};

export default PopupCreateboard;
