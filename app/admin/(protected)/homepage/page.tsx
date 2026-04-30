import { AdminCollectionManager } from "@/components/admin/admin-collection-manager";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { HomepageStatRecord } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminHomepagePage() {
  let items: HomepageStatRecord[] = [];
  let loadError: string | null = null;

  if (isSupabaseConfigured()) {
    const { data, error } = await createSupabaseAdminClient()
      .from("homepage_stats")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    items = data ?? [];
    loadError = error?.message ?? null;
  }

  return (
    <main className="grid gap-6">
      {!isSupabaseConfigured() ? (
        <section className="rounded-lg border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
          Supabase is not configured yet. Add your environment variables and run the schema before managing homepage stats.
        </section>
      ) : null}

      {loadError ? (
        <section className="rounded-lg border border-destructive/20 bg-destructive/10 p-6 text-sm text-destructive">
          Unable to load homepage stats right now. Please refresh and try again.
        </section>
      ) : null}

      <AdminCollectionManager
        entity="homepage_stats"
        title="Manage Homepage Stats"
        description="Edit the homepage metrics such as projects completed, happy clients, support availability, and delivery range."
        initialItems={items}
        previewFields={["value", "sort_order", "published"]}
        fields={[
          { name: "label", label: "Label" },
          { name: "value", label: "Value" },
          { name: "sort_order", label: "Sort order", type: "number" },
          { name: "published", label: "Published", type: "checkbox" }
        ]}
      />
    </main>
  );
}
