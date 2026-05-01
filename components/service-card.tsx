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
      <Card className="group flex h-full flex-col rounded-lg border-border/85 bg-card/84 transition duration-300 hover:-translate-y-1 hover:border-primary/18 hover:shadow-premium">
        <CardHeader className="flex flex-1 flex-col">
          <div className="mb-5 h-px w-16 bg-primary/70 transition-all duration-300 group-hover:w-24" />
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-5 w-5" />
          </div>
          {eyebrow ? (
            <p className="eyebrow">
              {eyebrow}
            </p>
          ) : null}
          <CardTitle className="min-h-[3.4rem] text-[1.34rem] tracking-tight">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          <CardDescription className="min-h-[4.1rem] line-clamp-2 text-[0.95rem] leading-7">
            {description}
          </CardDescription>
          {href ? (
            <Button
              asChild
              variant="link"
              className="mt-auto justify-start px-0 pt-6 text-foreground hover:text-primary"
            >
              <Link href={href}>
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </Reveal>
  );
}
