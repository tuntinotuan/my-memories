import { useCreateBoardStates } from "@/contexts/createBoardStates";
import React from "react";
import ProjectImgOrGradient from "../project/ProjectImgOrGradient";
import BoardIconOverlay from "./BoardIconOverlay";
import SettingIcon from "../icons/SettingIcon";
import NotificationIcon from "../icons/NotificationIcon";
import DoDisturbOnRoundedIcon from "@mui/icons-material/DoDisturbOnRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import BoardList from "./BoardList";

const BoardMenu = () => {
  const { singleBoard } = useCreateBoardStates();
  const list1 = [
    {
      icon: (
        <ProjectImgOrGradient img={singleBoard.img} width={24} height={24} />
      ),
      title: "Change background",
      disable: false,
    },
    {
      icon: (
        <BoardIconOverlay>
          <SettingIcon fontSize="small" />
        </BoardIconOverlay>
      ),
      title: "Settings",
      disable: true,
    },

    {
      icon: (
        <BoardIconOverlay>
          <NotificationIcon fontSize="small" />
        </BoardIconOverlay>
      ),
      title: "Notification",
      disable: true,
    },
  ];
  const list2 = [
    {
      icon: (
        <BoardIconOverlay>
          <ContentCopyOutlinedIcon fontSize="small" />
        </BoardIconOverlay>
      ),
      title: "Copy board",
      disable: true,
    },
    {
      icon: (
        <BoardIconOverlay>
          <ReplyRoundedIcon fontSize="small" />
        </BoardIconOverlay>
      ),
      title: "Share",
      disable: true,
    },
    {
      icon: (
        <BoardIconOverlay>
          <DoDisturbOnRoundedIcon fontSize="small" />
        </BoardIconOverlay>
      ),
      title: "Turn off the board",
      disable: true,
    },
  ];
  return (
    <>
      <BoardList values={list1}></BoardList>
      <BoardList values={list2} lastItem></BoardList>
    </>
  );
};

export default BoardMenu;
