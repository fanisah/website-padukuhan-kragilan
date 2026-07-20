import { useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import ImageUploader from "../../components/common/ImageUploader";
import { createPotency, deletePotency, getAllPotencies, updatePotency } from "../../../services/adminPotencies";
import type { Potency } from "../../../services/potencies";

const inputClass = "h-12 w-full rounded-xl border border-[#C8D5D0] bg-white px-4 text-[14px] text-[#173F57] outline-none focus:border-[#0D6F6B] focus:ring-2 focus:ring-[#0D6F6B]/15";
const emptyForm = { judul: "", deskripsi: "", image_url: "", urutan: 1, is_published: true };

export default function AdminPotencyPage() {
  const [items, setItems] = useState<Potency[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<Potency | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function refresh() { setItems(await getAllPotencies()); }
  useEffect(() => { let active = true; getAllPotencies().then((data) => active && setItems(data)).catch((cause) => { if(import.meta.env.DEV) console.error("POTENSI LOAD ERROR", cause); if(active) setError("Data potensi tidak dapat dimuat. Silakan coba kembali."); }).finally(() => active && setLoading(false)); return () => { active = false; }; }, []);
  function createNew() { setEditing(null); setForm({ ...emptyForm, urutan: items.length + 1 }); setError(""); setOpen(true); }
  function edit(item: Potency) { setEditing(item); setForm({ judul: item.judul ?? "", deskripsi: item.deskripsi ?? "", image_url: item.image_url ?? "", urutan: item.urutan ?? 1, is_published: item.is_published }); setError(""); setOpen(true); }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!form.judul.trim()) { setError("Judul potensi wajib diisi."); return; }
    setSaving(true); setError(""); setMessage("");
    const payload = { judul: form.judul.trim(), deskripsi: form.deskripsi.trim() || null, image_url: form.image_url || null, urutan: Math.max(0, Number(form.urutan) || 0), is_published: form.is_published };
    try { if (editing) await updatePotency(editing.id, payload); else await createPotency(payload); await refresh(); setOpen(false); setMessage(editing ? "Potensi berhasil diperbarui." : "Potensi berhasil ditambahkan."); }
    catch (cause) { if(import.meta.env.DEV) console.error("POTENSI SAVE ERROR", cause); setError(potencyErrorMessage(cause)); }
    finally { setSaving(false); }
  }
  async function remove(item: Potency) { if (!window.confirm(`Hapus potensi “${item.judul ?? "ini"}”?`)) return; try { await deletePotency(item.id); await refresh(); setMessage("Potensi berhasil dihapus."); } catch (cause) { if(import.meta.env.DEV) console.error("POTENSI DELETE ERROR", cause); setError(potencyErrorMessage(cause)); } }

  return <section>
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-[1.75rem] font-bold text-[#173F57]">Potensi</h1><p className="mt-2 text-[14px] text-[#5F6F72]">Kelola daftar potensi yang tampil pada menu Potensi.</p></div><button onClick={createNew} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0D6F6B] px-5 text-sm font-bold text-white"><Plus size={18}/> Tambah Potensi</button></div>
    {message && <p className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p>}{error && <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
    <div className="mt-6 overflow-hidden rounded-2xl border border-[#D8E4DF] bg-white">{loading ? <p className="p-10 text-center text-sm text-[#5F6F72]">Memuat data…</p> : items.length === 0 ? <p className="p-10 text-center text-sm text-[#5F6F72]">Belum ada potensi. Tambahkan konten pertama.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left"><thead className="bg-[#FFF9EC]"><tr>{["Urutan", "Judul", "Status", "Aksi"].map((h) => <th key={h} className="px-5 py-4 text-xs uppercase text-[#5F6F72]">{h}</th>)}</tr></thead><tbody>{items.map((item) => <tr key={item.id} className="border-t border-[#D8E4DF]"><td className="px-5 py-4 text-sm">{item.urutan ?? "—"}</td><td className="px-5 py-4 text-sm font-semibold">{item.judul}</td><td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.is_published ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>{item.is_published ? "Terbit" : "Draf"}</span></td><td className="px-5 py-4"><div className="flex gap-2"><button onClick={() => edit(item)} className="inline-flex min-h-10 items-center gap-2 rounded-xl border px-3 text-sm"><Pencil size={15}/> Edit</button><button onClick={() => remove(item)} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-red-200 px-3 text-sm text-red-600"><Trash2 size={15}/> Hapus</button></div></td></tr>)}</tbody></table></div>}</div>
    {open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4" onMouseDown={() => !saving && setOpen(false)}><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 sm:p-8" onMouseDown={(e) => e.stopPropagation()}><div className="flex justify-between"><div><h2 className="text-2xl font-bold">{editing ? "Edit Potensi" : "Tambah Potensi"}</h2><p className="mt-1 text-sm text-[#5F6F72]">Isi konten sesuai yang akan dibaca masyarakat.</p></div><button onClick={() => setOpen(false)} aria-label="Tutup"><X/></button></div><form onSubmit={submit} className="mt-7 grid gap-5"><label className="text-sm font-semibold">Judul *<input className={`${inputClass} mt-2`} value={form.judul} onChange={(e) => setForm({...form, judul:e.target.value})}/></label><label className="text-sm font-semibold">Deskripsi<textarea className={`${inputClass} mt-2 min-h-32 py-3`} value={form.deskripsi} onChange={(e) => setForm({...form, deskripsi:e.target.value})}/></label><ImageUploader value={form.image_url} onChange={(url) => setForm({...form, image_url:url})} label="Gambar Potensi" folder="potencies" disabled={saving}/><label className="text-sm font-semibold">Urutan<input type="number" min="0" className={`${inputClass} mt-2`} value={form.urutan} onChange={(e) => setForm({...form, urutan:Number(e.target.value)})}/></label><label className="flex items-center gap-3 rounded-xl bg-[#FFF9EC] p-4 text-sm font-semibold"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm({...form, is_published:e.target.checked})}/> Publikasikan</label><div className="flex justify-end gap-3"><button type="button" onClick={() => setOpen(false)} className="min-h-12 rounded-xl border px-5">Batal</button><button disabled={saving} className="min-h-12 rounded-xl bg-[#0D6F6B] px-6 font-bold text-white disabled:opacity-60">{saving ? "Menyimpan…" : "Simpan"}</button></div></form></div></div>}
  </section>;
}

function potencyErrorMessage(cause: unknown) {
  const message = cause instanceof Error ? cause.message.toLowerCase() : "";
  if (message.includes("row-level security") || message.includes("permission") || message.includes("policy")) return "Akses penyimpanan ditolak. Periksa kebijakan administrator.";
  if (message.includes("storage") || message.includes("upload")) return "Gambar gagal diunggah.";
  return "Data potensi tidak dapat disimpan. Silakan coba kembali.";
}
