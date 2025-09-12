"use client";

import { usePathname } from "next/navigation";
import PillNav from "./react-bits/PillNav";

export default function Header() {
  const pathname = usePathname();

  // Determine the active route based on the current pathname
  const getActiveHref = () => {
    // Handle exact matches first
    if (pathname === "/") return "/";
    if (pathname === "/about") return "/about";
    if (pathname === "/projects") return "/projects";
    if (pathname === "/contact") return "/contact";

    // Handle dynamic routes - if we're on a project page, highlight projects
    if (pathname.startsWith("/projects/")) return "/projects";

    // Handle other potential dynamic routes
    if (pathname.startsWith("/about/")) return "/about";
    if (pathname.startsWith("/contact/")) return "/contact";

    // Default to home if no match
    return "/";
  };

  return (
    <PillNav
      logoAlt="Nahhas Logo"
      items={[
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/contact" },
      ]}
      activeHref={getActiveHref()}
      className="custom-nav"
      ease="power2.easeOut"
      baseColor="#002623"
      pillColor="#968662"
      hoveredPillTextColor="#968662"
      pillTextColor="#002623"
    />
  );
}
