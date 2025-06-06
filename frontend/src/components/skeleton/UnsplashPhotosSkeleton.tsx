import React from "react";

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

export default UnsplashPhotosSkeleton;
