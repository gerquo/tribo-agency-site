"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

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
  const sharedProps = {
    className,
    ...props
  };

  if (prefersReducedMotion) {
    switch (as) {
      case "section":
        return <motion.section {...sharedProps}>{children}</motion.section>;
      case "article":
        return <motion.article {...sharedProps}>{children}</motion.article>;
      case "header":
        return <motion.header {...sharedProps}>{children}</motion.header>;
      case "aside":
        return <motion.aside {...sharedProps}>{children}</motion.aside>;
      default:
        return <motion.div {...sharedProps}>{children}</motion.div>;
    }
  }

  const animationProps = {
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once, amount },
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
      return <motion.section {...animationProps}>{children}</motion.section>;
    case "article":
      return <motion.article {...animationProps}>{children}</motion.article>;
    case "header":
      return <motion.header {...animationProps}>{children}</motion.header>;
    case "aside":
      return <motion.aside {...animationProps}>{children}</motion.aside>;
    default:
      return <motion.div {...animationProps}>{children}</motion.div>;
  }
}
