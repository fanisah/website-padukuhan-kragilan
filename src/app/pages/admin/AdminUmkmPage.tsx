import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import ImageUploader from "../../components/common/ImageUploader";
import { normalizeImagePosition } from "../../utils/imageFocalPoint";
import {
  createUmkm,
  deleteUmkm,
  getAllUmkm,
  updateUmkm,
  type AdminUmkm,
  type AdminUmkmInput,
} from "../../../services/adminUmkm";

type UmkmFormState = {
  nama: string;
  kategori: string;
  alamat: string;
  maps_url: string;
  instagram_url: string;
  whatsapp: string;
  deskripsi: string;
  foto_url: string;
  image_position_x: number;
  image_position_y: number;
  is_published: boolean;
};

const emptyForm: UmkmFormState = {
  nama: "",
  kategori: "",
  alamat: "",
  maps_url: "",
  instagram_url: "",
  whatsapp: "",
  deskripsi: "",
  foto_url: "",
  image_position_x: 50,
  image_position_y: 50,
  is_published: false,
};

const inputClass =
  "h-12 w-full rounded-xl border border-[#C8D5D0] bg-white px-4 text-[14px] text-[#173F57] outline-none transition focus:border-[#0D6F6B] focus:ring-2 focus:ring-[#0D6F6B]/15";

function nullable(value: string) {
  return value.trim() || null;
}

function toPayload(form: UmkmFormState): AdminUmkmInput {
  const position = normalizeImagePosition(form.image_position_x, form.image_position_y);
  return {
    nama: form.nama.trim(),
    kategori: form.kategori.trim(),
    alamat: nullable(form.alamat),
    maps_url: nullable(form.maps_url),
    instagram_url: nullable(form.instagram_url),
    whatsapp: nullable(form.whatsapp),
    deskripsi: nullable(form.deskripsi),
    foto_url: nullable(form.foto_url),
    image_position_x: position.x,
    image_position_y: position.y,
    is_published: form.is_published,
  };
}

function toForm(item: AdminUmkm): UmkmFormState {
  const position = normalizeImagePosition(item.image_position_x, item.image_position_y);
  return {
    nama: item.nama ?? "",
    kategori: item.kategori ?? "",
    alamat: item.alamat ?? "",
    maps_url: item.maps_url ?? "",
    instagram_url: item.instagram_url ?? "",
    whatsapp: item.whatsapp ?? "",
    deskripsi: item.deskripsi ?? "",
    foto_url: item.foto_url ?? "",
    image_position_x: position.x,
    image_position_y: position.y,
    is_published: item.is_published,
  };
}

function formatCreatedAt(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function AdminUmkmPage() {
  const [items, setItems] = useState<AdminUmkm[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminUmkm | null>(null);
  const [form, setForm] = useState<UmkmFormState>(emptyForm);
  const [validation, setValidation] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function refreshList() {
    const records = await getAllUmkm();
    setItems(records);
  }

  useEffect(() => {
    let active = true;

    getAllUmkm()
      .then((records) => {
        if (active) setItems(records);
      })
      .catch(() => {
        if (active) setErrorMessage("Data UMKM belum dapat dimuat. Silakan coba lagi.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setValidation({});
    setErrorMessage("");
    setModalOpen(true);
  }

  function openEdit(item: AdminUmkm) {
    setEditing(item);
    setForm(toForm(item));
    setValidation({});
    setErrorMessage("");
    setModalOpen(true);
  }

  function closeModal() {
    if (saving) return;
    setModalOpen(false);
  }

  function updateField<Key extends keyof UmkmFormState>(
    key: Key,
    value: UmkmFormState[Key],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    if (validation[key]) {
      setValidation((current) => ({ ...current, [key]: "" }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextValidation: Record<string, string> = {};
    if (!form.nama.trim()) nextValidation.nama = "Nama wajib diisi.";
    if (!form.kategori.trim()) nextValidation.kategori = "Kategori wajib diisi.";
    setValidation(nextValidation);
    if (Object.keys(nextValidation).length > 0) return;

    setSaving(true);
    setErrorMessage("");
    setMessage("");

    try {
      if (editing) {
        await updateUmkm(editing.id, toPayload(form));
        setMessage("Perubahan berhasil disimpan.");
      } else {
        await createUmkm(toPayload(form));
        setMessage("UMKM berhasil ditambahkan.");
      }
      await refreshList();
      setModalOpen(false);
    } catch {
      setErrorMessage("Data UMKM belum dapat disimpan. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: AdminUmkm) {
    if (!window.confirm("Yakin ingin menghapus UMKM ini?")) return;

    setDeletingId(item.id);
    setMessage("");
    setErrorMessage("");
    try {
      await deleteUmkm(item.id);
      await refreshList();
      setMessage("UMKM berhasil dihapus.");
    } catch {
      setErrorMessage("UMKM belum dapat dihapus. Silakan coba lagi.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[1.75rem] font-bold tracking-[-0.025em] text-[#173F57]">UMKM</h1>
          <p className="mt-2 text-[14px] text-[#5F6F72]">Kelola daftar usaha dan UMKM warga.</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0D6F6B] px-5 text-[14px] font-bold text-white hover:bg-[#095B58] transition-colors"
        >
          <Plus size={19} aria-hidden="true" />
          Tambah UMKM
        </button>
      </div>

      {message && (
        <p className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-[14px] font-medium text-emerald-700" role="status">
          {message}
        </p>
      )}
      {errorMessage && (
        <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-[14px] font-medium text-red-700" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#D8E4DF] bg-white">
        {loading ? (
          <p className="px-6 py-12 text-center text-[14px] font-medium text-[#5F6F72]" role="status">
            Memuat data UMKM…
          </p>
        ) : items.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-[16px] font-semibold text-[#173F57]">Belum ada data UMKM.</p>
            <p className="mt-2 text-[13px] text-[#5F6F72]">Tambahkan UMKM pertama melalui tombol di atas.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="bg-[#FFF9EC]">
                <tr className="border-b border-[#D8E4DF]">
                  {["Nama", "Kategori", "Status Publish", "Created At", "Aksi"].map((heading) => (
                    <th key={heading} className="px-5 py-4 text-[12px] font-bold uppercase tracking-wide text-[#5F6F72]">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-[#D8E4DF] last:border-b-0">
                    <td className="px-5 py-4 text-[14px] font-semibold text-[#173F57]">{item.nama}</td>
                    <td className="px-5 py-4 text-[14px] text-[#49636A]">{item.kategori}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${
                        item.is_published
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {item.is_published ? "Terbit" : "Draf"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-[#5F6F72]">{formatCreatedAt(item.created_at)}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#C8D5D0] px-3 text-[13px] font-semibold text-[#49636A] hover:border-[#0D6F6B] hover:text-[#0D6F6B]"
                        >
                          <Pencil size={15} aria-hidden="true" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          disabled={deletingId === item.id}
                          className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-red-200 px-3 text-[13px] font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                        >
                          <Trash2 size={15} aria-hidden="true" />
                          {deletingId === item.id ? "Menghapus…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4" onMouseDown={closeModal}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="umkm-form-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="umkm-form-title" className="text-[1.5rem] font-bold text-[#173F57]">
                  {editing ? "Edit UMKM" : "Tambah UMKM"}
                </h2>
                <p className="mt-1 text-[13px] text-[#5F6F72]">Lengkapi informasi usaha warga.</p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-[#5F6F72] hover:bg-[#F5F7F4]"
                aria-label="Tutup formulir"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field label="Nama" required error={validation.nama}>
                <input className={inputClass} value={form.nama} onChange={(e) => updateField("nama", e.target.value)} />
              </Field>
              <Field label="Kategori" required error={validation.kategori}>
                <input className={inputClass} value={form.kategori} onChange={(e) => updateField("kategori", e.target.value)} />
              </Field>
              <Field label="Alamat">
                <input className={inputClass} value={form.alamat} onChange={(e) => updateField("alamat", e.target.value)} />
              </Field>
              <Field label="Google Maps URL">
                <input type="url" className={inputClass} value={form.maps_url} onChange={(e) => updateField("maps_url", e.target.value)} />
              </Field>
              <Field label="Instagram URL">
                <input type="url" className={inputClass} value={form.instagram_url} onChange={(e) => updateField("instagram_url", e.target.value)} />
              </Field>
              <Field label="WhatsApp">
                <input className={inputClass} value={form.whatsapp} onChange={(e) => updateField("whatsapp", e.target.value)} />
              </Field>
              <div className="sm:col-span-2">
                <ImageUploader value={form.foto_url} onChange={(url) => updateField("foto_url", url)} label="Foto" folder="umkm" disabled={saving} />
              </div>
              <Field label="Deskripsi" className="sm:col-span-2">
                <textarea
                  className={`${inputClass} min-h-28 resize-y py-3`}
                  value={form.deskripsi}
                  onChange={(e) => updateField("deskripsi", e.target.value)}
                />
              </Field>

              <label className="sm:col-span-2 flex min-h-12 items-center gap-3 rounded-xl bg-[#FFF9EC] px-4 text-[14px] font-semibold text-[#294B55]">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) => updateField("is_published", e.target.checked)}
                  className="h-5 w-5 accent-[#0D6F6B]"
                />
                Publish
              </label>

              <div className="sm:col-span-2 mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="min-h-12 rounded-xl border border-[#C8D5D0] px-5 text-[14px] font-semibold text-[#49636A]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="min-h-12 rounded-xl bg-[#0D6F6B] px-6 text-[14px] font-bold text-white hover:bg-[#095B58] disabled:opacity-60"
                >
                  {saving ? "Menyimpan…" : editing ? "Simpan Perubahan" : "Tambah UMKM"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

function Field({
  label,
  required = false,
  error,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[13px] font-semibold text-[#294B55]">
        {label}{required && <span className="text-red-600"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-[12px] font-medium text-red-600">{error}</span>}
    </label>
  );
}
