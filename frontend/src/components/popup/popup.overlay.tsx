import useClickOutSide from "@/hooks/useClickOutSide";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type PopupOverlayInterface = {
  selector: string;
  children: React.ReactNode;
  show?: boolean;
  width: number;
};

const PopupOverlay = ({
  selector,
  children,
  show,
  width,
}: PopupOverlayInterface) => {
  // const ref = useRef<Element | null>(null);
  // useEffect(() => {
  //   ref.current = document.getElementById(selector);
  // }, [selector]);
  return createPortal(
    <LocalOverlay show={show} width={width}>
      {children}
    </LocalOverlay>,
    document.getElementById(selector) || document.body
  );
};

const LocalOverlay = ({
  children,
  show,
  width,
}: {
  children: React.ReactNode;
  show?: boolean;
  width: number;
}) => {
  const { ref, outside } = useClickOutSide();
  return (
    <div
      className={`fixed mx-auto top-[10vh] left-0 right-0 z-[9999] h-auto max-h-[88vh] border border-gray-200 rounded-md shadow-2xl text-xs transition-all bg-f2Color flex flex-col ${
        show
          ? "scale-100 opacity-100 visible"
          : "scale-[0.2] opacity-0 invisible"
      } `}
      style={{ width: width }}
    >
      {children}
    </div>
  );
};

export default PopupOverlay;
