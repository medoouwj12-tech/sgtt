import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getCars } from "@/lib/cars";
import { BookingWizard } from "@/components/booking/booking-wizard";
import { Skeleton } from "@/components/ui/skeleton";

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const cars = await getCars();
  const t = await getTranslations("booking");

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-4xl font-light sm:text-5xl">{t("title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
      </div>

      <Suspense fallback={<Skeleton className="mx-auto h-96 max-w-2xl rounded-2xl" />}>
        <BookingWizard cars={cars} />
      </Suspense>
    </div>
  );
}
