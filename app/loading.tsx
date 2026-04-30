import { LogoMark } from "@/components/logo-mark";

export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.12),transparent_34%),radial-gradient(circle_at_78%_20%,hsl(var(--accent)/0.1),transparent_20%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--background)))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-full opacity-45 [background-image:linear-gradient(to_right,hsl(var(--border)/0.14)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/12 blur-3xl" />
          <div className="relative rounded-[1.5rem] border border-border/80 bg-card/88 px-6 py-5 shadow-premium backdrop-blur">
            <LogoMark className="scale-110" />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.26em] text-muted-foreground">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          Loading digital experience
        </div>
      </div>
    </div>
  );
}
