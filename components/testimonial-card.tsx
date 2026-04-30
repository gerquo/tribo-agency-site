import Image from "next/image";
import { Quote } from "lucide-react";

import { Reveal } from "@/components/animations/reveal";
import { Card, CardContent } from "@/components/ui/card";

type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
  initials?: string;
  image?: string;
};

export function TestimonialCard({
  quote,
  name,
  role,
  initials,
  image
}: TestimonialCardProps) {
  return (
    <Reveal as="article" className="h-full">
      <Card className="h-full bg-card/86">
        <CardContent className="p-6">
          <Quote className="h-7 w-7 text-primary" aria-hidden />
          <p className="mt-5 text-base leading-8 text-foreground">
            <span aria-hidden>&ldquo;</span>
            {quote}
            <span aria-hidden>&rdquo;</span>
          </p>
          <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
            {image ? (
              <Image
                src={image}
                alt={name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-md object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-sm font-black text-primary-foreground">
                {initials}
              </div>
            )}
            <div>
              <p className="font-semibold">{name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
