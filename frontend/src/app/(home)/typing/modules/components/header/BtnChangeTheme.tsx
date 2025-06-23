import ThemeIcon from "@/components/icons/typing/ThemeIcon";
import { useTypingTheme } from "@/contexts/typingThemeStates";

export const BtnChangeTheme = () => {
  const { setThemePopup } = useTypingTheme();
  return (
    <div
      className="flex gap-1 cursor-pointer hover:text-typingTextHover transition-all"
      onClick={() => setThemePopup(true)}
    >
      theme
      <ThemeIcon />
    </div>
  );
};
