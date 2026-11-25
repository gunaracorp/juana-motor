// ============================================================
// NAVIGASI HALAMAN VIRTUAL (client-side router)
// Semua halaman dirender di dalam route "/" sesuai arsitektur
// ============================================================

export type PageKey = "home" | "faq" | "tentang" | "kontak" | "tips" | "promo" | "legal";

export const PAGE_META: Record<PageKey, { title: string; kicker: string }> = {
  home: { title: "Beranda", kicker: "Beranda" },
  faq: { title: "FAQ — Pertanyaan yang Sering Diajukan", kicker: "Tanya Jawab" },
  tentang: { title: "Tentang Kami", kicker: "Profil Showroom" },
  kontak: { title: "Kontak", kicker: "Hubungi Kami" },
  tips: { title: "Tips & Panduan", kicker: "Wawasan Motor" },
  promo: { title: "Promo Terkini", kicker: "Penawaran Spesial" },
  legal: { title: "Syarat & Ketentuan", kicker: "Legal" },
};

/** Panggil untuk berpindah halaman virtual (mis. dari footer/navbar) */
export function goPage(page: PageKey) {
  window.location.hash = page === "home" ? "#/" : `#/${page}`;
}

/** Parse hash URL menjadi halaman aktif + anchor (untuk scroll ke section) */
export function parseHash(hash: string): { page: PageKey; anchor: string | null } {
  const h = hash.replace(/^#/, "");
  if (h.startsWith("/")) {
    const name = h.slice(1).split("?")[0].replace(/\/$/, "");
    const valid: PageKey[] = ["home", "faq", "tentang", "kontak", "tips", "promo", "legal"];
    if (name && valid.includes(name as PageKey)) return { page: name as PageKey, anchor: null };
    return { page: "home", anchor: null };
  }
  // hash anchor biasa (#katalog) -> home + scroll ke section
  return { page: "home", anchor: h || null };
}
