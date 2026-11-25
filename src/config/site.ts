// ============================================================
// KONFIGURASI UTAMA JUANA MOTOR TASIKMALAYA
// Sumber data: dokumen resmi NIB 1006240019347 & dokumen lokasi OSS RBA
// ============================================================

export const SITE = {
  name: "Juana Motor",
  legalName: "Showroom Motor Mulya Juana Tasikmalaya",
  owner: "Ujang Juana",
  tagline: "Juragan Motor Terlengkap Tasikmalaya, Jawa Barat - Indonesia",
  brandingLong:
    "Pusat Jual Beli Motor Terbaik, Terlengkap dan Terpercaya Sejak Tahun 2020",
  slogan: "Baru Mulus, Bekas Pasti Berkualitas",
  since: 2020,
  nib: "1006240019347",
  nibIssued: "10 Juni 2024",
  kbli: "47831 - Perdagangan Eceran Sepeda Motor Baru",
  email: "prabudanling@gmail.com",
  whatsapp: "6281387685252",
  whatsappDisplay: "+62 813-8768-5252",
  address: {
    line1: "Ruko Perumahan Griya Mangkubumi Indah No. 1",
    street: "Jl. A.H. Nasution",
    kelurahan: "Cipari",
    kecamatan: "Mangkubumi",
    city: "Kota Tasikmalaya",
    province: "Jawa Barat",
    zip: "46181",
    full: "Ruko Griya Mangkubumi Indah No.1, Jl. A.H. Nasution, Kel. Cipari, Kec. Mangkubumi, Kota Tasikmalaya, Jawa Barat 46181",
    landmark:
      "Tepat di pintu masuk Perum Griya Asri Mangkubumi Indah - Cipari, Tasikmalaya",
    landmarkShort: "Pintu Masuk Perum Griya Asri Mangkubumi Indah",
  },
  coordinates: {
    lat: -7.345583333,
    lng: 108.184025,
    dms: "7°20′44.10″ LS, 108°11′02.49″ BT",
  },
  area: { land: 280, building: 200 },
  mapsEmbed:
    "https://maps.google.com/maps?q=-7.345583333,108.184025&z=16&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=-7.345583333,108.184025",
  hours: [
    { day: "Senin - Jumat", time: "08.00 - 20.00 WIB" },
    { day: "Sabtu - Minggu", time: "08.00 - 21.00 WIB" },
    { day: "Hari Libur Nasional", time: "09.00 - 17.00 WIB" },
  ],
};

export const CREDITS = {
  design: "Design by digiman.id — PT Digital Bisnis Manajemen",
  designUrl: "https://digiman.id",
  license: "Licensing by PT Top Konsultan Internasional — topkonsultan.web.id",
  licenseUrl: "https://topkonsultan.web.id",
};

export const BRANDS = [
  "Honda", "Yamaha", "Suzuki", "Kawasaki", "KTM", "Bajaj", "Benelli",
  "Royal Enfield", "Vespa", "Piaggio", "Aprilia", "Viar", "GPX",
  "Gesits", "Alva", "Volta", "Uwinfly", "United", "Smoot", "Polytron",
  "Selis", "Yadea",
];

export const BRAND_COUNTRY: Record<string, string> = {
  Honda: "Jepang", Yamaha: "Jepang", Suzuki: "Jepang", Kawasaki: "Jepang",
  KTM: "Austria", Bajaj: "India", Benelli: "Italia", "Royal Enfield": "India",
  Vespa: "Italia", Piaggio: "Italia", Aprilia: "Italia", Viar: "Indonesia",
  GPX: "Thailand", Gesits: "Indonesia", Alva: "Indonesia", Volta: "Indonesia",
  Uwinfly: "Indonesia", United: "Indonesia", Smoot: "Indonesia",
  Polytron: "Indonesia", Selis: "Indonesia", Yadea: "Tiongkok",
};

export const LEASING_PARTNERS = [
  "Adira Finance",
  "BAF - Bussan Auto Finance",
  "FIF - Federasi Istimewa",
  "WOM Finance",
  "Mega Auto Finance",
  "Multindo Auto Finance",
  "OTO Multiartha",
];

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function formatRupiah(n: number) {
  return "Rp " + new Intl.NumberFormat("id-ID").format(n);
}
