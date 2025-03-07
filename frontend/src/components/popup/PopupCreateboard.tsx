import React, { useState } from "react";
import CloseIcon from "@/components/icons/CloseIcon";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ButtonCreate from "@/components/button/ButtonCreate";
import ThreeDotsIcon from "@/components/icons/ThreeDotsIcon";
import Image from "next/image";
import PopupOverlay from "./popup.overlay";

type ColorCode = { from: string; to: string; url?: string };
type UrlCode = { from?: string; to?: string; url: string; alt: string };
type GradientTypes = ColorCode | UrlCode;
type PopupCreateboardProps = {
  show: boolean;
  onClose?: () => void;
};
const PopupCreateboard = ({ show, onClose }: PopupCreateboardProps) => {
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
    <PopupOverlay show={show} selector="myportal" width={400}>
      <div className="flex items-center justify-between w-full text-sm font-bold p-4">
        <ArrowLeftIcon fontSize="inherit"></ArrowLeftIcon>
        Create board
        <CloseIcon fontSize="small" onClick={onClose}></CloseIcon>
      </div>
      <div className="flex flex-col gap-2 h-full overflow-auto px-4 pb-4">
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
            unoptimized
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
                unoptimized
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
              <ThreeDotsIcon fontSize="medium"></ThreeDotsIcon>
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
    </PopupOverlay>
  );
};

export default PopupCreateboard;
