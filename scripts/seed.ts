// Seed data katalog Juana Motor Tasikmalaya
// Harga = estimasi pasar OTR Jabar-November 2026, bukan angka resmi dealer
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const IMG = {
  matic: "/images/motor-matic.png",
  sport: "/images/motor-sport.png",
  bebek: "/images/motor-bebek.png",
  trail: "/images/motor-trail.png",
  retro: "/images/motor-retro.png",
  bigbike: "/images/motor-bigbike.png",
  elektrik: "/images/motor-elektrik.png",
};

const baru = [
  { name: "Honda BeAT Sporty CBS", brand: "Honda", category: "matic", year: 2026, engineCc: 110, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Merah / Hitam / Putih", price: 19800000, badge: "TERLARIS", featured: true, specs: { power: "9,0 HP", tank: "4,2 L", weight: "87 kg", brake: "CBS", seat: "740 mm" }, description: "Ikon skutik hemat BBM kota Tasikmalaya. Ringan, gesit, dan irit sampai 61 km/liter — raja perjalanan harian." },
  { name: "Honda Genio CBS", brand: "Honda", category: "matic", year: 2026, engineCc: 110, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Hitam Doff / Orange", price: 19100000, badge: null, featured: false, specs: { power: "9,0 HP", tank: "4,2 L", weight: "84 kg", brake: "CBS", seat: "740 mm" }, description: "Skutik gaya street paling ramah kantong anak muda. Desain flat simple, kaki buka leluasa." },
  { name: "Honda Scoopy Sporty", brand: "Honda", category: "matic", year: 2026, engineCc: 110, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Cream / Merah Retro", price: 22900000, badge: "FAVORIT", featured: true, specs: { power: "9,0 HP", tank: "4,2 L", weight: "92 kg", brake: "CBS", seat: "750 mm" }, description: "Gaya retro-modern yang tak lekang waktu. Ban edelweis, tempat duduk jenjang, cocok untuk yang tahu caranya stylish." },
  { name: "Honda Vario 125 eSP+", brand: "Honda", category: "matic", year: 2026, engineCc: 125, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Mat Black / Red", price: 25700000, badge: "TERLARIS", featured: true, specs: { power: "12,0 HP", tank: "4,2 L", weight: "95 kg", brake: "CBS", seat: "780 mm" }, description: "Juara skutik sporty kelas 125cc. eSP+ irit, kolong luas 11L, favorit kurir dan pejuang macet." },
  { name: "Honda Vario 160 ABS", brand: "Honda", category: "matic", year: 2026, engineCc: 160, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Metallic Red / Black", price: 33700000, badge: "TERLARIS", featured: true, specs: { power: "15,8 HP", tank: "4,2 L", weight: "99 kg", brake: "ABS Front", seat: "780 mm" }, description: "Performa 16 PS dengan ABS eSP+ — skutik tercepat di kelasnya. Untuk kamu yang tak mau kompromi." },
  { name: "Honda PCX 160 ABS", brand: "Honda", category: "matic", year: 2026, engineCc: 160, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Mat Brown / Red", price: 36800000, badge: null, featured: true, specs: { power: "15,8 HP", tank: "8,0 L", weight: "130 kg", brake: "ABS", seat: "765 mm" }, description: "Skutik premium touring-sehari. Mesin eSP+ 157cc, remote engine start, dan cruise-level comfort." },
  { name: "Honda ADV 160 ABS", brand: "Honda", category: "trail", year: 2026, engineCc: 160, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Mat Armored Green", price: 36900000, badge: "HOT", featured: false, specs: { power: "15,8 HP", tank: "8,0 L", weight: "129 kg", brake: "ABS", seat: "770 mm" }, description: "Siap berpetualang dari jalan Tasik ke tanjakan Panjalu. Ground clearance tinggi, ajak aspal maupun makadam." },
  { name: "Honda Supra GTR 150", brand: "Honda", category: "bebek", year: 2026, engineCc: 150, transmission: "Manual 5-Percepatan", fuelType: "Bensin", color: "Red / Black", price: 26500000, badge: null, featured: false, specs: { power: "16,4 HP", tank: "4,9 L", weight: "117 kg", brake: "Cakram", seat: "770 mm" }, description: "Bebek sport racing lineage. Mesin DOHC 6-percepatan... tenaga gede untuk ngebut santai dan harian kuat." },
  { name: "Honda CB150 Verza", brand: "Honda", category: "retro", year: 2026, engineCc: 150, transmission: "Manual 5-Percepatan", fuelType: "Bensin", color: "Black / Orange", price: 25900000, badge: null, featured: false, specs: { power: "13,1 HP", tank: "12,0 L", weight: "129 kg", brake: "Cakram", seat: "788 mm" }, description: "Naked klasik tangguh. Favorit modifikasi brat style dan riding harian ekonomis." },
  { name: "Honda CBR150R", brand: "Honda", category: "sport", year: 2026, engineCc: 150, transmission: "Manual 6-Percepatan", fuelType: "Bensin", color: "Mat MotoGP / Red", price: 38600000, badge: null, featured: true, specs: { power: "16,9 HP", tank: "12,0 L", weight: "138 kg", brake: "ABS", seat: "785 mm" }, description: "Full fairing racing DNA MotoGP. Assist & slipper clutch, siap menggila di tikungan Giri Gede." },
  { name: "Honda CB150X", brand: "Honda", category: "sport", year: 2026, engineCc: 150, transmission: "Manual 6-Percepatan", fuelType: "Bensin", color: "Mat Black / Yellow", price: 34900000, badge: null, featured: false, specs: { power: "16,4 HP", tank: "12,0 L", weight: "143 kg", brake: "ABS", seat: "790 mm" }, description: "Sport adventure touring — solusi satu motor untuk komuter mingguan dan touring Jawa Barat." },
  { name: "Honda CRF150L", brand: "Honda", category: "trail", year: 2026, engineCc: 150, transmission: "Manual 6-Percepatan", fuelType: "Bensin", color: "Red / White", price: 37900000, badge: "HOT", featured: true, specs: { power: "16,9 HP", tank: "7,5 L", weight: "125 kg", brake: "Cakram", seat: "858 mm" }, description: "Legenda trail tanah Jawa Barat. Rangka semi-double cradle, garpu Showa — gowes Galunggung mantap." },
  { name: "Honda CBR250RR ABS", brand: "Honda", category: "sport", year: 2026, engineCc: 250, transmission: "Manual 6-Percepatan", fuelType: "Bensin", color: "Mat Black / Red", price: 72500000, badge: "PREMIUM", featured: false, specs: { power: "41,0 HP", tank: "14,0 L", weight: "181 kg", brake: "ABS", seat: "780 mm" }, description: "Raja 250cc lokal. Mesin 4-silinder kecil bergaya big-bike — pilihan kolektor dan track-day enthusiast." },
  { name: "Yamaha Mio S", brand: "Yamaha", category: "matic", year: 2026, engineCc: 125, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Blue / Black", price: 21300000, badge: null, featured: false, specs: { power: "9,5 HP", tank: "4,2 L", weight: "95 kg", brake: "Cakram+Drum", seat: "750 mm" }, description: "Skutik blue-core irit dan lincah. Pilihan aman untuk harian dan pemula." },
  { name: "Yamaha Gear 125", brand: "Yamaha", category: "matic", year: 2026, engineCc: 125, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Cyan / Black", price: 21800000, badge: null, featured: false, specs: { power: "9,6 HP", tank: "4,2 L", weight: "94 kg", brake: "Drum", seat: "755 mm" }, description: "Kompak, murah, irit — sahabat anak kost dan ibu rumah tangga Tasikmalaya." },
  { name: "Yamaha Fazzio Hybrid Connected", brand: "Yamaha", category: "matic", year: 2026, engineCc: 125, transmission: "Otomatis (CVT)", fuelType: "Hybrid", color: "Neon Green / Black", price: 26100000, badge: "ECO", featured: true, specs: { power: "8,0 HP + SMG", tank: "5,5 L", weight: "94 kg", brake: "CBS", seat: "760 mm" }, description: "Skutik hybrid ikonik Y-Connect. Gaya retro-futuristik, fitur smart lengkap, hemat maksimal." },
  { name: "Yamaha NMAX 155 Connected ABS", brand: "Yamaha", category: "matic", year: 2026, engineCc: 155, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Mat Black / Green", price: 34600000, badge: "TERLARIS", featured: true, specs: { power: "15,4 HP", tank: "7,1 L", weight: "127 kg", brake: "ABS", seat: "795 mm" }, description: "Raja skutik premium blue-core. Traction control, ABS, dan mesin VVA — nyaman Tasik-Bandung bolak-balik." },
  { name: "Yamaha Aerox 155 Connected ABS", brand: "Yamaha", category: "matic", year: 2026, engineCc: 155, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Red / Black", price: 33200000, badge: null, featured: false, specs: { power: "15,4 HP", tank: "7,1 L", weight: "128 kg", brake: "ABS", seat: "770 mm" }, description: "Skutik sporty dengan livery racing. Performa paling gahar di kelas matic 155cc." },
  { name: "Yamaha Xforce 155", brand: "Yamaha", category: "trail", year: 2026, engineCc: 155, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Mat Khaki", price: 34800000, badge: "BARU", featured: true, specs: { power: "15,4 HP", tank: "7,1 L", weight: "132 kg", brake: "ABS", seat: "790 mm" }, description: "Skutik adventure bongsor penuh gaya. Ban doble, desain gagah, tampil beda di jalanan Tasik." },
  { name: "Yamaha Jupiter MX New", brand: "Yamaha", category: "bebek", year: 2026, engineCc: 135, transmission: "Manual 5-Percepatan", fuelType: "Bensin", color: "Blue / White", price: 26000000, badge: null, featured: false, specs: { power: "12,1 HP", tank: "4,0 L", weight: "105 kg", brake: "Cakram", seat: "780 mm" }, description: "Bebek sport legendaris. Ringan, responsif, mesin 135cc paling lincah di kelasnya." },
  { name: "Yamaha MT-15", brand: "Yamaha", category: "sport", year: 2026, engineCc: 155, transmission: "Manual 6-Percepatan", fuelType: "Bensin", color: "Mat Black / Cyan", price: 38000000, badge: null, featured: true, specs: { power: "18,1 HP", tank: "11,0 L", weight: "133 kg", brake: "ABS", seat: "810 mm" }, description: "Dark side of Japan — streetfighter ramping dengan torsi banteng. Gaya nak, tenaga serius." },
  { name: "Yamaha R15 Connected ABS", brand: "Yamaha", category: "sport", year: 2026, engineCc: 155, transmission: "Manual 6-Percepatan", fuelType: "Bensin", color: "Blue VVA", price: 39900000, badge: null, featured: true, specs: { power: "18,5 HP", tank: "11,0 L", weight: "138 kg", brake: "ABS", seat: "815 mm" }, description: "Supersport mini dengan VVA & quickshifter. Impian semua rider muda Indonesia." },
  { name: "Yamaha WR155 R", brand: "Yamaha", category: "trail", year: 2026, engineCc: 155, transmission: "Manual 6-Percepatan", fuelType: "Bensin", color: "Blue / White", price: 38500000, badge: null, featured: false, specs: { power: "16,3 HP", tank: "6,0 L", weight: "127 kg", brake: "Cakram", seat: "835 mm" }, description: "Enduro street-legal. Garpu KYB, lapak 220mm — saingan berat CRF150L untuk adventures." },
  { name: "Suzuki Satria F150", brand: "Suzuki", category: "bebek", year: 2026, engineCc: 150, transmission: "Manual 6-Percepatan", fuelType: "Bensin", color: "Blue / White", price: 26900000, badge: "FAVORIT", featured: true, specs: { power: "18,1 HP", tank: "4,7 L", weight: "114 kg", brake: "Cakram", seat: "765 mm" }, description: "Rajanya bebek drag. Mesin terkuat kelas 150cc bebek — favorit pebalap satria se-Jabar." },
  { name: "Suzuki GSX-S150", brand: "Suzuki", category: "sport", year: 2026, engineCc: 150, transmission: "Manual 6-Percepatan", fuelType: "Bensin", color: "Mat Black / Red", price: 30500000, badge: null, featured: false, specs: { power: "18,5 HP", tank: "12,0 L", weight: "130 kg", brake: "ABS", seat: "785 mm" }, description: "Naked sport mesinGSX R dna — agresif, responsif, harga bersahabat." },
  { name: "Suzuki Address Play", brand: "Suzuki", category: "matic", year: 2026, engineCc: 113, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Mat Blue", price: 21500000, badge: null, featured: false, specs: { power: "7,8 HP", tank: "6,0 L", weight: "89 kg", brake: "Drum", seat: "745 mm" }, description: "Skutik urban ringan bertenaga. Kolong jumbo, cocok jadikan kuda bebek harian." },
  { name: "Kawasaki W175", brand: "Kawasaki", category: "retro", year: 2026, engineCc: 175, transmission: "Manual 5-Percepatan", fuelType: "Bensin", color: "Brown / Cream", price: 34300000, badge: null, featured: true, specs: { power: "12,9 HP", tank: "12,0 L", weight: "126 kg", brake: "Cakram", seat: "790 mm" }, description: "Retro classic Jap-style. Mesin tunggal SOHC, bobber-friendly, keren dimodifikasi maupun standar." },
  { name: "Kawasaki Ninja 250 SL", brand: "Kawasaki", category: "sport", year: 2026, engineCc: 250, transmission: "Manual 6-Percepatan", fuelType: "Bensin", color: "Lime Green", price: 56900000, badge: null, featured: false, specs: { power: "27,7 HP", tank: "14,0 L", weight: "161 kg", brake: "ABS", seat: "785 mm" }, description: "Ninja single-cylinder paling ringan di kelas 250cc. Agile, sering diburu rider touring." },
  { name: "Bajaj Pulsar NS160", brand: "Bajaj", category: "sport", year: 2026, engineCc: 160, transmission: "Manual 5-Percepatan", fuelType: "Bensin", color: "Red / Black", price: 27000000, badge: null, featured: false, specs: { power: "17,0 HP", tank: "12,0 L", weight: "142 kg", brake: "Cakram", seat: "795 mm" }, description: "Naked bongsor harga kawan. Torsi kuat, nyaman untuk harian dan jalan jauh." },
  { name: "Bajaj Dominar 250", brand: "Bajaj", category: "sport", year: 2026, engineCc: 250, transmission: "Manual 6-Percepatan", fuelType: "Bensin", color: "Mat Black", price: 46500000, badge: null, featured: false, specs: { power: "26,5 HP", tank: "13,0 L", weight: "180 kg", brake: "ABS Double", seat: "800 mm" }, description: "Sport-touring gede harga menengah. Twin-channel ABS, fitur lengkap, mesin tenang bertenaga." },
  { name: "TVS Ntorq 125", brand: "TVS", category: "matic", year: 2026, engineCc: 125, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Red / Grey", price: 25900000, badge: null, featured: false, specs: { power: "9,9 HP", tank: "5,8 L", weight: "118 kg", brake: "CBS", seat: "770 mm" }, description: "Skutik racing dengan smartXonnect — Bluetooth, race tune mode, fitur paling kaya fitur." },
  { name: "TVS Apache RTR 160 4V", brand: "TVS", category: "sport", year: 2026, engineCc: 160, transmission: "Manual 5-Percepatan", fuelType: "Bensin", color: "Red / Black", price: 30000000, badge: null, featured: false, specs: { power: "17,5 HP", tank: "12,0 L", weight: "147 kg", brake: "ABS Single", seat: "800 mm" }, description: "Naked bike racing DNA. GTT (Glide Through Traffic), mode riding 3 pilihan." },
  { name: "Gesits R1", brand: "Gesits", category: "elektrik", year: 2026, engineCc: 0, transmission: "Otomatis", fuelType: "Listrik", color: "White / Blue", price: 22500000, badge: "ECO", featured: true, specs: { power: "3,7 kW", tank: "Baterai 2 kWh", weight: "127 kg", brake: "Cakram", seat: "780 mm" }, description: "Motor listrik karya anak bangsa. Jarak tempuh 80 km sekali cas, bebas bensin dan emisi." },
  { name: "Volta 401", brand: "Volta", category: "elektrik", year: 2026, engineCc: 0, transmission: "Otomatis", fuelType: "Listrik", color: "Black / Gold", price: 19900000, badge: "ECO", featured: false, specs: { power: "1,8 kW", tank: "Baterai 1,5 kWh", weight: "95 kg", brake: "Cakram", seat: "760 mm" }, description: "Motor listrik hemat untuk harian. Cas rumah 4 jam, biaya per km cuma Rp60-an." },
  { name: "Polytron Fox-R", brand: "Polytron", category: "elektrik", year: 2026, engineCc: 0, transmission: "Otomatis", fuelType: "Listrik", color: "White / Red", price: 18500000, badge: null, featured: false, specs: { power: "2,5 kW", tank: "Baterai 1,8 kWh", weight: "103 kg", brake: "Cakram", seat: "770 mm" }, description: "Skutik listrik sporty dengan baterai lepas-pasang. Praktis untuk diapartemen dan rumah tangga." },
];

const bekas = [
  { name: "Honda Vario 125 eSP", brand: "Honda", category: "matic", year: 2021, engineCc: 125, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Red", priceMin: 17500000, priceMax: 18500000, mileageKm: 14000, grade: "A", badge: "PILIHAN", specs: { dokumen: "STNK+ Complete & Legitimate", mesin: "Sehat Original", service: "Servis Rutin AD" }, description: "Kondisi istimewa, servis rutin AD, cat original 95%. Surat lengkap atas nama, siap tukar nama." },
  { name: "Honda BeAT eSP", brand: "Honda", category: "matic", year: 2022, engineCc: 110, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Black", priceMin: 14800000, priceMax: 15800000, mileageKm: 9000, grade: "A", badge: null, specs: { dokumen: "STNK+ Complete", mesin: "Sehat Original", service: "Baru servis" }, description: "Seperti baru, kilometer masih receh. Unit showroom, belum pernah jatuh." },
  { name: "Honda Scoopy Sporty", brand: "Honda", category: "matic", year: 2021, engineCc: 110, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Cream", priceMin: 16500000, priceMax: 17500000, mileageKm: 17000, grade: "A", badge: null, specs: { dokumen: "STNK+ Complete", mesin: "Sehat Original", service: "Ban baru" }, description: "Retro charm terawat, ban baru diganti, siap pakai tanpa biaya." },
  { name: "Honda PCX 150 ABS", brand: "Honda", category: "matic", year: 2019, engineCc: 150, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Brown", priceMin: 21500000, priceMax: 23000000, mileageKm: 24000, grade: "A", badge: "PILIHAN", specs: { dokumen: "STNK+ Complete", mesin: "Sehat Original", service: "Servis berkala" }, description: "Generasi terakhir PCX 150 ABS — dicari kolektor. Full paper, condition top." },
  { name: "Honda Genio", brand: "Honda", category: "matic", year: 2023, engineCc: 110, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Orange", priceMin: 16000000, priceMax: 17000000, mileageKm: 6000, grade: "A", badge: null, specs: { dokumen: "STNK+ Complete", mesin: "Sehat Original", service: "Masih garansi" }, description: "Motor anak muda styling, km 6 ribu saja. Masih ada sisa garansi resmi AHM." },
  { name: "Honda Supra X 125 FI", brand: "Honda", category: "bebek", year: 2018, engineCc: 125, transmission: "Manual 4-Percepatan", fuelType: "Bensin", color: "Black", priceMin: 11000000, priceMax: 12500000, mileageKm: 31000, grade: "B", badge: null, specs: { dokumen: "STNK+ Complete", mesin: "Sehat", service: "Ganti gear set" }, description: "Bebek super awet. Pernah ganti gear set original, mantap buat kerja kulakan." },
  { name: "Honda Revo FI", brand: "Honda", category: "bebek", year: 2017, engineCc: 110, transmission: "Manual 4-Percepatan", fuelType: "Bensin", color: "Blue", priceMin: 8500000, priceMax: 9500000, mileageKm: 38000, grade: "B", badge: null, specs: { dokumen: "STNK+ Complete", mesin: "Sehat", service: "Rawat rutin" }, description: "Kuda kerja teruji waktu. Nyaman, irit, biaya perawatan paling murah." },
  { name: "Honda CB150 Verza", brand: "Honda", category: "retro", year: 2019, engineCc: 150, transmission: "Manual 5-Percepatan", fuelType: "Bensin", color: "Black", priceMin: 18500000, priceMax: 20000000, mileageKm: 21000, grade: "A", badge: null, specs: { dokumen: "STNK+ Complete", mesin: "Sehat Original", service: "Cat mulus" }, description: "Basis modifikasi brat/cafe paling dicari. Cat mulus, tidak pernah benturan." },
  { name: "Honda CBR150R", brand: "Honda", category: "sport", year: 2018, engineCc: 150, transmission: "Manual 6-Percepatan", fuelType: "Bensin", color: "Red", priceMin: 23000000, priceMax: 25000000, mileageKm: 19000, grade: "A", badge: "PILIHAN", specs: { dokumen: "STNK+ Complete", mesin: "Sehat Original", service: "Kampas baru" }, description: "Sport full fairing terawat. Kaki-kaki orisinal, mesin kencang, siap touring." },
  { name: "Honda CRF150L", brand: "Honda", category: "trail", year: 2020, engineCc: 150, transmission: "Manual 6-Percepatan", fuelType: "Bensin", color: "Red", priceMin: 31000000, priceMax: 33500000, mileageKm: 16000, grade: "A", badge: "HOT", specs: { dokumen: "STNK+ Complete", mesin: "Sehat Original", service: "Garpu baik" }, description: "Unit trail paling dicari. Tidak pernah gowes gunung ekstrem, garpu masih bagus." },
  { name: "Honda Sonic 150R", brand: "Honda", category: "bebek", year: 2019, engineCc: 150, transmission: "Manual 6-Percepatan", fuelType: "Bensin", color: "White", priceMin: 21000000, priceMax: 22500000, mileageKm: 22000, grade: "A", badge: null, specs: { dokumen: "STNK+ Complete", mesin: "Sehat Original", service: "Motor original" }, description: "Bebek underbone racing original. Dicari para penikmat underbone karena unitnya langka." },
  { name: "Yamaha NMAX 155", brand: "Yamaha", category: "matic", year: 2020, engineCc: 155, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Black", priceMin: 21500000, priceMax: 23000000, mileageKm: 25000, grade: "A", badge: "PILIHAN", specs: { dokumen: "STNK+ Complete", mesin: "Sehat Original", service: "V-belt baru" }, description: "Skutik premium paling laku. V-belt baru diganti, siap pakai tanpa service." },
  { name: "Yamaha Aerox 155", brand: "Yamaha", category: "matic", year: 2021, engineCc: 155, transmission: "Otomatis (CVT)", fuelType: "Bensin", color: "Red", priceMin: 23500000, priceMax: 25000000, mileageKm: 18000, grade: "A", badge: null, specs: { dokumen: "STNK+ Complete", mesin: "Sehat Original", service: "Orisinal semua" }, description: "Aerox muda km receh. Body orisinal semua, belum pernah modif mesin." },
  { name: "Yamaha Jupiter MX King", brand: "Yamaha", category: "bebek", year: 2017, engineCc: 150, transmission: "Manual 5-Percepatan", fuelType: "Bensin", color: "Blue", priceMin: 11500000, priceMax: 13000000, mileageKm: 34000, grade: "B", badge: null, specs: { dokumen: "STNK+ Complete", mesin: "Sehat", service: "Rawat rutin" }, description: "Bebek sport ringan lincah. Cocok harian anak kos maupun pekerja lapangan." },
  { name: "Yamaha Vixion R", brand: "Yamaha", category: "sport", year: 2016, engineCc: 150, transmission: "Manual 5-Percepatan", fuelType: "Bensin", color: "Black", priceMin: 15500000, priceMax: 17000000, mileageKm: 29000, grade: "B", badge: null, specs: { dokumen: "STNK+ Complete", mesin: "Sehat", service: "Tune up baru" }, description: "Legenda naked blue-core. Tarikan panjang, enak buat jalanan Tasik-Ciamis." },
  { name: "Yamaha WR155R", brand: "Yamaha", category: "trail", year: 2021, engineCc: 155, transmission: "Manual 6-Percepatan", fuelType: "Bensin", color: "Blue", priceMin: 32500000, priceMax: 34500000, mileageKm: 12000, grade: "A", badge: null, specs: { dokumen: "STNK+ Complete", mesin: "Sehat Original", service: "Orisinal" }, description: "Trail enduro muda, km receh. Full orisinal, tak pernah dipakai lomba." },
  { name: "Suzuki Satria F150", brand: "Suzuki", category: "bebek", year: 2016, engineCc: 150, transmission: "Manual 6-Percepatan", fuelType: "Bensin", color: "Blue", priceMin: 12500000, priceMax: 14000000, mileageKm: 30000, grade: "B", badge: null, specs: { dokumen: "STNK+ Complete", mesin: "Sehat", service: "Mesin standar" }, description: "Satria standar tanpa modifikasi mesin. Buruan para penggemar drag legal road." },
  { name: "Kawasaki Ninja 250 FI", brand: "Kawasaki", category: "sport", year: 2015, engineCc: 250, transmission: "Manual 6-Percepatan", fuelType: "Bensin", color: "Green", priceMin: 26000000, priceMax: 29000000, mileageKm: 27000, grade: "B", badge: null, specs: { dokumen: "STNK+ Complete", mesin: "Sehat", service: "Radiasi baru" }, description: "Twin-cylinder klasik yang masih disukai. Radiasi baru ganti, siap pakai jalan jauh." },
];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

async function main() {
  await db.motorcycle.deleteMany({});
  await db.inquiry.deleteMany({});

  for (const m of baru) {
    await db.motorcycle.create({
      data: {
        name: m.name,
        brand: m.brand,
        category: m.category,
        condition: "baru",
        year: m.year,
        engineCc: m.engineCc,
        transmission: m.transmission,
        fuelType: m.fuelType,
        color: m.color,
        price: m.price,
        priceMin: null,
        priceMax: null,
        image: IMG[m.category as keyof typeof IMG] || IMG.matic,
        badge: m.badge,
        stock: 2 + (m.featured ? 3 : 1),
        mileageKm: null,
        grade: null,
        specs: JSON.stringify(m.specs),
        description: m.description,
        featured: !!m.featured,
      },
    });
  }

  for (const m of bekas) {
    await db.motorcycle.create({
      data: {
        name: m.name,
        brand: m.brand,
        category: m.category,
        condition: "bekas",
        year: m.year,
        engineCc: m.engineCc,
        transmission: m.transmission,
        fuelType: m.fuelType,
        color: m.color,
        price: m.priceMin,
        priceMin: m.priceMin,
        priceMax: m.priceMax,
        image: IMG[m.category as keyof typeof IMG] || IMG.matic,
        badge: m.badge,
        stock: 1,
        mileageKm: m.mileageKm,
        grade: m.grade,
        specs: JSON.stringify(m.specs),
        description: m.description,
        featured: false,
      },
    });
  }

  const count = await db.motorcycle.count();
  console.log(`Seed selesai: ${count} motor (${baru.length} baru + ${bekas.length} bekas)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
