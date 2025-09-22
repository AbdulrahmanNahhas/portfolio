"use client";

import React from "react";
import Link from "next/link";
import { NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface NavPillProps {
  item: NavItem;
  isActive: boolean;
}

export function NavPill({ item, isActive }: NavPillProps) {
  const PillContent = (
    <>
      <span className="relative inline-block leading-none z-[2]">
        <span className="relative z-[2] inline-block leading-none">
          {item.label}
        </span>
      </span>
      {isActive && (
        <span
          className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-2 rounded-full z-[4] bg-foreground"
          aria-hidden="true"
        />
      )}
    </>
  );

  const basePillClasses = cn(
    "relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-md border border-border bg-background text-foreground box-border font-medium text-sm leading-none uppercase tracking-wide whitespace-nowrap cursor-pointer px-4 py-2 transition-all duration-200",
    "hover:bg-accent hover:text-accent-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    isActive && "bg-accent text-accent-foreground border-foreground/25"
  );

  const isExternalLink = (href: string) =>
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#");

  const isRouterLink = (href?: string) => href && !isExternalLink(href);

  if (item.disabled) {
    return (
      <li key={item.href} role="none" className="flex h-full">
        <div
          className={cn(basePillClasses, "opacity-50 cursor-not-allowed")}
          aria-label={`${item.label} (Coming Soon)`}
        >
          {PillContent}
        </div>
      </li>
    );
  }

  return (
    <li key={item.href} role="none" className="flex h-full">
      {isRouterLink(item.href) ? (
        <Link
          role="menuitem"
          href={item.href}
          className={basePillClasses}
          aria-label={item.label}
        >
          {PillContent}
        </Link>
      ) : (
        <a
          role="menuitem"
          href={item.href}
          className={basePillClasses}
          aria-label={item.label}
        >
          {PillContent}
        </a>
      )}
    </li>
  );
}
