create extension if not exists "pgcrypto";

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  description text not null,
  summary text not null,
  image text not null,
  gallery text[] not null default '{}',
  technologies text[] not null default '{}',
  client text not null,
  year text not null,
  challenge text not null,
  solution text not null,
  results text[] not null default '{}',
  live_url text not null,
  case_study_url text,
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects add column if not exists case_study_url text;
alter table public.projects add column if not exists featured boolean not null default false;

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  icon text not null default 'Globe2',
  for_whom text not null,
  features text[] not null default '{}',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  quote text not null,
  initials text,
  image_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text not null,
  image_url text not null,
  linkedin_url text,
  github_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.trusted_brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.homepage_stats (
  id uuid primary key default gen_random_uuid(),
  label text not null unique,
  value text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pricing_packages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  range_label text not null,
  description text not null,
  includes text[] not null default '{}',
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pricing_factors (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pricing_estimator_options (
  id uuid primary key default gen_random_uuid(),
  group_key text not null,
  option_id text not null,
  label text not null,
  amount integer not null default 0,
  summary text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(group_key, option_id)
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text not null,
  service text not null,
  budget text not null,
  details text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
before update on public.services
for each row execute function public.set_updated_at();

drop trigger if exists set_testimonials_updated_at on public.testimonials;
create trigger set_testimonials_updated_at
before update on public.testimonials
for each row execute function public.set_updated_at();

drop trigger if exists set_team_members_updated_at on public.team_members;
create trigger set_team_members_updated_at
before update on public.team_members
for each row execute function public.set_updated_at();

drop trigger if exists set_trusted_brands_updated_at on public.trusted_brands;
create trigger set_trusted_brands_updated_at
before update on public.trusted_brands
for each row execute function public.set_updated_at();

drop trigger if exists set_homepage_stats_updated_at on public.homepage_stats;
create trigger set_homepage_stats_updated_at
before update on public.homepage_stats
for each row execute function public.set_updated_at();

drop trigger if exists set_pricing_packages_updated_at on public.pricing_packages;
create trigger set_pricing_packages_updated_at
before update on public.pricing_packages
for each row execute function public.set_updated_at();

drop trigger if exists set_pricing_factors_updated_at on public.pricing_factors;
create trigger set_pricing_factors_updated_at
before update on public.pricing_factors
for each row execute function public.set_updated_at();

drop trigger if exists set_pricing_estimator_options_updated_at on public.pricing_estimator_options;
create trigger set_pricing_estimator_options_updated_at
before update on public.pricing_estimator_options
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.team_members enable row level security;
alter table public.trusted_brands enable row level security;
alter table public.homepage_stats enable row level security;
alter table public.pricing_packages enable row level security;
alter table public.pricing_factors enable row level security;
alter table public.pricing_estimator_options enable row level security;
alter table public.contact_submissions enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

drop policy if exists "admins can read admin_users" on public.admin_users;
create policy "admins can read admin_users"
on public.admin_users for select
using (public.is_admin());

drop policy if exists "admins manage projects" on public.projects;
create policy "admins manage projects"
on public.projects for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public can read published projects" on public.projects;
create policy "public can read published projects"
on public.projects for select
using (published = true or public.is_admin());

drop policy if exists "admins manage services" on public.services;
create policy "admins manage services"
on public.services for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public can read published services" on public.services;
create policy "public can read published services"
on public.services for select
using (published = true or public.is_admin());

drop policy if exists "admins manage testimonials" on public.testimonials;
create policy "admins manage testimonials"
on public.testimonials for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public can read published testimonials" on public.testimonials;
create policy "public can read published testimonials"
on public.testimonials for select
using (published = true or public.is_admin());

drop policy if exists "admins manage team members" on public.team_members;
create policy "admins manage team members"
on public.team_members for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public can read published team members" on public.team_members;
create policy "public can read published team members"
on public.team_members for select
using (published = true or public.is_admin());

drop policy if exists "admins manage trusted brands" on public.trusted_brands;
create policy "admins manage trusted brands"
on public.trusted_brands for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public can read published trusted brands" on public.trusted_brands;
create policy "public can read published trusted brands"
on public.trusted_brands for select
using (published = true or public.is_admin());

drop policy if exists "admins manage homepage stats" on public.homepage_stats;
create policy "admins manage homepage stats"
on public.homepage_stats for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public can read published homepage stats" on public.homepage_stats;
create policy "public can read published homepage stats"
on public.homepage_stats for select
using (published = true or public.is_admin());

drop policy if exists "admins manage pricing packages" on public.pricing_packages;
create policy "admins manage pricing packages"
on public.pricing_packages for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public can read published pricing packages" on public.pricing_packages;
create policy "public can read published pricing packages"
on public.pricing_packages for select
using (published = true or public.is_admin());

drop policy if exists "admins manage pricing factors" on public.pricing_factors;
create policy "admins manage pricing factors"
on public.pricing_factors for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public can read published pricing factors" on public.pricing_factors;
create policy "public can read published pricing factors"
on public.pricing_factors for select
using (published = true or public.is_admin());

drop policy if exists "admins manage pricing estimator options" on public.pricing_estimator_options;
create policy "admins manage pricing estimator options"
on public.pricing_estimator_options for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public can read published pricing estimator options" on public.pricing_estimator_options;
create policy "public can read published pricing estimator options"
on public.pricing_estimator_options for select
using (published = true or public.is_admin());

drop policy if exists "public can create contact submissions" on public.contact_submissions;
create policy "public can create contact submissions"
on public.contact_submissions for insert
with check (true);

drop policy if exists "admins can read contact submissions" on public.contact_submissions;
create policy "admins can read contact submissions"
on public.contact_submissions for select
using (public.is_admin());
