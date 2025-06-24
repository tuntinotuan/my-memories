import { useTyping } from "@/contexts/TypingStates";
import { useEffect } from "react";

export function useTimeShowResults(types: any) {
  const { setShowResults, setIsCountDown, secondsOfTimeWords } = useTyping();
  useEffect(() => {
    if (secondsOfTimeWords === 0 && types === "time") {
      setIsCountDown(false);
      setShowResults(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsOfTimeWords]);
}
