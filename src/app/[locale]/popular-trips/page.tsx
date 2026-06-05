import { setRequestLocale } from "next-intl/server";
import { PopularTrips } from "@/components/home/popular-trips";

export default async function PopularTripsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="pt-20">
      <PopularTrips fullPage />
    </main>
  );
}
