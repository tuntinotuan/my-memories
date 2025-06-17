import React, { useState } from "react";
import PopupOverlay from "../overlay/popup.overlay";
import { MySketchPicker } from "./components/MySketchPicker";

export type PopupSketchPickerProps = {
  show?: boolean;
  onClose: () => void;
  updateColor: (code: string) => void;
  colorList: string[];
  SetColorList: (arr: any) => void;
};

const PopupSketchPicker = ({
  show,
  onClose,
  updateColor,
  colorList,
  SetColorList,
}: PopupSketchPickerProps) => {
  return (
    <PopupOverlay
      width={320}
      selector="input-color"
      show={show}
      onClick={onClose}
    >
      <MySketchPicker
        show={show}
        onClose={onClose}
        updateColor={updateColor}
        colorList={colorList}
        SetColorList={SetColorList}
      ></MySketchPicker>
    </PopupOverlay>
  );
};

export default PopupSketchPicker;
