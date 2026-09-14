"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  browserClient ??= createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return browserClient;
}
