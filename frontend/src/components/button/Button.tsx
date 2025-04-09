"use client";
import { useNotify } from "@/contexts/notifyStates";
import Link from "next/link";

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
  const { setTitle, setActiveNormal } = useNotify();
  const Main = () => {
    return (
      <button
        className={`rounded-lg text-center flex items-center justify-center gap-2 p-2 text-sm font-semibold transition-all ${hover} ${
          props.disable ? "!cursor-wait brightness-90" : ""
        }
          ${props.className}`}
        onClick={
          !props.disable
            ? props.onClick
            : () => {
                setTitle("Unfortunately, this feature is under development"),
                  setActiveNormal(true);
              }
        }
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
