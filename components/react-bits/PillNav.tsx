"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import {
  Mail,
  ChevronDown,
  BookOpen,
  Wrench,
  FileText,
  MenuIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "../../lib/config";

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
  logoAlt = "Logo",
  items,
  activeHref,
  className = "",
  ease = "power3.easeOut",
  baseColor = "#fff",
  pillColor = "#060010",
  hoveredPillTextColor = "#060010",
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  // Optimized refs with better organization
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileBackdropRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | HTMLElement | null>(null);
  const moreDropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileMoreDropdownRef = useRef<HTMLLIElement | null>(null);

  // Motion values for smooth animations
  const navOpacity = useMotionValue(1);

  // Subtle scroll-based opacity changes (navbar stays at top-4)
  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;

    const updateScrollOpacity = () => {
      const scrollY = window.pageYOffset;

      // Only subtle opacity changes, no position changes
      if (scrollY > lastScrollY && scrollY > 200) {
        // Scrolling down - slight opacity reduction
        navOpacity.set(0.95);
      } else {
        // Scrolling up or at top - full opacity
        navOpacity.set(1);
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollOpacity);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [navOpacity]);

  // Handle escape key to close mobile menu and dropdowns
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
        if (isDropdownOpen) {
          setIsDropdownOpen(false);
        }
        if (isMoreDropdownOpen) {
          setIsMoreDropdownOpen(false);
        }
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
  }, [isMobileMenuOpen, isDropdownOpen, isMoreDropdownOpen]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isDropdownOpen &&
        logoRef.current &&
        !logoRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      // Handle desktop More dropdown click outside
      if (
        isMoreDropdownOpen &&
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(e.target as Node)
      ) {
        setIsMoreDropdownOpen(false);
      }
      // Handle mobile menu click outside
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
        setIsMoreDropdownOpen(false);
      }
      // Handle mobile More dropdown click outside (separate from mobile menu)
      if (
        isMoreDropdownOpen &&
        mobileMoreDropdownRef.current &&
        !mobileMoreDropdownRef.current.contains(e.target as Node) &&
        !mobileMenuRef.current?.contains(e.target as Node)
      ) {
        setIsMoreDropdownOpen(false);
      }
    };

    if (isDropdownOpen || isMoreDropdownOpen || isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isMoreDropdownOpen, isMobileMenuOpen]);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector<HTMLElement>(".pill-label");
        const white = pill.querySelector<HTMLElement>(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(
          circle,
          { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" },
          0
        );

        if (label) {
          tl.to(
            label,
            { y: -(h + 8), duration: 2, ease, overwrite: "auto" },
            0
          );
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(
            white,
            { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" },
            0
          );
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    const backdrop = mobileBackdropRef.current;
    if (menu) {
      gsap.set(menu, { visibility: "hidden", opacity: 0, scaleY: 1, y: 0 });
    }
    if (backdrop) {
      gsap.set(backdrop, { visibility: "hidden", opacity: 0 });
    }

    if (initialLoadAnimation) {
      // Only animate on desktop/large screens
      const isLargeScreen = window.matchMedia("(min-width: 768px)").matches;

      if (isLargeScreen) {
        const logo = logoRef.current;
        const navItems = navItemsRef.current;

        if (logo) {
          gsap.set(logo, { scale: 0 });
          gsap.to(logo, {
            scale: 1,
            duration: 0.6,
            ease,
          });
        }

        if (navItems) {
          gsap.set(navItems, { width: 0 });
          gsap.to(navItems, {
            width: "auto",
            duration: 0.6,
            ease,
          });
        }
      }
    }

    return () => window.removeEventListener("resize", onResize);
  }, [items, ease, initialLoadAnimation]);

  // Optimized animation handlers with better performance
  const handleEnter = useCallback((i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.25,
      ease: "power2.easeOut", // Optimized easing
      overwrite: "auto",
    });
  }, []);

  const handleLeave = useCallback((i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.15,
      ease: "power2.easeOut", // Optimized easing
      overwrite: "auto",
    });
  }, []);

  const handleLogoEnter = useCallback(() => {
    // Only animate logo on desktop/large screens
    const isLargeScreen = window.matchMedia("(min-width: 768px)").matches;
    if (!isLargeScreen) return;

    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.3,
      ease: "power2.easeOut",
      overwrite: "auto",
    });
  }, []);

  // Hamburger animation effect that responds to state changes
  useEffect(() => {
    const hamburger = hamburgerRef.current;
    if (hamburger) {
      const lines = hamburger.querySelectorAll(".hamburger-line");
      if (isMobileMenuOpen) {
        gsap.to(lines[0], {
          rotation: 45,
          y: 3,
          duration: 0.25,
          ease: "power2.easeOut",
        });
        gsap.to(lines[1], {
          rotation: -45,
          y: -3,
          duration: 0.25,
          ease: "power2.easeOut",
        });
      } else {
        gsap.to(lines[0], {
          rotation: 0,
          y: 0,
          duration: 0.25,
          ease: "power2.easeOut",
        });
        gsap.to(lines[1], {
          rotation: 0,
          y: 0,
          duration: 0.25,
          ease: "power2.easeOut",
        });
      }
    }
  }, [isMobileMenuOpen]);

  // Simplified mobile menu toggle
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    onMobileMenuClick?.();
  }, [isMobileMenuOpen, onMobileMenuClick]);

  const isExternalLink = (href: string) =>
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#");

  const isRouterLink = (href?: string) => href && !isExternalLink(href);

  const cssVars = {
    ["--base"]: baseColor,
    ["--pill-bg"]: pillColor,
    ["--hover-text"]: hoveredPillTextColor,
    ["--pill-text"]: resolvedPillTextColor,
    ["--nav-h"]: "42px",
    ["--nav-h-more"]: "36px",
    ["--logo"]: "36px",
    ["--pill-pad-x"]: "18px",
    ["--pill-gap"]: "3px",
  } as React.CSSProperties;

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileBackdropRef}
            className="md:hidden fixed inset-0 bg-black/50 z-[1001] backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 z-[1002] left-1/2 -translate-x-1/2 w-full max-w-5xl p-0 border bg-background/80 backdrop-blur-xl"
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0 }}
      >
        <nav
          className={`w-full flex items-start justify-between box-border relative z-[1003] ${className}`}
          aria-label="Primary"
          style={cssVars}
        >
          <div className="">
            {/* Placeholder to maintain layout space */}
            <div
              className="inline-block"
              style={{
                width: isDropdownOpen ? "130px" : "var(--nav-h)",
                height: "calc(var(--nav-h) - 50px)",
                transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            <motion.button
              aria-label="Social Media Menu"
              onMouseEnter={handleLogoEnter}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              ref={(el) => {
                logoRef.current = el;
              }}
              className="p-0 inline-flex items-center justify-center absolute top-0 left-0"
              initial={{
                width: "var(--nav-h)",
                height: "var(--nav-h)",
                borderRadius: "0",
              }}
              animate={{
                width: isDropdownOpen ? "100px" : "var(--nav-h)",
                height: isDropdownOpen ? "105px" : "var(--nav-h)",
                borderRadius: isDropdownOpen ? "0" : "0",
              }}
              style={{
                background: "var(--base, #000)",
                transformOrigin: "top left",
                willChange: "width, height, border-radius",
              }}
              transition={{
                type: "spring",
                stiffness: 800,
                damping: 50,
                mass: 0.3,
                velocity: 2,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {!isDropdownOpen ? (
                  <motion.div
                    key="logo"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 700,
                      damping: 35,
                      mass: 0.2,
                    }}
                    className="cursor-target flex items-center justify-center cursor-pointer rounded-none"
                  >
                    <Image
                      src={"/logo.png"}
                      alt={logoAlt}
                      width={500}
                      height={500}
                      ref={logoImgRef}
                      className="size-8 p-0 object-cover block !text-primary !fill-primary"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="dropdown"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        delay: 0,
                        duration: 0.05,
                      },
                    }}
                    transition={{
                      delay: 0.05,
                      duration: 0.15,
                    }}
                    className="flex flex-col items-start justify-center gap-0 w-full h-full p-0 rounded-none"
                    style={{
                      borderRadius: "none",
                      padding: "0",
                    }}
                  >
                    <motion.div
                      initial={{ y: 20, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{
                        y: 20,
                        opacity: 0,
                        scale: 0.8,
                        transition: {
                          delay: 0,
                          duration: 0.05,
                          type: "tween",
                        },
                      }}
                      transition={{
                        delay: 0.08,
                        type: "spring",
                        stiffness: 1000,
                        damping: 45,
                        mass: 0.1,
                      }}
                    >
                      <Link
                        href={siteConfig.social.gitlab}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-target flex items-center justify-start w-full gap-2 h-8 px-2 py-1 !text-primary !rounded-none transition-all duration-200"
                        style={{
                          backgroundColor: "transparent",
                          color: "var(--pill-text, #fff)",
                          borderRadius: "0",
                          transition: "background-color 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(255, 255, 255, 0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-4"
                        >
                          <path d="m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0537.8585.8585 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a6.0657 6.0657 0 0 0 2.0119 7.0105l.0113.0087.03.0213 4.976 3.7264 2.462 1.8633 1.4995 1.1321a1.0085 1.0085 0 0 0 1.2197 0l1.4995-1.1321 2.4619-1.8633 5.006-3.7489.0125-.01a6.0682 6.0682 0 0 0 2.0094-7.003z" />
                        </svg>
                        <span className="text-sm font-medium">GitLab</span>
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{
                        y: 20,
                        opacity: 0,
                        scale: 0.8,
                        transition: {
                          delay: 0,
                          duration: 0.05,
                          type: "tween",
                        },
                      }}
                      transition={{
                        delay: 0.1,
                        type: "spring",
                        stiffness: 1000,
                        damping: 45,
                        mass: 0.1,
                      }}
                    >
                      <Link
                        href={siteConfig.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-target flex items-center justify-start w-full gap-2 h-8 px-2 py-1 !text-primary rounded-lg transition-all duration-200"
                        style={{
                          backgroundColor: "transparent",
                          color: "var(--pill-text, #fff)",
                          borderRadius: "0",
                          transition: "background-color 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(255, 255, 255, 0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-4"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span className="text-sm font-medium">Twitter</span>
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{
                        y: 20,
                        opacity: 0,
                        scale: 0.8,
                        transition: {
                          delay: 0,
                          duration: 0.05,
                          type: "tween",
                        },
                      }}
                      transition={{
                        delay: 0.12,
                        type: "spring",
                        stiffness: 1000,
                        damping: 45,
                        mass: 0.1,
                      }}
                    >
                      <Link
                        href={siteConfig.social.email}
                        className="cursor-target flex items-center justify-start w-full gap-2 h-8 px-2 py-1 !text-primary rounded-lg transition-all duration-200"
                        style={{
                          backgroundColor: "transparent",
                          color: "var(--pill-text, #fff)",
                          borderRadius: "0",
                          transition: "background-color 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(255, 255, 255, 0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-4"
                        >
                          <path
                            fill="currentColor"
                            d="m18.73 5.41l-1.28 1L12 10.46L6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64"
                          />
                        </svg>
                        <span className="text-sm font-medium">Email</span>
                      </Link>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          <div
            ref={navItemsRef}
            className="relative items-center rounded-none hidden md:flex ml-2"
            style={{
              height: "var(--nav-h)",
              overflow: "visible !important",
            }}
          >
            <ul
              role="menubar"
              className="list-none flex items-stretch m-0 p-[3px] h-full !overflow-visible"
              style={{ gap: "var(--pill-gap)" }}
            >
              {items.map((item, i) => {
                const isActive = activeHref === item.href;
                const isMoreItem = item.label === "More";

                const pillStyle: React.CSSProperties = {
                  background: "var(--pill-bg, #fff)",
                  color: "var(--pill-text, var(--base, #000))",
                  paddingLeft: "var(--pill-pad-x)",
                  paddingRight: "var(--pill-pad-x)",
                };

                const PillContent = (
                  <>
                    <span
                      className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                      style={{
                        background: "var(--base, #000)",
                        willChange: "transform",
                      }}
                      aria-hidden="true"
                      ref={(el) => {
                        circleRefs.current[i] = el;
                      }}
                    />
                    <span className="label-stack relative inline-block leading-[1] z-[2]">
                      <span
                        className="pill-label relative z-[2] inline-block leading-[1]"
                        style={{ willChange: "transform" }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                        style={{
                          color: "var(--hover-text, #fff)",
                          willChange: "transform, opacity",
                        }}
                        aria-hidden="true"
                      >
                        {item.label}
                      </span>
                    </span>
                    {isActive && (
                      <span
                        className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]"
                        style={{ background: "var(--base, #000)" }}
                        aria-hidden="true"
                      />
                    )}
                  </>
                );

                const basePillClasses =
                  "cursor-target relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-none border-x box-border font-semibold text-[16px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0";

                // Special handling for More dropdown
                if (isMoreItem) {
                  return (
                    <li
                      key={item.href}
                      role="none"
                      className="flex h-full relative"
                    >
                      <div ref={moreDropdownRef} className="relative">
                        <motion.button
                          role="menuitem"
                          // className={basePillClasses}
                          aria-label={item.ariaLabel || item.label}
                          aria-expanded={isMoreDropdownOpen}
                          onMouseEnter={() => handleEnter(i)}
                          onMouseLeave={() => handleLeave(i)}
                          onClick={() =>
                            setIsMoreDropdownOpen(!isMoreDropdownOpen)
                          }
                          initial={{
                            width: "var(--nav-h-more)",
                            height: "var(--nav-h-more)",
                            borderRadius: "50%",
                          }}
                          animate={{
                            width: isMoreDropdownOpen
                              ? "175px"
                              : "var(--nav-h-more)",
                            height: isMoreDropdownOpen
                              ? "160px"
                              : "var(--nav-h-more)",
                            borderRadius: isMoreDropdownOpen ? "0" : "0%",
                            padding: isMoreDropdownOpen ? "5px" : "0",
                          }}
                          style={{
                            ...pillStyle,
                            transformOrigin: "top left",
                            willChange: "width, height, border-radius",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 800,
                            damping: 50,
                            mass: 0.3,
                            velocity: 2,
                          }}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <AnimatePresence mode="wait">
                            {!isMoreDropdownOpen ? (
                              <motion.div
                                key="more-text"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 700,
                                  damping: 35,
                                  mass: 0.2,
                                }}
                                className="cursor-target h-full flex items-center justify-center cursor-pointer"
                              >
                                <MenuIcon />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="dropdown"
                                initial={{
                                  opacity: 0,
                                }}
                                animate={{
                                  opacity: 1,
                                }}
                                exit={{
                                  opacity: 0,
                                  transition: {
                                    delay: 0,
                                    duration: 0.05,
                                  },
                                }}
                                transition={{
                                  delay: 0.05,
                                  duration: 0.15,
                                }}
                                className="flex flex-col items-start justify-center gap-0 w-full h-full !p-0"
                              >
                                <motion.div
                                  initial={{ y: 20, opacity: 0, scale: 0.8 }}
                                  animate={{ y: 0, opacity: 1, scale: 1 }}
                                  exit={{
                                    y: 20,
                                    opacity: 0,
                                    scale: 0.8,
                                    transition: {
                                      delay: 0,
                                      duration: 0.05,
                                      type: "tween",
                                    },
                                  }}
                                  transition={{
                                    delay: 0.1,
                                    type: "spring",
                                    stiffness: 1000,
                                    damping: 45,
                                    mass: 0.1,
                                  }}
                                >
                                  <Link
                                    href="/tools"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-target flex items-center justify-start w-full gap-2 h-9 px-3 py-2 rounded-none transition-all duration-200"
                                    style={{
                                      backgroundColor: "transparent",
                                      color: "var(--pill-text, #fff)",
                                      borderRadius: "0",
                                      width: "100%",
                                      transition: "background-color 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "rgba(255, 255, 255, 0.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "transparent";
                                    }}
                                  >
                                    <BookOpen className="size-4" />
                                    <span className="text-sm font-medium">
                                      Learning & Skills
                                    </span>
                                  </Link>
                                </motion.div>
                                <motion.div
                                  initial={{ y: 20, opacity: 0, scale: 0.8 }}
                                  animate={{ y: 0, opacity: 1, scale: 1 }}
                                  exit={{
                                    y: 20,
                                    opacity: 0,
                                    scale: 0.8,
                                    transition: {
                                      delay: 0,
                                      duration: 0.05,
                                      type: "tween",
                                    },
                                  }}
                                  transition={{
                                    delay: 0.1,
                                    type: "spring",
                                    stiffness: 1000,
                                    damping: 45,
                                    mass: 0.1,
                                  }}
                                >
                                  <Link
                                    href="/tools"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-target flex items-center justify-start w-full gap-2 h-9 px-3 py-2 rounded-none transition-all duration-200"
                                    style={{
                                      backgroundColor: "transparent",
                                      color: "var(--pill-text, #fff)",
                                      borderRadius: "0",
                                      width: "100%",
                                      transition: "background-color 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "rgba(255, 255, 255, 0.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "transparent";
                                    }}
                                  >
                                    <Wrench className="size-4" />
                                    <span className="text-sm font-medium">
                                      Tools I Use
                                    </span>
                                  </Link>
                                </motion.div>
                                <motion.div
                                  initial={{ y: 20, opacity: 0, scale: 0.8 }}
                                  animate={{ y: 0, opacity: 1, scale: 1 }}
                                  exit={{
                                    y: 20,
                                    opacity: 0,
                                    scale: 0.8,
                                    transition: {
                                      delay: 0,
                                      duration: 0.05,
                                      type: "tween",
                                    },
                                  }}
                                  transition={{
                                    delay: 0.12,
                                    type: "spring",
                                    stiffness: 1000,
                                    damping: 45,
                                    mass: 0.1,
                                  }}
                                >
                                  <Link
                                    href="/cv"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cursor-target flex items-center justify-start w-full gap-2 h-9 px-3 py-2 rounded-none transition-all duration-200"
                                    style={{
                                      backgroundColor: "transparent",
                                      color: "var(--pill-text, #fff)",
                                      borderRadius: "0",
                                      width: "100%",
                                      transition: "background-color 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "rgba(255, 255, 255, 0.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "transparent";
                                    }}
                                  >
                                    <FileText className="size-4" />
                                    <span className="text-sm font-medium">
                                      CV / Resume
                                    </span>
                                  </Link>
                                </motion.div>
                                <motion.div
                                  initial={{ y: 20, opacity: 0, scale: 0.8 }}
                                  animate={{ y: 0, opacity: 1, scale: 1 }}
                                  exit={{
                                    y: 20,
                                    opacity: 0,
                                    scale: 0.8,
                                    transition: {
                                      delay: 0,
                                      duration: 0.05,
                                      type: "tween",
                                    },
                                  }}
                                  transition={{
                                    delay: 0.14,
                                    type: "spring",
                                    stiffness: 1000,
                                    damping: 45,
                                    mass: 0.1,
                                  }}
                                >
                                  <Link
                                    href="mailto:abdulrahmannahhas@gmail.com"
                                    className="cursor-target flex items-center justify-start w-full gap-2 h-9 px-3 py-2 rounded-lg transition-all duration-200"
                                    style={{
                                      backgroundColor: "transparent",
                                      color: "var(--pill-text, #fff)",
                                      borderRadius: "0",
                                      width: "100%",
                                      transition: "background-color 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "rgba(255, 255, 255, 0.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "transparent";
                                    }}
                                  >
                                    <Mail className="size-4" />
                                    <span className="text-sm font-medium">
                                      Contact Me
                                    </span>
                                  </Link>
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
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
                        style={pillStyle}
                        aria-label={item.ariaLabel || item.label}
                        onMouseEnter={() => handleEnter(i)}
                        onMouseLeave={() => handleLeave(i)}
                      >
                        {PillContent}
                      </Link>
                    ) : (
                      <a
                        role="menuitem"
                        href={item.href}
                        className={basePillClasses}
                        style={pillStyle}
                        aria-label={item.ariaLabel || item.label}
                        onMouseEnter={() => handleEnter(i)}
                        onMouseLeave={() => handleLeave(i)}
                      >
                        {PillContent}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <motion.button
            ref={hamburgerRef}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            className="cursor-target md:hidden rounded-none border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative"
            style={{
              width: "var(--nav-h)",
              height: "var(--nav-h)",
              background: "var(--base, #000)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span
              className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              style={{ background: "var(--pill-bg, #fff)" }}
            />
            <span
              className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-[10ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              style={{ background: "var(--pill-bg, #fff)" }}
            />
          </motion.button>
        </nav>

        {/* Enhanced Mobile Menu with Motion */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              className="md:hidden absolute top-12 left-0 right-0 mx-0 rounded-none shadow-lg z-[1002] origin-top border bg-card/50 backdrop-blur-xl"
              style={{
                ...cssVars,
                backdropFilter: "blur(20px)",
              }}
              initial={{ opacity: 0, scaleY: 0.95, y: -10 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              exit={{ opacity: 0, scaleY: 0.95, y: -10 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 40,
                mass: 0.5,
              }}
            >
              <ul className="list-none m-0 py-4 flex flex-col gap-2">
                {items.map((item, index) => {
                  const isActive = activeHref === item.href;
                  const isMoreItem = item.label === "More";

                  const defaultStyle: React.CSSProperties = {
                    background: isActive
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    borderRadius: "0",
                  };

                  const linkClasses =
                    "block py-3.5 px-6 text-[16px] font-medium rounded-none transition-all duration-200 active:scale-[0.98] active:rounded-[50px]";

                  // Special handling for More dropdown in mobile
                  if (isMoreItem) {
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                        className="space-y-2"
                        ref={mobileMoreDropdownRef}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                          }}
                        >
                          <button
                            className={cn(linkClasses, "w-full")}
                            style={{
                              ...defaultStyle,
                              background: isMoreDropdownOpen
                                ? "rgba(255, 255, 255, 0.2)"
                                : defaultStyle.background,
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setIsMoreDropdownOpen(!isMoreDropdownOpen);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">
                                {item.label}
                              </span>
                              <ChevronDown
                                className={`transition-all duration-200 ${
                                  isMoreDropdownOpen ? "rotate-180" : ""
                                }`}
                                size={16}
                              />
                            </div>
                          </button>
                        </motion.div>

                        <AnimatePresence>
                          {isMoreDropdownOpen && (
                            <motion.div
                              className="mx-4 space-y-2"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            >
                              <Link
                                href="/learning"
                                className="block py-3 px-5 text-sm rounded-full transition-all duration-200 font-medium"
                                style={{
                                  color: "rgba(255, 255, 255, 0.9)",
                                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.2)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.1)";
                                }}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setIsMoreDropdownOpen(false);
                                }}
                              >
                                Learning & Skills
                              </Link>
                              <Link
                                href="/tools"
                                className="block py-3 px-5 text-sm rounded-full transition-all duration-200 font-medium"
                                style={{
                                  color: "rgba(255, 255, 255, 0.9)",
                                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.2)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.1)";
                                }}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setIsMoreDropdownOpen(false);
                                }}
                              >
                                Tools I Use
                              </Link>
                              <Link
                                href="/cv"
                                className="block py-3 px-5 text-sm rounded-full transition-all duration-200 font-medium"
                                style={{
                                  color: "rgba(255, 255, 255, 0.9)",
                                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.2)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.1)";
                                }}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setIsMoreDropdownOpen(false);
                                }}
                              >
                                CV / Resume
                              </Link>
                              <div className="border"></div>
                              <Link
                                href={siteConfig.social.email}
                                className="block py-3 px-5 text-sm rounded-full transition-all duration-200 font-medium"
                                style={{
                                  color: "rgba(255, 255, 255, 0.9)",
                                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.2)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.1)";
                                }}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setIsMoreDropdownOpen(false);
                                }}
                              >
                                Email Me
                              </Link>
                              <Link
                                href="tel:+1234567890"
                                className="block py-3 px-5 text-sm rounded-full transition-all duration-200 font-medium"
                                style={{
                                  color: "rgba(255, 255, 255, 0.9)",
                                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.2)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.1)";
                                }}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setIsMoreDropdownOpen(false);
                                }}
                              >
                                Contact Me
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    );
                  }

                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      {isRouterLink(item.href) ? (
                        <motion.div
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                          }}
                        >
                          <Link
                            href={item.href}
                            className={linkClasses}
                            style={defaultStyle}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                          }}
                        >
                          <a
                            href={item.href}
                            className={linkClasses}
                            style={defaultStyle}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.label}
                          </a>
                        </motion.div>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default PillNav;
