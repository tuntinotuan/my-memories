import { useState, useRef, useEffect, useCallback } from "react";

interface UseHoverOptions {
  enterDelay?: number; // milliseconds
  leaveDelay?: number; // milliseconds
}

export function useHoverDelay<T extends HTMLElement>({
  enterDelay = 0,
  leaveDelay = 0,
}: UseHoverOptions = {}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T | null>(null);

  const enterTimeout = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
    enterTimeout.current = setTimeout(() => {
      setIsHovered(true);
    }, enterDelay);
  }, [enterDelay]);

  const handleMouseLeave = useCallback(() => {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
      enterTimeout.current = null;
    }
    leaveTimeout.current = setTimeout(() => {
      setIsHovered(false);
    }, leaveDelay);
  }, [leaveDelay]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.addEventListener("mouseenter", handleMouseEnter);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node.removeEventListener("mouseenter", handleMouseEnter);
      node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseEnter, handleMouseLeave]);

  return { ref, isHovered };
}
