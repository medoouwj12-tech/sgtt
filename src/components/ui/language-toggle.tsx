"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={cn(
        "flex h-10 items-center gap-1.5 rounded-full border border-border/50 px-3 text-xs font-semibold tracking-wider transition-all duration-300 hover:border-gold/40 hover:bg-gold/5",
        className
      )}
      aria-label={`Switch to ${locale === "en" ? "Arabic" : "English"}`}
    >
      <span className={cn("transition-colors duration-300", locale === "en" ? "text-gold" : "text-muted-foreground")}>
        EN
      </span>
      <span className="text-border">|</span>
      <span className={cn("transition-colors duration-300", locale === "ar" ? "text-gold" : "text-muted-foreground")}>
        AR
      </span>
    </button>
  );
}
