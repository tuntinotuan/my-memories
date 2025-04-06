import React from "react";
import Notify from "./Notify";
import CloseIcon from "../icons/CloseIcon";
import { useNotify } from "@/contexts/notifyStates";

const NotifyNormal = () => {
  const { title, activeNormal, setActiveNormal } = useNotify();
  return (
    <Notify active={activeNormal} setActive={setActiveNormal}>
      {title}
      <CloseIcon
        className="bg-primaryColor bg-opacity-20 text-primaryColor"
        onClick={() => setActiveNormal(false)}
      ></CloseIcon>
    </Notify>
  );
};

export default NotifyNormal;
