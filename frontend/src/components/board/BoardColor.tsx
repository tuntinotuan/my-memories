import { useCreateBoardStates } from "@/contexts/createBoardStates";
import React, { useRef, useState } from "react";
import { LinearOrUrl } from "../project/types";
import { useScrollToEnd } from "@/hooks/useScrollToEnd";
import PlusIcon from "../icons/PlusIcon";
import PopupSketchPicker from "../popup/PopupSketchPicker";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { MySketchPicker } from "../popup/components/MySketchPicker";

const BoardColor = ({
  sketchPickerView = "popup",
  update,
}: {
  sketchPickerView?: "popup" | "below";
  update?: any;
}) => {
  let gradientLists: { from: string; to: string; span: string }[] = [
    { from: "#7731d8", to: "#01C4CD", span: "❄️" },
    { from: "#0c66e3", to: "#09336f", span: "🌊" },
    { from: "#09326c", to: "#c7509b", span: "🔮" },
    { from: "#6f5dc6", to: "#e374bc", span: "🌈" },
    { from: "#e34935", to: "#f9a13d", span: "🍑" },
    { from: "#E774BB", to: "#F77465", span: "🌸" },
    { from: "#1F845A", to: "#5DC3CE", span: "🌎" },
    { from: "#505F79", to: "#192D4F", span: "👽" },
    { from: "#43290F", to: "#AB2A19", span: "🌋" },
  ];
  let colorLists = [
    "#838C91",
    "#89609E",
    "#CD5A91",
    "#4BBF6B",
    "#0079BF",
    "#519839",
    "#00AECC",
    "#D29034",
    "#B04632",
  ];
  const { singleBoard, setSingleBoard, boards, setBoards } =
    useCreateBoardStates();
  const [colorList, setColorList] = useState(colorLists);
  const [colorPicker, setColorPicker] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const updateColors = (from: string, to: string) => {
    let img: LinearOrUrl = {
      type: "linearGradient",
      from,
      to,
    };
    // updated current page data
    setSingleBoard({
      id: singleBoard.id,
      title: singleBoard.title,
      img: img,
    });
    // updated into contexts
    const newLists = boards.map((item) => {
      if (item.id !== singleBoard.id) return item;
      return { ...item, img };
    });
    setBoards(newLists);
  };
  const updateSingleColor = (code: string) => {
    let img: LinearOrUrl = {
      type: "colorCode",
      code,
    };
    // updated current page data
    setSingleBoard({
      id: singleBoard.id,
      title: singleBoard.title,
      img: img,
    });
    // updated into contexts
    const newLists = boards.map((item) => {
      if (item.id !== singleBoard.id) return item;
      return { ...item, img };
    });
    setBoards(newLists);
    setColorPicker(false);
  };
  useScrollToEnd(ref, colorPicker);
  return (
    <div className="h-auto overflow-y-auto pb-4 mt-2" ref={ref}>
      <div className="grid grid-cols-2 gap-2 mb-2 pb-2 border border-transparent border-b-gray-200">
        {gradientLists.map((item, index) => (
          <div
            key={index}
            className={`relative w-full h-24 rounded-lg bg-green-400 cursor-pointer hover:brightness-75 transition-all ${
              singleBoard.img.type === "linearGradient" &&
              (singleBoard.img.from === item.from &&
              singleBoard.img.to === item.to
                ? "brightness-75 cursor-wait"
                : "")
            }`}
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${item.from}, ${item.to})`,
            }}
            onClick={() =>
              update
                ? update({
                    type: "linearGradient",
                    from: item.from,
                    to: item.to,
                  })
                : updateColors(item.from, item.to)
            }
          >
            {singleBoard.img.type === "linearGradient" &&
              singleBoard.img.from === item.from &&
              singleBoard.img.to === item.to && (
                <DoneRoundedIcon
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500"
                  fontSize="small"
                ></DoneRoundedIcon>
              )}
            <span className="absolute left-2 bottom-2">{item.span}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2 mb-2">
        {colorList.map((item, index) => (
          <div
            key={index}
            className="relative w-11 h-11 rounded-md hover:brightness-75 transition-all cursor-pointer"
            style={{ background: item }}
            onClick={() =>
              update
                ? update({
                    type: "colorCode",
                    code: item,
                  })
                : updateSingleColor(item)
            }
          >
            {/* {singleBoard.img.type === "colorCode" &&
              singleBoard.img.code === item && (
                <DoneRoundedIcon
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500"
                  fontSize="small"
                ></DoneRoundedIcon>
              )} */}
          </div>
        ))}
        <div
          className="flex items-center justify-center w-11 h-11 rounded-md hover:brightness-75 transition-all cursor-pointer border border-gray-200"
          onClick={() => setColorPicker((pre) => !pre)}
        >
          <PlusIcon></PlusIcon>
        </div>
      </div>
      {sketchPickerView === "popup" && (
        <PopupSketchPicker
          show={colorPicker}
          onClose={() => setColorPicker(false)}
          updateColor={updateSingleColor}
          colorList={colorList}
          SetColorList={setColorList}
        ></PopupSketchPicker>
      )}
      {sketchPickerView === "below" && (
        <MySketchPicker
          show={colorPicker}
          onClose={() => setColorPicker(false)}
          updateColor={updateSingleColor}
          colorList={colorList}
          SetColorList={setColorList}
          hiddenTopControl
        ></MySketchPicker>
      )}
    </div>
  );
};

export default BoardColor;
