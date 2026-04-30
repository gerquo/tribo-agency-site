import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { Button } from "@/components/ui/button";
import { getProjectBySlug } from "@/lib/content";
import { site } from "@/lib/data";
import { getAbsoluteUrl } from "@/lib/site";
import { isPlaceholderExternalUrl } from "@/lib/utils";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({
  params
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      robots: {
        index: false,
        follow: false
      }
    };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`
    },
    openGraph: {
      title: `${project.title} | ${site.name}`,
      description: project.description,
      type: "article",
      images: [
        {
          url: project.image,
          alt: `${project.title} project showcase`
        }
      ],
      url: getAbsoluteUrl(`/projects/${project.slug}`)
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${site.name}`,
      description: project.description,
      images: [project.image]
    }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.image,
    url: getAbsoluteUrl(`/projects/${project.slug}`),
    creator: {
      "@type": "Organization",
      name: site.name
    },
    about: project.category,
    keywords: project.technologies.join(", "),
    datePublished: project.createdAt,
    dateModified: project.updatedAt,
    provider: {
      "@type": "Organization",
      name: site.name
    }
  };
  const showLivePreview = !isPlaceholderExternalUrl(project.liveUrl);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectStructuredData)
        }}
      />
      <section className="premium-grid border-b border-border">
        <div className="container py-12 sm:py-16">
          <Reveal as="div" y={12}>
            <Button asChild variant="outline" size="sm">
              <Link href="/portfolio">
                <ArrowLeft className="h-4 w-4" /> Back to Portfolio
              </Link>
            </Button>
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <Reveal as="div">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                {project.category} Case Study
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-balance sm:text-6xl">
                {project.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {project.summary}
              </p>
              {showLivePreview ? (
                <Button asChild size="lg" className="mt-8">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live Preview <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
            </Reveal>
            <Reveal
              as="div"
              delay={0.05}
              className="grid gap-4 rounded-lg border border-border bg-card p-5 sm:grid-cols-3"
            >
              <Meta label="Client" value={project.client} />
              <Meta label="Year" value={project.year} />
              <Meta label="Stack" value={project.technologies.slice(0, 2).join(", ")} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container py-12 sm:py-16">
        <Reveal as="div" className="overflow-hidden rounded-lg border border-border bg-card shadow-premium">
          <Image
            src={project.image}
            alt={`${project.title} project hero preview`}
            width={1400}
            height={900}
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="aspect-[16/9] object-cover"
            priority
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal as="aside" className="rounded-lg border border-border bg-card p-6 lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-lg font-bold">Technologies</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            <h2 className="mt-8 text-lg font-bold">Results</h2>
            <div className="mt-4 grid gap-3">
              {project.results.map((result) => (
                <p
                  key={result}
                  className="rounded-md border border-border bg-background p-3 text-sm font-medium"
                >
                  {result}
                </p>
              ))}
            </div>
          </Reveal>

          <StaggerContainer className="grid gap-8">
            <CaseSection title="The Challenge" body={project.challenge} />
            <CaseSection title="The Solution" body={project.solution} />
            <CaseSection
              title="The Outcome"
              body="The final system gives the client a faster public experience, reusable content patterns, cleaner analytics, and a stronger foundation for ongoing growth campaigns."
            />
          </StaggerContainer>
        </div>

        <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2">
          {project.gallery.map((image, index) => (
            <StaggerItem key={image}>
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <Image
                  src={image}
                  alt={`${project.title} gallery preview ${index + 1}`}
                  width={1200}
                  height={800}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="aspect-[16/10] object-cover"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal className="mt-12 rounded-lg border border-border bg-primary p-8 text-primary-foreground md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] opacity-80">
                Build your version
              </p>
              <h2 className="mt-3 text-3xl font-black">
                Need a project with this level of polish?
              </h2>
              <p className="mt-3 max-w-2xl leading-8 opacity-85">
                Tell us what you are building and we will recommend the right
                scope, timeline, and launch plan.
              </p>
            </div>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                Contact the Team <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-semibold">{value}</p>
    </div>
  );
}

function CaseSection({ title, body }: { title: string; body: string }) {
  return (
    <StaggerItem>
      <section className="rounded-lg border border-border bg-card p-6 sm:p-8">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-4 text-base leading-8 text-muted-foreground">{body}</p>
      </section>
    </StaggerItem>
  );
}
