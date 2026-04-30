import type { AdminEntity } from "@/lib/supabase/types";

export const entityTables: Record<AdminEntity, string> = {
  projects: "projects",
  services: "services",
  testimonials: "testimonials",
  team_members: "team_members",
  trusted_brands: "trusted_brands",
  homepage_stats: "homepage_stats",
  pricing_packages: "pricing_packages",
  pricing_factors: "pricing_factors",
  pricing_estimator_options: "pricing_estimator_options",
  contact_submissions: "contact_submissions"
};

export const entityFields: Record<Exclude<AdminEntity, "contact_submissions">, string[]> = {
  projects: [
    "slug",
    "title",
    "category",
    "description",
    "summary",
    "image",
    "gallery",
    "technologies",
    "client",
    "year",
    "challenge",
    "solution",
    "results",
    "live_url",
    "case_study_url",
    "featured",
    "published"
  ],
  services: [
    "slug",
    "title",
    "description",
    "icon",
    "for_whom",
    "features",
    "published"
  ],
  testimonials: [
    "name",
    "role",
    "quote",
    "initials",
    "image_url",
    "published"
  ],
  team_members: [
    "name",
    "role",
    "bio",
    "image_url",
    "linkedin_url",
    "github_url",
    "published"
  ],
  trusted_brands: [
    "name",
    "sort_order",
    "published"
  ],
  homepage_stats: [
    "label",
    "value",
    "sort_order",
    "published"
  ],
  pricing_packages: [
    "title",
    "range_label",
    "description",
    "includes",
    "sort_order",
    "published"
  ],
  pricing_factors: [
    "text",
    "sort_order",
    "published"
  ],
  pricing_estimator_options: [
    "group_key",
    "option_id",
    "label",
    "amount",
    "summary",
    "sort_order",
    "published"
  ]
};
