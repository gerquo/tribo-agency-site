import { Reveal } from "@/components/animations/reveal";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  eyebrow?: string;
};

export function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  eyebrow
}: ServiceCardProps) {
  return (
    <Reveal as="article" className="h-full">
      <Card className="group relative flex h-full flex-col overflow-hidden rounded-lg border-border/85 bg-card/90 transition duration-300 hover:-translate-y-1 hover:border-primary/18 hover:shadow-premium">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/85 via-primary/30 to-transparent" />
        <CardHeader className="flex flex-1 flex-col">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground transition duration-300 group-hover:translate-x-1 group-hover:text-primary" />
          </div>
          <div className="mb-5 h-px w-16 bg-primary/70 transition-all duration-300 group-hover:w-24" />
          {eyebrow ? (
            <p className="eyebrow">
              {eyebrow}
            </p>
          ) : null}
          <CardTitle className="min-h-[4.2rem] font-display text-[1.7rem] font-semibold leading-[0.98] tracking-tight">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          <CardDescription className="min-h-[5.6rem] text-[0.98rem] leading-7">
            {description}
          </CardDescription>
          {href ? (
            <Button
              asChild
              variant="link"
              className="mt-auto justify-start px-0 pt-6 text-foreground hover:text-primary"
            >
              <Link href={href}>
                Explore service <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </Reveal>
  );
}
