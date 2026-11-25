#!/usr/bin/env python3
"""Extract full Juana Motor Excel database -> JSON (MASTER_BARU, HARGA_BELI_BEKAS, PENYUSUTAN)."""
import json, re
from openpyxl import load_workbook

SRC = "/home/z/my-project/upload/UJANG_JUANA_MOTOR_TASIKMALAYA_Harga_Motor_Nov2026.xlsx"
OUT = "/home/z/my-project/scripts/data-extract.json"

wb = load_workbook(SRC, data_only=True)

def cell(ws, r, c):
    v = ws.cell(row=r, column=c).value
    if v is None:
        return None
    if isinstance(v, str):
        v = v.strip()
        return v if v not in ("", "*") else None
    return v

# ---------- MASTER_BARU: header row 4, data rows 5.. (starts col B) ----------
ws = wb["MASTER_BARU"]
baru = []
r = 5
while True:
    no = cell(ws, r, 2)
    if no is None or not str(no).isdigit():
        break
    merek = cell(ws, r, 3)
    if merek is None:
        break
    harga = cell(ws, r, 8)
    if harga is None:
        break
    baru.append({
        "no": int(no),
        "merek": merek,
        "model": cell(ws, r, 4),
        "varian": cell(ws, r, 5),
        "kategori": cell(ws, r, 6),
        "cc": int(cell(ws, r, 7) or 0),
        "hargaOtr": int(round(float(harga))),
        "sumber": cell(ws, r, 9),
    })
    r += 1

# ---------- HARGA_BELI_BEKAS: header row 4, data rows 5.. (starts col B) ----------
ws = wb["HARGA_BELI_BEKAS"]
bekas = []
r = 5
while True:
    no = cell(ws, r, 2)
    if no is None or not str(no).isdigit():
        break
    merek = cell(ws, r, 3)
    if merek is None:
        break
    def num(c):
        v = cell(ws, r, c)
        return int(round(float(v))) if v is not None else None
    bekas.append({
        "no": int(no),
        "merek": merek,
        "model": cell(ws, r, 4),
        "likuiditas": cell(ws, r, 5),
        "hargaBaruRef": num(6),
        "u1": num(7), "u2": num(8), "u3": num(9), "u4": num(10), "u5": num(11),
        "terimaU2": num(12), "jualU2": num(13),
        "catatan": cell(ws, r, 15),
    })
    r += 1

# ---------- PENYUSUTAN: header row 4, data rows 5.. (starts col B) ----------
def pct(v):
    """Excel stores factors as fractions (0.9) or strings ('90%') — normalize to fraction."""
    if v is None:
        return 0.0
    s = str(v)
    if s.endswith("%"):
        return float(s[:-1]) / 100
    return float(v)

ws = wb["PENYUSUTAN"]
penyusutan = {}
for r in range(5, 9):
    kode = cell(ws, r, 2)
    if not kode:
        continue
    penyusutan[kode] = {
        "kategori": cell(ws, r, 3),
        "umur": {
            "1": pct(cell(ws, r, 4)),
            "2": pct(cell(ws, r, 5)),
            "3": pct(cell(ws, r, 6)),
            "4": pct(cell(ws, r, 7)),
            "5": pct(cell(ws, r, 8)),
            "6-7": pct(cell(ws, r, 9)),
            "8-10": pct(cell(ws, r, 10)),
        },
        "diskonBeli": pct(cell(ws, r, 11)),
        "kondisi": {
            "Bagus": pct(cell(ws, r, 12)),
            "Sedang": pct(cell(ws, r, 13)),
            "Kurang": pct(cell(ws, r, 14)),
        },
    }

print(f"BARU: {len(baru)} rows | BEKAS: {len(bekas)} rows | FAKTOR: {list(penyusutan.keys())}")
merek_set = sorted({b['merek'] for b in baru})
print(f"MEREK ({len(merek_set)}): {merek_set}")
with open(OUT, "w") as f:
    json.dump({"baru": baru, "bekas": bekas, "penyusutan": penyusutan}, f, ensure_ascii=False, indent=1)
print(f"Saved -> {OUT}")
