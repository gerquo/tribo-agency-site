"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/logo-mark";

const heroStats = [
  { value: "5+", label: "Projects delivered" },
  { value: "95%", label: "Client satisfaction" },
  { value: "3×", label: "Average traffic growth" }
];

export function HeroAnimatedScene() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      data-nav-theme="light"
      className="relative overflow-hidden bg-background pt-20 sm:pt-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,hsl(var(--primary)/0.08),transparent_28%),radial-gradient(circle_at_90%_18%,hsl(var(--accent)/0.08),transparent_20%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--background)))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-full opacity-45 [background-image:linear-gradient(to_right,hsl(var(--border)/0.16)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.12)_1px,transparent_1px)] [background-size:52px_52px]"
      />

      <div className="container relative grid min-h-[calc(100vh-5rem)] gap-12 pb-20 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl"
        >
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
            Web development · Accra, Ghana · Global reach
          </p>
          <h1 className="mt-6 max-w-[11ch] font-display text-5xl font-semibold leading-[0.9] tracking-tight text-foreground sm:text-6xl md:text-7xl xl:text-[6.1rem]">
            Get more customers online with a website that actually converts.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            We build high-performance websites and web applications that help you
            attract more customers, build trust, grow faster, and drive sales.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Get a Free Website Audit <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, delay: 0.06 }}
          className="relative"
        >
          <div className="grid gap-5 md:grid-cols-[0.8fr_1fr]">
            <div className="space-y-5">
              {heroStats.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="section-panel p-5"
                  animate={
                    reduceMotion
                      ? undefined
                      : { y: [0, index % 2 === 0 ? -6 : 6, 0] }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          duration: 6 + index,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "mirror",
                          ease: "easeInOut"
                        }
                  }
                >
                  <p className="font-display text-4xl font-semibold leading-none sm:text-5xl">
                    {item.value}
                  </p>
                  <p className="mt-3 text-[0.74rem] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="section-panel-alt flex flex-col justify-between p-6"
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 7,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "mirror",
                      ease: "easeInOut"
                    }
              }
            >
              <div className="rounded-2xl border border-border/70 bg-background/70 p-5">
                <LogoMark compact className="mb-6" />
                <div className="space-y-4">
                  <div>
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-primary">
                      Built for growth
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Serious digital systems for businesses that want more trust,
                      better leads, and cleaner execution.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    {[
                      "High-converting websites",
                      "Custom web applications",
                      "SEO and performance foundations",
                      "Paystack, MoMo, and modern integrations"
                    ].map((item) => (
                      <div key={item} className="flex gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-primary/14 bg-primary/8 p-5">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-primary">
                  Built in Ghana
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  We understand the real constraints, customer behavior, and
                  growth opportunities African businesses deal with every day.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
