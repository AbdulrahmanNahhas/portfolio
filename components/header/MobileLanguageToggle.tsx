"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { CaretDownIcon, TranslateIcon } from "@phosphor-icons/react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface Language {
  code: string;
  name: string;
}

interface MobileLanguageToggleProps {
  onClose: () => void;
}

export function MobileLanguageToggle({ onClose }: MobileLanguageToggleProps) {
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

  const handleLanguageChange = useCallback(
    (newLocale: string) => {
      // Set the locale cookie
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

      // Close the dropdown
      setIsOpen(false);

      // Close mobile menu
      onClose();

      // Reload the page to apply the new locale
      router.refresh();
    },
    [router, onClose]
  );

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        delay: 0,
        duration: 0.2,
        ease: "easeOut",
      }}
      className="space-y-1"
      data-dropdown="language"
    >
      <button
        className={cn(
          "w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isOpen && "text-accent-foreground"
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleDropdown();
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="text-lg"
            role="img"
            aria-label={`${currentLanguage.name} flag`}
          >
            <TranslateIcon className=" size-4" />
          </span>
          <div className="flex items-center gap-2">
            <span>{t("selector")}</span>
          </div>
        </div>
        <CaretDownIcon
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
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
            {languages.map((language) => {
              const isSelected = language.code === currentLanguage.code;

              return (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-sm text-left rounded-md transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isSelected && "bg-accent text-accent-foreground"
                  )}
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
