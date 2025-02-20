import React from "react";
import Button from "@/components/button/Button";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Tooltip } from "@nextui-org/tooltip";

interface ControlProps {
  show?: boolean;
  className?: string;
}

const Control = (props: ControlProps) => {
  return (
    <div
      className={`flex items-center ${
        props.show ? "opacity-100" : "opacity-0"
      } ${props.className}`}
    >
      <Tooltip
        showArrow
        delay={200}
        closeDelay={300}
        content="Delete this block"
      >
        <div>
          <Button
            className="font-normal !p-[2px]"
            hover="hover:bg-gray-100 hover:text-black"
          >
            a
          </Button>
        </div>
      </Tooltip>
      <Tooltip
        showArrow
        delay={200}
        closeDelay={300}
        content="Insert block below"
      >
        <p>
          <Button
            className="font-normal !p-[2px]"
            hover="hover:bg-gray-100 hover:text-black"
          >
            <AddOutlinedIcon></AddOutlinedIcon>
          </Button>
        </p>
      </Tooltip>
      <Tooltip
        showArrow
        delay={200}
        closeDelay={300}
        content={
          <>
            <div className="flex flex-col items-center font-bold">
              <div className="flex-shirk-0">
                Drag <span className="font-normal">to move</span>
              </div>
              <div className="flex-shirk-0">
                Click <span className="font-normal">to open menu</span>
              </div>
            </div>
          </>
        }
      >
        <p>
          <Button
            className="font-normal !p-[2px]"
            hover="hover:bg-gray-100 hover:text-black"
          >
            <DragIndicatorOutlinedIcon></DragIndicatorOutlinedIcon>
          </Button>
        </p>
      </Tooltip>
    </div>
  );
};

export default Control;
