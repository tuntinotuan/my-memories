import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useOnClickOutside } from "usehooks-ts";

type PopupFlexibleOverlayProps = {
  children: React.ReactNode;
  rect: RectType;
  show: boolean;
  onClose: () => void;
  position?: "top" | "bottom" | "left" | "right";
  width: number;
  height: number;
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
  position,
  width,
  height,
}: PopupFlexibleOverlayProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  return mounted
    ? createPortal(
        <LocalOverlay
          rect={rect}
          show={show}
          onClose={onClose}
          position={position}
          width={width}
          height={height}
        >
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
  position,
  width,
  height,
}: PopupFlexibleOverlayProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref, onClose);
  if (!rect) return;
  let currentPosition = {};
  switch (position) {
    case "right":
      currentPosition = {
        top: rect.top + rect.height / 2 - height / 2,
        left: rect.left + rect.width + 10,
      };
      break;
    case "top":
      currentPosition = {
        bottom: rect.bottom / 2 + rect.height / 2,
        left: rect.left + rect.width / 2 - width / 2,
      };
      break;
    case "bottom":
      currentPosition = {
        top: rect.bottom,
        left: rect.left + rect.width / 2 - width / 2,
      };
      break;
    case "left":
      currentPosition = {
        top: rect.top + rect.height / 2 - height / 2,
        right: rect.right + rect.width / 2 - width,
      };
      break;
    default:
      break;
  }
  return show ? (
    <div
      className="fixed h-[50vh] max-h-auto bg-white border border-gray-200 shadow-md rounded-lg p-2 overflow-hidden pb-10"
      style={{ ...currentPosition, width: width, height: height }}
      ref={ref}
    >
      {children}
    </div>
  ) : (
    <></>
  );
};
export default PopupFlexibleOverlay;
