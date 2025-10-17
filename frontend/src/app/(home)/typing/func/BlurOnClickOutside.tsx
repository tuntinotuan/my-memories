"use client";
import { useEffect } from "react";

export function BlurOnClickOutside() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const active = document.activeElement as HTMLElement | null;
      if (
        active &&
        active.tagName === "INPUT" &&
        !active.contains(e.target as Node)
      ) {
        active.blur();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return null;
}
