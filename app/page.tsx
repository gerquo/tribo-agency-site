import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { ContactSection } from "@/components/contact-section";
import { CtaSection } from "@/components/cta-section";
import { FaqList } from "@/components/faq-list";
import { HeroAnimatedScene } from "@/components/hero-animated-scene";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { Button } from "@/components/ui/button";
import {
  aboutHighlights,
  faqs,
  process,
  reasons,
  trustedBy
} from "@/lib/data";
import {
  getHomepageStats,
  getProjects,
  getServices,
  getTestimonials,
  getTrustedBrands
} from "@/lib/content";
import { getPricingPackages } from "@/lib/pricing-content";
import { getPageMetadata, pageImages } from "@/lib/site";

const proofPoints = [
  "Web Development",
  "E-Commerce",
  "Custom Web Apps",
  "SEO Strategy",
  "Mobile-First",
  "Built in Ghana",
  "UI/UX Design",
  "Performance Optimisation"
];

const faqPreview = faqs.slice(0, 4);

export const revalidate = 3600;

export const metadata: Metadata = getPageMetadata({
  title: "Web Development & Software Solutions",
  description:
    "tribo builds websites, e-commerce platforms, and software systems for African businesses and global clients that need real digital growth.",
  path: "/",
  image: pageImages.home
});

export default async function Home() {
  const [
    featuredProjects,
    homepageServices,
    homepageTrustedBrands,
    homepageStats,
    homepageTestimonials,
    pricingPackages
  ] = await Promise.all([
    getProjects({ featuredOnly: true, publishedOnly: true, limit: 3 }),
    getServices(true),
    getTrustedBrands(true),
    getHomepageStats(true),
    getTestimonials(true),
    getPricingPackages(true)
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
            <div key={stat.label} className="rounded-lg border border-border/70 bg-card/70 px-5 py-5">
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

      <section className="overflow-hidden border-b border-border bg-card/45 py-4">
        <div className="marquee-track">
          {[...proofPoints, ...proofPoints].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="marquee-item text-[0.78rem] font-bold uppercase tracking-[0.22em] text-muted-foreground"
            >
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-card/40">
        <div className="container">
          <SectionHeading
            eyebrow="Why smart businesses choose tribo"
            title="We build digital systems that bring you more trust, more clarity, and more growth."
            description="We do not stop at aesthetics. Every decision is shaped around credibility, speed, user trust, and the commercial outcomes your business actually needs."
          />

          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {reasons.slice(0, 4).map((reason) => (
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
                  <Link href="/contact">
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
                  Accra, Ghana · Global reach
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-card/40">
        <div className="container grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <SectionHeading
            eyebrow="About tribo"
            title="Web development and software solutions built from real business friction."
            description="We help African businesses and global clients build websites and digital systems that look stronger, move faster, and support real operations."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {aboutHighlights.map((item) => (
              <Reveal key={item} className="section-panel-alt flex gap-3 p-5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm leading-7 text-muted-foreground">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <SectionHeading
            eyebrow="How we work"
            title="How we turn your website into a customer-generating system."
            description="The process stays lean, visible, and commercially focused so you always know what is being built and why."
          />

          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {process.map((item) => (
              <StaggerItem key={item.step}>
                <div className="section-panel flex h-full flex-col p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                    {item.step}
                  </p>
                  <h3 className="mt-5 display-title text-[1.5rem] leading-none">{item.title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-card/40">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <SectionHeading
              eyebrow="Pricing"
              title="Simple pricing direction built for real business growth."
              description="Choose a level that fits your stage, whether you need a focused website launch, a stronger growth platform, or a more advanced custom build."
            />
            <div className="section-panel p-5">
              <p className="eyebrow">Need a firmer number?</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Use the pricing page to explore ranges, project variables, and a planning
                estimate before we scope the real proposal.
              </p>
              <Button asChild variant="outline" className="mt-5 w-fit">
                <Link href="/pricing">
                  Open pricing guide <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <StaggerContainer className="mt-12 grid gap-6 lg:grid-cols-3">
            {pricingPackages.slice(0, 3).map((band) => (
              <StaggerItem key={band.title}>
                <div className="section-panel-alt flex h-full flex-col p-6">
                  <div className="mb-4 h-px w-16 bg-primary/70" />
                  <p className="eyebrow">{band.title}</p>
                  <h3 className="mt-4 min-h-[5.8rem] font-display text-4xl font-semibold leading-[0.95] tracking-tight">
                    {band.range}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
                    {band.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding">
        <div className="container grid gap-10 lg:grid-cols-[0.38fr_0.62fr]">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Clear answers before we start."
              description="A few common questions about pricing, timelines, support, and what working with tribo looks like."
            />
          </div>
          <Reveal>
            <FaqList items={faqPreview} />
            <Button asChild variant="outline" className="mt-6">
              <Link href="/faq">
                View all questions <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <CtaSection />

      <ContactSection />
    </main>
  );
}
