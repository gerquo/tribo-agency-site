"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BadgeDollarSign, Building2, LayoutDashboard, Mail, Settings2, SquareStack, Users } from "lucide-react";

import { AdminSignOutButton } from "@/components/admin/admin-sign-out-button";
import { LogoMark } from "@/components/logo-mark";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Homepage", href: "/admin/homepage", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: SquareStack },
  { label: "Services", href: "/admin/services", icon: Settings2 },
  { label: "Pricing", href: "/admin/pricing", icon: BadgeDollarSign },
  { label: "Trusted By", href: "/admin/trusted-by", icon: Building2 },
  { label: "Testimonials", href: "/admin/testimonials", icon: SquareStack },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Messages", href: "/admin/messages", icon: Mail }
];

export function AdminShell({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <div className="container grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-lg border border-border bg-card p-5 lg:sticky lg:top-24 lg:h-fit">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark compact />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Admin
              </p>
              <p className="font-semibold">{site.name}</p>
            </div>
          </Link>
          <div className="mt-6 grid gap-2">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary/10 text-foreground shadow-sm ring-1 ring-primary/15"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <AdminSignOutButton />
          </div>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
