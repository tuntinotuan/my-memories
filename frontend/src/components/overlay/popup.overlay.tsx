"use client";
import React from "react";
import PortalOverlay from "./portal.overlay";

type PopupOverlayInterface = {
  children: React.ReactNode;
  width: number | string;
  selector?: string;
  show?: boolean;
  onClick?: () => void;
  className?: string;
};

const PopupOverlay = ({
  children,
  show,
  width,
  onClick,
  className,
  selector,
}: PopupOverlayInterface) => {
  return (
    <PortalOverlay>
      <div
        className={`fixed inset-0 z-50 ${
          show ? "visible backdrop-blur-sm" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-gray-500 opacity-25 blur-sm ${
            show ? "" : ""
          }`}
          onClick={onClick}
        ></div>
        <div
          className={`fixed mx-auto top-[10vh] left-0 right-0 z-[9999] h-auto max-h-[88vh] border border-gray-200 rounded-md shadow-2xl text-xs transition-all bg-efColor flex flex-col items-center p-4 ${className} ${
            show
              ? "scale-100 opacity-100 visible"
              : "scale-[0.2] opacity-0 invisible"
          } `}
          style={{ width: width }}
        >
          {children}
        </div>
      </div>
    </PortalOverlay>
  );
};

export default PopupOverlay;
