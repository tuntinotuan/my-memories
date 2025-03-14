"use client";
import useClickOutSide from "@/hooks/useClickOutSide";
import Link from "next/link";
import { forwardRef } from "react";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  hover?: string;
  onClick?: () => void;
  disable?: boolean;
};

const Button = (props: ButtonProps) => {
  const { hover = "hover:bg-f2Color" } = props;
  const Main = () => {
    return (
      <button
        className={`rounded-lg text-center flex items-center justify-center gap-2 p-2 text-sm font-semibold transition-all ${hover} ${
          props.disable ? "!cursor-wait brightness-90" : ""
        }
          ${props.className}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  };
  if (props.href) {
    return (
      <Link href={props.href}>
        <Main />
      </Link>
    );
  } else return <Main />;
};

export default Button;
