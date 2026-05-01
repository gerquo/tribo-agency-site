import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Layers3 } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/lib/data";
import { isPlaceholderExternalUrl } from "@/lib/utils";

export function ProjectCard({
  project,
  compact = false
}: {
  project: Project;
  compact?: boolean;
}) {
  const caseStudyHref = project.caseStudyUrl || `/projects/${project.slug}`;
  const isExternalCaseStudy = /^https?:\/\//.test(caseStudyHref);
  const showLivePreview = !isPlaceholderExternalUrl(project.liveUrl);
  const supportingCopy = compact ? project.summary : project.description;
  const technologies = compact ? project.technologies.slice(0, 3) : project.technologies;

  return (
    <Reveal as="article" className="h-full">
      <Card className="group overflow-hidden rounded-lg border-border/85 bg-card/90 transition duration-300 hover:-translate-y-1 hover:border-primary/24 hover:shadow-premium">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} project preview`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md border border-white/20 bg-background/86 px-3 py-1 text-xs font-semibold backdrop-blur">
            <Layers3 className="h-3.5 w-3.5 text-primary" />
            <span>{project.category}</span>
          </div>
          {showLivePreview ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-background/86 opacity-0 shadow-sm backdrop-blur transition duration-300 hover:bg-primary hover:text-primary-foreground group-hover:opacity-100"
              aria-label={`Open live preview for ${project.title}`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </div>
        <CardContent className="flex h-full flex-col p-6">
          <div>
            <div className="mb-4 h-px w-16 bg-primary/70" />
            <p className="eyebrow">
              {project.client} / {project.year}
            </p>
            <h3 className="mt-3 font-display text-[2rem] font-semibold leading-[0.98] tracking-tight transition-colors group-hover:text-primary">
              {project.title}
            </h3>
            <p className="mt-2 text-sm font-medium text-foreground/80">
              Built for teams that need a sharper digital presence.
            </p>
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {supportingCopy}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2" aria-label="Technology stack">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-secondary/70 px-2.5 py-1 text-xs font-medium text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
            {compact && project.technologies.length > technologies.length ? (
              <span className="rounded-md border border-border bg-secondary/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                +{project.technologies.length - technologies.length} more
              </span>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
            {showLivePreview ? (
              <Button asChild size="sm" variant="outline">
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  Live Preview <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
            {isExternalCaseStudy ? (
              <Button asChild size="sm">
                <a href={caseStudyHref} target="_blank" rel="noreferrer">
                  View Case Study <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            ) : (
              <Button asChild size="sm">
                <Link href={caseStudyHref}>
                  View Case Study <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
