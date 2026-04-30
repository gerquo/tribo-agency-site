"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import type { PricingEstimatorContent } from "@/lib/pricing-content";
import type { ModifierOption, ProjectTypeOption } from "@/lib/pricing";
import { cn } from "@/lib/utils";

type OptionGroup =
  | "projectTypes"
  | "scopeLevels"
  | "contentSupport"
  | "integrations"
  | "timeline";

type SelectionState = Record<OptionGroup, string>;

function formatCedi(value: number) {
  return `GH₵${value.toLocaleString("en-GH")}`;
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

export function PricingEstimator({
  options
}: {
  options: PricingEstimatorContent;
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

    const floor = Math.max(35000, Math.round(subtotal * 0.9 / 100) * 100);
    const ceiling = Math.round(subtotal * 1.2 / 100) * 100;

    return {
      floor,
      ceiling,
      summary: [
        projectType.label,
        scopeLevel.label,
        contentSupport.label,
        integrationLevel.label,
        timeline.label
      ]
    };
  }, [options, selection]);

  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <Reveal
        as="div"
        className="rounded-lg border border-border bg-card p-6 shadow-sm md:p-8"
      >
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
            Estimate planner
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
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
        className="rounded-lg border border-border bg-background p-6 shadow-sm md:p-8 lg:sticky lg:top-24 lg:h-fit"
      >
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
          Expected investment
        </p>
        <div className="mt-4 rounded-2xl border border-primary/15 bg-primary/8 p-5">
          <p className="text-sm text-muted-foreground">Estimated range</p>
          <p className="mt-2 text-4xl font-black tracking-tight">
            {formatCedi(estimate.floor)} - {formatCedi(estimate.ceiling)}
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Most projects land after discovery, which helps us confirm scope,
            content needs, and the right delivery plan.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-5">
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
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="mt-4 grid gap-3">
        {options[group].map((option) => {
          const active = option.id === selected;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={cn(
                "rounded-2xl border px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "border-primary bg-primary/8 shadow-sm"
                  : "border-border bg-background hover:border-primary/30 hover:bg-card"
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
                    active
                      ? "border-primary bg-primary"
                      : "border-border bg-transparent"
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
