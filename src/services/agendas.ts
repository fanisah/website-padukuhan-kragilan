import { supabase } from "../lib/supabase";

export type Agenda = {
  id: number;
  judul: string;
  deskripsi: string | null;
  tanggal: string;
  jam: string | null;
  lokasi: string | null;
  gambar_url: string | null;
  is_published: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export async function getPublishedAgendas(): Promise<Agenda[]> {
  if (!supabase) throw new Error("Supabase public client is unavailable.");

  const { data, error } = await supabase
    .schema("public")
    .from("agendas")
    .select("*")
    .eq("is_published", true)
    .order("tanggal", { ascending: true })
    .returns<Agenda[]>();

  if (error) throw new Error(`Unable to read published agendas: ${error.message}`);
  return data ?? [];
}
