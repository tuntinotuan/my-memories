import { themeList } from "@/api/typing/typing.data.structure";
import { Id } from "@/app/(home)/project/[slug]/modules/types";
import ArrowBackIcon from "@/components/icons/arrow/ArrowBackIcon";
import ThemeItem from "@/components/theme/ThemeItem";
import { useTyping } from "@/contexts/TypingStates";
import { useTypingTheme } from "@/contexts/typingThemeStates";

export const SettingChangeThemePage = ({ onBackRootPage, onClose }: any) => {
  const { wordList, setWordList, currentlyPickedSetting } = useTyping();
  const { setSingleTheme } = useTypingTheme();
  const updateSingleTheme = (id: Id, theme: string) => {
    const newSingleTheme = wordList.map((item: any) => {
      if (item.id !== id) return item;
      return { ...item, theme };
    });
    setSingleTheme(theme);
    setWordList(newSingleTheme);
  };
  return (
    <>
      <div className="flex items-center gap-2 p-3">
        <div
          className="flex items-center justify-center p-1 rounded-lg hover:bg-primaryHover transition-all cursor-pointer"
          onClick={onBackRootPage}
        >
          <ArrowBackIcon></ArrowBackIcon>
        </div>
        <p className="font-bold text-lg">Change theme</p>
      </div>
      <div className="flex items-center justify-center gap-1 flex-wrap pb-3">
        {themeList.map((item, index) => (
          <ThemeItem
            key={index}
            item={item}
            index={index}
            currentTheme={currentlyPickedSetting.theme}
            onClick={() => {
              updateSingleTheme(currentlyPickedSetting.id, item);
              onClose();
            }}
          ></ThemeItem>
        ))}
      </div>
    </>
  );
};
