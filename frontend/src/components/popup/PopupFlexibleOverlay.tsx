import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useOnClickOutside } from "usehooks-ts";

type PopupFlexibleOverlay = {
  children: React.ReactNode;
  rect: RectType;
  show: boolean;
  onClose: () => void;
};
type RectType = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
};

const PopupFlexibleOverlay = ({
  children,
  rect,
  show,
  onClose,
}: PopupFlexibleOverlay) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  return mounted
    ? createPortal(
        <LocalOverlay rect={rect} show={show} onClose={onClose}>
          {children}{" "}
        </LocalOverlay>,
        document.body
      )
    : null;
};
const LocalOverlay = ({
  children,
  rect,
  show,
  onClose,
}: PopupFlexibleOverlay) => {
  console.log("rect", rect);
  const ref = useRef(null);
  useOnClickOutside(ref, onClose);
  return show ? (
    <div
      className="fixed top-0 w-[300px] h-[300px] max-h-auto bg-white border border-gray-200 shadow-md rounded-lg p-2 overflow-hidden pb-10"
      style={{
        top: rect.top / 2 + rect.height,
        left: rect.left + rect.width + 10,
      }}
      ref={ref}
    >
      {children}
    </div>
  ) : (
    <></>
  );
};
export default PopupFlexibleOverlay;
