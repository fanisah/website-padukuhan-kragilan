import { supabase } from "../lib/supabase";
import type { NewsAttachment, NewsAttachmentType } from "./newsAttachments";

export type AdminNewsAttachmentInput = {
  news_id: string;
  title: string;
  url: string;
  type: NewsAttachmentType;
  sort_order: number;
};

function requireClient() {
  if (!supabase) throw new Error("Supabase admin client is unavailable.");
  return supabase;
}

export async function getAdminNewsAttachments(newsId: string): Promise<NewsAttachment[]> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("news_attachments")
    .select("id, news_id, title, url, type, sort_order, created_at")
    .eq("news_id", newsId)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true })
    .returns<NewsAttachment[]>();

  if (error) throw new Error(`Unable to read news attachments: ${error.message}`);
  return data ?? [];
}

export async function createNewsAttachment(input: AdminNewsAttachmentInput): Promise<NewsAttachment> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("news_attachments")
    .insert(input)
    .select("id, news_id, title, url, type, sort_order, created_at")
    .single<NewsAttachment>();

  if (error) throw new Error(`Unable to create news attachment: ${error.message}`);
  return data;
}

export async function updateNewsAttachment(
  id: number,
  input: Omit<AdminNewsAttachmentInput, "news_id">,
): Promise<NewsAttachment> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("news_attachments")
    .update(input)
    .eq("id", id)
    .select("id, news_id, title, url, type, sort_order, created_at")
    .single<NewsAttachment>();

  if (error) throw new Error(`Unable to update news attachment: ${error.message}`);
  return data;
}

export async function deleteNewsAttachment(id: number): Promise<void> {
  const { error } = await requireClient()
    .schema("public")
    .from("news_attachments")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Unable to delete news attachment: ${error.message}`);
}
