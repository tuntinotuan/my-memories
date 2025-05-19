import { useOnClickOutside } from "usehooks-ts";
import DeleteIcon from "../icons/DeleteIcon";
import { useRef, useState } from "react";
import PortalOverlay from "./portal.overlay";
import OpenInANewTabIcon from "../icons/OpenInANewTabIcon";
import LinkNewTabOverlay from "../overlay/link.newtab.overlay";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import { Id } from "@/app/(home)/project/[slug]/modules/types";
import { useTyping } from "@/contexts/TypingStates";
import ThemeItem from "../theme/ThemeItem";
import ArrowBackIcon from "../icons/ArrowBackIcon";
import { themeList } from "@/api/typing/typing.data.structure";

export const PopupDotsSetting = ({
  onClickDelete,
  pickedItem,
  show,
  onClose,
}: any) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref, onClose);
  const {
    wordList,
    setWordList,
    currentlyPickedSetting,
    setCurrentlyPickedSetting,
  } = useTyping();
  let listControls = [
    {
      icon: <OpenInANewTabIcon size="medium"></OpenInANewTabIcon>,
      title: "Open in a new tab",
      href: pickedItem.href,
    },
    {
      icon: (
        <ThemeItem item={pickedItem.theme} currentTheme="" size={9}></ThemeItem>
      ),
      title: "Change theme",
      onClick: () => {
        onClickDelete(pickedItem.id);
        onClose();
      },
    },
    {
      icon: <DeleteIcon></DeleteIcon>,
      title: "Delete",
      onClick: () => {
        onClickDelete(pickedItem.id);
        onClose();
      },
    },
  ];
  const handleUpdateTypingListName = (id: Id, title: string) => {
    const newTasks = wordList.map((item: any) => {
      if (item.id !== id) return item;
      return { ...item, name: title };
    });
    setCurrentlyPickedSetting({ ...currentlyPickedSetting, title });
    setWordList(newTasks);
  };
  return show ? (
    <PortalOverlay>
      <div
        ref={ref}
        className={`fixed w-[300px] h-auto bg-white shadow-popup-rect rounded-xl z-50 border border-gray-200 overflow-hidden`}
        style={{
          top:
            pickedItem.rect.top + window.scrollY + pickedItem.rect.height / 2,
          left: pickedItem.rect.right + window.scrollX,
          transform: "translate(0, -50%)",
        }}
      >
        <div className="flex flex-col border border-transparent border-b-gray-200 p-3">
          <InputPencilEdit
            title={pickedItem.title}
            id={pickedItem.id}
            updateTitle={handleUpdateTypingListName}
          ></InputPencilEdit>
        </div>
        {listControls.map((item) => (
          <Item
            key={item.title}
            onClick={item.onClick ? item.onClick : () => {}}
            href={item.href}
            icon={item.icon}
            title={item.title}
          ></Item>
        ))}
        {false && <ChangeThemePage></ChangeThemePage>}
      </div>
    </PortalOverlay>
  ) : (
    <></>
  );
};

const ChangeThemePage = () => {
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

const Item = ({
  onClick,
  title,
  icon,
  href,
}: {
  onClick: () => void;
  title: string;
  icon: React.ReactNode;
  href?: string;
}) => {
  const Main = () => {
    return (
      <div
        className="flex items-center gap-2 w-full text-primaryText hover:bg-gray-100 px-3 py-2 transition-all cursor-pointer"
        onClick={onClick}
      >
        {icon}
        {title}
      </div>
    );
  };
  if (href)
    return (
      <LinkNewTabOverlay href={href}>
        <Main></Main>
      </LinkNewTabOverlay>
    );
  return <Main></Main>;
};

const InputPencilEdit = ({
  title,
  updateTitle,
  id,
}: {
  title: string;
  updateTitle: any;
  id: Id;
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState("");
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };
  useOnClickOutside(ref, () => setShowEdit(false));
  return (
    <>
      {!showEdit && (
        <div
          className="flex items-center  gap-1 w-fit max-w-full font-bold text-lg border border-transparent hover:border-b-gray-300 border-dotted transition-all"
          onClick={() => setShowEdit(true)}
        >
          <p className="truncate">{title}</p>
          <DriveFileRenameOutlineOutlinedIcon
            className="shrink-0 cursor-pointer"
            onClick={() => setShowEdit(true)}
          />
        </div>
      )}
      {showEdit && (
        <input
          ref={ref}
          type="text"
          defaultValue={title}
          autoFocus
          onFocus={(e) => e.target.select()}
          onChange={handleChangeTitle}
          className="font-bold text-lg border border-transparent border-b-gray-300 border-dotted transition-all"
          onBlur={() => {
            setShowEdit(false);
            if (title === newTitle || !newTitle) return;
            updateTitle(id, newTitle);
            setNewTitle("");
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            setShowEdit(false);
            if (title === newTitle || !newTitle) return;
            updateTitle(id, newTitle);
            setNewTitle("");
          }}
        />
      )}
    </>
  );
};
