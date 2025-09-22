"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/lib/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  activeHref: string;
  isMoreDropdownOpen: boolean;
  onToggleMoreDropdown: () => void;
}

export function MobileMenu({
  isOpen,
  onClose,
  items,
  activeHref,
  isMoreDropdownOpen,
  onToggleMoreDropdown,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            "md:hidden absolute top-14 left-0 right-0 z-[1002]",
            "bg-card border border-border rounded-lg shadow-lg",
            "mx-4 origin-top"
          )}
          aria-label="Mobile Navigation Menu"
          initial={{ opacity: 0, scaleY: 0.95, y: -10 }}
          animate={{ opacity: 1, scaleY: 1, y: 0 }}
          exit={{ opacity: 0, scaleY: 0.95, y: -10 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-2">
            <ul className="space-y-1">
              {items.map((item, index) => {
                const isActive = activeHref === item.href;
                const isMoreItem = item.label === "More";

                // More dropdown in mobile
                if (isMoreItem && item.subItems) {
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.2,
                        ease: "easeOut",
                      }}
                      className="space-y-1"
                    >
                      <button
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
                          "hover:bg-accent hover:text-accent-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          isMoreDropdownOpen &&
                            "bg-accent text-accent-foreground"
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log("More button clicked"); // Debug log
                          onToggleMoreDropdown();
                        }}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            isMoreDropdownOpen && "rotate-180"
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {isMoreDropdownOpen && (
                          <motion.div
                            className="ml-4 space-y-1"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: 0.2,
                              ease: "easeInOut",
                            }}
                          >
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.disabled ? "#" : subItem.href}
                                className={cn(
                                  "block px-3 py-2 text-sm rounded-md transition-all duration-200",
                                  "hover:bg-accent hover:text-accent-foreground",
                                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                  subItem.disabled
                                    ? "text-muted-foreground/50 cursor-not-allowed"
                                    : "text-muted-foreground"
                                )}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log(
                                    "Submenu item clicked:",
                                    subItem.label
                                  ); // Debug log
                                  if (!subItem.disabled) {
                                    onClose();
                                    onToggleMoreDropdown();
                                  }
                                }}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                }

                // Regular nav items
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                  >
                    {item.disabled ? (
                      <div
                        className={cn(
                          "px-3 py-2.5 text-sm font-medium rounded-md",
                          "text-muted-foreground/50 cursor-not-allowed"
                        )}
                      >
                        {item.label}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
                          "hover:bg-accent hover:text-accent-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          isActive && "bg-accent text-accent-foreground"
                        )}
                        onClick={onClose}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
