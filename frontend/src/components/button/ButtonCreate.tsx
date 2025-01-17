"use client";
import Link from "next/link";

type ButtonCreateProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  styles: "primary" | "secondary";
  disable?: boolean;
};

const ButtonCreate = (props: ButtonCreateProps) => {
  let newStyles = "";
  switch (props.styles) {
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
          props.disable
            ? "cursor-wait brightness-75 text-opacity-25 bg-opacity-100"
            : ""
        }
          ${props.className}`}
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

export default ButtonCreate;
