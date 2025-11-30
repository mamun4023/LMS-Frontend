import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App"; 
import SignIn from "./pages/signin";
import Dashboard from "./pages/dashboard";
import SignUp from "./pages/signup";
import ResetPassword from "./pages/resetPassword";
import OtpVerify from "./pages/otp";
import ForgotPassword from "./pages/forgotPassword";
import About from "./pages/about";
import Events from "./pages/events";
import Service from "./pages/services";
import Catalog from './pages/catalog'

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
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
