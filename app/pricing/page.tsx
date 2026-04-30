import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { CtaSection } from "@/components/cta-section";
import { PageHeader } from "@/components/page-header";
import { PricingEstimator } from "@/components/pricing-estimator";
import { Button } from "@/components/ui/button";
import {
  getPricingEstimatorContent,
  getPricingFactors,
  getPricingPackages
} from "@/lib/pricing-content";
import { getPageMetadata, pageImages } from "@/lib/site";

export const metadata: Metadata = getPageMetadata({
  title: "Pricing",
  description:
    "Get a fair idea of website and software pricing at NovaCraft Digital, including what affects cost and what to expect for different project scopes.",
  path: "/pricing",
  image: pageImages.pricing
});

export const revalidate = 3600;

export default async function PricingPage() {
  const [pricingPackages, pricingFactors, estimatorOptions] = await Promise.all([
    getPricingPackages(true),
    getPricingFactors(true),
    getPricingEstimatorContent(true)
  ]);

  return (
    <main>
      <PageHeader
        label="PRICING"
        title="Clearer expectations before you start a project."
        subtitle="Every engagement is scoped around goals, complexity, content, and timeline. This page gives you realistic starting ranges and a better sense of what drives budget."
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="section-padding">
        <StaggerContainer className="container grid gap-6 lg:grid-cols-3">
          {pricingPackages.map((band) => (
            <StaggerItem key={band.title}>
              <article className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                  {band.title}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight">
                  {band.range}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {band.description}
                </p>
                <div className="mt-6 grid gap-3">
                  {band.includes.map((item) => (
                    <p key={item} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </p>
                  ))}
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="section-padding bg-card/45">
        <div className="container">
          <PricingEstimator options={estimatorOptions} />
        </div>
      </section>

      <section className="section-padding">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal as="div">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
              What changes the price
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Scope matters more than labels.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Two business websites can have very different budgets depending on
              content readiness, number of templates, integrations, approvals,
              and whether the project also includes UX strategy or support after launch.
            </p>
          </Reveal>
          <Reveal as="div" className="rounded-lg border border-border bg-card p-6 shadow-sm" delay={0.05}>
            <StaggerContainer className="grid gap-4">
              {pricingFactors.map((factor) => (
                <StaggerItem key={factor.text}>
                  <div className="rounded-2xl border border-border bg-background px-4 py-4 text-sm text-muted-foreground">
                    <div className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{factor.text}</span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-card/45">
        <Reveal className="container rounded-lg border border-border bg-background p-8 shadow-sm lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                Need a firmer number?
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                The fastest path to a real quote is a clear brief.
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                If you can share your project type, goals, target launch date,
                references, and budget range, we can turn the estimate into a more
                tailored proposal and suggest the best path forward.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact">
                  Start a Project <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/portfolio">View Project Examples</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaSection />
    </main>
  );
}
