import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles?: Array<"admin" | "librarian" | "student">;
}) {
  const { user, role, loading } = useAuth();

  if (loading) return <div>Checking authentication...</div>;

  if (!user) return <Navigate to="/signin" replace />;

  if (allowedRoles && !allowedRoles.includes(role!)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
