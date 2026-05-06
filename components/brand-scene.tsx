import {
  BarChart3,
  BriefcaseBusiness,
  Braces,
  CircleHelp,
  Gauge,
  MessageSquareText,
  Rocket,
  ShoppingBag,
  Sparkles
} from "lucide-react";

import { cn } from "@/lib/utils";

type BrandSceneVariant =
  | "growth"
  | "services"
  | "portfolio"
  | "pricing"
  | "process"
  | "contact"
  | "faq"
  | "story";

const variantMap: Record<
  BrandSceneVariant,
  {
    icon: typeof Sparkles;
    label: string;
    title: string;
    chips: string[];
    statA: string;
    statB: string;
  }
> = {
  growth: {
    icon: Rocket,
    label: "Growth systems",
    title: "Designed to convert attention into action.",
    chips: ["Funnels", "Trust", "Performance"],
    statA: "Growth",
    statB: "Focus"
  },
  services: {
    icon: Braces,
    label: "Capabilities",
    title: "Websites, commerce, and product systems in one place.",
    chips: ["UX", "Engineering", "Support"],
    statA: "Web",
    statB: "Apps"
  },
  portfolio: {
    icon: BriefcaseBusiness,
    label: "Case studies",
    title: "Work packaged to show credibility and outcomes.",
    chips: ["Launches", "Redesigns", "Scale"],
    statA: "Case",
    statB: "Work"
  },
  pricing: {
    icon: Gauge,
    label: "Project scope",
    title: "Clearer ranges before a full proposal.",
    chips: ["Scope", "Timeline", "Complexity"],
    statA: "Budget",
    statB: "Guide"
  },
  process: {
    icon: Sparkles,
    label: "Delivery flow",
    title: "Strategy, build, and launch in a visible rhythm.",
    chips: ["Discover", "Build", "Launch"],
    statA: "Clear",
    statB: "Steps"
  },
  contact: {
    icon: MessageSquareText,
    label: "Start here",
    title: "Briefs move faster when the goals are clear.",
    chips: ["Goals", "Budget", "Timeline"],
    statA: "Quick",
    statB: "Reply"
  },
  faq: {
    icon: CircleHelp,
    label: "Common questions",
    title: "Answers framed around process, price, and support.",
    chips: ["Pricing", "Support", "Process"],
    statA: "FAQ",
    statB: "Guide"
  },
  story: {
    icon: BarChart3,
    label: "Built in Ghana",
    title: "Digital tools for businesses that want real momentum.",
    chips: ["Local insight", "Global polish", "Clear execution"],
    statA: "Local",
    statB: "Focus"
  }
};

export function BrandScene({
  variant,
  className
}: {
  variant: BrandSceneVariant;
  className?: string;
}) {
  const scene = variantMap[variant];
  const Icon = scene.icon;

  return (
    <div
      className={cn(
        "interactive-card relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-[linear-gradient(160deg,hsl(var(--card)/0.96),hsl(var(--background)/0.9))] p-6 shadow-premium",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.22),transparent_28%),radial-gradient(circle_at_bottom_left,hsl(var(--accent)/0.14),transparent_20%)]"
      />
      <div
        aria-hidden="true"
        className="absolute right-[-3.5rem] top-[-3rem] h-36 w-36 rounded-full border border-primary/12"
      />
      <div
        aria-hidden="true"
        className="absolute right-6 top-5 h-20 w-20 rounded-full border border-border/35"
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-primary/12 text-primary">
            <Icon className="h-7 w-7" />
          </div>
          <div className="rounded-2xl border border-[hsl(42_48%_56%/0.42)] bg-[linear-gradient(155deg,hsl(45_76%_61%),hsl(41_62%_48%))] px-4 py-3 text-right text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[hsl(244_24%_14%)] shadow-[0_18px_32px_hsl(42_72%_52%/0.24)]">
            <div className="font-display text-3xl leading-none tracking-tight">{scene.statA}</div>
            <div className="mt-1">{scene.statB}</div>
          </div>
        </div>

        <p className="mt-8 text-[0.7rem] font-bold uppercase tracking-[0.24em] text-primary">
          {scene.label}
        </p>
        <h3 className="mt-4 max-w-[15ch] font-display text-3xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-[2.2rem]">
          {scene.title}
        </h3>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {scene.chips.map((chip, index) => (
            <div
              key={chip}
              className={cn(
                "rounded-2xl border border-border/70 px-3 py-3 text-sm font-medium text-muted-foreground backdrop-blur",
                index === 1 ? "bg-primary/10 text-foreground" : "bg-background/66"
              )}
            >
              {chip}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-end gap-2">
          <div className="h-8 w-3 rounded-full bg-primary/25" />
          <div className="h-12 w-3 rounded-full bg-primary/45" />
          <div className="h-16 w-3 rounded-full bg-primary/68" />
          <div className="ml-3 h-px flex-1 bg-gradient-to-r from-primary/70 via-border to-accent/70" />
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-background/70 text-primary">
            {variant === "services" ? (
              <ShoppingBag className="h-5 w-5" />
            ) : (
              <Sparkles className="h-5 w-5" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
