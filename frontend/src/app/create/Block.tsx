import React from "react";
import Control from "./Control";
import { useHover } from "@uidotdev/usehooks";

interface BlockProps {
  children: React.ReactNode;
}

const Block = (props: BlockProps) => {
  const [ref, hovering] = useHover();
  return (
    <div className="flex items-start gap-1 px-2" ref={ref}>
      <Control show={hovering}></Control>
      {props.children}
    </div>
  );
};

export default Block;
