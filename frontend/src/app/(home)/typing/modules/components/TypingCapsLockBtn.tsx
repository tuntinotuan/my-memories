import LockIcon from "@/components/icons/LockIcon";
import { useTyping } from "@/contexts/TypingStates";
import React from "react";

const TypingCapsLockBtn = () => {
  const { isCaplock } = useTyping();

  return (
    <>
      {isCaplock && (
        <div className="absolute bottom-2 right-1/2 translate-x-1/2 flex items-center gap-2 bg-typingColorActive p-3 rounded-lg z-50">
          <LockIcon />
          Caps Lock
        </div>
      )}
    </>
  );
};

export default TypingCapsLockBtn;
