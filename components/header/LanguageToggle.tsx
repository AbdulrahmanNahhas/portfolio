"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TranslateIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "ar", label: "AR" },
] as const;

export function LanguageToggle() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Language");

  const currentLabel = LANGUAGES.find((lang) => lang.code === locale)?.label || "EN";

  const handleLanguageChange = (newLocale: string) => {
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          // layout & typography
          "flex h-full max-h-none items-center gap-1 px-3! text-sm font-medium transition-colors focus:outline-none",

          // base colors
          "bg-background text-muted-foreground border-0 border-x",
          "hover:bg-muted hover:text-foreground",

          // dark mode
          "dark:bg-input/30 dark:border-input dark:hover:bg-input/50",

          // responsive (lg)
          "lg:border-y-0! lg:py-0",
          "lg:bg-transparent! lg:hover:bg-muted! lg:dark:hover:bg-muted/50",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",

          // spacing
          "py-1"
        )}>
        <TranslateIcon className="size-4" />
        {currentLabel}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-32">
        <DropdownMenuRadioGroup value={locale} onValueChange={handleLanguageChange}>
          <DropdownMenuRadioItem value="en" className="cursor-pointer">
            {t("english")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ar" className="cursor-pointer">
            {t("arabic")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu >
  );
}
