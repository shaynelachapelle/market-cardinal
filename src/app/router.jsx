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
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import TermsOfServicePage from "./pages/TermsOfServicePage.jsx";
import GlobalLayout from "../components/GlobalLayout.jsx";
import { AssetContextWrapper } from "../features/asset-details/stores/AssetContextWrapper.jsx";

const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <Overview /> },
          { path: "watchlists", element: <Watchlist /> },
          {
            path: "assets/:symbol",
            element: (
              <AssetContextWrapper>
                <AssetDetailsPage />
              </AssetContextWrapper>
            ),
          },
        ],
      },
      { path: "/auth", element: <AuthPage /> },
      { path: "/privacy", element: <PrivacyPolicyPage /> },
      { path: "/terms", element: <TermsOfServicePage /> },
      { path: "/confirmation", element: <ConfirmationPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
