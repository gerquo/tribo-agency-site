"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dribbble, Github, Linkedin, Mail } from "lucide-react";

import { LogoMark } from "@/components/logo-mark";
import { Button } from "@/components/ui/button";
import { navLinks, services, site } from "@/lib/data";
import { cn, isPlaceholderExternalUrl, isPlaceholderPhone } from "@/lib/utils";

const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Dribbble", href: "https://dribbble.com", icon: Dribbble },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail }
].filter((social) => !isPlaceholderExternalUrl(social.href) || social.href.startsWith("mailto:"));

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t border-border bg-card/86 backdrop-blur">
      <div className="container grid gap-10 py-12 lg:grid-cols-[1.15fr_0.55fr_0.65fr_0.75fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <LogoMark />
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
            {site.description}
          </p>
          <div className="mt-6 flex gap-2">
            {socialLinks.map((social) => (
              <Button
                key={social.label}
                asChild
                size="icon"
                variant="outline"
                aria-label={social.label}
              >
                <a href={social.href} target="_blank" rel="noreferrer">
                  <social.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="eyebrow text-foreground">
            Explore
          </h2>
          <div className="mt-5 grid gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "text-sm transition-colors",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="eyebrow text-foreground">
            Services
          </h2>
          <div className="mt-5 grid gap-3">
            {services.slice(0, 5).map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="eyebrow text-foreground">
            Contact
          </h2>
          <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
            <a href={`mailto:${site.email}`} className="hover:text-foreground">
              {site.email}
            </a>
            {!isPlaceholderPhone(site.phone) ? (
              <a href={`tel:${site.phone}`} className="hover:text-foreground">
                {site.phone}
              </a>
            ) : null}
            <p>{site.location}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5">
        <p className="container text-sm text-muted-foreground">
          {"\u00a9"} {new Date().getFullYear()} {site.name}. Built for ambitious digital launches.
        </p>
      </div>
    </footer>
  );
}
