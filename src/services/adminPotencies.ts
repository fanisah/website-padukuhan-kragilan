import { supabase } from "../lib/supabase";
import type { Potency } from "./potencies";

export type AdminPotencyInput = {
  judul: string;
  deskripsi: string | null;
  image_url: string | null;
  urutan: number;
  is_published: boolean;
};

function client() {
  if (!supabase) throw new Error("Supabase admin client is unavailable.");
  return supabase;
}

export async function getAllPotencies(): Promise<Potency[]> {
  const { data, error } = await client().schema("public").from("potencies").select("*").order("urutan", { ascending: true }).returns<Potency[]>();
  if (error) throw new Error(`Unable to read potencies: ${error.message}`);
  return data ?? [];
}

export async function createPotency(input: AdminPotencyInput): Promise<Potency> {
  const { data, error } = await client().schema("public").from("potencies").insert(input).select("*").single<Potency>();
  if (error) throw new Error(`Unable to create potency: ${error.message}`);
  return data;
}

export async function updatePotency(id: string, input: AdminPotencyInput): Promise<Potency> {
  const { data, error } = await client().schema("public").from("potencies").update(input).eq("id", id).select("*").single<Potency>();
  if (error) throw new Error(`Unable to update potency: ${error.message}`);
  return data;
}

export async function deletePotency(id: string): Promise<void> {
  const { error } = await client().schema("public").from("potencies").delete().eq("id", id);
  if (error) throw new Error(`Unable to delete potency: ${error.message}`);
}
