"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Preloader from "@/components/juana/preloader";
import Navbar from "@/components/juana/navbar";
import Hero from "@/components/juana/hero";
import Catalog, { CatalogPage } from "@/components/juana/catalog";
import Tools from "@/components/juana/tools";
import { StatsBar, WhyUs, Services, Testimonials } from "@/components/juana/info";
import { Location, FAQ, Footer, FloatingActions } from "@/components/juana/contact";
import {
  FaqPage, TentangPage, KontakPage, TipsPage, PromoPage, LegalPage,
} from "@/components/juana/pages";
import { parseHash, PageKey } from "@/config/nav";

/* Halaman beranda: seluruh section seperti versi awal */
function HomePage({ booted }: { booted: boolean }) {
  return (
    <>
      <Hero booted={booted} />
      <StatsBar />
      <WhyUs />
      <Catalog />
      <Tools />
      <Services />
      <Testimonials />
      <Location />
      <FAQ />
    </>
  );
}

export default function SiteShell() {
  const [page, setPage] = useState<PageKey>("home");
  const [booted, setBooted] = useState(false);

  /* Router berbasis hash: #/faq, #/tentang, dst. — anchor biasa (#katalog) = home */
  useEffect(() => {
    const scrollToAnchor = (anchor: string, initial: boolean) => {
      /* Ulang hingga elemen muncul (transisi halaman butuh waktu mount) */
      let tries = 0;
      const attempt = () => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: initial ? "auto" : "smooth" });
        } else if (tries++ < 30) {
          requestAnimationFrame(attempt);
        }
      };
      attempt();
    };
    const apply = (hash: string, initial = false) => {
      const { page: p, anchor } = parseHash(hash);
      setPage(p);
      if (p === "home" && anchor) {
        scrollToAnchor(anchor, initial);
      } else if (p !== "home") {
        window.scrollTo(0, 0);
      }
    };
    apply(window.location.hash, true);
    const onHash = () => apply(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  /* Tandai preloader selesai supaya animasi hero tidak berdelay ulang
     saat kembali dari halaman lain */
  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#0b0b0d] text-foreground">
      <Preloader />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {page === "home" && <HomePage booted={booted} />}
            {page === "katalog" && <CatalogPage />}
            {page === "faq" && <FaqPage />}
            {page === "tentang" && <TentangPage />}
            {page === "kontak" && <KontakPage />}
            {page === "tips" && <TipsPage />}
            {page === "promo" && <PromoPage />}
            {page === "legal" && <LegalPage />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
