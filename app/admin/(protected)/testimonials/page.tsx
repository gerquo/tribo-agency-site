import { AdminCollectionManager } from "@/components/admin/admin-collection-manager";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { TestimonialRecord } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  let items: TestimonialRecord[] = [];
  let loadError: string | null = null;

  if (isSupabaseConfigured()) {
    const { data, error } = await createSupabaseAdminClient()
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    items = data ?? [];
    loadError = error?.message ?? null;
  }

  return (
    <main className="grid gap-6">
      {!isSupabaseConfigured() ? (
        <section className="rounded-lg border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
          Supabase is not configured yet. Add your environment variables and run the schema before managing testimonials.
        </section>
      ) : null}

      {loadError ? (
        <section className="rounded-lg border border-destructive/20 bg-destructive/10 p-6 text-sm text-destructive">
          Unable to load testimonials right now. Please refresh and try again.
        </section>
      ) : null}

      <AdminCollectionManager
        entity="testimonials"
        title="Manage Testimonials"
        description="Update social proof with believable quotes, names, roles, and optional profile imagery."
        initialItems={items}
        previewFields={["name", "role", "published"]}
        fields={[
          { name: "name", label: "Name" },
          { name: "role", label: "Role / business" },
          { name: "initials", label: "Initials" },
          { name: "image_url", label: "Image URL" },
          { name: "quote", label: "Quote", type: "textarea" },
          { name: "published", label: "Published", type: "checkbox" }
        ]}
      />
    </main>
  );
}
