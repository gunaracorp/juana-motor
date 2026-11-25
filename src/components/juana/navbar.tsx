"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, Bike, Phone } from "lucide-react";
import { SITE, waLink } from "@/config/site";

const LINKS = [
  { href: "#beranda", label: "Beranda" },
  { href: "#katalog", label: "Katalog" },
  { href: "#motor-bekas", label: "Motor Bekas" },
  { href: "#kredit", label: "Simulasi Kredit" },
  { href: "#jual-motor", label: "Jual Motor" },
  { href: "#layanan", label: "Layanan" },
  { href: "#lokasi", label: "Lokasi" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        className="h-[3px] origin-left bg-gradient-to-r from-[#e11d2e] via-[#f59e0b] to-[#e11d2e]"
        style={{ scaleX: progress }}
      />
      <nav className="border-b border-white/10 bg-[#0b0b0d]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <a href="#beranda" className="group flex items-center gap-2.5">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#e11d2e] to-[#7f0f1a] shadow-lg shadow-[#e11d2e]/40 transition-transform group-hover:rotate-12">
              <Bike className="h-5 w-5 text-white" />
            </span>
            <span className="font-display text-lg font-bold tracking-wider text-white">
              JUANA<span className="text-[#e11d2e]"> MOTOR</span>
              <span className="block text-[10px] font-normal tracking-[0.3em] text-white/50">
                TASIKMALAYA
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative rounded-full px-3.5 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={waLink("Halo Juana Motor Tasikmalaya, saya mau tanya stok motor.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#e11d2e] to-[#b3121f] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#e11d2e]/30 transition hover:scale-105 md:flex"
            >
              <Phone className="h-4 w-4" />
              Chat Sekarang
            </a>
            <button
              aria-label="Buka menu"
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="border-t border-white/10 bg-[#0b0b0d]/95 lg:hidden"
          >
            <div className="grid grid-cols-2 gap-1 px-4 py-3">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-white/75 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
