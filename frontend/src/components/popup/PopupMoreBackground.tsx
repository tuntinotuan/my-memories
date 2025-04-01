import React from "react";
import PopupFlexibleOverlay from "./PopupFlexibleOverlay";

const PopupMoreBackground = ({ show, onClose, rect }: any) => {
  return (
    <PopupFlexibleOverlay
      rect={rect}
      show={show}
      // selector="myportal"
      // width={400}
      onClose={onClose}
    >
      More
    </PopupFlexibleOverlay>
  );
};

export default PopupMoreBackground;
