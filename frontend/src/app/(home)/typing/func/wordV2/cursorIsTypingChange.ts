import { useTyping } from "@/contexts/TypingStates";
import { useEffect } from "react";

export function useCursorIsTypingChange(types: any) {
  const {
    setCursorIsTyping,
    cursorIsTyping,
    setSecondsOfManyWords,
    setIsCountDown,
  } = useTyping();
  useEffect(() => {
    if (cursorIsTyping) {
      if (types === "words") setSecondsOfManyWords(true);
      if (types === "time") setIsCountDown(true);
      document.body.style.cursor = "none";
    } else {
      if (types === "words") setSecondsOfManyWords(false);
      if (types === "time") setIsCountDown(false);
      document.body.style.cursor = "default";
    }

    const handleMove = (e: MouseEvent) => {
      if (!cursorIsTyping) return;
      setCursorIsTyping(false);
    };
    // document.documentElement.classList.add("cursor-none");
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [cursorIsTyping]);
}
