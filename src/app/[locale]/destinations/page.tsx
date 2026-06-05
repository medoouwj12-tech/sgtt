import { setRequestLocale } from "next-intl/server";
import { DestinationsPageClient } from "@/components/destinations/destinations-page-client";

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DestinationsPageClient />;
}
