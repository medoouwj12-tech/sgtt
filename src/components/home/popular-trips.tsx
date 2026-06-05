"use client";

import Image from "next/image";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

const POPULAR_TRIPS = [
  {
    key: "airport",
    imageUrl: "/destinations/museum.png",
    pickup: "Cairo Airport",
    dropoff: "Hotel / City",
  },
  {
    key: "alexandria",
    imageUrl: "/destinations/alexandria.png",
    pickup: "Cairo",
    dropoff: "Alexandria",
  },
  {
    key: "pyramids",
    imageUrl: "/destinations/pyramids.png",
    pickup: "Cairo",
    dropoff: "Giza Pyramids",
  },
  {
    key: "sokhna",
    imageUrl: "/destinations/nile.png",
    pickup: "Cairo",
    dropoff: "Ain Sokhna",
  },
] as const;

export function PopularTrips({ fullPage = false }: { fullPage?: boolean }) {
  const t = useTranslations("popularTrips");

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
              {t("eyebrow")}
            </p>
            <h2 className="font-serif text-3xl text-foreground sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              {t("subtitle")}
            </p>
          </div>
          {!fullPage && (
            <Link href="/popular-trips">
              <Button variant="outline" className="gap-2 rounded-full">
                {t("viewAll")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </Link>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {POPULAR_TRIPS.map((trip) => {
            const href = `/book?pickup=${encodeURIComponent(
              trip.pickup
            )}&dropoff=${encodeURIComponent(trip.dropoff)}`;

            return (
              <article
                key={trip.key}
                className="overflow-hidden rounded-lg border border-gold/15 bg-card transition-all hover:-translate-y-1 hover:border-gold/35 hover:shadow-xl hover:shadow-black/10"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={trip.imageUrl}
                    alt={t(`items.${trip.key}.title`)}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 start-3 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    {t(`items.${trip.key}.tag`)}
                  </div>
                </div>
                <div className="space-y-4 p-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {t(`items.${trip.key}.title`)}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {t(`items.${trip.key}.desc`)}
                    </p>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0 text-gold" />
                      <span>{t(`items.${trip.key}.route`)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 shrink-0 text-gold" />
                      <span>{t(`items.${trip.key}.duration`)}</span>
                    </div>
                  </div>
                  <Link href={href}>
                    <Button className="w-full gap-2 rounded-full">
                      {t("book")}
                      <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </Button>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
