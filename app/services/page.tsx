import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { CtaSection } from "@/components/cta-section";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/content";
import { getPageMetadata, pageImages } from "@/lib/site";

export const metadata: Metadata = getPageMetadata({
  title: "Services",
  description:
    "Explore NovaCraft Digital services including business websites, e-commerce, portfolio websites, organization websites, custom web applications, redesigns, and support.",
  path: "/services",
  image: pageImages.services
});

export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await getServices(true);

  return (
    <main>
      <PageHeader
        label="SERVICES"
        title="Our Services"
        subtitle="Premium digital services for websites, software, and growth systems. Choose a focused engagement or combine services into a complete strategy, design, development, and launch partnership."
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="section-padding">
        <div className="container grid gap-6">
          {services.length === 0 ? (
            <Reveal className="rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
              No services are published yet. Please check back soon.
            </Reveal>
          ) : null}
          <StaggerContainer className="grid gap-6">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <article
                  id={service.href.split("#")[1]}
                  className="interactive-card grid gap-8 rounded-lg border border-border bg-card p-6 shadow-sm md:p-8 lg:grid-cols-[0.8fr_1.2fr]"
                >
                  <div className="flex h-full flex-col">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/12 text-primary">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h2 className="mt-5 min-h-[7.75rem] max-w-[12ch] display-title text-4xl leading-[0.96]">
                      {service.title}
                    </h2>
                    <p className="mt-4 flex-1 leading-8 text-muted-foreground">
                      {service.description}
                    </p>
                    <Button asChild className="mt-6">
                      <Link href="/contact">
                        Request This Service <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="interactive-card flex h-full flex-col rounded-lg border border-border bg-background p-5">
                      <h3 className="display-title text-[1.45rem] leading-none">Key features</h3>
                      <div className="mt-4 grid flex-1 gap-3">
                        {service.features.map((feature) => (
                          <p key={feature} className="flex gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            {feature}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="interactive-card flex h-full flex-col rounded-lg border border-border bg-background p-5">
                      <h3 className="display-title min-h-[2rem] text-[1.45rem] leading-none">Who it is for</h3>
                      <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
                        {service.forWhom}
                      </p>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
