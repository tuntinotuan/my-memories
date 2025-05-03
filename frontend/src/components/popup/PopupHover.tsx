import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const PopupHover = ({ children }: { children: React.ReactNode }) => {
  return (
    <Overlay>
      <div className="fixed top-1/2 left-2 flex flex-col gap-[2px] bg-black text-white text-lg/4 px-4 py-3 rounded z-30">
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
