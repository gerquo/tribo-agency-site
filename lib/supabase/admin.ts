import { createClient } from "@supabase/supabase-js";

import {
  getSupabaseEnv,
  getSupabaseServiceRoleKey,
  isSupabaseConfigured
} from "@/lib/supabase/env";

let adminClient: ReturnType<typeof createClient> | null = null;

export function createSupabaseAdminClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }

  if (!adminClient) {
    const { url } = getSupabaseEnv();
    adminClient = createClient(url, getSupabaseServiceRoleKey(), {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  }

  return adminClient;
}
