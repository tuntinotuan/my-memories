import { useTyping } from "@/contexts/TypingStates";
import { useEffect } from "react";

export function useUpdateWordGap() {
  const { typingFontsize, typingFontsizeX, setWordGap } = useTyping();
  // usage update wordGap Var after typingFontsizeX change
  useEffect(() => {
    setWordGap(((typingFontsize * typingFontsizeX) / 100) * 60);
  }, [typingFontsizeX]);
}
