import { useTyping } from "@/contexts/TypingStates";
import { useEffect } from "react";

export function usePreTestList(newArrWords: any) {
  const { setPreTestList, showResults, preTestList } = useTyping();
  useEffect(() => {
    showResults && setPreTestList(newArrWords);
    console.log("pre test list", preTestList);
  }, [showResults]);
}
