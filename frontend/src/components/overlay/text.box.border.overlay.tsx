import React from "react";

type TextBoxBorderOverlayProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

const TextBoxBorderOverlay = ({
  children,
  title = "Text appearance",
  className,
}: TextBoxBorderOverlayProps) => {
  return (
    <div
      className={`relative border border-gray-200 p-2 bg-inherit ${className}`}
    >
      <p className="absolute left-2 top-0 -translate-y-1/2 bg-inherit">
        {title}
      </p>
      {children}
    </div>
  );
};

export default TextBoxBorderOverlay;
