import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { HeroAnimatedScene } from "@/components/hero-animated-scene";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { reasons } from "@/lib/data";
import { getProjects, getServices, getTrustedBrands } from "@/lib/content";
import { getPageMetadata, pageImages } from "@/lib/site";

const proofPoints = ["Fast Delivery", "Premium UX", "Scalable Systems", "Senior Execution"];

const serviceOverrides: Record<string, { title: string; description: string; eyebrow: string }> = {
  "Business Websites": {
    title: "Win trust faster",
    description: "High-credibility websites that turn visits into qualified inquiries.",
    eyebrow: "Business Websites"
  },
  "E-commerce Development": {
    title: "Sell with more clarity",
    description: "Refined storefronts that improve product discovery and buying confidence.",
    eyebrow: "E-commerce"
  },
  "Portfolio Websites": {
    title: "Show your work professionally",
    description: "Editorial portfolio sites that position your work and attract better-fit clients.",
    eyebrow: "Portfolio Sites"
  }
};

export const revalidate = 3600;

export const metadata: Metadata = getPageMetadata({
  title: "Premium Websites & Software",
  description:
    "tribo builds premium websites, software, and digital systems for businesses, organizations, and ambitious brands.",
  path: "/",
  image: pageImages.home
});

export default async function Home() {
  const [featuredProjects, homepageServices, homepageTrustedBrands] = await Promise.all([
    getProjects({ featuredOnly: true, publishedOnly: true, limit: 3 }),
    getServices(true),
    getTrustedBrands(true)
  ]);

  return (
    <main>
      <HeroAnimatedScene />

      <div className="border-y border-border/70 bg-background/72 backdrop-blur">
        <div className="container flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-4 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-muted-foreground sm:py-5">
          {proofPoints.map((item, index) => (
            <div key={item} className="flex items-center gap-3">
              <span>{item}</span>
              {index < proofPoints.length - 1 ? (
                <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <Reveal
        as="section"
        id="services"
        className="section-padding bg-card/40 pt-24 sm:pt-28 lg:pt-32"
      >
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <SectionHeading
              eyebrow="Services"
              title="Focused digital services for teams that need sharp execution."
              description="We design and build websites, software, and digital systems that feel premium, perform cleanly, and support real growth."
            />
            <div className="section-panel p-5">
              <p className="eyebrow">
                One tight team
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Strategy, interface design, engineering, and launch support shaped
                into one deliberate delivery process.
              </p>
              <Button asChild variant="outline" className="mt-5 w-fit">
                <Link href="/services">
                  View all services <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {homepageServices.slice(0, 3).map((service) => {
              const override = serviceOverrides[service.title];

              return (
                <StaggerItem key={service.title}>
                  <ServiceCard
                    {...service}
                    title={override?.title ?? service.title}
                    description={override?.description ?? service.description}
                    eyebrow={override?.eyebrow}
                  />
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Trusted by{" "}
            <span className="font-medium text-foreground">
              {homepageTrustedBrands
                .slice(0, 3)
                .map((brand) => brand.name)
                .join(", ")}
            </span>
            .
          </p>
        </div>
      </Reveal>

      <Reveal
        as="section"
        id="work"
        className="section-padding"
      >
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <SectionHeading
              eyebrow="Featured Projects"
              title="Selected work built to convert, clarify, and scale."
              description="A tighter look at recent launches across business websites, commerce, and software products."
            />
            <div className="section-panel-alt p-5">
              <p className="eyebrow">
                What this shows
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Clear positioning, stronger product presentation, and interfaces
                built to earn trust quickly.
              </p>
              <Button asChild variant="outline" className="mt-5 w-fit">
                <Link href="/portfolio">
                  Explore portfolio <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
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
      </Reveal>

      <Reveal
        as="section"
        className="section-padding bg-card/40"
      >
        <div className="container">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="A compact team with premium standards and dependable delivery."
            description="Everything is shaped around clarity, performance, and digital work that helps ambitious teams move forward with confidence."
            align="center"
          />

          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {reasons.slice(0, 4).map((reason) => (
              <StaggerItem key={reason.title}>
                <div className="section-panel flex h-full flex-col p-6">
                  <p className="eyebrow">
                    Standard
                  </p>
                  <reason.icon className="h-7 w-7 text-primary" />
                  <h3 className="mt-5 min-h-[3.25rem] text-lg font-bold">{reason.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                    {reason.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Reveal>

      <Reveal
        as="section"
        data-nav-theme="dark"
        className="relative overflow-hidden border-y border-border bg-primary py-16 text-primary-foreground"
        y={16}
        amount={0.2}
        duration={0.48}
      >
        <div className="container flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary-foreground/78">
              Ready when you are
            </p>
            <h2 className="text-3xl font-black tracking-tight text-balance sm:text-5xl">
              Ready for a sharper digital presence that actually performs?
            </h2>
            <p className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground/80 sm:text-base">
              Strategy, design, engineering, and launch support in one place
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                Start a Project <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="/pricing">View Pricing Guide</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
