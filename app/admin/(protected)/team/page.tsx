import { AdminCollectionManager } from "@/components/admin/admin-collection-manager";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { TeamMemberRecord } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  let items: TeamMemberRecord[] = [];
  let loadError: string | null = null;

  if (isSupabaseConfigured()) {
    const { data, error } = await createSupabaseAdminClient()
      .from("team_members")
      .select("*")
      .order("created_at", { ascending: false });

    items = data ?? [];
    loadError = error?.message ?? null;
  }

  return (
    <main className="grid gap-6">
      {!isSupabaseConfigured() ? (
        <section className="rounded-lg border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
          Supabase is not configured yet. Add your environment variables and run the schema before managing team members.
        </section>
      ) : null}

      {loadError ? (
        <section className="rounded-lg border border-destructive/20 bg-destructive/10 p-6 text-sm text-destructive">
          Unable to load team members right now. Please refresh and try again.
        </section>
      ) : null}

      <AdminCollectionManager
        entity="team_members"
        title="Manage Team Members"
        description="Add or update team profiles that appear on the About page and homepage team sections."
        initialItems={items}
        previewFields={["role", "published"]}
        fields={[
          { name: "name", label: "Name" },
          { name: "role", label: "Role" },
          { name: "image_url", label: "Image URL" },
          { name: "linkedin_url", label: "LinkedIn URL" },
          { name: "github_url", label: "GitHub URL" },
          { name: "bio", label: "Bio", type: "textarea" },
          { name: "published", label: "Published", type: "checkbox" }
        ]}
      />
    </main>
  );
}
