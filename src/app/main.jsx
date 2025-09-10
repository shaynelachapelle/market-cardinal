import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "../stores/ThemeContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Watchlist from "./pages/WatchlistPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AssetDetailsPage from "./pages/AssetDetailsPage.jsx";
import Overview from "./pages/OverviewPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import { UserProvider } from "../stores/UserContext.jsx";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import { WatchlistProvider } from "../features/watchlist/stores/WatchlistContext.jsx";

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
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/confirmation",
    element: <ConfirmationPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <UserProvider>
        <WatchlistProvider>
          <RouterProvider router={router} />
        </WatchlistProvider>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>
);
