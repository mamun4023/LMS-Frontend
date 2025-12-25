import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./i18n";
import "./index.css";
import About from "./pages/about";
import Catalog from "./pages/catalog";
import Dashboard from "./pages/dashboard";
import Events from "./pages/events";
import ForgotPassword from "./pages/forgotPassword";
import OtpVerify from "./pages/otp";
import ResetPassword from "./pages/resetPassword";
import Service from "./pages/services";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";

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
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/services",
    element: <Service />,
  },
  {
    path: "/catalog",
    element: <Catalog />,
  },
  // {
  //   path: "/profile",
  //   element: <ProfileUpdate />,
  // },
  // {
  //   path: "/admin",
  //   element: <AdminDashboard />,
  // },
  // {
  //   path: "/librarian",
  //   element: <LibrarianDashboard />,
  // },
]);

if (localStorage.theme === "dark") {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
