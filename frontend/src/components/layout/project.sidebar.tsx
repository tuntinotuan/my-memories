"use client";
import HeaderLogo from "../logo/header.logo";
import ButtonCreate from "../button/ButtonCreate";
import Button from "../button/Button";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ProjectCard from "../project/ProjectCard";
import { useState } from "react";
import CrownIcon from "../icons/CrownIcon";
import PlusIcon from "../icons/PlusIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import CloseIcon from "../icons/CloseIcon";
import { usePathname } from "next/navigation";
import PopupCreateboard from "../popup/PopupCreateboard";
const ProjectSidebar = () => {
  const [show, setShow] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showCreateboard, setShowCreateboard] = useState(false);
  let projectList = [
    {
      img: "https://cdn.prod.website-files.com/62c67bbf65af22785775fee3/66f6ace0028aed08e2ce0d46_Software%20Design%20DocumentationTemplate.png",
      title: "Online course presentation",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM0xlqNtKvvqUSlyfDKQQJmzQHDWPEedSV1g&s",
      title: "Green and Yellow Playful Illustrative Finance Presentation ",
    },
    {
      img: "https://cdn.prod.website-files.com/62c67bbf65af22785775fee3/66f6ace0028aed08e2ce0d46_Software%20Design%20DocumentationTemplate.png",
      title: "Online course presentation",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM0xlqNtKvvqUSlyfDKQQJmzQHDWPEedSV1g&s",
      title: "Green and Yellow Playful Illustrative Finance Presentation ",
    },
    {
      img: "https://cdn.prod.website-files.com/62c67bbf65af22785775fee3/66f6ace0028aed08e2ce0d46_Software%20Design%20DocumentationTemplate.png",
      title: "Online course presentation",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM0xlqNtKvvqUSlyfDKQQJmzQHDWPEedSV1g&s",
      title: "Green and Yellow Playful Illustrative Finance Presentation ",
    },
    {
      img: "https://cdn.prod.website-files.com/62c67bbf65af22785775fee3/66f6ace0028aed08e2ce0d46_Software%20Design%20DocumentationTemplate.png",
      title: "Online course presentation",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM0xlqNtKvvqUSlyfDKQQJmzQHDWPEedSV1g&s",
      title: "Green and Yellow Playful Illustrative Finance Presentation ",
    },
    {
      img: "https://cdn.prod.website-files.com/62c67bbf65af22785775fee3/66f6ace0028aed08e2ce0d46_Software%20Design%20DocumentationTemplate.png",
      title: "Online course presentation",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM0xlqNtKvvqUSlyfDKQQJmzQHDWPEedSV1g&s",
      title: "Green and Yellow Playful Illustrative Finance Presentation ",
    },
    {
      img: "https://cdn.prod.website-files.com/62c67bbf65af22785775fee3/66f6ace0028aed08e2ce0d46_Software%20Design%20DocumentationTemplate.png",
      title: "Online course presentation",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM0xlqNtKvvqUSlyfDKQQJmzQHDWPEedSV1g&s",
      title: "Green and Yellow Playful Illustrative Finance Presentation ",
    },
  ];
  const handleClickButton = () => {
    show ? setShow(false) : setShow(true);
  };
  const handleOpenAndCloseSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const handleOpenAndClosePopupCreateboard = () => {
    setShowCreateboard(!showCreateboard);
  };

  const pathName = usePathname();
  return (
    <>
      {showSidebar ? (
        <div className={`relative p-4 pl-2 shrink-0 w-[260px]`}>
          <PopupCreateboard
            show={showCreateboard}
            onClose={handleOpenAndClosePopupCreateboard}
          ></PopupCreateboard>
          {/* {pathName} */}
          <div className="flex items-center justify-between">
            <HeaderLogo></HeaderLogo>
            <CloseIcon onClick={() => setShowCreateboard(false)}></CloseIcon>
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
                <div className="flex flex-col items-center gap-1 overflow-auto max-h-[62vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-primaryHover [&::-webkit-scrollbar-thumb]:bg-primaryText [&::-webkit-scrollbar-track]:rounded-sm [&::-webkit-scrollbar-thumb]:rounded-sm">
                  {projectList.map((item, index) => (
                    <ProjectCard
                      key={index}
                      img={item.img}
                      title={item.title}
                    ></ProjectCard>
                  ))}
                </div>
                {projectList.length <= 6 && (
                  <Button className="w-full hover:bg-primaryHover text-primaryColor">
                    See all
                  </Button>
                )}
              </>
            )}
            <div className="bg-f2Color absolute bottom-0 left-0 right-0">
              <Button className="!justify-start gap-3 w-full hover:bg-primaryHover text-primaryText">
                <DeleteForeverOutlinedIcon fontSize="medium" />
                Trash
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <ArrowRightIcon
          onClick={handleOpenAndCloseSidebar}
          className="fixed top-6 -translate-x-5 hover:-translate-x-4 w-6 h-6 flex items-center justify-center bg-white shadow-md rounded-full border border-gray-100 z-50 transition-all"
        />
      )}
    </>
  );
};

export default ProjectSidebar;
