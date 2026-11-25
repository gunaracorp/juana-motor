"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Flame, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { SITE, waLink } from "@/config/site";

/* Partikel bara api melayang */
function Embers() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const P = Array.from({ length: 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(Math.random() * 0.5 + 0.15),
      a: Math.random() * 0.55 + 0.15,
      hue: Math.random() > 0.7 ? "245, 158, 11" : "225, 29, 46",
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of P) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.hue}, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />;
}

const TICKER = [
  "HONDA", "YAMAHA", "SUZUKI", "KAWASAKI", "BAJAJ", "TVS",
  "READY KREDIT", "TUKAR TAMBAH", "MOTOR BEKAS BERKUALITAS", "GARANSI MESIN", "SIAP ANTAR",
];

export default function Hero() {
  return (
    <section id="beranda" className="relative flex min-h-screen flex-col overflow-hidden bg-[#0b0b0d]">
      {/* Latar */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(225,29,46,0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.14),transparent_50%)]" />
      <Embers />

      {/* Garis kecepatan dekoratif */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-px w-1/3 bg-gradient-to-l from-transparent via-[#e11d2e]/60 to-transparent animate-speedline" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-px w-1/4 bg-gradient-to-l from-transparent via-[#f59e0b]/50 to-transparent animate-speedline" style={{ animationDelay: "0.5s" }} />
      <div className="pointer-events-none absolute right-0 top-2/5 h-px w-1/5 bg-gradient-to-l from-transparent via-white/40 to-transparent animate-speedline" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-4 pb-28 pt-36 md:px-8 lg:grid-cols-2 lg:gap-6">
        {/* Kiri: teks */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e11d2e]/40 bg-[#e11d2e]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#ff6b78]"
          >
            <Flame className="h-3.5 w-3.5 animate-blink" />
            SHOWROOM MOTOR MULYA JUANA — NIB TERDAFTAR
          </motion.div>

          <h1 className="font-display leading-[0.95]">
            {["JUANA", "MOTOR"].map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 2.3 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={
                    i === 0
                      ? "block bg-gradient-to-r from-[#ff4d5a] via-[#e11d2e] to-[#8f0f1a] bg-clip-text text-7xl font-bold tracking-wide text-transparent animate-gradient-x md:text-8xl xl:text-9xl"
                      : "text-stroke block text-7xl font-bold tracking-wide md:text-8xl xl:text-9xl"
                  }
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.65, duration: 0.6 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/65 md:text-lg"
          >
            Dealer motor <strong className="text-white">baru & bekas</strong> paling terpercaya di
            Tasikmalaya. Harga pasar transparan, unit terverifikasi, kredit cair cepat, dan tukar
            tambah dengan penawaran terbaik se-Jabar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.6 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a
              href="#katalog"
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#e11d2e] to-[#b3121f] px-7 py-3.5 font-semibold text-white shadow-xl shadow-[#e11d2e]/40 transition hover:scale-[1.04]"
            >
              <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
              Lihat Katalog Motor
            </a>
            <a
              href={waLink("Halo Juana Motor Tasikmalaya, saya mau lihat-lihat motor dulu ya.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur transition hover:border-[#25D366]/60 hover:bg-[#25D366]/10"
            >
              Chat WhatsApp
            </a>
          </motion.div>

          {/* Statistik mini */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.0, duration: 0.7 }}
            className="mt-9 grid max-w-lg grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur"
          >
            {[
              { v: "50+", l: "Unit Ready" },
              { v: "9", l: "Merk Tersedia" },
              { v: "4.9", l: "Rating Google" },
            ].map((s) => (
              <div key={s.l} className="px-4 py-3 text-center">
                <div className="font-display text-2xl font-bold text-[#f59e0b]">{s.v}</div>
                <div className="text-[11px] uppercase tracking-wider text-white/50">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Kanan: motor */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e11d2e]/25 blur-[90px] animate-glow" />
          <div className="animate-float relative">
            <img
              src="/images/hero-bike.png"
              alt="Motor sport unggulan di Juana Motor Tasikmalaya"
              className="relative z-10 w-full max-w-[640px] drop-shadow-[0_30px_60px_rgba(225,29,46,0.35)]"
            />
          </div>

          {/* Badge melayang */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.2 }}
            className="absolute -left-2 top-6 z-20 flex items-center gap-2 rounded-2xl border border-white/15 bg-[#141417]/90 px-4 py-2.5 shadow-xl backdrop-blur animate-float-slow"
          >
            <ShieldCheck className="h-5 w-5 text-[#f59e0b]" />
            <div className="text-left">
              <div className="text-xs font-bold text-white">100% Legalitas</div>
              <div className="text-[10px] text-white/55">Surat lengkap & rapi</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.4 }}
            className="absolute -right-2 bottom-10 z-20 flex items-center gap-2 rounded-2xl border border-white/15 bg-[#141417]/90 px-4 py-2.5 shadow-xl backdrop-blur animate-float"
          >
            <MapPin className="h-5 w-5 text-[#e11d2e]" />
            <div className="text-left">
              <div className="text-xs font-bold text-white">Griya Mangkubumi</div>
              <div className="text-[10px] text-white/55">Jl. A.H. Nasution No.1</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#0b0b0d]/90 py-3.5 backdrop-blur">
        <div className="marquee-mask overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-8">
            {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="flex items-center gap-8 whitespace-nowrap font-display text-sm font-semibold tracking-[0.25em] text-white/55">
                {t}
                <span className="h-1.5 w-1.5 rotate-45 bg-[#e11d2e]" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#kenapa-kami"
        aria-label="Gulir ke bawah"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6 }}
        className="absolute bottom-20 left-1/2 z-20 hidden -translate-x-1/2 md:block"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown className="h-6 w-6 text-white/40" />
        </motion.div>
      </motion.a>
    </section>
  );
}
