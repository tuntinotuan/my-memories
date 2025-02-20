import React, { useState } from "react";
import Button from "@/components/button/Button";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import HexagonOutlinedIcon from "@mui/icons-material/HexagonOutlined";
import StopOutlinedIcon from "@mui/icons-material/StopOutlined";
import { Textarea } from "@nextui-org/input";

const Title = () => {
  const [show, setShow] = useState(false);
  return (
    <div
      className="py-5 px-24"
      onMouseOut={() => setShow(false)}
      onMouseOver={() => setShow(true)}
    >
      <div className={`flex gap-1 mb-2 ${show ? "opacity-100" : "opacity-0"}`}>
        {/* <Button
          className="font-normal"
          hoverBg="hover:bg-gray-50 hover:text-black"
          textColor="text-gray-500"
          icon={<HexagonOutlinedIcon fontSize="small"></HexagonOutlinedIcon>}
        >
          Add logo
        </Button>
        <Button
          className="font-normal"
          hoverBg="hover:bg-gray-50 hover:text-black"
          textColor="text-gray-500"
          icon={<StopOutlinedIcon fontSize="small"></StopOutlinedIcon>}
        >
          Add cover
        </Button>
        <Button
          className="font-normal"
          hoverBg="hover:bg-gray-50 hover:text-black"
          textColor="text-gray-500"
          icon={
            <ColorLensOutlinedIcon fontSize="small"></ColorLensOutlinedIcon>
          }
        >
          Design
        </Button> */}
      </div>
      <Textarea placeholder="Form title" minRows={1} radius="sm"></Textarea>
    </div>
  );
};

export default Title;
