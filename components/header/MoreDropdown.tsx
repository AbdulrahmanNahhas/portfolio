"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, BookOpen, Wrench, FileText, Mail } from "lucide-react";
import { NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface MoreDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  moreItem: NavItem;
}

const iconMap = {
  BookOpen,
  Wrench,
  FileText,
  Mail,
};

export function MoreDropdown({
  isOpen,
  onToggle,
  moreItem,
}: MoreDropdownProps) {
  const moreDropdownRef = useRef<HTMLDivElement | null>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        isOpen &&
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(target)
      ) {
        // Check if the click is on another dropdown (language toggle, etc.)
        const isClickOnOtherDropdown =
          target instanceof Element &&
          (target.closest('[data-dropdown="language"]') ||
            target.closest('[aria-label*="Language"]') ||
            target.closest('[aria-label*="language"]'));

        // Only close if it's not clicking on another dropdown
        if (!isClickOnOtherDropdown) {
          onToggle();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onToggle]);

  if (!moreItem.subItems) return null;

  return (
    <li key={moreItem.href} role="none" className="flex h-full relative">
      <div ref={moreDropdownRef} className="relative" data-dropdown="more">
        <motion.button
          role="menuitem"
          aria-label="More"
          aria-expanded={isOpen}
          onClick={onToggle}
          className={cn(
            "relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-md border-l border-border bg-background text-foreground box-border font-medium text-sm leading-none uppercase tracking-wide whitespace-nowrap cursor-pointer px-4 py-2 transition-all duration-200",
            "hover:bg-accent/50 hover:text-accent-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isOpen && "text-accent-foreground"
          )}
          whileTap={{ scale: 0.99 }}
        >
          <span className="flex items-center gap-1">
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
            <span>{moreItem.label}</span>
          </span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-full ltr:right-0 rtl:left-0 mt-0 w-42 bg-card border border-x rounded-md shadow-lg z-50"
              initial={{ opacity: 0, scale: 1, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            >
              <div className="p-0">
                {moreItem.subItems.map((subItem, index) => {
                  const IconComponent = subItem.icon
                    ? iconMap[subItem.icon as keyof typeof iconMap]
                    : null;

                  return (
                    <motion.div
                      key={subItem.label}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.15,
                        ease: "easeOut",
                      }}
                    >
                      {subItem.disabled ? (
                        <div className="flex items-center gap-3 h-9 px-3 py-2 text-muted-foreground/50 cursor-not-allowed rounded-md">
                          {IconComponent && (
                            <IconComponent className="size-4" />
                          )}
                          <span className="text-sm font-medium">
                            {subItem.label}
                          </span>
                        </div>
                      ) : (
                        <Link
                          href={subItem.href}
                          target={subItem.external ? "_blank" : undefined}
                          rel={
                            subItem.external ? "noopener noreferrer" : undefined
                          }
                          className="flex items-center gap-3 h-9 px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 rounded-md"
                          onClick={() => {
                            if (!subItem.external) {
                              onToggle();
                            }
                          }}
                        >
                          {IconComponent && (
                            <IconComponent className="size-4" />
                          )}
                          <span className="text-sm font-medium">
                            {subItem.label}
                          </span>
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}
