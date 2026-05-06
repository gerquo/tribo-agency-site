import type { Metadata } from "next";

import { CtaSection } from "@/components/cta-section";
import { BrandScene } from "@/components/brand-scene";
import { PageHeader } from "@/components/page-header";
import { ProjectFilter } from "@/components/project-filter";
import { getProjectCategories, getProjects } from "@/lib/content";
import { getPageMetadata, pageImages } from "@/lib/site";

export const metadata: Metadata = getPageMetadata({
  title: "Portfolio",
  description:
    "Explore selected tribit projects across websites, e-commerce, custom software, dashboards, and digital growth systems.",
  path: "/portfolio",
  image: pageImages.portfolio
});

export const revalidate = 3600;

export default async function PortfolioPage() {
  const projects = await getProjects({ publishedOnly: true });
  const categories = getProjectCategories(projects);

  return (
    <main>
      <PageHeader
        label="PORTFOLIO"
        title="Work that speaks for itself."
        subtitle="Browse selected projects across websites, commerce, and software systems built to improve trust, speed, and conversion."
        image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="pt-10 sm:pt-12">
        <div className="container grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center">
          <div className="section-panel p-6">
            <p className="eyebrow">Selected outcomes</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              This portfolio focuses on launches that improved trust, sharpened user journeys,
              and gave growing teams a stronger digital operating base.
            </p>
          </div>
          <BrandScene variant="portfolio" />
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <ProjectFilter projects={projects} categories={categories} />
        </div>
      </section>
      <CtaSection />
    </main>
  );
}
