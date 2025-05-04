import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const PopupHover = ({
  children,
  rect,
  isHovered,
}: {
  children: React.ReactNode;
  rect: any;
  isHovered: any;
}) => {
  return (
    <Overlay>
      <div
        className={`fixed flex flex-col gap-[2px] bg-black text-white text-lg/4 px-4 py-3 rounded transition-all z-30 ${
          isHovered ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-0"
        }`}
        style={
          rect
            ? {
                top: 0,
                left: rect.left,
              }
            : {}
        }
      >
        {children}
        <div className="arrow absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-inherit rotate-45 -z-10"></div>
      </div>
    </Overlay>
  );
};

const Overlay = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  return mounted ? createPortal(children, document.body) : null;
};

export default PopupHover;
