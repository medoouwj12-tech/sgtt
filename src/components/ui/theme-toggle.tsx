"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const t = useTranslations("theme");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("rounded-full", className)}
        aria-label="Toggle theme"
      >
        <span className="h-5 w-5" />
      </Button>
    );
  }

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "rounded-full border border-border/50 hover:border-gold/40 hover:bg-gold/5",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? t("light") : t("dark")}
    >
      {isDark ? (
        <Sun className="h-[18px] w-[18px] text-gold transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Moon className="h-[18px] w-[18px] text-gold transition-transform duration-300 hover:-rotate-12" />
      )}
    </Button>
  );
}
