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
  title: "Juana Motor Tasikmalaya | Dealer Motor Baru & Bekas Terpercaya",
  description:
    "Showroom Motor Mulya Juana Tasikmalaya — jual beli motor baru & bekas berkualitas, tukar tambah, simulasi kredit, dan servis terpercaya. Ruko Griya Mangkubumi Indah No.1, Jl. A.H. Nasution, Kel. Cipari, Kec. Mangkubumi, Kota Tasikmalaya. NIB 1006240019347.",
  keywords: [
    "juana motor",
    "dealer motor tasikmalaya",
    "jual beli motor bekas tasikmalaya",
    "motor baru tasikmalaya",
    "tukar tambah motor",
    "showroom motor mangkubumi",
    "kredit motor tasikmalaya",
    "mulya juana",
  ],
  authors: [{ name: SITE.owner }],
  openGraph: {
    title: "Juana Motor Tasikmalaya",
    description: SITE.slogan + " — Jl. A.H. Nasution, Kel. Cipari, Kec. Mangkubumi, Kota Tasikmalaya",
    siteName: SITE.name,
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
