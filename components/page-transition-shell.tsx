"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { BrandLoadingScreen } from "@/components/brand-loading-screen";

export function PageTransitionShell({
  children
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (previousPathRef.current === null) {
      previousPathRef.current = pathname;
      setShowLoader(false);
      return;
    }

    if (previousPathRef.current === pathname) {
      return;
    }

    previousPathRef.current = pathname;
    setShowLoader(true);
    timeoutRef.current = window.setTimeout(
      () => {
        setShowLoader(false);
        timeoutRef.current = null;
      },
      reduceMotion ? 80 : 180
    );

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [pathname, reduceMotion]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader ? (
          <motion.div
            key="page-loader"
            className="pointer-events-none fixed inset-0 z-[120]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.08 : 0.16, ease: "easeOut" }}
          >
            <BrandLoadingScreen />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0.1 : 0.18, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
