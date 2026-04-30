# NovaCraft Digital

Premium digital agency portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, shadcn-style UI components, and Supabase.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase Auth + Database
- React Hook Form + Zod

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy [.env.example](/C:/WEB/portfolio/.env.example) to `.env.local`
3. Fill in:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Run the schema in Supabase:
   [supabase/schema.sql](/C:/WEB/portfolio/supabase/schema.sql)
5. Seed the sample content:
   ```bash
   npm run seed:supabase
   ```
6. Start development:
   ```bash
   npm run dev
   ```

## Environment Variables

- `NEXT_PUBLIC_SITE_URL`: canonical site URL used for metadata, robots, and sitemap
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: public anon key
- `SUPABASE_SERVICE_ROLE_KEY`: server-only key used for protected admin and seed operations

## Supabase Setup

See [SUPABASE_SETUP.md](/C:/WEB/portfolio/SUPABASE_SETUP.md) for:

- schema setup
- RLS policies
- admin auth setup
- seeding the existing content
- testing admin content management

## Database Tables

- `admin_users`
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

## RLS Summary

- Public users can read only published `projects`, `services`, `testimonials`, `team_members`, `trusted_brands`, `homepage_stats`, `pricing_packages`, `pricing_factors`, and `pricing_estimator_options`
- Public users can insert `contact_submissions`
- Only admins listed in `admin_users` can manage content or read messages

## Admin Login Setup

1. Create a Supabase Auth user
2. Insert that user into `public.admin_users`
3. Visit `/admin/login`

## Verification

- Type check:
  ```bash
  npx tsc --noEmit
  ```
- Lint:
  ```bash
  npm run lint
  ```
- Production build:
  ```bash
  npm run build
  ```
- Tests:
  ```bash
  npm run test
  ```

## Deployment Notes

- Set all environment variables in your hosting provider
- Use the same `NEXT_PUBLIC_SITE_URL` as your production domain
- Rerun [supabase/schema.sql](/C:/WEB/portfolio/supabase/schema.sql) after schema updates
- Run `npm run seed:supabase` once if you want the sample content in production

## Troubleshooting

- If admin content is empty, confirm Supabase is configured, the schema has been rerun, and the seed has been run
- If seeding fails on `case_study_url` or `featured`, rerun [supabase/schema.sql](/C:/WEB/portfolio/supabase/schema.sql)
- If admin login succeeds but dashboard access fails, verify the user exists in `admin_users`
- If public content does not update, check the corresponding record is marked `published`
