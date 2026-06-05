"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const t = useTranslations("footer");

  return (
    <a
      href={getWhatsAppUrl("Hello SGT! I need help booking a car.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp")}
      className="fixed bottom-5 end-4 z-40 inline-flex h-12 items-center gap-2 rounded-full border border-gold/40 bg-gold px-4 text-sm font-semibold text-black shadow-xl shadow-black/25 transition-all hover:-translate-y-0.5 hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:end-6"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">{t("whatsapp")}</span>
    </a>
  );
}
