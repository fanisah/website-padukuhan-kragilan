import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute() {
  const { session, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main
        className="min-h-screen bg-[#FFF9EC] flex items-center justify-center px-4"
        style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
      >
        <p className="text-[15px] font-medium text-[#5F6F72]" role="status">
          Memeriksa sesi admin…
        </p>
      </main>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-[#FFF9EC] flex items-center justify-center px-4" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
        <div className="w-full max-w-md rounded-3xl border border-[#D8E4DF] bg-white p-8 text-center shadow-[0_18px_50px_rgba(23,74,112,0.08)]">
          <h1 className="text-2xl font-bold text-[#173F57]">Akses admin tidak tersedia</h1>
          <p className="mt-3 text-[14px] leading-6 text-[#5F6F72]">Akun ini belum terdaftar sebagai administrator atau sedang dinonaktifkan.</p>
          <button type="button" onClick={() => void signOut()} className="mt-7 min-h-11 rounded-xl bg-[#0D6F6B] px-5 text-[13px] font-bold text-white hover:bg-[#095B58]">Keluar</button>
        </div>
      </main>
    );
  }

  return <Outlet />;
}
