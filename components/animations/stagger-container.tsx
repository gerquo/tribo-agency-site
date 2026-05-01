"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type StaggerTag = "div" | "section";

type StaggerContainerProps = {
  as?: StaggerTag;
  className?: string;
  children: React.ReactNode;
  amount?: number;
  once?: boolean;
  delayChildren?: number;
  staggerChildren?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

export function StaggerContainer({
  as = "div",
  className,
  children,
  amount = 0.12,
  once = true,
  delayChildren = 0.03,
  staggerChildren = 0.08,
  ...props
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion();
  const divRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(prefersReducedMotion);
  const [shouldAnimateOnView, setShouldAnimateOnView] = useState(false);
  const elementRef = as === "section" ? sectionRef : divRef;
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
    return as === "section" ? (
      <motion.section ref={sectionRef} {...sharedProps}>
        {children}
      </motion.section>
    ) : (
      <motion.div ref={divRef} {...sharedProps}>
        {children}
      </motion.div>
    );
  }

  const animationProps = {
    initial: false,
    animate: shouldAnimateOnView ? (revealed ? "visible" : "hidden") : "visible",
    variants: {
      hidden: {},
      visible: {
        transition: {
          delayChildren,
          staggerChildren
        }
      }
    },
    ...sharedProps
  };

  return as === "section" ? (
    <motion.section ref={sectionRef} {...animationProps}>
      {children}
    </motion.section>
  ) : (
    <motion.div ref={divRef} {...animationProps}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  className,
  children,
  y = 18,
  duration = 0.42,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
  y?: number;
  duration?: number;
} & Omit<HTMLMotionProps<"div">, "children">) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <motion.div className={className} {...props}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y
        },
        visible: {
          opacity: 1,
          y: 0
        }
      }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
