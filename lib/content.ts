import {
  BriefcaseBusiness,
  GalleryHorizontal,
  Globe2,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  Sparkles,
  Store,
  type LucideIcon
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

import {
  projects as fallbackProjects,
  services as fallbackServices,
  stats as fallbackStats,
  team as fallbackTeam,
  testimonials as fallbackTestimonials,
  trustedBy as fallbackTrustedBy,
  type HomepageStat,
  type Project,
  type Service,
  type TrustedBrand
} from "@/lib/data";
import { buildProjectCategories } from "@/lib/content-utils";
import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/env";
import type {
  ProjectRecord,
  HomepageStatRecord,
  ServiceRecord,
  TeamMemberRecord,
  TestimonialRecord,
  TrustedBrandRecord
} from "@/lib/supabase/types";

type ProjectOptions = {
  featuredOnly?: boolean;
  publishedOnly?: boolean;
  limit?: number;
};

const serviceIconMap: Record<string, LucideIcon> = {
  BriefcaseBusiness,
  GalleryHorizontal,
  Globe2,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  Sparkles,
  Store
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

function mapProject(record: ProjectRecord): Project {
  return {
    slug: record.slug,
    title: record.title,
    category: record.category as Project["category"],
    image: record.image,
    gallery: record.gallery,
    description: record.description,
    summary: record.summary,
    technologies: record.technologies,
    liveUrl: record.live_url,
    caseStudyUrl: record.case_study_url ?? `/projects/${record.slug}`,
    featured: record.featured,
    published: record.published,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
    client: record.client,
    year: record.year,
    results: record.results,
    challenge: record.challenge,
    solution: record.solution
  };
}

function mapService(record: ServiceRecord): Service {
  return {
    icon: serviceIconMap[record.icon] ?? Globe2,
    slug: record.slug,
    title: record.title,
    description: record.description,
    href: `/services#${record.slug}`,
    features: record.features,
    forWhom: record.for_whom
  };
}

function mapTestimonial(record: TestimonialRecord) {
  return {
    quote: record.quote,
    name: record.name,
    role: record.role,
    initials: record.initials ?? undefined,
    image: record.image_url ?? undefined
  };
}

function mapTeamMember(record: TeamMemberRecord) {
  return {
    name: record.name,
    role: record.role,
    bio: record.bio,
    image: record.image_url,
    socials: {
      linkedin: record.linkedin_url ?? "#",
      github: record.github_url ?? "#"
    }
  };
}

function mapTrustedBrand(record: TrustedBrandRecord): TrustedBrand {
  return {
    name: record.name,
    published: record.published,
    sortOrder: record.sort_order
  };
}

function mapHomepageStat(record: HomepageStatRecord): HomepageStat {
  return {
    label: record.label,
    value: record.value,
    published: record.published,
    sortOrder: record.sort_order
  };
}

export async function getProjects(options: ProjectOptions = {}) {
  const {
    featuredOnly = false,
    publishedOnly = true,
    limit
  } = options;

  if (!isSupabaseConfigured()) {
    let localProjects = fallbackProjects.filter(
      (project) => !publishedOnly || project.published
    );

    if (featuredOnly) {
      localProjects = localProjects.filter((project) => project.featured);
    }

    return typeof limit === "number" ? localProjects.slice(0, limit) : localProjects;
  }

  const client = createSupabasePublicClient();
  let query = client
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (publishedOnly) {
    query = query.eq("published", true);
  }

  if (featuredOnly) {
    query = query.eq("featured", true);
  }

  if (typeof limit === "number") {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error || !data) {
    let localProjects = fallbackProjects.filter(
      (project) => !publishedOnly || project.published
    );

    if (featuredOnly) {
      localProjects = localProjects.filter((project) => project.featured);
    }

    return typeof limit === "number" ? localProjects.slice(0, limit) : localProjects;
  }

  return data.map(mapProject);
}

export async function getProjectBySlug(slug: string, publishedOnly = true) {
  if (!isSupabaseConfigured()) {
    return (
      fallbackProjects.find(
        (project) => project.slug === slug && (!publishedOnly || project.published)
      ) ?? null
    );
  }

  const client = createSupabasePublicClient();
  let query = client.from("projects").select("*").eq("slug", slug);

  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    return (
      fallbackProjects.find(
        (project) => project.slug === slug && (!publishedOnly || project.published)
      ) ?? null
    );
  }

  return data ? mapProject(data) : null;
}

export async function getServices(publishedOnly = true) {
  if (!isSupabaseConfigured()) {
    return fallbackServices;
  }

  const client = createSupabasePublicClient();
  let query = client
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });

  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;

  if (error || !data) {
    return fallbackServices;
  }

  return data.map(mapService);
}

export async function getTestimonials(publishedOnly = true) {
  if (!isSupabaseConfigured()) {
    return fallbackTestimonials;
  }

  const client = createSupabasePublicClient();
  let query = client
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;

  if (error || !data) {
    return fallbackTestimonials;
  }

  return data.map(mapTestimonial);
}

export async function getTeamMembers(publishedOnly = true) {
  if (!isSupabaseConfigured()) {
    return fallbackTeam;
  }

  const client = createSupabasePublicClient();
  let query = client
    .from("team_members")
    .select("*")
    .order("created_at", { ascending: false });

  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;

  if (error || !data) {
    return fallbackTeam;
  }

  return data.map(mapTeamMember);
}

export async function getTrustedBrands(publishedOnly = true) {
  if (!isSupabaseConfigured()) {
    return fallbackTrustedBy.map((name, index) => ({
      name,
      published: true,
      sortOrder: index
    }));
  }

  const client = createSupabasePublicClient();
  let query = client
    .from("trusted_brands")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;

  if (error || !data) {
    return fallbackTrustedBy.map((name, index) => ({
      name,
      published: true,
      sortOrder: index
    }));
  }

  return data.map(mapTrustedBrand);
}

export async function getHomepageStats(publishedOnly = true) {
  if (!isSupabaseConfigured()) {
    return fallbackStats.map((item, index) => ({
      ...item,
      published: true,
      sortOrder: index
    }));
  }

  const client = createSupabasePublicClient();
  let query = client
    .from("homepage_stats")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;

  if (error || !data) {
    return fallbackStats.map((item, index) => ({
      ...item,
      published: true,
      sortOrder: index
    }));
  }

  return data.map(mapHomepageStat);
}

export function getProjectCategories(projects: Project[]) {
  return buildProjectCategories(projects);
}
