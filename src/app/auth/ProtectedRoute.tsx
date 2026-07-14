import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute() {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main
        className="min-h-screen bg-[#FCFAF7] flex items-center justify-center px-4"
        style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
      >
        <p className="text-[15px] font-medium text-[#6B7280]" role="status">
          Memeriksa sesi admin…
        </p>
      </main>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
