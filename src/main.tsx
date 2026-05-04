import { onAuthStateChanged } from "firebase/auth";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./auth/ProtectedRoute";
import { auth } from "./firebase/firebase";
import "./i18n";
import "./index.css";
import About from "./pages/about";
import Catalog from "./pages/catalog";
import Dashboard from "./pages/dashboard";
import Events from "./pages/events";
import ForgotPassword from "./pages/forgotPassword";
import ProfileUpdate from "./pages/profile";
import Service from "./pages/services";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import AdminDashboard from "./role/admin";
import LibrarianDashboard from "./role/librarian";
import StudentDashboard from "./role/student";
import { store } from "./store";
import { setUser, toSerializableUser } from "./store/slices/authSlice";
import { fetchProfile } from "./store/slices/userSlice";
import { applyTheme, getInitialTheme } from "./theme";

/* ---------------- ROUTER ---------------- */
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
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfileUpdate />
      </ProtectedRoute>
    ),
  },
  {
    path:"/student",
    // element:<StudentDashboard/>
    element:(
      <ProtectedRoute allowedRoles={["student"]}>
        <StudentDashboard/>
      </ProtectedRoute>
    )
  },
  {
    path: "/admin",
      element:(
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/librarian",
    element:(
      <ProtectedRoute allowedRoles={["librarian"]}>
        <LibrarianDashboard />
      </ProtectedRoute>
    )
  },
]);

/* -------- AUTH-AWARE ROUTER -------- */
// function AppRouter() {
//   const { loading } = useAuth();

//   if (loading) {
//     return <div>Checking authentication...</div>;
//   }

//   return <RouterProvider router={router} />;
// }
/* -------- THEME INIT -------- */
document.documentElement.classList.add("disable-transitions");
applyTheme(getInitialTheme());
window.setTimeout(() => {
  document.documentElement.classList.remove("disable-transitions");
}, 0);
if (localStorage.theme === "dark") {
  document.documentElement.classList.add("dark");
}

/* -------- APP BOOTSTRAP -------- */

onAuthStateChanged(auth,(user)=>{
  // Convert Firebase User to serializable format before storing in Redux
  if (user) {
    store.dispatch(setUser(toSerializableUser(user)));
    store.dispatch(fetchProfile(user.uid));
  } else {
    store.dispatch(setUser(null));
    store.dispatch({type: "user/clearProfile"});
  }
})
createRoot(document.getElementById("root")!).render(
  // <AuthProvider>
  <Provider store={store}>

    <RouterProvider router={router} />
  </Provider>
    // {/* <AppRouter/> */}
  // </AuthProvider>
);
