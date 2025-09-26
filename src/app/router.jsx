import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Overview from "./pages/OverviewPage.jsx";
import Watchlist from "./pages/WatchlistPage.jsx";
import AssetDetailsPage from "./pages/AssetDetailsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import ConfirmationPage from "./pages/ConfirmationPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Overview /> },
      { path: "watchlists", element: <Watchlist /> },
      { path: "assets/:symbol", element: <AssetDetailsPage /> },
    ],
  },
  { path: "/auth", element: <AuthPage /> },
  { path: "/confirmation", element: <ConfirmationPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
]);

export default router;
