"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";

import { LogoMark } from "@/components/logo-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";

type NavbarVariant = "light" | "dark" | "adaptive";
type ResolvedNavbarTheme = Exclude<NavbarVariant, "adaptive">;

const darkHeroRoutes = new Set([
  "/about",
  "/services",
  "/portfolio",
  "/pricing",
  "/contact",
  "/faq"
]);

export function Navbar({ navTheme = "adaptive" }: { navTheme?: NavbarVariant }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [sectionTheme, setSectionTheme] = useState<ResolvedNavbarTheme | null>(null);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const hasDarkHero = pathname
    ? darkHeroRoutes.has(pathname) || pathname.startsWith("/projects/")
    : false;
  const usesSectionThemeDetection = pathname === "/";
  const initialAdaptiveTheme: ResolvedNavbarTheme = hasDarkHero ? "dark" : "light";
  const baseSurfaceTheme: ResolvedNavbarTheme = mounted
    ? resolvedTheme === "dark"
      ? "dark"
      : "light"
    : initialAdaptiveTheme;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (navTheme !== "adaptive" || !mounted) {
      return;
    }

    if (!hasDarkHero) {
      setPastHero(true);
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    let frameId = 0;

    const updatePastHeroState = () => {
      frameId = 0;

      const heroSection = document.querySelector<HTMLElement>("[data-nav-theme]");
      const headerHeight = 64;
      const threshold = heroSection
        ? Math.max(120, heroSection.offsetHeight - headerHeight - 24)
        : 180;

      setPastHero(window.scrollY > threshold);
    };

    const scheduleUpdate = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(updatePastHeroState);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [hasDarkHero, mounted, navTheme, pathname]);

  useEffect(() => {
    if (navTheme !== "adaptive" || !usesSectionThemeDetection || !mounted) {
      setSectionTheme(null);
      return;
    }

    if (navTheme !== "adaptive" || typeof window === "undefined") {
      return;
    }

    let frameId = 0;

    const updateSectionTheme = () => {
      frameId = 0;

      const headerHeight = 64;
      const elements = document.elementsFromPoint(
        Math.max(20, window.innerWidth / 2),
        Math.max(12, headerHeight / 2)
      );
      const themedElement = elements.find((element) =>
        element instanceof HTMLElement ? element.closest("[data-nav-theme]") : false
      );
      const themeRoot =
        themedElement instanceof HTMLElement
          ? themedElement.closest<HTMLElement>("[data-nav-theme]")
          : null;
      const nextTheme = themeRoot?.dataset.navTheme;

      if (nextTheme === "dark" || nextTheme === "light") {
        setSectionTheme(nextTheme);
        return;
      }

      setSectionTheme(baseSurfaceTheme);
    };

    const scheduleUpdate = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(updateSectionTheme);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [baseSurfaceTheme, mounted, navTheme, pathname, usesSectionThemeDetection]);

  const resolvedVariant = useMemo<ResolvedNavbarTheme>(() => {
    if (navTheme === "light" || navTheme === "dark") {
      return navTheme;
    }

    if (hasDarkHero && !pastHero) {
      return "dark";
    }

    if (usesSectionThemeDetection && sectionTheme) {
      return sectionTheme;
    }

    return baseSurfaceTheme;
  }, [
    baseSurfaceTheme,
    hasDarkHero,
    navTheme,
    pastHero,
    sectionTheme,
    usesSectionThemeDetection
  ]);

  const isDarkVariant = resolvedVariant === "dark";
  const headerClassName = isDarkVariant
    ? "border-b border-white/10 bg-white/5 shadow-none backdrop-blur-lg supports-[backdrop-filter]:bg-white/5"
    : "border-b border-slate-200/45 bg-white/30 shadow-none backdrop-blur-lg supports-[backdrop-filter]:bg-white/20 dark:border-white/10 dark:bg-black/20";
  const logoTextClassName = isDarkVariant
    ? "text-white"
    : "text-slate-950 dark:text-white";
  const desktopLinkBase = isDarkVariant
    ? "text-white/90 hover:text-[hsl(247_69%_78%)]"
    : "text-slate-900 hover:text-primary dark:text-white";
  const toggleClassName = isDarkVariant
    ? "border-white/30 bg-transparent text-white hover:border-white/45 hover:bg-white/10 hover:text-white"
    : "border-slate-300 bg-white/25 text-slate-900 hover:border-primary/35 hover:bg-white/45 dark:border-white/20 dark:bg-black/15 dark:text-white";
  const activeLinkClassName = isDarkVariant
    ? "text-[hsl(247_69%_78%)]"
    : "text-primary dark:text-[hsl(247_69%_78%)]";
  const activeUnderlineClassName = isDarkVariant
    ? "bg-[hsl(247_69%_78%)]"
    : "bg-primary";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-x-0 border-t-0 outline-none transition-[background-color,border-color,backdrop-filter,color] duration-300 ease-out",
        headerClassName
      )}
    >
      <nav
        className="container flex h-16 items-center justify-between"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-3" aria-label="Home">
          <LogoMark textClassName={logoTextClassName} />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={cn(
                "relative text-[0.95rem] font-medium transition-colors duration-300",
                desktopLinkBase,
                pathname === link.href
                  ? activeLinkClassName
                  : ""
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute inset-x-0 -bottom-2 h-0.5 transition-opacity",
                  activeUnderlineClassName,
                  pathname === link.href ? "opacity-100" : "opacity-0"
                )}
              />
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle className={toggleClassName} />
          <Button asChild>
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle className={toggleClassName} />
          <Button
            aria-label="Toggle menu"
            size="icon"
            variant="outline"
            className={toggleClassName}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="border-t border-border bg-background lg:hidden"
        >
          <div className="container grid gap-3 py-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-3 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary/10 text-primary ring-1 ring-primary/15"
                    : "text-slate-900 hover:bg-secondary hover:text-primary dark:text-white dark:hover:text-[hsl(247_69%_78%)]"
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link href="/contact" onClick={() => setOpen(false)}>
                Get a Quote
              </Link>
            </Button>
          </div>
        </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
