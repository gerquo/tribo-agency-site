export type AdminEntity =
  | "projects"
  | "services"
  | "testimonials"
  | "team_members"
  | "trusted_brands"
  | "homepage_stats"
  | "pricing_packages"
  | "pricing_factors"
  | "pricing_estimator_options"
  | "contact_submissions";

export type ProjectRecord = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  summary: string;
  image: string;
  gallery: string[];
  technologies: string[];
  client: string;
  year: string;
  challenge: string;
  solution: string;
  results: string[];
  live_url: string;
  case_study_url: string | null;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ServiceRecord = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  for_whom: string;
  features: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type TestimonialRecord = {
  id: string;
  name: string;
  role: string;
  quote: string;
  initials: string | null;
  image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type TeamMemberRecord = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  linkedin_url: string | null;
  github_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type ContactSubmissionRecord = {
  id: string;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  details: string;
  status: string;
  created_at: string;
};

export type TrustedBrandRecord = {
  id: string;
  name: string;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type HomepageStatRecord = {
  id: string;
  label: string;
  value: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type PricingPackageRecord = {
  id: string;
  title: string;
  range_label: string;
  description: string;
  includes: string[];
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type PricingFactorRecord = {
  id: string;
  text: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type PricingEstimatorOptionRecord = {
  id: string;
  group_key: string;
  option_id: string;
  label: string;
  amount: number;
  summary: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminUserRecord = {
  id: string;
  user_id: string;
  email: string;
  created_at: string;
};
