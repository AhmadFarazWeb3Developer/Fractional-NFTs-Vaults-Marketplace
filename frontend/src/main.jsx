import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReownProvider from "./context/ReownProvider.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app/App.jsx";
import HomePage from "./pages/HomePage.js";
import "./styles/global.css";
import LearnMorePage from "./pages/LearnMorePage.js";

import ExploreAllVaultsPage from "./pages/ExploreAllVaultsPage.js";
import CreateVaultPage from "./pages/CreateVaultPage.js";
import SingleVaultPage from "./pages/SingleVaultPage.js";
import BuySharesPage from "./pages/BuySharesPage.js";
import WithdrawSharesPage from "./pages/WithdrawSharesPage.js";
import UserDashboardPage from "./pages/UserDashboardPage.js";
import ClaimNftPage from "./pages/ClaimNftPage.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/learn-more", element: <LearnMorePage /> },
      { path: "/explore-vaults", element: <ExploreAllVaultsPage /> },
      { path: "/create-vault", element: <CreateVaultPage /> },
      { path: "/single-vault/:vaultAddress", element: <SingleVaultPage /> },
      { path: "/single-vault/buy-shares", element: <BuySharesPage /> },
      {
        path: "/single-vault/withdraw-shares",
        element: <WithdrawSharesPage />,
      },
      {
        path: "/dashboard",
        element: <UserDashboardPage />,
      },
      {
        path: "/claim-nft/:vaultAddress",
        element: <ClaimNftPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReownProvider>
      <RouterProvider router={router} />
    </ReownProvider>
  </StrictMode>
);
