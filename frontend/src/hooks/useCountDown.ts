import { WordTimeType } from "@/app/(home)/typing/modules/types";
import { useEffect, useState } from "react";

export function useCountDown(initialTiming: WordTimeType) {
  const [seconds, setSeconds] = useState<number>(initialTiming);
  const [isCountDown, setIsCountDown] = useState<boolean>(false);

  const resetCountDownIsInitial = () => {
    setSeconds(initialTiming);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isCountDown) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCountDown]);

  return { seconds, setIsCountDown, resetCountDownIsInitial };
}
