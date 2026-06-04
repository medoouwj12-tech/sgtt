"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CarCard } from "@/components/fleet/car-card";
import { FleetFilters } from "@/components/fleet/fleet-filters";
import type { CarCategory, FleetFilters as Filters, PublicCar } from "@/types";

interface FleetPageClientProps {
  cars: PublicCar[];
}

export function FleetPageClient({ cars }: FleetPageClientProps) {
  const t = useTranslations("fleet");
  const searchParams = useSearchParams();

  const filteredCars = useMemo(() => {
    const filters: Filters = {
      category: (searchParams.get("category") as CarCategory | "ALL") || "ALL",
      withDriver:
        searchParams.get("withDriver") === "true"
          ? true
          : searchParams.get("withDriver") === "false"
            ? false
            : "ALL",
      search: searchParams.get("search") ?? "",
    };

    let result = [...cars];

    if (filters.category && filters.category !== "ALL") {
      result = result.filter((c) => c.category === filters.category);
    }
    if (filters.withDriver !== undefined && filters.withDriver !== "ALL") {
      result = result.filter((c) => c.withDriver === filters.withDriver);
    }
    if (filters.search?.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.make.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q)
      );
    }

    return result;
  }, [cars, searchParams]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          SGT Collection
        </p>
        <h1 className="mt-3 font-serif text-4xl font-light sm:text-5xl">{t("title")}</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t("subtitle")}</p>
      </motion.div>

      <div className="mb-8">
        <FleetFilters />
      </div>

      {filteredCars.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">{t("noResults")}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
