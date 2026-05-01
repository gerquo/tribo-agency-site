"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type RevealTag = "div" | "section" | "article" | "header" | "aside";

type RevealProps = {
  as?: RevealTag;
  delay?: number;
  duration?: number;
  y?: number;
  amount?: number;
  once?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<HTMLMotionProps<"div">, "children">;

export function Reveal({
  as = "div",
  delay = 0,
  duration = 0.45,
  y = 18,
  amount = 0.18,
  once = true,
  className,
  children,
  ...props
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const divRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const articleRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const asideRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(prefersReducedMotion);
  const [shouldAnimateOnView, setShouldAnimateOnView] = useState(false);
  const elementRef =
    as === "section"
      ? sectionRef
      : as === "article"
        ? articleRef
        : as === "header"
          ? headerRef
          : as === "aside"
            ? asideRef
            : divRef;
  const sharedProps = {
    className,
    ...props
  };

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") {
      setRevealed(true);
      setShouldAnimateOnView(false);
      return;
    }

    const element = elementRef.current;

    if (!element) {
      return;
    }

    let frameId = 0;

    const checkVisibility = () => {
      frameId = 0;

      const rect = element.getBoundingClientRect();
      const thresholdPx = window.innerHeight * (1 - amount);
      const inView = rect.top <= thresholdPx && rect.bottom >= 0;

      if (inView) {
        setRevealed(true);
        setShouldAnimateOnView(true);
        return;
      }

      setShouldAnimateOnView(true);

      if (!once) {
        setRevealed(false);
      }
    };

    const scheduleCheck = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(checkVisibility);
    };

    scheduleCheck();
    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck);

    return () => {
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [amount, elementRef, once, prefersReducedMotion]);

  if (prefersReducedMotion) {
    switch (as) {
      case "section":
        return (
          <motion.section ref={sectionRef} {...sharedProps}>
            {children}
          </motion.section>
        );
      case "article":
        return (
          <motion.article ref={articleRef} {...sharedProps}>
            {children}
          </motion.article>
        );
      case "header":
        return (
          <motion.header ref={headerRef} {...sharedProps}>
            {children}
          </motion.header>
        );
      case "aside":
        return (
          <motion.aside ref={asideRef} {...sharedProps}>
            {children}
          </motion.aside>
        );
      default:
        return (
          <motion.div ref={divRef} {...sharedProps}>
            {children}
          </motion.div>
        );
    }
  }

  const animationProps = {
    initial: false,
    animate: shouldAnimateOnView ? (revealed ? "visible" : "hidden") : "visible",
    variants: {
      hidden: {
        opacity: 0,
        y
      },
      visible: {
        opacity: 1,
        y: 0
      }
    },
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1] as const
    },
    ...sharedProps
  };

  switch (as) {
    case "section":
      return (
        <motion.section ref={sectionRef} {...animationProps}>
          {children}
        </motion.section>
      );
    case "article":
      return (
        <motion.article ref={articleRef} {...animationProps}>
          {children}
        </motion.article>
      );
    case "header":
      return (
        <motion.header ref={headerRef} {...animationProps}>
          {children}
        </motion.header>
      );
    case "aside":
      return (
        <motion.aside ref={asideRef} {...animationProps}>
          {children}
        </motion.aside>
      );
    default:
      return (
        <motion.div ref={divRef} {...animationProps}>
          {children}
        </motion.div>
      );
  }
}
