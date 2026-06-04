import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SGT — Premium Luxury Car Rental",
  description:
    "Experience luxury on every journey. Premium car rental and trip booking in Egypt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
