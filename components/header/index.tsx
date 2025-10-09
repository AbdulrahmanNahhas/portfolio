"use client";

import React, { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { getNavigationItems, getActiveHref } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import { LogoDropdown } from "./LogoDropdown";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileHamburger } from "./MobileHamburger";
import { MobileBackdrop } from "./MobileBackdrop";
import { MobileMenu } from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoDropdownOpen, setIsLogoDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const activeHref = getActiveHref(pathname);
  const navigationItems = getNavigationItems(t);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsLogoDropdownOpen(false);
        setIsMoreDropdownOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      // Close logo dropdown if clicking outside
      if (isLogoDropdownOpen) {
        const logoButton = document.querySelector(
          '[aria-label="Social Media Menu"]'
        );
        if (logoButton && !logoButton.contains(target)) {
          setIsLogoDropdownOpen(false);
        }
      }

      // Close more dropdown if clicking outside
      if (isMoreDropdownOpen) {
        const moreButton = document.querySelector('[aria-label="More"]');
        if (moreButton && !moreButton.contains(target)) {
          setIsMoreDropdownOpen(false);
        }
      }

      // Close mobile menu if clicking outside
      if (isMobileMenuOpen) {
        const mobileMenu = document.querySelector(
          '[aria-label="Mobile Navigation Menu"]'
        );
        const hamburgerButton = document.querySelector(
          '[aria-label="Toggle menu"]'
        );
        if (
          mobileMenu &&
          !mobileMenu.contains(target) &&
          hamburgerButton &&
          !hamburgerButton.contains(target)
        ) {
          setIsMobileMenuOpen(false);
          setIsMoreDropdownOpen(false);
        }
      }
    };

    if (isLogoDropdownOpen || isMoreDropdownOpen || isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLogoDropdownOpen, isMoreDropdownOpen, isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const toggleLogoDropdown = useCallback(() => {
    setIsLogoDropdownOpen(!isLogoDropdownOpen);
  }, [isLogoDropdownOpen]);

  const toggleMoreDropdown = useCallback(() => {
    setIsMoreDropdownOpen(!isMoreDropdownOpen);
  }, [isMoreDropdownOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsMoreDropdownOpen(false);
  }, []);

  return (
    <>
      {/* Mobile Backdrop */}
      <MobileBackdrop isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      {/* Main Navigation */}
      <motion.div
        className="fixed top-0 z-[1002] left-1/2 -translate-x-1/2 w-full max-w-5xl p-0 border bg-background"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0 }}
      >
        <nav
          className="w-full flex items-start justify-between box-border relative z-[1003] font-header h-10"
          aria-label="Primary"
        >
          {/* Logo Section */}
          <div className="relative">
            <LogoDropdown
              isOpen={isLogoDropdownOpen}
              onToggle={toggleLogoDropdown}
            />
          </div>

          {/* Desktop Navigation */}
          <DesktopNavigation
            items={navigationItems}
            activeHref={activeHref}
            isMoreDropdownOpen={isMoreDropdownOpen}
            onToggleMoreDropdown={toggleMoreDropdown}
          />

          {/* Mobile Hamburger */}
          <MobileHamburger
            isOpen={isMobileMenuOpen}
            onToggle={toggleMobileMenu}
          />
        </nav>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          items={navigationItems}
          activeHref={activeHref}
          isMoreDropdownOpen={isMoreDropdownOpen}
          onToggleMoreDropdown={toggleMoreDropdown}
        />
      </motion.div>
    </>
  );
}
