import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  compact?: boolean;
  textClassName?: string;
};

export function LogoMark({
  className,
  compact = false,
  textClassName
}: LogoMarkProps) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span className="flex h-11 w-11 items-center justify-center">
        <svg
          viewBox="0 0 64 64"
          aria-hidden="true"
          className="h-11 w-11 drop-shadow-[0_8px_18px_hsl(var(--primary)/0.18)]"
        >
          <rect x="14" y="31" width="12" height="21" rx="3.5" fill="hsl(var(--primary) / 0.45)" />
          <rect x="29" y="22" width="12" height="30" rx="3.5" fill="hsl(var(--primary) / 0.72)" />
          <rect x="44" y="13" width="12" height="39" rx="3.5" fill="hsl(var(--primary))" />
        </svg>
      </span>
      {compact ? null : (
        <span
          className={cn(
            "text-inherit text-xl font-medium leading-none tracking-tight",
            textClassName
          )}
        >
          {site.name}
        </span>
      )}
    </span>
  );
}
