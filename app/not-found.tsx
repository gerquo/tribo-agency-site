import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
        404
      </p>
      <h1 className="mt-4 text-4xl font-black tracking-tight">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you are looking for may have moved or does not exist.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Return home</Link>
      </Button>
    </main>
  );
}
