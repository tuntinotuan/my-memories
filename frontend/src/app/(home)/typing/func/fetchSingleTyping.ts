import { useTyping } from "@/contexts/TypingStates";
import { useTypingTheme } from "@/contexts/typingThemeStates";
import { cutIdFromSlug } from "@/utils/otherFs";
import { useEffect } from "react";

export function useFetchSingleTypingPage(params: any, setNewWordList: any) {
  const { wordList, setShowResults, setSingleTypingList } = useTyping();
  const { setSingleTheme } = useTypingTheme();

  useEffect(() => {
    setShowResults(false);

    const newData = wordList.find(
      (item: any) => item.id === Number(cutIdFromSlug(params.slug, "-id"))
    );
    if (!newData) return;

    setNewWordList(newData.typingList);
    setSingleTypingList(newData);
    setSingleTheme(newData.theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordList, params.slug]);
}
