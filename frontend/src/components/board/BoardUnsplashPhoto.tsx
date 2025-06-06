import { useCreateBoardStates } from "@/contexts/createBoardStates";
import React from "react";
import { LinearOrUrl } from "../project/types";
import Image from "next/image";
import Link from "next/link";

const BoardUnsplashPhoto = ({
  photos,
  transparent,
  update,
}: {
  photos: any;
  transparent?: boolean;
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
  return (
    <>
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
    </>
  );
};

export default BoardUnsplashPhoto;
