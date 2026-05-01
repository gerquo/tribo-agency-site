"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { BrandLoadingScreen } from "@/components/brand-loading-screen";

export function PageTransitionShell({
  children
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const duration = reduceMotion ? 140 : 340;
    const timeoutId = window.setTimeout(() => setShowLoader(false), duration);

    return () => window.clearTimeout(timeoutId);
  }, [reduceMotion]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader ? (
          <motion.div
            key="page-loader"
            className="pointer-events-none fixed inset-0 z-[120]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.22, ease: "easeOut" }}
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
