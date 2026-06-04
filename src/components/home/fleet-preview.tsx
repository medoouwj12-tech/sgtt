"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CarCard } from "@/components/fleet/car-card";
import { Button } from "@/components/ui/button";
import type { PublicCar } from "@/types";

interface FleetPreviewProps {
  cars: PublicCar[];
}

export function FleetPreview({ cars }: FleetPreviewProps) {
  const t = useTranslations("nav");
  const tHome = useTranslations("home");
  const featured = cars.slice(0, 3);

  return (
    <section
      id="fleet-preview"
      className="relative border-t border-gold/10 bg-background py-24 sm:py-32"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {tHome("featured")}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-light text-foreground sm:text-4xl md:text-5xl">
            {t("fleet")}
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/fleet">
            <Button variant="outline" size="lg" className="rounded-full px-10">
              {tHome("viewAll")}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
