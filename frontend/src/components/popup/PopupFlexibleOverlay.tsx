import React, { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import PortalOverlay from "../overlay/portal.overlay";
import { RectType } from "./types";

type PopupFlexibleOverlayProps = {
  children: React.ReactNode;
  rect: RectType;
  show: boolean;
  onClose: () => void;
  position?: "top" | "bottom" | "left" | "right";
  width: number;
  height: number;
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
    <PortalOverlay>
      <div
        className="fixed h-[50vh] max-h-auto bg-white dark:bg-darkMode03 dark:text-white border border-gray-200 dark:border-darkMode0A shadow-md rounded-lg p-2 overflow-hidden pb-10 z-50"
        style={{ ...currentPosition, width: width, height: height }}
        ref={ref}
      >
        {children}
      </div>
    </PortalOverlay>
  ) : (
    <></>
  );
};

export default PopupFlexibleOverlay;
