import React from "react";

const BoardIconOverlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center w-6 h-6 shrink-0">
      {children}
    </div>
  );
};

export default BoardIconOverlay;
