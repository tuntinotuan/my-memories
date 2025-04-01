import React from "react";
import PopupFlexibleOverlay from "./PopupFlexibleOverlay";
import { BoardPhotosFromUnsplash } from "../layout/board/board.sidebar";
import { TopControl } from "./PopupCreateboard";

const PopupMoreBackground = ({ show, onClose, rect }: any) => {
  return (
    <PopupFlexibleOverlay
      rect={rect}
      show={show}
      // selector="myportal"
      // width={400}
      onClose={onClose}
    >
      <TopControl onClose={onClose} title="Photos from Unsplash"></TopControl>
      <BoardPhotosFromUnsplash></BoardPhotosFromUnsplash>
    </PopupFlexibleOverlay>
  );
};

export default PopupMoreBackground;
