import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthProvider";

export default function SuperAdminRoute() {
  const { isSuperAdmin } = useAuth();
  return isSuperAdmin ? <Outlet /> : <Navigate to="/admin" replace />;
}
