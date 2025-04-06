import React from "react";
import Notify from "./Notify";
import Button from "../button/Button";
import { useNotify } from "@/contexts/notifyStates";

const NotifyComeBack = () => {
  const { title, activeComeBack, setActiveComeBack } = useNotify();
  return (
    <Notify active={activeComeBack} setActive={setActiveComeBack}>
      <p className="">{title}</p>
      <Button
        className="text-primaryColor bg-primaryColor bg-opacity-20 px-5"
        onClick={() => setActiveComeBack(false)}
      >
        Undo
      </Button>
    </Notify>
  );
};

export default NotifyComeBack;
