import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
interface DOMRect {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
  toJSON(): any;
}
const PopupHover = ({
  children,
  rect,
  isHovered,
}: {
  children: React.ReactNode;
  rect: any;
  isHovered: any;
}) => {
  const [localRect, setLocalRect] = useState<DOMRect>(() => new DOMRect());
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      const newRect = ref.current.getBoundingClientRect();
      setLocalRect(newRect);
      console.log("recttttttt", newRect); // Safe: width is defined
    }
  }, []);

  return (
    <Overlay>
      <div
        className={`fixed flex flex-col gap-[2px] bg-black text-white text-lg/4 px-4 py-3 rounded transition-all z-30 ${
          isHovered
            ? "opacity-100 visible -translate-y-1"
            : "opacity-0 translate-y-0 invisible"
        }`}
        style={
          rect
            ? {
                top: rect.top + window.scrollY - 10,
                left: rect.left + window.scrollX + rect.width / 2,
                transform: "translate(-50%, -100%)",
              }
            : {}
        }
      >
        <div ref={ref}>{children}</div>
        <Arrow></Arrow>
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

const Arrow = () => {
  return (
    <div className="arrow absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-inherit rotate-45 -z-10"></div>
  );
};

export default PopupHover;
