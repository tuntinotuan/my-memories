import Image from "next/image";
import React from "react";

const TrashEmpty = () => {
  return (
    <>
      <Image
        src={"/trash.png"}
        alt="trash image"
        width={160}
        height={300}
        unoptimized
      ></Image>
      <p className="font-bold">{`There's not thing in your trash`}</p>
    </>
  );
};

export default TrashEmpty;
