import {
  CalendarDays,
  FileText,
  Images,
  LayoutDashboard,
  LogOut,
  Store,
  UserRound,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthProvider";

const adminLinks = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
  { label: "Berita", path: "/admin/berita", icon: FileText },
  { label: "Agenda", path: "/admin/agenda", icon: CalendarDays },
  { label: "UMKM", path: "/admin/umkm", icon: Store },
  { label: "Galeri", path: "/admin/galeri", icon: Images },
  { label: "Profil", path: "/admin/profil", icon: UserRound },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-semibold transition-colors ${
    isActive
      ? "bg-[#F46B35] text-white"
      : "text-[#4B5563] hover:bg-[#F46B35]/8 hover:text-[#F46B35]"
  }`;

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div
      className="min-h-screen bg-[#FCFAF7] text-[#2B2B2B]"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      <div className="lg:grid lg:min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:flex flex-col border-r border-[#E5E7EB] bg-white px-5 py-6">
          <div className="mb-8 px-3">
            <p className="text-[16px] font-bold">Admin Kragilan</p>
            <p className="mt-1 truncate text-[12px] text-[#9CA3AF]">{user?.email}</p>
          </div>
          <nav className="flex flex-1 flex-col gap-2" aria-label="Navigasi admin">
            {adminLinks.map(({ label, path, icon: Icon, end }) => (
              <NavLink key={path} to={path} end={end} className={linkClass}>
                <Icon size={19} aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="mt-6 flex items-center gap-3 rounded-xl px-4 py-3 text-left text-[14px] font-semibold text-[#6B7280] hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={19} aria-hidden="true" />
            Keluar
          </button>
        </aside>

        <div className="min-w-0">
          <header className="border-b border-[#E5E7EB] bg-white px-4 py-4 lg:hidden">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[15px] font-bold">Admin Kragilan</p>
                <p className="max-w-[210px] truncate text-[11px] text-[#9CA3AF]">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#E5E7EB] px-4 text-[13px] font-semibold text-[#4B5563]"
              >
                <LogOut size={17} aria-hidden="true" />
                Keluar
              </button>
            </div>
            <nav className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Navigasi admin seluler">
              {adminLinks.map(({ label, path, end }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={end}
                  className={({ isActive }) =>
                    `whitespace-nowrap rounded-xl px-4 py-2.5 text-[13px] font-semibold ${
                      isActive ? "bg-[#F46B35] text-white" : "bg-[#F5F5F5] text-[#4B5563]"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </header>

          <main className="p-4 sm:p-6 lg:p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
