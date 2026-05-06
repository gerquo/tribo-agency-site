import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { BrandScene } from "@/components/brand-scene";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { ContactSection } from "@/components/contact-section";
import { CtaSection } from "@/components/cta-section";
import { HeroAnimatedScene } from "@/components/hero-animated-scene";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { Button } from "@/components/ui/button";
import { reasons, trustedBy } from "@/lib/data";
import {
  getHomepageStats,
  getProjects,
  getServices,
  getTestimonials,
  getTrustedBrands
} from "@/lib/content";
import { getPageMetadata, pageImages } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = getPageMetadata({
  title: "Web Development & Software Solutions",
  description:
    "tribit builds websites, e-commerce platforms, and software systems for African businesses and global clients that need real digital growth.",
  path: "/",
  image: pageImages.home
});

export default async function Home() {
  const [
    featuredProjects,
    homepageServices,
    homepageTrustedBrands,
    homepageStats,
    homepageTestimonials
  ] = await Promise.all([
    getProjects({ featuredOnly: true, publishedOnly: true, limit: 3 }),
    getServices(true),
    getTrustedBrands(true),
    getHomepageStats(true),
    getTestimonials(true)
  ]);

  const visibleStats = homepageStats.length > 0 ? homepageStats : [];
  const visibleTrustedBrands =
    homepageTrustedBrands.length > 0
      ? homepageTrustedBrands.map((brand) => brand.name)
      : trustedBy;
  const primaryTestimonial = homepageTestimonials[0];

  return (
    <main>
      <HeroAnimatedScene />

      <section className="border-y border-border/70 bg-background/82 backdrop-blur">
        <div className="container grid gap-4 py-6 sm:grid-cols-2 xl:grid-cols-4">
          {visibleStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border/70 bg-card/70 px-5 py-5"
            >
              <p className="font-display text-4xl font-semibold leading-none text-foreground sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-card/40">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center">
            <SectionHeading
            eyebrow="Why smart businesses choose tribit"
              title="We build digital systems that bring you more trust, more clarity, and more growth."
              description="Every decision is shaped around credibility, speed, user trust, and the commercial outcomes your business actually needs."
            />
            <Reveal>
              <BrandScene variant="growth" />
            </Reveal>
          </div>

          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {reasons.slice(0, 3).map((reason) => (
              <StaggerItem key={reason.title}>
                <div className="section-panel flex h-full flex-col p-6">
                  <reason.icon className="h-7 w-7 text-primary" />
                  <h3 className="mt-5 min-h-[3.45rem] display-title text-[1.6rem] leading-none">
                    {reason.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
                    {reason.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <SectionHeading
              eyebrow="What we do"
              title="What we build to grow your business."
              description="Every service we offer is designed to help you attract better customers, improve trust, and move the business forward."
            />
            <Reveal>
              <div className="grid gap-4">
                <BrandScene variant="services" />
                <div className="section-panel p-5">
                  <p className="eyebrow">Built for outcomes</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Websites, stores, apps, and optimization work delivered by one tight team
                    with strategy, design, engineering, and launch support under one roof.
                  </p>
                  <Button asChild variant="outline" className="mt-5 w-fit">
                    <Link href="/services">
                      Explore services <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {homepageServices.slice(0, 6).map((service) => (
              <StaggerItem key={service.slug}>
                <ServiceCard {...service} eyebrow={service.title} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-card/40">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <SectionHeading
              eyebrow="Featured projects"
              title="Selected work built to look credible and perform in the real world."
              description="A focused look at websites, e-commerce experiences, and software systems shaped around trust, speed, and measurable outcomes."
            />
            <Reveal>
              <div className="grid gap-4">
                <BrandScene variant="portfolio" />
                <div className="section-panel-alt p-5">
                  <p className="eyebrow">Trusted by growing teams</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {visibleTrustedBrands.slice(0, 5).map((brand) => (
                      <span
                        key={brand}
                        className="rounded-md border border-border bg-background/75 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <StaggerContainer className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} compact />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <Reveal className="section-panel grid gap-10 p-8 lg:grid-cols-[1fr_0.78fr] lg:p-10">
            <div>
              <p className="eyebrow">Free website audit</p>
              <h2 className="mt-4 max-w-[13ch] font-display text-4xl font-semibold leading-[0.96] tracking-tight sm:text-5xl">
                Not sure what your business needs online?
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                We can review your current site or digital presence, point out what is
                slowing trust and conversions, and show you where the biggest wins are.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/audit">
                    Get a free website audit <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/portfolio">See our work</Link>
                </Button>
              </div>
            </div>

            {primaryTestimonial ? (
              <TestimonialCard {...primaryTestimonial} />
            ) : (
              <div className="section-panel-alt flex h-full flex-col justify-between p-6">
                <div>
                  <Sparkles className="h-7 w-7 text-primary" />
                  <p className="mt-5 text-lg leading-8 text-foreground">
                    Built for businesses that want to grow, not just exist online.
                  </p>
                </div>
                <p className="mt-6 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  Accra, Ghana | Global reach
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <CtaSection />

      <ContactSection />
    </main>
  );
}
