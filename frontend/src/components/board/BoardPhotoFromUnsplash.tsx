import { getUnsplashImage } from "@/api/unsplash/get.api";
import React, { useEffect, useState } from "react";
import SearchMenuHeader from "../search/SearchMenuHeader";
import UnsplashPhotosSkeleton from "../skeleton/UnsplashPhotosSkeleton";
import Button from "../button/Button";
import BoardUnsplashPhoto from "./BoardUnsplashPhoto";

const BoardPhotoFromUnsplash = ({ update }: any) => {
  const [photos, setPhotos] = useState<any>();
  const [loadingUnsplash, setLoadingUnsplash] = useState(false);
  const [searchValues, setSearchValues] = useState<string>("");

  const [page, setPage] = useState(1);
  useEffect(() => {
    async function fetchData() {
      setLoadingUnsplash(true);
      const data = await getUnsplashImage(searchValues || "nature", page);
      photos ? setPhotos((prev: any) => [...prev, ...data]) : setPhotos(data);
      console.log("data", data);
      setTimeout(() => {
        setLoadingUnsplash(false);
      }, 400);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValues, page]);

  useEffect(() => {
    setPage(1);
    setPhotos([]);
  }, [searchValues]);

  return (
    <div className="h-auto pb-4">
      <div className="bg-white dark:bg-darkMode03 sticky top-0 z-[1] py-2">
        <SearchMenuHeader
          placeholder="Photos"
          width="auto"
          className="z-10"
          setValues={setSearchValues}
        ></SearchMenuHeader>
      </div>
      <div className="h-auto grid grid-cols-2 items-center justify-start gap-2 overflow-y-auto mb-2">
        <BoardUnsplashPhoto
          photos={photos}
          // transparent={loadingUnsplash}
          update={update}
        />
        {loadingUnsplash && <UnsplashPhotosSkeleton />}
      </div>
      <Button
        className={`!justify-center gap-3 w-full hover:bg-primaryHover hover:text-primaryColor transition-all`}
        onClick={() => setPage(page + 1)}
      >
        Load more
      </Button>
    </div>
  );
};

export default BoardPhotoFromUnsplash;
