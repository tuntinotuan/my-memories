import { useTyping } from "@/contexts/TypingStates";
import { useEffect } from "react";

export function useCursorMoveNextWord() {
  const { typingWordIndex } = useTyping();
  useEffect(() => {
    document.getElementById(`typingCursorId${typingWordIndex}`)?.focus();
  }, [typingWordIndex]);
}
