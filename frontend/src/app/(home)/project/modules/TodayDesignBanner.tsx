import Image from "next/image";
import React from "react";

const TodayDesignBanner = () => {
  return (
    <div className="relative w-full">
      <Image
        src="/banner-design-today.jpg"
        alt="Design to day banner"
        width={1500}
        height={250}
        priority
        className="rounded-xl"
        unoptimized
      ></Image>
      <p className="text-3xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold w-full text-center">
        What will you design to day?
      </p>
    </div>
  );
};

export default TodayDesignBanner;
