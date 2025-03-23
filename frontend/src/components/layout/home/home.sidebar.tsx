"use client";
import HeaderLogo from "../../logo/header.logo";
import ButtonCreate from "../../button/ButtonCreate";
import Button from "../../button/Button";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ProjectItem from "../../project/ProjectItem";
import { useRef, useState } from "react";
import CrownIcon from "../../icons/CrownIcon";
import PlusIcon from "../../icons/PlusIcon";
import ArrowDownIcon from "../../icons/ArrowDownIcon";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import CloseIcon from "../../icons/CloseIcon";
import { usePathname } from "next/navigation";
import PopupCreateboard from "../../popup/PopupCreateboard";
import { Tooltip } from "@nextui-org/tooltip";
import { useLayoutStates } from "@/contexts/layoutStates";
import { projectList } from "@/api/board/mock.data";
const HomeSidebar = () => {
  const [show, setShow] = useState(true);
  const { showHomeSidebar, handleShowHomeSidebar } = useLayoutStates();
  const [showCreateboard, setShowCreateboard] = useState(false);
  const handleClickButton = () => {
    show ? setShow(false) : setShow(true);
  };
  const handleOpenAndClosePopupCreateboard = () => {
    setShowCreateboard(!showCreateboard);
  };
  return (
    <>
      {/* Popup */}
      <PopupCreateboard
        show={showCreateboard}
        onClose={handleOpenAndClosePopupCreateboard}
      ></PopupCreateboard>
      {/* Popup ^ */}
      {showHomeSidebar && (
        <div className={`home-sidebar relative p-4 shrink-0 w-[260px]`}>
          <div className="flex items-center justify-between">
            <HeaderLogo></HeaderLogo>
            <Tooltip
              showArrow
              content="Close menu"
              placement="bottom"
              radius="sm"
              delay={200}
              closeDelay={200}
              className="!px-2 !py-[2px]"
              shadow="sm"
            >
              <div>
                <CloseIcon
                  onClick={() => handleShowHomeSidebar()}
                  className="homesidebar-close-icon opacity-0"
                  border
                ></CloseIcon>
              </div>
            </Tooltip>
          </div>
          <ButtonCreate
            className="!w-full my-2"
            styles="primary"
            onClick={() => setShowCreateboard(true)}
          >
            <PlusIcon />
            Create a project
          </ButtonCreate>
          <ButtonCreate className="!w-full" styles="secondary" disable>
            <CrownIcon />
            Try Pro for 30 days
          </ButtonCreate>
          <div className="">
            <Button
              className="group text-xs !gap-1 !py-[6px] !px-2 !rounded-[4px] my-[14px] text-primaryText"
              hover="hover:bg-primaryHover"
              onClick={handleClickButton}
            >
              <p>Recent designs</p>
              {show ? <ArrowDownIcon /> : <ArrowRightIcon />}
            </Button>
            {show && (
              <>
                <div className="flex flex-col items-center gap-1 overflow-auto max-h-[62vh] px-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-primaryHover [&::-webkit-scrollbar-thumb]:bg-primaryText [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:rounded-sm">
                  {projectList.map((item, index) => (
                    <ProjectItem
                      key={index}
                      img={item.img}
                      title={item.title}
                    ></ProjectItem>
                  ))}
                </div>
                {projectList.length <= 6 && (
                  <Button
                    className="w-full hover:bg-primaryHover text-primaryColor"
                    disable
                  >
                    See all
                  </Button>
                )}
              </>
            )}
            <div className="bg-f2Color absolute bottom-0 left-0 right-0 px-4">
              <Button
                className="!justify-start gap-3 w-full hover:bg-primaryHover text-primaryText"
                disable
              >
                <DeleteForeverOutlinedIcon fontSize="medium" />
                Trash
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeSidebar;
