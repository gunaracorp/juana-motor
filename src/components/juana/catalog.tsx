"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Gauge, Fuel, Calendar, Cog, BadgeCheck, X, MessageCircle,
  Bike, Settings2, ChevronRight, Loader2, ArrowRight, LayoutGrid,
  ArrowUpDown, Banknote, Sparkles,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { waLink, formatRupiah, BRANDS } from "@/config/site";
import { goPage } from "@/config/nav";

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
  { v: "", label: "Semua Kelas" },
  { v: "matic", label: "Matic" },
  { v: "premium", label: "Premium Scooter" },
  { v: "sport", label: "Sport" },
  { v: "naked", label: "Naked" },
  { v: "bebek", label: "Bebek" },
  { v: "klasik", label: "Klasik/Retro" },
  { v: "trail", label: "Trail/ADV" },
  { v: "elektrik", label: "Listrik" },
  { v: "roda3", label: "Roda 3" },
];

const HARGA_BARU = [
  { v: "", label: "Semua Harga" },
  { v: "0-20000000", label: "< Rp20 jt" },
  { v: "20000000-30000000", label: "Rp20-30 jt" },
  { v: "30000000-45000000", label: "Rp30-45 jt" },
  { v: "45000000-100000000", label: "Rp45-100 jt" },
  { v: "100000000-999999999", label: "> Rp100 jt (Big Bike)" },
];

const HARGA_BEKAS = [
  { v: "", label: "Semua Harga" },
  { v: "0-12000000", label: "< Rp12 jt" },
  { v: "12000000-20000000", label: "Rp12-20 jt" },
  { v: "20000000-30000000", label: "Rp20-30 jt" },
  { v: "30000000-60000000", label: "Rp30-60 jt" },
  { v: "60000000-999999999", label: "> Rp60 jt (Premium)" },
];

const SORT_OPTS = [
  { v: "featured", label: "Paling Dicari" },
  { v: "harga-asc", label: "Harga Terendah" },
  { v: "harga-desc", label: "Harga Tertinggi" },
  { v: "tahun", label: "Tahun Terbaru" },
];

const BADGE_STYLE: Record<string, string> = {
  TERLARIS: "bg-gradient-to-r from-[#e11d2e] to-[#b3121f] text-white shadow-lg shadow-[#e11d2e]/30",
  HOT: "bg-gradient-to-r from-[#f59e0b] to-[#b45309] text-white shadow-lg shadow-[#f59e0b]/30",
  PREMIUM: "bg-gradient-to-r from-[#7c3aed] to-[#4c1d95] text-white shadow-lg",
  ECO: "bg-gradient-to-r from-[#10b981] to-[#047857] text-white shadow-lg shadow-emerald-500/30",
  PILIHAN: "bg-gradient-to-r from-[#0ea5e9] to-[#0369a1] text-white shadow-lg",
  BARU: "bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white shadow-lg",
  FAVORIT: "bg-gradient-to-r from-[#ec4899] to-[#be185d] text-white shadow-lg",
};

const KAT_LABEL: Record<string, string> = {
  matic: "Matic", premium: "Premium Scooter", sport: "Sport", naked: "Naked",
  bebek: "Bebek", klasik: "Klasik/Retro", trail: "Trail/ADV", elektrik: "Listrik",
  roda3: "Roda 3", bigbike: "Big Bike", retro: "Retro",
};

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

export function MotorCard({ m, onDetail, index }: { m: Motor; onDetail: (m: Motor) => void; index: number }) {
  const harga =
    m.condition === "bekas" && m.priceMin != null && m.priceMax != null
      ? `${formatRupiah(m.priceMin)} - ${formatRupiah(m.priceMax)}`
      : formatRupiah(m.price);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.35) }}
      className="card-3d group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141417]"
    >
      {m.badge && (
        <span className={`absolute left-3 top-3 z-20 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider ${BADGE_STYLE[m.badge] ?? BADGE_STYLE.TERLARIS}`}>
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
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#f59e0b]">
            {m.brand} · {KAT_LABEL[m.category] ?? m.category}
          </p>
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
              {m.condition === "baru" ? "Harga OTR (Nov 2026)" : "Kisaran Harga"}
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

/* ================= FILTER BAR (dipakai home & halaman katalog) ================= */
function CatalogCore({
  variant,
}: {
  variant: "home" | "full";
}) {
  const [condition, setCondition] = useState<"baru" | "bekas">("baru");
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [brand, setBrand] = useState("");
  const [kategori, setKategori] = useState("");
  const [harga, setHarga] = useState("");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(variant === "home" ? 8 : 16);
  const [items, setItems] = useState<Motor[]>([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<Motor | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const PER_PAGE = 16;
  const isFull = variant === "full";

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
      const p = new URLSearchParams({ condition, sort });
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
  }, [condition, debouncedQ, brand, kategori, harga, sort]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    setPage(1);
  }, [condition, debouncedQ, brand, kategori, harga, sort]);

  const shown = useMemo(() => {
    if (isFull) {
      const start = (page - 1) * PER_PAGE;
      return items.slice(start, start + PER_PAGE);
    }
    return items.slice(0, limit);
  }, [items, isFull, page, limit]);

  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const total = items.length;

  return (
    <section
      id={isFull ? "katalog-lengkap" : "katalog"}
      className="relative scroll-mt-24 bg-[#0b0b0d] py-20 md:py-28"
    >
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
            <strong className="text-white">379 motor siap pakai</strong> — 170 varian baru dari 22
            merek dunia + 209 unit bekas terpilih dari 70 model terlaku. Harga mengikuti riset pasar
            November 2026 — chat kami untuk penawaran terkini hari ini.
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
                    layoutId={isFull ? "tab-pill-full" : "tab-pill"}
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
                  placeholder="Cari motor... (vario, nmax, satria, royal enfield, vespa)"
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
                  <span><strong className="text-[#f59e0b]">{total}</strong> {condition === "baru" ? "varian ditemukan" : "unit ditemukan"}</span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Settings2 className="h-4 w-4 shrink-0 text-white/40" />
              <Chip active={brand === ""} onClick={() => setBrand("")}>Semua Merk</Chip>
              {BRANDS.map((b) => (
                <Chip key={b} active={brand === b} onClick={() => setBrand(brand === b ? "" : b)}>{b}</Chip>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Cog className="h-4 w-4 shrink-0 text-white/40" />
              {KATEGORI.map((k) => (
                <Chip key={k.v} active={kategori === k.v} onClick={() => setKategori(k.v)}>{k.label}</Chip>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Fuel className="h-4 w-4 shrink-0 text-white/40" />
              {priceList.map((h) => (
                <Chip key={h.v} active={harga === h.v} onClick={() => setHarga(h.v)}>{h.label}</Chip>
              ))}
            </div>

            {isFull && (
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-white/40" />
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="w-52 rounded-xl border-white/10 bg-[#101013] text-white focus:ring-[#e11d2e]/25">
                    <SelectValue placeholder="Urutkan" />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#141417] text-white">
                    {SORT_OPTS.map((s) => (
                      <SelectItem key={s.v} value={s.v}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
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
            <div
              key={`${condition}-${shown.map((m) => m.id).slice(0, 4).join("")}-${page}`}
              className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {shown.map((m, i) => (
                <MotorCard key={m.id} m={m} onDetail={setDetail} index={i} />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Load-more (home) / pagination (halaman katalog) */}
        {!loading && items.length > 0 && (
          <div className="mt-10 flex flex-col items-center gap-4">
            {isFull ? (
              <>
                <p className="text-xs text-white/45">
                  Halaman <strong className="text-[#f59e0b]">{page}</strong> dari {totalPages} — {total} unit
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setPage((p) => Math.max(1, p - 1)); document.getElementById("katalog-lengkap")?.scrollIntoView({ behavior: "smooth" }); }}
                    disabled={page <= 1}
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-30"
                  >
                    Sebelumnya
                  </button>
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    let n = i + 1;
                    if (totalPages > 7 && page > 4) n = page - 3 + i;
                    if (totalPages > 7 && page > totalPages - 3) n = totalPages - 6 + i;
                    return (
                      <button
                        key={n}
                        onClick={() => { setPage(n); document.getElementById("katalog-lengkap")?.scrollIntoView({ behavior: "smooth" }); }}
                        className={`h-10 w-10 rounded-xl text-sm font-bold transition ${
                          n === page
                            ? "bg-[#e11d2e] text-white shadow-lg shadow-[#e11d2e]/30"
                            : "border border-white/15 bg-white/5 text-white/60 hover:text-white"
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); document.getElementById("katalog-lengkap")?.scrollIntoView({ behavior: "smooth" }); }}
                    disabled={page >= totalPages}
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-30"
                  >
                    Berikutnya
                  </button>
                </div>
              </>
            ) : (
              <>
                {total > limit && (
                  <button
                    onClick={() => setLimit((l) => l + 8)}
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:border-[#e11d2e]/60 hover:bg-[#e11d2e]/10"
                  >
                    <LayoutGrid className="h-4 w-4" />
                    Tampilkan Lebih Banyak ({total - limit} lagi)
                  </button>
                )}
                <button
                  onClick={() => goPage("katalog")}
                  className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e11d2e] to-[#b3121f] px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#e11d2e]/40 transition hover:scale-105"
                >
                  <Sparkles className="h-4 w-4" />
                  Buka Katalog Lengkap {total} Motor
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Dialog detail */}
      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent aria-describedby={undefined} className="max-h-[90vh] max-w-3xl overflow-y-auto border-white/10 bg-[#141417] text-white">
          {detail && (
            <div className="grid gap-5 md:grid-cols-2">
              <div className="overflow-hidden rounded-xl bg-[#101013]">
                <img src={detail.image} alt={detail.name} className="aspect-[4/3] w-full object-cover" />
              </div>
              <div>
                <DialogHeader className="items-start text-left">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#f59e0b]">
                    {detail.brand} • {detail.condition === "baru" ? "Unit Baru 2026" : `Bekas Grade ${detail.grade}`}
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
                    { l: "Kelas", v: KAT_LABEL[detail.category] ?? detail.category },
                    ...(detail.mileageKm != null ? [{ l: "Kilometer", v: `${new Intl.NumberFormat("id-ID").format(detail.mileageKm)} km` }] : []),
                    ...(detail.condition === "baru" ? [{ l: "Stok Ready", v: `${detail.stock} unit` }] : []),
                    ...Object.entries(JSON.parse(detail.specs || "{}"))
                      .map(([l, v]) => ({ l: l.charAt(0).toUpperCase() + l.slice(1), v: String(v) }))
                      .filter((s) => !["tahun", "mesin", "transmisi", "bahan bakar", "warna", "kilometer", "kelas", "stok ready"].includes(s.l.toLowerCase())),
                  ].map((s) => (
                    <div key={s.l} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                      <p className="text-[10px] uppercase tracking-wider text-white/45">{s.l}</p>
                      <p className="font-medium text-white/85">{s.v}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-[#e11d2e]/30 bg-[#e11d2e]/10 p-3.5">
                  <p className="text-[10px] uppercase tracking-wider text-white/50">
                    {detail.condition === "baru" ? "Harga OTR — riset Nov 2026" : "Kisaran Harga Bekas"}
                  </p>
                  <p className="font-display text-2xl font-bold text-[#ff4d5a]">
                    {detail.condition === "bekas" && detail.priceMin != null && detail.priceMax != null
                      ? `${formatRupiah(detail.priceMin)} - ${formatRupiah(detail.priceMax)}`
                      : formatRupiah(detail.price)}
                  </p>
                  <p className="mt-1 text-[10px] text-white/45">Harga masih bisa nego — tanya admin via WhatsApp.</p>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <a
                    href={waLink(`Halo Juana Motor, saya mau nego unit ${detail.name} tahun ${detail.year}. Boleh info harga terbaiknya?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-[#06250f] transition hover:brightness-110"
                  >
                    <MessageCircle className="h-4 w-4" /> Nego via WA
                  </a>
                  <button
                    onClick={() => {
                      const hargaKredit = detail.condition === "bekas" && detail.priceMin != null ? detail.priceMin : detail.price;
                      const payload = JSON.stringify({ harga: hargaKredit, nama: detail.name });
                      try { sessionStorage.setItem("juana:credit-prefill", payload); } catch {}
                      window.dispatchEvent(
                        new CustomEvent("juana:credit-prefill", { detail: { harga: hargaKredit, nama: detail.name } })
                      );
                      setDetail(null);
                      goPage("home");
                      setTimeout(() => document.getElementById("kredit")?.scrollIntoView({ behavior: "smooth" }), 400);
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <Banknote className="h-4 w-4" /> Simulasi Kredit
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* Beranda: versi ringkas + tombol ke katalog lengkap */
export default function Catalog() {
  return <CatalogCore variant="home" />;
}

/* Halaman virtual #/katalog: katalog penuh dengan paginasi & urutan */
export function CatalogPage() {
  return <CatalogCore variant="full" />;
}
