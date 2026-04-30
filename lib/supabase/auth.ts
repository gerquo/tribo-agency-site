import { redirect } from "next/navigation";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getAdminSession() {
  if (!isSupabaseConfigured()) {
    return { configured: false as const, user: null, isAdmin: false };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { configured: true as const, user: null, isAdmin: false };
  }

  const adminClient = createSupabaseAdminClient();
  const { data: adminRecord } = await adminClient
    .from("admin_users")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  return { configured: true as const, user, isAdmin: Boolean(adminRecord) };
}

export async function requireAdmin() {
  const session = await getAdminSession();

  if (!session.configured) {
    redirect("/admin/login?error=not-configured");
  }

  if (!session.user) {
    redirect("/admin/login");
  }

  if (!session.isAdmin) {
    redirect("/admin/login?error=not-authorized");
  }

  return session.user;
}
