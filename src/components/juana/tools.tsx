"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator, Banknote, Percent, CalendarClock, Send, Loader2, MessageCircle,
  BadgeDollarSign, HandCoins, ClipboardCheck, FileCheck, Gauge, ArrowLeftRight, Info,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { waLink, formatRupiah } from "@/config/site";
import { BEKAS_MODELS, FAKTOR } from "@/data/penyusutan";

/* ================= SIMULASI KREDIT ================= */
function AnimatedNumber({ value, prefix = "Rp " }: { value: number; prefix?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0.35, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="inline-block font-display text-2xl font-bold text-[#f59e0b] md:text-3xl"
    >
      {prefix + new Intl.NumberFormat("id-ID").format(Math.round(value))}
    </motion.span>
  );
}

function CreditSim() {
  const [harga, setHarga] = useState(25000000);
  const [dpPersen, setDpPersen] = useState(20);
  const [tenor, setTenor] = useState(24);
  const [bunga, setBunga] = useState(9);

  /* Prefill dari tombol "Simulasi Kredit" di dialog detail motor */
  useEffect(() => {
    const apply = (d: { harga?: number } | null | undefined) => {
      if (d?.harga && d.harga >= 6000000) setHarga(Math.min(d.harga, 450000000));
    };
    try {
      const saved = sessionStorage.getItem("juana:credit-prefill");
      if (saved) {
        apply(JSON.parse(saved));
        sessionStorage.removeItem("juana:credit-prefill");
      }
    } catch {}
    const handler = (e: Event) => {
      apply((e as CustomEvent).detail as { harga?: number });
    };
    window.addEventListener("juana:credit-prefill", handler);
    return () => window.removeEventListener("juana:credit-prefill", handler);
  }, []);

  const calc = useMemo(() => {
    const dp = Math.round((harga * dpPersen) / 100);
    const pokok = harga - dp;
    const bungaTotal = Math.round((pokok * bunga * (tenor / 12)) / 100);
    const angsuran = Math.round((pokok + bungaTotal) / tenor);
    const total = dp + angsuran * tenor;
    return { dp, pokok, bungaTotal, angsuran, total };
  }, [harga, dpPersen, tenor, bunga]);

  const waMsg =
    `Halo Juana Motor, hasil simulasi kredit saya:\n` +
    `Harga motor: ${formatRupiah(harga)}\n` +
    `DP ${dpPersen}%: ${formatRupiah(calc.dp)}\n` +
    `Tenor: ${tenor} bulan\n` +
    `Bunga flat: ${bunga}% per tahun\n` +
    `Estimasi angsuran: ${formatRupiah(calc.angsuran)}/bulan\n` +
    `Saya mau ajukan kredit. Mohon dibantu ya!`;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#141417] p-6 md:p-8">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#e11d2e]/15 blur-3xl" />
      <div className="relative">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#e11d2e] to-[#7f0f1a] shadow-lg shadow-[#e11d2e]/30">
            <Calculator className="h-5 w-5 text-white" />
          </span>
          <div>
            <h3 className="font-display text-2xl font-bold text-white">Simulasi Kredit Cepat</h3>
            <p className="text-xs text-white/55">Geser dan lihat estimasi angsuranmu secara langsung</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-7">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-white/70"><Banknote className="h-4 w-4 text-[#e11d2e]" /> Harga Motor</span>
                <span className="font-semibold text-white">{formatRupiah(harga)}</span>
              </div>
              <Slider
                value={[harga]}
                min={6000000}
                max={450000000}
                step={500000}
                onValueChange={(v) => setHarga(v[0])}
                className="[&_[data-slot=slider-thumb]]:border-[#e11d2e] [&_[data-slot=slider-range]]:bg-[#e11d2e]"
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-white/70"><Percent className="h-4 w-4 text-[#e11d2e]" /> Uang Muka (DP)</span>
                <span className="font-semibold text-white">{dpPersen}% = {formatRupiah(calc.dp)}</span>
              </div>
              <Slider
                value={[dpPersen]}
                min={10}
                max={60}
                step={5}
                onValueChange={(v) => setDpPersen(v[0])}
                className="[&_[data-slot=slider-thumb]]:border-[#e11d2e] [&_[data-slot=slider-range]]:bg-[#e11d2e]"
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-white/70"><CalendarClock className="h-4 w-4 text-[#e11d2e]" /> Tenor</span>
                <span className="font-semibold text-white">{tenor} bulan</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[6, 12, 18, 24, 36, 48].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTenor(t)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                      tenor === t
                        ? "bg-[#e11d2e] text-white shadow-md shadow-[#e11d2e]/40 scale-105"
                        : "border border-white/15 bg-white/5 text-white/60 hover:text-white"
                    }`}
                  >
                    {t} bln
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-white/70"><Percent className="h-4 w-4 text-[#e11d2e]" /> Bunga Flat (est.)</span>
                <span className="font-semibold text-white">{bunga}% / tahun</span>
              </div>
              <Slider
                value={[bunga]}
                min={5}
                max={15}
                step={0.5}
                onValueChange={(v) => setBunga(v[0])}
                className="[&_[data-slot=slider-thumb]]:border-[#e11d2e] [&_[data-slot=slider-range]]:bg-[#e11d2e]"
              />
            </div>
          </div>

          <div className="flex flex-col rounded-2xl border border-[#f59e0b]/25 bg-gradient-to-br from-[#f59e0b]/10 to-transparent p-5">
            <p className="text-xs uppercase tracking-widest text-white/55">Estimasi Angsuran / Bulan</p>
            <div className="mt-1"><AnimatedNumber value={calc.angsuran} /></div>
            <div className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-sm">
              {[
                { l: "Uang Muka", v: formatRupiah(calc.dp) },
                { l: "Pokok Pinjaman", v: formatRupiah(calc.pokok) },
                { l: `Total Bunga (${tenor} bln)`, v: formatRupiah(calc.bungaTotal) },
                { l: "Total Keseluruhan", v: formatRupiah(calc.total), strong: true },
              ].map((r) => (
                <div key={r.l} className="flex items-center justify-between">
                  <span className="text-white/55">{r.l}</span>
                  <span className={r.strong ? "font-bold text-white" : "text-white/80"}>{r.v}</span>
                </div>
              ))}
            </div>
            <a
              href={waLink(waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-[#06250f] transition hover:brightness-110"
            >
              <Send className="h-4 w-4" /> Ajukan via WhatsApp
            </a>
            <p className="mt-3 text-[10px] leading-relaxed text-white/40">
              *Simulasi bersifat estimasi. Angsuran final mengikuti skema mitra leasing
              (Adira, BAF, FIF, WOM, Mega Auto, dll) saat pengajuan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= KALKULATOR TUKAR TAMBAH / JUAL BEKAS ================= */
function round4(n: number) {
  return Math.round(n / 10000) * 10000;
}

function BekasCalculator() {
  const [modelKey, setModelKey] = useState(BEKAS_MODELS[0]?.key ?? "");
  const [umur, setUmur] = useState(2);
  const [kondisi, setKondisi] = useState<"Bagus" | "Sedang" | "Kurang">("Bagus");

  const model = BEKAS_MODELS.find((m) => m.key === modelKey) ?? BEKAS_MODELS[0];

  const calc = useMemo(() => {
    const f = FAKTOR[model.likuiditas];
    const umurKey = umur <= 5 ? String(umur) : umur <= 7 ? "6-7" : "8-10";
    const faktorUmur = f.umur[umurKey] ?? 0.4;
    const faktorKondisi = f.kondisi[kondisi];
    const nilaiPasar = round4(model.hargaBaruRef * faktorUmur * faktorKondisi);
    const hargaTerima = round4(nilaiPasar * (1 - f.diskonBeli));
    const margin = nilaiPasar - hargaTerima;
    return { faktorUmur, faktorKondisi, nilaiPasar, hargaTerima, margin, diskon: f.diskonBeli, kategori: f.kategori };
  }, [model, umur, kondisi]);

  const waMsg =
    `Halo Juana Motor, saya mau jual / tukar tambah motor saya:\n` +
    `Model: ${model.brand} ${model.label}\n` +
    `Umur: ${umur} tahun (≈${2026 - umur})\n` +
    `Kondisi: ${kondisi}\n` +
    `Estimasi harga terima dari kalkulator: ${formatRupiah(calc.hargaTerima)}\n` +
    `Mohon penawaran finalnya ya!`;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#141417] p-6 md:p-8">
      <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#25D366]/10 blur-3xl" />
      <div className="relative">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/30">
            <Gauge className="h-5 w-5 text-white" />
          </span>
          <div>
            <h3 className="font-display text-2xl font-bold text-white">Kalkulator Tukar Tambah & Jual Motor</h3>
            <p className="text-xs text-white/55">Pilih model + umur + kondisi — harga terima showroom terhitung instan (basis riset Nov 2026)</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-white/70"><Gauge className="h-4 w-4 text-emerald-400" /> Model Motor</span>
                <span className="text-[11px] text-white/45">{BEKAS_MODELS.length} model terlaku</span>
              </div>
              <Select value={modelKey} onValueChange={setModelKey}>
                <SelectTrigger className="w-full rounded-xl border-white/10 bg-[#101013] text-white focus:ring-[#e11d2e]/25">
                  <SelectValue placeholder="Pilih model motor" />
                </SelectTrigger>
                <SelectContent className="max-h-72 border-white/10 bg-[#141417] text-white">
                  {BEKAS_MODELS.map((m) => (
                    <SelectItem key={m.key} value={m.key}>
                      {m.brand} {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-1.5 text-[11px] text-white/40">
                Kategori pasar <strong className="text-white/60">{model.likuiditas}</strong> — {calc.kategori}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-white/70"><CalendarClock className="h-4 w-4 text-emerald-400" /> Umur Motor</span>
                <span className="font-semibold text-white">{umur} tahun</span>
              </div>
              <Slider
                value={[umur]}
                min={1}
                max={10}
                step={1}
                onValueChange={(v) => setUmur(v[0])}
                className="[&_[data-slot=slider-thumb]]:border-emerald-500 [&_[data-slot=slider-range]]:bg-emerald-500"
              />
              <div className="mt-1 flex justify-between text-[10px] text-white/35">
                <span>1 thn</span><span>5 thn</span><span>10 thn</span>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-white/70"><ClipboardCheck className="h-4 w-4 text-emerald-400" /> Kondisi Fisik</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["Bagus", "Sedang", "Kurang"] as const).map((k) => (
                  <button
                    key={k}
                    onClick={() => setKondisi(k)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                      kondisi === k
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30 scale-105"
                        : "border border-white/15 bg-white/5 text-white/60 hover:text-white"
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-white/40">
                Bagus = cat mulus & mesin original · Sedang = normal pemakaian · Kurang = perlu rekondisi.
                Km jauh / servis liar / surat bermasalah dikurangi 5-15% lagi saat inspeksi.
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 to-transparent p-5">
            <p className="text-xs uppercase tracking-widest text-white/55">Nilai Pasar Bekas (est.)</p>
            <motion.span
              key={calc.nilaiPasar}
              initial={{ opacity: 0.35, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="mt-1 inline-block font-display text-2xl font-bold text-white md:text-3xl"
            >
              {formatRupiah(calc.nilaiPasar)}
            </motion.span>

            <div className="mt-4 space-y-2.5 border-t border-white/10 pt-4 text-sm">
              {[
                { l: "Harga baru referensi", v: formatRupiah(model.hargaBaruRef) },
                { l: `Faktor umur ${umur} thn`, v: `${Math.round(calc.faktorUmur * 100)}%` },
                { l: `Faktor kondisi ${kondisi}`, v: `${Math.round(calc.faktorKondisi * 100)}%` },
              ].map((r) => (
                <div key={r.l} className="flex items-center justify-between">
                  <span className="text-white/55">{r.l}</span>
                  <span className="text-white/80">{r.v}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/50">
                <ArrowLeftRight className="h-3.5 w-3.5 text-[#f59e0b]" /> Harga Terima Showroom — beli tunai / tukar tambah
              </p>
              <motion.p
                key={calc.hargaTerima}
                initial={{ opacity: 0.35, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                className="mt-1 font-display text-2xl font-bold text-[#f59e0b] md:text-3xl"
              >
                {formatRupiah(calc.hargaTerima)}
              </motion.p>
              <p className="mt-1 text-[10px] text-white/40">
                Sudah termasuk akuisisi showroom {Math.round(calc.diskon * 100)}% (rekondisi, iklan & garansi).
              </p>
            </div>

            <a
              href={waLink(waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-[#06250f] transition hover:brightness-110"
            >
              <Send className="h-4 w-4" /> Ajukan Harga via WhatsApp
            </a>
            <p className="mt-3 flex items-start gap-1.5 text-[10px] leading-relaxed text-white/40">
              <Info className="mt-0.5 h-3 w-3 shrink-0" />
              *Estimasi berbasis tabel penyusutan master Juana Motor (kalibrasi pasar Nov 2026). Harga final setelah inspeksi 25 titik di showroom.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= JUAL MOTOR ================= */
function SellForm() {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    bikeDetail: "",
    year: "",
    mileageKm: "",
    expectPrice: "",
    message: "",
  });
  const [done, setDone] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.bikeDetail) {
      toast({ title: "Lengkapi dulu ya", description: "Nama, nomor WhatsApp, dan detail motor wajib diisi.", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "jual-motor",
          name: form.name,
          phone: form.phone,
          bikeDetail: form.bikeDetail,
          year: form.year || undefined,
          mileageKm: form.mileageKm || undefined,
          expectPrice: form.expectPrice ? Number(form.expectPrice.replace(/\D/g, "")) : undefined,
          message: form.message || undefined,
        }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Gagal");
      setDone(json.id);
      toast({ title: "Pengajuan terkirim!", description: "Data kamu tersimpan. Lanjutkan percakapan via WhatsApp ya." });
      if (json.waUrl) window.open(json.waUrl, "_blank");
    } catch (err) {
      toast({ title: "Gagal mengirim", description: "Coba lagi sebentar ya.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-[#101013] px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#e11d2e]/60 focus:ring-2 focus:ring-[#e11d2e]/25";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#141417] p-6 md:p-8">
      <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-[#f59e0b]/10 blur-3xl" />
      <div className="relative">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#b45309] shadow-lg shadow-[#f59e0b]/30">
            <HandCoins className="h-5 w-5 text-white" />
          </span>
          <div>
            <h3 className="font-display text-2xl font-bold text-white">Jual Motor Kamu di Sini</h3>
            <p className="text-xs text-white/55">Beli tunai & tukar tambah — inspeksi langsung, bayar hari itu</p>
          </div>
        </div>

        {/* Langkah */}
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { icon: ClipboardCheck, t: "1. Cek Unit", d: "Inspeksi 25 titik di showroom" },
            { icon: BadgeDollarSign, t: "2. Penawaran", d: "Harga pasar terbaik hari itu" },
            { icon: FileCheck, t: "3. Dokumen", d: "Kami bantu kelengkapan surat" },
            { icon: Banknote, t: "4. Bayar", d: "Tunai / dipotong tukar tambah" },
          ].map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-white/10 bg-white/5 p-3"
            >
              <s.icon className="mb-2 h-5 w-5 text-[#f59e0b]" />
              <p className="text-xs font-bold text-white">{s.t}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-white/50">{s.d}</p>
            </motion.div>
          ))}
        </div>

        {done ? (
          <div className="rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 p-5 text-center">
            <p className="font-display text-lg font-bold text-white">Terima kasih! Data tercatat.</p>
            <p className="mt-1 text-sm text-white/65">Referensi: <span className="font-mono text-[#f59e0b]">{done}</span></p>
            <a
              href={waLink(`Halo Juana Motor, saya ${form.name} sudah isi form jual motor (${form.bikeDetail}). Ref: ${done}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-bold text-[#06250f]"
            >
              <MessageCircle className="h-4 w-4" /> Buka WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-3 md:grid-cols-2">
            <input className={inputCls} placeholder="Nama kamu *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className={inputCls} placeholder="Nomor WhatsApp *" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className={`${inputCls} md:col-span-2`} placeholder="Merk & model motor, contoh: Honda Vario 125 *"
              value={form.bikeDetail} onChange={(e) => setForm({ ...form, bikeDetail: e.target.value })} />
            <input className={inputCls} placeholder="Tahun" inputMode="numeric" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value.replace(/\D/g, "") })} />
            <input className={inputCls} placeholder="Kilometer (km)" inputMode="numeric" value={form.mileageKm} onChange={(e) => setForm({ ...form, mileageKm: e.target.value.replace(/\D/g, "") })} />
            <input className={inputCls} placeholder="Harga harapan (Rp)" inputMode="numeric" value={form.expectPrice} onChange={(e) => setForm({ ...form, expectPrice: e.target.value.replace(/\D/g, "") })} />
            <input className={inputCls} placeholder="Catatan (kondisi, surat, dll)" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button
              type="submit"
              disabled={sending}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#e11d2e] to-[#b3121f] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#e11d2e]/30 transition hover:scale-[1.02] disabled:opacity-60 md:col-span-2"
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {sending ? "Mengirim..." : "Kirim & Cek Harga Sekarang"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Tools() {
  return (
    <section id="kredit" className="relative scroll-mt-24 bg-gradient-to-b from-[#0b0b0d] via-[#101013] to-[#0b0b0d] py-20 md:py-28">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#e11d2e]">Fitur Juana</p>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
            HITUNG, <span className="text-stroke-red">JUAL</span>, TRANSAKSI
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/60 md:text-base">
            Simulasi kredit transparan, kalkulator tukar tambah berbasis data master, dan pengajuan jual motor langsung tersimpan di sistem kami.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <CreditSim />
        </motion.div>
        <div id="kalkulator-bekas" className="mt-10 scroll-mt-24">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <BekasCalculator />
          </motion.div>
        </div>
        <div id="jual-motor" className="mt-10 scroll-mt-24">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SellForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
