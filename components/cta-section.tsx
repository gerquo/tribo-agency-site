import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
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
          <p className="text-sm font-bold uppercase tracking-[0.22em] opacity-80">
            Start with clarity
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-balance sm:text-5xl">
            Have a project in mind? Let&apos;s build something modern,
            functional, and impactful.
          </h2>
          <p className="mt-5 text-base leading-8 opacity-85 sm:text-lg">
            Bring us your goals, constraints, and vision. We will help turn them
            into a digital product that looks premium and works reliably.
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
            <Link href="/portfolio">View Portfolio</Link>
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
