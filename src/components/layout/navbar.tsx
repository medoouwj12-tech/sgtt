"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", key: "home" as const },
  { href: "/fleet", key: "fleet" as const },
  { href: "/popular-trips", key: "popularTrips" as const },
  { href: "/destinations", key: "destinations" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

export function Navbar() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-gold/10 bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" className="relative z-50 shrink-0 transition-opacity hover:opacity-90">
          <Logo size="sm" className="sm:hidden" />
          <Logo size="md" className="hidden sm:block" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="relative text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-gold after:absolute after:-bottom-1 after:start-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <LanguageToggle className="hidden xs:flex sm:flex" />

          <Link href="/book" className="hidden sm:block">
            <Button size="sm" className="rounded-full px-5 font-semibold tracking-wide">
              {t("bookNow")}
            </Button>
          </Link>

          <button
            type="button"
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border/50 transition-colors hover:border-gold/40 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5 text-gold" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex h-full flex-col items-center justify-center gap-8 px-6"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-light tracking-widest text-foreground transition-colors hover:text-gold"
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-4 flex items-center gap-4"
              >
                <LanguageToggle />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/book" onClick={() => setIsOpen(false)}>
                  <Button size="lg" className="rounded-full px-10 font-semibold tracking-wide">
                    {t("bookNow")}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
