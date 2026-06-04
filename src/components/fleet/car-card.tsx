"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { User, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import type { PublicCar } from "@/types";

interface CarCardProps {
  car: PublicCar;
  index?: number;
}

export function CarCard({ car, index = 0 }: CarCardProps) {
  const t = useTranslations("fleet");

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link href={`/fleet/${car.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl border border-gold/10 bg-card transition-all duration-500 group-hover:border-gold/30 group-hover:shadow-2xl group-hover:shadow-gold/10">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={car.imageUrl}
              alt={`${car.make} ${car.model}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute start-4 top-4 flex gap-2">
              <Badge>{t(`categories.${car.category}`)}</Badge>
              {car.withDriver && (
                <Badge variant="secondary" className="gap-1">
                  <User className="h-3 w-3" />
                  {t("driverIncluded")}
                </Badge>
              )}
            </div>

            <div className="absolute bottom-4 start-4 end-4">
              <h3 className="font-serif text-xl font-light text-white sm:text-2xl">
                {car.make} {car.model}
              </h3>
              <p className="mt-1 text-sm text-white/60">{car.year}</p>
            </div>
          </div>

          <div className="flex min-h-24 items-center justify-between gap-4 p-4 sm:p-5">
            <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
              {car.description}
            </p>
            <span className="flex items-center gap-1 text-sm font-medium text-gold transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              {t("viewDetails")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
