import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAdminSession } from "@/lib/supabase/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getAdminSession();

  if (session.user && session.isAdmin) {
    redirect("/admin/dashboard");
  }

  const params = await searchParams;
  let initialError: string | null = null;

  if (params.error === "not-configured") {
    initialError =
      "Supabase is not configured yet. Add your environment variables first.";
  } else if (params.error === "not-authorized") {
    initialError =
      "Your account is authenticated but not listed as an admin user.";
  }

  return <AdminLoginForm initialError={initialError} />;
}
