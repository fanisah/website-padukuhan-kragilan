import { useId, useRef, useState, type ChangeEvent } from "react";
import { Image as ImageIcon, Trash2, Upload } from "lucide-react";
import { uploadImage } from "../../../services/storage";

const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxFileSize = 5 * 1024 * 1024;

type ImageUploaderProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
  required?: boolean;
  disabled?: boolean;
};

export default function ImageUploader({
  value,
  onChange,
  label = "Gambar",
  folder = "general",
  required = false,
  disabled = false,
}: ImageUploaderProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const actionsDisabled = disabled || uploading;

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setMessage("");
    setError("");

    if (!acceptedTypes.has(file.type)) {
      setError("Format gambar harus JPG, PNG, atau WEBP.");
      event.target.value = "";
      return;
    }

    if (file.size > maxFileSize) {
      setError("Ukuran gambar maksimal 5 MB.");
      event.target.value = "";
      return;
    }

    setUploading(true);
    try {
      const { publicUrl } = await uploadImage(file, folder);
      onChange(publicUrl);
      setMessage("Gambar berhasil diunggah.");
    } catch {
      setError("Gagal mengunggah gambar.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  function handleRemove() {
    onChange("");
    setMessage("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <span className="mb-2 block text-[13px] font-semibold text-[#294B55]">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>

      <div className="overflow-hidden rounded-xl border border-[#C8D5D0] bg-[#FFF9EC]">
        <div className="flex min-h-48 items-center justify-center bg-[#F5F7F4] p-3">
          {value ? (
            <img src={value} alt={`Pratinjau ${label.toLowerCase()}`} className="max-h-72 w-full rounded-lg object-contain" />
          ) : (
            <div className="flex flex-col items-center gap-2 py-8 text-[#7C8C8A]">
              <ImageIcon size={36} aria-hidden="true" />
              <span className="text-[13px]">Belum ada gambar</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-[#D8E4DF] bg-white p-4 sm:flex-row">
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={actionsDisabled}
            className="sr-only"
          />
          <label
            htmlFor={inputId}
            aria-disabled={actionsDisabled}
            className={`inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#0D6F6B] px-4 text-[13px] font-bold text-white transition-colors ${actionsDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-[#095B58]"}`}
          >
            <Upload size={17} aria-hidden="true" />
            {value ? "Ganti Gambar" : "Pilih Gambar"}
          </label>
          {value && (
            <button
              type="button"
              onClick={handleRemove}
              disabled={actionsDisabled}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 text-[13px] font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 size={17} aria-hidden="true" />
              Hapus Gambar
            </button>
          )}
        </div>
      </div>

      {uploading && <p className="mt-2 text-[12px] font-medium text-[#5F6F72]" role="status">Mengunggah gambar...</p>}
      {!uploading && message && <p className="mt-2 text-[12px] font-medium text-emerald-700" role="status">{message}</p>}
      {error && <p className="mt-2 text-[12px] font-medium text-red-600" role="alert">{error}</p>}
    </div>
  );
}
