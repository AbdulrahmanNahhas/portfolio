"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ListIcon,
  XIcon,
  CaretDownIcon,
  LinkedinLogoIcon,
  LightbulbIcon,
  WrenchIcon,
  ChatTeardropTextIcon,
  MastodonLogoIcon,
  GitlabLogoIcon,
  MatrixLogoIcon,
} from "@phosphor-icons/react";
import { LanguageToggle } from "./LanguageToggle";
import { ModeToggle } from "./theme-toggle";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/config";

// ─── Config ────────────────────────────────────────────────
type NavItem = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

// ─── Header ─────────────────────────────────────────────────
export default function Header() {
  const t = useTranslations("Navigation");

  const mainNavItems: NavItem[] = [
    { label: t("home"), href: "/" },
    { label: t("work"), href: "/work" },
    { label: t("projects"), href: "/projects" },
  ];

  const moreNavItems: NavItem[] = [
    { label: t("learningSkills"), href: "/learning", icon: LightbulbIcon },
    { label: t("toolsIUse"), href: "/tools", icon: WrenchIcon },
    { label: t("contactMe"), href: "/contact", icon: ChatTeardropTextIcon },
  ];

  const socialItems = [
    { label: "Matrix", href: siteConfig.social.matrix, icon: MatrixLogoIcon },
    { label: "Mastodon", href: siteConfig.social.mastodon, icon: MastodonLogoIcon },
    { label: "Gitlab", href: siteConfig.social.gitlab, icon: GitlabLogoIcon },
    { label: "Linkedin", href: "https://linkedin.com/in/yourprofile", icon: LinkedinLogoIcon },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-background/80 backdrop-blur-lg border-border"
      )}
    >
      <div className="container px-4 lg:px-0 border-x lg:border-0">
        <div className="flex items-center justify-between h-12">
          {/* Desktop Name Dropdown with Social */}
          <div className="hidden lg:block h-full">
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(
                "font-header border-x h-full px-5 hover:bg-accent hover:text-accent-foreground uppercase flex items-center gap-2 text-lg font-bold font-mono text-foreground transition-colors focus:outline-none cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              )}>
                {t("logo")}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" sideOffset={1}>
                {socialItems.map((item) => (
                  <DropdownMenuItem render={
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer flex items-center gap-1 text-sm! w-full"
                    >
                      <item.icon className="size-5" />
                      {item.label}
                    </Link>
                  } key={item.label} />
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop Nav Links – exact original structure */}
          <div className="hidden lg:flex items-center gap-0 h-full">
            {mainNavItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                size="lg"
                className={cn(
                  "border-y-0 px-4 h-full flex items-center justify-center border-border text-base",
                  isActive(item.href) && "bg-border"
                )}
                render={
                  <Link href={item.href}>{item.label}</Link>
                }
              />
            ))}

            {/* More Dropdown – restored original classes & render pattern */}
            <DropdownMenu>
              <Button
                variant="ghost"
                size="lg"
                className="border-s border-0 px-4 h-full flex items-center justify-center border-border"
                render={
                  <DropdownMenuTrigger className="text-base! flex items-center gap-1 font-medium text-foreground hover:text-foreground transition-colors focus:outline-none">
                    {t("more")}
                    <CaretDownIcon className="h-4 w-4" />
                  </DropdownMenuTrigger>
                }
              />
              <DropdownMenuContent align="end" className="w-50.5">
                {moreNavItems.map((item, i) => (
                  <div key={item.href}>
                    {i === moreNavItems.length - 1 && <DropdownMenuSeparator />}
                    <DropdownMenuItem>
                      <Link href={item.href} className="cursor-pointer text-sm! flex items-center gap-2 w-full">
                        {item.icon && <item.icon className="size-5" />}
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <LanguageToggle />
            <ModeToggle />
          </div>

          {/* Mobile Name */}
          <div className="lg:hidden text-lg font-bold font-mono text-foreground">
            {t("logo")}
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
          </button>
        </div>

        {/* Mobile Menu – your original + DRY items */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-0 border-t border-border max-h-[calc(100vh-48px)] overflow-y-scroll">
            <div className="flex flex-col pt-4 gap-3">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base border py-4 flex justify-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="py-4 my-2">
                <p className="text-xs font-normal text-muted-foreground mb-2">{t("more")}</p>
                <div className="flex flex-col gap-3 pl-2">
                  {moreNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-base border py-4 flex justify-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 h-12">
                <LanguageToggle />
                <ModeToggle />
              </div>

              <div className="border-t border-border py-4 my-2">
                <p className="text-xs font-semibold text-muted-foreground mb-2 text-center">Social Links</p>
                <div className="grid grid-cols-2 gap-3 pl-2">
                  {socialItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base border border-dotted py-4 flex justify-center gap-2 items-center font-medium text-muted-foreground hover:text-foreground transition-colors"
                      style={{ direction: "ltr" }}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
