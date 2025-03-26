import React from "react";
import { LinearOrUrl } from "../project/types";
import Image from "next/image";
type UrlImageProps = {
  imageList: LinearOrUrl[];
  currentGradient: LinearOrUrl;
  handleClick: (item: LinearOrUrl) => void;
};
const UrlImage = ({
  imageList,
  currentGradient,
  handleClick,
}: UrlImageProps) => {
  return (
    <div className="image-list grid grid-cols-4 gap-2">
      {imageList.map(
        (item, index) =>
          item.type === "imageUrl" && (
            <Image
              src={item.url}
              alt={item.alt}
              width={200}
              height={50}
              className={`rounded shadow-md cursor-pointer hover:brightness-95 ${
                currentGradient.type === "imageUrl" &&
                currentGradient.url === item.url
                  ? "border-2 border-primaryColor shadow-sm shadow-primaryColor"
                  : ""
              }`}
              key={index}
              onClick={() => handleClick(item)}
              unoptimized
            />
          )
      )}
    </div>
  );
};

export default UrlImage;
