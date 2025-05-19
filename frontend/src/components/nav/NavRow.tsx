import React, { useEffect, useRef, useState } from "react";

const NavRow = ({ navList }: { navList: string[] }) => {
  const [currentCor, setCurrentCor] = useState<number[]>([]);
  let currentCorArray = useRef<number[]>([]);
  const [currentPage, setCurrentPage] = useState<string>(navList[0]);
  const [placement, setPlacement] = useState<{
    width: number;
    translate: number;
  }>();
  console.log("currentPage", currentPage);
  console.log("placement", placement);
  const gapItem = 8;

  useEffect(() => {
    const isCurrentIndex = navList.indexOf(currentPage);
    console.log("isCurrentIndex", isCurrentIndex);
    let localValue: { width: number; translate: number } = {
      width: currentCorArray.current[isCurrentIndex],
      translate: 0,
    };
    for (let index = 0; index < isCurrentIndex; index++) {
      localValue.translate =
        localValue.translate + currentCorArray.current[index] + gapItem;
    }
    setPlacement(localValue);
  }, [currentPage]);

  return (
    <div className="relative flex items-center" style={{ gap: gapItem }}>
      {navList.map((item, index) => (
        <NavItem
          key={item}
          title={item}
          index={index}
          navLength={navList.length}
          currentCor={currentCorArray.current}
          setCurrentCor={setCurrentCor}
          setCurrentPage={setCurrentPage}
        ></NavItem>
      ))}
      {currentCor && (
        <div
          className="absolute h-[3px] rounded bg-primaryColor transition-all"
          style={{
            width: placement?.width,
            left: 0,
            bottom: 0,
            transform: `translateX(${placement?.translate || 0}px)`,
          }}
        ></div>
      )}
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
  setCurrentCor: (e: any) => void;
  setCurrentPage: (e: any) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    currentCor.length < navLength &&
      currentCor.push(ref?.current?.getBoundingClientRect().width || 0);
    // setCurrentCor([...currentCor, ref?.current?.getBoundingClientRect().width]);
    if (index === 2) {
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
