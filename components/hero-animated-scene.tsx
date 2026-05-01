"use client";

import Link from "next/link";
import {
  ArrowRight,
  Braces,
  Boxes,
  Code2,
  Monitor,
  MousePointer2,
  Rocket,
  Smartphone,
  Sparkles
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/data";

const floatingElements = [
  {
    id: "code",
    icon: Code2,
    className:
      "left-[5%] top-28 hidden h-12 w-12 rounded-xl border border-primary/15 bg-background/85 text-primary shadow-sm backdrop-blur md:flex"
  },
  {
    id: "sparkles",
    icon: Sparkles,
    className:
      "right-[9%] top-24 hidden h-12 w-12 rounded-full border border-accent/25 bg-accent/10 text-accent shadow-sm lg:flex"
  },
  {
    id: "cursor",
    icon: MousePointer2,
    className:
      "left-[13%] top-[54%] hidden h-12 w-12 rounded-full border border-border bg-card/90 text-foreground shadow-sm backdrop-blur sm:flex"
  },
  {
    id: "boxes",
    icon: Boxes,
    className:
      "right-[14%] top-[50%] hidden h-12 w-12 rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-sm md:flex"
  },
  {
    id: "braces",
    icon: Braces,
    className:
      "left-[10%] bottom-24 hidden h-12 w-12 rounded-2xl border border-border bg-card/90 text-foreground shadow-sm lg:flex"
  },
  {
    id: "monitor",
    icon: Monitor,
    className:
      "right-[6%] bottom-28 hidden h-12 w-12 rounded-xl border border-border bg-background/90 text-foreground shadow-sm md:flex"
  },
  {
    id: "mini-window",
    icon: Monitor,
    className:
      "left-[18%] top-[22%] hidden h-10 w-10 rounded-lg border border-border/80 bg-background/80 text-muted-foreground shadow-sm xl:flex"
  },
  {
    id: "rocket",
    icon: Rocket,
    className:
      "right-[19%] bottom-[18%] hidden h-11 w-11 rounded-full border border-accent/20 bg-accent/10 text-accent shadow-sm xl:flex"
  }
];

const orbitCards = [
  {
    id: "strategy",
    label: "Systems",
    accent: "bg-primary/80",
    className:
      "left-[9%] top-[32%] hidden w-40 rounded-[1.25rem] border border-border/80 bg-background/88 p-4 shadow-premium backdrop-blur md:block"
  },
  {
    id: "launch",
    label: "Launch",
    accent: "bg-accent/80",
    className:
      "right-[11%] top-[30%] hidden w-44 rounded-[1.25rem] border border-border/80 bg-card/88 p-4 shadow-premium backdrop-blur md:block"
  },
  {
    id: "growth",
    label: "Growth",
    accent: "bg-primary/70",
    className:
      "right-[18%] bottom-[15%] hidden w-36 rounded-[1.25rem] border border-primary/15 bg-primary/10 p-4 shadow-premium backdrop-blur lg:block"
  }
];

function floatTransition(duration: number, delay = 0) {
  return {
    duration,
    repeat: Number.POSITIVE_INFINITY,
    repeatType: "mirror" as const,
    ease: "easeInOut",
    delay
  };
}

export function HeroAnimatedScene() {
  const reduceMotion = useReducedMotion();

  return (
    <section data-nav-theme="light" className="relative overflow-hidden bg-background">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.14),transparent_40%),radial-gradient(circle_at_82%_18%,hsl(var(--accent)/0.12),transparent_22%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--background)))] dark:bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.16),transparent_42%),radial-gradient(circle_at_82%_18%,hsl(var(--accent)/0.12),transparent_20%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--background)))]" />
        <div className="absolute inset-x-0 top-0 h-full opacity-55 [background-image:linear-gradient(to_right,hsl(var(--border)/0.16)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.12)_1px,transparent_1px)] [background-size:54px_54px]" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-background via-background/85 to-transparent" />
      </div>

      <div className="container relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden pb-20 pt-16 text-center sm:pb-24 sm:pt-20 lg:min-h-[min(980px,calc(100vh-4rem))] lg:pb-28 lg:pt-24">
        <div className="absolute inset-0" aria-hidden="true">
          {floatingElements.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                className={`absolute items-center justify-center ${item.className}`}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, index % 2 === 0 ? -14 : 14, 0],
                        rotate: [0, index % 2 === 0 ? -5 : 5, 0],
                        opacity: [0.65, 1, 0.7]
                      }
                }
                transition={reduceMotion ? undefined : floatTransition(7 + index, index * 0.2)}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
            );
          })}

          {orbitCards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`absolute ${card.className}`}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, index % 2 === 0 ? 18 : -18, 0],
                      rotate: [0, index % 2 === 0 ? 3 : -3, 0]
                    }
              }
              transition={reduceMotion ? undefined : floatTransition(8 + index, index * 0.35)}
            >
              <div className="flex items-center justify-between">
                <span className={`h-2.5 w-2.5 rounded-full ${card.accent}`} />
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                  {card.label}
                </span>
              </div>
              <div className="mt-4 space-y-2.5">
                <div className="h-2 rounded-full bg-primary/15" />
                <div className="h-2 rounded-full bg-border/70" />
                <div className="h-2 w-2/3 rounded-full bg-accent/25" />
              </div>
            </motion.div>
          ))}

          <motion.div
            className="absolute left-[7%] top-[19%] hidden h-px w-24 bg-gradient-to-r from-transparent via-primary/55 to-transparent lg:block"
            animate={reduceMotion ? undefined : { opacity: [0.2, 0.8, 0.2], scaleX: [0.9, 1.1, 0.9] }}
            transition={reduceMotion ? undefined : floatTransition(9)}
          />
          <motion.div
            className="absolute right-[12%] bottom-[23%] hidden h-px w-28 bg-gradient-to-r from-transparent via-accent/65 to-transparent lg:block"
            animate={reduceMotion ? undefined : { opacity: [0.3, 0.85, 0.3], scaleX: [0.94, 1.05, 0.94] }}
            transition={reduceMotion ? undefined : floatTransition(10, 0.8)}
          />
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-5xl"
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/12 bg-background/85 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            {site.name}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-muted-foreground sm:text-[0.72rem]">
            <span>Web Development</span>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
            <span>Software Systems</span>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
            <span>Product Design</span>
          </div>
          <h1 className="mx-auto mt-7 max-w-5xl font-display text-balance text-5xl font-semibold leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6.15rem]">
            We Build Digital Experiences That Help Brands Grow
          </h1>
          <p className="mx-auto mt-5 max-w-[46rem] text-balance text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 lg:text-lg">
            Modern websites, software, and creative digital solutions for businesses,
            organizations, and individuals with serious growth goals.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="min-w-[12rem] rounded-full px-7 shadow-premium">
              <Link href="/contact">
                Start a Project <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <div className="rounded-full border border-border/80 bg-background/80 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
              Strategy, UX, engineering, launch, and support
            </div>
          </div>
          <div className="mt-9 grid gap-3 text-left sm:grid-cols-3 sm:text-center">
            {[
              { label: "Editorial-grade presentation", value: "Premium visual systems" },
              { label: "Product-minded execution", value: "Clean scalable architecture" },
              { label: "Designed for growth", value: "Conversion-ready digital journeys" }
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border/80 bg-background/72 px-4 py-4 shadow-sm backdrop-blur"
              >
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground sm:text-[0.95rem]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="relative z-10 mt-12 w-full max-w-[19rem] sm:mt-14 sm:max-w-[24rem] md:max-w-[28rem] lg:max-w-[34rem]"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -10, 0],
                  scale: [1, 1.015, 1]
                }
          }
          transition={reduceMotion ? undefined : floatTransition(6)}
        >
          <div className="relative mx-auto aspect-square">
            <div className="absolute inset-[10%] rounded-[2.25rem] bg-gradient-to-br from-primary/18 via-background to-accent/14 blur-3xl" />
            <div className="absolute left-1/2 top-[8%] h-20 w-20 -translate-x-1/2 rounded-full bg-primary/10 blur-2xl dark:bg-primary/14" />

            <div className="absolute left-1/2 top-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-border/85 bg-card/95 shadow-premium backdrop-blur">
              <div className="flex items-center justify-between border-b border-border/70 px-4 py-3 sm:px-5 sm:py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <span className="h-2.5 w-2.5 rounded-full bg-primary/40" />
                </div>
                <div className="h-2.5 w-20 rounded-full bg-border/70 sm:w-24" />
              </div>

              <div className="relative h-full px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
                <div className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4">
                  <div className="rounded-2xl border border-border/70 bg-background/90 p-3 sm:p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/12 text-primary sm:h-11 sm:w-11">
                        <Braces className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2.5 w-20 rounded-full bg-primary/18 sm:w-24" />
                        <div className="h-2.5 w-14 rounded-full bg-border/70 sm:w-16" />
                      </div>
                    </div>
                    <div className="mt-4 grid gap-2.5">
                      <div className="h-2 rounded-full bg-border/70" />
                      <div className="h-2 rounded-full bg-border/70" />
                      <div className="h-2 w-4/5 rounded-full bg-accent/24" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary sm:h-16 sm:w-16">
                      <MousePointer2 className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/15 text-foreground sm:h-16 sm:w-16">
                      <Rocket className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <div className="h-px bg-gradient-to-r from-primary/70 via-border to-accent/70" />
                  <div className="h-3 w-3 rounded-full bg-accent" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="rounded-2xl border border-border/70 bg-background/90 p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <Smartphone className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                      <span className="h-2.5 w-10 rounded-full bg-accent/35" />
                    </div>
                    <div className="mt-4 space-y-2.5">
                      <div className="h-2 rounded-full bg-border/70" />
                      <div className="h-2 w-3/4 rounded-full bg-border/70" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-background/90 p-3 sm:p-4">
                    <div className="flex items-center justify-between">
                      <Monitor className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                      <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    </div>
                    <div className="mt-4 flex items-end gap-2">
                      <div className="h-6 w-3 rounded-full bg-primary/35" />
                      <div className="h-10 w-3 rounded-full bg-primary/55" />
                      <div className="h-14 w-3 rounded-full bg-accent/70" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-border/70 bg-background/90 px-4 py-3">
                  <div className="flex items-center justify-between gap-3 text-left">
                    <div>
                      <p className="text-[0.64rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        Growth signal
                      </p>
                      <p className="mt-1 text-sm font-semibold sm:text-[0.95rem]">
                        Conversion-focused launch stack
                      </p>
                    </div>
                    <div className="flex items-end gap-1.5">
                      <div className="h-4 w-2 rounded-full bg-primary/30" />
                      <div className="h-7 w-2 rounded-full bg-primary/45" />
                      <div className="h-10 w-2 rounded-full bg-accent/70" />
                    </div>
                  </div>
                </div>

                <motion.div
                  className="absolute -bottom-4 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-[1.35rem] border border-primary/20 bg-background shadow-premium sm:h-16 sm:w-16 sm:rounded-[1.5rem]"
                  animate={reduceMotion ? undefined : { rotate: [0, 6, -6, 0] }}
                  transition={reduceMotion ? undefined : floatTransition(5)}
                >
                  <Boxes className="h-7 w-7 text-primary sm:h-8 sm:w-8" />
                </motion.div>
              </div>
            </div>

            <div className="absolute left-2 top-[26%] rounded-full border border-border/70 bg-background/88 px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-muted-foreground shadow-sm backdrop-blur sm:left-0 sm:px-4">
              UI systems
            </div>
            <div className="absolute bottom-[18%] right-2 rounded-full border border-border/70 bg-background/88 px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-muted-foreground shadow-sm backdrop-blur sm:right-0 sm:px-4">
              Product launch
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
