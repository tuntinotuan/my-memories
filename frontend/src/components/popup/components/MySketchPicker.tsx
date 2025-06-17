import ButtonCreate from "@/components/button/ButtonCreate";
import PlusIcon from "@/components/icons/PlusIcon";
import { SketchPicker } from "react-color";
import { TopControl } from "./TopControl";
import { useState } from "react";
import { PopupSketchPickerProps } from "../PopupSketchPicker";

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
