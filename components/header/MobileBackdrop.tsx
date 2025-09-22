"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface MobileBackdropProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileBackdrop({ isOpen, onClose }: MobileBackdropProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            "md:hidden fixed inset-0 z-[1001]",
            "bg-background/80 backdrop-blur-sm",
            "transition-opacity duration-200"
          )}
          onClick={onClose}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
        />
      )}
    </AnimatePresence>
  );
}
