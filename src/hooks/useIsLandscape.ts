
import { useEffect, useState } from "react";

export function useIsLandscape() {
  const [isLandscape, setIsLandscape] = useState(() =>
    window.matchMedia("(orientation: landscape)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(orientation: landscape)"
    );

    const handleOrientationChange = (
      event: MediaQueryListEvent
    ) => {
      setIsLandscape(event.matches);
    };

    mediaQuery.addEventListener("change", handleOrientationChange);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleOrientationChange
      );
    };
  }, []);

  return isLandscape;
}
