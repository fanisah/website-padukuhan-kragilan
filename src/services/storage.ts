import { supabase } from "../lib/supabase";

const BUCKET_NAME = "website-images";

const extensionByMimeType: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function requireClient() {
  if (!supabase) throw new Error("Supabase Storage client is unavailable.");
  return supabase;
}

function safeFolder(folder: string) {
  return (
    folder
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9/_-]+/g, "-")
      .replace(/\.{2,}/g, "")
      .replace(/\/{2,}/g, "/")
      .replace(/^\/+|\/+$/g, "") || "general"
  );
}

function imageExtension(file: File) {
  const mimeExtension = extensionByMimeType[file.type];
  if (mimeExtension) return mimeExtension;

  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  return fileExtension && /^(jpe?g|png|webp)$/.test(fileExtension)
    ? fileExtension.replace("jpeg", "jpg")
    : "jpg";
}

export async function uploadImage(file: File, folder = "general") {
  const filename = `${Date.now()}-${crypto.randomUUID()}.${imageExtension(file)}`;
  const path = `${safeFolder(folder)}/${filename}`;
  const { error } = await requireClient().storage.from(BUCKET_NAME).upload(path, file, {
    cacheControl: "3600",
    contentType: file.type,
    upsert: false,
  });

  if (error) throw new Error(`Unable to upload image: ${error.message}`);

  return { publicUrl: getPublicUrl(path), path };
}

export async function deleteImage(path: string) {
  const normalizedPath = path.trim().replace(/^\/+/, "");
  if (!normalizedPath) return;

  const { error } = await requireClient().storage.from(BUCKET_NAME).remove([normalizedPath]);
  if (error) throw new Error(`Unable to delete image: ${error.message}`);
}

export function getPublicUrl(path: string) {
  const normalizedPath = path.trim().replace(/^\/+/, "");
  return requireClient().storage.from(BUCKET_NAME).getPublicUrl(normalizedPath).data.publicUrl;
}

export function getStoragePathFromPublicUrl(publicUrl: string): string | null {
  if (!publicUrl.trim()) return null;

  try {
    const url = new URL(publicUrl);
    const bucketOrigin = new URL(getPublicUrl("origin-check")).origin;
    if (url.origin !== bucketOrigin) return null;

    const marker = `/storage/v1/object/public/${BUCKET_NAME}/`;
    const markerIndex = url.pathname.indexOf(marker);
    if (markerIndex < 0) return null;

    const encodedPath = url.pathname.slice(markerIndex + marker.length);
    if (!encodedPath) return null;
    return encodedPath
      .split("/")
      .map((segment) => decodeURIComponent(segment))
      .join("/");
  } catch {
    return null;
  }
}
