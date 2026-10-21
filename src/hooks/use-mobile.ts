import * as React from "react";

const MOBILE_BREAKPOINT = 768;

// Read the screen size in the browser and remove the change listener when the component unmounts.
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );
  React.useEffect(function syncEffect() {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    function onChange() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }

    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return function cleanup() {
      return mql.removeEventListener("change", onChange);
    };
  }, []);
  return !!isMobile;
}
