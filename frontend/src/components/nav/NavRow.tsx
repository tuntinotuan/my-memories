import React, { useEffect, useRef, useState } from "react";
import { FuncCaculatePlacement } from "./process.functions";
import { PlacementProps } from "./types";

type NavProps = {
  navList: string[];
  gap?: number;
  pageDatas: any[];
  classNameCoverAllPage?: string;
  rightElementOthers?: React.ReactNode;
};

const NavRow = ({
  navList,
  gap = 8,
  pageDatas,
  classNameCoverAllPage,
  rightElementOthers,
}: NavProps) => {
  let currentCorArray = useRef<number[]>([]);
  const [currentPage, setCurrentPage] = useState<string>(navList[0]);

  const { placement } = FuncCaculatePlacement(
    navList,
    currentPage,
    currentCorArray.current,
    gap
  );
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="relative flex items-center" style={{ gap }}>
          {navList.map((item) => (
            <NavItem
              key={item}
              title={item}
              navLength={navList.length}
              currentCor={currentCorArray.current}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            ></NavItem>
          ))}
          <DynamicBorder placement={placement} />
        </div>
        {rightElementOthers}
      </div>
      {pageDatas.map((item, index) => (
        <>
          {index === navList.indexOf(currentPage) && (
            <div key={index} className={`${classNameCoverAllPage}`}>
              {item}
            </div>
          )}
        </>
      ))}
    </>
  );
};

function NavItem({
  navLength,
  title,
  setCurrentPage,
  currentCor,
  currentPage,
}: {
  title: string;
  navLength: number;
  currentCor: number[];
  currentPage: string;
  setCurrentPage: (e: any) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // get width per page
    currentCor.length < navLength &&
      currentCor.push(ref?.current?.getBoundingClientRect().width || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      ref={ref}
      className={`text-sm hover:bg-gray-100 dark:hover:bg-darkMode0A rounded-lg cursor-pointer transition-all px-2 py-[10px] mt-2 ${
        currentPage === title ? "font-bold hover:bg-transparent" : ""
      }`}
      onClick={() => setCurrentPage(title)}
    >
      {title}
    </div>
  );
}
function DynamicBorder({ placement }: { placement: PlacementProps }) {
  return (
    <div
      className="absolute h-[3px] rounded bg-primaryColor transition-all"
      style={{
        width: placement?.width,
        left: 0,
        bottom: 0,
        transform: `translateX(${placement?.translate}px)`,
      }}
    ></div>
  );
}
export default NavRow;
