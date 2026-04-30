"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

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
  const sharedProps = {
    className,
    ...props
  };

  if (prefersReducedMotion) {
    return as === "section" ? (
      <motion.section {...sharedProps}>{children}</motion.section>
    ) : (
      <motion.div {...sharedProps}>{children}</motion.div>
    );
  }

  const animationProps = {
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once, amount },
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
    <motion.section {...animationProps}>{children}</motion.section>
  ) : (
    <motion.div {...animationProps}>{children}</motion.div>
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
