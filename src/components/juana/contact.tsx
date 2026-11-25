"use client";

import { motion } from "framer-motion";
import {
  MapPin, Clock, Mail, Phone, BadgeCheck, ExternalLink, ChevronUp,
  Navigation, Building2, Bike,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { SITE, waLink, LEASING_PARTNERS } from "@/config/site";

/* ================= LOKASI ================= */
export function Location() {
  return (
    <section id="lokasi" className="relative scroll-mt-24 overflow-hidden bg-[#101013] py-20 md:py-28">
      <div className="absolute inset-0 bg-noise" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#e11d2e]">Kunjungi Kami</p>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
            SHOWROOM <span className="text-stroke-red">KAMI</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60 md:text-base">
            Mudah dijangkau dari mana saja di Tasikmalaya — tepat di Jl. A.H. Nasution, Mangkubumi.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 lg:col-span-2"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img src="/images/showroom.png" alt="Showroom Juana Motor Tasikmalaya" className="h-44 w-full object-cover" loading="lazy" />
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#141417] p-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#e11d2e]" />
                <div>
                  <h3 className="font-semibold text-white">Alamat Showroom</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">{SITE.address.full}</p>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3 border-t border-white/10 pt-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#f59e0b]" />
                <div className="w-full">
                  <h3 className="font-semibold text-white">Jam Operasional</h3>
                  <div className="mt-1 space-y-1">
                    {SITE.hours.map((h) => (
                      <div key={h.day} className="flex items-center justify-between text-sm">
                        <span className="text-white/55">{h.day}</span>
                        <span className="font-medium text-white/85">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3 border-t border-white/10 pt-4">
                <Navigation className="mt-0.5 h-5 w-5 shrink-0 text-[#25D366]" />
                <div>
                  <h3 className="font-semibold text-white">Titik Koordinat</h3>
                  <p className="mt-1 text-sm text-white/65">
                    {SITE.coordinates.lat}°, {SITE.coordinates.lng}° ({SITE.coordinates.dms})
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3 border-t border-white/10 pt-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#f59e0b]" />
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <a href={`mailto:${SITE.email}`} className="mt-1 block text-sm text-[#ff6b78] hover:underline">{SITE.email}</a>
                </div>
              </div>
            </div>

            <a
              href={SITE.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#e11d2e] to-[#b3121f] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#e11d2e]/30 transition hover:scale-[1.02]"
            >
              <Navigation className="h-4 w-4" /> Buka di Google Maps
            </a>
          </motion.div>

          {/* Peta */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-white/10 lg:col-span-3"
          >
            <iframe
              src={SITE.mapsEmbed}
              title="Peta lokasi Juana Motor Tasikmalaya"
              className="h-full min-h-[420px] w-full border-0 grayscale-[35%] contrast-[1.1]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================= FAQ ================= */
const FAQS = [
  { q: "Apakah motor bekas di Juana Motor aman untuk dibeli?", a: "Aman. Semua unit bekas melewati inspeksi 25 titik oleh mekanik senior: kompresi mesin, rangka (tidak pernah kontak baku), sistem listrik, dokumen STNK/BPKB, sampai riwayat servis. Unit terpilih juga mendapat garansi mesin. Kami terbuka kalau kamu mau membawa mekanik titipan untuk cek ulang." },
  { q: "Proses tukar tambah (trade-in) itu seperti apa?", a: "Bawa motor lama kamu ke showroom di Griya Mangkubumi Indah No.1. Kami inspeksi langsung (sekitar 30-45 menit), lalu beri penawaran harga berbasis pasar Tasikmalaya hari itu. Kalau deal, nilai motor lama langsung jadi DP motor baru — selisihnya bisa diangsur lewat leasing. Surat-surat juga kami bantu." },
  { q: "Minim DP bisa? Dokumen apa saja yang perlu disiapkan untuk kredit?", a: "Bisa. DP mulai 10% untuk beberapa model. Dokumen standar: KTP, KK, dan slip gaji/rekening koran atau bukti usaha. Untuk pekerja serabutan atau tanpa slip gaji, diskusikan dengan kami — ada mitra leasing yang fleksibel (Adira, BAF, FIF, WOM, Mega Auto, dll)." },
  { q: "Saya punya motor, mau dijual tunai. Apakah Juana Motor membeli?", a: "Ya, kami beli tunai motor Honda, Yamaha, Suzuki, Kawasaki, Bajaj, dan TVS dalam kondisi layak. Isi form 'Jual Motor' di website ini, data kamu tercatat di sistem kami, lalu tim kami menghubungi untuk konfirmasi harga. Datang ke showroom, inspeksi, deal, dan pembayaran bisa di hari yang sama." },
  { q: "Apakah website ini resmi dan legal?", a: "Showroom Motor Mulya Juana Tasikmalaya adalah usaha resmi Ujang Juana dengan NIB 1006240019347 terbit 10 Juni 2024 dari OSS (Kemeninvest/BKPM), termasuk KBLI 47831 Perdagangan Eceran Sepeda Motor Baru di lokasi Ruko Griya Mangkubumi Indah No.1, Jl. A.H. Nasution, Kel. Cipari, Kec. Mangkubumi, Kota Tasikmalaya." },
  { q: "Apakah harga di website sudah final?", a: "Harga di katalog adalah estimasi pasar (November 2026) supaya kamu punya gambaran. Harga deal bisa berbeda tergantung stok, promo, dan skema kredit hari itu. Chat WhatsApp kami untuk harga terbaik dan terbaru." },
];

export function FAQ() {
  return (
    <section id="faq" className="relative scroll-mt-24 bg-[#0b0b0d] py-20 md:py-28">
      <div className="relative mx-auto max-w-3xl px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#e11d2e]">Tanya Jawab</p>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
            PERTANYAAN <span className="text-stroke-red">UMUM</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-white/10 bg-[#141417] px-5">
                <AccordionTrigger className="text-left text-sm font-semibold text-white hover:no-underline md:text-base">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-white/60">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

/* ================= CTA + FOOTER ================= */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#08080a]">
      {/* CTA banner */}
      <div className="relative border-t border-white/10 py-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,46,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold text-white md:text-5xl"
          >
            SIAP MEMBAWA PULANG <span className="bg-gradient-to-r from-[#ff4d5a] to-[#f59e0b] bg-clip-text text-transparent animate-gradient-x">MOTOR IMPIANMU?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-3 max-w-xl text-sm text-white/60"
          >
            Datang langsung ke showroom, atau chat dulu via WhatsApp — kami balas cepat.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="mt-7 flex flex-wrap justify-center gap-3"
          >
            <a
              href={waLink("Halo Juana Motor Tasikmalaya! Saya mau tanya-tanya motor.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-bold text-[#06250f] shadow-xl shadow-[#25D366]/25 transition hover:scale-105"
            >
              <Phone className="h-4 w-4" /> WhatsApp Sekarang
            </a>
            <a
              href="#katalog"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              <Bike className="h-4 w-4" /> Lihat Katalog
            </a>
          </motion.div>
        </div>
      </div>

      {/* Mitra leasing marquee */}
      <div className="border-y border-white/10 py-4">
        <div className="marquee-mask overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-10">
            {[...LEASING_PARTNERS, ...LEASING_PARTNERS, ...LEASING_PARTNERS, ...LEASING_PARTNERS].map((p, i) => (
              <span key={i} className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                {p} <span className="ml-10 text-[#e11d2e]">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer utama */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#e11d2e] to-[#7f0f1a]">
              <Bike className="h-5 w-5 text-white" />
            </span>
            <span className="font-display text-lg font-bold tracking-wider text-white">
              JUANA<span className="text-[#e11d2e]"> MOTOR</span>
              <span className="block text-[10px] font-normal tracking-[0.3em] text-white/50">TASIKMALAYA</span>
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
            {SITE.legalName} — dealer jual beli motor baru & bekas berkualitas, tukar tambah,
            pengajuan kredit multi-leasing, dan workshop servis di Kota Tasikmalaya.
          </p>
          <div className="mt-4 space-y-2 text-sm text-white/55">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#e11d2e]" /> {SITE.address.full}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-[#f59e0b]" /> {SITE.email}
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-[#25D366]" /> {SITE.hours[0].day}: {SITE.hours[0].time}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">Navigasi</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/55">
            {[
              ["#katalog", "Katalog Motor Baru"],
              ["#motor-bekas", "Motor Bekas"],
              ["#kredit", "Simulasi Kredit"],
              ["#jual-motor", "Jual Motor"],
              ["#layanan", "Tukar Tambah & Servis"],
              ["#lokasi", "Lokasi Showroom"],
              ["#faq", "FAQ"],
            ].map(([h, l]) => (
              <li key={h}>
                <a href={h} className="transition hover:text-[#ff4d5a]">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">Legalitas</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/55">
            <li className="flex items-start gap-2">
              <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f59e0b]" />
              <span>NIB <strong className="text-white/85">{SITE.nib}</strong><br />terbit {SITE.nibIssued}</span>
            </li>
            <li className="flex items-start gap-2">
              <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[#f59e0b]" />
              <span>{SITE.kbli}</span>
            </li>
            <li className="flex items-start gap-2">
              <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-[#f59e0b]" />
              <span>Luas lahan {SITE.area.land} m², bangunan {SITE.area.building} m²</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-xs text-white/40 md:flex-row md:px-8">
          <p>© 2026 {SITE.legalName}. Seluruh hak cipta dilindungi.</p>
          <p>Harga di website bersifat estimasi pasar dan dapat berubah sewaktu-waktu.</p>
        </div>
      </div>
    </footer>
  );
}

/* ================= TOMBOL WA MELAYANG + BACK TO TOP ================= */
export function FloatingActions() {
  return (
    <>
      <a
        href={waLink("Halo Juana Motor Tasikmalaya, saya mau tanya stok motor hari ini.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Juana Motor"
        className="group fixed bottom-6 right-6 z-40"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/60 animate-pulse-ring" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-[#25D366]/40 transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#06250f]">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </span>
        <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#141417] px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition-all group-hover:opacity-100">
          Chat Juana Motor
        </span>
      </a>

      <a
        href="#beranda"
        aria-label="Kembali ke atas"
        className="fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#141417]/90 text-white/70 backdrop-blur transition hover:text-white hover:scale-110"
      >
        <ChevronUp className="h-5 w-5" />
      </a>
    </>
  );
}
