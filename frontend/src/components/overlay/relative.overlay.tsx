import React from "react";

type RelativeOverlayProps = {
  children: React.ReactNode;
  className?: string;
};

const RelativeOverlay = ({ children, className }: RelativeOverlayProps) => {
  return <div className={`relative flex ${className}`}>{children}</div>;
};

export default RelativeOverlay;
