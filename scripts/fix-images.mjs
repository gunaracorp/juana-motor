// Fix bad images identified in contact sheet audit
import { execFileSync } from "child_process";
import { writeFileSync } from "fs";
import sharp from "sharp";

const OUT_DIR = "/home/z/my-project/public/images/models";
const TMP_DIR = "/tmp/juana-imgs";

const FIXES = [
  ["yamaha-jupiter-z", "Yamaha Jupiter Z1 motorcycle blue"],
  ["volta", "Volta 401 electric scooter white Indonesia"],
  ["yamaha-nmax", "Yamaha NMAX 155 scooter gray studio"],
  ["yamaha-mio", "Yamaha Mio S 125 scooter red studio"],
  ["viar-q1", "Viar Q1 electric motorcycle blue"],
  ["bajaj-avenger", "Bajaj Avenger 220 Street cruiser black"],
  ["gpx-demon", "GPX Demon 200RR sport bike"],
  ["suzuki-axelo", "Suzuki Axelo 125 motorcycle red"],
  ["united", "United E-Motor T1800 electric scooter"],
  ["ktm-rc", "KTM RC 390 white racing motorcycle"],
  ["ktm-sxf", "KTM 450 SX-F motocross dirt bike closeup"],
  ["honda-em1", "Honda EM1 e: electric scooter white"],
  ["alva", "ALVA One electric motorcycle white studio"],
  ["benelli-trk", "Benelli TRK 502 adventure motorcycle white"],
];

function pickScored(json) {
  const scored = json.results
    .filter((r) => r.original_url)
    .map((r) => ({ url: r.original_url, w: parseInt(r.original_width) || 0, h: parseInt(r.original_height) || 0, src: r.source || "" }))
    .filter((r) => !r.h || r.h / Math.max(r.w, 1) < 1.3)
    // prefer press-like sources & landscape big
    .sort((a, b) => b.w * (a.src.includes("blog") || 1) - a.w);
  return scored[0]?.url || json.results[0]?.original_url;
}

function searchOnce(q, attempt = 1) {
  try {
    const out = execFileSync("z-ai", ["image-search", "-q", q, "--count", "5", "--no-rank", "--gl", "us"], {
      encoding: "utf8", timeout: 150000, stdio: ["ignore", "pipe", "ignore"],
    });
    const m = out.match(/\{[\s\S]*\}/);
    if (!m) return null;
    const json = JSON.parse(m[0]);
    if (json.success && json.results?.length) return json;
  } catch { /* rate limit */ }
  if (attempt < 3) {
    execFileSync("sleep", ["6"]);
    return searchOnce(q, attempt + 1);
  }
  return null;
}

async function processImage(key, url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 8000) return false;
    const dest = `${TMP_DIR}/${key}-fix.raw`;
    writeFileSync(dest, buf);
    const meta = await sharp(dest).metadata();
    if (!meta.width || meta.width < 400) return false;
    const targetW = Math.min(meta.width, 900);
    const nativeH = Math.round((targetW * (meta.height || targetW)) / meta.width);
    const targetH = Math.max(Math.min(Math.round((targetW * 3) / 4), nativeH), 200);
    await sharp(dest).rotate()
      .resize(targetW, targetH, { fit: "cover", position: "centre" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(`${OUT_DIR}/${key}.jpg`);
    return true;
  } catch { return false; }
}

for (const [key, q] of FIXES) {
  const json = searchOnce(q);
  if (json) {
    const url = pickScored(json);
    const ok = url ? await processImage(key, url) : false;
    console.log(`${key}: ${ok ? "FIXED" : "dl-fail"}`);
  } else {
    console.log(`${key}: search-fail`);
  }
  await new Promise((r) => setTimeout(r, 3000));
}
console.log("DONE");
