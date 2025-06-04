import React from "react";
import PopupFlexibleOverlay from "./PopupFlexibleOverlay";
import {
  BoardColors,
  BoardPhotosFromUnsplash,
} from "../layout/board/board.sidebar";
import CloseIcon from "../icons/CloseIcon";
import NavRow from "../nav/NavRow";

const PopupMoreBackground = ({ show, onClose, rect, update }: any) => {
  const pageList = [
    <BoardPhotosFromUnsplash key={0} update={update} />,
    <BoardColors key={1} sketchPickerView="below" update={update} />,
  ];
  return (
    <PopupFlexibleOverlay
      rect={rect}
      show={show}
      width={300}
      height={400}
      position="right"
      onClose={onClose}
    >
      <NavRow
        navList={["Photos", "Color"]}
        pageDatas={pageList}
        classNameCoverAllPage="flex flex-col w-full my-2 h-full overflow-y-auto"
        rightElementOthers={
          <CloseIcon fontSize="small" onClick={onClose}></CloseIcon>
        }
      ></NavRow>
    </PopupFlexibleOverlay>
  );
};

export default PopupMoreBackground;
