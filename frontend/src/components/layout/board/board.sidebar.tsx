import CloseIcon from "@/components/icons/CloseIcon";
import React from "react";
import { useLayoutStates } from "@/contexts/layoutStates";
import ProjectImgOrGradient from "@/components/project/ProjectImgOrGradient";
import SettingIcon from "@/components/icons/SettingIcon";
import NotificationIcon from "@/components/icons/NotificationIcon";
import { BoardSidebarProps } from "./type";
import DoDisturbOnRoundedIcon from "@mui/icons-material/DoDisturbOnRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import Image from "next/image";
const BoardSidebar = () => {
  const { showMenuboard, handleShowMenuboard } = useLayoutStates();
  const lists = [
    {
      icon: (
        <LocalIconOverlay>
          <SettingIcon fontSize="small" />
        </LocalIconOverlay>
      ),
      title: "Settings",
      disable: true,
    },
    {
      icon: (
        <ProjectImgOrGradient
          img={{ type: "linearGradient", from: "#e34935", to: "#f9a13d" }}
          width={24}
          height={24}
        />
      ),
      title: "Change background",
      disable: true,
    },
    {
      icon: (
        <LocalIconOverlay>
          <NotificationIcon fontSize="small" />
        </LocalIconOverlay>
      ),
      title: "Notification",
      disable: true,
    },
  ];
  const list2 = [
    {
      icon: (
        <LocalIconOverlay>
          <ContentCopyOutlinedIcon fontSize="small" />
        </LocalIconOverlay>
      ),
      title: "Copy board",
      disable: true,
    },
    {
      icon: (
        <LocalIconOverlay>
          <ReplyRoundedIcon fontSize="small" />
        </LocalIconOverlay>
      ),
      title: "Share",
      disable: true,
    },
    {
      icon: (
        <LocalIconOverlay>
          <DoDisturbOnRoundedIcon fontSize="small" />
        </LocalIconOverlay>
      ),
      title: "Turn off the board",
      disable: true,
    },
  ];
  return (
    <div
      className={`relative shadow-md text-sm transition-all shrink-0 ${
        showMenuboard
          ? "h-full w-[300px] border border-gray-200 opacity-100 px-2 py-3 "
          : "w-0 h-0 overflow-hidden translate-x-[300px]"
      }`}
    >
      <BoardTopControl handleShowMenuboard={handleShowMenuboard} />
      <div className="overflow-auto border border-transparent border-y-gray-200 py-2">
        {/* <BoardList values={lists}></BoardList>
        <BoardList values={list2} lastItem></BoardList> */}
        <div className="flex items-cemter gap-2">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={"/photos.jpg"}
              alt="photos from unsplash"
              className="rounded-lg cursor-pointer"
              width={150}
              height={100}
            ></Image>
            <p>Photos</p>
          </div>
          <div className="w-1/2 flex flex-col items-center gap-2 shrink-0">
            <div className="colors-element flex flex-col items-center justify-center gap-2 w-full h-[100px] bg-gradient-to-br from-[#0c66e3] to-[#09336f] rounded-lg cursor-pointer p-4">
              <div className="w-full h-6 bg-gradient-to-br from-[#e374bc] to-[#7731d8] rounded"></div>
              <div className="w-full h-6 bg-gradient-to-br from-[#e34935] to-[#f9a13d] rounded"></div>
            </div>
            <p>Colors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BoardTopControl = ({ handleShowMenuboard }: any) => {
  return (
    <div className="flex items-center justify-between pb-3">
      <ArrowLeftIcon></ArrowLeftIcon>
      <p className="font-bold">Menu</p>
      <CloseIcon className="" onClick={handleShowMenuboard}></CloseIcon>
    </div>
  );
};

const BoardList = ({
  values,
  lastItem,
}: {
  values: BoardSidebarProps[];
  lastItem?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col gap-1 border border-transparent border-b-gray-200 py-2 ${
        lastItem ? "border-none" : ""
      }`}
    >
      {values.map((value, index) => (
        <BoardItem
          icon={value.icon}
          title={value.title}
          disable={value.disable}
          key={index}
        ></BoardItem>
      ))}
    </div>
  );
};

const BoardItem = ({ icon, title, disable }: BoardSidebarProps) => {
  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-lg hover:bg-primaryHover transition-all cursor-pointer ${
        disable ? "cursor-wait" : ""
      }`}
    >
      {icon}
      <p>{title}</p>
    </div>
  );
};

const LocalIconOverlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center w-6 h-6 shrink-0">
      {children}
    </div>
  );
};

const BoardChangeBackground = () => {};
const BoardPhotosFromUnsplash = () => {};
const BoardColors = () => {};

export default BoardSidebar;
