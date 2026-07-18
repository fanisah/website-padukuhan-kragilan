import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  getProfileForAdmin,
  updateProfile,
  type AdminProfileInput,
} from "../../../services/adminProfile";
import type { Profile } from "../../../services/profile";
import ImageUploader from "../../components/common/ImageUploader";

type ProfileFormState = Record<keyof AdminProfileInput, string>;

const emptyForm: ProfileFormState = {
  nama_padukuhan: "",
  deskripsi: "",
  sejarah: "",
  visi: "",
  misi: "",
  alamat: "",
  maps_url: "",
  youtube_url: "",
  instagram_url: "",
  email: "",
  telepon: "",
  logo_url: "",
};

const inputClass =
  "h-12 w-full rounded-xl border border-[#C8D5D0] bg-white px-4 text-[14px] text-[#173F57] outline-none transition focus:border-[#0D6F6B] focus:ring-2 focus:ring-[#0D6F6B]/15";

function toForm(profile: Profile): ProfileFormState {
  return {
    nama_padukuhan: profile.nama_padukuhan ?? "",
    deskripsi: profile.deskripsi ?? "",
    sejarah: profile.sejarah ?? "",
    visi: profile.visi ?? "",
    misi: profile.misi ?? "",
    alamat: profile.alamat ?? "",
    maps_url: profile.maps_url ?? "",
    youtube_url: profile.youtube_url ?? "",
    instagram_url: profile.instagram_url ?? "",
    email: profile.email ?? "",
    telepon: profile.telepon ?? "",
    logo_url: profile.logo_url ?? "",
  };
}

function toPayload(form: ProfileFormState): AdminProfileInput {
  const nullable = (value: string) => value.trim() || null;
  return {
    nama_padukuhan: form.nama_padukuhan.trim(),
    deskripsi: nullable(form.deskripsi),
    sejarah: nullable(form.sejarah),
    visi: nullable(form.visi),
    misi: nullable(form.misi),
    alamat: nullable(form.alamat),
    maps_url: nullable(form.maps_url),
    youtube_url: nullable(form.youtube_url),
    instagram_url: nullable(form.instagram_url),
    email: nullable(form.email),
    telepon: nullable(form.telepon),
    logo_url: nullable(form.logo_url),
  };
}

function isValidUrl(value: string) {
  if (!value.trim()) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function AdminProfilePage() {
  const [form, setForm] = useState<ProfileFormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [validation, setValidation] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    getProfileForAdmin()
      .then((profile) => {
        if (active) setForm(toForm(profile));
      })
      .catch(() => {
        if (active) setErrorMessage("Profil belum dapat dimuat. Silakan coba lagi.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function updateField(key: keyof ProfileFormState, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    if (validation[key]) setValidation((current) => ({ ...current, [key]: "" }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextValidation: Record<string, string> = {};
    if (!form.nama_padukuhan.trim()) nextValidation.nama_padukuhan = "Nama Padukuhan wajib diisi.";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextValidation.email = "Format email belum valid.";
    (["maps_url", "youtube_url", "instagram_url"] as const).forEach((field) => {
      if (!isValidUrl(form[field])) nextValidation[field] = "Gunakan URL lengkap yang valid, misalnya https://…";
    });
    setValidation(nextValidation);
    if (Object.keys(nextValidation).length > 0) return;

    setSaving(true);
    setMessage("");
    setErrorMessage("");
    try {
      const profile = await updateProfile(toPayload(form));
      setForm(toForm(profile));
      setMessage("Profil berhasil diperbarui.");
    } catch {
      setErrorMessage("Profil belum dapat disimpan. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="rounded-2xl border border-[#D8E4DF] bg-white px-6 py-12 text-center text-[14px] font-medium text-[#5F6F72]" role="status">Memuat profil…</p>;

  return (
    <section className="max-w-3xl">
      <div><h1 className="text-[1.75rem] font-bold tracking-[-0.025em] text-[#173F57]">Profil</h1><p className="mt-2 text-[14px] text-[#5F6F72]">Kelola informasi utama Padukuhan Kragilan.</p></div>
      {message && <p className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-[14px] font-medium text-emerald-700" role="status">{message}</p>}
      {errorMessage && <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-[14px] font-medium text-red-700" role="alert">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <FormSection title="Informasi Umum">
          <Field label="Nama Padukuhan" required error={validation.nama_padukuhan}><input className={inputClass} value={form.nama_padukuhan} onChange={(event) => updateField("nama_padukuhan", event.target.value)} /></Field>
          <Field label="Deskripsi Singkat"><textarea className={`${inputClass} min-h-28 resize-y py-3`} value={form.deskripsi} onChange={(event) => updateField("deskripsi", event.target.value)} /></Field>
          <Field label="Alamat"><input className={inputClass} value={form.alamat} onChange={(event) => updateField("alamat", event.target.value)} /></Field>
          <ImageUploader value={form.logo_url} onChange={(url) => updateField("logo_url", url)} label="Logo" folder="profile" disabled={saving} />
        </FormSection>

        <FormSection title="Profil dan Visi">
          <Field label="Sejarah"><textarea className={`${inputClass} min-h-36 resize-y py-3`} value={form.sejarah} onChange={(event) => updateField("sejarah", event.target.value)} /></Field>
          <Field label="Visi"><textarea className={`${inputClass} min-h-28 resize-y py-3`} value={form.visi} onChange={(event) => updateField("visi", event.target.value)} /></Field>
          <Field label="Misi"><textarea className={`${inputClass} min-h-36 resize-y py-3`} value={form.misi} onChange={(event) => updateField("misi", event.target.value)} /></Field>
        </FormSection>

        <FormSection title="Kontak dan Media">
          <Field label="Google Maps URL" error={validation.maps_url}><input type="url" className={inputClass} value={form.maps_url} onChange={(event) => updateField("maps_url", event.target.value)} /></Field>
          <Field label="YouTube URL" error={validation.youtube_url}><input type="url" className={inputClass} value={form.youtube_url} onChange={(event) => updateField("youtube_url", event.target.value)} /></Field>
          <Field label="Instagram URL" error={validation.instagram_url}><input type="url" className={inputClass} value={form.instagram_url} onChange={(event) => updateField("instagram_url", event.target.value)} /></Field>
          <Field label="Email" error={validation.email}><input type="email" className={inputClass} value={form.email} onChange={(event) => updateField("email", event.target.value)} /></Field>
          <Field label="Nomor Telepon / WhatsApp"><input type="tel" className={inputClass} value={form.telepon} onChange={(event) => updateField("telepon", event.target.value)} /></Field>
        </FormSection>

        <button type="submit" disabled={saving} className="min-h-12 w-full rounded-xl bg-[#0D6F6B] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#095B58] disabled:cursor-not-allowed disabled:opacity-60">{saving ? "Menyimpan…" : "Simpan Perubahan"}</button>
      </form>
    </section>
  );
}

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return <fieldset className="space-y-5 rounded-2xl border border-[#D8E4DF] bg-white p-5 sm:p-7"><legend className="px-2 text-[16px] font-bold text-[#173F57]">{title}</legend>{children}</fieldset>;
}

function Field({ label, required = false, error, children }: { label: string; required?: boolean; error?: string; children: ReactNode }) {
  return <label className="block"><span className="mb-2 block text-[14px] font-semibold text-[#294B55]">{label}{required && <span className="text-red-600"> *</span>}</span>{children}{error && <span className="mt-1.5 block text-[12px] font-medium text-red-600">{error}</span>}</label>;
}
