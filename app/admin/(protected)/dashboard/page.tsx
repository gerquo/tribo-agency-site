import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { ContactSubmissionRecord } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

async function getCounts() {
  if (!isSupabaseConfigured()) {
    return {
      projects: 0,
      services: 0,
      trustedBrands: 0,
      homepageStats: 0,
      testimonials: 0,
      teamMembers: 0,
      messages: 0,
      recentMessages: [] as ContactSubmissionRecord[],
      error: null as string | null
    };
  }

  const admin = createSupabaseAdminClient();
  const [
    projects,
    services,
    trustedBrands,
    homepageStats,
    testimonials,
    teamMembers,
    messages,
    recentMessages
  ] = await Promise.all([
    admin.from("projects").select("*", { count: "exact", head: true }),
    admin.from("services").select("*", { count: "exact", head: true }),
    admin.from("trusted_brands").select("*", { count: "exact", head: true }),
    admin.from("homepage_stats").select("*", { count: "exact", head: true }),
    admin.from("testimonials").select("*", { count: "exact", head: true }),
    admin.from("team_members").select("*", { count: "exact", head: true }),
    admin.from("contact_submissions").select("*", { count: "exact", head: true }),
    admin
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5)
  ]);

  return {
    projects: projects.count ?? 0,
    services: services.count ?? 0,
    trustedBrands: trustedBrands.count ?? 0,
    homepageStats: homepageStats.count ?? 0,
    testimonials: testimonials.count ?? 0,
    teamMembers: teamMembers.count ?? 0,
    messages: messages.count ?? 0,
    recentMessages: recentMessages.data ?? [],
    error:
      projects.error?.message ??
      services.error?.message ??
      trustedBrands.error?.message ??
      homepageStats.error?.message ??
      testimonials.error?.message ??
      teamMembers.error?.message ??
      messages.error?.message ??
      recentMessages.error?.message ??
      null
  };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  return (
    <main className="grid gap-6">
      <section className="rounded-lg border border-border bg-card p-6">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
          Overview
        </p>
        <h1 className="mt-3 text-3xl font-black">Admin Dashboard</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Manage site content, review incoming contact messages, and keep the
          public portfolio up to date.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-7">
        <AdminStatCard label="Projects" value={counts.projects} />
        <AdminStatCard label="Services" value={counts.services} />
        <AdminStatCard label="Trusted By" value={counts.trustedBrands} />
        <AdminStatCard label="Homepage Stats" value={counts.homepageStats} />
        <AdminStatCard label="Testimonials" value={counts.testimonials} />
        <AdminStatCard label="Team Members" value={counts.teamMembers} />
        <AdminStatCard label="Messages" value={counts.messages} />
      </section>

      {!isSupabaseConfigured() ? (
        <section className="rounded-lg border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
          Supabase is not configured yet, so the dashboard cannot load live content.
        </section>
      ) : null}

      {counts.error ? (
        <section className="rounded-lg border border-destructive/20 bg-destructive/10 p-6 text-sm text-destructive">
          Unable to load the latest dashboard data right now. Please refresh and try again.
        </section>
      ) : null}

      <section className="rounded-lg border border-border bg-card p-6">
        <div className="flex flex-col gap-2 border-b border-border pb-4">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
            Recent messages
          </p>
          <h2 className="text-2xl font-black">Latest contact submissions</h2>
        </div>

        <div className="mt-6 grid gap-4">
          {counts.recentMessages.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-background p-6 text-sm text-muted-foreground">
              No contact messages yet. New submissions will appear here once the public form is used.
            </div>
          ) : (
            counts.recentMessages.map((message) => (
              <article
                key={message.id}
                className="rounded-lg border border-border bg-background p-4"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-bold">{message.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {message.email} · {message.company}
                    </p>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Service:</span>{" "}
                  {message.service}
                </p>
                <p className="mt-2 line-clamp-3 text-sm leading-7 text-muted-foreground">
                  {message.details}
                </p>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
