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
    const timeoutId = window.setTimeout(
      () => setShowLoader(false),
      reduceMotion ? 120 : 420
    );

    return () => window.clearTimeout(timeoutId);
  }, [reduceMotion]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader ? (
          <motion.div
            key="page-loader"
            className="fixed inset-0 z-[120]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.14 : 0.24, ease: "easeOut" }}
          >
            <BrandLoadingScreen />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0.94 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0.12 : 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
