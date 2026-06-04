import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "SGT Admin",
  description: "SGT Admin Dashboard",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full" suppressHydrationWarning>
      <body className="min-h-full bg-[#050505] text-white antialiased">{children}</body>
    </html>
  );
}
