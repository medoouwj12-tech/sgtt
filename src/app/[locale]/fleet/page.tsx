import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { getCars } from "@/lib/cars";
import { FleetPageClient } from "@/components/fleet/fleet-page-client";
import { Skeleton } from "@/components/ui/skeleton";

export default async function FleetPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const cars = await getCars();

  return (
    <Suspense fallback={<FleetSkeleton />}>
      <FleetPageClient cars={cars} />
    </Suspense>
  );
}

function FleetSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-24">
      <Skeleton className="mx-auto h-12 w-64" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[16/10] w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
