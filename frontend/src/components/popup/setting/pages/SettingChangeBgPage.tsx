import SettingTopControl from "../components/SettingTopControl";
import BoardPhotoFromUnsplash from "@/components/board/BoardPhotoFromUnsplash";
import BoardColor from "@/components/board/BoardColor";
import NavRow from "@/components/nav/NavRow";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import { LinearOrUrl } from "@/components/project/types";

export const SettingChangeBgPage = ({ onBackRootPage, onClose }: any) => {
  const { pickedSetting, setPickedSetting, boards, setBoards } =
    useCreateBoardStates();

  const updateSingleBackground = (bg: LinearOrUrl) => {
    const newSingleBoard = boards.map((item: any) => {
      if (item.id !== pickedSetting.id) return item;
      return { ...item, img: bg };
    });
    setPickedSetting({ ...pickedSetting, img: bg });
    setBoards(newSingleBoard);
    onClose();
  };
  const pageList = [
    <BoardPhotoFromUnsplash key={0} update={updateSingleBackground} />,
    <BoardColor
      key={1}
      sketchPickerView="below"
      update={updateSingleBackground}
    />,
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
