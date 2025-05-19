import React, { useEffect, useRef, useState } from "react";
import { FuncCaculatePlacement } from "./process.functions";

type NavProps = {
  navList: string[];
  gap?: number;
};

const NavRow = ({ navList, gap = 8 }: NavProps) => {
  let currentCorArray = useRef<number[]>([]);
  const [currentPage, setCurrentPage] = useState<string>(navList[0]);

  const { placement } = FuncCaculatePlacement(
    navList,
    currentPage,
    currentCorArray.current,
    gap
  );

  return (
    <div className="relative flex items-center" style={{ gap }}>
      {navList.map((item, index) => (
        <NavItem
          key={item}
          title={item}
          index={index}
          navLength={navList.length}
          currentCor={currentCorArray.current}
          setCurrentPage={setCurrentPage}
        ></NavItem>
      ))}
      <div
        className="absolute h-[3px] rounded bg-primaryColor transition-all"
        style={{
          width: placement?.width,
          left: 0,
          bottom: 0,
          transform: `translateX(${placement?.translate}px)`,
        }}
      ></div>
    </div>
  );
};

function NavItem({
  navLength,
  title,
  index,
  setCurrentPage,
  currentCor,
}: {
  title: string;
  navLength: number;
  index: number;
  currentCor: number[];
  setCurrentPage: (e: any) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    currentCor.length < navLength &&
      currentCor.push(ref?.current?.getBoundingClientRect().width || 0);
    if (index === 0) {
      setCurrentPage(title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      ref={ref}
      className="text-sm hover:bg-gray-100 rounded-lg cursor-pointer transition-all px-2 py-[10px] mt-2"
      onClick={() => setCurrentPage(title)}
    >
      {title}
    </div>
  );
}

export default NavRow;
