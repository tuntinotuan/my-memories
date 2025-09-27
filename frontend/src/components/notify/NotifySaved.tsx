import React from "react";
import Notify from "./Notify";
import CloseIcon from "../icons/CloseIcon";
import { useNotify } from "@/contexts/notifyStates";

const NotifySaved = () => {
  const { title, activeSaved, setActiveSaved } = useNotify();
  return (
    <Notify active={activeSaved} setActive={setActiveSaved}>
      {title}
      <CloseIcon
        className="bg-green-500 bg-opacity-20 text-green-bg-green-500"
        onClick={() => setActiveSaved(false)}
      ></CloseIcon>
    </Notify>
  );
};

export default NotifySaved;
