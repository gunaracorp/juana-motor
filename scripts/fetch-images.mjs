// Fetch real product photos for every Juana Motor model family via z-ai image-search
// Output: public/images/models/{key}.jpg + scripts/img-manifest.json
import { execFileSync } from "child_process";
import { mkdirSync, writeFileSync, existsSync, statSync } from "fs";
import sharp from "sharp";

const OUT_DIR = "/home/z/my-project/public/images/models";
const TMP_DIR = "/tmp/juana-imgs";
const MANIFEST = "/home/z/my-project/scripts/img-manifest.json";
mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(TMP_DIR, { recursive: true });

// key -> search query (one coherent concept per call)
const MODELS = {
  // HONDA
  "honda-beat": "Honda BeAT 110 eSP scooter Indonesia product photo",
  "honda-genio": "Honda Genio 110 scooter Indonesia product photo",
  "honda-scoopy": "Honda Scoopy retro scooter Indonesia product photo",
  "honda-vario-125": "Honda Vario 125 eSP+ scooter Indonesia product photo",
  "honda-vario-160": "Honda Vario 160 scooter Indonesia product photo",
  "honda-pcx": "Honda PCX 160 premium scooter Indonesia",
  "honda-adv": "Honda ADV160 adventure scooter Indonesia",
  "honda-stylo": "Honda Stylo 160 scooter Indonesia",
  "honda-revo": "Honda Revo FIT 110 underbone motorcycle Indonesia",
  "honda-supra-x": "Honda Supra X 125 FI underbone motorcycle",
  "honda-supra-gtr": "Honda Supra GTR 150 sport underbone motorcycle",
  "honda-sonic": "Honda Sonic 150R underbone motorcycle Indonesia",
  "honda-verza": "Honda CB150 Verza naked motorcycle Indonesia",
  "honda-cbr150r": "Honda CBR150R sportbike Indonesia",
  "honda-cb350": "Honda CB350 Hness classic motorcycle",
  "honda-cbr250rr": "Honda CBR250RR sportbike red",
  "honda-crf150l": "Honda CRF150L dirt trail bike red",
  "honda-em1": "Honda EM1 e: electric scooter",
  // YAMAHA
  "yamaha-mio": "Yamaha Mio M3 125 scooter Indonesia product photo",
  "yamaha-fino": "Yamaha Fino 125 retro scooter Indonesia",
  "yamaha-gear": "Yamaha Gear 125 scooter Indonesia",
  "yamaha-xride": "Yamaha X-Ride 125 scooter Indonesia",
  "yamaha-fazzio": "Yamaha Fazzio hybrid connected scooter",
  "yamaha-lexi": "Yamaha Lexi 155 scooter Indonesia",
  "yamaha-aerox": "Yamaha Aerox 155 sport scooter Indonesia",
  "yamaha-nmax": "Yamaha NMAX 155 scooter Indonesia product photo",
  "yamaha-xmax": "Yamaha XMAX 250 maxi scooter",
  "yamaha-mt15": "Yamaha MT-15 streetfighter motorcycle",
  "yamaha-mt25": "Yamaha MT-25 naked motorcycle blue",
  "yamaha-vixion": "Yamaha V-Ixion R naked motorcycle",
  "yamaha-r15": "Yamaha R15 V4 sportbike blue",
  "yamaha-r25": "Yamaha R25 sportbike blue",
  "yamaha-wr155": "Yamaha WR155 R enduro motorcycle blue",
  "yamaha-xsr155": "Yamaha XSR155 retro sport motorcycle",
  "yamaha-jupiter-mx": "Yamaha Jupiter MX King 150 underbone motorcycle",
  "yamaha-jupiter-z": "Yamaha Jupiter Z1 underbone motorcycle",
  "yamaha-neos": "Yamaha NEOs electric scooter",
  // SUZUKI
  "suzuki-address": "Suzuki Address FI 113 scooter",
  "suzuki-skydrive": "Suzuki Skydrive Sport 125 scooter",
  "suzuki-access": "Suzuki Access 125 scooter",
  "suzuki-burgman": "Suzuki Burgman Street 125 EX scooter",
  "suzuki-satria": "Suzuki Satria F150 underbone sport motorcycle",
  "suzuki-gsxr150": "Suzuki GSX-R150 sportbike blue",
  "suzuki-gsxs150": "Suzuki GSX-S150 naked motorcycle",
  "suzuki-bandit": "Suzuki GSX150 Bandit naked motorcycle",
  "suzuki-axelo": "Suzuki Axelo 125 underbone motorcycle",
  "suzuki-vstrom": "Suzuki V-Strom 250 SX adventure motorcycle",
  // KAWASAKI
  "kawasaki-w175": "Kawasaki W175 retro classic motorcycle",
  "kawasaki-ninja-250": "Kawasaki Ninja 250 sportbike green",
  "kawasaki-ninja-400": "Kawasaki Ninja 400 sportbike",
  "kawasaki-zx25r": "Kawasaki Ninja ZX-25R sportbike green",
  "kawasaki-zx10r": "Kawasaki Ninja ZX-10R superbike green",
  "kawasaki-ninja-650": "Kawasaki Ninja 650 sport touring motorcycle",
  "kawasaki-z250": "Kawasaki Z250 naked motorcycle green",
  "kawasaki-z650": "Kawasaki Z650 naked motorcycle",
  "kawasaki-z900": "Kawasaki Z900 naked motorcycle",
  "kawasaki-versys": "Kawasaki Versys adventure touring motorcycle",
  "kawasaki-klx": "Kawasaki KLX230 trail dirt bike green",
  // KTM
  "ktm-duke": "KTM Duke 200 naked motorcycle orange",
  "ktm-duke390": "KTM Duke 390 naked motorcycle orange",
  "ktm-rc": "KTM RC 390 sportbike orange",
  "ktm-adventure": "KTM 390 Adventure motorcycle orange",
  "ktm-sxf": "KTM 450 SX-F motocross bike orange",
  // BAJAJ
  "bajaj-pulsar": "Bajaj Pulsar NS200 naked motorcycle red",
  "bajaj-dominar": "Bajaj Dominar 400 touring motorcycle",
  "bajaj-avenger": "Bajaj Avenger 220 cruise chopper motorcycle",
  // BENELLI
  "benelli-tnt135": "Benelli TNT 135 naked motorcycle",
  "benelli-leoncino": "Benelli Leoncino 250 scrambler motorcycle",
  "benelli-trk": "Benelli TRK 502 adventure motorcycle",
  "benelli-imperiale": "Benelli Imperiale 400 classic motorcycle",
  "benelli-tnt600": "Benelli TNT 600i naked motorcycle",
  // ROYAL ENFIELD
  "re-hunter": "Royal Enfield Hunter 350 retro motorcycle",
  "re-bullet": "Royal Enfield Bullet 350 classic motorcycle",
  "re-classic": "Royal Enfield Classic 350 motorcycle",
  "re-meteor": "Royal Enfield Meteor 350 cruiser motorcycle",
  "re-guerrilla": "Royal Enfield Guerrilla 450 roadster motorcycle",
  "re-himalayan": "Royal Enfield Himalayan 450 adventure motorcycle",
  "re-interceptor": "Royal Enfield Interceptor 650 classic motorcycle",
  "re-supermeteor": "Royal Enfield Super Meteor 650 cruiser motorcycle",
  // VESPA / PIAGGIO / APRILIA
  "vespa-liberty": "Vespa Liberty 150 scooter Italy",
  "vespa-primavera": "Vespa Primavera 150 scooter",
  "vespa-sprint": "Vespa Sprint 150 scooter",
  "vespa-gtv": "Vespa GTV 300 scooter",
  "vespa-gts": "Vespa GTS 300 super sport scooter",
  "piaggio-medley": "Piaggio Medley 150 scooter",
  "aprilia-srgt": "Aprilia SR GT 200 scooter",
  "aprilia-rs457": "Aprilia RS 457 sportbike",
  // VIAR / GPX
  "viar-crossx": "Viar Cross X 150 trail motorcycle Indonesia",
  "viar-karya": "Viar Karya 150 three wheel motorcycle Indonesia",
  "viar-q1": "Viar New Q1 electric motorcycle Indonesia",
  "viar-sepeda": "Viar electric bicycle Indonesia",
  "gpx-demon": "GPX Demon GR200R sportbike Thailand",
  "gpx-wildfire": "GPX Wildfire 200 dirt bike",
  // MOTOR LISTRIK INDONESIA
  "gesits": "Gesits G1 electric motorcycle Indonesia",
  "alva": "Alva One electric motorcycle Indonesia",
  "volta": "Volta 401 electric motorcycle Indonesia",
  "uwinfly": "Uwinfly T3 electric scooter Indonesia",
  "united": "United T1800 electric motorcycle Indonesia",
  "smoot": "Smoot Tempur electric motorcycle Indonesia",
  "polytron": "Polytron Fox R electric motorcycle Indonesia",
  "selis": "Selis E-Max electric scooter Indonesia",
  "yadea": "Yadea T9 electric scooter Indonesia",
};

const keys = Object.keys(MODELS);
console.log(`Total queries: ${keys.length}`);

function searchOnce(key, query) {
  try {
    const out = execFileSync("z-ai", ["image-search", "-q", query, "--count", "3", "--no-rank", "--gl", "us"], {
      encoding: "utf8", timeout: 150000,
    });
    const m = out.match(/\{[\s\S]*\}/);
    if (!m) return null;
    const json = JSON.parse(m[0]);
    if (!json.success || !json.results?.length) return null;
    // pick widest jpg/png result >= 500px wide
    const scored = json.results
      .filter((r) => r.original_url)
      .map((r) => ({ url: r.original_url, w: parseInt(r.original_width) || 0, h: parseInt(r.original_height) || 0 }))
      .filter((r) => !r.h || r.h / Math.max(r.w, 1) < 1.4) // reject ultra-portrait junk
      .sort((a, b) => b.w - a.w);
    return scored[0]?.url || json.results[0].original_url;
  } catch (e) {
    return null;
  }
}

async function downloadAndProcess(key, url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 8000) return false;
    const dest = `${TMP_DIR}/${key}.raw`;
    writeFileSync(dest, buf);
    // normalize: max width 900, crop to 4:3-ish canvas, quality 80
    const img = sharp(dest).rotate();
    const meta = await img.metadata();
    if (!meta.width || meta.width < 300) return false;
    let targetW = Math.min(meta.width, 900);
    let targetH = Math.round((targetW * 3) / 4);
    const nativeH = Math.round((targetW * (meta.height || targetW)) / meta.width);
    if (nativeH < targetH) targetH = nativeH; // don't upscale height beyond native
    await sharp(dest)
      .rotate()
      .resize(targetW, targetH, { fit: "cover", position: "centre" })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(`${OUT_DIR}/${key}.jpg`);
    return true;
  } catch (e) {
    return false;
  }
}

// ---- phase 1: search with concurrency ----
const results = {};
let idx = 0;
async function worker(wid) {
  while (idx < keys.length) {
    const k = keys[idx++];
    const url = searchOnce(k, MODELS[k]);
    results[k] = url;
    process.stdout.write(`[${idx}/${keys.length}] ${k}: ${url ? "OK" : "FAIL"}\n`);
  }
}
const CONC = 10;
await Promise.all(Array.from({ length: CONC }, (_, i) => worker(i)));

// ---- phase 2: download + process ----
const manifest = {};
for (const k of keys) {
  const url = results[k];
  if (url) {
    const ok = await downloadAndProcess(k, url);
    manifest[k] = ok ? `/images/models/${k}.jpg` : null;
    process.stdout.write(`IMG ${k}: ${ok ? "saved" : "download-failed"}\n`);
  } else {
    manifest[k] = null;
  }
}

const okCount = Object.values(manifest).filter(Boolean).length;
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1));
console.log(`\nDONE: ${okCount}/${keys.length} images saved. Manifest -> ${MANIFEST}`);
const failed = keys.filter((k) => !manifest[k]);
if (failed.length) console.log("FAILED keys:", failed.join(", "));
