import { supabase } from "../lib/supabase";

export type Profile = {
  id: number;
  nama_padukuhan: string | null;
  deskripsi: string | null;
  sejarah: string | null;
  visi: string | null;
  misi: string | null;
  alamat: string | null;
  maps_url: string | null;
  youtube_url: string | null;
  instagram_url: string | null;
  email: string | null;
  telepon: string | null;
  logo_url: string | null;
  hero_headline: string | null;
  hero_subheadline: string | null;
  hero_cta_text: string | null;
  hero_image_url: string | null;
  about_image_url: string | null;
  jumlah_jiwa: number | null;
  jumlah_kk: number | null;
  jumlah_rt: number | null;
  jumlah_rw: number | null;
  jam_pelayanan: string | null;
  facebook_url: string | null;
  website_url: string | null;
  updated_at: string | null;
};

export async function getProfile(): Promise<Profile> {
  if (!supabase) {
    throw new Error(
      "Supabase is unavailable because its public environment configuration is missing or invalid.",
    );
  }

  const { data, error } = await supabase
    .schema("public")
    .from("profile")
    .select("*")
    .eq("id", 1)
    .single<Profile>();

  if (error) {
    throw new Error(`Unable to read public.profile id 1: ${error.message}`);
  }

  return data;
}
