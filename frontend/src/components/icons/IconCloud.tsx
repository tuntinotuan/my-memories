import React from "react";

const IconCloud = ({
  className,
  onClick = () => {},
  size = "w-5 h-5",
}: {
  className: string;
  onClick?: () => void;
  size?: string;
}) => {
  return (
    <span className={className} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="url(#GradientClound)"
        className={`${size}`}
      >
        <path d="M1 12.5A4.5 4.5 0 005.5 17H15a4 4 0 001.866-7.539 3.504 3.504 0 00-4.504-4.272A4.5 4.5 0 004.06 8.235 4.502 4.502 0 001 12.5z" />
        <defs>
          <linearGradient id="GradientClound" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9FAFE" />
            <stop offset="100%" stopColor="#98D1F1" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
};

export default IconCloud;
