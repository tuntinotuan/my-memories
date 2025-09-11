import React from "react";

const TextAndContentOverlay = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex gap-10 my-5">{children}</div>;
};

export default TextAndContentOverlay;
