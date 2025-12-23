import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReownProvider from "./context/ReownProvider.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app/App.jsx";
import HomePage from "./pages/HomePage.js";
import "./styles/global.css";
import LearnMorePage from "./pages/LearnMorePage.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/learn-more", element: <LearnMorePage /> },
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
