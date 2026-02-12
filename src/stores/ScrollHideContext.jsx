import { createContext, useContext, useEffect, useState } from "react";

const ScrollHideContext = createContext();

export function ScrollHideProvider({ children }) {
  const [hidden, setHidden] = useState(false);

  // Configuration
  const THRESHOLD = 80; // don't hide until past this scroll Y
  const MIN_DELTA = 6; // ignore tiny scroll movements
  const SHOW_ON_FAST_UP = 25; // reveal if user scrolls up quickly
  const DEBOUNCE_MS = 35; // smoothness for scroll calculations

  let lastY = 0;
  let lastExec = 0;

  useEffect(() => {
    function handleScroll() {
      const now = performance.now();
      const y = window.scrollY;

      // --- Debounce (run every DEBOUNCE_MS ms max)
      if (now - lastExec < DEBOUNCE_MS) return;
      lastExec = now;

      const delta = y - lastY;
      const absDelta = Math.abs(delta);

      // --- Always reveal near the top
      if (y < THRESHOLD) {
        setHidden(false);
        lastY = y;
        return;
      }

      // --- Ignore tiny scroll jitters (smooth)
      if (absDelta < MIN_DELTA) {
        lastY = y;
        return;
      }

      // --- Fast upward scroll => show immediately
      if (delta < -SHOW_ON_FAST_UP) {
        setHidden(false);
        lastY = y;
        return;
      }

      // --- Normal scroll behavior
      if (delta > 0) {
        setHidden(true); // scrolling down → hide
      } else {
        setHidden(false); // scrolling up → show
      }

      lastY = y;
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ScrollHideContext.Provider value={{ hidden }}>
      {children}
    </ScrollHideContext.Provider>
  );
}

export const useScrollHide = () => useContext(ScrollHideContext);
