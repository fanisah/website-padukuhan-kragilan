import { useEffect, useState } from "react";
import { ShieldCheck, UserRoundCog } from "lucide-react";
import { useAuth, type AdminRole } from "../../auth/AuthProvider";
import { getAdminUsers, updateAdminUser, type AdminUser } from "../../../services/adminUsers";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getAdminUsers()
      .then((records) => active && setItems(records))
      .catch(() => active && setError("Daftar administrator belum dapat dimuat."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  async function save(item: AdminUser, changes: Partial<Pick<AdminUser, "role" | "is_active">>) {
    if (item.user_id === user?.id) return;
    setSavingId(item.user_id);
    setMessage("");
    setError("");
    try {
      const updated = await updateAdminUser(item.user_id, {
        role: changes.role ?? item.role,
        is_active: changes.is_active ?? item.is_active,
      });
      setItems((current) => current.map((candidate) => candidate.user_id === updated.user_id ? updated : candidate));
      setMessage("Akses administrator berhasil diperbarui.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Akses administrator belum dapat diperbarui.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <section>
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DDEFE8] text-[#0D6F6B]"><UserRoundCog size={23} aria-hidden="true" /></span>
        <div>
          <h1 className="text-[1.75rem] font-bold tracking-[-0.025em] text-[#173F57]">Administrator</h1>
          <p className="mt-2 text-[14px] text-[#5F6F72]">Kelola peran dan status akses akun administrator.</p>
        </div>
      </div>

      {message && <p className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-[14px] font-medium text-emerald-700" role="status">{message}</p>}
      {error && <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-[14px] font-medium text-red-700" role="alert">{error}</p>}

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#D8E4DF] bg-white">
        {loading ? (
          <p className="px-6 py-12 text-center text-[14px] text-[#5F6F72]" role="status">Memuat administrator…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead className="bg-[#FFF9EC]">
                <tr className="border-b border-[#D8E4DF]">
                  {["Akun", "Peran", "Status", "Keterangan"].map((heading) => <th key={heading} className="px-5 py-4 text-[12px] font-bold uppercase tracking-wide text-[#5F6F72]">{heading}</th>)}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const ownAccount = item.user_id === user?.id;
                  const disabled = ownAccount || savingId === item.user_id;
                  return (
                    <tr key={item.user_id} className="border-b border-[#D8E4DF] last:border-0">
                      <td className="px-5 py-4">
                        <p className="text-[14px] font-semibold text-[#173F57]">{item.email}</p>
                        {ownAccount && <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#0D6F6B]"><ShieldCheck size={12} /> Akun Anda</span>}
                      </td>
                      <td className="px-5 py-4">
                        <select aria-label={`Peran ${item.email}`} value={item.role} disabled={disabled} onChange={(event) => void save(item, { role: event.target.value as AdminRole })} className="h-10 rounded-xl border border-[#C8D5D0] bg-white px-3 text-[13px] font-semibold text-[#294B55] disabled:bg-[#F5F7F4] disabled:opacity-70">
                          <option value="editor">Editor</option>
                          <option value="super_admin">Super Admin</option>
                        </select>
                      </td>
                      <td className="px-5 py-4">
                        <button type="button" disabled={disabled} onClick={() => void save(item, { is_active: !item.is_active })} aria-label={`${item.is_active ? "Nonaktifkan" : "Aktifkan"} ${item.email}`} className={`min-h-10 rounded-xl px-4 text-[12px] font-bold disabled:cursor-not-allowed disabled:opacity-60 ${item.is_active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                          {item.is_active ? "Aktif" : "Nonaktif"}
                        </button>
                      </td>
                      <td className="px-5 py-4 text-[12px] text-[#6B7D7B]">{ownAccount ? "Peran dan status akun sendiri tidak dapat diubah." : savingId === item.user_id ? "Menyimpan…" : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
