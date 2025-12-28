import React from "react";
import Notify from "./Notify";
import CloseIcon from "../icons/CloseIcon";
import { useNotify } from "@/contexts/notifyStates";

const NotifySaved = () => {
  const { title, activeSaved, setActiveSaved } = useNotify();
  return (
    <Notify
      active={activeSaved}
      setActive={setActiveSaved}
      className="!bg-green-400 text-white dark:text-white font-bold"
    >
      {title}
      <CloseIcon
        className="bg-green-100 bg-opacity-20 text-green-100"
        onClick={() => setActiveSaved(false)}
      ></CloseIcon>
    </Notify>
  );
};

export default NotifySaved;
