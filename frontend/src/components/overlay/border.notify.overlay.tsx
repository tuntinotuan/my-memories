import React from "react";

const BorderNotifyOverlay = ({
  children,
  visible,
}: {
  children: React.ReactNode;
  visible: boolean;
}) => {
  return (
    <div className="relative">
      <div
        className={`absolute -inset-1 border-2 border-dashed border-red-500 rounded-lg z-[999] transition-all animate-pulse ${
          true ? "visible opacity-100" : "invisible opacity-0"
        }`}
      ></div>
      {children}
    </div>
  );
};

export default BorderNotifyOverlay;
