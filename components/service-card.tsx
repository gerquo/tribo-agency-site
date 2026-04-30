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
      <Card className="group flex h-full flex-col rounded-lg bg-card/86 transition duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-premium">
        <CardHeader>
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-5 w-5" />
          </div>
          {eyebrow ? (
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </p>
          ) : null}
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          <CardDescription className="line-clamp-2 leading-6">
            {description}
          </CardDescription>
          {href ? (
            <Button asChild variant="link" className="mt-auto justify-start pt-6">
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
