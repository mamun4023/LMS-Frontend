import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import SignIn from "./pages/signin";
import Dashboard from "./pages/dashboard";
import SignUp from "./pages/signup";
import ResetPassword from "./pages/resetPassword";
import OtpVerify from "./pages/otp";
import ForgotPassword from "./pages/forgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/otp-verify",
    element: <OtpVerify />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
