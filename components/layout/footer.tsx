"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dribbble, Github, Instagram, Linkedin, Mail } from "lucide-react";

import { XLogo } from "@/components/icons/x-logo";
import { LogoMark } from "@/components/logo-mark";
import { Button } from "@/components/ui/button";
import { navLinks, services, site } from "@/lib/data";
import { cn, isPlaceholderPhone } from "@/lib/utils";

const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "X", href: "https://x.com", icon: XLogo },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Dribbble", href: "https://dribbble.com", icon: Dribbble },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail }
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t border-white/10 bg-[hsl(247_23%_14%)] text-white">
      <div className="container grid gap-10 py-14 lg:grid-cols-[1.15fr_0.55fr_0.65fr_0.75fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <LogoMark textClassName="text-white" />
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
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
          <h2 className="eyebrow text-white">
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
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="eyebrow text-white">
            Services
          </h2>
          <div className="mt-5 grid gap-3">
            {services.slice(0, 5).map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="eyebrow text-white">
            Contact
          </h2>
          <div className="mt-5 grid gap-3 text-sm text-white/70">
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {site.email}
            </a>
            {!isPlaceholderPhone(site.phone) ? (
              <a href={`tel:${site.phone}`} className="hover:text-white">
                {site.phone}
              </a>
            ) : null}
            <p>{site.location}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <p className="container text-sm text-white/55">
          {"\u00a9"} {new Date().getFullYear()} {site.name}. Built for ambitious digital launches.
        </p>
      </div>
    </footer>
  );
}
