"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, ChevronDown, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToFleet = () => {
    document.getElementById("fleet-preview")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 -top-[10%] h-[120%] w-full">
        <Image
          src="/fleet/h1-white-side.jpeg"
          alt="Hyundai H1"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.4)_100%)]" />

      {/* Gold accent lines */}
      <div className="absolute start-0 top-1/4 h-32 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      <div className="absolute end-0 top-1/3 h-48 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 pb-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/40 px-4 py-1.5 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold/90">
              {t("badge")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-serif text-4xl font-light leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t("title")}
            <br />
            <span className="bg-gradient-to-r from-gold-light via-gold to-gold-light bg-clip-text text-transparent">
              {t("titleHighlight")}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Search / booking form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mx-auto mt-10 max-w-4xl"
        >
          <div className="rounded-2xl border border-gold/20 bg-black/60 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gold/80">
                  <MapPin className="h-3.5 w-3.5" />
                  {t("pickupLocation")}
                </label>
                <input
                  type="text"
                  placeholder={t("pickupPlaceholder")}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gold/80">
                  <MapPin className="h-3.5 w-3.5" />
                  {t("dropoffLocation")}
                </label>
                <input
                  type="text"
                  placeholder={t("dropoffPlaceholder")}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gold/80">
                  <Calendar className="h-3.5 w-3.5" />
                  {t("date")}
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 [color-scheme:dark]"
                />
              </div>

              <div className="flex items-end sm:col-span-2 lg:col-span-1">
                <Link href="/fleet" className="w-full">
                  <Button
                    size="lg"
                    className="h-[46px] w-full rounded-lg font-semibold uppercase tracking-wider"
                  >
                    {t("searchFleet")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.button
          type="button"
          onClick={scrollToFleet}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mx-auto mt-12 flex flex-col items-center gap-2 text-white/50 transition-colors hover:text-gold"
        >
          <span className="text-xs uppercase tracking-[0.25em]">{t("scrollHint")}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
