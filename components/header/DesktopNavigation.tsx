"use client";

import React from "react";
import { NavItem } from "@/lib/navigation";
import { NavPill } from "./NavPill";
import { MoreDropdown } from "./MoreDropdown";

interface DesktopNavigationProps {
  items: NavItem[];
  activeHref: string;
  isMoreDropdownOpen: boolean;
  onToggleMoreDropdown: () => void;
}

export function DesktopNavigation({
  items,
  activeHref,
  isMoreDropdownOpen,
  onToggleMoreDropdown,
}: DesktopNavigationProps) {
  return (
    <div className="relative items-center hidden md:flex ml-2 h-10 overflow-visible">
      <ul
        role="menubar"
        className="list-none flex items-stretch m-0 p-0 h-full gap-0"
      >
        {items.map((item) => {
          const isActive = activeHref === item.href;
          const isMoreItem = item.label === "More";

          if (isMoreItem) {
            return (
              <MoreDropdown
                key={item.href}
                isOpen={isMoreDropdownOpen}
                onToggle={onToggleMoreDropdown}
                moreItem={item}
              />
            );
          }

          return <NavPill key={item.href} item={item} isActive={isActive} />;
        })}
      </ul>
    </div>
  );
}
