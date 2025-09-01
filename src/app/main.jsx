import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "../components/ThemeContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Watchlist from "./pages/Watchlist.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AssetDetailsPage from "./pages/AssetDetailsPage.jsx";
import Overview from "./pages/Overview.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "watchlists",
        element: <Watchlist />,
      },
      {
        path: "assets/:symbol",
        element: <AssetDetailsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
