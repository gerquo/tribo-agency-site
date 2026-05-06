"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Braces,
  CheckCircle2,
  Code2,
  Monitor,
  MousePointer2,
  Rocket,
  Smartphone
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";

const orbitCards = [
  {
    id: "systems",
    label: "Systems",
    className:
      "left-[4%] top-[20%] hidden w-40 rounded-[1.4rem] border border-border/80 bg-background/88 p-4 shadow-premium backdrop-blur lg:block"
  },
  {
    id: "launch",
    label: "Launch",
    className:
      "right-[6%] top-[18%] hidden w-44 rounded-[1.4rem] border border-primary/16 bg-primary/10 p-4 shadow-premium backdrop-blur lg:block"
  },
  {
    id: "growth",
    label: "Growth",
    className:
      "left-[9%] bottom-[12%] hidden w-36 rounded-[1.4rem] border border-border/80 bg-background/88 p-4 shadow-premium backdrop-blur xl:block"
  }
];

const floatingIcons = [
  {
    id: "cursor",
    icon: MousePointer2,
    className:
      "left-[14%] top-[47%] hidden h-12 w-12 rounded-full border border-border bg-card/90 text-foreground shadow-sm backdrop-blur md:flex"
  },
  {
    id: "bars",
    icon: BarChart3,
    className:
      "right-[15%] top-[46%] hidden h-12 w-12 rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-sm md:flex"
  },
  {
    id: "braces",
    icon: Braces,
    className:
      "left-[21%] bottom-[10%] hidden h-12 w-12 rounded-2xl border border-border bg-card/90 text-foreground shadow-sm lg:flex"
  },
  {
    id: "monitor",
    icon: Monitor,
    className:
      "right-[18%] bottom-[13%] hidden h-12 w-12 rounded-xl border border-border bg-background/90 text-foreground shadow-sm lg:flex"
  }
];

function float(duration: number, delay = 0) {
  return {
    duration,
    delay,
    repeat: Number.POSITIVE_INFINITY,
    repeatType: "mirror" as const,
    ease: "easeInOut"
  };
}

export function HeroAnimatedScene() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      data-nav-theme="light"
      className="relative overflow-hidden bg-background pt-20 sm:pt-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,hsl(var(--primary)/0.12),transparent_30%),radial-gradient(circle_at_84%_16%,hsl(var(--accent)/0.12),transparent_22%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--background)))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-full opacity-40 [background-image:linear-gradient(to_right,hsl(var(--border)/0.16)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.12)_1px,transparent_1px)] [background-size:52px_52px]"
      />

      <div className="container relative flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center pb-20 pt-10 text-center lg:pb-28">
        <div className="absolute inset-0" aria-hidden="true">
          {orbitCards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`absolute ${card.className}`}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, index % 2 === 0 ? -12 : 12, 0],
                      rotate: [0, index % 2 === 0 ? 2 : -2, 0]
                    }
              }
              transition={reduceMotion ? undefined : float(7 + index, index * 0.18)}
            >
              <p className="text-[0.64rem] font-bold uppercase tracking-[0.22em] text-primary">
                {card.label}
              </p>
              <div className="mt-4 space-y-2.5">
                <div className="h-2 rounded-full bg-primary/15" />
                <div className="h-2 rounded-full bg-border/75" />
                <div className="h-2 w-2/3 rounded-full bg-accent/30" />
              </div>
            </motion.div>
          ))}

          {floatingIcons.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                className={`absolute items-center justify-center ${item.className}`}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, index % 2 === 0 ? -10 : 10, 0],
                        rotate: [0, index % 2 === 0 ? -6 : 6, 0]
                      }
                }
                transition={reduceMotion ? undefined : float(6 + index, index * 0.16)}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative z-10 mx-auto max-w-5xl"
        >
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
            Web development | Accra, Ghana | Global reach
          </p>
          <h1 className="mx-auto mt-6 max-w-[11ch] font-display text-5xl font-semibold leading-[0.9] tracking-tight text-foreground sm:text-6xl md:text-7xl xl:text-[6rem]">
            Get more customers online with a website that actually converts.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            We build high-performance websites and web applications that help you
            attract more customers, build trust, grow faster, and drive sales.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/audit">
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
          className="relative z-10 mt-14 w-full max-w-[38rem] sm:max-w-[42rem] lg:mt-16 lg:max-w-[46rem]"
        >
          <motion.div
            className="relative rounded-[2rem] border border-border/80 bg-card/92 p-4 shadow-premium backdrop-blur sm:p-5"
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={reduceMotion ? undefined : float(7)}
          >
            <div className="flex items-center justify-between border-b border-border/70 px-1 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary/40" />
              </div>
              <div className="h-2.5 w-24 rounded-full bg-border/80" />
            </div>

            <div className="grid gap-4 pt-4 sm:grid-cols-[0.74fr_1fr]">
              <div className="space-y-4">
                {[
                  { value: "5+", label: "Projects delivered" },
                  { value: "95%", label: "Client satisfaction" },
                  { value: "3x", label: "Avg. traffic growth" }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="rounded-[1.35rem] border border-border/70 bg-background/86 p-4 shadow-sm"
                    animate={
                      reduceMotion
                        ? undefined
                        : { y: [0, index % 2 === 0 ? -4 : 4, 0] }
                    }
                    transition={reduceMotion ? undefined : float(6 + index, index * 0.14)}
                  >
                    <p className="font-display text-4xl font-semibold leading-none sm:text-[2.7rem]">
                      {item.value}
                    </p>
                    <p className="mt-3 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-[1.5rem] border border-border/70 bg-background/84 p-4 shadow-sm">
                <div className="grid gap-4">
                  <div className="grid grid-cols-[1fr_auto] gap-4">
                    <div className="rounded-[1.2rem] border border-border/70 bg-card/88 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                          <Braces className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-2.5 w-24 rounded-full bg-primary/18" />
                          <div className="h-2.5 w-14 rounded-full bg-border/70" />
                        </div>
                      </div>
                      <div className="mt-4 space-y-2.5">
                        <div className="h-2 rounded-full bg-border/70" />
                        <div className="h-2 rounded-full bg-border/70" />
                        <div className="h-2 w-4/5 rounded-full bg-accent/24" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <motion.div
                        className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] border border-primary/20 bg-primary/10 text-primary"
                        animate={reduceMotion ? undefined : { rotate: [0, -4, 4, 0] }}
                        transition={reduceMotion ? undefined : float(6)}
                      >
                        <MousePointer2 className="h-8 w-8" />
                      </motion.div>
                      <motion.div
                        className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] border border-accent/25 bg-accent/10 text-foreground"
                        animate={reduceMotion ? undefined : { rotate: [0, 4, -4, 0] }}
                        transition={reduceMotion ? undefined : float(7, 0.2)}
                      >
                        <Rocket className="h-8 w-8" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                    <div className="h-px bg-gradient-to-r from-primary/70 via-border to-accent/70" />
                    <div className="h-3 w-3 rounded-full bg-accent" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.2rem] border border-border/70 bg-card/88 p-4">
                      <div className="flex items-center justify-between">
                        <Smartphone className="h-6 w-6 text-primary" />
                        <span className="h-2.5 w-10 rounded-full bg-accent/35" />
                      </div>
                      <div className="mt-4 space-y-2.5">
                        <div className="h-2 rounded-full bg-border/70" />
                        <div className="h-2 w-3/4 rounded-full bg-border/70" />
                      </div>
                    </div>

                    <div className="rounded-[1.2rem] border border-border/70 bg-card/88 p-4">
                      <div className="flex items-center justify-between">
                        <BarChart3 className="h-6 w-6 text-primary" />
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      </div>
                      <div className="mt-4 flex items-end gap-2">
                        <div className="h-6 w-3 rounded-full bg-primary/30" />
                        <div className="h-10 w-3 rounded-full bg-primary/55" />
                        <div className="h-14 w-3 rounded-full bg-accent/70" />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.2rem] border border-border/70 bg-card/88 p-4 text-left">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[0.64rem] font-bold uppercase tracking-[0.2em] text-primary">
                          Built for growth
                        </p>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          Serious digital systems for businesses that want more trust,
                          better leads, and cleaner execution.
                        </p>
                      </div>
                      <Monitor className="mt-1 h-5 w-5 text-primary" />
                    </div>

                    <div className="mt-4 grid gap-3">
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
              </div>
            </div>

            <motion.div
              className="absolute -bottom-5 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-[1.35rem] border border-primary/20 bg-background shadow-premium"
              animate={reduceMotion ? undefined : { rotate: [0, 6, -6, 0] }}
              transition={reduceMotion ? undefined : float(5)}
            >
              <Code2 className="h-8 w-8 text-primary" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
