import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const configuredUrl = import.meta.env.VITE_SUPABASE_URL;
const configuredPublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const missingVariables = [
  !configuredUrl?.trim() && "VITE_SUPABASE_URL",
  !configuredPublishableKey?.trim() && "VITE_SUPABASE_PUBLISHABLE_KEY",
].filter(Boolean);

let client: SupabaseClient | null = null;

if (missingVariables.length > 0) {
  if (import.meta.env.DEV) {
    console.error(
      `[Supabase] Missing required environment variable(s): ${missingVariables.join(", ")}. Add them to .env.local and restart Vite.`,
    );
  }
} else {
  try {
    const projectUrl = new URL(configuredUrl).origin;
    client = createClient(projectUrl, configuredPublishableKey);
  } catch {
    if (import.meta.env.DEV) {
      console.error(
        "[Supabase] VITE_SUPABASE_URL is not a valid project URL. Update .env.local and restart Vite.",
      );
    }
  }
}

export const supabase = client;
