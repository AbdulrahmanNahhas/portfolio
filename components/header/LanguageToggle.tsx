"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { LanguagesIcon } from "lucide-react";

interface Language {
  code: string;
  name: string;
}

export function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Language");

  const languages: Language[] = [
    { code: "en", name: t("english") },
    { code: "ar", name: t("arabic") },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const languageToggle = document.querySelector(
        `[aria-label="${t("selector")}"]`
      );

      if (isOpen && languageToggle && !languageToggle.contains(target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, t]);

  const handleLanguageChange = useCallback(
    (newLocale: string) => {
      // Set the locale cookie
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

      // Close the dropdown
      setIsOpen(false);

      // Reload the page to apply the new locale
      router.refresh();
    },
    [router]
  );

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className="relative h-full border-l" aria-label={t("selector")}>
      {/* Toggle Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 h-full px-3 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-200 focus:!outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={t("selector")}
      >
        <span
          className="text-lg"
          role="img"
          aria-label={`${currentLanguage.name} flag`}
        >
          <LanguagesIcon className=" size-4" />
        </span>
        <span className="hidden sm:inline font-header">
          {currentLanguage.name}
        </span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-0 w-32 bg-background border-y border-l rtl:border-l-0 rtl:border-r rounded-md shadow-lg z-50 rtl:right-auto rtl:left-0"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="py-0">
              {languages.map((language) => {
                const isSelected = language.code === currentLanguage.code;

                return (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-accent hover:text-accent-foreground transition-colors duration-150 ${
                      isSelected ? "bg-accent/50 text-accent-foreground" : ""
                    }`}
                    role="menuitem"
                    aria-current={isSelected ? "true" : "false"}
                  >
                    <span className="flex-1">{language.name}</span>
                    {isSelected && (
                      <motion.svg
                        className="w-4 h-4 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.15 }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </motion.svg>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
