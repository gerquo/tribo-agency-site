import { AdminCollectionManager } from "@/components/admin/admin-collection-manager";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { ServiceRecord } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  let items: ServiceRecord[] = [];
  let loadError: string | null = null;

  if (isSupabaseConfigured()) {
    const { data, error } = await createSupabaseAdminClient()
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    items = data ?? [];
    loadError = error?.message ?? null;
  }

  return (
    <main className="grid gap-6">
      {!isSupabaseConfigured() ? (
        <section className="rounded-lg border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
          Supabase is not configured yet. Add your environment variables and run the schema before managing services.
        </section>
      ) : null}

      {loadError ? (
        <section className="rounded-lg border border-destructive/20 bg-destructive/10 p-6 text-sm text-destructive">
          Unable to load services right now. Please refresh and try again.
        </section>
      ) : null}

      <AdminCollectionManager
        entity="services"
        title="Manage Services"
        description="Maintain the service catalog used across the website and database-backed public pages."
        initialItems={items}
        previewFields={["slug", "icon", "published"]}
        fields={[
          { name: "slug", label: "Slug" },
          { name: "title", label: "Title" },
          { name: "icon", label: "Icon name" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "for_whom", label: "Who it is for", type: "textarea" },
          { name: "features", label: "Features", type: "tags" },
          { name: "published", label: "Published", type: "checkbox" }
        ]}
      />
    </main>
  );
}
