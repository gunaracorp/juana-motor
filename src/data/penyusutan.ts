// ============================================================
// DATA KALKULATOR BEKAS — sumber: sheet PENYUSUTAN & HARGA_BELI_BEKAS
// Database master harga Juana Motor (riset November 2026)
// ============================================================

export type FaktorRow = {
  kategori: string;
  umur: Record<string, number>; // "1".."5", "6-7", "8-10"
  diskonBeli: number; // harga terima showroom = nilai pasar x (1 - diskon)
  kondisi: Record<"Bagus" | "Sedang" | "Kurang", number>;
};

export const FAKTOR: Record<"A" | "B" | "C" | "L", FaktorRow> = {
  A: { kategori: "Matic populer (BeAT/Vario/NMAX/Mio dst.)", umur: { "1": 0.9, "2": 0.84, "3": 0.78, "4": 0.72, "5": 0.65, "6-7": 0.55, "8-10": 0.45 }, diskonBeli: 0.08, kondisi: { Bagus: 1.0, Sedang: 0.9, Kurang: 0.78 } },
  B: { kategori: "Manual / sport / bebek populer (R15/Satria/Verza dst.)", umur: { "1": 0.87, "2": 0.79, "3": 0.71, "4": 0.62, "5": 0.54, "6-7": 0.45, "8-10": 0.35 }, diskonBeli: 0.1, kondisi: { Bagus: 1.0, Sedang: 0.9, Kurang: 0.78 } },
  C: { kategori: "Premium / klasik / big bike (Vespa/RE/KTM/Ninja 400 dst.)", umur: { "1": 0.9, "2": 0.84, "3": 0.77, "4": 0.69, "5": 0.61, "6-7": 0.52, "8-10": 0.42 }, diskonBeli: 0.12, kondisi: { Bagus: 1.0, Sedang: 0.9, Kurang: 0.78 } },
  L: { kategori: "Motor listrik (penyusutan cepat karena baterai)", umur: { "1": 0.72, "2": 0.6, "3": 0.5, "4": 0.42, "5": 0.34, "6-7": 0.26, "8-10": 0.18 }, diskonBeli: 0.2, kondisi: { Bagus: 1.0, Sedang: 0.9, Kurang: 0.78 } },
};

export type BekasModel = {
  key: string;
  label: string;
  brand: string;
  likuiditas: "A" | "B" | "C" | "L";
  hargaBaruRef: number;
};

export const BEKAS_MODELS: BekasModel[] = [
  { key: "BeAT eSP (2020-2022)", label: "BeAT eSP (2020-2022)", brand: "Honda", likuiditas: "A", hargaBaruRef: 18550000 },
  { key: "BeAT All New (2023-2025)", label: "BeAT All New (2023-2025)", brand: "Honda", likuiditas: "A", hargaBaruRef: 20000000 },
  { key: "Genio (2021-2023)", label: "Genio (2021-2023)", brand: "Honda", likuiditas: "A", hargaBaruRef: 20300000 },
  { key: "Scoopy (2021-2023)", label: "Scoopy (2021-2023)", brand: "Honda", likuiditas: "A", hargaBaruRef: 22700000 },
  { key: "Vario 125 (2021-2023)", label: "Vario 125 (2021-2023)", brand: "Honda", likuiditas: "A", hargaBaruRef: 24700000 },
  { key: "Vario 160 (2022-2024)", label: "Vario 160 (2022-2024)", brand: "Honda", likuiditas: "A", hargaBaruRef: 28900000 },
  { key: "PCX 150 (2020-2022)", label: "PCX 150 (2020-2022)", brand: "Honda", likuiditas: "A", hargaBaruRef: 30700000 },
  { key: "PCX 160 (2023-2025)", label: "PCX 160 (2023-2025)", brand: "Honda", likuiditas: "A", hargaBaruRef: 32670000 },
  { key: "ADV 150 (2020-2022)", label: "ADV 150 (2020-2022)", brand: "Honda", likuiditas: "A", hargaBaruRef: 31600000 },
  { key: "ADV 160 (2023-2025)", label: "ADV 160 (2023-2025)", brand: "Honda", likuiditas: "A", hargaBaruRef: 39000000 },
  { key: "Revo FIT (2020-2022)", label: "Revo FIT (2020-2022)", brand: "Honda", likuiditas: "A", hargaBaruRef: 19500000 },
  { key: "Supra X 125 FI (2020-2022)", label: "Supra X 125 FI (2020-2022)", brand: "Honda", likuiditas: "A", hargaBaruRef: 21300000 },
  { key: "Supra GTR 150 (2020-2022)", label: "Supra GTR 150 (2020-2022)", brand: "Honda", likuiditas: "B", hargaBaruRef: 23900000 },
  { key: "CB150 Verza (2020-2023)", label: "CB150 Verza (2020-2023)", brand: "Honda", likuiditas: "B", hargaBaruRef: 24300000 },
  { key: "CBR150R (2020-2023)", label: "CBR150R (2020-2023)", brand: "Honda", likuiditas: "B", hargaBaruRef: 34500000 },
  { key: "Sonic 150R (2021-2023)", label: "Sonic 150R (2021-2023)", brand: "Honda", likuiditas: "B", hargaBaruRef: 25900000 },
  { key: "CRF150L (2020-2023)", label: "CRF150L (2020-2023)", brand: "Honda", likuiditas: "B", hargaBaruRef: 33500000 },
  { key: "CBR250RR (2020-2023)", label: "CBR250RR (2020-2023)", brand: "Honda", likuiditas: "B", hargaBaruRef: 62000000 },
  { key: "Vario 110 lama (2018-2019)", label: "Vario 110 lama (2018-2019)", brand: "Honda", likuiditas: "A", hargaBaruRef: 20200000 },
  { key: "Mio M3 125 (2020-2022)", label: "Mio M3 125 (2020-2022)", brand: "Yamaha", likuiditas: "A", hargaBaruRef: 19500000 },
  { key: "Mio i 125 (2020-2022)", label: "Mio i 125 (2020-2022)", brand: "Yamaha", likuiditas: "A", hargaBaruRef: 20300000 },
  { key: "Mio S (2021-2023)", label: "Mio S (2021-2023)", brand: "Yamaha", likuiditas: "A", hargaBaruRef: 21100000 },
  { key: "Fino 125 (2021-2023)", label: "Fino 125 (2021-2023)", brand: "Yamaha", likuiditas: "A", hargaBaruRef: 20300000 },
  { key: "Gear 125 (2022-2024)", label: "Gear 125 (2022-2024)", brand: "Yamaha", likuiditas: "A", hargaBaruRef: 21500000 },
  { key: "X-Ride 125 (2020-2022)", label: "X-Ride 125 (2020-2022)", brand: "Yamaha", likuiditas: "A", hargaBaruRef: 20700000 },
  { key: "Lexi 125 (2020-2022)", label: "Lexi 125 (2020-2022)", brand: "Yamaha", likuiditas: "A", hargaBaruRef: 23400000 },
  { key: "Aerox 155 (2020-2022)", label: "Aerox 155 (2020-2022)", brand: "Yamaha", likuiditas: "A", hargaBaruRef: 26800000 },
  { key: "NMAX 155 (2020-2022)", label: "NMAX 155 (2020-2022)", brand: "Yamaha", likuiditas: "A", hargaBaruRef: 28900000 },
  { key: "NMAX New/Turbo (2023-2025)", label: "NMAX New/Turbo (2023-2025)", brand: "Yamaha", likuiditas: "A", hargaBaruRef: 33500000 },
  { key: "XMAX 250 (2019-2022)", label: "XMAX 250 (2019-2022)", brand: "Yamaha", likuiditas: "C", hargaBaruRef: 63500000 },
  { key: "V-Ixion R (2020-2022)", label: "V-Ixion R (2020-2022)", brand: "Yamaha", likuiditas: "B", hargaBaruRef: 30800000 },
  { key: "R15 V3 (2020-2022)", label: "R15 V3 (2020-2022)", brand: "Yamaha", likuiditas: "B", hargaBaruRef: 33800000 },
  { key: "R25 (2020-2022)", label: "R25 (2020-2022)", brand: "Yamaha", likuiditas: "B", hargaBaruRef: 55500000 },
  { key: "MT-15 (2021-2023)", label: "MT-15 (2021-2023)", brand: "Yamaha", likuiditas: "B", hargaBaruRef: 34300000 },
  { key: "WR155 R (2020-2022)", label: "WR155 R (2020-2022)", brand: "Yamaha", likuiditas: "B", hargaBaruRef: 32200000 },
  { key: "XSR155 (2021-2023)", label: "XSR155 (2021-2023)", brand: "Yamaha", likuiditas: "B", hargaBaruRef: 36100000 },
  { key: "Jupiter MX King 150 (2018-2020)", label: "Jupiter MX King 150 (2018-2020)", brand: "Yamaha", likuiditas: "B", hargaBaruRef: 24800000 },
  { key: "Vega ZR / Force (2017-2019)", label: "Vega ZR / Force (2017-2019)", brand: "Yamaha", likuiditas: "B", hargaBaruRef: 19800000 },
  { key: "Address FI (2020-2023)", label: "Address FI (2020-2023)", brand: "Suzuki", likuiditas: "A", hargaBaruRef: 19500000 },
  { key: "Skydrive Sport (2020-2022)", label: "Skydrive Sport (2020-2022)", brand: "Suzuki", likuiditas: "A", hargaBaruRef: 19800000 },
  { key: "Satria F150/FU (2019-2022)", label: "Satria F150/FU (2019-2022)", brand: "Suzuki", likuiditas: "B", hargaBaruRef: 26500000 },
  { key: "GSX-R150 (2019-2022)", label: "GSX-R150 (2019-2022)", brand: "Suzuki", likuiditas: "B", hargaBaruRef: 30500000 },
  { key: "GSX-S150 (2019-2022)", label: "GSX-S150 (2019-2022)", brand: "Suzuki", likuiditas: "B", hargaBaruRef: 29500000 },
  { key: "Axelo 125 (2022-2024)", label: "Axelo 125 (2022-2024)", brand: "Suzuki", likuiditas: "A", hargaBaruRef: 21300000 },
  { key: "Burgman Street 125 (2021-2023)", label: "Burgman Street 125 (2021-2023)", brand: "Suzuki", likuiditas: "A", hargaBaruRef: 24900000 },
  { key: "Ninja 250 FI/Mono (2018-2022)", label: "Ninja 250 FI/Mono (2018-2022)", brand: "Kawasaki", likuiditas: "B", hargaBaruRef: 60400000 },
  { key: "Ninja 250 SL (2016-2019)", label: "Ninja 250 SL (2016-2019)", brand: "Kawasaki", likuiditas: "B", hargaBaruRef: 43000000 },
  { key: "Z250 (2017-2020)", label: "Z250 (2017-2020)", brand: "Kawasaki", likuiditas: "B", hargaBaruRef: 54500000 },
  { key: "Ninja 400 (2019-2022)", label: "Ninja 400 (2019-2022)", brand: "Kawasaki", likuiditas: "C", hargaBaruRef: 82000000 },
  { key: "W175 (2019-2022)", label: "W175 (2019-2022)", brand: "Kawasaki", likuiditas: "B", hargaBaruRef: 31000000 },
  { key: "KLX150BF (2019-2022)", label: "KLX150BF (2019-2022)", brand: "Kawasaki", likuiditas: "B", hargaBaruRef: 32500000 },
  { key: "Versys-X 250 (2019-2022)", label: "Versys-X 250 (2019-2022)", brand: "Kawasaki", likuiditas: "C", hargaBaruRef: 66000000 },
  { key: "Duke 200 (2018-2021)", label: "Duke 200 (2018-2021)", brand: "KTM", likuiditas: "C", hargaBaruRef: 46500000 },
  { key: "Duke 390 (2019-2022)", label: "Duke 390 (2019-2022)", brand: "KTM", likuiditas: "C", hargaBaruRef: 72500000 },
  { key: "RC 200 (2018-2021)", label: "RC 200 (2018-2021)", brand: "KTM", likuiditas: "C", hargaBaruRef: 44000000 },
  { key: "Sprint 150 iGet (2018-2021)", label: "Sprint 150 iGet (2018-2021)", brand: "Vespa", likuiditas: "C", hargaBaruRef: 53500000 },
  { key: "Primavera 150 iGet (2018-2021)", label: "Primavera 150 iGet (2018-2021)", brand: "Vespa", likuiditas: "C", hargaBaruRef: 52000000 },
  { key: "Liberty 150 (2019-2021)", label: "Liberty 150 (2019-2021)", brand: "Vespa", likuiditas: "C", hargaBaruRef: 41000000 },
  { key: "GTS 300 (2019-2022)", label: "GTS 300 (2019-2022)", brand: "Vespa", likuiditas: "C", hargaBaruRef: 88000000 },
  { key: "SR GT 200 (2022-2024)", label: "SR GT 200 (2022-2024)", brand: "Aprilia", likuiditas: "C", hargaBaruRef: 58500000 },
  { key: "Pulsar NS200 (2018-2022)", label: "Pulsar NS200 (2018-2022)", brand: "Bajaj", likuiditas: "B", hargaBaruRef: 36000000 },
  { key: "Dominar 400 (2019-2022)", label: "Dominar 400 (2019-2022)", brand: "Bajaj", likuiditas: "C", hargaBaruRef: 51500000 },
  { key: "Avenger 220 (2017-2020)", label: "Avenger 220 (2017-2020)", brand: "Bajaj", likuiditas: "C", hargaBaruRef: 49000000 },
  { key: "Classic 350 (2021-2023)", label: "Classic 350 (2021-2023)", brand: "Royal Enfield", likuiditas: "C", hargaBaruRef: 114000000 },
  { key: "Hunter 350 (2023-2025)", label: "Hunter 350 (2023-2025)", brand: "Royal Enfield", likuiditas: "C", hargaBaruRef: 117200000 },
  { key: "Meteor 350 (2021-2023)", label: "Meteor 350 (2021-2023)", brand: "Royal Enfield", likuiditas: "C", hargaBaruRef: 126100000 },
  { key: "Leoncino 250 (2021-2023)", label: "Leoncino 250 (2021-2023)", brand: "Benelli", likuiditas: "C", hargaBaruRef: 51850000 },
  { key: "TRK 502 (2020-2022)", label: "TRK 502 (2020-2022)", brand: "Benelli", likuiditas: "C", hargaBaruRef: 130000000 },
  { key: "Rapi/G1 (2021-2023)", label: "Rapi/G1 (2021-2023)", brand: "Gesits", likuiditas: "L", hargaBaruRef: 27000000 },
  { key: "401 (2022-2024)", label: "401 (2022-2024)", brand: "Volta", likuiditas: "L", hargaBaruRef: 16950000 },
];
