"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ProjectFilter({
  projects,
  categories
}: {
  projects: Project[];
  categories?: string[];
}) {
  const [active, setActive] = useState("All");
  const availableCategories = useMemo(
    () => categories ?? ["All", ...new Set(projects.map((project) => project.category))],
    [categories, projects]
  );
  const projectCounts = useMemo(
    () =>
      availableCategories.reduce<Record<string, number>>((counts, category) => {
        counts[category] =
          category === "All"
            ? projects.length
            : projects.filter((project) => project.category === category)
                .length;
        return counts;
      }, {}),
    [availableCategories, projects]
  );
  const filtered = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((project) => project.category === active),
    [active, projects]
  );

  return (
    <div>
      <div
        className="mb-8 flex flex-wrap gap-2 rounded-lg border border-border bg-card/70 p-2"
        role="tablist"
        aria-label="Project categories"
      >
        {availableCategories.map((category) => (
          <Button
            key={category}
            type="button"
            variant={active === category ? "default" : "outline"}
            size="sm"
            className={cn(
              "h-10 min-w-24 justify-between gap-3 rounded-md border-transparent",
              active === category
                ? "shadow-sm"
                : "bg-transparent text-muted-foreground hover:bg-background hover:text-foreground"
            )}
            onClick={() => setActive(category)}
            role="tab"
            aria-selected={active === category}
          >
            <span>{category}</span>
            <span
              className={cn(
                "rounded-sm px-1.5 py-0.5 text-[0.68rem]",
                active === category
                  ? "bg-primary-foreground/16 text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {projectCounts[category]}
            </span>
          </Button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              initial={false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.32, delay: index * 0.04 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
          No projects are available in this category yet.
        </div>
      ) : null}
    </div>
  );
}
