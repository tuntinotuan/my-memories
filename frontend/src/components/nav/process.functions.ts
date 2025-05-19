import { useEffect, useState } from "react";
import { PlacementProps } from "./types";

export function FuncCaculatePlacement(
  navList: string[],
  currentPage: string,
  currentCorArray: number[],
  gap: number
) {
  const [placement, setPlacement] = useState<PlacementProps>();

  useEffect(() => {
    const currentPageIndex = navList.indexOf(currentPage);

    let localValue: PlacementProps = {
      width: currentCorArray[currentPageIndex],
      translate: 0,
    };

    for (let index = 0; index < currentPageIndex; index++) {
      localValue.translate =
        localValue.translate + currentCorArray[index] + gap;
    }

    setPlacement(localValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  return { placement };
}
