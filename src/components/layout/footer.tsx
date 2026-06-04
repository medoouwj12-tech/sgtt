"use client";

import { useTranslations } from "next-intl";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/logo";

const WHATSAPP_NUMBER = "+201005845698";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  const footerLinks = [
    { href: "/", label: tNav("home") },
    { href: "/fleet", label: tNav("fleet") },
    { href: "/about", label: tNav("about") },
    { href: "/contact", label: tNav("contact") },
  ];

  return (
    <footer className="relative border-t border-gold/10 bg-card">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <Logo size="md" />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-sm font-medium text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10"
            >
              <MessageCircle className="h-4 w-4" />
              {t("whatsapp")}
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
              {t("contact")}
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gold/70" />
                <a href={`tel:${WHATSAPP_NUMBER}`} className="hover:text-gold transition-colors">
                  {WHATSAPP_NUMBER}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-gold/70" />
                <a href="mailto:info@sgt-luxury.com" className="hover:text-gold transition-colors">
                  info@sgt-luxury.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
                <span>Cairo, Egypt</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gold/10 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} SGT. {t("rights")}
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="h-px w-8 bg-gold/30" />
            <span className="font-serif tracking-[0.3em] text-gold/60">SGT</span>
            <span className="h-px w-8 bg-gold/30" />
          </div>
        </div>
      </div>
    </footer>
  );
}
