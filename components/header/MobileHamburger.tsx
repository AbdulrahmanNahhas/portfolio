"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MobileHamburgerProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileHamburger({ isOpen, onToggle }: MobileHamburgerProps) {
  return (
    <motion.button
      onClick={onToggle}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      className={cn(
        "md:hidden relative flex size-10 flex-col items-center justify-center gap-1 rounded-md border border-border bg-background p-0 transition-all duration-200",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "active:scale-95"
      )}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      <motion.span
        className="h-0.5 w-4 rounded-full bg-foreground"
        animate={{
          rotate: isOpen ? 45 : 0,
          translateY: isOpen ? 2.5 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      <motion.span
        className="h-0.5 w-4 rounded-full bg-foreground"
        animate={{
          rotate: isOpen ? -45 : 0,
          translateY: isOpen ? -2.5 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </motion.button>
  );
}
