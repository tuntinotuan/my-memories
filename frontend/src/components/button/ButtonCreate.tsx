"use client";
import { useNotify } from "@/contexts/notifyStates";
import Link from "next/link";

type ButtonCreateProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  styles: "primary" | "secondary";
  disable?: boolean;
  onClick?: () => void;
};

const ButtonCreate = (props: ButtonCreateProps) => {
  const { styles, children, href, className, disable, onClick, ...rest } =
    props;
  const { setTitle, setActiveNormal } = useNotify();
  let newStyles = "";
  switch (styles) {
    case "primary":
      newStyles =
        "bg-opacity-85 bg-primaryColor hover:bg-opacity-100 text-white";
      break;
    case "secondary":
      newStyles = "bg-white text-black hover:shadow-md";
      break;
    default:
      break;
  }
  const Main = () => {
    return (
      <button
        className={`rounded-lg text-center flex items-center justify-center gap-2 py-2 text-sm font-semibold transition-all ${newStyles} ${
          disable
            ? "cursor-wait brightness-75 text-opacity-25 bg-opacity-100"
            : ""
        }
          ${className}`}
        onClick={
          !disable
            ? onClick
            : () => {
                setTitle("Unfortunately, this feature is under development"),
                  setActiveNormal(true);
              }
        }
        {...rest}
      >
        {children}
      </button>
    );
  };
  if (href) {
    return (
      <Link href={href}>
        <Main />
      </Link>
    );
  } else return <Main />;
};

export default ButtonCreate;
