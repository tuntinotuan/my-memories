import Link from "next/link";
import React from "react";
type LinkNewTabOverlayProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};
const LinkNewTabOverlay = ({
  href,
  children,
  className,
}: LinkNewTabOverlayProps) => {
  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className={className}
    >
      {children}
    </Link>
  );
};

export default LinkNewTabOverlay;
