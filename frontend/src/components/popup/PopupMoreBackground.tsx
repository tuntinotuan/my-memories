import React from "react";
import PopupFlexibleOverlay from "./PopupFlexibleOverlay";
import CloseIcon from "../icons/CloseIcon";
import NavRow from "../nav/NavRow";
import BoardPhotoFromUnsplash from "../board/BoardPhotoFromUnsplash";
import BoardColor from "../board/BoardColor";

const PopupMoreBackground = ({ show, onClose, rect, update }: any) => {
  const pageList = [
    <BoardPhotoFromUnsplash key={0} update={update} />,
    <BoardColor key={1} sketchPickerView="below" update={update} />,
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
        classNameCoverAllPage="flex flex-col w-full h-full overflow-y-auto"
        rightElementOthers={
          <CloseIcon fontSize="small" onClick={onClose}></CloseIcon>
        }
      ></NavRow>
    </PopupFlexibleOverlay>
  );
};

export default PopupMoreBackground;
