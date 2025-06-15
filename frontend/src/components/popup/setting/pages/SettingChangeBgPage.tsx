import { Id } from "@/app/(home)/project/[slug]/modules/types";
import { useTyping } from "@/contexts/TypingStates";
import { useTypingTheme } from "@/contexts/typingThemeStates";
import SettingTopControl from "../components/SettingTopControl";
import BoardPhotoFromUnsplash from "@/components/board/BoardPhotoFromUnsplash";
import BoardColor from "@/components/board/BoardColor";
import NavRow from "@/components/nav/NavRow";

export const SettingChangeBgPage = ({ onBackRootPage, onClose }: any) => {
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
  const pageList = [
    <BoardPhotoFromUnsplash key={0} />,
    <BoardColor key={1} sketchPickerView="below" />,
  ];
  return (
    <div className="h-[400px] p-2">
      <SettingTopControl
        onBackRootPage={onBackRootPage}
        pageName="Change background"
        paddingClass=""
      ></SettingTopControl>
      <NavRow
        navList={["Photos", "Color"]}
        pageDatas={pageList}
        classNameCoverAllPage="flex flex-col w-full h-[80%] flex-1 overflow-y-auto"
      ></NavRow>
    </div>
  );
};
