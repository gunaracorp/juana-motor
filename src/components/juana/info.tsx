"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck, HandCoins, FileCheck2, Timer, BadgePercent, Wrench,
  Star, ChevronLeft, ChevronRight, Quote,
} from "lucide-react";

/* ================= COUNTER STATISTIK ================= */
function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toLocaleString("id-ID", { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  const stats = [
    { icon: "🏍️", v: 53, suffix: "+", l: "Motor Ready Stock", d: "baru & bekas pilihan" },
    { icon: "🏭", v: 9, suffix: "", l: "Merk Tersedia", d: "Honda s/d motor listrik" },
    { icon: "🤝", v: 7, suffix: "+", l: "Mitra Leasing", d: "kredit cair cepat" },
    { icon: "⭐", v: 4.9, suffix: "", l: "Rating Pelanggan", d: "kepuasan showroom", decimals: 1 },
  ];

  return (
    <section className="relative border-y border-white/10 bg-[#101013] py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-4 md:px-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-display text-4xl font-bold text-[#e11d2e] md:text-5xl">
              <Counter to={s.v} suffix={s.suffix} decimals={s.decimals ?? 0} />
            </div>
            <div className="mt-1 text-sm font-semibold text-white">{s.l}</div>
            <div className="text-xs text-white/45">{s.d}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ================= KENAPA JUANA ================= */
const WHY = [
  { icon: ShieldCheck, t: "Unit Terverifikasi", d: "Setiap motor bekas melewati inspeksi 25 titik: mesin, rangka, surat, sampai riwayat servis. Yang tidak lolos, tidak dijual." },
  { icon: BadgePercent, t: "Harga Pasar Transparan", d: "Harga mengikuti pasar Tasikmalaya terkini. Tidak ada biaya siluman, tidak ada nego penjebol kantong." },
  { icon: FileCheck2, t: "Surat Rapi, Dibantu Balik Nama", d: "STNK, BPKB, dan faktur kami cek kelengkapan dan keabsahannya. Balik nama dibantu sampai beres." },
  { icon: Timer, t: "Kredit Cair 1 Hari", d: "9 merk, 7+ mitra leasing. Data lengkap pagi, motor dibawa pulang sore — pernah praktik." },
  { icon: HandCoins, t: "Tukar Tambah Terbaik", d: "Penawaran tukar tambah dihitung fair berdasarkan kondisi unit kamu, bukan tebak-tebakan." },
  { icon: Wrench, t: "Garansi & Servis After", d: "Garansi mesin untuk unit bekas terpilih, ditambah workshop servis KBLI 95299 di dalam showroom." },
];

export function WhyUs() {
  return (
    <section id="kenapa-kami" className="relative scroll-mt-24 bg-[#0b0b0d] py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#e11d2e]">Kenapa Juana Motor</p>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
            BELI MOTOR <span className="text-stroke-red">TANPA WAS-WAS</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60 md:text-base">
            Prinsip kami sederhana: jual motor seperti menjual motor untuk keluarga sendiri.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => (
            <motion.div
              key={w.t}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#141417] p-6 transition-all hover:border-[#e11d2e]/50"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#e11d2e]/10 blur-2xl transition-all group-hover:bg-[#e11d2e]/25" />
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#e11d2e]/25 to-transparent transition-transform group-hover:scale-110">
                <w.icon className="h-6 w-6 text-[#ff4d5a]" />
              </span>
              <h3 className="font-display text-lg font-semibold text-white">{w.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{w.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= LAYANAN / TRADE-IN ================= */
export function Services() {
  const steps = [
    { n: "01", t: "Inspeksi 25 Titik", d: "Mesin, rangka, kaki-kaki, listrik, surat-surat — semua dicek mekanik senior kami." },
    { n: "02", t: "Penawaran Harga", d: "Kami ajukan harga berdasarkan pasar Tasikmalaya hari itu, bukan tabel basi." },
    { n: "03", t: "Deal & Dokumen", d: "Setuju? Kami bantu lengkapi surat dan siapkan berita acara serah terima." },
    { n: "04", t: "Bayar / Tukar Tambah", d: "Dibayar tunai di tempat, atau selisihnya masuk DP motor impian kamu." },
  ];

  return (
    <section id="layanan" className="relative scroll-mt-24 overflow-hidden bg-[#101013] py-20 md:py-28">
      <div className="absolute inset-0 bg-noise" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#e11d2e]">Tukar Tambah & Servis</p>
              <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
                MOTOR LAMA,<br /><span className="text-[#f59e0b]">JADI MOTOR BARU</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60 md:text-base">
                Bawa motor lamamu hari ini juga. Dalam satu kunjungan, unit kamu dicek,
                kami beri penawaran, dan kamu bisa langsung pulang membawa motor baru
                dari showroom — atau pulang dengan uang tunai.
              </p>
            </motion.div>

            <div className="mt-8 space-y-4">
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="relative">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e11d2e]/40 bg-[#e11d2e]/10 font-display text-sm font-bold text-[#ff4d5a]">
                      {s.n}
                    </span>
                    {i < steps.length - 1 && <span className="absolute left-1/2 top-11 h-4 w-px -translate-x-1/2 bg-gradient-to-b from-[#e11d2e]/50 to-transparent" />}
                  </div>
                  <div className="pb-2">
                    <h3 className="font-semibold text-white">{s.t}</h3>
                    <p className="text-sm text-white/55">{s.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#e11d2e]/20 to-[#f59e0b]/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <img src="/images/service.png" alt="Servis motor di workshop Juana Motor Tasikmalaya" className="w-full object-cover" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5">
                <p className="font-display text-lg font-bold text-white">Workshop Servis & Reparasi</p>
                <p className="text-xs text-white/65">
                  Terdaftar KBLI 95299 — servis berkala, tune-up, dan rekondisi mesin oleh mekanik berpengalaman sejak 2010.
                </p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -left-4 -top-4 rounded-2xl border border-white/15 bg-[#141417]/95 px-4 py-3 shadow-xl backdrop-blur animate-float-slow"
            >
              <p className="font-display text-2xl font-bold text-[#f59e0b]">25</p>
              <p className="text-[10px] uppercase tracking-wider text-white/55">Titik Inspeksi</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================= TESTIMONI ================= */
const TESTI = [
  { n: "Deni M.", p: "Cihideung, Tasik", r: 5, t: "Ambil Vario 160 pakai kredit, pagi dateng sore motor dibawa pulang. Prosesnya jelas, DP jelas, angsuran jelas. Recommended!" },
  { n: "Rina K.", p: "Mangkubumi, Tasik", r: 5, t: "Jual Scoopy lama buat tukar tambah NMAX. Harganya fair banget dibanding tempat lain, dan dibantu sampe urusan surat balik nama beres." },
  { n: "Asep S.", p: "Tawang, Tasik", r: 5, t: "Beli CRF bekas di sini. Dikasih tahu apa aja yang sudah diganti, riwayat servis diperlihatkan. Jujuer pokoknya, nggak barang rangkuman." },
  { n: "Yuli A.", p: "Cipari, Tasik", r: 5, t: "Motor bekasnya rapi-rapi, dikasih garansi mesin juga. Adminnya ramah, mas Juana orangnya santuy tapi profesional." },
  { n: "Bob H.", p: "Singaparna", r: 4, t: "Dari Singaparna ke sini nggak nyesel. Harga Satria FU-nya masuk banget, plus gratis servis pertama. Mantap Juana Motor!" },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTI.length), 4200);
    return () => clearInterval(t);
  }, [paused]);

  const t = TESTI[idx];

  return (
    <section className="relative bg-[#0b0b0d] py-20 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(225,29,46,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-3xl px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#e11d2e]">Testimoni</p>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">KATA <span className="text-stroke-red">PELANGGAN</span></h2>
        </motion.div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#141417] p-7 md:p-9"
        >
          <Quote className="absolute -top-2 right-4 h-20 w-20 rotate-180 text-[#e11d2e]/10" />
          <motion.div key={idx} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>
            <div className="mb-3 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < t.r ? "fill-[#f59e0b] text-[#f59e0b]" : "text-white/20"}`} />
              ))}
            </div>
            <p className="min-h-[84px] text-base leading-relaxed text-white/80 md:text-lg">“{t.t}”</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#e11d2e] to-[#7f0f1a] font-display font-bold text-white">
                {t.n.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-bold text-white">{t.n}</p>
                <p className="text-xs text-white/50">{t.p}</p>
              </div>
            </div>
          </motion.div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-1.5">
              {TESTI.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Testimoni ${i + 1}`}
                  onClick={() => setIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-[#e11d2e]" : "w-1.5 bg-white/25"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                aria-label="Sebelumnya"
                onClick={() => setIdx((idx - 1 + TESTI.length) % TESTI.length)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Berikutnya"
                onClick={() => setIdx((idx + 1) % TESTI.length)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
