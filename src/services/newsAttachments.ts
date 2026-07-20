import { supabase } from "../lib/supabase";

export const NEWS_ATTACHMENT_TYPES = [
  "document",
  "video",
  "gallery",
  "website",
  "link",
] as const;

export type NewsAttachmentType = (typeof NEWS_ATTACHMENT_TYPES)[number];

export type NewsAttachment = {
  id: number;
  news_id: string;
  title: string;
  url: string;
  type: NewsAttachmentType;
  sort_order: number;
  created_at: string;
};

export function validateAttachmentUrl(value: string): string | null {
  const candidate = value.trim();
  if (!candidate) return "Masukkan tautan yang valid.";

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return "Tautan hanya boleh menggunakan http atau https.";
    }
    return null;
  } catch {
    return "Masukkan tautan yang valid.";
  }
}

export function isSafeAttachmentUrl(value: string): boolean {
  return validateAttachmentUrl(value) === null;
}

export async function getNewsAttachments(newsId: string): Promise<NewsAttachment[]> {
  const normalizedNewsId = newsId.trim();
  if (!normalizedNewsId) return [];
  if (!supabase) throw new Error("Supabase public client is unavailable.");

  const { data, error } = await supabase
    .schema("public")
    .from("news_attachments")
    .select("id, news_id, title, url, type, sort_order, created_at")
    .eq("news_id", normalizedNewsId)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true })
    .returns<NewsAttachment[]>();

  if (error) throw new Error(`Unable to read news attachments: ${error.message}`);
  return (data ?? []).filter((attachment) => isSafeAttachmentUrl(attachment.url));
}
