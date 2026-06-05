"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin, X, ArrowRight, Compass } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { DESTINATIONS, type Destination } from "@/data/destinations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type CategoryFilter = "ALL" | "HISTORICAL" | "CULTURAL" | "NATURAL";

export function DestinationsPageClient() {
  const t = useTranslations("destinations");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("ALL");
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  const categories: CategoryFilter[] = ["ALL", "HISTORICAL", "CULTURAL", "NATURAL"];

  const filteredDestinations = DESTINATIONS.filter(
    (dest) => activeCategory === "ALL" || dest.category === activeCategory
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          <Compass className="h-4 w-4 animate-spin-slow text-gold" />
          SGT Tourism & Tours
        </p>
        <h1 className="mt-3 font-serif text-4xl font-light sm:text-5xl">{t("title")}</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t("subtitle")}</p>
      </motion.div>

      {/* Category Tabs */}
      <div className="mb-10 flex justify-center">
        <div className="inline-flex rounded-full border border-gold/10 bg-card p-1 shadow-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all sm:text-sm ${
                activeCategory === cat
                  ? "bg-gold text-black shadow-lg shadow-gold/20"
                  : "text-foreground/75 hover:text-gold"
              }`}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of cards */}
      <motion.div
        layout
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredDestinations.map((dest, index) => {
            const itemTitle = t(`items.${dest.id}.title`);
            const itemLoc = t(`items.${dest.id}.location`);
            const itemDesc = t(`items.${dest.id}.desc`);

            return (
              <motion.article
                layout
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gold/10 bg-card p-4 transition-all duration-500 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/10"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                    <Image
                      src={dest.imageUrl}
                      alt={itemTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute start-3 top-3">
                      <Badge>{t(`categories.${dest.category}`)}</Badge>
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="mt-4 space-y-2 px-1">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />
                      <span>{itemLoc}</span>
                    </div>
                    <h3 className="font-serif text-xl font-light text-foreground group-hover:text-gold transition-colors duration-300">
                      {itemTitle}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground/90">
                      {itemDesc}
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-border/40 pt-4">
                  <button
                    onClick={() => setSelectedDest(dest)}
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-gold transition-colors"
                  >
                    {t("viewDetails")}
                    <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </button>
                  <Link href={`/book?dropoff=${encodeURIComponent(itemTitle)}`}>
                    <Button size="sm" variant="outline" className="rounded-full text-xs font-semibold px-4">
                      {t("bookTrip")}
                    </Button>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Detailed dialog modal */}
      <AnimatePresence>
        {selectedDest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDest(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-gold/25 bg-background shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedDest(null)}
                className="absolute end-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border/45 bg-black/40 text-white hover:bg-black/60 hover:text-gold transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Large Image Header */}
              <div className="relative h-64 sm:h-80 w-full">
                <Image
                  src={selectedDest.imageUrl}
                  alt={t(`items.${selectedDest.id}.title`)}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                <div className="absolute bottom-6 start-6 end-6">
                  <Badge className="mb-2">{t(`categories.${selectedDest.category}`)}</Badge>
                  <h2 className="font-serif text-3xl sm:text-4xl font-light text-white drop-shadow-md">
                    {t(`items.${selectedDest.id}.title`)}
                  </h2>
                </div>
              </div>

              {/* Modal Body Content */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border/50 pb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-gold" />
                    <span className="font-semibold text-foreground">{t("location")}:</span>
                    <span>{t(`items.${selectedDest.id}.location`)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
                    {t("history")}
                  </h4>
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {t(`items.${selectedDest.id}.history`)}
                  </p>
                </div>

                <div className="mt-8 flex justify-end gap-3 border-t border-border/40 pt-6">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedDest(null)}
                    className="rounded-full text-xs sm:text-sm"
                  >
                    {t("close")}
                  </Button>
                  <Link
                    href={`/book?dropoff=${encodeURIComponent(t(`items.${selectedDest.id}.title`))}`}
                    onClick={() => setSelectedDest(null)}
                  >
                    <Button className="rounded-full px-6 text-xs sm:text-sm font-semibold">
                      {t("bookTrip")}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
