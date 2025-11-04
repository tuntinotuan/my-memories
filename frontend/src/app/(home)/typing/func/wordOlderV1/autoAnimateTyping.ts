import { useTyping } from "@/contexts/TypingStates";
import { useEffect } from "react";

export function useAutoAnimateTyping(types: any) {
  const {
    secondsOfAutoAnimate,
    setAutoAnimateState,
    resetSecondsOfAutoAnimate,
    setCursorIsTyping,
  } = useTyping();
  useEffect(() => {
    if (secondsOfAutoAnimate === 0) {
      setAutoAnimateState(false);
      setCursorIsTyping(false);
      resetSecondsOfAutoAnimate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
