import { useEffect, useState } from "react";

export function useHydrate() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return { hydrated, setHydrated };
}
