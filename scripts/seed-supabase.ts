import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createClient } from "@supabase/supabase-js";

import type { Project, Service } from "../lib/data";
import type {
  ModifierOption,
  PricingFactor,
  PricingPackage,
  ProjectTypeOption
} from "../lib/pricing";

type TeamSeedMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin: string;
    github: string;
  };
};

type TestimonialSeed = {
  name: string;
  role: string;
  quote: string;
  initials?: string;
  image?: string;
};

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

async function main() {
  loadEnvFile(path.join(process.cwd(), ".env.local"));
  const { projects, services, team, testimonials, trustedBy, stats } = (await import(
    pathToFileURL(path.join(process.cwd(), "lib", "data.ts")).href
  )) as {
    projects: Project[];
    services: Service[];
    team: TeamSeedMember[];
    testimonials: TestimonialSeed[];
    trustedBy: string[];
    stats: { value: string; label: string }[];
  };
  const { pricingBands, pricingFactors, pricingEstimatorOptions } = (await import(
    pathToFileURL(path.join(process.cwd(), "lib", "pricing.ts")).href
  )) as {
    pricingBands: PricingPackage[];
    pricingFactors: PricingFactor[];
    pricingEstimatorOptions: {
      projectTypes: ProjectTypeOption[];
      scopeLevels: ModifierOption[];
      contentSupport: ModifierOption[];
      integrations: ModifierOption[];
      timeline: ModifierOption[];
    };
  };

  const supabase = createClient(
    getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  const now = new Date().toISOString();

  const existingProjects = await supabase.from("projects").select("slug");
  if (existingProjects.error) throw existingProjects.error;
  const existingProjectSlugs = new Set((existingProjects.data ?? []).map((item) => item.slug));

  const projectRows = projects
    .filter((project) => !existingProjectSlugs.has(project.slug))
    .map((project) => ({
      slug: project.slug,
      title: project.title,
      category: project.category,
      description: project.description,
      summary: project.summary,
      image: project.image,
      gallery: project.gallery,
      technologies: project.technologies,
      client: project.client,
      year: project.year,
      challenge: project.challenge,
      solution: project.solution,
      results: project.results,
      live_url: project.liveUrl,
      case_study_url: project.caseStudyUrl,
      featured: project.featured,
      published: project.published,
      created_at: project.createdAt ?? now,
      updated_at: project.updatedAt ?? now
    }));

  if (projectRows.length > 0) {
    const insertProjects = await supabase.from("projects").insert(projectRows);
    if (insertProjects.error) throw insertProjects.error;
  }

  const existingServices = await supabase.from("services").select("slug");
  if (existingServices.error) throw existingServices.error;
  const existingServiceSlugs = new Set((existingServices.data ?? []).map((item) => item.slug));

  const serviceRows = services
    .filter((service) => !existingServiceSlugs.has(service.slug))
    .map((service) => ({
      slug: service.slug,
      title: service.title,
      description: service.description,
      icon: service.icon.name || "Globe2",
      for_whom: service.forWhom,
      features: service.features,
      published: true
    }));

  if (serviceRows.length > 0) {
    const insertServices = await supabase.from("services").insert(serviceRows);
    if (insertServices.error) throw insertServices.error;
  }

  const existingTestimonials = await supabase
    .from("testimonials")
    .select("name, role");
  if (existingTestimonials.error) throw existingTestimonials.error;
  const existingTestimonialKeys = new Set(
    (existingTestimonials.data ?? []).map((item) => `${item.name}::${item.role}`)
  );

  const testimonialRows = testimonials
    .filter(
      (testimonial) =>
        !existingTestimonialKeys.has(`${testimonial.name}::${testimonial.role}`)
    )
    .map((testimonial) => ({
      name: testimonial.name,
      role: testimonial.role,
      quote: testimonial.quote,
      initials: testimonial.initials ?? null,
      image_url: testimonial.image ?? null,
      published: true
    }));

  if (testimonialRows.length > 0) {
    const insertTestimonials = await supabase
      .from("testimonials")
      .insert(testimonialRows);
    if (insertTestimonials.error) throw insertTestimonials.error;
  }

  const existingTeam = await supabase.from("team_members").select("name, role");
  if (existingTeam.error) throw existingTeam.error;
  const existingTeamKeys = new Set(
    (existingTeam.data ?? []).map((member) => `${member.name}::${member.role}`)
  );

  const teamRows = team
    .filter((member) => !existingTeamKeys.has(`${member.name}::${member.role}`))
    .map((member) => ({
      name: member.name,
      role: member.role,
      bio: member.bio,
      image_url: member.image,
      linkedin_url: member.socials.linkedin,
      github_url: member.socials.github,
      published: true
    }));

  if (teamRows.length > 0) {
    const insertTeam = await supabase.from("team_members").insert(teamRows);
    if (insertTeam.error) throw insertTeam.error;
  }

  const existingTrustedBrands = await supabase.from("trusted_brands").select("name");
  if (existingTrustedBrands.error) throw existingTrustedBrands.error;
  const existingTrustedBrandNames = new Set(
    (existingTrustedBrands.data ?? []).map((item) => item.name)
  );

  const trustedBrandRows = trustedBy
    .filter((name) => !existingTrustedBrandNames.has(name))
    .map((name, index) => ({
      name,
      sort_order: index,
      published: true
    }));

  if (trustedBrandRows.length > 0) {
    const insertTrustedBrands = await supabase
      .from("trusted_brands")
      .insert(trustedBrandRows);
    if (insertTrustedBrands.error) throw insertTrustedBrands.error;
  }

  const existingHomepageStats = await supabase.from("homepage_stats").select("label");
  if (existingHomepageStats.error) throw existingHomepageStats.error;
  const existingHomepageStatLabels = new Set(
    (existingHomepageStats.data ?? []).map((item) => item.label)
  );

  const homepageStatRows = stats
    .filter((item) => !existingHomepageStatLabels.has(item.label))
    .map((item, index) => ({
      label: item.label,
      value: item.value,
      sort_order: index,
      published: true
    }));

  if (homepageStatRows.length > 0) {
    const insertHomepageStats = await supabase.from("homepage_stats").insert(homepageStatRows);
    if (insertHomepageStats.error) throw insertHomepageStats.error;
  }

  const existingPricingPackages = await supabase.from("pricing_packages").select("title");
  if (existingPricingPackages.error) throw existingPricingPackages.error;
  const existingPricingPackageTitles = new Set(
    (existingPricingPackages.data ?? []).map((item) => item.title)
  );

  const pricingPackageRows = pricingBands
    .filter((item) => !existingPricingPackageTitles.has(item.title))
    .map((item, index) => ({
      title: item.title,
      range_label: item.range,
      description: item.description,
      includes: item.includes,
      sort_order: index,
      published: true
    }));

  if (pricingPackageRows.length > 0) {
    const insertPricingPackages = await supabase.from("pricing_packages").insert(pricingPackageRows);
    if (insertPricingPackages.error) throw insertPricingPackages.error;
  }

  const existingPricingFactors = await supabase.from("pricing_factors").select("text");
  if (existingPricingFactors.error) throw existingPricingFactors.error;
  const existingPricingFactorTexts = new Set(
    (existingPricingFactors.data ?? []).map((item) => item.text)
  );

  const pricingFactorRows = pricingFactors
    .filter((item) => !existingPricingFactorTexts.has(item.text))
    .map((item, index) => ({
      text: item.text,
      sort_order: index,
      published: true
    }));

  if (pricingFactorRows.length > 0) {
    const insertPricingFactors = await supabase.from("pricing_factors").insert(pricingFactorRows);
    if (insertPricingFactors.error) throw insertPricingFactors.error;
  }

  const estimatorSeedRows = [
    ...pricingEstimatorOptions.projectTypes.map((item, index) => ({
      group_key: "projectTypes",
      option_id: item.id,
      label: item.label,
      amount: item.base,
      summary: item.summary,
      sort_order: index,
      published: true
    })),
    ...pricingEstimatorOptions.scopeLevels.map((item, index) => ({
      group_key: "scopeLevels",
      option_id: item.id,
      label: item.label,
      amount: item.modifier,
      summary: item.summary,
      sort_order: index,
      published: true
    })),
    ...pricingEstimatorOptions.contentSupport.map((item, index) => ({
      group_key: "contentSupport",
      option_id: item.id,
      label: item.label,
      amount: item.modifier,
      summary: item.summary,
      sort_order: index,
      published: true
    })),
    ...pricingEstimatorOptions.integrations.map((item, index) => ({
      group_key: "integrations",
      option_id: item.id,
      label: item.label,
      amount: item.modifier,
      summary: item.summary,
      sort_order: index,
      published: true
    })),
    ...pricingEstimatorOptions.timeline.map((item, index) => ({
      group_key: "timeline",
      option_id: item.id,
      label: item.label,
      amount: item.modifier,
      summary: item.summary,
      sort_order: index,
      published: true
    }))
  ];

  const existingEstimatorOptions = await supabase
    .from("pricing_estimator_options")
    .select("group_key, option_id");
  if (existingEstimatorOptions.error) throw existingEstimatorOptions.error;
  const existingEstimatorKeys = new Set(
    (existingEstimatorOptions.data ?? []).map((item) => `${item.group_key}::${item.option_id}`)
  );

  const pricingEstimatorRows = estimatorSeedRows.filter(
    (item) => !existingEstimatorKeys.has(`${item.group_key}::${item.option_id}`)
  );

  if (pricingEstimatorRows.length > 0) {
    const insertPricingEstimatorOptions = await supabase
      .from("pricing_estimator_options")
      .insert(pricingEstimatorRows);
    if (insertPricingEstimatorOptions.error) throw insertPricingEstimatorOptions.error;
  }

  console.log("Supabase seed completed.");
  console.log(
    JSON.stringify(
      {
        projectsInserted: projectRows.length,
        servicesInserted: serviceRows.length,
        testimonialsInserted: testimonialRows.length,
        teamMembersInserted: teamRows.length,
        trustedBrandsInserted: trustedBrandRows.length,
        homepageStatsInserted: homepageStatRows.length,
        pricingPackagesInserted: pricingPackageRows.length,
        pricingFactorsInserted: pricingFactorRows.length,
        pricingEstimatorOptionsInserted: pricingEstimatorRows.length
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string" &&
    error.message.includes("case_study_url")
  ) {
    console.error(
      "Seed failed: your Supabase schema is missing the latest projects columns. Rerun supabase/schema.sql in the Supabase SQL editor, then run `npm run seed:supabase` again."
    );
    process.exit(1);
  }

  console.error("Seed failed:", error);
  process.exit(1);
});
