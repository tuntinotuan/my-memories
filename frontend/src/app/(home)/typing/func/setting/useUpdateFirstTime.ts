import { useTyping } from "@/contexts/TypingStates";
import { useEffect } from "react";

export function useUpdateFirstTime(setFontsizeValue: any) {
  const { typingSettingLocal } = useTyping();
  // Update default fontsizeValue for first time
  useEffect(() => {
    typingSettingLocal && setFontsizeValue(typingSettingLocal.fontsize);
  }, [typingSettingLocal]);
}
