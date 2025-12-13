import React, { useEffect } from "react";

type NotifyProps = {
  children: React.ReactNode;
  active: boolean;
  setActive: (value: boolean) => void;
  className?: string;
};

const Notify = ({ children, active, setActive, className }: NotifyProps) => {
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
      className={`fixed left-1/2 -translate-x-1/2 flex items-center gap-4 rounded-xl bg-darkMode03 text-white dark:bg-white dark:text-darkMode03 border border-darkMode0A dark:border-gray-300 shadow-xl pl-4 py-2 pr-2 z-[999] transition-all ${className} ${
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
