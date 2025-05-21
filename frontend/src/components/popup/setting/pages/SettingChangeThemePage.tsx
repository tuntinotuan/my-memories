import { themeList } from "@/api/typing/typing.data.structure";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import ThemeItem from "@/components/theme/ThemeItem";
import { useTyping } from "@/contexts/TypingStates";

export const SettingChangeThemePage = ({}) => {
  const { currentlyPickedSetting } = useTyping();
  return (
    <>
      <div className="flex items-center gap-2 p-3">
        <div className="flex items-center justify-center p-1 rounded-lg hover:bg-primaryHover transition-all cursor-pointer">
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
            // onClick={() => {
            //   if (changeFor === "global") {
            //     setTheme(item);
            //   }
            //   if (changeFor === "single") {
            //     updateSingleTheme(singleTypingList.id, item);
            //   }
            //   setThemePopup(false);
            // }}
          ></ThemeItem>
        ))}
      </div>
    </>
  );
};
