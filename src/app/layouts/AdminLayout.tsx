import {
  CalendarDays,
  FileText,
  Images,
  LayoutDashboard,
  Home,
  Sparkles,
  ContactRound,
  LogOut,
  Store,
  UserRound,
  UsersRound,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthProvider";
import KragilanLogo from "../components/brand/KragilanLogo";

const adminLinks = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
  { label: "Beranda", path: "/admin/beranda", icon: Home },
  { label: "Profil", path: "/admin/profil", icon: UserRound },
  { label: "Potensi", path: "/admin/potensi", icon: Sparkles },
  { label: "UMKM", path: "/admin/umkm", icon: Store },
  { label: "Berita", path: "/admin/berita", icon: FileText },
  { label: "Agenda", path: "/admin/agenda", icon: CalendarDays },
  { label: "Galeri", path: "/admin/galeri", icon: Images },
  { label: "Kontak", path: "/admin/kontak", icon: ContactRound },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-semibold transition-colors ${
    isActive
      ? "bg-[#0D6F6B] text-white"
      : "text-[#49636A] hover:bg-[#0D6F6B]/8 hover:text-[#0D6F6B]"
  }`;

export default function AdminLayout() {
  const { user, role, isSuperAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const visibleLinks = isSuperAdmin
    ? [...adminLinks, { label: "Administrator", path: "/admin/administrator", icon: UsersRound }]
    : adminLinks;

  async function handleLogout() {
    await signOut();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div
      className="min-h-screen bg-[#FFF9EC] text-[#173F57]"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      <div className="lg:grid lg:min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:flex flex-col border-r border-[#D8E4DF] bg-white px-5 py-6">
          <div className="mb-8 px-3">
            <KragilanLogo className="mb-3" />
            <p className="text-[13px] font-bold">Administrasi</p>
            <p className="mt-1 truncate text-[12px] text-[#7C8C8A]">{user?.email}</p>
            <p className="mt-1 text-[11px] font-semibold text-[#0D6F6B]">{role === "super_admin" ? "Super Admin" : "Editor"}</p>
          </div>
          <nav className="flex flex-1 flex-col gap-2" aria-label="Navigasi admin">
            {visibleLinks.map(({ label, path, icon: Icon, end }) => (
              <NavLink key={path} to={path} end={end} className={linkClass}>
                <Icon size={19} aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="mt-6 flex items-center gap-3 rounded-xl px-4 py-3 text-left text-[14px] font-semibold text-[#5F6F72] hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={19} aria-hidden="true" />
            Keluar
          </button>
        </aside>

        <div className="min-w-0">
          <header className="border-b border-[#D8E4DF] bg-white px-4 py-4 lg:hidden">
            <div className="flex items-center justify-between gap-4">
              <div>
                <KragilanLogo compact />
                <p className="max-w-[210px] truncate text-[11px] text-[#7C8C8A]">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#D8E4DF] px-4 text-[13px] font-semibold text-[#49636A]"
              >
                <LogOut size={17} aria-hidden="true" />
                Keluar
              </button>
            </div>
            <nav className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Navigasi admin seluler">
              {visibleLinks.map(({ label, path, end }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={end}
                  className={({ isActive }) =>
                    `whitespace-nowrap rounded-xl px-4 py-2.5 text-[13px] font-semibold ${
                      isActive ? "bg-[#0D6F6B] text-white" : "bg-[#F5F7F4] text-[#49636A]"
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
