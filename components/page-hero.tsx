import { MotionDiv } from "@/components/motion";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  className
}: PageHeroProps) {
  return (
    <section className={cn("premium-grid border-b border-border", className)}>
      <div className="container py-16 sm:py-20 lg:py-24">
        <MotionDiv
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl"
        >
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
            {eyebrow}
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-balance sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {description}
          </p>
        </MotionDiv>
      </div>
    </section>
  );
}
