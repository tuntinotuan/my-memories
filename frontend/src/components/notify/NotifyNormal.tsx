import React from "react";
import Notify from "./Notify";
import CloseIcon from "../icons/CloseIcon";
import { useNotify } from "@/contexts/notifyStates";

const NotifyNormal = () => {
  const { title, setActive } = useNotify();
  return (
    <Notify>
      {title}
      <CloseIcon onClick={() => setActive(false)}></CloseIcon>
    </Notify>
  );
};

export default NotifyNormal;
