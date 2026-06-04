"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { User, Check, X, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PublicCar } from "@/types";

interface CarDetailClientProps {
  car: PublicCar;
}

export function CarDetailClient({ car }: CarDetailClientProps) {
  const t = useTranslations("car");
  const tFleet = useTranslations("fleet");

  return (
    <div className="pb-32 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8 lg:grid-cols-2 lg:gap-12"
        >
          {/* Gallery */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gold/10 lg:aspect-auto lg:min-h-[480px]">
            <Image
              src={car.imageUrl}
              alt={`${car.make} ${car.model}`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              <Badge>{tFleet(`categories.${car.category}`)}</Badge>
              {car.withDriver ? (
                <Badge variant="secondary" className="gap-1">
                  <User className="h-3 w-3" />
                  {tFleet("driverIncluded")}
                </Badge>
              ) : (
                <Badge variant="outline">{tFleet("selfDrive")}</Badge>
              )}
              <Badge variant={car.isAvailable ? "default" : "secondary"}>
                {car.isAvailable ? (
                  <span className="flex items-center gap-1">
                    <Check className="h-3 w-3" /> {t("available")}
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <X className="h-3 w-3" /> {t("unavailable")}
                  </span>
                )}
              </Badge>
            </div>

            <h1 className="mt-4 font-serif text-4xl font-light sm:text-5xl">
              {car.make} {car.model}
            </h1>

            {car.description && (
              <div className="mt-8">
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gold">
                  {t("description")}
                </h2>
                <p className="leading-relaxed text-muted-foreground">{car.description}</p>
              </div>
            )}

            {/* Specs grid */}
            <div className="mt-8 rounded-2xl border border-gold/10 bg-card p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
                {t("specs")}
              </h2>
              <dl className="grid grid-cols-2 gap-4">
                <SpecItem label={t("year")} value={String(car.year)} />
                <SpecItem
                  label={t("category")}
                  value={tFleet(`categories.${car.category}`)}
                />
                <SpecItem
                  label={t("driver")}
                  value={car.withDriver ? tFleet("yes") : tFleet("no")}
                />
              </dl>
            </div>

            <div className="mt-8 hidden lg:block">
              <Link href={`/book?carId=${car.id}`}>
                <Button size="lg" className="w-full gap-2 rounded-xl font-semibold">
                  <MessageCircle className="h-5 w-5" />
                  {t("reserve")}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/20 bg-background/90 p-4 backdrop-blur-xl lg:hidden">
        <Link href={`/book?carId=${car.id}`}>
          <Button size="lg" className="w-full gap-2 rounded-xl font-semibold">
            <MessageCircle className="h-5 w-5" />
            {t("bookNow")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}
