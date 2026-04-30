import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminSession } from "@/lib/supabase/auth";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session.configured) {
    redirect("/admin/login?error=not-configured");
  }

  if (!session.user || !session.isAdmin) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
