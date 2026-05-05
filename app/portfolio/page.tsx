import type { Metadata } from "next";

import { CtaSection } from "@/components/cta-section";
import { PageHeader } from "@/components/page-header";
import { ProjectFilter } from "@/components/project-filter";
import { getProjectCategories, getProjects } from "@/lib/content";
import { getPageMetadata, pageImages } from "@/lib/site";

export const metadata: Metadata = getPageMetadata({
  title: "Portfolio",
  description:
    "Explore selected tribo projects across websites, e-commerce, custom software, dashboards, and digital growth systems.",
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
      <section className="section-padding">
        <div className="container">
          <ProjectFilter projects={projects} categories={categories} />
        </div>
      </section>
      <CtaSection />
    </main>
  );
}
