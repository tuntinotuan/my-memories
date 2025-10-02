import React from "react";

const TextAndContentOverlay = ({
  children,
  gap = 40,
}: {
  children: React.ReactNode;
  gap?: number;
}) => {
  return (
    <div className="flex items-center my-5" style={{ gap: gap }}>
      {children}
    </div>
  );
};

export default TextAndContentOverlay;
