"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole } from "lucide-react";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminLoginForm({ initialError }: { initialError: string | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!isSupabaseConfigured()) {
      setError("Supabase is not configured yet.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <main className="premium-grid flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-premium">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/12 text-primary">
          <LockKeyhole className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-3xl font-black">Admin Login</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Sign in with a Supabase admin account to manage projects, services,
          testimonials, team members, and messages.
        </p>

        {error ? (
          <p className="mt-5 rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm font-medium text-destructive">
            {error}
          </p>
        ) : null}

        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" size="lg" className="mt-2 w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Signing in
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}
