import { setRequestLocale } from "next-intl/server";
import { getCars } from "@/lib/cars";
import { HeroSection } from "@/components/home/hero-section";
import { FleetPreview } from "@/components/home/fleet-preview";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const cars = await getCars();

  return (
    <>
      <HeroSection />
      <FleetPreview cars={cars} />
    </>
  );
}
