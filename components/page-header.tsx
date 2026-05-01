import Image from "next/image";

import { Reveal } from "@/components/animations/reveal";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  label: string;
  title: string;
  subtitle: string;
  image: string;
  navTheme?: "light" | "dark";
  className?: string;
  priority?: boolean;
};

export function PageHeader({
  label,
  title,
  subtitle,
  image,
  navTheme = "dark",
  className,
  priority = true
}: PageHeaderProps) {
  return (
    <section
      data-nav-theme={navTheme}
      className={cn(
        "relative isolate -mt-16 flex min-h-[58vh] items-center overflow-hidden bg-background pt-16 sm:min-h-[62vh] lg:min-h-[68vh] xl:min-h-[74vh]",
        className
      )}
    >
      <Image
        src={image}
        alt={`${label} page hero for ${site.name}`}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(3,7,18,0.94)_0%,rgba(3,7,18,0.82)_34%,rgba(3,7,18,0.56)_62%,rgba(3,7,18,0.3)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/56 via-black/22 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/22 to-transparent" />

      <div className="relative z-10 w-full">
        <div className="container py-20 sm:py-24 lg:py-28">
          <div className="max-w-3xl text-left">
            <Reveal
              as="div"
              y={16}
              duration={0.5}
              className="inline-flex max-w-3xl flex-col rounded-lg border border-white/12 bg-black/14 px-5 py-5 backdrop-blur-[1px] sm:px-6 sm:py-6"
            >
              <p className="eyebrow">
                {label}
              </p>
              <h1 className="mt-5 max-w-[14ch] font-display text-balance text-5xl font-semibold leading-[0.92] tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.42)] sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
                {title}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.34)] sm:text-base sm:leading-8 lg:text-lg">
                {subtitle}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
