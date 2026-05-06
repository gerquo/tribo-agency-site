import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <Reveal
      as="section"
      data-nav-theme="dark"
      className="relative overflow-hidden border-y border-white/10 bg-[hsl(246_24%_15%)] py-20 text-white"
      y={16}
      amount={0.2}
      duration={0.48}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.24),transparent_34%),radial-gradient(circle_at_82%_18%,hsl(var(--accent)/0.18),transparent_18%)]" />
      <div className="container relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
            Ready to grow beyond borders?
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[0.95] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Let&apos;s build the website or product your business should have had already.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
            No sales pressure. No bloated process. Just clear advice, strong execution,
            and digital systems built to help your business grow.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" variant="secondary">
            <Link href="/pricing">
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/18 bg-white/5 text-white hover:bg-white hover:text-[hsl(246_24%_15%)]"
          >
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
