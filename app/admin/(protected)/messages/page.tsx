import { Mail } from "lucide-react";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { ContactSubmissionRecord } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  let messages: ContactSubmissionRecord[] = [];
  let loadError: string | null = null;

  if (isSupabaseConfigured()) {
    const { data, error } = await createSupabaseAdminClient()
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    messages = data ?? [];
    loadError = error?.message ?? null;
  }

  return (
    <main className="grid gap-6">
      <section className="rounded-lg border border-border bg-card p-6">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
          Messages
        </p>
        <h1 className="mt-3 text-3xl font-black">Contact submissions</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          All contact form submissions are stored in Supabase and displayed here
          for review.
        </p>
      </section>

      {!isSupabaseConfigured() ? (
        <section className="rounded-lg border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
          Supabase is not configured yet. Contact messages will appear here once
          the backend is connected.
        </section>
      ) : null}

      {loadError ? (
        <section className="rounded-lg border border-destructive/20 bg-destructive/10 p-6 text-sm text-destructive">
          Unable to load messages right now. Please refresh and try again.
        </section>
      ) : null}

      <div className="grid gap-5">
        {messages.map((message) => (
          <article key={message.id} className="rounded-lg border border-border bg-card p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-xl font-bold">{message.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {message.email} {"\u00b7"} {message.company}
                </p>
              </div>
              <div className="rounded-md bg-secondary px-3 py-1 text-xs font-semibold">
                {message.status}
              </div>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
              <p><strong className="text-foreground">Service:</strong> {message.service}</p>
              <p><strong className="text-foreground">Budget:</strong> {message.budget}</p>
              <p><strong className="text-foreground">Submitted:</strong> {new Date(message.created_at).toLocaleString()}</p>
            </div>
            <p className="mt-5 rounded-lg bg-background p-4 leading-7 text-muted-foreground">
              {message.details}
            </p>
          </article>
        ))}

        {messages.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
            <Mail className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-4 font-semibold">No messages yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              New contact submissions will appear here after the public form is used.
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}

