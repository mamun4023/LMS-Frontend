import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";
import { LoaderCircle } from 'lucide-react';


export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles?: Array<"admin" | "librarian" | "student">;
}) {
  const { user,authChecked } = useSelector((state: RootState) => state.auth);
  const { profile, loading } = useSelector((state: RootState) => state.user);

    // 🔥 WAIT until Firebase finishes checking auth
  if (!authChecked) return <LoaderCircle />
  // Not authenticated
  if (!user) return <Navigate to="/signin" replace />;

  // Still fetching profile
  if (loading) return <div>Loading...</div>;

  // Profile missing AFTER loading
  if (!profile) return <Navigate to="/signin" replace />;

  // Role mismatch
  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
