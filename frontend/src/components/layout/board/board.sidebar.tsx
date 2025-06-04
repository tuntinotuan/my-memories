"use client"; // Required for Client Components
import CloseIcon from "@/components/icons/CloseIcon";
import React, { useEffect, useRef, useState } from "react";
import { useLayoutStates } from "@/contexts/layoutStates";
import ProjectImgOrGradient from "@/components/project/ProjectImgOrGradient";
import SettingIcon from "@/components/icons/SettingIcon";
import NotificationIcon from "@/components/icons/NotificationIcon";
import { BoardSidebarProps } from "./type";
import DoDisturbOnRoundedIcon from "@mui/icons-material/DoDisturbOnRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import ArrowLeftIcon from "@/components/icons/arrow/ArrowLeftIcon";
import Image from "next/image";
import SearchMenuHeader from "@/components/search/SearchMenuHeader";
import { getUnsplashImage } from "@/app/apiActions";
import { LinearOrUrl } from "@/components/project/types";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
export type PageBoardSidebarType = "menu" | "background" | "unsplash" | "color";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import PlusIcon from "@/components/icons/PlusIcon";
import PopupSketchPicker, {
  MySketchPicker,
} from "@/components/popup/PopupSketchPicker";
import Link from "next/link";
import { useScrollToEnd } from "@/hooks/useScrollToEnd";
import InfiniteScroll from "react-infinite-scroll-component";

type PageProps = {
  page: PageBoardSidebarType;
};
const BoardSidebar = () => {
  const { showMenuboard, handleShowMenuboard } = useLayoutStates();
  const { pageBoardSidebar } = useLayoutStates();
  return (
    <div
      className={`relative shadow-md text-sm transition-all shrink-0 overflow-hidden pb-10 ${
        showMenuboard
          ? "h-full w-[300px] border border-gray-200 opacity-100 px-2 py-3 "
          : "w-0 h-0 overflow-hidden translate-x-[300px]"
      }`}
    >
      <BoardTopControl handleShowMenuboard={handleShowMenuboard} />
      <Body page={pageBoardSidebar} />
    </div>
  );
};

const BoardTopControl = ({ handleShowMenuboard }: any) => {
  const { pageBoardSidebar, setPageBoardSidebar } = useLayoutStates();
  let newTopTitle = "";
  let newBack: PageBoardSidebarType = "menu";
  switch (pageBoardSidebar) {
    case "menu":
      newTopTitle = "Menu";
      break;
    case "background":
      newTopTitle = "Change background";
      break;
    case "unsplash":
      newTopTitle = "Photos from Unsplash";
      break;
    case "color":
      newTopTitle = "Colors";
      break;
    default:
      break;
  }
  switch (pageBoardSidebar) {
    case "background":
      newBack = "menu";
      break;
    case "color":
    case "unsplash":
      newBack = "background";
      break;

    default:
      break;
  }
  return (
    <div className="flex items-center justify-center pb-3">
      <ArrowLeftIcon
        className={`absolute transition-all ${
          pageBoardSidebar !== "menu" ? "left-2" : "-left-5"
        } `}
        onClick={() => setPageBoardSidebar(newBack)}
      ></ArrowLeftIcon>
      <p className="font-bold">{newTopTitle}</p>
      <CloseIcon
        className="absolute right-2"
        onClick={handleShowMenuboard}
      ></CloseIcon>
    </div>
  );
};
const Body = ({ page }: PageProps) => {
  return (
    <div className="h-full overflow-auto border border-transparent border-y-gray-200 py-2">
      {page === "menu" && <BoardMenu />}
      {page === "background" && <BoardChangeBackground />}
      {page === "unsplash" && <BoardPhotosFromUnsplash />}
      {page === "color" && <BoardColors />}
    </div>
  );
};

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
        <LocalIconOverlay>
          <SettingIcon fontSize="small" />
        </LocalIconOverlay>
      ),
      title: "Settings",
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
    <>
      <BoardList values={list1}></BoardList>
      <BoardList values={list2} lastItem></BoardList>
    </>
  );
};
const BoardChangeBackground = () => {
  const { setPageBoardSidebar } = useLayoutStates();
  return (
    <div className="flex items-cemter gap-2">
      <div
        className="w-1/2 h-auto flex flex-col items-center gap-2"
        onClick={() => setPageBoardSidebar("unsplash")}
      >
        <Image
          src={"/photos.jpg"}
          alt="photos from unsplash"
          className="w-full rounded-lg cursor-pointer"
          width={150}
          height={90}
          unoptimized
        ></Image>
        <p>Photos</p>
      </div>
      <div
        className="w-1/2 flex flex-col items-center gap-2 shrink-0"
        onClick={() => setPageBoardSidebar("color")}
      >
        <div className="colors-element flex flex-col items-center justify-center gap-2 w-full h-[100px] bg-gradient-to-br from-[#0c66e3] to-[#09336f] rounded-lg cursor-pointer p-4">
          <div className="w-full h-6 bg-gradient-to-br from-[#e374bc] to-[#7731d8] rounded"></div>
          <div className="w-full h-6 bg-gradient-to-br from-[#e34935] to-[#f9a13d] rounded"></div>
        </div>
        <p>Colors</p>
      </div>
    </div>
  );
};
export const BoardPhotosFromUnsplash = ({ update }: any) => {
  const [photos, setPhotos] = useState<any>();
  const [loadingUnsplash, setLoadingUnsplash] = useState(false);
  const [searchValues, setSearchValues] = useState<string>("");
  useEffect(() => {
    async function fetchData() {
      setLoadingUnsplash(true);
      const data = await getUnsplashImage(searchValues || "nature", 1);
      setPhotos(data);
      console.log("data", data);
      setTimeout(() => {
        setLoadingUnsplash(false);
      }, 400);
    }
    fetchData();
  }, [searchValues]);

  return (
    <div className="h-full">
      <div className="bg-white sticky top-0 z-[1] pb-2">
        <SearchMenuHeader
          placeholder="Photos"
          width="auto"
          className="z-10"
          setValues={setSearchValues}
        ></SearchMenuHeader>
      </div>
      <div className="h-auto grid grid-cols-2 items-center justify-start gap-2 overflow-y-auto pb-4">
        {loadingUnsplash && <UnsplashPhotosSkeleton />}

        <UnsplashPhotos
          photos={photos}
          setPhotos={setPhotos}
          transparent={loadingUnsplash}
          update={update}
        />
      </div>
    </div>
  );
};
export const BoardColors = ({
  sketchPickerView = "popup",
  update,
}: {
  sketchPickerView?: "popup" | "below";
  update?: any;
}) => {
  let gradientLists: { from: string; to: string; span: string }[] = [
    { from: "#7731d8", to: "#01C4CD", span: "❄️" },
    { from: "#0c66e3", to: "#09336f", span: "🌊" },
    { from: "#09326c", to: "#c7509b", span: "🔮" },
    { from: "#6f5dc6", to: "#e374bc", span: "🌈" },
    { from: "#e34935", to: "#f9a13d", span: "🍑" },
    { from: "#E774BB", to: "#F77465", span: "🌸" },
    { from: "#1F845A", to: "#5DC3CE", span: "🌎" },
    { from: "#505F79", to: "#192D4F", span: "👽" },
    { from: "#43290F", to: "#AB2A19", span: "🌋" },
  ];
  let colorLists = [
    "#838C91",
    "#89609E",
    "#CD5A91",
    "#4BBF6B",
    "#0079BF",
    "#519839",
    "#00AECC",
    "#D29034",
    "#B04632",
  ];
  const { singleBoard, setSingleBoard, boards, setBoards } =
    useCreateBoardStates();
  const [colorList, setColorList] = useState(colorLists);
  const [colorPicker, setColorPicker] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const updateColors = (from: string, to: string) => {
    let img: LinearOrUrl = {
      type: "linearGradient",
      from,
      to,
    };
    // updated current page data
    setSingleBoard({
      id: singleBoard.id,
      title: singleBoard.title,
      img: img,
    });
    // updated into contexts
    const newLists = boards.map((item) => {
      if (item.id !== singleBoard.id) return item;
      return { ...item, img };
    });
    setBoards(newLists);
  };
  const updateSingleColor = (code: string) => {
    let img: LinearOrUrl = {
      type: "colorCode",
      code,
    };
    // updated current page data
    setSingleBoard({
      id: singleBoard.id,
      title: singleBoard.title,
      img: img,
    });
    // updated into contexts
    const newLists = boards.map((item) => {
      if (item.id !== singleBoard.id) return item;
      return { ...item, img };
    });
    setBoards(newLists);
    setColorPicker(false);
  };
  useScrollToEnd(ref, colorPicker);
  return (
    <div className="h-full overflow-y-auto pb-4" ref={ref}>
      <div className="grid grid-cols-2 gap-2 mb-2 pb-2 border border-transparent border-b-gray-200">
        {gradientLists.map((item, index) => (
          <div
            key={index}
            className={`relative w-full h-24 rounded-lg bg-green-400 cursor-pointer hover:brightness-75 transition-all ${
              singleBoard.img.type === "linearGradient" &&
              (singleBoard.img.from === item.from &&
              singleBoard.img.to === item.to
                ? "brightness-75 cursor-wait"
                : "")
            }`}
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${item.from}, ${item.to})`,
            }}
            onClick={() =>
              update
                ? update({
                    type: "linearGradient",
                    from: item.from,
                    to: item.to,
                  })
                : updateColors(item.from, item.to)
            }
          >
            {singleBoard.img.type === "linearGradient" &&
              singleBoard.img.from === item.from &&
              singleBoard.img.to === item.to && (
                <DoneRoundedIcon
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500"
                  fontSize="small"
                ></DoneRoundedIcon>
              )}
            <span className="absolute left-2 bottom-2">{item.span}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2 mb-2">
        {colorList.map((item, index) => (
          <div
            key={index}
            className="relative w-11 h-11 rounded-md hover:brightness-75 transition-all cursor-pointer"
            style={{ background: item }}
            onClick={() =>
              update
                ? update({
                    type: "colorCode",
                    code: item,
                  })
                : updateSingleColor(item)
            }
          >
            {/* {singleBoard.img.type === "colorCode" &&
              singleBoard.img.code === item && (
                <DoneRoundedIcon
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500"
                  fontSize="small"
                ></DoneRoundedIcon>
              )} */}
          </div>
        ))}
        <div
          className="flex items-center justify-center w-11 h-11 rounded-md hover:brightness-75 transition-all cursor-pointer border border-gray-200"
          onClick={() => setColorPicker((pre) => !pre)}
        >
          <PlusIcon></PlusIcon>
        </div>
      </div>
      {sketchPickerView === "popup" && (
        <PopupSketchPicker
          show={colorPicker}
          onClose={() => setColorPicker(false)}
          updateColor={updateSingleColor}
          colorList={colorList}
          SetColorList={setColorList}
        ></PopupSketchPicker>
      )}
      {sketchPickerView === "below" && (
        <MySketchPicker
          show={colorPicker}
          onClose={() => setColorPicker(false)}
          updateColor={updateSingleColor}
          colorList={colorList}
          SetColorList={setColorList}
          hiddenTopControl
        ></MySketchPicker>
      )}
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
  const { setPageBoardSidebar } = useLayoutStates();
  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-lg hover:bg-primaryHover transition-all cursor-pointer ${
        disable ? "cursor-wait" : ""
      }`}
      onClick={!disable ? () => setPageBoardSidebar("background") : () => {}}
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

const UnsplashPhotos = ({
  photos,
  transparent,
  update,
  setPhotos,
}: {
  photos: any;
  setPhotos: any;
  transparent: boolean;
  update: any;
}) => {
  const { boards, singleBoard, setSingleBoard, setBoards } =
    useCreateBoardStates();
  const updatePhotos = (url: string, alt: string) => {
    let img: LinearOrUrl = {
      type: "imageUrl",
      url,
      alt,
    };
    // updated current page data
    setSingleBoard({
      id: singleBoard.id,
      title: singleBoard.title,
      img: img,
    });
    // updated into contexts
    const newLists = boards.map((item) => {
      if (item.id !== singleBoard.id) return item;
      return { ...item, img };
    });
    setBoards(newLists);
  };
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = async () => {
    const data = await getUnsplashImage("nature", 2);
    console.log("photos", photos);
    // setTimeout(() => {
    setPhotos((prev: any) => [...prev, ...data]);
    // }, 2000);
    // if (photos?.length >= 27) {
    //   setHasMore(false);
    //   return;
    // }
  };
  return (
    <>
      <InfiniteScroll
        dataLength={photos?.length || 9}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<UnsplashPhotosSkeleton />}
        endMessage={<p></p>}
        className="hide-scrollbar flex items-start gap-5 flex-wrap mt-5 overflow-y-hidden overflow-x-hidden"
      >
        {photos &&
          photos.map((img: any) => (
            <div className="relative w-full overflow-hidden" key={img.id}>
              <Image
                key={img.id}
                src={img.urls.small}
                alt={img.alt_description}
                width={100}
                height={100}
                className={`w-full cursor-pointer rounded-lg border border-gray-200 object-cover ${
                  transparent ? "opacity-0" : ""
                }`}
                unoptimized
                style={{ height: 100 }}
              ></Image>
              <div
                className={`absolute inset-0 bg-gray-200 bg-opacity-20 opacity-0 hover:opacity-100 transition-all cursor-pointer`}
              >
                <div
                  className="h-[75%] w-full hover:bg-gray-200 hover:bg-opacity-25 transition-all"
                  onClick={() =>
                    update
                      ? update({
                          type: "imageUrl",
                          url: img.urls.regular,
                          alt: img.alt_description,
                        })
                      : updatePhotos(img.urls.regular, img.alt_description)
                  }
                ></div>
                <Link
                  href={img.user.links.html}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="block h-[25%] w-full bg-black bg-opacity-25 px-2 py-1 truncate text-white text-xs rounded-br-lg rounded-bl-lg hover:underline transition-all"
                >
                  {img.user.first_name}
                </Link>
              </div>
            </div>
          ))}
      </InfiniteScroll>
    </>
  );
};
const UnsplashPhotosSkeleton = () => {
  return (
    <>
      {Array(9)
        .fill(null)
        .map((item, index) => (
          <div
            key={index}
            className="animate-pulse w-full h-28 rounded-lg bg-gray-200"
          ></div>
        ))}
    </>
  );
};

export default BoardSidebar;
