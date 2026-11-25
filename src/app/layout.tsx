import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Juana Motor Tasikmalaya | Juragan Motor Terlengkap Sejak 2020 — Jual Beli Motor Baru & Bekas",
  description:
    "Juragan Motor Terlengkap Tasikmalaya, Jawa Barat - Indonesia. Pusat jual beli motor terbaik, terlengkap dan terpercaya sejak tahun 2020. 50+ unit ready, 9 merk, tukar tambah, kredit cair cepat, workshop servis. WhatsApp +62 813-8768-5252. Pintu masuk Perum Griya Asri Mangkubumi Indah - Cipari. NIB 1006240019347.",
  keywords: [
    "juana motor",
    "juragan motor terlengkap tasikmalaya",
    "dealer motor tasikmalaya",
    "jual beli motor bekas tasikmalaya",
    "motor baru tasikmalaya",
    "tukar tambah motor",
    "showroom motor mangkubumi",
    "kredit motor tasikmalaya",
    "showroom motor griya mangkubumi indah",
    "mulya juana",
    "pusat jual beli motor jawa barat",
  ],
  authors: [{ name: SITE.owner }],
  openGraph: {
    title: "Juana Motor Tasikmalaya — Juragan Motor Terlengkap Sejak 2020",
    description:
      "Pusat jual beli motor terbaik, terlengkap dan terpercaya sejak tahun 2020. Pintu masuk Perum Griya Asri Mangkubumi Indah - Cipari, Tasikmalaya. WhatsApp +62 813-8768-5252.",
    siteName: SITE.name,
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Showroom Motor Mulya Juana Tasikmalaya",
  alternateName: "Juana Motor Tasikmalaya",
  foundingDate: "2020",
  slogan: "Juragan Motor Terlengkap Tasikmalaya — Pusat Jual Beli Motor Terbaik, Terlengkap dan Terpercaya Sejak Tahun 2020",
  telephone: "+6281387685252",
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ruko Griya Mangkubumi Indah No.1, Jl. A.H. Nasution, Kel. Cipari, Kec. Mangkubumi",
    addressLocality: "Kota Tasikmalaya",
    addressRegion: "Jawa Barat",
    postalCode: "46181",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.coordinates.lat,
    longitude: SITE.coordinates.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "08:00",
      closes: "21:00",
    },
  ],
  identifier: `NIB ${SITE.nib}`,
  areaServed: "Tasikmalaya dan sekitarnya, Jawa Barat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
