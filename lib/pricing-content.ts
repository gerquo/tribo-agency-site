import { createClient } from "@supabase/supabase-js";

import {
  pricingBands as fallbackPricingBands,
  pricingEstimatorOptions as fallbackPricingEstimatorOptions,
  pricingFactors as fallbackPricingFactors,
  type ModifierOption,
  type PricingFactor,
  type PricingPackage,
  type ProjectTypeOption
} from "@/lib/pricing";
import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/env";
import type {
  PricingEstimatorOptionRecord,
  PricingFactorRecord,
  PricingPackageRecord
} from "@/lib/supabase/types";

export type PricingEstimatorContent = {
  projectTypes: ProjectTypeOption[];
  scopeLevels: ModifierOption[];
  contentSupport: ModifierOption[];
  integrations: ModifierOption[];
  timeline: ModifierOption[];
};

function createSupabasePublicClient() {
  const { url, anonKey } = getSupabaseEnv();
  return createClient(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

function mapPricingPackage(record: PricingPackageRecord): PricingPackage {
  return {
    title: record.title,
    range: record.range_label,
    description: record.description,
    includes: record.includes,
    sortOrder: record.sort_order,
    published: record.published
  };
}

function mapPricingFactor(record: PricingFactorRecord): PricingFactor {
  return {
    text: record.text,
    sortOrder: record.sort_order,
    published: record.published
  };
}

function buildFallbackEstimatorContent(): PricingEstimatorContent {
  return {
    projectTypes: fallbackPricingEstimatorOptions.projectTypes,
    scopeLevels: fallbackPricingEstimatorOptions.scopeLevels,
    contentSupport: fallbackPricingEstimatorOptions.contentSupport,
    integrations: fallbackPricingEstimatorOptions.integrations,
    timeline: fallbackPricingEstimatorOptions.timeline
  };
}

export async function getPricingPackages(publishedOnly = true) {
  if (!isSupabaseConfigured()) {
    return fallbackPricingBands;
  }

  const client = createSupabasePublicClient();
  let query = client
    .from("pricing_packages")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;

  if (error || !data || data.length === 0) {
    return fallbackPricingBands;
  }

  return data.map(mapPricingPackage);
}

export async function getPricingFactors(publishedOnly = true) {
  if (!isSupabaseConfigured()) {
    return fallbackPricingFactors;
  }

  const client = createSupabasePublicClient();
  let query = client
    .from("pricing_factors")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;

  if (error || !data || data.length === 0) {
    return fallbackPricingFactors;
  }

  return data.map(mapPricingFactor);
}

export async function getPricingEstimatorContent(publishedOnly = true): Promise<PricingEstimatorContent> {
  if (!isSupabaseConfigured()) {
    return buildFallbackEstimatorContent();
  }

  const client = createSupabasePublicClient();
  let query = client
    .from("pricing_estimator_options")
    .select("*")
    .order("group_key", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;

  if (error || !data || data.length === 0) {
    return buildFallbackEstimatorContent();
  }

  const grouped: PricingEstimatorContent = {
    projectTypes: [],
    scopeLevels: [],
    contentSupport: [],
    integrations: [],
    timeline: []
  };

  for (const record of data) {
    assignEstimatorOption(grouped, record);
  }

  if (
    grouped.projectTypes.length === 0 ||
    grouped.scopeLevels.length === 0 ||
    grouped.contentSupport.length === 0 ||
    grouped.integrations.length === 0 ||
    grouped.timeline.length === 0
  ) {
    return buildFallbackEstimatorContent();
  }

  return grouped;
}

function assignEstimatorOption(target: PricingEstimatorContent, record: PricingEstimatorOptionRecord) {
  const common = {
    id: record.option_id,
    label: record.label,
    summary: record.summary
  };

  if (record.group_key === "projectTypes") {
    target.projectTypes.push({
      ...common,
      base: record.amount
    });
    return;
  }

  if (record.group_key === "scopeLevels") {
    target.scopeLevels.push({
      ...common,
      modifier: record.amount
    });
    return;
  }

  if (record.group_key === "contentSupport") {
    target.contentSupport.push({
      ...common,
      modifier: record.amount
    });
    return;
  }

  if (record.group_key === "integrations") {
    target.integrations.push({
      ...common,
      modifier: record.amount
    });
    return;
  }

  if (record.group_key === "timeline") {
    target.timeline.push({
      ...common,
      modifier: record.amount
    });
  }
}
