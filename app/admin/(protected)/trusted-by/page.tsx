import { AdminCollectionManager } from "@/components/admin/admin-collection-manager";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { TrustedBrandRecord } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminTrustedByPage() {
  let items: TrustedBrandRecord[] = [];
  let loadError: string | null = null;

  if (isSupabaseConfigured()) {
    const { data, error } = await createSupabaseAdminClient()
      .from("trusted_brands")
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
          Supabase is not configured yet. Add your environment variables and run the schema before managing trusted brands.
        </section>
      ) : null}

      {loadError ? (
        <section className="rounded-lg border border-destructive/20 bg-destructive/10 p-6 text-sm text-destructive">
          Unable to load trusted brands right now. Please refresh and try again.
        </section>
      ) : null}

      <AdminCollectionManager
        entity="trusted_brands"
        title="Manage Trusted By"
        description="Edit the brand names shown in the homepage trust strip and control their order and visibility."
        initialItems={items}
        previewFields={["sort_order", "published"]}
        fields={[
          { name: "name", label: "Brand name" },
          { name: "sort_order", label: "Sort order", type: "number" },
          { name: "published", label: "Published", type: "checkbox" }
        ]}
      />
    </main>
  );
}
