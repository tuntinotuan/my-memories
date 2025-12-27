import { useTyping } from "@/contexts/TypingStates";
import { useEffect } from "react";

export function usePreTestList(newArrWords: any, setNewArrWords: any) {
  const {
    setPreTestList,
    showResults,
    preTestList,
    repeatTest,
    setRepeatTest,
  } = useTyping();
  useEffect(() => {
    showResults && setPreTestList(newArrWords);
    console.log("pre test list", preTestList);
  }, [showResults]);
  useEffect(() => {
    if (repeatTest) {
      preTestList && setNewArrWords(preTestList);
      setRepeatTest(false);
    }
  }, [repeatTest]);
}
