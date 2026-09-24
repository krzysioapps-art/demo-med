import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vetera — opieka weterynaryjna | Projekt demonstracyjny",
  description:
    "Projekt koncepcyjny fikcyjnej marki weterynaryjnej. Dane i treści demonstracyjne do portfolio fullstack developera.",
  openGraph: {
    title: "Vetera — projekt demonstracyjny",
    description:
      "Opieka weterynaryjna dla psów i kotów. Projekt koncepcyjny — fikcyjna marka i dane demonstracyjne.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vetera — projekt demonstracyjny",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}