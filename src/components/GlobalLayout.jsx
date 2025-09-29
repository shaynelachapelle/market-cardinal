import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

export default function GlobalLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
