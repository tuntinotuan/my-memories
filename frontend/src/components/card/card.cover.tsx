import React from "react";

const CardCover = ({
  children,
  typeColor,
}: {
  children: React.ReactNode;
  typeColor: "keyword" | "answer";
}) => {
  let cardStyles = "";
  switch (typeColor) {
    case "keyword":
      cardStyles =
        "bg-primaryColor bg-opacity-15 border-primaryColor hover:border-primaryColor hover:shadow-primaryColor";
      break;
    case "answer":
      cardStyles =
        "bg-secondaryColor bg-opacity-5 border-secondaryColor hover:border-secondaryColor hover:shadow-secondaryColor";
      break;

    default:
      break;
  }
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 w-auto min-w-[100px] h-auto  rounded-xl border-2 border-opacity-10 p-3 cursor-pointer transition-all group hover:shadow-md ${cardStyles}`}
    >
      {children}
    </div>
  );
};

export default CardCover;
