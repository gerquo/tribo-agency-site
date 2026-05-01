"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import type { PricingEstimatorContent } from "@/lib/pricing-content";
import type { ModifierOption, PricingPackage, ProjectTypeOption } from "@/lib/pricing";
import { cn } from "@/lib/utils";

type OptionGroup =
  | "projectTypes"
  | "scopeLevels"
  | "contentSupport"
  | "integrations"
  | "timeline";

type SelectionState = Record<OptionGroup, string>;

type ParsedRange = {
  min: number;
  max: number | null;
  openEnded: boolean;
};

function formatCedi(value: number) {
  return `GH₵${value.toLocaleString("en-GH")}`;
}

function roundToHundred(value: number) {
  return Math.round(value / 100) * 100;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function parsePriceRange(range: string): ParsedRange | null {
  const values = Array.from(range.matchAll(/\d[\d,]*/g)).map((match) =>
    Number(match[0].replace(/,/g, ""))
  );

  if (values.length === 0) {
    return null;
  }

  return {
    min: values[0],
    max: values[1] ?? null,
    openEnded: range.includes("+")
  };
}

function buildDefaults(options: PricingEstimatorContent): SelectionState {
  return {
    projectTypes: options.projectTypes[0]?.id ?? "",
    scopeLevels: options.scopeLevels[0]?.id ?? "",
    contentSupport: options.contentSupport[0]?.id ?? "",
    integrations: options.integrations[0]?.id ?? "",
    timeline: options.timeline[0]?.id ?? ""
  };
}

function getProjectType(options: PricingEstimatorContent, id: string): ProjectTypeOption {
  return options.projectTypes.find((item) => item.id === id) ?? options.projectTypes[0];
}

function getModifierOption(
  options: PricingEstimatorContent,
  group: Exclude<OptionGroup, "projectTypes">,
  id: string
): ModifierOption {
  return options[group].find((item) => item.id === id) ?? options[group][0];
}

function getNormalizedSubtotal(options: PricingEstimatorContent, subtotal: number) {
  const min =
    Math.min(...options.projectTypes.map((item) => item.base)) +
    Math.min(...options.scopeLevels.map((item) => item.modifier)) +
    Math.min(...options.contentSupport.map((item) => item.modifier)) +
    Math.min(...options.integrations.map((item) => item.modifier)) +
    Math.min(...options.timeline.map((item) => item.modifier));

  const max =
    Math.max(...options.projectTypes.map((item) => item.base)) +
    Math.max(...options.scopeLevels.map((item) => item.modifier)) +
    Math.max(...options.contentSupport.map((item) => item.modifier)) +
    Math.max(...options.integrations.map((item) => item.modifier)) +
    Math.max(...options.timeline.map((item) => item.modifier));

  if (max <= min) {
    return 0.5;
  }

  return clamp((subtotal - min) / (max - min), 0, 1);
}

export function PricingEstimator({
  options,
  packages
}: {
  options: PricingEstimatorContent;
  packages: PricingPackage[];
}) {
  const [selection, setSelection] = useState<SelectionState>(() => buildDefaults(options));

  const estimate = useMemo(() => {
    const projectType = getProjectType(options, selection.projectTypes);
    const scopeLevel = getModifierOption(options, "scopeLevels", selection.scopeLevels);
    const contentSupport = getModifierOption(options, "contentSupport", selection.contentSupport);
    const integrationLevel = getModifierOption(options, "integrations", selection.integrations);
    const timeline = getModifierOption(options, "timeline", selection.timeline);

    const subtotal =
      projectType.base +
      scopeLevel.modifier +
      contentSupport.modifier +
      integrationLevel.modifier +
      timeline.modifier;

    const normalized = getNormalizedSubtotal(options, subtotal);
    const packageRanges = packages
      .map((item) => parsePriceRange(item.range))
      .filter((item): item is ParsedRange => item !== null);

    let floor = roundToHundred(projectType.base);
    let ceiling = roundToHundred(projectType.base * 1.15);
    let showPlus = false;

    if (packageRanges.length > 0) {
      const overallMin = packageRanges[0].min;
      const lastRange = packageRanges[packageRanges.length - 1];
      const overallMax = lastRange.max ?? roundToHundred(lastRange.min * 1.35);
      const midpoint = overallMin + normalized * (overallMax - overallMin);
      const spread = clamp(midpoint * 0.2, 700, Math.max(1400, midpoint * 0.28));

      floor = roundToHundred(clamp(midpoint - spread / 2, overallMin, overallMax));
      ceiling = roundToHundred(
        clamp(
          midpoint + spread / 2,
          floor + 500,
          lastRange.openEnded ? overallMax + spread * 0.35 : overallMax
        )
      );
      showPlus = lastRange.openEnded && ceiling >= overallMax * 0.98;
    }

    return {
      floor,
      ceiling,
      showPlus,
      summary: [
        projectType.label,
        scopeLevel.label,
        contentSupport.label,
        integrationLevel.label,
        timeline.label
      ]
    };
  }, [options, packages, selection]);

  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <Reveal as="div" className="section-panel-alt p-6 md:p-8">
        <div>
          <p className="eyebrow">Estimate planner</p>
          <h2 className="mt-3 max-w-[12ch] font-display text-4xl font-semibold leading-[0.96] tracking-tight">
            Get a grounded budget range before we talk.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            This is not a hard quote. It is a planning tool to help you understand
            how scope, content needs, integrations, and timeline affect cost.
          </p>
        </div>

        <div className="mt-8 grid gap-8">
          <EstimatorGroup
            title="Project type"
            options={options}
            group="projectTypes"
            selected={selection.projectTypes}
            onSelect={(id) => setSelection((current) => ({ ...current, projectTypes: id }))}
          />
          <EstimatorGroup
            title="Scope"
            options={options}
            group="scopeLevels"
            selected={selection.scopeLevels}
            onSelect={(id) => setSelection((current) => ({ ...current, scopeLevels: id }))}
          />
          <EstimatorGroup
            title="Content support"
            options={options}
            group="contentSupport"
            selected={selection.contentSupport}
            onSelect={(id) => setSelection((current) => ({ ...current, contentSupport: id }))}
          />
          <EstimatorGroup
            title="Integrations"
            options={options}
            group="integrations"
            selected={selection.integrations}
            onSelect={(id) => setSelection((current) => ({ ...current, integrations: id }))}
          />
          <EstimatorGroup
            title="Timeline"
            options={options}
            group="timeline"
            selected={selection.timeline}
            onSelect={(id) => setSelection((current) => ({ ...current, timeline: id }))}
          />
        </div>
      </Reveal>

      <Reveal
        as="aside"
        delay={0.05}
        className="section-panel p-6 md:p-8 lg:sticky lg:top-24 lg:h-fit"
      >
        <p className="eyebrow">Expected investment</p>
        <div className="mt-4 rounded-2xl border border-primary/15 bg-primary/8 p-5 transition duration-300 hover:border-primary/25 hover:shadow-sm">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Estimated range
          </p>
          <p className="mt-3 min-h-[6.25rem] font-display text-5xl font-semibold leading-[0.92] tracking-tight">
            {formatCedi(estimate.floor)} - {formatCedi(estimate.ceiling)}
            {estimate.showPlus ? "+" : ""}
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Most projects land after discovery, which helps us confirm scope,
            content needs, and the right delivery plan.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-5 transition duration-300 hover:border-primary/15 hover:shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-muted-foreground">
            Based on
          </p>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            {estimate.summary.map((item) => (
              <p key={item} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          <Button asChild size="lg">
            <Link href="/contact">
              Request a tailored quote <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <p className="text-sm leading-7 text-muted-foreground">
            If you already know your scope, timeline, and goals, we can turn this
            into a more precise proposal after a short discovery conversation.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function EstimatorGroup({
  title,
  options,
  group,
  selected,
  onSelect
}: {
  title: string;
  options: PricingEstimatorContent;
  group: OptionGroup;
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h3 className="font-display text-[1.7rem] font-semibold tracking-tight">{title}</h3>
      <div className="mt-4 grid gap-3">
        {options[group].map((option) => {
          const active = option.id === selected;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={cn(
                "rounded-2xl border px-4 py-4 text-left transition-[transform,color,background-color,border-color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "border-primary bg-primary/8 shadow-sm"
                  : "border-border bg-background hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card hover:shadow-sm"
              )}
              aria-pressed={active}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground">{option.label}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {option.summary}
                  </p>
                </div>
                <span
                  className={cn(
                    "mt-1 h-3.5 w-3.5 rounded-full border",
                    active ? "border-primary bg-primary" : "border-border bg-transparent"
                  )}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
