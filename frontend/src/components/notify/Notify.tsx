import React, { useEffect } from "react";

type NotifyProps = {
  children: React.ReactNode;
  active: boolean;
  setActive: (value: boolean) => void;
};

const Notify = ({ children, active, setActive }: NotifyProps) => {
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
      className={`fixed left-1/2 -translate-x-1/2 flex items-center gap-4 rounded-xl bg-white border border-gray-300 shadow-xl pl-4 py-2 pr-2 z-50 transition-all ${
        active
          ? "top-4 scale-100 visible opacity-100"
          : "-top-1 scale-50 invisible opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default Notify;
