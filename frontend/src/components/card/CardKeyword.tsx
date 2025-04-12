import React from "react";
import CardCover from "./card.cover";
import Image from "next/image";

type CardKeywordProps = {
  img?: string;
  name: string;
  pronounce: string;
};

const CardKeyword = ({ img, name, pronounce }: CardKeywordProps) => {
  return (
    <CardCover typeColor="keyword">
      {img && (
        <Image
          src={
            "https://img.freepik.com/free-vector/lemon-natural-fruit-hand-drawn-cartoon-illustration_56104-2014.jpg?semt=ais_hybrid&w=740"
          }
          alt="lime"
          width={90}
          height={50}
          className="rounded-lg border border-gray-200"
        ></Image>
      )}
      <p className="text-4xl group-hover:text-primaryColor transition-all">
        {name}
      </p>
      <span className="text-xs">{pronounce}</span>
    </CardCover>
  );
};

export default CardKeyword;
