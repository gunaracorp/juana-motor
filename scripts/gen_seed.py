#!/usr/bin/env python3
"""Generate Juana Motor full seed data from extracted Excel JSON.
Outputs:
  scripts/seed-data.json       -> consumed by scripts/seed.ts
  src/data/penyusutan.ts       -> frontend kalkulator bekas (factors + 70 models)
"""
import json, re, os

SRC = "/home/z/my-project/scripts/data-extract.json"
MANIFEST = "/home/z/my-project/scripts/img-manifest.json"
OUT_SEED = "/home/z/my-project/scripts/seed-data.json"
OUT_TS = "/home/z/my-project/src/data/penyusutan.ts"

with open(SRC) as f:
    DATA = json.load(f)
with open(MANIFEST) as f:
    IMG_MANIFEST = json.load(f)

def img(key, cat):
    """manifest image or category fallback"""
    if key and IMG_MANIFEST.get(key):
        return IMG_MANIFEST[key]
    return FALLBACK_IMG.get(cat, "/images/motor-matic.png")

FALLBACK_IMG = {
    "matic": "/images/motor-matic.png", "premium": "/images/motor-matic.png",
    "sport": "/images/motor-sport.png", "naked": "/images/motor-sport.png",
    "bebek": "/images/motor-bebek.png", "klasik": "/images/motor-retro.png",
    "trail": "/images/motor-trail.png", "bigbike": "/images/motor-bigbike.png",
    "elektrik": "/images/motor-elektrik.png", "roda3": "/images/motor-bebek.png",
}

# ============ IMAGE MAP: model family -> image key ============
BARU_IMG = {
    "BeAT": "honda-beat", "Genio": "honda-genio", "Scoopy": "honda-scoopy",
    "Vario 125": "honda-vario-125", "Vario 160": "honda-vario-160",
    "PCX 160": "honda-pcx", "ADV 160": "honda-adv", "Stylo 160": "honda-stylo",
    "Revo X": "honda-revo", "Revo FIT": "honda-revo",
    "Supra X 125 FI": "honda-supra-x", "Supra GTR 150": "honda-supra-gtr",
    "Sonic 150R": "honda-sonic", "CB150 Verza": "honda-verza",
    "CBR150R": "honda-cbr150r", "CB350 H'ness": "honda-cb350", "CB350RS": "honda-cb350",
    "CBR250RR": "honda-cbr250rr", "CB650R": None, "CBR650R": None,
    "CRF150L": "honda-crf150l", "ICON eSP": "honda-em1", "EM1 e:": "honda-em1",
    "Mio M3 125": "yamaha-mio", "Mio i 125": "yamaha-mio", "Mio S 125": "yamaha-mio",
    "Fino 125": "yamaha-fino", "Gear 125": "yamaha-gear", "X-Ride 125": "yamaha-xride",
    "Fazzio": "yamaha-fazzio", "Lexi 125": "yamaha-lexi", "Lexi LX 155": "yamaha-lexi",
    "Aerox 155": "yamaha-aerox", "Aerox Alpha": "yamaha-aerox", "NMAX 155": "yamaha-nmax",
    "XMAX 250": "yamaha-xmax", "MT-15": "yamaha-mt15", "MT-25": "yamaha-mt25",
    "V-Ixion R": "yamaha-vixion", "R15": "yamaha-r15", "R25": "yamaha-r25",
    "WR155 R": "yamaha-wr155", "XSR155": "yamaha-xsr155",
    "Jupiter MX King 150": "yamaha-jupiter-mx", "Jupiter Z1": "yamaha-jupiter-z",
    "Vega Force": "yamaha-jupiter-z", "NEO's": "yamaha-neos",
    "Address FI": "suzuki-address", "Skydrive Sport": "suzuki-skydrive",
    "Access 125": "suzuki-access", "Burgman Street 125": "suzuki-burgman",
    "Satria F150": "suzuki-satria", "GSX-R150": "suzuki-gsxr150", "GSX-S150": "suzuki-gsxs150",
    "GSX150 Bandit": "suzuki-bandit", "Axelo 125": "suzuki-axelo", "V-Strom 250 SX": "suzuki-vstrom",
    "W175": "kawasaki-w175", "Ninja 250": "kawasaki-ninja-250", "Ninja 400": "kawasaki-ninja-400",
    "Ninja 500": "kawasaki-ninja-400", "Ninja ZX-25R": "kawasaki-zx25r",
    "Ninja ZX-6R": "kawasaki-zx10r", "Ninja 650": "kawasaki-ninja-650",
    "Ninja ZX-10R": "kawasaki-zx10r", "Z250": "kawasaki-z250", "Z650": "kawasaki-z650",
    "Z900": "kawasaki-z900", "Versys-X 250": "kawasaki-versys", "Versys 650": "kawasaki-versys",
    "KLX150BF": "kawasaki-klx", "KLX230": "kawasaki-klx",
    "Duke 200": "ktm-duke", "Duke 250": "ktm-duke", "Duke 390": "ktm-duke390",
    "RC 200": "ktm-rc", "RC 390": "ktm-rc", "250 Adventure": "ktm-adventure",
    "390 Adventure": "ktm-adventure", "450 SX-F": "ktm-sxf",
    "Pulsar NS160": "bajaj-pulsar", "Pulsar N160": "bajaj-pulsar",
    "Pulsar NS200": "bajaj-pulsar", "Pulsar RS200": "bajaj-pulsar",
    "Dominar 400": "bajaj-dominar", "Avenger 220": "bajaj-avenger",
    "TNT 135": "benelli-tnt135", "Leoncino 250": "benelli-leoncino",
    "TNT 249S": "benelli-tnt600", "TRK 251": "benelli-trk", "TRK 502": "benelli-trk",
    "TRK 502X": "benelli-trk", "Leoncino 500": "benelli-leoncino",
    "Imperiale 400": "benelli-imperiale", "TNT 600i": "benelli-tnt600",
    "TNT 899": "benelli-tnt600", "TNT 1130": "benelli-tnt600",
    "Hunter 350": "re-hunter", "Bullet 350": "re-bullet", "Classic 350": "re-classic",
    "Meteor 350": "re-meteor", "Goan Classic 350": "re-classic", "Guerrilla 450": "re-guerrilla",
    "Himalayan 450": "re-himalayan", "Interceptor 650": "re-interceptor",
    "Classic 650": "re-classic", "Super Meteor 650": "re-supermeteor",
    "Liberty S 125": "vespa-liberty", "Liberty S 150": "vespa-liberty",
    "Primavera 150": "vespa-primavera", "Sprint 150": "vespa-sprint",
    "GTV 300": "vespa-gtv", "GTS 250": "vespa-gts", "Medley 150": "piaggio-medley",
    "SR GT 200": "aprilia-srgt", "RS 457": "aprilia-rs457",
    "Cross X 70": "viar-crossx", "Cross X 100": "viar-crossx", "Cross X 150": "viar-crossx",
    "Karya 150 X": "viar-karya", "New Q1": "viar-q1", "Uno4": "viar-sepeda", "U3": "viar-sepeda",
    "Demon GR200R": "gpx-demon", "Wildfire 200": "gpx-wildfire",
    "D-Rex 150": "gpx-demon", "Gentleman 200": None,
    "G1": "gesits", "GV1": "gesits", "One": "alva", "N3": "alva",
    "201": "volta", "401": "volta", "T3": "uwinfly", "T1800": "united",
    "MX1200": "viar-sepeda", "Zuzu": "smoot", "Tempur": "smoot",
    "Fox R": "polytron", "E-Max": "selis", "T9": "yadea",
}

KAT_MAP = {
    "Matic": "matic", "Scooter Premium": "premium", "Bebek": "bebek",
    "Sport": "sport", "Naked": "naked", "Klasik": "klasik", "Trail": "trail",
    "Motocross": "trail", "Chopper": "klasik", "Listrik": "elektrik",
    "Sepeda Listrik": "elektrik", "Roda 3": "roda3",
}

# transmission overrides for famous manual models (gear counts)
GEAR_OVERRIDE = {
    "Supra GTR 150": 6, "Satria F150": 6, "Sonic 150R": 6, "Jupiter MX King 150": 5,
    "Jupiter Z1": 4, "Vega Force": 4, "Axelo 125": 4, "Revo X": 4, "Revo FIT": 4,
    "Supra X 125 FI": 4, "W175": 5, "CB350 H'ness": 5, "CB350RS": 5,
    "Imperiale 400": 5, "KLX150BF": 6, "XSR155": 6, "Meteor 350": 6,
    "Hunter 350": 6, "Classic 350": 6, "Bullet 350": 5, "Goan Classic 350": 6,
    "Interceptor 650": 6, "Super Meteor 650": 6, "Classic 650": 6, "Guerrilla 450": 6,
    "Himalayan 450": 6, "Leoncino 500": 6, "Imperiale 400 ": 5,
}

# famous-model selling points (concise, factual-soft)
DESC_OVERRIDES = {
    ("Honda", "BeAT"): "Skutik ikon paling laku di Indonesia — ringan 87 kg, irit BBM ekstra, dan harga paling ramah. Raja perjalanan harian warga Tasikmalaya.",
    ("Honda", "Genio"): "Skutik gaya street minimalis. Flat floor leluasa, bodi kokoh, cocok untuk anak muda dan pekerja lapangan.",
    ("Honda", "Scoopy"): "Retro-modern yang tak lekang waktu. Ban edelweis, jokokan jenjang, warna khas — primadona kalangan stylish.",
    ("Honda", "Vario 125"): "Juara kelas 125 cc. eSP+ irit, kolong 11 liter, sporty — motor paling dicari se-Jabar baik baru maupun bekas.",
    ("Honda", "Vario 160"): "Performa 16 PS terbesar di kelas skutik eSP+, suspensi kokoh — favorit anak muda & kurir cepat.",
    ("Honda", "PCX 160"): "Skutik premium touring-sehari: mesin eSP+ 157 cc, fitur lengkap, nyaman lintas kota Tasik-Bandung.",
    ("Honda", "ADV 160"): "Skutik adventure bongsor. Ground clearance tinggi, ban sedikit knobby — aman di jalan Tasik naik-turun.",
    ("Honda", "Stylo 160"): "Skutik retro premium AHM dengan mesin eSP+ 157 cc — gaya Vespa, harga matic Honda.",
    ("Honda", "Supra X 125 FI"): "Legenda bebek sejuta umat. Awet, irit, mudah dijual kembali — nilai jual kembali terbaik di kelasnya.",
    ("Honda", "Supra GTR 150"): "Bebek sport racing 6-percepatan — tarikan atas nendang, favorit anak drag legal.",
    ("Honda", "CB150 Verza"): "Naked klasik tangguh. Basis modifikasi brat/cafe paling dicari, mesin andal mudah dirawat.",
    ("Honda", "CBR150R"): "Full fairing racing DNA MotoGP, Assist & Slipper Clutch — motor sport 150 cc paling digemari rider muda.",
    ("Honda", "CB350 H'ness"): "Big classic 350 cc penuh elegan. Suara lembut, finishing premium — simpanan yang nilai jualnya awet.",
    ("Honda", "CB350RS"): "Versi sporty dari CB350 — gaya retro-sport dengan posisi duduk tegak lebih santai.",
    ("Honda", "CBR250RR"): "Raja 250 cc lokal. Performa puncak kelasnya, finishing AHM premium — incaran kolektor & track-day.",
    ("Honda", "CRF150L"): "Legenda trail tanah Jabar. Rangka kokoh, garpu Showa — sahabat gowes Galunggung dan papandayan.",
    ("Honda", "EM1 e:"): "Motor listrik resmi AHM — baterai Honda Mobile Power Pack e:, tukar-tukar baterai, bebas emisi.",
    ("Yamaha", "Mio M3 125"): "Skutik blue-core paling ekonomis. Ringan gesit, suku cadang murah di mana-mana.",
    ("Yamaha", "Fino 125"): "Retro cakep dengan mesin blue-core 125 — favorit ibu-ibu dan mahasiswi Tasikmalaya.",
    ("Yamaha", "Gear 125"): "Kompak, murah, irit. Ada varian Hybrid-Connected dengan SMG — teknologi unik Yamaha.",
    ("Yamaha", "X-Ride 125"): "Skutik bergaya adventure ringan — ban sedikit knobby, jantan untuk jalan desa.",
    ("Yamaha", "Fazzio"): "Skutik hybrid paling ikonik — Smart Motor Generator, Y-Connect, gaya retro-futuristik.",
    ("Yamaha", "Lexi 125"): "Skutik matic kelas menengah Yamaha — tenaga kencang, harga bersahabat.",
    ("Yamaha", "Lexi LX 155"): "Skutik 155 cc VVA dengan fitur Y-Connect — serius tapi stylish.",
    ("Yamaha", "Aerox 155"): "Skutik sporty VVA paling gahar di kelasnya — livery racing, incaran anak mudik gowes.",
    ("Yamaha", "Aerox Alpha"): "Aerox generasi baru dengan fitur upgrade — masih satu rasa sporty khas Aerox.",
    ("Yamaha", "NMAX 155"): "Raja skutik premium Indonesia. VVA + TCS + ABS, nyaman dan bernilai jual tinggi.",
    ("Yamaha", "XMAX 250"): "Maxi-scooter premium 250 cc — touring se- Jabar paling nyaman, mesin halus bertenaga.",
    ("Yamaha", "MT-15"): "Dark Side of Japan — streetfighter ramping dengan torsi banteng. Gaya nak, tenaga serius.",
    ("Yamaha", "MT-25"): "Naked twin 250 cc — torsi halus bawah, pilihan pintu masuk dunia naked bongsor.",
    ("Yamaha", "V-Ixion R"): "Naked blue-core asli Yamaha — tarikan panjang, favorit riding harian jarak jauh.",
    ("Yamaha", "R15"): "Supersport mini paling dicari — VVA, Assist & Slipper Clutch, quickshifter. Idaman rider muda.",
    ("Yamaha", "R25"): "Sport twin 250 cc halus dan kencang — nyaman touring, mantap di track.",
    ("Yamaha", "WR155 R"): "Enduro street-legal bertenaga 155 — garpu KYB full adjustment, lawan berat CRF150L.",
    ("Yamaha", "XSR155"): "Retro-sport neo-classic Yamaha — tubular cantik, finishing premium, nilai jual awet.",
    ("Yamaha", "Jupiter MX King 150"): "Bebek sport 150 cc ringan dan lincah — raja drag street anak Tasik.",
    ("Yamaha", "Jupiter Z1"): "Bebek harian legendaris Yamaha — irit, awet, laris di kalangan pekerja.",
    ("Yamaha", "Vega Force"): "Bebek simpel paling awet — kuda kerja keluarga, biaya rawat murah.",
    ("Yamaha", "NEO's"): "Skutik listrik Yamaha dengan battery exchange — tenang, bersih, hemat per km.",
    ("Suzuki", "Address FI"): "Skutik irit legendaris Suzuki — kolong jumbo, ringan, bahan bakar hemat.",
    ("Suzuki", "Skydrive Sport"): "Skutik sporty kelas entry Suzuki — gampang dikendarai, murah rawat.",
    ("Suzuki", "Access 125"): "Skutik ekonomis dengan bagasi luas — cocok harian keluarga.",
    ("Suzuki", "Burgman Street 125"): "Skutik maxi-mini bergaya bongsor — kolong luas, windscreen, nyaman jalan jauh.",
    ("Suzuki", "Satria F150"): "Rajanya bebek sport Indonesia — mesin DOHC terkencang di kelas bebek, ikon drag legal.",
    ("Suzuki", "GSX-R150"): "Supersport mini bergaya GSX-R — ringan, tarikan tinggi nendang.",
    ("Suzuki", "GSX-S150"): "Naked sport DNA GSX-R — agresif, responsif, harga bersahabat.",
    ("Suzuki", "GSX150 Bandit"): "Naked klasik-modern Suzuki — sederhana, kokoh, mudah dirawat.",
    ("Suzuki", "Axelo 125"): "Bebek sport harian Suzuki — irit, tahan banting, bagus buat kulakan.",
    ("Suzuki", "V-Strom 250 SX"): "Adventure touring 250 cc — nyaman jalan jauh, tangki besar, harga terjangkau.",
    ("Kawasaki", "W175"): "Retro classic Jap-style — suara mesin tunggal lembut, bobber-friendly, keren apa pun gayanya.",
    ("Kawasaki", "Ninja 250"): "Sport twin 250 cc legendaris — paling dicari di pasar bekas, nilai jual stabil.",
    ("Kawasaki", "Ninja 400"): "Sport twin 400 cc bertenaga besar — level naik kelas dari Ninja 250.",
    ("Kawasaki", "Ninja 500"): "Generasi baru sport twin Kawasaki — finishing premium, siap touring jauh.",
    ("Kawasaki", "Ninja ZX-25R"): "Empat silinder 250 cc — satu-satunya di kelasnya, suara raging scream. Ikon Kawasaki.",
    ("Kawasaki", "Ninja ZX-6R"): "Supersport 636 cc — level hampir superbike, incaran track-day serius.",
    ("Kawasaki", "Ninja 650"): "Sport-touring twin 650 cc — nyaman harian, cukup kencang untuk perjalanan jauh.",
    ("Kawasaki", "Ninja ZX-10R"): "Superbike liter-class penuh teknologi WSBK — prestise di garasi mana pun.",
    ("Kawasaki", "Z250"): "Naked twin ringan — sugested line khas Z, enak buat harian dan naik kelas.",
    ("Kawasaki", "Z650"): "Naked twin 650 cc populer — ringan untuk kelasnya, torsi kuat.",
    ("Kawasaki", "Z900"): "Naked 4-silinder 900 cc — sound lullaby, Sugomi styling, binarang di pameran.",
    ("Kawasaki", "Versys-X 250"): "Mini adventure touring Kawasaki — ringan, tangki besar, sahabat touring murah.",
    ("Kawasaki", "Versys 650"): "Adventure touring 650 cc serius — sanggup crossing pulau dengan nyaman.",
    ("Kawasaki", "KLX150BF"): "Trail fun bike kawasaki — ringan lincah, pintu masuk dunia trail.",
    ("Kawasaki", "KLX230"): "Trail enduro modern 230 cc — garpu lebih panjang, siap tanah ekstrem.",
    ("KTM", "Duke 200"): "Ready to Race — naked ringan paling ngamuk di kelasnya, beringas khas KTM.",
    ("KTM", "Duke 250"): "Naked single 250 cc — torsi bawah besar, ringan, akrobatik.",
    ("KTM", "Duke 390"): "Naked single 390 cc paling beringas — fitur premium, incaran corner-carver.",
    ("KTM", "RC 200"): "Full-fairing KTM kelas entry — aerodinamis, agresif, track-ready.",
    ("KTM", "RC 390"): "Sport single 390 cc — rajanya kelas single sport, sering menang lomba track.",
    ("KTM", "250 Adventure"): "ADV ringan KTM — jangkauan jauh, cocok kutak-kutik jalan kabupaten.",
    ("KTM", "390 Adventure"): "Adventure 390 cc penuh fitur — rally mode, suspensi WP, siap lost trail.",
    ("KTM", "450 SX-F"): "Motocross Factory Edition — senjata lomba kelas dunia, bukan mainan jalanan.",
    ("Bajaj", "Pulsar NS160"): "Naked bongsor harga kawan — torsi kuat, tank besar, nyaman harian.",
    ("Bajaj", "Pulsar N160"): "Pulsar generasi baru — LED full, kaki-kaki update, tetap irit.",
    ("Bajaj", "Pulsar NS200"): "Naked triple-spark terkenal garang — paling dicari di pasar bekas Bajaj.",
    ("Bajaj", "Pulsar RS200"): "Full-fairing Bajaj paling terjangkau — body racing, anti klempung.",
    ("Bajaj", "Dominar 400"): "Sport-touring bongsor harga menengah — twin ABS, touring-ready dari pabrik.",
    ("Bajaj", "Avenger 220"): "Cruiser low-seat — santai buat perjalanan panjang, gaya broo.",
    ("Benelli", "TNT 135"): "Mini naked Italy-Mandarin yang seru — sound nendang, penuh karakter.",
    ("Benelli", "Leoncino 250"): "Scrambler elegan Leoncino — sasis kokoh, gaya retro Italy, harga bersahabat.",
    ("Benelli", "TNT 249S"): "Naked twin 250 cc Benelli — finishing premium, harga kompetitif.",
    ("Benelli", "TRK 251"): "Adventure entry Benelli — tangki jumbo, nyaman touring murah.",
    ("Benelli", "TRK 502"): "Raja adventure terjangkau 500 cc twin — bongsor, penuh barang, siap pulau jawa tour.",
    ("Benelli", "TRK 502X"): "Versi off-road TRK 502 — ban knobby, pelindung lebih, adventure murni.",
    ("Benelli", "Leoncino 500"): "Scrambler twin 500 cc — galeri cantik, torsi santai, berkelas.",
    ("Benelli", "Imperiale 400"): "Classic 400 cc ala tahun 60-an — chrome penuh, gaya royal enfield rival.",
    ("Benelli", "TNT 600i"): "Naked 4-silinder 600 cc — the people's four cylinder, sound merdu.",
    ("Benelli", "TNT 899"): "Naked 3-silinder 900 cc — performa besar harga bersaing.",
    ("Benelli", "TNT 1130"): "Cafe racer besar 1130 cc — kolektor item, produk terbatas.",
    ("Royal Enfield", "Hunter 350"): "RE modern paling ringan — jalan kota gesit, gaya retro modern, incaran anak muda.",
    ("Royal Enfield", "Bullet 350"): "Ikon abadi Royal Enfield — thump klasik, nilai jual awet, koleksi wajib.",
    ("Royal Enfield", "Classic 350"): "Classic paling ikonik — antrean pembeli bekasnya selalu ada, nilai jual paling awet.",
    ("Royal Enfield", "Meteor 350"): "Cruiser santai 350 cc — posisi duduk nyaman, tour enteng.",
    ("Royal Enfield", "Goan Classic 350"): "Bobber ala pantai Goa — pelek jari, ban lebar, gaya unik.",
    ("Royal Enfield", "Guerrilla 450"): "Roadster modern 450 cc — mesin Sherlot baru, torsi besar, sporty-retro.",
    ("Royal Enfield", "Himalayan 450"): "Adventure 450 cc serius — mesin baru, suspensi panjang, siap Tibet route.",
    ("Royal Enfield", "Interceptor 650"): "Twin 650 cc klasik — sound crinkle, harga terjangkau untuk kelasnya.",
    ("Royal Enfield", "Classic 650"): "Classic twin 650 cc — gabungan elegan Classic 350 + mesin Interceptor.",
    ("Royal Enfield", "Super Meteor 650"): "Cruiser 650 cc premium — aylish seat, touring mewah harga menengah.",
    ("Vespa", "Liberty S 125"): "Vespa urban paling terjangkau — elegan, irit, praktis harian.",
    ("Vespa", "Liberty S 150"): "Vespa Liberty 150 — tenaga lebih besar untuk kota bisy.",
    ("Vespa", "Primavera 150"): "Primavera — 'musim semi' Vespa paling ikonik. Cantik, klasik, abadi.",
    ("Vespa", "Sprint 150"): "Vespa Sprint — sporty young line, paling dicari anak muda.",
    ("Vespa", "GTV 300"): "Vespa touring 300 cc — kelas atas, fitur premium, sangat eksklusif.",
    ("Vespa", "GTS 250"): "Vespa GTS — maxi Vespa terbesar, performa serius dengan gaya Italy.",
    ("Piaggio", "Medley 150"): "Scooter premium Piaggio — hitech, baterai & mesin halus, berbeda dari Vespa.",
    ("Aprilia", "SR GT 200"): "Skutik sporty adventure Aprilia — satu-satunya skutik gt di kelasnya.",
    ("Aprilia", "RS 457"): "Supersport 457 cc Aprilia — the pocket race queen, penuh winglet aerodinamis.",
    ("Viar", "Cross X 70"): "Mini trail anak-anak — pintu masuk dunia moto-cross anak aman & murah.",
    ("Viar", "Cross X 100"): "Mini trail 100 cc — lompatan kecil seru untuk pemula.",
    ("Viar", "Cross X 150"): "Trail lokai 150 cc Viar — murah, tangguh, bagus untuk harian sawah.",
    ("Viar", "Karya 150 X"): "Roda tiga angkut — solusi angkut keluarga usaha, legal & aman.",
    ("Viar", "New Q1"): "Motor listrik Viar — praktis harian, biaya cas sangat murah.",
    ("Viar", "Uno4"): "Sepeda listrik kekinian — cas rumah, jalan santai, anak-anak suka.",
    ("Viar", "U3"): "Sepeda listrik bergaya motor — awet, murah, laris di kalangan pelajar.",
    ("GPX", "Demon GR200R"): "Supersport Thailand GPX — gaya racing, harga bersaing, langka di pasar.",
    ("GPX", "Wildfire 200"): "Trail GPX Wildfire — bengis untuk tanah, harga bersahabat.",
    ("GPX", "D-Rex 150"): "Naked sport GPX — penuh gaya, pilihan unik yang beda.",
    ("GPX", "Gentleman 200"): "Retro classic GPX Gentleman — gaya British, santai dan elegan.",
    ("Gesits", "G1"): "Motor listrik karya anak bangsa — jarak tempuh 80 km, komposisi baterai tahan lama.",
    ("Gesits", "GV1"): "Gesits GV1 — versi irit dengan Long Range option, hemat penuh.",
    ("Alva", "One"): "Motor listrik premium Indonesia — baterai bisa pinjam tukar, teknologi modern.",
    ("Alva", "N3"): "Alva Next Gen — baterai detasable, performa skutik bensin kelas atas.",
    ("Volta", "201"): "Motor listrik hemat — cocok harian pendek, cas 4-6 jam.",
    ("Volta", "401"): "Volta 401 — klasik listrik populer, biaya per km cuma Rp60-an.",
    ("Uwinfly", "T3"): "Skutik listrik terjangkau — pilihan awal dunia listrik paling murah.",
    ("United", "T1800"): "Motor listrik United — merek terkenal, suku cadang mudah.",
    ("United", "MX1200"): "Sepeda listrik United MX — gaya motor mini, aman untuk pelajar.",
    ("Smoot", "Zuzu"): "Skutik listrik mungil Smoot — lucu, praktis, murah.",
    ("Smoot", "Tempur"): "Motor listrik gaya gagah Tempur — jantan untuk skutik listrik.",
    ("Polytron", "Fox R"): "Skutik listrik sporty Polytron — baterai lepas-pasang, mudah diapartemen.",
    ("Selis", "E-Max"): "Motor listrik Selis — veteran industri listrik lokal, tahan banting.",
    ("Yadea", "T9"): "Skutik listrik Yadea — merek global, desain cakep, teknologi mantap.",
}

KAT_SENTENCE = {
    "matic": "Matic harian yang gampang dibawa dan mudah dijual kembali.",
    "premium": "Skutik premium dengan gaya dan kelas berbeda.",
    "sport": "Sport bergengsi — penuh performa dan penilaian tinggi.",
    "naked": "Naked streetfighter yang lincah di jalan kota dan tangguh jalan jauh.",
    "bebek": "Bebek harian yang awet, irit, dan laris di semua kalangan.",
    "klasik": "Klasik / retro yang nilai jualnya terawat dan penuh gaya.",
    "trail": "Trail / adventure siap diajak melawan jalan rusak dan tanjakan.",
    "elektrik": "Motor listrik — bebas bensin, servis hemat, ramah lingkungan.",
    "roda3": "Roda tiga angkut untuk keluarga usaha dan pedagang.",
}

COLORS_BY_KAT = {
    "matic": ["Hitam", "Merah", "Putih", "Biru", "Abu-abu", "Kuning"],
    "premium": ["Hitam Premium", "Cream Vintage", "Merah Cherry", "Putih Glossy"],
    "sport": ["Merah Racing", "Hitam Doff", "Biru Racing", "Hijau MotoGP"],
    "naked": ["Hitam Doff", "Merah", "Hijau", "Biru"],
    "bebek": ["Hitam", "Merah", "Biru", "Hitam Doff"],
    "klasik": ["Coklat Klasik", "Hitam Chrome", "Cream Vintage", "Hijau Army"],
    "trail": ["Merah Trail", "Hijau Enduro", "Biru Rally", "Hitam Doff"],
    "elektrik": ["Putih", "Hitam", "Biru", "Hijau Neon"],
    "roda3": ["Biru Angkut", "Merah Angkut"],
}

# ============ BUILD NEW MOTOR ROWS ============
TERLARIS_MODELS = {
    "BeAT", "Genio", "Scoopy", "Vario 125", "Vario 160", "PCX 160", "ADV 160",
    "Supra X 125 FI", "CB150 Verza", "CBR150R", "CRF150L",
    "Mio M3 125", "Fino 125", "Gear 125", "Lexi 125", "Lexi LX 155", "Aerox 155",
    "NMAX 155", "MT-15", "R15", "WR155 R", "X-Ride 125",
    "Satria F150", "Address FI", "GSX-S150",
    "Ninja 250", "W175", "Z650", "KLX230",
    "Duke 200", "RC 200",
    "Pulsar NS160", "Pulsar NS200",
    "Classic 350", "Hunter 350", "Meteor 350", "Himalayan 450",
    "Sprint 150", "Primavera 150", "Liberty S 125",
}
HOT_MODELS = {
    "Vario 160", "ADV 160", "Stylo 160", "Aerox Alpha", "NMAX 155", "CBR250RR",
    "Ninja ZX-25R", "R15", "MT-15", "Guerrilla 450", "Hunter 350", "RS 457",
    "Leoncino 250", "XSR155", "Supra GTR 150", "Satria F150", "Jupiter MX King 150",
    "Fazzio", "EM1 e:", "One", "G1",
}

def fmt_rp(n):
    return f"Rp {n:,}".replace(",", ".")

baru_out = []
for b in DATA["baru"]:
    merek, model, varian = b["merek"], b["model"], b["varian"]
    kategori = KAT_MAP.get(b["kategori"], "matic")
    cc = b["cc"]
    harga = b["hargaOtr"]
    is_listrik = kategori == "elektrik"
    is_hybrid = "Hybrid" in varian
    fuel = "Listrik" if is_listrik else ("Bensin + Hybrid" if is_hybrid else "Bensin")
    if is_listrik:
        transmission = "Otomatis"
        engine = 0
    else:
        engine = cc
        transmission = "Otomatis (CVT)" if kategori in ("matic", "premium") else f"Manual {GEAR_OVERRIDE.get(model, 6)}-Percepatan"

    img_key = BARU_IMG.get(model)
    image = img(img_key, kategori)

    badge = None
    if harga >= 100_000_000:
        badge = "PREMIUM"
    elif is_listrik:
        badge = "ECO"
    elif model in TERLARIS_MODELS:
        badge = "TERLARIS"
    elif model in HOT_MODELS:
        badge = "HOT"

    colors = " / ".join(COLORS_BY_KAT[kategori][:3])

    sumber_txt = {"RESMI": "price list resmi pabrikan", "DEALER": "price list dealer", "PASAR": "riset pasar agregator", "EST": "estimasi basis 2025"}.get(b["sumber"], "riset pasar")
    desc_base = (
        f"{DESC_OVERRIDES.get((merek, model), f'{merek} {model} varian {varian} — pilihan berkualitas dari {merek}.')} "
        f"{KAT_SENTENCE[kategori]} "
        f"Varian: {varian}. Harga OTR {fmt_rp(harga)} per {sumber_txt} (riset November 2026) — bisa nego, bisa kredit DP ringan, dan tukar tambah diterima di showroom."
    )

    specs = {
        "varian": varian,
        "kelas": b["kategori"],
        "sumber_harga": sumber_txt.capitalize(),
    }
    featured = model in TERLARIS_MODELS or badge == "PREMIUM"

    name = f"{merek} {model}"
    if varian and varian != "-" and varian != "Std" and varian != "Standard" and varian != "Std ":
        name = f"{merek} {model} {varian}"
    elif varian in ("Std", "Standard", "Std "):
        name = f"{merek} {model}"

    baru_out.append({
        "name": name,
        "brand": merek,
        "category": kategori,
        "condition": "baru",
        "year": 2026,
        "engineCc": engine,
        "transmission": transmission,
        "fuelType": fuel,
        "color": colors,
        "price": harga,
        "image": image,
        "badge": badge,
        "stock": 3 if badge in ("TERLARIS", "HOT") else 2,
        "specs": specs,
        "description": desc_base,
        "featured": featured,
    })

# ============ BUILD USED UNITS ============
# bekas model family mapping: substring-match -> (imgkey, cc, dbcategory)
BEKAS_FAM = [
    ("BeAT", "honda-beat", 110, "matic"), ("Genio", "honda-genio", 110, "matic"),
    ("Scoopy", "honda-scoopy", 110, "matic"), ("Vario 125", "honda-vario-125", 125, "matic"),
    ("Vario 160", "honda-vario-160", 157, "matic"), ("Vario 110", "honda-vario-125", 110, "matic"),
    ("PCX 150", "honda-pcx", 150, "matic"), ("PCX 160", "honda-pcx", 157, "matic"),
    ("ADV 150", "honda-adv", 150, "matic"), ("ADV 160", "honda-adv", 157, "matic"),
    ("Revo", "honda-revo", 110, "bebek"), ("Supra X", "honda-supra-x", 125, "bebek"),
    ("Supra GTR", "honda-supra-gtr", 150, "bebek"), ("CB150 Verza", "honda-verza", 150, "naked"),
    ("CBR150R", "honda-cbr150r", 150, "sport"), ("Sonic 150R", "honda-sonic", 150, "bebek"),
    ("CRF150L", "honda-crf150l", 150, "trail"), ("CBR250RR", "honda-cbr250rr", 250, "sport"),
    ("Mio M3", "yamaha-mio", 125, "matic"), ("Mio i", "yamaha-mio", 125, "matic"),
    ("Mio S", "yamaha-mio", 125, "matic"), ("Fino 125", "yamaha-fino", 125, "matic"),
    ("Gear 125", "yamaha-gear", 125, "matic"), ("X-Ride", "yamaha-xride", 125, "matic"),
    ("Lexi 125", "yamaha-lexi", 125, "matic"), ("Aerox 155", "yamaha-aerox", 155, "matic"),
    ("NMAX", "yamaha-nmax", 155, "matic"), ("XMAX 250", "yamaha-xmax", 250, "matic"),
    ("V-Ixion R", "yamaha-vixion", 155, "naked"), ("R15 V3", "yamaha-r15", 155, "sport"),
    ("R25", "yamaha-r25", 250, "sport"), ("MT-15", "yamaha-mt15", 155, "naked"),
    ("WR155 R", "yamaha-wr155", 155, "trail"), ("XSR155", "yamaha-xsr155", 155, "klasik"),
    ("Jupiter MX King", "yamaha-jupiter-mx", 150, "bebek"), ("Vega ZR", "yamaha-jupiter-z", 115, "bebek"),
    ("Address FI", "suzuki-address", 113, "matic"), ("Skydrive", "suzuki-skydrive", 113, "matic"),
    ("Satria F150", "suzuki-satria", 150, "bebek"), ("GSX-R150", "suzuki-gsxr150", 150, "sport"),
    ("GSX-S150", "suzuki-gsxs150", 150, "naked"), ("Axelo 125", "suzuki-axelo", 125, "bebek"),
    ("Burgman Street", "suzuki-burgman", 125, "matic"),
    ("Ninja 250 FI", "kawasaki-ninja-250", 250, "sport"), ("Ninja 250 SL", "kawasaki-ninja-250", 250, "sport"),
    ("Z250", "kawasaki-z250", 250, "naked"), ("Ninja 400", "kawasaki-ninja-400", 400, "sport"),
    ("W175", "kawasaki-w175", 175, "klasik"), ("KLX150BF", "kawasaki-klx", 150, "trail"),
    ("Versys-X 250", "kawasaki-versys", 250, "trail"),
    ("Duke 200", "ktm-duke", 200, "naked"), ("Duke 390", "ktm-duke390", 390, "naked"),
    ("RC 200", "ktm-rc", 200, "sport"),
    ("Sprint 150", "vespa-sprint", 150, "premium"), ("Primavera 150", "vespa-primavera", 150, "premium"),
    ("Liberty 150", "vespa-liberty", 150, "premium"), ("GTS 300", "vespa-gts", 300, "premium"),
    ("SR GT 200", "aprilia-srgt", 200, "premium"),
    ("Pulsar NS200", "bajaj-pulsar", 200, "naked"), ("Dominar 400", "bajaj-dominar", 400, "naked"),
    ("Avenger 220", "bajaj-avenger", 220, "klasik"),
    ("Classic 350", "re-classic", 350, "klasik"), ("Hunter 350", "re-hunter", 350, "klasik"),
    ("Meteor 350", "re-meteor", 350, "klasik"),
    ("Leoncino 250", "benelli-leoncino", 250, "klasik"), ("TRK 502", "benelli-trk", 500, "trail"),
    ("Rapi/G1", "gesits", 0, "elektrik"), ("Volta 401", "volta", 0, "elektrik"),
]

AGES_BY_LIK = {"A": [2, 3], "B": [2, 4], "C": [2, 4], "L": [2, 3]}
KM_BY_AGE = {1: (5000, 13000), 2: (9000, 18000), 3: (15000, 28000), 4: (22000, 38000),
             5: (28000, 52000), 6: (32000, 58000), 7: (35000, 65000),
             8: (38000, 70000), 9: (40000, 75000), 10: (40000, 80000)}
YEAR = 2026

PENY = DATA["penyusutan"]

def umur_faktor(lik, age):
    key = str(age) if age <= 5 else ("6-7" if age <= 7 else "8-10")
    return PENY[lik]["umur"][key]

def round4(n):
    return int(round(n / 10000.0)) * 10000

def parse_gen_years(model_str):
    m = re.search(r"\((\d{4})-(\d{4})\)", model_str)
    if m:
        return int(m.group(1)), int(m.group(2))
    return None

def rnd(seed_str, lo, hi):
    """deterministic pseudo-random int in [lo,hi] from string hash"""
    h = 0
    for ch in seed_str:
        h = (h * 31 + ord(ch)) % 2147483647
    return lo + (h % (hi - lo + 1))

bekas_out = []
for m in DATA["bekas"]:
    model_str = m["model"]
    merek = m["merek"]
    lik = m["likuiditas"]
    fam = None
    for key, imgkey, cc, cat in BEKAS_FAM:
        if key.lower() in model_str.lower():
            fam = (imgkey, cc, cat)
            break
    if fam is None:
        cat = "elektrik" if lik == "L" else "matic"
        fam = (None, 0, cat)
    imgkey, cc, cat = fam

    # unit years dari rentang generasi (s..e), dipilih merata — max 3 unit/model
    gen = parse_gen_years(model_str)
    if gen:
        s, e = max(gen[0], 2016), min(gen[1], 2025)
        if s > e:
            s, e = e, s
        span = e - s
        if span == 0:
            years = [e]
        elif span == 1:
            years = [e, s]
        else:
            years = [e, e - span // 2, s]
    else:
        years = [2024, 2023, 2022]

    unit_idx = 0
    for year in sorted(years, reverse=True):
        unit_idx += 1
        seed = f"{model_str}|{year}"
        age = YEAR - year
        age = max(1, min(age, 10))
        km = rnd(seed + "km", KM_BY_AGE[age][0], KM_BY_AGE[age][1])
        grade = "A" if rnd(seed + "gr", 0, 9) >= 4 else "B"  # ~55% grade A

        # nilai pasar = harga baru ref x faktor penyusutan umur x kondisi Bagus (100%)
        nilai_pasar = round4(m["hargaBaruRef"] * umur_faktor(lik, age))
        if grade == "A":
            price = nilai_pasar
            price_min = round4(nilai_pasar * 0.96)
            price_max = round4(nilai_pasar * 1.04)
        else:
            price = round4(nilai_pasar * 0.93)
            price_min = round4(price * 0.96)
            price_max = nilai_pasar
        colors = COLORS_BY_KAT[cat]
        color = colors[(age + unit_idx) % len(colors)]
        catatan = m.get("catatan") or ""

        badge = None
        if grade == "A" and age <= 3 and km < KM_BY_AGE[age][0] + (KM_BY_AGE[age][1] - KM_BY_AGE[age][0]) * 0.4:
            badge = "PILIHAN"
        if any(w in catatan.lower() for w in ["dicari", "laku", "awet", "antrean"]):
            badge = "HOT"

        cond_txt = "istimewa — cat mulus, mesin original, servis rutin" if grade == "A" else "terawat — siap pakai, reconditioning ringan selesai"
        dok = "STNK + BPKB lengkap & atas nama sendiri" if rnd(seed + "dok", 0, 9) >= 2 else "STNK lengkap (BPKB diurus saat serah terima)"
        desc = (
            f"{merek} {model_str} tahun {year}, grade {grade}, odometer {km:,} km ({age} tahun pemakaian). Kondisi {cond_txt}. {catatan} "
            f"Sudah lolos inspeksi 25 titik Juana Motor: mesin, rangka, kaki-kaki, listrik, dan legalitas surat. "
            f"{dok}. Siap pakai, bisa tukar tambah atau kredit DP ringan \u2014 harga masih bisa nego."
        ).replace("  ", " ")

        specs = {
            "grade": f"Grade {grade}",
            "inspeksi": "Lolos 25 titik",
            "dokumen": dok,
        }
        trans = "Otomatis" if cat in ("matic", "premium", "elektrik") else ("Manual 4-Percepatan" if cat == "bebek" and cc <= 125 else "Manual 6-Percepatan")
        fuel = "Listrik" if cat == "elektrik" else "Bensin"
        name = f"{merek} {model_str}"

        bekas_out.append({
            "name": name,
            "brand": merek,
            "category": cat,
            "condition": "bekas",
            "year": year,
            "engineCc": cc,
            "transmission": trans,
            "fuelType": fuel,
            "color": color,
            "price": price,
            "priceMin": price_min,
            "priceMax": price_max,
            "image": img(imgkey, cat),
            "badge": badge,
            "stock": 1,
            "mileageKm": km,
            "grade": grade,
            "specs": specs,
            "description": desc,
            "featured": False,
        })

print(f"NEW: {len(baru_out)} variants | USED: {len(bekas_out)} units | TOTAL: {len(baru_out)+len(bekas_out)}")
brand_counts = {}
for r in baru_out:
    brand_counts[r["brand"]] = brand_counts.get(r["brand"], 0) + 1
print("Brands:", len(brand_counts))
with open(OUT_SEED, "w") as f:
    json.dump({"baru": baru_out, "bekas": bekas_out}, f, ensure_ascii=False)
print(f"Saved -> {OUT_SEED}")

# ============ GENERATE src/data/penyusutan.ts ============
P = DATA["penyusutan"]
ts = '''// ============================================================
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
'''
for kode, row in P.items():
    umur = ", ".join([f'"{k}": {v}' for k, v in row["umur"].items()])
    kond = ", ".join([f'{k}: {v}' for k, v in row["kondisi"].items()])
    ts += f'  {kode}: {{ kategori: {json.dumps(row["kategori"])}, umur: {{ {umur} }}, diskonBeli: {row["diskonBeli"]}, kondisi: {{ {kond} }} }},\n'
ts += '''};

export type BekasModel = {
  key: string;
  label: string;
  brand: string;
  likuiditas: "A" | "B" | "C" | "L";
  hargaBaruRef: number;
};

export const BEKAS_MODELS: BekasModel[] = [
'''
for m in DATA["bekas"]:
    ts += (f'  {{ key: {json.dumps(m["model"])}, label: {json.dumps(m["model"])}, '
           f'brand: {json.dumps(m["merek"])}, likuiditas: {json.dumps(m["likuiditas"])}, '
           f'hargaBaruRef: {m["hargaBaruRef"]} }},\n')
ts += "];\n"

os.makedirs(os.path.dirname(OUT_TS), exist_ok=True)
with open(OUT_TS, "w") as f:
    f.write(ts)
print(f"Saved -> {OUT_TS}")
