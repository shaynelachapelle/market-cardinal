import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const instantRoutes = [
      "/auth",
      "/forgot-password",
      "/reset-password",
      "/confirmation",
      "/privacy",
      "/terms",
    ];
    const shouldJumpInstantly = instantRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

    if (shouldJumpInstantly) {
      window.scrollTo(0, 0); // instant jump
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" }); // smooth scroll
    }
  }, [location.pathname]);

  return null;
}
