"use client";
import HomeMenu from "@/components/layout/home.menu";
import ProjectSidebar from "@/components/layout/project.sidebar";
import Button from "@/components/button/Button";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import Image from "next/image";
import { Tooltip } from "@nextui-org/tooltip";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseIcon from "@/components/icons/CloseIcon";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ButtonCreate from "@/components/button/ButtonCreate";
import ThreeDotsIcon from "@/components/icons/ThreeDotsIcon";
import TodayDesignBanner from "./modules/TodayDesignBanner";
import { useRef, useState } from "react";
type scrollTypes = {
  scrollTop: number;
  scrollLeft: number;
};
type ColorCode = { from: string; to: string; url?: string };
type UrlCode = { from?: string; to?: string; url: string; alt: string };
type GradientTypes = ColorCode | UrlCode;
export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ref = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState({} as scrollTypes);
  const handleScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollLeft } = ref.current;
      setScroll({ scrollTop, scrollLeft });
    }
  };
  const imageList = [
    { url: "/moment.png", alt: "moment" },
    { url: "/purple.png", alt: "purple" },
    { url: "/pinksky.jpg", alt: "pinksky" },
    { url: "/sunset.png", alt: "purple" },
  ];
  let gradientList = [
    { from: "#7731d8", to: "#01C4CD" },
    { from: "#0c66e3", to: "#09336f" },
    { from: "#09326c", to: "#c7509b" },
    { from: "#6f5dc6", to: "#e374bc" },
    { from: "#e34935", to: "#f9a13d" },
  ];
  let defaultGradient = { url: "/moment.png", alt: "moment" };
  const [currentGradient, setCurrentGradient] =
    useState<GradientTypes>(defaultGradient);
  console.log("currentGradient", currentGradient);

  const handleChangeGradient = (e: any, item: any) => {
    setCurrentGradient({ from: item.from, to: item.to });
    console.log("from-to", item);
  };
  const handleChangeBg = (item: any) => {
    setCurrentGradient({ url: item.url, alt: item.alt });
    console.log("url", item);
    console.log("result", item === currentGradient);
  };
  return (
    <div className="flex w-full mt-2 mx-2">
      <ProjectSidebar></ProjectSidebar>
      <div className="relative bg-white rounded-t-xl shadow-xl w-full">
        <div
          className={`flex items-center justify-end w-full gap-2 sticky top-0 left-0 right-0 py-2 bg-white rounded-t-xl px-6 ${
            scroll.scrollTop > 0 ? "shadow-lg" : ""
          }`}
        >
          <label
            htmlFor="searchInputId"
            className={`flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1 text-sm hover:border-gray-500 transition-all cursor-text w-[450px]`}
          >
            <SearchRoundedIcon
              fontSize="large"
              className="text-gray-500 hover:border-gray-500"
            ></SearchRoundedIcon>
            <input
              type="search"
              id="searchInputId"
              placeholder="Search your content and Canvas's"
              className="w-full placeholder:font-light placeholder:text-gray-500"
            ></input>
          </label>
          {/* {scroll.scrollTop} | {scroll.scrollLeft} */}
          <Tooltip
            showArrow
            content="Settings"
            placement="bottom"
            radius="sm"
            delay={200}
            closeDelay={200}
            className="!px-2 !py-[2px]"
            shadow="sm"
          >
            <div>
              <Button disable>
                <SettingsOutlinedIcon></SettingsOutlinedIcon>
              </Button>
            </div>
          </Tooltip>
          <Button disable>
            <NotificationsNoneOutlinedIcon></NotificationsNoneOutlinedIcon>
          </Button>
          <Button className="py-1" disable>
            <Image
              src="/avatar.jpg"
              alt="Avatar Icon"
              width={30}
              height={30}
              priority
              className="border border-secondaryColor rounded-full"
            />
            <div className="text-xs flex flex-col items-start">
              <p>Personal</p>
              <span className="font-normal">Tuan Nguyen Van</span>
            </div>
            <ExpandMoreRoundedIcon></ExpandMoreRoundedIcon>
          </Button>
        </div>
        <div
          className="w-full h-full overflow-auto"
          ref={ref}
          onScroll={handleScroll}
        >
          {children}
          {/* <div className="fixed top-[10vh] mx-auto left-0 right-0 flex flex-col items-start gap-2 w-[400px] h-auto max-h-[88vh] bg-f2Color border border-gray-200 rounded-md shadow-2xl text-xs">
            <div className="flex items-center justify-between w-full text-sm font-bold pt-4 px-4">
              <ArrowLeftIcon fontSize="inherit"></ArrowLeftIcon>
              Create board
              <CloseIcon fontSize="small"></CloseIcon>
            </div>
            <div className="flex flex-col gap-2 overflow-auto px-4 pb-4">
              <div
                className={`flex items-center justify-center w-5/6 h-[200px] rounded mx-auto p-4 bg-gradient-to-br from-[${currentGradient.from}] to-[${currentGradient.to}] bg-cover`}
                style={
                  !currentGradient.from
                    ? { backgroundImage: `url(${currentGradient.url})` }
                    : {
                        backgroundImage: `linear-gradient(to bottom right, ${currentGradient.from}, ${currentGradient.to})`,
                      }
                }
              >
                <Image
                  src={`/14cda5dc635d1f13bc48.svg`}
                  alt="at layout"
                  width={2000}
                  height={200}
                ></Image>
              </div>
              <p className="font-bold">Background</p>
              <div className="">
                <div className="image-list grid grid-cols-4 gap-2">
                  {imageList.map((item, index) => (
                    <Image
                      src={item.url}
                      alt={item.alt}
                      width={200}
                      height={50}
                      className={`rounded shadow-md cursor-pointer hover:brightness-95 ${
                        currentGradient.url === item.url
                          ? "border-2 border-primaryColor shadow-sm shadow-primaryColor"
                          : ""
                      }`}
                      key={index}
                      onClick={() => handleChangeBg(item)}
                    />
                  ))}
                </div>
                <div className="gradient-list grid grid-cols-6 gap-2 mt-2">
                  {gradientList.map((item, index) => (
                    <div
                      className={`w-full h-10 bg-gradient-to-br from-[${
                        item.from
                      }]  to-[${
                        item.to
                      }] rounded shadow-md cursor-pointer hover:brightness-110 ${
                        currentGradient.from === item.from &&
                        currentGradient.to === item.to
                          ? "border-2 border-primaryColor shadow-sm shadow-primaryColor"
                          : ""
                      }`}
                      key={index}
                      style={{
                        background: `linear-gradient(to bottom right, ${item.from}, ${item.to})`,
                      }}
                      onClick={(e) => handleChangeGradient(e, item)}
                    ></div>
                  ))}
                  <div
                    className={`flex items-center justify-center w-full h-10 bg-primaryHover text-primaryText hover:text-black hover:shadow-md hover:-translate-y-[1px] rounded shadow-sm cursor-pointer transition-all`}
                  >
                    <ThreeDotsIcon></ThreeDotsIcon>
                  </div>
                </div>
              </div>
              <label htmlFor="" className="font-bold">
                Board title
              </label>
              <input
                type="text"
                className="border border-gray-200 rounded w-full px-3 py-2 focus:border-primaryColor"
              />
              <p className="text-[10px]">Board title is required</p>
              <ButtonCreate className="w-full" styles="primary" disable>
                Create
              </ButtonCreate>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
