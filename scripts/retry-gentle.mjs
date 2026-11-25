// Gentle paced retry: 1 query every 4-6s (sequential) — respects rate limit
import { execFileSync } from "child_process";
import { writeFileSync, readFileSync } from "fs";
import sharp from "sharp";

const OUT_DIR = "/home/z/my-project/public/images/models";
const TMP_DIR = "/tmp/juana-imgs";
const MANIFEST = "/home/z/my-project/scripts/img-manifest.json";
const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));

const ALT_QUERY = {
  "ktm-duke390": "KTM 390 Duke motorcycle",
  "ktm-rc": "KTM RC 390 racing motorcycle",
  "ktm-adventure": "KTM 390 Adventure ADV bike",
  "ktm-sxf": "KTM SX-F motocross dirt bike",
  "bajaj-pulsar": "Bajaj Pulsar NS200 bike",
  "bajaj-dominar": "Bajaj Dominar 400 bike",
  "bajaj-avenger": "Bajaj Avenger Street 160 cruiser",
  "benelli-tnt135": "Benelli TNT 135 tornado bike",
  "benelli-leoncino": "Benelli Leoncino scrambler",
  "benelli-trk": "Benelli TRK 502 adventure tourer",
  "benelli-imperiale": "Benelli Imperiale 400 classic bike",
  "benelli-tnt600": "Benelli TNT 600 BN600 bike",
  "re-hunter": "Royal Enfield Hunter 350 bike",
  "re-bullet": "Royal Enfield Bullet 350 bike",
  "re-classic": "Royal Enfield Classic 350 bike",
  "re-meteor": "Royal Enfield Meteor 350 cruiser",
  "re-guerrilla": "Royal Enfield Guerrilla 450",
  "re-himalayan": "Royal Enfield Himalayan adventure bike",
  "re-interceptor": "Royal Enfield Interceptor INT 650",
  "re-supermeteor": "Royal Enfield Super Meteor 650",
  "vespa-liberty": "Vespa Liberty scooter",
  "vespa-primavera": "Vespa Primavera scooter red",
  "vespa-sprint": "Vespa Sprint scooter sport",
  "vespa-gtv": "Vespa GTV 300 elegant scooter",
  "vespa-gts": "Vespa GTS 300 scooter red",
  "piaggio-medley": "Piaggio Medley scooter",
  "aprilia-srgt": "Aprilia SR GT scooter",
  "aprilia-rs457": "Aprilia RS 457 racing bike",
  "viar-crossx": "Viar Cross X trail motor Indonesia",
  "viar-karya": "Viar Karya roda tiga Indonesia",
  "viar-q1": "Viar motor listrik Indonesia",
  "viar-sepeda": "Viar sepeda listrik U3 Indonesia",
  "gpx-demon": "GPX Demon racing bike",
  "gpx-wildfire": "GPX Wildfire trail bike",
  "gesits": "Gesits motor listrik Indonesia",
  "alva": "ALVA motor listrik Indonesia",
  "volta": "Volta motor listrik 401",
  "uwinfly": "Uwinfly motor listrik",
  "united": "United E-motor listrik Indonesia",
  "smoot": "Smoot motor listrik Indonesia",
  "polytron": "Polytron Fox motor listrik",
  "selis": "Selis motor listrik Indonesia",
  "yadea": "Yadea motor listrik Indonesia",
};

function searchOnce(key) {
  const q = ALT_QUERY[key];
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const out = execFileSync("z-ai", ["image-search", "-q", q, "--count", "3", "--no-rank", "--gl", "us"], {
        encoding: "utf8", timeout: 150000, stdio: ["ignore", "pipe", "ignore"],
      });
      const m = out.match(/\{[\s\S]*\}/);
      if (!m) continue;
      const json = JSON.parse(m[0]);
      if (json.success && json.results?.length) {
        const scored = json.results
          .filter((r) => r.original_url)
          .map((r) => ({ url: r.original_url, w: parseInt(r.original_width) || 0, h: parseInt(r.original_height) || 0 }))
          .filter((r) => !r.h || r.h / Math.max(r.w, 1) < 1.4)
          .sort((a, b) => b.w - a.w);
        return scored[0]?.url || json.results[0].original_url;
      }
    } catch { /* rate limited — wait longer */ }
    execFileSync("sleep", ["3"]);
  }
  return null;
}

async function processImage(key, url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 8000) return false;
    const dest = `${TMP_DIR}/${key}.raw`;
    writeFileSync(dest, buf);
    const meta = await sharp(dest).metadata();
    if (!meta.width || meta.width < 300) return false;
    const targetW = Math.min(meta.width, 900);
    const nativeH = Math.round((targetW * (meta.height || targetW)) / meta.width);
    const targetH = Math.max(Math.min(Math.round((targetW * 3) / 4), nativeH), 200);
    await sharp(dest).rotate()
      .resize(targetW, targetH, { fit: "cover", position: "centre" })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(`${OUT_DIR}/${key}.jpg`);
    return true;
  } catch { return false; }
}

const failed = Object.keys(manifest).filter((k) => !manifest[k]);
console.log(`Gentle retry: ${failed.length} keys, ~5s spacing`);

for (const k of failed) {
  const url = searchOnce(k);
  if (url) {
    const ok = await processImage(k, url);
    manifest[k] = ok ? `/images/models/${k}.jpg` : null;
    console.log(`${k}: ${ok ? "SAVED" : "dl-fail"}`);
  } else {
    console.log(`${k}: search-fail (giving up)`);
  }
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1));
  await new Promise((r) => setTimeout(r, 2200));
}

const okCount = Object.values(manifest).filter(Boolean).length;
const still = Object.keys(manifest).filter((k) => !manifest[k]);
console.log(`\nFINAL: ${okCount}/${Object.keys(manifest).length}. Still failed: ${still.join(", ") || "none"}`);
