"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, HelpCircle, Bike, ShieldCheck, HandCoins, FileCheck2, Timer,
  BadgePercent, Wrench, Phone, Mail, MapPin, Clock, Send, Loader2, Check,
  Building2, BadgeCheck, Sparkles, Gift, GraduationCap, Users, ArrowRight,
  BookOpen, Fuel, KeyRound, FileText, Scale, Lock, ExternalLink, Award,
  CalendarDays, Landmark, ScrollText, Navigation,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { SITE, CREDITS, waLink } from "@/config/site";
import { goPage } from "@/config/nav";

/* ============================================================
   HERO BANNER UNTUK HALAMAN VIRTUAL
   ============================================================ */
function PageHero({
  kicker, title, accent, desc,
}: {
  kicker: string; title: string; accent: string; desc: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0d] pb-14 pt-32 md:pb-20 md:pt-44">
      <div className="page-hero-grid absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(225,29,46,0.2),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.12),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#e11d2e]"
        >
          {kicker}
        </motion.p>
        <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl">
          {title}{" "}
          <span className="text-glow-white animate-glow-white">{accent}</span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base"
        >
          {desc}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
          className="mt-6 h-[3px] w-56 origin-left bg-gradient-to-r from-[#e11d2e] via-[#f59e0b] to-transparent"
        />
      </div>
    </section>
  );
}

function WaCta({ message, label = "Chat WhatsApp Sekarang" }: { message: string; label?: string }) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-[#06250f] shadow-xl shadow-[#25D366]/25 transition hover:scale-105"
    >
      <Phone className="h-4 w-4" /> {label}
    </a>
  );
}

/* ============================================================
   HALAMAN FAQ (lengkap dengan pencarian & kategori)
   ============================================================ */
const FAQ_CATS = [
  { v: "semua", label: "Semua" },
  { v: "umum", label: "Umum" },
  { v: "beli", label: "Pembelian" },
  { v: "kredit", label: "Kredit & DP" },
  { v: "tukar", label: "Tukar Tambah & Jual" },
  { v: "legal", label: "Legalitas" },
  { v: "purna", label: "Layanan Purna" },
];

const FAQ_ITEMS = [
  { cat: "umum", q: "Di mana alamat lengkap showroom Juana Motor?", a: "Showroom kami berada di Ruko Griya Mangkubumi Indah No.1, Jl. A.H. Nasution, Kel. Cipari, Kec. Mangkubumi, Kota Tasikmalaya, Jawa Barat 46181. Patokan paling mudah: tepat di pintu masuk Perum Griya Asri Mangkubumi Indah — Cipari, lokasi yang kami yakini sebagai posisi showroom terbaik di Tasikmalaya karena langsung terlihat dari jalan utama dan mudah dijangkau dari seluruh kota." },
  { cat: "umum", q: "Jam operasional showroom?", a: "Senin - Jumat pukul 08.00 - 20.00 WIB, Sabtu - Minggu pukul 08.00 - 21.00 WIB, dan hari libur nasional pukul 09.00 - 17.00 WIB. Di luar jam tersebut kamu tetap bisa chat WhatsApp kami dan akan dibalas secepatnya keesokan paginya." },
  { cat: "umum", q: "Merk motor apa saja yang tersedia?", a: "Saat ini tersedia 9 merk: Honda, Yamaha, Suzuki, Kawasaki, Bajaj, TVS, Gesits, Volta, dan Polytron — mencakup matic, sport, bebek, trail, retro, hingga motor listrik. Stok berputar setiap minggu, jadi selalu ada unit baru untuk dilihat." },
  { cat: "umum", q: "Berapa banyak stok yang siap dilihat langsung?", a: "Rata-rata ada 50+ unit ready stock (baru dan bekas) yang bisa dilihat, didengarkan mesinnya, dan dicoba langsung di showroom. Katalog di website ini menampilkan data yang sama dan selalu diperbarui." },
  { cat: "beli", q: "Apakah motor bekas di Juana Motor aman untuk dibeli?", a: "Aman. Semua unit bekas melewati inspeksi 25 titik oleh mekanik senior: kompresi mesin, rangka (tidak pernah kontak baku), sistem listrik, dokumen STNK/BPKB, sampai riwayat servis. Unit terpilih juga mendapat garansi mesin. Kami terbuka kalau kamu mau membawa mekanik titipan untuk cek ulang." },
  { cat: "beli", q: "Boleh coba motor dulu sebelum beli?", a: "Boleh, sangat disarankan. Semua unit ready boleh dinyalakan dan dicoba keliling area showroom dengan didampingi tim kami. Untuk motor bekas, kami juga akan menunjukkan hasil inspeksi lengkap sebelum kamu memutuskan." },
  { cat: "beli", q: "Apakah harga di website sudah final?", a: "Harga di katalog adalah estimasi pasar (November 2026) supaya kamu punya gambaran. Harga deal bisa berbeda tergantung stok, promo, dan skema kredit hari itu. Chat WhatsApp kami di +62 813-8768-5252 untuk harga terbaik dan terbaru." },
  { cat: "beli", q: "Proses pembelian motor baru seperti apa?", a: "Pilih unit di showroom (atau chat dulu lewat WA), cek ketersediaan warna dan stok, pilih cara bayar — tunai atau kredit — lalu kami bantu urus dokumen sampai motor siap diantar. Motor baru tetap bergaransi resmi distributor dengan surat-surat baru." },
  { cat: "kredit", q: "Minim DP bisa? Dokumen apa saja yang perlu disiapkan untuk kredit?", a: "Bisa. DP mulai 10% untuk beberapa model. Dokumen standar: KTP, KK, dan slip gaji/rekening koran atau bukti usaha. Untuk pekerja serabutan atau tanpa slip gaji, diskusikan dengan kami — ada mitra leasing yang fleksibel (Adira, BAF, FIF, WOM, Mega Auto, dll)." },
  { cat: "kredit", q: "Berapa lama proses pengajuan kredit sampai cair?", a: "Jika data lengkap sejak pagi, hasil survei biasanya keluar di hari yang sama dan motor bisa dibawa pulang sore harinya. Durasi pastinya tergantung kebijakan leasing dan kelengkapan dokumen, tapi kami selalu dorong proses tercepat di antarmuka mitra." },
  { cat: "kredit", q: "Bisa kredit dengan nama orang lain (atas nama keluarga)?", a: "Bisa, asalkan penerima kredit (debitur) datang atau tersedia untuk tandatangan dan memenuhi syarat leasing. Kami sering membantu skema suami-istri, orangtua-anak, atau orang tua-tunan Mesin." },
  { cat: "kredit", q: "Ada simulasi angsuran yang bisa saya coba sendiri?", a: "Ada. Gunakan fitur Simulasi Kredit di halaman utama website ini: pilih harga motor, masukkan DP dan tenor, lalu sistem menghitung estimasi angsuran bulanan secara instan. Hasilnya bisa langsung dikirim ke WhatsApp untuk dikonfirmasi." },
  { cat: "tukar", q: "Proses tukar tambah (trade-in) itu seperti apa?", a: "Bawa motor lama kamu ke showroom di Griya Mangkubumi Indah No.1. Kami inspeksi langsung (sekitar 30-45 menit), lalu beri penawaran harga berbasis pasar Tasikmalaya hari itu. Kalau deal, nilai motor lama langsung jadi DP motor baru — selisihnya bisa diangsur lewat leasing. Surat-surat juga kami bantu." },
  { cat: "tukar", q: "Saya punya motor, mau dijual tunai. Apakah Juana Motor membeli?", a: "Ya, kami beli tunai motor Honda, Yamaha, Suzuki, Kawasaki, Bajaj, dan TVS dalam kondisi layak. Isi form 'Jual Motor' di website ini, data kamu tercatat di sistem kami, lalu tim kami menghubungi untuk konfirmasi harga. Datang ke showroom, inspeksi, deal, dan pembayaran bisa di hari yang sama." },
  { cat: "tukar", q: "Motor saya masih ada sisa kredit, bisa dijual atau tukar tambah?", a: "Bisa. Kami akan bantu cek sisa pinjaman ke leasing, lalu nilai motor dihitung setelah pelunasan atau diambil alih sesuai skema yang disepakati. Bawa STNK, BPKB jika sudah ada, dan data pinjamanmu saat datang." },
  { cat: "legal", q: "Apakah website ini resmi dan legal?", a: "Showroom Motor Mulya Juana Tasikmalaya adalah usaha resmi Ujang Juana dengan NIB 1006240019347 terbit 10 Juni 2024 dari OSS (Kemeninvest/BKPM), termasuk KBLI 47831 Perdagangan Eceran Sepeda Motor Baru di lokasi Ruko Griya Mangkubumi Indah No.1, Jl. A.H. Nasution, Kel. Cipari, Kec. Mangkubumi, Kota Tasikmalaya." },
  { cat: "legal", q: "Apakah setiap motor dijual dengan surat-surat lengkap?", a: "Ya. Motor baru dibawa dengan surat faktur dan bukti kepemilikan baru dari distributor. Motor bekas wajib melengkapi STNK + BPKB atas nama yang sah; unit dengan surat kurang lengkap tidak kami jual atau dijelaskan statusnya secara terbuka sebelum transaksi." },
  { cat: "legal", q: "Apakah transaksi bisa dibantu balik nama?", a: "Kami membantu proses balik nama untuk motor bekas — dari pengurusan berkas di Samsat Tasikmalaya sampai STNK dan BPKB atas namamu. Ada biaya administrasi Samsat yang dibayar sesuai tarif resmi; detailnya dijelaskan transparan sebelum deal." },
  { cat: "purna", q: "Apakah ada garansi untuk motor bekas?", a: "Unit bekas terpilih mendapat garansi mesin (bobot mesin & transmisi) sesuai ketentuan yang tertulis di nota. Jika dalam masa garansi terjadi masalah mesin yang tercakup, kami perbaiki di workshop kami sendiri tanpa biaya jasa." },
  { cat: "purna", q: "Showroom punya workshop servis sendiri?", a: "Ada. Di dalam area showroom beroperasi workshop servis rutin (ganti oli, tune-up, servis besar) yang juga terbuka untuk umum — bukan hanya untuk motor yang dibeli di Juana Motor. Booking servis bisa langsung lewat WhatsApp." },
  { cat: "purna", q: "Setelah beli, kalau ada kendala ke mana harus lapor?", a: "Langsung ke showroom atau chat WhatsApp +62 813-8768-5252. Simpan nota pembelianmu sebagai bukti transaksi. Prinsip kami: masalah pelanggan selesai di meja kami, bukan dilempar-lempar." },
];

export function FaqPage() {
  const [cat, setCat] = useState("semua");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return FAQ_ITEMS.filter((f) => {
      const okCat = cat === "semua" || f.cat === cat;
      const okQ = !query || f.q.toLowerCase().includes(query) || f.a.toLowerCase().includes(query);
      return okCat && okQ;
    });
  }, [cat, q]);

  return (
    <div>
      <PageHero
        kicker="Tanya Jawab"
        title="PERTANYAAN"
        accent="SERING DIAJUKAN"
        desc="Semua yang perlu kamu tahu sebelum dan sesudah membeli motor di Juana Motor Tasikmalaya — transparan dari awal sampai akhir."
      />

      <section className="bg-[#0b0b0d] py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          {/* Pencarian */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari pertanyaan... (DP, tukar tambah, garansi, balik nama)"
              className="w-full rounded-2xl border border-white/10 bg-[#141417] py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#e11d2e]/60 focus:ring-2 focus:ring-[#e11d2e]/25"
            />
          </motion.div>

          {/* Kategori */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-5 flex flex-wrap gap-2">
            {FAQ_CATS.map((c) => (
              <button
                key={c.v}
                onClick={() => setCat(c.v)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  cat === c.v
                    ? "bg-[#e11d2e] text-white shadow-md shadow-[#e11d2e]/40 scale-105"
                    : "border border-white/15 bg-white/5 text-white/60 hover:border-white/30 hover:text-white"
                }`}
              >
                {c.label}
              </button>
            ))}
          </motion.div>

          {/* Hasil */}
          <div className="mt-8">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#141417] p-10 text-center">
                <HelpCircle className="mx-auto mb-3 h-10 w-10 text-white/25" />
                <p className="text-sm text-white/60">
                  Tidak ada jawaban untuk pencarian itu. Tanyakan langsung ke tim kami via WhatsApp — dijawab cepat.
                </p>
                <div className="mt-5">
                  <WaCta message={`Halo Juana Motor, saya ada pertanyaan: "${q}". Mohon dibantu ya.`} label="Tanya via WhatsApp" />
                </div>
              </div>
            ) : (
              <motion.div key={`${cat}-${q}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Accordion type="single" collapsible className="space-y-3">
                  {filtered.map((f, i) => (
                    <AccordionItem
                      key={f.q}
                      value={`f-${i}`}
                      className="rounded-2xl border border-white/10 bg-[#141417] px-5"
                    >
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
            )}
          </div>

          {/* CTA bawah */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#141417] to-[#101013] p-8 text-center"
          >
            <Bike className="mx-auto mb-3 h-10 w-10 text-[#e11d2e]" />
            <h3 className="font-display text-2xl font-bold text-white">Masih Ada Pertanyaan Lain?</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/55">
              Tim Juana Motor siap membantu setiap hari. Chat sekarang atau datang langsung ke showroom
              di pintu masuk Perum Griya Asri Mangkubumi Indah — Cipari.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <WaCta message="Halo Juana Motor Tasikmalaya, saya punya pertanyaan seputar pembelian motor." />
              <a
                href="#/kontak"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Halaman Kontak <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   HALAMAN TENTANG KAMI
   ============================================================ */
const TIMELINE = [
  {
    year: "2020",
    icon: Sparkles,
    t: "Juana Motor Berdiri",
    d: "Lahir di posisi yang paling strategis: pintu masuk Perum Griya Asri Mangkubumi Indah — Cipari, Tasikmalaya. Sejak hari pertama, prinsipnya satu: jual motor yang layak untuk keluarga sendiri.",
  },
  {
    year: "2024",
    icon: BadgeCheck,
    t: "Legalitas Resmi & Showroom Tetap",
    d: "NIB 1006240019347 terbit 10 Juni 2024 melalui OSS (Kemeninvest/BKPM) dengan KBLI 47831 perdagangan eceran sepeda motor baru, di Ruko Griya Mangkubumi Indah No.1, Jl. A.H. Nasution — lahan 280 m², bangunan 200 m².",
  },
  {
    year: "2026",
    icon: Bike,
    t: "Digital & Makin Terlengkap",
    d: "Katalog 50+ unit online, simulasi kredit instan, inspeksi 25 titik terdokumentasi, workshop servis di dalam showroom, dan jaringan 7+ mitra leasing. Jalan terus se-Jabar mulai sering mampir.",
  },
];

export function TentangPage() {
  return (
    <div>
      <PageHero
        kicker="Profil Showroom"
        title="TENTANG"
        accent="JUANA MOTOR"
        desc="Juragan motor terlengkap Tasikmalaya, Jawa Barat — Indonesia. Pusat jual beli motor terbaik, terlengkap dan terpercaya sejak tahun 2020."
      />

      {/* Cerita */}
      <section className="bg-[#0b0b0d] py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:px-8 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#e11d2e]">Cerita Kami</p>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Dari Pintu Perumahan, Jadi <span className="text-[#f59e0b]">Juragan Motor Terlengkap</span> Tasikmalaya
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-white/60 md:text-base">
              <p>
                Juana Motor lahir tahun 2020 di titik yang sejak awal kami yakini paling terbaik di Tasikmalaya:
                tepat di pintu masuk Perum Griya Asri Mangkubumi Indah — Cipari. Setiap kendaraan yang keluar-masuk
                kota lewat di depan showroom, dan sejak 2020, ribuan motor mulus sudah dibawa pulang dari lokasi ini.
              </p>
              <p>
                Pemiliknya, <strong className="text-white">Ujang Juana</strong>, pekerja sektor jual-beli motor sepanjang
                kariernya, membangun showroom dengan aturan sederhana: unit jelek tidak masuk etalase, surat tidak
                lengkap tidak dijual, dan harga dijelaskan di depan — tidak ada biaya siluman.
              </p>
              <p>
                Hari ini, di bawah entitas resmi <strong className="text-white">Showroom Motor Mulya Juana Tasikmalaya</strong>
                {" "}dengan NIB 1006240019347 dari OSS, kami menampung 50+ unit ready stock dari 9 merk — dari matic harian
                sampai motor listrik — lengkap dengan workshop servis di dalam area showroom dan jaringan 7+ mitra leasing.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { v: "2020", l: "Berdiri Sejak" },
                { v: "50+", l: "Unit Ready" },
                { v: "280", l: "m² Lahan" },
                { v: "9", l: "Merk Motor" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4 text-center">
                  <div className="font-display text-2xl font-bold text-[#f59e0b]">{s.v}</div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-wider text-white/50">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-[#e11d2e]/15 blur-2xl" />
            <img
              src="/images/showroom.png"
              alt="Showroom Juana Motor Tasikmalaya di pintu masuk Perum Griya Asri Mangkubumi Indah Cipari"
              className="relative z-10 w-full rounded-3xl border border-white/10 object-cover shadow-2xl"
              loading="lazy"
            />
            <div className="relative z-10 mt-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#141417]/90 px-4 py-3 text-xs text-white/60">
              <MapPin className="h-4 w-4 shrink-0 text-[#e11d2e]" />
              {SITE.address.landmark}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="relative overflow-hidden bg-[#101013] py-16 md:py-24">
        <div className="absolute inset-0 bg-noise" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: Landmark,
                t: "Visi",
                d: "Menjadi pusat jual beli motor paling terpercaya di Tasikmalaya dan se-Jabar — tempat orang membeli motor tanpa ragu karena tahu barangnya asli, suratnya rapi, harganya wajar.",
              },
              {
                icon: Users,
                t: "Misi",
                d: "Menyediakan stok motor baru & bekas terlengkap dengan inspeksi jujur, kredit yang mudah dijangkau semua kalangan, tukar tambah yang fair, dan servis purna jual yang tidak berhenti saat nota ditandatangani.",
              },
              {
                icon: ShieldCheck,
                t: "Nilai Kami",
                d: "Transparan (harga & kondisi unit dijelaskan di depan), Legitim (semua surat dicek dan diserahkan lengkap), Cepat (kredit cair di hari yang sama bila data lengkap), dan Peduli (masalah purna jual kami selesaikan).",
              },
            ].map((v, i) => (
              <motion.div
                key={v.t}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="card-3d rounded-3xl border border-white/10 bg-[#141417] p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e11d2e] to-[#7f0f1a] shadow-lg shadow-[#e11d2e]/30">
                  <v.icon className="h-6 w-6 text-white" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-white">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#0b0b0d] py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#e11d2e]">Perjalanan</p>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              DARI 2020 SAMPAI <span className="text-glow-white animate-glow-white">HARI INI</span>
            </h2>
          </div>
          <div className="relative space-y-8 before:absolute before:bottom-4 before:left-[27px] before:top-4 before:w-px before:bg-gradient-to-b before:from-[#e11d2e]/60 before:via-white/15 before:to-transparent md:before:left-1/2">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative flex gap-6 md:items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#e11d2e] bg-[#141417] shadow-lg shadow-[#e11d2e]/30">
                  <t.icon className="h-6 w-6 text-[#ff6b78]" />
                </span>
                <div className={`flex-1 rounded-2xl border border-white/10 bg-[#141417] p-5 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                  <div className="font-display text-2xl font-bold text-[#f59e0b]">{t.year}</div>
                  <h3 className="mt-1 font-semibold text-white">{t.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{t.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legalitas */}
      <section className="bg-[#101013] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#e11d2e]">Legalitas</p>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              USAHA RESMI, <span className="text-stroke-red">TERDAFTAR OSS</span>
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BadgeCheck, t: "NIB", d: "1006240019347 terbit 10 Juni 2024 via OSS Kemeninvest/BKPM" },
              { icon: FileCheck2, t: "KBLI Utama", d: "47831 — Perdagangan Eceran Sepeda Motor Baru" },
              { icon: Building2, t: "Lokasi", d: "Ruko Griya Mangkubumi Indah No.1, Jl. A.H. Nasution, Kel. Cipari, Kec. Mangkubumi" },
              { icon: Wrench, t: "Workshop", d: "Servis rutin & besar di dalam area showroom, terbuka untuk umum" },
            ].map((l, i) => (
              <motion.div
                key={l.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-[#141417] p-6 text-center"
              >
                <l.icon className="mx-auto h-8 w-8 text-[#f59e0b]" />
                <h3 className="mt-3 font-display font-bold text-white">{l.t}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/55">{l.d}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="#/kontak"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e11d2e] to-[#b3121f] px-7 py-3.5 font-semibold text-white shadow-xl shadow-[#e11d2e]/30 transition hover:scale-105"
            >
              Kunjungi Showroom Kami <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   HALAMAN KONTAK
   ============================================================ */
function useOpenStatus() {
  const [status, setStatus] = useState<{ open: boolean; note: string } | null>(null);
  useEffect(() => {
    const compute = () => {
      try {
        const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
        const day = now.getDay(); // 0 Minggu
        const hour = now.getHours() + now.getMinutes() / 60;
        const weekend = day === 0 || day === 6;
        const openAt = 8;
        const closeAt = weekend ? 21 : 20;
        const open = hour >= openAt && hour < closeAt;
        setStatus({
          open,
          note: open
            ? `Buka sekarang — tutup pukul ${String(closeAt).padStart(2, "0")}.00 WIB`
            : `Tutup sekarang — buka pukul 08.00 WIB (±${weekend ? "tutup 21.00" : "tutup 20.00"} WIB)`,
        });
      } catch {
        setStatus({ open: true, note: "Buka setiap hari mulai 08.00 WIB" });
      }
    };
    compute();
    const t = setInterval(compute, 60000);
    return () => clearInterval(t);
  }, []);
  return status;
}

export function KontakPage() {
  const status = useOpenStatus();
  const [nama, setNama] = useState("");
  const [hp, setHp] = useState("");
  const [topik, setTopik] = useState("");
  const [pesan, setPesan] = useState("");
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !hp.trim() || !topik.trim()) {
      toast({ title: "Data belum lengkap", description: "Nama, nomor HP/WA, dan topik wajib diisi ya." });
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "kontak", name: nama, phone: hp, bikeDetail: topik, message: pesan }),
      });
      const json = await res.json();
      if (json.ok) {
        toast({
          title: "Pesan terkirim!",
          description: "Data tersimpan. Melanjutkan ke WhatsApp untuk balasan tercepat...",
        });
        if (json.waUrl) window.open(json.waUrl, "_blank");
        setNama(""); setHp(""); setTopik(""); setPesan("");
      } else {
        toast({ title: "Gagal mengirim", description: json.error || "Coba lagi ya.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Koneksi bermasalah", description: "Periksa internet lalu coba lagi.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <PageHero
        kicker="Hubungi Kami"
        title="KONTAK"
        accent="JUANA MOTOR"
        desc="Satu nomor WhatsApp untuk semua kebutuhan: tanya stok, nego harga, jadwal servis, sampai ajak kompromi harga motor impianmu."
      />

      <section className="bg-[#0b0b0d] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Kartu kontak */}
            <div className="flex flex-col gap-4 lg:col-span-2">
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                href={waLink("Halo Juana Motor Tasikmalaya! Saya menghubungi dari website.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-[#25D366]/30 bg-gradient-to-br from-[#25D366]/10 to-transparent p-6 transition hover:border-[#25D366]/60"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] shadow-lg shadow-[#25D366]/30">
                    <Phone className="h-6 w-6 text-[#06250f]" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/50">WhatsApp Resmi</p>
                    <p className="font-display text-xl font-bold text-white">{SITE.whatsappDisplay}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-white/50 group-hover:text-[#25D366]">
                  Klik untuk chat langsung — dibalas cepat setiap hari
                </p>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-3xl border border-white/10 bg-[#141417] p-6"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#e11d2e]" />
                  <div>
                    <h3 className="font-semibold text-white">Alamat Showroom</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/60">{SITE.address.full}</p>
                    <p className="mt-2 rounded-xl border border-[#f59e0b]/25 bg-[#f59e0b]/10 px-3 py-2 text-xs font-medium text-[#f59e0b]">
                      {SITE.address.landmark}
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
                <div className="mt-4 flex items-start gap-3 border-t border-white/10 pt-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#25D366]" />
                  <div className="w-full">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-white">Jam Operasional</h3>
                      {status && (
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                            status.open
                              ? "bg-[#25D366]/15 text-[#25D366]"
                              : "bg-[#e11d2e]/15 text-[#ff6b78]"
                          }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${status.open ? "bg-[#25D366] animate-blink" : "bg-[#ff6b78]"}`} />
                          {status.open ? "Buka" : "Tutup"}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-white/50">{status?.note ?? "Memuat status..."}</p>
                    <div className="mt-2 space-y-1">
                      {SITE.hours.map((h) => (
                        <div key={h.day} className="flex items-center justify-between text-sm">
                          <span className="text-white/55">{h.day}</span>
                          <span className="font-medium text-white/85">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                href={SITE.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e11d2e] to-[#b3121f] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#e11d2e]/30 transition hover:scale-[1.02]"
              >
                <Navigation className="h-4 w-4" /> Buka Rute di Google Maps
              </motion.a>
            </div>

            {/* Form pesan */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-3xl border border-white/10 bg-[#141417] p-6 md:p-8 lg:col-span-3"
            >
              <h3 className="font-display text-2xl font-bold text-white">Kirim Pesan</h3>
              <p className="mt-1 text-sm text-white/50">
                Isi formulir ini — datanya tercatat di sistem kami, lalu kamu diarahkan ke WhatsApp untuk balasan tercepat.
              </p>
              <form onSubmit={submit} className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="knama" className="text-white/80">Nama <span className="text-[#e11d2e]">*</span></Label>
                    <Input id="knama" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama kamu" className="border-white/10 bg-[#101013] text-white placeholder:text-white/30" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="khp" className="text-white/80">No. HP / WhatsApp <span className="text-[#e11d2e]">*</span></Label>
                    <Input id="khp" value={hp} onChange={(e) => setHp(e.target.value)} placeholder="08xx xxxx xxxx" className="border-white/10 bg-[#101013] text-white placeholder:text-white/30" />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="ktopik" className="text-white/80">Topik <span className="text-[#e11d2e]">*</span></Label>
                  <Input id="ktopik" value={topik} onChange={(e) => setTopik(e.target.value)} placeholder="Contoh: Tanya stok Vario 2026 / Booking servis / Nego harga" className="border-white/10 bg-[#101013] text-white placeholder:text-white/30" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="kpesan" className="text-white/80">Pesan</Label>
                  <Textarea id="kpesan" value={pesan} onChange={(e) => setPesan(e.target.value)} rows={5} placeholder="Tulis pertanyaan atau permintaanmu di sini..." className="border-white/10 bg-[#101013] text-white placeholder:text-white/30" />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#e11d2e] to-[#b3121f] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#e11d2e]/30 transition hover:scale-[1.02] disabled:opacity-60"
                >
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {sending ? "Mengirim..." : "Kirim & Lanjut ke WhatsApp"}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Peta */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 overflow-hidden rounded-3xl border border-white/10"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#141417] px-5 py-3">
              <p className="flex items-center gap-2 text-sm font-semibold text-white">
                <MapPin className="h-4 w-4 text-[#e11d2e]" /> Peta Lokasi — Pintu Masuk Perum Griya Asri Mangkubumi Indah
              </p>
              <p className="text-xs text-white/45">
                {SITE.coordinates.dms}
              </p>
            </div>
            <iframe
              src={SITE.mapsEmbed}
              title="Peta lokasi Juana Motor Tasikmalaya"
              className="h-[380px] w-full border-0 grayscale-[30%] contrast-[1.1]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   HALAMAN TIPS & PANDUAN
   ============================================================ */
const TIPS = [
  {
    icon: ShieldCheck,
    t: "Cara Cek Motor Bekas Sebelum Membeli",
    min: "5 menit baca",
    d: "Panduan inspeksi ringan yang bisa kamu lakukan sendiri sebelum deal — sama dengan 7 poin pertama inspeksi 25 titik kami.",
    points: [
      "Cek nomor mesin & nomor rangka: pastikan cocok dengan yang tertulis di STNK/BPKB, tidak ada bekas las atau garis parsial.",
      "Sediakan kertas cek nomor rangka (kertas lubang): taruh di sekitar nomor rangka dan lihat bila ada bekas benda baku/parsial.",
      "Nyalakan mesin saat dingin — suara halus tanpa bunyi metal, tidak ada asap biru/putih pekat saat akselerasi.",
      "Tes kompresi sederhana: buang gear netral, putar throttle — putaran mesin naik-turun responsif tanpa gagal.",
      "Cek rantai/gir & ban: gigi gir jangan sudah tipis, ban harus masih ada sisa profil dan usia produksinya maksimal 4-5 tahun.",
      "Cek dokumen: STNK tahun masih aktif, BPKB asli (bukan fotokopi), faktur, dan (untuk bekas) tidak ada surat mati/jaminan.",
    ],
  },
  {
    icon: BadgePercent,
    t: "5 Tips Kredit Motor Disetujui Cepat",
    min: "4 menit baca",
    d: "Rahasia dari balik meja leasing — data seperti ini yang membuat survei lolos dan angsuran disetujui di hari yang sama.",
    points: [
      "Siapkan KTP asli + KK + nama jelas sesuai dokumen — satu huruf beda bisa bikin data ganda di sistem leasing.",
      "Sertakan bukti penghasilan: slip gaji 3 bulan terakhir, rekening koran, atau surat usaha bila wiraswasta.",
      "DP yang wajar (15-20% untuk unit menengah) memberi peluang approval jauh lebih besar daripada DP minim.",
      "Nomor HP aktif & bisa dihubungi saat survei — leasing sering menelepon dalam hitungan jam setelah pengajuan.",
      "Jangan ajukan ke banyak leasing sekaligus di hari sama; riwayat inquiry ganda bisa menurunkan skor kreditmu.",
    ],
  },
  {
    icon: FileCheck2,
    t: "Urutan Dokumen Balik Nama di Samsat",
    min: "6 menit baca",
    d: "Checklist lengkap balik nama STNK & BPKB di Samsat Tasikmalaya agar tidak bolak-balik.",
    points: [
      "Dokumen wajib: STNK asli + BPKB asli + KTP penjual & pembeli (asli dan fotokopi) + KK pembeli + pajak aktif.",
      "Jika nama di STNK beda dengan KTP penjual, siapkan surat kuasa bermaterai dan tanda tangan sesuai dokumen.",
      "Bayar PNBP ganti kepemilikan + verifikasi fisik kendaraan di loket — jadwalkan pagi agar selesai dalam sehari.",
      "Cek dulu status pajak di Signal / Samsat: motor belum balik nama dijual saat pajak mati bisa dikenakan denda bertumpuk.",
      "Minta penjual tulis kuitansi + salin KTP penjual sebagai bukti sah transaksi — ini menawarkan perlindungan hukummu.",
    ],
  },
  {
    icon: HandCoins,
    t: "Rahasia Motor Bekas Terjual Cepat & Harga Bagus",
    min: "4 menit baca",
    d: "Tips dari pengalaman ribuan motor masuk-keluar showroom Juana Motor — kenapa motor A terjual 3 hari dan motor B 3 bulan.",
    points: [
      "Cuci motor tapi jangan bongkar-pasang baru; motor bersih + mesin asli terlihat lebih mahal di mata pembeli.",
      "Servis rutin terakhir ditagihkan: bukti servis (nota bengkel) menaikkan kepercayaan dan nilai tawaran.",
      "Foto bagus = jualan bagus: 6-8 foto siang terang (depan, belakang, mesin, odometer, surat) tanpa filter berlebihan.",
      "Pahami harga pasar: cek katalog jual-beli sejenis (umur, km, kondisi) — minta tawaran 5-10% di atas harga minimummu.",
      "Siapkan jawaban jujur untuk riwayat motor: pernah jatuh ringan itu wajar, yang penting tidak kontak baku & semua berfungsi.",
    ],
  },
  {
    icon: Wrench,
    t: "Jadwal Servis Rutin yang Benar",
    min: "3 menit baca",
    d: "Interval servis sesuai pemakaian harian di jalur Tasikmalaya (jalanan naik-turun menuntut perawatan lebih sering).",
    points: [
      "Ganti oli mesin: 1.500 - 2.000 km sekali (atau maksimal 3 bulan) — oli murah lebih murah daripada overhaul mesin.",
      "Cek & rantai/gir tiap 1.000 km: bersihkan dan beri pelumas rantai; gir mulus masih bisa dipakai sampai keausan merata.",
      "Tune-up & setelan karburator/injeksi tiap 4.000 km — penting untuk motor harian lewat tanjakan Mangkubumi-Kawalu.",
      "Bukit belakang & kampas rem dicek tiap 2 bulan: pedal rem terasa lunak adalah tanda kampas sudah habis.",
      "Servis besar di 10.000 km: cek tappet, busi, filter udara, dan kondisi transmisi — mencegah kerusakan mahal di kemudian hari.",
    ],
  },
  {
    icon: KeyRound,
    t: "Skema Tukar Tambah yang Menguntungkan",
    min: "5 menit baca",
    d: "Strategi memaksimalkan nilai motor lama saat tukar tambah ke motor baru di showroom kami.",
    points: [
      "Datang saat motor masih mulus & surat lengkap — inspeksi pertama menentukan baseline harga; mulus dari awal = tawaran tinggi.",
      "Bawa bukti servis & nota pembelian aksesori (helm, kaca, box) — aksesori terpasang rapi kadang dihitung nilainya.",
      "Minta dua skema: trade-in langsung tunai-to-unit, atau jual tunai + beli motor baru terpisah; bandingkan mana yang rugi paling kecil.",
      "Tukar tambah saat promo (biasanya akhir bulan / hari besar) sering dapat bonus tambahan di atas harga standar.",
      "Deal yang baik: nilai motor lama + DP tunai = DP motor baru yang wajar, bukan trade-in yang memaksa harga motor baru naik.",
    ],
  },
];

export function TipsPage() {
  return (
    <div>
      <PageHero
        kicker="Wawasan Motor"
        title="TIPS &"
        accent="PANDUAN"
        desc="Pengetahuan praktis dari pengalaman berjualan ribuan motor di Tasikmalaya — supaya kamu beli, jual, dan rawat motor dengan kepala dingin."
      />

      <section className="bg-[#0b0b0d] py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex items-center gap-2 rounded-2xl border border-[#f59e0b]/25 bg-[#f59e0b]/10 px-4 py-3 text-xs text-[#f59e0b]"
          >
            <BookOpen className="h-4 w-4 shrink-0" />
            Semua panduan ditulis dari pengalaman showroom langsung — bukan teori. Ada pertanyaan spesifik? Chat kami via WhatsApp.
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {TIPS.map((tip, i) => (
              <motion.div
                key={tip.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.06, 0.3) }}
              >
                <AccordionItem value={`tip-${i}`} className="rounded-2xl border border-white/10 bg-[#141417] px-5 md:px-6">
                  <AccordionTrigger className="gap-3 py-4 text-left hover:no-underline">
                    <span className="flex items-center gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#e11d2e] to-[#7f0f1a]">
                        <tip.icon className="h-5 w-5 text-white" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-white md:text-base">{tip.t}</span>
                        <span className="mt-0.5 block text-[11px] font-medium text-white/45">{tip.min}</span>
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <p className="text-sm leading-relaxed text-white/60">{tip.d}</p>
                    <ul className="mt-4 space-y-2.5">
                      {tip.points.map((p) => (
                        <li key={p.slice(0, 24)} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/70">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#25D366]" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#141417] to-[#101013] p-8 text-center"
          >
            <h3 className="font-display text-2xl font-bold text-white">Motor Kamu Ingin Diperiksa Gratis?</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/55">
              Bawa motor ke showroom — tim kami cek kondisi dan nilai pasar secara gratis, tanpa kewajiban jual.
            </p>
            <div className="mt-6">
              <WaCta message="Halo Juana Motor, saya ingin bawa motor untuk diperiksa dan dinilai gratis. Boleh?" label="Jadwalkan Pemeriksaan" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   HALAMAN PROMO
   ============================================================ */
const PROMOS = [
  {
    icon: BadgePercent,
    badge: "DP MULAI 10%",
    t: "Kredit Motor Baru DP Ringan",
    d: "DP mulai 10% untuk pilihan motor matic terlaris. Angsuran ringan, tenor sampai 36 bulan, survey cair cepat.",
    wa: "Halo Juana Motor, saya tertarik promo DP mulai 10% motor baru. Boleh info model yang tersedia?",
  },
  {
    icon: FileCheck2,
    badge: "GRATIS",
    t: "Gratis Balik Nama Motor Bekas",
    d: "Beli motor bekas pilihan bulan ini — biaya jasa balik nama STNK & BPKB kami tanggung. Kamu cukup bayar tarif resmi Samsat.",
    wa: "Halo Juana Motor, saya mau tanya promo gratis balik nama motor bekas.",
  },
  {
    icon: ShieldCheck,
    badge: "GARANSI MESIN",
    t: "Garansi Mesin Unit Bekas Grade A",
    d: "Semua motor bekas Grade A dijamin garansi mesin. Kalau ada masalah bobot mesin dalam masa garansi, kami perbaiki tanpa biaya jasa.",
    wa: "Halo Juana Motor, saya mau lihat motor bekas Grade A dengan garansi mesin.",
  },
  {
    icon: HandCoins,
    badge: "TUKAR TAMBAH +",
    t: "Bonus Tukar Tambah Rp500 Ribu",
    d: "Tukar motor lama ke motor baru/bekas bulan ini: nilai motor lama ditambah bonus Rp500.000 di atas penilaian normal.",
    wa: "Halo Juana Motor, saya mau tukar tambah motor lama. Masih ada bonus Rp500 ribu?",
  },
  {
    icon: GraduationCap,
    badge: "MAHASISWA & PNS",
    t: "Harga Khusus Mahasiswa & ASN",
    d: "Tunjukkan kartu mahasiswa / kartu PNS: harga khusus + bunga ringan dari mitra leasing terpilih. Berlaku untuk motor tertentu.",
    wa: "Halo Juana Motor, saya mahasiswa/PNS, mau tanya harga khusus promo.",
  },
  {
    icon: Users,
    badge: "REFERRAL",
    t: "Ajak Teman, Dapat Reward",
    d: "Kenalkan temanmu beli motor di Juana Motor — dapatkan reward langsung setelah transaksi temanmu selesai. Tanpa batas jumlah referensi.",
    wa: "Halo Juana Motor, saya mau info program referral reward.",
  },
];

export function PromoPage() {
  return (
    <div>
      <PageHero
        kicker="Penawaran Spesial"
        title="PROMO"
        accent="NOVEMBER 2026"
        desc="Penawaran terbaik bulan ini dari Juana Motor Tasikmalaya. Semua promo berlaku selama stok tersedia — konfirmasi dulu via WhatsApp ya!"
      />

      <section className="bg-[#0b0b0d] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROMOS.map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.08, 0.4) }}
                className="card-3d group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#141417] p-6"
              >
                <div className="shine absolute inset-0" />
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-gradient-to-r from-[#e11d2e] to-[#b3121f] px-3.5 py-1.5 text-[10px] font-bold tracking-wider text-white shadow-lg">
                    {p.badge}
                  </span>
                  <p.icon className="h-7 w-7 text-[#f59e0b] transition-transform group-hover:scale-110" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-white">{p.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{p.d}</p>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="flex items-center gap-1.5 text-[11px] text-white/40">
                    <CalendarDays className="h-3.5 w-3.5" /> Berlaku Nov 2026 — stok tersedia
                  </span>
                  <a
                    href={waLink(p.wa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-[#06250f] transition hover:brightness-110"
                  >
                    Klaim <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-white/40"
          >
            * Syarat & ketentuan berlaku. Promo dapat berubah sewaktu-waktu mengikuti kebijakan showroom dan mitra leasing.
            Harga final, stok, dan detail promo dikonfirmasi langsung oleh tim Juana Motor via WhatsApp {SITE.whatsappDisplay}.
          </motion.p>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   HALAMAN SYARAT & KETENTUAN + KEBIJAKAN PRIVASI
   ============================================================ */
export function LegalPage() {
  return (
    <div>
      <PageHero
        kicker="Legal"
        title="SYARAT & KETENTUAN DAN"
        accent="PRIVASI"
        desc="Aturan penggunaan website serta kebijakan perlindungan data pengunjung Juana Motor Tasikmalaya."
      />

      <section className="bg-[#0b0b0d] py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <Tabs defaultValue="skt" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-2xl border border-white/10 bg-[#141417] p-1.5">
              <TabsTrigger value="skt" className="rounded-xl data-[state=active]:bg-[#e11d2e] data-[state=active]:text-white">
                <ScrollText className="mr-2 h-4 w-4" /> Syarat & Ketentuan
              </TabsTrigger>
              <TabsTrigger value="privasi" className="rounded-xl data-[state=active]:bg-[#e11d2e] data-[state=active]:text-white">
                <Lock className="mr-2 h-4 w-4" /> Kebijakan Privasi
              </TabsTrigger>
            </TabsList>

            <TabsContent value="skt" className="mt-6">
              <div className="space-y-6 rounded-3xl border border-white/10 bg-[#141417] p-6 md:p-8">
                {[
                  {
                    icon: Building2,
                    t: "1. Tentang Layanan",
                    c: "Website ini menampilkan katalog dan informasi layanan Showroom Motor Mulya Juana Tasikmalaya (usaha resmi atas nama Ujang Juana, NIB 1006240019347, KBLI 47831, berlokasi di Ruko Griya Mangkubumi Indah No.1, Jl. A.H. Nasution, Kel. Cipari, Kec. Mangkubumi, Kota Tasikmalaya). Penggunaan website berarti kamu menyetujui syarat berikut.",
                  },
                  {
                    icon: FileText,
                    t: "2. Harga & Ketersediaan",
                    c: "Semua harga tampil sebagai estimasi pasar per November 2026 dan dapat berubah tanpa pemberitahuan. Ketersediaan unit, warna, serta detail promo dikonfirmasi ulang saat transaksi. Harga final disepakati tertulis di nota/nota perjanjian jual beli.",
                  },
                  {
                    icon: Scale,
                    t: "3. Transaksi & Pembayaran",
                    c: "Transaksi resmi hanya sah bila dilakukan di showroom atau melalui komunikasi WhatsApp resmi kami dan tertuang dalam nota bernomor. Kami tidak pernah meminta transfer ke rekening pribadi yang tidak tertulis di nota. Waspadai modus penipuan mengatasnamakan Juana Motor.",
                  },
                  {
                    icon: HandCoins,
                    t: "4. Penjualan & Tukar Tambah Motor",
                    c: "Nilai jual / tukar tambah motor pelanggan ditetapkan setelah inspeksi fisik dan dokumen. Keputusan harga akhir bersifat final saat disepakati kedua pihak dan dibayarkan/dicatat di nota.",
                  },
                  {
                    icon: ShieldCheck,
                    t: "5. Garansi",
                    c: "Garansi motor baru mengikuti ketentuan resmi distributor. Garansi mesin motor bekas berlaku sesuai ketentuan yang tertulis di nota dan hanya untuk komponen yang tercantum; kerusakan akibat pemakaian tidak wajar, kecelakaan, atau modifikasi tidak termasuk.",
                  },
                  {
                    icon: Award,
                    t: "6. Kredit & Mitra Leasing",
                    c: "Persetujuan kredit berada sepenuhnya pada kebijakan mitra leasing (Adira, BAF, FIF, WOM, Mega Auto, dll). Simulasi angsuran di website adalah perkiraan dan bukan penawaran mengikat.",
                  },
                  {
                    icon: Landmark,
                    t: "7. Hak Kekayaan Intelektual & Perubahan",
                    c: "Seluruh konten website ini milik Juana Motor Tasikmalaya. Desain dan pengembangan website oleh digiman.id (PT Digital Bisnis Manajemen) dengan lisensi PT Top Konsultan Internasional (topkonsultan.web.id). Juana Motor dapat memperbarui syarat ini kapan saja; versi terbaru selalu tampil di halaman ini.",
                  },
                ].map((s) => (
                  <div key={s.t} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e11d2e]/15">
                      <s.icon className="h-5 w-5 text-[#ff6b78]" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">{s.t}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/55">{s.c}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="privasi" className="mt-6">
              <div className="space-y-6 rounded-3xl border border-white/10 bg-[#141417] p-6 md:p-8">
                {[
                  {
                    icon: Lock,
                    t: "1. Data yang Kami Kumpulkan",
                    c: "Saat kamu mengisi formulir di website (kontak, jual motor, tukar tambah) atau menghubungi WhatsApp kami, kami mengumpulkan: nama, nomor HP/WhatsApp, detail motor (merek, tahun, kilometer, harga harapan), dan isi pesanmu. Data ini hanya digunakan untuk memproses permintaanmu.",
                  },
                  {
                    icon: Users,
                    t: "2. Cara Kami Menggunakan Data",
                    c: "Data digunakan untuk: (a) menghubungimu balik mengenai permintaan yang kamu ajukan; (b) mencatat transaksi atau negosiasi di sistem showroom; (c) meningkatkan layanan pelanggan. Kami tidak menjual atau menyewakan datamu ke pihak ketiga untuk keperluan pemasaran.",
                  },
                  {
                    icon: ShieldCheck,
                    t: "3. Penyimpanan & Keamanan",
                    c: "Data tersimpan di database showroom dengan akses terbatas hanya untuk staf terkait. Kami menerapkan praktik keamanan yang wajar; namun tak ada sistem yang 100% aman — karenanya hindari mengirim data sangat sensitif (seperti foto KTP penuh) melalui website, cukup melalui WhatsApp resmi saat sudah siap bertransaksi.",
                  },
                  {
                    icon: Timer,
                    t: "4. Retensi & Hakmu sebagai Pengguna",
                    c: "Data permintaan yang tidak berlanjut ke transaksi kami hapus dalam jangka waktu yang wajar. Kamu berhak meminta salinan, koreksi, atau penghapusan datamu kapan saja dengan menghubungi WhatsApp kami dan menyebutkan nomor referensi pesan.",
                  },
                  {
                    icon: ExternalLink,
                    t: "5. Layanan Pihak Ketiga",
                    c: "Website ini menyematkan Google Maps (menampilkan lokasi) dan tautan WhatsApp. Ketika membuka layanan tersebut, kebijakan privasi masing-masing platform berlaku. Kredit diperoleh melalui mitra leasing juga tunduk pada kebijakan privasi leasing tersebut.",
                  },
                  {
                    icon: Phone,
                    t: "6. Kontak Privasi & Terakhir Diperbarui",
                    c: `Pertanyaan tentang kebijakan ini bisa dikirim ke ${SITE.email} atau WhatsApp ${SITE.whatsappDisplay}. Kebijakan ini terakhir diperbarui 25 November 2026 dan dapat berubah; perubahan diumumkan di halaman ini.`,
                  },
                ].map((s) => (
                  <div key={s.t} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15">
                      <s.icon className="h-5 w-5 text-[#25D366]" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">{s.t}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/55">{s.c}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <a href="#/kontak" className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff6b78] hover:underline">
              Ada pertanyaan tentang kebijakan ini? Hubungi kami <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
