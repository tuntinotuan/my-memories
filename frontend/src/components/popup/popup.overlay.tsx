"use client";
import useClickOutSide from "@/hooks/useClickOutSide";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type PopupOverlayInterface = {
  selector: string;
  children: React.ReactNode;
  show?: boolean;
  width: number;
  onClick?: () => void;
};

const PopupOverlay = ({
  selector,
  children,
  show,
  width,
  onClick,
}: PopupOverlayInterface) => {
  // const ref = useRef<Element | null>(null);
  // useEffect(() => {
  //   ref.current = document.getElementById(selector);
  // }, [selector]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  return mounted
    ? createPortal(
        <LocalOverlay show={show} width={width} onClick={onClick}>
          {children}
        </LocalOverlay>,
        document.body
      )
    : null;
};

const LocalOverlay = ({
  children,
  show,
  width,
  onClick,
}: {
  children: React.ReactNode;
  show?: boolean;
  width: number;
  onClick?: () => void;
}) => {
  const { ref, outside } = useClickOutSide();
  return (
    <div
      className={`fixed inset-0 ${
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
        className={`fixed mx-auto top-[10vh] left-0 right-0 z-[9999] h-auto max-h-[88vh] border border-gray-200 rounded-md shadow-2xl text-xs transition-all bg-f2Color flex flex-col ${
          show
            ? "scale-100 opacity-100 visible"
            : "scale-[0.2] opacity-0 invisible"
        } `}
        style={{ width: width }}
      >
        {children}
      </div>
    </div>
  );
};

export default PopupOverlay;
