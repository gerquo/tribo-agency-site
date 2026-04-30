import { AdminCollectionManager } from "@/components/admin/admin-collection-manager";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type {
  PricingEstimatorOptionRecord,
  PricingFactorRecord,
  PricingPackageRecord
} from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminPricingPage() {
  let packages: PricingPackageRecord[] = [];
  let factors: PricingFactorRecord[] = [];
  let estimatorOptions: PricingEstimatorOptionRecord[] = [];
  let loadError: string | null = null;

  if (isSupabaseConfigured()) {
    const admin = createSupabaseAdminClient();
    const [packagesResult, factorsResult, estimatorResult] = await Promise.all([
      admin
        .from("pricing_packages")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      admin
        .from("pricing_factors")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      admin
        .from("pricing_estimator_options")
        .select("*")
        .order("group_key", { ascending: true })
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true })
    ]);

    packages = packagesResult.data ?? [];
    factors = factorsResult.data ?? [];
    estimatorOptions = estimatorResult.data ?? [];
    loadError =
      packagesResult.error?.message ??
      factorsResult.error?.message ??
      estimatorResult.error?.message ??
      null;
  }

  return (
    <main className="grid gap-6">
      {!isSupabaseConfigured() ? (
        <section className="rounded-lg border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
          Supabase is not configured yet. Add your environment variables and run the
          schema before managing pricing content.
        </section>
      ) : null}

      {loadError ? (
        <section className="rounded-lg border border-destructive/20 bg-destructive/10 p-6 text-sm text-destructive">
          Unable to load pricing content right now. Please refresh and try again.
        </section>
      ) : null}

      <AdminCollectionManager
        entity="pricing_packages"
        title="Manage Pricing Packages"
        description="Edit the pricing bands shown on the public pricing page, including the range label, supporting description, and included deliverables."
        initialItems={packages}
        previewFields={["range_label", "sort_order", "published"]}
        fields={[
          { name: "title", label: "Title" },
          {
            name: "range_label",
            label: "Range label",
            placeholder: "GH₵45,000 - GH₵95,000"
          },
          { name: "description", label: "Description", type: "textarea" },
          {
            name: "includes",
            label: "Included items",
            type: "tags",
            placeholder: "Responsive design, SEO basics"
          },
          { name: "sort_order", label: "Sort order", type: "number" },
          { name: "published", label: "Published", type: "checkbox" }
        ]}
      />

      <AdminCollectionManager
        entity="pricing_factors"
        title="Manage Pricing Factors"
        description="Edit the list of factors that explain what changes project pricing on the public pricing page."
        initialItems={factors}
        previewFields={["sort_order", "published"]}
        fields={[
          { name: "text", label: "Factor text", type: "textarea" },
          { name: "sort_order", label: "Sort order", type: "number" },
          { name: "published", label: "Published", type: "checkbox" }
        ]}
      />

      <AdminCollectionManager
        entity="pricing_estimator_options"
        title="Manage Estimator Options"
        description="Edit the pricing estimator options. Use group keys exactly as: projectTypes, scopeLevels, contentSupport, integrations, or timeline."
        initialItems={estimatorOptions}
        previewFields={["group_key", "amount", "published"]}
        fields={[
          { name: "group_key", label: "Group key", placeholder: "projectTypes" },
          { name: "option_id", label: "Option ID", placeholder: "business-site" },
          { name: "label", label: "Label" },
          { name: "amount", label: "Amount (GH₵)", type: "number" },
          { name: "summary", label: "Summary", type: "textarea" },
          { name: "sort_order", label: "Sort order", type: "number" },
          { name: "published", label: "Published", type: "checkbox" }
        ]}
      />
    </main>
  );
}
