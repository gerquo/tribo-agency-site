# Supabase Setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. In the Supabase SQL editor, run [supabase/schema.sql](/C:/WEB/portfolio/supabase/schema.sql).
5. Create an auth user in Supabase Auth using email/password for the admin.
6. Insert that user into `public.admin_users`:

```sql
insert into public.admin_users (user_id, email)
values ('YOUR_AUTH_USER_ID', 'admin@example.com');
```

7. Start the app and visit `/admin/login`.

## Seed The Existing Website Content

The public website originally used local sample content from [lib/data.ts](/C:/WEB/portfolio/lib/data.ts). To migrate that content into Supabase so the admin dashboard can manage it, run:

```bash
npm run seed:supabase
```

The seed script:

- inserts existing projects, services, testimonials, team members, trusted-brand names, homepage stats, and pricing page content
- preserves project fields including `slug`, `category`, `description`, `image`, `technologies`, `live_url`, `case_study_url`, `featured`, `published`, `created_at`, and `updated_at`
- skips duplicate projects and services by `slug`
- skips duplicate testimonials and team members by name/role pair

## Check The Tables

In the Supabase dashboard:

1. Open `Table Editor`
2. Confirm rows exist in:
   - `projects`
   - `services`
   - `testimonials`
   - `team_members`
   - `trusted_brands`
   - `homepage_stats`
   - `pricing_packages`
   - `pricing_factors`
   - `pricing_estimator_options`
   - `contact_submissions`
3. Make sure seeded projects include `featured`, `published`, and `case_study_url`

## Confirm RLS Policies

In the Supabase dashboard:

1. Open `Authentication` and confirm your admin user exists
2. Open `Table Editor -> admin_users` and confirm your auth user ID is present
3. Open `SQL Editor` and rerun [supabase/schema.sql](/C:/WEB/portfolio/supabase/schema.sql) if you need to apply the latest `featured` and `case_study_url` changes
4. In `Authentication -> Policies`, confirm:
   - public users can only read published `projects`, `services`, `testimonials`, `team_members`, `trusted_brands`, `homepage_stats`, `pricing_packages`, `pricing_factors`, and `pricing_estimator_options`
   - authenticated admins can manage all content tables
   - `contact_submissions` are insertable publicly but readable only by admins

## Test Admin Content Management

1. Sign in at `/admin/login`
2. Open `/admin/dashboard` and confirm the totals and recent messages render
3. Open `/admin/projects` and verify all projects appear, including unpublished ones
4. Edit a project title or publish state and save
5. Refresh the public homepage, portfolio page, or project detail page and confirm the change appears
6. Repeat on `/admin/homepage`, `/admin/services`, `/admin/pricing`, `/admin/trusted-by`, `/admin/testimonials`, and `/admin/team`
7. Submit the public contact form and confirm the message appears at `/admin/messages`

## Notes

- The service role key is used only on the server for protected admin operations.
- Do not expose the service role key in client components.
- Public contact form submissions are inserted through RLS-enabled `contact_submissions`.
- Admin routes are protected by Supabase session checks plus the `admin_users` table.
