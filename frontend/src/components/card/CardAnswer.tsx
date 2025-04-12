import React from "react";
import CardCover from "./card.cover";

const CardAnswer = ({ name }: { name: string }) => {
  return (
    <CardCover>
      <p className="group-hover:text-primaryColor transition-all">{name}</p>
    </CardCover>
  );
};

export default CardAnswer;
