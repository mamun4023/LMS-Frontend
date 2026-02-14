import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";

export default function PublicRoute({ children }: { children: ReactNode }) {
  const { user } = useSelector((state: RootState) => state.auth);
  const { profile } = useSelector((state: RootState) => state.user);

  if (user && profile) {
    if (profile.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    if (profile.role === "librarian") {
      return <Navigate to="/librarian" replace />;
    }
    return <Navigate to="/student" replace />;
  }

  return <>{children}</>;
}