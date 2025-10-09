"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { socialLinks } from "@/lib/navigation";
import { useTranslations } from "next-intl";

interface LogoDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function LogoDropdown({ isOpen, onToggle }: LogoDropdownProps) {
  const logoRef = useRef<HTMLButtonElement | null>(null);
  const t = useTranslations("Header");

  return (
    <motion.button
      ref={logoRef}
      aria-label="Social Media Menu"
      onClick={onToggle}
      className="p-0 inline-flex items-center justify-start cursor-pointer rtl:border-l ltr:border-r"
      initial={{
        width: "auto",
        height: "40px",
      }}
      animate={{
        width: isOpen ? "140px" : "161px",
        height: isOpen ? "115px" : "40px",
      }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        type: "tween",
      }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <span className="text-xl font-bold tracking-wider text-foreground select-none font-header px-3 line-clamp-1 text-start ">
            {t("logo")}
          </span>
        ) : (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.1,
            }}
            className="flex flex-col items-start justify-start gap-0 w-full h-full p-0 border-b bg-background"
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2 + index * 0.05,
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="w-full"
              >
                <Link
                  href={social.href}
                  target={
                    social.href.startsWith("mailto:") ? undefined : "_blank"
                  }
                  rel={
                    social.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="flex items-center gap-3 h-9.5 px-4 py-3 text-white hover:bg-white/10 transition-colors duration-0"
                >
                  <social.icon className="size-4" />
                  <span className="text-sm font-medium">{social.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
