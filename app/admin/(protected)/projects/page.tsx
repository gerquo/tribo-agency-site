import { AdminCollectionManager } from "@/components/admin/admin-collection-manager";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { ProjectRecord } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  let items: ProjectRecord[] = [];
  let loadError: string | null = null;

  if (isSupabaseConfigured()) {
    const { data, error } = await createSupabaseAdminClient()
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    items = data ?? [];
    loadError = error?.message ?? null;
  }

  return (
    <main className="grid gap-6">
      {!isSupabaseConfigured() ? (
        <section className="rounded-lg border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
          Supabase is not configured yet. Add your environment variables and run the schema before managing projects.
        </section>
      ) : null}

      {loadError ? (
        <section className="rounded-lg border border-destructive/20 bg-destructive/10 p-6 text-sm text-destructive">
          Unable to load projects right now. Please refresh and try again.
        </section>
      ) : null}

      <AdminCollectionManager
        entity="projects"
        title="Manage Projects"
        description="Create, edit, delete, publish, and feature project case studies for the public portfolio."
        initialItems={items}
        previewFields={["category", "featured", "published"]}
        fields={[
          { name: "slug", label: "Slug" },
          { name: "title", label: "Title" },
          { name: "category", label: "Category" },
          { name: "client", label: "Client" },
          { name: "year", label: "Year" },
          { name: "image", label: "Hero image URL" },
          { name: "live_url", label: "Live preview URL" },
          { name: "case_study_url", label: "Case study URL" },
          { name: "description", label: "Short description", type: "textarea" },
          { name: "summary", label: "Summary", type: "textarea" },
          { name: "technologies", label: "Technologies", type: "tags", placeholder: "Next.js, TypeScript" },
          { name: "gallery", label: "Gallery image URLs", type: "tags" },
          { name: "results", label: "Results", type: "tags" },
          { name: "challenge", label: "Challenge", type: "textarea" },
          { name: "solution", label: "Solution", type: "textarea" },
          { name: "featured", label: "Featured", type: "checkbox" },
          { name: "published", label: "Published", type: "checkbox" }
        ]}
      />
    </main>
  );
}
