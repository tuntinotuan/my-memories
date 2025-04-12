import React from "react";
import CardCover from "./card.cover";

const CardAnswer = ({ name }: { name: string }) => {
  return (
    <CardCover typeColor="answer">
      <p className="group-hover:text-secondaryColor transition-all capitalize">
        {name}
      </p>
    </CardCover>
  );
};

export default CardAnswer;
