import React, { useState } from "react";
import PopupFlexibleOverlay from "./PopupFlexibleOverlay";
import {
  BoardColors,
  BoardPhotosFromUnsplash,
} from "../layout/board/board.sidebar";
import CloseIcon from "../icons/CloseIcon";
export type navPage = "photo" | "color";

const PopupMoreBackground = ({ show, onClose, rect, update }: any) => {
  const [page, setPage] = useState<navPage>("photo");
  return (
    <PopupFlexibleOverlay
      rect={rect}
      show={show}
      width={300}
      height={400}
      position="right"
      onClose={onClose}
    >
      <Top onClose={onClose} onClick={setPage} page={page}></Top>
      <Body page={page} update={update}></Body>
    </PopupFlexibleOverlay>
  );
};

const Top = ({ onClose, onClick, page }: any) => {
  const lists = [
    { title: "Photos", page: "photo" },
    { title: "Color", page: "color" },
  ];
  return (
    <div className="flex items-center justify-between w-full text-sm pb-4">
      <div className="flex items-center gap-2 px-2">
        {lists.map((item) => (
          <div
            key={item.page}
            className={`relative cursor-pointer transition-all ${
              item.page === page ? "text-primaryColor font-bold" : ""
            }`}
            onClick={() => onClick(item.page)}
          >
            {item.title}
            {item.page === page && (
              <div
                className={`absolute left-0 right-0 h-1 bg-primaryColor rounded`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <CloseIcon fontSize="small" onClick={onClose}></CloseIcon>
    </div>
  );
};
const Body = ({ page, update }: { page: navPage; update: any }) => {
  if (page === "photo") return <BoardPhotosFromUnsplash update={update} />;
  if (page === "color")
    return <BoardColors sketchPickerView="below" update={update} />;
};

export default PopupMoreBackground;
