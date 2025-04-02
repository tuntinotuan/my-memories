import React, { useState } from "react";
import ButtonCreate from "../button/ButtonCreate";
import PopupOverlay from "./popup.overlay";
import { SketchPicker } from "react-color";
import { TopControl } from "./PopupCreateboard";
import PlusIcon from "../icons/PlusIcon";

type PopupSketchPickerProps = {
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

export const MySketchPicker = ({
  show,
  onClose,
  updateColor,
  SetColorList,
  colorList,
  hiddenTopControl = false,
}: PopupSketchPickerProps & { hiddenTopControl?: boolean }) => {
  const [color, setColor] = useState("#0088ff");
  return show ? (
    <>
      {!hiddenTopControl && (
        <TopControl title="Color picker" onClose={onClose}></TopControl>
      )}
      <SketchPicker
        color={color}
        onChange={(updatedColor) => setColor(updatedColor.hex)}
        className="w-full"
        styles={{
          default: {
            picker: {
              width: "auto", // Adjust width
            },
          },
        }}
      />
      <ButtonCreate
        styles="primary"
        className="w-[150px] mt-2"
        onClick={() => {
          updateColor(color);
          SetColorList([...colorList, color]);
        }}
      >
        <PlusIcon></PlusIcon>
        Add color
      </ButtonCreate>
    </>
  ) : null;
};

export default PopupSketchPicker;
