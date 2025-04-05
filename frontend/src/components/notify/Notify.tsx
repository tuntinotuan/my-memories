import { useNotify } from "@/contexts/notifyStates";
import React, { useEffect } from "react";

type NotifyProps = {
  children: React.ReactNode;
};

const Notify = ({ children }: NotifyProps) => {
  const { active, setActive } = useNotify();
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setActive(false);
    }, 4000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-lg bg-white border border-gray-300 shadow-xl p-2 z-50 transition-all ${
        active ? "top-4 scale-100 visible" : "top-0 scale-50 invisible"
      }`}
    >
      {children}
    </div>
  );
};

export default Notify;
