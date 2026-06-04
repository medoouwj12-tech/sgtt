import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getCarById } from "@/lib/cars";
import { CarDetailClient } from "@/components/car/car-detail-client";

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const car = await getCarById(id);
  if (!car) notFound();

  return <CarDetailClient car={car} />;
}
