import { supabase } from "../lib/supabase";

export interface AdminDashboardStats {
  news: number;
  agendas: number;
  umkm: number;
  gallery: number;
}

export type DashboardAgenda = {
  id: string;
  judul: string;
  tanggal: string;
  jam: string | null;
  lokasi: string | null;
};

export type DashboardNews = {
  id: string;
  judul: string;
  tanggal: string;
  is_published: boolean;
};

function requireClient() {
  if (!supabase) throw new Error("Supabase admin client is unavailable.");
  return supabase;
}

async function countTable(table: "news" | "agendas" | "umkm" | "gallery") {
  const { count, error } = await requireClient()
    .schema("public")
    .from(table)
    .select("*", { count: "exact", head: true });

  if (error) throw new Error(`Unable to count ${table}: ${error.message}`);
  return count ?? 0;
}

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const [news, agendas, umkm, gallery] = await Promise.all([
    countTable("news"),
    countTable("agendas"),
    countTable("umkm"),
    countTable("gallery"),
  ]);
  return { news, agendas, umkm, gallery };
}

export async function getUpcomingDashboardAgendas(today: string): Promise<DashboardAgenda[]> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("agendas")
    .select("id, judul, tanggal, jam, lokasi")
    .gte("tanggal", today)
    .order("tanggal", { ascending: true })
    .order("jam", { ascending: true, nullsFirst: false })
    .limit(3)
    .returns<DashboardAgenda[]>();

  if (error) throw new Error(`Unable to read upcoming agendas: ${error.message}`);
  return data ?? [];
}

export async function getRecentDashboardNews(): Promise<DashboardNews[]> {
  const { data, error } = await requireClient()
    .schema("public")
    .from("news")
    .select("id, judul, tanggal, is_published")
    .eq("is_published", true)
    .order("tanggal", { ascending: false })
    .limit(3)
    .returns<DashboardNews[]>();

  if (error) throw new Error(`Unable to read recent news: ${error.message}`);
  return data ?? [];
}
