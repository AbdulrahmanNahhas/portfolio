"use client"

import { MoonIcon, SunIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "flex h-full max-h-none items-center gap-1 px-6! text-sm font-medium transition-colors focus:outline-none",
        "bg-background text-muted-foreground border-0 border-e",
        "hover:bg-muted hover:text-foreground",
        "dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        "lg:border-y-0! lg:py-0",
        "lg:bg-transparent! lg:hover:bg-muted! lg:dark:hover:bg-muted/50",
        "py-1"
      )}
    >
      {/* Since this only renders on client, theme will always be defined here */}
      {theme === "dark" ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
    </Button>
  )
}
