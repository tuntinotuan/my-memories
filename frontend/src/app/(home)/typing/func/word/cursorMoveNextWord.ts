import { useTyping } from "@/contexts/TypingStates";
import { useEffect } from "react";

export function useCursorMoveNextWord() {
  const { countNextWord } = useTyping();
  useEffect(() => {
    document.getElementById(`typingCursorId${countNextWord}`)?.focus();
  }, [countNextWord]);
}
