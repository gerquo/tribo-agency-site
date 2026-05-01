import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { CtaSection } from "@/components/cta-section";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { TeamMemberCard } from "@/components/team-member-card";
import { aboutHighlights, reasons, site, team, values } from "@/lib/data";
import { getTeamMembers } from "@/lib/content";
import { getPageMetadata, pageImages } from "@/lib/site";

export const metadata: Metadata = getPageMetadata({
  title: "About",
  description:
    "Learn about NovaCraft Digital, a premium digital team building websites, software, web apps, and digital systems.",
  path: "/about",
  image: pageImages.about
});

export const revalidate = 3600;

export default async function AboutPage() {
  const teamMembers = await getTeamMembers(true);

  return (
    <main>
      <PageHeader
        label="ABOUT"
        title="A professional digital team for organizations that need work done properly."
        subtitle="We combine strategy, design, engineering, and launch support to create websites and software that look credible, perform quickly, and support real operations."
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="section-padding">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal as="div">
            <SectionHeading
              eyebrow="Our Story"
              title="Built for teams that need more than a generic website."
              description={`${site.name} exists to help businesses, organizations, brands, and individuals turn serious ideas into polished digital products. We focus on clear positioning, strong user experience, maintainable code, and dependable delivery.`}
            />
            <StaggerContainer className="mt-8 grid gap-3">
              {aboutHighlights.map((item) => (
                <StaggerItem key={item}>
                  <div className="interactive-card flex gap-3 rounded-lg border border-border/70 bg-card p-4">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <p className="font-medium leading-7">{item}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Reveal>
          <Reveal as="div" delay={0.05}>
            <Image
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80"
              alt="Digital agency team reviewing strategy and design work"
              width={1400}
              height={950}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="rounded-lg border border-border object-cover shadow-premium"
            />
          </Reveal>
        </div>
      </section>

      <Reveal
        as="section"
        className="section-padding bg-card/45"
      >
        <StaggerContainer className="container grid gap-6 md:grid-cols-2">
          <StaggerItem>
            <div className="interactive-card rounded-lg border border-border bg-background p-8">
              <p className="eyebrow">
                Mission
              </p>
              <h2 className="mt-4 max-w-[12ch] display-title text-4xl leading-[0.96]">Build digital systems that create trust and momentum.</h2>
              <p className="mt-5 leading-8 text-muted-foreground">
                Our mission is to help clients show up professionally online, serve their audience better, and grow with the right technology behind them.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="interactive-card rounded-lg border border-border bg-background p-8">
              <p className="eyebrow">
                Vision
              </p>
              <h2 className="mt-4 max-w-[13ch] display-title text-4xl leading-[0.96]">Make premium digital delivery more clear, useful, and dependable.</h2>
              <p className="mt-5 leading-8 text-muted-foreground">
                We want every client to understand what is being built, why it matters, and how it will support their next stage.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </Reveal>

      <section className="section-padding">
        <div className="container">
          <SectionHeading
            eyebrow="Core Values"
            title="The standards that shape our work."
            align="center"
          />
          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="interactive-card rounded-lg border border-border bg-card p-6">
                  <value.icon className="h-7 w-7 text-primary" />
                  <h3 className="mt-5 display-title text-[1.55rem] leading-none">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {value.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-card/45">
        <div className="container">
          <SectionHeading
            eyebrow="Why Clients Choose Us"
            title="Credible design, clean engineering, and a process you can trust."
          />
          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <StaggerItem key={reason.title}>
                <div className="interactive-card rounded-lg border border-border bg-background p-6">
                  <reason.icon className="h-7 w-7 text-primary" />
                  <h3 className="mt-5 display-title text-[1.55rem] leading-none">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {reason.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <SectionHeading
            eyebrow="Team"
            title="A compact team of digital specialists."
            description="These sample profiles are structured so the real team can be edited later without changing the page design."
          />
          <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(teamMembers.length > 0 ? teamMembers : team).map((member) => (
              <StaggerItem key={member.name}>
                <TeamMemberCard member={member} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
