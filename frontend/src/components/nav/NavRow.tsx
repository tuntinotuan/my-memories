import React, { useEffect, useRef, useState } from "react";

const NavRow = () => {
  const [currentCor, setCurrentCor] = useState<any>();
  console.log("currentCor", currentCor);
  const navList = ["Designs", "Images", "Videos"];
  return (
    <div className="relative flex items-center gap-2">
      {navList.map((item, index) => (
        <NavItem
          key={item}
          title={item}
          index={index}
          setCurrentCor={setCurrentCor}
        ></NavItem>
      ))}
      {currentCor && (
        <div
          className="fixed h-[3px] rounded bg-primaryColor transition-all"
          style={{
            width: currentCor.width,
            left: currentCor.left,
            top: currentCor.top + currentCor.height,
          }}
        ></div>
      )}
    </div>
  );
};

function NavItem({
  title,
  index,
  setCurrentCor,
}: {
  title: string;
  index: number;
  setCurrentCor: (e: any) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (index === 0) setCurrentCor(ref?.current?.getBoundingClientRect());
  }, []);
  return (
    <div
      ref={ref}
      className="text-sm hover:bg-gray-100 rounded-lg cursor-pointer transition-all px-2 py-[10px] mt-2"
      onClick={() => setCurrentCor(ref?.current?.getBoundingClientRect())}
    >
      {title}
    </div>
  );
}

export default NavRow;
