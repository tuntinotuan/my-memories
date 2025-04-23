import React from "react";

type TypingMeaningProps = {
  children: React.ReactNode;
};

const TypingMeaning = ({ children }: TypingMeaningProps) => {
  return <span className="text-2xl text-typingTextHover">{children}</span>;
};

export default TypingMeaning;
