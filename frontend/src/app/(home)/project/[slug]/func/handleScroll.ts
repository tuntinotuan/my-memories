import { RefObject, useEffect } from "react";

export function useHandleScroll<T extends HTMLElement = HTMLElement>(
  scrollRef: RefObject<T>,
  scrollPosition: any,
  lists: any,
  showBoxAddList: any,
  newTitle: any
) {
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollPosition.current;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists]); // Runs when `listData` update

  // Restore scroll position after `AddBox UI` update
  useEffect(() => {
    const scrollCur = scrollRef.current;
    if (scrollCur) {
      const maxScrollLeft = scrollCur.scrollWidth - scrollCur.clientWidth;
      scrollCur.scrollLeft = maxScrollLeft;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBoxAddList, newTitle]); // Runs when `AddBox UI` update
}
