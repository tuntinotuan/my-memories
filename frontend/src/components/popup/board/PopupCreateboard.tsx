import React, { useState } from "react";
import ButtonCreate from "@/components/button/ButtonCreate";
import PopupOverlay from "../../overlay/popup.overlay";
import { LinearOrUrl } from "../../project/types";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import { generateId } from "@/utils/otherFs";
import GradientImage from "./components/GradientImage";
import UrlImage from "./components/UrlImage";
import { useRouter } from "next/navigation";
import { DisplayImage } from "./components/DisplayImage";
import { gradientList, imageList } from "./initialValues";
import { TopControl } from "../components/TopControl";
import InputValidation from "@/components/input/InputValidation";

type PopupCreateboardProps = {
  show: boolean;
  onClose: () => void;
};

const PopupCreateboard = ({ show, onClose }: PopupCreateboardProps) => {
  return (
    <PopupOverlay show={show} selector="myportal" width={400} onClick={onClose}>
      <TopControl onClose={onClose} />
      <Body onClose={onClose} />
    </PopupOverlay>
  );
};

const Body = ({ onClose }: any) => {
  const [boardTitle, setBoardTitle] = useState("");
  const { boards, setBoards } = useCreateBoardStates();
  const router = useRouter();
  // console.log("boards", boards);
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
      <InputValidation
        value={boardTitle}
        setValue={setBoardTitle}
        errText="👋 Board title is required *"
        onKeyDown={(e) => {
          e.key === "Enter" && handleCreateABoard();
        }}
      ></InputValidation>
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

export default PopupCreateboard;
