"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Gauge, Fuel, Calendar, Cog, BadgeCheck, X, MessageCircle,
  Bike, Settings2, ChevronRight, Loader2,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { waLink, formatRupiah, BRANDS } from "@/config/site";

export type Motor = {
  id: string;
  name: string;
  brand: string;
  category: string;
  condition: string;
  year: number;
  engineCc: number;
  transmission: string;
  fuelType: string;
  color: string;
  price: number;
  priceMin: number | null;
  priceMax: number | null;
  image: string;
  badge: string | null;
  stock: number;
  mileageKm: number | null;
  grade: string | null;
  specs: string;
  description: string;
  featured: boolean;
};

const KATEGORI = [
  { v: "", label: "Semua" },
  { v: "matic", label: "Matic" },
  { v: "sport", label: "Sport" },
  { v: "bebek", label: "Bebek" },
  { v: "trail", label: "Trail" },
  { v: "retro", label: "Retro" },
  { v: "elektrik", label: "Listrik" },
];

const HARGA_BARU = [
  { v: "", label: "Semua" },
  { v: "0-22000000", label: "< Rp22 jt" },
  { v: "22000000-32000000", label: "Rp22-32 jt" },
  { v: "32000000-45000000", label: "Rp32-45 jt" },
  { v: "45000000-999999999", label: "> Rp45 jt" },
];

const HARGA_BEKAS = [
  { v: "", label: "Semua" },
  { v: "0-12000000", label: "< Rp12 jt" },
  { v: "12000000-20000000", label: "Rp12-20 jt" },
  { v: "20000000-30000000", label: "Rp20-30 jt" },
  { v: "30000000-999999999", label: "> Rp30 jt" },
];

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
        active
          ? "bg-[#e11d2e] text-white shadow-md shadow-[#e11d2e]/40 scale-105"
          : "border border-white/15 bg-white/5 text-white/60 hover:border-white/30 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function MotorCard({ m, onDetail, index }: { m: Motor; onDetail: (m: Motor) => void; index: number }) {
  const harga =
    m.condition === "bekas" && m.priceMin != null && m.priceMax != null
      ? `${formatRupiah(m.priceMin)} - ${formatRupiah(m.priceMax)}`
      : formatRupiah(m.price);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
      className="card-3d group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141417]"
    >
      {m.badge && (
        <span className="absolute left-3 top-3 z-20 rounded-full bg-gradient-to-r from-[#e11d2e] to-[#b3121f] px-3 py-1 text-[10px] font-bold tracking-wider text-white shadow-lg">
          {m.badge}
        </span>
      )}
      {m.condition === "bekas" && m.grade && (
        <span className="absolute right-3 top-3 z-20 rounded-full border border-[#f59e0b]/50 bg-[#f59e0b]/15 px-3 py-1 text-[10px] font-bold tracking-wider text-[#f59e0b]">
          GRADE {m.grade}
        </span>
      )}

      <div className="relative overflow-hidden bg-gradient-to-b from-[#1b1b1f] to-[#101013]">
        <img
          src={m.image}
          alt={`${m.brand} ${m.name} ${m.year} di Juana Motor Tasikmalaya`}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#141417] to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#f59e0b]">{m.brand}</p>
          <h3 className="font-display text-lg font-semibold leading-tight text-white">{m.name}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 text-[11px] text-white/60">
          <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1">
            <Calendar className="h-3 w-3" /> {m.year}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1">
            <Cog className="h-3 w-3" /> {m.engineCc > 0 ? `${m.engineCc} cc` : "Listrik"}
          </span>
          {m.condition === "bekas" && m.mileageKm != null && (
            <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1">
              <Gauge className="h-3 w-3" /> {new Intl.NumberFormat("id-ID").format(m.mileageKm)} km
            </span>
          )}
          {m.condition === "baru" && (
            <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-1">
              <BadgeCheck className="h-3 w-3" /> Stok {m.stock}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/45">
              {m.condition === "baru" ? "Harga OTR (est.)" : "Kisaran Harga (est.)"}
            </p>
            <p className="font-display text-xl font-bold text-[#ff4d5a]">{harga}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onDetail(m)}
            className="flex items-center justify-center gap-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10"
          >
            Detail <ChevronRight className="h-3.5 w-3.5" />
          </button>
          <a
            href={waLink(
              `Halo Juana Motor, saya tertarik dengan ${m.name} (${m.condition === "baru" ? "baru" : "bekas"}) tahun ${m.year}. Masih tersedia?`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-xl bg-[#25D366] px-3 py-2.5 text-xs font-bold text-[#06250f] transition hover:brightness-110"
          >
            <MessageCircle className="h-3.5 w-3.5" /> Tanya
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Catalog() {
  const [condition, setCondition] = useState<"baru" | "bekas">("baru");
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [brand, setBrand] = useState("");
  const [kategori, setKategori] = useState("");
  const [harga, setHarga] = useState("");
  const [items, setItems] = useState<Motor[]>([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<Motor | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const hashSync = () => {
      if (window.location.hash === "#motor-bekas") setCondition("bekas");
    };
    hashSync();
    window.addEventListener("hashchange", hashSync);
    return () => window.removeEventListener("hashchange", hashSync);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQ(q), 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [q]);

  const priceList = condition === "baru" ? HARGA_BARU : HARGA_BEKAS;

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const p = new URLSearchParams({ condition });
      if (debouncedQ) p.set("q", debouncedQ);
      if (brand) p.set("brand", brand);
      if (kategori) p.set("category", kategori);
      if (harga) {
        const [min, max] = harga.split("-");
        p.set("minPrice", min);
        p.set("maxPrice", max);
      }
      const res = await fetch(`/api/motorcycles?${p.toString()}`);
      const json = await res.json();
      if (json.ok) setItems(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [condition, debouncedQ, brand, kategori, harga]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const totalSpec = useMemo(() => {
    return items.length;
  }, [items]);

  return (
    <section id="katalog" className="relative scroll-mt-24 bg-[#0b0b0d] py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(225,29,46,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.35em] text-[#e11d2e]">
            <Bike className="h-4 w-4" /> Showroom Kami
          </p>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
            KATALOG <span className="text-stroke-red">MOTOR</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            Stok lengkap motor baru & bekas pilihan dengan harga estimasi pasar Tasikmalaya.
            Harga dapat berubah — chat kami untuk penawaran terkini hari ini.
          </p>
        </motion.div>

        {/* Tab kondisi */}
        <div className="mb-8 flex justify-center">
          <div className="relative flex rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur">
            {(["baru", "bekas"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCondition(c)}
                className={`relative z-10 rounded-full px-6 py-2.5 font-display text-sm font-bold uppercase tracking-wider transition-all ${
                  condition === c ? "text-white" : "text-white/45 hover:text-white/80"
                }`}
              >
                {condition === c && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#e11d2e] to-[#b3121f] shadow-lg shadow-[#e11d2e]/40"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                )}
                {c === "baru" ? "Motor Baru" : "Motor Bekas"}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar filter */}
        <div id="motor-bekas" className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur md:p-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[220px] flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Cari motor... (vario, nmax, satria, beat)"
                  className="w-full rounded-xl border border-white/10 bg-[#101013] py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#e11d2e]/60 focus:ring-2 focus:ring-[#e11d2e]/25"
                />
                {q && (
                  <button onClick={() => setQ("")} aria-label="Hapus pencarian" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="text-xs text-white/50">
                {loading ? (
                  <span className="flex items-center gap-2"><Loader2 className="h-3.5 w-3.5 animate-spin" /> Memuat…</span>
                ) : (
                  <span><strong className="text-[#f59e0b]">{totalSpec}</strong> unit ditemukan</span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Settings2 className="h-4 w-4 text-white/40" />
              <Chip active={brand === ""} onClick={() => setBrand("")}>Semua Merk</Chip>
              {BRANDS.map((b) => (
                <Chip key={b} active={brand === b} onClick={() => setBrand(brand === b ? "" : b)}>{b}</Chip>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Cog className="h-4 w-4 text-white/40" />
              {KATEGORI.map((k) => (
                <Chip key={k.v} active={kategori === k.v} onClick={() => setKategori(k.v)}>{k.label}</Chip>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Fuel className="h-4 w-4 text-white/40" />
              {priceList.map((h) => (
                <Chip key={h.v} active={harga === h.v} onClick={() => setHarga(h.v)}>{h.label}</Chip>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div key="load" className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl border border-white/5 bg-white/[0.04]" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div key="empty" className="mt-14 text-center">
              <Bike className="mx-auto mb-4 h-12 w-12 text-white/20" />
              <p className="text-white/60">Tidak ada motor yang cocok dengan filter. Coba longgarkan pencarian ya!</p>
            </div>
          ) : (
            <div key={`${condition}-${items.length}`} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((m, i) => (
                <MotorCard key={m.id} m={m} onDetail={setDetail} index={i} />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Dialog detail */}
      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent aria-describedby={undefined} className="max-w-3xl border-white/10 bg-[#141417] text-white">
          {detail && (
            <div className="grid gap-5 md:grid-cols-2">
              <div className="overflow-hidden rounded-xl bg-[#101013]">
                <img src={detail.image} alt={detail.name} className="h-full max-h-72 w-full object-cover md:max-h-none" />
              </div>
              <div>
                <DialogHeader className="items-start text-left">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#f59e0b]">
                    {detail.brand} • {detail.condition === "baru" ? "Unit Baru" : `Bekas Grade ${detail.grade}`}
                  </p>
                  <DialogTitle className="font-display text-2xl">{detail.name}</DialogTitle>
                </DialogHeader>
                <p className="mt-1 text-sm leading-relaxed text-white/65">{detail.description}</p>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  {[
                    { l: "Tahun", v: String(detail.year) },
                    { l: "Mesin", v: detail.engineCc > 0 ? `${detail.engineCc} cc` : "Motor Listrik" },
                    { l: "Transmisi", v: detail.transmission },
                    { l: "Bahan Bakar", v: detail.fuelType },
                    { l: "Warna", v: detail.color },
                    ...(detail.mileageKm != null ? [{ l: "Kilometer", v: `${new Intl.NumberFormat("id-ID").format(detail.mileageKm)} km` }] : []),
                    ...Object.entries(JSON.parse(detail.specs || "{}"))
                      .map(([l, v]) => ({ l: l.charAt(0).toUpperCase() + l.slice(1), v: String(v) }))
                      .filter((s) => !["tahun", "mesin", "transmisi", "bahan bakar", "warna", "kilometer"].includes(s.l.toLowerCase())),
                  ].map((s) => (
                    <div key={s.l} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                      <p className="text-[10px] uppercase tracking-wider text-white/45">{s.l}</p>
                      <p className="font-medium text-white/85">{s.v}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-[#e11d2e]/30 bg-[#e11d2e]/10 p-3.5">
                  <p className="text-[10px] uppercase tracking-wider text-white/50">
                    {detail.condition === "baru" ? "Harga OTR (estimasi)" : "Kisaran Harga (estimasi)"}
                  </p>
                  <p className="font-display text-2xl font-bold text-[#ff4d5a]">
                    {detail.condition === "bekas" && detail.priceMin != null && detail.priceMax != null
                      ? `${formatRupiah(detail.priceMin)} - ${formatRupiah(detail.priceMax)}`
                      : formatRupiah(detail.price)}
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <a
                    href={waLink(`Halo Juana Motor, saya mau nego unit ${detail.name} tahun ${detail.year}. Boleh info harga terbaiknya?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-[#06250f] transition hover:brightness-110"
                  >
                    <MessageCircle className="h-4 w-4" /> Nego via WA
                  </a>
                  <a
                    href="#kredit"
                    onClick={() => setDetail(null)}
                    className="flex flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Simulasi Kredit
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
