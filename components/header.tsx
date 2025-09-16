"use client";

import { usePathname } from "next/navigation";
import PillNav from "./react-bits/PillNav";

export default function Header() {
  const pathname = usePathname();

  // Determine the active route based on the current pathname
  const getActiveHref = () => {
    // Handle exact matches first
    if (pathname === "/") return "/";
    if (pathname === "/work") return "/work";
    if (pathname === "/projects") return "/projects";
    if (pathname === "/more") return "/more";

    // Handle dynamic routes - if we're on a project page, highlight projects
    if (pathname.startsWith("/projects/")) return "/projects";

    // Handle other potential dynamic routes
    if (pathname.startsWith("/work/")) return "/work";
    if (pathname.startsWith("/more/")) return "/more";

    // Default to home if no match
    return "/";
  };

  return (
    <PillNav
      logoAlt="Nahhas Logo"
      items={[
        { label: "Home", href: "/" },
        { label: "Work", href: "/work" },
        { label: "Projects", href: "/projects" },
        { label: "More", href: "/more" },
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
