export const resetTypingV2States = ({
  setHydrated,
  setCursorPosition,
  setValue,
  setTypingWordIndex,
  setHeightFlexible,
  setRowTyped,
}: any) => {
  setHydrated(false);
  setTimeout(() => {
    setHydrated(true);
  }, 0);
  setCursorPosition(0);
  setValue("");
  setTypingWordIndex(0);
  setHeightFlexible(0);
  setRowTyped(0);
};
